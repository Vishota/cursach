import type LazyProperty from "./LazyProperty";

export default
abstract class LazyObject {
    protected abstract _properties : Map<string, LazyProperty<any>>;
    public async initAll() {
        var wait : Promise<void>[] = [];
        this._properties.forEach(p=>{
            wait.push(p.init());
        })
        await Promise.all(wait);
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
    public toObject() {
        var object : any = {};
        this.initAll();
        (Array.from(this._properties.entries()))
            .forEach(p=>{
                object[p[0]] = p[1].value;
            })
        return object;
    }
    public async toObjectAwait() {
        var object : any = {};
        await this.initAll();   
        (Array.from(this._properties.entries()))
            .forEach(p=>{
                object[p[0]] = p[1].value;
            })
        return object;
    }
    public forget() {
        this._properties = new Map<string, LazyProperty<any>>;
    }
}

class CannotInitPropertyError extends Error {
    constructor (propertyName : string) {
        super('Can\'t init property ' + propertyName);
    }
}