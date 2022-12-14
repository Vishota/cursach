import SingletonDuplicationError from "../Errors/SingletonDuplicationError";

class Lang {
    private static _instance : Lang;
    public static get instance() {
        if(this._instance === undefined)
            this._instance = new Lang();
        return this._instance;
    }
    private constructor() {
        if(Lang._instance !== undefined)
            throw new SingletonDuplicationError('"Lang" duplication')
    }
    get():any {
        return {
            signin: "Войти",
            signup: "Зарегистрироваться"
        }
    }
}

export default Lang.instance;