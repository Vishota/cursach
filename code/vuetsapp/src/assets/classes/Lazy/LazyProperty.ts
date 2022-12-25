export default
class LazyProperty<T> {
    private _value? : T;
    constructor(load: (() => Promise<T>) ) {
        this.load = load;
    }
    private load: () => Promise<T>;
    public get value() {
        //if(this._value === undefined) throw new NotInitializedPropertyError();
        this.init();
        return this._value as T;
    }
    public async init() : Promise<void> {
        if(this._value !== undefined) return;
        this._value = await this.load();
    }
}