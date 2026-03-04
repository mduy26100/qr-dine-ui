class TokenManager {
  constructor() {
    this.accessToken = null;
    this.expiresIn = null;
    this.refreshPromise = null;
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
    this.refreshPromise = null;
  }

  getExpireIn() {
    return this.expiresIn;
  }

  getRefreshPromise() {
    return this.refreshPromise;
  }

  setRefreshPromise(promise) {
    this.refreshPromise = promise;
  }

  clearRefreshPromise() {
    this.refreshPromise = null;
  }

  reset() {
    this.clearToken();
  }
}

export const tokenManager = new TokenManager();
