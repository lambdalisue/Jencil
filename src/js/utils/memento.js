var Caretaker, Command, DummyCommand, Originator,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Command = (function() {

  function Command(receiver, callback) {
    var _this = this;
    this._receiver = receiver;
    this._callback = callback || function() {
      return _this.callback();
    };
  }

  Command.prototype.callback = function() {
    throw "NotImplementedError";
  };

  Command.prototype.getReceiver = function() {
    return this._receiver;
  };

  Command.prototype.getCallback = function() {
    return this._callback;
  };

  Command.prototype.invoke = function() {
    var callback, receiver;
    receiver = this.getReceiver();
    callback = this.getCallback();
    this._prev = receiver.createMemento();
    callback.call(receiver);
    return this._next = receiver.createMemento();
  };

  Command.prototype.undo = function() {
    var receiver;
    receiver = this.getReceiver();
    return receiver.setMemento(this._prev);
  };

  Command.prototype.redo = function() {
    var receiver;
    receiver = this.getReceiver();
    return receiver.setMemento(this._next);
  };

  return Command;

})();

DummyCommand = (function(_super) {

  __extends(DummyCommand, _super);

  function DummyCommand(receiver) {
    DummyCommand.__super__.constructor.call(this, receiver, function() {
      return this;
    });
  }

  return DummyCommand;

})(Command);

Originator = (function() {

  function Originator() {}

  Originator.prototype.createMemento = function() {
    throw "NotImplementedError";
  };

  Originator.prototype.setMemento = function(memento) {
    throw "NotImplementedError";
  };

  return Originator;

})();

Caretaker = (function() {

  function Caretaker() {
    this._undoStack = [];
    this._redoStack = [];
  }

  Caretaker.prototype.invoke = function(command) {
    command.invoke();
    this._redoStack = [];
    return this._undoStack.push(command);
  };

  Caretaker.prototype.undo = function() {
    var command;
    if (!this.canUndo()) {
      return false;
    }
    command = this._undoStack.pop();
    command.undo();
    this._redoStack.push(command);
    return true;
  };

  Caretaker.prototype.redo = function() {
    var command;
    if (!this.canRedo()) {
      return false;
    }
    command = this._redoStack.pop();
    command.redo();
    this._undoStack.push(command);
    return true;
  };

  Caretaker.prototype.canUndo = function() {
    return this._undoStack.length > 0;
  };

  Caretaker.prototype.canRedo = function() {
    return this._redoStack.length > 0;
  };

  return Caretaker;

})();
