(function() {
  /*
  Jencil SimpleEditor
  
  This editor is tutorial editor of Jencil
  */
  var Initializer;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Initializer = (function() {
    __extends(Initializer, Jencil.editors.Initializer);
    function Initializer() {
      Initializer.__super__.constructor.apply(this, arguments);
    }
    Initializer.prototype.stylesheets = [['js/jencil.extra/jencil.simpleeditor.css']];
    return Initializer;
  })();
  namespace('Jencil.editors', function(exports) {
    var EditorBase, SimpleEditor;
    EditorBase = Jencil.editors.EditorBase;
    return exports.SimpleEditor = SimpleEditor = (function() {
      __extends(SimpleEditor, EditorBase);
      SimpleEditor.Initializer = Initializer;
      function SimpleEditor(jencil) {
        SimpleEditor.__super__.constructor.call(this, jencil, 'jencil-simple-editor', 'textarea');
        this.$source = this.jencil.$textarea;
        this.$element.val(this.$source.val());
        this.$element.bind('keyup change click blur enter', __bind(function() {
          return this.update();
        }, this));
        this.controller = new Textarea(this.$element);
      }
      SimpleEditor.prototype.update = function() {
        return this.$source.val(this.$element.val());
      };
      SimpleEditor.prototype.getValue = function() {
        return this.controller.getValue();
      };
      SimpleEditor.prototype.getSelection = function() {
        return this.controller.getSelection();
      };
      SimpleEditor.prototype.setSelection = function(start, end) {
        return this.controller.setSelection(start, end);
      };
      SimpleEditor.prototype.getSelected = function() {
        return this.controller.getSelected();
      };
      SimpleEditor.prototype.replaceSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        return this.controller.replaceSelected(str, select);
      };
      SimpleEditor.prototype.insertBeforeSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        return this.controller.insertBeforeSelected(str, select);
      };
      SimpleEditor.prototype.insertAfterSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        return this.controller.insertAfterSelected(str, select);
      };
      SimpleEditor.prototype.wrapSelected = function(before, after, select, additional) {
        if (select == null) {
          select = false;
        }
        if (additional == null) {
          additional = void 0;
        }
        return this.controller.wrapSelected(before, after, select, additional);
      };
      return SimpleEditor;
    })();
  });
}).call(this);
