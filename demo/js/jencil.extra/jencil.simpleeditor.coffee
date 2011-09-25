###
Jencil SimpleEditor

This editor is tutorial editor of Jencil
###
class Initializer extends Jencil.editors.Initializer
  stylesheets: [
    ['js/jencil.extra/jencil.simpleeditor.css']
  ]
namespace 'Jencil.editors', (exports) ->
  EditorBase = Jencil.editors.EditorBase
  exports.SimpleEditor = class SimpleEditor extends EditorBase
    @Initializer: Initializer
    constructor: (jencil) ->
      super jencil, 'jencil-simple-editor', 'textarea'
      # Copy value from source textarea
      @$source = @jencil.$textarea
      @$element.val @$source.val()
      # Bind events to update source textarea
      @$element.bind 'keyup change click blur enter', =>
        @update()
      # Add textarea controller
      @controller = new Textarea @$element
    update: ->
      # Update source textarea
      @$source.val @$element.val()
    getValue: ->
      return @controller.getValue()
    getSelection: ->
      return @controller.getSelection()
    setSelection: (start, end) ->
      @controller.setSelection start, end
    getSelected: ->
      return @controller.getSelected()
    replaceSelected: (str, select=false) ->
      @controller.replaceSelected str, select
    insertBeforeSelected: (str, select=false) ->
      @controller.insertBeforeSelected str, select
    insertAfterSelected: (str, select=false) ->
      @controller.insertAfterSelected str, select
    wrapSelected: (before, after, select=false, additional=undefined) ->
      @controller.wrapSelected before, after, select, additional
