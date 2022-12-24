<script lang="ts" setup>
    import { ref, reactive } from 'vue';
    import announcements from '@/assets/modules/Announcements/AnnouncementsModule';
    import { useRoute } from 'vue-router';
    import AnnouncementFeature from '@/assets/modules/Announcements/AnnouncementFeature';
    
    var id = parseInt(useRoute().params.id as string);
    var announcement = reactive(announcements.get(id));

    var features = ref([] as AnnouncementFeature[]);
    var featuresCount = ref(0);

    var pics = ref([] as string[]);
    var picsCount = ref(0);

    var title = ref('');
    var description = ref('');
    var price = ref('');

    announcement.fullInit().then(()=>{
        features.value = announcement.features;
        featuresCount.value = features.value.length;
        pics.value = announcement.pics;
        picsCount.value = pics.value.length;
        title.value = announcement.title;
        description.value = announcement.description;
        price.value = announcement.price;
    })

    var creationBlocked = ref(false);
    /*function createAnnouncement() {
        announcements.create({
            'title': title.value,
            'description': description.value,
            'price': price.value,
            'features': JSON.stringify(features.value),
            'pics': JSON.stringify(pics.value)
        });
    }*/
</script>
<template>
    <div class="vertflex">
        <div class="block vertflex">
            <h2>Новое объявление</h2>
            <input class="in" placeholder="Название" v-model="title">
            <textarea class="in" placeholder="Описание" v-model="description"></textarea>
        </div>
        <div class="vertflex block">
            <h2>Характеристики</h2>
            <div class="horflex featureRow" v-for="i in featuresCount">
                <input class="in"  v-model="features[i - 1].name" placeholder="Характеристика">
                <input class="in" v-model="features[i - 1].value" placeholder="Значение">
            </div>
            <div class="add-feature butaccent" @click="featuresCount++; features[featuresCount - 1] = new AnnouncementFeature()">+</div>
            <p>Оставьте поля пустыми, и они будут удалены</p>
        </div>
        <div class="vertflex block">
            <h2>Изображения</h2>
            <input v-for="i in picsCount" class="in" v-model="pics[i - 1]" placeholder="Ссылка">
            <div class="add-feature butaccent" @click="picsCount = Math.min(picsCount + 1, 10)">+</div>
            <p>Оставьте поле пустым, и оно будет удалено    </p>
        </div>
        <div class="block horflex">
            <input class="in price" placeholder="Цена" v-model="price">
            <button  class="create-button fullwidth butaccent" :disabled="creationBlocked">Создать объявление</button>
        </div>
    </div>
</template>
<style scoped>
    .add-feature {
        grid-column-start: 1;
        grid-column-end: 3;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>