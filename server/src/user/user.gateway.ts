import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Logger } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./schemas/user.schema";

@WebSocketGateway(3002, { cors: "*" })
export class UserWebSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly userService: UserService) {}

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger("UserWebSocketGateway");

  @SubscribeMessage("createUser")
  async create(client: Socket, payload: User): Promise<void> {
    const user = await this.userService.create(payload);
    this.server.emit("userCreated", user);
  }

  afterInit(server: Server) {
    this.logger.log("Initialized!");
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
