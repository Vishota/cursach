<script lang="ts" setup>
    import { openSignInWindow, openSignUpWindow } from '@/assets/authwindows';
    import accounts from '@/assets/modules/Accounts/AccountsModule';
    import { ref } from 'vue';
    import ProfileLink from '../users/ProfileLink.vue';

    var myid = ref( accounts.getMyId() );
</script>
<template>
    <menu v-show="myid === null">
        <a class="pointer hoveraccent" @click="openSignInWindow">Войти</a>
        <a class="pointer hoveraccent desktop" @click="openSignUpWindow">Зарегистрировться</a>
    </menu>
    <menu v-show="myid !== null">
        <ProfileLink :id="myid" class="pointer hoveraccent" />
    </menu>
</template>
<style scoped>
    menu {
        display: flex;
        gap: var(--s-base-indent);
        padding: 0;
    }
</style>