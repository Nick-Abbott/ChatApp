import { MessageStore } from '../dataModel/MessageStore';
import { Room } from '../dataModel/Room';
import socketIo from 'socket.io';

export class ChatRoom extends MessageStore {

  constructor(name: string, room: Room, server: socketIo.Server) {
    super(name, server);
  }

  public get Name() {
    return this.name;
  }

  /**
   * Emit a message to all connected sockets
   */
  protected emit(message: string, payload: any, broadcast?: false): void;
  /**
   * Broadcast a message to every socket but the initiator
   */
  protected emit(message: string, payload: any, broadcast: true, socket: socketIo.Socket): void;
  /**
   * @param message The emitter event type
   * @param payload The payload to be sent with the event
   * @param broadcast Whether the message will be broadcast or emitted
   * @param socket The socket that will not be receiving the broadcast message
   */
  protected emit(message: string, payload: any, broadcast?: boolean, socket?: socketIo.Socket): void {
    if (broadcast) {
      socket.to('name').broadcast.emit(message, payload);
    } else {
      this.sServer.to('name').emit(message, payload);
    }
  }

}
