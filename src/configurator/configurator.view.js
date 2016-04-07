/**
 * Configurator.view.js
 * this module is responsible for creating/mounting
 * and rendering the hotkey configuration view
 */
const utils = require('../common/utils')

//                CSS SELECTORS
const configBlockSelector = '.hotkey-config'
const setKeyBtnSelector = '.config-label.key-recorder-btn'
const descriptionLabelSelector = '.config-label.key-description'
const categorySelector = 'config-category'
const idleStateSelector = 'key-recorder-btn--idle'
const activeStateSelector = 'key-recorder-btn--active'

function generateTemplate () {
  return `
    <template id="hotkey-config-template">
      <div class="hotkey-config">
        <div class="config-label key-description"></div>
        <div class="config-label key-recorder-btn key-recorder-btn--idle right"></div>
      </div>
    </template>
  `
}

module.exports = (Store) => {
  let currentHotkeyList = Store.getState().hotkeyList
  let currentAlertId = Store.getState().alertId

  // set up our store listener
  Store.subscribe(onStoreUpdate)

  // public api
  return {
    mount
  }

  /** ***********************************************
                     MOUNT
      Takes in a dictionary of hotkeys/categories and an element
      and mounts the dictionary up into a
      hotkey template inside of the passed in element
  /** ***********************************************/
  function mount (hotkeys, containerEl) {
    containerEl.innerHTML = generateTemplate()
    const template = document.getElementById('hotkey-config-template')

    hotkeys.forEach((category) => {
      containerEl.appendChild(renderCategory(template, category))

      // load hotkeys into the template
      // and render it
      category.keys.forEach((hotkey) => {
        const hotkeyConfigElement = document.importNode(template.content, true)
        const button = hotkeyConfigElement.querySelector(setKeyBtnSelector)

        // hotkey set button click handler
        button.addEventListener('click', function (evt) {
          // if we are recording a key
          if (Store.getState().recording.active) {
            // if this element is for the hotkey we are currently recording
            if (Store.getState().recording.target === this) {
              // stop recording
              stopRecording(button, hotkey)
            }
          } else {
            // start recording!
            startRecording(button, hotkey)
          }
        })
        render(button, hotkey)
        hotkeyConfigElement.querySelector(descriptionLabelSelector).innerText = utils.stripUnderscores(hotkey.action)
        containerEl.appendChild(hotkeyConfigElement)
      })
    })
  }

  /** ***********************************************
                   RENDER FUNCTIONS
  /** ***********************************************/
  // this is really the only piece of data that gets updated
  function render (el, key) {
    el.innerText = utils.hashKeyboardEvent(key)
  }

  function renderAlert () {
    // pop up an alert box of some kind
    utils.createAlertPopup({
      message: 'KEY ALREADY IN USE',
      fadeoutTime: 1000
    })
  }

  function renderCategory (template, category) {
    const categoryDiv = document.importNode(template.content, true)
    // remove innards of template
    categoryDiv.querySelector(configBlockSelector).innerHTML = `
      <h5 class=${categorySelector}>
        ${utils.stripUnderscores(category.category)}
      </h5>
    `
    return categoryDiv
  }

  /**
   *   Helpers and state management
   */

  // takes an element, and two string
  // it will remove the first string from element.className
  // and add the second string to element.className
  function swapStyles (element, removeClassName, addClassName) {
    // remove the idle state
    const classNames = element.className.split(' ')
    const removeClassIndex = classNames.indexOf(removeClassName)
    classNames.splice(removeClassIndex, 1)

    // turn the array back into a string
    element.className = classNames.join(' ')

    // add the new classname to it
    element.className += ' ' + addClassName
  }

  // called every time the store changes
  // checks to see how our state changed,
  // and what, if anything, needs to be done about it
  function onStoreUpdate () {
    const state = Store.getState()

    let previousHotkeyList = currentHotkeyList
    currentHotkeyList = state.hotkeyList

    let previousAlertId = currentAlertId
    currentAlertId = state.alertId

    // if the hotkeylist changed
    if (previousHotkeyList !== currentHotkeyList) {
      findKeyAndUpdateView(state)
    }

    // if the alert id changed..
    if (previousAlertId !== currentAlertId) {
      // render alert
      renderAlert()
    }
  }

  // finds the key we are currently recording, and its new value
  // renders the new value to the proper element
  function findKeyAndUpdateView (state) {
    // find the key that changed
    const targetKey = (() => {
      for (let key in state.keymap) {
        const target = state.keymap[key]
        if (target.action === state.recording.hotkeyAction) {
          return target
        }
      }
    })()
    // update the view with the new setting
    render(state.recording.target, targetKey)

    // update local state and broadcase the stop recording action
    stopRecording(state.recording.target)
  }

  // creates a proper redux action
  function createAction (type, element, key) {
    return {type, hotkeyAction: key.action, element}
  }

  // changes the state to a non-recording style
  // and emits the stop recording action
  function stopRecording (el) {
    swapStyles(el, activeStateSelector, idleStateSelector)
    Store.dispatch({type: 'STOP_RECORDING'})
  }

  // updates the views recording state
  // and emits the start recording action.
  function startRecording (el, key) {
    swapStyles(el, idleStateSelector, activeStateSelector)
    // Store.emit(events.startRecording, createEvent(el, key))
    Store.dispatch(createAction('START_RECORDING', el, key))
  }
}
