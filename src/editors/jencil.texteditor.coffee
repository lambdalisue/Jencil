###
Jencil TextEditor

A simple Dualpane Markup Editor with PreviewPane

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Required:
- Jencil.widget (jencil.widget.js)
- Jencil.editor (jencil.editor.js)
- Jencil.editor.pane (jencil.editor.pane.js)
- Jencil.button (jencil.button.js)

Dependencies:
- Jencil.utils.detector (jencil.utils.js)
- Textarea (textarea.js)
###
namespace 'Jencil.editor.pane', (exports) ->
  EditorPane = Jencil.editor.pane.EditorPane
  exports.TextareaPane = class TextareaPane extends EditorPane
    constructor: (jencil, editor) ->
      super jencil, 'jencil-textarea-pane', editor
      @$element.css position: 'relative'
      @$surface = $('<textarea>').addClass 'surface'
      @$surface.appendTo @$element
      @$surface.css
        width: '100%'
        height: '100%'
        border: 'none'
        margin: 0
        padding: 0
        resize: 'none'
        outline: 'none'
      @$surface.bind 'keyup keypress click change blur enter', =>
        @update()
      @controller = new Textarea @$surface
    init: ->
      # Enable TAB and SHIFT+TAB feature with jQuery tabby plugin
      @$element.tabby() if $.fn.tabby?
      super()
    relocate: ->
      super()
      # quickfix for IE 6 and 7, because they don't know '100%' mean.
      if Jencil.utils.detector.browser is 'Explorer' and Jencil.utils.detector.version < 8
        @$surface.height @$element.height()
    getValue: ->
      @controller.getValue()
    setValue: (value) ->
      @controller.setValue value
namespace 'Jencil.editor', (exports) ->
  DualPaneEditorBase = Jencil.editor.DualPaneEditorBase
  PreviewPane = Jencil.editor.pane.PreviewPane
  TextareaPane = Jencil.editor.pane.TextareaPane
  exports.TextEditor = class TextEditor extends DualPaneEditorBase
    @extras:
      options:
        previewPosition: 'right'
        previewTemplatePath: '~/extras/templates/preview.html'
        defaultPreviewState: 'open'
    constructor: (jencil) ->
      if jencil.options.extras.previewPosition in ['top', 'left']
        lhspane = @preview = new PreviewPane jencil, @
        rhspane = @textarea = new TextareaPane jencil, @
      else
        lhspane = @textarea = new TextareaPane jencil, @
        rhspane = @preview = new PreviewPane jencil, @
      super jencil, 'jencil-text-editor', lhspane, rhspane
      @$element.addClass "jencil-preview-position-#{@jencil.options.extras.previewPosition}"
      @setValue @jencil.getSourceValue()
      @preview.hide() if @jencil.options.extras.defaultPreviewState is 'close'
      # Add event
      @textarea.update =>
        @jencil.setSourceValue @getValue()
        @preview.update()
    relocate: ->
      super()
      # quickfix for IE 8. Without this code, only IE 8 hung up after switched
      # from different editor.
      if Jencil.utils.detector.browser is 'Explorer' and Jencil.utils.detector.version is 8
        document.selection.createRange().select()
    getValue: ->
      @textarea.getValue()
    setValue: (value) ->
      @textarea.setValue value
    getSelection: ->
      return @textarea.controller.getSelection()
    setSelection: (start, end) ->
      @textarea.controller.setSelection start, end
    getSelected: ->
      return @textarea.controller.getSelected()
    replaceSelected: (str, select=false) ->
      @textarea.controller.replaceSelected str, select
    insertBeforeSelected: (str, select=false) ->
      @textarea.controller.insertBeforeSelected str, select
    insertAfterSelected: (str, select=false) ->
      @textarea.controller.insertAfterSelected str, select
    wrapSelected: (before, after, select=false, additional=undefined) ->
      @textarea.controller.wrapSelected before, after, select, additional
# --- Add extra buttons for TextEditor
namespace 'Jencil.button', (exports) ->
  Widget = Jencil.widget.Widget
  ButtonBase = Jencil.button.ButtonBase
  exports.MarkupButtonBase = class MarkupButtonBase extends ButtonBase
    clickAfter: ->
      # Update editor
      @editor().update()
  # --- markup buttons
  exports.SimpleMarkupButton = class SimpleMarkupButton extends MarkupButtonBase
    constructor: (jencil, args) ->
      [cls, name, @before, @after, @insert] = args
      super jencil, cls, name
    click: ->
      @editor().wrapSelected @before, @after, true, @insert or @jencil.options.defaultInsertText
  exports.MultilineMarkupButton = class MultilineMarkupButton extends MarkupButtonBase
    constructor: (jencil, args) ->
      [cls, name, @before, @after, @blockBefore, @blockAfter] = args
      super jencil, cls, name
    click: ->
      selectedLines = @editor().getSelected().split '\n'
      offset = if selectedLines[0] is @blockBefore then 1 else 0
      for i in [0...selectedLines.length]
        # format {{i}} to line number
        _before = Jencil.utils.string.format @before, {i: i+1-offset}
        _after = Jencil.utils.string.format @after, {i: i+1-offset}
        line = selectedLines[i]
        if line is @blockBefore or line is @blockAfter
          # ignore blockBefore or blockAfter line
          continue
        if line.startsWith(_before) and line.endsWith(_after)
          # remove markup
          selectedLines[i] = line.substring(_before.length, line.length-_after.length)
        else
          # add markup
          selectedLines[i] = "#{_before}#{line}#{_after}"
      if @blockBefore isnt undefined
        if selectedLines[0] is @blockBefore then selectedLines.shift() else selectedLines.unshift @blockBefore
      if @blockAfter isnt undefined
        if selectedLines[selectedLines.length-1] is @blockAfter then selectedLines.pop() else selectedLines.push @blockAfter
      replace = selectedLines.join '\n'
      @editor().replaceSelected replace, true
  # --- prompt buttons
  exports.LinkMarkupButton = class LinkMarkupButton extends MarkupButtonBase
    constructor: (jencil, args) ->
      [@formatstr] = args
      super jencil, 'link', 'Link'
    click: ->
      href = prompt "Please input link url"
      if href is null then return
      label = prompt "Please input link label", @editor().getSelected()
      if label is null then return
      title = prompt "(Optional) Please input link title"
      if title is null then return
      insert = Jencil.utils.string.format @formatstr, 
        href: href
        label: label
        title: title
      @editor().replaceSelected insert
  exports.ImageMarkupButton = class ImageMarkupButton extends MarkupButtonBase
    constructor: (jencil, args) ->
      [@formatstr] = args
      super jencil, 'image', 'Image'
    click: ->
      src = prompt "Please input image src url"
      if src is null then return
      alt = prompt "(Optional) Please input image alt label", @editor().getSelected()
      if alt is null then return
      title = prompt "(Optional) Please input image title"
      if title is null then return
      insert = Jencil.utils.string.format @formatstr, 
        src: src
        alt: alt
        title: title
      @editor().replaceSelected insert
