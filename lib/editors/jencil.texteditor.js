/*
Jencil TextEditor

A simple Dualpane Markup Editor with PreviewPane

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Required:
- Jencil.widget (jencil.widget.js)
- Jencil.editor (jencil.editor.js)
- Jencil.editor.pane (jencil.editor.pane.js)
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
  var EditorPane, TextareaPane;
  EditorPane = Jencil.editor.pane.EditorPane;
  return exports.TextareaPane = TextareaPane = (function() {
    __extends(TextareaPane, EditorPane);
    function TextareaPane(jencil, editor) {
      TextareaPane.__super__.constructor.call(this, jencil, 'jencil-textarea-pane', editor);
      this.$element.css({
        position: 'relative'
      });
      this.$surface = $('<textarea>').addClass('surface');
      this.$surface.appendTo(this.$element);
      this.$surface.css({
        width: '100%',
        height: '100%',
        border: 'none',
        margin: 0,
        padding: 0,
        resize: 'none',
        outline: 'none'
      });
      this.$surface.bind('keypress click change blur enter', __bind(function() {
        return this.update();
      }, this));
      this.controller = new Textarea(this.$surface);
    }
    TextareaPane.prototype.relocate = function() {
      TextareaPane.__super__.relocate.call(this);
      if (Jencil.utils.detector.browser === 'Explorer' && Jencil.utils.detector.version < 8) {
        return this.$surface.height(this.$element.height());
      }
    };
    TextareaPane.prototype.getValue = function() {
      return this.controller.getValue();
    };
    TextareaPane.prototype.setValue = function(value) {
      return this.controller.setValue(value);
    };
    return TextareaPane;
  })();
});
namespace('Jencil.editor', function(exports) {
  var DualPaneEditorBase, PreviewPane, TextEditor, TextareaPane;
  DualPaneEditorBase = Jencil.editor.DualPaneEditorBase;
  PreviewPane = Jencil.editor.pane.PreviewPane;
  TextareaPane = Jencil.editor.pane.TextareaPane;
  return exports.TextEditor = TextEditor = (function() {
    __extends(TextEditor, DualPaneEditorBase);
    TextEditor.extras = {
      options: {
        previewPosition: 'right',
        previewTemplatePath: '~/extras/templates/preview.html',
        defaultPreviewState: 'open'
      }
    };
    function TextEditor(jencil) {
      var lhspane, rhspane, _ref;
      if ((_ref = jencil.options.extras.previewPosition) === 'top' || _ref === 'left') {
        lhspane = this.preview = new PreviewPane(jencil, this);
        rhspane = this.textarea = new TextareaPane(jencil, this);
      } else {
        lhspane = this.textarea = new TextareaPane(jencil, this);
        rhspane = this.preview = new PreviewPane(jencil, this);
      }
      TextEditor.__super__.constructor.call(this, jencil, 'jencil-text-editor', lhspane, rhspane);
      this.$element.addClass("jencil-preview-position-" + this.jencil.options.extras.previewPosition);
      this.setValue(this.jencil.getSourceValue());
      if (this.jencil.options.extras.defaultPreviewState === 'close') {
        this.preview.hide();
      }
      this.textarea.update(__bind(function() {
        this.jencil.setSourceValue(this.getValue());
        return this.preview.update();
      }, this));
    }
    TextEditor.prototype.init = function() {
      if ($.fn.tabby != null) {
        this.textarea.$element.tabby();
      }
      return TextEditor.__super__.init.call(this);
    };
    TextEditor.prototype.relocate = function() {
      TextEditor.__super__.relocate.call(this);
      if (Jencil.utils.detector.browser === 'Explorer' && Jencil.utils.detector.version === 8) {
        return document.selection.createRange().select();
      }
    };
    TextEditor.prototype.getValue = function() {
      return this.textarea.getValue();
    };
    TextEditor.prototype.setValue = function(value) {
      return this.textarea.setValue(value);
    };
    TextEditor.prototype.getSelection = function() {
      return this.textarea.controller.getSelection();
    };
    TextEditor.prototype.setSelection = function(start, end) {
      return this.textarea.controller.setSelection(start, end);
    };
    TextEditor.prototype.getSelected = function() {
      return this.textarea.controller.getSelected();
    };
    TextEditor.prototype.replaceSelected = function(str, select) {
      if (select == null) {
        select = false;
      }
      return this.textarea.controller.replaceSelected(str, select);
    };
    TextEditor.prototype.insertBeforeSelected = function(str, select) {
      if (select == null) {
        select = false;
      }
      return this.textarea.controller.insertBeforeSelected(str, select);
    };
    TextEditor.prototype.insertAfterSelected = function(str, select) {
      if (select == null) {
        select = false;
      }
      return this.textarea.controller.insertAfterSelected(str, select);
    };
    TextEditor.prototype.wrapSelected = function(before, after, select, additional) {
      if (select == null) {
        select = false;
      }
      if (additional == null) {
        additional = void 0;
      }
      return this.textarea.controller.wrapSelected(before, after, select, additional);
    };
    return TextEditor;
  })();
});
namespace('Jencil.button', function(exports) {
  var ButtonBase, ImageMarkupButton, LinkMarkupButton, MarkupButtonBase, MultilineMarkupButton, SimpleMarkupButton, Widget;
  Widget = Jencil.widget.Widget;
  ButtonBase = Jencil.button.ButtonBase;
  exports.MarkupButtonBase = MarkupButtonBase = (function() {
    __extends(MarkupButtonBase, ButtonBase);
    function MarkupButtonBase() {
      MarkupButtonBase.__super__.constructor.apply(this, arguments);
    }
    MarkupButtonBase.prototype.clickAfter = function() {
      return this.editor().update();
    };
    return MarkupButtonBase;
  })();
  exports.SimpleMarkupButton = SimpleMarkupButton = (function() {
    __extends(SimpleMarkupButton, MarkupButtonBase);
    function SimpleMarkupButton(jencil, args) {
      var cls, name;
      cls = args[0], name = args[1], this.before = args[2], this.after = args[3], this.insert = args[4];
      SimpleMarkupButton.__super__.constructor.call(this, jencil, cls, name);
    }
    SimpleMarkupButton.prototype.click = function() {
      return this.editor().wrapSelected(this.before, this.after, true, this.insert || this.jencil.options.defaultInsertText);
    };
    return SimpleMarkupButton;
  })();
  exports.MultilineMarkupButton = MultilineMarkupButton = (function() {
    __extends(MultilineMarkupButton, MarkupButtonBase);
    function MultilineMarkupButton(jencil, args) {
      var cls, name;
      cls = args[0], name = args[1], this.before = args[2], this.after = args[3], this.blockBefore = args[4], this.blockAfter = args[5];
      MultilineMarkupButton.__super__.constructor.call(this, jencil, cls, name);
    }
    MultilineMarkupButton.prototype.click = function() {
      var i, line, offset, replace, selectedLines, _after, _before, _ref;
      selectedLines = this.editor().getSelected().split('\n');
      offset = selectedLines[0] === this.blockBefore ? 1 : 0;
      for (i = 0, _ref = selectedLines.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        _before = Jencil.utils.string.format(this.before, {
          i: i + 1 - offset
        });
        _after = Jencil.utils.string.format(this.after, {
          i: i + 1 - offset
        });
        line = selectedLines[i];
        if (line === this.blockBefore || line === this.blockAfter) {
          continue;
        }
        if (line.startsWith(_before) && line.endsWith(_after)) {
          selectedLines[i] = line.substring(_before.length, line.length - _after.length);
        } else {
          selectedLines[i] = "" + _before + line + _after;
        }
      }
      if (this.blockBefore !== void 0) {
        if (selectedLines[0] === this.blockBefore) {
          selectedLines.shift();
        } else {
          selectedLines.unshift(this.blockBefore);
        }
      }
      if (this.blockAfter !== void 0) {
        if (selectedLines[selectedLines.length - 1] === this.blockAfter) {
          selectedLines.pop();
        } else {
          selectedLines.push(this.blockAfter);
        }
      }
      replace = selectedLines.join('\n');
      return this.editor().replaceSelected(replace, true);
    };
    return MultilineMarkupButton;
  })();
  exports.LinkMarkupButton = LinkMarkupButton = (function() {
    __extends(LinkMarkupButton, MarkupButtonBase);
    function LinkMarkupButton(jencil, args) {
      this.formatstr = args[0];
      LinkMarkupButton.__super__.constructor.call(this, jencil, 'link', 'Link');
    }
    LinkMarkupButton.prototype.click = function() {
      var href, insert, label, title;
      href = prompt("Please input link url");
      if (href === null) {
        return;
      }
      label = prompt("Please input link label", this.editor().getSelected());
      if (label === null) {
        return;
      }
      title = prompt("(Optional) Please input link title");
      if (title === null) {
        return;
      }
      insert = Jencil.utils.string.format(this.formatstr, {
        href: href,
        label: label,
        title: title
      });
      return this.editor().replaceSelected(insert);
    };
    return LinkMarkupButton;
  })();
  return exports.ImageMarkupButton = ImageMarkupButton = (function() {
    __extends(ImageMarkupButton, MarkupButtonBase);
    function ImageMarkupButton(jencil, args) {
      this.formatstr = args[0];
      ImageMarkupButton.__super__.constructor.call(this, jencil, 'image', 'Image');
    }
    ImageMarkupButton.prototype.click = function() {
      var alt, insert, src, title;
      src = prompt("Please input image src url");
      if (src === null) {
        return;
      }
      alt = prompt("(Optional) Please input image alt label", this.editor().getSelected());
      if (alt === null) {
        return;
      }
      title = prompt("(Optional) Please input image title");
      if (title === null) {
        return;
      }
      insert = Jencil.utils.string.format(this.formatstr, {
        src: src,
        alt: alt,
        title: title
      });
      return this.editor().replaceSelected(insert);
    };
    return ImageMarkupButton;
  })();
});