var Workspace, Wrapper,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Wrapper = (function(_super) {

  __extends(Wrapper, _super);

  function Wrapper(core) {
    Wrapper.__super__.constructor.call(this, core);
    this.element.addClass('jencil wrapper');
    this.workspace = new Workspace(this.core);
    this.workspace.element.appendTo(this.element);
  }

  Wrapper.prototype.init = function() {
    var _this = this;
    if (this.element.resizable != null) {
      this.element.resizable({
        resize: function() {
          return _this.adjust();
        },
        stop: function() {
          return _this.adjust();
        }
      });
    }
    this.workspace.init();
    return this;
  };

  Wrapper.prototype.adjust = function() {
    this.workspace.element.outerWidth(this.element.width());
    this.workspace.element.outerHeight(this.element.height());
    this.workspace.adjust();
    return this;
  };

  return Wrapper;

})(Panel);

Workspace = (function(_super) {

  __extends(Workspace, _super);

  function Workspace(core) {
    Workspace.__super__.constructor.call(this, core);
    this.element.addClass('workspace');
    this.reconstructor(core.profile);
  }

  Workspace.prototype.reconstructor = function(profile) {
    var button, buttonClass, buttonClasses, editorClass, viewerClass, _i, _len,
      _this = this;
    this.element.empty();
    editorClass = profile.getEditorClass();
    this.editorPanel = new editorClass(this.core);
    viewerClass = profile.getViewerClass();
    this.viewerPanel = new viewerClass(this.core);
    this.editorPanel.update(function(value) {
      return _this.viewerPanel.update(value);
    });
    this.mainPanel = new VerticalPanel(this.core, this.editorPanel, this.viewerPanel, this.core.options.defaultSplitterVolume);
    this.mainPanel.element.addClass('mainPanel');
    this.toolbar = new Toolbar(this.core);
    buttonClasses = profile.getButtonClasses();
    for (_i = 0, _len = buttonClasses.length; _i < _len; _i++) {
      buttonClass = buttonClasses[_i];
      button = new buttonClass(this.core);
      this.toolbar.element.append(button.element);
    }
    this.toolbar.element.appendTo(this.element);
    return this.mainPanel.element.appendTo(this.element);
  };

  Workspace.prototype.init = function() {
    this.toolbar.init();
    return this.mainPanel.init();
  };

  Workspace.prototype.adjust = function() {
    this.toolbar.element.outerWidth(this.element.width());
    this.mainPanel.element.outerWidth(this.element.width());
    this.mainPanel.element.outerHeight(this.element.height() - this.toolbar.element.outerHeight());
    this.toolbar.adjust();
    this.mainPanel.adjust();
    return this;
  };

  Workspace.prototype.toggleViewer = function(callback) {
    var end, volume,
      _this = this;
    volume = this.mainPanel.splitter.volume();
    if ((0 < volume && volume < 1)) {
      end = 1;
      this._previousSplitterVolume = volume;
    } else {
      end = this._previousSplitterVolume || this.mainPanel.splitter.defaultVolume;
      if (end === 1) {
        end = 0.5;
      }
    }
    return animate({
      start: volume,
      end: end,
      duration: 500,
      callback: function(value, epoch) {
        return _this.mainPanel.splitter.volume(value);
      }
    });
  };

  return Workspace;

})(Panel);
