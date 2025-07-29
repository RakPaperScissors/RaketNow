const API_BASE_URL = 'http://localhost:3000';

export async function getConversations() {
    const response = await fetch(`${API_BASE_URL}/conversations`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch conversations.');
    }
    return response.json();
}

export async function createConversation(participantIds) {
    const response = await fetch(`${API_BASE_URL}/conversations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ participantIds }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create conversation.');
    }
    return response.json();
}

export async function getMessages(conversationId, page = 1, limit = 50) {
    const response = await fetch(`${API_BASE_URL}/messages/conversation/${conversationId}?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch messages.');
    }
    return response.json();
}

export async function sendMessage(conversationId, text, images = []) {
    const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ conversationId, text, images }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message.');
    }
    return response.json();
}