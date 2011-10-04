###
Jencil theme

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Dependencies:
- Jencil.utils.path (jencil.utils.js)
- Jencil.utils.css (jencil.utils.js)
###
namespace 'Jencil.theme', (exports) ->
  exports.root = undefined
  exports.init = (options) ->
    exports.root = Jencil.utils.path.abspath options.theme.root
    Jencil.theme.load options.theme.default
  exports.load = load = (name) ->
    if Jencil.theme.current?
      Jencil.utils.css.remove new RegExp "#{Jencil.theme.current}/.*\.css"
    Jencil.theme.current = Jencil.utils.path.abspath "#{Jencil.theme.root}/#{name}"
    url = "#{Jencil.theme.current}/style.css"
    media = 'screen, projection'
    Jencil.theme.include url, media
    # --- load current editor css
    if Jencil.jencils?
      for jencil in Jencil.jencils
        editorClass = jencil.workspace.editor.constructor
        Jencil.theme.includeall editorClass.extras.stylesheets if editorClass.extras?.stylesheets?
  exports.abspath = (path) ->
    Jencil.utils.path.abspath path, Jencil.theme.current
  exports.include = (url, media) ->
    url = Jencil.theme.abspath url
    Jencil.utils.css.include url, media
  exports.includeall = (stylesheets) ->
    for url in stylesheets
      Jencil.theme.include url, 'screen, projection'
