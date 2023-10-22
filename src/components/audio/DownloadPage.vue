<template>
  <!-- content -->
  <span v-if="file">
    <v-container fluid>
    <v-row align="center">
      <v-col cols="12">
        <v-card>
          <v-card-title>Download File</v-card-title>
          <v-card-text>
            <div>
              <p><strong>File Name:</strong> {{ file.filename }}</p>
              <v-spacer></v-spacer>
              <p><strong>File Size:</strong> {{  bytesToSize(file.filesize) }}</p>
              <v-spacer></v-spacer>
            </div>
          
            <v-spacer></v-spacer>
            <v-btn @click="downloadFile" color="primary" dark block>
              Download
            </v-btn>  
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </span>
  <div v-else align="center">
    <img src="./img//load-37.gif" style="width: 30%"/>
  </div>
</template>

<script>
import { doc, getDoc, } from 'firebase/firestore';
import { db } from '../firebase';
import axios from 'axios';


export default {
 data(){
  return {
    file: null,
  };
 },
 created(){
  const fileId = this.$route.params.id;
  this.getFile(fileId)
 },
 methods: {
  async getFile(fileId){
    const fileRef = doc(db, 'files', fileId);
    try{
      const fileSnap = await getDoc(fileRef);
      if(fileSnap.exists()){
        this.file = fileSnap.data();
      } else {
        console.log('file not found');
      }

    } catch(e)  {
      console.error('Error getting document: ', e);
    }
  },
  // download function
  async downloadFile() {
    try {
  // Replace 'file-url' with the URL of the file in Firebase Storage.
  const fileUrl = this.file.DownloadID;

  // Use Axios to make a GET request to download the file.
  const response = await axios.get(fileUrl, {
    responseType: 'blob',
  });

  // Create a URL for the blob and a link to trigger the download.
  const blob = new Blob([response.data]);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = this.file.filename; // Set the desired download filename
  a.click();
  window.URL.revokeObjectURL(url);
} catch (error) {
  console.error('Error downloading file:', error);
}
},
  

// file size
  bytesToSize: function (bytes, decimals = 2) {
  if (!Number(bytes)) {
    return '0 Bytes';
  }
  const kbToBytes = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    'Bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB',
  ];
  const index = Math.floor(
    Math.log(bytes) / Math.log(kbToBytes),
  );
  return `${parseFloat(
    (bytes / Math.pow(kbToBytes, index)).toFixed(dm),
  )} ${sizes[index]}`;
}}
}
</script>

<style>
/* Add your custom styles here */
</style>
