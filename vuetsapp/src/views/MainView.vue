<script setup lang="ts">
import AnnouncementCard from '@/components/announcements/AnnouncementCard.vue';
import UserLink from '@/components/users/UserLink.vue';
</script>
<template>
    <h1>Main</h1>
    <p>
        <div class="announcements-wrapper">
            <AnnouncementCard id="1" />
            <AnnouncementCard id="2" />
            <AnnouncementCard id="3" />
            <AnnouncementCard id="4" />
            <AnnouncementCard id="5" />
            <AnnouncementCard id="1" />
            <AnnouncementCard id="2" />
            <AnnouncementCard id="3" />
            <AnnouncementCard id="4" />
            <AnnouncementCard id="5" />
        </div>
    </p>
</template>
<style>
    .test {
        width: 200px;
        height: 300px;
    }
    .announcements-wrapper {
        display: grid;
        grid-template-columns: repeat(var(--n-hor-announcements), 1fr);
        gap: var(--s-base-indent);
    }
</style>