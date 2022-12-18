import SingletonDuplicationError from "../Errors/SingletonDuplicationError";
import type Api from "../_abstract/Api";

/*delete export then*/export class AnnouncementsApi implements Api {
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
        return 'Mercedes-Benz 1982 год';
    }
    async getDescription(id : number) : Promise<string> {
        return 'В хорошем состоянии 2.4дизель. Сварочных работ не требует. Снят с учета.';
    }
    async getPics(id: number) : Promise<Array<string>> {
        return ['https://yams.kufar.by/api/v1/kufar-ads/images/43/4301979529.jpg?rule=gallery',
            'https://yams.kufar.by/api/v1/kufar-ads/images/43/4361642762.jpg?rule=gallery',
            'https://yams.kufar.by/api/v1/kufar-ads/images/43/4370166081.jpg?rule=gallery',
            'https://yams.kufar.by/api/v1/kufar-ads/images/43/4395736038.jpg?rule=gallery',
            'https://yams.kufar.by/api/v1/kufar-ads/images/43/4312782676.jpg?rule=gallery',
            'https://yams.kufar.by/api/v1/kufar-ads/images/43/4398015866.jpg?rule=gallery',
            'https://yams.kufar.by/api/v1/kufar-ads/images/43/4306539185.jpg?rule=gallery',
            'https://yams.kufar.by/api/v1/kufar-ads/images/43/4368482246.jpg?rule=gallery'
        ]
    }
    async getPrice(id: number) : Promise<string> {
        return '10$';
    }
    async getFeatures(id: number) {
        return [
            { name: 'somefeature', value: '10' },
            { name: 'anotherfeature', value: '999' },
            { name: 'boolfeature', value: true },
        ]
    }
    async getCount() {

    }
}
export default AnnouncementsApi.instance;