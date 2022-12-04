<script setup>
</script>
<template>
    <header>
    <RouterLink to="/" class="sitename">{{about.sitename}}</RouterLink>
    <menu>
      <a>{{lang.signin}}</a>
      <a>{{lang.signup}}</a>
    </menu>
  </header>
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
    text-decoration: none;
  }
  menu {
    margin: 0;
    display: flex;
    gap: var(--s-small);
    font-size: var(--s-font-bigger);
    height: var(--s-font-bigger);
    margin-top: calc(((var(--s-header) - 2 * var(--s-small)) - var(--s-font-bigger)) / 2);
    padding: 0; 
  }
  menu a {
    cursor: pointer;
  }
  menu a:hover {
    color: var(--c-accent);
  }
</style>