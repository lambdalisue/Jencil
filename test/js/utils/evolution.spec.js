var BORDER, HEIGHT, MARGIN, PADDING, WIDTH;

if (!(typeof window !== "undefined" && window !== null)) {
  return;
}

WIDTH = HEIGHT = 10;

MARGIN = 30;

PADDING = 20;

BORDER = 10;

describe("utils.evolution.evolute", function() {
  var instance;
  it("should return extended jQueryObj", function() {
    var instance;
    instance = $(sandbox.createElement('div'));
    instance = evolute(instance);
    return instance.should.be.a["instanceof"](jQuery);
  });
  instance = $(sandbox.createElement('div'));
  instance = evolute(instance);
  before(function() {
    instance.width(WIDTH);
    instance.height(HEIGHT);
    return instance.css({
      'margin': MARGIN / 2,
      'padding': PADDING / 2,
      'border-width': BORDER / 2,
      'border-style': 'solid'
    });
  });
  describe('#nonContentWidth(includeMargin=false) => number', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('nonContentWidth').a('function');
    });
    it('should return non content width (padding + border)', function() {
      var value;
      value = instance.nonContentWidth();
      return expect(value).equal(PADDING + BORDER);
    });
    return it('should return non content width with margin (padding + border + margin)', function() {
      var value;
      value = instance.nonContentWidth(true);
      return expect(value).equal(PADDING + BORDER + MARGIN);
    });
  });
  describe('#nonContentHeight(includeMargin=false) => number', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('nonContentHeight').a('function');
    });
    it('should return non content height (padding + border)', function() {
      var value;
      value = instance.nonContentHeight();
      return expect(value).equal(PADDING + BORDER);
    });
    return it('should return non content height with margin (padding + border + margin)', function() {
      var value;
      value = instance.nonContentHeight(true);
      return expect(value).equal(PADDING + BORDER + MARGIN);
    });
  });
  describe('#outerWidth(includeMargin=false, value) => number | instance', function() {
    it('should be an instance property', function() {
      instance.should.have.property('outerWidth').a('function');
      return instance.should.have.property('_outerWidth').a('function');
    });
    it('should return outer width (width + non content width)', function() {
      var value;
      value = instance.outerWidth();
      return expect(value).equal(WIDTH + PADDING + BORDER);
    });
    it('should return outer width with margin (width + non content width + margin)', function() {
      var value;
      value = instance.outerWidth(true);
      return expect(value).equal(WIDTH + PADDING + BORDER + MARGIN);
    });
    it('should set outer width (width + non content width) and return the instance', function() {
      var value;
      instance.outerWidth(false, 100).should.be.equal(instance);
      value = instance.outerWidth();
      expect(value).equal(100);
      instance.outerWidth(200).should.be.equal(instance);
      value = instance.outerWidth();
      return expect(value).equal(200);
    });
    return it('should set outer width with margin (width + non content width + margin) and return the instance', function() {
      var value;
      instance.outerWidth(true, 100).should.be.equal(instance);
      value = instance.outerWidth(true);
      return expect(value).equal(100);
    });
  });
  describe('#outerHeight(includeMargin=false, value) => number | instance', function() {
    it('should be an instance property', function() {
      instance.should.have.property('outerHeight').a('function');
      return instance.should.have.property('_outerHeight').a('function');
    });
    it('should return outer height (height + non content height)', function() {
      var value;
      value = instance.outerHeight();
      return expect(value).equal(WIDTH + PADDING + BORDER);
    });
    it('should return outer height with margin (height + non content height + margin)', function() {
      var value;
      value = instance.outerHeight(true);
      return expect(value).equal(WIDTH + PADDING + BORDER + MARGIN);
    });
    it('should set outer height (height + non content height) and return the instance', function() {
      var value;
      instance.outerHeight(false, 100).should.be.equal(instance);
      value = instance.outerHeight();
      expect(value).equal(100);
      instance.outerHeight(200).should.be.equal(instance);
      value = instance.outerHeight();
      return expect(value).equal(200);
    });
    return it('should set outer height with margin (height + non content height + margin) return the instance', function() {
      var value;
      instance.outerHeight(true, 100).should.be.equal(instance);
      value = instance.outerHeight(true);
      return expect(value).equal(100);
    });
  });
  describe('#ncss(propertyName, [defaultValue=null]) => number | defaultValue', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('ncss').a('function');
    });
    it('should return number value of a particular css number property', function() {
      instance.css('min-width', 10);
      expect(instance.css('min-width')).a('string').equal('10px');
      return expect(instance.ncss('min-width')).a('number').equal(10);
    });
    return it('should return defaultValue when the value is not exist', function() {
      expect(instance.css('max-width')).a('string').equal('none');
      expect(instance.ncss('max-width')).not.exist;
      return expect(instance.ncss('max-width', 10)).a('number').equal(10);
    });
  });
  describe('#minWidth() => number | null', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('minWidth').a('function');
    });
    return it('should return min width', function() {
      instance.css('min-width', 10);
      return instance.minWidth().should.be.a('number').equal(10);
    });
  });
  describe('#minHeight() => number | null', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('minHeight').a('function');
    });
    return it('should return min height', function() {
      instance.css('min-height', 10);
      return instance.minHeight().should.be.a('number').equal(10);
    });
  });
  describe('#maxWidth() => number | null', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('maxWidth').a('function');
    });
    it('should return max width', function() {
      instance.css('max-width', 10);
      return instance.maxWidth().should.be.a('number').equal(10);
    });
    return it('should return null for widget which has no max width', function() {
      var instance2;
      instance2 = evolute(jQuery("<div>"));
      return expect(instance2.maxWidth()).equal(null);
    });
  });
  describe('#maxHeight() => number | null', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('maxHeight').a('function');
    });
    it('should return max height', function() {
      instance.css('max-height', 10);
      instance.should.have.a.property('maxHeight').a('function');
      return instance.maxHeight().should.be.a('number').equal(10);
    });
    return it('should return null for widget which has no max height', function() {
      var instance2;
      instance2 = evolute(jQuery("<div>"));
      return expect(instance2.maxHeight()).equal(null);
    });
  });
  describe('#contentX(includeMargin=false) => number', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('contentX').a('function');
    });
    it('should return contentX (borderLeft + paddingLeft)', function() {
      var value;
      value = instance.contentX();
      return expect(value).equal((BORDER + PADDING) / 2);
    });
    return it('should return contentX with margin (borderLeft + paddingLeft + marginLeft)', function() {
      var value;
      value = instance.contentX(true);
      return expect(value).equal((BORDER + PADDING + MARGIN) / 2);
    });
  });
  describe('#contentY(includeMargin=false) => number', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('contentY').a('function');
    });
    it('should return contentY (borderTop + paddingTop)', function() {
      var value;
      value = instance.contentY();
      return expect(value).equal((BORDER + PADDING) / 2);
    });
    return it('should return contentY with margin (borderTop + paddingTop + marginTop)', function() {
      var value;
      value = instance.contentY(true);
      return expect(value).equal((BORDER + PADDING + MARGIN) / 2);
    });
  });
  describe('#absoluteX(value) => number | instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('absoluteX').a('function');
    });
    it('should return absoluteX (offset.left)', function() {
      var offset, value;
      value = instance.absoluteX();
      offset = instance.offset();
      return expect(value).equal(offset.left);
    });
    return it('should set absoluteX (offset.left) and return the instance', function() {
      var value;
      value = instance.absoluteX();
      instance.absoluteX(value + 20).should.be.equal(instance);
      return instance.absoluteX().should.be.equal(value + 20);
    });
  });
  describe('#absoluteY(value) => number | instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('absoluteY').a('function');
    });
    it('should return absoluteY (offset.top)', function() {
      var offset, value;
      value = instance.absoluteY();
      offset = instance.offset();
      return expect(value).equal(offset.top);
    });
    return it('should set absoluteY (offset.top) and return the instance', function() {
      var value;
      value = instance.absoluteY();
      instance.absoluteY(value + 20).should.be.equal(instance);
      return instance.absoluteY().should.be.equal(value + 20);
    });
  });
  describe('#relativeX(includeMargin=false, value) => number | instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('relativeX').a('function');
    });
    it('should return relativeX (x value from parent contentX)', function() {
      var absoluteX, instance2, parentAbsoluteX, parentContentX, value;
      instance2 = evolute($('<div>'));
      instance2.appendTo(instance);
      value = instance2.relativeX();
      absoluteX = instance2.absoluteX();
      parentAbsoluteX = instance.absoluteX();
      parentContentX = instance.contentX();
      return expect(value).equal(absoluteX - parentAbsoluteX - parentContentX);
    });
    it('should return relativeX (x value from parent contentX) with margin', function() {
      var absoluteX, instance2, parentAbsoluteX, parentContentX, value;
      instance2 = evolute($('<div>'));
      instance2.appendTo(instance);
      value = instance2.relativeX(true);
      absoluteX = instance2.absoluteX();
      parentAbsoluteX = instance.absoluteX();
      parentContentX = instance.contentX(true);
      return expect(value).equal(absoluteX - parentAbsoluteX - parentContentX);
    });
    return it('should set relativeX (x value from parent contentX) and return the instance', function() {
      var instance2;
      instance2 = evolute($('<div>'));
      instance2.appendTo(instance);
      instance2.relativeX(false, 200).should.be.equal(instance2);
      instance2.relativeX().should.be.equal(200);
      instance2.relativeX(300).should.be.equal(instance2);
      return instance2.relativeX().should.be.equal(300);
    });
  });
  return describe('#relativeY(includeMargin=false, value) => number | instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('relativeY').a('function');
    });
    it('should return relativeY (y value from parent contentY)', function() {
      var absoluteY, instance2, parentAbsoluteY, parentContentY, value;
      instance2 = evolute($('<div>'));
      instance2.appendTo(instance);
      value = instance2.relativeY();
      absoluteY = instance2.absoluteY();
      parentAbsoluteY = instance.absoluteY();
      parentContentY = instance.contentY();
      return expect(value).equal(absoluteY - parentAbsoluteY - parentContentY);
    });
    it('should return relativeY (y value from parent contentY) with margin', function() {
      var absoluteY, instance2, parentAbsoluteY, parentContentY, value;
      instance2 = evolute($('<div>'));
      instance2.appendTo(instance);
      value = instance2.relativeY(true);
      absoluteY = instance2.absoluteY();
      parentAbsoluteY = instance.absoluteY();
      parentContentY = instance.contentY(true);
      return expect(value).equal(absoluteY - parentAbsoluteY - parentContentY);
    });
    return it('should set relativeY (y value from parent contentY) and return the instance', function() {
      var instance2;
      instance2 = evolute($('<div>'));
      instance2.appendTo(instance);
      instance2.relativeY(false, 200).should.be.equal(instance2);
      instance2.relativeY().should.be.equal(200);
      instance2.relativeY(300).should.be.equal(instance2);
      return instance2.relativeY().should.be.equal(300);
    });
  });
});
