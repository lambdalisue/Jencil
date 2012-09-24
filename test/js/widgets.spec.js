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
  var clock, fst, instance, snd, splitter;
  clock = fst = snd = splitter = instance = null;
  before(function() {
    fst = new Panel(null);
    snd = new Panel(null);
    splitter = new Jencil.splitters.VerticalSplitter(null, fst, snd, 0.5);
    instance = new MultiplePanel(null, fst, snd, splitter);
    sandbox.appendChild(instance.element.get(0));
    instance.init();
    instance.element.width(1024);
    instance.element.height(1024);
    instance.fst.element.height(1024);
    instance.snd.element.height(1024);
    return instance.adjust();
  });
  it('should add `multiple` class to the element', function() {
    return instance.element.hasClass('multiple').should.be["true"];
  });
  describe('#init() -> instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('init').a('function');
    });
    return it('should call `init` method of fst, snd and splitter', sinon.test(function() {
      var mock1, mock2, mock3;
      mock1 = this.mock(fst).expects('init').once();
      mock2 = this.mock(snd).expects('init').once();
      mock3 = this.mock(splitter).expects('init').once();
      return instance.init();
    }));
  });
  describe('#fst.show() -> instance', function() {
    it('should be an instance property', function() {
      return fst.should.have.property('show').a('function');
    });
    return it('should make fst to be visible 500ms after called', sinon.test(function() {
      this.stub(fst.element, 'is', function() {
        return this.css('display') === 'block';
      });
      splitter.volume(0);
      fst.element.css('display').should.be.equal('none');
      fst.show();
      fst.element.css('display').should.be.equal('none');
      this.clock.tick(500);
      return fst.element.css('display').should.be.equal('block');
    }));
  });
  describe('#fst.hide() -> instance', function() {
    it('should be an instance property', function() {
      return fst.should.have.property('hide').a('function');
    });
    return it('should make fst to be unvisible 500ms after called', sinon.test(function() {
      this.stub(fst.element, 'is', function() {
        return this.css('display') === 'block';
      });
      splitter.volume(0.5);
      fst.element.css('display').should.be.equal('block');
      fst.hide();
      fst.element.css('display').should.be.equal('block');
      this.clock.tick(500);
      return fst.element.css('display').should.be.equal('none');
    }));
  });
  describe('#fst.toggle() -> instance', function() {
    it('should be an instance property', function() {
      return fst.should.have.property('toggle').a('function');
    });
    return it('should toggle visibility of fst 500ms after called', sinon.test(function() {
      this.stub(fst.element, 'is', function() {
        return this.css('display') === 'block';
      });
      fst.hide();
      this.clock.tick(500);
      fst.toggle();
      this.clock.tick(500);
      fst.element.css('display').should.be.equal('block');
      fst.toggle();
      this.clock.tick(500);
      return fst.element.css('display').should.be.equal('none');
    }));
  });
  describe('#snd.show() -> instance', function() {
    it('should be an instance property', function() {
      return snd.should.have.property('show').a('function');
    });
    return it('should make snd to be visible 500ms after called', sinon.test(function() {
      this.stub(snd.element, 'is', function() {
        return this.css('display') === 'block';
      });
      splitter.volume(1);
      snd.element.css('display').should.be.equal('none');
      snd.show();
      snd.element.css('display').should.be.equal('none');
      this.clock.tick(500);
      return snd.element.css('display').should.be.equal('block');
    }));
  });
  describe('#snd.hide() -> instance', function() {
    it('should be an instance property', function() {
      return snd.should.have.property('hide').a('function');
    });
    return it('should make snd to be unvisible 500ms after called', sinon.test(function() {
      this.stub(snd.element, 'is', function() {
        return this.css('display') === 'block';
      });
      splitter.volume(0.5);
      snd.element.css('display').should.be.equal('block');
      snd.hide();
      snd.element.css('display').should.be.equal('block');
      this.clock.tick(500);
      return snd.element.css('display').should.be.equal('none');
    }));
  });
  return describe('#snd.toggle() -> instance', function() {
    it('should be an instance property', function() {
      return snd.should.have.property('toggle').a('function');
    });
    return it('should toggle visibility of snd 500ms after called', sinon.test(function() {
      this.stub(snd.element, 'is', function() {
        return this.css('display') === 'block';
      });
      snd.hide();
      this.clock.tick(500);
      snd.toggle();
      this.clock.tick(500);
      snd.element.css('display').should.be.equal('block');
      snd.toggle();
      this.clock.tick(500);
      return snd.element.css('display').should.be.equal('none');
    }));
  });
});
