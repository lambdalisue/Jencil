/*
Jencil core

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Dependencies:
- Jencil.options (jencil.options.js)
- Jencil.utils.path (jencil.utils.js)
- Jencil.theme (jencil.theme.js)
*/
var $;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
if (!(String.prototype.startsWith != null)) {
  String.prototype.startsWith = function(str) {
    return this.lastIndexOf(str, 0) === 0;
  };
}
if (!(String.prototype.endsWith != null)) {
  String.prototype.endsWith = function(suffix) {
    var offset;
    offset = this.length - suffix.length;
    return offset >= 0 && this.lastIndexOf(suffix, offset) === offset;
  };
}
if (!(String.prototype.replaceAll != null)) {
  String.prototype.replaceAll = function(search, replace) {
    return this.split(search).join(replace);
  };
}
if (!(String.prototype.trim != null)) {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  };
}
$ = jQuery;
$.fn.jencil = function(options) {
  options = $.extend(true, Jencil.options["default"], options);
  if (this.length > 1 && (options.documentTypeElement != null)) {
    logger.warn('documentTypeElement is not avaialble on multiple textarea');
    options.documentTypeElement = void 0;
  }
  Jencil.utils.path.init(options);
  Jencil.theme.init(options);
  if (!(Jencil.jencils != null)) {
    Jencil.jencils = [];
  }
  return this.each(function() {
    return Jencil.jencils.push(new Jencil.core.JencilCore($(this), options));
  });
};
namespace('Jencil.core', function(exports) {
  var JencilCore;
  return exports.JencilCore = JencilCore = (function() {
    function JencilCore($textarea, options) {
      this.$textarea = $textarea;
      this.options = options;
      this.profile = void 0;
      this.wrapper = new Jencil.widget.Wrapper(this);
      this.buttonHolder = new Jencil.widget.ButtonHolder(this);
      this.documentType = new Jencil.widget.DocumentType(this);
      this.toolbar = new Jencil.widget.Toolbar(this);
      this.toolbar.append(this.buttonHolder);
      this.toolbar.append(this.documentType);
      this.wrapper.append(this.toolbar);
      this.workspace = new Jencil.widget.Workspace(this);
      this.wrapper.append(this.workspace);
      this.$textarea.after(this.wrapper.$element);
      this.$textarea.hide();
      Jencil.profile.load(this, this.getProfileName());
    }
    JencilCore.prototype.update = function() {
      return this.workspace.use(this.profile.editor, __bind(function() {
        this.buttonHolder.update();
        return this.workspace.editor.update();
      }, this));
    };
    JencilCore.prototype.getProfileName = function() {
      return this.documentType.getProfileName();
    };
    JencilCore.prototype.getSourceValue = function() {
      return this.$textarea.val();
    };
    JencilCore.prototype.setSourceValue = function(value) {
      return this.$textarea.val(value);
    };
    return JencilCore;
  })();
});