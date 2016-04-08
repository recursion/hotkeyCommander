const {createStore} = require('redux')
const {reducer, initialState} = require('./reducer')

// creates and exports the store, all nicely bundled up with devTools
module.exports = () => {
  return createStore(reducer, initialState,
    window.devToolsExtension ? window.devToolsExtension() : undefined
  )
}
