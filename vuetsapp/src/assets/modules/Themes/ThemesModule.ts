import Theme from './Theme';
import SingletonDuplicationError from '../Errors/SingletonDuplicationError';
import * as cookie from '../cookie'

class ThemesModule {
    private static _instance: ThemesModule;
    public static get instance() {
        if(this._instance === undefined) {
            this._instance = new ThemesModule()
        }
        return this._instance;
    }

    private _defaultTheme : HTMLLinkElement;
    private _chosenTheme? : HTMLLinkElement;

    constructor() {
        if(ThemesModule._instance !== undefined)
            throw new SingletonDuplicationError('ThemesModule duplication');
        this._defaultTheme = this.load(this.getAvailable()[0].path);
        document.head.appendChild(this._defaultTheme);
        this.init();
       /* setInterval(()=>{
            this.select(this.getAvailable()[Math.floor(Math.random()*this.getAvailable().length )].path)
        }, 1000) */
    }

    public getAvailable(): Array<Theme> {
        return [
            new Theme('/src/assets/css/themes/default.css', 'DefaultDark'),
            new Theme('/src/assets/css/themes/light.css', 'Light'),
            new Theme('/src/assets/css/themes/lightgreen.css', 'LightGreen'),
            new Theme('/src/assets/css/themes/reallydark.css', 'Darker')
        ];
    }
    private init() {
        var detected = this.detectSelected();
        if(detected !== null) {
            console.log(1)
            this.select(detected);
        }
    }
    private detectSelected(): string|null {
        return cookie.getCookie('theme');
    }
    private load(path: string): HTMLLinkElement {
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = path;
        return link;
    }
    public select(path: string) {
        if(this._chosenTheme !== undefined) this._chosenTheme.remove();
        this._chosenTheme = this.load(path);
        document.head.appendChild(this._chosenTheme);
        cookie.setCookie('theme', path, 365*100)
    }
}

export default ThemesModule.instance