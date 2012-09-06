var Profile;

Profile = (function() {

  function Profile() {}

  Profile.prototype.buttonClasses = [H1Button, H2Button, H3Button, H4Button, H5Button, H6Button, Separator, UndoButton, RedoButton, Separator, BoldButton, ItalicButton, UnderlineButton, StrikeButton, SuperscriptButton, SubscriptButton, Separator, AnchorButton, ImageButton, Separator, UnorderedListButton, OrderedListButton, Separator, IndentButton, OutdentButton, Separator, AlignLeftButton, AlignCenterButton, AlignRightButton, AlignJustifyButton, Separator, FullscreenButton, PreviewButton];

  Profile.prototype.getEditorClass = function() {
    return this.editorClass;
  };

  Profile.prototype.getViewerClass = function() {
    return this.viewerClass;
  };

  Profile.prototype.getButtonClasses = function() {
    return this.buttonClasses;
  };

  return Profile;

})();
