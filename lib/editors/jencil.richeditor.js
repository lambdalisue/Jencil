/*
Jencil RichEditor

This editor is for editing rich text with preview screeen
*/
var Initializer, Rawview, RichArea, isIE6, isIE7, isIE8;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
isIE6 = /MSIE 6/i.test(navigator.userAgent);
isIE7 = /MSIE 7/i.test(navigator.userAgent);
isIE8 = /MSIE 8/i.test(navigator.userAgent);
RichArea = (function() {
  __extends(RichArea, Jencil.widgets.Widget);
  function RichArea(jencil, holder) {
    this.holder = holder;
    RichArea.__super__.constructor.call(this, jencil, 'jencil-richarea');
    this.$source = this.jencil.$textarea;
    this.$surface = $('<iframe>').addClass('surface');
    if (this.jencil.options.extras.richareaTemplatePath != null) {
      this.$surface.attr('src', this.jencil.options.extras.richareaTemplatePath);
    }
    this.$surface.appendTo(this.$element);
    this.$surface.css({
      width: '100%',
      height: '100%',
      border: 'none',
      margin: 0,
      padding: 0
    });
    this.$surface.attr('frameborder', '0');
  }
  RichArea.prototype.init = function() {
    this.controller = new Richarea(this.$surface);
    return this.controller.ready(__bind(function() {
      this.holder.reconstruct();
      $(this.controller.raw.body).css({
        margin: 0,
        padding: 0
      });
      this.controller.setValue(this.$source.val());
      $(this.controller.raw.body).bind('keypress change click blur enter', __bind(function() {
        return this.update();
      }, this));
      return this.update();
    }, this));
  };
  RichArea.prototype.getValue = function() {
    var _ref;
    if ((_ref = this.controller) != null ? _ref.ready() : void 0) {
      return this.controller.getValue();
    }
  };
  RichArea.prototype.setValue = function(value) {
    var _ref;
    if ((_ref = this.controller) != null ? _ref.ready() : void 0) {
      return this.controller.setValue(value);
    }
  };
  RichArea.prototype.update = function() {
    var _ref;
    return this.$source.val((_ref = this.controller) != null ? _ref.getValue() : void 0);
  };
  return RichArea;
})();
Rawview = (function() {
  __extends(Rawview, Jencil.widgets.Widget);
  function Rawview(jencil, holder) {
    this.holder = holder;
    Rawview.__super__.constructor.call(this, jencil, 'jencil-rawview');
    this.$surface = $('<textarea>').addClass('surface');
    this.$surface.appendTo(this.$element);
    this.$surface.css({
      width: '100%',
      height: '100%',
      border: 'none',
      margin: 0,
      padding: 0,
      resize: 'none',
      outline: 'none'
    });
    this.show();
  }
  Rawview.prototype.init = function() {
    return this.holder.richarea.controller.ready(__bind(function() {
      this.$surface.bind('keyup change click blur enter', __bind(function() {
        return this.reverseUpdate();
      }, this));
      $(this.holder.richarea.controller.raw.body).bind('keypress change click blur enter', __bind(function() {
        return this.forwardUpdate();
      }, this));
      return this.forwardUpdate();
    }, this));
  };
  Rawview.prototype.isVisible = function() {
    return this.$element.is(':visible');
  };
  Rawview.prototype.show = function() {
    this.forwardUpdate();
    this.$element.parent().addClass('rawview-enable');
    this.holder.$element.addClass('rawview-enable');
    return this.$element.show();
  };
  Rawview.prototype.hide = function() {
    this.$element.hide();
    this.$element.parent().removeClass('rawview-enable');
    return this.holder.$element.removeClass('rawview-enable');
  };
  Rawview.prototype.toggle = function() {
    if (this.isVisible()) {
      return this.hide();
    } else {
      return this.show();
    }
  };
  Rawview.prototype.forwardUpdate = function() {
    return this.$surface.val(this.holder.richarea.getValue());
  };
  Rawview.prototype.reverseUpdate = function() {
    return this.holder.richarea.setValue(this.$surface.val());
  };
  return Rawview;
})();
Initializer = (function() {
  __extends(Initializer, Jencil.editors.Initializer);
  Initializer.prototype.stylesheets = [['~/jencil.richeditor.css', 'screen, projection']];
  Initializer.prototype.requires = [['~/richarea.min.js', 'window.Richarea']];
  Initializer.prototype.options = {
    rawviewPosition: 'right',
    richareaTemplatePath: '~/templates/richarea.html',
    defaultRawviewState: 'close'
  };
  function Initializer(jencil) {
    Initializer.__super__.constructor.call(this, jencil);
    this.options.richareaTemplatePath = jencil.abspath(this.options.richareaTemplatePath);
  }
  return Initializer;
})();
namespace('Jencil.editors', function(exports) {
  var EditorBase, RichEditor;
  EditorBase = Jencil.editors.EditorBase;
  return exports.RichEditor = RichEditor = (function() {
    __extends(RichEditor, EditorBase);
    RichEditor.Initializer = Initializer;
    function RichEditor(jencil) {
      var _ref;
      RichEditor.__super__.constructor.call(this, jencil, 'jencil-rich-editor');
      this.$element.addClass("" + this.jencil.options.extras.rawviewPosition);
      this.richarea = new RichArea(this.jencil, this);
      this.rawview = new Rawview(this.jencil, this);
      if ((_ref = this.jencil.options.extras.rawviewPosition) === 'top' || _ref === 'left') {
        this.append(this.rawview);
        this.append(this.richarea);
      } else {
        this.append(this.richarea);
        this.append(this.rawview);
      }
      this.$element.addClass('jencil-loader');
      this.richarea.$element.hide();
      this.rawview.hide();
    }
    RichEditor.prototype.reconstruct = function() {
      var getOffsetX, getOffsetY, height, offsetpx, offsetpy, offsettx, offsetty, width, _ref;
      if (this.$element.hasClass('jencil-loader')) {
        this.$element.removeClass('jencil-loader');
        this.richarea.$element.show();
        if (this.jencil.options.extras.defaultRawviewState !== 'close') {
          this.rawview.show();
        }
      }
      getOffsetX = function($$) {
        return $$.outerWidth(true) - $$.width();
      };
      getOffsetY = function($$) {
        return $$.outerHeight(true) - $$.height();
      };
      offsettx = getOffsetX(this.richarea.$element);
      offsetpx = getOffsetX(this.rawview.$element);
      offsetty = getOffsetY(this.richarea.$element);
      offsetpy = getOffsetY(this.rawview.$element);
      width = this.$element.width();
      height = this.$element.height();
      if (this.rawview.isVisible()) {
        if ((_ref = this.jencil.options.extras.rawviewPosition) === 'left' || _ref === 'right') {
          if (this.jencil.options.extras.rawviewPosition === 'left') {
            this.richarea.$element.css({
              float: 'right'
            });
            this.rawview.$element.css({
              float: 'left'
            });
          } else if (this.jencil.options.extras.rawviewPosition === 'right') {
            this.richarea.$element.css({
              float: 'left'
            });
            this.rawview.$element.css({
              float: 'right'
            });
          }
          this.richarea.$element.width(width / 2 - offsettx);
          this.rawview.$element.width(width / 2 - offsetpx);
          this.richarea.$element.height(height - offsetty);
          this.rawview.$element.height(height - offsetpy);
        } else {
          this.richarea.$element.width(width - offsettx);
          this.rawview.$element.width(width - offsetpx);
          this.richarea.$element.height(height / 2 - offsetty);
          this.rawview.$element.height(height / 2 - offsetpy);
        }
      } else {
        this.richarea.$element.css({
          float: 'none'
        });
        this.rawview.$element.css({
          float: 'none'
        });
        this.richarea.$element.width(width - offsettx);
        this.richarea.$element.height(height - offsetty);
      }
      if (isIE6 || isIE7) {
        this.richarea.$surface.height(this.richarea.$element.height());
        this.rawview.$surface.height(this.rawview.$element.height());
        if (isIE6 || isIE7 || isIE8) {
          this.richarea.controller.raw.body.style.height = "" + (this.richarea.$surface.height()) + "px";
        }
        if (isIE6 || isIE7 || isIE8) {
          this.richarea.controller.raw.body.style.height = "" + (this.richarea.$surface.height()) + "px";
        }
        if (isIE6 || isIE7 || isIE8) {
          this.richarea.controller.raw.body.style.height = "" + (this.richarea.$surface.height()) + "px";
        }
      }
      if (isIE6 || isIE7 || isIE8) {
        return $(this.richarea.controller.raw.body).height(this.richarea.$surface.height());
      }
    };
    RichEditor.prototype.init = function() {
      this.richarea.init();
      return this.rawview.init();
    };
    RichEditor.prototype.update = function() {
      this.richarea.update();
      return this.rawview.forwardUpdate();
    };
    RichEditor.prototype.getValue = function() {
      return this.richarea.getValue();
    };
    return RichEditor;
  })();
});
namespace('Jencil.buttons', function(exports) {
  var ButtonBase, CommandButton, MarkupButtonBase, PromptCommandButton, RawviewButton;
  ButtonBase = Jencil.buttons.ButtonBase;
  MarkupButtonBase = Jencil.buttons.MarkupButtonBase;
  exports.RawviewButton = RawviewButton = (function() {
    __extends(RawviewButton, ButtonBase);
    function RawviewButton(jencil, args) {
      RawviewButton.__super__.constructor.call(this, jencil, 'rawview', 'Rawview');
    }
    RawviewButton.prototype.click = function() {
      var editor;
      editor = this.editor();
      editor.rawview.toggle();
      return editor.reconstruct();
    };
    return RawviewButton;
  })();
  exports.CommandButton = CommandButton = (function() {
    __extends(CommandButton, MarkupButtonBase);
    function CommandButton(jencil, args) {
      var cls, name;
      name = args[0], cls = args[1], this.command = args[2], this.args = args[3];
      CommandButton.__super__.constructor.call(this, jencil, name, cls);
    }
    CommandButton.prototype.click = function() {
      return this.exec(this.command, this.args);
    };
    CommandButton.prototype.exec = function(command, args) {
      if (this.editor().richarea.controller != null) {
        return this.editor().richarea.controller.execCommand(command, args);
      }
    };
    return CommandButton;
  })();
  return exports.PromptCommandButton = PromptCommandButton = (function() {
    __extends(PromptCommandButton, CommandButton);
    function PromptCommandButton(jencil, args) {
      var cls, command, name;
      name = args[0], cls = args[1], command = args[2], this.message = args[3], this.defaultValue = args[4];
      PromptCommandButton.__super__.constructor.call(this, jencil, [name, cls, command, void 0]);
    }
    PromptCommandButton.prototype.click = function() {
      var value;
      value = prompt(this.message, this.defaultValue || '');
      if (value === null) {
        return;
      }
      return this.exec(this.command, value);
    };
    return PromptCommandButton;
  })();
});