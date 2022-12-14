<script setup lang="ts">
    import HeaderMenu from './HeaderMenu.vue';
</script>
<template>
    <div class="pagewidth pagepadding"></div>
    <header class="pagewidth pagepadding spacebetween">
        <RouterLink to="/" class="sitename">CURSACH</RouterLink>
        <HeaderMenu />
    </header>
</template>
<style scoped>
    * {
        --header-h: 40px;
    }
    div {
        height: var(--header-h);
        margin-bottom: var(--s-base-indent);
    }
    header {
        height: var(--header-h);
        position: fixed;
        top: 0; left: 0;
        background-color: var(--c-blocks);
        display: flex;
        align-items: center;
    }
    .sitename {
        color: var(--c-accent);
        margin: 0;
        font-size: calc(var(--header-h) - var(--s-base-indent));
        font-family: 'Oswald', sans-serif;
    }
</style>