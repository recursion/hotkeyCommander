// Common modules

const utils = exports

utils.addListener = (listenerEl, listenerType, cb) => {
  listenerEl = listenerEl || window
  listenerEl.addEventListener(listenerType, cb)
}

utils.stripUnderscores = (string) => {
  if (!string || typeof string !== 'string') {
    console.error('stripUnderscores requires a string')
    return ''
  }
  return string.replace(/_/g, ' ')
}

// turn a snake case string into a camelCase string
utils.snakeCaseToCamelCase = (string) => {
  string = utils.stripUnderscores(string)
  string = string.split(' ')
  const result = string.map(function (word, index) {
    // uppercase the first character of each word
    // except the first word
    if (index !== 0) {
      return word[0].toUpperCase() + word.slice(1).toLowerCase()
    } else {
      return word.toLowerCase()
    }
  })
  return result.join('')
}

/* globals Window Element */
// validate that a object is an Element or Window
utils.validateEl = (el) => {
  if (!el instanceof Window || !el instanceof Element) {
    return false
  } else {
    return true
  }
}

utils.createAlertPopup = (options) => {
  const alertParent = document.body
  const alertPopupStyleName = 'key-overwrite-alert'
  // create a div
  const alertDiv = document.createElement('div')

  // assign the div a pre-agreed style
  alertDiv.className = alertPopupStyleName

  // insert data into the div
  alertDiv.innerHTML = options.message

  // mount the div on the alert parent element
  alertParent.appendChild(alertDiv)

  // call a function that begins a fadeout process
  utils.doWorkAfter(utils.removeElFromDom, alertDiv, options.fadeoutTime)
}

// takes a callback, a target item, and a time
// after time - calls the callback with target
utils.doWorkAfter = (work, target, time) => {
  setTimeout(() => {
    work(target)
  }, time)
}

// removes an element from the dom
utils.removeElFromDom = (el) => {
  el.parentNode.removeChild(el)
}
