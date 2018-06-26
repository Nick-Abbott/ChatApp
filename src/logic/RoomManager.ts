import { ChatRoom } from './ChatRoom';
import { Room } from '../dataModel/Room';
import socketIo from 'socket.io';

type TRoomDef = {
  [name: string]: {
    capacity: number,
    multiply: boolean,
    permission: 'GUEST' | 'MEMBER' | 'ADMIN',
  };
};

export class RoomManager {

  private server: socketIo.Server;
  private rooms: { [name: string]: ChatRoom };

  constructor(server: socketIo.Server) {
    this.server = server;
    const roomDef: TRoomDef = require('../dataModel/Rooms.json');
    this.rooms =
      Object.keys(roomDef)
        .map((key) => {
          const room = new Room(roomDef[key].capacity, roomDef[key].multiply, roomDef[key].permission);
          const name = room.multiply ? `${key}1` : key;
          return new ChatRoom(name, room, server);
        })
        .reduce(
          (acc, room) => (acc[room.Name] = room) && acc,
          {} as { [name: string]: ChatRoom });
  }
}
