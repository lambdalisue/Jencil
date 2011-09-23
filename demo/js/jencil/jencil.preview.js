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
    var Preview, Widget;
    Widget = Jencil.widgets.Widget;
    return exports.Preview = Preview = (function() {
      __extends(Preview, Widget);
      function Preview(jencil) {
        Preview.__super__.constructor.call(this, jencil, 'jencil-preview', 'div');
        this.$surface = $('<div>').addClass('jencil-preview-surface');
        this.$element.append(this.$surface);
        this.enable();
      }
      Preview.prototype.enable = function() {
        this.update();
        this.jencil.$textarea.bind('keyup change click blur enter', __bind(function() {
          return this.update();
        }, this));
        return this.$element.show('fast');
      };
      Preview.prototype.disable = function() {
        this.jencil.$textarea.unbind('keyup change click blur enter', __bind(function() {
          return this.update();
        }, this));
        return this.$element.hide('fast');
      };
      Preview.prototype.toggle = function() {
        if (this.$element.is(':visible')) {
          return this.disable();
        } else {
          return this.enable();
        }
      };
      Preview.prototype.update = function() {
        var content;
        content = this.jencil.getValue();
        return this.$surface.load(this.jencil.options.previewTemplateUrl, function(response, status, xhr) {
          return $(this).html($(this).html().replace('{{content}}', content));
        });
      };
      return Preview;
    })();
  });
}).call(this);
