import api from './AnnouncemetsApi';
import type AnnouncementFeature from './AnnouncementFeature';
import LazyObject from '../../classes/Lazy/LazyObject';
import LazyProperty from '@/assets/classes/Lazy/LazyProperty';

export default
class Announcement extends LazyObject {
    private readonly _id : number;
    protected properties: Map<string, LazyProperty<any>> = new Map([
        [ 'title', new LazyProperty<any>(async () => { return await api.getTitle(this._id) }) ],
        [ 'description', new LazyProperty<string>(async () => { return await api.getDescription(this._id) }) ],
        [ 'pics', new LazyProperty<string[]>( async () => { return await api.getPics(this._id) } ) ],
        [ 'price', new LazyProperty<string>( async () => { return await api.getPrice(this._id) } ) ],
        [ 'owner', new LazyProperty<number>( async () => { return (await api.getOwner(this._id)) } ) ],
        [ 'features', new LazyProperty<AnnouncementFeature[]>( async () => { return await api.getFeatures(this._id); }) ]
    ]);
    
    constructor (id:number) {
        super();
        this._id = id;
    }
}
