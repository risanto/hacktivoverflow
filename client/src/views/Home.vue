<template>
  <div id="home">
    <div class="headline">
      <v-container>
        <p class="float-left">Questions</p>
        <v-btn class="float-right">
          <router-link to="/ask">
            Ask Question
          </router-link>
        </v-btn>
      </v-container>
    </div>

    <div v-for="question in questions" :key="question._id">
      <!-- {{question}} -->
      <CardQuestionSummary :question="question" />
    </div>
  </div>
</template>

<script>
import CardQuestionSummary from "../components/CardQuestionSummary";
import { mapState } from "vuex";

export default {
  name: "home",

  mounted() {
    this.$store.dispatch("fetchQuestions");
  },

  computed: mapState(["questions"]),

  components: {
    CardQuestionSummary
  }
};
</script>

<style>
#home {
  margin: 100px 50px;
}

#home > .headline {
  margin: 50px 150px;
  padding: 20px;
}

.float-left {
  float: left;
}

.float-right {
  float: right;
}
</style>
