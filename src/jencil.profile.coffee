namespace 'Jencil.profile', (exports) ->
  exports.toUrl = toUrl = (jencil, name) ->
    if name.endsWith '.js' then return name
    return "#{jencil.options.profileSetPath}/#{name}.js"
  exports.load = load = (jencil, name) ->
    url = toUrl jencil, name
    check = 'Jencil.profile.Profile'
    delete Jencil.profile.Profile     # Remove `Profile` to force reload
    delete jencil.profile
    net.hashnote.module.load url, check, =>
      jencil.profile = new Jencil.profile.Profile jencil
      jencil.update()
