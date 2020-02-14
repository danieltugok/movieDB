<template>
    <div class="content">

        <div class="container" :key="this.componentKey">
            <div class="row">
                <div class="col-5 mr-auto">
                    <label for="genreCheckbox" class="text-light"> Filtrar por Gênero</label>
                    <select @change="filterChange($event)" class="form-control filter" v-model="key" name="genreCheckbox">
                        
                        <option v-for="genre in genres" :value="genre.id" :key="genre.id"> {{ genre.name }} </option>
                    </select>        
                </div>

                <div class="col-5 ml-auto">
                    <label for="genreCheckbox" class="text-light"> Filtrar por Gênero</label>
                    <select @change="filterChange($event)" class="form-control filter" v-model="key" name="genreCheckbox">
                        
                        <option v-for="genre in genres" :value="genre.id" :key="genre.id"> {{ genre.name }} </option>
                    </select>        
                </div>
            </div>

            <br>

            <ul>    
                <div class="row">
                    <li v-for="item in movies" class="col-3 item-filme pad15" :key="item.id" >            
                        <div class="card" >
                            <div ></div>
                            <img class="card-img-top img-fluid" :src="checkImage( item.poster_path )" :alt="item.title">
                            <div class="card-body">
                                <h5 class="card-title">{{ item.original_title }}</h5>
                                <div>
                                    <i>star</i>
                                    <p class="card-text">{{ item.vote_average.toFixed(2) }}</p>
                                </div>
                            </div>               
                            <div class="card-body">
                                <button @click="verMaisBtnClicked(item.id)" class="btn btn-success">Ver mais...</button>
                            </div>
                        </div>
                    </li>
                </div>
            </ul>
        </div>


        <ul id="pagination" class="row justify-content-around">
            <li class="pagination-item">
                <button href="#" @click="prevBtnClicked" type="button" :disabled="pg <= 1" >Anterior</button>
            </li>
            <li class="pagination-item">
                <button href="#" @click="nextBtnClicked" type="button" >Próxima</button>
            </li>
        </ul> 
    
    </div>
</template>

<script>
export default {
    props: {
        componentKey: {
            type: Number,
            default: 1
        },
    },

  data() {
    return {
        movies: null,
        genres: null,
        pagination: [],
        key: null,
        pg: 1


    }
  },


  beforeCreate() {
        this.$http.get('https://api.themoviedb.org/3/discover/movie?api_key=4830d7b7e25fd8f0bb4597ad59bfdd39&language=pt-br&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page=1')
            .then((resp) => {
                if(resp.status === 200) {
                this.movies = resp.data.results;

                this.pagination.push(resp.data.page);
                this.pagination.push(resp.data.total_results);
                this.pagination.push(resp.data.total_pages);       

            }
        })



        this.$http.get('https://api.themoviedb.org/3/genre/movie/list?api_key=4830d7b7e25fd8f0bb4597ad59bfdd39&language=pt-BR')
            .then((resp) => {
                if(resp.status === 200) {
                this.genres = resp.data.genres;

                // console.log(this.genres);            

            }
        })

    },

    methods: {
        verMaisBtnClicked(item){
            this.$emit('verMaisBtnClicked', item);
        },

        filterChange(event) {
            console.log(event.target.value)
        },

        checkImage( img ){
            if ( img === null ) {
                return "/img/no_pic.2f519d5e.jpg";
            } else {
                return "http://image.tmdb.org/t/p/w500/" + img;
            }
            // return item.poster_path ? "http://image.tmdb.org/t/p/w500/" + item.poster_path : ../assets/no_pic.jpg;

        },

        nextBtnClicked() {            
            this.pg++;            

            this.$http.get('https://api.themoviedb.org/3/discover/movie?api_key=4830d7b7e25fd8f0bb4597ad59bfdd39&language=pt-br&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page='+ this.pg)
                .then((resp) => {
                    if(resp.status === 200) {
                    this.movies = resp.data.results;
                }
            })          
        },

        prevBtnClicked() {
            this.pg--;            

            this.$http.get('https://api.themoviedb.org/3/discover/movie?api_key=4830d7b7e25fd8f0bb4597ad59bfdd39&language=pt-br&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page='+ this.pg)
                .then((resp) => {
                    if(resp.status === 200) {
                    this.movies = resp.data.results;
                }
            })
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
