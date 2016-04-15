export const START_RECORDING = 'START_RECORDING'
export const STOP_RECORDING = 'STOP_RECORDING'
export const SET_KEY = 'SET_KEY'
export const ALERT_ON = 'ALERT_ON'
export const ALERT_OFF = 'ALERT_OFF'
export const TOGGLE_HKC_ON = 'TOGGLE_HKC_ON'
export const TOGGLE_HKC_OFF = 'TOGGLE_HKC_OFF'
export const CHROME_STORAGE_UPDATE_HOTKEYS = 'CHROME_STORAGE_UPDATE_HOTKEYS'
export const CHROME_STORAGE_UPDATE_ENGINEACTIVE = 'CHROME_STORAGE_UPDATE_ENGINEACTIVE'

export function startRecording (targetAction) {
  return {type: START_RECORDING, action: targetAction}
}

export function stopRecording (targetAction) {
  return {type: STOP_RECORDING, action: targetAction}
}

export function alertOn () {
  return {type: ALERT_ON}
}

export function alertOff () {
  return {type: ALERT_OFF}
}

export function setKey (targetAction, keyboardEvent) {
  return {
    type: SET_KEY,
    action: targetAction,
    keyCode: keyboardEvent.keyCode,
    ctrlKey: keyboardEvent.ctrlKey,
    altKey: keyboardEvent.altKey,
    shiftKey: keyboardEvent.shiftKey
  }
}

export function turnOn () {
  return {type: TOGGLE_HKC_ON}
}

export function turnOff () {
  return {type: TOGGLE_HKC_OFF}
}
