<script setup lang="ts">
    import { ref } from 'vue';
    var props = defineProps(['pics', 'show']);
    var shownPic = ref(props.show);
    
    function next() {
        shownPic.value = (shownPic.value + 1) % props.pics.length;
    }
    function prev() {
        shownPic.value = (shownPic.value - 1) % props.pics.length;
        if(shownPic.value < 0) shownPic.value += props.pics.length;
    }
    function select(event : MouseEvent) {
        shownPic.value = (event.target as Element).getAttribute('n');
    }
    function close() {
        document.querySelector('#piccontainer')?.remove();
    }
</script>
<template>
    <div class="container" id="piccontainer">
        <div class="blackout"></div>
        <div class="gridwrapper">
            <div class="close viewer-interface" @click="close">&#9932;</div>
            <img class="bigpic" :src="pic" v-for="(pic, i) in pics" v-show="shownPic == i">
            <div class="listwrapper viewer-interface">
                <div class="list">
                    <img v-for="(pic, i) in pics" :src="pic" :n="i" @click="select">
                </div>
            </div>
            <div class="next viewer-interface" @click="next">&#10097;</div>
            <div class="prev viewer-interface" @click="prev">&#10096;</div>
        </div>
    </div>
</template>
<style scoped>
    .blackout {
        background-color: var(--c-back);
        opacity: .8;
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;left: 0;
    }
    .gridwrapper {
        display: grid;
        position: fixed;
        top: 0;left:0;
        width: 100vw;
        height: 100vh;
        grid-template-rows: 1fr 8fr 1fr;
        grid-template-columns: 1fr 14fr 1fr;
    }
    .bigpic {
        height: 80vh;
        width: 87.5vw;
        object-fit: contain;
        grid-row-start: 2;
        grid-column-start: 2;
        grid-row-end: 3;
        grid-column-end: 3;
    }
    .close {
        font-size: 20px;
        grid-row-start: 1;
        grid-column-start: 3;
        grid-row-end: 2;
        grid-column-end: 4;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .close:hover {
        color: var(--c-accent);
    }
    .listwrapper {
        display: flex;
        overflow-x: auto;
        grid-row-start: 3;
        grid-column-start: 2;
        grid-row-end: 4;
        grid-column-end: 3;
        width: 100%;
        justify-content: center;
    }
    .list {
        width: fit-content;
        display: flex;
        gap: var(--s-base-indent)
    }
    .list img {
        height: 100%;
    }
    .next {
        display: flex;
        justify-content: center;
        align-items: center;
        grid-row-start: 2;
        grid-column-start: 3;
        grid-row-end: 4;
        grid-column-end: 4;
        width: 100%;
        height: 100%;
        font-size: 30px;
    }
    .prev {
        display: flex;
        justify-content: center;
        align-items: center;
        grid-row-start: 2;
        grid-column-start: 1;
        grid-row-end: 4;
        grid-column-end: 2;
        width: 100%;
        height: 100%;
        font-size: 30px;
    }
    .viewer-interface {
        opacity: .1;
        transition: .5s;
        background-color: var(--c-blocks);
        cursor: pointer;
    }
    .viewer-interface:hover {
        opacity: 1;
        color: var(--c-accent)
    }
</style>