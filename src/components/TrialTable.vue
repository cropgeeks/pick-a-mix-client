<template>
  <div>
    <b-form @submit.prevent="update(true)">
      <b-form-group class="my-3" :label="$t('formLabelTrialComponents')" :description="$t('formDescriptionTrialComponents')" label-for="trial-components">
        <b-form-checkbox-group v-model="selectedComponents" id="trial-components">
          <b-form-checkbox :value="comp" v-for="comp in allComponents" :key="`components-${comp}`">
            <span class="table-icon" v-if="comp === 'Barley'"><BarleyIcon class="icon-barley" /> {{ comp }}</span>
            <span class="table-icon" v-else-if="comp === 'Beans'"><BeanIcon class="icon-bean" /> {{ comp }}</span>
            <span class="table-icon" v-else-if="comp === 'Clover'"><CloverIcon class="icon-clover" /> {{ comp }}</span>
            <span class="table-icon" v-else-if="comp === 'Faba bean'"><FabaBeanIcon class="icon-fababean" /> {{ comp }}</span>
            <span class="table-icon" v-else-if="comp === 'Maize'"><MaizeIcon class="icon-maize" /> {{ comp }}</span>
            <span class="table-icon" v-else-if="comp === 'Linseed'"><LinseedIcon class="icon-linseed" /> {{ comp }}</span>
            <span class="table-icon" v-else-if="comp === 'Oats'"><OatIcon class="icon-oats" /> {{ comp }}</span>
            <span class="table-icon" v-else-if="comp === 'Peas'"><PeaIcon class="icon-peas" /> {{ comp }}</span>
            <span class="table-icon" v-else-if="comp === 'Potato'"><PotatoIcon class="icon-potato" /> {{ comp }}</span>
            <span class="table-icon" v-else-if="comp === 'Oilseed rape'"><RapeseedIcon class="icon-rapeseed" /> {{ comp }}</span>
            <span class="table-icon" v-else-if="comp === 'Rye'"><RyeIcon class="icon-rye" /> {{ comp }}</span>
            <span class="table-icon" v-else-if="comp === 'Turnip'"><TurnipIcon class="icon-turnip" /> {{ comp }}</span>
            <span class="table-icon" v-else-if="comp === 'Vetch'"><VetchIcon class="icon-vetch" /> {{ comp }}</span>
            <span class="table-icon" v-else-if="comp === 'Wheat'"><WheatIcon class="icon-wheat" /> {{ comp }}</span>
            <span class="table-icon" v-else><BIconPatchQuestion /> {{ comp }}</span>
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button-group class="d-block">
        <b-button variant="outline-info" @click="selectedComponents = allComponents"><BIconCheck2Square /> {{ $t('buttonSelectAll') }}</b-button>
        <b-button variant="outline-info" @click="selectedComponents = []"><BIconSquare /> {{ $t('buttonSelectNone') }}</b-button>
      </b-button-group>

      <b-form-group class="my-3" :label="$t('formLabelTrialComponentsComparator')" :description="$t('formDescriptionTrialComponentsComparator')" label-for="trial-components-comparator">
        <b-button-group class="d-block">
          <b-button :variant="componentComparator === 'ANY' ? 'primary' : null" @click="componentComparator = 'ANY'"><BIconDashSquareDotted /> {{ $t('buttonComponentAny') }}</b-button>
          <b-button :variant="componentComparator === 'ALL' ? 'primary' : null" @click="componentComparator = 'ALL'"><BIconCheck2Square /> {{ $t('buttonComponentAll') }}</b-button>
        </b-button-group>
      </b-form-group>

      <b-button type="submit"><BIconArrowRepeat /> {{ $t('buttonUpdate') }}</b-button>
    </b-form>

    <b-table class="my-3"
             hover
             striped
             responsive
             head-variant="dark"
             :fields="fields"
             :items="items"
             @row-clicked="rowSelected"
             no-local-sorting
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc">
      <template #cell(trialComponents)="data">
        <span v-for="comp in data.item.trialComponents" :key="`row-${data.index}-crop-${comp.id}`" class="table-icon mr-2">
          <b-badge variant="light" class="w-100 mb-1" v-if="comp.crop === 'Barley'"><BarleyIcon class="icon-barley" /> {{ comp.crop }}</b-badge>
          <b-badge variant="light" class="w-100 mb-1" v-else-if="comp.crop === 'Beans'"><BeanIcon class="icon-bean" /> {{ comp.crop }}</b-badge>
          <b-badge variant="light" class="w-100 mb-1" v-else-if="comp.crop === 'Clover'"><CloverIcon class="icon-clover" /> {{ comp.crop }}</b-badge>
          <b-badge variant="light" class="w-100 mb-1" v-else-if="comp.crop === 'Faba bean'"><FabaBeanIcon class="icon-fababean" /> {{ comp.crop }}</b-badge>
          <b-badge variant="light" class="w-100 mb-1" v-else-if="comp.crop === 'Maize'"><MaizeIcon class="icon-maize" /> {{ comp.crop }}</b-badge>
          <b-badge variant="light" class="w-100 mb-1" v-else-if="comp.crop === 'Linseed'"><LinseedIcon class="icon-linseed" /> {{ comp.crop }}</b-badge>
          <b-badge variant="light" class="w-100 mb-1" v-else-if="comp.crop === 'Oats'"><OatIcon class="icon-oats" /> {{ comp.crop }}</b-badge>
          <b-badge variant="light" class="w-100 mb-1" v-else-if="comp.crop === 'Peas'"><PeaIcon class="icon-peas" /> {{ comp.crop }}</b-badge>
          <b-badge variant="light" class="w-100 mb-1" v-else-if="comp.crop === 'Potato'"><PotatoIcon class="icon-potato" /> {{ comp.crop }}</b-badge>
          <b-badge variant="light" class="w-100 mb-1" v-else-if="comp.crop === 'Oilseed rape'"><RapeseedIcon class="icon-rapeseed" /> {{ comp.crop }}</b-badge>
          <b-badge variant="light" class="w-100 mb-1" v-else-if="comp.crop === 'Rye'"><RyeIcon class="icon-rye" /> {{ comp.crop }}</b-badge>
          <b-badge variant="light" class="w-100 mb-1" v-else-if="comp.crop === 'Turnip'"><TurnipIcon class="icon-turnip" /> {{ comp.crop }}</b-badge>
          <b-badge variant="light" class="w-100 mb-1" v-else-if="comp.crop === 'Vetch'"><VetchIcon class="icon-vetch" /> {{ comp.crop }}</b-badge>
          <b-badge variant="light" class="w-100 mb-1" v-else-if="comp.crop === 'Wheat'"><WheatIcon class="icon-wheat" /> {{ comp.crop }}</b-badge>
          <b-badge variant="light" class="w-100 mb-1" v-else><BIconPatchQuestion /> {{ comp.crop }}</b-badge>
        </span>
      </template>

      <template #head(trialCpr)="data">
        <span>{{ data.label }}</span> <BIconInfoCircle v-b-tooltip="$t('tableColumnTrialCprTooltip')" />
      </template>

      <template #cell(trialCpr)="data">
        <span class="d-flex flex-row align-items-center text-nowrap">
          <span :style="{ color: storeColors[0 % storeColors.length] }" :class="`table-icon mr-2 ${data.value ? '' : 'disabled'}`">
            <CPRIcon />
          </span>
          <span>{{ data.value }}</span>
        </span>
      </template>

      <template #cell(trialFarmManagement)="data">
        <span class="d-flex flex-row align-items-center text-nowrap">
          <span :style="{ color: storeColors[1 % storeColors.length] }" :class="`table-icon mr-2 ${data.item.trialFarmManagement ? '' : 'disabled'}`">
            <FarmManagementIcon />
          </span>
          <span class="text-preview" v-b-tooltip="data.item.trialFarmManagement">{{ data.item.trialFarmManagement }}</span>
        </span>
      </template>

      <template #cell(trialWeedIncidence)="data">
        <span class="d-flex flex-row align-items-center text-nowrap">
          <span :style="{ color: storeColors[2 % storeColors.length] }" :class="`table-icon mr-2 ${data.item.trialWeedIncidence ? '' : 'disabled'}`">
            <WeedIncidenceIcon />
          </span>
          <span class="text-preview" v-b-tooltip="data.item.trialWeedIncidence">{{ data.item.trialWeedIncidence }}</span>
        </span>
      </template>

      <template #cell(trialDiseaseIncidence)="data">
        <span class="d-flex flex-row align-items-center text-nowrap">
          <span :style="{ color: storeColors[3 % storeColors.length] }" :class="`table-icon mr-2 ${data.item.trialDiseaseIncidence ? '' : 'disabled'}`">
            <DiseaseIncidenceIcon />
          </span>
          <span class="text-preview" v-b-tooltip="data.item.trialDiseaseIncidence">{{ data.item.trialDiseaseIncidence }}</span>
        </span>
      </template>

      <template #cell(trialPestIncidence)="data">
        <span class="d-flex flex-row align-items-center text-nowrap">
          <span :style="{ color: storeColors[4 % storeColors.length] }" :class="`table-icon mr-2 ${data.item.trialPestIncidence ? '' : 'disabled'}`">
            <PestIncidenceIcon />
          </span>
          <span class="text-preview" v-b-tooltip="data.item.trialPestIncidence">{{ data.item.trialPestIncidence }}</span>
        </span>
      </template>

      <template #cell(trialSoilHealth)="data">
        <span class="d-flex flex-row align-items-center text-nowrap">
          <span :style="{ color: storeColors[5 % storeColors.length] }" :class="`table-icon mr-2 ${data.item.trialSoilHealth ? '' : 'disabled'}`">
            <SoilHealthIcon />
          </span>
          <span class="text-preview" v-b-tooltip="data.item.trialSoilHealth">{{ data.item.trialSoilHealth }}</span>
        </span>
      </template>

      <template #cell(trialBiodiversity)="data">
        <span class="d-flex flex-row align-items-center text-nowrap">
          <span :style="{ color: storeColors[6 % storeColors.length] }" :class="`table-icon mr-2 ${data.item.trialBiodiversity ? '' : 'disabled'}`">
            <BiodiversityIcon />
          </span>
          <span class="text-preview" v-b-tooltip="data.item.trialBiodiversity">{{ data.item.trialBiodiversity }}</span>
        </span>
      </template>
    </b-table>

    <b-pagination v-if="totalRows > perPage"
                  v-model="page"
                  :per-page="perPage"
                  :total-rows="totalRows" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CPRIcon from '@/components/icons/CPRIcon'
import BiodiversityIcon from '@/components/icons/BiodiversityIcon'
import FarmManagementIcon from '@/components/icons/FarmManagementIcon'
import WeedIncidenceIcon from '@/components/icons/WeedIncidenceIcon'
import DiseaseIncidenceIcon from '@/components/icons/DiseaseIncidenceIcon'
import PestIncidenceIcon from '@/components/icons/PestIncidenceIcon'
import SoilHealthIcon from '@/components/icons/SoilHealthIcon'
import BarleyIcon from '@/components/icons/BarleyIcon'
import BeanIcon from '@/components/icons/BeanIcon'
import CloverIcon from '@/components/icons/CloverIcon'
import FabaBeanIcon from '@/components/icons/FabaBeanIcon'
import LinseedIcon from '@/components/icons/LinseedIcon'
import MaizeIcon from '@/components/icons/MaizeIcon'
import OatIcon from '@/components/icons/OatIcon'
import PeaIcon from '@/components/icons/PeaIcon'
import PotatoIcon from '@/components/icons/PotatoIcon'
import RapeseedIcon from '@/components/icons/RapeseedIcon'
import RyeIcon from '@/components/icons/RyeIcon'
import TurnipIcon from '@/components/icons/TurnipIcon'
import VetchIcon from '@/components/icons/VetchIcon'
import WheatIcon from '@/components/icons/WheatIcon'

import { getComponents } from '@/plugins/api'

import { BIconPatchQuestion, BIconArrowRepeat, BIconCheck2Square, BIconSquare, BIconInfoCircle, BIconDashSquareDotted } from 'bootstrap-vue'

const emitter = require('tiny-emitter/instance')

export default {
  components: {
    BIconArrowRepeat,
    BIconPatchQuestion,
    BIconCheck2Square,
    BIconSquare,
    BIconInfoCircle,
    BIconDashSquareDotted,
    BiodiversityIcon,
    CPRIcon,
    DiseaseIncidenceIcon,
    FarmManagementIcon,
    PestIncidenceIcon,
    SoilHealthIcon,
    WeedIncidenceIcon,
    BarleyIcon,
    BeanIcon,
    CloverIcon,
    FabaBeanIcon,
    LinseedIcon,
    MaizeIcon,
    OatIcon,
    PeaIcon,
    PotatoIcon,
    RapeseedIcon,
    RyeIcon,
    TurnipIcon,
    VetchIcon,
    WheatIcon
  },
  props: {
    getData: {
      type: Function,
      default: () => {
        return {
          data: {
            data: [],
            count: 0
          }
        }
      }
    }
  },
  data: function () {
    return {
      items: [],
      page: 1,
      perPage: 10,
      totalRows: -1,
      sortBy: null,
      sortDesc: false,
      selectedComponents: [],
      allComponents: [],
      componentComparator: 'ANY'
    }
  },
  watch: {
    page: function () {
      this.update()
    },
    sortBy: function () {
      this.update()
    },
    sortDesc: function () {
      this.update()
    }
  },
  computed: {
    ...mapGetters([
      'storeColors'
    ]),
    fields: function () {
      const result = [{
        key: 'trialName',
        sortable: true,
        label: this.$t('tableColumnTrialName')
      }, {
        key: 'trialDescription',
        sortable: true,
        label: this.$t('tableColumnTrialDescription')
      }, {
        key: 'trialComponents',
        sortable: false,
        label: this.$t('tableColumnTrialComponents')
      }, {
        key: 'trialCpr',
        sortable: true,
        label: this.$t('tableColumnTrialCpr'),
        formatter: (value) => value ? value.toFixed(2) : null
      }, {
        key: 'trialFarmManagement',
        sortable: true,
        label: this.$t('tableColumnTrialFarmManagement')
      }, {
        key: 'trialWeedIncidence',
        sortable: true,
        label: this.$t('tableColumnTrialWeedIncidence')
      }, {
        key: 'trialDiseaseIncidence',
        sortable: true,
        label: this.$t('tableColumnTrialDiseaseIncidence')
      }, {
        key: 'trialPestIncidence',
        sortable: true,
        label: this.$t('tableColumnTrialPestIncidence')
      }, {
        key: 'trialSoilHealth',
        sortable: true,
        label: this.$t('tableColumnTrialSoilHealth')
      }, {
        key: 'trialBiodiversity',
        sortable: true,
        label: this.$t('tableColumnTrialBiodiversity')
      }, {
        key: 'trialLatitude',
        sortable: true,
        label: this.$t('tableColumnTrialLatitude'),
        formatter: value => (value !== undefined && value !== null) ? value.toFixed(2) : null
      }, {
        key: 'trialLongitude',
        sortable: true,
        label: this.$t('tableColumnTrialLongitude'),
        formatter: value => (value !== undefined && value !== null) ? value.toFixed(2) : null
      }, {
        key: 'trialCreatedOn',
        sortable: true,
        label: this.$t('tableColumnTrialCreatedOn'),
        formatter: value => value ? new Date(value).toLocaleString() : null
      }]

      return result
    }
  },
  methods: {
    rowSelected: function (selectedItem) {
      if (selectedItem) {
        emitter.emit('trial-selected', selectedItem)
      } else {
        emitter.emit('trial-selected', null)
      }
    },
    update: function (resetPrevCount = false) {
      let filter = null

      if (this.componentComparator === 'ALL') {
        filter = this.selectedComponents.map(c => {
          return {
            column: 'trialComponents',
            operator: 'and',
            comparator: 'jsonSearch',
            values: [c]
          }
        })
      } else {
        if (this.selectedComponents.length !== this.allComponents.length) {
          filter = [{
            column: 'trialComponents',
            operator: 'and',
            comparator: 'jsonSearch',
            values: this.selectedComponents
          }]
        }
      }

      if (resetPrevCount) {
        this.page = 1
        this.totalRows = -1

        emitter.emit('filtering-changed', filter)
      }

      emitter.emit('show-loading', true)
      this.getData({
        page: this.page - 1,
        limit: this.perPage,
        prevCount: this.totalRows,
        orderBy: this.sortBy,
        ascending: this.sortDesc ? 0 : 1,
        filter: filter
      }, result => {
        if (result) {
          this.items = result.data
          this.totalRows = result.count
        } else {
          this.items = []
          this.totalRows = 0
        }
      }).finally(() => emitter.emit('show-loading', false))
    },
    updateComponents: function () {
      getComponents(result => {
        this.allComponents = result
        this.selectedComponents = result
      })
    }
  },
  mounted: function () {
    this.update()
    this.updateComponents()
  }
}
</script>

<style>
.table tbody tr:hover {
  cursor: pointer;
}

.table-icon svg {
  width: 1.8em;
  height: 1.8em;
}

.table-icon .badge {
  font-size: 85%;
}

.table-icon.disabled {
  color: var(--secondary) !important;
}

.text-preview {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 16ch;
}
</style>

<style>
</style>
