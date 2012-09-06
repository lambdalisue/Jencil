var Editor, TextEditor, TextPanel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Editor = (function(_super) {

  __extends(Editor, _super);

  function Editor(core, selector, context) {
    Editor.__super__.constructor.call(this, core, selector, context);
    this.element.addClass('editor');
    this._updateCallbacks = [];
  }

  Editor.prototype.focus = function() {
    throw "NotImplementedError";
  };

  Editor.prototype.getValue = function() {
    throw "NotImplementedError";
  };

  Editor.prototype.setValue = function() {
    throw "NotImplementedError";
  };

  Editor.prototype.update = function(callback) {
    var _i, _len, _ref, _results;
    if (callback != null) {
      this._updateCallbacks.push(callback);
      return this;
    }
    _ref = this._updateCallbacks;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      callback = _ref[_i];
      _results.push(callback.call(this, this.getValue()));
    }
    return _results;
  };

  Editor.prototype.createMemento = function() {
    return this.getValue();
  };

  Editor.prototype.setMemento = function(memento) {
    return this.setValue(memento);
  };

  return Editor;

})(Panel);

TextPanel = (function(_super) {

  __extends(TextPanel, _super);

  function TextPanel(core) {
    TextPanel.__super__.constructor.call(this, core, '<textarea>');
    this.element.css({
      margin: '0',
      padding: '0',
      border: 'none',
      outline: 'none',
      resize: 'none'
    });
    if ($.fn.tabby != null) {
      this.element.tabby();
    }
    this.helper = new Textarea(window.document, this.element.get(0));
  }

  TextPanel.prototype.caret = function(start, end) {
    return this.helper.selection.caret(start, end);
  };

  TextPanel.prototype.selection = function(value) {
    if (value != null) {
      return this.helper.selection.replaceSelection(value, true);
    }
    return this.helper.selection.text();
  };

  TextPanel.prototype.insertBefore = function(str) {
    return this.helper.selection.insertBeforeSelection(str, true);
  };

  TextPanel.prototype.insertAfter = function(str) {
    return this.helper.selection.insertAfterSelection(str, true);
  };

  TextPanel.prototype.wrap = function(before, after) {
    return this.helper.selection.wrapSelection(before, after, true);
  };

  return TextPanel;

})(Panel);

TextEditor = (function(_super) {

  __extends(TextEditor, _super);

  function TextEditor(core) {
    var _this = this;
    TextEditor.__super__.constructor.call(this, core);
    this.textPanel = new TextPanel(core);
    this.element.append(this.textPanel.element);
    this.textPanel.element.on('keyup keypress click blur', function() {
      return _this.update();
    });
    this.textPanel.element.on('keyup', function(e) {
      var dummyCommand;
      if (e.which === 13) {
        dummyCommand = new DummyCommand(_this);
        return _this.core.caretaker.invoke(dummyCommand);
      }
    });
  }

  TextEditor.prototype.adjust = function() {
    this.textPanel.element.outerWidth(this.element.width());
    this.textPanel.element.outerHeight(this.element.height());
    this.textPanel.adjust();
    return this;
  };

  TextEditor.prototype.focus = function() {
    this.textPanel.element.focus();
    return this;
  };

  TextEditor.prototype.getValue = function() {
    return this.textPanel.helper.val();
  };

  TextEditor.prototype.setValue = function(value) {
    this.textPanel.helper.val(value);
    this.update();
    return this;
  };

  TextEditor.prototype.caret = function(start, end) {
    this.textPanel.focus();
    return this.textPanel.caret(start, end);
  };

  TextEditor.prototype.selection = function(value) {
    if (value != null) {
      this.textPanel.selection(value);
      this.update();
      return this;
    }
    return this.textPanel.selection(value);
  };

  TextEditor.prototype.insertBefore = function(str) {
    this.textPanel.insertBefore(str);
    return this.update();
  };

  TextEditor.prototype.insertAfter = function(str) {
    this.textPanel.insertAfter(str);
    return this.update();
  };

  TextEditor.prototype.wrap = function(before, after) {
    this.textPanel.wrap(before, after);
    return this.update();
  };

  return TextEditor;

})(Editor);
