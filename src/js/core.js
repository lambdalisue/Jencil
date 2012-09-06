var JencilCore;

JencilCore = (function() {

  function JencilCore(textarea) {
    var _this = this;
    this.caretaker = new Caretaker();
    this.profile = new MarkdownProfile();
    this.element = textarea;
    this.element.hide();
    this.fullscreen = new Fullscreen(this);
    this.wrapper = new Wrapper(this);
    this.element.after(this.fullscreen.element);
    this.element.after(this.wrapper.element);
    this.update(function(value) {
      return _this.element.val(value);
    });
    $(window).resize(function() {
      return _this.adjust();
    });
    this.init().adjust();
  }

  JencilCore.prototype.setProfile = function(profile) {
    return this.wrapper.workspace.reconstructor(profile);
  };

  JencilCore.prototype.getEditor = function() {
    return this.wrapper.workspace.editorPanel;
  };

  JencilCore.prototype.getViewer = function() {
    return this.wrapper.workspace.viewerPanel;
  };

  JencilCore.prototype.init = function() {
    this.wrapper.init();
    return this;
  };

  JencilCore.prototype.adjust = function() {
    this.wrapper.adjust();
    return this;
  };

  JencilCore.prototype.focus = function() {
    this.getEditor().focus();
    return this;
  };

  JencilCore.prototype.update = function(callback) {
    var editor;
    editor = this.getEditor();
    if (callback != null) {
      editor.update(callback);
      return this;
    }
    this.editor.update();
    return this;
  };

  JencilCore.prototype.options = {
    defaultSplitterVolume: 1,
    previewTemplatePath: null
  };

  return JencilCore;

})();

$.fn.jencil = function(options) {
  var $this, instance;
  $this = $(this);
  instance = new JencilCore($this);
  return $this.data('jencil', instance);
};
