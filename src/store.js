const defaultHotkeys = require('../hotkey.defaults')
const EM2 = require('eventemitter2')
const Store = new EM2()
module.exports = () => {
  // store our hotkey dictionary with categories
  // using hotkey names as keys
  const hotkeyDictionary = loadHotkeys()

  // this is a map of the hotkeys
  // with no categories and
  // using the keycodes as keys
  let keymap = generateNewKeymap(hotkeyDictionary)

  // track recording state
  const recordingState = {
    keyName: null,
    element: null,
    active: false
  }

  const public_api = {
    on: Store.on,
    emit: Store.emit,
    findNameByKeyCode,
    getKeymap,
    getKeys,
    getDictionary,
    set,
    isCategory,
    recording: recordingState
  }

  // setup event listeners
  Store.on('recording-stop', stopRecording)
  Store.on('recording-start', onStartRecording)
  Store.on('recording-set-key', onSetKey)

  Object.assign(Store, public_api)
  return Store

  function onSetKey (event) {
    const {keyName, newKeyCode} = event
    set(keyName, newKeyCode)
    stopRecording(event)
  }

  function stopRecording (event) {
    recordingState.active = false
    Store.emit('recording-stopped', event)
  }

  function onStartRecording (event) {
    const {keyName, element} = event
    recordingState.active = true
    recordingState.keyName = keyName
    recordingState.element = element
  }

  /* *****************************
   *  data accessor methods
   * ****************************/

  // returns a dictionary of hotkey objects
  // using keyCodes as keys
  function getKeymap () {
    return keymap
  }

  // returns a dictionary of the hotkeys
  // using their names as keys
  function getKeys () {
    const result = {}
    forEachHotkey((key, value) => {
      result[key] = value
    })
    return result
  }

  // returns the entire dictionary of hotkeys
  // which is ultimately a dictionary of categories
  // where the keys are the category names
  // and the value are an object of hotkey objects
  // using their names as keys
  function getDictionary () {
    return hotkeyDictionary
  }

  // generate an object with keyCode keys
  // so that the hotkeys can be accessed by their keycode
  // instead of by their name
  // this should fire anytime the hotkey storage dictionary changes
  // generate keymap must now strip out categories
  function generateNewKeymap () {
    const result = {}

    // create a hotkey object
    // and add it to our result object
    forEachHotkey((key, value) => {
      result[value.keyCode] = {
        name: key,
        ctrlKey: value.ctrlKey,
        altKey: value.altKey,
        shiftKey: value.shiftKey
      }
    })
    // set keymap to our result
    // and return it
    keymap = result
    return keymap
  }
  /* *****************************
   *  helpers
   * ****************************/
  /**
   * searches through the keyDictionary and
   * attempts to find the keycode in the keydictionary
   * @param {Number} - a keycode
   * @returns Key:String or null
  */
  function findNameByKeyCode (keycode) {
    const dict = hotkeyDictionary
    let result = null
    forEachHotkey(dict, (key, value) => {
      if (dict[key].keyCode === keycode) {
        result = key
      }
    })
    return result
  }

  function set (key, value) {
    console.log(key)
    key = getKeys()[key]
    key.keyCode = value
    // anytime we change the dictionary we
    // want to generate a new keymap
    generateNewKeymap()
  }

  function isCategory (key) {
    // regex describing a category key
    // anything that begins with CATEGORY_
    // will be treated as a category type
    const reggie = /^CATEGORY_.+/gi
    return reggie.test(key)
  }

  /*
    calls back with key, value
    for each item on the dictionary
    while skipping over categories entirely
    usage:
    forEachHotkey(hotkeyDictionary, (key, value) => {
      console.log('key: ', key)
      console.log('value: ', value)
    })
  */
  function forEachHotkey (work) {
    const categories = hotkeyDictionary
    // iterate through a list of categories
    for (let category in categories) {
      // iterate through an object of hotkey objects
      const hotkeys = categories[category]
      for (let hotkey in hotkeys) {
        work(hotkey, hotkeys[hotkey])
      }
    }
  }

  // TODO:
  // load an existing dictionary of hotkeys
  // otherwise load defaults
  function loadHotkeys () {
    return defaultHotkeys
  }
}
