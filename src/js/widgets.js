var HorizontalPanel, MultiplePanel, Panel, VerticalPanel, Widget,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Widget = (function() {

  function Widget(core, selector, context) {
    this.core = core;
    if (selector == null) {
      selector = '<div>';
    }
    if (selector instanceof jQuery) {
      this.element = selector;
    } else {
      this.element = $(selector, context);
    }
    this.element = evolute(this.element);
  }

  Widget.prototype.init = function() {
    return this;
  };

  Widget.prototype.adjust = function() {
    return this;
  };

  return Widget;

})();

Panel = (function(_super) {

  __extends(Panel, _super);

  function Panel(core, selector, context) {
    if (selector == null) {
      selector = '<div>';
    }
    Panel.__super__.constructor.call(this, core, selector, context);
    this.element.addClass('panel');
  }

  return Panel;

})(Widget);

MultiplePanel = (function(_super) {

  __extends(MultiplePanel, _super);

  function MultiplePanel(core, fst, snd, splitter) {
    var hide, show,
      _this = this;
    this.fst = fst;
    this.snd = snd;
    this.splitter = splitter;
    MultiplePanel.__super__.constructor.call(this, core);
    this.element.addClass('multiple');
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
  }

  MultiplePanel.prototype.init = function() {
    this.splitter.init();
    this.fst.init();
    return this.snd.init();
  };

  MultiplePanel.prototype._togglePanel = function(to, callbackOn, callbackOff) {
    var callbackDone, end, volume,
      _this = this;
    volume = this.splitter.volume();
    callbackDone = null;
    if ((0 < volume && volume < 1)) {
      end = to;
      this.splitter._previousVolume = volume;
      callbackDone = callbackOff;
    } else {
      end = this.splitter._previousVolume || this.splitter.defaultVolume;
      if (end === to) {
        end = 0.5;
      }
      callbackDone = callbackOn;
    }
    return animate({
      done: callbackDone,
      start: volume,
      end: end,
      duration: 500,
      callback: function(value, epoch) {
        return _this.splitter.volume(value);
      }
    });
  };

  return MultiplePanel;

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

})(MultiplePanel);

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

})(MultiplePanel);

namespace('Jencil.ui.widgets', function(exports) {
  return exports.Widget = Widget;
});

namespace('Jencil.ui.widgets.panels', function(exports) {
  exports.Panel = Panel;
  exports.MultiplePanel = MultiplePanel;
  exports.VerticalPanel = VerticalPanel;
  return exports.HorizontalPanel = HorizontalPanel;
});
