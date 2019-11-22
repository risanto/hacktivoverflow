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
                    <router-link to="/join">
                      <v-icon>mdi-code-tags</v-icon>
                    </router-link>
                  </v-btn>
                </template>
                <span>
                    Don't have an account? Click here to join.
                </span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  label="Email"
                  name="email"
                  prepend-icon="mdi-at"
                  type="email"
                />

                <v-text-field
                  v-model="password"
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                />
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <div class="btn-section">
                <v-btn @click="login" color="primary">Log in</v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import axios from "../../configs/axios";
import toast from "../mixins/toast";

export default {
  name: "form-signin",

  data: () => ({
    email: "",
    password: ""
  }),

  methods: {
    login() {
      axios({
        method: "post",
        url: "/users/login",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          const user = {
            id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            reputation: data.user.reputation
          }
          this.$store.state.user = user;
          this.$store.dispatch("checkToken");
          this.$router.push('/');
          this.toast("Successfully logged in!");
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
/* .login-btn {
    padding: 10px;
  } */
</style>
