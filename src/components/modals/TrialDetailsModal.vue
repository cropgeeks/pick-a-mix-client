<template>
  <b-modal :title="trial ? trial.trialName : null"
           :ok-title="$t('buttonClose')"
           ok-only
           size="xl"
           @shown="updateMap"
           @hidden="clearMap"
           ref="trialDetailsModal">
    <div v-if="trial">
      <p>{{ $t('modalTextTrialDetails') }}</p>

      <b-row>
        <b-col cols=12 md=4 class="mb-3">
          <b-card class="h-100 trial-meausure" no-body>
            <b-row no-gutters class="h-100">
              <b-col cols=12 lg=3 :style="{ color: 'white', backgroundColor: trial.trialFarmManagement ? storeColors[0 % storeColors.length] : 'var(--secondary)' }" class="d-flex align-items-center justify-content-center rounded py-3 py-lg-0">
                <FarmManagementIcon />
              </b-col>
              <b-col cols=12 lg=9>
                <b-card-body>
                  <b-card-title>{{ $t('trialDetailsTitleFarmManagement') }}</b-card-title>
                  <b-card-sub-title>{{ $t('trialDetailsSubtitleFarmManagement') }}</b-card-sub-title>
                  <b-card-text class="text-muted">{{ trial.trialFarmManagement || 'N/A' }}</b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col cols=12 md=4 class="mb-3">
          <b-card class="h-100 trial-meausure" no-body>
            <b-row no-gutters class="h-100">
              <b-col cols=12 lg=3 :style="{ color: 'white', backgroundColor: trial.trialWeedIncidence ? storeColors[1 % storeColors.length] : 'var(--secondary)' }" class="d-flex align-items-center justify-content-center rounded py-3 py-lg-0">
                <WeedIncidenceIcon />
              </b-col>
              <b-col cols=12 lg=9>
                <b-card-body>
                  <b-card-title>{{ $t('trialDetailsTitleWeedIncidence') }}</b-card-title>
                  <b-card-sub-title>{{ $t('trialDetailsSubtitleWeedIncidence') }}</b-card-sub-title>
                  <b-card-text class="text-muted">{{ trial.trialWeedIncidence || 'N/A' }}</b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col cols=12 md=4 class="mb-3">
          <b-card class="h-100 trial-meausure" no-body>
            <b-row no-gutters class="h-100">
              <b-col cols=12 lg=3 :style="{ color: 'white', backgroundColor: trial.trialDiseaseIncidence ? storeColors[2 % storeColors.length] : 'var(--secondary)' }" class="d-flex align-items-center justify-content-center rounded py-3 py-lg-0">
                <DiseaseIncidenceIcon />
              </b-col>
              <b-col cols=12 lg=9>
                <b-card-body>
                  <b-card-title>{{ $t('trialDetailsTitleDiseaseIncidence') }}</b-card-title>
                  <b-card-sub-title>{{ $t('trialDetailsSubtitleDiseaseIncidence') }}</b-card-sub-title>
                  <b-card-text class="text-muted">{{ trial.trialDiseaseIncidence || 'N/A' }}</b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col cols=12 md=4 class="mb-3">
          <b-card class="h-100 trial-meausure" no-body>
            <b-row no-gutters class="h-100">
              <b-col cols=12 lg=3 :style="{ color: 'white', backgroundColor: trial.trialPestIncidence ? storeColors[3 % storeColors.length] : 'var(--secondary)' }" class="d-flex align-items-center justify-content-center rounded py-3 py-lg-0">
                <PestIncidenceIcon />
              </b-col>
              <b-col cols=12 lg=9>
                <b-card-body>
                  <b-card-title>{{ $t('trialDetailsTitlePestIncidence') }}</b-card-title>
                  <b-card-sub-title>{{ $t('trialDetailsSubtitlePestIncidence') }}</b-card-sub-title>
                  <b-card-text class="text-muted">{{ trial.trialPestIncidence || 'N/A' }}</b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col cols=12 md=4 class="mb-3">
          <b-card class="h-100 trial-meausure" no-body>
            <b-row no-gutters class="h-100">
              <b-col cols=12 lg=3 :style="{ color: 'white', backgroundColor: trial.trialSoilHealth ? storeColors[4 % storeColors.length] : 'var(--secondary)' }" class="d-flex align-items-center justify-content-center rounded py-3 py-lg-0">
                <SoilHealthIcon />
              </b-col>
              <b-col cols=12 lg=9>
                <b-card-body>
                  <b-card-title>{{ $t('trialDetailsTitleSoilHealth') }}</b-card-title>
                  <b-card-sub-title>{{ $t('trialDetailsSubtitleSoilHealth') }}</b-card-sub-title>
                  <b-card-text class="text-muted">{{ trial.trialSoilHealth || 'N/A' }}</b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
        <b-col cols=12 md=4 class="mb-3">
          <b-card class="h-100 trial-meausure" no-body>
            <b-row no-gutters class="h-100">
              <b-col cols=12 lg=3 :style="{ color: 'white', backgroundColor: trial.trialBiodiversity ? storeColors[5 % storeColors.length] : 'var(--secondary)' }" class="d-flex align-items-center justify-content-center rounded py-3 py-lg-0">
                <BiodiversityIcon />
              </b-col>
              <b-col cols=12 lg=9>
                <b-card-body>
                  <b-card-title>{{ $t('trialDetailsTitleBiodiversity') }}</b-card-title>
                  <b-card-sub-title>{{ $t('trialDetailsSubtitleBiodiversity') }}</b-card-sub-title>
                  <b-card-text class="text-muted">{{ trial.trialBiodiversity || 'N/A' }}</b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <div ref="map" class="trial-map mb-3" v-if="hasLocation" />

      <section v-for="comp in trial.trialComponents" :key="`component-details-${comp.id}`">
        <h3>{{ comp.crop }} - <small>{{ comp.variety }}</small></h3>

        <b-row v-if="componentMeasuresById && componentMeasuresById[comp.id]">
          <b-col cols=12 md=6 class="mb-3" v-for="measure in componentMeasuresById[comp.id]" :key="`component-measure-${measure.componentId}-${measure.measureId}`">
            <b-card class="h-100 trial-meausure" no-body>
              <b-row no-gutters class="h-100">
                <b-col cols=12 lg=3 :style="{ color: 'white', backgroundColor: measure.measureValue ? measures[measure.measureId].color : 'var(--secondary)' }" class="d-flex align-items-center justify-content-center rounded py-3 py-lg-0">
                  <svg v-html="measures[measure.measureId].icon" v-if="measures[measure.measureId] && measures[measure.measureId].icon" />
                  <BIconPatchQuestion v-else />
                </b-col>
                <b-col cols=12 lg=9>
                  <b-card-body>
                    <b-card-title>{{ measure.measureName }} - <b-badge :variant="measure.plotMeasurementType === 'mono' ? 'info' : 'primary'">{{ measure.plotMeasurementType }}</b-badge></b-card-title>
                    <b-card-sub-title>{{ measure.measureValue || 'N/A' }}</b-card-sub-title>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
        <p v-else>{{ $t('genericNoDataFound') }}</p>
      </section>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import FarmManagementIcon from '@/components/icons/FarmManagementIcon'
import WeedIncidenceIcon from '@/components/icons/WeedIncidenceIcon'
import PestIncidenceIcon from '@/components/icons/PestIncidenceIcon'
import DiseaseIncidenceIcon from '@/components/icons/DiseaseIncidenceIcon'
import SoilHealthIcon from '@/components/icons/SoilHealthIcon'
import BiodiversityIcon from '@/components/icons/BiodiversityIcon'

import { getMeasuresCached } from '@/plugins/datastore'
import { getTrialMeasures } from '@/plugins/api'

import { BIconPatchQuestion } from 'bootstrap-vue'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
// Set the leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  components: {
    FarmManagementIcon,
    WeedIncidenceIcon,
    PestIncidenceIcon,
    DiseaseIncidenceIcon,
    SoilHealthIcon,
    BiodiversityIcon,
    BIconPatchQuestion
  },
  props: {
    trial: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    ...mapGetters([
      'storeColors'
    ]),
    hasLocation: function () {
      return this.trial && this.trial.trialLatitude !== undefined && this.trial.trialLatitude !== null && this.trial.trialLongitude !== undefined && this.trial.trialLongitude !== null
    },
    componentMeasuresById: function () {
      if (this.trial && this.trial.trialComponents && this.trial.trialComponents.length > 0 && this.componentMeasures && this.componentMeasures.length > 0) {
        const result = {}

        this.trial.trialComponents.forEach(c => {
          result[c.id] = this.componentMeasures.filter(cm => cm.componentId === c.id)
        })

        return result
      } else {
        return {}
      }
    }
  },
  watch: {
    trial: {
      immediate: true,
      handler: function (newValue) {
        if (newValue) {
          getTrialMeasures(newValue.trialId, result => {
            this.componentMeasures = result || []
          })
        }
      }
    }
  },
  data: function () {
    return {
      componentMeasures: [],
      measures: []
    }
  },
  methods: {
    clearMap: function () {
      if (this.map) {
        this.map.remove()
        this.map = null
      }
    },
    updateMap: function () {
      if (this.hasLocation) {
        this.map = L.map(this.$refs.map)

        this.map.setView([this.trial.trialLatitude, this.trial.trialLongitude], 10)

        // Add OSM as the default
        const openstreetmap = L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          id: 'OpenStreetMap',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          subdomains: ['a', 'b', 'c'],
          maxZoom: 21,
          maxNativeZoom: 19
        })

        this.map.addLayer(openstreetmap)

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

        L.control.layers(baseMaps).addTo(this.map)

        // Disable zoom until focus gained, disable when blur
        this.map.scrollWheelZoom.disable()
        this.map.on('focus', () => this.map.scrollWheelZoom.enable())
        this.map.on('blur', () => this.map.scrollWheelZoom.disable())

        L.marker([this.trial.trialLatitude, this.trial.trialLongitude]).addTo(this.map)
      }
    },
    /**
     * Shows and resets modal dialog
     */
    show: function () {
      this.$refs.trialDetailsModal.show()

      getMeasuresCached()
        .then(measures => {
          this.measures = measures
        })
    },
    /**
     * Hides the modal dialog
     */
    hide: function () {
      this.$nextTick(() => this.$refs.trialDetailsModal.hide())
    }
  }
}
</script>

<style scoped>
.trial-meausure svg {
  max-width: 3em;
  max-height: 3em;
}
.trial-map {
  height: 50vh;
}
</style>
