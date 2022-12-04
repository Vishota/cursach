<script setup>
import { reactive } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import * as f from './assets/js/f.js'

const paths = await f.loadAsJson('./src/assets/json/paths.json').then(res => { console.log(res) });

const globalDataLoading = [
  f.loadAsJson('./src/assets/json/about.json').then(res => { console.log(res) })
];

//var about = await f.loadAsJson(paths.json.about);
//var lang = await f.loadLang(paths.json.langs, paths.json.lang_default);

const data = reactive({  })
</script>

<template>
  <header>
    <RouterLink to="/" class="sitename">{{''}}</RouterLink>
  </header>

  <RouterView />
</template>

<style scoped>
  header {
    background-color: var(--c-back-blocks);
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    height: var(--s-header);
    width: 100vw;
    padding: var(--s-small) var(--s-page-side-paddings);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .sitename {
    margin: 0;
    font-family: 'Kdam Thmor Pro', sans-serif;
    color: var(--c-accent);
    font-size: calc((var(--s-header) - 2 * var(--s-small)) * var(--sitename-size-coef));
    margin-top: var(--sitename-y);
    cursor: pointer;
  }
  menu {
    margin: 0;
    display: flex;
    gap: var(--s-small);
    font-size: var(--s-font-bigger);
    height: var(--s-font-bigger);
    margin-top: calc(((var(--s-header) - 2 * var(--s-small)) - var(--s-font-bigger)) / 2);
  }
  menu a {
    cursor: pointer;
  }
  menu a:hover {
    color: var(--c-accent);
  }
</style>
