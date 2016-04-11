/* globals chrome */
const {createStore} = require('redux')
const {reducer, setupInitialState, persistentStorage} = require('./reducer')

// creates and exports the store, all nicely bundled up with devTools
module.exports = (defaultHotkeys) => {
  return new Promise((resolve, reject) => {
    setupInitialState(defaultHotkeys)
      .then((initialState) => {
        const store = createStore(reducer, initialState,
          window.devToolsExtension ? window.devToolsExtension() : undefined
        )
        // TODO: this should be using persistentStorage instead of
        // directly calling chrome.storage - but was causing errors as it was.
        if (chrome && chrome.storage) {
          chrome.storage.onChanged.addListener((changes, areaName) => {
            if (Object.keys(changes).indexOf('hotkeys') !== -1) {
              store.dispatch({type: 'CHROME_STORAGE_UPDATE', hotkeys: changes.hotkeys.newValue})
            }
          })
        }
        resolve(store)
      })
  })
}
