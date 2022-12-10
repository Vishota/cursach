import type UserInfo from "./UserInfo";

export default 
class UsersApi {
    private static _instance: UsersApi = new UsersApi();
    public static get instance(): UsersApi {
        return UsersApi._instance;
    }

    getLogin(id : number) : string {
        return 'user'+id
    }
    getPic(id : number) : string {
        return 'https://www.meme-arsenal.com/memes/ce3dd0d28f702bd9fb6c533e2cbe4b37.jpg';
    }
}