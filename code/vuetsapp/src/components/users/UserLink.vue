<script lang="ts" setup>
    import { reactive } from 'vue';
    import { RouterLink } from 'vue-router';
    import users from '../../assets/modules/Users/UsersModule'

    var props = defineProps(['id']);
    var user = reactive(users.get(props.id));
</script>
<template>
    <RouterLink :to="'/profiles/'+id">{{user.login}}</RouterLink>
</template>