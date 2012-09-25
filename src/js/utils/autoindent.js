/*
autoindent

Enable auto indentation feature in textarea
It is suitable with jquery.tabby.js which enable tab indentation in textarea

The following library is required to use this library

- jQuery
- selection

Note:
  You should use this library as CoffeeScript that's why I didn't
  add `autoIndentable` in window namespace

Usage:

  textarea = $('textarea')
  textarea = autoIndentable(textarea)

  # auto indent feature is enable at default.
  # you can disable it with
  textarea.autoIndent.disable()

  # and enable again with
  textarea.autoIndent.enable()

  # and also, you can add some pre/post callback
  # which is called pre/post step of adding newline
  # and white spaces with
  textarea.autoIndent.pre = (e, line) ->
    # e = Event object of jQuery
    # line = current line of caret exists
    console.log "This function is called before newline adding"
  textarea.autoIndent.post = (e, line, indent, insert) ->
    # e = Event object of jQuery
    # line = current line of caret exists
    # indent = leading white spaces of current line
    # insert = newline and indent which is added after the caret
    console.log "This function is called after newline adding"

Author:   lambdalisue (lambdalisue@hashnote.net)
License:  MIT License

Copyright(C) 2012 lambdalisue, hasnote.net allright reserved
*/

var autoIndentable;

autoIndentable = (function() {
  var autoIndent;
  autoIndent = function(e) {
    var cancel, indent, insert, line, _ref, _ref1;
    if (e.which !== 13) {
      return;
    }
    line = this.selection.line();
    cancel = ((_ref = this.autoIndent.pre) != null ? _ref.call(this, e, line) : void 0) === true;
    if (cancel !== true) {
      indent = line.replace(/^([\t\s]*).*$/, "$1");
      insert = "\n" + indent;
      this.selection.insertAfter(insert, false);
    }
    if ((_ref1 = this.autoIndent.post) != null) {
      _ref1.call(this, e, line, indent, insert, cancel);
    }
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.preventDefault();
    this.focus();
    return false;
  };
  return function(textarea, pre, post) {
    if (!(textarea instanceof jQuery)) {
      textarea = $(textarea);
    }
    if (!(textarea.selection != null)) {
      textarea.selection = new Selection(document, textarea.get(0));
    }
    textarea.autoIndent = function(e) {
      return autoIndent.call(textarea, e);
    };
    textarea.autoIndent.enable = function() {
      textarea.on('keydown', textarea.autoIndent);
      return textarea;
    };
    textarea.autoIndent.disable = function() {
      textarea.off('keydown', textarea.autoIndent);
      return textarea;
    };
    if (pre != null) {
      textarea.autoIndent.pre = function(e, line) {
        return pre.call(textarea, e, line);
      };
    }
    if (post != null) {
      textarea.autoIndent.post = function(e, line, indent, insert) {
        return post.call(textarea, e, line, indent, insert);
      };
    }
    return textarea.autoIndent.enable();
  };
})();
