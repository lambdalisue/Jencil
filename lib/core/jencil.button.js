/*
Jencil button

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Required:
- Jencil.widget (jencil.widget.js)

Dependencies:
- Jencil.utils.detector (jencil.utils.js)
*/
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
namespace('Jencil.button', function(exports) {
  var ButtonBase, ExecButton, MarkupButtonBase, PreviewButton, Separator, Widget;
  Widget = Jencil.widget.Widget;
  exports.createButton = function(jencil, type, args) {
    var cls;
    cls = void 0;
    switch (type) {
      case '-':
      case 'separator':
        cls = Jencil.button.Separator;
        break;
      case '+':
      case 'exec':
        cls = Jencil.button.ExecButton;
        break;
      case 'preview':
        cls = Jencil.button.PreviewButton;
        break;
      default:
        cls = Jencil.button[type];
        if (!(cls != null)) {
          throw new Error("Unknown button type is passed (type: " + type + ")");
        }
    }
    return new cls(jencil, args);
  };
  exports.ButtonBase = ButtonBase = (function() {
    __extends(ButtonBase, Widget);
    function ButtonBase(jencil, cls, name) {
      ButtonBase.__super__.constructor.call(this, jencil, 'button', 'a');
      this.$element.addClass(cls);
      this.$element.attr('title', name);
      this.$element.css('cursor', 'pointer');
      if (Jencil.utils.detector.browser === 'Explorer' && Jencil.utils.detector.version < 8) {
        this.$element.attr('href', 'javascript:void(0);');
      }
      this.$element.append($("<span>" + name + "</span>"));
      this.$element.click(__bind(function() {
        this.clickBefore();
        this.click();
        return this.clickAfter();
      }, this));
    }
    ButtonBase.prototype.editor = function() {
      return this.jencil.workspace.editor;
    };
    ButtonBase.prototype.clickBefore = function() {};
    ButtonBase.prototype.click = function() {};
    ButtonBase.prototype.clickAfter = function() {};
    return ButtonBase;
  })();
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
  exports.Separator = Separator = (function() {
    __extends(Separator, Widget);
    function Separator(jencil, args) {
      Separator.__super__.constructor.call(this, jencil, 'separator', 'span');
      this.$element.append($('<span>|</span>'));
    }
    return Separator;
  })();
  exports.ExecButton = ExecButton = (function() {
    __extends(ExecButton, ButtonBase);
    function ExecButton(jencil, args) {
      var cls, name;
      cls = args[0], name = args[1], this._click = args[2], this._clickBefore = args[3], this._clickAfter = args[4];
      ExecButton.__super__.constructor.call(this, jencil, cls, name);
    }
    ExecButton.prototype.clickBefore = function() {
      return this._clickBefore(this.editor());
    };
    ExecButton.prototype.click = function() {
      return this._click(this.editor());
    };
    ExecButton.prototype.clickAfter = function() {
      return this._clickAfter(this.editor());
    };
    return ExecButton;
  })();
  return exports.PreviewButton = PreviewButton = (function() {
    __extends(PreviewButton, ButtonBase);
    function PreviewButton(jencil, args) {
      PreviewButton.__super__.constructor.call(this, jencil, 'preview', 'Preview');
    }
    PreviewButton.prototype.click = function() {
      var editor, _ref;
      editor = this.editor();
      if ((_ref = editor.preview) != null) {
        _ref.toggle();
      }
      return editor.relocate();
    };
    return PreviewButton;
  })();
});