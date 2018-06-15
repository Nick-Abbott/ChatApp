import { Exception } from '../Exception';

export class ServerException extends Exception {
  constructor(name: string, message: string, code: number) {
    super(name, message, code, 'Server');
  }
}
