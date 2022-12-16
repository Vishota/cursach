<script setup lang="ts">
    import Lang from '@/assets/modules/Lang/Lang';
    import WindowComponent from '../WindowComponent.vue';
    import SignUpForm from './SignUpForm.vue';
</script>
<template>
    <WindowComponent :title="Lang.get().signup" :contentcomp="SignUpForm" />
</template>