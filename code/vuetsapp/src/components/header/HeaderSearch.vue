<script lang="ts" setup>
    import { ref } from 'vue';
    import * as navigation from '@/assets/modules/navigation';

    function onHeaderSearch() {
        navigation.goSearch((document.querySelector('#headersearch') as HTMLInputElement).value);
    }
    function goSearch() {
        navigation.goSearch('');
    }
    
    var showSearchButton = ref(false);
</script>
<template>
    <div class="horflex container" @focusout="showSearchButton = false" v-if="$route.name !== 'searchblank' && $route.name !== 'search'">
        <input class="in search desktop" id="headersearch" placeholder="Что вы ищете?" @keypress.enter="onHeaderSearch" @focusin="showSearchButton = true">
        <button class="butaccent desktop" v-show="showSearchButton" @mousedown="onHeaderSearch">Найти</button>
        <button class="butregular mobile mobilesearch" @click="goSearch">Поиск</button>
    </div>
</template>
<style scoped>
    .container {
        display: flex;
        flex-grow: 1;
        height: 60%;
        margin: 0 calc(20px * (1 - var(--is-mobile)));
        justify-content: space-around;
    }
    .search {
        flex-grow: 1;

    }
    .mobilesearch {
        justify-content: space-around;
    }
</style>