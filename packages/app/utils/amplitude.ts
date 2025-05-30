import { init, setUserId, track } from '@amplitude/analytics-react-native'
import * as Device from 'expo-device'

let isInitialized = false

export async function initializeAmplitude(apiKey: string) {
  console.log(`initialize with API key: ${apiKey}`)
  if (isInitialized) return
  init(apiKey)
  const deviceId = Device.osInternalBuildId || Device.osBuildId || Device.deviceName || 'unknown-device'
  setUserId(deviceId)
  isInitialized = true
}

interface TrackQuestionEventParams {
  questionId: string
  groupIds?: string[]
  topicIds?: string[]
  date?: string
}

export async function trackCreateQuestion(params: TrackQuestionEventParams) {
  console.log("trackCreateQuestion", params)
  await track('create_question', params)
}

export async function trackViewQuestion(params: TrackQuestionEventParams) {
  console.log("trackViewQuestion", params)
  await track('view_question', params)
}

export async function trackEditQuestion(params: TrackQuestionEventParams) {
  console.log("trackEditQuestion", params)
  await track('edit_question', params)
}

export async function trackDeleteQuestion(params: TrackQuestionEventParams) {
  console.log("trackDeleteQuestion", params)
  await track('delete_question', params)
}

export async function trackTabClick(tabName: string) {
  console.log("trackTabClick", { tabName })
  await track('tab_click', { tabName })
}

export async function trackPersonClick(personId: string) {
  console.log("trackPersonClick", { personId })
  await track('person_click', { personId })
}

export async function trackGenerateQuestionClick() {
  console.log("trackGenerateQuestionClick")
  await track('generate_question_click', {})
}

export async function trackOnboardingClick() {
  console.log("trackOnboardingClick")
  await track('onboarding_click', {})
}