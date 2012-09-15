var HtmlProfile, MarkdownProfile,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

HtmlProfile = (function(_super) {

  __extends(HtmlProfile, _super);

  function HtmlProfile() {
    this.mainPanelClass = Mojito;
    this.editorClass = HtmlEditor;
    this.viewerClass = HtmlViewer;
    this.toolbarButtons = [UndoButton, RedoButton, Separator, ['h1', 'H1'], ['h2', 'H2'], ['h3', 'H3'], ['h4', 'H4'], ['h5', 'H5'], ['h6', 'H6'], Separator, ['bold', 'Bold', 'Ctrl+B'], ['italic', 'Italic', 'Ctrl+I'], ['underline', 'Underline', 'Ctrl+U'], ['strike', 'Strikeout'], ['superscript', 'Superscript'], ['subscript', 'Subscript'], Separator, ['anchor', 'Anchor link'], ['image', 'Image'], ['unorderedList', 'Unordered list'], ['orderedList', 'Ordered list'], ['indent', 'Indent'], ['outdent', 'Outdent'], Separator, FullscreenButton, ViewerButton];
    this.statusbarButtons = [UndoButton, RedoButton, Separator, FullscreenButton];
  }

  return HtmlProfile;

})(Profile);

MarkdownProfile = (function(_super) {

  __extends(MarkdownProfile, _super);

  function MarkdownProfile() {
    MarkdownProfile.__super__.constructor.apply(this, arguments);
    this.editorClass = MarkdownEditor;
    this.viewerClass = MarkdownViewer;
  }

  return MarkdownProfile;

})(HtmlProfile);
