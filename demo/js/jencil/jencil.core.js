(function() {
  String.prototype.startsWith = function(prefix) {
    return this.lastIndexOf(prefix, 0) === 0;
  };
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
  namespace('Jencil.core', function(exports) {
    var JencilCore, abspath, parse;
    exports.abspath = abspath = function(path, root, prefix) {
      if (prefix == null) {
        prefix = '~/';
      }
      if (path.startsWith('~/')) {
        path = "" + root + "/" + path.slice(2, (path.length + 1) || 9e9);
      }
      return path;
    };
    exports.parse = parse = function(options) {
      var findroot;
      findroot = function(options) {
        return $('script').each(function(a, tag) {
          var match;
          match = $(tag).get(0).src.match(/(.*)jencil(\.min)?\.js$/);
          if (match != null) {
            options.root = match[1];
            return options.root.slice(0, (options.root.length - 1 + 1) || 9e9);
          }
        });
      };
      if (!(options.root != null)) {
        findroot(options);
      }
      options.profileSetPath = abspath(options.profileSetPath, options.root);
      options.previewTemplatePath = abspath(options.previewTemplatePath, options.root);
      return options;
    };
    return exports.Jencil = JencilCore = (function() {
      function JencilCore($textarea, options) {
        this.$textarea = $textarea;
        this.options = options;
        this.$element = $('<div>').addClass('jencil');
        this.$textarea.wrap(this.$element);
        this.buttonHolder = new Jencil.widgets.ButtonHolder(this);
        this.documentType = new Jencil.widgets.DocumentType(this);
        this.toolbar = new Jencil.widgets.Toolbar(this);
        this.toolbar.append(this.buttonHolder);
        this.toolbar.append(this.documentType);
        this.workspace = new Jencil.widgets.Workspace(this);
        this.wysiwym = new Jencil.widgets.Wysiwym(this);
        this.wysiwyg = new Jencil.widgets.Wysiwyg(this);
        this.$textarea.before(this.toolbar.$element);
        this.$textarea.wrap(this.workspace.$element);
        this.$textarea.after(this.wysiwyg.$element);
        this.$textarea.wrap(this.wysiwym.$element);
        this.$textarea.after(this.wysiwym.preview.$element);
      }
      JencilCore.prototype.abspath = function(path) {
        return Jencil.core.abspath(path, this.options.root);
      };
      JencilCore.prototype.editor = function() {
        return this.wysiwym;
      };
      return JencilCore;
    })();
  });
}).call(this);
