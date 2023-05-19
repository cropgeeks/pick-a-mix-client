import { getMeasures } from '@/plugins/api'
import store from '@/store'

let measures = null

const getMeasuresCached = () => {
  if (!measures) {
    return new Promise((resolve, reject) => {
      getMeasures(result => {
        const mapped = {}
        const colors = store.getters.storeColors

        result.forEach((r, i) => {
          r.color = colors[i % colors.length]
          mapped[r.id] = r
        })
        measures = mapped
        resolve(mapped)
      }).catch(e => reject(e))
    })
  } else {
    return new Promise(resolve => resolve(measures))
  }
}

export {
  getMeasuresCached
}
