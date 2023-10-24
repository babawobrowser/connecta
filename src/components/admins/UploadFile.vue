<template>
    <v-sheet width="300" class="mx-auto">
      <v-form ref="form">
        <!-- upload file  -->
        <v-file-input
            ref="fileInput"
            accept="audio/*"
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
        <!-- <v-btn
          color="success"
          class="mt-4"
          block
          @click="upload">Upload now</v-btn> -->
          <span v-if="isUploading" align="center">
            <img src="./img/uploading.gif" style="width: 100px; height: 100;"/>
          </span>
          <span v-else> <v-btn
          color="success"
          class="mt-4"
          block
          @click="upload">Upload now</v-btn></span>
          </div>
          <br/>
        </v-form>
        </v-sheet>
        </template>

<script>
import { storage, db } from '@/components/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, Timestamp,query, limit, onSnapshot, getDoc, getDocs } from 'firebase/firestore'
import {  onUnmounted } from 'vue';

    export default {
        methods: { 
       upload: function() {
        this.isUploading = true;
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
            });
            this.isUploading = false;
            this.$refs.form.reset();
            })
            
        })
       },
},
mounted() {
  // fetch categories from db
		const collRef = collection(db, 'categories');
    getDocs(collRef).then((snap) => {
      this.cate = snap.docs.map((doc) => doc.data().name)
    });
    // fetch folder from db
    const collRefs = collection(db, 'folders');
    getDocs(collRefs).then((snap) => {
      this.folder = snap.docs.map((doc) => doc.data().name)
    })
	},
data: () => ({
  isUploading: false,
    selectC: null,
    selectF: null,
      folder: [],
      cate: [],
})
}
</script>

<style lang="scss" scoped>

</style>