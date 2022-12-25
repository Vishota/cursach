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
        return (await post('/api/announcements/title.php', {id})).title;
    }
    async getOwner(id : number) : Promise<number> {
        return (await post('/api/announcements/owner.php', {id})).owner;
    }
    async getDescription(id : number) : Promise<string> {
        return (await post('/api/announcements/description.php', {id})).description;
    }
    async getPics(id: number) : Promise<string[]> {
        return JSON.parse((await post('/api/announcements/pics.php', {id})).pics);
    }
    async getPrice(id: number) : Promise<string> {
        return (await post('/api/announcements/price.php', {id})).price;
    }
    async getFeatures(id: number) : Promise<AnnouncementFeature[]> {
        var featuresObjArr : any[] = JSON.parse( (await post('/api/announcements/features.php', {id})).features );
        
        var features : AnnouncementFeature[] = [];
        featuresObjArr.forEach(v=>{
            features.push( new AnnouncementFeature( v.left, v.right ) );
        });
        return features;
    }
}
export default AnnouncementsApi.instance;