namespace 'Jencil.widgets', (exports) ->
  Widget = Jencil.widgets.Widget
  Editor = Jencil.widgets.Editor
  # What You See Is What You Get (Rich text)
  exports.RichEditor = class RichEditor extends Editor
    constructor: (jencil) ->
      super jencil, 'jencil-rich-editor', 'div'




