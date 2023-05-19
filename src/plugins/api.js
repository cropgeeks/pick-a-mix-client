import { apiAxios } from '@/plugins/base'

const postTrialTable = (params, onSuccess, onError) => apiAxios({ url: 'trial', data: params, method: 'POST', success: onSuccess, error: onError })

const getMeasures = (onSuccess, onError) => apiAxios({ url: 'measure', success: onSuccess, error: onError })

const getComponents = (onSuccess, onError) => apiAxios({ url: 'component', success: onSuccess, error: onError })

const getTrialMeasures = (trialId, onSuccess, onError) => apiAxios({ url: `trial/${trialId}/measure`, success: onSuccess, error: onError })

export {
  getComponents,
  getMeasures,
  postTrialTable,
  getTrialMeasures
}
