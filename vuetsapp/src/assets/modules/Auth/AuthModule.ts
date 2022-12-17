import auth from "./AuthApi";
import SingletonDuplicationError from '../Errors/SingletonDuplicationError';
import * as cookie from "../cookie";
import type Module from "../_abstract/Module";

/*delete export then*/export class AuthModule implements Module {
    private static _instance : AuthModule;
    public static get instance() : AuthModule {
        if(this._instance === undefined) {
            this._instance = new AuthModule();
        }
        return this._instance;
    }
    private constructor() {
        if(AuthModule._instance !== undefined) throw new SingletonDuplicationError('AuthModule duplication');
    }
    private checkToken(id: number, token: string) : number|null {
        cookie.eraseCookie('id');
        cookie.eraseCookie('token');
        return null;
    }
    public signin(login: string, password: string) : number|null {
        return null;
    }
    public check() : number|null {
        return this.checkToken(parseInt(cookie.getCookie('id') as string), cookie.getCookie('token') as string);
    }
}

export default AuthModule.instance;