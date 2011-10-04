/*
Jencil widget

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Dependencies:
- Jencil.profile (jencil.profile.js)
- Jencil.button (jencil.button.js)
- Jencil.editor (jencil.editor.js)
*/
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
namespace('Jencil.widget', function(exports) {
  var ButtonHolder, DocumentType, Toolbar, Widget, Workspace, Wrapper;
  exports.Widget = Widget = (function() {
    function Widget(jencil, cls, type) {
      this.jencil = jencil;
      this.cls = cls;
      if (type == null) {
        type = 'div';
      }
      this.$element = $("<" + type + ">").addClass(cls);
    }
    Widget.prototype.after = function(widget) {
      return this.$element.after(widget.$element);
    };
    Widget.prototype.append = function(widget) {
      return this.$element.append(widget.$element);
    };
    Widget.prototype.appendTo = function(widget) {
      return this.$element.appendTo(widget.$element);
    };
    Widget.prototype.before = function(widget) {
      return this.$element.before(widget.$element);
    };
    Widget.prototype.prepend = function(widget) {
      return this.$element.prepend(widget.$element);
    };
    Widget.prototype.prependTo = function(widget) {
      return this.$element.prependTo(widget.$element);
    };
    return Widget;
  })();
  exports.Wrapper = Wrapper = (function() {
    __extends(Wrapper, Widget);
    function Wrapper(jencil) {
      Wrapper.__super__.constructor.call(this, jencil, 'jencil');
    }
    return Wrapper;
  })();
  exports.DocumentType = DocumentType = (function() {
    __extends(DocumentType, Widget);
    function DocumentType(jencil) {
      DocumentType.__super__.constructor.call(this, jencil, 'jencil-document-type');
      this.$documentTypeElement = this.jencil.options.documentTypeElement;
      if (this.$documentTypeElement != null) {
        if (!(this.$documentTypeElement instanceof jQuery)) {
          this.$documentTypeElement = $(this.$documentTypeElement);
        }
        this.$element.append(this.$documentTypeElement);
        this.$documentTypeElement.change(__bind(function() {
          return Jencil.profile.load(this.jencil, this.getProfileName());
        }, this));
      }
    }
    DocumentType.prototype.getProfileName = function() {
      if (this.$documentTypeElement != null) {
        return this.$documentTypeElement.val();
      }
      return this.jencil.options.profile["default"];
    };
    return DocumentType;
  })();
  exports.ButtonHolder = ButtonHolder = (function() {
    __extends(ButtonHolder, Widget);
    function ButtonHolder(jencil) {
      ButtonHolder.__super__.constructor.call(this, jencil, 'jencil-button-holder');
    }
    ButtonHolder.prototype.update = function() {
      var args, button, buttonset, type, _i, _len, _ref, _results;
      this.$element.children().remove();
      _ref = this.jencil.profile.buttonsets;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        buttonset = _ref[_i];
        type = buttonset[0];
        args = buttonset.slice(1, (buttonset.length + 1) || 9e9);
        button = Jencil.button.createButton(this.jencil, type, args);
        _results.push(this.append(button));
      }
      return _results;
    };
    return ButtonHolder;
  })();
  exports.Toolbar = Toolbar = (function() {
    __extends(Toolbar, Widget);
    function Toolbar(jencil) {
      Toolbar.__super__.constructor.call(this, jencil, 'jencil-toolbar');
    }
    return Toolbar;
  })();
  return exports.Workspace = Workspace = (function() {
    __extends(Workspace, Widget);
    function Workspace(jencil) {
      Workspace.__super__.constructor.call(this, jencil, 'jencil-workspace');
      this.editor = null;
    }
    Workspace.prototype.use = function(name, callback) {
      return Jencil.editor.use(this.jencil, name, __bind(function() {
        return callback();
      }, this));
    };
    return Workspace;
  })();
});