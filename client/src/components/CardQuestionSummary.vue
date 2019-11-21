<template>
  <v-card class="mx-auto" max-width="1000" outlined>
    <!-- {{question}} -->
    <div class="question-summary">
      <div class="left-bar">
        <div class="votes">
          <div class="counts">
            {{question.upvotes.length - question.downvotes.length}}
            <div>votes</div>
          </div>
        </div>
        <div class="answers">
          <div class="counts">
            {{question.answers.length}}
            <div>answers</div>
          </div>
        </div>
      </div>
      <div class="summary title">
        <a @click="routeToQuestion(question._id)">
          {{question.title}}
        </a>
        <div class="asker">
          <div class="subtitle-1">
            Asked by {{question.asker.name}}
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "card-question-summary",

  methods: {
    routeToQuestion(questionId) {
      this.$router.push('/questions/' + questionId)
    }
  },

  props: ['question']
}
</script>

<style>
  .question-summary {
    width: 100%;
    padding-left: 8px;
    box-sizing: border-box;

    display: flex;
    padding: 12px 8px;
    float: none;
    min-width: 100%;
    max-width: 100%;

    border-bottom: 1px solid #eff0f1;
  }

  .left-bar {
    float: none;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    margin-right: 10px;
    padding: 0 8px 0 0;
    box-sizing: content-box;
    flex-shrink: 0;
  }

  .votes {
    display: inline-block;
    height: 38px;
    min-width: 38px;
    margin: 0 3px 0 0;
    font-size: 11px;
    color: #848d95;
    padding: 7px 6px;
    text-align: center;
  }

  .answers {
    display: inline-block;
    margin: 0 3px 0 0;
    min-width: 44px;
    height: auto;
    font-size: 11px;
    padding: 6px;
    border: 1px solid transparent;
    border-radius: 3px;
    text-align: center;
  }

  .counts {
    font-size: 17px;
    font-weight: 300;
    color: #6a737c;
    margin-bottom: 4px;
  }

  .summary {
    flex: 1 auto;
    width: auto;
    float: none;
    margin: 0;
    overflow: hidden;
    padding: 0;
  }

  .asker {
    width: auto;
    line-height: inherit;
    padding-top: 15px;
    padding-right: 15px;
    float: right;
  }
</style>