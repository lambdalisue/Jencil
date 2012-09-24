var DefaultProfile;

DefaultProfile = {
  mainPanelClass: null,
  editorClass: null,
  viewerClass: null,
  helperClass: null,
  toolbarButtons: [],
  statusbarButtons: [],
  defaultVolume: null,
  defaultVolume2: null
};

this.Jencil = (function() {

  function Jencil(textarea, options) {
    var DefaultOptions,
      _this = this;
    DefaultOptions = {
      profile: 'Html',
      profiles: {
        Html: HtmlProfile
      },
      resizable: true,
      enableTabIndent: true,
      enableAutoIndent: true,
      tabString: '    ',
      defaultVolume: null,
      defaultVolume2: null,
      width: 640,
      height: 620,
      editorTemplatePath: null,
      viewerTemplatePath: null,
      helperTemplatePath: null
    };
    this.options = jQuery.extend(DefaultOptions, options);
    this.element = textarea.hide();
    this.caretaker = new Caretaker();
    this.caretaker.originator = function() {
      return _this.editor();
    };
    this.wrapper = new Wrapper(this, this.options.width, this.options.height);
    this.fullscreen = new Fullscreen(this);
    this.element.after(this.wrapper.element).after(this.fullscreen.element);
    this.wrapper.init();
    this.wrapper.adjust();
    this.caretaker.save();
  }

  Jencil.prototype.editor = function() {
    return this.wrapper.workspace.mainPanel.editorPanel || null;
  };

  Jencil.prototype.viewer = function() {
    return this.wrapper.workspace.mainPanel.viewerPanel || null;
  };

  Jencil.prototype.helper = function() {
    return this.wrapper.workspace.mainPanel.helperPanel || null;
  };

  return Jencil;

})();

$.fn.jencil = function(options) {
  return new Jencil($(this), options);
};

namespace('Jencil.profiles', function(exports) {
  return exports.DefaultProfile = DefaultProfile;
});

namespace('Jencil.utils.namespace', function(exports) {
  return exports.namespace = namespace;
});

namespace('Jencil.utils.evolution', function(exports) {
  return exports.evolute = evolute;
});

namespace('Jencil.utils.selection', function(exports) {
  return exports.Selection = Selection;
});

namespace('Jencil.utils.animation', function(exports) {
  return exports.animate = animate;
});

namespace('Jencil.utils.autoindent', function(exports) {
  return exports.autoIndentable = autoIndentable;
});

namespace('Jencil.utils.curtain', function(exports) {
  return exports.curtainFactory = curtainFactory;
});

namespace('Jencil.utils.i18n', function(exports) {
  return exports.translate = translate;
});

namespace('Jencil.utils.undo', function(exports) {
  exports.NotImplementedError = NotImplementedError;
  exports.Originator = Originator;
  return exports.Caretaker = Caretaker;
});

namespace('Jencil', function(exports) {
  return exports.t = translate;
});
