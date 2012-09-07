class H1Button extends EditorMarkupButton
  constructor: (core) -> super core, 'h1', 'H1'
class H2Button extends EditorMarkupButton
  constructor: (core) -> super core, 'h2', 'H2'
class H3Button extends EditorMarkupButton
  constructor: (core) -> super core, 'h3', 'H3'
class H4Button extends EditorMarkupButton
  constructor: (core) -> super core, 'h4', 'H4'
class H5Button extends EditorMarkupButton
  constructor: (core) -> super core, 'h5', 'H5'
class H6Button extends EditorMarkupButton
  constructor: (core) -> super core, 'h6', 'H6'
class BoldButton extends EditorMarkupButton
  constructor: (core) -> super core, 'bold', 'Bold', "Ctrl+B"
class ItalicButton extends EditorMarkupButton
  constructor: (core) -> super core, 'italic', 'Italic', "Ctrl+I"
class UnderlineButton extends EditorMarkupButton
  constructor: (core) -> super core, 'underline', 'Underline', "Ctrl+U"
class StrikeButton extends EditorMarkupButton
  constructor: (core) -> super core, 'strike', 'Strikeout'
class SuperscriptButton extends EditorMarkupButton
  constructor: (core) -> super core, 'superscript', 'Superscript'
class SubscriptButton extends EditorMarkupButton
  constructor: (core) -> super core, 'subscript', 'Subscript'
class AnchorButton extends EditorMarkupButton
  constructor: (core) -> super core, 'anchor', 'Anchor link'
class ImageButton extends EditorMarkupButton
  constructor: (core) -> super core, 'image', 'Image'
class UnorderedListButton extends EditorMarkupButton
  constructor: (core) -> super core, 'unorderedList', 'Unordered list'
class OrderedListButton extends EditorMarkupButton
  constructor: (core) -> super core, 'orderedList', 'Ordered list'
class IndentButton extends EditorMarkupButton
  constructor: (core) -> super core, 'indent', 'Indent'
class OutdentButton extends EditorMarkupButton
  constructor: (core) -> super core, 'outdent', 'Outdent'
class AlignLeftButton extends EditorMarkupButton
  constructor: (core) -> super core, 'alignLeft', 'Align left'
class AlignCenterButton extends EditorMarkupButton
  constructor: (core) -> super core, 'alignCenter', 'Align center'
class AlignRightButton extends EditorMarkupButton
  constructor: (core) -> super core, 'alignRight', 'Align right'
class AlignJustifyButton extends EditorMarkupButton
  constructor: (core) -> super core, 'alignJustify', 'Justify'
