(function(window) {
  'use strict';

  var source, origin;

  window.onload = function() {
    init();
  };

  function init() {
    var button = document.getElementById('unlock');
    button.addEventListener('click', unlock);

    window.addEventListener('message', receiveMessage, false);
  }

  function unlock() {
    sendMessage(source, {type: 'unlock'}, origin);
  }

  function receiveMessage(event) {

    var type = event.data.type;
    console.log('type: ' + type);

    switch (type) {
      case 'invoke':
        source = event.source;
        origin = event.origin;
        break;
      default:
    }
  }

  function sendMessage(source, data, target) {
    source.postMessage(data, target);
  }


})(this);

