import SingletonDuplicationError from "../Errors/SingletonDuplicationError";

class AnnouncementsApi {
    private static _instance : AnnouncementsApi;
    public static get instance() : AnnouncementsApi {
        if(this._instance === undefined) {
            this._instance = new AnnouncementsApi();
        }
        console.log(this._instance);
        return this._instance;
    }
    private constructor () {
        if(AnnouncementsApi._instance !== undefined)
            throw new SingletonDuplicationError('AnnouncementsApi duplication');
    }

    async getTitle(id : number) : Promise<string> {
        return 'title ' + id;
    }
    async getDescription(id : number) : Promise<string> {
        return 'description ' + id + 'dslg.njasdl asiluh iuarsfiosarjo текст какой-то блин ааыа текст какой-то блин ааыа текст какой-то блин ааыа текст какой-то блин ааыа';
    }
    async getPics(_id: number) : Promise<Array<string>> {
        return ['https://pbs.twimg.com/media/D678wMfW0AAs733.jpg', 'https://avatars.mds.yandex.net/i?id=e8d5cfaeaa947002571cfe7a50e1930a016a7682-8244056-images-thumbs&n=13&exp=1']
    }
    async getPrice(_id: number) : Promise<string> {
        return '10$';
    }
    async getFeatures(_id: number) {
        return [
            { name: 'somefeature', value: '10' },
            { name: 'anotherfeature', value: '999' },
            { name: 'boolfeature', value: true },
        ]
    }
}
export default AnnouncementsApi.instance;