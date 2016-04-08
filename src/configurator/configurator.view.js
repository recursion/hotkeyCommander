/**
 * Configurator.view.js
 * this module is responsible for creating/mounting
 * and rendering the hotkey configuration view
 */
const utils = require('../utils')
const {stopRecording, startRecording, alertOff} = require('../actions')

//                CSS SELECTORS
const categorySelector = 'hotkey-category'
const idleStateSelector = 'key-recorder-btn--idle'
const activeStateSelector = 'key-recorder-btn--active'

let currentHotkeys

module.exports = (Store) => {
  const appState = Store.getState()

  // set up our store listener
  Store.subscribe(onStoreUpdate)
  currentHotkeys = appState.hotkeys

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
    /*
        <div class="hotkey-config">
        <div class="config-label key-description"></div>
        <div class="config-label key-recorder-btn key-recorder-btn--idle right"></div>
        */

  function mount (containerEl) {
    Store.getState().categories.forEach((category, catIndex) => {
      containerEl.appendChild(createCategoryDiv(category))

      // load hotkeys into the template
      // and render it
      const hotkeys = Store.getState().hotkeys
      for (let hotkey in hotkeys) {
        const target = hotkeys[hotkey]
        if (target.category === catIndex) {
          // create this hotkeys block element
          const hotkeyConfigElement = createDiv()
          hotkeyConfigElement.className = 'hotkey-config'

          // create the description element
          const description = createDiv()
          description.className = 'config-label key-description'
          description.innerText = utils.stripUnderscores(target.name)

          // create the button
          const button = createSetKeyButton(target)
          // update it with the info it needs
          renderButton(button, target, Store.getState())

          // add the child elements to the hotkeys block element
          hotkeyConfigElement.appendChild(description)
          hotkeyConfigElement.appendChild(button)

          // mount the hotkeys block element to the root element
          containerEl.appendChild(hotkeyConfigElement)
        }
      }
    })
  }

  //              HANDLE STORE CHANGES

  // called every time the store changes
  // checks to see how our state changed,
  // and what, if anything, needs to be done about it
  function onStoreUpdate () {
    const state = Store.getState()

    let previousHotkeys = currentHotkeys
    currentHotkeys = state.hotkeys

    if (state.alert) {
      renderAlert()
    }
    // if the hotkeylist / or recording state changed
    if (previousHotkeys !== currentHotkeys) {
      findKeyAndUpdateView(state)
    }
  }
  //                   RENDER FUNCTIONS

  // this is really the only piece of data that gets updated
  function renderButton (el, action, state) {
    // if this button is recording - set state to recording active
    if (action.recording) {
      setRecordingActiveStyle(el)
    } else {
      setRecordingIdleStyle(el)
    }
    el.innerText = utils.hashKeyboardEvent(action)
  }

  function renderAlert () {
    // pop up an alert box of some kind
    createAlertPopup({
      message: 'KEY ALREADY IN USE',
      fadeoutTime: 1000
    })
  }

  //               Element creation functions

  function createDiv () {
    return document.createElement('div')
  }

  // create a category div
  function createCategoryDiv (category) {
    const categoryDiv = createDiv()
    // remove innards of template
    categoryDiv.className = 'hotkey-config'
    categoryDiv.innerHTML = `
      <h5 class=${categorySelector}>
        ${utils.stripUnderscores(category)}
      </h5>
    `
    return categoryDiv
  }

  function createSetKeyButton (key) {
    const button = createDiv()
    button.className = 'config-label key-recorder-btn key-recorder-btn--idle right'
    button.dataset.id = key.name

    // hotkey set button click handler
    button.addEventListener('click', function (evt) {
      // if we are recording a key
      if (Store.getState().recording) {
        // if this element is for the hotkey we are currently recording
        if (Store.getState().recording === this.dataset.id) {
          // stop recording
          Store.dispatch(stopRecording(key.name))
        }
      } else {
        // start recording!
        Store.dispatch(startRecording(key.name))
      }
    })
    return button
  }

  // options should at least
  // have a fadeOutTime and a message
  function createAlertPopup (options) {
    // selectors
    const alertPopupStyleName = 'panel alert'
    const alertWarningStyle = 'alert--warning'
    const panelStyleName = 'panel milky'
    const alertMessageStyle = 'alert-message'

    // create our elements
    const parent = document.body
    const panel = createDiv()
    const alertDiv = createDiv()
    const alertMsg = createDiv()

    // set styles
    panel.className = panelStyleName
    alertDiv.className = `${alertPopupStyleName} ${alertWarningStyle}`
    alertMsg.className = alertMessageStyle

    // insert data into the div
    alertMsg.innerHTML = options.message

    // mount the elements
    parent.appendChild(panel)
    panel.appendChild(alertDiv)
    alertDiv.appendChild(alertMsg)

    // remove the element after a set time
    // TODO: convert to async so we get proper dev tool responses
    setTimeout(() => {
      utils.removeElFromDom(panel)
      Store.dispatch(alertOff())
    }, options.fadeoutTime)
  }

  //            HELPERS

  // finds the key we are currently recording, and its new value
  // renders the new value to the proper element
  function findKeyAndUpdateView (state) {
    // get the keys element
    let targetElement
    if (state.recording) {
      targetElement = document.querySelector(`[data-id="${state.recording}"]`)
    } else {
      targetElement = document.querySelector(`.${activeStateSelector}`)
    }
    // find the key that changed
    const targetKey = state.hotkeys[targetElement.dataset.id]
    // update the view with the new setting
    renderButton(targetElement, targetKey, state)
    // update local state and broadcase the stop recording action
  }
  /**
   *   Style modifiers
   */

  function setRecordingIdleStyle (element) {
    if (element) {
      swapStyles(element, activeStateSelector, idleStateSelector)
    }
  }

  function setRecordingActiveStyle (element) {
    if (element) {
      swapStyles(element, idleStateSelector, activeStateSelector)
    }
  }
  // takes an element, and two string
  // it will remove the first string from element.className
  // and add the second string to element.className
  function swapStyles (element, removeClassName, addClassName) {
    // remove the idle state
    const classNames = element.className.split(' ')
    const removeClassIndex = classNames.indexOf(removeClassName)

    if (removeClassIndex !== -1) {
      classNames.splice(removeClassIndex, 1)
    }

    // turn the array back into a string
    element.className = classNames.join(' ')

    // add the new classname to it
    element.className += ' ' + addClassName
  }
}
