<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->

    <Header msg="Header" v-on:searchBtnClicked="searchBtnClicked"/>

    <hr>
    <router-link to="/">Home</router-link>
    <router-link to="/sobre">Sobre</router-link>
    <hr>


    <router-view @verMaisBtnClicked="verMaisBtnClicked" ref="conteudo"></router-view>


  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
  },

  data () {
      return {

      }
  },



  methods:{

    verMaisBtnClicked( id ){
        console.log( id );
        this.$router.push({ path: '/details/' + id })
    },

    searchBtnClicked( value ){

        this.$router.push({ path: '/search/' + value });
        this.$refs.conteudo.getSearchList( value );

    }
  }


}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
