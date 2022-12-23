<script lang="ts" setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { search } from '@/assets/modules/Announcements/search';
    
    import router from '@/router';

    var text = ref(useRoute().params.text);
    router.afterEach((to) => { 
        text.value = to.params.text 
    })

    function onSearchClicked() {
        search((document.querySelector('#search') as HTMLInputElement).value);
    }
</script>
<template>
    <div>
        <div class="block vertflex">
            <h1>Поиск {{ text }}</h1>
            <div class="horflex">
                <input class="in fullwidth" id="search" placeholder="Поиск">
                <button class="butaccent" @click="onSearchClicked">Найти</button>
            </div>
        </div>
    </div>
</template>