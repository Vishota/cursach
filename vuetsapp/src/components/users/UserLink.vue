<script lang="ts" setup>
    import { reactive } from 'vue';
    import { RouterLink } from 'vue-router';
    import users from '../../assets/modules/Users/UsersModule'

    var props = defineProps(['id']);
</script>
<template>
    <RouterLink :to="'/users/'+id">{{users.get(id).login}}</RouterLink>
</template>