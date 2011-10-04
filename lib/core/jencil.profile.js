/*
Jencil profile

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Dependencies:
- Jencil.utils.path (jencil.utils.js)
- Jencil.utils.script (jencil.utils.js)
*/namespace('Jencil.profile', function(exports) {
  exports.abspath = function(path, jencil) {
    if (!path.endsWith('.js')) {
      path = "" + jencil.options.profile.root + "/" + path + ".js";
    }
    return Jencil.utils.path.abspath(path);
  };
  return exports.load = function(jencil, path) {
    var check, url;
    url = Jencil.profile.abspath(path, jencil);
    check = 'Jencil.profile.Profile';
    delete Jencil.profile.Profile;
    delete jencil.profile;
    return Jencil.utils.script.load(url, check, function() {
      jencil.profile = new Jencil.profile.Profile(jencil);
      return jencil.update();
    });
  };
});