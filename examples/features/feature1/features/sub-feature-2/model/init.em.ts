import { forward } from 'effector'

import { documentsApi } from 'api-v2/documents'

import {
  $inspections,
  getInspectionsTrigger,
  closeCardTrigger,
  setInspectionsData,
  setGetInspectionsStatus,
  getInspectionsFx,
  closeCardFx,
} from '.'

import {
  openCard,
  closeCard,
  changeFilter,
  setOneCount,
  getCountTrigger,
} from '../shared'

$inspections.on(setInspectionsData, (state, { profileId, data }) => ({
  ...state,
  [profileId]: data,
}))

forward({
  from: getInspectionsTrigger,
  to: getInspectionsFx,
})

getInspectionsFx.use(async ({ profileId, shortDateFilter }) => {
  if (shortDateFilter) {
    changeFilter({ name: 'inspections', filter: shortDateFilter })
  }

  setGetInspectionsStatus('loading')

  const { data, error } = await documentsApi.getInspections({
    ehrId: profileId,
    shortDateFilter: shortDateFilter || 'half_year',
  })

  if (data) {
    if (data.count || data.count === 0) {
      setOneCount({ profileId, name: 'inspections', value: data.count })
    }

    setInspectionsData({ profileId, data: data.documents })

    if (!shortDateFilter) {
      openCard({ name: 'inspections' })
    }

    setGetInspectionsStatus('success')
  }

  if (error) {
    setGetInspectionsStatus('failure')
  }
})

forward({ from: closeCardTrigger, to: closeCardFx })

closeCardFx.use(({ profileId }) => {
  getCountTrigger({
    profileId,
    exactCounter: 'inspections',
    withoutLoading: true,
  })
  closeCard({ name: 'inspections' })
})
