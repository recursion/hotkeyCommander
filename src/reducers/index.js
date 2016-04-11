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
        if (chrome && chrome.storage) {
          chrome.storage.onChanged.addListener((changes, areaName) => {
            console.log(Object.keys(changes).indexOf('hotkeys'))
            if (Object.keys(changes).indexOf('hotkeys') !== -1) {
              console.log('Eh oh!', changes, areaName)
              console.log('changes ', changes.hotkeys.newValue)
              store.dispatch({type: 'CHROME_STORAGE_UPDATE', hotkeys: changes.hotkeys.newValue})
            }
          })
        }
        resolve(store)
      })
  })
}
