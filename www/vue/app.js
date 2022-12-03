import * as f from './_preconnect.js';

export async function initApp(containerSelector, data) {
    const { paths, about, lang } = data;
    const parts = {
        header: await f.loadAsText(paths.json.header)
    };

    var app = Vue.createApp({
        data() {
            return {data, parts};
        }
    });
    app.mount(containerSelector);

    return app;
}