<script setup lang="ts">
    import AnnouncementsList from '@/components/announcements/AnnouncementsList.vue';
    import AnnouncementsQuery from '@/assets/modules/Announcements/AnnouncementsQuery';
    import { reactive } from 'vue';

    var query = reactive((new AnnouncementsQuery()));
</script>
<template>
    <h1>Последние объявления</h1>
    <p>
        <AnnouncementsList :query="query" />
    </p>
    <!--<WindowComponent title="Вход" :contentcomp="SignInWindow" />-->
</template>
<style>
    .test {
        width: 200px;
        height: 300px;
    }
</style>