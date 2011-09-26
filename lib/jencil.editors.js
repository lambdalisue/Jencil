(function() {
  /*
  Jencil editor
  */
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  namespace('Jencil.editors', function(exports) {
    var EditorBase, Initializer, Widget, changeEditor;
    Widget = Jencil.widgets.Widget;
    exports.changeEditor = changeEditor = function(jencil, name, callback) {
      var cls, i, initializer, requires, _ref;
      cls = Jencil.editors[name];
      if (!(cls != null)) {
        throw new Error("Unknown editor name is passed (name: " + name + ")");
      }
      initializer = new cls.Initializer(jencil);
      jencil.options.extras = $.extend(true, initializer.options, jencil.options.extras);
      Jencil.theme.loadall(initializer.stylesheets);
      requires = initializer.requires;
      for (i = 0, _ref = requires.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        requires[i] = net.hashnote.path.abspath(requires[i], jencil.options.root);
      }
      return net.hashnote.module.loadall(requires, __bind(function() {
        var _base, _ref2;
        if ((_ref2 = jencil._editor) != null) {
          _ref2.$element.remove();
        }
        delete jencil._editor;
        jencil._editor = new cls(jencil);
        jencil.workspace.append(jencil._editor);
        if (typeof (_base = jencil._editor).init === "function") {
          _base.init();
        }
        return callback();
      }, this));
    };
    exports.Initializer = Initializer = (function() {
      Initializer.prototype.requires = [];
      Initializer.prototype.stylesheets = [];
      Initializer.prototype.options = [];
      function Initializer(jencil) {
        var i, _ref;
        for (i = 0, _ref = this.requires.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
          this.requires[i][0] = jencil.abspath(this.requires[i][0]);
        }
      }
      return Initializer;
    })();
    return exports.EditorBase = EditorBase = (function() {
      __extends(EditorBase, Widget);
      /*
          An abstruct class of Jencil editor
          */
      EditorBase.Initializer = Initializer;
      function EditorBase(jencil, cls, type) {
        EditorBase.__super__.constructor.call(this, jencil, cls, type);
      }
      EditorBase.prototype.init = function() {
        /*
              Initialize function. This function is called after everything has constructed.
              */
      };
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
