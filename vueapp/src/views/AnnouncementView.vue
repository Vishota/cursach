<script setup>
    import { onMounted, reactive } from 'vue';
    import AnnouncementCard from '../components/AnnouncementCard.vue';
    import * as AnnouncementsApi from '../assets/js/api_facades/announcements.js'

    let announcements = reactive([])
    onMounted(async () => {
        (await AnnouncementsApi.getAnnouncements())
            .forEach(announcement => {
                announcements.push(announcement)
            });
    })
</script>
<template>
    <main>
        {{ $route.params }}
    </main>
</template>
<style scoped>
    main {
        box-sizing: border-box;
        width: 100vw;
        padding: calc(var(--s-header) + var(--s-medium)) var(--s-page-side-paddings) var(--s-medium);
    }
</style>