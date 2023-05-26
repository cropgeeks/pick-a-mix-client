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
      <h5 class="text-info mb-0" v-html="$t('pageHomeSubmissionForm')" />
    </b-card>

    <TrialTable :getData="getTrialData" />

    <TrialMap />

    <b-form @submit.prevent="updateCharts" v-if="measureOptions && measureOptions.length > 0">
      <b-form-group :label="$t('formLabelMeasures')" label-for="measures">
        <b-form-select multiple :options="measureOptions" v-model="selectedMeasures" />
      </b-form-group>

      <b-button type="submit">{{ $t('buttonPlot') }}</b-button>
    </b-form>

    <MeasureChart :measure="measure" v-for="measure in selectedMeasures" :key="`measure-chart-${measure.id}`" />

    <Tour :steps="tourSteps" :resetOnRouterNav="true" :hideBackButton="false" ref="tour" />

    <TrialDetailsModal ref="trialDetailsModal" :trial="selectedTrial" v-if="selectedTrial" />
  </b-container>
</template>

<script>
import TrialDetailsModal from '@/components/modals/TrialDetailsModal'
import MeasureChart from '@/components/MeasureChart'
import { BIconCollectionPlay } from 'bootstrap-vue'
import Tour from '@/components/Tour'
import TrialTable from '@/components/TrialTable'
import TrialMap from '@/components/TrialMap'

import { postTrialTable, getMeasures } from '@/plugins/api'

const emitter = require('tiny-emitter/instance')

export default {
  components: {
    BIconCollectionPlay,
    MeasureChart,
    TrialDetailsModal,
    Tour,
    TrialTable,
    TrialMap
  },
  data: function () {
    return {
      selectedTrial: null,
      selectedMeasures: [],
      measures: []
    }
  },
  computed: {
    measureOptions: function () {
      if (this.measures) {
        return this.measures.map(m => {
          return {
            text: m.name,
            value: m
          }
        })
      } else {
        return []
      }
    },
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
    emitter.on('trial-selected', this.trialSelected)

    getMeasures(result => {
      this.measures = result
    })
  },
  beforeDestroy: function () {
    emitter.off('trial-selected', this.trialSelected)
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
