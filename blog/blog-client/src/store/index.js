import {createStore} from "vuex";
import axios from "axios";

export default createStore({
    state() {
        return {
            authenticated: false,
            user: null
        }
    },
    getters: {
        authenticated(state){
            return state.authenticated
        },
        user(state){
            return state.user
        }
    },
    mutations: {
      SET_AUTHENTICATED(state, authenticated) {
          state.authenticated = authenticated
      },
      SET_USER(state, user) {
          state.user = user
      }
    },
    actions: {

    //    dispatch login action
        async login({dispatch}, credentials) {
        //    csrf
            await axios.get('/sanctum/csrf-cookie')
        //    Credentials
            await axios.post('/login', credentials)

            dispatch("authenticate")

        },
    //    Set Authenticated to True
        authenticate ({commit}) {
            return axios.get('/api/user').then((response) => {
                commit('SET_AUTHENTICATED', true)
                commit('SET_USER', response.data)
            }).catch(() => {
                commit('SET_AUTHENTICATED', false)
                commit('SET_USER', null)
            })
        },

    //    set the user to the user object
    }
})