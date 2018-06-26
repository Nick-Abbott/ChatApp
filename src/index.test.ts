import Server from './server/Server';
jest.mock('./server/server');

describe('Main', () => {
  it('Should create a new Server', () => {
    require('./index');
    expect(Server.bootstrap).toHaveBeenCalledTimes(1);
  });
});
