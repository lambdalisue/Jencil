/*
Jencil RichEditor

A Dualpane WYSIWYG Editor with TextareaPane

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Required:
- Jencil.widget (jencil.widget.js)
- Jencil.editor (jencil.editor.js)
- Jencil.editor.pane (jencil.editor.pane.js)
- Jencil.editor.pane.TextareaPane (jencil.texteditor.js)
- Jencil.button (jencil.button.js)

Dependencies:
- Jencil.utils.detector (jencil.utils.js)
- Textarea (textarea.js)
*/
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
namespace('Jencil.editor.pane', function(exports) {
  var EditorPane, RichareaPane;
  EditorPane = Jencil.editor.pane.EditorPane;
  return exports.RichareaPane = RichareaPane = (function() {
    __extends(RichareaPane, EditorPane);
    function RichareaPane(jencil, editor) {
      var src;
      RichareaPane.__super__.constructor.call(this, jencil, 'jencil-richarea-pane', editor);
      this.$element.css({
        position: 'relative'
      });
      this.$surface = $('<iframe>').addClass('surface');
      this.$surface.appendTo(this.$element);
      this.$surface.css({
        width: '100%',
        height: '100%',
        border: 'none',
        margin: 0,
        padding: 0
      });
      if (this.jencil.options.extras.richareaTemplatePath != null) {
        src = this.jencil.options.extras.richareaTemplatePath;
        this.$surface.attr('src', Jencil.utils.path.abspath(src));
      }
      if (Jencil.utils.detector.browser === 'Explorer') {
        this.$surface.attr('frameborder', 0);
      }
      this.controller = null;
    }
    RichareaPane.prototype.init = function() {
      this.controller = new Richarea(this.$surface);
      return this.controller.ready(__bind(function() {
        this.relocate();
        this.$body = $(this.controller.raw.body);
        this.$body.css({
          margin: 0,
          padding: 0
        });
        this.$body.bind('keyup keypress change click blur enter', __bind(function() {
          this.update();
          if (Jencil.utils.detector.browser === 'Firefox') {
            return setTimeout(__bind(function() {
              return this.update();
            }, this), 100);
          }
        }, this));
        return RichareaPane.__super__.init.call(this);
      }, this));
    };
    RichareaPane.prototype.relocate = function() {
      RichareaPane.__super__.relocate.call(this);
      if (Jencil.utils.detector.browser === 'Explorer' && Jencil.utils.detector.version < 8) {
        this.$surface.height(this.$element.height());
      }
      if (Jencil.utils.detector.browser === 'Explorer' && Jencil.utils.detector.version < 9) {
        return this.$body.height(this.$surface.height());
      }
    };
    RichareaPane.prototype.getValue = function() {
      var _ref;
      if ((_ref = this.controller) != null ? _ref.ready() : void 0) {
        return this.controller.getValue();
      }
    };
    RichareaPane.prototype.setValue = function(value) {
      var _ref;
      if ((_ref = this.controller) != null ? _ref.ready() : void 0) {
        return this.controller.setValue(value);
      }
    };
    RichareaPane.prototype.focus = function() {
      return this.$surface.focus();
    };
    return RichareaPane;
  })();
});
namespace('Jencil.editor', function(exports) {
  var DualPaneEditorBase, RichEditor, RichareaPane, TextareaPane;
  DualPaneEditorBase = Jencil.editor.DualPaneEditorBase;
  TextareaPane = Jencil.editor.pane.TextareaPane;
  RichareaPane = Jencil.editor.pane.RichareaPane;
  return exports.RichEditor = RichEditor = (function() {
    __extends(RichEditor, DualPaneEditorBase);
    RichEditor.extras = {
      options: {
        richareaTemplatePath: '~/extras/templates/richarea.html'
      }
    };
    function RichEditor(jencil) {
      var lhspane, rhspane, _ref;
      if ((_ref = jencil.options.extras.previewPosition) === 'top' || _ref === 'left') {
        lhspane = this.preview = new TextareaPane(jencil, this);
        rhspane = this.richarea = new RichareaPane(jencil, this);
      } else {
        lhspane = this.richarea = new RichareaPane(jencil, this);
        rhspane = this.preview = new TextareaPane(jencil, this);
      }
      RichEditor.__super__.constructor.call(this, jencil, 'jencil-rich-editor', lhspane, rhspane);
      this.$element.addClass("jencil-preview-position-" + this.jencil.options.extras.previewPosition);
      if (this.jencil.options.extras.defaultPreviewState === 'close') {
        this.preview.hide();
      }
    }
    RichEditor.prototype.init = function() {
      RichEditor.__super__.init.call(this);
      return this.richarea.controller.ready(__bind(function() {
        this.setValue(this.jencil.getSourceValue());
        this.preview.setValue(this.getValue());
        this.richarea.update(__bind(function() {
          this.jencil.setSourceValue(this.getValue());
          return this.preview.setValue(this.getValue());
        }, this));
        this.preview.update(__bind(function() {
          this.jencil.setSourceValue(this.preview.getValue());
          return this.richarea.setValue(this.preview.getValue());
        }, this));
        return this.update();
      }, this));
    };
    RichEditor.prototype.getValue = function() {
      return this.richarea.getValue();
    };
    RichEditor.prototype.setValue = function(value) {
      return this.richarea.setValue(value);
    };
    RichEditor.prototype.focus = function() {
      return this.richarea.focus();
    };
    return RichEditor;
  })();
});
namespace('Jencil.button', function(exports) {
  var ButtonBase, CommandButton, MarkupButtonBase, PromptCommandButton;
  ButtonBase = Jencil.button.ButtonBase;
  MarkupButtonBase = Jencil.button.MarkupButtonBase;
  exports.CommandButton = CommandButton = (function() {
    __extends(CommandButton, MarkupButtonBase);
    function CommandButton(jencil, args) {
      var cls, name;
      name = args[0], cls = args[1], this.command = args[2], this.args = args[3];
      CommandButton.__super__.constructor.call(this, jencil, name, cls);
    }
    CommandButton.prototype.click = function() {
      return this.exec(this.command, this.args);
    };
    CommandButton.prototype.clickAfter = function() {
      return this.editor().focus();
    };
    CommandButton.prototype.exec = function(command, args) {
      if (this.editor().richarea.controller != null) {
        return this.editor().richarea.controller.execCommand(command, args);
      }
    };
    return CommandButton;
  })();
  return exports.PromptCommandButton = PromptCommandButton = (function() {
    __extends(PromptCommandButton, CommandButton);
    function PromptCommandButton(jencil, args) {
      var cls, command, name;
      name = args[0], cls = args[1], command = args[2], this.message = args[3], this.defaultValue = args[4];
      PromptCommandButton.__super__.constructor.call(this, jencil, [name, cls, command, void 0]);
    }
    PromptCommandButton.prototype.click = function() {
      var value;
      value = prompt(this.message, this.defaultValue || '');
      if (value === null) {
        return;
      }
      return this.exec(this.command, value);
    };
    return PromptCommandButton;
  })();
});