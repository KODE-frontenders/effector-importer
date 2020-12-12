import { restore, combine } from 'effector'

import {
  createEvent,
  createEffect,
  createStore,
} from 'flows/medical-records/models/domain'
import { profileStores } from '../shared'
import { TInspections, TStartPayload } from './types'

export const getInspectionsTrigger = createEvent<TStartPayload>()

export const closeCardTrigger = createEvent<{ profileId: string }>()

export const setInspectionsData = createEvent<{
  profileId: string
  data: TInspections
}>()

export const setGetInspectionsStatus = createEvent<TApiStatus>()

export const getInspectionsFx = createEffect<TStartPayload, void, Error>()

export const closeCardFx = createEffect<{ profileId: string }, void, Error>()

export const $inspections = createStore<Record<string, TInspections>>({})

export const $getInspectionsStatus = restore(setGetInspectionsStatus, null)

export const $inspectionsLoading = $getInspectionsStatus.map(
  status => status === 'loading',
)

export const $currentInspections = combine(
  profileStores.$currentProfileId,
  $inspections,
  (currentProfileId, inspections) =>
    currentProfileId && inspections[currentProfileId]
      ? inspections[currentProfileId]
      : [],
)
