import SingletonDuplicationError from "../Errors/SingletonDuplicationError";
import * as ajax from "../ajax";

/*delete export then*/export class ProfilesApi {
    private static _instance : ProfilesApi;
    static get instance() : ProfilesApi {
        if(this._instance === undefined)
            this._instance = new ProfilesApi();
        return this._instance;
    }
    private constructor() {
        if(ProfilesApi._instance !== undefined)
            throw new SingletonDuplicationError('"ProfilesApi" duplication');
    }

    async getUsername(id : number) {
        return (await ajax.post('/api/profiles/username.php', { id })).username;
    }
    async getPic(id: number) {
        return (await ajax.post('/api/profiles/pic.php', { id })).picture;
    }
}
export default ProfilesApi.instance;