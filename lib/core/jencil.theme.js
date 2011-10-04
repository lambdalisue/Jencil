/*
Jencil theme

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Dependencies:
- Jencil.utils.path (jencil.utils.js)
- Jencil.utils.css (jencil.utils.js)
*/namespace('Jencil.theme', function(exports) {
  var load;
  exports.root = void 0;
  exports.init = function(options) {
    exports.root = Jencil.utils.path.abspath(options.theme.root);
    return Jencil.theme.load(options.theme["default"]);
  };
  exports.load = load = function(name) {
    var editorClass, jencil, media, url, _i, _len, _ref, _ref2, _results;
    if (Jencil.theme.current != null) {
      Jencil.utils.css.remove(new RegExp("" + Jencil.theme.current + "/.*\.css"));
    }
    Jencil.theme.current = Jencil.utils.path.abspath("" + Jencil.theme.root + "/" + name);
    url = "" + Jencil.theme.current + "/style.css";
    media = 'screen, projection';
    Jencil.theme.include(url, media);
    if (Jencil.jencils != null) {
      _ref = Jencil.jencils;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        jencil = _ref[_i];
        editorClass = jencil.workspace.editor.constructor;
        _results.push(((_ref2 = editorClass.extras) != null ? _ref2.stylesheets : void 0) != null ? Jencil.theme.includeall(editorClass.extras.stylesheets) : void 0);
      }
      return _results;
    }
  };
  exports.abspath = function(path) {
    return Jencil.utils.path.abspath(path, Jencil.theme.current);
  };
  exports.include = function(url, media) {
    url = Jencil.theme.abspath(url);
    return Jencil.utils.css.include(url, media);
  };
  return exports.includeall = function(stylesheets) {
    var url, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = stylesheets.length; _i < _len; _i++) {
      url = stylesheets[_i];
      _results.push(Jencil.theme.include(url, 'screen, projection'));
    }
    return _results;
  };
});