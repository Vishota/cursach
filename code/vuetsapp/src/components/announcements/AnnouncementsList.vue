<script lang="ts" setup>
    import { reactive } from 'vue';
    import announcements from '@/assets/modules/Announcements/AnnouncementsModule';
    import AnnouncementCard from './AnnouncementCard.vue';

    var props = defineProps(['query']);

    var found = reactive( {ids: {}} );
    announcements.find(props.query).then(v=>{
        found.ids = v;
    });
</script>
<template>
    <div class="announcements-grid">
        <AnnouncementCard v-for="id in found.ids" :id="id" />
    </div>
</template>
<style scoped>
.announcements-grid {
    display: grid;
    grid-template-columns: repeat(var(--n-hor-announcements), 1fr);
    gap: var(--s-base-indent);
}
</style>