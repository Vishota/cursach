export default
class AnnouncementFeature {
    public get name(): string {
        return this._name;
    }
    public get value(): string {
        return this._value;
    }
    public set name(v : string) {
        this._name = v;
    }
    public set value(v : string) {
        this._value = v;
    }
    constructor(private _name : string = '', private _value : string = '') {}
}