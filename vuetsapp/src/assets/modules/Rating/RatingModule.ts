import SingletonDuplicationError from '../Errors/SingletonDuplicationError';
class RatingModule {
    private static _instance: RatingModule;
    public static get instance(): RatingModule {
        if(this._instance === undefined) this._instance = new RatingModule();
        return this._instance;
    }
    private constructor() {
        if(RatingModule._instance !== undefined) throw new SingletonDuplicationError('RatingModule duplication');
    }
    public average(id: number) {
        return 3.9;
    }
}
export default RatingModule.instance;