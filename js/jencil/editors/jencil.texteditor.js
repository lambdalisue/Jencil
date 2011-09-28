(function() {
  /*
  Jencil TextEditor
  
  This editor is for editing simple text with preview screeen
  */
  var Initializer, Preview, TextArea, isIE6, isIE7, isIE8;
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
  TextArea = (function() {
    __extends(TextArea, Jencil.widgets.Widget);
    function TextArea(jencil, holder) {
      this.holder = holder;
      TextArea.__super__.constructor.call(this, jencil, 'jencil-textarea');
      this.$element.css({
        position: 'relative'
      });
      this.$source = this.jencil.$textarea;
      this.$surface = $('<textarea>').addClass('surface');
      this.$surface.val(this.$source.val());
      this.$surface.css({
        width: '100%',
        height: '100%',
        border: 'none',
        margin: 0,
        padding: 0,
        resize: 'none',
        outline: 'none'
      });
      this.$surface.bind('keypress change click blur enter', __bind(function() {
        return this.update();
      }, this));
      this.$surface.appendTo(this.$element);
      this.controller = new Textarea(this.$surface);
    }
    TextArea.prototype.update = function() {
      return this.$source.val(this.$surface.val());
    };
    return TextArea;
  })();
  Preview = (function() {
    __extends(Preview, Jencil.widgets.Widget);
    function Preview(jencil, holder) {
      this.holder = holder;
      Preview.__super__.constructor.call(this, jencil, 'jencil-preview');
      this.$element.css({
        position: 'relative'
      });
      this.$surface = $('<div>').addClass('surface');
      this.$surface.appendTo(this.$element);
      this.$surface.css({
        width: '100%',
        height: '100%',
        border: '',
        margin: 0,
        padding: 0,
        overflow: 'auto'
      });
      this.holder.textarea.$element.bind('keypress change click blur enter', __bind(function() {
        return this.update();
      }, this));
      this.show();
    }
    Preview.prototype.isVisible = function() {
      return this.$element.is(':visible');
    };
    Preview.prototype.show = function() {
      this.update();
      this.$element.parent().addClass('preview-enable');
      this.holder.$element.addClass('preview-enable');
      return this.$element.show();
    };
    Preview.prototype.hide = function() {
      this.$element.hide();
      this.$element.parent().removeClass('preview-enable');
      return this.holder.$element.removeClass('preview-enable');
    };
    Preview.prototype.toggle = function() {
      if (this.isVisible()) {
        return this.hide();
      } else {
        return this.show();
      }
    };
    Preview.prototype.update = function() {
      var _update;
      _update = __bind(function() {
        var content, _ref;
        content = this.holder.getValue();
        if (((_ref = this.jencil.profile.extras) != null ? _ref.previewParserPath : void 0) != null) {
          return $.ajax({
            type: this.jencil.profile.extras.previewParserMethod || 'GET',
            dataType: 'text',
            global: false,
            url: this.jencil.profile.extras.previewParserPath,
            data: "" + (this.jencil.profile.extras.previewParserVal || 'data') + "=" + (encodeURIComponent(content)),
            success: __bind(function(data) {
              return this.write(data);
            }, this)
          });
        } else {
          return this.write(content);
        }
      }, this);
      if (this.jencil.profile != null) {
        return _update();
      } else {
        return setTimeout(__bind(function() {
          if (this.jencil.profile != null) {
            return _update();
          } else {
            return setTimeout(arguments.callee, 100);
          }
        }, this), 100);
      }
    };
    Preview.prototype.write = function(content) {
      var url;
      url = this.jencil.options.extras.previewTemplatePath;
      return this.$surface.load(url, function(response, status, xhr) {
        var $$;
        $$ = $(this);
        return $$.html($$.html().replace('{{content}}', content));
      });
    };
    return Preview;
  })();
  Initializer = (function() {
    __extends(Initializer, Jencil.editors.Initializer);
    Initializer.prototype.stylesheets = [['~/jencil.texteditor.css', 'screen, projection']];
    Initializer.prototype.requires = [['~/textarea.min.js', 'window.Textarea'], ['~/jquery.textarea.js', '$.fn.tabby']];
    Initializer.prototype.options = {
      previewPosition: 'right',
      previewTemplatePath: '~/templates/preview.html',
      defaultPreviewState: 'open'
    };
    function Initializer(jencil) {
      Initializer.__super__.constructor.call(this, jencil);
      this.options.previewTemplatePath = jencil.abspath(this.options.previewTemplatePath);
    }
    return Initializer;
  })();
  namespace('Jencil.editors', function(exports) {
    var EditorBase, TextEditor;
    EditorBase = Jencil.editors.EditorBase;
    return exports.TextEditor = TextEditor = (function() {
      __extends(TextEditor, EditorBase);
      TextEditor.Initializer = Initializer;
      function TextEditor(jencil) {
        var _ref;
        TextEditor.__super__.constructor.call(this, jencil, 'jencil-text-editor', 'div');
        this.$element.addClass("" + this.jencil.options.extras.previewPosition);
        this.textarea = new TextArea(this.jencil, this);
        this.preview = new Preview(this.jencil, this);
        if ((_ref = this.jencil.options.extras.previewPosition) === 'top' || _ref === 'left') {
          this.append(this.preview);
          this.append(this.textarea);
        } else {
          this.append(this.textarea);
          this.append(this.preview);
        }
        if ($.fn.tabby != null) {
          this.$element.tabby();
        }
        if (this.jencil.options.extras.defaultPreviewState === 'close') {
          this.preview.hide();
        }
      }
      TextEditor.prototype.reconstruct = function() {
        var getOffsetX, getOffsetY, height, offsetpx, offsetpy, offsettx, offsetty, range, width, _ref;
        getOffsetX = function($$) {
          return $$.outerWidth(true) - $$.width();
        };
        getOffsetY = function($$) {
          return $$.outerHeight(true) - $$.height();
        };
        offsettx = getOffsetX(this.textarea.$element);
        offsetpx = getOffsetX(this.preview.$element);
        offsetty = getOffsetY(this.textarea.$element);
        offsetpy = getOffsetY(this.preview.$element);
        width = this.$element.width();
        height = this.$element.height();
        if (this.preview.isVisible()) {
          if ((_ref = this.jencil.options.extras.previewPosition) === 'left' || _ref === 'right') {
            if (this.jencil.options.extras.previewPosition === 'left') {
              this.textarea.$element.css({
                float: 'right'
              });
              this.preview.$element.css({
                float: 'left'
              });
            } else if (this.jencil.options.extras.previewPosition === 'right') {
              this.textarea.$element.css({
                float: 'left'
              });
              this.preview.$element.css({
                float: 'right'
              });
            }
            this.textarea.$element.width(width / 2 - offsettx);
            this.preview.$element.width(width / 2 - offsetpx);
            this.textarea.$element.height(height - offsetty);
            this.preview.$element.height(height - offsetpy);
          } else {
            this.textarea.$element.width(width - offsettx);
            this.preview.$element.width(width - offsetpx);
            this.textarea.$element.height(height / 2 - offsetty);
            this.preview.$element.height(height / 2 - offsetpy);
          }
        } else {
          this.textarea.$element.css({
            float: 'none'
          });
          this.preview.$element.css({
            float: 'none'
          });
          this.textarea.$element.width(width - offsettx);
          this.textarea.$element.height(height - offsetty);
        }
        if (isIE6 || isIE7) {
          this.textarea.$surface.height(this.textarea.$element.height());
          this.preview.$surface.height(this.preview.$element.height());
        }
        if (isIE8) {
          range = document.selection.createRange();
          return range.select();
        }
      };
      TextEditor.prototype.init = function() {
        this.reconstruct();
        return this.update();
      };
      TextEditor.prototype.update = function() {
        this.textarea.update();
        return this.preview.update();
      };
      TextEditor.prototype.getValue = function() {
        return this.textarea.controller.getValue();
      };
      TextEditor.prototype.getSelection = function() {
        return this.textarea.controller.getSelection();
      };
      TextEditor.prototype.setSelection = function(start, end) {
        return this.textarea.controller.setSelection(start, end);
      };
      TextEditor.prototype.getSelected = function() {
        return this.textarea.controller.getSelected();
      };
      TextEditor.prototype.replaceSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        return this.textarea.controller.replaceSelected(str, select);
      };
      TextEditor.prototype.insertBeforeSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        return this.textarea.controller.insertBeforeSelected(str, select);
      };
      TextEditor.prototype.insertAfterSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        return this.textarea.controller.insertAfterSelected(str, select);
      };
      TextEditor.prototype.wrapSelected = function(before, after, select, additional) {
        if (select == null) {
          select = false;
        }
        if (additional == null) {
          additional = void 0;
        }
        return this.textarea.controller.wrapSelected(before, after, select, additional);
      };
      return TextEditor;
    })();
  });
  namespace('Jencil.buttons', function(exports) {
    var ButtonBase, PreviewButton;
    ButtonBase = Jencil.buttons.ButtonBase;
    return exports.PreviewButton = PreviewButton = (function() {
      __extends(PreviewButton, ButtonBase);
      function PreviewButton(jencil, args) {
        PreviewButton.__super__.constructor.call(this, jencil, 'preview', 'Preview');
      }
      PreviewButton.prototype.click = function() {
        var editor;
        editor = this.editor();
        editor.preview.toggle();
        return editor.reconstruct();
      };
      return PreviewButton;
    })();
  });
}).call(this);
