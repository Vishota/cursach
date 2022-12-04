import * as f from './_preconnect.js';

var paths = await f.loadAsJson('/json/paths.json');
var about = await f.loadAsJson(paths.json.about);
var lang = await f.loadLang(paths.json.langs, paths.json.lang_default);

import {initApp} from './app.js';

const data = {
    paths: paths,
    about: about,
    lang: lang
}

var app = await initApp('#app', data);