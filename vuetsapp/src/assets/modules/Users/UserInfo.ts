import type UsersApi from "./UsersApi";

export default 
class UserInfo {
    private _id: number;
    private _login?: string | undefined;
    private _pic?: string | undefined;
    

    constructor (id: number) {
        this._id = id; 
    }

    
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get login(): string | undefined {
        return this._login;
    }
    public set login(value: string | undefined) {
        this._login = value;
    }
    public get pic(): string | undefined {
        return this._pic;
    }
    public set pic(value: string | undefined) {
        this._pic = value;
    }
}