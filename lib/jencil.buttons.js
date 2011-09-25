(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  namespace('Jencil.buttons', function(exports) {
    var ButtonBase, ExecButton, ImageMarkupButton, LinkMarkupButton, MarkupButtonBase, MultilineMarkupButton, Separator, SimpleMarkupButton, Widget, createButton;
    Widget = Jencil.widgets.Widget;
    exports.createButton = createButton = function(jencil, type, args) {
      /*
          Create button instance from type and args
          */
      var cls;
      cls = void 0;
      switch (type) {
        case '-':
        case 'separator':
          cls = Separator;
          break;
        case 's':
        case 'simple':
          cls = SimpleMarkupButton;
          break;
        case 'm':
        case 'multiline':
          cls = MultilineMarkupButton;
          break;
        case 'e':
        case 'exec':
          cls = ExecButton;
          break;
        case 'l':
        case 'link':
          cls = LinkMarkupButton;
          break;
        case 'i':
        case 'image':
          cls = ImageMarkupButton;
          break;
        default:
          cls = Jencil.buttons[type];
          if (!(cls != null)) {
            throw new Error("Unknown button type is passed (type: " + type + ")");
          }
      }
      return new cls(jencil, args);
    };
    exports.ButtonBase = ButtonBase = (function() {
      __extends(ButtonBase, Widget);
      /*
          An abstruct class of all button widget
          */
      function ButtonBase(jencil, cls, name) {
        ButtonBase.__super__.constructor.call(this, jencil, 'button', 'a');
        this.$element.addClass(cls);
        this.$element.attr('href', '#');
        this.$element.attr('title', name);
        this.$element.append($("<span>" + name + "</span>"));
        this.$element.click(__bind(function() {
          this.clickBefore();
          this.click();
          return this.clickAfter();
        }, this));
      }
      ButtonBase.prototype.editor = function() {
        return this.jencil.editor();
      };
      ButtonBase.prototype.clickBefore = function() {};
      ButtonBase.prototype.click = function() {};
      ButtonBase.prototype.clickAfter = function() {};
      return ButtonBase;
    })();
    exports.MarkupButtonBase = MarkupButtonBase = (function() {
      __extends(MarkupButtonBase, ButtonBase);
      function MarkupButtonBase() {
        MarkupButtonBase.__super__.constructor.apply(this, arguments);
      }
      /*
          An abstruct class of all button widget which modify content
      
          This button automatically call ``@jencil.editor().update()``
          */
      MarkupButtonBase.prototype.clickAfter = function() {
        return this.editor().update();
      };
      return MarkupButtonBase;
    })();
    exports.Separator = Separator = (function() {
      __extends(Separator, Widget);
      /*
          Separator
          */
      function Separator(jencil, args) {
        Separator.__super__.constructor.call(this, jencil, 'separator', 'span');
        this.$element.append($('<span>|</span>'));
      }
      return Separator;
    })();
    exports.SimpleMarkupButton = SimpleMarkupButton = (function() {
      __extends(SimpleMarkupButton, MarkupButtonBase);
      /*
          Markup singleline
          */
      function SimpleMarkupButton(jencil, args) {
        var cls, name;
        cls = args[0], name = args[1], this.before = args[2], this.after = args[3], this.insert = args[4];
        SimpleMarkupButton.__super__.constructor.call(this, jencil, cls, name);
      }
      SimpleMarkupButton.prototype.click = function() {
        return this.editor().wrapSelected(this.before, this.after, true, this.insert || this.jencil.options.defaultInsertText);
      };
      return SimpleMarkupButton;
    })();
    exports.MultilineMarkupButton = MultilineMarkupButton = (function() {
      __extends(MultilineMarkupButton, MarkupButtonBase);
      /*
          Markup multilines
          */
      function MultilineMarkupButton(jencil, args) {
        var cls, name;
        cls = args[0], name = args[1], this.before = args[2], this.after = args[3], this.blockBefore = args[4], this.blockAfter = args[5];
        MultilineMarkupButton.__super__.constructor.call(this, jencil, cls, name);
      }
      MultilineMarkupButton.prototype.click = function() {
        var i, line, replace, selectedLines, _after, _before, _ref;
        selectedLines = this.editor().getSelected().split('\n');
        for (i = 0, _ref = selectedLines.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
          _before = Jencil.core.format(this.before, {
            i: i + 1
          });
          _after = Jencil.core.format(this.after, {
            i: i + 1
          });
          line = selectedLines[i];
          if (line === this.blockBefore || line === this.blockAfter) {
            continue;
          }
          if (line.startsWith(_before) && line.endsWith(_after)) {
            selectedLines[i] = line.substring(_before.length, line.length - _after.length);
          } else {
            selectedLines[i] = "" + _before + line + _after;
          }
        }
        if (this.blockBefore !== void 0) {
          if (selectedLines[0] === this.blockBefore) {
            selectedLines.shift();
          } else {
            selectedLines.unshift(this.blockBefore);
          }
        }
        if (this.blockAfter !== void 0) {
          if (selectedLines[selectedLines.length - 1] === this.blockAfter) {
            selectedLines.pop();
          } else {
            selectedLines.push(this.blockAfter);
          }
        }
        replace = selectedLines.join('\n');
        return this.editor().replaceSelected(replace, true);
      };
      return MultilineMarkupButton;
    })();
    exports.ExecButton = ExecButton = (function() {
      __extends(ExecButton, ButtonBase);
      /*
          Execute javascript
          */
      function ExecButton(jencil, args) {
        var cls, name;
        cls = args[0], name = args[1], this._click = args[2], this._clickBefore = args[3], this._clickAfter = args[4];
        ExecButton.__super__.constructor.call(this, jencil, cls, name);
      }
      ExecButton.prototype.clickBefore = function() {
        return this._clickBefore(this.editor());
      };
      ExecButton.prototype.click = function() {
        return this._click(this.editor());
      };
      ExecButton.prototype.clickAfter = function() {
        return this._clickAfter(this.editor());
      };
      return ExecButton;
    })();
    exports.LinkMarkupButton = LinkMarkupButton = (function() {
      __extends(LinkMarkupButton, MarkupButtonBase);
      /*
          Collect infos required to create LINK via prompt and insert link markup
          */
      function LinkMarkupButton(jencil, args) {
        this.formatstr = args[0];
        LinkMarkupButton.__super__.constructor.call(this, jencil, 'link', 'Link');
      }
      LinkMarkupButton.prototype.click = function() {
        var href, insert, label, title;
        href = prompt("Please input link url");
        if (href === null) {
          return;
        }
        label = prompt("Please input link label", this.editor().getSelected());
        if (label === null) {
          return;
        }
        title = prompt("(Optional) Please input link title");
        if (title === null) {
          return;
        }
        insert = Jencil.core.format(this.formatstr, {
          href: href,
          label: label,
          title: title
        });
        return this.editor().replaceSelected(insert);
      };
      return LinkMarkupButton;
    })();
    return exports.ImageMarkupButton = ImageMarkupButton = (function() {
      __extends(ImageMarkupButton, MarkupButtonBase);
      /*
          Collect infos required to create IMAGE via prompt and insert image markup
          */
      function ImageMarkupButton(jencil, args) {
        this.formatstr = args[0];
        ImageMarkupButton.__super__.constructor.call(this, jencil, 'img', 'Image');
      }
      ImageMarkupButton.prototype.click = function() {
        var alt, insert, src, title;
        src = prompt("Please input image src url");
        if (src === null) {
          return;
        }
        alt = prompt("(Optional) Please input image alt label", this.editor().getSelected());
        if (alt === null) {
          return;
        }
        title = prompt("(Optional) Please input image title");
        if (title === null) {
          return;
        }
        insert = Jencil.core.format(this.formatstr, {
          src: src,
          alt: alt,
          title: title
        });
        return this.editor().replaceSelected(insert);
      };
      return ImageMarkupButton;
    })();
  });
}).call(this);
