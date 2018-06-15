import express from 'express';
import http from 'http';

import { InvalidPortException } from '../Exceptions';

const PORT = 3000;

export default class Server {

  private app: express.Application;
  private server: http.Server;

  /**
   * @returns A new server object using port 3000 or the process.env.PORT
   */
  public static bootstrap() {
    console.log('WWEEEOO');
    return new Server(this.normalizePort(process.env.PORT || PORT));
  }

  /**
   * Normalizes a port to a value usable by an HTTP server
   * @param val A valid port number or a named pipe to listen on
   * @returns A valid port to listen on
   * @throws {{InvalidPortException}}
   */
  private static normalizePort(val: any): any {
    const port = parseInt(val, 10);

    if (isNaN(port)) return val; // named pipe
    if (port >= 0) return port; // port number
    throw (new InvalidPortException(port));
  }

  constructor(port: any) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.config(port);
    this.listen();
  }

  /**
   * Stops the running HTTP server
   */
  public stop(): void {
    this.server.close();
  }

  /**
   * Configures the express app with middleware and settings
   * @param port The port number or named pipe to listen on
   */
  private config(port: any): void {
    this.app.set('port', port);
  }

  /**
   * Starts the HTTP server on the port stored inside the express app
   */
  private listen(): void {
    this.server.listen(this.app.get('port'), () => {
      console.log(`Server listening on port ${this.app.get('port')}`);
    });
  }

}
