import SingletonDuplicationError from "../Errors/SingletonDuplicationError";
import User from "./User";

class UsersModule {
    private static _instance : UsersModule;
    public static get instance() {
        if (!UsersModule._instance) {
            UsersModule._instance = new UsersModule();
        }
        return UsersModule._instance;
    }
    private constructor() {
        if(UsersModule._instance !== undefined)
            throw new SingletonDuplicationError('"UsersModule" duplication')
    }

    private _cached : Map<number, User> = new Map;
    public get(id : number) : User {
        if(!this._cached.has(id)) {
            this._cached.set(id, new User(id));
        }
        return this._cached.get(id) as User;
    }
}

export default UsersModule.instance;