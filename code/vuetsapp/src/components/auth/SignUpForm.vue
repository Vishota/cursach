<script lang="ts" setup>
    import Lang from '@/assets/modules/Lang/Lang';
    import { openSignInWindow } from '@/assets/authwindows';
</script>
<template>
    <div class="wrapper">
        <input class="fullwidth in" :placeholder="Lang.get().login">
        <input class="fullwidth in" :placeholder="Lang.get().password" type="password">
        <input class="fullwidth in" :placeholder="Lang.get().passwordrepeat" type="password">
        <button class="butaccent">{{Lang.get().tosignup}}</button>
        <button class="butregular" @click="openSignInWindow">{{Lang.get().tosignin}}</button>
    </div>
</template>
<style scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        gap: calc(var(--s-base-indent) / 2)
    }
</style>