class H1Button extends EditorMarkupButton
  constructor: (core) -> super core, 'h1'
class H2Button extends EditorMarkupButton
  constructor: (core) -> super core, 'h2'
class H3Button extends EditorMarkupButton
  constructor: (core) -> super core, 'h3'
class H4Button extends EditorMarkupButton
  constructor: (core) -> super core, 'h4'
class H5Button extends EditorMarkupButton
  constructor: (core) -> super core, 'h5'
class H6Button extends EditorMarkupButton
  constructor: (core) -> super core, 'h6'
class BoldButton extends EditorMarkupButton
  constructor: (core) -> super core, 'bold', "Ctrl+B"
class ItalicButton extends EditorMarkupButton
  constructor: (core) -> super core, 'italic', "Ctrl+I"
class UnderlineButton extends EditorMarkupButton
  constructor: (core) -> super core, 'underline', "Ctrl+U"
class StrikeButton extends EditorMarkupButton
  constructor: (core) -> super core, 'strike'
class SuperscriptButton extends EditorMarkupButton
  constructor: (core) -> super core, 'superscript'
class SubscriptButton extends EditorMarkupButton
  constructor: (core) -> super core, 'subscript'
class AnchorButton extends EditorMarkupButton
  constructor: (core) -> super core, 'anchor'
class ImageButton extends EditorMarkupButton
  constructor: (core) -> super core, 'image'
class UnorderedListButton extends EditorMarkupButton
  constructor: (core) -> super core, 'unorderedList'
class OrderedListButton extends EditorMarkupButton
  constructor: (core) -> super core, 'orderedList'
class IndentButton extends EditorMarkupButton
  constructor: (core) -> super core, 'indent'
class OutdentButton extends EditorMarkupButton
  constructor: (core) -> super core, 'outdent'
class AlignLeftButton extends EditorMarkupButton
  constructor: (core) -> super core, 'alignLeft'
class AlignCenterButton extends EditorMarkupButton
  constructor: (core) -> super core, 'alignCenter'
class AlignRightButton extends EditorMarkupButton
  constructor: (core) -> super core, 'alignRight'
class AlignJustifyButton extends EditorMarkupButton
  constructor: (core) -> super core, 'alignJustify'
