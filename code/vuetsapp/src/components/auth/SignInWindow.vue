<script setup lang="ts">
    import WindowComponent from '../WindowComponent.vue';
    import SignInForm from './SignInForm.vue';
</script>
<template>
    <WindowComponent title="Вход" :contentcomp="SignInForm" />
</template>