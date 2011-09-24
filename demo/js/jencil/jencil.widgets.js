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
    var ButtonHolder, DocumentType, Editor, Toolbar, Widget, Workspace;
    exports.Widget = Widget = (function() {
      function Widget(jencil, cls, type) {
        this.jencil = jencil;
        if (type == null) {
          type = 'div';
        }
        if (type instanceof window.jQuery) {
          this.$element = type.addClass(cls);
        } else {
          this.$element = $("<" + type + ">").addClass(cls);
        }
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
          this.$documentTypeElement.change(__bind(function() {
            return this.update();
          }, this));
          this.update();
        }
      }
      DocumentType.prototype.getProfileName = function() {
        if (this.$documentTypeElement != null) {
          return this.$documentTypeElement.val();
        }
        return this.jencil.defaultProfileName;
      };
      DocumentType.prototype.update = function() {
        var profileName;
        profileName = this.getProfileName();
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
        url = "" + this.jencil.options.profileSetPath + "/" + profileName + ".js";
        check = 'Jencil.profile';
        return Jencil.utils.load([[url, check]], __bind(function() {
          var args, button, buttonset, type, _i, _len, _ref;
          this.$element.children().remove();
          _ref = Jencil.profile.buttonsets;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            buttonset = _ref[_i];
            type = buttonset[0];
            args = buttonset.slice(1, (buttonset.length + 1) || 9e9);
            button = Jencil.widgets.createButton(this.jencil, type, args);
            this.append(button);
          }
          return this.jencil.editor().update();
        }, this));
      };
      return ButtonHolder;
    })();
    exports.Toolbar = Toolbar = (function() {
      __extends(Toolbar, Widget);
      function Toolbar(jencil) {
        Toolbar.__super__.constructor.call(this, jencil, 'jencil-toolbar');
      }
      return Toolbar;
    })();
    exports.Workspace = Workspace = (function() {
      __extends(Workspace, Widget);
      function Workspace(jencil) {
        Workspace.__super__.constructor.call(this, jencil, 'jencil-workspace');
      }
      return Workspace;
    })();
    return exports.Editor = Editor = (function() {
      __extends(Editor, Widget);
      function Editor(jencil, cls, type) {
        Editor.__super__.constructor.call(this, jencil, cls, type);
      }
      Editor.prototype.update = function() {};
      Editor.prototype.getValue = function() {
        throw new Error("Subclass must override this method.");
      };
      Editor.prototype.getSelection = function() {
        throw new Error("Subclass must override this method.");
      };
      Editor.prototype.setSelection = function(start, end) {
        throw new Error("Subclass must override this method.");
      };
      Editor.prototype.getSelected = function() {
        throw new Error("Subclass must override this method.");
      };
      Editor.prototype.replaceSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        throw new Error("Subclass must override this method.");
      };
      Editor.prototype.insertBeforeSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        throw new Error("Subclass must override this method.");
      };
      Editor.prototype.insertAfterSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        throw new Error("Subclass must override this method.");
      };
      Editor.prototype.wrapSelected = function(before, after, select, additional) {
        if (select == null) {
          select = false;
        }
        if (additional == null) {
          additional = void 0;
        }
        throw new Error("Subclass must override this method.");
      };
      return Editor;
    })();
  });
}).call(this);
