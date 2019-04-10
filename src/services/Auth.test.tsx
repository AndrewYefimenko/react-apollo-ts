import Auth from './Auth';

describe('<Auth />', () => {
  beforeEach(() => {
    Auth.logout();
  });
  
  it('should authenticate', () => {
    Auth.login('1234');
    expect(Auth.getToken()).toEqual('1234');
  });
  
  it('should return true', () => {
    Auth.login('1234');
    expect(Auth.isLoggedIn()).toEqual(true);
  });
  
  it('should log out', () => {
    Auth.login('1234');
    Auth.logout();
    expect(Auth.isLoggedIn()).toEqual(false);
  });
  
  it('should notify subscribers on login/logout events', () => {
    const subscriber = jest.fn();
    Auth.subscribe('test', subscriber);
    Auth.login('11111111');
    Auth.logout();
    Auth.unsubscribe('test');
    expect(subscriber.mock.calls.length).toBe(2);
  });
});