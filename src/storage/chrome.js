// Chrome.storage strategy
/* globals chrome */

// handle persistent storage when using chrome
// when using this strategy we will listen
// from the commander engine for changes to the database
module.exports = () => {
  const init = (defaultHotkeys) => {
    // check for existing settings

    // if they exist, return them

    // otherwise add defaults to storage
    // and return those

  }
  const get = () => {}
  const set = () => {}

  // expose listeners for chrome.storage.sync.onChange event?
  const addListener = chrome.storage.onChanged.addListener
  return {
    init,
    set,
    get,
    addListener
  }
}
