<template>
  <div class="content">
    <h1>{{ msg }}</h1>

    SOBREEEEEEEE
 
    
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  },

  data() {
    return {
      value: null

    }
  },


  beforeCreate() {
        this.$http.get('https://api.themoviedb.org/3/discover/movie?api_key=4830d7b7e25fd8f0bb4597ad59bfdd39&language=pt-br&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page=1')
          .then((resp) => {
              if(resp.status === 200) {
                this.value = resp.data.results;


                


          }
        })

    }

  
}
</script>




<style scoped>

    ul {
        list-style-type: none;
    }

    .pad15{
        padding-top: 15px;
        padding-bottom: 15px;
    }

    .content{
        margin-top: 50px;
    }

    .item-filme{
        /* background-color: #ccc; */
    }

    .card{
        min-height: 100%;
    }

</style>
