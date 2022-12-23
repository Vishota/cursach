<script lang="ts" setup>
    import announcements from '@/assets/modules/Announcements/AnnouncementsModule';
    import ProfileLink from '@/components/users/ProfileLink.vue';
    import { ref, reactive } from 'vue';
    import { useRoute } from 'vue-router';
    import GalleryComponent from '@/components/GalleryComponent.vue';

    var id = ref(parseInt(useRoute().params.id as string));
    var announcement = reactive(announcements.get(id.value));
</script>
<template>
    <div class="vertflex">
        <div class="upper block">
            <div class="gallery-container">
                <GalleryComponent :pics="announcement.pics" class="gallery" openable />
            </div>
            <div class="vertflex">
                <h1 class="userselect">{{announcement.title}}</h1>
                <p class="userselect"></p>
                <ProfileLink id="1"/>
                <h3>{{announcement.price}}</h3>
            </div>
        </div>
        <div class="block">
            <table class="features userselect">
                <tr v-for="feature in announcement.features">
                    <td>{{feature.name}}</td>
                    <td>{{feature.value}}</td>
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
        height: fit-content;
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