<template>
  <div id="question-item">
    <v-container>
      <div class="question">

        <v-row>
          <v-col md="1">
            <div class="voting-container">
              <a>
                <i
                  @click="upvote"
                  :class="{ 'activeButton': question.upvotes.includes(user.id) ? true : upvoteActive }"
                  class="arrow-icon upvote material-icons"
                >arrow_drop_up</i>
              </a>
              {{ question.upvotes.length - question.downvotes.length }}
              <a>
                <i
                  @click="downvote"
                  :class="{ 'activeButton': question.downvotes.includes(user.id) ? true : downvoteActive }"
                  class="arrow-icon downvote material-icons"
                >arrow_drop_down</i>
              </a>
            </div>
          </v-col>

          <v-col md="11">
            <div class="display-1">{{ question.title }}</div>
            <div class="description">
              <hr>
              <span v-html="question.description"></span>
              <div class="asker-div">Asked by {{ question.asker.name }}</div>
            </div>

            <v-col md="2" class="update-edit" v-if="user.id === question.asker._id">
              <a @click="updateQuestion">
                update
              </a>
              <div class="space"></div>
              <a @click="deleteQuestion">
                delete
              </a>
            </v-col>
          </v-col>

        </v-row>

        <div v-for="(answer, i) in question.answers" :key="i">
          <AnswerItem :answer="answer"/>
        </div>

        <hr />
        <div class="your-answer">
          <v-col md="11">
            <div class="title">Your Answer</div>
            <FormWYSIWYGAnswer />
          </v-col>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FormWYSIWYGAnswer from "../components/FormWYSIWYGAnswer";
import AnswerItem from "../components/AnswerItem";
import axios from "../../configs/axios";
import toast from "../mixins/toast"

export default {
  name: "question-item",

  data: () => ({
    upvoteActive: false,
    downvoteActive: false
  }),

  methods: {
    upvote () {
      this.upvoteActive = !this.upvoteActive;
      this.downvoteActive = false;

      axios({
        method: 'patch',
        url: '/questions/' + this.$route.params.id + '/upvote',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
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
    },

    downvote () {
      this.downvoteActive = !this.downvoteActive;
      this.upvoteActive = false;

      axios({
        method: 'patch',
        url: '/questions/' + this.$route.params.id + '/downvote',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
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
    },

    updateQuestion () {
      this.$router.push('/questions/' + this.$route.params.id + '/update')
    },

    deleteQuestion () {
      axios({
        method: 'delete',
        url: '/questions/' + this.$route.params.id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(({ data }) => {
        console.log(data);
        this.toast('Deleted a question!')
        this.$router.push('/')
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

  created() {
    this.$store.dispatch("fetchAQuestion", { id: this.$route.params.id });
  },

  components: {
    FormWYSIWYGAnswer, AnswerItem
  },

  computed: {
    ...mapState(["question", "user"])
  },

  mixins: [toast]
};
</script>

<style>
#question-item {
  margin: 100px;
}

.question {
  background-color: white;
  padding: 50px;
}

.voting-container {
  padding: 5%;
  width: 8%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 25px;
}

a {
  margin: 0;
}

.arrow-icon {
  font-size: 100px;
}

.upvote,
.downvote {
  color: gray;
}

.activeButton {
  color: #1976d2;
}

.description {
  /* margin-top: 50px; */
  margin-right: 10%;
}

.asker-div {
  margin-top: 100px;
  text-align: right;
}

.your-answer {
  margin-left: 7%;
}

.space {
  margin: 10px;
}

.container {
  min-width: 800px;
}

.update-edit {
  display: flex;
  flex-direction: row;
  margin-left: 0;
}
</style>