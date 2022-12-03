import * as f from './_preconnect.js';

var paths = await f.loadAsJson('/json/paths.json');
var about = await f.loadAsJson(paths.json.about);
var lang = await f.loadAsJson(paths.json.langs + f.getLang() + '.json');
var routes = await f.loadAsJson(paths.json.routes);

import {initApp} from './app.js';

const data = {
    paths: paths,
    about: about,
    lang: lang,
    routes: routes
}

var app = initApp('#header', data);