# Hotkey Commander
> A drop in javascript module for configuring hotkeys.
> This module uses the HTML import spec for templating, which is currently (and sadly) only  supported by chrome. Polyfills or other template options may be added later. 

### Usage
- Setup initial hotkeys in the hotkeys.js file.
- Include the hotkeyCommander.js script in your main html file. 
- Run the modules init function.
- Pass an object of hotkeys (using hotkeyCommanders object model) and the element to attach config to, to loadKeys.

```html
  <div id="hotkeys"></div>
  ....
  <script src="hotkeyConfig.js"></script>

  <script>
  // This code can be in your applications .js file
  var hotkeysMap = {
        HOTKEY_NAME: {
          name: 'HOTKEY_NAME',
          keyCode: 89,
          ctrlKey: false,
          shiftKey: false,
          altKey: false
        }
  };
  hotkeyCommander.init();
  var hotkeys = hotkeyCommander.buildKeyMap(hotkeysMap);

  var targetEl = document.getElementById('hotkeys');
  hotkeyCommander.loadKeys(hotkeys, targetEl);
  </script>

```


