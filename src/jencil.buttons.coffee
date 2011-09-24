namespace 'Jencil.widgets', (exports) ->
  Widget = Jencil.widgets.Widget
  exports.createButton = createButton = (jencil, type, args) ->
    switch type
      when '-', 'separator'
        return new Separator jencil
      when 's', 'simple'
        [cls, name, before, after, insert] = args
        return new SimpleMarkupButton jencil, cls, name, before, after, insert
      when 'e', 'eachline'
        [cls, name, before, after, blockBefore, blockAfter] = args
        return new EachlineMarkupButton jencil, cls, name, before, after, blockBefore, blockAfter
      when 'l', 'link'
        [formatstr] = args
        return new LinkMarkupButton jencil, formatstr
      when 'i', 'image'
        [formatstr] = args
        return new ImageMarkupButton jencil, formatstr
      when 'u', 'unorderedlist'
        [before, after, blockBefore, blockAfter] = args
        return new UnorderedListMarkupButton jencil, before, after, blockBefore, blockAfter
      when 'o', 'orderedlist'
        [before, after, blockBefore, blockAfter] = args
        return new OrderedListMarkupButton jencil, before, after, blockBefore, blockAfter
      when 'p', 'preview'
        return new PreviewButton jencil
      else
        throw new Error "Unknown button type is passed (type: #{type})"
  exports.Separator = class Separator extends Widget
    constructor: (jencil) ->
      super jencil, 'separator', 'span'
      @$element.append $('<span>|</span>')
  exports.Button = class Button extends Widget
    constructor: (jencil, cls, name) ->
      super jencil, 'button', 'a'
      @$element.addClass cls
      @$element.attr 'href', '#'
      @$element.attr 'title', name
      @$element.append $("<span>#{name}</span>")
      @clickBeforeCallback = undefined
      @clickCallback = undefined
      @clickAfterCallback = =>
        console.log 'clickAfterCallback'
        # Update preview
        @jencil.wysiwym.preview.update()
      @$element.click =>
        if @clickBeforeCallback? then @clickBeforeCallback()
        if @clickCallback? then @clickCallback()
        if @clickAfterCallback? then @clickAfterCallback()
  exports.FormatMarkupButton = class FormatMarkupButton extends Button
    format: (formatstr, kwargs) ->
      for key, value of kwargs
        formatstr = formatstr.replace "{{#{key}}}", value
      return formatstr
  exports.SimpleMarkupButton = class SimpleMarkupButton extends Button
    constructor: (jencil, cls, name, before, after, insert) ->
      super jencil, cls, name
      @clickCallback = =>
        @jencil.editor().wrapSelected before, after, true, insert or @jencil.options.defaultInsertText
  exports.EachlineMarkupButton = class EachlineMarkupButton extends Button
    constructor: (jencil, cls, name, before, after, blockBefore, blockAfter) ->
      super jencil, cls, name
      @clickCallback = =>
        selectedLines = @jencil.editor().getSelected().split '\n'
        for i in [0...selectedLines.length]
          _before = before.replace '{{i}}', i+1
          _after = after.replace '{{i}}', i+1
          selectedLine = selectedLines[i]
          if selectedLine is blockBefore or selectedLine is blockAfter
            continue
          if selectedLine.startsWith(_before) and selectedLine.endsWith(_after)
            # Unlist
            selectedLines[i] = selectedLine.substring(_before.length, selectedLine.length-_after.length)
          else
            selectedLines[i] = "#{_before}#{selectedLines[i]}#{_after}"
        if blockBefore?
          if selectedLines[0] is blockBefore
            selectedLines.shift()
          else
            selectedLines.unshift blockBefore
        if blockAfter?
          if selectedLines[selectedLines.length-1] is blockAfter
            selectedLines.pop()
          else
            selectedLines.push blockAfter
        insert = selectedLines.join '\n'
        @jencil.editor().replaceSelected insert, true
  # --- special case buttons
  exports.LinkMarkupButton = class LinkMarkupButton extends FormatMarkupButton
    constructor: (jencil, formatstr) ->
      super jencil, 'link', 'Link'
      @clickCallback = =>
        href = prompt "Please input link url"
        if href is null then return
        label = prompt "Please input link label", @jencil.editor().getSelected()
        if label is null then return
        title = prompt "(Optional) Please input link title"
        if title is null then return
        insert = @format formatstr, 
          href: href
          label: label
          title: title
        @jencil.editor().replaceSelected insert
  exports.ImageMarkupButton = class ImageMarkupButton extends FormatMarkupButton
    constructor: (jencil, formatstr) ->
      super jencil, 'img', 'Image'
      @clickCallback = =>
        src = prompt "Please input image src url"
        if src is null then return
        alt = prompt "(Optional) Please input image alt label", @jencil.editor().getSelected()
        if alt is null then return
        title = prompt "(Optional) Please input image title"
        if title is null then return
        insert = @format formatstr, 
          src: src
          alt: alt
          title: title
        @jencil.editor().replaceSelected insert
  exports.UnorderedListMarkupButton = class UnorderedListMarkupButton extends EachlineMarkupButton
    constructor: (jencil, before, after, blockBefore, blockAfter) ->
      super jencil, 'ul', 'Unordered List', before, after, blockBefore, blockAfter
  exports.OrderedListMarkupButton = class OrderedListMarkupButton extends EachlineMarkupButton
    constructor: (jencil, before, after, blockBefore, blockAfter) ->
      super jencil, 'ol', 'Ordered List', before, after, blockBefore, blockAfter
  exports.PreviewButton = class PreviewButton extends Button
    constructor: (jencil) ->
      super jencil, 'preview', 'Preview'
      @clickCallback = =>
        @jencil.wysiwym.preview.toggle()
      @clickAfterCallback = undefined


