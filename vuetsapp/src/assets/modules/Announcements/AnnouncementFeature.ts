export default
class AnnouncementFeature {
    public get name(): string {
        return this._name;
    }
    public get value(): string {
        return this._value;
    }
    constructor(private _name : string, private _value : string) {}
}