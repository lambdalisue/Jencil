(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  namespace('Jencil.editors', function(exports) {
    var Editor, Preview, TextArea, TextEditor, Widget;
    Widget = Jencil.widgets.Widget;
    Editor = Jencil.editors.Editor;
    TextArea = (function() {
      __extends(TextArea, Widget);
      function TextArea(jencil, holder) {
        this.holder = holder;
        TextArea.__super__.constructor.call(this, jencil, 'jencil-textarea');
        this.$source = this.jencil.$textarea;
        this.$surface = new $('<textarea>').addClass('surface');
        this.$surface.val(this.$source.val());
        this.$surface.bind('keyup change click blur enter', __bind(function() {
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
      __extends(Preview, Widget);
      function Preview(jencil, holder) {
        this.holder = holder;
        Preview.__super__.constructor.call(this, jencil, 'jencil-preview');
        this.$surface = new $('<div>').addClass('surface');
        this.$surface.appendTo(this.$element);
        this.holder.textarea.$element.bind('keyup change click blur enter', __bind(function() {
          return this.update();
        }, this));
        this.show();
      }
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
        if (this.$element.is(':visible')) {
          return this.hide();
        } else {
          return this.show();
        }
      };
      Preview.prototype.update = function() {
        var _update;
        _update = __bind(function() {
          var content, _ref, _ref2;
          content = this.holder.getValue();
          if (Jencil.profile.previewParserPath != null) {
            return $.ajax({
              type: (_ref = Jencil.profile.previewParserMethod) != null ? _ref : 'GET',
              dataType: 'text',
              global: false,
              url: this.jencil.abspath(Jencil.profile.previewParserPath),
              data: "" + ((_ref2 = Jencil.profile.previewParserVal) != null ? _ref2 : 'data') + "=" + (encodeURIComponent(content)),
              success: __bind(function(data) {
                return this.write(data);
              }, this)
            });
          } else {
            return this.write(content);
          }
        }, this);
        if (Jencil.profile != null) {
          return _update();
        } else {
          return setTimeout(__bind(function() {
            if (Jencil.profile != null) {
              return _update();
            } else {
              return setTimeout(arguments.callee, 100);
            }
          }, this), 100);
        }
      };
      Preview.prototype.write = function(content) {
        var url;
        url = this.jencil.options.previewTemplatePath;
        return this.$surface.load(url, function(response, status, xhr) {
          var $$;
          $$ = $(this);
          return $$.html($$.html().replace('{{content}}', content));
        });
      };
      return Preview;
    })();
    return exports.TextEditor = TextEditor = (function() {
      __extends(TextEditor, Editor);
      function TextEditor(jencil) {
        TextEditor.__super__.constructor.call(this, jencil, 'jencil-text-editor', 'div');
        this.$element.addClass("preview-position-" + this.jencil.options.previewPosition);
        this.textarea = new TextArea(this.jencil, this);
        this.preview = new Preview(this.jencil, this);
        this.append(this.textarea);
        this.append(this.preview);
      }
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
}).call(this);
