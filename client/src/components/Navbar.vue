<template>
  <v-app-bar id="navbar" app color="primary" dark>
    <div class="d-flex align-center">
      <v-container fill-height>
        <img
          width="30px"
          src="../assets/stack-white.png"
        />
        <h1 id="brand-name" fill-height>
          <router-link to="/">Hacktiflow</router-link>
        </h1>
      </v-container>
    </div>

    <v-spacer></v-spacer>

    <v-btn v-if="isLoggedIn" target="_blank" text>
      <span class="mr-2">Profile</span>
    </v-btn>
    <v-btn
      v-if="!isLoggedIn"
      target="_blank"
      text
    >
      <span class="mr-2">
        <router-link class="btn-white" to="/signin">Log in</router-link>
      </span>
    </v-btn>

    <v-btn v-if="!isLoggedIn" target="_blank" text>
      <span class="mr-2">
        <router-link class="btn-white" to="/join">Join</router-link>
      </span>
    </v-btn>
    <v-btn
      v-if="isLoggedIn"
      @click.prevent="logout"
      target="_blank"
      text
    >
      <span class="mr-2">Log out</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "navbar",

  methods: {
    logout () {
      localStorage.removeItem('access_token')
      this.$store.state.user = {}
      this.$store.dispatch('checkToken')
      this.$router.push('/')
    }
  },

  computed: {
    ...mapState(["isLoggedIn"])
  }
};
</script>

<style>
#brand-name {
  margin-left: 5px;
  font-family: "Alata", sans-serif;
  font-size: 30px;
}

#brand-name > a {
  color: aliceblue !important;
}

.v-btn {
  color: aliceblue;
}

.btn-white {
    color: aliceblue !important;
}

</style>
