import * as f from './_preconnect.js';

export async function initApp(containerSelector, data) {
    const { paths, about, lang } = data;

    var appMixin = {
        data() { 
            return { paths, about, lang }
        }
    }

    let nf = Vue.defineComponent('not-found-page', {
        mixins: [appMixin],
        template: 'bbbegdsf'
    })
    
    var app = Vue.createApp({
        mixins: [appMixin],
        methods: {
            a() { 
                console.log(this.$refs);
                let div = document.createElement('div');
                document.querySelector('#test').appendChild(div);
                Vue.createApp(nf).mount(div);
            }
        }
    });
    app.component('header-component', {
        mixins: [appMixin],
        template: await f.loadAsText(paths.components.header)
    });
    
    app.mount(containerSelector);
    return app;
}