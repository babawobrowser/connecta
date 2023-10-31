<template>
    <div v-if="isLoading"></div>
   <div class="container" v-else>
<h1 class="heading">OUR CATEGORIES</h1>
<div class="box-container">
    <div class="box" v-for="category in categories">
        <img src="./img/avatar.png"/>
        <h3>{{ category.name }}</h3>
        <p>{{ category.desc }}</p>
        <RouterLink :to="{ name: 'singlecate', params: {id: category.name }}" class="btn">Open</RouterLink>
    </div>
</div>

</div>
<div class="shareaholic-canvas" data-app="recommendations" data-app-id="30570920"></div>
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
  import { db } from '@/components/firebase';
    export default {
        data: () => ({
            isLoading: true,
           categories: []
        }),
    mounted() {
		const categories = query(collection(db, 'categories'),orderBy('date'), limit(10));
		const liveCategories = onSnapshot(categories,(snapshot) => {
		this.categories = snapshot.docs.map((doc) => {
			this.isLoading = false;
			return {
				id: doc.id,
				name:doc.data().name,
                desc: doc.data().desc
			}
		});
	});
	onUnmounted(liveCategories)
	},
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap');

*{
    font-family: 'Poppins', sans-serif;
    margin:0; padding:0;
    box-sizing: border-box;
    outline: none; border:none;
    text-decoration: none;
    text-transform: capitalize;
    transition: .2s linear;
}

.container{
    
    padding:15px 9%;
    padding-bottom: 100px;
}

.container .heading{
    text-align: center;
    padding-bottom: 15px;
    color:#fff;
    text-shadow: 0 5px 10px rgba(0,0,0,.2);
    font-size: 50px;
    background:linear-gradient(45deg, blueviolet, lightgreen);
}

.container .box-container{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    gap:15px;
}

.container .box-container .box{
    box-shadow: 0 5px 10px rgba(0,0,0,.2);
    border-radius: 5px;
    background: #fff;
    text-align: center;
    padding:30px 20px;
}

.container .box-container .box img{
    height: 80px;
}

.container .box-container .box h3{
    color:#444;
    font-size: 22px;
    padding:10px 0;
}

.container .box-container .box p{
    color:#777;
    font-size: 15px;
    line-height: 1.8;
}

.container .box-container .box .btn{
    margin-top: 10px;
    display: inline-block;
    background:#333;
    color:#fff;
    font-size: 17px;
    border-radius: 5px;
    padding: 8px 25px;
}

.container .box-container .box .btn:hover{
    letter-spacing: 1px;
}

.container .box-container .box:hover{
    box-shadow: 0 10px 15px rgba(0,0,0,.3);
    transform: scale(1.03);
}

@media (max-width:768px){
    .container{
        padding:20px;
    }
}
</style>