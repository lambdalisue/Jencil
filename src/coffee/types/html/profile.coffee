class HtmlProfile extends Jencil.profiles.Profile
  constructor: (options) ->
    @mainPanelClass = Jencil.ui.widgets.panels.TrimainPanel
    @editorClass = HtmlEditor
    @viewerClass = HtmlViewer
    @helperClass = HtmlHelper
    @defaultVolume = options.defaultVolume or 1
    @defaultVolume2 = options.defaultVolume2 or 1

    @toolbarButtons = [
      'Undo', 'Redo', 'Separator',
      ['h1', 'H1'],
      ['h2', 'H2'],
      ['h3', 'H3'],
      ['h4', 'H4'],
      ['h5', 'H5'],
      ['h6', 'H6'],
      'Separator',
      ['bold', 'Bold', 'Ctrl+B'],
      ['italic', 'Italic', 'Ctrl+I'],
      ['underline', 'Underline', 'Ctrl+U'],
      ['strike', 'Strikeout'],
      ['superscript', 'Superscript'],
      ['subscript', 'Subscript'],
      'Separator',
      ['anchorLink', 'Anchor link'],
      ['image', 'Image'],
      ['unorderedList', 'Unordered list'],
      ['orderedList', 'Ordered list'],
      ['quote', 'Quote'],
      ['blockquote', 'Blockquote'],
      ['code', 'Code'],
      ['pre', 'Pre'],
      'Separator',
      'Fullscreen',
    ]

    @statusbarButtons = [
      'Viewer',
      'Helper',
    ]

Jencil.utils.namespace 'Jencil.profiles', (exports) ->
  exports.HtmlProfile = HtmlProfile
