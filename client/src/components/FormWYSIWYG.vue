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
      <v-btn @click="submitQuestion" color="primary">Submit</v-btn>
    </div>
  </div>
</template>

<script>
import axios from '../../configs/axios'
import toast from '../mixins/toast'

export default {
  data: () => ({
    title: '',
    myHTML: ''
  }),

  methods: {
    submitQuestion () {
      console.log('masuk submit question');
      
      axios({
        method: 'post',
        url: '/questions',
        data: {
          title: this.title,
          description: this.myHTML
        }
      })
        .then(({ data }) => {
          this.toast(data.message)
          this.$router.push('/')
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