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
    var Editor, Widget;
    Widget = Jencil.widgets.Widget;
    return exports.Editor = Editor = (function() {
      __extends(Editor, Widget);
      function Editor(jencil, cls, type) {
        Editor.__super__.constructor.call(this, jencil, cls, type);
      }
      Editor.prototype.update = function() {};
      Editor.prototype.getValue = function() {
        throw new Error("Subclass must override this method.");
      };
      Editor.prototype.getSelection = function() {
        throw new Error("Subclass must override this method.");
      };
      Editor.prototype.setSelection = function(start, end) {
        throw new Error("Subclass must override this method.");
      };
      Editor.prototype.getSelected = function() {
        throw new Error("Subclass must override this method.");
      };
      Editor.prototype.replaceSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        throw new Error("Subclass must override this method.");
      };
      Editor.prototype.insertBeforeSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        throw new Error("Subclass must override this method.");
      };
      Editor.prototype.insertAfterSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        throw new Error("Subclass must override this method.");
      };
      Editor.prototype.wrapSelected = function(before, after, select, additional) {
        if (select == null) {
          select = false;
        }
        if (additional == null) {
          additional = void 0;
        }
        throw new Error("Subclass must override this method.");
      };
      return Editor;
    })();
  });
}).call(this);
