import Announcement from "./Announcement";

class AnnouncementsModule {
    private static _instance : AnnouncementsModule;
    public static get instance() : AnnouncementsModule {
        if(this._instance === undefined) {
            this._instance = new AnnouncementsModule();
        }
        return this._instance;
    }

    private _cached : Map<number, Announcement> = new Map;
    public get(id : number) : Announcement {
        if(!this._cached.has(id)) {
            this._cached.set(id, new Announcement(id));
        }
        return this._cached.get(id) as Announcement;
    }
    public getIds() : Array<number> {
        return [1, 2, 3];
    }
}
export default AnnouncementsModule.instance;