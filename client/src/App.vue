<template>
  <v-app>
    <Navbar/>
    <router-view/>
    <!-- <FormSignin/> -->
    <!-- <FormJoin/> -->
    <!-- <v-content>
      <HelloWorld/>
    </v-content> -->
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
// import FormSignin from './components/FormSignin'
// import FormJoin from './components/FormJoin'
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',

  components: {
    Navbar, HelloWorld
  },

  data: () => ({
    //
  })
}
</script>

<style>
  * {
    font-family: 'Alata', sans-serif;
    padding: 0;
    margin: 0;
  }
</style>