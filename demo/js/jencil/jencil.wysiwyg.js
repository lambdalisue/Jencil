(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  namespace('Jencil.widgets', function(exports) {
    var Editor, Widget, Wysiwyg;
    Widget = Jencil.widgets.Widget;
    Editor = Jencil.widgets.Editor;
    return exports.Wysiwyg = Wysiwyg = (function() {
      __extends(Wysiwyg, Editor);
      function Wysiwyg(jencil) {
        Wysiwyg.__super__.constructor.call(this, jencil, 'jencil-wysiwyg-editor', 'div');
      }
      return Wysiwyg;
    })();
  });
}).call(this);
