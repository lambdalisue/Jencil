var Jencil, Profile;

Profile = (function() {

  function Profile() {}

  Profile.prototype.mainPanelClass = null;

  Profile.prototype.editorClass = null;

  Profile.prototype.viewerClass = null;

  Profile.prototype.helperClass = null;

  Profile.prototype.buttons = null;

  return Profile;

})();

Jencil = (function() {

  function Jencil(textarea, options) {
    var _this = this;
    this.options = jQuery.extend({
      'profile': Jencil.filetypes.html.HtmlProfile
    }, options);
    this.element = textarea.hide();
    this.caretaker = new Caretaker();
    this.caretaker.originator = function() {
      return _this.editor();
    };
    this.wrapper = new Wrapper(this);
    this.fullscreen = new Fullscreen(this);
    this.element.after(this.wrapper.element).after(this.fullscreen.element);
    this.wrapper.init();
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
  var $this;
  $this = $(this);
  return $this.data('Jencil', new Jencil($this, options));
};

namespace('Jencil.profiles', function(exports) {
  return exports.Profile = Profile;
});

namespace('Jencil.utils', function(exports) {
  return exports.namespace = namespace;
});
