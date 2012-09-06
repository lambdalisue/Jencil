var MarkdownEditor,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MarkdownEditor = (function(_super) {

  __extends(MarkdownEditor, _super);

  function MarkdownEditor() {
    return MarkdownEditor.__super__.constructor.apply(this, arguments);
  }

  MarkdownEditor.prototype.h1 = function() {
    return this.insertBefore("# ");
  };

  MarkdownEditor.prototype.h2 = function() {
    return this.insertBefore("## ");
  };

  MarkdownEditor.prototype.h3 = function() {
    return this.insertBefore("### ");
  };

  MarkdownEditor.prototype.h4 = function() {
    return this.insertBefore("#### ");
  };

  MarkdownEditor.prototype.h5 = function() {
    return this.insertBefore("##### ");
  };

  MarkdownEditor.prototype.h6 = function() {
    return this.insertBefore("###### ");
  };

  MarkdownEditor.prototype.bold = function() {
    return this.wrap("**", "**");
  };

  MarkdownEditor.prototype.italic = function() {
    return this.wrap("*", "*");
  };

  MarkdownEditor.prototype.anchor = function() {
    var href, text;
    text = this.selection();
    if (!text) {
      text = window.prompt("Please input a link text", "Here");
    }
    href = window.prompt("Please input a link url", "http://");
    return this.selection("[" + text + "](" + href + ")");
  };

  MarkdownEditor.prototype.image = function() {
    var alt, src;
    src = window.prompt("Please input a image url", "http://");
    alt = window.prompt("(Optional) Please input a alt message", "Image");
    return this.selection("![" + alt + "](" + src + ")");
  };

  MarkdownEditor.prototype.unorderedList = function() {
    var text, x;
    text = this.selection();
    text = (function() {
      var _i, _len, _ref, _results;
      _ref = text.split("\n");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        _results.push("-   " + x);
      }
      return _results;
    })();
    text.unshift("");
    text.push("");
    return this.selection(text.join("\n"));
  };

  MarkdownEditor.prototype.orderedList = function() {
    var i, text, x;
    text = this.selection();
    text = (function() {
      var _i, _len, _ref, _results;
      _ref = text.split("\n");
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        x = _ref[i];
        _results.push("" + i + ". " + x);
      }
      return _results;
    })();
    text.unshift("");
    text.push("");
    return this.selection(text.join("\n"));
  };

  MarkdownEditor.prototype.indent = function() {
    var text, x;
    text = this.selection();
    text = (function() {
      var _i, _len, _ref, _results;
      _ref = text.split("\n");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        _results.push("  " + x);
      }
      return _results;
    })();
    text.unshift("");
    text.push("");
    return this.selection(text.join("\n"));
  };

  return MarkdownEditor;

})(HtmlEditor);
