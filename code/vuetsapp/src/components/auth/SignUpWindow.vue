<script setup lang="ts">
    import WindowComponent from '../WindowComponent.vue';
    import SignUpForm from './SignUpForm.vue';
</script>
<template>
    <WindowComponent title="Регистрация" :contentcomp="SignUpForm" />
</template>