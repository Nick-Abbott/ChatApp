import socketIo from 'socket.io';
import { Server } from 'http';

export class Socket {

  private socket: SocketIO.Server;

  constructor(server: Server) {
    this.socket = socketIo(server);
  }

}
