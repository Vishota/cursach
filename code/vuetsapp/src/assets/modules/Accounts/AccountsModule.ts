import SingletonDuplicationError from '../Errors/SingletonDuplicationError';
import * as ajax from "../ajax";

/*delete export then*/export class AccountsModule {
    private static _instance : AccountsModule;
    public static get instance() : AccountsModule {
        if(this._instance === undefined) {
            this._instance = new AccountsModule();
        }
        return this._instance;
    }
    private constructor() {
        if(AccountsModule._instance !== undefined) throw new SingletonDuplicationError('AccountsModule duplication');
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
}

export default AccountsModule.instance;