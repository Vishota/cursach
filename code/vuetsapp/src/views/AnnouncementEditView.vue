<script setup lang="ts">
    import { ref } from 'vue';
    import announcements from '@/assets/modules/Announcements/AnnouncementsModule';
    import { useRoute } from 'vue-router';
    import type Announcement from '../assets/modules/Announcements/Announcement';
    import type AnnouncementFeature from '../assets/modules/Announcements/AnnouncementFeature';

    var loading = ref(true);

    var id : number = parseInt(useRoute().params.id as string);
    var announcement : Announcement = announcements.get(id);
    var features = ref([] as AnnouncementFeature[]);
    var featuresCount = ref(0);
    var pics = ref([] as string[]);
    var picsCount = ref(0);
    var title = ref('');
    var description = ref('');
    var price = ref('');

    var editBlocked = ref(false);

    init();

    async function init() {
        title.value = await announcement.loadAndGet('title');
        description.value = await announcement.loadAndGet('description');
        features.value = await announcement.loadAndGet('features');
        featuresCount.value = features.value.length;
        pics.value = await announcement.loadAndGet('pics');
        picsCount.value = pics.value.length;
        price.value = await announcement.loadAndGet('price');

        loading.value = false;
    }

    async function save() {
        console.log(announcement.toObject());
        
    }
</script>
<template>
    <div class="vertflex">
        <div class="block vertflex">
            <h2>Измеенить объявление</h2>
            <input class="in" placeholder="Название" v-model="title" :disabled="loading">
            <textarea class="in" placeholder="Описание" v-model="description" :disabled="loading"></textarea>
        </div>
        <div class="vertflex block">
            <h2>Характеристики</h2>
            <div class="horflex featureRow" v-for="i in featuresCount">
                <input class="in"  v-model="features[i - 1].name" placeholder="Характеристика" :disabled="loading">
                <input class="in" v-model="features[i - 1].value" placeholder="Значение" :disabled="loading">
            </div>
            <button class="add-feature butaccent" @click="featuresCount++" :disabled="loading">+</button>
            <p>Для удаления оставьте поля пустыми</p>
        </div>
        <div class="vertflex block">
            <h2>Изображения</h2>
            <input v-for="i in picsCount" class="in" v-model="pics[i - 1]" placeholder="Ссылка" :disabled="loading">
            <button class="add-feature butaccent" @click="picsCount = Math.min(picsCount + 1, 10)" :disabled="loading">+</button>
            <p>Для удаления оставьте поле пустым</p>
        </div>
        <div class="block horflex">
            <input class="in price" placeholder="Цена" v-model="price" :disabled="loading">
            <button @click="save" class="create-button fullwidth butaccent" :disabled="editBlocked || loading">Сохранить</button>
        </div>
    </div>
</template>
<style scoped>
    textarea {
        resize: vertical;
        height: 200px;
        min-height: 100px;
    }
    .add-feature {
        grid-column-start: 1;
        grid-column-end: 3;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .featureRow > *:first-child {
        flex-grow: 1;
    }
    .featureRow > *:last-child {
        flex-grow: 2;
    }
    .create-button {
        flex-grow: 5;
    }
    .price {
        flex-grow: 1;
    }
    </style>