/*
Jencil filetype for HTML
*/

var HtmlEditor, HtmlProfile, HtmlViewer,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

HtmlEditor = (function(_super) {

  __extends(HtmlEditor, _super);

  function HtmlEditor() {
    return HtmlEditor.__super__.constructor.apply(this, arguments);
  }

  HtmlEditor.prototype.h1 = function() {
    return this.wrap("<h1>", "</h1>");
  };

  HtmlEditor.prototype.h2 = function() {
    return this.wrap("<h2>", "</h2>");
  };

  HtmlEditor.prototype.h3 = function() {
    return this.wrap("<h3>", "</h3>");
  };

  HtmlEditor.prototype.h4 = function() {
    return this.wrap("<h4>", "</h4>");
  };

  HtmlEditor.prototype.h5 = function() {
    return this.wrap("<h5>", "</h5>");
  };

  HtmlEditor.prototype.h6 = function() {
    return this.wrap("<h6>", "</h6>");
  };

  HtmlEditor.prototype.bold = function() {
    return this.wrap("<b>", "</b>");
  };

  HtmlEditor.prototype.italic = function() {
    return this.wrap("<i>", "</i>");
  };

  HtmlEditor.prototype.underline = function() {
    return this.wrap("<u>", "</u>");
  };

  HtmlEditor.prototype.strike = function() {
    return this.wrap("<s>", "</s>");
  };

  HtmlEditor.prototype.superscript = function() {
    return this.wrap("<sup>", "</sup>");
  };

  HtmlEditor.prototype.subscript = function() {
    return this.wrap("<sub>", "</sub>");
  };

  HtmlEditor.prototype.anchor = function() {
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

  HtmlEditor.prototype.indent = function() {
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
    text.unshift("<div style='margin-left: 4em'>");
    text.push("</div>");
    return this.selection(text.join("\n"));
  };

  HtmlEditor.prototype.outdent = function() {
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
    text.unshift("<div style='margin-left: -4em'>");
    text.push("</div>");
    return this.selection(text.join("\n"));
  };

  return HtmlEditor;

})(Jencil.ui.widgets.editors.TextEditor);

HtmlViewer = Jencil.ui.widgets.viewers.TemplateViewer;

HtmlProfile = (function(_super) {

  __extends(HtmlProfile, _super);

  function HtmlProfile() {
    this.mainPanelClass = Jencil.ui.widgets.panels.DimainPanel;
    this.editorClass = HtmlEditor;
    this.viewerClass = HtmlViewer;
    this.helperClass = Jencil.ui.widgets.panels.Panel;
    this.toolbarButtons = ['Undo', 'Redo', 'Separator', ['h1', 'H1'], ['h2', 'H2'], ['h3', 'H3'], ['h4', 'H4'], ['h5', 'H5'], ['h6', 'H6'], 'Separator', ['bold', 'Bold', 'Ctrl+B'], ['italic', 'Italic', 'Ctrl+I'], ['underline', 'Underline', 'Ctrl+U'], ['strike', 'Strikeout'], ['superscript', 'Superscript'], ['subscript', 'Subscript'], 'Separator', ['anchor', 'Anchor link'], ['image', 'Image'], ['unorderedList', 'Unordered list'], ['orderedList', 'Ordered list'], ['indent', 'Indent'], ['outdent', 'Outdent'], 'Separator', 'Fullscreen'];
    this.statusbarButtons = ['Viewer', 'Helper'];
  }

  return HtmlProfile;

})(Jencil.profiles.Profile);

Jencil.utils.namespace('Jencil.filetypes.html', function(exports) {
  exports.HtmlEditor = HtmlEditor;
  exports.HtmlViewer = HtmlViewer;
  return exports.HtmlProfile = HtmlProfile;
});
