export default {
  methods: {
    toast(message) {
      this.$buefy.toast.open({
        message: message,
        position: 'is-bottom-right'
      })
    },
    success(message) {
      this.$buefy.toast.open({
        message: message,
        type: 'is-success'
      })
    },
    danger(message) {
      this.$buefy.toast.open({
        duration: 5000,
        message: message,
        position: 'is-top',
        type: 'is-danger'
      })
    }
  }
}