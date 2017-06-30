import * as Mousetrap from '../mousetrap.min.js';
const original = Mousetrap.stopCallback;

const m = function() {
  let _global_callbacks = {};
  let _original_stop_callback = original;

  Mousetrap.stopCallback = function(e, element, combo) {
    if (_global_callbacks[combo]) {
      return false;
    }

    return _original_stop_callback(e, element, combo);
  };

  Mousetrap.bindGlobal = function(keys, callback, action) {
    Mousetrap.bind(keys, callback, action);

    if (keys instanceof Array) {
      for (var i = 0; i < keys.length; i++) {
        _global_callbacks[keys[i]] = true;
      }
      return;
    }

    _global_callbacks[keys] = true;
  };

  return Mousetrap;
}

export const Mouse = m();
