(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
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
          */      function JencilCore($textarea, options) {
        this.$textarea = $textarea;
        this.options = options;
        this.profile = void 0;
        this.wrapper = new Jencil.widgets.Wrapper(this);
        this.buttonHolder = new Jencil.widgets.ButtonHolder(this);
        this.documentType = new Jencil.widgets.DocumentType(this);
        this.toolbar = new Jencil.widgets.Toolbar(this);
        this.toolbar.append(this.buttonHolder);
        this.toolbar.append(this.documentType);
        this.wrapper.append(this.toolbar);
        this.workspace = new Jencil.widgets.Workspace(this);
        this.workspace.append(new Jencil.editors.Loader(this));
        this.wrapper.append(this.workspace);
        this.$textarea.after(this.wrapper.$element);
        this.$textarea.hide();
        Jencil.profile.load(this, this.documentType.getProfileName());
      }
      JencilCore.prototype.update = function() {
        return Jencil.editors.changeEditor(this, this.profile.editor, __bind(function() {
          this.buttonHolder.update();
          return this.editor().update();
        }, this));
      };
      JencilCore.prototype.editor = function() {
        return this._editor;
      };
      JencilCore.prototype.abspath = function(path) {
        return net.hashnote.path.abspath(path, this.options.root);
      };
      return JencilCore;
    })();
  });
}).call(this);
