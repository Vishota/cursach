<script lang="ts" setup>

    import { openSignUpWindow } from '@/assets/authwindows';
</script>
<template>
    <div class="wrapper">
        <input class="fullwidth in" placeholder="Email">
        <input class="fullwidth in" placeholder="Пароль" type="password">
        <button class="butaccent">Войти</button>
        <button class="butregular" @click="openSignUpWindow">Хочу зарегистрироваться</button>
    </div>
</template>
<style scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        gap: calc(var(--s-base-indent) / 2)
    }
</style>