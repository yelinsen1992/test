<template>
  <div class="hello">
    <ul class="one">
      <li v-for="(item,index) in data" :key="index">
        <p>姓名：{{item.name}}</p>
        <p>年龄：{{item.age}}</p>
      </li>
    </ul>
    <button @click="addData">加载更多</button>
    <div class="swiper-container" @mouseenter="stopPlay" @mouseleave="startPlay">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(slide,index) in bannerList" :key="index">
              <img :src="slide.url">
            </div>
        </div>

        <div class="swiper-pagination"></div>
        <!-- <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div> -->
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'HelloWorld',
  data () {
    return {
      data:[],
      bannerList:[
        // {url:'../../static/images/650x300_1.jpg'},
        // {url:'../../static/images/650x300_1.jpg'},
        // {url:'../../static/images/650x300_1.jpg'},
      ]
    }
  },
  created:function(){
    this.getData();
  },
  mounted:function(){
    this.getBanner();
    let that = this;
    that.$nextTick(function(){
      setTimeout(function(){
        that.mySwiper = new Swiper('.swiper-container', {  
          loop:true,
          autoplay:{
            delay:3000,
          },
          observer:true,
          observeParents:true,
          pagination:{
            el:'.swiper-pagination',
            clickable:true,
          },
          // navigation: {
          //   nextEl: '.swiper-button-next',
          //   prevEl: '.swiper-button-prev',
          // },
        });
      },200);    
    });
  },
  methods:{
    stopPlay:function(){
      this.mySwiper.autoplay.stop();
      console.log('停止轮播');
    },
    startPlay:function(){
      this.mySwiper.autoplay.start();
      console.log('开始轮播');
    },
    getData:function(){
      this.axios.get('/api/data')
      .then( res => {  
        this.data = res.data.people;
      })
      .catch( error => {
        console.log(error)
      })
    },
    addData:function(){
        this.axios.get('/api/data')
      .then( res => {   
        this.data = this.data.concat(res.data.people);
      })    
    },
    getBanner:function(){
      this.axios.get('/api/homebanner')
      .then(res => {
        // console.log(res);
        this.bannerList = res.data.imgUrl;
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swiper-slide img{width:100%};
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
}
a {
  color: #42b983;
}
.one{min-width:320px; max-width:640px; margin:0 auto;}
.one:after{
  content:''; 
  display:block;
  clear: both;
  height:0;
}
.one li{
  float:left;
  padding:0 5px;
  width:33.33%;
  box-sizing: border-box;
  border:1px solid #ccc;
  margin-left:-1px;
  margin-top:-1px;
}
.one li p{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;  
}
button{
  border:none;
  margin:30px auto;
  padding:3px 10px;
}
</style>
