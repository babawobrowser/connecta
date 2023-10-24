<template>
    <div>
      <h1 align="center">Sorry, we are working on it now</h1>
    </div>
</template>

<script>
import {  collection,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
  startAfter,
where,
getDoc,
FieldPath,
doc, } from 'firebase/firestore';
  import {  onUnmounted } from 'vue';
  import { db } from '@/components/firebase';
  import moment from 'moment';

    export default {
        data() {
           return {
            Fname:null,
            files: [],
           }
        },
        mounted(){
            const q = query(collection(db, 'files'), limit(10), orderBy('uploadedDate', 'desc'), where('category', '==', this.Fname));
            const querySnap = getDocs(q);
           querySnap.then((snap) => {
            snap.docs.map((d) => {
                this.files.push(d.data())
            });
           }); 

        const fileRef = doc(db, 'categories', this.$route.params.id);
      const fileSnap = getDoc(fileRef);
      fileSnap.then((f) => {
       this.Fname = f.data().name
      })
        },
        }
    
</script>

<style lang="scss" scoped>

</style>