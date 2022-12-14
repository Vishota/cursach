import SingletonDuplicationError from "../Errors/SingletonDuplicationError";

class UsersApi {
    private static _instance : UsersApi;
    static get instance() : UsersApi {
        if(this._instance === undefined)
            this._instance = new UsersApi();
        return this._instance;
    }
    private constructor() {
        if(UsersApi._instance !== undefined)
            throw new SingletonDuplicationError('"UsersApi" duplication');
    }

    async getLogin(id : number) : Promise<string> {
        return 'testlogin' + id;
    }
}
export default UsersApi.instance;