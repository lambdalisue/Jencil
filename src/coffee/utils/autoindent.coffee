###
autoindent

Enable auto indentation feature in textarea
It is suitable with jquery.tabby.js which enable tab indentation in textarea

The following library is required to use this library

- jQuery
- selection

Note:
  You should use this library as CoffeeScript that's why I didn't
  add `autoIndentable` in window namespace

Usage:

  textarea = $('textarea')
  textarea = autoIndentable(textarea)

  # auto indent feature is enable at default.
  # you can disable it with
  textarea.autoIndent.disable()

  # and enable again with
  textarea.autoIndent.enable()

  # and also, you can add some pre/post callback
  # which is called pre/post step of adding newline
  # and white spaces with
  textarea.autoIndent.pre = (e, line) ->
    # e = Event object of jQuery
    # line = current line of caret exists
    console.log "This function is called before newline adding"
  textarea.autoIndent.post = (e, line, indent, insert) ->
    # e = Event object of jQuery
    # line = current line of caret exists
    # indent = leading white spaces of current line
    # insert = newline and indent which is added after the caret
    console.log "This function is called after newline adding"

Author:   lambdalisue (lambdalisue@hashnote.net)
License:  MIT License

Copyright(C) 2012 lambdalisue, hasnote.net allright reserved
###
autoIndentable = do ->
  autoIndent = (e) ->
    # NOTE: this = textarea
    return if e.which isnt 13  # RETURN
    # get current line
    line = @selection.line()
    # call pre callback
    cancel = @autoIndent.pre?.call(@, e, line) is true
    if cancel isnt true
      # get leading white spaces of the line
      indent = line.replace(/^([\t\s]*).*$/, "$1")
      # add newline and leading white spaces
      insert = "\n#{indent}"
      @selection.insertAfter(insert, false)
    # call post callback
    @autoIndent.post?.call(@, e, line, indent, insert, cancel)
    # cancel bubbling
    e.stopPropagation()
    e.stopImmediatePropagation()
    # stop default
    e.preventDefault()
    # focus back
    @focus()
    return false

  return (textarea, pre, post) ->
    # Convert the instance to jQuery instance if it's not
    textarea = $(textarea) if textarea not instanceof jQuery
    # Add selection instancce if the instance doesn't have
    if not textarea.selection?
      textarea.selection = new Selection(document, textarea.get(0))
    # Add autoIndent method
    textarea.autoIndent = (e) ->
      return autoIndent.call(textarea, e)
    # Add some helper methods
    textarea.autoIndent.enable = ->
      textarea.on 'keydown', textarea.autoIndent
      return textarea
    textarea.autoIndent.disable = ->
      textarea.off 'keydown', textarea.autoIndent
      return textarea
    # Add pre/post callback
    if pre?
      textarea.autoIndent.pre = (e, line) ->
        pre.call(textarea, e, line)
    if post?
      textarea.autoIndent.post = (e, line, indent, insert) ->
        post.call(textarea, e, line, indent, insert)
    # enable autoIndent and return the textarea instance
    return textarea.autoIndent.enable()
