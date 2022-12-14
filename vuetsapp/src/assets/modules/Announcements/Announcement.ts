import api from './AnnouncemetsApi';

export default
class Announcement {
    private readonly _id : number;
    private _title? : string;
    private _description? : string;
    private _pics? : Array<string>;
    private _price? : number;

    constructor (id:number) {
        this._id = id;
    }

    public get title() : string {
        if(this._title === undefined) {
            api.getTitle(this._id)
                .then(title => {
                    this._title = title;
                })
        }
        return this._title as string;
    }
    public get pics() : Array<string> {
        if(this._pics === undefined) {
            api.getPics(this._id)
                .then(pics => {
                    this._pics = pics;
                })
        }
        return this._pics as Array<string>;
    }
    public get description() : string {
        if(this._description === undefined) {
            api.getDescription(this._id)
                .then(description => {
                    this._description = description;
                })
        }
        return this._description as string;
    }
    public get price() : number {
        if(this._price === undefined) {
            api.getPrice(this._id)
                .then(price => {
                    this._price = price;
                })
        }
        return this._price as number;
    }
}