import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Logger } from "@nestjs/common";
import { MessageService } from "../message/message.service";
import { CreateMessageDto } from "../message/dto/create-message.dto";
import { AuthService } from "src/auth/auth.service";

interface AuthenticatedSocket extends Socket {
  user: {
    id: string;
  };
}

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class ConversationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly messageService: MessageService,
    private readonly authService: AuthService
  ) {}

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger("ConversationGateway");

  async handleConnection(socket: AuthenticatedSocket) {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        throw new Error("Authentication token not found");
      }
      const userPayload = await this.authService.verifyJwt(token);
      socket.user = userPayload;
      this.logger.log(
        `Client connected: ${socket.id} - User ID: ${socket.user.id}`
      );
    } catch (e) {
      this.logger.error(`Authentication error: ${e.message}`);
      socket.disconnect();
    }
  }

  handleDisconnect(socket: AuthenticatedSocket) {
    this.logger.log(`Client disconnected: ${socket.id}`);
  }

  @SubscribeMessage("joinConversations")
  handleJoinConversations(
    @MessageBody() conversationIds: string[],
    @ConnectedSocket() socket: Socket
  ) {
    this.logger.log(
      `Client ${socket.id} joining conversations: ${conversationIds.join(", ")}`
    );
    socket.join(conversationIds);
  }

  @SubscribeMessage("sendMessage")
  async handleSendMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() socket: AuthenticatedSocket
  ) {
    const senderId = socket.user.id;

    const message = await this.messageService.create(
      createMessageDto,
      senderId
    );

    this.server.to(createMessageDto.conversationId).emit("newMessage", message);

    return message;
  }

  @SubscribeMessage("startTyping")
  handleStartTyping(
    @MessageBody("conversationId") conversationId: string,
    @ConnectedSocket() socket: AuthenticatedSocket
  ) {
    this.logger.log(
      `User ${socket.user.id} is typing in conversation ${conversationId}`
    );
    socket
      .to(conversationId)
      .emit("userTyping", { userId: socket.user.id, conversationId });
  }

  @SubscribeMessage("stopTyping")
  handleStopTyping(
    @MessageBody("conversationId") conversationId: string,
    @ConnectedSocket() socket: AuthenticatedSocket
  ) {
    this.logger.log(
      `User ${socket.user.id} stopped typing in conversation ${conversationId}`
    );
    socket
      .to(conversationId)
      .emit("userStoppedTyping", { userId: socket.user.id, conversationId });
  }

  @SubscribeMessage('markAsRead')
  async handleMarkAsRead(
    @MessageBody('conversationId') conversationId: string,
    @ConnectedSocket() socket: AuthenticatedSocket,
  ) {
    const readerId = socket.user.id;
    this.logger.log(`User ${readerId} marked messages as read in conversation ${conversationId}`);

    const updateResult = await this.messageService.markMessagesAsRead(conversationId, readerId);

    if (updateResult.affectedCount > 0) {
      this.server.to(conversationId).emit('messagesRead', { conversationId, readerId });
    }

    return updateResult;
  }
}
