import type Api from "../_abstract/Api";

/*delete export then*/export class AuthApi implements Api {
    private static _instance : AuthApi;
    public static get instance() : AuthApi {
        if(this._instance === undefined) {
            this._instance = new AuthApi();
        }
        return this._instance;
    }
}

export default AuthApi.instance;