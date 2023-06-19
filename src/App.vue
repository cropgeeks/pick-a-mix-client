<template>
  <div class="d-flex flex-column overflow-hidden min-vh-100">
    <b-navbar toggleable="lg" type="dark" variant="dark" id="main-navigation">
      <b-navbar-brand :to="{ name: 'home' }" class="d-flex align-items-center">
        <b-img src="logo-favicon2.svg" height="30px" class="d-inline-block align-top mr-3" alt="SEAMS" /> Pick-a-Mix
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <BIconFlag /><span> {{ $t('menuLocale') }}</span>
            </template>
            <b-dropdown-item v-for="language in languages" :key="`locale-${language.locale}`" @click="onLocaleChanged(language)">
              <span class="mr-2">{{ language.icon }}</span>
              <span>{{ language.name }}</span>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item :to="{ name: 'about' }"><BIconInfoCircle /> About</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- The main content -->
    <div class="flex-grow-1">
      <router-view :key="$route.path" />
    </div>

    <b-modal v-model="loadingVisible" hide-header hide-footer no-close-on-backdrop no-close-on-esc hide-header-close>
      <div class="text-center">
        <b-spinner style="width: 3rem; height: 3rem;" variant="primary" type="grow" />
        <p class="text-muted mt-3" v-if="$t('modalTextLoading')">{{ $t('modalTextLoading') }}</p>
      </div>
    </b-modal>

    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { loadLanguageAsync } from '@/plugins/i18n'
import { BIconInfoCircle, BIconFlag } from 'bootstrap-vue'
import { VuePlausible } from 'vue-plausible'
import Vue from 'vue'

import Footer from '@/components/Footer'

const emitter = require('tiny-emitter/instance')

export default {
  components: {
    BIconInfoCircle,
    BIconFlag,
    Footer
  },
  data: function () {
    return {
      languages: [{
        locale: 'en_GB',
        name: 'British English',
        icon: '🇬🇧'
      }, {
        locale: 'de_DE',
        name: 'Deutsch - Deutschland',
        icon: '🇩🇪'
      }],
      loadingVisible: false
    }
  },
  computed: {
    /** Mapgetters exposing the store configuration */
    ...mapGetters([
      'storeLocale'
    ])
  },
  methods: {
    /**
     * When the locale is changed, update the i18n settings
     * @param language The newly selected locale
     */
    onLocaleChanged: function (language) {
      loadLanguageAsync(language.locale).then(() => {
        this.$i18n.locale = language.locale
        this.$store.dispatch('setLocale', language.locale)
      })
    },
    showLoading: function (visible) {
      this.loadingVisible = visible
    }
  },
  mounted: function () {
    loadLanguageAsync(this.storeLocale)

    Vue.use(VuePlausible, {
      domain: 'ics.hutton.ac.uk/seams',
      hashMode: true,
      apiHost: 'https://plausible.hutton.ac.uk',
      trackLocalhost: false
    })

    this.$nextTick(() => {
      this.$plausible.enableAutoPageviews()
    })

    emitter.on('show-loading', this.showLoading)
  },
  beforeDestroy: function () {
    emitter.off('show-loading', this.showLoading)
  }
}

</script>

<style lang="scss">
$primary: #A3CB38;
$secondary: #bdc3c7;

@import '~bootswatch/dist/simplex/variables';
@import '~bootstrap/scss/bootstrap';
@import '~bootstrap-vue/src/index.scss';
@import '~bootswatch/dist/simplex/bootswatch';

@each $breakpoint in map-keys($grid-breakpoints) {
  @include media-breakpoint-up($breakpoint) {
    $infix: breakpoint-infix($breakpoint, $grid-breakpoints);

    .rounded#{$infix}        { @include border-radius($border-radius); }
    .rounded#{$infix}-top    { @include border-top-radius($border-radius); @include border-bottom-radius(0); }
    .rounded#{$infix}-right  { @include border-right-radius($border-radius); @include border-left-radius(0); }
    .rounded#{$infix}-bottom { @include border-bottom-radius($border-radius); @include border-top-radius(0); }
    .rounded#{$infix}-left   { @include border-left-radius($border-radius); @include border-right-radius(0); }
    .rounded#{$infix}-circle { border-radius: 50%; }
    .rounded#{$infix}-0 { border-radius: 0; }
  }
}

.icon-barley {
  color: #f6b93b;
}
.icon-bean  {
  color: #00b894;
}
.icon-clover  {
  color: #009432;
}
.icon-fababean {
  color: #10ac84;
}
.icon-grass {
  color: #138510;
}
.icon-grass {
  color: #138510;
}
.icon-grass-clover {
  color: #499e56;
}
.icon-maize {
  color: red;
}
.icon-linseed {
  color: #BDC581;
}
.icon-lupine {
  color: #6d23c2;
}
.icon-oats {
  color: #EAB543;
}
.icon-peas {
  color: #1dd1a1;
}
.icon-potato {
  color: #f5cd79;
}
.icon-rapeseed {
  color: #fbc531;
}
.icon-rye {
  color: #e55039;
}
.icon-turnip {
  color: #FC427B;
}
.icon-wheat {
  color: #ff9f43;
}
.icon-vetch {
  color: #6ab04c;
}
</style>
