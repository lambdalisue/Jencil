var ActionButton, Button, CommandButton, FullscreenButton, HelperButton, RedoButton, Separator, UndoButton, ViewerButton, buttonFactory,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Separator = (function(_super) {

  __extends(Separator, _super);

  function Separator(core) {
    Separator.__super__.constructor.call(this, core, '<span>');
    this.element.addClass('separator');
  }

  return Separator;

})(Widget);

Button = (function(_super) {

  __extends(Button, _super);

  function Button(core, name, text, title) {
    this.name = name;
    this.text = text;
    this.title = title;
    Button.__super__.constructor.call(this, core, '<a>');
    this.text = Jencil.t(this.text || this.name);
    this.title = Jencil.t(this.title || this.text);
    this.element.addClass('button').addClass(name);
    this.element.append($("<span>" + this.text + "</span>"));
    this.element.attr('title', this.title);
  }

  Button.prototype.enable = function() {
    this.element.removeClass('disable');
    return this;
  };

  Button.prototype.disable = function() {
    this.element.addClass('disable');
    return this;
  };

  Button.prototype.init = function() {
    this.validate();
    return this;
  };

  Button.prototype.validate = function() {
    return this;
  };

  return Button;

})(Widget);

ActionButton = (function(_super) {

  __extends(ActionButton, _super);

  function ActionButton(core, name, text, title, callback, shortcut) {
    var _this = this;
    this.shortcut = shortcut;
    ActionButton.__super__.constructor.call(this, core, name, text, title);
    this.callback = function() {
      if (!_this.element.hasClass('disable')) {
        _this.callback.raw();
      }
      return _this;
    };
    this.callback.raw = callback;
    this.element.click(function() {
      return _this.callback();
    });
    if ((this.shortcut != null) && (window.shortcut != null)) {
      window.shortcut.add(this.shortcut, function(e) {
        return _this.callback();
      });
      this.element.attr('title', "" + this.title + " (" + this.shortcut + ")");
    }
  }

  return ActionButton;

})(Button);

CommandButton = (function(_super) {

  __extends(CommandButton, _super);

  function CommandButton(core, name, text, title, command, shortcut) {
    var callback;
    this.command = command;
    callback = function() {
      var editor;
      editor = core.editor();
      return editor[command].call(editor);
    };
    CommandButton.__super__.constructor.call(this, core, name, text, title, callback, shortcut);
  }

  CommandButton.prototype.validate = function() {
    var editor;
    editor = this.core.editor();
    if (!(editor[this.command] != null)) {
      this.disable();
    }
    return this;
  };

  CommandButton.factory = function(core, args) {
    var command, name, shortcut, text, title;
    name = text = title = command = shortcut = null;
    switch (args.length) {
      case 5:
        name = args[0];
        text = args[1];
        title = args[2];
        command = args[3];
        shortcut = args[4];
        break;
      case 4:
        name = args[0];
        text = title = args[1];
        command = args[2];
        shortcut = args[3];
        break;
      case 3:
        name = command = args[0];
        text = title = args[1];
        shortcut = args[2];
        break;
      case 2:
        name = command = args[0];
        text = title = args[1];
        shortcut = null;
        break;
      case 1:
        name = command = text = title = args[0];
        shortcut = null;
    }
    return new CommandButton(core, name, text, title, command, shortcut);
  };

  return CommandButton;

})(ActionButton);

UndoButton = (function(_super) {

  __extends(UndoButton, _super);

  function UndoButton(core) {
    var callback,
      _this = this;
    callback = function(e) {
      return _this.core.caretaker.undo();
    };
    UndoButton.__super__.constructor.call(this, core, 'undo', 'Undo', 'Undo', callback, 'Ctrl+Z');
  }

  UndoButton.prototype.init = function() {
    var check,
      _this = this;
    check = function() {
      if (_this.core.caretaker.canUndo() === false) {
        _this.disable();
      } else {
        _this.enable();
      }
      return setTimeout(check, 100);
    };
    return check();
  };

  return UndoButton;

})(ActionButton);

RedoButton = (function(_super) {

  __extends(RedoButton, _super);

  function RedoButton(core) {
    var callback,
      _this = this;
    callback = function(e) {
      return _this.core.caretaker.redo();
    };
    RedoButton.__super__.constructor.call(this, core, 'redo', 'Redo', 'Redo', callback, 'Ctrl+Shift+Z');
  }

  RedoButton.prototype.init = function() {
    var check,
      _this = this;
    check = function() {
      if (_this.core.caretaker.canRedo() === false) {
        _this.disable();
      } else {
        _this.enable();
      }
      return setTimeout(check, 100);
    };
    return check();
  };

  return RedoButton;

})(ActionButton);

FullscreenButton = (function(_super) {

  __extends(FullscreenButton, _super);

  function FullscreenButton(core) {
    var callback,
      _this = this;
    callback = function(e) {
      return _this.core.fullscreen.toggle();
    };
    FullscreenButton.__super__.constructor.call(this, core, 'fullscreen', 'Toggle fullscreen', 'Fullscreen', callback, 'Ctrl+F');
  }

  FullscreenButton.prototype.init = function() {
    var check,
      _this = this;
    check = function() {
      if (_this.core.fullscreen.element.is(':visible') === true) {
        _this.element.addClass('hide');
      } else {
        _this.element.removeClass('hide');
      }
      return setTimeout(check, 100);
    };
    return check();
  };

  return FullscreenButton;

})(ActionButton);

ViewerButton = (function(_super) {

  __extends(ViewerButton, _super);

  function ViewerButton(core) {
    var callback,
      _this = this;
    callback = function(e) {
      return _this.core.viewer().toggle();
    };
    ViewerButton.__super__.constructor.call(this, core, 'viewer', 'Quick view', 'Quick view', callback, 'Ctrl+Q');
  }

  ViewerButton.prototype.validate = function() {
    if (!(this.core.viewer() != null)) {
      this.disable();
      return false;
    }
    return true;
  };

  ViewerButton.prototype.init = function() {
    var check,
      _this = this;
    if (!this.validate()) {
      return;
    }
    check = function() {
      if (_this.core.viewer().element.is(':visible')) {
        _this.element.addClass('hide');
      } else {
        _this.element.removeClass('hide');
      }
      return setTimeout(check, 100);
    };
    return check();
  };

  return ViewerButton;

})(ActionButton);

HelperButton = (function(_super) {

  __extends(HelperButton, _super);

  function HelperButton(core) {
    var callback,
      _this = this;
    callback = function(e) {
      return _this.core.helper().toggle();
    };
    HelperButton.__super__.constructor.call(this, core, 'helper', 'Help', 'Help', callback, 'Ctrl+H');
  }

  HelperButton.prototype.validate = function() {
    if (!this.core.helper()) {
      this.disable();
      return false;
    }
    return true;
  };

  HelperButton.prototype.init = function() {
    var check,
      _this = this;
    if (!this.validate()) {
      return;
    }
    check = function() {
      if (_this.core.helper().element.is(':visible')) {
        _this.element.addClass('hide');
      } else {
        _this.element.removeClass('hide');
      }
      return setTimeout(check, 100);
    };
    return check();
  };

  return HelperButton;

})(ActionButton);

buttonFactory = function(core, value) {
  if (value instanceof Array) {
    return CommandButton.factory(core, value);
  }
  if (typeof value === 'string') {
    switch (value) {
      case 'Separator':
        return new Separator(core);
      case 'Undo':
        return new UndoButton(core);
      case 'Redo':
        return new RedoButton(core);
      case 'Fullscreen':
        return new FullscreenButton(core);
      case 'Viewer':
        return new ViewerButton(core);
      case 'Helper':
        return new HelperButton(core);
      default:
        throw new Exception("" + value + " is not known Button type");
    }
  }
  return new value(core);
};

namespace('Jencil.buttons', function(exports) {
  exports.Separator = Separator;
  exports.Button = Button;
  exports.ActionButton = ActionButton;
  exports.CommandButton = CommandButton;
  exports.UndoButton = UndoButton;
  exports.RedoButton = RedoButton;
  exports.FullscreenButton = FullscreenButton;
  exports.ViewerButton = ViewerButton;
  exports.HelperButton = HelperButton;
  return exports.buttonFactory = buttonFactory;
});
