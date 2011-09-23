###
TextArea.coffee

Cross browser textarea munipulator script written in CoffeeScript

:Author: Alisue (lambdalisue@hashnote.net)
:License: MIT License
:Url: http://github.com/lambdalisue/Textarea.coffee
:Reference:
  - http://archiva.jp/web/javascript/getRange_in_textarea.html
  - http://livepipe.net/control/textarea
  - http://markitup.jaysalvat.com/home/
###
# Textarea controll class
class @Textarea
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
