<script lang="ts" setup>
    import { ref, createApp } from 'vue';
    import OpenedPic from './OpenedPic.vue';

    var props = defineProps(['pics', 'openable']);
    var shown = ref(0);

    function updateShownImage(event : MouseEvent) : void {
        let picsCount = props.pics.length;

        let galleryWidth : number = (event.target as Element).getBoundingClientRect().width;
        let mousePos : number = event.offsetX;

        if(event.target === null) return;
        if(mousePos <= 0 || mousePos >= galleryWidth) return;

        shown.value = Math.floor(mousePos / galleryWidth * picsCount);
    }
    function openPic() {
        var div = document.body.appendChild(document.createElement('div'));
        createApp(OpenedPic, {pics: props.pics, show: shown.value}).mount(div);
    }
    function onClick() {
        console.log(props.openable);
        if(props.openable !== undefined) {
            openPic();
        }
    }
</script>
<template>
    <div>
        <img class="pointer" loading="lazy" @click="onClick" @mousemove="updateShownImage" v-show="i == shown" v-for="pic, i in pics" :src="pics.at(i)">
    </div>
</template>
<style scoped>
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: inherit;
        background-image: url('/loading.gif');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    div {
        width: 100%;
        height: 100%;
        border: 1px solid var(--c-back);
    }
    div:hover {
        border: 1px solid var(--c-accent);
    }
</style>