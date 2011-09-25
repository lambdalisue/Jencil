(function() {
  /*
  Jencil editor
  */
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  namespace('Jencil.editors', function(exports) {
    var EditorBase, Widget;
    Widget = Jencil.widgets.Widget;
    return exports.EditorBase = EditorBase = (function() {
      __extends(EditorBase, Widget);
      /*
          An abstruct class of Jencil editor
          */
      function EditorBase(jencil, cls, type) {
        EditorBase.__super__.constructor.call(this, jencil, cls, type);
      }
      EditorBase.prototype.update = function() {
        /*
              Update editor. Subclass should override this method to update anything related to the editor
              */
      };
      EditorBase.prototype.getValue = function() {
        throw new Error("Subclass must override this method.");
      };
      EditorBase.prototype.getSelection = function() {
        throw new Error("Subclass must override this method.");
      };
      EditorBase.prototype.setSelection = function(start, end) {
        throw new Error("Subclass must override this method.");
      };
      EditorBase.prototype.getSelected = function() {
        throw new Error("Subclass must override this method.");
      };
      EditorBase.prototype.replaceSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        throw new Error("Subclass must override this method.");
      };
      EditorBase.prototype.insertBeforeSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        throw new Error("Subclass must override this method.");
      };
      EditorBase.prototype.insertAfterSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        throw new Error("Subclass must override this method.");
      };
      EditorBase.prototype.wrapSelected = function(before, after, select, additional) {
        if (select == null) {
          select = false;
        }
        if (additional == null) {
          additional = void 0;
        }
        throw new Error("Subclass must override this method.");
      };
      return EditorBase;
    })();
  });
}).call(this);
