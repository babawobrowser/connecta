<template>
    <v-footer
      class="bg-indigo-lighten-1 text-center d-flex flex-column"
    >
      <div>
        <a href="https://facebook.com/darulfaira" class="text-decoration-none text-white ml-n20"><v-icon icon="mdi-facebook" size="40"></v-icon></a>
        <a href="https://facebook.com" class="text-decoration-none text-white"><v-icon icon="mdi-twitter" size="40"></v-icon></a>
        <a href="https://facebook.com" class="text-decoration-none text-white"><v-icon icon="mdi-youtube" size="40"></v-icon></a>
        <a href="https://facebook.com" class="text-decoration-none text-white"><v-icon icon="mdi-instagram" size="40"></v-icon></a>
      </div>
  
      <div class="pt-0">
        Darulfaida is an online islamic website that provide a room for visitors to search, read, listing and or download preaching from diffirents scholars from across the glob. We provide an esteem service on delivering digital products aimed at widespreading islamic knowladge, islamic civilazation, moral behevior and promoting unity among muslim ummah.
      </div>
  
      <v-divider></v-divider>
  
      <div>
        {{ new Date().getFullYear() }} — <strong>Darulfaida</strong>
      </div> 
    </v-footer>
    <div class="bg-black pa-6 text-center "><RouterLink to="/about" class="text-decoration-none text-white">About</RouterLink> | <RouterLink to="/policy" class="text-decoration-none text-white">Policy</RouterLink> | <RouterLink to="/contact" class="text-decoration-none text-white">Contact</RouterLink></div>
  </template>

<script>
    export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-youtube',
        'mdi-instagram',
      ],
    }),
  }
</script>

<style lang="scss" scoped>

</style>