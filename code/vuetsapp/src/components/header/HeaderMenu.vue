<script lang="ts" setup>
    import { openSignInWindow, openSignUpWindow } from '@/assets/authwindows';
</script>
<template>
    <menu>
        <a class="pointer hoveraccent" @click="openSignInWindow">Войти</a>
        <a class="pointer hoveraccent desktop" @click="openSignUpWindow">Зарегистрировться</a>
    </menu>
</template>
<style scoped>
    menu {
        display: flex;
        gap: var(--s-base-indent);
        padding: 0;
    }
</style>