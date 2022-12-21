<script lang="ts" setup>
    import Lang from '@/assets/modules/Lang/Lang';
    import { openSignInWindow } from '@/assets/authwindows';
    import { ref } from 'vue';

    var type = ref('');
    var emailCodeSent = ref(false);

    function sendEmailCode() {
        
    }
</script>
<template>
    <div class="wrapper">
        <div class="vertflex" v-show="type === ''">
            <h3>Выберите способ регистрации</h3>
            <div class="vertflex">
                <button class="butregular" @click="type = 'email'">Email</button>
            </div>
        </div>
        <div class="vertflex" v-show="type === 'email'">
            <input placeholder="Email" class="in">
            <button class="butaccent">Получить код</button>
        </div>
        <!--<input class="fullwidth in" :placeholder="Lang.get().login">
        <input class="fullwidth in" :placeholder="Lang.get().password" type="password">
        <input class="fullwidth in" :placeholder="Lang.get().passwordrepeat" type="password">
        <button class="butaccent">{{Lang.get().tosignup}}</button>
        <button class="butregular" @click="openSignInWindow">{{Lang.get().tosignin}}</button>-->
    </div>
</template>
<style scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        gap: calc(var(--s-base-indent) / 2)
    }
</style>