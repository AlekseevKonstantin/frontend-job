<template>
  
  <div class="row" style="overflow: hidden;">
   
    <div class="you-tube-group"
          v-for="(itemGroup, i) in youTubeData"
          v-bind:key="i"
          v-bind:class="itemGroup.class">
      <div class="col col-6 col-xs-12"
          v-for="(item, j) in itemGroup.array" 
          v-bind:key="j">
        <a class="you-tube-item" 
          v-bind:href="item.videoUrl" 
          target="_blank">
          <div>
            <img class="you-tybe-item__img"
              v-bind:src="item.imgUrl" 
              alt="image">
          </div>    
          <h5 class="you-tybe-item__head">{{item.title}}</h5>
        </a>
      </div>  
    </div>
  
    <pagination v-on:activePage="activePageShow" v-bind:class="activeClass"></pagination>        
  </div>
</template>

<script>
  import searchYoutube from 'youtube-api-v3-search';
  import pagination from "./pagination.vue";

  export default {
    props:['value'],
    data () {
      return {
        apiKey: 'AIzaSyB40u8c5KFdR8bjjPyU2F8B56bSEdogL2I',
        youTubeData: [],
        youTubeUrl: 'https://www.youtube.com/watch?v=',
        response: null,
        localValue: this.value,
        activeClass: ''
      }
    },

    watch:{

      response(newValue, oldValue){
        if(typeof newValue === 'object'){
          newValue.then(
          (res)=>{
            
            let array = res.items,
                index = 0,
                resArray = [],
                ar = [];

            for (let i = 0; i < array.length; i++) {
              
              let item = {};

              item.videoId = array[i].id.videoId;
              item.videoUrl = this.youTubeUrl+item.videoId;
              item.title = array[i].snippet.title.substring(0,46);
              item.description = array[i].snippet.description;
              item.imgUrl = array[i].snippet.thumbnails.default.url;
              
              resArray.push(item);
              index++;
              
              if(index % 5 == 0){
                if(index == 5){
                  this.youTubeData.push({class:"active", array: resArray});
                }else{
                  this.youTubeData.push({class:"", array: resArray});
                }
                resArray = [];
              }
            }

            this.activeClass = 'active';
            this.$emit("getDataCompleted");
          });
        }
      }
    },
    
    methods:{
       getSearchYouTubeResult(){
        let options = {
          q: this.localValue,
          part:'snippet',
          type:'video',
          maxResults: 20
        };

        this.response = searchYoutube(this.apiKey, options);
      },

      activePageShow(index){
        for (let i = 0; i < this.youTubeData.length; i++) {
          if(this.youTubeData[i].class.indexOf('active') > -1){
            this.youTubeData[i].class = '';
            break;
          }         
        }

        this.youTubeData[index].class = 'active animate';
      }
    },

    components:{
      pagination
    },

    mounted(){
      this.getSearchYouTubeResult();
    },

  }
</script>

<style scoped>

  .you-tube-group{
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    display: none;
  }

  .you-tube-group.active{
    display: flex;
    
  }

  .you-tube-group.animate{
    animation: you-tube-group-animate-left .5s ease;
  }

   @media (max-width: 768px) {
     .you-tube-group.animate{
        animation: you-tube-group-animate-top .5s ease;
      }
   }

  /* animation */
  @keyframes you-tube-group-animate-left {

    0%{
      opacity: 0;
      transform: translateX(100px);
    }

    90%{
      transform: translate(0);
    }

    100%{
      opacity: 1;
    }
  }

  @keyframes you-tube-group-animate-top {

    0%{
      opacity: 0;
      transform: translateY(-100px);
    }

    90%{
      transform: translate(0);
    }

    100%{
      opacity: 1;
    }
  }


  .you-tube-item{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 15px;
  }

  .you-tube-item:hover{
    cursor: pointer;
  }

  .you-tybe-item__head{
    margin-top: 0;
    margin-bottom: 0;
    color: #424242;
    margin-left: 15px;
  }

  .you-tybe-item__img{
    display: block;
  }

  

</style>


