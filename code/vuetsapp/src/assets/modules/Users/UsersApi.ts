import SingletonDuplicationError from "../Errors/SingletonDuplicationError";

/*delete export then*/export class UsersApi {
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
    async getPic(id: number) {
        return 'https://www.meme-arsenal.com/memes/ce3dd0d28f702bd9fb6c533e2cbe4b37.jpg';
    }
    async getCity(id: number) {
        return 'Минск, Беларусь'
    }
}
export default UsersApi.instance;