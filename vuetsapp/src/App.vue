<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import GalleryComponent from './components/GalleryComponent.vue';
import { reactive } from 'vue';
///
let test = reactive(['https://sun9-79.userapi.com/impg/NBPyizut3Gj0BVxGc-itFQhW90NmfLFoiph9Ag/E6upUrpUM4c.jpg?size=735x702&quality=96&sign=802c4b9dc204536265bc4088f14b4b55&type=album', 'https://sun9-16.userapi.com/impg/AwdGf14i6PlPUlWMbvHvCN7GZWI2FbiRbH0ivA/K5pbvbCcEH4.jpg?size=1000x930&quality=96&sign=53f41984b9f6378d6fbae2840643c273&type=album']);
</script>

<template>
  <div class="wrapper">
    <HeaderComponent />
    <main class="pagewidth pagemargin">
      <RouterView />
      <!----->
      <div class="deleteitlater">
        <GalleryComponent :pics="test"/>
      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<style scoped>
  .wrapper {
    min-height: 100%;
    display: flex;
	  flex-direction: column;
  }
  main {
	  flex: 1 0 auto;
  }
  .deleteitlater {
    height: 100px;
    width: 160px;
  }
</style>