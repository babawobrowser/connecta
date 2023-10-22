<template>
  <v-app class="bg-grey-lighten-3">
    <default-bar />

    <default-view />
    <Footer />
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import Footer from '@/components/Footer.vue';
</script>
