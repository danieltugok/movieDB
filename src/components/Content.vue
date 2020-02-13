<template>
  <div class="content">
    <h1>{{ msg }}</h1>

    <div class="container">
        <ul>    
            <div class="row">
            <li v-for="item in value" class="col-3 item-filme" v-bind:key="item.id" >            
                <div class="card" >
                    <img v-if="item.poster_path" class="card-img-top img-fluid" :src='"http://image.tmdb.org/t/p/w500/" + item.poster_path' :alt="item.title">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.title }}</h5>
                        <div>
                            <i>star</i>
                            <p class="card-text">{{ item.popularity.toFixed(2) }}</p>
                        </div>
                    </div>               
                    <div class="card-body">
                        <button>Veja mais...</button>
                    </div>
                </div>
            </li>
            </div>
        </ul>
    </div>
 
    
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

    .content{
        margin-top: 50px;
    }

    .item-filme{
        background-color: #ccc;
    }

    .card{
        min-height: 100%;
    }

</style>
