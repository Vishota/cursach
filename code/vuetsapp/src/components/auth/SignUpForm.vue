<script lang="ts" setup>
    import { openSignInWindow } from '@/assets/authwindows';
    import { closeWindow } from '@/assets/authwindows';
    import profiles from '@/assets/modules/Accounts/AccountsModule'
    import { ref } from 'vue';
    import router from '@/router/index';
    
    // type of sign up
    var type = ref('');

    // email sign up vars
    var emailCodeStatus = ref(0);   // -1 - not sent (error); 0 - not sent (initial); 1 - sent; 2 - checked; 
    var showBadEmailCode = ref(false);
    var isEmailTaken = ref(false);
    var sendingLocked = ref(false);

    var showUsernameTaken = ref(false);
    var isUsernameTaken = ref(false);
    // show log & pass inputs
    var showUsernamePasswordInputs = ref(false);
    // show log & pass hints
    var showUsernameHint = ref(false);
    var showPasswordHint = ref(false);
    // pass = pass repeat
    //var passwordsMatches = ref(false);
    
    // all inputs correct
    var inputsOkay = ref(false);

    function resetEmailSignup() {
        emailCodeStatus.value = 0;
        showBadEmailCode.value = false;
        showUsernamePasswordInputs.value = false;
        showUsernameHint.value = false;
        showPasswordHint.value = false;
        showUsernameTaken.value = false;
    }
    async function sendEmailCode() {
        if(sendingLocked.value || isEmailTaken.value) return;
        sendingLocked.value = true;
        try {
            showBadEmailCode.value = false;
            var emailin = document.querySelector('#email') as HTMLInputElement;
            var sent = await profiles.sendEmailCode( emailin.value );
            if(sent.status && sent.sent) {
                emailCodeStatus.value = 1;
            }
            else {
                emailCodeStatus.value = -1;
            }
        }
        catch(e) {
            sendingLocked.value = false;
            throw (e);
        }
        sendingLocked.value = false;
    }
    async function checkEmailCode() {
        var emailin = document.querySelector('#email') as HTMLInputElement;
        var codein = document.querySelector('#emailcode') as HTMLInputElement;

        var checked = await profiles.checkEmailCode( emailin.value, codein.value );
        if(checked.status && checked.code) {
            emailCodeStatus.value = 2;
            showUsernamePasswordInputs.value = true;
            showBadEmailCode.value = false;
        }
        else {
            showBadEmailCode.value = true;
        }
    }
    async function signUp() {
        var emailin = document.querySelector('#email') as HTMLInputElement;
        var codein = document.querySelector('#emailcode') as HTMLInputElement;
        var usernamein = document.querySelector('#username') as HTMLInputElement;
        var passwordin = document.querySelector('#password') as HTMLInputElement;

        var signedUp = await profiles.emailSignUp(emailin.value, codein.value, usernamein.value, passwordin.value);

        if(signedUp.code === false) {
            resetEmailSignup();
            showBadEmailCode.value = true;
            return;
        }
        if(signedUp.email === false) {
            resetEmailSignup();
            isEmailTaken.value = true;
            return;
        }
        if(signedUp.account == false) {
            showUsernameTaken.value = true;
            return;
        }
        
        router.push('/profiles/'+signedUp.account);
        closeWindow();
    }
    async function onEmailInput() {
        var emailin = document.querySelector('#email') as HTMLInputElement;

        isEmailTaken.value = !(await profiles.checkEmailAvailability(emailin.value)).available;

        emailCodeStatus.value = 0;
        showBadEmailCode.value = false;
        console.log(isEmailTaken.value);
    }
    function updatePasswordsMatch() {
        var passwordin = document.querySelector('#password') as HTMLInputElement;
        var passwordrepeatin = document.querySelector('#password_repeat') as HTMLInputElement;

        passwordrepeatin.setCustomValidity(passwordin.value == passwordrepeatin.value ? "" : " ");
    }
    function isOkay(input : HTMLInputElement) : boolean {
        return !(input.value === null) && !(input.value === undefined) && (input.checkValidity());
    }
    function updateInputsOkay() {        
        var emailin = document.querySelector('#email') as HTMLInputElement;
        var codein = document.querySelector('#emailcode') as HTMLInputElement;
        var usernamein = document.querySelector('#username') as HTMLInputElement;
        var passwordin = document.querySelector('#password') as HTMLInputElement;
        var passwordrepeatin = document.querySelector('#password_repeat') as HTMLInputElement;
        
        inputsOkay.value = isOkay(emailin) && isOkay(codein) && isOkay(usernamein) && isOkay(passwordin) && passwordrepeatin.checkValidity();
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
            <input @input="onEmailInput()" placeholder="Email" class="in" id="email" @keypress.enter="sendEmailCode" :disabled="emailCodeStatus === 2">
            <p class="errmsg" v-show="emailCodeStatus === -1">Код не отправлен, проверьте корректность данных</p>
            <p class="errmsg" v-show="isEmailTaken">Этот email уже занят. Попробуйте войти</p>

            <input id="emailcode" placeholder="Отправленный вам код" @keypress.enter="checkEmailCode" class="in" v-show="emailCodeStatus === 1" :type=" emailCodeStatus === 1 ? 'text' : 'hidden' " pattern="[a-zA-Z0-9]{8}">
            <p class="errmsg" v-show="showBadEmailCode">Код введен неверно</p>
            <button class="butaccent" @click="checkEmailCode" v-show="emailCodeStatus === 1">Проверить код</button>
            <button :class="(emailCodeStatus === 1 ? 'butregular' : 'butaccent')" @click="sendEmailCode" v-show="emailCodeStatus < 2" :disabled="sendingLocked || isEmailTaken">Получить код {{ (emailCodeStatus === 1 ? ' еще раз' : '') }}</button>
        </div>
        <div class="vertflex" v-show="showUsernamePasswordInputs">
            <input placeholder="Отображаемый никнейм" class="in" id="username" pattern="[a-zA-Z0-9_]{4,16}" @focusin="showUsernameHint = true" @focusout="showUsernameHint = false">
            <p class="errmsg" v-show="showUsernameTaken">Это имя пользователя занято. Попробуйте другое</p>
            <p class="hint" v-show="showUsernameHint">От 4 до 16 символов. Допускается использование цифр, английских букв и нижнего подчеркивания "_".</p>
            <input @input="updatePasswordsMatch()" placeholder="Пароль" class="in" id="password" pattern="[a-zA-Z0-9!@#$%^&*()_+=\-.]{8,32}" @focusin="showPasswordHint = true" @focusout="showPasswordHint = false" @keypress.enter="signUp" type="password">
            <input @input="updatePasswordsMatch()" placeholder="Пароль, еще раз" :class="'in'" id="password_repeat" pattern="[a-zA-Z0-9!@#$%^&*()_+=\-.]{8,32}" @focusin="showPasswordHint = true" @focusout="showPasswordHint = false" @keypress.enter="signUp" type="password">
            <p class="hint" v-show="showPasswordHint">От 8 до 32 символов. Допускается использование цифр, английских букв и символов !@#$%^&*()_+=-.</p>
            <button class="butaccent" @click="signUp">Создать аккаунт</button>
        </div>
        <button class="butregular" @click="openSignInWindow">Хочу войти</button>
    </div>
</template>
<style scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--s-base-indent);
    }
    .errmsg, .hint {
        font-size: 14px;
    }
    .errmsg {
        color: var(--c-wrong);
    }
</style> 