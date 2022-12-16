<script setup lang="ts">
    import ThemesSelector from './themes/ThemesSelector.vue';
    import Lang from '@/assets/modules/Lang/Lang';
</script>
<template>
    <footer class="pagewidth pagepadding">
        {{ Lang.get().theme }}: <ThemesSelector />
    </footer>
</template>
<style scoped>
    footer {
        background-color: var(--c-blocks);
        display: flex;
        justify-content: center;
        gap: var(--s-base-indent);
        flex: 0 0 auto;
        margin-top: var(--s-base-indent);
        padding-top: 40px;
        padding-bottom: 60px;
    }
</style>