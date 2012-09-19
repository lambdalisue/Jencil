var HtmlProfile,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

HtmlProfile = (function(_super) {

  __extends(HtmlProfile, _super);

  function HtmlProfile(options) {
    this.mainPanelClass = Jencil.ui.widgets.panels.TrimainPanel;
    this.editorClass = HtmlEditor;
    this.viewerClass = HtmlViewer;
    this.helperClass = HtmlHelper;
    this.defaultVolume = options.defaultVolume || 1;
    this.defaultVolume2 = options.defaultVolume2 || 1;
    this.toolbarButtons = ['Undo', 'Redo', 'Separator', ['h1', 'H1'], ['h2', 'H2'], ['h3', 'H3'], ['h4', 'H4'], ['h5', 'H5'], ['h6', 'H6'], 'Separator', ['bold', 'Bold', 'Ctrl+B'], ['italic', 'Italic', 'Ctrl+I'], ['underline', 'Underline', 'Ctrl+U'], ['strike', 'Strikeout'], ['superscript', 'Superscript'], ['subscript', 'Subscript'], 'Separator', ['anchorLink', 'Anchor link'], ['image', 'Image'], ['unorderedList', 'Unordered list'], ['orderedList', 'Ordered list'], ['quote', 'Quote'], ['blockquote', 'Blockquote'], ['code', 'Code'], ['pre', 'Pre'], 'Separator', 'Fullscreen'];
    this.statusbarButtons = ['Viewer', 'Helper'];
  }

  return HtmlProfile;

})(Jencil.profiles.Profile);

Jencil.utils.namespace('Jencil.profiles', function(exports) {
  return exports.HtmlProfile = HtmlProfile;
});
