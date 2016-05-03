[![Stories in Ready](https://badge.waffle.io/recursion/hotkeyCommander.png?label=ready&title=Ready)](https://waffle.io/recursion/hotkeyCommander)

# Hotkey Commander

> HotkeyCommander provides a simple interface for hotkey display and configuration, so you dont have to! The module maps keyboard events to events of your designation, regardless of what the user sets his hotkeys to. Originally designed to work in a multi-context google chrome extension environment - hotkeyCommander works *great* in a single context too!

HotkeyCommander handles all of your hotkey configuration and keyboard event capture and response needs. Simply import the module to your project, hand it your hotkey definitions and target HTMLElements: hotkeyCommander will hand you back an event emitter that will emit your defined actions.

Your users will be able to easily view and configure their hotkey preferences. Their new hotkeys remain mapped to your events.

>To *record* a new hotkey setting, the user simply opens the config window, clicks on the key they want to change, presses the new hotkey combination, and hotkey Commander maps the new hotkey to the correct action.


     Default State      | Hotkey Recording State  |  Key Recorded state
:----------------------:|:-----------------------:|:-----------------------:
![Configurators default state](http://i.imgur.com/ft0YTEA.png) | ![Recording a key](http://i.imgur.com/zSUVrmZ.png) | ![Key after recording](http://i.imgur.com/ZsDDzit.png)

- **Easy to use:**
    1. include the package in your project
    2. define your hotkey definitions
    3. pass the hotkey definitions, and the target elements to hotkeyCommander.
    4. Assign your event handlers to the event emitter that hotkeyCommander hands you back.
- **User configuration built in:** Your app instantly starts responding to user hotkey preference changes.
    - Users easily view and change current settings
- **Modular construction**
    - **Flexible rendering options:** Display the configuration pane with hotkeyCommanders built in rendering engine or use your own.
- **Powerful**
    - **Responds to multiple key combinations:** Ctrl+Shift+k, Alt+Ctrl+u - etc
    - **Can run from multiple contexts:** Engineered to work in a 'multi-context' chrome extension situation: where hotkey configuration runs in a completely seperate browser context than the the keyboard events are being consumed in - _hotkeyCommander will work just as easily in a single browser context._
- **Modern**
    - Builtin es2015 support via babel and webpack.
    - Style conventions enforced by ['standard'](http://standardjs.com/index.html).
    - Package management via npm.

> This module is still under development: While it is not feature complete or ready for production use, it is rather usable. It is coming along quite rapidly and should be seeing a 1.0 release before summer 2016 arrives.

###### Contributing
- Pull requests are welcomed.
- Project uses [standard](http://standardjs.com/index.html) linting for all styling requirements. No fuss. No muss.
- Please use git issues from communications/feature requests/bug reports. Or jump on the [waffle](https://waffle.io/recursion/hotkeyCommander) to see our issues the way we do.

# Usage

#### Overview

1. Get the package
    - `npm install hotkey-commander`
    - or
    - clone the repo and build hotkeyCommander.js
        1. git clone ........
    - run `npm run build` or `webpack` from the repo to build
2. Create your list of custom hotkey definitions. *see below for details*
3. Include hotkeyCommander in your project somewhere....
    - `const hotkeyCommander = require('path/to/hotkeyCommander.js')`
    - or in your html file: `<script src="path/to/hotkeyCommander.js"></script>`
3. Pass hotkeyCommander some arguments: `const commander = hotkeyCommander({listenerEl: window, hotkeys: hotkeys})`
    1. Your hotkey definitions object
    2. the HTML Elements to:
        - render configuration on
        - consume user key events from
4. Create event handlers on the emitter then hotkeyCommander hands you back in its resolved promise.
    - `commander.on('MOVE_FORWARD', onMoveForward)`

#### Load as a script from html or as a node module.

##### As browser script
> - `npm run build` to get the bundle file to the project dist directory
> - move dist/hotkeyCommander.js to where you serve files from, or serve from dist..
> - Setup and include default hotkeys.
> - Include the hotkeyCommander.js script in your main html file.
> - Invoke it with the desired container element (this is where you want your config panel to render) and hotkeys.

```html
  <div id="hotkeyCommander"></div>
  <script src="/path/to/your/hotkeyDefaultsFile.js"></script>
  <script src="dist/hotkeyCommander.js"></script>
  <script>
    const targetEl = document.getElementById('hotkeyCommander');
    hotkeyCommander({hotkeys: COMMANDER_HOTKEY_DEFAULTS, target: document.getElementById('hotkeyCommander')})
      .then((emitter) => {
        emitter.on('YOUR_EVENT', () => {
          // handle the event
        })
        //or
        // pass commanders emitter and the controller objects to your keyboardHandlers file
        // require('./keyboardHandlers')(emitter, controller)
      })
  </script>
```

##### As a node module
```js
const hotkeys = require('./myDefaultHotkeys')
const hotkeyCommander = require('hotkeyCommander')
const listenerElement = window
hotkeyCommander.Commander({hotkeys: defaultHotkeys, listenerEl: window})
  .then((emitter) => {
    emitter.on('YOUR_EVENT', () => {
      // handle the event
    })
    //or
    // pass commanders emitter and the controller objects to your keyboardHandlers file
    // require('./keyboardHandlers')(emitter, controller)
  })
```

##### As a chrome plugin
> The config portion will run in the plugin context
> while the hotkey engine will run in the extensions target window.
> Better instructions coming, but to give you an idea, it will look something like this:

```js
// in the context/file where you will be providing user configuration
const hotkeys = require('./myDefaultHotkeys')
const hotkeyCommander = require('hotkeyCommander')
const targetEl = document.querySelector('.hotkeyCommander')
hotkeyCommander.Configurator({hotkeys: hotkeys, targetEl: document.getElementById('hotkeyCommander')})


// then in the context where you want the keykeys to be responded to:
const hotkeys = require('./myDefaultHotkeys')
const hotkeyCommander = require('hotkeyCommander')
const targetEl = window
hotkeyCommander.Commander({hotkeys: defaultHotkeys, listenerEl: window})
  .then((emitter) => {
    emitter.on('YOUR_EVENT', () => {
      // handle the event
    })
    //or
    // pass commanders emitter and the controller objects to your keyboardHandlers file
    // require('./keyboardHandlers')(emitter, controller)
  })
```
----

### Creating default hotkey definitions:

Creating hotkey action definitions is a mostly simple concept. Ultimately its an array of objects which describe actions (triggered by hotkeys), grouped by category.

Whatever name you give the action, is the event that will be emitted for that action

---

### The components of a hotkey definition file:

###### ACTION OBJECT
> Represents an Action and the hotkey that triggers it

```js
{
  name: 'YOUR_ACTION_NAME_STRING',
  keyCode: ASCII_KEYCODE,
  altKey: BOOL,
  ctrlKey: BOOL,
  shiftKey: BOOL
}
```
###### ACTIONS CATEGORY OBJECT
> A category of hotkeys

```js
{
  name: YOUR_CATEGORY_NAME,
  actions: [
    {hotkeyObject},
    {hotkeyObject},
    {hotkeyObject},
    {hotkeyObject}
  ]
}
```
###### ACTIONS LIST
> An array of hotkey category objects:

```js
[
  {categoryObject},
  {categoryObject},
  {categoryObject},
  {categoryObject},
  {categoryObject}
]
```
###### HOTKEY.DEFAULTS.JS EXAMPLE
```js
// hotkey.defaults.js
[
  {
    name: 'MOVEMENT_KEYS',
    actions: [
      {
        name: 'FORWARD',
        keyCode: 87, // w
        altKey: false,
        ctrlKey: false,
        shiftKey: false
      },
      {
        name: 'BACK',
        keyCode: 83, // s
        altKey: false,
        ctrlKey: false,
        shiftKey: false
      }
    ]
  },
  {
    name: 'UI_KEYS',
    actions: [
      {
        name: 'SHOW_MAP',
        keyCode: 77, // m
        altKey: false,
        ctrlKey: true,
        shiftKey: false
      },
      {
        name: 'OPEN_CHAT',
        keyCode: 84, // t
        altKey: false,
        ctrlKey: false,
        shiftKey: false
      }
    ]
  }
]
```
