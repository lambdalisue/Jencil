###
Evolution

Extend jQueryObj

Author: lambdalisue
License: MIT License
###
evolute = do ->
  nonContentWidth = (includeMargin=false) ->
    return @outerWidth(includeMargin) - @width()

  nonContentHeight = (includeMargin=false) ->
    return @outerHeight(includeMargin) - @height()

  outerWidth = (includeMargin=false, value) ->
    if typeof includeMargin is 'number'
      value = includeMargin
      includeMargin = false
    if value?
      offset = @nonContentWidth(includeMargin)
      return @width(value - offset)
    return @_outerWidth(includeMargin)

  outerHeight = (includeMargin=false, value) ->
    if typeof includeMargin is 'number'
      value = includeMargin
      includeMargin = false
    if value?
      offset = @nonContentHeight(includeMargin)
      return @height(value - offset)
    return @_outerHeight(includeMargin)

  nonContentWidth = (includeMargin=false) ->
    return @outerWidth(includeMargin) - @width()

  nonContentHeight = (includeMargin=false) ->
    return @outerHeight(includeMargin) - @height()

  ncss = (propertyName, defaultValue=null) ->
    value = @css propertyName
    return defaultValue if value in ['', 'none', null, undefined, NaN]
    value = parseInt(value, 10)
    return value

  minWidth = ->
    return @ncss('min-width')

  minHeight = ->
    return @ncss('min-height')

  maxWidth = ->
    return @ncss('max-width')

  maxHeight = ->
    return @ncss('max-height')

  contentX = (includeMargin=false) ->
    marginLeft = if includeMargin then @ncss('margin-left') else 0
    borderLeft = @ncss('border-left-width')
    paddingLeft = @ncss('padding-left')
    return marginLeft + borderLeft + paddingLeft

  contentY = (includeMargin=false) ->
    marginTop = if includeMargin then @ncss('margin-top') else 0
    borderTop = @ncss('border-top-width')
    paddingTop = @ncss('padding-top')
    return marginTop + borderTop + paddingTop

  absoluteX = (value) ->
    offset = @offset()
    if value?
      offset.left = value
      return @offset(offset)
    return offset.left

  absoluteY = (value) ->
    offset = @offset()
    if value?
      offset.top = value
      return @offset(offset)
    return offset.top

  relativeX = (includeMargin=false, value) ->
    if typeof includeMargin is 'number'
      value = includeMargin
      includeMargin = false
    parent = evolute(@parent())
    offset = parent.absoluteX() + parent.contentX(includeMargin)
    if value?
      return @absoluteX(value+offset)
    return @absoluteX() - offset

  relativeY = (includeMargin=false, value) ->
    if typeof includeMargin is 'number'
      value = includeMargin
      includeMargin = false
    parent = evolute(@parent())
    offset = parent.absoluteY() + parent.contentY(includeMargin)
    if value?
      return @absoluteY(value+offset)
    return @absoluteY() - offset

  evolute = (jQueryObj) ->
    if jQueryObj.__evoluted__ is true
      return jQueryObj

    jQueryObj._outerWidth = jQueryObj.outerWidth
    jQueryObj._outerHeight = jQueryObj.outerHeight

    jQueryObj.nonContentWidth = nonContentWidth
    jQueryObj.nonContentHeight = nonContentHeight
    jQueryObj.outerWidth = outerWidth
    jQueryObj.outerHeight = outerHeight
    jQueryObj.nonContentWidth = nonContentWidth
    jQueryObj.nonContentHeight = nonContentHeight
    jQueryObj.ncss = ncss
    jQueryObj.minWidth = minWidth
    jQueryObj.minHeight = minHeight
    jQueryObj.maxWidth = maxWidth
    jQueryObj.maxHeight = maxHeight
    jQueryObj.contentX = contentX
    jQueryObj.contentY = contentY
    jQueryObj.absoluteX = absoluteX
    jQueryObj.absoluteY = absoluteY
    jQueryObj.relativeX = relativeX
    jQueryObj.relativeY = relativeY
    jQueryObj.__evoluted__ = true

    return jQueryObj
  return evolute
