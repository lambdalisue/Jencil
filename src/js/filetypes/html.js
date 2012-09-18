var HtmlEditor, HtmlHelper, HtmlProfile, HtmlViewer,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

HtmlEditor = (function(_super) {

  __extends(HtmlEditor, _super);

  function HtmlEditor(core) {
    var singleLineTags, x,
      _this = this;
    HtmlEditor.__super__.constructor.call(this, core);
    singleLineTags = (function() {
      var _i, _len, _ref, _results;
      _ref = ['p', 'li'];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        _results.push(["<" + x + ">", "</" + x + ">", new RegExp("^\s*<" + x + ">"), new RegExp("</" + x + ">\s*$")]);
      }
      return _results;
    })();
    this.textarea.autoindent.preCallback = function(e, line) {
      var lineCaret, pattern, _i, _len;
      if (e.shiftKey) {
        return;
      }
      for (_i = 0, _len = singleLineTags.length; _i < _len; _i++) {
        pattern = singleLineTags[_i];
        if (pattern[3].test(line)) {
          lineCaret = _this.textarea.selection._getLineCaret();
          _this.textarea.selection.caret(lineCaret[1]);
          return;
        }
      }
    };
    this.textarea.autoindent.postCallback = function(e, line) {
      var pattern, _i, _len;
      if (e.shiftKey) {
        return;
      }
      for (_i = 0, _len = singleLineTags.length; _i < _len; _i++) {
        pattern = singleLineTags[_i];
        if (pattern[3].test(line)) {
          _this.textarea.selection.insertAfter("" + pattern[0] + pattern[1], false);
          _this.textarea.selection.caretOffset(-pattern[1].length);
          return;
        }
      }
    };
  }

  HtmlEditor._headerPattern = new RegExp("^<h([1-6])>(.*)</h[1-6]>\n?$");

  HtmlEditor.prototype._header = function(n) {
    var caret, replacement, text;
    caret = this.textarea.selection.caret();
    if (caret[0] === caret[1]) {
      this.textarea.selection.selectWholeCurrentLine();
    }
    text = this.selection();
    if (HtmlEditor._headerPattern.test(text)) {
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

  HtmlEditor.prototype.h1 = function() {
    return this._header(1);
  };

  HtmlEditor.prototype.h2 = function() {
    return this._header(2);
  };

  HtmlEditor.prototype.h3 = function() {
    return this._header(3);
  };

  HtmlEditor.prototype.h4 = function() {
    return this._header(4);
  };

  HtmlEditor.prototype.h5 = function() {
    return this._header(5);
  };

  HtmlEditor.prototype.h6 = function() {
    return this._header(6);
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

})(Jencil.ui.widgets.editors.TextEditor);

HtmlViewer = Jencil.ui.widgets.viewers.TemplateViewer;

HtmlHelper = (function(_super) {

  __extends(HtmlHelper, _super);

  function HtmlHelper(core) {
    HtmlHelper.__super__.constructor.call(this, core);
    this.element.addClass('helper');
  }

  return HtmlHelper;

})(Jencil.ui.widgets.panels.Panel);

HtmlProfile = (function(_super) {

  __extends(HtmlProfile, _super);

  function HtmlProfile() {
    this.mainPanelClass = Jencil.ui.widgets.panels.TrimainPanel;
    this.editorClass = HtmlEditor;
    this.viewerClass = HtmlViewer;
    this.helperClass = HtmlHelper;
    this.defaultVolume = 1;
    this.defaultVolume2 = 1;
    this.toolbarButtons = ['Undo', 'Redo', 'Separator', ['h1', 'H1'], ['h2', 'H2'], ['h3', 'H3'], ['h4', 'H4'], ['h5', 'H5'], ['h6', 'H6'], 'Separator', ['bold', 'Bold', 'Ctrl+B'], ['italic', 'Italic', 'Ctrl+I'], ['underline', 'Underline', 'Ctrl+U'], ['strike', 'Strikeout'], ['superscript', 'Superscript'], ['subscript', 'Subscript'], 'Separator', ['anchorLink', 'Anchor link'], ['image', 'Image'], ['unorderedList', 'Unordered list'], ['orderedList', 'Ordered list'], ['quote', 'Quote'], ['blockquote', 'Blockquote'], ['code', 'Code'], ['pre', 'Pre'], 'Separator', 'Fullscreen'];
    this.statusbarButtons = ['Viewer', 'Helper'];
  }

  return HtmlProfile;

})(Jencil.profiles.Profile);

Jencil.utils.namespace('Jencil.filetypes.html', function(exports) {
  exports.HtmlEditor = HtmlEditor;
  exports.HtmlViewer = HtmlViewer;
  return exports.HtmlProfile = HtmlProfile;
});
