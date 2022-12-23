import SingletonDuplicationError from "../Errors/SingletonDuplicationError";
import Profile from "./Profile";

/*delete export then*/export class ProfilesModule {
    private static _instance : ProfilesModule;
    public static get instance() {
        if (!ProfilesModule._instance) {
            ProfilesModule._instance = new ProfilesModule();
        }
        return ProfilesModule._instance;
    }
    private constructor() {
        if(ProfilesModule._instance !== undefined)
            throw new SingletonDuplicationError('"ProfilesModule" duplication')
    }

    private _cached : Map<number, Profile> = new Map;
    public get(id : number) : Profile {
        if(!this._cached.has(id)) {
            this._cached.set(id, new Profile(id));
        }
        return this._cached.get(id) as Profile;
    }
}

export default ProfilesModule.instance;