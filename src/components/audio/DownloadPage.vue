<template>
  <!-- content -->
  <span v-if="file">
    <v-container fluid>
    <v-row align="center">
      <v-col cols="12">
        <v-card>
          <v-card-title>Download File</v-card-title>
          <br/>
          <v-card-text>
            <div>
              <p><strong>File Name:</strong> {{ file.filename }}</p>
              <br/>
              <p><strong>File Size:</strong> {{  bytesToSize(file.filesize) }}</p>
              <br/>
              <p><strong>Category: </strong><RouterLink  :to="{ name: 'singlecate', params: {id: file.category }}" class="text-decoration-none">{{ file.category }}</RouterLink></p>
            </div>
            <br/>
            <div v-if="isDownloading"> 
            <v-progress-linear
              v-model="progres"
              color="blue-grey"
              height="25">
            <template v-slot:default="{ value }">
            <strong>{{ Math.ceil(value) }}%</strong>
            </template>
            </v-progress-linear>
            </div>
            <div v-else>
            <v-btn @click="downloadFile" color="primary" dark block>
              Download Now
            </v-btn> 
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div><ShareNetwork
        network="facebook"
        :url="url"
        :title="title"
        :description="description"
        :quote="quote"
        :hashtags="hashtags"
        
      >
      <v-icon icon="mdi-facebook" size="40"></v-icon>
    </ShareNetwork>
    </div>
  </v-container>
  <br/>
  <RelatedFiles :file-i-d="this.$route.params.id"></RelatedFiles>
  </span>
  <div v-else align="center">
    <img src="./img//load-37.gif" style="width: 30%"/>
  </div>
  
</template>

<script>
import { doc, getDoc, } from 'firebase/firestore';
import { db } from '../firebase';
import axios from 'axios';
import titleMixin from '@/titleMixin';
import RelatedFiles from './RelatedFiles.vue';

export default {
  mixins: [titleMixin],
  
 data(){
  return {
    url: 'https://darulfaidang.com/file/'+this.$route.params.id,
      title: 'Say hi to Vite! A brand new, extremely fast development setup for Vue.',
      description: 'This week, I’d like to introduce you to "Vite", which means "Fast". It’s a brand new development setup created by Evan You.',
      quote: 'The hot reload is so fast it\'s near instant. - Evan You',
      hashtags: 'vuejs,vite,javascript',
    isDownloading: false,
    progres: 0,
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
        document.title = 'Darulfaida — ' + fileSnap.data().filename
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
    const fileUrl = this.file.DownloadID;
    
    const response = await fetch(fileUrl);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const contentDisposition = response.headers.get('content-disposition');
    const filename = contentDisposition ? contentDisposition.split('filename=')[1] : this.file.filename;

    // Get the total file size from the Content-Length header.
    const contentLength = parseInt(response.headers.get('content-length') || '0', 10);
    let downloadedSize = 0;

    const reader = response.body.getReader();

    const blobChunks = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      downloadedSize += value.length;
      blobChunks.push(value);

      // Calculate and display the download progress here.
      const progress = (downloadedSize / contentLength) * 100;
      this.isDownloading = true;
      this.progres = progress.toFixed(2);
    }

    // Create a blob from the downloaded chunks.
    const blob = new Blob(blobChunks);

    // Create a URL for the blob and a link to trigger the download.
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
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
}},
components: {
  RelatedFiles,
}
}
</script>

<style>
/* Add your custom styles here */
</style>
