import Theme from './Theme';
import SingletonDuplicationError from '../Errors/SingletonDuplicationError';
import * as cookie from '../cookie'
import type Module from '../_abstract/Module';

/*delete export then*/export class ThemesModule implements Module {
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
            new Theme('/cssthemes/default.css', 'DefaultDark'),
            new Theme('/cssthemes/light.css', 'Light'),
            new Theme('/cssthemes/lightgreen.css', 'LightGreen'),
            new Theme('/cssthemes/reallydark.css', 'Darker'),
            new Theme('/cssthemes/dont.css', 'Don\'t'),
            new Theme('/cssthemes/34.css', '34')
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
        cookie.setCookie('theme', path, 365*100);
    }
}

export default ThemesModule.instance