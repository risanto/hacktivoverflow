<template>
  <v-content id="form-signin">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-spacer />
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn :href="source" icon large target="_blank" v-on="on">
                    <router-link to="/signin">
                      <v-icon>mdi-code-tags</v-icon>
                    </router-link>
                  </v-btn>
                </template>
                <span>Already have an account? Click here to log in.</span>
              </v-tooltip>
            </v-toolbar>

            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="name" 
                  label="Name" 
                  name="name" 
                  prepend-icon="mdi-account" 
                  type="text" />

                <v-text-field 
                  v-model="email"
                  label="Email" 
                  name="email" 
                  prepend-icon="mdi-at" 
                  type="text" />

                <v-text-field
                  v-model="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                @click="join" 
                color="primary">Join</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import axios from "../../configs/axios"
import toast from "../mixins/toast"

export default {
  name: "form-join",

  data: () => ({
    name: '',
    email: '',
    password: ''
  }),

  methods: {
    join() {
      axios({
        method: "post",
        url: "/users/register",
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          const user = {
            id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            reputation: data.user.reputation
          }
          localStorage.setItem("access_token", data.access_token);
          this.$store.state.user = user;
          this.$store.dispatch("checkToken");
          this.toast("Successfully registered!");
          this.$router.push('/');
        })
        .catch(err => {
          const errMessages = err.response.data.messages;
          if (errMessages) {
            errMessages.forEach(errMessage => {
              this.danger(errMessage);
            });
          } else {
            this.danger("Couldn't connect to server.");
          }
        });
    }
  },

  mixins: [toast],

  props: {
    source: String
  }
};
</script>

<style>
</style>
