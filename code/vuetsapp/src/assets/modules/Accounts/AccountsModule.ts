import SingletonDuplicationError from '../Errors/SingletonDuplicationError';
import * as ajax from "../ajax";
import type Module from "../_abstract/Module";

/*delete export then*/export class AccountsModule implements Module {
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
}

export default AccountsModule.instance;