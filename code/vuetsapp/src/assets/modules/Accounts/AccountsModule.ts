import SingletonDuplicationError from '../Errors/SingletonDuplicationError';
import * as ajax from "../ajax";
import * as cookie from "../cookie"

/*delete export then*/export class UsersModule {
    private static _instance : UsersModule;

    public static get instance() : UsersModule {
        if(this._instance === undefined) {
            this._instance = new UsersModule();
        }
        return this._instance;
    }
    private constructor() {
        if(UsersModule._instance !== undefined) throw new SingletonDuplicationError('UsersModule duplication');
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
    public async emailSignIn(email: string, password: string) {
        return await ajax.post('/api/auth/email/signin.php', {email, password});
    }
    public getMyId() : number|null {
        return cookie.getCookie('id') !== null ? parseInt(cookie.getCookie('id') as string) : null;
    }
    public logout() {
        cookie.eraseCookie('id');
        cookie.eraseCookie('token');
        window.location.reload();
    }
}

export default UsersModule.instance;