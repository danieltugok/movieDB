<template>
  <header class="header">
    <!-- <h1>{{ msg }}</h1> -->

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Stone Movie Center</a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">     
        <form class="ml-auto form-inline my-2 my-lg-0">
          <input v-model="searchInput" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" @click="searchBtnClicked" type="submit">Search</button>

          {{searchInput}}
        </form>
      </div>
    </nav>

   
  </header>
</template>

<script>
export default {
  props: {
    msg: String
  },

  data() {
    return {
      searchInput : null

    }
  },

  methods: {

      searchBtnClicked() {
            this.$emit('searchBtnClicked', this.searchInput);


      }

  }


  
}
</script>

<style scoped>




</style>
