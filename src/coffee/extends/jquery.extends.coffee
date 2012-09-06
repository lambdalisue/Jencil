jQuery::_outerWidth = jQuery::outerWidth
jQuery::outerWidth = (includeMargin=false, value) ->
  if typeof includeMargin is 'number'
    value = includeMargin
    includeMargin = false
  if value?
    offset = @nonContentWidth(includeMargin)
    return @width(value - offset)
  return @_outerWidth(includeMargin)

jQuery::_outerHeight = jQuery::outerHeight
jQuery::outerHeight = (includeMargin=false, value) ->
  if typeof includeMargin is 'number'
    value = includeMargin
    includeMargin = false
  if value?
    offset = @nonContentHeight(includeMargin)
    return @height(value - offset)
  return @_outerHeight(includeMargin)

jQuery::nonContentWidth = (includeMargin=false) ->
  return @_outerWidth(includeMargin) - @width()

jQuery::nonContentHeight = (includeMargin=false) ->
  return @_outerHeight(includeMargin) - @height()

jQuery::ncss = (propertyName, defaultValue=null) ->
  value = @css propertyName
  return defaultValue if value in ['', 'none', null, undefined, NaN]
  value = parseInt(value, 10)
  return value

jQuery::minWidth = ->
  return @ncss('min-width')

jQuery::minHeight = ->
  return @ncss('min-height')

jQuery::maxWidth = ->
  return @ncss('max-width')

jQuery::maxHeight = ->
  return @ncss('max-height')

jQuery::contentX = (includeMargin=false) ->
  marginLeft = if includeMargin then @ncss('margin-left') else 0
  borderLeft = @ncss('border-left-width')
  paddingLeft = @ncss('padding-left')
  return marginLeft + borderLeft + paddingLeft

jQuery::contentY = (includeMargin=false) ->
  marginTop = if includeMargin then @ncss('margin-top') else 0
  borderTop = @ncss('border-top-width')
  paddingTop = @ncss('padding-top')
  return marginTop + borderTop + paddingTop

jQuery::absoluteX = (value) ->
  offset = @offset()
  if value?
    offset.left = value
    return @offset(offset)
  return offset.left

jQuery::absoluteY = (value) ->
  offset = @offset()
  if value?
    offset.top = value
    return @offset(offset)
  return offset.top

jQuery::relativeX = (includeMargin=false, value) ->
  if typeof includeMargin is 'number'
    value = includeMargin
    includeMargin = false
  parent = @parent()
  offset = parent.absoluteX() + parent.contentX(includeMargin)
  if value?
    return @absoluteX value+offset
  return @absoluteX() - offset

jQuery::relativeY = (includeMargin=false, value) ->
  if typeof includeMargin is 'number'
    value = includeMargin
    includeMargin = false
  parent = @parent()
  offset = parent.absoluteY() + parent.contentY(includeMargin)
  if value?
    return @absoluteY value+offset
  return @absoluteY() - offset
