import announcements from '@/assets/modules/Announcements/AnnouncementsModule';
<script lang="ts" setup>
    import { closeWindow } from '@/assets/authwindows';
    closeWindow();

    defineProps(['title', 'contentcomp']);
</script>
<template>
    <div class="container" id="wincontainer">
        <div class="blackout" @click="closeWindow"></div>
        <div class="winwrapper">
            <div class="window">
                <div class="winbar">
                    <div class="wintitle">{{ title }}</div>
                    <div class="close" @click="closeWindow">&#215;</div>
                </div>
                <div class="content">
                    <span v-if="contentcomp != undefined" v-is="contentcomp" />
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .winwrapper {
        display: flex;
        width: 100vw;
        height: 100vh;
        position: fixed;
        align-items: center;
        justify-content: center;
        top: 0;left: 0;
        z-index: 2;
    }
    .content {
        height: fit-content;
        max-height: 80vh;
        overflow-y: auto;
    }
    .blackout {
        background-color: var(--c-back);
        opacity: .8;
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;left: 0;
        z-index: 2;
    }
    .window {
        width: min(calc(100vw - 2 * var(--s-base-indent)), 400px);
        background-color: var(--c-blocks);
        box-sizing: border-box;
        border-radius: var(--s-border-radius);
        padding: var(--s-base-indent);
    }
    .winbar {
        height: 30px;
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-bottom: var(--s-base-indent);
    }
    .winbar * {
        font-size: 30px;
    }
    .wintitle {
        color: var(--c-accent)
    }
    .close {
        cursor: pointer;
        margin-right: var(--s-base-indent);
    }
    .close:hover {
        color: var(--c-accent)
    }
</style>