<template>
  <b-container>
    <div class="about-header bg-light p-5 my-4 border rounded">
      <b-row>
        <b-col cols=12 md=4 class="text-center text-md-right" order="1" order-md="2">
          <b-img fluid src="logo-favicon2.svg" alt="Pick-a-Mix logo" />
        </b-col>
        <b-col cols=12 md=8 order="2" order-md="1">
          <h1 class="display-4 text-center text-md-left">{{ $t('appTitle') }}</h1>
          <p class="lead text-center text-md-left">{{ $t('pageHomeWelcome') }}</p>
          <p class="lead text-center text-md-left text-muted">{{ $t('pageHomeWelcomeSubtitle') }}</p>
          <p class="text-center text-md-left mb-0"><b-button @click="showIntroduction"><BIconCollectionPlay /> {{ $t('buttonShowIntroduction') }}</b-button></p>
        </b-col>
      </b-row>
    </div>

    <b-card>
      <div class="text-info" v-html="$t('pageHomeSubmissionForm')" />
    </b-card>

    <TrialTable :getData="getTrialData" @trial-selected="trialSelected" />

    <Tour :steps="tourSteps" :resetOnRouterNav="true" :hideBackButton="false" ref="tour" />

    <TrialDetailsModal ref="trialDetailsModal" :trial="selectedTrial" v-if="selectedTrial" />
  </b-container>
</template>

<script>
import TrialDetailsModal from '@/components/modals/TrialDetailsModal'
import { BIconCollectionPlay } from 'bootstrap-vue'
import Tour from '@/components/Tour'
import TrialTable from '@/components/TrialTable'

import { postTrialTable } from '@/plugins/api'

export default {
  components: {
    BIconCollectionPlay,
    TrialDetailsModal,
    Tour,
    TrialTable
  },
  data: function () {
    return {
      selectedTrial: null
    }
  },
  computed: {
    tourSteps: function () {
      return [{
        title: () => this.$t('tourHomeWelcomeTitle'),
        text: () => this.$t('tourHomeWelcomeText'),
        target: () => '#main-navigation',
        position: 'bottom'
      }, {
        title: () => this.$t('tourHomeDataTableTitle'),
        text: () => this.$t('tourHomeDataTableText'),
        target: () => '#table',
        position: 'auto'
      }, {
        title: () => this.$t('tourHomeDataMapTitle'),
        text: () => this.$t('tourHomeDataMapText'),
        target: () => '#map',
        position: 'auto'
      }, {
        title: () => this.$t('tourHomeDataPlotTitle'),
        text: () => this.$t('tourHomeDataPlotText'),
        target: () => '#scatter-section',
        position: 'auto'
      }]
    }
  },
  methods: {
    trialSelected: function (trial) {
      this.selectedTrial = trial

      if (trial) {
        this.$nextTick(() => this.$refs.trialDetailsModal.show())
      }
    },
    showIntroduction: function () {
      this.$refs.tour.start()
    },
    getTrialData: function (params, onSuccess) {
      return postTrialTable(params, onSuccess)
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped>
.about-header img {
  max-height: 125px;
}

@media (min-width: 768px) {
  .about-header img {
    max-height: 150px;
  }
}
</style>
