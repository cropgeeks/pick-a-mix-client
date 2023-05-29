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
    colors: ['#19b4d2', '#f2ba1d', '#c71575', '#6d933c', '#094d70', '#4b317b', '#ff6d41', '#ef831e']
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
