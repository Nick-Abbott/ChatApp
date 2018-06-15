import { ServerException } from './ServerException';

export class InvalidPortException extends ServerException {
  constructor(port: any) {
    super('InvalidPortException', `${port} is an invalid port`, 500);
  }
}
