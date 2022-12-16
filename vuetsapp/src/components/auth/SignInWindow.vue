<script setup lang="ts">
    import Lang from '@/assets/modules/Lang/Lang';
    import WindowComponent from '../WindowComponent.vue';
    import SignInForm from './SignInForm.vue';
</script>
<template>
    <WindowComponent :title="Lang.get().signin" :contentcomp="SignInForm" />
</template>