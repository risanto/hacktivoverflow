import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../configs/axios'
import toast from "../mixins/toast"
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    user: {},
    questions: [],
    question: {}
  },
  mutations: {
    TOGGLE_LOGIN_STATUS (state, payload) {
      state.isLoggedIn = payload
    },
    FETCH_QUESTIONS (state, payload) {
      state.questions = payload
    },
    FETCH_A_QUESTION (state, payload) {
      state.question = payload
    }
  },
  actions: {
    checkToken ({ commit }) {
      // console.log('ini token di store/checkToken', localStorage.getItem('access_token'));
      if (localStorage.getItem('access_token')) {
        commit('TOGGLE_LOGIN_STATUS', true)
      } else {
        commit('TOGGLE_LOGIN_STATUS', false)
      }
    },
    fetchQuestions ({ commit }) {
      axios({
        method: 'get',
        url: '/questions'
      })
        .then(({ data }) => {
          // console.log('ini hasil fetch questions', data.questions)
          commit('FETCH_QUESTIONS', data.questions)
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
    fetchAQuestion ({ commit }, payload) {
      // console.log('masuk fetch a question', payload);
      axios({
        method: 'get',
        url: '/questions/' + payload.id
      })
        .then(({ data }) => {
          commit('FETCH_A_QUESTION', data.question)
          // console.log('ini data di fetchAQuestion', data);
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
  modules: {
  },
  plugins: [createPersistedState()]
})
