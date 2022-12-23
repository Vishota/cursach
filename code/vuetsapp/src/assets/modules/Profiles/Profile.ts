import users from "./ProfilesApi";

export default
class Profile {
    private readonly _id: number;
    private _login?: string;
    private _pic?: string;
    private _city?: string;

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
    get pic() : string {
        if(this._pic === undefined) {
            users.getPic(this._id)
                .then(pic => {
                    this._pic = pic;
                })
        }
        return this._pic as string;
    }
    get city() : string {
        if(this._city === undefined) {
            users.getCity(this._id)
                .then(city => {
                    this._city = city;
                })
        }
        return this._city as string;
    }
    fullInit() {
        this.id;
        this.login;
        this.pic;
        this.city;
    }
}