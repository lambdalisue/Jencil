(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  namespace('Jencil.editors', function(exports) {
    var Editor, WYGIWYS;
    Editor = Jencil.widgets.Editor;
    return exports.WYGIWYS = WYGIWYS = (function() {
      __extends(WYGIWYS, Editor);
      function WYGIWYS(jencil) {
        WYGIWYS.__super__.constructor.call(this, jencil, 'jencil-wygiwyse', 'iframe');
      }
      WYGIWYS.prototype.show = function() {
        this.jencil.$textarea.hide();
        return this.$element.show();
      };
      WYGIWYS.prototype.hide = function() {
        this.$element.hide();
        return this.jencil.$textarea.show();
      };
      return WYGIWYS;
    })();
  });
}).call(this);
