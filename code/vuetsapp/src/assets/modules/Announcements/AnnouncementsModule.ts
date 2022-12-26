import Announcement from "./Announcement";
import type AnnouncementsQuery from './AnnouncementsQuery';
import { post } from '@/assets/modules/ajax'

/*delete export then*/export class AnnouncementsModule {
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
    public async find(query: AnnouncementsQuery) : Promise<number[]> {
        return await post('/api/announcements/search.php', { query: query.toStringQuery() });
    }
    public async create(info : object) {
        return await post('/api/announcements/add.php', info);
    }
    public async edit(id: number, info : any) {
        var body = {
            id,
            title: info.title,
            description: info.description,
            price: info.price,
            features: JSON.stringify( info.features ),
            pics: JSON.stringify( info.pics ),
        }
        return await post('/api/announcements/edit.php', body);
    }
    public async remove(id: number) {
        return await post('/api/announcements/delete.php', {id});
    }
}
export default AnnouncementsModule.instance;
