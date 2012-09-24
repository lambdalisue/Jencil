var HorizontalPanel, MultiplePanel, Panel, VerticalPanel, Widget;

if (!(typeof window !== "undefined" && window !== null)) {
  return;
}

Widget = Jencil.widgets.Widget;

Panel = Jencil.widgets.Panel;

MultiplePanel = Jencil.widgets.MultiplePanel;

VerticalPanel = Jencil.widgets.VerticalPanel;

HorizontalPanel = Jencil.widgets.HorizontalPanel;

describe('Jencil.widgets.Widget(core, selector="<div>", context) -> instance', function() {
  it('should have element instance which is evoluted jQueryObj', function() {
    var instance;
    instance = new Widget(null);
    instance.should.have.property('element')["instanceof"](jQuery);
    instance.element.should.have.property('__evoluted__');
    return instance.element.__evoluted__.should.be["true"];
  });
  describe('#init() -> instance', function() {
    var instance;
    instance = new Widget(null);
    it('should be an instance property', function() {
      return instance.should.have.property('init').a('function');
    });
    return it('should return the instance', function() {
      return instance.init().should.equal(instance);
    });
  });
  return describe('#adjust() -> instance', function() {
    var instance;
    instance = new Widget(null);
    it('should be an instance property', function() {
      return instance.should.have.property('adjust').a('function');
    });
    return it('should return the instance', function() {
      return instance.adjust().should.equal(instance);
    });
  });
});

describe('Jencil.widgets.Panel(core, selector="<div>", context) extends Widget -> instance', function() {
  return it('should add `panel` class to the element', function() {
    var instance;
    instance = new Panel(null);
    return instance.element.hasClass('panel').should.be["true"];
  });
});

describe('Jencil.widgets.MultiplePanel(core, fst, snd, splitter) extends Panel -> instance', function() {
  var fst, instance, sandbox, snd, splitter;
  sandbox = fst = snd = splitter = instance = null;
  before(function() {
    fst = new Panel(null);
    snd = new Panel(null);
    splitter = new Jencil.splitters.VerticalSplitter(null, fst, snd, 0.5);
    instance = new MultiplePanel(null, fst, snd, splitter);
    blackbox.add(instance.element);
    instance.init();
    return instance.adjust();
  });
  after(function() {
    return blackbox.clear();
  });
  beforeEach(function() {
    return sandbox = sinon.sandbox.create({
      useFakeTimers: true
    });
  });
  afterEach(function() {
    return sandbox.verifyAndRestore();
  });
  it('should add `multiple` class to the element', function() {
    return instance.element.hasClass('multiple').should.be["true"];
  });
  describe('#init() -> instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('init').a('function');
    });
    return it('should call `init` method of fst, snd and splitter', function() {
      sandbox.mock(fst).expects('init').once();
      sandbox.mock(snd).expects('init').once();
      sandbox.mock(splitter).expects('init').once();
      return instance.init();
    });
  });
  describe('#fst.show() -> instance', function() {
    it('should be an instance property', function() {
      return fst.should.have.property('show').a('function');
    });
    return it('should make fst to be visible 500ms after called', function() {
      sandbox.stub(fst.element, 'is', function() {
        return this.css('display') === 'block';
      });
      splitter.volume(0);
      fst.element.css('display').should.be.equal('none');
      fst.show();
      fst.element.css('display').should.be.equal('none');
      sandbox.clock.tick(500);
      return fst.element.css('display').should.be.equal('block');
    });
  });
  describe('#fst.hide() -> instance', function() {
    it('should be an instance property', function() {
      return fst.should.have.property('hide').a('function');
    });
    return it('should make fst to be unvisible 500ms after called', function() {
      sandbox.stub(fst.element, 'is', function() {
        return this.css('display') === 'block';
      });
      splitter.volume(0.5);
      fst.element.css('display').should.be.equal('block');
      fst.hide();
      fst.element.css('display').should.be.equal('block');
      sandbox.clock.tick(500);
      return fst.element.css('display').should.be.equal('none');
    });
  });
  describe('#fst.toggle() -> instance', function() {
    it('should be an instance property', function() {
      return fst.should.have.property('toggle').a('function');
    });
    return it('should toggle visibility of fst 500ms after called', function() {
      sandbox.stub(fst.element, 'is', function() {
        return this.css('display') === 'block';
      });
      fst.hide();
      sandbox.clock.tick(500);
      fst.toggle();
      sandbox.clock.tick(500);
      fst.element.css('display').should.be.equal('block');
      fst.toggle();
      sandbox.clock.tick(500);
      return fst.element.css('display').should.be.equal('none');
    });
  });
  describe('#snd.show() -> instance', function() {
    it('should be an instance property', function() {
      return snd.should.have.property('show').a('function');
    });
    return it('should make snd to be visible 500ms after called', function() {
      sandbox.stub(snd.element, 'is', function() {
        return this.css('display') === 'block';
      });
      splitter.volume(1);
      snd.element.css('display').should.be.equal('none');
      snd.show();
      snd.element.css('display').should.be.equal('none');
      sandbox.clock.tick(500);
      return snd.element.css('display').should.be.equal('block');
    });
  });
  describe('#snd.hide() -> instance', function() {
    it('should be an instance property', function() {
      return snd.should.have.property('hide').a('function');
    });
    return it('should make snd to be unvisible 500ms after called', function() {
      sandbox.stub(snd.element, 'is', function() {
        return this.css('display') === 'block';
      });
      splitter.volume(0.5);
      snd.element.css('display').should.be.equal('block');
      snd.hide();
      snd.element.css('display').should.be.equal('block');
      sandbox.clock.tick(500);
      return snd.element.css('display').should.be.equal('none');
    });
  });
  return describe('#snd.toggle() -> instance', function() {
    it('should be an instance property', function() {
      return snd.should.have.property('toggle').a('function');
    });
    return it('should toggle visibility of snd 500ms after called', function() {
      sandbox.stub(snd.element, 'is', function() {
        return this.css('display') === 'block';
      });
      snd.hide();
      sandbox.clock.tick(500);
      snd.toggle();
      sandbox.clock.tick(500);
      snd.element.css('display').should.be.equal('block');
      snd.toggle();
      sandbox.clock.tick(500);
      return snd.element.css('display').should.be.equal('none');
    });
  });
});

describe('Jencil.widgets.VerticalPanel(core, fst, snd, splitter) extends MultiplePanel -> instance', function() {
  var fst, instance, sandbox, snd, splitter;
  sandbox = fst = snd = splitter = instance = null;
  before(function() {
    fst = new Panel(null);
    snd = new Panel(null);
    instance = new VerticalPanel(null, fst, snd, splitter);
    blackbox.add(instance.element);
    instance.init();
    return instance.adjust();
  });
  after(function() {
    return blackbox.clear();
  });
  beforeEach(function() {
    return sandbox = sinon.sandbox.create();
  });
  afterEach(function() {
    return sandbox.verifyAndRestore();
  });
  it('should add `vertical` class to the element', function() {
    return instance.element.hasClass('vertical').should.be["true"];
  });
  return describe('#adjust() -> instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('adjust').a('function');
    });
    it('should call some downstream methods and return the instance', function() {
      sandbox.mock(instance.fst.element).expects('outerHeight').once();
      sandbox.mock(instance.snd.element).expects('outerHeight').once();
      sandbox.mock(instance.splitter).expects('adjust').once();
      return instance.adjust().should.be.equal(instance);
    });
    return it('should set height of each elements as maximum', function() {
      var height;
      instance.adjust();
      height = instance.element.height();
      fst.element.outerHeight(true).should.be.equal(height);
      snd.element.outerHeight(true).should.be.equal(height);
      return instance.splitter.element.outerHeight(true).should.be.equal(height);
    });
  });
});

describe('Jencil.widgets.HorizontalPanel(core, fst, snd, splitter) extends MultiplePanel -> instance', function() {
  var fst, instance, sandbox, snd, splitter;
  sandbox = fst = snd = splitter = instance = null;
  before(function() {
    fst = new Panel(null);
    snd = new Panel(null);
    instance = new HorizontalPanel(null, fst, snd, splitter);
    blackbox.add(instance.element);
    instance.init();
    return instance.adjust();
  });
  after(function() {
    return blackbox.clear();
  });
  beforeEach(function() {
    return sandbox = sinon.sandbox.create();
  });
  afterEach(function() {
    return sandbox.verifyAndRestore();
  });
  it('should add `horizontal` class to the element', function() {
    return instance.element.hasClass('horizontal').should.be["true"];
  });
  return describe('#adjust() -> instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('adjust').a('function');
    });
    it('should call some downstream methods and return the instance', function() {
      sandbox.mock(instance.fst.element).expects('outerWidth').once();
      sandbox.mock(instance.snd.element).expects('outerWidth').once();
      sandbox.mock(instance.splitter).expects('adjust').once();
      return instance.adjust().should.be.equal(instance);
    });
    return it('should set width of each elements as maximum', function() {
      var width;
      instance.adjust();
      width = instance.element.width();
      fst.element.outerWidth(true).should.be.equal(width);
      snd.element.outerWidth(true).should.be.equal(width);
      return instance.splitter.element.outerWidth(true).should.be.equal(width);
    });
  });
});
