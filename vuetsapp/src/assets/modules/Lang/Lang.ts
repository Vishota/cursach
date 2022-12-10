export default
    class Lang {
        private static _instance: Lang = new Lang();
        private _lang: object = {};

        public static get instance(): Lang {
            return this._instance;
        }

        static getChosenLangName() : string {
            return 'ru';// later
        }
        static choose(langname : string) : void {
            // later
        }

        load(lang: string) : void {
            this._lang = {
                login: 'Войти'
            }
        }
        get(): object {
            return this._lang;
        }
        
        constructor() {
            this.load(Lang.getChosenLangName());
        }
    }