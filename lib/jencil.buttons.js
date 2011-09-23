(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  namespace('Jencil.widgets', function(exports) {
    var Button, FormatMarkupButton, ImageMarkupButton, LinkMarkupButton, ListMarkupButton, OrderedListMarkupButton, Separator, SimpleMarkupButton, UnorderedListMarkupButton, Widget, createButton;
    Widget = Jencil.widgets.Widget;
    exports.createButton = createButton = function(jencil, type, args) {
      var after, before, blockAfter, blockBefore, cls, formatstr, insert, name;
      switch (type) {
        case '-':
        case 'separator':
          return new Separator(jencil);
        case 's':
        case 'simple':
          cls = args[0], name = args[1], before = args[2], after = args[3], insert = args[4];
          return new SimpleMarkupButton(jencil, cls, name, before, after, insert);
        case 'l':
        case 'link':
          formatstr = args[0];
          return new LinkMarkupButton(jencil, formatstr);
        case 'i':
        case 'image':
          formatstr = args[0];
          return new ImageMarkupButton(jencil, formatstr);
        case 'u':
        case 'unorderedlist':
          before = args[0], after = args[1], blockBefore = args[2], blockAfter = args[3];
          return new UnorderedListMarkupButton(jencil, before, after, blockBefore, blockAfter);
        case 'o':
        case 'orderedlist':
          before = args[0], after = args[1], blockBefore = args[2], blockAfter = args[3];
          return new OrderedListMarkupButton(jencil, before, after, blockBefore, blockAfter);
        default:
          throw new Error("Unknown button type is passed (type: " + type + ")");
      }
    };
    exports.Separator = Separator = (function() {
      __extends(Separator, Widget);
      function Separator(jencil) {
        Separator.__super__.constructor.call(this, jencil, 'separator', 'span');
        this.$element.append($('<span>|</span>'));
      }
      return Separator;
    })();
    exports.Button = Button = (function() {
      __extends(Button, Widget);
      function Button(jencil, cls, name) {
        Button.__super__.constructor.call(this, jencil, 'button', 'a');
        this.$element.addClass(cls);
        this.$element.attr('href', '#');
        this.$element.attr('title', name);
        this.$element.append($("<span>" + name + "</span>"));
      }
      return Button;
    })();
    exports.SimpleMarkupButton = SimpleMarkupButton = (function() {
      __extends(SimpleMarkupButton, Button);
      function SimpleMarkupButton(jencil, cls, name, before, after, insert) {
        SimpleMarkupButton.__super__.constructor.call(this, jencil, cls, name);
        this.$element.click(__bind(function() {
          return this.jencil.wrapSelected(before, after, true, insert || this.jencil.options.defaultInsertText);
        }, this));
      }
      return SimpleMarkupButton;
    })();
    exports.FormatMarkupButton = FormatMarkupButton = (function() {
      __extends(FormatMarkupButton, Button);
      function FormatMarkupButton() {
        FormatMarkupButton.__super__.constructor.apply(this, arguments);
      }
      FormatMarkupButton.prototype.format = function(formatstr, kwargs) {
        var key, value;
        for (key in kwargs) {
          value = kwargs[key];
          formatstr = formatstr.replace("{{" + key + "}}", value);
        }
        return formatstr;
      };
      return FormatMarkupButton;
    })();
    exports.LinkMarkupButton = LinkMarkupButton = (function() {
      __extends(LinkMarkupButton, FormatMarkupButton);
      function LinkMarkupButton(jencil, formatstr) {
        LinkMarkupButton.__super__.constructor.call(this, jencil, 'link', 'Link');
        this.$element.click(__bind(function() {
          var href, insert, label, title;
          href = prompt("Please input link url");
          if (href === null) {
            return;
          }
          label = prompt("Please input link label", this.jencil.getSelected());
          if (label === null) {
            return;
          }
          title = prompt("(Optional) Please input link title");
          if (title === null) {
            return;
          }
          insert = this.format(formatstr, {
            href: href,
            label: label,
            title: title
          });
          return this.jencil.replaceSelected(insert);
        }, this));
      }
      return LinkMarkupButton;
    })();
    exports.ImageMarkupButton = ImageMarkupButton = (function() {
      __extends(ImageMarkupButton, FormatMarkupButton);
      function ImageMarkupButton(jencil, formatstr) {
        ImageMarkupButton.__super__.constructor.call(this, jencil, 'img', 'Image');
        this.$element.click(__bind(function() {
          var alt, insert, src, title;
          src = prompt("Please input image src url");
          if (src === null) {
            return;
          }
          alt = prompt("(Optional) Please input image alt label", this.jencil.getSelected());
          if (alt === null) {
            return;
          }
          title = prompt("(Optional) Please input image title");
          if (title === null) {
            return;
          }
          insert = this.format(formatstr, {
            src: src,
            alt: alt,
            title: title
          });
          return this.jencil.replaceSelected(insert);
        }, this));
      }
      return ImageMarkupButton;
    })();
    exports.ListMarkupButton = ListMarkupButton = (function() {
      __extends(ListMarkupButton, Button);
      function ListMarkupButton(jencil, cls, name, before, after, blockBefore, blockAfter) {
        ListMarkupButton.__super__.constructor.call(this, jencil, cls, name);
        this.$element.click(__bind(function() {
          var i, insert, selectedLine, selectedLines, _after, _before, _ref;
          selectedLines = this.jencil.getSelected().split('\n');
          for (i = 0, _ref = selectedLines.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
            _before = before.replace('{{i}}', i + 1);
            _after = after.replace('{{i}}', i + 1);
            selectedLine = selectedLines[i];
            if (selectedLine === blockBefore || selectedLine === blockAfter) {
              continue;
            }
            if (selectedLine.startsWith(_before) && selectedLine.endsWith(_after)) {
              selectedLines[i] = selectedLine.substring(_before.length, selectedLine.length - _after.length);
            } else {
              selectedLines[i] = "" + _before + selectedLines[i] + _after;
            }
          }
          if (blockBefore != null) {
            if (selectedLines[0] === blockBefore) {
              selectedLines.shift();
            } else {
              selectedLines.unshift(blockBefore);
            }
          }
          if (blockAfter != null) {
            if (selectedLines[selectedLines.length - 1] === blockAfter) {
              selectedLines.pop();
            } else {
              selectedLines.push(blockAfter);
            }
          }
          insert = selectedLines.join('\n');
          return this.jencil.replaceSelected(insert, true);
        }, this));
      }
      return ListMarkupButton;
    })();
    exports.UnorderedListMarkupButton = UnorderedListMarkupButton = (function() {
      __extends(UnorderedListMarkupButton, ListMarkupButton);
      function UnorderedListMarkupButton(jencil, before, after, blockBefore, blockAfter) {
        UnorderedListMarkupButton.__super__.constructor.call(this, jencil, 'ul', 'Unordered List', before, after, blockBefore, blockAfter);
      }
      return UnorderedListMarkupButton;
    })();
    return exports.OrderedListMarkupButton = OrderedListMarkupButton = (function() {
      __extends(OrderedListMarkupButton, ListMarkupButton);
      function OrderedListMarkupButton(jencil, before, after, blockBefore, blockAfter) {
        OrderedListMarkupButton.__super__.constructor.call(this, jencil, 'ol', 'Ordered List', before, after, blockBefore, blockAfter);
      }
      return OrderedListMarkupButton;
    })();
  });
}).call(this);
