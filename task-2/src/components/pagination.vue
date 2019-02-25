<template>
  <ul class="pagination">
    <li class="pagination-item"
        v-for="(item, i) in paginations"
        v-bind:key="i"
        v-bind:class="item.class"
        v-on:click="eventClick">
        {{item.value}}
    </li>
  </ul>
</template>

<script>
  export default {
    data(){
      return {
        paginations:[
          {
           class: "active",
           value: 1 
          },

          {
           class: "",
           value: 2 
          },

          {
           class: "",
           value: 3 
          },

          {
           class: "",
           value: 4 
          }
        ]
      }
    },
    
    methods:{
      eventClick(e){
        let elem = e.target;
        if(!elem.classList.contains('active')){
          let val = parseInt(elem.innerText);

          for (let i = 0; i < this.paginations.length; i++) {
            if (this.paginations[i].value !== val){
              this.paginations[i].class = '';
            }else if(this.paginations[i].value === val){
              this.paginations[i].class = 'active';
            }
            
          }

          this.$emit("activePage", val-1);
        }
      }
    }
  }
</script>

<style scoped>

  .pagination{
    margin-left: auto;
    margin-right: auto;
    margin-top: 45px;
    display: none;
  }

  .pagination.active{
    display: block;
    animation: pagination-animate .3s ease;
  }

  /* animation */
  @keyframes pagination-animate {

    0%{
      opacity: 0;
      
    }

    100%{
      opacity: 1;
    }
  }

  .pagination-item{
    padding: 5px;
    transition: background-color .5s ease;
  }

  .pagination-item:hover{
    cursor: pointer;
    background-color: rgba(41, 115, 249, .3);
    color: #424242;
  }

  .pagination-item.active{
    background-color: rgb(41, 115, 249);
    color: #fff;
  }

</style>


