class AuthApi {
    private static _instance : AuthApi;
    public static get instance() : AuthApi {
        if(this._instance === undefined) {
            this._instance = new AuthApi();
        }
        return this._instance;
    }
}

export default AuthApi.instance;