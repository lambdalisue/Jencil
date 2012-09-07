var HorizontalSplitter, Splitter, VerticalSplitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Splitter = (function(_super) {

  __extends(Splitter, _super);

  function Splitter(core, fst, snd, defaultVolume) {
    var mousemove, mouseup,
      _this = this;
    this.fst = fst;
    this.snd = snd;
    this.defaultVolume = defaultVolume != null ? defaultVolume : 0.5;
    Splitter.__super__.constructor.call(this, core);
    this.element.addClass('splitter');
    this._volume = this.defaultVolume;
    this._curtain = $('<div>').hide().css({
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'overflow': 'hidden',
      'z-index': 99999
    });
    mousemove = function(e) {
      _this.mousemove(e);
      e.stopPropagation();
      e.stopImmediatePropagation();
      return e.preventDefault();
    };
    mouseup = function(e) {
      var $window;
      $window = $(window);
      $window.unbind('mousemove', mousemove);
      $window.unbind('mouseup', mouseup);
      _this._curtain.hide();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return e.preventDefault();
    };
    this.element.mousedown(function(e) {
      var $window, container;
      $window = $(window);
      $window.mousemove(mousemove);
      $window.mouseup(mouseup);
      container = _this.element.parent();
      _this._curtain.outerWidth(container.width());
      _this._curtain.outerHeight(container.height());
      _this._curtain.show();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return e.preventDefault();
    });
  }

  Splitter.prototype.init = function() {
    var container;
    container = this.element.parent();
    return container.append(this._curtain);
  };

  Splitter.prototype.volume = function(value, skip) {
    if (skip == null) {
      skip = false;
    }
    if (value != null) {
      this._volume = value;
      if (!skip) {
        this.adjust();
      }
      return this;
    }
    return this._volume;
  };

  Splitter.prototype.value = function(value, skip) {
    var valueWidth, volume;
    if (skip == null) {
      skip = false;
    }
    valueWidth = this.valueWidth();
    if (value != null) {
      volume = value / valueWidth;
      return this.volume(volume, skip);
    }
    return this.volume() * valueWidth;
  };

  Splitter.prototype.regulateValue = function(value) {
    var maxValue, minValue;
    minValue = this.minValue();
    maxValue = this.maxValue();
    if (value < minValue) {
      value = minValue;
    }
    if (value > maxValue) {
      value = maxValue;
    }
    return value;
  };

  return Splitter;

})(Widget);

VerticalSplitter = (function(_super) {

  __extends(VerticalSplitter, _super);

  function VerticalSplitter(core, fst, snd, defaultVolume) {
    VerticalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);
    this.element.addClass('vertical');
    this.fst.element.addClass('left');
    this.snd.element.addClass('right');
    this.fst.element.css({
      'float': 'left'
    });
    this.snd.element.css({
      'float': 'left'
    });
    this._curtain.css('pointer', 'col-resize');
  }

  VerticalSplitter.prototype.mousemove = function(e) {
    var container, value;
    container = this.fst.parent();
    value = e.pageX - (container.element.absoluteX() + container.element.contentX(true));
    value = this.regulateValue(value);
    return this.value(value);
  };

  VerticalSplitter.prototype.valueWidth = function() {
    var container;
    container = this.fst.parent();
    return container.element.width();
  };

  VerticalSplitter.prototype.minValue = function() {
    var m1, m2;
    m1 = this.fst.element.minWidth() + this.fst.element.nonContentWidth();
    m2 = this.snd.element.maxWidth() + this.snd.element.nonContentWidth();
    if (m2 != null) {
      m2 = this.valueWidth() - m2;
    }
    if ((m1 != null) && (m2 != null)) {
      return Math.min(m1, m2);
    }
    return m1 || m2 || 0;
  };

  VerticalSplitter.prototype.maxValue = function() {
    var m1, m2, valueWidth;
    valueWidth = this.valueWidth();
    m1 = this.fst.element.maxWidth() + this.fst.element.nonContentWidth();
    m2 = this.snd.element.minWidth() + this.snd.element.nonContentWidth();
    if (m2 != null) {
      m2 = valueWidth - m2;
    }
    if ((m1 != null) && (m2 != null)) {
      return Math.max(m1, m2);
    }
    return m1 || m2 || valueWidth;
  };

  VerticalSplitter.prototype.adjust = function() {
    var fstValue, sndValue, value, valueWidth;
    value = this.value();
    valueWidth = this.valueWidth();
    fstValue = value - this.fst.element.nonContentWidth(true);
    sndValue = (valueWidth - value) - this.snd.element.nonContentWidth(true);
    if (fstValue <= 0) {
      if (this.fst.element.is(':visible')) {
        this.fst.element.hide();
      }
      if (!this.snd.element.is(':visible')) {
        this.snd.element.show();
      }
      this.snd.element.outerWidth(true, valueWidth);
      this._value = value = 0;
    } else if (sndValue <= 0) {
      if (!this.fst.element.is(':visible')) {
        this.fst.element.show();
      }
      if (this.snd.element.is(':visible')) {
        this.snd.element.hide();
      }
      this.fst.element.outerWidth(true, valueWidth);
      this._value = value = valueWidth;
    } else {
      if (!this.fst.element.is(':visible')) {
        this.fst.element.show();
      }
      if (!this.snd.element.is(':visible')) {
        this.snd.element.show();
      }
      this.fst.element.width(fstValue);
      this.snd.element.width(sndValue);
    }
    this.fst.adjust();
    this.snd.adjust();
    this.element.relativeX(value - this.element.outerWidth() / 2);
    return this;
  };

  return VerticalSplitter;

})(Splitter);

HorizontalSplitter = (function(_super) {

  __extends(HorizontalSplitter, _super);

  function HorizontalSplitter(core, fst, snd, defaultVolume) {
    HorizontalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);
    this.element.addClass('horizontal');
    this.fst.element.addClass('top');
    this.snd.element.addClass('bottom');
    this._curtain.css('pointer', 'raw-resize');
  }

  HorizontalSplitter.prototype.mousemove = function(e) {
    var container, value;
    container = this.fst.parent();
    value = e.pageY - (container.element.absoluteY() + container.element.contentY(true));
    value = this.regulateValue(value);
    return this.value(value);
  };

  HorizontalSplitter.prototype.valueWidth = function() {
    var container;
    container = this.fst.parent();
    return container.element.height();
  };

  HorizontalSplitter.prototype.minValue = function() {
    var m1, m2;
    m1 = this.fst.element.minHeight() + this.fst.element.nonContentHeight();
    m2 = this.snd.element.maxHeight() + this.snd.element.nonContentHeight();
    if (m2 != null) {
      m2 = this.valueWidth() - m2;
    }
    if ((m1 != null) && (m2 != null)) {
      return Math.min(m1, m2);
    }
    return m1 || m2 || 0;
  };

  HorizontalSplitter.prototype.maxValue = function() {
    var m1, m2, valueWidth;
    valueWidth = this.valueWidth();
    m1 = this.fst.element.maxHeight() + this.fst.element.nonContentHeight();
    m2 = this.snd.element.minHeight() + this.snd.element.nonContentHeight();
    if (m2 != null) {
      m2 = valueWidth - m2;
    }
    if ((m1 != null) && (m2 != null)) {
      return Math.max(m1, m2);
    }
    return m1 || m2 || valueWidth;
  };

  HorizontalSplitter.prototype.adjust = function() {
    var fstValue, sndValue, value, valueWidth;
    value = this.value();
    valueWidth = this.valueWidth();
    fstValue = value - this.fst.element.nonContentHeight(true);
    sndValue = (valueWidth - value) - this.snd.element.nonContentHeight(true);
    if (fstValue <= 0) {
      if (this.fst.element.is(':visible')) {
        this.fst.element.hide();
      }
      if (!this.snd.element.is(':visible')) {
        this.snd.element.show();
      }
      this.snd.element.outerHeight(true, valueWidth);
      this._value = value = 0;
    } else if (sndValue <= 0) {
      if (!this.fst.element.is(':visible')) {
        this.fst.element.show();
      }
      if (this.snd.element.is(':visible')) {
        this.snd.element.hide();
      }
      this.fst.element.outerHeight(true, valueWidth);
      this._value = value = valueWidth;
    } else {
      if (!this.fst.element.is(':visible')) {
        this.fst.element.show();
      }
      if (!this.snd.element.is(':visible')) {
        this.snd.element.show();
      }
      this.fst.element.height(fstValue);
      this.snd.element.height(sndValue);
    }
    this.fst.adjust();
    this.snd.adjust();
    this.element.relativeY(value - this.element.outerHeight() / 2);
    return this;
  };

  return HorizontalSplitter;

})(Splitter);
