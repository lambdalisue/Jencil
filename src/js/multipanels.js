var HorizontalPanel, MultiPanel, VerticalPanel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MultiPanel = (function(_super) {

  __extends(MultiPanel, _super);

  function MultiPanel(core, fst, snd, splitter) {
    var hide, show,
      _this = this;
    this.fst = fst;
    this.snd = snd;
    this.splitter = splitter;
    MultiPanel.__super__.constructor.call(this, core);
    this.element.addClass('multi');
    this.element.append(this.fst.element);
    this.element.append(this.splitter.element);
    this.element.append(this.snd.element);
    show = function(callback) {
      if (!this.element.is(':visible')) {
        return this.toggle(callback, null);
      }
    };
    hide = function(callback) {
      if (this.element.is(':visible')) {
        return this.toggle(null, callback);
      }
    };
    this.fst.toggle = function(callbackOn, callbackOff) {
      return _this._togglePanel(0, callbackOn, callbackOff);
    };
    this.fst.show = show;
    this.fst.hide = hide;
    this.snd.toggle = function(callbackOn, callbackOff) {
      return _this._togglePanel(1, callbackOn, callbackOff);
    };
    this.snd.show = show;
    this.snd.hide = hide;
    this.splitter.element.dblclick(function() {
      return _this.snd.toggle();
    });
  }

  MultiPanel.prototype.init = function() {
    this.splitter.init();
    this.fst.init();
    return this.snd.init();
  };

  MultiPanel.prototype._togglePanel = function(to, callbackOn, callbackOff) {
    var callbackDone, end, volume, _callbackDone,
      _this = this;
    if (MultiPanel._animating) {
      return;
    }
    volume = this.splitter.volume();
    callbackDone = null;
    if ((0 < volume && volume < 1)) {
      end = to;
      this.splitter._previousVolume = volume;
      _callbackDone = callbackOff;
    } else {
      end = this.splitter._previousVolume || this.splitter.defaultVolume;
      if (end === to) {
        end = 0.5;
      }
      _callbackDone = callbackOn;
    }
    MultiPanel._animating = true;
    callbackDone = function() {
      MultiPanel._animating = false;
      return typeof _callbackDone === "function" ? _callbackDone() : void 0;
    };
    return animate({
      start: volume,
      end: end,
      duration: 500,
      callbackEach: function(value, epoch) {
        return _this.splitter.volume(value);
      },
      callbackDone: callbackDone
    });
  };

  return MultiPanel;

})(Panel);

VerticalPanel = (function(_super) {

  __extends(VerticalPanel, _super);

  function VerticalPanel(core, fst, snd, defaultVolume) {
    var splitter;
    if (defaultVolume == null) {
      defaultVolume = 0.5;
    }
    splitter = new VerticalSplitter(core, fst, snd, defaultVolume);
    VerticalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
    this.element.addClass('vertical');
  }

  VerticalPanel.prototype.adjust = function() {
    this.fst.element.outerHeight(true, this.element.height());
    this.snd.element.outerHeight(true, this.element.height());
    this.splitter.element.outerHeight(true, this.element.height());
    this.splitter.adjust();
    return this;
  };

  return VerticalPanel;

})(MultiPanel);

HorizontalPanel = (function(_super) {

  __extends(HorizontalPanel, _super);

  function HorizontalPanel(core, fst, snd, defaultVolume) {
    var splitter;
    if (defaultVolume == null) {
      defaultVolume = 0.5;
    }
    splitter = new HorizontalSplitter(core, fst, snd, defaultVolume);
    HorizontalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
    this.element.addClass('horizontal');
  }

  HorizontalPanel.prototype.adjust = function() {
    this.fst.element.outerWidth(true, this.element.width());
    this.snd.element.outerWidth(true, this.element.width());
    this.splitter.element.outerWidth(true, this.element.width());
    this.splitter.adjust();
    return this;
  };

  return HorizontalPanel;

})(MultiPanel);

namespace('Jencil.multipanels', function(exports) {
  exports.MultiPanel = MultiPanel;
  exports.VerticalPanel = VerticalPanel;
  return exports.HorizontalPanel = HorizontalPanel;
});
