<script lang="ts" setup>
    import Lang from '@/assets/modules/Lang/Lang';

    import { openSignUpWindow } from '@/assets/authwindows';
</script>
<template>
    <div class="wrapper">
        <input class="fullwidth in" :placeholder="Lang.get().login">
        <input class="fullwidth in" :placeholder="Lang.get().password" type="password">
        <button class="butaccent">{{Lang.get().tosignin}}</button>
        <button class="butregular" @click="openSignUpWindow">{{Lang.get().tosignup}}</button>
    </div>
</template>
<style scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        gap: calc(var(--s-base-indent) / 2)
    }
</style>