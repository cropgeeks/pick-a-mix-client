<template>
  <div>
    <section class="pb-4">
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
      </b-container>
    </section>
    <section class="bg-section-light py-4" id="table">
      <b-container>
        <h2>{{ $t('pageHomeTableTitle') }}</h2>
        <TrialTable :getData="getTrialData" />
      </b-container>
    </section>
    <section class="py-4" id="map">
      <b-container>
        <h2>{{ $t('pageHomeMapTitle') }}</h2>
        <TrialMap />
      </b-container>
    </section>
    <section class="bg-section-light py-4" id="charts">
      <b-container>
        <h2>{{ $t('pageHomeChartTitle') }}</h2>
        <b-form @submit.prevent="updateCharts" v-if="measureOptions && measureOptions.length > 0">
          <b-form-group :label="$t('formLabelMeasures')" label-for="measures">
            <b-form-select multiple :options="measureOptions" v-model="tempSelectedMeasures" />
          </b-form-group>

          <b-button type="submit"><BIconBarChartSteps :rotate="270" /> {{ $t('buttonPlot') }}</b-button>
        </b-form>

        <MeasureChart :measure="measure" v-for="measure in selectedMeasures" :key="`measure-chart-${measure.id}`" />

        <b-card class="mt-4">
          <div v-html="$t('pageHomeContact')" />
        </b-card>
      </b-container>
    </section>

    <Tour :steps="tourSteps" :resetOnRouterNav="true" :hideBackButton="false" ref="tour" />
    <TrialDetailsModal ref="trialDetailsModal" :trial="selectedTrial" v-if="selectedTrial" />
  </div>
</template>

<script>
import TrialDetailsModal from '@/components/modals/TrialDetailsModal'
import MeasureChart from '@/components/MeasureChart'
import { BIconCollectionPlay, BIconBarChartSteps } from 'bootstrap-vue'
import Tour from '@/components/Tour'
import TrialTable from '@/components/TrialTable'
import TrialMap from '@/components/TrialMap'

import { postTrialTable, getMeasures } from '@/plugins/api'

const emitter = require('tiny-emitter/instance')

export default {
  components: {
    BIconCollectionPlay,
    BIconBarChartSteps,
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
      tempSelectedMeasures: [],
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
        target: () => '#charts',
        position: 'auto'
      }]
    }
  },
  methods: {
    updateCharts: function () {
      this.selectedMeasures = this.tempSelectedMeasures
    },
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

.bg-section-light {
  background-color: #f3f6f6;
}

@media (min-width: 768px) {
  .about-header img {
    max-height: 150px;
  }
}
</style>
