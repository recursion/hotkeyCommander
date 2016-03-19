document.addEventListener('DOMContentLoaded', function(evt) {
  var templates = document.getElementById('hotkeyConfigTemplate').import;
  var template = templates.getElementById('hotkey-setting');

  // hotkey settings will need to be stored
  // most likely in local storage
  // but we need to make concession for other places
  var hotkeys = {
    BUY: 's',
    SELL: 'l'
  };


  for (var i in hotkeys) {
    var clone = document.importNode(template.content, true);
    clone.querySelector('.functionLabel').innerText = i;
    clone.querySelector('.settingLabel').innerText = hotkeys[i];
    document.getElementById('hotkeys').appendChild(clone);
  }

});
