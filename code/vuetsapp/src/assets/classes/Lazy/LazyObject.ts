import type LazyProperty from "./LazyProperty";

export default
abstract class LazyObject {
    protected abstract properties : Map<string, LazyProperty<any>>;
    public initAll() {
        this.properties.forEach(p=>{
            p.load();
        })
    }
    public init(names : string[]) {
        names.forEach(name => {
            try {
                this.properties.get(name)?.init();
            }
            catch (e) {
                new CannotInitPropertyError(name);
            }
        });
    }
    public get(propertyName : string) {
        if(!this.properties.has(propertyName)) throw new CannotInitPropertyError(propertyName);
        return (this.properties.get(propertyName) as LazyProperty<any>).value;
    };
    public async loadAndGet(propertyName : string) {
        try {
            await this.properties.get(propertyName)?.init();
            return this.properties.get(propertyName)?.value;
        }
        catch (e) {
            new CannotInitPropertyError(propertyName);
        }
    };
}

class CannotInitPropertyError extends Error {
    constructor (propertyName : string) {
        super('Can\'t init property ' + propertyName);
    }
}