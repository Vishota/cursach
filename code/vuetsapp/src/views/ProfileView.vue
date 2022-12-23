<script lang="ts" setup>
    import profiles from '@/assets/modules/Profiles/ProfilesModule';
    import accounts from '@/assets/modules/Accounts/AccountsModule';
    import ProfileLink from '@/components/users/ProfileLink.vue';
    import { ref, reactive } from 'vue';
    import { useRoute } from 'vue-router';
    import GalleryComponent from '@/components/GalleryComponent.vue';
    import AnnouncementsQuery from '@/assets/modules/Announcements/AnnouncementsQuery';
    import AnnouncementsList from '@/components/announcements/AnnouncementsList.vue';
    import router from '@/router';

    var id = ref(parseInt(useRoute().params.id as string));
    var user = reactive(profiles.get(id.value));
    var announcementsQuery = reactive( new AnnouncementsQuery().setOwner(id.value) );
</script>
<template>
    <div class="vertflex">
        <div class="upper block">
            <div class="vertflex">
                <h2><ProfileLink :id="id"/></h2>
            </div>
            <div class="vertflex">
                <div class="gallery-container">
                    <GalleryComponent :pics="[ user.pic ]" class="gallery" openable />
                </div>
                <button class="butaccent" v-if="accounts.getMyId() === id" @click="router.push('/new')">Создать объявление</button>
                <!----<button class="butregular" v-if="accounts.getMyId() === id">Настройки</button>-->
            </div>
        </div>
        <div class="block">
            <h2>Последние объявления</h2>
            <AnnouncementsList :query="announcementsQuery" />
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
</style>