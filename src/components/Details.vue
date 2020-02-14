<template>
  <div class="content">
    DETAILS
    {{ $route.params.id }}

    <div class="row justify-content-center">

        <div class="card mb-3" style="max-width: 840px;">

            <br>

            <h1 class="card-title">{{ this.value.original_title }}</h1>

            <hr>

            <div class="row no-gutters">

                <div class="col-md-4">
                    <img :src='checkImage( this.value.poster_path )' class="card-img" alt="">
                </div>

                <div class="col-md-8">
                    <div class="card-body">
                        

                        
                        <div class="apresentacao">
                            <h3>Sinopse</h3>
                            <p class="card-text">{{ this.value.overview }}</p>
                            <p v-if='this.value.overview == ""' class="text-muted" > Não há Sinopse para esse filme. </p>


                            <hr>

                            <div class="row">
                                <p class="col card-text">{{ this.value.vote_count }}</p>
                                <p class="col card-text">{{ this.value.vote_average }}</p>
                                <p class="col card-text">{{ this.value.popularity }}</p>
                            </div>

                            <hr>

                            <div class="row">                            

                                <div class="col">
                                    <ul class="list-group">
                                        <li class="list-group-item active">CAST</li>
                                        <li v-for="actors in cast" :key="actors.id" class="list-group-item">{{ actors.name }}</li>
                                        <li v-if="cast == null" class="list-group-item list-group-item-secondary"> Não foi encontrado nenhum ator. </li>

                                    </ul>

                                </div>

                                <div class="col">
                                    <ul class="list-group">
                                        <li class="list-group-item active">FILMES SEMELHANTES</li>
                                        <li v-for="movie in similarMovies" :key="movie.id" class="list-group-item">{{ movie.title }}</li>
                                        <li v-if='similarMovies == ""' class="list-group-item list-group-item-secondary"> Nenhum filme encontrado. </li>
                                    </ul>
                                </div>

                            </div>
                        </div>                    
                    </div>
                </div>
            </div>
        </div>
    </div>


 
    
  </div>
</template>

<script>
export default {

  data() {
    return {
      value: null,
      cast: null,
      similarMovies: null

    }
  },


  beforeCreate() {
        this.$http.get('https://api.themoviedb.org/3/movie/' + this.$route.params.id + '?api_key=4830d7b7e25fd8f0bb4597ad59bfdd39&language=pt-BR')
            .then((resp) => {
                if(resp.status === 200) {
                this.value = resp.data;                


          }
        })


        this.$http.get('https://api.themoviedb.org/3/movie/' + this.$route.params.id + '/credits?api_key=4830d7b7e25fd8f0bb4597ad59bfdd39')
            .then((resp) => {
                if(resp.status === 200) {
                this.cast = resp.data.cast;                


          }
        })


        this.$http.get('https://api.themoviedb.org/3/movie/' + this.$route.params.id + '/similar?api_key=4830d7b7e25fd8f0bb4597ad59bfdd39&language=pt-BR&page=1')
            .then((resp) => {
                if(resp.status === 200) {
                this.similarMovies = resp.data.results;                


          }
        })

        

    },

    methods:{

        checkImage( img ){
            if ( img === null ) {
                return "/img/no_pic.2f519d5e.jpg";
            } else {
                return "http://image.tmdb.org/t/p/w500/" + img;
            }

        },
    }

  
}
</script>




<style scoped>

    ul {
        list-style-type: none;
    }

    .apresentacao{
        text-align: left;
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
