<template>
    <v-sheet width="300" class="mx-auto">
      <v-form ref="form">
        <!-- upload file  -->
        <v-file-input
            ref="fileInput"
            accept="image/*"
            label="Select file"></v-file-input>
            <!-- select category -->
        <v-select
        ref="category"
        v-model="selectC"
        :items="cate"
        :rules="[v => !!v || 'Item is required']"
        label="select category"
        required></v-select>
      <!-- select folder -->
      <v-select
      ref="folder"
        v-model="selectF"
        :items="folder"
        :rules="[v => !!v || 'Item is required']"
        label="select folder"
        required
      ></v-select>
      <!-- submit button -->
      <div class="d-flex flex-column">
        <v-btn
          color="success"
          class="mt-4"
          block
          @click="upload">Upload now</v-btn>
          </div>
          <br/>
        </v-form>
        </v-sheet>
        </template>

<script>
import { storage, db } from '@/components/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, Timestamp, } from 'firebase/firestore'

    export default {
        methods: { 
       upload: function() {
        const filedata = (this.$refs.fileInput.files[0])
        const storageRef = ref(storage, 'audio/'+filedata.name);
        uploadBytes(storageRef, this.$refs.fileInput.files[0]).then((snapshot) => {
             getDownloadURL(storageRef).then((e) => {
                addDoc(collection(db, 'files'), {
                uploader: 'Admin',
                filename: filedata.name,
                filesize: filedata.size,
                category: this.selectC,
                folder: this.selectF,
                DownloadID: e,
                uploadedDate: Timestamp.now(),
            })
            })
            
        })
       },
},
data: () => ({
    selectC: null,
    selectF: null,
      folder: [
        'Tafsir',
        'Lacture',
        'Majalisi',
      ],
      cate: [
        'Sheikh Dahiru Usman Bauchi',
        'Sheikh Sharif Ibrahim Saleh',
        'Prof. Ibrahim Maqari',
        'Sheikh Sani Khalifa Zaria',
        'Sheikh Salihu Sallau',
        'Sheikh Umar Sani Fagge',
        'Sheikh Ibrahim Mansur Kaduna',
        'Sheikh Muhammad Sallah Kaduna',
        'Sheikh Ubale Adakawa Kano'
      ],
})
}
</script>

<style lang="scss" scoped>

</style>