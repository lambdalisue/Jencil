var HtmlEditor, autoIndentableHtml, headerMarkup,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

autoIndentableHtml = (function() {
  var PATTERNS, post, pre, x;
  PATTERNS = (function() {
    var _i, _len, _ref, _results;
    _ref = ['p', 'li'];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      x = _ref[_i];
      _results.push([x, new RegExp("^[\s\t]*<" + x + ">"), new RegExp("</" + x + ">[\s\t]*$")]);
    }
    return _results;
  })();
  pre = function(e, line) {
    var lineCaret, pattern, _i, _len;
    if (e.shiftKey) {
      return;
    }
    for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {
      pattern = PATTERNS[_i];
      if (pattern[1].test(line) || pattern[2].test(line)) {
        lineCaret = this.selection._getLineCaret();
        this.selection.caret(lineCaret[1]);
        return;
      }
    }
  };
  post = function(e, line, indent, insert) {
    var pattern, _i, _len;
    if (e.shiftKey) {
      return;
    }
    for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {
      pattern = PATTERNS[_i];
      if (pattern[2].test(line)) {
        x = pattern[0];
        this.selection.insertAfter("<" + x + "></" + x + ">", false);
        this.selection.caretOffset(-(3 + x.length));
        return;
      }
    }
  };
  return function(textarea) {
    if (!(textarea.autoIndent != null)) {
      textarea = autoIndentable(textarea);
    }
    textarea.autoIndent.pre = function(e, line) {
      return pre.call(textarea, e, line);
    };
    textarea.autoIndent.post = function(e, line, indent, insert) {
      return post.call(textarea, e, line, indent, insert);
    };
    return textarea;
  };
})();

headerMarkup = (function() {
  var PATTERN;
  PATTERN = new RegExp("^<h([1-6])>(.*)</h[1-6]>\n?$");
  return function(n) {
    var caret, replacement, text;
    caret = this.textarea.selection.caret();
    if (caret[0] === caret[1]) {
      this.textarea.selection.selectWholeCurrentLine();
    }
    text = this.selection();
    if (PATTERN.test(text)) {
      if (RegExp.$1 === n.toString()) {
        replacement = RegExp.$2;
      } else {
        replacement = "<h" + n + ">" + RegExp.$2 + "</h" + n + ">";
      }
      return this.selection(replacement);
    } else {
      return this.enclose("<h" + n + ">", "</h" + n + ">\n");
    }
  };
})();

HtmlEditor = (function(_super) {

  __extends(HtmlEditor, _super);

  function HtmlEditor(core) {
    HtmlEditor.__super__.constructor.call(this, core);
    this.textarea = autoIndentableHtml(this.textarea);
  }

  HtmlEditor.prototype.h1 = function() {
    return headerMarkup.call(this, 1);
  };

  HtmlEditor.prototype.h2 = function() {
    return headerMarkup.call(this, 2);
  };

  HtmlEditor.prototype.h3 = function() {
    return headerMarkup.call(this, 3);
  };

  HtmlEditor.prototype.h4 = function() {
    return headerMarkup.call(this, 4);
  };

  HtmlEditor.prototype.h5 = function() {
    return headerMarkup.call(this, 5);
  };

  HtmlEditor.prototype.h6 = function() {
    return headerMarkup.call(this, 6);
  };

  HtmlEditor.prototype.bold = function() {
    return this.enclose("<b>", "</b>");
  };

  HtmlEditor.prototype.italic = function() {
    return this.enclose("<i>", "</i>");
  };

  HtmlEditor.prototype.underline = function() {
    return this.enclose("<u>", "</u>");
  };

  HtmlEditor.prototype.strike = function() {
    return this.enclose("<s>", "</s>");
  };

  HtmlEditor.prototype.superscript = function() {
    return this.enclose("<sup>", "</sup>");
  };

  HtmlEditor.prototype.subscript = function() {
    return this.enclose("<sub>", "</sub>");
  };

  HtmlEditor.prototype.quote = function() {
    return this.enclose("<q>", "</q>");
  };

  HtmlEditor.prototype.blockquote = function() {
    return this.enclose("\n<blockquote>", "</blockquote>\n");
  };

  HtmlEditor.prototype.code = function() {
    return this.enclose("<code>", "</code>");
  };

  HtmlEditor.prototype.pre = function() {
    return this.enclose("<pre>", "</pre>");
  };

  HtmlEditor.prototype.anchorLink = function() {
    var href, text;
    text = this.selection();
    if (!text) {
      text = window.prompt("Please input a link text", "Here");
    }
    href = window.prompt("Please input a link url", "http://");
    if (!(href != null)) {
      return;
    }
    return this.selection("<a href='" + href + "'>" + text + "</a>");
  };

  HtmlEditor.prototype.image = function() {
    var alt, src;
    src = window.prompt("Please input a image url", "http://");
    alt = window.prompt("(Optional) Please input a alt message", "Image");
    if (!(src != null)) {
      return;
    }
    return this.selection("<img src='" + src + "' alt='" + alt + "'>");
  };

  HtmlEditor.prototype.unorderedList = function() {
    var text, x;
    text = this.selection();
    text = (function() {
      var _i, _len, _ref, _results;
      _ref = text.split("\n");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        _results.push("  <li>" + x + "</li>");
      }
      return _results;
    })();
    text.unshift("<ul>");
    text.push("</ul>");
    return this.selection(text.join("\n"));
  };

  HtmlEditor.prototype.orderedList = function() {
    var text, x;
    text = this.selection();
    text = (function() {
      var _i, _len, _ref, _results;
      _ref = text.split("\n");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        _results.push("  <li>" + x + "</li>");
      }
      return _results;
    })();
    text.unshift("<ol>");
    text.push("</ol>");
    return this.selection(text.join("\n"));
  };

  return HtmlEditor;

})(TextEditor);
