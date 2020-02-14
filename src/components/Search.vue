<template>
  <div class="content">

    Busca pela palavra chave: {{ $route.params.value }}

    {{this.componentKey}}

    <div class="content">

    <div class="col-6 ml-auto">
        <select @change="filterChange($event)" class="form-control filter" v-model="filter">
            <option value="" disabled selected>Filtrar por Gênero</option>
            
            <option v-for="genre in genres" :value="genre.id" :key="genre.id"> {{ genre.name }} </option>
        </select>
        
    </div>

    <br>

    <div class="container" :key="componentKey">
        <ul>    
            <div class="row">
                <li v-for="item in value" class="col-3 item-filme pad15" v-bind:key="item.id" >            
                    <div class="card" >
                        <div ></div>
                        <img v-if="item.poster_path" class="card-img-top img-fluid" :src='"http://image.tmdb.org/t/p/w500/" + item.poster_path' :alt="item.title">
                        <div class="card-body">
                            <h5 class="card-title">{{ item.original_title }}</h5>
                            <div>
                                <i>star</i>
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

    <!-- <ul id="pagination">
        <li class="pagination-item">
            <button href="#" @click="prevBtnClicked" type="button" :disabled="pg <= 1" >Anterior</button>
        </li>
        <li class="pagination-item">
            <button href="#" @click="nextBtnClicked" type="button" >Próxima</button>
        </li>
    </ul> -->
 
    
  </div>

 
    
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
      routeParams: null,
      value: null,
      filter: null,
      genres: null,

    }
  },


    beforeCreate() {

        console.log(this.$route.params.value);


        this.$http.get("https://api.themoviedb.org/3/search/movie?api_key=4830d7b7e25fd8f0bb4597ad59bfdd39&language=pt-BR&query=" + this.$route.params.value + "&page=1&include_adult=false")
            .then((resp) => {
                if(resp.status === 200) {
                    this.value = resp.data.results;

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

    methods:{
        getSearchList( value ){
            console.log( value );
        },

        verMaisBtnClicked(item){
            this.$emit('verMaisBtnClicked', item);
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
