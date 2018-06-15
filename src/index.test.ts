import server from './server/server';
jest.mock('./server/server');

describe('Main', () => {
  it('Should create a new Server', () => {
    require('./index');
    expect(server.bootstrap).toHaveBeenCalledTimes(1);
  });
});
