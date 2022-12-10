import User from "./User";
import UsersApi from "./UsersApi";

export default
class UsersModule {
    private static _instance : UsersModule = new UsersModule();
    public static get instance() : UsersModule {
        return this._instance;
    }

    constructor() {
        this._users = new Map();
        this._api = UsersApi.instance;
    }

    private _users: Map<number, User>;
    private _api: UsersApi;

    get(id : number): User {
        if(!this._users.has(id)) this._users.set(id, new User(id, this._api));
        return this._users.get(id) as User;
    }
}