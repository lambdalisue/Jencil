var ActionButton, Button, CommandButton, EditorMarkupButton, Separator,
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

  function Button(core, name, title) {
    this.name = name;
    this.title = title;
    Button.__super__.constructor.call(this, core, '<a>');
    this.element.addClass('button').addClass(name);
    this.element.append($("<span>" + name + "</span>"));
    if (this.title != null) {
      if (($.i18n != null) && ($.t != null)) {
        this.title = $.t(this.title);
      }
      this.element.attr('title', this.title);
    }
  }

  return Button;

})(Widget);

ActionButton = (function(_super) {

  __extends(ActionButton, _super);

  function ActionButton(core, name, title, callback, shortcut) {
    var _this = this;
    this.callback = callback;
    this.shortcut = shortcut;
    ActionButton.__super__.constructor.call(this, core, name, title);
    this.element.click(function() {
      return _this.callback();
    });
    if ((this.shortcut != null) && (window.shortcut != null)) {
      window.shortcut.add(this.shortcut, function() {
        return _this.callback();
      });
      this.element.attr('title', "" + name + " (" + this.shortcut + ")");
    }
  }

  return ActionButton;

})(Button);

CommandButton = (function(_super) {

  __extends(CommandButton, _super);

  function CommandButton(core, name, title, command, shortcut) {
    var callback,
      _this = this;
    this.command = command;
    callback = function() {
      return _this.core.caretaker.invoke(_this.command);
    };
    CommandButton.__super__.constructor.call(this, core, name, title, callback, shortcut);
  }

  return CommandButton;

})(ActionButton);

EditorMarkupButton = (function(_super) {

  __extends(EditorMarkupButton, _super);

  function EditorMarkupButton(core, name, title, shortcut) {
    var command;
    command = new EditorMarkupCommand(core, name);
    EditorMarkupButton.__super__.constructor.call(this, core, name, title, command, shortcut);
  }

  return EditorMarkupButton;

})(CommandButton);
