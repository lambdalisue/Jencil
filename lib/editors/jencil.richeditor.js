(function() {
  /*
  Jencil RichEditor
  
  This editor is for editing rich text with preview screeen
  */
  var Initializer, Rawview, RichArea;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  RichArea = (function() {
    __extends(RichArea, Jencil.widgets.Widget);
    function RichArea(jencil, holder) {
      this.holder = holder;
      RichArea.__super__.constructor.call(this, jencil, 'jencil-richarea');
      this.$source = this.jencil.$textarea;
      this.$surface = new $('<iframe>').addClass('surface');
      this.$surface.appendTo(this.$element);
    }
    RichArea.prototype.init = function() {
      this.controller = new Richarea(this.$surface);
      console.log(this.jencil.options.extras.richareaTemplatePath);
      $.get(this.jencil.options.extras.richareaTemplatePath, null, __bind(function(html) {
        var container;
        container = document.createElement('div');
        container.innerHTML = html;
        console.log(container);
        return this.controller.raw.document.head.innerHTML = container.innerHTML;
      }, this), 'html');
      this.controller.setValue(this.$source.val());
      $(this.controller.raw.body).bind('keyup change click blur enter', __bind(function() {
        return this.update();
      }, this));
      return this.update();
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
      this.$surface = new $('<textarea>').addClass('surface');
      this.$surface.appendTo(this.$element);
      this.show();
    }
    Rawview.prototype.init = function() {
      this.$surface.bind('keyup change click blur enter', __bind(function() {
        return this.reverseUpdate();
      }, this));
      $(this.holder.richarea.controller.raw.body).bind('keyup change click blur enter', __bind(function() {
        return this.forwardUpdate();
      }, this));
      return this.forwardUpdate();
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
      if (this.$element.is(':visible')) {
        return this.hide();
      } else {
        return this.show();
      }
    };
    Rawview.prototype.forwardUpdate = function() {
      return this.$surface.val(this.holder.getValue());
    };
    Rawview.prototype.reverseUpdate = function() {
      var _ref;
      return (_ref = this.holder.richarea.controller) != null ? _ref.setValue(this.$surface.val()) : void 0;
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
        RichEditor.__super__.constructor.call(this, jencil, 'jencil-rich-editor', 'div');
        this.$element.addClass("rawview-position-" + this.jencil.options.extras.rawviewPosition);
        this.richarea = new RichArea(this.jencil, this);
        this.rawview = new Rawview(this.jencil, this);
        this.append(this.richarea);
        this.append(this.rawview);
        if (this.jencil.options.extras.defaultRawviewState === 'close') {
          this.rawview.hide();
        }
      }
      RichEditor.prototype.init = function() {
        this.richarea.init();
        return this.rawview.init();
      };
      RichEditor.prototype.update = function() {
        this.richarea.update();
        return this.rawview.forwardUpdate();
      };
      RichEditor.prototype.getValue = function() {
        var _ref;
        return (_ref = this.richarea.controller) != null ? _ref.getValue() : void 0;
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
        var _ref;
        return (_ref = this.editor().rawview) != null ? _ref.toggle() : void 0;
      };
      return RawviewButton;
    })();
    exports.CommandButton = CommandButton = (function() {
      __extends(CommandButton, MarkupButtonBase);
      function CommandButton(jencil, args) {
        var cls, name;
        name = args[0], cls = args[1], this.command = args[2], this.value = args[3];
        CommandButton.__super__.constructor.call(this, jencil, name, cls);
      }
      CommandButton.prototype.click = function() {
        return this.exec(this.command, this.value);
      };
      CommandButton.prototype.exec = function(command, value) {
        var _ref, _ref2;
        if (((_ref = this.editor().richarea) != null ? _ref.controller : void 0) != null) {
          if (!(this.editor().richarea.controller[command] != null)) {
            if (((_ref2 = window.console) != null ? _ref2.error : void 0) != null) {
              return console.error("" + command + " is not defined on Richarea");
            }
          } else {
            return this.editor().richarea.controller[command](value);
          }
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
}).call(this);
