var Caretaker, NotImplementedError, Originator;

NotImplementedError = (function() {

  function NotImplementedError() {}

  NotImplementedError.prototype.name = 'Not implemeted error';

  NotImplementedError.prototype.message = 'The function has not implemented yet';

  return NotImplementedError;

})();

Originator = (function() {

  function Originator() {}

  Originator.prototype.createMemento = function() {
    throw new NotImplementedError;
  };

  Originator.prototype.setMemento = function(memento) {
    throw new NotImplementedError;
  };

  return Originator;

})();

Caretaker = (function() {

  function Caretaker(originator) {
    this._originator = originator;
    this._undoStack = [];
    this._redoStack = [];
  }

  Caretaker.prototype.originator = function(originator) {
    if (originator != null) {
      this._originator = originator;
      return this;
    }
    return this._originator;
  };

  Caretaker.prototype.save = function(memento) {
    memento = memento || this.originator().createMemento();
    this._undoStack.push(memento);
    this._redoStack = [];
    return this;
  };

  Caretaker.prototype.undo = function() {
    var originator;
    if (!this.canUndo()) {
      return false;
    }
    originator = this.originator();
    this._redoStack.push(originator.createMemento());
    originator.setMemento(this._undoStack.pop());
    if (typeof originator.focus === "function") {
      originator.focus();
    }
    return true;
  };

  Caretaker.prototype.redo = function() {
    var originator;
    if (!this.canRedo()) {
      return false;
    }
    originator = this.originator();
    this._undoStack.push(originator.createMemento());
    originator.setMemento(this._redoStack.pop());
    if (typeof originator.focus === "function") {
      originator.focus();
    }
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

if (typeof exports !== "undefined" && exports !== null) {
  exports.NotImplementedError = NotImplementedError;
  exports.Originator = Originator;
  exports.Caretaker = Caretaker;
}
