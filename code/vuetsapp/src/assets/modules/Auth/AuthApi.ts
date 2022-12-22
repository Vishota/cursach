import type Api from "../_abstract/Api";
import * as ajax from "../ajax";

/*delete export then*/export class AuthApi implements Api {
    private static _instance : AuthApi;
    public static get instance() : AuthApi {
        if(this._instance === undefined) {
            this._instance = new AuthApi();
        }
        return this._instance;
    }
    public async sendEmailCode(email: string) {
        return await ajax.post('/api/auth/email/sendcode.php', {email});
    }
    public async checkEmailCode(email: string, code: string) {
        return await ajax.post('/api/auth/email/checkcode.php', {email, code});
    }
    public async emailSignUp(email: string, code: string, username: string, password: string) {
        return await ajax.post('/api/auth/email/signup.php', {email, code, username, password});
    }
    public async checkEmailAvailability(email: string) {
        return await ajax.post('/api/auth/email/checkemail.php', {email});
    }
}

export default AuthApi.instance;