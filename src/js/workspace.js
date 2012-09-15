var Bar, Statusbar, Toolbar, Workspace, Wrapper,
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
        start: function() {
          var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
          if ((_ref = _this.core.editor()) != null) {
            if ((_ref1 = _ref.curtain) != null) {
              _ref1.on();
            }
          }
          if ((_ref2 = _this.core.viewer()) != null) {
            if ((_ref3 = _ref2.curtain) != null) {
              _ref3.on();
            }
          }
          return (_ref4 = _this.core.helper()) != null ? (_ref5 = _ref4.curtain) != null ? _ref5.on() : void 0 : void 0;
        },
        resize: function() {
          var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
          if ((_ref = _this.core.editor()) != null) {
            if ((_ref1 = _ref.curtain) != null) {
              _ref1.refresh();
            }
          }
          if ((_ref2 = _this.core.viewer()) != null) {
            if ((_ref3 = _ref2.curtain) != null) {
              _ref3.refresh();
            }
          }
          if ((_ref4 = _this.core.helper()) != null) {
            if ((_ref5 = _ref4.curtain) != null) {
              _ref5.refresh();
            }
          }
          return _this.adjust();
        },
        stop: function() {
          var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
          if ((_ref = _this.core.editor()) != null) {
            if ((_ref1 = _ref.curtain) != null) {
              _ref1.off();
            }
          }
          if ((_ref2 = _this.core.viewer()) != null) {
            if ((_ref3 = _ref2.curtain) != null) {
              _ref3.off();
            }
          }
          if ((_ref4 = _this.core.helper()) != null) {
            if ((_ref5 = _ref4.curtain) != null) {
              _ref5.off();
            }
          }
          return _this.adjust();
        }
      });
    }
    this.workspace.init();
    return this.adjust();
  };

  Wrapper.prototype.adjust = function() {
    this.workspace.element.outerWidth(true, this.element.width());
    this.workspace.element.outerHeight(true, this.element.height());
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
    this.profile(new HtmlProfile());
  }

  Workspace.prototype.profile = function(profile) {
    var button, _i, _j, _len, _len1, _ref, _ref1;
    if (profile != null) {
      this.element.empty();
      this.mainPanel = new profile.mainPanelClass(this.core, profile);
      this.toolbar = new Toolbar(this.core);
      _ref = profile.toolbarButtons;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        button = _ref[_i];
        button = buttonFactory(this.core, button);
        this.toolbar.addButton(button);
      }
      this.statusbar = new Statusbar(this.core);
      _ref1 = profile.statusbarButtons;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        button = _ref1[_j];
        button = buttonFactory(this.core, button);
        this.statusbar.addButton(button);
      }
      this.element.append(this.toolbar.element);
      this.element.append(this.mainPanel.element);
      this.element.append(this.statusbar.element);
      this._profile = profile;
      return this;
    }
    return this._profile;
  };

  Workspace.prototype.init = function() {
    this.toolbar.init();
    this.statusbar.init();
    this.mainPanel.init();
    return this.adjust();
  };

  Workspace.prototype.adjust = function() {
    var offset;
    this.toolbar.element.outerWidth(true, this.element.width());
    this.statusbar.element.outerWidth(true, this.element.width());
    this.mainPanel.element.outerWidth(true, this.element.width());
    this.toolbar.adjust();
    this.statusbar.adjust();
    offset = this.toolbar.element.outerHeight(true) + this.statusbar.element.outerHeight(true);
    this.mainPanel.element.outerHeight(true, this.element.height() - offset);
    this.mainPanel.adjust();
    return this;
  };

  Workspace.prototype.update = function() {
    if (this.mainPanel.editorPanel && this.mainPanel.viewerPanel) {
      return this.mainPanel.viewerPanel.update(this.mainPanel.editorPanel.val());
    }
  };

  return Workspace;

})(Panel);

Bar = (function(_super) {

  __extends(Bar, _super);

  function Bar(core) {
    Bar.__super__.constructor.call(this, core);
    this._buttons = [];
  }

  Bar.prototype.init = function() {
    var button, _i, _len, _ref;
    _ref = this._buttons;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      button = _ref[_i];
      button.init();
    }
    return this;
  };

  Bar.prototype.addButton = function(button) {
    this._buttons.push(button);
    return this.element.append(button.element);
  };

  return Bar;

})(Panel);

Toolbar = (function(_super) {

  __extends(Toolbar, _super);

  function Toolbar(core) {
    Toolbar.__super__.constructor.call(this, core);
    this.element.addClass('toolbar');
  }

  return Toolbar;

})(Bar);

Statusbar = (function(_super) {

  __extends(Statusbar, _super);

  function Statusbar(core) {
    Statusbar.__super__.constructor.call(this, core);
    this.element.addClass('statusbar');
  }

  return Statusbar;

})(Bar);
