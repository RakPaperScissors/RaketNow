import { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { getConversations, createConversation, getMessages, sendMessage } from '../api/message';
import { useUser } from './useUsers';

const SOCKET_SERVER_URL = 'http://localhost:3000';

export function useMessages() {
    const { user } = useUser();
    const socketRef = useRef(null);

    // UI States
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isTyping, setIsTyping] = useState({});
    const [messagePage, setMessagePage] = useState(1);
    const [hasMoreMessages, setHasMoreMessages] = useState(true);

    const lastOptimisticIdRef = useRef(null);

    // --- Socket.IO Connection and Event Handling ---
    useEffect(() => {
        if (!user || !user.uid) return;

        // Initialize Socket.IO connection
        socketRef.current = io(SOCKET_SERVER_URL, {
            withCredentials: true,
        });

        // Event listeners
        socketRef.current.on('connect', () => {
            console.log('Socket Connected:', socketRef.current.id);
            fetchAndJoinConversations();
        });

        socketRef.current.on('disconnect', () => {
            console.log('Socket Disconnected');
        });

        socketRef.current.on('connect_error', (err) => {
            console.error('Socket Connection Error:', err.message);
            setError('Failed to connect to chat service. Please try again.');
        });

        // Listen for new messages
        socketRef.current.on('newMessage', (newMessage) => {
            console.log('Received newMessage event:', newMessage);

            setMessages(prevMessages => {
                if (lastOptimisticIdRef.current && newMessage.text === prevMessages[prevMessages.length - 1]?.text && newMessage.sender.id === user.uid) {
                    lastOptimisticIdRef.current = null;
                    const updatedMessages = [...prevMessages];
                    updatedMessages[updatedMessages.length - 1] = newMessage;
                    return updatedMessages;
                }
                else if (selectedConversation && newMessage.conversationId === selectedConversation.id) {
                    return [...prevMessages, newMessage];
                }
                return prevMessages;
            });

            setConversations(prev => prev.map(conv =>
                conv.id === newMessage.conversationId ? { ...conv, lastMessage: newMessage } : conv
            ));

            if (selectedConversation && newMessage.conversationId === selectedConversation.id && newMessage.sender.id !== user.uid) {
                if (socketRef.current) {
                    socketRef.current.emit('markAsRead', { conversationId: selectedConversation.id });
                }
            }
        });

        // Listen for typing indicators
        socketRef.current.on('userTyping', ({ userId, conversationId }) => {
            if (selectedConversation && conversationId === selectedConversation.id && userId !== user.uid) {
                setIsTyping(prev => ({ ...prev, [userId]: true }));
            }
        });

        socketRef.current.on('userStoppedTyping', ({ userId, conversationId }) => {
            if (selectedConversation && conversationId === selectedConversation.id && userId !== user.uid) {
                setIsTyping(prev => ({ ...prev, [userId]: false }));
            }
        });

        // Listen for read receipts
        socketRef.current.on('messagesRead', ({ conversationId, readerId }) => {
            if (conversationId === selectedConversation?.id) {
                // in the future
            }
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [user, selectedConversation]);

    // --- API Calls and Data Management ---

    const fetchAndJoinConversations = useCallback(async () => {
        setLoading(true);
        try {
            const fetchedConversations = await getConversations();
            setConversations(fetchedConversations);

            // Join rooms for all fetched conversations
            if (socketRef.current && fetchedConversations.length > 0) {
                const conversationIds = fetchedConversations.map(conv => conv.id);
                console.log('Emitting joinConversations for IDs:', conversationIds);
                socketRef.current.emit('joinConversations', conversationIds);
            }
        } catch (err) {
            setError(err.message || 'Failed to load conversations.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Handles selecting a conversation and fetching its messages
    const selectConversation = useCallback(async (conversation) => {
        setSelectedConversation(conversation);
        setMessages([]);
        setMessagePage(1);
        setHasMoreMessages(true);
        setLoading(true);
        try {
            const fetchedMessages = await getMessages(conversation.id, 1, 50); // Fetch first page
            setMessages(fetchedMessages.reverse());
            setHasMoreMessages(fetchedMessages.length === 50);
            // Mark conversation as read after fetching messages
            if (socketRef.current) {
                socketRef.current.emit('markAsRead', { conversationId: conversation.id });
            }
        } catch (err) {
            setError(err.message || 'Failed to load messages for this conversation.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Loads more messages for infinite scroll
    const loadMoreMessages = useCallback(async () => {
        if (!selectedConversation || !hasMoreMessages || loading) return;

        setLoading(true);
        try {
            const nextPage = messagePage + 1;
            const fetchedMessages = await getMessages(selectedConversation.id, nextPage, 50);
            setMessages(prevMessages => [...fetchedMessages.reverse(), ...prevMessages]);
            setHasMoreMessages(fetchedMessages.length === 50);
            setMessagePage(nextPage);
        } catch (err) {
            setError(err.message || 'Failed to load more messages.');
        } finally {
            setLoading(false);
        }
    }, [selectedConversation, hasMoreMessages, messagePage, loading]);

    // Sends a message
    const sendTextMessage = useCallback(async (text) => {
        if (!selectedConversation || !text.trim() || !socketRef.current || !user) return;
        const optimisticId = `optimistic-${Date.now()}`;
        lastOptimisticIdRef.current = optimisticId;

        const tempMessage = {
            id: optimisticId,
            text: text,
            conversationId: selectedConversation.id,
            sender: {
                id: user.uid,
                firstName: user.firstName,
                lastName: user.lastName,
                profilePicture: user.profilePicture,
                profilePictureUrl: user.profilePicture
                    ? `http://localhost:9000/user-profile-pictures/${user.profilePicture}` // PICTURE URL RECHECK LATER
                    : null, // Default avatar will be handled by frontend
            },
            createdAt: new Date().toISOString(),
            readAt: null,
            isOptimistic: true,
        };

        setMessages(prevMessages => [...prevMessages, tempMessage]);

        try {
            socketRef.current.emit('sendMessage', {
                conversationId: selectedConversation.id,
                text: text,
                images: [],
            });

        } catch (err) {
            setError(err.message || 'Failed to send message.');
            setMessages(prevMessages => prevMessages.filter(msg => msg.id !== tempMessage.id));
            lastOptimisticIdRef.current = null;
        }
    }, [selectedConversation, user, socketRef, setMessages]);

    // Creates a new conversation
    const startNewConversation = useCallback(async (participantIds) => {
        setLoading(true);
        try {
            const newConv = await createConversation(participantIds);
            setConversations(prev => {
                const existing = prev.find(c => c.id === newConv.id);
                if (!existing) {
                    return [newConv, ...prev];
                }
                return prev;
            });
            setSelectedConversation(newConv);
            if (socketRef.current) {
                socketRef.current.emit('joinConversations', [newConv.id]);
            }
        } catch (err) {
            setError(err.message || 'Failed to start new conversation.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Typing indicator events
    const emitTyping = useCallback((isTyping) => {
        if (!selectedConversation || !socketRef.current) return;
        if (isTyping) {
            socketRef.current.emit('startTyping', { conversationId: selectedConversation.id });
        } else {
            socketRef.current.emit('stopTyping', { conversationId: selectedConversation.id });
        }
    }, [selectedConversation]);

    return {
        conversations,
        selectedConversation,
        messages,
        loading,
        error,
        isTyping,
        hasMoreMessages,
        selectConversation,
        loadMoreMessages,
        sendTextMessage,
        startNewConversation,
        emitTyping,
    };
}