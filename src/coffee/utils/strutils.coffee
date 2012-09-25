strutils =
  # http://stackoverflow.com/questions/202605/repeat-string-javascript
  repeat: (str, count) ->
    return '' if count < 1
    result = ''
    pattern = str.valueOf()
    while count > 0
      result += pattern if count & 1
      count >>= 1
      pattern += pattern
    return result

  startsWith: (str, prefix) ->
    return str.lastIndexOf(prefix, 0) is 0

  endsWith: (str, suffix) ->
    l = str.length - suffix.length
    return l >= 0 and str.lastIndexOf(suffix, l) == l

  trimLeft: (str) ->
    return str.replace(/^\s+/g, '')

  trimRight: (str) ->
    return str.replace(/\s+$/g, '')

  trim: (str) ->
    return str.replace(/^\s+|\s+$/g, '')

# Prototypes
apply = (object, name, fn) ->
  if not object.prototype[name]?
    object.prototype[name] = ->
      args = [@].concat(Array::slice.call(arguments))
      return fn.apply(@, args)
apply(String, 'repeat', strutils.repeat)
apply(String, 'startsWith', strutils.startsWith)
apply(String, 'endsWith', strutils.endsWith)
apply(String, 'trimLeft', strutils.trimLeft)
apply(String, 'trimRight', strutils.trimRight)
apply(String, 'trim', strutils.trim)

exports?.strutils = strutils
