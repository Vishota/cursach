<script lang="ts" setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    import AnnouncementsList from '@/components/announcements/AnnouncementsList.vue';
    import AnnouncementsQuery from '@/assets/modules/Announcements/AnnouncementsQuery';
    import * as navigation from '@/assets/modules/navigation';
    import router from '@/router';

    var text = ref(useRoute().params.text as string);
    router.afterEach((to) => { 
        text.value = to.params.text as string
    })
    var query = (new AnnouncementsQuery()).setText(text.value);

    function onSearchClicked() {
        navigation.goSearch((document.querySelector('#search') as HTMLInputElement).value);
        text.value = (document.querySelector('#search') as HTMLInputElement).value;
        query = (new AnnouncementsQuery()).setText(text.value);
        update.value++
    }
    var update = ref(0);
</script>
<template>
    <div class="vertflex">
        <div class="block vertflex">
            <h1>Поиск {{ text }}</h1>
            <div class="horflex">
                <input class="in fullwidth" id="search" placeholder="Поиск" :value="text" @keypress.enter="onSearchClicked">
                <button class="butaccent" @click="onSearchClicked">Найти</button>
            </div>
        </div>
        <AnnouncementsList :key="update" :query="query" />
    </div>
</template>