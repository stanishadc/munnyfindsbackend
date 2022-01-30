class Auth {
    constructor() {
        this.authenticated = false
    }
    login(cb) {
        this.authenticated = true
        cb()
    }
    logout(cb) {
        this.authenticated = false
        localStorage.removeItem("MFUserId");
        cb()
    }
    isAuthenticated() {
        return this.authenticated;
    }
}
export default new Auth()