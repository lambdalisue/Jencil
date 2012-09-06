var FullscreenButton, PreviewButton, RedoButton, UndoButton,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

UndoButton = (function(_super) {

  __extends(UndoButton, _super);

  function UndoButton(core) {
    var callback, check,
      _this = this;
    callback = function(e) {
      return _this.core.caretaker.undo();
    };
    check = function() {
      if (!_this.core.caretaker.canUndo()) {
        _this.element.addClass('disabled');
      } else {
        _this.element.removeClass('disabled');
      }
      return setTimeout(check, 100);
    };
    UndoButton.__super__.constructor.call(this, core, 'undo', callback, 'Ctrl+Z');
    check();
  }

  return UndoButton;

})(ActionButton);

RedoButton = (function(_super) {

  __extends(RedoButton, _super);

  function RedoButton(core) {
    var callback, check,
      _this = this;
    callback = function(e) {
      return _this.core.caretaker.redo();
    };
    check = function() {
      if (!_this.core.caretaker.canRedo()) {
        _this.element.addClass('disabled');
      } else {
        _this.element.removeClass('disabled');
      }
      return setTimeout(check, 100);
    };
    RedoButton.__super__.constructor.call(this, core, 'redo', callback, 'Ctrl+Shift+Z');
    check();
  }

  return RedoButton;

})(ActionButton);

FullscreenButton = (function(_super) {

  __extends(FullscreenButton, _super);

  function FullscreenButton(core) {
    var callback,
      _this = this;
    callback = function(e) {
      if (_this.core.fullscreen.element.is(':visible')) {
        _this.core.fullscreen.hide();
        return _this.element.removeClass('hide');
      } else {
        _this.core.fullscreen.show();
        return _this.element.addClass('hide');
      }
    };
    FullscreenButton.__super__.constructor.call(this, core, 'fullscreen', callback, 'Ctrl+F');
  }

  return FullscreenButton;

})(ActionButton);

PreviewButton = (function(_super) {

  __extends(PreviewButton, _super);

  function PreviewButton(core) {
    var callback,
      _this = this;
    callback = function(e) {
      var viewer;
      viewer = _this.core.getViewer();
      if (!viewer.element.is(':visible')) {
        _this.element.addClass('hide');
      } else {
        _this.element.removeClass('hide');
      }
      return _this.core.wrapper.workspace.toggleViewer();
    };
    PreviewButton.__super__.constructor.call(this, core, 'preview', callback, 'Ctrl+P');
  }

  PreviewButton.prototype.init = function() {
    if (this.core.wrapper.workspace.mainPanel.splitter.defaultValue === 0) {
      return this.element.addClass('hide');
    } else {
      return this.element.removeClass('hide');
    }
  };

  return PreviewButton;

})(ActionButton);
