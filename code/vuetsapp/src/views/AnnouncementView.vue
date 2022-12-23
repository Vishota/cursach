<script lang="ts" setup>
    import announcements from '@/assets/modules/Announcements/AnnouncementsModule';
    import ProfileLink from '@/components/users/ProfileLink.vue';
    import { ref, reactive } from 'vue';
    import { useRoute } from 'vue-router';
    import GalleryComponent from '@/components/GalleryComponent.vue';

    var id = ref(parseInt(useRoute().params.id as string));
    var announcement = reactive(announcements.get(id.value));
    console.log(announcement.owner);
    
</script>
<template>
    <div class="vertflex">
        <div class="upper block">
            <div class="gallery-container">
                <GalleryComponent :pics="announcement.pics" class="gallery" openable />
            </div>
            <div class="vertflex scrolledy">
                <h1 class="userselect">{{announcement.title}}</h1>
                <div class="scrolledy">
                    <p class="userselect">{{announcement.description}}</p>
                </div>
                <ProfileLink :id="announcement.owner"/>
                <h3>{{announcement.price}} BYN</h3>
            </div>
        </div>
        <div class="block">
            <table class="features userselect">
                <tr v-for="feature in announcement.features">
                    <td>{{(feature as any).left}}</td>
                    <td>{{(feature as any).right}}</td>
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