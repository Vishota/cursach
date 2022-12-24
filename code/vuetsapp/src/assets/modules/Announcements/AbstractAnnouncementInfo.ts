import api from './AnnouncemetsApi';
import type AnnouncementFeature from './AnnouncementFeature';

export default
abstract class AbstractAnnouncementInfo {
    protected _title? : string;
    protected _description? : string;
    protected _pics? : Array<string>;
    protected _price? : string;
    protected _features? : Array<AnnouncementFeature>;
    protected _owner? : number;

    public get title() : string {
        return this._title as string;
    }
    public get owner() : number {
        return this._owner as number;
    }
    public get pics() : Array<string> {
        return this._pics as Array<string>;
    }
    public get description() : string {
        return this._description as string;
    }
    public get price() : string {
        return this._price as string;
    }
    public get features() : Array<AnnouncementFeature> {
        return this._features as Array<AnnouncementFeature>;
    }
}
