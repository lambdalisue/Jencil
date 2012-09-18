var Selection;

Selection = (function() {

  function Selection(document, element) {
    this.document = document;
    this.element = element;
    this;

  }

  Selection.prototype._getCaret = function() {
    var caret, clone, e, range, s;
    if (this.document.selection != null) {
      range = this.document.selection.createRange();
      clone = range.duplicate();
      clone.moveToElementText(this.element);
      clone.setEndPoint('EndToEnd', range);
      s = clone.text.length - range.text.length;
      e = s + range.text.length;
    } else if (this.element.setSelectionRange != null) {
      s = this.element.selectionStart;
      e = this.element.selectionEnd;
    }
    caret = [s, e];
    caret.isCollapse = s === e;
    return caret;
  };

  Selection.prototype._setCaret = function(start, end) {
    var range, scrollTop;
    scrollTop = this.element.scrollTop;
    if (this.element.setSelectionRange != null) {
      this.element.setSelectionRange(start, end);
    } else if (this.element.createTextRange) {
      range = this.element.createTextRange();
      range.collapse(true);
      range.moveStart('character', start);
      range.moveEnd('character', end - start);
      range.select();
    }
    this.element.focus();
    this.element.scrollTop = scrollTop;
    return this;
  };

  Selection.prototype.caret = function(start, end) {
    if ((start != null) && typeof start === 'array') {
      end = start[1];
      start = start[0];
    }
    if ((start != null) && !(end != null)) {
      end = start;
    }
    if ((start != null) && (end != null)) {
      return this._setCaret(start, end);
    }
    return this._getCaret();
  };

  Selection.prototype.caretOffset = function(offset) {
    var caret;
    caret = this.caret();
    return this.caret(caret[0] + offset);
  };

  Selection.prototype._replace = function(str, start, end) {
    var a, b, scrollTop;
    scrollTop = this.element.scrollTop;
    b = this.element.value.substring(0, start);
    a = this.element.value.substring(end);
    this.element.value = b + str + a;
    this.element.scrollTop = scrollTop;
    return this;
  };

  Selection.prototype._getText = function() {
    var e, range, s, _ref;
    if (this.document.selection != null) {
      range = this.document.selection.createRange();
      return range.text;
    } else if (this.element.setSelectionRange) {
      _ref = this.caret(), s = _ref[0], e = _ref[1];
      return this.element.value.substring(s, e);
    }
    return null;
  };

  Selection.prototype._setText = function(str, keepSelection) {
    var e, s, scrollTop, _ref;
    scrollTop = this.element.scrollTop;
    _ref = this.caret(), s = _ref[0], e = _ref[1];
    this._replace(str, s, e);
    e = s + str.length;
    if (!keepSelection) {
      s = e;
    }
    this.caret(s, e);
    this.element.focus();
    this.element.scrollTop = scrollTop;
    return this;
  };

  Selection.prototype.text = function(str, keepSelection) {
    if (str != null) {
      return this._setText(str, keepSelection);
    }
    return this._getText();
  };

  Selection.prototype.insertBefore = function(str, keepSelection) {
    var e, s, scrollTop, text, _ref;
    scrollTop = this.element.scrollTop;
    _ref = this.caret(), s = _ref[0], e = _ref[1];
    text = this.text();
    this._replace(str + text, s, e);
    e = s + str.length;
    if (!keepSelection) {
      s = e;
    }
    this.caret(s, e);
    this.element.focus();
    this.element.scrollTop = scrollTop;
    return this;
  };

  Selection.prototype.insertAfter = function(str, keepSelection) {
    var e, s, scrollTop, text, _ref;
    scrollTop = this.element.scrollTop;
    _ref = this.caret(), s = _ref[0], e = _ref[1];
    text = this.text();
    this._replace(text + str, s, e);
    s = e;
    e = e + str.length;
    if (!keepSelection) {
      s = e;
    }
    this.caret(s, e);
    this.element.focus();
    this.element.scrollTop = scrollTop;
    return this;
  };

  Selection.prototype.enclose = function(lhs, rhs, keepSelection) {
    var e, s, scrollTop, str, text, _ref;
    scrollTop = this.element.scrollTop;
    text = this.text();
    if (text.indexOf(lhs) === 0 && text.lastIndexOf(rhs) === (text.length - rhs.length)) {
      str = text.substring(lhs.length, text.length - rhs.length);
      this.text(str, keepSelection);
    } else {
      _ref = this.caret(), s = _ref[0], e = _ref[1];
      this._replace(lhs + text + rhs, s, e);
      e = s + lhs.length + text.length + rhs.length;
      if (!keepSelection) {
        s = e;
      }
      this.caret(s, e);
    }
    this.element.focus();
    this.element.scrollTop = scrollTop;
    return this;
  };

  Selection.prototype._getLineCaretOfCaret = function(caret) {
    var e, s, value;
    value = this.element.value;
    s = value.lastIndexOf("\n", caret - 1) + 1;
    e = value.indexOf("\n", caret);
    if (e === -1) {
      e = value.length;
    }
    return [s, e];
  };

  Selection.prototype._getLineCaret = function() {
    return this._getLineCaretOfCaret(this.caret()[0]);
  };

  Selection.prototype._getLine = function() {
    var e, s, _ref;
    _ref = this._getLineCaret(), s = _ref[0], e = _ref[1];
    return this.element.value.substring(s, e);
  };

  Selection.prototype._setLine = function(line, keepSelection) {
    var e, s, scrollTop, _ref;
    scrollTop = this.element.scrollTop;
    _ref = this._getLineCaret(), s = _ref[0], e = _ref[1];
    this._replace(line, s, e);
    e = s + line.length;
    if (!keepSelection) {
      s = e;
    }
    this.caret(s, e);
    this.element.focus();
    this.element.scrollTop = scrollTop;
    return this;
  };

  Selection.prototype.line = function(value, keepSelection) {
    if (value != null) {
      return this._setLine(value, keepSelection);
    }
    return this._getLine();
  };

  Selection.prototype.selectWholeLine = function(caret) {
    var e, s, _ref;
    _ref = this._getLineCaretOfCaret(caret), s = _ref[0], e = _ref[1];
    return this.caret(s, e);
  };

  Selection.prototype.selectWholeCurrentLine = function() {
    var e, s, _ref;
    _ref = this._getLineCaretOfCaret(this.caret()[0]), s = _ref[0], e = _ref[1];
    return this.caret(s, e);
  };

  return Selection;

})();
