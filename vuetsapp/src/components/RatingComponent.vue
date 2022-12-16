<script lang="ts" setup>
    import ratingModule from '@/assets/modules/Rating/RatingModule';
    import lang from '@/assets/modules/Lang/Lang';
    var props = defineProps(['id']);
    var rating = ratingModule.average(props.id);
</script>
<template>
    <p>{{lang.get().rating}}: <span :class="{ good: rating >= 4, okay: rating >= 3 && rating < 4, bad: rating < 3 }">{{rating}}</span></p>
</template>
<style>
    .bad {
        color: var(--c-bad);
    }
    .okay {
        color: var(--c-okay);
    }
    .good {
        color: var(--c-good);
    }
</style>