<template>
  <div v-if="measure">
    <h3>{{ measure.name }}</h3>
    <div ref="chart" />
  </div>
</template>

<script>
import { getMeasureValues } from '@/plugins/api'

const Plotly = require('plotly.js/lib/core')

// Only register the chart types we're actually using to reduce the final bundle size
Plotly.register([
  require('plotly.js/lib/bar')
])

export default {
  props: {
    measure: {
      type: Object,
      default: () => null
    }
  },
  watch: {
    measure: {
      immediate: true,
      handler: function (newValue) {
        if (newValue) {
          this.update()
        }
      }
    }
  },
  methods: {
    update: function () {
      getMeasureValues(this.measure.id, result => {
        this.plot(result)
      })
    },
    plot: function (data) {
      try {
        Plotly.purge(this.$refs.chart)
      } catch {
        // Do nothing
      }

      const dateData = {}

      data.forEach(d => {
        dateData[d.measureValue] = (dateData[d.measureValue] || 0) + 1
      })

      const sorted = [...Object.keys(dateData)].sort((a, b) => a.localeCompare(b))

      const traces = [{
        x: sorted,
        y: sorted.map(s => dateData[s]),
        type: 'bar'
      }]

      const layout = {
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        margin: {
          l: 30,
          r: 30
        },
        autosize: true,
        yaxis: {
          automargin: true,
          title: { text: this.$t('widgetChartAxisTitleCount') },
          showgrid: true
        },
        xaxis: {
          zeroline: false,
          title: { text: this.measure.name },
          showgrid: false
        },
        hovermode: 'x'
      }

      console.log(dateData)

      Plotly.newPlot(this.$refs.chart, traces, layout, {
        responsive: true,
        toImageButtonOptions: {
          format: 'png',
          filename: `stats-${this.measure.name}`,
          width: 1280,
          height: 720
        },
        displaylogo: false
      })
    }
  }
}
</script>

<style>

</style>
