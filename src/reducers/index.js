const {createStore} = require('redux')
const {reducer, initialState, persistentStorage} = require('./reducer')

// creates and exports the store, all nicely bundled up with devTools
module.exports = (defaultHotkeys) => {
  const store = createStore(reducer, initialState(defaultHotkeys),
    window.devToolsExtension ? window.devToolsExtension() : undefined
  )
  if (persistentStorage.addListener) {
    persistentStorage.addListener((changes, areaName) => {
      console.log('Eh oh!', changes, areaName)
      store.dispatch({type: 'CHROME_STORAGE_UPDATE', hotkeys: {}})
    })
  }
  return store
}
