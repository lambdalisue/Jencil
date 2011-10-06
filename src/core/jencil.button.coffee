###
Jencil button

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Required:
- Jencil.widget (jencil.widget.js)

Dependencies:
- Jencil.utils.detector (jencil.utils.js)
###
namespace 'Jencil.button', (exports) ->
  Widget = Jencil.widget.Widget
  exports.createButton = (jencil, type, args) ->
    cls = undefined
    switch type
      when '-', 'separator'
        cls = Jencil.button.Separator
      when '+', 'exec'
        cls = Jencil.button.ExecButton
      when 'preview'
        cls = Jencil.button.PreviewButton
      else
        cls = Jencil.button[type]
        if not cls? then throw new Error "Unknown button type is passed (type: #{type})"
    return new cls jencil, args
  # --- abstruct class
  exports.ButtonBase = class ButtonBase extends Widget
    constructor: (jencil, cls, name) ->
      super jencil, 'button', 'a'
      @$element.addClass cls
      @$element.attr 'title', name
      @$element.css 'cursor', 'pointer'
      # quickfix IE6 and IE7 hover issue
      if Jencil.utils.detector.browser is 'Explorer' and Jencil.utils.detector.version < 8
        @$element.attr 'href', 'javascript:void(0);'
      @$element.append $("<span>#{name}</span>")
      @$element.click =>
        @clickBefore()
        @click()
        @clickAfter()
    editor: ->
      return @jencil.workspace.editor
    clickBefore: ->
      # This method is called before click callback is called
    click: ->
      # This method is called when user click the button
    clickAfter: ->
      # This method is called after click callback is called
  exports.MarkupButtonBase = class MarkupButtonBase extends ButtonBase
    clickAfter: ->
      # Update editor
      @editor().update()
      @editor().focus()
  # --- separator
  exports.Separator = class Separator extends Widget
    constructor: (jencil, args) ->
      super jencil, 'separator', 'span'
      @$element.append $('<span>|</span>')
  # --- execute buttons
  exports.ExecButton = class ExecButton extends ButtonBase
    constructor: (jencil, args) ->
      [cls, name, @_click, @_clickBefore, @_clickAfter] = args
      super jencil, cls, name
    clickBefore: ->
      @_clickBefore @editor()
    click: ->
      @_click @editor()
    clickAfter: ->
      @_clickAfter @editor()
  # --- preview button
  exports.PreviewButton = class PreviewButton extends ButtonBase
    constructor: (jencil, args) ->
      super jencil, 'preview', 'Preview'
    click: ->
      editor = @editor()
      editor.preview?.toggle()
      editor.relocate()
