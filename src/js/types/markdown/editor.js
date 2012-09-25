var MarkdownEditor, autoIndentableMarkdown, headerMarkup,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

headerMarkup = (function() {
  var appendAtxHeader, atxHeaderPattern, changeAtxHeader, removeAtxHeader, toggleAtxHeader;
  atxHeaderPattern = new RegExp('^\s*(#{1,6}\s*).*');
  appendAtxHeader = function(segment, n) {
    var header;
    header = "#".repeat(n);
    return "" + header + " " + segment;
  };
  removeAtxHeader = function(segment) {
    return segment.replace(/^(\s*)#{1,6}\s*/g, '$1');
  };
  changeAtxHeader = function(segment, n) {
    var header;
    header = "#".repeat(n);
    return segment.replace(/^(\s*)#{1,6}\s*/g, "$1" + header + " ");
  };
  toggleAtxHeader = function(textarea, n) {
    var caret, caretOffset, exists, replacement, segment, text;
    text = textarea.val();
    caret = textarea.selection.caret();
    segment = textarea.selection.text();
    caretOffset = 0;
    if (atxHeaderPattern.test(segment)) {
      exists = RegExp.$1.trim();
      if (exists.length === n) {
        replacement = removeAtxHeader(segment);
      } else {
        replacement = changeAtxHeader(segment, n);
      }
    } else {
      replacement = appendAtxHeader(segment, n);
      if (caret[0] > 0 && text[caret[0] - 1] !== "\n") {
        replacement = "\n" + replacement;
      }
      if (caret[1] < text.length && text[caret[1]] !== "\n") {
        replacement = "" + replacement + "\n";
        caretOffset = -1;
      }
    }
    textarea.selection.text(replacement);
    if (caretOffset !== 0) {
      return textarea.selection.caretOffset(caretOffset);
    }
  };
  return function(n) {
    this.selectWholeLineIfNoSelectionFound();
    return toggleAtxHeader(this.textarea, n);
  };
})();

autoIndentableMarkdown = (function() {
  var findListInfo, listPattern, orderedListPattern, post, pre, unorderedListPattern;
  listPattern = /^(\s*)((?:(?:\d+\.)|(?:[\*\+\->])))(\s+)/;
  orderedListPattern = /^(\s*)(\d+)(\.\s+)/;
  unorderedListPattern = /^(\s*)([\*\+\->])(\s+)/;
  findListInfo = function(line) {
    var leading, mark, spaces, type;
    if (listPattern.test(line)) {
      leading = RegExp.$1;
      mark = RegExp.$2;
      spaces = RegExp.$3;
      type = mark.endsWith(".") ? 1 : 2;
    } else if (this._listInfo) {
      return this._listInfo;
    } else {
      type = 0;
    }
    return {
      type: type,
      leading: leading,
      mark: mark,
      spaces: spaces
    };
  };
  pre = function(e, line) {
    var lineCaret, listInfo, _ref, _ref1;
    if (e.shiftKey) {
      return;
    }
    listInfo = findListInfo.call(this, line);
    if ((_ref = listInfo.type) === 3 || _ref === 4) {
      return true;
    }
    if ((_ref1 = listInfo.type) === 1 || _ref1 === 2) {
      if (line.replace(listPattern, '').length === 0) {
        this.selection.line(line.replace(listPattern, '$1'));
        this._listInfo = null;
        return true;
      }
      lineCaret = this.selection.lineCaret();
      return this.selection.caret(lineCaret[1]);
    }
  };
  post = function(e, line, indent, insert, cancel) {
    var leading, listInfo, num, _ref, _ref1, _ref2, _ref3;
    insert = null;
    listInfo = findListInfo.call(this, line);
    if (cancel && !e.shiftKey && ((_ref = listInfo.type) === 3 || _ref === 4)) {
      leading = listInfo.mark + listInfo.spaces;
      indent = line.replace(/^([\t\s]*).*$/, "$1");
      indent = " ".repeat(indent.length - leading.length);
      insert = "\n" + indent;
      if (insert != null) {
        this.selection.insertAfter(insert, false);
      }
      cancel = false;
    }
    if (cancel) {
      return;
    }
    if (e.shiftKey) {
      if ((_ref1 = listInfo.type) === 1 || _ref1 === 2) {
        leading = listInfo.mark + listInfo.spaces;
        insert = " ".repeat(leading.length);
        this._listInfo = listInfo;
        this._listInfo.type += 2;
      }
    } else if ((_ref2 = listInfo.type) === 1 || _ref2 === 3) {
      num = parseInt(listInfo.mark.replace(".", ""));
      insert = "" + (num + 1) + "." + listInfo.spaces;
    } else if ((_ref3 = listInfo.type) === 2 || _ref3 === 4) {
      insert = "" + listInfo.mark + listInfo.spaces;
    }
    if (insert != null) {
      return this.selection.insertAfter(insert, false);
    }
  };
  return function(textarea) {
    if (!(textarea.autoIndent != null)) {
      textarea = autoIndentable(textarea);
    }
    textarea.autoIndent.pre = function(e, line) {
      return pre.call(textarea, e, line);
    };
    textarea.autoIndent.post = function(e, line, indent, insert, cancel) {
      return post.call(textarea, e, line, indent, insert, cancel);
    };
    return textarea;
  };
})();

MarkdownEditor = (function(_super) {

  __extends(MarkdownEditor, _super);

  function MarkdownEditor(core) {
    MarkdownEditor.__super__.constructor.call(this, core);
    this.textarea = autoIndentableMarkdown(this.textarea);
  }

  MarkdownEditor.prototype.selectWholeLineIfNoSelectionFound = function() {
    var caret, line, lineCaret;
    caret = this.textarea.selection.caret();
    if (caret[0] === caret[1]) {
      lineCaret = this.textarea.selection.lineCaret();
      line = this.textarea.selection.line();
      if (/^(\s*[\*\+\-]\s*|^\s*\d+\.\s*|^\s*>\s*)/g.test(line)) {
        lineCaret[0] += RegExp.$1.length;
      }
      this.textarea.selection.caret(lineCaret);
    }
  };

  MarkdownEditor.prototype.h1 = function() {
    return headerMarkup.call(this, 1);
  };

  MarkdownEditor.prototype.h2 = function() {
    return headerMarkup.call(this, 2);
  };

  MarkdownEditor.prototype.h3 = function() {
    return headerMarkup.call(this, 3);
  };

  MarkdownEditor.prototype.h4 = function() {
    return headerMarkup.call(this, 4);
  };

  MarkdownEditor.prototype.h5 = function() {
    return headerMarkup.call(this, 5);
  };

  MarkdownEditor.prototype.h6 = function() {
    return headerMarkup.call(this, 6);
  };

  MarkdownEditor.prototype.bold = function() {
    return this.enclose("**", "**");
  };

  MarkdownEditor.prototype.italic = function() {
    return this.enclose("*", "*");
  };

  MarkdownEditor.prototype.blockquote = (function() {
    var match, pattern1, pattern2;
    pattern1 = /^(\s*)>\s*([^\n]*)$/m;
    pattern2 = /^(\s*)([^\n]*)$/m;
    match = function(lines) {
      var line, _i, _len;
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        if (line.length === 0) {
          continue;
        }
        if (!pattern1.test(line)) {
          return false;
        }
      }
      return true;
    };
    return function() {
      var i, line, lines, _i, _j, _ref, _ref1;
      lines = this.selection().split("\n");
      if (match(lines)) {
        for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          line = lines[i];
          lines[i] = line.replace(pattern1, "$1$2");
        }
      } else {
        for (i = _j = 0, _ref1 = lines.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
          line = lines[i];
          lines[i] = line.replace(pattern2, "$1> $2");
        }
      }
      return this.selection(lines.join("\n"));
    };
  })();

  MarkdownEditor.prototype.code = function() {
    var caret, lines, text, x;
    lines = this.selection().split("\n");
    caret = this.textarea.selection.caret();
    if (lines.length > 1) {
      text = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = lines.length; _i < _len; _i++) {
          x = lines[_i];
          _results.push("\t" + x);
        }
        return _results;
      })();
      return this.selection(text.join("\n"));
    } else {
      return this.enclose("`", "`");
    }
  };

  MarkdownEditor.prototype.anchorLink = function() {
    var href, text;
    text = this.selection();
    if (!text) {
      text = window.prompt("Please input a link text", "Here");
    }
    href = window.prompt("Please input a link url", "http://");
    if (!(href != null)) {
      return;
    }
    return this.selection("[" + text + "](" + href + ")");
  };

  MarkdownEditor.prototype.image = function() {
    var alt, src;
    src = window.prompt("Please input a image url", "http://");
    alt = window.prompt("(Optional) Please input a alt message", "Image");
    if (!(src != null)) {
      return;
    }
    return this.selection("![" + alt + "](" + src + ")");
  };

  MarkdownEditor.prototype.unorderedList = (function() {
    var match, pattern1, pattern2;
    pattern1 = /^(\s*)\*\s*([^\n]*)$/m;
    pattern2 = /^(\s*)([^\n]*)$/m;
    match = function(lines) {
      var line, _i, _len;
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        if (line.length === 0) {
          continue;
        }
        if (!pattern1.test(line)) {
          return false;
        }
      }
      return true;
    };
    return function() {
      var i, line, lines, _i, _j, _ref, _ref1;
      lines = this.selection().split("\n");
      if (match(lines)) {
        for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          line = lines[i];
          lines[i] = line.replace(pattern1, "$1$2");
        }
      } else {
        for (i = _j = 0, _ref1 = lines.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
          line = lines[i];
          lines[i] = line.replace(pattern2, "$1* $2");
        }
      }
      return this.selection(lines.join("\n"));
    };
  })();

  MarkdownEditor.prototype.orderedList = (function() {
    var match, pattern1, pattern2;
    pattern1 = /^(\s*)\d+\.\s*([^\n]*)$/m;
    pattern2 = /^(\s*)([^\n]*)$/m;
    match = function(lines) {
      var line, _i, _len;
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        if (line.length === 0) {
          continue;
        }
        if (!pattern1.test(line)) {
          return false;
        }
      }
      return true;
    };
    return function() {
      var i, line, lines, _i, _j, _ref, _ref1;
      lines = this.selection().split("\n");
      if (match(lines)) {
        for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          line = lines[i];
          lines[i] = line.replace(pattern1, "$1$2");
        }
      } else {
        for (i = _j = 0, _ref1 = lines.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
          line = lines[i];
          lines[i] = line.replace(pattern2, "$1" + (i + 1) + ". $2");
        }
      }
      return this.selection(lines.join("\n"));
    };
  })();

  return MarkdownEditor;

})(TextEditor);

namespace('Jencil.types.markdown.editor.MarkdownEditor', function(exports) {
  return exports.MarkdownEditor = MarkdownEditor;
});
