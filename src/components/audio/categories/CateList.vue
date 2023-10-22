<template>
   <v-card
    class="mx-auto "
    max-width="auto">
    <v-list>
        <v-list-item
        v-for="item in items"
        color="primary"
        rounded="xl">
        <template v-slot:prepend>
          <v-icon icon="mdi-flag"></v-icon>
        </template>
        <v-list-item-title v-text="item.title"></v-list-item-title>
        <v-list-item-subtitle>size</v-list-item-subtitle>
      </v-list-item>
    </v-list>
    </v-card>
</template>

<script>
    export default {
        data: () => ({
            items: [
                { title: 'babawo',},
                { title: 'babawo 2',}
            ]
        })
    }
</script>

<style lang="scss" scoped>

</style>