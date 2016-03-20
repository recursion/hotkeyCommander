var hotkeyCommander = (function() {

  var template;

  var public_api = {
    init: init,
    loadKeys: loadKeys
  };

  return public_api;

  // load template
  function init() {
    var templates = document.getElementById('hotkeyConfigTemplate').import;
    template = templates.getElementById('hotkey-setting');
  }

  function loadKeys(hotkeys, el) {
    // load hotkeys into the template
    // and write it to the page.
    for (var i in hotkeys) {
      var clone = document.importNode(template.content, true);

      clone.querySelector('.settingButton')
        .addEventListener("click", function(evt) {
          console.log(this);
        });

      clone.querySelector('.functionLabel').innerText = i;
      clone.querySelector('.settingLabel').innerText = hotkeys[i];
      el.appendChild(clone);
    }
  }



})();
