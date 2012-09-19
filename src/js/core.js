var Profile;

Profile = (function() {

  Profile.prototype.mainPanelClass = null;

  Profile.prototype.editorClass = null;

  Profile.prototype.viewerClass = null;

  Profile.prototype.helperClass = null;

  Profile.prototype.toolbarButtons = null;

  Profile.prototype.statusbarButtons = null;

  Profile.prototype.defaultVolume = null;

  Profile.prototype.defaultVolume2 = null;

  function Profile(options) {
    this.options = options;
    this;

  }

  return Profile;

})();

this.Jencil = (function() {

  function Jencil(textarea, options) {
    var _this = this;
    this.options = jQuery.extend({
      'profile': Jencil.profiles.HtmlProfile,
      'resizable': true,
      'enableTabIndent': true,
      'enableAutoIndent': true,
      'tabString': '    ',
      'defaultVolume': null,
      'defaultVolume2': null,
      'width': 640,
      'height': 620,
      'editorTemplatePath': null,
      'viewerTemplatePath': null,
      'helperTemplatePath': null
    }, options);
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
  return exports.Profile = Profile;
});

namespace('Jencil.utils', function(exports) {
  return exports.namespace = namespace;
});
