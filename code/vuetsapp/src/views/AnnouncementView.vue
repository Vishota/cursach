<script lang="ts" setup>
    import announcements from '@/assets/modules/Announcements/AnnouncementsModule';
    import accounts from '@/assets/modules/Accounts/AccountsModule';
    import ProfileLink from '@/components/users/ProfileLink.vue';
    import { ref, reactive } from 'vue';
    import { useRoute } from 'vue-router';
    import GalleryComponent from '@/components/GalleryComponent.vue';
    import type AnnouncementFeature from '../assets/modules/Announcements/AnnouncementFeature';
    import * as navigation from '@/assets/modules/navigation';

    var id = ref(parseInt(useRoute().params.id as string));
    var announcement = reactive(announcements.get(id.value));
</script>
<template>
    <div class="vertflex">
        <div class="upper block">
            <div class="gallery-container">
                <GalleryComponent :pics="announcement.get('pics')" class="gallery" openable />
            </div>
            <div class="vertflex scrolledy">
                <h1 class="userselect">{{announcement.get('title')}}</h1>
                <div class="scrolledy">
                    <p class="userselect">{{announcement.get('description')}}</p>
                </div>
                <ProfileLink :id="announcement.get('owner')" :key="announcement.get('owner')"/>
                <button class="butregular" v-show="announcement.get('owner') == accounts.getMyId()" @click="navigation.goAnnouncementEdit(id)">Редактировать</button>
                <h3>{{announcement.get('price')}} BYN</h3>
            </div>
        </div>
        <div class="block">
            <table class="features userselect">
                <tr v-for="feature in announcement.get('features')">
                    <td>{{(feature as AnnouncementFeature).name}}</td>
                    <td>{{(feature as AnnouncementFeature).value}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<style scoped>
    .gallery-container {
        width: 100%;
        aspect-ratio: 1.8;
    }
    .upper.block {
        display: grid;
        grid-template-columns: 2fr 1fr;
        height: 400px;
        gap: var(--s-base-indent);
    }
    .gallery {
        border-radius: var(--s-border-radius);
    }
    h1,h3 {
        margin: 0;
    }
    p {
        margin: 0;
    }
    .features {
        width: 100%;
    }
    .features tr td:first-child {
        width: 40%;
    }
</style>