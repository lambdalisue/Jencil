var GithubFlavorMarkdownViewer, MarkdownEditor, MarkdownHelper, MarkdownProfile, MarkdownViewer,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MarkdownViewer = (function(_super) {

  __extends(MarkdownViewer, _super);

  function MarkdownViewer(core) {
    var config;
    config = {
      type: 'POST',
      dataType: 'text',
      data: function(value) {
        return {
          text: value,
          mode: 'markdown'
        };
      },
      url: 'https://api.github.com/markdown'
    };
    MarkdownViewer.__super__.constructor.call(this, core, config);
  }

  return MarkdownViewer;

})(AjaxViewer);

GithubFlavorMarkdownViewer = (function(_super) {

  __extends(GithubFlavorMarkdownViewer, _super);

  function GithubFlavorMarkdownViewer(core) {
    var config;
    config = {
      type: 'POST',
      dataType: 'text',
      data: function(value) {
        return {
          text: value,
          mode: 'gfm'
        };
      },
      url: 'https://api.github.com/markdown'
    };
    GithubFlavorMarkdownViewer.__super__.constructor.call(this, core, config);
  }

  return GithubFlavorMarkdownViewer;

})(AjaxViewer);

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
    return this.enclose("**", "**");
  };

  MarkdownEditor.prototype.italic = function() {
    return this.enclose("*", "*");
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

  return MarkdownEditor;

})(HtmlEditor);

MarkdownHelper = (function(_super) {

  __extends(MarkdownHelper, _super);

  function MarkdownHelper(core) {
    MarkdownHelper.__super__.constructor.call(this, core);
    this.element.addClass('helper');
  }

  return MarkdownHelper;

})(Jencil.ui.widgets.panels.Panel);

MarkdownProfile = (function(_super) {

  __extends(MarkdownProfile, _super);

  function MarkdownProfile() {
    this.mainPanelClass = Jencil.ui.widgets.panels.TrimainPanel;
    this.editorClass = MarkdownEditor;
    this.viewerClass = MarkdownViewer;
    this.helperClass = MarkdownHelper;
    this.defaultVolume = 1;
    this.defaultVolume2 = 1;
    this.toolbarButtons = ['Undo', 'Redo', 'Separator', ['h1', 'H1'], ['h2', 'H2'], ['h3', 'H3'], ['h4', 'H4'], ['h5', 'H5'], ['h6', 'H6'], 'Separator', ['bold', 'Bold', 'Ctrl+B'], ['italic', 'Italic', 'Ctrl+I'], 'Separator', ['anchor', 'Anchor link'], ['image', 'Image'], ['unorderedList', 'Unordered list'], ['orderedList', 'Ordered list'], 'Separator', 'Fullscreen'];
    this.statusbarButtons = ['Viewer', 'Helper'];
  }

  return MarkdownProfile;

})(Jencil.profiles.Profile);

Jencil.utils.namespace('Jencil.filetypes.markdown', function(exports) {
  exports.MarkdownEditor = MarkdownEditor;
  exports.MarkdownViewer = MarkdownViewer;
  return exports.MarkdownProfile = MarkdownProfile;
});
