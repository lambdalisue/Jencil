curtainFactory = (element) ->
  element.css 'position', 'relative'
  curtain = $('<div>').appendTo(element).hide().css
    'position': 'absolute'
    'top': '0'
    'left': '0'
    'overflow': 'hidden'
    'z-index': 99999
  curtain.on = ->
    curtain.refresh()
    curtain.show()
    return @
  curtain.refresh = ->
    curtain.width element.outerWidth(true)
    curtain.height element.outerHeight(true)
    return @
  curtain.off = ->
    curtain.hide()
    return @
  return curtain
