const utils = require('./utils')
const events = require('./events')

const EM2 = require('eventemitter2')
const Store = new EM2()

module.exports = (defaultHotkeys) => {
  // store our hotkey dictionary with categories
  // using hotkey names as keys
  const hotkeyList = defaultHotkeys

  // They map of the hotkeys
  // with each hotkey being mapped to a hash
  // of the combined hotkey characters
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
  Store.on(events.stopRecording, stopRecording)
  Store.on(events.startRecording, onStartRecording)
  Store.on(events.setKey, onSetKey)

  // Extend event emitter
  // with our own public methods
  // and export it
  Object.assign(Store, public_api)
  return Store

  function onSetKey (setKeyEvent) {
    const {key, keyboardEvent} = setKeyEvent
    set(key, keyboardEvent)
    stopRecording(setKeyEvent)
  }

  function stopRecording (event) {
    // lets wait just a second to set this back to false
    // so the commander engine doesn try to process the
    // recording keystroke as anything other than recording
    // (only applies when commander and configurator are listening on same target Element)
    setTimeout(() => {
      recordingState.active = false
    }, 1)
  }

  function onStartRecording (event) {
    const {key, element} = event
    recordingState.active = true
    recordingState.key = key
    recordingState.element = element
  }

  function set (key, event) {
    const {keyCode, altKey, ctrlKey, shiftKey} = event
    key.keyCode = keyCode
    key.altKey = altKey
    key.shiftKey = shiftKey
    key.ctrlKey = ctrlKey

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
      let hashedName = utils.hashKeyboardEvent(key)
      result[hashedName] = key
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
}
