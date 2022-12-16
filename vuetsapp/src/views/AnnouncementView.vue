<script lang="ts" setup>
    import lang from '@/assets/modules/Lang/Lang';
    import announcements from '@/assets/modules/Announcements/AnnouncementsModule';
    import users from '@/assets/modules/Users/UsersModule';
    import UserLink from '@/components/users/UserLink.vue';
    import { ref, reactive } from 'vue';
    import { useRoute } from 'vue-router';
import GalleryComponent from '@/components/GalleryComponent.vue';

    var id = ref(parseInt(useRoute().params.id as string));
    var announcement = reactive(announcements.get(id.value));

    function featureToString(value: boolean|string) {
        if(value === true) return lang.get().yes;
        if(value === false) return lang.get().no;
        return value;
    }
</script>
<template>
    <div class="vertflex">
        <div class="upper block">
            <div class="gallery-container">
                <GalleryComponent :pics="announcement.pics" class="gallery" />
            </div>
            <div class="vertflex">
                <h1 class="userselect">{{announcement.title}}</h1>
                <p class="userselect">{{announcement.description}}</p>
                <UserLink id="1"/>
                <h3>{{announcement.price}}</h3>
            </div>
        </div>
        <div class="block">
            <table class="features userselect">
                <tr v-for="feature in announcement.features">
                    <td>{{lang.get().features.get(feature.name)}}</td>
                    <td>{{featureToString(feature.value)}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<style scoped>
.gallery-container {
    width: 100%;
}
.upper.block {
    display: grid;
    grid-template-columns: 2fr 1fr;
    height: fit-content;
    gap: var(--s-base-indent)
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