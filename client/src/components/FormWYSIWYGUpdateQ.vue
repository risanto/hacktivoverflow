<template>
  <div class="wysiwyg">
    <v-text-field 
      v-model="title" 
      label="Title" 
      name="title" 
      prepend-icon="" 
      type="text" />
    <wysiwyg v-model="myHTML" />
    <div class="btn-section">
      <v-btn @click="updateQuestion" color="primary">Update</v-btn>
    </div>
  </div>
</template>

<script>
import axios from '../../configs/axios'
import toast from '../mixins/toast'
import { mapState } from 'vuex'

export default {
  data: () => ({
    title: '',
    myHTML: ''
  }),

  mounted () {
    this.$store.dispatch('fetchAQuestion', this.$route.params)
    this.title = this.question.title
    this.myHTML = this.question.description
  },

  methods: {
    updateQuestion () {
      axios({
        method: 'put',
        url: '/questions/' + this.$route.params.id,
        data: {
          title: this.title,
          description: this.myHTML
        }
      })
        .then(({ data }) => {
          this.toast(data.message)
          this.$router.push('/questions/' + this.$route.params.id)
          // console.log('ini submit question', data);
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

  computed: {
    ...mapState(['question'])
  },

  mixins: [toast]
};
</script>

<style scoped>
.wysiwyg {
  margin: 10%;
}

.btn-section {
  margin-top: 25px;
}
</style>