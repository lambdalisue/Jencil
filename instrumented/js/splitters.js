if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	__$coverObject[name] = {__code: code}
}
var __$coverInitRange = function(name, range){
	__$coverObject[name][range] = 0;
}
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
}
__$coverInit("src/js/splitters.js", "var HorizontalSplitter, Splitter, VerticalSplitter,\n  __hasProp = {}.hasOwnProperty,\n  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };\n\nSplitter = (function(_super) {\n\n  __extends(Splitter, _super);\n\n  function Splitter(core, fst, snd, defaultVolume) {\n    var mousemove, mouseup,\n      _this = this;\n    this.fst = fst;\n    this.snd = snd;\n    this.defaultVolume = defaultVolume != null ? defaultVolume : 0.5;\n    Splitter.__super__.constructor.call(this, core);\n    this.element.addClass('splitter');\n    this._volume = this.defaultVolume;\n    mousemove = function(e) {\n      var _ref, _ref1;\n      _this.mousemove(e);\n      if ((_ref = _this.fst.curtain) != null) {\n        _ref.refresh();\n      }\n      if ((_ref1 = _this.snd.curtain) != null) {\n        _ref1.refresh();\n      }\n      e.stopPropagation();\n      e.stopImmediatePropagation();\n      return e.preventDefault();\n    };\n    mouseup = function(e) {\n      var $window, _ref, _ref1;\n      $window = $(window);\n      $window.unbind('mousemove', mousemove);\n      $window.unbind('mouseup', mouseup);\n      if ((_ref = _this.fst.curtain) != null) {\n        _ref.off();\n      }\n      if ((_ref1 = _this.snd.curtain) != null) {\n        _ref1.off();\n      }\n      e.stopPropagation();\n      e.stopImmediatePropagation();\n      return e.preventDefault();\n    };\n    this.element.mousedown(function(e) {\n      var $window, _ref, _ref1;\n      $window = $(window);\n      $window.mousemove(mousemove);\n      $window.mouseup(mouseup);\n      if ((_ref = _this.fst.curtain) != null) {\n        _ref.on();\n      }\n      if ((_ref1 = _this.snd.curtain) != null) {\n        _ref1.on();\n      }\n      e.stopPropagation();\n      e.stopImmediatePropagation();\n      return e.preventDefault();\n    });\n  }\n\n  Splitter.prototype.init = function() {\n    this.container = evolute(this.element.parent());\n    return this;\n  };\n\n  Splitter.prototype.volume = function(value, skip) {\n    if (skip == null) {\n      skip = false;\n    }\n    if (value != null) {\n      this._volume = value;\n      if (!skip) {\n        this.adjust();\n      }\n      return this;\n    }\n    return this._volume;\n  };\n\n  Splitter.prototype.value = function(value, skip) {\n    var valueWidth, volume;\n    if (skip == null) {\n      skip = false;\n    }\n    valueWidth = this.valueWidth();\n    if (value != null) {\n      volume = value / valueWidth;\n      return this.volume(volume, skip);\n    }\n    return this.volume() * valueWidth;\n  };\n\n  Splitter.prototype.regulateValue = function(value) {\n    var maxValue, minValue;\n    minValue = this.minValue();\n    maxValue = this.maxValue();\n    if (value < minValue) {\n      value = minValue;\n    }\n    if (value > maxValue) {\n      value = maxValue;\n    }\n    return value;\n  };\n\n  return Splitter;\n\n})(Widget);\n\nVerticalSplitter = (function(_super) {\n\n  __extends(VerticalSplitter, _super);\n\n  function VerticalSplitter(core, fst, snd, defaultVolume) {\n    var _ref, _ref1;\n    VerticalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);\n    this.element.addClass('vertical');\n    this.fst.element.addClass('left');\n    this.snd.element.addClass('right');\n    this.fst.element.css({\n      'float': 'left'\n    });\n    this.snd.element.css({\n      'float': 'left'\n    });\n    if ((_ref = this.fst.curtain) != null) {\n      _ref.css('pointer', 'col-resize');\n    }\n    if ((_ref1 = this.snd.curtain) != null) {\n      _ref1.css('pointer', 'col-resize');\n    }\n  }\n\n  VerticalSplitter.prototype.mousemove = function(e) {\n    var offset, value;\n    offset = this.container.absoluteX() + this.container.contentX(true);\n    value = e.pageX - offset;\n    value = this.regulateValue(value);\n    return this.value(value);\n  };\n\n  VerticalSplitter.prototype.valueWidth = function() {\n    return this.container.width();\n  };\n\n  VerticalSplitter.prototype.minValue = function() {\n    var m1, m2;\n    m1 = this.fst.element.minWidth() + this.fst.element.nonContentWidth();\n    m2 = this.snd.element.maxWidth();\n    if (m2 != null) {\n      m2 = this.valueWidth() - (m2 + this.snd.element.nonContentWidth());\n    }\n    if ((m1 != null) && (m2 != null)) {\n      return Math.max(m1, m2);\n    }\n    return m1 || m2 || 0;\n  };\n\n  VerticalSplitter.prototype.maxValue = function() {\n    var m1, m2, valueWidth;\n    valueWidth = this.valueWidth();\n    m1 = this.fst.element.maxWidth();\n    if (m1 != null) {\n      m1 = m1 + this.fst.element.nonContentWidth();\n    }\n    m2 = this.snd.element.minWidth() + this.snd.element.nonContentWidth();\n    if (m2 != null) {\n      m2 = valueWidth - m2;\n    }\n    if ((m1 != null) && (m2 != null)) {\n      return Math.min(m1, m2);\n    }\n    return m1 || m2 || valueWidth;\n  };\n\n  VerticalSplitter.prototype.adjust = function() {\n    var fstValue, sndValue, value, valueWidth;\n    value = this.value();\n    valueWidth = this.valueWidth();\n    fstValue = value - this.fst.element.nonContentWidth(true);\n    sndValue = (valueWidth - value) - this.snd.element.nonContentWidth(true);\n    if (fstValue <= 0) {\n      if (this.fst.element.is(':visible')) {\n        this.fst.element.hide();\n      }\n      if (!this.snd.element.is(':visible')) {\n        this.snd.element.show();\n      }\n      this.snd.element.outerWidth(true, valueWidth);\n      this._value = value = 0;\n    } else if (sndValue <= 0) {\n      if (!this.fst.element.is(':visible')) {\n        this.fst.element.show();\n      }\n      if (this.snd.element.is(':visible')) {\n        this.snd.element.hide();\n      }\n      this.fst.element.outerWidth(true, valueWidth);\n      this._value = value = valueWidth;\n    } else {\n      if (!this.fst.element.is(':visible')) {\n        this.fst.element.show();\n      }\n      if (!this.snd.element.is(':visible')) {\n        this.snd.element.show();\n      }\n      this.fst.element.width(fstValue);\n      this.snd.element.width(sndValue);\n    }\n    this.fst.adjust();\n    this.snd.adjust();\n    this.element.relativeX(value - this.element.outerWidth() / 2);\n    return this;\n  };\n\n  return VerticalSplitter;\n\n})(Splitter);\n\nHorizontalSplitter = (function(_super) {\n\n  __extends(HorizontalSplitter, _super);\n\n  function HorizontalSplitter(core, fst, snd, defaultVolume) {\n    var _ref, _ref1;\n    HorizontalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);\n    this.element.addClass('horizontal');\n    this.fst.element.addClass('top');\n    this.snd.element.addClass('bottom');\n    if ((_ref = this.fst.curtain) != null) {\n      _ref.css('pointer', 'raw-resize');\n    }\n    if ((_ref1 = this.snd.curtain) != null) {\n      _ref1.css('pointer', 'raw-resize');\n    }\n  }\n\n  HorizontalSplitter.prototype.mousemove = function(e) {\n    var offset, value;\n    offset = this.container.absoluteY() + this.container.contentY(true);\n    value = e.pageY - offset;\n    value = this.regulateValue(value);\n    return this.value(value);\n  };\n\n  HorizontalSplitter.prototype.valueWidth = function() {\n    return this.container.height();\n  };\n\n  HorizontalSplitter.prototype.minValue = function() {\n    var m1, m2;\n    m1 = this.fst.element.minHeight() + this.fst.element.nonContentHeight();\n    m2 = this.snd.element.maxHeight();\n    if (m2 != null) {\n      m2 = this.valueWidth() - (m2 + this.snd.element.nonContentHeight());\n    }\n    if ((m1 != null) && (m2 != null)) {\n      return Math.max(m1, m2);\n    }\n    return m1 || m2 || 0;\n  };\n\n  HorizontalSplitter.prototype.maxValue = function() {\n    var m1, m2, valueWidth;\n    valueWidth = this.valueWidth();\n    m1 = this.fst.element.maxHeight();\n    if (m1 != null) {\n      m1 = m1 + this.fst.element.nonContentHeight();\n    }\n    m2 = this.snd.element.minHeight() + this.snd.element.nonContentHeight();\n    if (m2 != null) {\n      m2 = valueWidth - m2;\n    }\n    if ((m1 != null) && (m2 != null)) {\n      return Math.min(m1, m2);\n    }\n    return m1 || m2 || valueWidth;\n  };\n\n  HorizontalSplitter.prototype.adjust = function() {\n    var fstValue, sndValue, value, valueWidth;\n    value = this.value();\n    valueWidth = this.valueWidth();\n    fstValue = value - this.fst.element.nonContentHeight(true);\n    sndValue = (valueWidth - value) - this.snd.element.nonContentHeight(true);\n    if (fstValue <= 0) {\n      if (this.fst.element.is(':visible')) {\n        this.fst.element.hide();\n      }\n      if (!this.snd.element.is(':visible')) {\n        this.snd.element.show();\n      }\n      this.snd.element.outerHeight(true, valueWidth);\n      this._value = value = 0;\n    } else if (sndValue <= 0) {\n      if (!this.fst.element.is(':visible')) {\n        this.fst.element.show();\n      }\n      if (this.snd.element.is(':visible')) {\n        this.snd.element.hide();\n      }\n      this.fst.element.outerHeight(true, valueWidth);\n      this._value = value = valueWidth;\n    } else {\n      if (!this.fst.element.is(':visible')) {\n        this.fst.element.show();\n      }\n      if (!this.snd.element.is(':visible')) {\n        this.snd.element.show();\n      }\n      this.fst.element.height(fstValue);\n      this.snd.element.height(sndValue);\n    }\n    this.fst.adjust();\n    this.snd.adjust();\n    this.element.relativeY(value - this.element.outerHeight() / 2);\n    return this;\n  };\n\n  return HorizontalSplitter;\n\n})(Splitter);\n\nnamespace('Jencil.splitters', function(exports) {\n  exports.Splitter = Splitter;\n  exports.VerticalSplitter = VerticalSplitter;\n  return exports.HorizontalSplitter = HorizontalSplitter;\n});\n");
__$coverInitRange("src/js/splitters.js", "0:374");
__$coverInitRange("src/js/splitters.js", "377:3003");
__$coverInitRange("src/js/splitters.js", "3006:6236");
__$coverInitRange("src/js/splitters.js", "6239:9393");
__$coverInitRange("src/js/splitters.js", "9396:9584");
__$coverInitRange("src/js/splitters.js", "125:210");
__$coverInitRange("src/js/splitters.js", "212:256");
__$coverInitRange("src/js/splitters.js", "258:291");
__$coverInitRange("src/js/splitters.js", "293:321");
__$coverInitRange("src/js/splitters.js", "323:357");
__$coverInitRange("src/js/splitters.js", "359:371");
__$coverInitRange("src/js/splitters.js", "151:208");
__$coverInitRange("src/js/splitters.js", "230:254");
__$coverInitRange("src/js/splitters.js", "411:438");
__$coverInitRange("src/js/splitters.js", "443:1985");
__$coverInitRange("src/js/splitters.js", "1990:2102");
__$coverInitRange("src/js/splitters.js", "2107:2365");
__$coverInitRange("src/js/splitters.js", "2370:2683");
__$coverInitRange("src/js/splitters.js", "2688:2970");
__$coverInitRange("src/js/splitters.js", "2975:2990");
__$coverInitRange("src/js/splitters.js", "498:540");
__$coverInitRange("src/js/splitters.js", "546:560");
__$coverInitRange("src/js/splitters.js", "566:580");
__$coverInitRange("src/js/splitters.js", "586:650");
__$coverInitRange("src/js/splitters.js", "656:703");
__$coverInitRange("src/js/splitters.js", "709:742");
__$coverInitRange("src/js/splitters.js", "748:781");
__$coverInitRange("src/js/splitters.js", "787:1125");
__$coverInitRange("src/js/splitters.js", "1131:1557");
__$coverInitRange("src/js/splitters.js", "1563:1981");
__$coverInitRange("src/js/splitters.js", "819:834");
__$coverInitRange("src/js/splitters.js", "842:860");
__$coverInitRange("src/js/splitters.js", "868:940");
__$coverInitRange("src/js/splitters.js", "948:1022");
__$coverInitRange("src/js/splitters.js", "1030:1049");
__$coverInitRange("src/js/splitters.js", "1057:1085");
__$coverInitRange("src/js/splitters.js", "1093:1118");
__$coverInitRange("src/js/splitters.js", "918:932");
__$coverInitRange("src/js/splitters.js", "999:1014");
__$coverInitRange("src/js/splitters.js", "1161:1185");
__$coverInitRange("src/js/splitters.js", "1193:1212");
__$coverInitRange("src/js/splitters.js", "1220:1258");
__$coverInitRange("src/js/splitters.js", "1266:1300");
__$coverInitRange("src/js/splitters.js", "1308:1376");
__$coverInitRange("src/js/splitters.js", "1384:1454");
__$coverInitRange("src/js/splitters.js", "1462:1481");
__$coverInitRange("src/js/splitters.js", "1489:1517");
__$coverInitRange("src/js/splitters.js", "1525:1550");
__$coverInitRange("src/js/splitters.js", "1358:1368");
__$coverInitRange("src/js/splitters.js", "1435:1446");
__$coverInitRange("src/js/splitters.js", "1606:1630");
__$coverInitRange("src/js/splitters.js", "1638:1657");
__$coverInitRange("src/js/splitters.js", "1665:1693");
__$coverInitRange("src/js/splitters.js", "1701:1725");
__$coverInitRange("src/js/splitters.js", "1733:1800");
__$coverInitRange("src/js/splitters.js", "1808:1877");
__$coverInitRange("src/js/splitters.js", "1885:1904");
__$coverInitRange("src/js/splitters.js", "1912:1940");
__$coverInitRange("src/js/splitters.js", "1948:1973");
__$coverInitRange("src/js/splitters.js", "1783:1792");
__$coverInitRange("src/js/splitters.js", "1859:1869");
__$coverInitRange("src/js/splitters.js", "2033:2080");
__$coverInitRange("src/js/splitters.js", "2086:2097");
__$coverInitRange("src/js/splitters.js", "2163:2207");
__$coverInitRange("src/js/splitters.js", "2213:2335");
__$coverInitRange("src/js/splitters.js", "2341:2360");
__$coverInitRange("src/js/splitters.js", "2189:2201");
__$coverInitRange("src/js/splitters.js", "2240:2260");
__$coverInitRange("src/js/splitters.js", "2268:2310");
__$coverInitRange("src/js/splitters.js", "2318:2329");
__$coverInitRange("src/js/splitters.js", "2289:2302");
__$coverInitRange("src/js/splitters.js", "2425:2447");
__$coverInitRange("src/js/splitters.js", "2453:2497");
__$coverInitRange("src/js/splitters.js", "2503:2533");
__$coverInitRange("src/js/splitters.js", "2539:2639");
__$coverInitRange("src/js/splitters.js", "2645:2678");
__$coverInitRange("src/js/splitters.js", "2479:2491");
__$coverInitRange("src/js/splitters.js", "2566:2593");
__$coverInitRange("src/js/splitters.js", "2601:2633");
__$coverInitRange("src/js/splitters.js", "2745:2767");
__$coverInitRange("src/js/splitters.js", "2773:2799");
__$coverInitRange("src/js/splitters.js", "2805:2831");
__$coverInitRange("src/js/splitters.js", "2837:2889");
__$coverInitRange("src/js/splitters.js", "2895:2947");
__$coverInitRange("src/js/splitters.js", "2953:2965");
__$coverInitRange("src/js/splitters.js", "2867:2883");
__$coverInitRange("src/js/splitters.js", "2925:2941");
__$coverInitRange("src/js/splitters.js", "3048:3083");
__$coverInitRange("src/js/splitters.js", "3088:3674");
__$coverInitRange("src/js/splitters.js", "3679:3930");
__$coverInitRange("src/js/splitters.js", "3935:4026");
__$coverInitRange("src/js/splitters.js", "4031:4419");
__$coverInitRange("src/js/splitters.js", "4424:4903");
__$coverInitRange("src/js/splitters.js", "4908:6193");
__$coverInitRange("src/js/splitters.js", "6198:6221");
__$coverInitRange("src/js/splitters.js", "3151:3166");
__$coverInitRange("src/js/splitters.js", "3172:3252");
__$coverInitRange("src/js/splitters.js", "3258:3291");
__$coverInitRange("src/js/splitters.js", "3297:3330");
__$coverInitRange("src/js/splitters.js", "3336:3370");
__$coverInitRange("src/js/splitters.js", "3376:3427");
__$coverInitRange("src/js/splitters.js", "3433:3484");
__$coverInitRange("src/js/splitters.js", "3490:3576");
__$coverInitRange("src/js/splitters.js", "3582:3670");
__$coverInitRange("src/js/splitters.js", "3537:3570");
__$coverInitRange("src/js/splitters.js", "3630:3664");
__$coverInitRange("src/js/splitters.js", "3736:3753");
__$coverInitRange("src/js/splitters.js", "3759:3826");
__$coverInitRange("src/js/splitters.js", "3832:3856");
__$coverInitRange("src/js/splitters.js", "3862:3895");
__$coverInitRange("src/js/splitters.js", "3901:3925");
__$coverInitRange("src/js/splitters.js", "3992:4021");
__$coverInitRange("src/js/splitters.js", "4086:4096");
__$coverInitRange("src/js/splitters.js", "4102:4171");
__$coverInitRange("src/js/splitters.js", "4177:4209");
__$coverInitRange("src/js/splitters.js", "4215:4311");
__$coverInitRange("src/js/splitters.js", "4317:4388");
__$coverInitRange("src/js/splitters.js", "4394:4414");
__$coverInitRange("src/js/splitters.js", "4239:4305");
__$coverInitRange("src/js/splitters.js", "4359:4382");
__$coverInitRange("src/js/splitters.js", "4479:4501");
__$coverInitRange("src/js/splitters.js", "4507:4537");
__$coverInitRange("src/js/splitters.js", "4543:4575");
__$coverInitRange("src/js/splitters.js", "4581:4655");
__$coverInitRange("src/js/splitters.js", "4661:4730");
__$coverInitRange("src/js/splitters.js", "4736:4786");
__$coverInitRange("src/js/splitters.js", "4792:4863");
__$coverInitRange("src/js/splitters.js", "4869:4898");
__$coverInitRange("src/js/splitters.js", "4605:4649");
__$coverInitRange("src/js/splitters.js", "4760:4780");
__$coverInitRange("src/js/splitters.js", "4834:4857");
__$coverInitRange("src/js/splitters.js", "4961:5002");
__$coverInitRange("src/js/splitters.js", "5008:5028");
__$coverInitRange("src/js/splitters.js", "5034:5064");
__$coverInitRange("src/js/splitters.js", "5070:5127");
__$coverInitRange("src/js/splitters.js", "5133:5205");
__$coverInitRange("src/js/splitters.js", "5211:6058");
__$coverInitRange("src/js/splitters.js", "6064:6081");
__$coverInitRange("src/js/splitters.js", "6087:6104");
__$coverInitRange("src/js/splitters.js", "6110:6171");
__$coverInitRange("src/js/splitters.js", "6177:6188");
__$coverInitRange("src/js/splitters.js", "5238:5316");
__$coverInitRange("src/js/splitters.js", "5324:5403");
__$coverInitRange("src/js/splitters.js", "5411:5456");
__$coverInitRange("src/js/splitters.js", "5464:5487");
__$coverInitRange("src/js/splitters.js", "5285:5308");
__$coverInitRange("src/js/splitters.js", "5372:5395");
__$coverInitRange("src/js/splitters.js", "5527:5606");
__$coverInitRange("src/js/splitters.js", "5614:5692");
__$coverInitRange("src/js/splitters.js", "5700:5745");
__$coverInitRange("src/js/splitters.js", "5753:5785");
__$coverInitRange("src/js/splitters.js", "5575:5598");
__$coverInitRange("src/js/splitters.js", "5661:5684");
__$coverInitRange("src/js/splitters.js", "5806:5885");
__$coverInitRange("src/js/splitters.js", "5893:5972");
__$coverInitRange("src/js/splitters.js", "5980:6012");
__$coverInitRange("src/js/splitters.js", "6020:6052");
__$coverInitRange("src/js/splitters.js", "5854:5877");
__$coverInitRange("src/js/splitters.js", "5941:5964");
__$coverInitRange("src/js/splitters.js", "6283:6320");
__$coverInitRange("src/js/splitters.js", "6325:6803");
__$coverInitRange("src/js/splitters.js", "6808:7061");
__$coverInitRange("src/js/splitters.js", "7066:7160");
__$coverInitRange("src/js/splitters.js", "7165:7559");
__$coverInitRange("src/js/splitters.js", "7564:8049");
__$coverInitRange("src/js/splitters.js", "8054:9348");
__$coverInitRange("src/js/splitters.js", "9353:9378");
__$coverInitRange("src/js/splitters.js", "6390:6405");
__$coverInitRange("src/js/splitters.js", "6411:6493");
__$coverInitRange("src/js/splitters.js", "6499:6534");
__$coverInitRange("src/js/splitters.js", "6540:6572");
__$coverInitRange("src/js/splitters.js", "6578:6613");
__$coverInitRange("src/js/splitters.js", "6619:6705");
__$coverInitRange("src/js/splitters.js", "6711:6799");
__$coverInitRange("src/js/splitters.js", "6666:6699");
__$coverInitRange("src/js/splitters.js", "6759:6793");
__$coverInitRange("src/js/splitters.js", "6867:6884");
__$coverInitRange("src/js/splitters.js", "6890:6957");
__$coverInitRange("src/js/splitters.js", "6963:6987");
__$coverInitRange("src/js/splitters.js", "6993:7026");
__$coverInitRange("src/js/splitters.js", "7032:7056");
__$coverInitRange("src/js/splitters.js", "7125:7155");
__$coverInitRange("src/js/splitters.js", "7222:7232");
__$coverInitRange("src/js/splitters.js", "7238:7309");
__$coverInitRange("src/js/splitters.js", "7315:7348");
__$coverInitRange("src/js/splitters.js", "7354:7451");
__$coverInitRange("src/js/splitters.js", "7457:7528");
__$coverInitRange("src/js/splitters.js", "7534:7554");
__$coverInitRange("src/js/splitters.js", "7378:7445");
__$coverInitRange("src/js/splitters.js", "7499:7522");
__$coverInitRange("src/js/splitters.js", "7621:7643");
__$coverInitRange("src/js/splitters.js", "7649:7679");
__$coverInitRange("src/js/splitters.js", "7685:7718");
__$coverInitRange("src/js/splitters.js", "7724:7799");
__$coverInitRange("src/js/splitters.js", "7805:7876");
__$coverInitRange("src/js/splitters.js", "7882:7932");
__$coverInitRange("src/js/splitters.js", "7938:8009");
__$coverInitRange("src/js/splitters.js", "8015:8044");
__$coverInitRange("src/js/splitters.js", "7748:7793");
__$coverInitRange("src/js/splitters.js", "7906:7926");
__$coverInitRange("src/js/splitters.js", "7980:8003");
__$coverInitRange("src/js/splitters.js", "8109:8150");
__$coverInitRange("src/js/splitters.js", "8156:8176");
__$coverInitRange("src/js/splitters.js", "8182:8212");
__$coverInitRange("src/js/splitters.js", "8218:8276");
__$coverInitRange("src/js/splitters.js", "8282:8355");
__$coverInitRange("src/js/splitters.js", "8361:9212");
__$coverInitRange("src/js/splitters.js", "9218:9235");
__$coverInitRange("src/js/splitters.js", "9241:9258");
__$coverInitRange("src/js/splitters.js", "9264:9326");
__$coverInitRange("src/js/splitters.js", "9332:9343");
__$coverInitRange("src/js/splitters.js", "8388:8466");
__$coverInitRange("src/js/splitters.js", "8474:8553");
__$coverInitRange("src/js/splitters.js", "8561:8607");
__$coverInitRange("src/js/splitters.js", "8615:8638");
__$coverInitRange("src/js/splitters.js", "8435:8458");
__$coverInitRange("src/js/splitters.js", "8522:8545");
__$coverInitRange("src/js/splitters.js", "8678:8757");
__$coverInitRange("src/js/splitters.js", "8765:8843");
__$coverInitRange("src/js/splitters.js", "8851:8897");
__$coverInitRange("src/js/splitters.js", "8905:8937");
__$coverInitRange("src/js/splitters.js", "8726:8749");
__$coverInitRange("src/js/splitters.js", "8812:8835");
__$coverInitRange("src/js/splitters.js", "8958:9037");
__$coverInitRange("src/js/splitters.js", "9045:9124");
__$coverInitRange("src/js/splitters.js", "9132:9165");
__$coverInitRange("src/js/splitters.js", "9173:9206");
__$coverInitRange("src/js/splitters.js", "9006:9029");
__$coverInitRange("src/js/splitters.js", "9093:9116");
__$coverInitRange("src/js/splitters.js", "9448:9475");
__$coverInitRange("src/js/splitters.js", "9479:9522");
__$coverInitRange("src/js/splitters.js", "9526:9580");
__$coverCall('src/js/splitters.js', '0:374');
var HorizontalSplitter, Splitter, VerticalSplitter, __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
        __$coverCall('src/js/splitters.js', '125:210');
        for (var key in parent) {
            __$coverCall('src/js/splitters.js', '151:208');
            if (__hasProp.call(parent, key))
                child[key] = parent[key];
        }
        __$coverCall('src/js/splitters.js', '212:256');
        function ctor() {
            __$coverCall('src/js/splitters.js', '230:254');
            this.constructor = child;
        }
        __$coverCall('src/js/splitters.js', '258:291');
        ctor.prototype = parent.prototype;
        __$coverCall('src/js/splitters.js', '293:321');
        child.prototype = new ctor();
        __$coverCall('src/js/splitters.js', '323:357');
        child.__super__ = parent.prototype;
        __$coverCall('src/js/splitters.js', '359:371');
        return child;
    };
__$coverCall('src/js/splitters.js', '377:3003');
Splitter = function (_super) {
    __$coverCall('src/js/splitters.js', '411:438');
    __extends(Splitter, _super);
    __$coverCall('src/js/splitters.js', '443:1985');
    function Splitter(core, fst, snd, defaultVolume) {
        __$coverCall('src/js/splitters.js', '498:540');
        var mousemove, mouseup, _this = this;
        __$coverCall('src/js/splitters.js', '546:560');
        this.fst = fst;
        __$coverCall('src/js/splitters.js', '566:580');
        this.snd = snd;
        __$coverCall('src/js/splitters.js', '586:650');
        this.defaultVolume = defaultVolume != null ? defaultVolume : 0.5;
        __$coverCall('src/js/splitters.js', '656:703');
        Splitter.__super__.constructor.call(this, core);
        __$coverCall('src/js/splitters.js', '709:742');
        this.element.addClass('splitter');
        __$coverCall('src/js/splitters.js', '748:781');
        this._volume = this.defaultVolume;
        __$coverCall('src/js/splitters.js', '787:1125');
        mousemove = function (e) {
            __$coverCall('src/js/splitters.js', '819:834');
            var _ref, _ref1;
            __$coverCall('src/js/splitters.js', '842:860');
            _this.mousemove(e);
            __$coverCall('src/js/splitters.js', '868:940');
            if ((_ref = _this.fst.curtain) != null) {
                __$coverCall('src/js/splitters.js', '918:932');
                _ref.refresh();
            }
            __$coverCall('src/js/splitters.js', '948:1022');
            if ((_ref1 = _this.snd.curtain) != null) {
                __$coverCall('src/js/splitters.js', '999:1014');
                _ref1.refresh();
            }
            __$coverCall('src/js/splitters.js', '1030:1049');
            e.stopPropagation();
            __$coverCall('src/js/splitters.js', '1057:1085');
            e.stopImmediatePropagation();
            __$coverCall('src/js/splitters.js', '1093:1118');
            return e.preventDefault();
        };
        __$coverCall('src/js/splitters.js', '1131:1557');
        mouseup = function (e) {
            __$coverCall('src/js/splitters.js', '1161:1185');
            var $window, _ref, _ref1;
            __$coverCall('src/js/splitters.js', '1193:1212');
            $window = $(window);
            __$coverCall('src/js/splitters.js', '1220:1258');
            $window.unbind('mousemove', mousemove);
            __$coverCall('src/js/splitters.js', '1266:1300');
            $window.unbind('mouseup', mouseup);
            __$coverCall('src/js/splitters.js', '1308:1376');
            if ((_ref = _this.fst.curtain) != null) {
                __$coverCall('src/js/splitters.js', '1358:1368');
                _ref.off();
            }
            __$coverCall('src/js/splitters.js', '1384:1454');
            if ((_ref1 = _this.snd.curtain) != null) {
                __$coverCall('src/js/splitters.js', '1435:1446');
                _ref1.off();
            }
            __$coverCall('src/js/splitters.js', '1462:1481');
            e.stopPropagation();
            __$coverCall('src/js/splitters.js', '1489:1517');
            e.stopImmediatePropagation();
            __$coverCall('src/js/splitters.js', '1525:1550');
            return e.preventDefault();
        };
        __$coverCall('src/js/splitters.js', '1563:1981');
        this.element.mousedown(function (e) {
            __$coverCall('src/js/splitters.js', '1606:1630');
            var $window, _ref, _ref1;
            __$coverCall('src/js/splitters.js', '1638:1657');
            $window = $(window);
            __$coverCall('src/js/splitters.js', '1665:1693');
            $window.mousemove(mousemove);
            __$coverCall('src/js/splitters.js', '1701:1725');
            $window.mouseup(mouseup);
            __$coverCall('src/js/splitters.js', '1733:1800');
            if ((_ref = _this.fst.curtain) != null) {
                __$coverCall('src/js/splitters.js', '1783:1792');
                _ref.on();
            }
            __$coverCall('src/js/splitters.js', '1808:1877');
            if ((_ref1 = _this.snd.curtain) != null) {
                __$coverCall('src/js/splitters.js', '1859:1869');
                _ref1.on();
            }
            __$coverCall('src/js/splitters.js', '1885:1904');
            e.stopPropagation();
            __$coverCall('src/js/splitters.js', '1912:1940');
            e.stopImmediatePropagation();
            __$coverCall('src/js/splitters.js', '1948:1973');
            return e.preventDefault();
        });
    }
    __$coverCall('src/js/splitters.js', '1990:2102');
    Splitter.prototype.init = function () {
        __$coverCall('src/js/splitters.js', '2033:2080');
        this.container = evolute(this.element.parent());
        __$coverCall('src/js/splitters.js', '2086:2097');
        return this;
    };
    __$coverCall('src/js/splitters.js', '2107:2365');
    Splitter.prototype.volume = function (value, skip) {
        __$coverCall('src/js/splitters.js', '2163:2207');
        if (skip == null) {
            __$coverCall('src/js/splitters.js', '2189:2201');
            skip = false;
        }
        __$coverCall('src/js/splitters.js', '2213:2335');
        if (value != null) {
            __$coverCall('src/js/splitters.js', '2240:2260');
            this._volume = value;
            __$coverCall('src/js/splitters.js', '2268:2310');
            if (!skip) {
                __$coverCall('src/js/splitters.js', '2289:2302');
                this.adjust();
            }
            __$coverCall('src/js/splitters.js', '2318:2329');
            return this;
        }
        __$coverCall('src/js/splitters.js', '2341:2360');
        return this._volume;
    };
    __$coverCall('src/js/splitters.js', '2370:2683');
    Splitter.prototype.value = function (value, skip) {
        __$coverCall('src/js/splitters.js', '2425:2447');
        var valueWidth, volume;
        __$coverCall('src/js/splitters.js', '2453:2497');
        if (skip == null) {
            __$coverCall('src/js/splitters.js', '2479:2491');
            skip = false;
        }
        __$coverCall('src/js/splitters.js', '2503:2533');
        valueWidth = this.valueWidth();
        __$coverCall('src/js/splitters.js', '2539:2639');
        if (value != null) {
            __$coverCall('src/js/splitters.js', '2566:2593');
            volume = value / valueWidth;
            __$coverCall('src/js/splitters.js', '2601:2633');
            return this.volume(volume, skip);
        }
        __$coverCall('src/js/splitters.js', '2645:2678');
        return this.volume() * valueWidth;
    };
    __$coverCall('src/js/splitters.js', '2688:2970');
    Splitter.prototype.regulateValue = function (value) {
        __$coverCall('src/js/splitters.js', '2745:2767');
        var maxValue, minValue;
        __$coverCall('src/js/splitters.js', '2773:2799');
        minValue = this.minValue();
        __$coverCall('src/js/splitters.js', '2805:2831');
        maxValue = this.maxValue();
        __$coverCall('src/js/splitters.js', '2837:2889');
        if (value < minValue) {
            __$coverCall('src/js/splitters.js', '2867:2883');
            value = minValue;
        }
        __$coverCall('src/js/splitters.js', '2895:2947');
        if (value > maxValue) {
            __$coverCall('src/js/splitters.js', '2925:2941');
            value = maxValue;
        }
        __$coverCall('src/js/splitters.js', '2953:2965');
        return value;
    };
    __$coverCall('src/js/splitters.js', '2975:2990');
    return Splitter;
}(Widget);
__$coverCall('src/js/splitters.js', '3006:6236');
VerticalSplitter = function (_super) {
    __$coverCall('src/js/splitters.js', '3048:3083');
    __extends(VerticalSplitter, _super);
    __$coverCall('src/js/splitters.js', '3088:3674');
    function VerticalSplitter(core, fst, snd, defaultVolume) {
        __$coverCall('src/js/splitters.js', '3151:3166');
        var _ref, _ref1;
        __$coverCall('src/js/splitters.js', '3172:3252');
        VerticalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);
        __$coverCall('src/js/splitters.js', '3258:3291');
        this.element.addClass('vertical');
        __$coverCall('src/js/splitters.js', '3297:3330');
        this.fst.element.addClass('left');
        __$coverCall('src/js/splitters.js', '3336:3370');
        this.snd.element.addClass('right');
        __$coverCall('src/js/splitters.js', '3376:3427');
        this.fst.element.css({ 'float': 'left' });
        __$coverCall('src/js/splitters.js', '3433:3484');
        this.snd.element.css({ 'float': 'left' });
        __$coverCall('src/js/splitters.js', '3490:3576');
        if ((_ref = this.fst.curtain) != null) {
            __$coverCall('src/js/splitters.js', '3537:3570');
            _ref.css('pointer', 'col-resize');
        }
        __$coverCall('src/js/splitters.js', '3582:3670');
        if ((_ref1 = this.snd.curtain) != null) {
            __$coverCall('src/js/splitters.js', '3630:3664');
            _ref1.css('pointer', 'col-resize');
        }
    }
    __$coverCall('src/js/splitters.js', '3679:3930');
    VerticalSplitter.prototype.mousemove = function (e) {
        __$coverCall('src/js/splitters.js', '3736:3753');
        var offset, value;
        __$coverCall('src/js/splitters.js', '3759:3826');
        offset = this.container.absoluteX() + this.container.contentX(true);
        __$coverCall('src/js/splitters.js', '3832:3856');
        value = e.pageX - offset;
        __$coverCall('src/js/splitters.js', '3862:3895');
        value = this.regulateValue(value);
        __$coverCall('src/js/splitters.js', '3901:3925');
        return this.value(value);
    };
    __$coverCall('src/js/splitters.js', '3935:4026');
    VerticalSplitter.prototype.valueWidth = function () {
        __$coverCall('src/js/splitters.js', '3992:4021');
        return this.container.width();
    };
    __$coverCall('src/js/splitters.js', '4031:4419');
    VerticalSplitter.prototype.minValue = function () {
        __$coverCall('src/js/splitters.js', '4086:4096');
        var m1, m2;
        __$coverCall('src/js/splitters.js', '4102:4171');
        m1 = this.fst.element.minWidth() + this.fst.element.nonContentWidth();
        __$coverCall('src/js/splitters.js', '4177:4209');
        m2 = this.snd.element.maxWidth();
        __$coverCall('src/js/splitters.js', '4215:4311');
        if (m2 != null) {
            __$coverCall('src/js/splitters.js', '4239:4305');
            m2 = this.valueWidth() - (m2 + this.snd.element.nonContentWidth());
        }
        __$coverCall('src/js/splitters.js', '4317:4388');
        if (m1 != null && m2 != null) {
            __$coverCall('src/js/splitters.js', '4359:4382');
            return Math.max(m1, m2);
        }
        __$coverCall('src/js/splitters.js', '4394:4414');
        return m1 || m2 || 0;
    };
    __$coverCall('src/js/splitters.js', '4424:4903');
    VerticalSplitter.prototype.maxValue = function () {
        __$coverCall('src/js/splitters.js', '4479:4501');
        var m1, m2, valueWidth;
        __$coverCall('src/js/splitters.js', '4507:4537');
        valueWidth = this.valueWidth();
        __$coverCall('src/js/splitters.js', '4543:4575');
        m1 = this.fst.element.maxWidth();
        __$coverCall('src/js/splitters.js', '4581:4655');
        if (m1 != null) {
            __$coverCall('src/js/splitters.js', '4605:4649');
            m1 = m1 + this.fst.element.nonContentWidth();
        }
        __$coverCall('src/js/splitters.js', '4661:4730');
        m2 = this.snd.element.minWidth() + this.snd.element.nonContentWidth();
        __$coverCall('src/js/splitters.js', '4736:4786');
        if (m2 != null) {
            __$coverCall('src/js/splitters.js', '4760:4780');
            m2 = valueWidth - m2;
        }
        __$coverCall('src/js/splitters.js', '4792:4863');
        if (m1 != null && m2 != null) {
            __$coverCall('src/js/splitters.js', '4834:4857');
            return Math.min(m1, m2);
        }
        __$coverCall('src/js/splitters.js', '4869:4898');
        return m1 || m2 || valueWidth;
    };
    __$coverCall('src/js/splitters.js', '4908:6193');
    VerticalSplitter.prototype.adjust = function () {
        __$coverCall('src/js/splitters.js', '4961:5002');
        var fstValue, sndValue, value, valueWidth;
        __$coverCall('src/js/splitters.js', '5008:5028');
        value = this.value();
        __$coverCall('src/js/splitters.js', '5034:5064');
        valueWidth = this.valueWidth();
        __$coverCall('src/js/splitters.js', '5070:5127');
        fstValue = value - this.fst.element.nonContentWidth(true);
        __$coverCall('src/js/splitters.js', '5133:5205');
        sndValue = valueWidth - value - this.snd.element.nonContentWidth(true);
        __$coverCall('src/js/splitters.js', '5211:6058');
        if (fstValue <= 0) {
            __$coverCall('src/js/splitters.js', '5238:5316');
            if (this.fst.element.is(':visible')) {
                __$coverCall('src/js/splitters.js', '5285:5308');
                this.fst.element.hide();
            }
            __$coverCall('src/js/splitters.js', '5324:5403');
            if (!this.snd.element.is(':visible')) {
                __$coverCall('src/js/splitters.js', '5372:5395');
                this.snd.element.show();
            }
            __$coverCall('src/js/splitters.js', '5411:5456');
            this.snd.element.outerWidth(true, valueWidth);
            __$coverCall('src/js/splitters.js', '5464:5487');
            this._value = value = 0;
        } else if (sndValue <= 0) {
            __$coverCall('src/js/splitters.js', '5527:5606');
            if (!this.fst.element.is(':visible')) {
                __$coverCall('src/js/splitters.js', '5575:5598');
                this.fst.element.show();
            }
            __$coverCall('src/js/splitters.js', '5614:5692');
            if (this.snd.element.is(':visible')) {
                __$coverCall('src/js/splitters.js', '5661:5684');
                this.snd.element.hide();
            }
            __$coverCall('src/js/splitters.js', '5700:5745');
            this.fst.element.outerWidth(true, valueWidth);
            __$coverCall('src/js/splitters.js', '5753:5785');
            this._value = value = valueWidth;
        } else {
            __$coverCall('src/js/splitters.js', '5806:5885');
            if (!this.fst.element.is(':visible')) {
                __$coverCall('src/js/splitters.js', '5854:5877');
                this.fst.element.show();
            }
            __$coverCall('src/js/splitters.js', '5893:5972');
            if (!this.snd.element.is(':visible')) {
                __$coverCall('src/js/splitters.js', '5941:5964');
                this.snd.element.show();
            }
            __$coverCall('src/js/splitters.js', '5980:6012');
            this.fst.element.width(fstValue);
            __$coverCall('src/js/splitters.js', '6020:6052');
            this.snd.element.width(sndValue);
        }
        __$coverCall('src/js/splitters.js', '6064:6081');
        this.fst.adjust();
        __$coverCall('src/js/splitters.js', '6087:6104');
        this.snd.adjust();
        __$coverCall('src/js/splitters.js', '6110:6171');
        this.element.relativeX(value - this.element.outerWidth() / 2);
        __$coverCall('src/js/splitters.js', '6177:6188');
        return this;
    };
    __$coverCall('src/js/splitters.js', '6198:6221');
    return VerticalSplitter;
}(Splitter);
__$coverCall('src/js/splitters.js', '6239:9393');
HorizontalSplitter = function (_super) {
    __$coverCall('src/js/splitters.js', '6283:6320');
    __extends(HorizontalSplitter, _super);
    __$coverCall('src/js/splitters.js', '6325:6803');
    function HorizontalSplitter(core, fst, snd, defaultVolume) {
        __$coverCall('src/js/splitters.js', '6390:6405');
        var _ref, _ref1;
        __$coverCall('src/js/splitters.js', '6411:6493');
        HorizontalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);
        __$coverCall('src/js/splitters.js', '6499:6534');
        this.element.addClass('horizontal');
        __$coverCall('src/js/splitters.js', '6540:6572');
        this.fst.element.addClass('top');
        __$coverCall('src/js/splitters.js', '6578:6613');
        this.snd.element.addClass('bottom');
        __$coverCall('src/js/splitters.js', '6619:6705');
        if ((_ref = this.fst.curtain) != null) {
            __$coverCall('src/js/splitters.js', '6666:6699');
            _ref.css('pointer', 'raw-resize');
        }
        __$coverCall('src/js/splitters.js', '6711:6799');
        if ((_ref1 = this.snd.curtain) != null) {
            __$coverCall('src/js/splitters.js', '6759:6793');
            _ref1.css('pointer', 'raw-resize');
        }
    }
    __$coverCall('src/js/splitters.js', '6808:7061');
    HorizontalSplitter.prototype.mousemove = function (e) {
        __$coverCall('src/js/splitters.js', '6867:6884');
        var offset, value;
        __$coverCall('src/js/splitters.js', '6890:6957');
        offset = this.container.absoluteY() + this.container.contentY(true);
        __$coverCall('src/js/splitters.js', '6963:6987');
        value = e.pageY - offset;
        __$coverCall('src/js/splitters.js', '6993:7026');
        value = this.regulateValue(value);
        __$coverCall('src/js/splitters.js', '7032:7056');
        return this.value(value);
    };
    __$coverCall('src/js/splitters.js', '7066:7160');
    HorizontalSplitter.prototype.valueWidth = function () {
        __$coverCall('src/js/splitters.js', '7125:7155');
        return this.container.height();
    };
    __$coverCall('src/js/splitters.js', '7165:7559');
    HorizontalSplitter.prototype.minValue = function () {
        __$coverCall('src/js/splitters.js', '7222:7232');
        var m1, m2;
        __$coverCall('src/js/splitters.js', '7238:7309');
        m1 = this.fst.element.minHeight() + this.fst.element.nonContentHeight();
        __$coverCall('src/js/splitters.js', '7315:7348');
        m2 = this.snd.element.maxHeight();
        __$coverCall('src/js/splitters.js', '7354:7451');
        if (m2 != null) {
            __$coverCall('src/js/splitters.js', '7378:7445');
            m2 = this.valueWidth() - (m2 + this.snd.element.nonContentHeight());
        }
        __$coverCall('src/js/splitters.js', '7457:7528');
        if (m1 != null && m2 != null) {
            __$coverCall('src/js/splitters.js', '7499:7522');
            return Math.max(m1, m2);
        }
        __$coverCall('src/js/splitters.js', '7534:7554');
        return m1 || m2 || 0;
    };
    __$coverCall('src/js/splitters.js', '7564:8049');
    HorizontalSplitter.prototype.maxValue = function () {
        __$coverCall('src/js/splitters.js', '7621:7643');
        var m1, m2, valueWidth;
        __$coverCall('src/js/splitters.js', '7649:7679');
        valueWidth = this.valueWidth();
        __$coverCall('src/js/splitters.js', '7685:7718');
        m1 = this.fst.element.maxHeight();
        __$coverCall('src/js/splitters.js', '7724:7799');
        if (m1 != null) {
            __$coverCall('src/js/splitters.js', '7748:7793');
            m1 = m1 + this.fst.element.nonContentHeight();
        }
        __$coverCall('src/js/splitters.js', '7805:7876');
        m2 = this.snd.element.minHeight() + this.snd.element.nonContentHeight();
        __$coverCall('src/js/splitters.js', '7882:7932');
        if (m2 != null) {
            __$coverCall('src/js/splitters.js', '7906:7926');
            m2 = valueWidth - m2;
        }
        __$coverCall('src/js/splitters.js', '7938:8009');
        if (m1 != null && m2 != null) {
            __$coverCall('src/js/splitters.js', '7980:8003');
            return Math.min(m1, m2);
        }
        __$coverCall('src/js/splitters.js', '8015:8044');
        return m1 || m2 || valueWidth;
    };
    __$coverCall('src/js/splitters.js', '8054:9348');
    HorizontalSplitter.prototype.adjust = function () {
        __$coverCall('src/js/splitters.js', '8109:8150');
        var fstValue, sndValue, value, valueWidth;
        __$coverCall('src/js/splitters.js', '8156:8176');
        value = this.value();
        __$coverCall('src/js/splitters.js', '8182:8212');
        valueWidth = this.valueWidth();
        __$coverCall('src/js/splitters.js', '8218:8276');
        fstValue = value - this.fst.element.nonContentHeight(true);
        __$coverCall('src/js/splitters.js', '8282:8355');
        sndValue = valueWidth - value - this.snd.element.nonContentHeight(true);
        __$coverCall('src/js/splitters.js', '8361:9212');
        if (fstValue <= 0) {
            __$coverCall('src/js/splitters.js', '8388:8466');
            if (this.fst.element.is(':visible')) {
                __$coverCall('src/js/splitters.js', '8435:8458');
                this.fst.element.hide();
            }
            __$coverCall('src/js/splitters.js', '8474:8553');
            if (!this.snd.element.is(':visible')) {
                __$coverCall('src/js/splitters.js', '8522:8545');
                this.snd.element.show();
            }
            __$coverCall('src/js/splitters.js', '8561:8607');
            this.snd.element.outerHeight(true, valueWidth);
            __$coverCall('src/js/splitters.js', '8615:8638');
            this._value = value = 0;
        } else if (sndValue <= 0) {
            __$coverCall('src/js/splitters.js', '8678:8757');
            if (!this.fst.element.is(':visible')) {
                __$coverCall('src/js/splitters.js', '8726:8749');
                this.fst.element.show();
            }
            __$coverCall('src/js/splitters.js', '8765:8843');
            if (this.snd.element.is(':visible')) {
                __$coverCall('src/js/splitters.js', '8812:8835');
                this.snd.element.hide();
            }
            __$coverCall('src/js/splitters.js', '8851:8897');
            this.fst.element.outerHeight(true, valueWidth);
            __$coverCall('src/js/splitters.js', '8905:8937');
            this._value = value = valueWidth;
        } else {
            __$coverCall('src/js/splitters.js', '8958:9037');
            if (!this.fst.element.is(':visible')) {
                __$coverCall('src/js/splitters.js', '9006:9029');
                this.fst.element.show();
            }
            __$coverCall('src/js/splitters.js', '9045:9124');
            if (!this.snd.element.is(':visible')) {
                __$coverCall('src/js/splitters.js', '9093:9116');
                this.snd.element.show();
            }
            __$coverCall('src/js/splitters.js', '9132:9165');
            this.fst.element.height(fstValue);
            __$coverCall('src/js/splitters.js', '9173:9206');
            this.snd.element.height(sndValue);
        }
        __$coverCall('src/js/splitters.js', '9218:9235');
        this.fst.adjust();
        __$coverCall('src/js/splitters.js', '9241:9258');
        this.snd.adjust();
        __$coverCall('src/js/splitters.js', '9264:9326');
        this.element.relativeY(value - this.element.outerHeight() / 2);
        __$coverCall('src/js/splitters.js', '9332:9343');
        return this;
    };
    __$coverCall('src/js/splitters.js', '9353:9378');
    return HorizontalSplitter;
}(Splitter);
__$coverCall('src/js/splitters.js', '9396:9584');
namespace('Jencil.splitters', function (exports) {
    __$coverCall('src/js/splitters.js', '9448:9475');
    exports.Splitter = Splitter;
    __$coverCall('src/js/splitters.js', '9479:9522');
    exports.VerticalSplitter = VerticalSplitter;
    __$coverCall('src/js/splitters.js', '9526:9580');
    return exports.HorizontalSplitter = HorizontalSplitter;
});