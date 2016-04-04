# Hotkey Commander
> A drop in javascript module for configuring hotkeys.
> This module uses the HTML import spec for templating, which is currently (and sadly) only  supported by chrome. Polyfills or other template options may be added later. This project is still in development and not yet in a usable state.

#### TODO
- Protect against overwriting existing hotkeys.
  - Just do a swap? or outright reject?

- Load hotkeys to and from local storage.

- Catch/use alt keys (shift/ctrl/alt)

- ~~Add categories (so that keys can be sorted by category)~~

- ~~Assume that the set/record keystrokes could happen in a different window than the one we are actually firing keys from. This ultimately means there will need to be functions for setting up two different listeners. One for record/set keystrokes and one for actually firing them off.~~

### Usage
- Include hotkeyCommander in your package (as npm package or as browser script)
- optionally provide hotkeyCommander the listeners
- provide hotkey commander with an object whos keys are named the same as your hotkey names, except in camelCase
- ex: hotkey named: WALK_FORWARD function named: walkForward

#### Multiple ways to use/invoke
##### As browser script
> - `npm run build` to get the bundle file to the project dist directory
> - move the files in dist to where you want to serve them, or serve from there..
> - Setup initial hotkeys map in the hotkeys.js file.
> - Include the hotkeyCommander.js script in your main html file.
> - Call init on it with the desired container element (this is where you want your config panel to render)

```html
  <div id="hotkeys"></div>
  <script src="dist/hotkeyCommander.js"></script>

  <script>
    var targetEl = document.getElementById('hotkeys');
    hotkeyCommander.init(targetEl);
  </script>
```

##### As a node module or multi-context google chrome extension
> The config portion will run in the plugin context
> while the  hotkey engine will run in the extensions target window
> instructions coming
> but it will look like this
```
// in the context where you will be running
// the configuration module
const hotkeyCommander = require('hotkeyCommander')
hotkeyCommander.startConfigurator(targetElement, listenerElement)
// then in the context where you want the keykeys to be responded to:
const hotkeyCommander = require('hotkeyCommander')
hotkeyCommander.startEngine(listenerElement, responderObject)
```

#### Development
> The following data doesnt really belong here,
> but in leiu of replicating it throughout the project
> Ill shove it here for the time being.

##### Data Structures

       HOTKEY OBJECT

This is the data structure representing a hotkey
The name should describe

CAPITAL_NAME_WITH_UNDERSCORES: {
  keyCode: ASCII_KEYCODE,
  altKey: BOOL,
  ctrlKey: BOOL,
  shiftKey: BOOL
}

     HOTKEY DICTIONARY

a data structure that takes the shape
of an object with keys that are category
names and values that are objects of
hotkey objects

{
  CATEGORY_THE_CATEGORY_NAME: {
    HOTKEY_NAME: {
       keyCode: 89,
       ctrlKey: false,
       shiftKey: false,
       altKey: false
    },.......
  },.....
}

     HOTKEY MAP

Dictionary of hotkeys referenced by keyCode instead of by name
This is always updated to reflect the state of the hotkey dictionary

{
HOTKEY_KEYCODE: {
   name: 'HOTKEY_NAME',
   ctrlKey: false,
   shiftKey: false,
   altKey: false
},
.......
}


