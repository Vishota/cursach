<script setup>
import { onMounted, reactive } from 'vue';
import AnnouncementCard from '../components/AnnouncementCard.vue'

let announcements = reactive([])
onMounted(() => {
    for(let i = 0; i < 13; i++) {
        announcements.push({
            title: '123',
            pic: 'https://avatars.mds.yandex.net/get-entity_search/143021/277909318/S168xU_2x',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Ultrices eros in cursus turpis massa tincidunt dui ut. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Tellus cras adipiscing enim eu turpis egestas pretium aenean. Aliquam sem fringilla ut morbi tincidunt augue. Sed sed risus pretium quam vulputate dignissim. Et malesuada fames ac turpis. Vitae purus faucibus ornare suspendisse sed nisi.',
            price: '100 BYN',
            date: '04.12.2022'
        })
    }
})
</script>
<template>
    <main>
        <h1 class="pagename">{{lang.main_view.last_announcements}}</h1>
        <div class="announcements" v-if="announcements">
            <div class="card-container" v-for="announcement in announcements">
                <AnnouncementCard :pic="announcement.pic" :title="announcement.title" :description="announcement.description" :price="announcement.price" :date="announcement.date" />
            </div>
        </div>
    </main>
</template>
<style scoped>
main {
    box-sizing: border-box;
    width: 100vw;
    padding: calc(var(--s-header) + var(--s-medium)) var(--s-page-side-paddings) var(--s-medium);
}
.pagename {
    margin: 0
}
.announcements {
    display: flex;
    flex-wrap: wrap;
    gap: var(--s-medium);
    margin-top: var(--s-medium);
}
.card-container {
    flex-grow: 1;
    flex-basis: 30%;
    max-width: calc(33% - var(--s-medium) * 2 / 3);
}
</style>