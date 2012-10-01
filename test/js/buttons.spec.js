var Button, Separator;

if (!(typeof window !== "undefined" && window !== null)) {
  return;
}

Separator = Jencil.buttons.Separator;

Button = Jencil.buttons.Button;

describe('Jencil.buttons.Separator(core) extends Widget -> instance', function() {
  it('should be found on `Jencil.buttons.Separator`', function() {
    return Separator.should.be.equal(Jencil.buttons.Separator);
  });
  return it('should add `separator` class', function() {
    var instance;
    instance = new Separator(null);
    return instance.element.hasClass('separator').should.be["true"];
  });
});

describe('Jencil.buttons.Button(core, name, text, title) extends Widget -> instance', function() {
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

describe('Jencil.buttons.ActionButton(core, name, text, title, callback, shortcut) extends Button -> instance', function() {
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

describe('Jencil.buttons.CommandButton(core, name, text, title, command, shortcut) extends ActionButton -> instance', function() {
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
  describe('#validate() -> instance', function() {
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
  return describe('@factory(core, args) -> instance', function() {
    var command, core, name, shortcut, text, title;
    core = {
      'editor': function() {
        return {
          'foobar': function() {
            return this;
          }
        };
      }
    };
    name = 'name';
    text = 'text';
    title = 'title';
    command = 'bold';
    shortcut = 'Ctrl+A';
    it('should be an class property', function() {
      return CommandButton.should.have.property('factory').a('function');
    });
    it('should return an instance of CommandButton with 5 args', function() {
      var instance;
      instance = CommandButton.factory(core, [name, text, title, command, shortcut]);
      instance.name.should.be.equal(name);
      instance.text.should.be.equal(text);
      instance.title.should.be.equal(title);
      instance.command.should.be.equal(command);
      return instance.shortcut.should.be.equal(shortcut);
    });
    it('should return an instance of CommandButton with 4 args', function() {
      var instance;
      instance = CommandButton.factory(core, [name, text, command, shortcut]);
      instance.name.should.be.equal(name);
      instance.text.should.be.equal(text);
      instance.title.should.be.equal(text);
      instance.command.should.be.equal(command);
      return instance.shortcut.should.be.equal(shortcut);
    });
    it('should return an instance of CommandButton with 3 args', function() {
      var instance;
      instance = CommandButton.factory(core, [name, text, shortcut]);
      instance.name.should.be.equal(name);
      instance.text.should.be.equal(text);
      instance.title.should.be.equal(text);
      instance.command.should.be.equal(name);
      return instance.shortcut.should.be.equal(shortcut);
    });
    it('should return an instance of CommandButton with 2 args', function() {
      var instance;
      instance = CommandButton.factory(core, [name, text]);
      instance.name.should.be.equal(name);
      instance.text.should.be.equal(text);
      instance.title.should.be.equal(text);
      instance.command.should.be.equal(name);
      return expect(instance.shortcut).be["null"];
    });
    return it('should return an instance of CommandButton with 1 arg', function() {
      var instance;
      instance = CommandButton.factory(core, [name]);
      instance.name.should.be.equal(name);
      instance.text.should.be.equal(name);
      instance.title.should.be.equal(name);
      instance.command.should.be.equal(name);
      return expect(instance.shortcut).be["null"];
    });
  });
});

describe('Jencil.buttons.UndoButton(core) extends ActionButton -> instance', function() {
  var core, sandbox;
  sandbox = null;
  beforeEach(function() {
    return sandbox = sinon.sandbox.create();
  });
  afterEach(function() {
    return sandbox.verifyAndRestore();
  });
  core = {
    'caretaker': {
      'undo': function() {
        return this;
      }
    }
  };
  it('should be found on `Jencil.buttons.UndoButton`', function() {
    return UndoButton.should.be.equal(Jencil.buttons.UndoButton);
  });
  it('callback call `core.caretaker.undo()` method', function() {
    var instance, spy;
    instance = new UndoButton(core);
    spy = sandbox.spy(core.caretaker, 'undo');
    instance.callback();
    return spy.called.should.be["true"];
  });
  return it('check whether it is possible to undo and change the status', function() {
    var instance, spy1, spy2, spy3;
    core.caretaker.canUndo = function() {
      return true;
    };
    instance = new UndoButton(core);
    spy1 = sandbox.spy(core.caretaker, 'canUndo');
    spy2 = sandbox.spy(instance, 'disable');
    spy3 = sandbox.spy(instance, 'enable');
    instance.init();
    spy1.called.should.be["true"];
    spy2.called.should.be["false"];
    spy3.called.should.be["true"];
    sandbox.restore();
    core.caretaker.canUndo = function() {
      return false;
    };
    instance = new UndoButton(core);
    spy1 = sandbox.spy(core.caretaker, 'canUndo');
    spy2 = sandbox.spy(instance, 'disable');
    spy3 = sandbox.spy(instance, 'enable');
    instance.init();
    spy1.called.should.be["true"];
    spy2.called.should.be["true"];
    return spy3.called.should.be["false"];
  });
});

describe('Jencil.buttons.RedoButton(core) extends ActionButton -> instance', function() {
  var core, sandbox;
  sandbox = null;
  beforeEach(function() {
    return sandbox = sinon.sandbox.create();
  });
  afterEach(function() {
    return sandbox.verifyAndRestore();
  });
  core = {
    'caretaker': {
      'redo': function() {
        return this;
      }
    }
  };
  it('should be found on `Jencil.buttons.RedoButton`', function() {
    return RedoButton.should.be.equal(Jencil.buttons.RedoButton);
  });
  it('callback call `core.caretaker.redo()` method', function() {
    var instance, spy;
    instance = new RedoButton(core);
    spy = sandbox.spy(core.caretaker, 'redo');
    instance.callback();
    return spy.called.should.be["true"];
  });
  return it('check whether it is possible to redo and change the status', function() {
    var instance, spy1, spy2, spy3;
    core.caretaker.canRedo = function() {
      return true;
    };
    instance = new RedoButton(core);
    spy1 = sandbox.spy(core.caretaker, 'canRedo');
    spy2 = sandbox.spy(instance, 'disable');
    spy3 = sandbox.spy(instance, 'enable');
    instance.init();
    spy1.called.should.be["true"];
    spy2.called.should.be["false"];
    spy3.called.should.be["true"];
    sandbox.restore();
    core.caretaker.canRedo = function() {
      return false;
    };
    instance = new RedoButton(core);
    spy1 = sandbox.spy(core.caretaker, 'canRedo');
    spy2 = sandbox.spy(instance, 'disable');
    spy3 = sandbox.spy(instance, 'enable');
    instance.init();
    spy1.called.should.be["true"];
    spy2.called.should.be["true"];
    return spy3.called.should.be["false"];
  });
});

describe('Jencil.buttons.FullscreenButton(core) extends ActionButton -> instance', function() {
  var core, sandbox;
  sandbox = null;
  beforeEach(function() {
    return sandbox = sinon.sandbox.create();
  });
  afterEach(function() {
    return sandbox.verifyAndRestore();
  });
  core = {
    'fullscreen': {
      'toggle': function() {
        return this;
      },
      'element': {}
    }
  };
  it('should be found on `Jencil.buttons.FullscreenButton`', function() {
    return FullscreenButton.should.be.equal(Jencil.buttons.FullscreenButton);
  });
  it('callback call `core.fullscreen.toggle()` method', function() {
    var instance, spy;
    instance = new FullscreenButton(core);
    spy = sandbox.spy(core.fullscreen, 'toggle');
    instance.callback();
    return spy.called.should.be["true"];
  });
  return it('check whether fullscreen or not and change the status', function() {
    var instance, spy1, spy2, spy3;
    core.fullscreen.element.is = function() {
      return false;
    };
    instance = new FullscreenButton(core);
    spy1 = sandbox.spy(core.fullscreen.element, 'is');
    spy2 = sandbox.spy(instance.element, 'addClass');
    spy3 = sandbox.spy(instance.element, 'removeClass');
    instance.init();
    spy1.called.should.be["true"];
    spy1.returnValues.should.be.eql([false]);
    spy2.called.should.be["false"];
    spy3.called.should.be["true"];
    instance.element.hasClass('hide').should.be["false"];
    core.fullscreen.element.is = function() {
      return true;
    };
    instance = new FullscreenButton(core);
    spy1 = sandbox.spy(core.fullscreen.element, 'is');
    spy2 = sandbox.spy(instance.element, 'addClass');
    spy3 = sandbox.spy(instance.element, 'removeClass');
    instance.init();
    spy1.called.should.be["true"];
    spy1.returnValues.should.be.eql([true]);
    spy2.called.should.be["true"];
    spy3.called.should.be["false"];
    return instance.element.hasClass('hide').should.be["true"];
  });
});

describe('Jencil.buttons.ViewerButton(core) extends ActionButton -> instance', function() {
  var core, sandbox, viewer;
  sandbox = null;
  beforeEach(function() {
    return sandbox = sinon.sandbox.create();
  });
  afterEach(function() {
    return sandbox.verifyAndRestore();
  });
  viewer = {
    toggle: function() {
      return this;
    },
    element: {}
  };
  core = {
    viewer: function() {
      return viewer;
    }
  };
  it('should be found on `Jencil.buttons.ViewerButton`', function() {
    return ViewerButton.should.be.equal(Jencil.buttons.ViewerButton);
  });
  it('callback call `core.viewer().toggle()` method', function() {
    var instance, spy1, spy2;
    instance = new ViewerButton(core);
    spy1 = sandbox.spy(core, 'viewer');
    spy2 = sandbox.spy(viewer, 'toggle');
    instance.callback();
    spy1.called.should.be["true"];
    return spy2.called.should.be["true"];
  });
  it('validate whether the viewer is available', function() {
    var instance, spy1, spy2;
    core.viewer = function() {
      return viewer;
    };
    instance = new ViewerButton(core);
    spy1 = sandbox.spy(core, 'viewer');
    spy2 = sandbox.spy(instance, 'disable');
    instance.validate().should.be["true"];
    spy1.called.should.be["true"];
    spy2.called.should.be["false"];
    sandbox.restore();
    core.viewer = function() {
      return null;
    };
    instance = new ViewerButton(core);
    spy1 = sandbox.spy(core, 'viewer');
    spy2 = sandbox.spy(instance, 'disable');
    instance.validate().should.be["false"];
    spy1.called.should.be["true"];
    return spy2.called.should.be["true"];
  });
  return it('check whether the viewer is visible and change the status', function() {
    var instance, spy1, spy2, spy3;
    core.viewer = function() {
      return viewer;
    };
    viewer.element.is = function() {
      return false;
    };
    instance = new ViewerButton(core);
    spy1 = sandbox.spy(viewer.element, 'is');
    spy2 = sandbox.spy(instance.element, 'addClass');
    spy3 = sandbox.spy(instance.element, 'removeClass');
    instance.init();
    spy1.called.should.be["true"];
    spy1.returnValues.should.be.eql([false]);
    spy2.called.should.be["false"];
    spy3.called.should.be["true"];
    instance.element.hasClass('hide').should.be["false"];
    sandbox.restore();
    core.viewer = function() {
      return viewer;
    };
    viewer.element.is = function() {
      return true;
    };
    instance = new ViewerButton(core);
    spy1 = sandbox.spy(viewer.element, 'is');
    spy2 = sandbox.spy(instance.element, 'addClass');
    spy3 = sandbox.spy(instance.element, 'removeClass');
    instance.init();
    spy1.called.should.be["true"];
    spy1.returnValues.should.be.eql([true]);
    spy2.called.should.be["true"];
    spy3.called.should.be["false"];
    return instance.element.hasClass('hide').should.be["true"];
  });
});

describe('Jencil.buttons.HelperButton(core) extends ActionButton -> instance', function() {
  var core, helper, sandbox;
  sandbox = null;
  beforeEach(function() {
    return sandbox = sinon.sandbox.create();
  });
  afterEach(function() {
    return sandbox.verifyAndRestore();
  });
  helper = {
    toggle: function() {
      return this;
    },
    element: {}
  };
  core = {
    helper: function() {
      return helper;
    }
  };
  it('should be found on `Jencil.buttons.HelperButton`', function() {
    return HelperButton.should.be.equal(Jencil.buttons.HelperButton);
  });
  it('callback call `core.helper().toggle()` method', function() {
    var instance, spy1, spy2;
    instance = new HelperButton(core);
    spy1 = sandbox.spy(core, 'helper');
    spy2 = sandbox.spy(helper, 'toggle');
    instance.callback();
    spy1.called.should.be["true"];
    return spy2.called.should.be["true"];
  });
  it('validate whether the helper is available', function() {
    var instance, spy1, spy2;
    core.helper = function() {
      return helper;
    };
    instance = new HelperButton(core);
    spy1 = sandbox.spy(core, 'helper');
    spy2 = sandbox.spy(instance, 'disable');
    instance.validate().should.be["true"];
    spy1.called.should.be["true"];
    spy2.called.should.be["false"];
    sandbox.restore();
    core.helper = function() {
      return null;
    };
    instance = new HelperButton(core);
    spy1 = sandbox.spy(core, 'helper');
    spy2 = sandbox.spy(instance, 'disable');
    instance.validate().should.be["false"];
    spy1.called.should.be["true"];
    return spy2.called.should.be["true"];
  });
  return it('check whether the helper is visible and change the status', function() {
    var instance, spy1, spy2, spy3;
    core.helper = function() {
      return helper;
    };
    helper.element.is = function() {
      return false;
    };
    instance = new HelperButton(core);
    spy1 = sandbox.spy(helper.element, 'is');
    spy2 = sandbox.spy(instance.element, 'addClass');
    spy3 = sandbox.spy(instance.element, 'removeClass');
    instance.init();
    spy1.called.should.be["true"];
    spy1.returnValues.should.be.eql([false]);
    spy2.called.should.be["false"];
    spy3.called.should.be["true"];
    instance.element.hasClass('hide').should.be["false"];
    sandbox.restore();
    core.helper = function() {
      return helper;
    };
    helper.element.is = function() {
      return true;
    };
    instance = new HelperButton(core);
    spy1 = sandbox.spy(helper.element, 'is');
    spy2 = sandbox.spy(instance.element, 'addClass');
    spy3 = sandbox.spy(instance.element, 'removeClass');
    instance.init();
    spy1.called.should.be["true"];
    spy1.returnValues.should.be.eql([true]);
    spy2.called.should.be["true"];
    spy3.called.should.be["false"];
    return instance.element.hasClass('hide').should.be["true"];
  });
});

describe('Jencil.buttons.buttonFactory(core, value) -> instance', function() {
  var sandbox;
  sandbox = null;
  beforeEach(function() {
    return sandbox = sinon.sandbox.create();
  });
  afterEach(function() {
    return sandbox.verifyAndRestore();
  });
  it('should be found on `Jencil.buttons.buttonFactory`', function() {
    return buttonFactory.should.be.equal(Jencil.buttons.buttonFactory);
  });
  it('should call `CommandButton.factory(core, args)` method when array is passed', function() {
    var instance, spy;
    spy = sandbox.spy(CommandButton, 'factory');
    instance = buttonFactory(null, ['name']);
    instance.should.be["instanceof"](CommandButton);
    return spy.called.should.be["true"];
  });
  it('should create ActionButton when string is passed', function() {
    var instance;
    instance = buttonFactory(null, 'Separator');
    instance.should.be["instanceof"](Separator);
    instance = buttonFactory(null, 'Undo');
    instance.should.be["instanceof"](UndoButton);
    instance = buttonFactory(null, 'Redo');
    instance.should.be["instanceof"](RedoButton);
    instance = buttonFactory(null, 'Fullscreen');
    instance.should.be["instanceof"](FullscreenButton);
    instance = buttonFactory(null, 'Viewer');
    instance.should.be["instanceof"](ViewerButton);
    instance = buttonFactory(null, 'Helper');
    return instance.should.be["instanceof"](HelperButton);
  });
  return it('should simply create an instance of the value class', function() {
    var Test, instance;
    Test = function() {
      return this;
    };
    instance = buttonFactory(null, Test);
    return instance.should.be["instanceof"](Test);
  });
});
