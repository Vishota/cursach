import users from "./ProfilesApi";
import LazyObject from '../../classes/Lazy/LazyObject';
import LazyProperty from "@/assets/classes/Lazy/LazyProperty";

export default
class Profile extends LazyObject {
    private readonly _id: number;
    
    protected _properties : Map<string, LazyProperty<any>> = new Map<string, LazyProperty<any>>([
        [ 'username', new LazyProperty<string>(async ()=>{return await users.getUsername(this._id)}) ],
        [ 'pic', new LazyProperty<string>(async ()=>{return await users.getPic(this._id)}) ]
    ]);

    constructor(id: number) {
        super();
        this._id = id;
    }

    get id() : number|undefined {
        return this._id;
    }
}