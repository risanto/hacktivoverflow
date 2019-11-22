<template>
  <section id="answer-item">
    <hr />
    <v-row>
      <v-col md="1">
        <div class="voting-container">
          <a>
            <i
              @click="upvote"
              :class="{ 'activeButton': answer.upvotes.includes(user.id) ? true : upvoteActive }"
              class="arrow-icon upvote material-icons"
            >arrow_drop_up</i>
          </a>
          {{ answer.upvotes.length - answer.downvotes.length }}
          <a>
            <i
              @click="downvote"
              :class="{ 'activeButton': answer.downvotes.includes(user.id) ? true : downvoteActive }"
              class="arrow-icon downvote material-icons"
            >arrow_drop_down</i>
          </a>
        </div>
      </v-col>
      <v-col md="11">
        <div class="description">
          <span v-html="answer.description"></span>
          <div class="answerer-div">Answered by {{ answer.answerer.name }}</div>
        </div>
        <v-col md="2" class="update-edit" v-if="user.id === answer.answerer._id">
          <a @click="updateAnswer">update</a>
          <div class="space"></div>
          <a @click="deleteAnswer">delete</a>
        </v-col>
      </v-col>

    </v-row>
  </section>
</template>

<script>
import axios from "../../configs/axios";
import { mapState } from "vuex";
import toast from "../mixins/toast";

export default {
  name: "answer-item",

  data: () => ({
    upvoteActive: false,
    downvoteActive: false
  }),

  methods: {
    upvote () {

      this.upvoteActive = !this.upvoteActive;
      this.downvoteActive = false;

      axios({
        method: "patch",
        url: "/answers/" + this.answer._id + "/upvote",
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.$store.dispatch("fetchAQuestion", { id: this.$route.params.id });
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
    },

    downvote () {
      this.downvoteActive = !this.downvoteActive;
      this.upvoteActive = false;

      axios({
        method: "patch",
        url: "/answers/" + this.answer._id + "/downvote",
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.$store.dispatch("fetchAQuestion", { id: this.$route.params.id });
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
    },

    updateAnswer () {
      this.$router.push('/answers/' + this.answer._id + '/update')
    },

    deleteAnswer () {
      axios({
        method: 'delete',
        url: '/answers/' + this.answer._id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(({ data }) => {
        console.log(data);
        this.toast('Deleted an answer!')
        this.$store.dispatch('fetchAQuestion', { id: this.$route.params.id })
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
      })
    }
  },

  props: ["answer"],

  mixins: [toast],

  computed: {
    ...mapState(["user"])
  }
};
</script>

<style>
.answerer-div {
  margin-top: 100px;
  text-align: right;
}

.update-edit {
  display: flex;
  flex-direction: row;
  margin-left: 0;
}
</style>