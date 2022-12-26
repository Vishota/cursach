<script lang="ts" setup>
    import { ref } from 'vue';
    import announcements from '@/assets/modules/Announcements/AnnouncementsModule';

    var featuresCount = ref(0);
    var features = ref([] as Array<any>);

    var picsCount = ref(0);
    var pics = ref([] as Array<string>)

    var title = ref('');
    var description = ref('');
    var price = ref(0);

    var creationBlocked = ref(false);
    function createAnnouncement() {
        announcements.create({
            'title': title.value,
            'description': description.value,
            'price': price.value,
            'features': JSON.stringify(features.value),
            'pics': JSON.stringify(pics.value)
        });
    }
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
                <input class="in"  v-model="features[i - 1].left" placeholder="Характеристика">
                <input class="in" v-model="features[i - 1].right" placeholder="Значение">
            </div>
            <div class="add-feature butaccent" @click="featuresCount++; features[featuresCount - 1] = {left: '', right: ''}">+</div>
            <p>Если передумали, оставьте поля пустыми</p>
        </div>
        <div class="vertflex block">
            <h2>Изображения</h2>
            <input v-for="i in picsCount" class="in" v-model="pics[i - 1]" placeholder="Ссылка">
            <div class="add-feature butaccent" @click="picsCount = Math.min(picsCount + 1, 10)">+</div>
            <p>Вы можете использовать <a class="hoveraccent pointer underline" href="https://imgur.com/upload">imgur</a></p>
            <p>Если передумали, оставьте поле пустым</p>
        </div>
        <div class="block horflex">
            <input class="in price" placeholder="Цена" v-model="price">
            <button @click="createAnnouncement" class="create-button fullwidth butaccent" :disabled="creationBlocked">Создать объявление</button>
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