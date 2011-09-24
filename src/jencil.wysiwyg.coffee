namespace 'Jencil.widgets', (exports) ->
  Widget = Jencil.widgets.Widget
  Editor = Jencil.widgets.Editor
  # What You See Is What You Get (Rich text)
  exports.Wysiwyg = class Wysiwyg extends Editor
    constructor: (jencil) ->
      super jencil, 'jencil-wysiwyg-editor', 'div'




