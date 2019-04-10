export default class Auth {
  private static storage: Storage = localStorage;
  private static listeners: {[id: string]: () => any} = {};
  
  public static login(token: string) {
    Auth.storage.setItem('token', token);
    Auth.notifyStatusChange();
  }
  
  public static isLoggedIn(): boolean {
    return !!Auth.storage.getItem('token');
  }
  
  public static logout(): void {
    Auth.storage.removeItem('token');
    Auth.notifyStatusChange();
  }
  
  public static getToken(): string | null {
    return Auth.storage.getItem('token');
  }
  
  public static subscribe(id: string, callback: () => void) {
    this.listeners[id] = callback;
  }

  public static unsubscribe(id: string) {
    delete this.listeners[id];
  }
  
  private static notifyStatusChange() {
    Object.values(this.listeners).forEach(cb => cb());
  }
}
