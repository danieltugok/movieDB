<template>
  <div class="content">

    <h3 class="text-light"> Busca pela palavra chave: " {{ $route.params.value }} "</h3>

    <div class="content">

        <div class="container">

            <div class="row">
                <div class="col-5 mr-auto">
                    <label for="genreCheckbox" class="text-light">Ordernação filmes</label>
                    <select @change="filterSortByChange($event)" class="form-control filter" v-model="sortBy" name="genreCheckbox">
                        
                        <option value="original_title.asc">Ordem alfabética</option>
                        <option value="release_date.desc">Ultimos lançamentos</option>
                        <option value="popularity.desc">Popularidade</option>
                        <option value="vote_average.desc">Avaliação</option>
                    </select>        
                </div>

                <div class="col-5 ml-auto">
                    <label for="genreCheckbox" class="text-light"> Filtrar por Gênero</label>
                    <select @change="filterGenresChange($event)" class="form-control filter" v-model="genresFilter" name="genreCheckbox">
                        
                        <option v-for="genre in genres" :value="genre.id" :key="genre.id"> {{ genre.name }} </option>
                    </select>        
                </div>
            </div>
        </div>


    <br>

    <div class="container">
        <ul>    
            <div class="row">
                <li v-for="item in value" class="col-3 item-filme pad15" v-bind:key="item.id" >            
                    <div class="card" >
                        <div ></div>
                        <img class="card-img-top img-fluid" :src="checkImage( item.poster_path )" :alt="item.title">
                        <div class="card-body">
                            <h5 class="card-title">{{ item.original_title }}</h5>
                            <div>
                                <i class="fas fa-star"></i>
                                <p class="card-text">{{ item.vote_average.toFixed(2) }}</p>
                            </div>
                        </div>               
                        <div class="card-body">
                            <button @click="verMaisBtnClicked(item.id)">Ver mais...</button>
                        </div>
                    </div>
                </li>
            </div>
        </ul>
    </div>

    <ul id="pagination" class="row justify-content-around">
        <li class="pagination-item">
            <button href="#" @click="prevBtnClicked" type="button" :disabled="pg <= 1" class="btn btn-light">Anterior</button>
        </li>
        <li class="pagination-item">
            <button href="#" @click="nextBtnClicked" type="button" class="btn btn-light">Próxima</button>
        </li>
    </ul> 
 
    
  </div>

 
    
  </div>
</template>

<script>
export default {

    data() {
        return {
            routeParams: null,
            value: null,
            filter: null,
            genres: null,
            sortBy: "",
            pg: 1,
            genresFilter: ""

        }
    },

    created() {
        console.log(this.$route.params.value);
        this.getMovies();
        this.getGenres();     
    },

    methods:{
        getMovies() {
            this.$http.get("https://api.themoviedb.org/3/search/movie?api_key=4830d7b7e25fd8f0bb4597ad59bfdd39&language=pt-BR&query=" + this.$route.params.value + "&page=1&include_adult=false")
            .then((resp) => {
                if(resp.status === 200) {
                    this.value = resp.data.results;

                }
            })

        },

        getGenres() {
            this.$http.get('https://api.themoviedb.org/3/genre/movie/list?api_key=4830d7b7e25fd8f0bb4597ad59bfdd39&language=pt-BR')
            .then((resp) => {
                if(resp.status === 200) {
                this.genres = resp.data.genres;
                    // console.log(this.genres);
                }
            })

        },

        filterSortByChange(event) {
            console.log(event.target.value);
            this.pg = 1;

            this.$http.get('https://api.themoviedb.org/3/discover/movie?api_key=4830d7b7e25fd8f0bb4597ad59bfdd39&language=pt-BR&sort_by=' + event.target.value + '&query=' + this.$route.params.value +' &include_adult=false&include_video=false&page='+ this.pg)
                .then((resp) => {
                    if(resp.status === 200) {
                    this.value = resp.data.results;
                }
            }) 

            
        },

        filterGenresChange(event) {
            console.log(event.target.value);
            this.pg = 1;

            this.$http.get('https://api.themoviedb.org/3/discover/movie?api_key=4830d7b7e25fd8f0bb4597ad59bfdd39&language=pt-BR&sort_by=' + this.sortBy + '&include_adult=false&include_video=false&page='+ this.pg + '&with_genres=' + event.target.value )
                .then((resp) => {
                    if(resp.status === 200) {
                    this.value = resp.data.results;
                }
            }) 

            
        },

        nextBtnClicked() {            
            this.pg++;            

            this.$http.get('https://api.themoviedb.org/3/discover/movie?api_key=4830d7b7e25fd8f0bb4597ad59bfdd39&language=pt-br&sort_by=' + this.sortBy + '&include_adult=false&include_video=false&page='+ this.pg)
                .then((resp) => {
                    if(resp.status === 200) {
                    this.value = resp.data.results;
                }
            })          
        },

        prevBtnClicked() {
            this.pg--;            

            this.$http.get('https://api.themoviedb.org/3/discover/movie?api_key=4830d7b7e25fd8f0bb4597ad59bfdd39&language=pt-br&sort_by=' + this.sortBy + '&include_adult=false&include_video=false&page='+ this.pg)
                .then((resp) => {
                    if(resp.status === 200) {
                    this.value = resp.data.results;
                }
            })
        },

        getSearchList( value ){
            console.log( value );
            this.getMovies();
            this.getGenres(); 
        },

        verMaisBtnClicked(item){
            this.$emit('verMaisBtnClicked', item);
        },

        checkImage( img ){
            if ( img === null ) {
                return "/img/no_pic.2f519d5e.jpg";
            } else {
                return "http://image.tmdb.org/t/p/w500/" + img;
            }
            // return item.poster_path ? "http://image.tmdb.org/t/p/w500/" + item.poster_path : ../assets/no_pic.jpg;

        },

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
