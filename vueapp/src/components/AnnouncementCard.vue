<script setup>
    import {defineProps} from 'vue'
    defineProps(['pic', 'title', 'description', 'price', 'date'])
</script>
<template>
    <div class="announcement">
        <img class="pic" :src="$props.pic">
        <h2 class="title">{{$props.title}}</h2>
        <p class="description">{{$props.description}}</p>
        <p class="price">{{$props.price}}</p>
        <p class="date">{{$props.date}}</p>
    </div>
</template>
<style scoped>
    .announcement {
        background-color: var(--c-back-blocks);
        box-sizing: border-box;
        padding: var(--s-medium);
        border-radius: var(--s-small);
        cursor: pointer;
    }
    .announcement:hover .title, .announcement:hover .price {
        color: var(--c-accent);
    }
    .announcement .title {
        margin: 10px 0;
    }
    .announcement .pic {
        width: 100%;
        object-fit: cover;
        aspect-ratio: 1.4;
        border-radius: var(--s-small);
    }
    .announcement .description {
        margin: 10px 0;
        width: 100%;
        box-sizing: border-box;
        height: 100px;
        overflow: hidden;
        position: relative;
    }
    .announcement .description::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 40px;
        background: linear-gradient(180deg, transparent, var(--c-back-blocks) 80%);
    }
    .price {
        font-size: 26px;
        margin: 0;
    }
    .date {
        color: var(--c-text-pale);
        margin: 0;
        font-size: var(--s-font-smaller);
    }
</style>