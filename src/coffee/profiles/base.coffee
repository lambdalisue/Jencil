class Profile
  buttonClasses: [
    H1Button,
    H2Button,
    H3Button,
    H4Button,
    H5Button,
    H6Button,
    Separator,
    UndoButton,
    RedoButton,
    Separator,
    BoldButton,
    ItalicButton,
    UnderlineButton,
    StrikeButton,
    SuperscriptButton,
    SubscriptButton,
    Separator,
    AnchorButton,
    ImageButton,
    Separator,
    UnorderedListButton,
    OrderedListButton,
    Separator,
    IndentButton,
    OutdentButton,
    Separator,
    AlignLeftButton,
    AlignCenterButton,
    AlignRightButton,
    AlignJustifyButton,
    Separator,
    FullscreenButton,
    PreviewButton,
  ]

  getEditorClass: ->
    return @editorClass

  getViewerClass: ->
    return @viewerClass

  getButtonClasses: ->
    return @buttonClasses

  @factory: (name) ->
    switch name
      when 'html' then return HtmlProfile
      when 'markdown' then return MarkdownProfile
      else return HtmlProfile

