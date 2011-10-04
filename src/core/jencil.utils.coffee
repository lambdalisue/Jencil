###
Jencil utils

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Required:
- namespace (namespace.js)
- Detector (detector.js)
- dynamicloader (dynamicloader.js)
###
namespace 'Jencil.utils', (exports) ->
  exports.detector = new Detector
namespace 'Jencil.utils.path', (exports) ->
  exports.init = (options) ->
    exports.path = new Path options.root ? options.rootPattern ? /(.*)jencil(\.min)?\.js/
  exports.abspath = (path, root, prefix='~/') ->
    exports.path.abspath path, root, prefix
  exports.Path = class Path
    constructor: (pattern) ->
      if pattern instanceof RegExp
        $('script').each (a, tag) =>
          match = tag.src.match pattern
          if match?
            @root = match[1]
            # remove trailing slush
            return @root = @root[0..@root.length-2]
      else
        @root = pattern
    abspath: (path, root, prefix='~/') ->
      root ?= @root
      if path?.startsWith prefix
        path = "#{root}/#{path[2..path.length]}"
      return path
namespace 'Jencil.utils.script', (exports) ->
  exports.load = (url, check, callback) ->
    dynamicloader.script.load Jencil.utils.path.abspath(url), check, callback
  exports.loadall = (sets, callback) ->
    cursor = 0
    process = ->
      url = sets[cursor][0]
      check = sets[cursor][1]
      cursor++
      if cursor > sets.length then callback?() else Jencil.utils.module.load url, check, next
    process()
namespace 'Jencil.utils.css', (exports) ->
  exports.include = (url, media = 'all') ->
    dynamicloader.css.include url
  exports.remove = (pattern) ->
    dynamicloader.css.remove pattern
namespace 'Jencil.utils.string', (exports) ->
  exports.format = format = (formatstr, kwargs) ->
    for key, value of kwargs
      formatstr = formatstr.replace "{{#{key}}}", value
    return formatstr
