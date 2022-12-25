<script setup lang="ts">
    import { reactive, ref } from 'vue';
    import announcements from '@/assets/modules/Announcements/AnnouncementsModule';
    import { useRoute } from 'vue-router';
    import type Announcement from '../assets/modules/Announcements/Announcement';
    import type AnnouncementFeature from '@/assets/modules/Announcements/AnnouncementFeature';

    var loading = ref(true);

    var id : number = parseInt(useRoute().params.id as string);
    var announcement : Announcement = announcements.get(id);
    var announcementObject : any = ref(announcement.toObject());
    console.log(announcementObject);

    var editBlocked = ref(false);

    init();

    async function init() {
        announcementObject.value = await announcement.toObjectAwait();
        loading.value = false;
    }

    async function save() {
        (announcementObject.value.features as AnnouncementFeature[]).forEach(
            (v,i)=>{
                if(v.name == '' || v.value == '') (announcementObject.value.features as AnnouncementFeature[]).splice(i, 1)
            });
        (announcementObject.value.pics as string[]).forEach(
            (v,i)=>{
                if(v == '') (announcementObject.value.pics as string[]).splice(i, 1)
            });
        console.log(announcementObject.value);
    }
</script>
<template>
    <div class="vertflex">
        <div class="block vertflex">
            <h2>Измеенить объявление</h2>
            <input class="in" placeholder="Название" v-model="announcementObject.title" :disabled="loading">
            <textarea class="in" placeholder="Описание" v-model="announcementObject.description" :disabled="loading"></textarea>
        </div>
        <div class="vertflex block">
            <h2>Характеристики</h2>
            <div class="horflex featureRow" v-for="i in announcementObject.features.length">
                <input class="in"  v-model="announcementObject.features[i - 1].name" placeholder="Характеристика" :disabled="loading">
                <input class="in" v-model="announcementObject.features[i - 1].value" placeholder="Значение" :disabled="loading">
            </div>
            <button class="add-feature butaccent" @click="announcementObject.features.push( {} )" :disabled="loading">+</button>
            <p>Для удаления оставьте поля пустыми</p>
        </div>
        <div class="vertflex block">
            <h2>Изображения</h2>
            <input v-for="i in announcementObject.pics.length" class="in" v-model="announcementObject.pics[i - 1]" placeholder="Ссылка" :disabled="loading" >
            <button class="add-feature butaccent" @click="announcementObject.pics.push('');" :disabled="loading">+</button>
            <p>Для удаления оставьте поле пустым</p>
        </div>
        <div class="block horflex">
            <input class="in price" placeholder="Цена" v-model="announcementObject.price" :disabled="loading">
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