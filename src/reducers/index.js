const {createStore} = require('redux')
const {reducer, initialState} = require('./reducer')

// creates and exports the store, all nicely bundled up with devTools
module.exports = (defaultHotkeys) => {
  return createStore(reducer, initialState(defaultHotkeys),
    window.devToolsExtension ? window.devToolsExtension() : undefined
  )
}
