(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  namespace('Jencil.profile', function(exports) {
    var load, toUrl;
    exports.toUrl = toUrl = function(jencil, name) {
      if (name.endsWith('.js')) {
        return name;
      }
      return "" + jencil.options.profileSetPath + "/" + name + ".js";
    };
    return exports.load = load = function(jencil, name) {
      var check, url;
      url = toUrl(jencil, name);
      check = 'Jencil.profile.Profile';
      delete Jencil.profile.Profile;
      delete jencil.profile;
      return net.hashnote.module.load(url, check, __bind(function() {
        jencil.profile = new Jencil.profile.Profile(jencil);
        return jencil.update();
      }, this));
    };
  });
}).call(this);
