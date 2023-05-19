import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

let name = process.env.VUE_APP_INSTANCE_NAME

if (!name) {
  name = 'pickamix-' + window.location.pathname
}

export default new Vuex.Store({
  state: {
    locale: 'en_GB',
    serverUrl: null,
    colors: ['#eb3b5a', '#fa8231', '#f7b731', '#20bf6b', '#0fb9b1', '#45aaf2', '#4b7bec', '#a55eea']
  },
  getters: {
    storeLocale: (state) => state.locale,
    storeServerUrl: (state) => state.serverUrl,
    storeColors: (state) => state.colors
  },
  mutations: {
    ON_LOCALE_CHANGED: function (state, newLocale) {
      state.locale = newLocale
    },
    ON_SERVER_URL_CHANGED: function (state, newServerUrl) {
      state.serverUrl = newServerUrl
    },
    ON_COLORS_CHANGED: function (state, newColors) {
      state.colors = newColors
    }
  },
  actions: {
    setLocale: function ({ commit }, locale) {
      commit('ON_LOCALE_CHANGED', locale)
    },
    setServerUrl: function ({ commit }, serverUrl) {
      commit('ON_SERVER_URL_CHANGED', serverUrl)
    },
    setColors: function ({ commit }, colors) {
      commit('ON_COLORS_CHANGED', colors)
    }
  },
  modules: {
  },
  plugins: [createPersistedState({
    key: name
  })]
})
