/*
Jencil editor pane

Author: Alisue (lambdalisue@hashnote.net)
License: MIT License

Copyright 2011 hashnote.net, Alisue allright reserved

Required:
- Jencil.widget (jencil.widget.js)
- Jencil.editor (jencil.editor.js)

Dependencies:
- Jencil.utils.detector (jencil.utils.js)
- Jencil.utils.path (jencil.utils.js)
*/
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
namespace('Jencil.editor.pane', function(exports) {
  var EditorPane, PreviewPane, Widget;
  Widget = Jencil.widget.Widget;
  exports.EditorPane = EditorPane = (function() {
    __extends(EditorPane, Widget);
    function EditorPane(jencil, cls, editor) {
      this.editor = editor;
      EditorPane.__super__.constructor.call(this, jencil, cls);
      this._updateCallbacks = [];
    }
    EditorPane.prototype.init = function() {
      return this;
    };
    EditorPane.prototype.update = function(callback) {
      var _i, _len, _ref, _results;
      if (callback != null) {
        return this._updateCallbacks.push(callback);
      } else {
        _ref = this._updateCallbacks;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          callback = _ref[_i];
          _results.push(callback());
        }
        return _results;
      }
    };
    EditorPane.prototype.isVisible = function() {
      return this.$element.is(':visible');
    };
    EditorPane.prototype.show = function() {
      this.update();
      this.editor.$element.removeClass("" + this.cls + "-invisible");
      return this.$element.show();
    };
    EditorPane.prototype.hide = function() {
      this.editor.$element.addClass("" + this.cls + "-invisible");
      return this.$element.hide();
    };
    EditorPane.prototype.toggle = function() {
      if (this.isVisible()) {
        return this.hide();
      } else {
        return this.show();
      }
    };
    EditorPane.prototype.relocate = function() {};
    EditorPane.prototype.focus = function() {
      return this.$element.focus();
    };
    return EditorPane;
  })();
  return exports.PreviewPane = PreviewPane = (function() {
    __extends(PreviewPane, EditorPane);
    function PreviewPane(jencil, editor) {
      PreviewPane.__super__.constructor.call(this, jencil, 'jencil-preview-pane', editor);
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
    }
    PreviewPane.prototype._writeContent = function(content) {
      var process, templatePath;
      process = __bind(function(template) {
        return this.$surface.html(template.replace('{{content}}', content));
      }, this);
      if (!(this._previewTemplate != null)) {
        templatePath = Jencil.utils.path.abspath(this.jencil.options.extras.previewTemplatePath);
        return this.$surface.load(templatePath, __bind(function(response, status, xhr) {
          this._previewTemplate = response;
          return process(response);
        }, this));
      } else {
        return process(this._previewTemplate);
      }
    };
    PreviewPane.prototype.update = function() {
      var process, process2;
      process = __bind(function(content) {
        this._writeContent(content);
        return process.__super__.constructor.call(this);
      }, this);
      process.__super__ = PreviewPane.__super__.update.apply(this, arguments);
      process2 = __bind(function() {
        var content, _ref;
        content = this.editor.getValue();
        if (((_ref = this.jencil.profile.extras) != null ? _ref.previewParserPath : void 0) != null) {
          content = encodeURIComponent(content);
          return $.ajax({
            url: Jencil.utils.path.abspath(this.jencil.profile.extras.previewParserPath),
            type: this.jencil.profile.extras.previewParserMethod || 'GET',
            dataType: this.jencil.profile.extras.previewParserType || 'text',
            data: "" + (this.jencil.profile.extras.previewParserVal || 'data') + "=" + content,
            success: __bind(function(content) {
              return process(content);
            }, this)
          });
        } else {
          return process(content);
        }
      }, this);
      if (this.jencil.profile != null) {
        return process2();
      } else {
        return setTimeout(__bind(function() {
          if (this.jencil.profile != null) {
            return process2();
          } else {
            return setTimeout(arguments.callee, 100);
          }
        }, this), 100);
      }
    };
    PreviewPane.prototype.relocate = function() {
      PreviewPane.__super__.relocate.call(this);
      if (Jencil.utils.detector.browser === 'Explorer' && Jencil.utils.detector.version < 8) {
        return this.$surface.height(this.$element.height());
      }
    };
    return PreviewPane;
  })();
});