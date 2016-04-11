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
        if (persistentStorage.addListener) {
          persistentStorage.addListener((changes, areaName) => {
            console.log('Eh oh!', changes, areaName)
            store.dispatch({type: 'CHROME_STORAGE_UPDATE', hotkeys: {}})
          })
        }
        resolve(store)
      })
  })
}
