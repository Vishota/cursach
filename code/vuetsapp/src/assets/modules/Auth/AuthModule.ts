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
    private checkToken(id: number, token: string) {
        cookie.eraseCookie('id');
        cookie.eraseCookie('token');
        return null;
    }
    public async sendEmailCode(email: string) {
        return await auth.sendEmailCode(email);
    }
    public async checkEmailCode(email: string, code: string) {
        return await auth.checkEmailCode(email, code);
    }
    public async emailSignUp(email: string, code: string, username: string, password: string) {
        return await auth.emailSignUp(email, code, username, password)
    }
    public async checkEmailAvailability(email: string) {
        return await auth.checkEmailAvailability(email);
    }
}

export default AuthModule.instance;