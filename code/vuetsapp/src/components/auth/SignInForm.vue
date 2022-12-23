<script lang="ts" setup>
    import { openSignUpWindow } from '@/assets/authwindows';
    import accounts from '@/assets/modules/Accounts/AccountsModule';
    import { ref } from 'vue';
    import router from '@/router';
    import { closeWindow } from '@/assets/authwindows';

    var showWrongInput = ref(false);
    function setShowWrongInput(value: boolean) {
        showWrongInput.value = value;
    }
    async function signIn() {
        var id = (await accounts.emailSignIn((document.querySelector('#email') as HTMLInputElement).value, (document.querySelector('#password') as HTMLInputElement).value)).account;
        if (id === false) {
            showWrongInput.value = true;
            return;
        }
        router.push('/profiles/'+id);
        closeWindow();
    }
</script>
<template>
    <div class="wrapper">
        <input id="email" @input="setShowWrongInput(false)" class="fullwidth in" placeholder="Email">
        <input id="password" @input="setShowWrongInput(false)" class="fullwidth in" placeholder="Пароль" type="password">
        <p class="errmsg" v-show="showWrongInput">Введенные вами данные не подходят. Попробуйте еще раз</p>
        <button class="butaccent" @click="signIn">Войти</button>
        <button class="butregular" @click="openSignUpWindow">Хочу зарегистрироваться</button>
    </div>
</template>
<style scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        gap: calc(var(--s-base-indent) / 2)
    }
    .errmsg, .hint {
        font-size: 14px;
    }
    .errmsg {
        color: var(--c-wrong);
    }
</style>