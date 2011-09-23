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
    var ButtonHolder, DocumentType, Toolbar, Widget;
    exports.Widget = Widget = (function() {
      function Widget(jencil, cls, type) {
        this.jencil = jencil;
        if (type == null) {
          type = 'div';
        }
        this.$element = $("<" + type + ">").addClass(cls);
      }
      Widget.prototype.after = function(widget) {
        return this.$element.after(widget.$element);
      };
      Widget.prototype.append = function(widget) {
        return this.$element.append(widget.$element);
      };
      Widget.prototype.appendTo = function(widget) {
        return this.$element.appendTo(widget.$element);
      };
      Widget.prototype.before = function(widget) {
        return this.$element.before(widget.$element);
      };
      Widget.prototype.prepend = function(widget) {
        return this.$element.prepend(widget.$element);
      };
      Widget.prototype.prependTo = function(widget) {
        return this.$element.prependTo(widget.$element);
      };
      return Widget;
    })();
    exports.DocumentType = DocumentType = (function() {
      __extends(DocumentType, Widget);
      function DocumentType(jencil) {
        DocumentType.__super__.constructor.call(this, jencil, 'jencil-document-type');
        this.$documentTypeElement = this.jencil.options.documentTypeElement;
        if (this.$documentTypeElement != null) {
          this.$element.append(this.$documentTypeElement);
          this.$documentTypeElement.change(this.update);
          this.update();
        }
      }
      DocumentType.prototype.update = function() {
        var profileName;
        profileName = this.$documentTypeElement.val();
        return this.jencil.buttonHolder.update(profileName);
      };
      return DocumentType;
    })();
    exports.ButtonHolder = ButtonHolder = (function() {
      __extends(ButtonHolder, Widget);
      function ButtonHolder(jencil) {
        ButtonHolder.__super__.constructor.call(this, jencil, 'jencil-button-holder');
        this.update(this.jencil.options.defaultProfileName);
      }
      ButtonHolder.prototype.update = function(profileName) {
        var check, url;
        delete Jencil.profile;
        url = "" + this.jencil.options.profilesetPath + "/" + profileName + ".js";
        check = 'Jencil.profile';
        return Jencil.utils.load([[url, check]], __bind(function() {
          var args, button, buttonset, type, _i, _len, _ref, _results;
          this.$element.children().remove();
          _ref = Jencil.profile.buttonsets;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            buttonset = _ref[_i];
            type = buttonset[0];
            args = buttonset.slice(1, (buttonset.length + 1) || 9e9);
            button = Jencil.widgets.createButton(this.jencil, type, args);
            _results.push(this.append(button));
          }
          return _results;
        }, this));
      };
      return ButtonHolder;
    })();
    return exports.Toolbar = Toolbar = (function() {
      __extends(Toolbar, Widget);
      function Toolbar(jencil) {
        Toolbar.__super__.constructor.call(this, jencil, 'jencil-toolbar');
      }
      return Toolbar;
    })();
  });
}).call(this);
