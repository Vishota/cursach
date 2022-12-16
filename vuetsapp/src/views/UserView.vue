<script lang="ts" setup>
    import lang from '@/assets/modules/Lang/Lang';
    import users from '@/assets/modules/Users/UsersModule';
    import UserLink from '@/components/users/UserLink.vue';
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
                <h2><UserLink id="id"/></h2>
                <p>{{lang.get().city}}: {{user.city}}</p>
            </div>
            <div class="vertflex">
                <div class="gallery-container">
                    <GalleryComponent :pics="[user.pic]" class="gallery" openable />
                </div>
                <button class="butaccent">{{ lang.get().tomessage }}</button>
                <button class="butregular">{{ lang.get().toreport }}</button>
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