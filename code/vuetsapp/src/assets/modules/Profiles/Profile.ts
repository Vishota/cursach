import users from "./ProfilesApi";

export default
class Profile {
    private readonly _id: number;
    private _username?: string;
    private _pic?: string;

    constructor(id: number) {
        this._id = id;
    }

    get id() : number|undefined {
        return this._id;
    }
    get username() : string {
        if(this._username=== undefined) {
            users.getUsername(this._id)
                .then(r=> {
                    this._username = r.username;
                })
        }
        return this._username as string;
    }
    get pic() : string {
        if(this._pic === undefined) {
            users.getPic(this._id)
                .then(pic => {
                    this._pic = pic;
                })
        }
        return this._pic as string;
    }
}