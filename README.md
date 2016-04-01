# Hotkey Commander
> A drop in javascript module for configuring hotkeys.
> This module uses the HTML import spec for templating, which is currently (and sadly) only  supported by chrome. Polyfills or other template options may be added later. This project is still in development and not yet in a usable state.

#### TODO
- Protect against overwriting existing hotkeys.
  - Just do a swap? or outright reject?

- Load hotkeys to and from local storage.

- Catch/use alt keys (shift/ctrl/alt)

- Add categories (so that keys can be sorted by category)

- ~~Assume that the set/record keystrokes could happen in a different window than the one we are actually firing keys from. This ultimately means there will need to be functions for setting up two different listeners. One for record/set keystrokes and one for actually firing them off.~~

### Usage
> There are multiple was to include hotkey commander in your project

#### Include the bundle in your html
- `npm run build` to get the bundle file to the project dist directory
- move the files in dist to where you want to serve them, or serve from there..
- Setup initial hotkeys map in the hotkeys.js file.
- Include the hotkeyCommander.js script in your main html file.
- Call init on it with the desired container element (this is where you want your config panel to render)
```html
  <div id="hotkeys"></div>
  <script src="dist/hotkeyCommander.js"></script>

  <script>
    var targetEl = document.getElementById('hotkeys');
    hotkeyCommander.init(targetEl);
  </script>

```
#### As a multi-context google chrome extension
> The config portion will run in the plugin context
> while the  hotkey engine will run in the extensions target window
> instructions coming
> but it will look like this
```
// In the plugins html javascript files
// which is a seperate context
const hotkeyCommander = require('hotkeyCommander')
hotkeyCommander.startConfigurator(targetElement, listenerElement)

// then in another context
const hotkeyCommander = require('hotkeyCommander')
hotkeyCommander.startEngine(listenerElement)

### API:
