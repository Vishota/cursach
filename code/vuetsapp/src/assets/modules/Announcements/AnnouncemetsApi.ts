import SingletonDuplicationError from "../Errors/SingletonDuplicationError";
import { post } from "../ajax"
import AnnouncementFeature from './AnnouncementFeature';

/*delete export then*/export class AnnouncementsApi {
    private static _instance : AnnouncementsApi;
    public static get instance() : AnnouncementsApi {
        if(this._instance === undefined) {
            this._instance = new AnnouncementsApi();
        }
        return this._instance;
    }
    private constructor () {
        if(AnnouncementsApi._instance !== undefined)
            throw new SingletonDuplicationError('AnnouncementsApi duplication');
    }

    async getTitle(id : number) : Promise<string> {
        return (await post('/api/announcements/get.php', {id, info: JSON.stringify( ['title'] )})).title;
    }
    async getOwner(id : number) : Promise<number> {
        return (await post('/api/announcements/get.php', {id, info: JSON.stringify( ['owner_id'] )})).owner_id;
    }
    async getDescription(id : number) : Promise<string> {
        return (await post('/api/announcements/get.php', {id, info: JSON.stringify( ['description'] )})).description;
    }
    async getPics(id: number) : Promise<string[]> {
        return JSON.parse((await post('/api/announcements/get.php', {id, info: JSON.stringify( ['pictures'] )})).pictures);
    }
    async getPrice(id: number) : Promise<string> {
        return (await post('/api/announcements/get.php', {id, info: JSON.stringify( ['price'] )})).price;
    }
    async getFeatures(id: number) : Promise<AnnouncementFeature[]> {
        var featuresObjArr : any[] = JSON.parse( (await post('/api/announcements/get.php', {id, info: JSON.stringify( ['features'] )})).features );
        
        var features : AnnouncementFeature[] = [];
        featuresObjArr.forEach(v=>{
            features.push( new AnnouncementFeature( v.left, v.right ) );
        });
        return features;
    }
    async editAnnouncement(id: number, announcementObject: any) {
        
    }
}
export default AnnouncementsApi.instance;