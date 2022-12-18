<script lang="ts" setup>
    import GalleryComponent from '../GalleryComponent.vue';
    import announcements from '@/assets/modules/Announcements/AnnouncementsModule'
    import { reactive } from 'vue';
    import type Announcement from '@/assets/modules/Announcements/Announcement';
    var props = defineProps(['id'])
    if(props.id === undefined) throw('undefined id');
    var announcement = reactive(announcements.get(props.id) as Announcement);
</script>
<template>
    <RouterLink :to="'/announcements/'+id">
        <div class="container">
            <GalleryComponent :pics="announcement.pics" class="gallery" />
            <h1 class="title">{{ announcement.title }}</h1>
            <p class="description bottomshading">{{ announcement.description }}</p>
            <p class="price">{{ announcement.price }} BYN</p>
        </div>
    </RouterLink>
</template>
<style scoped>
    .gallery {
        height: 40%;
        width: 100%;
        border-radius: var(--s-border-radius);
    }
    .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: var(--s-base-indent);
        background-color: var(--c-blocks);
        border-radius: var(--s-border-radius);
        cursor: pointer;
        border: 1px solid transparent;
    }
    .container:hover .title, .container:hover .price {
        color: var(--c-accent)
    }
    .title {
        margin: var(--s-base-indent) 0;
        font-size: 24px;
        flex: 0;
    }
    .description {
        margin: 0;
        flex: 1;
        height: 0;
        overflow: hidden;
    }
    .price {
        flex: 0;
        font-size: 20px;
        margin: var(--s-base-indent) 0;
    }
    .description {
        background-image: linear-gradient(to bottom, var(--c-content) calc(100% - 40px), var(--c-blocks) calc(100% - 5px));
        color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
    }
    .container:hover .description {
        background-image: linear-gradient(to bottom, var(--c-content), var(--c-content));
    }
</style>