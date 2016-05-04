const {createStore} = require('redux')
const {reducer, setupInitialState} = require('./reducer')
const actions = require('../actions')
const chrome = chrome || null

// creates and exports the store, all nicely bundled up with devTools
module.exports = (defaultHotkeys, displayToggle) => {
  return new Promise((resolve, reject) => {
    setupInitialState(defaultHotkeys, displayToggle)
      .then((initialState) => {
        const store = createStore(reducer, initialState,
          window.devToolsExtension ? window.devToolsExtension() : undefined
        )
        // TODO: this should be using persistentStorage instead of
        // directly calling chrome.storage - but was causing errors as it was.
        if (chrome && chrome.storage) {
          chrome.storage.onChanged.addListener((changes, areaName) => {
            if (Object.keys(changes).indexOf('hotkeys') !== -1) {
              store.dispatch({type: actions.CHROME_STORAGE_UPDATE_HOTKEYS, hotkeys: changes.hotkeys.newValue})
            }
            if (Object.keys(changes).indexOf('engineActive') !== -1) {
              store.dispatch({type: actions.CHROME_STORAGE_UPDATE_ENGINEACTIVE, engineActive: changes.engineActive.newValue})
            }
          })
        }
        resolve(store)
      })
  })
}
