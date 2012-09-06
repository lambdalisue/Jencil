var CommandBase, EditorCommand, EditorMarkupCommand,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CommandBase = (function(_super) {

  __extends(CommandBase, _super);

  function CommandBase(core, receiver, callback) {
    this.core = core;
    CommandBase.__super__.constructor.call(this, receiver, callback);
  }

  return CommandBase;

})(Command);

EditorCommand = (function(_super) {

  __extends(EditorCommand, _super);

  function EditorCommand(core, callback) {
    EditorCommand.__super__.constructor.call(this, core, null, callback);
  }

  EditorCommand.prototype.getReceiver = function() {
    return this.core.getEditor();
  };

  return EditorCommand;

})(CommandBase);

EditorMarkupCommand = (function(_super) {

  __extends(EditorMarkupCommand, _super);

  function EditorMarkupCommand(core, name) {
    this.name = name;
    EditorMarkupCommand.__super__.constructor.call(this, core, null);
  }

  EditorMarkupCommand.prototype.getCallback = function() {
    var receiver;
    receiver = this.getReceiver();
    return receiver[this.name];
  };

  return EditorMarkupCommand;

})(EditorCommand);
