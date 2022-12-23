<script lang="ts" setup>
    import users from '@/assets/modules/Profiles/ProfilesModule';
    import ProfileLink from '@/components/users/ProfileLink.vue';
    import { ref, reactive } from 'vue';
    import { useRoute } from 'vue-router';
    import GalleryComponent from '@/components/GalleryComponent.vue';

    var id = ref(parseInt(useRoute().params.id as string));
    var user = reactive(users.get(id.value));
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
                <button class="butregular">Настройки</button>
            </div>
        </div>
        <div class="block">
            <h2>Последние объявления</h2>
            <div class="announcements-grid">
                
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
</style>