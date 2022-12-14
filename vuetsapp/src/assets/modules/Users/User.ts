import users from "./UsersApi";

export default
class User {
    private readonly _id: number;
    private _login?: string;

    constructor(id: number) {
        this._id = id;
    }

    get id() : number|undefined {
        return this._id;
    }
    get login() : string {
        if(this._login === undefined) {
            users.getLogin(this._id)
            .then(login => {
                this._login = login;
            })
        }
        return this._login as string;
    }
}