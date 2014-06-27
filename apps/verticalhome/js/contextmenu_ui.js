'use strict';
/* global LazyLoader */
/* global MozActivity */
/* global wallpaper */
/* jshint nonew: false */

(function(exports) {

  function ContextMenuUI() {
    this.grid = document.getElementById('icons');
    this.dialog = document.getElementById('contextmenu-dialog');
    this.collectionOption = document.getElementById('create-smart-collection');
    this.wallpaperOption = document.getElementById('change-wallpaper-action');

    this.handleCancel = this._handleCancel.bind(this);
  }

  ContextMenuUI.prototype = {
    show: function(e) {
      // calculate the offset of the click this will account for anything above
      // the gaia-grid
      var scrollTop = this.grid.parentNode.scrollTop;
      var yOffset = scrollTop + this.grid.getBoundingClientRect().y;

      var nearestIndex = this.grid._grid.getNearestItemIndex(
        e.pageX,
        e.pageY - yOffset + scrollTop
      );

      window.dispatchEvent(new CustomEvent('context-menu-open', {
        detail: {
          nearestIndex: nearestIndex
        }
      }));

      this.dialog.addEventListener('gaiamenu-cancel', this.handleCancel);
      this.dialog.removeAttribute('hidden');
      this.collectionOption.addEventListener('click', this);
      this.wallpaperOption.addEventListener('click', this);
    },

    hide: function() {
      this.dialog.removeEventListener('gaiamenu-cancel', this.handleCancel);
      this.collectionOption.removeEventListener('click', this);
      this.wallpaperOption.removeEventListener('click', this);
      this.dialog.setAttribute('hidden', '');
      window.dispatchEvent(new CustomEvent('context-menu-close'));
    },

    _handleCancel: function(e) {
      this.hide();
    },

    handleEvent: function(e) {
      if (e.type !== 'click') {
        return;
      }

      switch(e.target.id) {
        case 'change-wallpaper-action':
          LazyLoader.load(['shared/js/omadrm/fl.js',
                           'js/wallpaper.js'], function() {
            this.hide();
            wallpaper.change();
          }.bind(this));

          break;

        case 'create-smart-collection':
          this.hide();

          window.dispatchEvent(new CustomEvent('collections-create-begin'));

          var maxIconSize = this.grid.maxIconSize;
          var activity = new MozActivity({
            name: 'create-collection',
            data: {
              type: 'folder',
              maxIconSize: maxIconSize
            }
          });

          activity.onsuccess = function(e) {
            window.dispatchEvent(new CustomEvent('collections-create-return', {
              detail: {
                ids: activity.result
              }
            }));
          };

          activity.onerror = function onerror(e) {
            window.dispatchEvent(new CustomEvent('collections-create-return'));
            if (this.error.name !== 'ActivityCanceled') {
              alert(this.error.name);
            }
          };

          break;
      }
    }
  };

  exports.contextMenuUI = new ContextMenuUI();

}(window));
