<script lang="ts" setup>
    import { reactive } from 'vue';
    import announcements from '@/assets/modules/Announcements/AnnouncementsModule';
    import AnnouncementCard from './AnnouncementCard.vue';

    var props = defineProps(['query']);

    var found = reactive( {ids: ([] as number[])} );
    announcements.find(props.query).then(v=>{
        found.ids = v;
    });
</script>
<template>
    <p v-show="found.ids.length == 0">Таких объявлений нет</p>
    <div class="announcements-grid">
        <AnnouncementCard v-for="id in found.ids" :id="id" />
    </div>
</template>
<style scoped>
    .announcements-grid {
        display: grid;
        grid-template-columns: repeat(var(--n-hor-announcements), 1fr);
        grid-auto-rows: 400px;
        gap: var(--s-base-indent);
    }
</style>