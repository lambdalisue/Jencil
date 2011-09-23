(function() {
  /*
  Jencil
  
  Cross browser Markup and WYSIWYG editor
  
  :Author: Alisue (lambdalisue@hashnote.net)
  :License: MIT License
  :Url: http://github.com/lambdalisue/Jencil
  */
  var $, Jencil, Textarea, include, load;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  include = function(url) {
    var script;
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    return document.head.appendChild(script);
  };
  load = function(url, check, callback) {
    check = new Function("return " + check + " !== undefined");
    if (!check()) {
      include(url);
      return setTimeout(function() {
        if (!check()) {
          return setTimeout(arguments.callee, 100);
        } else {
          return callback();
        }
      }, 100);
    } else {
      return callback();
    }
  };
  Textarea = (function() {
    function Textarea(textarea) {
      if ((typeof jQuery !== "undefined" && jQuery !== null) && textarea instanceof jQuery) {
        this.textarea = textarea.get(0);
      } else {
        this.textarea = textarea;
      }
    }
    Textarea.prototype.getValue = function() {
      return this.textarea.value;
    };
    Textarea.prototype.getSelection = function() {
      var clone, e, range, s;
      if (document.selection) {
        range = document.selection.createRange();
        clone = range.duplicate();
        clone.moveToElementText(this.textarea);
        clone.setEndPoint('EndToEnd', range);
        s = clone.text.length - range.text.length;
        e = s + range.text.length;
      } else if (this.textarea.setSelectionRange) {
        s = this.textarea.selectionStart;
        e = this.textarea.selectionEnd;
      }
      return [s, e];
    };
    Textarea.prototype.setSelection = function(start, end) {
      var range, scrollTop;
      scrollTop = this.textarea.scrollTop;
      if (this.textarea.createTextRange) {
        if ($.browser.opera && $.browser.version >= 9.5 && length === 0) {
          return false;
        }
        range = this.textarea.createTextRange();
        range.collapse(true);
        range.moveStart('character', start);
        range.moveEnd('character', end - start);
        range.select();
      } else if (this.textarea.setSelectionRange) {
        this.textarea.setSelectionRange(start, end);
      }
      this.textarea.focus();
      return this.textarea.scrollTop = scrollTop;
    };
    Textarea.prototype.getSelected = function() {
      var end, range, start, _ref;
      if (document.selection) {
        range = document.selection.createRange();
        return range.text;
      } else if (this.textarea.setSelectionRange) {
        _ref = this.getSelection(), start = _ref[0], end = _ref[1];
        return this.textarea.value.substring(start, end);
      }
      return false;
    };
    Textarea.prototype._replaceSelected = function(str, start, end) {
      var after, before, range;
      if (start == null) {
        start = void 0;
      }
      if (end == null) {
        end = void 0;
      }
      if (document.selection) {
        this.textarea.focus();
        range = document.selection.createRange();
        range.text = str;
        return range.select();
      } else if (this.textarea.setSelectionRange) {
        before = this.textarea.value.substring(0, start);
        after = this.textarea.value.substring(end);
        return this.textarea.value = before + str + after;
      }
    };
    Textarea.prototype.replaceSelected = function(str, select) {
      var end, scrollTop, start, _ref;
      if (select == null) {
        select = false;
      }
      scrollTop = this.textarea.scrollTop;
      _ref = this.getSelection(), start = _ref[0], end = _ref[1];
      this._replaceSelected(str, start, end);
      end = start + str.length;
      if (!select) {
        start = end;
      }
      this.setSelection(start, end);
      this.textarea.focus();
      return this.textarea.scrollTop = scrollTop;
    };
    Textarea.prototype.insertBeforeSelected = function(str, select) {
      var end, scrollTop, selected, start, _ref;
      if (select == null) {
        select = false;
      }
      scrollTop = this.textarea.scrollTop;
      _ref = this.getSelection(), start = _ref[0], end = _ref[1];
      selected = this.getSelected();
      this._replaceSelected(str + selected, start, end);
      end = start + str.length;
      if (!select) {
        start = end;
      }
      this.setSelection(start, end);
      this.textarea.focus();
      return this.textarea.scrollTop = scrollTop;
    };
    Textarea.prototype.insertAfterSelected = function(str, select) {
      var end, scrollTop, selected, start, _ref;
      if (select == null) {
        select = false;
      }
      scrollTop = this.textarea.scrollTop;
      _ref = this.getSelection(), start = _ref[0], end = _ref[1];
      selected = this.getSelected();
      this._replaceSelected(selected + str, start, end);
      end = start + str.length;
      if (!select) {
        start = end;
      } else {
        start = start + selected.length;
      }
      this.setSelection(start, end);
      this.textarea.focus();
      return this.textarea.scrollTop = scrollTop;
    };
    Textarea.prototype.wrapSelected = function(before, after, select, additional) {
      var end, scrollTop, selected, start, str, _ref;
      if (select == null) {
        select = false;
      }
      if (additional == null) {
        additional = void 0;
      }
      selected = this.getSelected();
      if (selected.indexOf(before) === 0 && selected.lastIndexOf(after) === (selected.length - after.length)) {
        str = selected.substring(before.length, selected.length - after.length);
        return this.replaceSelected(str, select);
      } else {
        if (selected === '' && (additional != null)) {
          selected = additional;
        } else {
          additional = void 0;
        }
        scrollTop = this.textarea.scrollTop;
        _ref = this.getSelection(), start = _ref[0], end = _ref[1];
        this._replaceSelected(before + selected + after, start, end);
        if (!select) {
          end = start + before.length + selected.length + after.length;
          start = end;
        } else if (additional) {
          end = start + before.length + selected.length;
          start = start + before.length;
        } else {
          end = start + before.length + after.length + selected.length;
        }
        this.setSelection(start, end);
        this.textarea.focus();
        return this.textarea.scrollTop = scrollTop;
      }
    };
    return Textarea;
  })();
  Jencil = (function() {
    __extends(Jencil, Textarea);
    function Jencil(textarea, options) {
      var $textarea;
      Jencil.__super__.constructor.call(this, textarea);
      this.options = options;
      $textarea = $(this.textarea);
      $textarea.addClass('jencil-textarea');
      $textarea.wrap($('<div>').addClass('jencil'));
      this.$functionButtonHolder = Jencil.createHolder('jencil-function-button-holder');
      this.$functionDocumentType = Jencil.createHolder('jencil-function-document-type');
      this.$functionBar = Jencil.createHolder('jencil-function-bar');
      this.$functionButtonHolder.updateButtons = __bind(function() {
        var profileName;
        profileName = this.getCurrentProfileName();
        window.JencilProfile = void 0;
        return load("" + this.options.profilesetPath + "/" + profileName + ".js", 'JencilProfile', __bind(function() {
          var $button, args, button, profile, type, _i, _len, _ref, _results;
          profile = new JencilProfile;
          this.$functionButtonHolder.children().remove();
          _ref = profile.buttons;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            button = _ref[_i];
            type = button[0];
            args = button.slice(1, button.length);
            $button = this.createButtonFromType(type, args);
            _results.push(this.$functionButtonHolder.append($button));
          }
          return _results;
        }, this));
      }, this);
      this.$functionButtonHolder.updateButtons();
      if (this.options.documentTypeElement != null) {
        this.options.documentTypeElement.remove();
        this.$functionDocumentType.append(this.options.documentTypeElement);
        $(this.options.documentTypeElement).change(this.$functionButtonHolder.updateButtons);
      }
      this.$functionBar.append(this.$functionButtonHolder);
      this.$functionBar.append(this.$functionDocumentType);
      $textarea.before(this.$functionBar);
    }
    Jencil.prototype.getCurrentProfileName = function() {
      if (this.options.documentTypeElement != null) {
        return this.options.documentTypeElement.val();
      } else {
        return this.options.defaultProfileName;
      }
    };
    Jencil.prototype.createSeparator = function() {
      var $separator;
      $separator = Jencil.createHolder('jencil-function-separator', 'span');
      $separator.append($("<span>|</span>"));
      return $separator;
    };
    Jencil.prototype.createButton = function(name, cls) {
      var $button;
      $button = Jencil.createHolder('jencil-function-button', 'a');
      $button.addClass(cls);
      $button.attr('href', '#');
      $button.attr('title', name);
      $button.append($("<span>" + name + "</span>"));
      return $button;
    };
    Jencil.prototype.createSimpleWrapButton = function(name, cls, before, after, defaultInsertText) {
      var $button;
      if (defaultInsertText == null) {
        defaultInsertText = void 0;
      }
      $button = this.createButton(name, cls);
      $button.click(__bind(function() {
        return this.wrapSelected(before, after, true, defaultInsertText || this.options.defaultInsertText);
      }, this));
      return $button;
    };
    Jencil.prototype.createLinkButton = function(format) {
      var $button;
      $button = this.createButton('Link', 'link');
      $button.click(__bind(function() {
        var href, label, title;
        href = prompt("Please input link url");
        if (href === null || href === "") {
          return;
        }
        label = prompt("Please input link label");
        if (label === null) {
          return;
        }
        title = prompt("Please input title (optional)");
        if (title === null) {
          return;
        }
        format = format.replace("{href}", href);
        format = format.replace("{title}", title);
        format = format.replace("{label}", label);
        return this.replaceSelected(format);
      }, this));
      return $button;
    };
    Jencil.prototype.createImageButton = function(format) {
      var $button;
      $button = this.createButton('Image', 'img');
      $button.click(__bind(function() {
        var alt, src, title;
        src = prompt("Please input image url");
        if (src === null || src === "") {
          return;
        }
        alt = prompt("Please input alt text (optional)");
        if (alt === null) {
          return;
        }
        title = prompt("Please input title (optional)");
        if (title === null) {
          return;
        }
        format = format.replace("{src}", src);
        format = format.replace("{title}", title);
        format = format.replace("{alt}", alt);
        return this.replaceSelected(format);
      }, this));
      return $button;
    };
    Jencil.prototype.createButtonFromType = function(type, args) {
      switch (type) {
        case 'separator':
        case '-':
          return this.createSeparator();
        case 'simplewrap':
          return this.createSimpleWrapButton(args[0], args[1], args[2], args[3]);
        case "link":
          return this.createLinkButton(args[0]);
        case "img":
          return this.createImageButton(args[0]);
        default:
          throw new Error("Unknown button type has passed (type: " + type + ")");
      }
    };
    Jencil.createHolder = function(cls, type) {
      if (type == null) {
        type = 'div';
      }
      return $("<" + type + ">").addClass(cls);
    };
    return Jencil;
  })();
  String.prototype.startsWith = function(prefix) {
    return this.lastIndexOf(prefix, 0) === 0;
  };
  $ = jQuery;
  $.fn.jencil = function(options) {
    var path;
    options = $.extend(true, {
      root: void 0,
      profilesetPath: '~/profiles',
      defaultProfileName: 'html',
      defaultInsertText: '*',
      documentTypeElement: void 0
    }, options);
    if (!(options.root != null)) {
      $('script').each(function(a, tag) {
        var match;
        match = $(tag).get(0).src.match(/(.*)jquery\.jencil(\.min)?\.js$/);
        if (match != null) {
          options.root = match[1];
          return options.root = options.root.slice(0, options.root.length - 1);
        }
      });
    }
    if (options.profilesetPath.startsWith('~/')) {
      path = options.profilesetPath.slice(2, options.profilesetPath.length);
      options.profilesetPath = "" + options.root + "/" + path;
    }
    return this.each(function() {
      return new Jencil(this, options);
    });
  };
}).call(this);
