var Selection, Textarea;

Selection = (function() {

  function Selection(document, element) {
    this.document = document;
    this.element = element;
    this;

  }

  Selection.prototype._getCaret = function() {
    var clone, e, range, s;
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
    return [s, e];
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
    if ((start != null) && (end != null)) {
      return this._setCaret(start, end);
    }
    return this._getCaret();
  };

  Selection.prototype.text = function() {
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

  Selection.prototype.replace = function(str, start, end) {
    var a, b, range, scrollTop;
    scrollTop = this.element.scrollTop;
    if (this.document.selection) {
      this.element.focus();
      range = document.selection.createRange();
      range.text = str;
      range.select();
    } else if (this.element.setSelectionRange) {
      b = this.element.value.substring(0, start);
      a = this.element.value.substring(end);
      this.element.value = b + str + a;
    }
    this.element.scrollTop = scrollTop;
    return this;
  };

  Selection.prototype.replaceSelection = function(str, keepSelection) {
    var e, s, scrollTop, _ref;
    scrollTop = this.element.scrollTop;
    _ref = this.caret(), s = _ref[0], e = _ref[1];
    this.replace(str, s, e);
    e = s + str.length;
    if (!keepSelection) {
      s = e;
    }
    this.caret(s, e);
    this.element.focus();
    this.element.scrollTop = scrollTop;
    return this;
  };

  Selection.prototype.insertBeforeSelection = function(str, keepSelection) {
    var e, s, scrollTop, text, _ref;
    scrollTop = this.element.scrollTop;
    _ref = this.caret(), s = _ref[0], e = _ref[1];
    text = this.text();
    this.replace(str + text, s, e);
    e = s + str.length;
    if (!keepSelection) {
      s = e;
    }
    this.caret(s, e);
    this.element.focus();
    this.element.scrollTop = scrollTop;
    return this;
  };

  Selection.prototype.insertAfterSelection = function(str, keepSelection) {
    var e, s, scrollTop, text, _ref;
    scrollTop = this.element.scrollTop;
    _ref = this.caret(), s = _ref[0], e = _ref[1];
    text = this.text();
    this.replace(text + str, s, e);
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

  Selection.prototype.wrapSelection = function(b, a, keepSelection) {
    var e, s, scrollTop, str, text, _ref;
    scrollTop = this.element.scrollTop;
    text = this.text();
    if (text.indexOf(b) === 0 && text.lastIndexOf(a) === (text.length - a.length)) {
      str = text.substring(b.length, text.length - a.length);
      this.replaceSelection(str, keepSelection);
    } else {
      _ref = this.caret(), s = _ref[0], e = _ref[1];
      this.replace(b + text + a, s, e);
      e = s + b.length + text.length + a.length;
      if (!keepSelection) {
        s = e;
      }
      this.caret(s, e);
    }
    this.element.focus();
    this.element.scrollTop = scrollTop;
    return this;
  };

  return Selection;

})();

Textarea = (function() {

  function Textarea(document, element) {
    this.document = document;
    this.element = element;
    this.selection = new Selection(this.document, this.element);
  }

  Textarea.prototype.val = function(value) {
    if (value != null) {
      this.element.value = value;
      return this;
    }
    return this.element.value;
  };

  return Textarea;

})();

if (typeof exports !== "undefined" && exports !== null) {
  exports.Selection = Selection;
}

if (typeof exports !== "undefined" && exports !== null) {
  exports.Textarea = Textarea;
}
