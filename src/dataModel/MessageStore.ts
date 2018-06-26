import socketIo from 'socket.io';
import debug from 'debug';

export abstract class MessageStore {

  /**
   * The debug logger
   */
  private log: debug.IDebugger;
  /**
   * The name of the socket room
   */
  protected name: string;
  /**
   * The socket server
   */
  protected sServer: socketIo.Server;
  /**
   * The saved messages
   */
  private messages: string[];

  constructor(name: string, sServer: socketIo.Server) {
    this.log = debug(`MessageStore:${name}`);
    this.name = name;
    this.sServer = sServer;
    this.messages = [];
  }

  /**
   * Initialize new connections
   */
  private setup() {
    this.sServer.to(name).on('connection', (socket) => {
      this.log(`Connected to ${name}`);
      this.emit('initRoom', this.messages);
      socket.on('message', (msg: string) => {
        this.messages.push(msg);
        this.emit('newMessage', msg, true, socket);
      });
    });
  }

  /**
   * Emit the current messages of the room to initialize a new user
   * @param message The name of the Initialize Room event
   * @param payload The current messages in the room
   */
  protected abstract emit(message: 'initRoom', payload: string[]): void;
  /**
   * Broadcast a sent message to other clients
   * @param message The name of the New Message event
   * @param payload The message contents
   * @param broadcast Whether the message will be broadcast or emitted
   * @param socket The socket that will not be receiving the broadcast message
   */
  protected abstract emit(message: 'newMessage', payload: string, broadcast: true, socket: socketIo.Socket): void;
}
