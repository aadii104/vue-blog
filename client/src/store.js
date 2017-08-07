import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    state: {
        username: '',
        token: '',
        displayLoader: false,
        feedIndexCount: 0,
        baseServerURL: 'http://localhost:3000'
    },
    getters: {
        formatUsername(state) {
            if (state.username === '')
                return '';

            return state.username.toLowerCase().split(' ').map((word) => {
                return word.replace(word[0], word[0].toUpperCase());
            }).join(' ');
        },
        getToken(state) {
            return state.token;
        },
        getBaseURL(state) {
            return state.baseServerURL;
        }
    },
    mutations: {
        setUser(state, user) {
            state.username = user.username;
            state.token = user.token;
            window.localStorage.setItem('user', JSON.stringify(user));
        },
        removeUser(state) {
            state.username = '';
            state.token = '';
            window.localStorage.removeItem('user');
        },
        toggleLoader(state) {
            state.displayLoader = !state.displayLoader;
        }
    }
});

export default store;