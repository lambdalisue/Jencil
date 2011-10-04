/*
Jencil editor

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Required:
- Jencil.widget (jencil.widget.js)

Dependencies
- Jencil.utils.script (jencil.utils.js)
- Jencil.theme (jencil.theme.js)
*/
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
namespace('Jencil.editor', function(exports) {
  var DualPaneEditorBase, EditorBase, SinglePaneEditorBase, Widget, getOffsetX, getOffsetY, use;
  Widget = Jencil.widget.Widget;
  getOffsetX = function($$) {
    return $$.outerWidth(true) - $$.width();
  };
  getOffsetY = function($$) {
    return $$.outerHeight(true) - $$.height();
  };
  exports.use = use = function(jencil, name, callback) {
    var check, prepare, process, url, _ref;
    if (callback == null) {
      callback = void 0;
    }
    prepare = function() {
      var extras, _ref;
      extras = Jencil.editor[name].extras;
      if ((extras != null ? extras.options : void 0) != null) {
        jencil.options.extras = $.extend(true, extras.options, (_ref = jencil.options.extras) != null ? _ref : {});
      }
      if ((extras != null ? extras.stylesheets : void 0) != null) {
        Jencil.theme.includeall(extras.stylesheets);
      }
      if ((extras != null ? extras.requires : void 0) != null) {
        return Jencil.utils.script.loadall(extras.requires, function() {
          return process();
        });
      } else {
        return process();
      }
    };
    process = function() {
      var editor, editorClass;
      editorClass = Jencil.editor[name];
      if (jencil.workspace.editor != null) {
        jencil.workspace.editor.$element.remove();
        jencil.workspace.editor = null;
      }
      editor = new editorClass(jencil);
      jencil.workspace.append(editor);
      jencil.workspace.editor = editor;
      editor.init();
      if (callback != null) {
        return callback();
      }
    };
    if (name instanceof Array) {
      _ref = name, name = _ref[0], url = _ref[1], check = _ref[2];
      return Jencil.utils.script.load(url, check, function() {
        return prepare();
      });
    } else {
      return prepare();
    }
  };
  exports.EditorBase = EditorBase = (function() {
    __extends(EditorBase, Widget);
    function EditorBase(jencil, cls) {
      EditorBase.__super__.constructor.call(this, jencil, cls);
      this.workspace = this.jencil.workspace;
      this.$element.addClass('jencil-editor');
      this.$element.hide();
    }
    EditorBase.prototype.init = function() {
      this.$element.show();
      return this.relocate();
    };
    EditorBase.prototype.update = function() {
      return this.relocate();
    };
    EditorBase.prototype.relocate = function() {
      var height, offsetX, offsetY, width;
      offsetX = getOffsetX(this.$element);
      offsetY = getOffsetY(this.$element);
      width = this.workspace.$element.width();
      height = this.workspace.$element.height();
      this.$element.width(width - offsetX);
      return this.$element.height(height - offsetY);
    };
    return EditorBase;
  })();
  exports.SinglePaneEditorBase = SinglePaneEditorBase = (function() {
    __extends(SinglePaneEditorBase, EditorBase);
    function SinglePaneEditorBase(jencil, cls, pane) {
      this.pane = pane;
      SinglePaneEditorBase.__super__.constructor.call(this, jencil, cls);
      this.pane.$element.appendTo(this.$element);
      this.pane.$element.addClass('jencil-pane');
      this.$element.addClass("jencil-siglepane-editor");
    }
    SinglePaneEditorBase.prototype.init = function() {
      this.pane.init();
      return SinglePaneEditorBase.__super__.init.call(this);
    };
    SinglePaneEditorBase.prototype.update = function() {
      this.pane.update();
      return SinglePaneEditorBase.__super__.update.call(this);
    };
    SinglePaneEditorBase.prototype.relocate = function() {
      var height, offsetX, offsetY, width;
      SinglePaneEditorBase.__super__.relocate.call(this);
      offsetX = getOffsetX(this.pane.$element);
      offsetY = getOffsetY(this.pane.$element);
      width = this.$element.width();
      height = this.$element.height();
      this.pane.$element.width(width - offsetX);
      return this.pane.$element.height(height - offsetY);
    };
    return SinglePaneEditorBase;
  })();
  return exports.DualPaneEditorBase = DualPaneEditorBase = (function() {
    __extends(DualPaneEditorBase, EditorBase);
    function DualPaneEditorBase(jencil, cls, lhspane, rhspane, panedir) {
      this.lhspane = lhspane;
      this.rhspane = rhspane;
      this.panedir = panedir != null ? panedir : 'horizontal';
      DualPaneEditorBase.__super__.constructor.call(this, jencil, cls);
      this.lhspane.$element.appendTo(this.$element);
      this.rhspane.$element.appendTo(this.$element);
      this.lhspane.$element.addClass('jencil-lhspane');
      this.rhspane.$element.addClass('jencil-rhspane');
      this.$element.addClass("jencil-panedir-" + this.panedir);
    }
    DualPaneEditorBase.prototype.init = function() {
      this.lhspane.init();
      this.rhspane.init();
      return DualPaneEditorBase.__super__.init.call(this);
    };
    DualPaneEditorBase.prototype.update = function() {
      this.lhspane.update();
      this.rhspane.update();
      return DualPaneEditorBase.__super__.update.call(this);
    };
    DualPaneEditorBase.prototype.relocate = function() {
      var height, lhsOffsetX, lhsOffsetY, rhsOffsetX, rhsOffsetY, width;
      DualPaneEditorBase.__super__.relocate.call(this);
      if (this.lhspane.isVisible() && this.rhspane.isVisible()) {
        this.$element.removeClass('jencil-singlepane-editor');
        this.$element.addClass("jencil-dualpane-editor");
      } else {
        this.$element.addClass('jencil-singlepane-editor');
        this.$element.removeClass("jencil-dualpane-editor");
      }
      lhsOffsetX = getOffsetX(this.lhspane.$element);
      rhsOffsetX = getOffsetX(this.rhspane.$element);
      lhsOffsetY = getOffsetY(this.lhspane.$element);
      rhsOffsetY = getOffsetY(this.rhspane.$element);
      width = this.$element.width();
      height = this.$element.height();
      if (this.lhspane.isVisible() && this.rhspane.isVisible()) {
        if (this.panedir === 'horizontal') {
          this.lhspane.$element.css({
            'float': 'left'
          });
          this.rhspane.$element.css({
            'float': 'right'
          });
          this.lhspane.$element.width(width / 2 - lhsOffsetX);
          this.rhspane.$element.width(width / 2 - rhsOffsetX);
          this.lhspane.$element.height(height - lhsOffsetY);
          this.rhspane.$element.height(height - rhsOffsetY);
        } else {
          this.lhspane.$element.css({
            'float': 'none'
          });
          this.rhspane.$element.css({
            'float': 'none'
          });
          this.lhspane.$element.width(width - lhsOffsetX);
          this.rhspane.$element.width(width - rhsOffsetX);
          this.lhspane.$element.height(height / 2 - lhsOffsetY);
          this.rhspane.$element.height(height / 2 - rhsOffsetY);
        }
      } else if (this.lhspane.isVisible()) {
        this.lhspane.$element.css({
          'float': 'none'
        });
        this.lhspane.$element.width(width - lhsOffsetX);
        this.lhspane.$element.height(height - lhsOffsetY);
      } else {
        this.rhspane.$element.css({
          'float': 'none'
        });
        this.rhspane.$element.width(width - rhsOffsetX);
        this.rhspane.$element.height(height - rhsOffsetY);
      }
      this.lhspane.relocate();
      return this.rhspane.relocate();
    };
    return DualPaneEditorBase;
  })();
});