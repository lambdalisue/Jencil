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
    var Editor, Preview, TextArea, Widget, Wysiwym;
    Widget = Jencil.widgets.Widget;
    Editor = Jencil.widgets.Editor;
    TextArea = (function() {
      __extends(TextArea, Widget);
      function TextArea(jencil, wysiwym) {
        this.wysiwym = wysiwym;
        TextArea.__super__.constructor.call(this, jencil, 'jencil-wysiwym-textarea', jencil.$textarea);
        this.controller = new Textarea(this.$element);
      }
      return TextArea;
    })();
    Preview = (function() {
      __extends(Preview, Widget);
      function Preview(jencil, wysiwym) {
        this.wysiwym = wysiwym;
        Preview.__super__.constructor.call(this, jencil, 'jencil-wysiwym-preview', 'div');
        this.$surface = $('<div>').addClass('surface');
        this.$element.append(this.$surface);
        this.wysiwym.textarea.$element.bind('keyup change click blur enter', __bind(function() {
          return this.update();
        }, this));
        this.show();
      }
      Preview.prototype.show = function() {
        this.update();
        this.$element.parent().attr('preview', 'preview');
        this.wysiwym.$element.attr('preview', 'preview');
        return this.$element.show();
      };
      Preview.prototype.hide = function() {
        this.$element.hide();
        this.$element.parent().removeAttr('preview');
        return this.wysiwym.$element.attr('preview', 'preview');
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
          content = this.wysiwym.getValue();
          if (Jencil.profile.previewPraserPath != null) {
            return $.ajax({
              type: (_ref = Jencil.profile.previewParserMethod) != null ? _ref : 'GET',
              dataType: 'text',
              global: false,
              url: this.jencil.abspath(Jencil.profile.previewParserPath),
              data: "" + ((_ref2 = Jencil.profile.previewParserVal) != null ? _ref2 : 'data') + "=" + (encodeURIComponent(content)),
              success: __bind(function(data) {
                return this.write(data);
              }, this),
              error: function(xhr, status, error) {
                console.log("xhr: " + xhr + ", status: " + status + ", error: " + error);
                throw new Error(error);
              }
            });
          } else {
            return this.write(content);
          }
        }, this);
        if (Jencil.profile != null) {
          return _update();
        } else {
          return setTimeout(function() {
            if (Jencil.profile != null) {
              return _update();
            } else {
              return setTimeout(arguments.callee, 100);
            }
          }, 100);
        }
      };
      Preview.prototype.write = function(content) {
        return this.$surface.load(this.jencil.options.previewTemplatePath, function(response, status, xhr) {
          return $(this).html($(this).html().replace('{{content}}', content));
        });
      };
      return Preview;
    })();
    return exports.Wysiwym = Wysiwym = (function() {
      __extends(Wysiwym, Editor);
      function Wysiwym(jencil) {
        Wysiwym.__super__.constructor.call(this, jencil, 'jencil-wysiwym-editor', 'div');
        this.$element.attr('preview-position', this.jencil.options.previewPosition);
        this.textarea = new TextArea(this.jencil, this);
        this.preview = new Preview(this.jencil, this);
      }
      Wysiwym.prototype.getValue = function() {
        return this.textarea.controller.getValue();
      };
      Wysiwym.prototype.getSelection = function() {
        return this.textarea.controller.getSelection();
      };
      Wysiwym.prototype.setSelection = function(start, end) {
        return this.textarea.controller.setSelection(start, end);
      };
      Wysiwym.prototype.getSelected = function() {
        return this.textarea.controller.getSelected();
      };
      Wysiwym.prototype.replaceSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        return this.textarea.controller.replaceSelected(str, select);
      };
      Wysiwym.prototype.insertBeforeSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        return this.textarea.controller.insertBeforeSelected(str, select);
      };
      Wysiwym.prototype.insertAfterSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        return this.textarea.controller.insertAfterSelected(str, select);
      };
      Wysiwym.prototype.wrapSelected = function(before, after, select, additional) {
        if (select == null) {
          select = false;
        }
        if (additional == null) {
          additional = void 0;
        }
        return this.textarea.controller.wrapSelected(before, after, select, additional);
      };
      return Wysiwym;
    })();
  });
}).call(this);
