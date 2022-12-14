<script lang="ts" setup>
    import { ref } from 'vue';

    var props = defineProps(['pics']); 
    var shown = ref(0);

    function updateShownImage(event : MouseEvent) : void {
        let picsCount = props.pics.length;

        let galleryWidth : number = (event.target as Element).getBoundingClientRect().width;
        let mousePos : number = event.offsetX;

        if(event.target === null) return;
        if(mousePos <= 0 || mousePos >= galleryWidth) return;

        shown.value = Math.floor(mousePos / galleryWidth * picsCount);
    }
</script>
<template>
    <div>
        <img @mousemove="updateShownImage" v-show="i == shown" v-for="pic, i in pics" :src="pics.at(i)">
    </div>
</template>
<style scoped>
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: inherit;
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