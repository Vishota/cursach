<script setup lang="ts">
    import WindowComponent from './WindowComponent.vue';

    const props = defineProps(['onconfirm', 'title', 'confirmText', 'confirmButtonText']);

    var title = (props.title == undefined ? 'Подтверждение' : props.title);
    var confirmText = (props.confirmText == undefined ? 'Вы уверены?' : props.confirmText);
    var confirmButtonText = (props.confirmButtonText == undefined ? 'Да' : props.confirmButtonText);
</script>
<template>
    <WindowComponent :title="title">
        {{ confirmText }}
        <button class="butaccent fullwidth" @click="onconfirm">{{ confirmButtonText }}</button>
    </WindowComponent>
</template>