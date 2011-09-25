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
    var Editor, RichEditor, Widget;
    Widget = Jencil.widgets.Widget;
    Editor = Jencil.editors.Editor;
    return exports.RichEditor = RichEditor = (function() {
      __extends(RichEditor, Editor);
      function RichEditor(jencil) {
        RichEditor.__super__.constructor.call(this, jencil, 'jencil-rich-editor', 'div');
      }
      return RichEditor;
    })();
  });
}).call(this);
