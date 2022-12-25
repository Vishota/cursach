export default
class LazyProperty<T> {
    private _value? : T;
    constructor(load: (() => Promise<T>) ) {
        this.load = load;
    }
    public load: () => Promise<T>;
    public get value() {
        if(this._value === undefined) throw new NotInitializedPropertyError();
        return this._value;
    }
    public async init() : Promise<void> {
        this._value = await this.load();
    }
}

export class NotInitializedPropertyError extends Error {
    constructor() {
        super('NotInitializedPropertyError');
    }
}