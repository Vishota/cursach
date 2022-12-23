export default 
class Theme {
    public get path(): string {
        return this._path;
    }
    public get name(): string {
        return this._name;
    }

    public constructor(private _path: string, private _name: string) {}
}