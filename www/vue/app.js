import * as f from './_preconnect.js';
export async function initApp(container, data) {
    let html = {
        home: await f.loadAsText(data.html.header)
    }
}