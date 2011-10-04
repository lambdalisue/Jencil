###
dynamicloader

CoffeeScript dynamic javascript load utils.

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

###
namespace @, 'dynamicloader.script', (exports) ->
  exports.include = include = (url) ->
    script = document.createElement 'script'
    script.type = 'text/javascript'
    script.src = url
    document.head = document.head or document.getElementsByTagName('head')[0];
    document.head.appendChild script
  exports.load = load = (url, check, callback, timeout=5000) ->
    _check = new Function "return !!(#{check})"
    if not _check()
      include url
      setTimeout -> 
        timeout = true
      , timeout
      setTimeout ->
        if timeout isnt true and not _check()
          setTimeout arguments.callee, 100
        else callback?()
      , 100
    else callback?()
  exports.loadall = (sets, callback, timeout=5000) ->
    cursor = 0
    process = ->
      url = sets[cursor][0]
      check = sets[cursor][1]
      cursor++
      if cursor > sets.length then callback?() else load url, check, next
    next()
namespace 'dynamicloader.css', (exports) ->
  exports.include = (url, media='all') ->
    link = document.createElement 'link'
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.media = media
    link.href = url
    document.head = document.head or document.getElementsByTagName('head')[0];
    document.head.appendChild link
  exports.remove = (pattern) ->
    $('link').each (a, tag) ->
      match = tag.href.match pattern
      if match? then $(tag).remove()
