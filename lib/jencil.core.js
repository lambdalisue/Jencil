(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  String.prototype.startsWith = function(prefix) {
    return this.lastIndexOf(prefix, 0) === 0;
  };
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
  namespace('Jencil.core', function(exports) {
    var JencilCore, format;
    exports.format = format = function(formatstr, kwargs) {
      /*
          Convert {{key}} string with kwargs
          */
      var key, value;
      for (key in kwargs) {
        value = kwargs[key];
        formatstr = formatstr.replace("{{" + key + "}}", value);
      }
      return formatstr;
    };
    return exports.JencilCore = JencilCore = (function() {
      /*
          Jencil core class
          */      function JencilCore($textarea) {
        this.$textarea = $textarea;
        this.wrapper = new Jencil.widgets.Wrapper(this);
        this.buttonHolder = new Jencil.widgets.ButtonHolder(this);
        this.documentType = new Jencil.widgets.DocumentType(this);
        this.toolbar = new Jencil.widgets.Toolbar(this);
        this.toolbar.append(this.buttonHolder);
        this.toolbar.append(this.documentType);
        this.wrapper.append(this.toolbar);
        this.workspace = new Jencil.widgets.Workspace(this);
        this.wrapper.append(this.workspace);
        this.$textarea.after(this.wrapper.$element);
        this.$textarea.hide();
        this.loadProfile(this.getProfileName());
      }
      JencilCore.prototype.getProfileName = function() {
        return this.documentType.getProfileName();
      };
      JencilCore.prototype.loadProfile = function(profileName) {
        var check, url;
        delete Jencil.profile;
        url = "" + Jencil.options.profileSetPath + "/" + profileName + ".js";
        check = 'Jencil.profile';
        return net.hashnote.module.load(url, check, __bind(function() {
          return this.update();
        }, this));
      };
      JencilCore.prototype.update = function() {
        var cls;
        cls = Jencil.editors[Jencil.profile.editor];
        this.workspace.$element.children().remove();
        this._editor = new cls(this);
        this.workspace.append(this._editor);
        this.buttonHolder.update();
        return this.editor().update();
      };
      JencilCore.prototype.abspath = function(path) {
        return net.hashnote.path.abspath(path, Jencil.options.root);
      };
      JencilCore.prototype.editor = function() {
        return this._editor;
      };
      return JencilCore;
    })();
  });
}).call(this);
