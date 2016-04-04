const defaultHotkeys = require('../hotkey.defaults')
const EM2 = require('eventemitter2')
const Store = new EM2()
module.exports = () => {
  // store our hotkey dictionary with categories
  // using hotkey names as keys
  const hotkeyList = loadHotkeys()

  // this is a map of the hotkeys
  // with no categories and
  // using the keycodes as keys
  let keymap = generateNewKeymap()

  // track recording state
  const recordingState = {
    keyCode: null,
    element: null,
    active: false
  }

  const public_api = {
    on: Store.on,
    emit: Store.emit,
    getHotkeys,
    getKeymap,
    recording: recordingState
  }

  // setup event listeners
  Store.on('recording-stop', stopRecording)
  Store.on('recording-start', onStartRecording)
  Store.on('recording-set-key', onSetKey)

  // Extend event emitter
  // with our own public methods
  // and export it
  Object.assign(Store, public_api)
  return Store

  function onSetKey (event) {
    const {key, newKeyCode} = event
    set(key, newKeyCode)
    stopRecording(event)
  }

  function stopRecording (event) {
    recordingState.active = false
    Store.emit('recording-stopped', event)
  }

  function onStartRecording (event) {
    const {key, element} = event
    recordingState.active = true
    recordingState.key = key
    recordingState.element = element
  }

  function set (key, value) {
    key.keyCode = value
    // anytime we change the dictionary we
    // want to generate a new keymap
    keymap = generateNewKeymap()
  }
  /* *****************************
   *  data accessor methods
   * ****************************/

  // return the hotkeys list in its natural form
  function getHotkeys () {
    return hotkeyList
  }

  function getKeymap () {
    return keymap
  }

/* not need?
  function getHotkeysMappedByName () {
    const hotkeys = {}
    forEachHotkey((hotkey) => {
      hotkeys[hotkey.name] = hotkey
    })
    return hotkeys
  }
  function filterEachHotkey (filter) {
    const result = []
    forEachHotkey((hotkey) => {
      if (filter(hotkey)) {
        result.push(hotkey)
      }
    })
    return result
  }
  */

  // generate an object with code keys
  // so that the hotkeys can be accessed by their keycode
  // instead of by their name
  // this should fire anytime the hotkey storage dictionary changes
  // generate keymap must now strip out categories
  function generateNewKeymap () {
    const result = {}

    // create a hotkey object
    // and add it to our result object
    forEachHotkey((key) => {
      result[key.keyCode] = key
    })
    // set keymap to our result
    // and return it
    return result
  }

  // call back with each hotkey object
  function forEachHotkey (work) {
    hotkeyList.forEach((category) => {
      category.keys.forEach((hotkey) => {
        work(hotkey)
      })
    })
  }

  // TODO:
  // load an existing dictionary of hotkeys
  // otherwise load defaults
  function loadHotkeys () {
    return defaultHotkeys
  }
}
