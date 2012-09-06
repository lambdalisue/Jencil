var Widget;

Widget = (function() {

  function Widget(core, selector, context) {
    var instance;
    this.core = core;
    if (selector == null) {
      selector = '<div>';
    }
    if (selector instanceof jQuery) {
      this.element = selector;
    } else {
      this.element = jQuery(selector, context);
    }
    instance = this.element.data('widget-instance');
    if ((instance != null) && instance instanceof Widget) {
      return instance;
    }
    this.element.data('widget-instance', this);
  }

  Widget.prototype.factory = function(jQueryObj) {
    return new Widget(this.core, jQueryObj);
  };

  Widget.prototype.parent = function() {
    if (this._parentCache != null) {
      return this._parentCache;
    }
    this._parentCache = this.factory(this.element.parent());
    return this._parentCache;
  };

  Widget.prototype.children = function() {
    var c;
    if (this._childrenCache != null) {
      return this._childrenCache;
    }
    this._childrenCache = (function() {
      var _i, _len, _ref, _results;
      _ref = this.element.children();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        _results.push(this.factory(jQuery(c)));
      }
      return _results;
    }).call(this);
    return this._childrenCache;
  };

  Widget.prototype.init = function() {
    var child, _i, _len, _ref;
    _ref = this.children();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      child.init();
    }
    return this.adjust();
  };

  Widget.prototype.adjust = function() {
    var child, _i, _len, _ref;
    _ref = this.children();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      child.adjust();
    }
    return this;
  };

  return Widget;

})();
