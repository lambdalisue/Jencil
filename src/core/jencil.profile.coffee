###
Jencil profile

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Dependencies:
- Jencil.utils.path (jencil.utils.js)
- Jencil.utils.script (jencil.utils.js)
###
namespace 'Jencil.profile', (exports) ->
  exports.abspath = (path, jencil) ->
    if not path.endsWith '.js'
      path = "#{jencil.options.profile.root}/#{path}.js"
    return Jencil.utils.path.abspath path
  exports.load = (jencil, path) ->
    url = Jencil.profile.abspath path, jencil
    check = 'Jencil.profile.Profile'
    # remove profile to force reload
    delete Jencil.profile.Profile
    delete jencil.profile
    Jencil.utils.script.load url, check, ->
      jencil.profile = new Jencil.profile.Profile jencil
      jencil.update()
