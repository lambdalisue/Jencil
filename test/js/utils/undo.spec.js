var Caretaker, NotImplementedError, Originator, undo,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

undo = null;

if (!(typeof window !== "undefined" && window !== null)) {
  undo = require('../../../src/js/utils/undo.js');
} else {
  undo = Jencil.utils.undo;
}

NotImplementedError = undo.NotImplementedError;

Originator = undo.Originator;

Caretaker = undo.Caretaker;

describe('Jencil.utils.undo.Originator():Abstract => object', function() {
  var instance;
  instance = new Originator();
  describe('#createMemento() => object', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('createMemento').a('function');
    });
    return it('should throw NotImplementedError', function() {
      return instance.createMemento.should["throw"](NotImplementedError);
    });
  });
  return describe('#setMemento() => object', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('setMemento').a('function');
    });
    return it('should throw NotImplementedError', function() {
      return instance.setMemento.should["throw"](NotImplementedError);
    });
  });
});

describe('Jencil.utils.undo.Caretaker(originator) => object', function() {
  var FakeOriginator, instance, originator;
  FakeOriginator = (function(_super) {

    __extends(FakeOriginator, _super);

    function FakeOriginator() {
      this.counter = 0;
    }

    FakeOriginator.prototype.createMemento = function() {
      return this.counter;
    };

    FakeOriginator.prototype.setMemento = function(memento) {
      this.counter = memento;
      return this;
    };

    FakeOriginator.prototype.increment = function() {
      return this.counter += 1;
    };

    return FakeOriginator;

  })(Originator);
  originator = instance = null;
  beforeEach(function() {
    originator = new FakeOriginator();
    return instance = new Caretaker(originator);
  });
  describe('#originator(originator) => instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('originator').a('function');
    });
    it('should return originator instance', function() {
      return instance.originator().should.be.equal(originator);
    });
    return it('should set originator and return the instance', function() {
      instance.originator("fake").should.be.equal(instance);
      return instance.originator().should.be.equal("fake");
    });
  });
  describe('#save(memento) => instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('save').a('function');
    });
    it('should save the memento and return the instance', function() {
      instance.save("fake").should.be.equal(instance);
      instance._undoStack.length.should.be.equal(1);
      return instance._undoStack[0].should.be.equal("fake");
    });
    return it('should save the current memento of the originator and return the instance', function() {
      originator.increment();
      instance.save().should.be.equal(instance);
      instance._undoStack.length.should.be.equal(1);
      return instance._undoStack[0].should.be.equal(1);
    });
  });
  describe('#undo() -> bool', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('undo').a('function');
    });
    it('should return false if no backward mementos has saved', function() {
      return instance.undo().should.be.equal(false);
    });
    return it('should return true and change the statement of originator', function() {
      instance.save();
      originator.increment();
      instance.undo().should.be.equal(true);
      return originator.counter.should.be.equal(0);
    });
  });
  describe('#redo() -> bool', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('redo').a('function');
    });
    it('should return false if no forward mementos has saved', function() {
      return instance.redo().should.be.equal(false);
    });
    return it('should return true and change the statement of originator', function() {
      instance.save();
      originator.increment();
      instance.undo();
      instance.redo().should.be.equal(true);
      return originator.counter.should.be.equal(1);
    });
  });
  describe('#canUndo() -> bool', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('canUndo').a('function');
    });
    it('should return false if no backward mementos has saved', function() {
      return instance.canUndo().should.be.equal(false);
    });
    return it('should return true if there are backward mementos', function() {
      instance.save();
      return instance.canUndo().should.be.equal(true);
    });
  });
  return describe('#canRedo() -> bool', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('canRedo').a('function');
    });
    it('should return false if no forward mementos has saved', function() {
      return instance.canRedo().should.be.equal(false);
    });
    return it('should return true if there are forward mementos', function() {
      instance.save();
      instance.undo();
      return instance.canRedo().should.be.equal(true);
    });
  });
});
