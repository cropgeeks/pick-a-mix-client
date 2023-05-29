<template>
  <div>
    <b-button-group class="variable-buttons">
      <b-button @click="colorBy = 'trialCpr'" :variant="colorBy === 'trialCpr' ? 'primary' : null"><CPRIcon /> {{ $t('tableColumnTrialCpr') }}</b-button>
      <b-button @click="colorBy = 'trialFarmManagement'" :variant="colorBy === 'trialFarmManagement' ? 'primary' : null"><FarmManagementIcon /> {{ $t('tableColumnTrialFarmManagement') }}</b-button>
      <b-button @click="colorBy = 'trialWeedIncidence'" :variant="colorBy === 'trialWeedIncidence' ? 'primary' : null"><WeedIncidenceIcon /> {{ $t('tableColumnTrialWeedIncidence') }}</b-button>
      <b-button @click="colorBy = 'trialDiseaseIncidence'" :variant="colorBy === 'trialDiseaseIncidence' ? 'primary' : null"><DiseaseIncidenceIcon /> {{ $t('tableColumnTrialDiseaseIncidence') }}</b-button>
      <b-button @click="colorBy = 'trialPestIncidence'" :variant="colorBy === 'trialPestIncidence' ? 'primary' : null"><PestIncidenceIcon /> {{ $t('tableColumnTrialPestIncidence') }}</b-button>
      <b-button @click="colorBy = 'trialSoilHealth'" :variant="colorBy === 'trialSoilHealth' ? 'primary' : null"><SoilHealthIcon /> {{ $t('tableColumnTrialSoilHealth') }}</b-button>
      <b-button @click="colorBy = 'trialBiodiversity'" :variant="colorBy === 'trialBiodiversity' ? 'primary' : null"><BiodiversityIcon /> {{ $t('tableColumnTrialBiodiversity') }}</b-button>
    </b-button-group>

    <LMap ref="locationMap" @ready="updateMap" :bounds="bounds" class="trial-map" id="trial-map" v-if="trials && trials.length > 0">
      <LControl position="bottomleft" class="leaflet-control-layers" v-if="colorCategories">
        <div class="p-2 legend">
          <div v-for="(category, key) in colorCategories" :key="`color-mapping-${key}`">
            <BIconCircleFill :style="{ color: category }" /> {{ key }}
          </div>

          <ColorGradient :colors="['#ffffff', '#1e90ff']" :min="gradient.min" :max="gradient.max" v-if="gradient" />
        </div>
      </LControl>

      <div v-if="trials">
        <LCircleMarker v-for="location in locations"
                      :radius="location.radius"
                      :weight="0.25"
                      :opacity="1"
                      :zIndexOffset="location.zIndex"
                      color="#f5f6fa"
                      :fillOpacity="0.5"
                      :fillColor="location.color || '#EA2027'"
                      :tooltip="`${location.trial.trialName}: ${location.value}`"
                      @click="onLocationClicked(location)"
                      :key="`marker-${location.trial.trialId}`"
                      :latLng="[location.trial.trialLatitude, location.trial.trialLongitude]">
        </LCircleMarker>
      </div>
      <LMarker :lat-lng="[57, -3.5]" v-else>
        <LIcon :icon-size="[400, 200]" :icon-anchor="[200, 100]">
          <div class="no-data-marker d-flex text-white justify-content-center align-items-center">
            <h1>No data found</h1>
          </div>
        </LIcon>
      </LMarker>
    </LMap>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import L from 'leaflet'
import { LMap, LCircleMarker, LControl } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import { postTrialTable } from '@/plugins/api'
import { MAX_JAVA_INTEGER } from '@/plugins/base'
import { BIconCircleFill } from 'bootstrap-vue'
import FarmManagementIcon from '@/components/icons/FarmManagementIcon'
import WeedIncidenceIcon from '@/components/icons/WeedIncidenceIcon'
import DiseaseIncidenceIcon from '@/components/icons/DiseaseIncidenceIcon'
import PestIncidenceIcon from '@/components/icons/PestIncidenceIcon'
import SoilHealthIcon from '@/components/icons/SoilHealthIcon'
import BiodiversityIcon from '@/components/icons/BiodiversityIcon'
import CPRIcon from '@/components/icons/CPRIcon'

import { createColorGradient } from '@/plugins/colors'

import ColorGradient from '@/components/ColorGradient'

const emitter = require('tiny-emitter/instance')

// Set the leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  components: {
    LMap,
    LCircleMarker,
    LControl,
    BIconCircleFill,
    ColorGradient,
    CPRIcon,
    FarmManagementIcon,
    WeedIncidenceIcon,
    DiseaseIncidenceIcon,
    PestIncidenceIcon,
    SoilHealthIcon,
    BiodiversityIcon
  },
  data: function () {
    return {
      trials: [],
      colorBy: 'trialFarmManagement',
      filter: null
    }
  },
  computed: {
    ...mapGetters([
      'storeColors'
    ]),
    gradient: function () {
      if (this.colorBy === 'trialCpr') {
        const usedColors = {
          'N/A': '#cccccc'
        }

        let min = Number.MAX_SAFE_INTEGER
        let max = -Number.MAX_SAFE_INTEGER
        const distinct = new Set()

        this.trials.forEach(t => {
          const value = t[this.colorBy]

          if (value !== undefined && value !== null && value !== '') {
            min = Math.min(min, +value)
            max = Math.max(max, +value)
            distinct.add(+value)
          }
        })

        const gradient = createColorGradient('#ffffff', '#1e90ff', distinct.size)
        const sorted = [...distinct].sort((a, b) => a - b)

        this.trials.forEach(t => {
          const value = t[this.colorBy]

          if (value !== undefined && value !== null && value !== '') {
            usedColors[value] = gradient[sorted.indexOf(+value)]
          }
        })

        return {
          min: min,
          max: max,
          usedColors: usedColors
        }
      } else {
        return null
      }
    },
    colorCategories: function () {
      if (this.trials) {
        const usedColors = {
          'N/A': '#cccccc'
        }

        if (this.colorBy !== 'trialCpr') {
          this.trials.forEach(t => {
            const value = t[this.colorBy]

            if (value) {
              if (!usedColors[value]) {
                usedColors[value] = this.storeColors[(Object.keys(usedColors).length) % this.storeColors.length]
              }
            }
          })
        }

        return usedColors
      } else {
        return {}
      }
    },
    locations: function () {
      if (this.trials && this.colorCategories) {
        return this.trials.map(t => {
          const value = t[this.colorBy]

          return {
            radius: 15,
            trial: t,
            color: this.colorBy === 'trialCpr' ? this.gradient.usedColors[value || 'N/A'] : this.colorCategories[value || 'N/A'],
            value: value,
            zIndex: this.colorBy === 'trialCpr' ? null : ([...Object.keys(this.colorCategories)].indexOf(value) + 1)
          }
        })
      } else {
        return []
      }
    },
    bounds: function () {
      const b = L.latLngBounds()

      if (this.locations) {
        this.locations.forEach(l => b.extend([l.trial.trialLatitude, l.trial.trialLongitude]))
      }

      if (b.isValid()) {
        return b.pad(0.1)
      } else {
        b.extend([54.604746, -7.671065])
        b.extend([60.863213, -7.671065])
        b.extend([54.604746, -0.733540])
        b.extend([60.863213, -0.733540])
        return b.pad(0.1)
      }
    }
  },
  methods: {
    onLocationClicked: function (location) {
      emitter.emit('trial-selected', location.trial)
    },
    updateMap: function () {
      const map = this.$refs.locationMap.mapObject

      map.setView([56.46457690558857, -4.229736328125001], 6)

      // Add OSM as the default
      const openstreetmap = L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        id: 'OpenStreetMap',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: ['a', 'b', 'c'],
        maxZoom: 21,
        maxNativeZoom: 19
      })

      map.addLayer(openstreetmap)

      // Add an additional satellite layer
      const satellite = L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        id: 'Esri WorldImagery',
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 21,
        maxNativeZoom: 19
      })

      const baseMaps = {
        OpenStreetMap: openstreetmap,
        'Esri WorldImagery': satellite
      }

      L.control.layers(baseMaps).addTo(map)

      // Disable zoom until focus gained, disable when blur
      map.scrollWheelZoom.disable()
      map.on('focus', () => map.scrollWheelZoom.enable())
      map.on('blur', () => map.scrollWheelZoom.disable())
    },
    updateData: function () {
      postTrialTable({
        page: 0,
        limit: MAX_JAVA_INTEGER,
        filter: this.filter
      }, result => {
        this.trials = result.data
      })
    },
    setFiltering: function (filter) {
      this.filter = filter

      this.updateData()
    }
  },
  mounted: function () {
    emitter.on('filtering-changed', this.setFiltering)

    this.updateData()
  },
  beforeDestroy: function () {
    emitter.off('filtering-changed', this.setFiltering)
  }
}
</script>

<style>
#trial-map {
  height: 50vh;
}
.variable-buttons .btn svg {
  width: 1.5em;
  height: 1.5em;
}
</style>
