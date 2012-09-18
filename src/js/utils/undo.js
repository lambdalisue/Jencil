var Caretaker, Originator;

Originator = (function() {

  function Originator() {}

  Originator.prototype.createMemento = function() {
    throw new Error("NotImplementedError");
  };

  Originator.prototype.setMemento = function(memento) {
    throw new Error("NotImplementedError");
  };

  /* DEBUG---
  */


  Originator.validate = function(instance) {
    if (!(instance.createMemento != null)) {
      throw new Error("Originator instance need `createMemento` method");
    }
    if (!(instance.setMemento != null)) {
      throw new Error("Originator instance need `setMemento` method");
    }
  };

  /* ---DEBUG
  */


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
      /* DEBUG---
      */

      Originator.validate(originator);
      /* ---DEBUG
      */

      this._originator = originator;
      return this;
    }
    return originator;
  };

  Caretaker.prototype.save = function(memento) {
    memento = memento || this.originator().createMemento();
    this._undoStack.push(memento);
    return this._redoStack = [];
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
