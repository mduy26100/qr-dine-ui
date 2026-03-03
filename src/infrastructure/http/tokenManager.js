class TokenManager {
  constructor() {
    this.accessToken = null;
    this.expiresIn = null;
    this.isRefreshing = false;
    this.refreshSubscribers = [];
  }

  setToken(token, expiresInMinutes = 15) {
    this.accessToken = token;
    this.expiresIn = expiresInMinutes * 60 * 1000;
  }

  getToken() {
    return this.accessToken;
  }

  hasToken() {
    return !!this.accessToken;
  }

  clearToken() {
    this.accessToken = null;
    this.expiresIn = null;
    this.isRefreshing = false;
    this.refreshSubscribers = [];
  }

  getExpireIn() {
    return this.expiresIn;
  }

  setRefreshing(state) {
    this.isRefreshing = state;
  }

  isTokenRefreshing() {
    return this.isRefreshing;
  }

  addRefreshSubscriber(callback) {
    this.refreshSubscribers.push(callback);
  }

  notifyRefreshSubscribers(newToken) {
    this.refreshSubscribers.forEach((callback) => {
      callback(newToken);
    });
    this.refreshSubscribers = [];
  }

  failRefreshSubscribers() {
    this.refreshSubscribers = [];
  }

  reset() {
    this.clearToken();
  }
}

export const tokenManager = new TokenManager();
