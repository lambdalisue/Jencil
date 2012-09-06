if not window?
  # this library is not for CUI
  return

class Sandbox
  constructor: ->
    if Sandbox.instance?
      return Sandbox.instance
    else if @ not instanceof Sandbox
      return new Sandbox()

    @element = document.getElementById('sandbox')
    @element = document.createElement('div') if not @element?

    if not document.body?
      document.writeln '<body></body>'
    document.body.appendChild @element

    @element.style.visibility = 'hidden'
    @element.style.width = "0px"
    @element.style.height = "0px"
    @element.style.maxWidth = "0px"
    @element.style.maxHeight = "0px"
    @element.style.margin = "0"
    @element.style.border = "none"
    @element.style.padding = "0"
    @element.style.overflow = 'hidden'

    Sandbox.instance = @

  createElement: (name) ->
    element = document.createElement name
    @appendChild element
    return element

  appendChild: (appendedNode) ->
    @element.appendChild appendedNode
    return @

  removeChild: (removedNode) ->
    @element.removeChild removedNode
    return @

  removeAllChildren: ->
    while @element.firstChild
      @element.removeChild @element.firstChild
    return @

  normalize: ->
    @element.normalize()
    return @

root = this
prev = {}
prev.Sandbox = root.Sandbox
root.Sandbox = Sandbox
root.Sandbox.noConflict = ->
  root.Sandbox = prev.Sandbox
  return Sandbox
prev.sandbox = root.sandbox
root.sandbox = Sandbox()
root.sandbox.noConflict = ->
  root.sandbox = prev.sandbox
  return Sandbox()
