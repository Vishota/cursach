import api from './AnnouncemetsApi';
import type AnnouncementFeature from './AnnouncementFeature';
import AbstractAnnouncementInfo from './AbstractAnnouncementInfo';

export default
class Announcement extends AbstractAnnouncementInfo {
    private readonly _id : number;

    constructor (id:number) {
        super();
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
    public get owner() : number {
        if(this._owner === undefined) {
            api.getOwner(this._id)
                .then(owner => {
                    this._owner = owner;
                    console.log(this._owner);
                })
        }
        return this._owner as number;
    }
    public get pics() : Array<string> {
        if(this._pics === undefined) {
            api.getPics(this._id)
                .then(pics => {
                    this._pics = JSON.parse(pics);
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
    public get price() : string {
        if(this._price === undefined) {
            api.getPrice(this._id)
                .then(price => {
                    this._price = price;
                })
        }
        return this._price as string;
    }
    public get features() : Array<AnnouncementFeature> {
        if(this._features === undefined) {
            this._features = [];
            api.getFeatures(this._id)
                .then((arr) => {
                    this._features = JSON.parse(arr);
                })
        }
        return this._features;
    }
    
    public async fullInit() {
        await Promise.all([
            this._description,
            this._features,
            this._owner,
            this._pics,
            this._price,
            this._title]);
    }
}