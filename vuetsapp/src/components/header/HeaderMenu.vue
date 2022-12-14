<script lang="ts" setup>
    import lang from '@/assets/modules/Lang/Lang';
    
</script>
<template>
    <menu>
        <a>{{lang.get().signin}}</a>
        <a>{{lang.get().signup}}</a>
    </menu>
</template>
<style scoped>
    menu {
        display: flex;
        gap: var(--s-base-indent);
    }
</style>