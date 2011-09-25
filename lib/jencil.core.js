(function() {
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
        this.wrapper.append(this.workspace);
        this.$textarea.after(this.wrapper.$element);
        this.$textarea.hide();
        Jencil.profile.load(this, this.documentType.getProfileName());
      }
      JencilCore.prototype.update = function() {
        var _ref;
        if ((_ref = this._editor) != null) {
          _ref.$element.remove();
        }
        delete this._editor;
        this._editor = new Jencil.editors[this.profile.editor](this);
        this.workspace.append(this._editor);
        this.buttonHolder.update();
        return this.editor().update();
      };
      JencilCore.prototype.editor = function() {
        return this._editor;
      };
      JencilCore.prototype.utils = {
        abspath: function(path) {
          return net.hashnote.path.abspath(path, this.options.root);
        }
      };
      return JencilCore;
    })();
  });
}).call(this);
