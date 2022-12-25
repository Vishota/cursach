import type LazyProperty from "./LazyProperty";

export default
abstract class LazyObject {
    protected abstract _properties : Map<string, LazyProperty<any>>;
    public initAll() {
        this._properties.forEach(p=>{
            p.load();
        })
    }
    public init(names : string[]) {
        names.forEach(name => {
            try {
                this._properties.get(name)?.init();
            }
            catch (e) {
                new CannotInitPropertyError(name);
            }
        });
    }
    public get(propertyName : string) {
        if(!this._properties.has(propertyName)) throw new CannotInitPropertyError(propertyName);
        return (this._properties.get(propertyName) as LazyProperty<any>).value;
    };
    public async loadAndGet(propertyName : string) {
        try {
            await this._properties.get(propertyName)?.init();
            return this._properties.get(propertyName)?.value;
        }
        catch (e) {
            new CannotInitPropertyError(propertyName);
        }
    };
    public async toObject() {
        var object : any = {};
        (Array.from(this._properties.entries()))
            .forEach(p=>{
                object[p[0]] = p[1];
            })
        return object;
    }
}

class CannotInitPropertyError extends Error {
    constructor (propertyName : string) {
        super('Can\'t init property ' + propertyName);
    }
}