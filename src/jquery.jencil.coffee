###
Jencil

Cross browser Markup and WYSIWYG editor

:Author: Alisue (lambdalisue@hashnote.net)
:License: MIT License
:Url: http://github.com/lambdalisue/Jencil
###
include = (url) ->
  script = document.createElement "script"
  script.type = "text/javascript"
  script.src = url
  document.head.appendChild script
load = (url, check, callback) ->
  check = new Function "return #{check} !== undefined"
  if not check()
    include url
    # Wait till load has complete
    setTimeout ->
      if not check() then setTimeout arguments.callee, 100
      else callback()
    , 100
  else callback()
class Textarea
  constructor: (textarea) ->
    if jQuery? and textarea instanceof jQuery
      @textarea = textarea.get(0)
    else
      @textarea = textarea
  # get value
  getValue: ->
    return @textarea.value
  # get selection
  getSelection: ->
    if document.selection
      range = document.selection.createRange()
      clone = range.duplicate()

      clone.moveToElementText @textarea
      clone.setEndPoint 'EndToEnd', range

      s = clone.text.length - range.text.length
      e = s + range.text.length
    else if @textarea.setSelectionRange
      s = @textarea.selectionStart
      e = @textarea.selectionEnd
    return [s, e]
  # set selection
  setSelection: (start, end) ->
    scrollTop = @textarea.scrollTop
    if @textarea.createTextRange
      if $.browser.opera and $.browser.version >= 9.5 and length is 0
        return false
      range = @textarea.createTextRange()
      range.collapse true
      range.moveStart 'character', start
      range.moveEnd 'character', end-start
      range.select()
    else if @textarea.setSelectionRange
      @textarea.setSelectionRange start, end
    @textarea.focus()
    @textarea.scrollTop = scrollTop
  # get selected text
  getSelected: ->
    if document.selection
      range = document.selection.createRange()
      return range.text
    else if @textarea.setSelectionRange
      [start, end] = @getSelection()
      return @textarea.value.substring start, end
    return false
  # replace selection text with block
  _replaceSelected: (str, start=undefined, end=undefined) ->
    if document.selection # MSIE and Opera
      @textarea.focus()
      range = document.selection.createRange()
      range.text = str
      range.select()
    else if @textarea.setSelectionRange # Gecko and Webkit
      before = @textarea.value.substring 0, start
      after = @textarea.value.substring end
      @textarea.value = before + str + after
  replaceSelected: (str, select=false) ->
    scrollTop = @textarea.scrollTop
    [start, end] = @getSelection()
    @_replaceSelected str, start, end
    # set new selection
    end = start+str.length
    if not select
      start = end
    @setSelection start, end
    @textarea.focus()
    @textarea.scrollTop = scrollTop
  # insert str before the selection
  insertBeforeSelected: (str, select=false) ->
    scrollTop = @textarea.scrollTop
    [start, end] = @getSelection()
    selected = @getSelected()
    @_replaceSelected str + selected, start, end
    end = start+str.length
    if not select
      start = end
    @setSelection start, end
    @textarea.focus()
    @textarea.scrollTop = scrollTop
  # insert str after the selection
  insertAfterSelected: (str, select=false) ->
    scrollTop = @textarea.scrollTop
    [start, end] = @getSelection()
    selected = @getSelected()
    @_replaceSelected selected + str, start, end
    end = start+str.length
    if not select
      start = end
    else
      start = start+selected.length
    @setSelection start, end
    @textarea.focus()
    @textarea.scrollTop = scrollTop
  # wrap selection with before and after
  wrapSelected: (before, after, select=false, additional=undefined) ->
    selected = @getSelected()
    if selected.indexOf(before) is 0 and selected.lastIndexOf(after) is (selected.length - after.length)
      # Remove the wrapping if the selection has the same before/after
      str = selected.substring before.length, selected.length - after.length
      @replaceSelected str, select
    else
      if selected is '' and additional?
        selected = additional
      else
        additional = undefined
      scrollTop = @textarea.scrollTop
      [start, end] = @getSelection()
      @_replaceSelected before + selected + after, start, end
      if not select
        end = start+before.length+selected.length+after.length
        start = end
      else if additional
        end = start+before.length+selected.length
        start = start+before.length
      else
        end = start+before.length+after.length+selected.length
      @setSelection start, end
      @textarea.focus()
      @textarea.scrollTop = scrollTop
class Jencil extends Textarea
  constructor: (textarea, options) ->
    super textarea
    @options = options
    # --- construct textarea
    $textarea = $(@textarea)
    $textarea.addClass 'jencil-textarea'
    $textarea.wrap $('<div>').addClass 'jencil'
    @$functionButtonHolder = Jencil.createHolder 'jencil-function-button-holder'
    @$functionDocumentType = Jencil.createHolder 'jencil-function-document-type'
    @$functionBar = Jencil.createHolder 'jencil-function-bar'
    # functionButtonHolder
    @$functionButtonHolder.updateButtons = =>
      profileName = @getCurrentProfileName()
      window.JencilProfile = undefined
      load "#{@options.profilesetPath}/#{profileName}.js", 'JencilProfile', =>
        profile = new JencilProfile
        @$functionButtonHolder.children().remove()
        for button in profile.buttons
          type = button[0]
          args = button[1...button.length]
          $button = @createButtonFromType type, args
          @$functionButtonHolder.append $button
    @$functionButtonHolder.updateButtons()
    # functionDocumentType
    if @options.documentTypeElement?
      @options.documentTypeElement.remove()
      @$functionDocumentType.append @options.documentTypeElement
      $(@options.documentTypeElement).change @$functionButtonHolder.updateButtons
    # functionBar
    @$functionBar.append @$functionButtonHolder
    @$functionBar.append @$functionDocumentType
    $textarea.before @$functionBar

  getCurrentProfileName: ->
    if @options.documentTypeElement?
      return @options.documentTypeElement.val()
    else
      return @options.defaultProfileName
  createSeparator: ->
    $separator = Jencil.createHolder 'jencil-function-separator', 'span'
    $separator.append $("<span>|</span>")
    return $separator
  createButton: (name, cls) ->
    $button = Jencil.createHolder 'jencil-function-button', 'a'
    $button.addClass cls
    $button.attr 'href', '#'
    $button.attr 'title', name
    $button.append $("<span>#{name}</span>")
    return $button
  createSimpleWrapButton: (name, cls, before, after, defaultInsertText=undefined) ->
    $button = @createButton name, cls
    $button.click =>
      @wrapSelected before, after, true, defaultInsertText or @options.defaultInsertText
    return $button
  createLinkButton: (format) ->
    $button = @createButton 'Link', 'link'
    $button.click =>
      href = prompt "Please input link url"
      if href is null or href is "" then return
      label = prompt "Please input link label"
      if label is null then return
      title = prompt "Please input title (optional)"
      if title is null then return
      format = format.replace "{href}", href
      format = format.replace "{title}", title
      format = format.replace "{label}", label
      @replaceSelected format
    return $button
  createImageButton: (format) ->
    $button = @createButton 'Image', 'img'
    $button.click =>
      src = prompt "Please input image url"
      if src is null or src is "" then return
      alt = prompt "Please input alt text (optional)"
      if alt is null then return
      title = prompt "Please input title (optional)"
      if title is null then return
      format = format.replace "{src}", src
      format = format.replace "{title}", title
      format = format.replace "{alt}", alt
      @replaceSelected format
    return $button
  createButtonFromType: (type, args) ->
    switch type
      when 'separator', '-' then return @createSeparator()
      when 'simplewrap' then return @createSimpleWrapButton args[0], args[1], args[2], args[3]
      when "link" then return @createLinkButton args[0]
      when "img" then return @createImageButton args[0]
      else
        throw new Error "Unknown button type has passed (type: #{type})"
  @createHolder: (cls, type='div') ->
    return $("<#{type}>").addClass cls

String.prototype.startsWith = (prefix) ->
  return this.lastIndexOf(prefix, 0) is 0

$ = jQuery
$.fn.jencil = (options) ->
  options = $.extend true, {
    root: undefined
    profilesetPath: '~/profiles'
    defaultProfileName: 'html'
    defaultInsertText: '*'
    documentTypeElement: undefined
    }, options

  # compute root path
  if not options.root?
    $('script').each (a, tag) ->
      match = $(tag).get(0).src.match /(.*)jquery\.jencil(\.min)?\.js$/
      if match?
        options.root = match[1]
        options.root = options.root[0...options.root.length-1]
  # compute profileset path
  if options.profilesetPath.startsWith '~/'
    path = options.profilesetPath[2...options.profilesetPath.length]
    options.profilesetPath = "#{options.root}/#{path}"

  return @each ->
    new Jencil @, options

