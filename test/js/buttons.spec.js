var Button, Separator;

if (!(typeof window !== "undefined" && window !== null)) {
  return;
}

Separator = Jencil.buttons.Separator;

Button = Jencil.buttons.Button;

describe('Jencil.buttons.Separator(core) -> instance', function() {
  it('should be found on `Jencil.buttons.Separator`', function() {
    return Separator.should.be.equal(Jencil.buttons.Separator);
  });
  return it('should add `separator` class', function() {
    var instance;
    instance = new Separator(null);
    return instance.element.hasClass('separator').should.be["true"];
  });
});

describe('Jencil.buttons.Button(core, name, text, title) -> instance', function() {
  var sandbox;
  sandbox = null;
  beforeEach(function() {
    return sandbox = sinon.sandbox.create();
  });
  afterEach(function() {
    return sandbox.verifyAndRestore();
  });
  it('should be found on `Jencil.buttons.Button`', function() {
    return Button.should.be.equal(Jencil.buttons.Button);
  });
  it('should add `button` and name class', function() {
    var instance;
    instance = new Button(null, 'foobar');
    instance.element.hasClass('button').should.be["true"];
    return instance.element.hasClass('foobar').should.be["true"];
  });
  it('should add title attr', function() {
    var instance;
    instance = new Button(null, '', '', 'foobar');
    instance.element.attr('title', 'foobar');
    instance = new Button(null, '', 'foobar');
    instance.element.attr('title', 'foobar');
    instance = new Button(null, 'foobar');
    return instance.element.attr('title', 'foobar');
  });
  it('should add text span', function() {
    var instance;
    instance = new Button(null, '', 'foobar');
    instance.element.html().should.be.equal('<span>foobar</span>');
    instance = new Button(null, 'foobar');
    return instance.element.html().should.be.equal('<span>foobar</span>');
  });
  describe('#init() -> instance', function() {
    var instance;
    instance = new Button(null, '', '', '');
    it('should be an instance property', function() {
      return instance.should.have.property('init').a('function');
    });
    return it('should call validate method and return the instance', function() {
      sandbox.mock(instance).expects('validate').once();
      return instance.init().should.be.equal(instance);
    });
  });
  describe('#enable() -> instance', function() {
    var instance;
    instance = new Button(null, '', '', '');
    it('should be an instance property', function() {
      return instance.should.have.property('enable').a('function');
    });
    return it('should remove `disable` class and return the instance', function() {
      instance.element.addClass('disable');
      instance.enable().should.be.equal(instance);
      return instance.element.hasClass('disable').should.be["false"];
    });
  });
  describe('#disable() -> instance', function() {
    var instance;
    instance = new Button(null, '', '', '');
    it('should be an instance property', function() {
      return instance.should.have.property('disable').a('function');
    });
    return it('should add `disable` class and return the instance', function() {
      instance.element.removeClass('disable');
      instance.disable().should.be.equal(instance);
      return instance.element.hasClass('disable').should.be["true"];
    });
  });
  return describe('#validate() -> instance', function() {
    var instance;
    instance = new Button(null, '', '', '');
    it('should be an instance property', function() {
      return instance.should.have.property('validate').a('function');
    });
    return it('should return the instance', function() {
      return instance.validate().should.be.equal(instance);
    });
  });
});

describe('Jencil.buttons.ActionButton(core, name, text, title, callback, shortcut) -> instance', function() {
  var sandbox;
  sandbox = null;
  beforeEach(function() {
    return sandbox = sinon.sandbox.create();
  });
  afterEach(function() {
    return sandbox.verifyAndRestore();
  });
  it('should be found on `Jencil.buttons.ActionButton`', function() {
    return ActionButton.should.be.equal(Jencil.buttons.ActionButton);
  });
  if (window.shortcut != null) {
    it('should add keyboard shortcut when it is specified', function() {
      var callback, instance;
      sandbox.mock(window.shortcut).expects('add').once();
      callback = function() {
        return this;
      };
      instance = new ActionButton(null, "foobar", null, null, callback, "Ctrl+S");
      return instance.element.attr('title').should.be.equal('foobar (Ctrl+S)');
    });
  }
  return describe('#callback() -> instance', function() {
    var callback, instance;
    callback = function() {
      return this;
    };
    instance = new ActionButton(null, "", "", "", callback);
    it('should be an instance property', function() {
      return instance.should.have.property('callback').a('function');
    });
    it('should call callback and return the instance', function() {
      sandbox.mock(instance.callback).expects('raw').once();
      return instance.callback().should.be.equal(instance);
    });
    return it('should not call callback when the button is disabled', function() {
      sandbox.mock(instance.callback).expects('raw').never();
      instance.disable();
      return instance.callback().should.be.equal(instance);
    });
  });
});

describe('Jencil.buttons.CommandButton(core, name, text, title, command, shortcut) -> instance', function() {
  var sandbox;
  sandbox = null;
  beforeEach(function() {
    return sandbox = sinon.sandbox.create();
  });
  afterEach(function() {
    return sandbox.verifyAndRestore();
  });
  it('should be found on `Jencil.buttons.CommandButton`', function() {
    return CommandButton.should.be.equal(Jencil.buttons.CommandButton);
  });
  return describe('#validate() -> instance', function() {
    var core, instance;
    core = {
      'editor': function() {
        return {
          'foobar': function() {
            return this;
          }
        };
      }
    };
    instance = new CommandButton(core, "foobar", null, null, 'foobar');
    it('should be an instance property', function() {
      return instance.should.have.property('validate').a('function');
    });
    it('should do nothing if the command exists and return the instance', function() {
      sandbox.mock(instance).expects('disable').never();
      instance.validate().should.be.equal(instance);
      return instance.element.hasClass('disable').should.be["false"];
    });
    return it('should call disable method if the command does not exists', function() {
      var instance2;
      instance2 = new CommandButton(core, "pafupafu", null, null, 'nonexists');
      sandbox.mock(instance2).expects('disable').once();
      return instance2.validate().should.be.equal(instance2);
    });
  });
});
