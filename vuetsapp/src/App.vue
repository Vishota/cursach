<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

</script>

<template>
  <div class="wrapper">
    <HeaderComponent />
    <main class="pagewidth pagemargin">
      <RouterView />
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
</style>
