<template>
  <div class="container" v-bind:class="hide">

    <preloader v-bind:preloaderClass="preloaderClass"
               v-bind:preloaderArrowClass="preloaderArrowClass"
               v-bind:key="preloaderKey">
    </preloader>

    <div class="row">

      <header class="col col-12 header">
        <div class="logo">
          <img src="./assets/youtube-icon.svg" alt="logo" class="logo-img"> 
          <p class="logo-title">Search</p>
        </div>
        <div class="search">
          <input type="text" v-model="value" class="search-input">
          <button type="button" class="search-btn" v-on:click="newSearch">Поиск</button>
        </div>
      </header>

      <div class="col col-12">
        <h2 class="search-caption">Видео с YouTube по запросу "{{this.svalue}}"</h2>
      </div>
    </div>

    <you-tube-search-result v-bind:value="svalue" 
                            v-bind:key="svalue"
                            v-on:getDataCompleted="preloaderActive">
    </you-tube-search-result>
  
  </div>
</template>

<script>
  import youTubeSearchResult from "./components/youTubeSearchResult.vue";
  import preloader from "./components/preloader.vue";
  export default {
    name: 'app',
    data(){
      return{
        value: 'html',
        svalue: 'html',
        preloaderClass: '',
        preloaderArrowClass: '',
        preloaderKey: 0,
        hide: ''
      }
    },

    methods:{

      preloadRender(){
        this.preloaderClass = 'fade';
        this.preloaderArrowClass = 'animate';
        this.preloaderKey = this.preloaderKey + 1;
      },

      newSearch(){
        this.svalue = this.value;
        this.hide = 'hide'; 
      },

      preloaderActive(){
        this.preloadRender();
        this.hide = '';
      }

    },
    components:{
      youTubeSearchResult,
      preloader
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a{
    text-decoration: none;
  }

  .container {
    position: relative;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }

  .container.hide{
    opacity: 0;

  }

  @media (min-width: 768px) {
    .container {
      width: 750px;
    }
  }
  @media (min-width: 992px) {
    .container {
      width: 970px;
    }
  }
  @media (min-width: 1200px) {
    .container {
      width: 1170px;
    }
  }

  .row {
    margin-right: -15px;
    margin-left: -15px;
    display: flex;
    flex-wrap: wrap;
  }

  .col{
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
  }

  .col-12{
    width: 100%;
  }

  .col-6{
    width: 50%;
  }

  .col-4{
    width: 33.3333%;
  }

  @media (max-width: 768px) {
    .col-xs-12{
      width: 100%;
    }
  }

  .logo{
    display: flex;
    align-items: center;
  }

  .logo-img{
    width: 40px;
    height: 25px;
  }

  .logo-title{
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 4px;
    font-size: 18px;
    font-weight: 600;
  }

  .search{
    display: flex;
    margin-left: 20%;
  }

  .search-input{
    padding: 5px;
    border: 1px solid #d4d4d4;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    min-width: 250px;
  }
  
  .search-btn{
    background-color: rgb(41, 115, 249);
    color: #fff;
    padding: 5px;
    border: none;
    border-color: #d4d4d4;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .search-caption{
    margin-top: 5px;
    font-size: 18px;
  }

  .header{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 10px;
  }

  @media (max-width: 768px) {
    .header{
      justify-content: space-between;
    }

    .search{
      margin-left: 0;
      width: 75%;
      justify-content: flex-end;
    }

    .search-input{
      min-width: 100px;
      width: 75%;
    }
  }  

</style>
