<script lang="ts" setup>
    import Lang from '@/assets/modules/Lang/Lang';
    import { openSignInWindow } from '@/assets/authwindows';
    import auth from '@/assets/modules/Auth/AuthModule'
    import { ref } from 'vue';
    
    var type = ref('');
    var emailCodeSent = ref(0);
    var err = ref('');
    var enteringLoginPassword = ref(type.value === 'email' && emailCodeSent.value === 1);

    async function sendEmailCode() {
        var emailin = document.querySelector('#email') as HTMLInputElement;
        var sent = await auth.sendEmailCode( emailin.value );
        if(sent.status && sent.sent) {
            emailCodeSent.value = 1;
            emailin.disabled = true;
        }
        else {
            emailCodeSent.value = -1;
            err.value = 'Код не отправлен, проверьте корректность данных';
        }
        console.log(sent);
    }
</script>
<template>
    <div class="wrapper">
        <div class="vertflex" v-show="type === ''">
            <h3>Выберите способ регистрации</h3>
            <div class="vertflex">
                <button class="butaccent" @click="type = 'email'">Email</button>
            </div>
        </div>
        <div class="vertflex" v-show="type === 'email'">
            <input placeholder="Email" class="in" id="email">
            <p class="errmsg" v-show="emailCodeSent === -1">{{ err }}</p>
            <button class="butaccent" @click="sendEmailCode" v-show="emailCodeSent !== 1">Получить код</button>
        </div>
        <div class="vertflex" v-show="enteringLoginPassword">
            <input placeholder="Email" class="in" id="username">
        </div>
        <button class="butregular" @click="openSignInWindow">Хочу войти</button>
    </div>
</template>
<style scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        gap: calc(var(--s-base-indent) / 2);
    }
    input:invalid {
        border: 1px solid var(--c-wrong);
    }
    .errmsg {
        color: var(--c-wrong);
        font-size: 14px;
        margin-top: calc(- var(--s-base-indent) / 2)
    }
</style>