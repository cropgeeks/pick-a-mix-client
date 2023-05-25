import { getMeasures } from '@/plugins/api'
import store from '@/store'

let measures = null

const getMeasuresCached = () => {
  if (!measures) {
    return new Promise((resolve, reject) => {
      getMeasures(result => {
        const colors = store.getters.storeColors

        result.forEach((r, i) => {
          r.color = colors[i % colors.length]
        })
        measures = result
        resolve(result)
      }).catch(e => reject(e))
    })
  } else {
    return new Promise(resolve => resolve(measures))
  }
}

export {
  getMeasuresCached
}
