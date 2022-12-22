<script lang="ts" setup>
    import themes from '@/assets/modules/Themes/ThemesModule';

    function select(event : any) {
        themes.select(event.target.value);
    }
</script>
<template>
    <select @change="select" class="select" id="themesselector">
        <option disabled selected>Выбрать</option>
        <option v-for="theme in themes.getAvailable()" :value="theme.path">{{theme.name}}</option>
    </select>
</template>
<style scoped>
    select {
        width: 140px;
        text-align: center;
    }
</style>