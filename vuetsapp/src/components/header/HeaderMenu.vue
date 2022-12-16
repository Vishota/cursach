<script lang="ts" setup>
    import lang from '@/assets/modules/Lang/Lang';

    import { openSignInWindow, openSignUpWindow } from '@/assets/authwindows';
</script>
<template>
    <menu>
        <a class="pointer hoveraccent" @click="openSignInWindow">{{lang.get().tosignin}}</a>
        <a class="pointer hoveraccent" @click="openSignUpWindow">{{lang.get().tosignup}}</a>
    </menu>
</template>
<style scoped>
    menu {
        display: flex;
        gap: var(--s-base-indent);
    }
</style>