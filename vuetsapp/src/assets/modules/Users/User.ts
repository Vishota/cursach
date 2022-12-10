import UserInfo from "./UserInfo";
import type UsersApi from "./UsersApi";

export default 
class User {
    private _id : number;
    private _api : UsersApi;
    private _info : UserInfo;

    constructor(_id : number, api : UsersApi) {
        this._id = _id;
        this._api = api;
        this._info = new UserInfo(_id);
    }

    login() : string {
        if(this._info.login === undefined) {
            this._info.login = this._api.getLogin(this._id);
        }
        return this._info.login;
    }
    pic() : string {
        if(this._info.pic === undefined) {
            this._info.pic = this._api.getPic(this._id);
        }
        return this._info.pic;
    }
}