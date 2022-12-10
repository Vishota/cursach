<script lang="ts" setup>
    import { reactive } from 'vue';
    import { RouterLink } from 'vue-router';
    import UsersModule from '../../assets/modules/Users/UsersModule'

    var props = defineProps(['id']);
    var usersModule: UsersModule = reactive(UsersModule.instance);
</script>
<template>
    <RouterLink :to="'/users/'+id">{{usersModule.get(id).login()}}</RouterLink>
</template>