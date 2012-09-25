var HorizontalSplitter, Panel, Splitter, VerticalSplitter;

if (!(typeof window !== "undefined" && window !== null)) {
  return;
}

Splitter = Jencil.splitters.Splitter;

VerticalSplitter = Jencil.splitters.VerticalSplitter;

HorizontalSplitter = Jencil.splitters.HorizontalSplitter;

Panel = Jencil.widgets.Panel;

describe('splitter.Splitter(core, fst, snd, defaultVolume=0.5) -> instance', function() {
  var fst, instance, snd;
  fst = snd = instance = null;
  before(function() {
    fst = new Panel(null);
    snd = new Panel(null);
    instance = new Splitter(null, fst, snd);
    instance.valueWidth = sinon.stub().returns(100);
    instance.minValue = sinon.stub().returns(10);
    return instance.maxValue = sinon.stub().returns(90);
  });
  it('should have `splitter` class', function() {
    return instance.element.hasClass('splitter').should.be["true"];
  });
  describe('#init() -> instance', function() {
    return it('should set `container` property and return the instance', function() {
      instance.should.not.have.property('container');
      instance.init().should.be.equal(instance);
      instance.should.have.property('container');
      instance.container.should.be["instanceof"](jQuery);
      return instance.container.__evoluted__.should.be["true"];
    });
  });
  describe('#volume(value, skip) -> number | instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('volume').a('function');
    });
    it('should return the float value of the volume', function() {
      return instance.volume().should.be.a('number').equal(0.5);
    });
    it('should set the volume with calling `adjust` method', function() {
      var mock;
      mock = sinon.mock(instance).expects('adjust').once();
      instance.volume(0.8);
      instance.volume().should.be.equal(0.8);
      mock.verify();
      return instance.adjust.restore();
    });
    return it('should set the volume without calling `adjust` method', function() {
      var mock;
      mock = sinon.mock(instance).expects('adjust').never();
      instance.volume(0.2, true);
      instance.volume().should.be.equal(0.2);
      mock.verify();
      return instance.adjust.restore();
    });
  });
  describe('#value(value, skip) -> number | instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('value').a('function');
    });
    it('should return the value of the splitter', function() {
      instance.volume(0.2, true);
      return instance.value().should.be.a('number').equal(20);
    });
    it('should set the value with calling `adjust` method', function() {
      var mock;
      mock = sinon.mock(instance).expects('adjust').once();
      instance.value(80);
      instance.value().should.be.equal(80);
      mock.verify();
      return instance.adjust.restore();
    });
    return it('should set the value without calling `adjust` method', function() {
      var mock;
      mock = sinon.mock(instance).expects('adjust').never();
      instance.value(80, true);
      instance.value().should.be.equal(80);
      mock.verify();
      return instance.adjust.restore();
    });
  });
  return describe('#regulateValue(value) -> number', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('regulateValue').a('function');
    });
    it('should return the value if the value is within the range', function() {
      return instance.regulateValue(50).should.be.equal(50);
    });
    it('should return minValue if the value is lower than that', function() {
      return instance.regulateValue(0).should.be.equal(10);
    });
    return it('should return maxValue if the value is higher than that', function() {
      return instance.regulateValue(100).should.be.equal(90);
    });
  });
});

describe('splitter.VerticalSplitter(core, fst, snd, defaultVolume=0.5) -> instance', function() {
  var fst, instance, snd;
  fst = snd = instance = null;
  before(function() {
    fst = new Panel(null);
    snd = new Panel(null);
    instance = new VerticalSplitter(null, fst, snd);
    sandbox.appendChild(fst.element.get(0));
    sandbox.appendChild(snd.element.get(0));
    sandbox.appendChild(instance.element.get(0));
    return instance.init();
  });
  after(function() {
    return sandbox.removeAllChildren();
  });
  it('should have `vertical` class', function() {
    return instance.element.hasClass('vertical').should.be["true"];
  });
  it('#fst should have `left` class', function() {
    return instance.fst.element.hasClass('left').should.be["true"];
  });
  it('#snd should have `right` class', function() {
    return instance.snd.element.hasClass('right').should.be["true"];
  });
  describe('#mousemove(e) -> undefined', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('mousemove').a('function');
    });
    it('should call #regulateValue(value) method to regulate the value', function() {
      var e, mock;
      mock = sinon.mock(instance).expects('regulateValue').once();
      e = jQuery.Event('mousemove');
      e.pageX = 100;
      instance.mousemove(e);
      mock.verify();
      return instance.regulateValue.restore();
    });
    return it('should call #value(value) method to set the value', function() {
      var e, mock;
      mock = sinon.mock(instance).expects('value').once();
      e = jQuery.Event('mousemove');
      e.pageX = 100;
      instance.mousemove(e);
      mock.verify();
      return instance.value.restore();
    });
  });
  describe('#valueWidth() => number', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('valueWidth').a('function');
    });
    return it('should return the width of the container element', function() {
      var sandboxElement;
      sandboxElement = $(sandbox.element);
      return instance.valueWidth().should.be.equal(sandboxElement.width());
    });
  });
  describe('#minValue() => number', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('minValue').a('function');
    });
    it('should return 0 if fst.minWidth and snd.maxWidth has not specified', function() {
      return instance.minValue().should.be.equal(0);
    });
    it('should return fst.minWidth if it has specified', function() {
      instance.fst.element.css('min-width', '10px');
      return instance.minValue().should.be.equal(10);
    });
    it('should return valueWidth - snd.maxWidth if it has specified', function() {
      sinon.stub(instance, 'valueWidth', function() {
        return 100;
      });
      instance.snd.element.css('max-width', '90px');
      instance.minValue().should.be.equal(10);
      return instance.valueWidth.restore();
    });
    return it('should return largest value if fst.minWidth and snd.maxWidth has specified', function() {
      sinon.stub(instance, 'valueWidth', function() {
        return 100;
      });
      instance.fst.element.css('min-width', '10px');
      instance.snd.element.css('max-width', '80px');
      instance.minValue().should.be.equal(20);
      instance.fst.element.css('min-width', '20px');
      instance.snd.element.css('max-width', '90px');
      instance.minValue().should.be.equal(20);
      return instance.valueWidth.restore();
    });
  });
  describe('#maxValue() => number', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('maxValue').a('function');
    });
    it('should return valueWidth if fst.maxWidth and snd.minWidth has not specified', function() {
      sinon.stub(instance, 'valueWidth', function() {
        return 100;
      });
      instance.maxValue().should.be.equal(100);
      return instance.valueWidth.restore();
    });
    it('should return fst.maxWidth if it has specified', function() {
      instance.fst.element.css('max-width', '10px');
      return instance.maxValue().should.be.equal(10);
    });
    it('should return valueWidth - snd.minWidth if it has specified', function() {
      sinon.stub(instance, 'valueWidth', function() {
        return 100;
      });
      instance.snd.element.css('min-width', '90px');
      instance.maxValue().should.be.equal(10);
      return instance.valueWidth.restore();
    });
    return it('should return largest value if fst.maxWidth and snd.minWidth has specified', function() {
      sinon.stub(instance, 'valueWidth', function() {
        return 100;
      });
      instance.fst.element.css('max-width', '10px');
      instance.snd.element.css('min-width', '80px');
      instance.maxValue().should.be.equal(10);
      instance.fst.element.css('max-width', '20px');
      instance.snd.element.css('min-width', '90px');
      instance.maxValue().should.be.equal(10);
      return instance.valueWidth.restore();
    });
  });
  return describe('#adjust() -> instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('adjust').a('function');
    });
    it('should call `adjust` method of fst/snd, set element relativeX and return the instance', function() {
      var mock1, mock2, mock3;
      mock1 = sinon.mock(instance.fst).expects('adjust').once();
      mock2 = sinon.mock(instance.snd).expects('adjust').once();
      mock3 = sinon.mock(instance.element).expects('relativeX').once();
      instance.adjust().should.be.equal(instance);
      mock1.verify();
      mock2.verify();
      mock3.verify();
      instance.fst.adjust.restore();
      instance.snd.adjust.restore();
      return instance.element.relativeX.restore();
    });
    it('should hide fst and show snd when the volume is 0', function() {
      var mock1, mock2;
      sinon.stub(instance.fst.element, 'is', function() {
        return true;
      });
      sinon.stub(instance.snd.element, 'is', function() {
        return false;
      });
      sinon.stub(instance, 'value', function() {
        return 0;
      });
      mock1 = sinon.mock(instance.fst.element).expects('hide').once();
      mock2 = sinon.mock(instance.snd.element).expects('show').once();
      instance.adjust();
      mock1.verify();
      mock2.verify();
      instance.fst.element.is.restore();
      instance.snd.element.is.restore();
      instance.value.restore();
      instance.fst.element.hide.restore();
      return instance.snd.element.show.restore();
    });
    it('should show fst and hide snd when the volume is max', function() {
      var mock1, mock2;
      sinon.stub(instance.fst.element, 'is', function() {
        return false;
      });
      sinon.stub(instance.snd.element, 'is', function() {
        return true;
      });
      sinon.stub(instance, 'value', function() {
        return instance.valueWidth();
      });
      mock1 = sinon.mock(instance.fst.element).expects('show').once();
      mock2 = sinon.mock(instance.snd.element).expects('hide').once();
      instance.adjust();
      mock1.verify();
      mock2.verify();
      instance.fst.element.is.restore();
      instance.snd.element.is.restore();
      instance.value.restore();
      instance.fst.element.show.restore();
      return instance.snd.element.hide.restore();
    });
    return it('should show fst/snd when the volume is between 0 to max', function() {
      var mock1, mock2;
      sinon.stub(instance.fst.element, 'is', function() {
        return false;
      });
      sinon.stub(instance.snd.element, 'is', function() {
        return false;
      });
      sinon.stub(instance, 'value', function() {
        return instance.valueWidth() / 2;
      });
      mock1 = sinon.mock(instance.fst.element).expects('show').once();
      mock2 = sinon.mock(instance.snd.element).expects('show').once();
      instance.adjust();
      mock1.verify();
      mock2.verify();
      instance.fst.element.is.restore();
      instance.snd.element.is.restore();
      instance.value.restore();
      instance.fst.element.show.restore();
      return instance.snd.element.show.restore();
    });
  });
});

describe('splitter.HorizontalSplitter(core, fst, snd, defaultVolume=0.5) -> instance', function() {
  var fst, instance, snd;
  fst = snd = instance = null;
  before(function() {
    fst = new Panel(null);
    snd = new Panel(null);
    instance = new HorizontalSplitter(null, fst, snd);
    sandbox.appendChild(fst.element.get(0));
    sandbox.appendChild(snd.element.get(0));
    sandbox.appendChild(instance.element.get(0));
    return instance.init();
  });
  after(function() {
    return sandbox.removeAllChildren();
  });
  it('should have `horizontal` class', function() {
    return instance.element.hasClass('horizontal').should.be["true"];
  });
  it('#fst should have `top` class', function() {
    return instance.fst.element.hasClass('top').should.be["true"];
  });
  it('#snd should have `bottom` class', function() {
    return instance.snd.element.hasClass('bottom').should.be["true"];
  });
  describe('#mousemove(e) -> undefined', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('mousemove').a('function');
    });
    it('should call #regulateValue(value) method to regulate the value', function() {
      var e, mock;
      mock = sinon.mock(instance).expects('regulateValue').once();
      e = jQuery.Event('mousemove');
      e.pageY = 100;
      instance.mousemove(e);
      mock.verify();
      return instance.regulateValue.restore();
    });
    return it('should call #value(value) method to set the value', function() {
      var e, mock;
      mock = sinon.mock(instance).expects('value').once();
      e = jQuery.Event('mousemove');
      e.pageY = 100;
      instance.mousemove(e);
      mock.verify();
      return instance.value.restore();
    });
  });
  describe('#valueWidth() => number', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('valueWidth').a('function');
    });
    return it('should return the height of the container element', function() {
      var sandboxElement;
      sandboxElement = $(sandbox.element);
      return instance.valueWidth().should.be.equal(sandboxElement.height());
    });
  });
  describe('#minValue() => number', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('minValue').a('function');
    });
    it('should return 0 if fst.minHeight and snd.maxHeight has not specified', function() {
      return instance.minValue().should.be.equal(0);
    });
    it('should return fst.minHeight if it has specified', function() {
      instance.fst.element.css('min-height', '10px');
      return instance.minValue().should.be.equal(10);
    });
    it('should return valueWidth - snd.maxHeight if it has specified', function() {
      sinon.stub(instance, 'valueWidth', function() {
        return 100;
      });
      instance.snd.element.css('max-height', '90px');
      instance.minValue().should.be.equal(10);
      return instance.valueWidth.restore();
    });
    return it('should return largest value if fst.minHeight and snd.maxHeight has specified', function() {
      sinon.stub(instance, 'valueWidth', function() {
        return 100;
      });
      instance.fst.element.css('min-height', '10px');
      instance.snd.element.css('max-height', '80px');
      instance.minValue().should.be.equal(20);
      instance.fst.element.css('min-height', '20px');
      instance.snd.element.css('max-height', '90px');
      instance.minValue().should.be.equal(20);
      return instance.valueWidth.restore();
    });
  });
  describe('#maxValue() => number', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('maxValue').a('function');
    });
    it('should return valueWidth if fst.maxHeight and snd.minHeight has not specified', function() {
      sinon.stub(instance, 'valueWidth', function() {
        return 100;
      });
      instance.maxValue().should.be.equal(100);
      return instance.valueWidth.restore();
    });
    it('should return fst.maxHeight if it has specified', function() {
      instance.fst.element.css('max-height', '10px');
      return instance.maxValue().should.be.equal(10);
    });
    it('should return valueWidth - snd.minHeight if it has specified', function() {
      sinon.stub(instance, 'valueWidth', function() {
        return 100;
      });
      instance.snd.element.css('min-height', '90px');
      instance.maxValue().should.be.equal(10);
      return instance.valueWidth.restore();
    });
    return it('should return largest value if fst.maxHeight and snd.minHeight has specified', function() {
      sinon.stub(instance, 'valueWidth', function() {
        return 100;
      });
      instance.fst.element.css('max-height', '10px');
      instance.snd.element.css('min-height', '80px');
      instance.maxValue().should.be.equal(10);
      instance.fst.element.css('max-height', '20px');
      instance.snd.element.css('min-height', '90px');
      instance.maxValue().should.be.equal(10);
      return instance.valueWidth.restore();
    });
  });
  return describe('#adjust() -> instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('adjust').a('function');
    });
    it('should call `adjust` method of fst/snd, set element relativeY and return the instance', function() {
      var mock1, mock2, mock3;
      mock1 = sinon.mock(instance.fst).expects('adjust').once();
      mock2 = sinon.mock(instance.snd).expects('adjust').once();
      mock3 = sinon.mock(instance.element).expects('relativeY').once();
      instance.adjust().should.be.equal(instance);
      mock1.verify();
      mock2.verify();
      mock3.verify();
      instance.fst.adjust.restore();
      instance.snd.adjust.restore();
      return instance.element.relativeY.restore();
    });
    it('should hide fst and show snd when the volume is 0', function() {
      var mock1, mock2;
      sinon.stub(instance.fst.element, 'is', function() {
        return true;
      });
      sinon.stub(instance.snd.element, 'is', function() {
        return false;
      });
      sinon.stub(instance, 'value', function() {
        return 0;
      });
      mock1 = sinon.mock(instance.fst.element).expects('hide').once();
      mock2 = sinon.mock(instance.snd.element).expects('show').once();
      instance.adjust();
      mock1.verify();
      mock2.verify();
      instance.fst.element.is.restore();
      instance.snd.element.is.restore();
      instance.value.restore();
      instance.fst.element.hide.restore();
      return instance.snd.element.show.restore();
    });
    it('should show fst and hide snd when the volume is max', function() {
      var mock1, mock2;
      sinon.stub(instance.fst.element, 'is', function() {
        return false;
      });
      sinon.stub(instance.snd.element, 'is', function() {
        return true;
      });
      sinon.stub(instance, 'value', function() {
        return instance.valueWidth();
      });
      mock1 = sinon.mock(instance.fst.element).expects('show').once();
      mock2 = sinon.mock(instance.snd.element).expects('hide').once();
      instance.adjust();
      mock1.verify();
      mock2.verify();
      instance.fst.element.is.restore();
      instance.snd.element.is.restore();
      instance.value.restore();
      instance.fst.element.show.restore();
      return instance.snd.element.hide.restore();
    });
    return it('should show fst/snd when the volume is between 0 to max', function() {
      var mock1, mock2;
      sinon.stub(instance.fst.element, 'is', function() {
        return false;
      });
      sinon.stub(instance.snd.element, 'is', function() {
        return false;
      });
      sinon.stub(instance, 'value', function() {
        return instance.valueWidth() / 2;
      });
      mock1 = sinon.mock(instance.fst.element).expects('show').once();
      mock2 = sinon.mock(instance.snd.element).expects('show').once();
      instance.adjust();
      mock1.verify();
      mock2.verify();
      instance.fst.element.is.restore();
      instance.snd.element.is.restore();
      instance.value.restore();
      instance.fst.element.show.restore();
      return instance.snd.element.show.restore();
    });
  });
});
