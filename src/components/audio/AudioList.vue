<template>
	<div v-if="isLoading" align="center">
	<img src="./img//load-37.gif" style="width: 60%;">
	</div>
	<!-- content -->
  <div class="wrapper" v-else>
	<div class="links">
		<ul>
			<li data-view="list-view" class="li-list active">
			Latest Audio Files</li>
		</ul>
	</div>
	<div class="view_main">
		<div class="view_wrap list-view" style="display: block;" >
			<div class="view_item" v-for="audi in audio">
				<div class="vi_left" >
				<img src="./img/play_music_audio.png" alt="Loading">
				</div>
				<div class="vi_right">
					<p class="title"> {{ audi.filename }}</p>
					<p class="content">{{ bytesToSize(audi.filesize ) }} - {{  uploadedDate }}</p>
					<RouterLink :to="{ name: 'download', params: {id: audi.id }}" class="text-decoration-none text-white"><div class="btn">Download now</div></RouterLink>
				</div>
			</div>
			<v-pagination
    			v-model="page"
    			:length="audio.length.toString"
    			@click="paginate"></v-pagination>
		</div>
	</div>
</div>
 </template>
  
  <script>
  import {  collection,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
  startAfter, } from 'firebase/firestore';
  import {  onUnmounted } from 'vue';
  import { db } from '../firebase';
  import moment from 'moment';
import titleMixin from '@/titleMixin';
  
  export default {
	mixins: [titleMixin],
	title: 'Darulfaida — Home',
	name: 'Pagination',
	data() {
	  return {
		total: 0,
		paginas: 0,
		limit: 10,
		page: 1,
		isLoading: true,
		uploadedDate: '',
		lastVisible: "",
		firstVisible: "",
		audio: [],
	  };
	},
	mounted() {
		const audioQuery = query(collection(db, 'files'), orderBy("uploadedDate", 'desc'), limit(this.limit));
		const liveAudio = onSnapshot(audioQuery,(snapshot) => {
		this.audio = snapshot.docs.map((doc) => {
			this.isLoading = false;
			const data = doc.data();
			data.uploadedDate = moment(data.uploadedDate.toDate()).format('YYYY-MM-DD HH:mm:ss');
			this.uploadedDate = data.uploadedDate;
			return {
				id: doc.id,
				filename:doc.data().filename,
				filesize:doc.data().filesize,
				DownloadID: doc.data().DownloadID,
			}
		});
	});
	onUnmounted(liveAudio)
	},
	methods: {
  async obtenerDatos() {
  const q = await query(collection(db, "files"), orderBy("uploadedDate", 'desc'));
  const documentSnapshots = await getDocs(q);
  const totalDocumentos = documentSnapshots.docs.length;
  this.total = totalDocumentos;
  this.paginas = Math.ceil(this.total / this.limit);
  const data = await query(
    collection(db, "files"),
    orderBy("uploadedDate", 'desc'),
    limit(this.limit)
  );
  const querySnapshot = await getDocs(data);
  querySnapshot.forEach((doc) => {
    let obra = doc.data();
    obra.id = doc.id;
    this.audio.push(obra);
  });
},
// pagination
async paginate() {
  const q = await query(collection(db, "files"), orderBy("uploadedDate", 'desc'));
  const documentSnapshots = await getDocs(q);
  const firstVisible = documentSnapshots.docs[this.limit * (this.page - 1) - 1] || null;
  this.firstVisible = firstVisible;
  const next = await query(
    collection(db, "files"),
    orderBy("uploadedDate", 'desc'),
    limit(this.limit),
    startAfter(this.firstVisible)
  );
  const querySnapshot = await getDocs(next);
  	this.audio = [];
  	querySnapshot.forEach((doc) => {
    let obra = doc.data();
    obra.id = doc.id;
    this.audio.push(obra);
  });
},

// file size converter function
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
},
created(){
	this.fecthFiles();
}
  }
}
  </script>
 <style>
 @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600&display=swap');

*{
	list-style: none;
	font-family: 'Montserrat', sans-serif;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body{
	background: #ebecf1;
	color: #b3b9b9;
}

.view_item img{
	width: 75px;
}

.wrapper{
	width: auto;
	margin: 20px auto;
}

.links{
	margin-bottom: 25px;
	background: #fff;
	padding: 15px;
	border-radius: 3px;
}

.links ul{
	display: flex;
	justify-content: center;
}

.links ul li{
	margin: 0 15px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 3px;
	font-size: 20px;

}

.links ul li:hover,
.links ul li.active{
	color: #4abd3e;
}

.view_main{
	background: #fff;
	border-radius: 3px;
	padding: 15px;
}

.list-view .view_item {
	background: #fff;
	border: 1px solid #e2efe1;
	margin: 10px;
	padding: 10px 20px;
	display: flex;
	align-items: center;
}

.list-view .view_item:last-child{
	margin-bottom: 0;
}

.list-view .view_item .vi_left{
	margin-right: 25px;
}

.view_item .title{
	font-weight: 600;
}

.view_item .content{
	margin: 5px 0;
	font-size: 14px;
	line-height: 22px;
	font-weight: 200;
}

.view_item .btn{
	width: 125px;
	background: #4abd3e;
	padding: 8px 5px;
	border-radius: 3px;
	color: #fff;
	text-align: center;
	font-weight: 200;
}

.view_item .btn:hover{
	background: #3bd62b;
}

.grid-view{
	width: 100%;
}

.grid-view .view_item {
	display: inline-block;
    border: 1px solid #e2efe1;
    width: 230px;
    padding: 25px;
    text-align: center;
    margin: 10px;
}

.grid-view .view_item .vi_left{
	margin-bottom: 10px;
}

.grid-view .view_item .btn{
	margin: 0 auto;
}
.btn{
  font-size: 12px;
}
 </style>