class Auth {
  static onAuthChangeCallback = null;

  static login(token, name, id, isEmp, isCust) {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("id", id);
    localStorage.setItem("isEmp", isEmp);
    localStorage.setItem("isCust", isCust);
    if (Auth.onAuthChangeCallback) Auth.onAuthChangeCallback(token);
  }

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("isEmp");
    localStorage.removeItem("isCust");
    if (Auth.onAuthChangeCallback) Auth.onAuthChangeCallback(false);
  }

  static getToken() {
    return localStorage.getItem("token");
  }

  static getName() {
    return localStorage.getItem("name");
  }

  static getId() {
    return localStorage.getItem("id");
  }

  static getIsEmp() {
    return localStorage.getItem("isEmp");
  }

  static getIsCust() {
    return localStorage.getItem("isCust");
  }

  static isAuthenticated() {
    return !!Auth.getToken();
  }

  static onAuthChange(callback) {
    Auth.onAuthChangeCallback = callback;
  }
}

export default Auth;
