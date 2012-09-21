var Fullscreen,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Fullscreen = (function(_super) {

  __extends(Fullscreen, _super);

  function Fullscreen(core) {
    var _this = this;
    Fullscreen.__super__.constructor.call(this, core);
    this.element.addClass('fullscreen');
    this.element.css({
      'position': 'fixed',
      'top': '0',
      'left': '0',
      'width': '100%',
      'height': '100%',
      'z-index': 100
    });
    this.curtain = $('<div>').addClass('curtain');
    this.curtain.css({
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'width': '100%',
      'height': '100%',
      'background': 'black',
      'opacity': '0.6',
      'cursor': 'pointer'
    });
    this.cell = $('<div>').css({
      'position': 'absolute',
      'top': '5%',
      'left': '5%',
      'width': '90%',
      'height': '90%'
    });
    if ($.browser.msie && $.browser.version < 7) {
      this.element.css('position', 'absolute');
      $(window).scroll(function() {
        return _this.element.css('top', $(document).scrollTop());
      });
    }
    this.curtain.click(function() {
      return _this.off();
    });
    this.element.append(this.curtain);
    this.element.append(this.cell);
    this.element.hide();
    this.resize = function() {
      return _this.core.wrapper.adjust();
    };
  }

  Fullscreen.prototype.on = function() {
    var ratio,
      _this = this;
    ratio = 9.0 / 10;
    this.cell.append(this.core.wrapper.element);
    this.core.wrapper.element.outerWidth(true, this.element.width() * ratio);
    this.core.wrapper.element.outerHeight(true, this.element.height() * ratio);
    this.core.wrapper.init();
    this.core.wrapper.adjust();
    this.core.wrapper.workspace.update(true);
    this.element.fadeIn('fast', function() {
      _this.core.wrapper.element.css('width', "100%");
      _this.core.wrapper.element.css('height', "100%");
      return _this.core.wrapper.adjust();
    });
    return $(window).on('resize', this.resize);
  };

  Fullscreen.prototype.off = function() {
    this.core.element.after(this.core.wrapper.element);
    this.core.wrapper.element.css('width', "");
    this.core.wrapper.element.css('height', "");
    this.core.wrapper.init();
    this.core.wrapper.adjust();
    this.core.wrapper.workspace.update(true);
    this.element.fadeOut('fast');
    return $(window).unbind('resize', this.resize);
  };

  Fullscreen.prototype.toggle = function(callbackOn, callbackOff) {
    if (this.element.is(':visible')) {
      this.off();
      return typeof callbackOff === "function" ? callbackOff() : void 0;
    } else {
      this.on();
      return typeof callbackOn === "function" ? callbackOn() : void 0;
    }
  };

  return Fullscreen;

})(Panel);
