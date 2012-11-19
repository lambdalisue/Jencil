(function() {
  var Bar, Statusbar, Toolbar, Workspace, Wrapper;

  if (!(typeof window !== "undefined" && window !== null)) {
    return;
  }

  Wrapper = Jencil.workspace.Wrapper;

  Workspace = Jencil.workspace.Workspace;

  Bar = Jencil.workspace.Bar;

  Toolbar = Jencil.workspace.Toolbar;

  Statusbar = Jencil.workspace.Statusbar;

  if (!(Object.create != null)) {
    Object.create = function(obj) {
      var F;
      F = function() {
        return this;
      };
      F.prototype = obj;
      return new F;
    };
  }

  describe('Jencil.workspace.Wrapper(core, width, height) extends Panel -> instance', function() {
    var core, sandbox;
    sandbox = null;
    core = {
      options: {
        resizable: true
      },
      editor: function() {
        return this._editor;
      },
      _editor: {
        curtain: {
          on: function() {
            return this;
          },
          off: function() {
            return this;
          },
          refresh: function() {
            return this;
          }
        }
      },
      viewer: function() {
        return this._viewer;
      },
      _viewer: {
        curtain: {
          on: function() {
            return this;
          },
          off: function() {
            return this;
          },
          refresh: function() {
            return this;
          }
        }
      },
      helper: function() {
        return this._helper;
      },
      _helper: {
        curtain: {
          on: function() {
            return this;
          },
          off: function() {
            return this;
          },
          refresh: function() {
            return this;
          }
        }
      }
    };
    beforeEach(function() {
      return sandbox = sinon.sandbox.create();
    });
    afterEach(function() {
      return sandbox.verifyAndRestore();
    });
    it('should be found on `Jencil.workspace.Wrapper`', function() {
      return Wrapper.should.be.equal(Jencil.workspace.Wrapper);
    });
    it('should add `jencil wrapper` class', function() {
      var instance;
      instance = new Wrapper(null, 0, 0);
      instance.element.hasClass('jencil').should.be["true"];
      return instance.element.hasClass('wrapper').should.be["true"];
    });
    it('should set element width/height', function() {
      var instance;
      instance = new Wrapper(null, 100, 200);
      instance.element.width().should.be.equal(100);
      return instance.element.height().should.be.equal(200);
    });
    it('should create Workspace instance and store it', function() {
      var instance;
      instance = new Wrapper(null, 100, 200);
      instance.workspace.should.be["instanceof"](Workspace);
      return instance.element.children().length.should.be.equal(1);
    });
    describe('#curtain.on()', function() {
      var instance;
      instance = new Wrapper(core, 0, 0);
      it('should be an instance property', function() {
        instance.should.have.property('curtain').a('object');
        return instance.curtain.should.have.property('on').a('function');
      });
      return it('should call `curtain.on()` method of each panel if it exists', function() {
        var c, spy1, spy2, spy3;
        c = Object.create(core);
        instance = new Wrapper(c, 0, 0);
        sandbox.mock(instance).expects('adjust').returns(null).once();
        spy1 = sandbox.spy(core._editor.curtain, 'on');
        spy2 = sandbox.spy(core._viewer.curtain, 'on');
        spy3 = sandbox.spy(core._helper.curtain, 'on');
        instance.curtain.on();
        spy1.called.should.be["true"];
        spy2.called.should.be["true"];
        return spy3.called.should.be["true"];
      });
    });
    describe('#curtain.off()', function() {
      var instance;
      instance = new Wrapper(core, 0, 0);
      it('should be an instance property', function() {
        instance.should.have.property('curtain').a('object');
        return instance.curtain.should.have.property('off').a('function');
      });
      return it('should call `curtain.off()` method of each panel if it exists', function() {
        var c, spy1, spy2, spy3;
        c = Object.create(core);
        instance = new Wrapper(c, 0, 0);
        sandbox.mock(instance).expects('adjust').returns(null).once();
        spy1 = sandbox.spy(core._editor.curtain, 'off');
        spy2 = sandbox.spy(core._viewer.curtain, 'off');
        spy3 = sandbox.spy(core._helper.curtain, 'off');
        instance.curtain.off();
        spy1.called.should.be["true"];
        spy2.called.should.be["true"];
        return spy3.called.should.be["true"];
      });
    });
    describe('#curtain.refresh()', function() {
      var instance;
      instance = new Wrapper(core, 0, 0);
      it('should be an instance property', function() {
        instance.should.have.property('curtain').a('object');
        return instance.curtain.should.have.property('refresh').a('function');
      });
      return it('should call `curtain.off()` method of each panel if it exists', function() {
        var c, spy1, spy2, spy3;
        c = Object.create(core);
        instance = new Wrapper(c, 0, 0);
        sandbox.mock(instance).expects('adjust').returns(null).once();
        spy1 = sandbox.spy(core._editor.curtain, 'refresh');
        spy2 = sandbox.spy(core._viewer.curtain, 'refresh');
        spy3 = sandbox.spy(core._helper.curtain, 'refresh');
        instance.curtain.refresh();
        spy1.called.should.be["true"];
        spy2.called.should.be["true"];
        return spy3.called.should.be["true"];
      });
    });
    describe('#init(profileNameOrInstance) -> instance', function() {
      var instance;
      instance = new Wrapper(core, 0, 0);
      it('should be an instance property', function() {
        return instance.should.have.property('init').a('function');
      });
      if (jQuery.prototype.resizable != null) {
        it('should call `element.resizable()` if options.resizable is true', function() {
          var spy;
          spy = sandbox.spy(instance.element, 'resizable');
          sandbox.stub(instance.workspace, 'profile');
          sandbox.stub(instance.workspace, 'init');
          instance.init('Html').should.be.equal(instance);
          return spy.called.should.be["true"];
        });
      }
      it('should call `workspace.profile(profileNameOrInstance)` method', function() {
        sandbox.mock(instance.workspace).expects('profile').withArgs('Html').once();
        sandbox.stub(instance.workspace, 'init');
        return instance.init('Html').should.be.equal(instance);
      });
      return it('should call `workspace.init()` method', function() {
        sandbox.stub(instance.workspace, 'profile');
        sandbox.mock(instance.workspace).expects('init').once();
        return instance.init('Html').should.be.equal(instance);
      });
    });
    return describe('#adjust() -> instance', function() {
      var instance;
      instance = new Wrapper(core, 100, 200);
      it('should be an instance property', function() {
        return instance.should.have.property('adjust').a('function');
      });
      it('should set workspace outerWidth/outerHeight as equal as element width/height', function() {
        sandbox.stub(instance.workspace, 'adjust');
        instance.workspace.element.outerWidth().should.not.be.equal(100);
        instance.workspace.element.outerHeight().should.not.be.equal(200);
        instance.adjust().should.be.equal(instance);
        instance.workspace.element.outerWidth().should.be.equal(100);
        return instance.workspace.element.outerHeight().should.be.equal(200);
      });
      return it('should call `workspace.adjust` method', function() {
        sandbox.mock(instance.workspace).expects('adjust').once();
        return instance.adjust().should.be.equal(instance);
      });
    });
  });

}).call(this);
