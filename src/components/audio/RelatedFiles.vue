<template>
   
   <!-- content -->
  <div class="wrapper">
    <h2 class="text-grey ml-3">You may also like this</h2>
		<div class="view_wrap list-view" style="display: block;" >
			<div class="view_item" v-for="file in relatedFiles">
				<div class="vi_left" >
				<img src="./img/play_music_audio.png" alt="Loading">
				</div>
                <RouterLink  :to="{ name: 'download', params: {id: file.id }}" class="text-decoration-none">
				<div class="vi_right">
					<p class="title"> {{ file.filename }}</p>
					<p class="content">{{  file.folder }}</p>
				</div>
                </RouterLink>
			</div>
            
        </div>
     </div>
</template>

<script>
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

    export default {
        props: {
            fileID: String,
        },
        mounted() {
		const audioQuery = getDocs(query(collection(db, 'files'), orderBy("uploadedDate", 'asc'), limit(5)));
        const relatedFiles = [];
        audioQuery.then((docs) => {
            docs.forEach((doc) => {
                if(doc.id !== this.fileID) {
                    relatedFiles.push(doc.data());
                }
            });
            this.relatedFiles = relatedFiles;
        })
	},
    data(){
        return {
            relatedFiles: [],
        }
    }
    }
</script>

<style lang="scss" scoped>
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
	padding: 8px;
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
	padding: 8px 10px;
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