<script lang="ts" setup>
    import lang from '@/assets/modules/Lang/Lang';
    import users from '@/assets/modules/Users/UsersModule';
    import rating from '@/assets/modules/Rating/RatingModule'
    import UserLink from '@/components/users/UserLink.vue';
    import { ref, reactive } from 'vue';
    import { useRoute } from 'vue-router';
    import GalleryComponent from '@/components/GalleryComponent.vue';
    import RatingComponent from '@/components/RatingComponent.vue';
    import announcements from '@/assets/modules/Announcements/AnnouncementsModule';
import AnnouncementsQuery from '@/assets/modules/Announcements/AnnouncementsQuery';
import AnnouncementCard from '@/components/announcements/AnnouncementCard.vue';

    var id = ref(parseInt(useRoute().params.id as string));
    var user = reactive(users.get(id.value));
</script>
<template>
    <div class="vertflex">
        <div class="upper block">
            <div class="vertflex">
                <h2><UserLink :id="id"/></h2>
                <p>{{lang.get().city}}: {{user.city}}</p>
                <RatingComponent :id="id" />
            </div>
            <div class="vertflex">
                <div class="gallery-container">
                    <GalleryComponent :pics="[user.pic]" class="gallery" openable />
                </div>
                <button class="butaccent">{{ lang.get().tomessage }}</button>
                <button class="butregular">{{ lang.get().toreport }}</button>
            </div>
        </div>
        <div class="block">
            <h2>{{ lang.get().announcements }}</h2>
            <p v-show="announcements.count((new AnnouncementsQuery()).setOwner(id)) == 0">{{ lang.get().noannouncements }}</p>
            <div class="announcements-grid">
                <AnnouncementCard v-for="announcement in announcements.find((new AnnouncementsQuery()).setOwner(id))" :id="announcement" />
            </div>
        </div>
    </div>
</template>
<style scoped>
    .gallery-container {
        width: 100%;
    }
    .upper.block {
        display: grid;
        grid-template-columns: 4fr 1fr;
        height: fit-content;
        gap: var(--s-base-indent);
    }
    .gallery {
        border-radius: var(--s-border-radius);
        aspect-ratio: 1;
    }
    .announcements-grid {
        display: grid;
        grid-template-columns: repeat(var(--n-hor-announcements), 1fr);
    }
</style>