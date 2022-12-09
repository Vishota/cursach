export default
    class Lang {
        private lang : object = {};
        static getLang() : string {
            return 'ru';// later
        }
        static setLang() : void {
            // later
        }
        loadLang(lang: string) : void {
            this.lang = {
                'login': 'Войти'
            }
        }
        get() : object {
            return this.lang;
        }
        
        constructor() {
            this.loadLang(Lang.getLang());
        }
    }