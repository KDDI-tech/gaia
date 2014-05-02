(function(window) {
  'use strict';

  var URL_WEB = 'http://www.yahoo.co.jp';
  var URL_APP = 'app://as-lockscreen.gaiamobile.org';
  var URL_APP_INDEX = URL_APP + '/index.html';
  var URL_APP_MANIFEST = URL_APP + '/manifest.webapp';

  var lockscreen, lockscreenIframe, wallpaper, wallpaperIframe;
  var button1, button2;

  window.onload = function() {
    init();
  };

  function init() {
    var height = window.innerHeight + 'px';
    var width = window.innerWidth + 'px';

    button1 = document.getElementById('load-wallpaper');
    button1.addEventListener('click', asWallpaperLoadFromWeb);
    wallpaper = document.getElementById('as-wallpaper');
    wallpaperIframe = wallpaper.querySelector('iframe');
    wallpaperIframe.style.height = height;
    wallpaperIframe.style.width = width;

    button2 = document.getElementById('load-lockscreen');
    button2.addEventListener('click', asLockscreenLoadFromApp);
    lockscreen = document.getElementById('as-lockscreen');
    lockscreenIframe = lockscreen.querySelector('iframe');
    lockscreenIframe.style.height = height;
    lockscreenIframe.style.width = width;

    window.addEventListener('message', receiveMessage, false);
  }

  //
  // Code sample of "a. As wallpaper".
  //
  function asWallpaperLoadFromWeb() {

    var iframe = wallpaperIframe;

    iframe.setAttribute('mozbrowser', 'true');
    iframe.setAttribute('sandbox', 'allow-scripts');
    iframe.setAttribute('remote', 'true');
    iframe.setAttribute('src', URL_WEB);

    // If 'src' is "app://", set 'mozapp' for permissions (e.g, SystemXHR).
    // iframe.setAttribute('mozapp', 'manifestURL/to/app')

    lockscreen.classList.remove('visible');
    wallpaper.classList.add('visible');
  }

  //
  // Code sample of "b. As lockscreen "
  //
  function asLockscreenLoadFromApp() {

    var iframe = lockscreenIframe;

    iframe.setAttribute('mozbrowser', 'true');
    // iframe.setAttribute('sandbox','allow-scripts'); // can't load into iframe
    // iframe.setAttribute('remote', 'true'); // not use for postMessage
    iframe.setAttribute('src', URL_APP_INDEX);
    iframe.setAttribute('mozapp', URL_APP_MANIFEST);

    iframe.onload =
      function() { sendMessage(window.frames[1], {type: 'invoke'}, URL_APP); };

    wallpaper.classList.remove('visible');
    lockscreen.classList.add('visible');
  }

  function sendMessage(frame, data, target) {
    frame.postMessage(data, target);
  }

  function receiveMessage(event) {

    var type = event.data.type;
    console.log('type: ' + type);

    // TODO: origin check
    // var origin = event.origin;

    switch (type) {
      case 'unlock':
        lockscreenIframe.setAttribute('src', 'about:blank');
        lockscreen.classList.remove('visible');
        wallpaper.classList.remove('visible');

        // TODO: Send unlock message to "gaia system" by IAC etc

        break;

      default:
    }
  }

})(this);

