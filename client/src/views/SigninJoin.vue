<template>
  <section id="signin-join">
    <router-view/>
    <!-- <FormSignin/> -->
    <!-- <FormJoin/> -->
  </section>
</template>

<script>
import FormSignin from '../components/FormSignin'
import FormJoin from '../components/FormJoin'
import { mapState } from 'vuex'

export default {
  name: 'signin-join',

  components: ['FormSignin', 'FormJoin']
}
</script>

<style>

</style>