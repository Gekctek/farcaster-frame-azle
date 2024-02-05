(function(root) {

  function getProp(obj, path, defaultValue) {
    if (arguments.length === 1 && (typeof obj === 'object' || obj instanceof Object)) {
      return function(path, defaultValue) {
        return getProp(obj, path, defaultValue);
      };
    }

    if (!(typeof obj === 'object' || obj instanceof Object) || obj === null) {
      return defaultValue;
    }

    var props = [];

    if (Array.isArray(path)) {
      props = path;
    } else {
      if (!(typeof path === 'string' || path instanceof String)) {
        return defaultValue;
      }

      props = (path.match(/(\[(.*?)\]|[0-9a-zA-Z_$]+)/gi)||props).map(function(match) {
        return match.replace(/[\[\]]/gi,'');
      });
    }


    var size = props.length;
    var last = props[size - 1];
    var head = obj;

    for (var i = 0; i < size; i += 1) {
      if (typeof head[props[i]] === 'undefined' ||
          head[props[i]] === null) {
        return defaultValue;
      }
      head = head[props[i]];
      if (typeof head !== 'undefined') {
        if (props[i] === last && i === size - 1) {
          return head;
        }
      }
    }

    return defaultValue;
  }

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = getProp;
    }
    exports.getProp = getProp;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return getProp;
    });
  } else {
    root.getProp = getProp;
  }

})(this);

