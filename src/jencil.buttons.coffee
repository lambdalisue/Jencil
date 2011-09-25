namespace 'Jencil.buttons', (exports) ->
  Widget = Jencil.widgets.Widget
  exports.createButton = createButton = (jencil, type, args) ->
    ###
    Create button instance from type and args
    ###
    cls = undefined
    switch type
      when '-', 'separator'
        cls = Separator
      when 's', 'simple'
        cls = SimpleMarkupButton
      when 'm', 'multiline'
        cls = MultilineMarkupButton
      when 'e', 'exec'
        cls = ExecButton
      when 'l', 'link'
        cls = LinkMarkupButton
      when 'i', 'image'
        cls = ImageMarkupButton
      else
        # Try to find from namespace
        cls = Jencil.buttons[type]
        if not cls?
          throw new Error "Unknown button type is passed (type: #{type})"
    return new cls jencil, args
  # --- abstruct class
  exports.ButtonBase = class ButtonBase extends Widget
    ###
    An abstruct class of all button widget
    ###
    constructor: (jencil, cls, name) ->
      super jencil, 'button', 'a'
      @$element.addClass cls
      @$element.attr 'href', '#'
      @$element.attr 'title', name
      @$element.append $("<span>#{name}</span>")
      @$element.click =>
        @clickBefore()
        @click()
        @clickAfter()
    editor: ->
      return @jencil.editor()
    clickBefore: ->
      # This method is called before click callback is called
    click: ->
      # This method is called when user click the button
    clickAfter: ->
      # This method is called after click callback is called
  exports.MarkupButtonBase = class MarkupButtonBase extends ButtonBase
    ###
    An abstruct class of all button widget which modify content

    This button automatically call ``@jencil.editor().update()``
    ###
    clickAfter: ->
      # Update editor
      @editor().update()
  # --- separator
  exports.Separator = class Separator extends Widget
    ###
    Separator
    ###
    constructor: (jencil, args) ->
      super jencil, 'separator', 'span'
      @$element.append $('<span>|</span>')
  # --- markup buttons
  exports.SimpleMarkupButton = class SimpleMarkupButton extends MarkupButtonBase
    ###
    Markup singleline
    ###
    constructor: (jencil, args) ->
      [cls, name, @before, @after, @insert] = args
      super jencil, cls, name
    click: ->
      @editor().wrapSelected @before, @after, true, @insert or @jencil.options.defaultInsertText
  exports.MultilineMarkupButton = class MultilineMarkupButton extends MarkupButtonBase
    ###
    Markup multilines
    ###
    constructor: (jencil, args) ->
      [cls, name, @before, @after, @blockBefore, @blockAfter] = args
      super jencil, cls, name
    click: ->
      selectedLines = @editor().getSelected().split '\n'
      offset = if selectedLines[0] is @blockBefore then 1 else 0
      for i in [0...selectedLines.length]
        # format {{i}} to line number
        _before = Jencil.core.format @before, {i: i+1-offset}
        _after = Jencil.core.format @after, {i: i+1-offset}
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
  # --- execute buttons
  exports.ExecButton = class ExecButton extends ButtonBase
    ###
    Execute javascript
    ###
    constructor: (jencil, args) ->
      [cls, name, @_click, @_clickBefore, @_clickAfter] = args
      super jencil, cls, name
    clickBefore: ->
      @_clickBefore @editor()
    click: ->
      @_click @editor()
    clickAfter: ->
      @_clickAfter @editor()
  # --- prompt buttons
  exports.LinkMarkupButton = class LinkMarkupButton extends MarkupButtonBase
    ###
    Collect infos required to create LINK via prompt and insert link markup
    ###
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
      insert = Jencil.core.format @formatstr, 
        href: href
        label: label
        title: title
      @editor().replaceSelected insert
  exports.ImageMarkupButton = class ImageMarkupButton extends MarkupButtonBase
    ###
    Collect infos required to create IMAGE via prompt and insert image markup
    ###
    constructor: (jencil, args) ->
      [@formatstr] = args
      super jencil, 'img', 'Image'
    click: ->
      src = prompt "Please input image src url"
      if src is null then return
      alt = prompt "(Optional) Please input image alt label", @editor().getSelected()
      if alt is null then return
      title = prompt "(Optional) Please input image title"
      if title is null then return
      insert = Jencil.core.format @formatstr, 
        src: src
        alt: alt
        title: title
      @editor().replaceSelected insert
