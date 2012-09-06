(function() {

  if (!(typeof window !== "undefined" && window !== null)) {
    return;
  }

  describe('ui.widget.Widget', function() {
    var children, core, div, instance;
    core = div = instance = children = null;
    before(function() {
      var c, div1, div2, div3, textarea, _i, _len, _results;
      textarea = sandbox.createElement('textarea');
      core = new JencilCore($(textarea));
      div = sandbox.createElement('div');
      div1 = sandbox.createElement('div');
      div2 = sandbox.createElement('div');
      div3 = sandbox.createElement('div');
      instance = new Widget(core, div);
      children = [new Widget(core, div1), new Widget(core, div2), new Widget(core, div3)];
      _results = [];
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        c = children[_i];
        _results.push(instance.element.append(c.element));
      }
      return _results;
    });
    describe('.core : JencilCore instance', function() {
      return it('should be an instance of JencilCore', function() {
        instance.should.have.a.property('core').a('object');
        return instance.core.should.be.a["instanceof"](JencilCore);
      });
    });
    describe('#constructor(core, selector, context) => instance', function() {
      return it('should return same instance for same element', function() {
        var div2, instance1, instance2, instance3, instance4;
        div2 = sandbox.createElement('div');
        instance1 = new Widget(core, div);
        instance2 = new Widget(core, div);
        instance3 = new Widget(core, div2);
        instance4 = new Widget(core, div2);
        instance1.should.be.equal(instance2);
        instance1.should.not.be.equal(instance3);
        return instance1.should.not.be.equal(instance4);
      });
    });
    describe("#factory(jQueryObj) => instance", function() {
      return it('should return a widget instance of the jQueryObj', function() {
        var instance2;
        instance.should.have.a.property('factory').a('function');
        instance2 = instance.factory(instance.element);
        return instance2.should.be.equal(instance);
      });
    });
    describe("#parent() => instance", function() {
      return it('should return a parent widget instance', function() {
        var child, _i, _len, _results;
        instance.should.have.a.property('parent').a('function');
        _results = [];
        for (_i = 0, _len = children.length; _i < _len; _i++) {
          child = children[_i];
          _results.push(child.parent().should.be.eql(instance));
        }
        return _results;
      });
    });
    describe("#children() => array", function() {
      return it('should return an array of children widget instances', function() {
        instance.should.have.a.property('children').a('function');
        return instance.children().should.be.eql(children);
      });
    });
    describe('#init() => instance', function() {
      it('should return the instance', function() {
        instance.should.have.a.property('init').a('function');
        return instance.init().should.be.equal(instance);
      });
      it('should call `init` method of its children', function() {
        var c, mock, mocks, _i, _len, _results;
        mocks = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = children.length; _i < _len; _i++) {
            c = children[_i];
            _results.push(sinon.mock(c).expects('init').once());
          }
          return _results;
        })();
        instance.init();
        _results = [];
        for (_i = 0, _len = mocks.length; _i < _len; _i++) {
          mock = mocks[_i];
          _results.push(mock.verify());
        }
        return _results;
      });
      return it('should call `adjust` method of it', function() {
        var mock;
        mock = sinon.mock(instance).expects('init', 'adjust').once();
        instance.init();
        return mock.verify();
      });
    });
    return describe('#adjust() => instance', function() {
      it('should return the instance', function() {
        instance.should.have.a.property('adjust').a('function');
        return instance.adjust().should.be.equal(instance);
      });
      return it('should call `adjust` method of its children', function() {
        var c, mock, mocks, _i, _len, _results;
        mocks = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = children.length; _i < _len; _i++) {
            c = children[_i];
            _results.push(sinon.mock(c).expects('adjust').once());
          }
          return _results;
        })();
        instance.adjust();
        _results = [];
        for (_i = 0, _len = mocks.length; _i < _len; _i++) {
          mock = mocks[_i];
          _results.push(mock.verify());
        }
        return _results;
      });
    });
  });

}).call(this);
