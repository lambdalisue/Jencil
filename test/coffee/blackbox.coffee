return if not window?

class Blackbox
  constructor: ->
    return Blackbox.instance if Blackbox.instance?
    return new Blackbox() if @ not instanceof Blackbox

    if not document.body?
      document.writeln '<body></body>'
    @element = $('<div>')
      .addClass('blackbox')
      .appendTo($('body'))
    @element.css
      'position': 'fixed'
      'width': '100%'
      'height': '100%'
      'opacity': '0.5'
      'background': 'black'
    @hide()
    Blackbox.instance = @

  show: ->
    @element.css
      'visibility': 'show'
      'z-index': '1000'

  hide: ->
    @element.css
      'visibility': 'hidden'
      'z-index': '0'

  add: (selector='div', context) ->
    if selector instanceof jQuery
      instance = selector
    else
      instance = $("<#{selector}>", context)
    instance.appendTo(@element)
    return instance

  clear: ->
    @element.empty()
    return @

root = window
prev = {}
prev.Blackbox = root.Blackbox
root.Blackbox = Blackbox
root.Blackbox.noConflict = ->
  root.Blackbox = prev.Blackbox
  return Blackbox
prev.blackbox = root.blackbox
root.blackbox = new Blackbox()
root.blackbox.noConflict = ->
  root.blackbox = prev.blackbox
  return new Blackbox()
blackbox = root.blackbox
