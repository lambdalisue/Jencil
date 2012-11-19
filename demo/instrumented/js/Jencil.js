if (typeof __$coverObject === "undefined"){
	if (typeof window !== "undefined") window.__$coverObject = {};
	else if (typeof global !== "undefined") global.__$coverObject = {};
	else throw new Error("cannot find the global scope");
}
var __$coverInit = function(name, code){
	__$coverObject[name] = {__code: code}
}
var __$coverInitRange = function(name, range){
	__$coverObject[name][range] = 0;
}
var __$coverCall = function(name, range){
	__$coverObject[name][range]++;
}
__$coverInit("js/Jencil.js", "(function() {\n  var ActionButton, AjaxViewer, Bar, BaseEditor, BaseHelper, BaseViewer, Button, Caretaker, CommandButton, DefaultProfile, DimainPanel, Fullscreen, FullscreenButton, HelperButton, HorizontalPanel, HorizontalSplitter, HtmlEditor, HtmlHelper, HtmlProfile, HtmlViewer, MarkdownEditor, MarkdownJsViewer, MarkdownProfile, MonomainPanel, MultiplePanel, NotImplementedError, Originator, Panel, RedoButton, Selection, Separator, Splitter, Statusbar, TemplateHelper, TemplateViewer, TextEditor, Toolbar, TrimainPanel, UndoButton, VerticalPanel, VerticalSplitter, ViewerButton, Widget, Workspace, Wrapper, animate, apply, autoIndentable, autoIndentableHtml, autoIndentableMarkdown, buttonFactory, curtainFactory, evolute, headerMarkup, namespace, strutils, translate,\n    __slice = [].slice,\n    __hasProp = {}.hasOwnProperty,\n    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };\n\n  namespace = function(target, name, block) {\n    var item, top, _i, _len, _ref, _ref1;\n    if (arguments.length < 3) {\n      _ref = [(typeof exports !== 'undefined' ? exports : window)].concat(__slice.call(arguments)), target = _ref[0], name = _ref[1], block = _ref[2];\n    }\n    top = target;\n    _ref1 = name.split('.');\n    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {\n      item = _ref1[_i];\n      target = target[item] || (target[item] = {});\n    }\n    return block(target, top);\n  };\n\n  if (typeof window !== \"undefined\" && window !== null) {\n    window.namespace = namespace;\n  }\n\n  if (typeof exports !== \"undefined\" && exports !== null) {\n    exports.namespace = namespace;\n  }\n\n  strutils = {\n    repeat: function(str, count) {\n      var pattern, result;\n      if (count < 1) {\n        return '';\n      }\n      result = '';\n      pattern = str.valueOf();\n      while (count > 0) {\n        if (count & 1) {\n          result += pattern;\n        }\n        count >>= 1;\n        pattern += pattern;\n      }\n      return result;\n    },\n    startsWith: function(str, prefix) {\n      return str.lastIndexOf(prefix, 0) === 0;\n    },\n    endsWith: function(str, suffix) {\n      var l;\n      l = str.length - suffix.length;\n      return l >= 0 && str.lastIndexOf(suffix, l) === l;\n    },\n    trimLeft: function(str) {\n      return str.replace(/^\\s+/g, '');\n    },\n    trimRight: function(str) {\n      return str.replace(/\\s+$/g, '');\n    },\n    trim: function(str) {\n      return str.replace(/^\\s+|\\s+$/g, '');\n    }\n  };\n\n  apply = function(object, name, fn) {\n    if (!(object.prototype[name] != null)) {\n      return object.prototype[name] = function() {\n        var args;\n        args = [this].concat(Array.prototype.slice.call(arguments));\n        return fn.apply(this, args);\n      };\n    }\n  };\n\n  apply(String, 'repeat', strutils.repeat);\n\n  apply(String, 'startsWith', strutils.startsWith);\n\n  apply(String, 'endsWith', strutils.endsWith);\n\n  apply(String, 'trimLeft', strutils.trimLeft);\n\n  apply(String, 'trimRight', strutils.trimRight);\n\n  apply(String, 'trim', strutils.trim);\n\n  if (typeof exports !== \"undefined\" && exports !== null) {\n    exports.strutils = strutils;\n  }\n\n  NotImplementedError = (function() {\n\n    function NotImplementedError() {}\n\n    NotImplementedError.prototype.name = 'Not implemeted error';\n\n    NotImplementedError.prototype.message = 'The function has not implemented yet';\n\n    return NotImplementedError;\n\n  })();\n\n  Originator = (function() {\n\n    function Originator() {}\n\n    Originator.prototype.createMemento = function() {\n      throw new NotImplementedError;\n    };\n\n    Originator.prototype.setMemento = function(memento) {\n      throw new NotImplementedError;\n    };\n\n    return Originator;\n\n  })();\n\n  Caretaker = (function() {\n\n    function Caretaker(originator) {\n      this._originator = originator;\n      this._undoStack = [];\n      this._redoStack = [];\n    }\n\n    Caretaker.prototype.originator = function(originator) {\n      if (originator != null) {\n        this._originator = originator;\n        return this;\n      }\n      return this._originator;\n    };\n\n    Caretaker.prototype.save = function(memento) {\n      memento = memento || this.originator().createMemento();\n      this._undoStack.push(memento);\n      this._redoStack = [];\n      return this;\n    };\n\n    Caretaker.prototype.undo = function() {\n      var originator;\n      if (!this.canUndo()) {\n        return false;\n      }\n      originator = this.originator();\n      this._redoStack.push(originator.createMemento());\n      originator.setMemento(this._undoStack.pop());\n      if (typeof originator.focus === \"function\") {\n        originator.focus();\n      }\n      return true;\n    };\n\n    Caretaker.prototype.redo = function() {\n      var originator;\n      if (!this.canRedo()) {\n        return false;\n      }\n      originator = this.originator();\n      this._undoStack.push(originator.createMemento());\n      originator.setMemento(this._redoStack.pop());\n      if (typeof originator.focus === \"function\") {\n        originator.focus();\n      }\n      return true;\n    };\n\n    Caretaker.prototype.canUndo = function() {\n      return this._undoStack.length > 0;\n    };\n\n    Caretaker.prototype.canRedo = function() {\n      return this._redoStack.length > 0;\n    };\n\n    return Caretaker;\n\n  })();\n\n  if (typeof exports !== \"undefined\" && exports !== null) {\n    exports.NotImplementedError = NotImplementedError;\n    exports.Originator = Originator;\n    exports.Caretaker = Caretaker;\n  }\n\n  Selection = (function() {\n\n    function Selection(document, element) {\n      this.document = document;\n      this.element = element;\n      if (this.document instanceof jQuery) {\n        this.document = this.document.get(0);\n      }\n      if (this.element instanceof jQuery) {\n        this.element = this.element.get(0);\n      }\n    }\n\n    Selection.prototype._getCaret = function() {\n      var caret, clone, e, range, s;\n      if (this.document.selection != null) {\n        range = this.document.selection.createRange();\n        clone = range.duplicate();\n        clone.moveToElementText(this.element);\n        clone.setEndPoint('EndToEnd', range);\n        s = clone.text.length - range.text.length;\n        e = s + range.text.length;\n      } else if (this.element.setSelectionRange != null) {\n        s = this.element.selectionStart;\n        e = this.element.selectionEnd;\n      }\n      caret = [s, e];\n      return caret;\n    };\n\n    Selection.prototype._setCaret = function(start, end) {\n      var range, scrollTop;\n      scrollTop = this.element.scrollTop;\n      if (this.element.setSelectionRange != null) {\n        this.element.setSelectionRange(start, end);\n      } else if (this.element.createTextRange) {\n        range = this.element.createTextRange();\n        range.collapse(true);\n        range.moveStart('character', start);\n        range.moveEnd('character', end - start);\n        range.select();\n      }\n      this.element.focus();\n      this.element.scrollTop = scrollTop;\n      return this;\n    };\n\n    Selection.prototype.caret = function(start, end) {\n      if ((start != null) && start instanceof Array) {\n        end = start[1];\n        start = start[0];\n      }\n      if ((start != null) && !(end != null)) {\n        end = start;\n      }\n      if ((start != null) && (end != null)) {\n        return this._setCaret(start, end);\n      }\n      return this._getCaret();\n    };\n\n    Selection.prototype.caretOffset = function(offset) {\n      var caret;\n      caret = this.caret();\n      return this.caret(caret[0] + offset);\n    };\n\n    Selection.prototype.replace = function(str, start, end) {\n      var a, b, scrollTop;\n      scrollTop = this.element.scrollTop;\n      b = this.element.value.substring(0, start);\n      a = this.element.value.substring(end);\n      this.element.value = b + str + a;\n      this.element.scrollTop = scrollTop;\n      return this;\n    };\n\n    Selection.prototype._getText = function() {\n      var e, range, s, _ref;\n      if (this.document.selection != null) {\n        range = this.document.selection.createRange();\n        return range.text;\n      } else if (this.element.setSelectionRange) {\n        _ref = this.caret(), s = _ref[0], e = _ref[1];\n        return this.element.value.substring(s, e);\n      }\n      return null;\n    };\n\n    Selection.prototype._setText = function(str, keepSelection) {\n      var e, s, scrollTop, _ref;\n      scrollTop = this.element.scrollTop;\n      _ref = this.caret(), s = _ref[0], e = _ref[1];\n      this.replace(str, s, e);\n      e = s + str.length;\n      if (!keepSelection) {\n        s = e;\n      }\n      this.caret(s, e);\n      this.element.focus();\n      this.element.scrollTop = scrollTop;\n      return this;\n    };\n\n    Selection.prototype.text = function(str, keepSelection) {\n      if (str != null) {\n        return this._setText(str, keepSelection);\n      }\n      return this._getText();\n    };\n\n    Selection.prototype.insertBefore = function(str, keepSelection) {\n      var e, s, scrollTop, text, _ref;\n      scrollTop = this.element.scrollTop;\n      _ref = this.caret(), s = _ref[0], e = _ref[1];\n      text = this.text();\n      this.replace(str + text, s, e);\n      e = s + str.length;\n      if (!keepSelection) {\n        s = e;\n      }\n      this.caret(s, e);\n      this.element.focus();\n      this.element.scrollTop = scrollTop;\n      return this;\n    };\n\n    Selection.prototype.insertAfter = function(str, keepSelection) {\n      var e, s, scrollTop, text, _ref;\n      scrollTop = this.element.scrollTop;\n      _ref = this.caret(), s = _ref[0], e = _ref[1];\n      text = this.text();\n      this.replace(text + str, s, e);\n      s = e;\n      e = e + str.length;\n      if (!keepSelection) {\n        s = e;\n      }\n      this.caret(s, e);\n      this.element.focus();\n      this.element.scrollTop = scrollTop;\n      return this;\n    };\n\n    Selection.prototype.enclose = function(lhs, rhs, keepSelection) {\n      var e, s, scrollTop, str, text, _ref;\n      scrollTop = this.element.scrollTop;\n      text = this.text();\n      if (text.indexOf(lhs) === 0 && text.lastIndexOf(rhs) === (text.length - rhs.length)) {\n        str = text.substring(lhs.length, text.length - rhs.length);\n        this.text(str, keepSelection);\n      } else {\n        _ref = this.caret(), s = _ref[0], e = _ref[1];\n        this.replace(lhs + text + rhs, s, e);\n        e = s + lhs.length + text.length + rhs.length;\n        if (!keepSelection) {\n          s = e;\n        }\n        this.caret(s, e);\n      }\n      this.element.focus();\n      this.element.scrollTop = scrollTop;\n      return this;\n    };\n\n    Selection.prototype.lineCaret = function(pos) {\n      var e, s, value;\n      pos = pos || this.caret()[0];\n      value = this.element.value;\n      s = value.lastIndexOf(\"\\n\", pos - 1) + 1;\n      e = value.indexOf(\"\\n\", pos);\n      if (e === -1) {\n        e = value.length;\n      }\n      return [s, e];\n    };\n\n    Selection.prototype._getLine = function(pos) {\n      var e, s, _ref;\n      _ref = this.lineCaret(pos), s = _ref[0], e = _ref[1];\n      return this.element.value.substring(s, e);\n    };\n\n    Selection.prototype._setLine = function(line, keepSelection) {\n      var e, s, scrollTop, _ref;\n      scrollTop = this.element.scrollTop;\n      _ref = this.lineCaret(), s = _ref[0], e = _ref[1];\n      this.replace(line, s, e);\n      e = s + line.length;\n      if (!keepSelection) {\n        s = e;\n      }\n      this.caret(s, e);\n      this.element.focus();\n      this.element.scrollTop = scrollTop;\n      return this;\n    };\n\n    Selection.prototype.line = function(value, keepSelection) {\n      if (value != null) {\n        return this._setLine(value, keepSelection);\n      }\n      return this._getLine();\n    };\n\n    Selection.prototype.selectWholeLine = function(pos) {\n      var e, s, _ref;\n      _ref = this.lineCaret(pos), s = _ref[0], e = _ref[1];\n      return this.caret(s, e);\n    };\n\n    Selection.prototype.selectWholeCurrentLine = function() {\n      return this.selectWholeLine(null);\n    };\n\n    return Selection;\n\n  })();\n\n  /*\n  Evolution\n  \n  Extend jQueryObj\n  \n  Author: lambdalisue\n  License: MIT License\n  */\n\n\n  evolute = (function() {\n    var absoluteX, absoluteY, contentX, contentY, maxHeight, maxWidth, minHeight, minWidth, ncss, nonContentHeight, nonContentWidth, outerHeight, outerWidth, relativeX, relativeY;\n    nonContentWidth = function(includeMargin) {\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      return this.outerWidth(includeMargin) - this.width();\n    };\n    nonContentHeight = function(includeMargin) {\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      return this.outerHeight(includeMargin) - this.height();\n    };\n    outerWidth = function(includeMargin, value) {\n      var offset;\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      if (typeof includeMargin === 'number') {\n        value = includeMargin;\n        includeMargin = false;\n      }\n      if (value != null) {\n        offset = this.nonContentWidth(includeMargin);\n        return this.width(value - offset);\n      }\n      return this._outerWidth(includeMargin);\n    };\n    outerHeight = function(includeMargin, value) {\n      var offset;\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      if (typeof includeMargin === 'number') {\n        value = includeMargin;\n        includeMargin = false;\n      }\n      if (value != null) {\n        offset = this.nonContentHeight(includeMargin);\n        return this.height(value - offset);\n      }\n      return this._outerHeight(includeMargin);\n    };\n    ncss = function(propertyName, defaultValue) {\n      var value;\n      if (defaultValue == null) {\n        defaultValue = null;\n      }\n      value = this.css(propertyName);\n      if (value === '' || value === 'none' || value === null || value === (void 0) || value === NaN) {\n        return defaultValue;\n      }\n      value = parseInt(value, 10);\n      return value;\n    };\n    minWidth = function() {\n      return this.ncss('min-width');\n    };\n    minHeight = function() {\n      return this.ncss('min-height');\n    };\n    maxWidth = function() {\n      return this.ncss('max-width');\n    };\n    maxHeight = function() {\n      return this.ncss('max-height');\n    };\n    contentX = function(includeMargin) {\n      var borderLeft, marginLeft, paddingLeft;\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      marginLeft = includeMargin ? this.ncss('margin-left') : 0;\n      borderLeft = this.ncss('border-left-width');\n      paddingLeft = this.ncss('padding-left');\n      return marginLeft + borderLeft + paddingLeft;\n    };\n    contentY = function(includeMargin) {\n      var borderTop, marginTop, paddingTop;\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      marginTop = includeMargin ? this.ncss('margin-top') : 0;\n      borderTop = this.ncss('border-top-width');\n      paddingTop = this.ncss('padding-top');\n      return marginTop + borderTop + paddingTop;\n    };\n    absoluteX = function(value) {\n      var offset;\n      offset = this.offset();\n      if (value != null) {\n        offset.left = value;\n        return this.offset(offset);\n      }\n      return offset.left;\n    };\n    absoluteY = function(value) {\n      var offset;\n      offset = this.offset();\n      if (value != null) {\n        offset.top = value;\n        return this.offset(offset);\n      }\n      return offset.top;\n    };\n    relativeX = function(includeMargin, value) {\n      var offset, parent;\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      if (typeof includeMargin === 'number') {\n        value = includeMargin;\n        includeMargin = false;\n      }\n      parent = evolute(this.parent());\n      offset = parent.absoluteX() + parent.contentX(includeMargin);\n      if (value != null) {\n        return this.absoluteX(value + offset);\n      }\n      return this.absoluteX() - offset;\n    };\n    relativeY = function(includeMargin, value) {\n      var offset, parent;\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      if (typeof includeMargin === 'number') {\n        value = includeMargin;\n        includeMargin = false;\n      }\n      parent = evolute(this.parent());\n      offset = parent.absoluteY() + parent.contentY(includeMargin);\n      if (value != null) {\n        return this.absoluteY(value + offset);\n      }\n      return this.absoluteY() - offset;\n    };\n    evolute = function(jQueryObj) {\n      if (jQueryObj.__evoluted__ === true) {\n        return jQueryObj;\n      }\n      jQueryObj._outerWidth = jQueryObj.outerWidth;\n      jQueryObj._outerHeight = jQueryObj.outerHeight;\n      jQueryObj.nonContentWidth = nonContentWidth;\n      jQueryObj.nonContentHeight = nonContentHeight;\n      jQueryObj.outerWidth = outerWidth;\n      jQueryObj.outerHeight = outerHeight;\n      jQueryObj.nonContentWidth = nonContentWidth;\n      jQueryObj.nonContentHeight = nonContentHeight;\n      jQueryObj.ncss = ncss;\n      jQueryObj.minWidth = minWidth;\n      jQueryObj.minHeight = minHeight;\n      jQueryObj.maxWidth = maxWidth;\n      jQueryObj.maxHeight = maxHeight;\n      jQueryObj.contentX = contentX;\n      jQueryObj.contentY = contentY;\n      jQueryObj.absoluteX = absoluteX;\n      jQueryObj.absoluteY = absoluteY;\n      jQueryObj.relativeX = relativeX;\n      jQueryObj.relativeY = relativeY;\n      jQueryObj.__evoluted__ = true;\n      return jQueryObj;\n    };\n    return evolute;\n  })();\n\n  curtainFactory = function(element) {\n    var curtain;\n    element.css('position', 'relative');\n    curtain = $('<div>').appendTo(element).hide().css({\n      'position': 'absolute',\n      'top': '0',\n      'left': '0',\n      'overflow': 'hidden',\n      'z-index': 99999\n    });\n    curtain.on = function() {\n      curtain.refresh();\n      curtain.show();\n      return this;\n    };\n    curtain.refresh = function() {\n      curtain.width(element.outerWidth(true));\n      curtain.height(element.outerHeight(true));\n      return this;\n    };\n    curtain.off = function() {\n      curtain.hide();\n      return this;\n    };\n    return curtain;\n  };\n\n  /*\n  animation\n  \n  Animate value via easing function\n  \n  The following library is required to use this library\n  \n  - jQuery\n  \n  Author:   lambdalisue (lambdalisue@hashnote.net)\n  License:  MIT License\n  \n  Copyright(C) 2012 lambdalisue, hasnote.net allright reserved\n  */\n\n\n  animate = (function() {\n    var defaultOptions, now;\n    now = function() {\n      return (new Date()).getTime();\n    };\n    defaultOptions = {\n      start: 0,\n      end: 100,\n      duration: 1000,\n      callbackEach: null,\n      callbackDone: null,\n      easing: jQuery.easing.swing\n    };\n    return function(options) {\n      var difference, startTime, step;\n      options = jQuery.extend(defaultOptions, options);\n      startTime = now();\n      difference = options.end - options.start;\n      step = function() {\n        var epoch, x;\n        epoch = now() - startTime;\n        x = options.easing(epoch / options.duration, epoch, 0, 1, options.duration);\n        x = x * difference + options.start;\n        options.callbackEach(x, epoch);\n        if (epoch < options.duration) {\n          return setTimeout(step, 1);\n        } else {\n          options.callbackEach(options.end, options.duration);\n          return typeof options.callbackDone === \"function\" ? options.callbackDone() : void 0;\n        }\n      };\n      step();\n      return null;\n    };\n  })();\n\n  /*\n  autoindent\n  \n  Enable auto indentation feature in textarea\n  It is suitable with jquery.tabby.js which enable tab indentation in textarea\n  \n  The following library is required to use this library\n  \n  - jQuery\n  - selection\n  \n  Note:\n    You should use this library as CoffeeScript that's why I didn't\n    add `autoIndentable` in window namespace\n  \n  Usage:\n  \n    textarea = $('textarea')\n    textarea = autoIndentable(textarea)\n  \n    # auto indent feature is enable at default.\n    # you can disable it with\n    textarea.autoIndent.disable()\n  \n    # and enable again with\n    textarea.autoIndent.enable()\n  \n    # and also, you can add some pre/post callback\n    # which is called pre/post step of adding newline\n    # and white spaces with\n    textarea.autoIndent.pre = (e, line) ->\n      # e = Event object of jQuery\n      # line = current line of caret exists\n      console.log \"This function is called before newline adding\"\n    textarea.autoIndent.post = (e, line, indent, insert) ->\n      # e = Event object of jQuery\n      # line = current line of caret exists\n      # indent = leading white spaces of current line\n      # insert = newline and indent which is added after the caret\n      console.log \"This function is called after newline adding\"\n  \n  Author:   lambdalisue (lambdalisue@hashnote.net)\n  License:  MIT License\n  \n  Copyright(C) 2012 lambdalisue, hasnote.net allright reserved\n  */\n\n\n  autoIndentable = (function() {\n    var autoIndent;\n    autoIndent = function(e) {\n      var cancel, indent, insert, line, _ref, _ref1;\n      if (e.which !== 13) {\n        return;\n      }\n      line = this.selection.line();\n      cancel = ((_ref = this.autoIndent.pre) != null ? _ref.call(this, e, line) : void 0) === true;\n      if (cancel !== true) {\n        indent = line.replace(/^([\\t\\s]*).*$/, \"$1\");\n        insert = \"\\n\" + indent;\n        this.selection.insertAfter(insert, false);\n      }\n      if ((_ref1 = this.autoIndent.post) != null) {\n        _ref1.call(this, e, line, indent, insert, cancel);\n      }\n      e.stopPropagation();\n      e.stopImmediatePropagation();\n      e.preventDefault();\n      this.focus();\n      return false;\n    };\n    return function(textarea, pre, post) {\n      if (!(textarea instanceof jQuery)) {\n        textarea = $(textarea);\n      }\n      if (!(textarea.selection != null)) {\n        textarea.selection = new Selection(document, textarea.get(0));\n      }\n      textarea.autoIndent = function(e) {\n        return autoIndent.call(textarea, e);\n      };\n      textarea.autoIndent.enable = function() {\n        textarea.on('keydown', textarea.autoIndent);\n        return textarea;\n      };\n      textarea.autoIndent.disable = function() {\n        textarea.off('keydown', textarea.autoIndent);\n        return textarea;\n      };\n      if (pre != null) {\n        textarea.autoIndent.pre = function(e, line) {\n          return pre.call(textarea, e, line);\n        };\n      }\n      if (post != null) {\n        textarea.autoIndent.post = function(e, line, indent, insert) {\n          return post.call(textarea, e, line, indent, insert);\n        };\n      }\n      return textarea.autoIndent.enable();\n    };\n  })();\n\n  if (window.i18n != null) {\n    translate = function(key) {\n      return i18n.t(key, {\n        defaultValue: key\n      });\n    };\n  } else {\n    translate = function(key) {\n      return key;\n    };\n  }\n\n  DefaultProfile = {\n    mainPanelClass: null,\n    editorClass: null,\n    viewerClass: null,\n    helperClass: null,\n    toolbarButtons: [],\n    statusbarButtons: [],\n    defaultVolume: null,\n    defaultVolume2: null\n  };\n\n  this.Jencil = (function() {\n\n    function Jencil(textarea, options) {\n      var DefaultOptions,\n        _this = this;\n      DefaultOptions = {\n        profile: 'Html',\n        profiles: {\n          Html: HtmlProfile,\n          Markdown: MarkdownProfile\n        },\n        resizable: true,\n        enableTabIndent: true,\n        enableAutoIndent: true,\n        tabString: '\\t',\n        defaultVolume: null,\n        defaultVolume2: null,\n        width: 640,\n        height: 620,\n        editorTemplatePath: null,\n        viewerTemplatePath: null,\n        helperTemplatePath: null\n      };\n      this.options = jQuery.extend(DefaultOptions, options);\n      this.element = textarea.hide();\n      this.caretaker = new Caretaker();\n      this.caretaker.originator = function() {\n        return _this.editor();\n      };\n      this.wrapper = new Wrapper(this, this.options.width, this.options.height);\n      this.fullscreen = new Fullscreen(this);\n      this.element.after(this.wrapper.element).after(this.fullscreen.element);\n      this.wrapper.init();\n      this.wrapper.adjust();\n      this.caretaker.save();\n    }\n\n    Jencil.prototype.editor = function() {\n      return this.wrapper.workspace.mainPanel.editorPanel || null;\n    };\n\n    Jencil.prototype.viewer = function() {\n      return this.wrapper.workspace.mainPanel.viewerPanel || null;\n    };\n\n    Jencil.prototype.helper = function() {\n      return this.wrapper.workspace.mainPanel.helperPanel || null;\n    };\n\n    return Jencil;\n\n  })();\n\n  $.fn.jencil = function(options) {\n    return new Jencil($(this), options);\n  };\n\n  namespace('Jencil.profiles', function(exports) {\n    return exports.DefaultProfile = DefaultProfile;\n  });\n\n  namespace('Jencil.utils.namespace', function(exports) {\n    return exports.namespace = namespace;\n  });\n\n  namespace('Jencil.utils.strutils', function(exports) {\n    return exports.strutils = strutils;\n  });\n\n  namespace('Jencil.utils.evolution', function(exports) {\n    return exports.evolute = evolute;\n  });\n\n  namespace('Jencil.utils.selection', function(exports) {\n    return exports.Selection = Selection;\n  });\n\n  namespace('Jencil.utils.animation', function(exports) {\n    return exports.animate = animate;\n  });\n\n  namespace('Jencil.utils.autoindent', function(exports) {\n    return exports.autoIndentable = autoIndentable;\n  });\n\n  namespace('Jencil.utils.curtain', function(exports) {\n    return exports.curtainFactory = curtainFactory;\n  });\n\n  namespace('Jencil.utils.i18n', function(exports) {\n    return exports.translate = translate;\n  });\n\n  namespace('Jencil.utils.undo', function(exports) {\n    exports.NotImplementedError = NotImplementedError;\n    exports.Originator = Originator;\n    return exports.Caretaker = Caretaker;\n  });\n\n  namespace('Jencil', function(exports) {\n    return exports.t = translate;\n  });\n\n  Widget = (function() {\n\n    function Widget(core, selector, context) {\n      this.core = core;\n      if (selector == null) {\n        selector = '<div>';\n      }\n      if (selector instanceof jQuery) {\n        this.element = selector;\n      } else {\n        this.element = $(selector, context);\n      }\n      this.element = evolute(this.element);\n    }\n\n    Widget.prototype.init = function() {\n      return this;\n    };\n\n    Widget.prototype.adjust = function() {\n      return this;\n    };\n\n    return Widget;\n\n  })();\n\n  Panel = (function(_super) {\n\n    __extends(Panel, _super);\n\n    function Panel(core, selector, context) {\n      if (selector == null) {\n        selector = '<div>';\n      }\n      Panel.__super__.constructor.call(this, core, selector, context);\n      this.element.addClass('panel');\n    }\n\n    return Panel;\n\n  })(Widget);\n\n  MultiplePanel = (function(_super) {\n\n    __extends(MultiplePanel, _super);\n\n    function MultiplePanel(core, fst, snd, splitter) {\n      var hide, show,\n        _this = this;\n      this.fst = fst;\n      this.snd = snd;\n      this.splitter = splitter;\n      MultiplePanel.__super__.constructor.call(this, core);\n      this.element.addClass('multiple');\n      this.element.append(this.fst.element);\n      this.element.append(this.splitter.element);\n      this.element.append(this.snd.element);\n      show = function(callback) {\n        if (!this.element.is(':visible')) {\n          return this.toggle(callback, null);\n        }\n      };\n      hide = function(callback) {\n        if (this.element.is(':visible')) {\n          return this.toggle(null, callback);\n        }\n      };\n      this.fst.toggle = function(callbackOn, callbackOff) {\n        return _this._togglePanel(0, callbackOn, callbackOff);\n      };\n      this.fst.show = show;\n      this.fst.hide = hide;\n      this.snd.toggle = function(callbackOn, callbackOff) {\n        return _this._togglePanel(1, callbackOn, callbackOff);\n      };\n      this.snd.show = show;\n      this.snd.hide = hide;\n      this.splitter.element.dblclick(function() {\n        return _this.snd.toggle();\n      });\n    }\n\n    MultiplePanel.prototype.init = function() {\n      this.splitter.init();\n      this.fst.init();\n      return this.snd.init();\n    };\n\n    MultiplePanel.prototype._togglePanel = function(to, callbackOn, callbackOff) {\n      var callbackDone, end, volume, _callbackDone,\n        _this = this;\n      if (MultiplePanel._animating) {\n        return;\n      }\n      volume = this.splitter.volume();\n      callbackDone = null;\n      if ((0 < volume && volume < 1)) {\n        end = to;\n        this.splitter._previousVolume = volume;\n        _callbackDone = callbackOff;\n      } else {\n        end = this.splitter._previousVolume || this.splitter.defaultVolume;\n        if (end === to) {\n          end = 0.5;\n        }\n        _callbackDone = callbackOn;\n      }\n      MultiplePanel._animating = true;\n      callbackDone = function() {\n        MultiplePanel._animating = false;\n        return typeof _callbackDone === \"function\" ? _callbackDone() : void 0;\n      };\n      return animate({\n        start: volume,\n        end: end,\n        duration: 500,\n        callbackEach: function(value, epoch) {\n          return _this.splitter.volume(value);\n        },\n        callbackDone: callbackDone\n      });\n    };\n\n    return MultiplePanel;\n\n  })(Panel);\n\n  VerticalPanel = (function(_super) {\n\n    __extends(VerticalPanel, _super);\n\n    function VerticalPanel(core, fst, snd, defaultVolume) {\n      var splitter;\n      if (defaultVolume == null) {\n        defaultVolume = 0.5;\n      }\n      splitter = new VerticalSplitter(core, fst, snd, defaultVolume);\n      VerticalPanel.__super__.constructor.call(this, core, fst, snd, splitter);\n      this.element.addClass('vertical');\n    }\n\n    VerticalPanel.prototype.adjust = function() {\n      this.fst.element.outerHeight(true, this.element.height());\n      this.snd.element.outerHeight(true, this.element.height());\n      this.splitter.element.outerHeight(true, this.element.height());\n      this.splitter.adjust();\n      return this;\n    };\n\n    return VerticalPanel;\n\n  })(MultiplePanel);\n\n  HorizontalPanel = (function(_super) {\n\n    __extends(HorizontalPanel, _super);\n\n    function HorizontalPanel(core, fst, snd, defaultVolume) {\n      var splitter;\n      if (defaultVolume == null) {\n        defaultVolume = 0.5;\n      }\n      splitter = new HorizontalSplitter(core, fst, snd, defaultVolume);\n      HorizontalPanel.__super__.constructor.call(this, core, fst, snd, splitter);\n      this.element.addClass('horizontal');\n    }\n\n    HorizontalPanel.prototype.adjust = function() {\n      this.fst.element.outerWidth(true, this.element.width());\n      this.snd.element.outerWidth(true, this.element.width());\n      this.splitter.element.outerWidth(true, this.element.width());\n      this.splitter.adjust();\n      return this;\n    };\n\n    return HorizontalPanel;\n\n  })(MultiplePanel);\n\n  namespace('Jencil.widgets', function(exports) {\n    exports.Widget = Widget;\n    exports.Panel = Panel;\n    exports.MultiplePanel = MultiplePanel;\n    exports.VerticalPanel = VerticalPanel;\n    return exports.HorizontalPanel = HorizontalPanel;\n  });\n\n  Splitter = (function(_super) {\n\n    __extends(Splitter, _super);\n\n    function Splitter(core, fst, snd, defaultVolume) {\n      var mousemove, mouseup,\n        _this = this;\n      this.fst = fst;\n      this.snd = snd;\n      this.defaultVolume = defaultVolume != null ? defaultVolume : 0.5;\n      Splitter.__super__.constructor.call(this, core);\n      this.element.addClass('splitter');\n      this._volume = this.defaultVolume;\n      mousemove = function(e) {\n        var _ref, _ref1;\n        _this.mousemove(e);\n        if ((_ref = _this.fst.curtain) != null) {\n          _ref.refresh();\n        }\n        if ((_ref1 = _this.snd.curtain) != null) {\n          _ref1.refresh();\n        }\n        e.stopPropagation();\n        e.stopImmediatePropagation();\n        return e.preventDefault();\n      };\n      mouseup = function(e) {\n        var $window, _ref, _ref1;\n        $window = $(window);\n        $window.unbind('mousemove', mousemove);\n        $window.unbind('mouseup', mouseup);\n        if ((_ref = _this.fst.curtain) != null) {\n          _ref.off();\n        }\n        if ((_ref1 = _this.snd.curtain) != null) {\n          _ref1.off();\n        }\n        e.stopPropagation();\n        e.stopImmediatePropagation();\n        return e.preventDefault();\n      };\n      this.element.mousedown(function(e) {\n        var $window, _ref, _ref1;\n        $window = $(window);\n        $window.mousemove(mousemove);\n        $window.mouseup(mouseup);\n        if ((_ref = _this.fst.curtain) != null) {\n          _ref.on();\n        }\n        if ((_ref1 = _this.snd.curtain) != null) {\n          _ref1.on();\n        }\n        e.stopPropagation();\n        e.stopImmediatePropagation();\n        return e.preventDefault();\n      });\n    }\n\n    Splitter.prototype.init = function() {\n      this.container = evolute(this.element.parent());\n      return this;\n    };\n\n    Splitter.prototype.volume = function(value, skip) {\n      if (skip == null) {\n        skip = false;\n      }\n      if (value != null) {\n        this._volume = value;\n        if (!skip) {\n          this.adjust();\n        }\n        return this;\n      }\n      return this._volume;\n    };\n\n    Splitter.prototype.value = function(value, skip) {\n      var valueWidth, volume;\n      if (skip == null) {\n        skip = false;\n      }\n      valueWidth = this.valueWidth();\n      if (value != null) {\n        volume = value / valueWidth;\n        return this.volume(volume, skip);\n      }\n      return this.volume() * valueWidth;\n    };\n\n    Splitter.prototype.regulateValue = function(value) {\n      var maxValue, minValue;\n      minValue = this.minValue();\n      maxValue = this.maxValue();\n      if (value < minValue) {\n        value = minValue;\n      }\n      if (value > maxValue) {\n        value = maxValue;\n      }\n      return value;\n    };\n\n    return Splitter;\n\n  })(Widget);\n\n  VerticalSplitter = (function(_super) {\n\n    __extends(VerticalSplitter, _super);\n\n    function VerticalSplitter(core, fst, snd, defaultVolume) {\n      var _ref, _ref1;\n      VerticalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);\n      this.element.addClass('vertical');\n      this.fst.element.addClass('left');\n      this.snd.element.addClass('right');\n      this.fst.element.css({\n        'float': 'left'\n      });\n      this.snd.element.css({\n        'float': 'left'\n      });\n      if ((_ref = this.fst.curtain) != null) {\n        _ref.css('pointer', 'col-resize');\n      }\n      if ((_ref1 = this.snd.curtain) != null) {\n        _ref1.css('pointer', 'col-resize');\n      }\n    }\n\n    VerticalSplitter.prototype.mousemove = function(e) {\n      var offset, value;\n      offset = this.container.absoluteX() + this.container.contentX(true);\n      value = e.pageX - offset;\n      value = this.regulateValue(value);\n      return this.value(value);\n    };\n\n    VerticalSplitter.prototype.valueWidth = function() {\n      return this.container.width();\n    };\n\n    VerticalSplitter.prototype.minValue = function() {\n      var m1, m2;\n      m1 = this.fst.element.minWidth() + this.fst.element.nonContentWidth();\n      m2 = this.snd.element.maxWidth();\n      if (m2 != null) {\n        m2 = this.valueWidth() - (m2 + this.snd.element.nonContentWidth());\n      }\n      if ((m1 != null) && (m2 != null)) {\n        return Math.max(m1, m2);\n      }\n      return m1 || m2 || 0;\n    };\n\n    VerticalSplitter.prototype.maxValue = function() {\n      var m1, m2, valueWidth;\n      valueWidth = this.valueWidth();\n      m1 = this.fst.element.maxWidth();\n      if (m1 != null) {\n        m1 = m1 + this.fst.element.nonContentWidth();\n      }\n      m2 = this.snd.element.minWidth() + this.snd.element.nonContentWidth();\n      if (m2 != null) {\n        m2 = valueWidth - m2;\n      }\n      if ((m1 != null) && (m2 != null)) {\n        return Math.min(m1, m2);\n      }\n      return m1 || m2 || valueWidth;\n    };\n\n    VerticalSplitter.prototype.adjust = function() {\n      var fstValue, sndValue, value, valueWidth;\n      value = this.value();\n      valueWidth = this.valueWidth();\n      fstValue = value - this.fst.element.nonContentWidth(true);\n      sndValue = (valueWidth - value) - this.snd.element.nonContentWidth(true);\n      if (fstValue <= 0) {\n        if (this.fst.element.is(':visible')) {\n          this.fst.element.hide();\n        }\n        if (!this.snd.element.is(':visible')) {\n          this.snd.element.show();\n        }\n        this.snd.element.outerWidth(true, valueWidth);\n        this._value = value = 0;\n      } else if (sndValue <= 0) {\n        if (!this.fst.element.is(':visible')) {\n          this.fst.element.show();\n        }\n        if (this.snd.element.is(':visible')) {\n          this.snd.element.hide();\n        }\n        this.fst.element.outerWidth(true, valueWidth);\n        this._value = value = valueWidth;\n      } else {\n        if (!this.fst.element.is(':visible')) {\n          this.fst.element.show();\n        }\n        if (!this.snd.element.is(':visible')) {\n          this.snd.element.show();\n        }\n        this.fst.element.width(fstValue);\n        this.snd.element.width(sndValue);\n      }\n      this.fst.adjust();\n      this.snd.adjust();\n      this.element.relativeX(value - this.element.outerWidth() / 2);\n      return this;\n    };\n\n    return VerticalSplitter;\n\n  })(Splitter);\n\n  HorizontalSplitter = (function(_super) {\n\n    __extends(HorizontalSplitter, _super);\n\n    function HorizontalSplitter(core, fst, snd, defaultVolume) {\n      var _ref, _ref1;\n      HorizontalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);\n      this.element.addClass('horizontal');\n      this.fst.element.addClass('top');\n      this.snd.element.addClass('bottom');\n      if ((_ref = this.fst.curtain) != null) {\n        _ref.css('pointer', 'raw-resize');\n      }\n      if ((_ref1 = this.snd.curtain) != null) {\n        _ref1.css('pointer', 'raw-resize');\n      }\n    }\n\n    HorizontalSplitter.prototype.mousemove = function(e) {\n      var offset, value;\n      offset = this.container.absoluteY() + this.container.contentY(true);\n      value = e.pageY - offset;\n      value = this.regulateValue(value);\n      return this.value(value);\n    };\n\n    HorizontalSplitter.prototype.valueWidth = function() {\n      return this.container.height();\n    };\n\n    HorizontalSplitter.prototype.minValue = function() {\n      var m1, m2;\n      m1 = this.fst.element.minHeight() + this.fst.element.nonContentHeight();\n      m2 = this.snd.element.maxHeight();\n      if (m2 != null) {\n        m2 = this.valueWidth() - (m2 + this.snd.element.nonContentHeight());\n      }\n      if ((m1 != null) && (m2 != null)) {\n        return Math.max(m1, m2);\n      }\n      return m1 || m2 || 0;\n    };\n\n    HorizontalSplitter.prototype.maxValue = function() {\n      var m1, m2, valueWidth;\n      valueWidth = this.valueWidth();\n      m1 = this.fst.element.maxHeight();\n      if (m1 != null) {\n        m1 = m1 + this.fst.element.nonContentHeight();\n      }\n      m2 = this.snd.element.minHeight() + this.snd.element.nonContentHeight();\n      if (m2 != null) {\n        m2 = valueWidth - m2;\n      }\n      if ((m1 != null) && (m2 != null)) {\n        return Math.min(m1, m2);\n      }\n      return m1 || m2 || valueWidth;\n    };\n\n    HorizontalSplitter.prototype.adjust = function() {\n      var fstValue, sndValue, value, valueWidth;\n      value = this.value();\n      valueWidth = this.valueWidth();\n      fstValue = value - this.fst.element.nonContentHeight(true);\n      sndValue = (valueWidth - value) - this.snd.element.nonContentHeight(true);\n      if (fstValue <= 0) {\n        if (this.fst.element.is(':visible')) {\n          this.fst.element.hide();\n        }\n        if (!this.snd.element.is(':visible')) {\n          this.snd.element.show();\n        }\n        this.snd.element.outerHeight(true, valueWidth);\n        this._value = value = 0;\n      } else if (sndValue <= 0) {\n        if (!this.fst.element.is(':visible')) {\n          this.fst.element.show();\n        }\n        if (this.snd.element.is(':visible')) {\n          this.snd.element.hide();\n        }\n        this.fst.element.outerHeight(true, valueWidth);\n        this._value = value = valueWidth;\n      } else {\n        if (!this.fst.element.is(':visible')) {\n          this.fst.element.show();\n        }\n        if (!this.snd.element.is(':visible')) {\n          this.snd.element.show();\n        }\n        this.fst.element.height(fstValue);\n        this.snd.element.height(sndValue);\n      }\n      this.fst.adjust();\n      this.snd.adjust();\n      this.element.relativeY(value - this.element.outerHeight() / 2);\n      return this;\n    };\n\n    return HorizontalSplitter;\n\n  })(Splitter);\n\n  namespace('Jencil.splitters', function(exports) {\n    exports.Splitter = Splitter;\n    exports.VerticalSplitter = VerticalSplitter;\n    return exports.HorizontalSplitter = HorizontalSplitter;\n  });\n\n  BaseEditor = (function(_super) {\n\n    __extends(BaseEditor, _super);\n\n    function BaseEditor(core, selector, context) {\n      if (selector == null) {\n        selector = '<div>';\n      }\n      BaseEditor.__super__.constructor.call(this, core, selector, context);\n      this.element.addClass('editor');\n      this._changeCallbacks = [];\n    }\n\n    BaseEditor.prototype.val = function(value) {\n      throw new Error(\"NotImplementedError\");\n    };\n\n    BaseEditor.prototype.change = function(callback) {\n      var _i, _len, _ref;\n      if (callback != null) {\n        this._changeCallbacks.push(callback);\n        return this;\n      }\n      _ref = this._changeCallbacks;\n      for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n        callback = _ref[_i];\n        callback.call(this, this.val());\n      }\n      return this;\n    };\n\n    BaseEditor.prototype.h1 = null;\n\n    BaseEditor.prototype.h2 = null;\n\n    BaseEditor.prototype.h3 = null;\n\n    BaseEditor.prototype.h4 = null;\n\n    BaseEditor.prototype.h5 = null;\n\n    BaseEditor.prototype.h6 = null;\n\n    BaseEditor.prototype.bold = null;\n\n    BaseEditor.prototype.italic = null;\n\n    BaseEditor.prototype.underline = null;\n\n    BaseEditor.prototype.strike = null;\n\n    BaseEditor.prototype.superscript = null;\n\n    BaseEditor.prototype.subscript = null;\n\n    BaseEditor.prototype.anchor = null;\n\n    BaseEditor.prototype.image = null;\n\n    BaseEditor.prototype.unorderedList = null;\n\n    BaseEditor.prototype.orderedList = null;\n\n    return BaseEditor;\n\n  })(Panel);\n\n  TextEditor = (function(_super) {\n\n    __extends(TextEditor, _super);\n\n    function TextEditor(core, selector, context) {\n      var _this = this;\n      if (selector == null) {\n        selector = '<div>';\n      }\n      TextEditor.__super__.constructor.call(this, core, selector, context);\n      this.textarea = $('<textarea>').appendTo(this.element).css({\n        'margin': '0',\n        'padding': '0',\n        'border': 'none',\n        'outline': 'none',\n        'resize': 'none'\n      });\n      this.textarea = evolute(this.textarea);\n      this.textarea.on('keydown', function(e) {\n        if (e.which !== 13) {\n          return;\n        }\n        return _this.core.caretaker.save();\n      });\n      if (($.fn.tabby != null) && this.core.options.enableTabIndent) {\n        this.textarea.tabby({\n          'tabString': this.core.options.tabString\n        });\n      }\n      this.textarea = autoIndentable(this.textarea);\n      if (!this.core.options.enableAutoIndent) {\n        this.textarea.autoIndent.disable();\n      }\n      this.textarea.on('keypress keyup click blur', function() {\n        return _this.change();\n      });\n    }\n\n    TextEditor.prototype.val = function(value) {\n      if (value != null) {\n        this.textarea.val(value);\n        this.change();\n        return this;\n      }\n      return this.textarea.val();\n    };\n\n    TextEditor.prototype.focus = function() {\n      this.textarea.focus();\n      return this;\n    };\n\n    TextEditor.prototype.createMemento = function() {\n      return this.val();\n    };\n\n    TextEditor.prototype.setMemento = function(memento) {\n      return this.val(memento);\n    };\n\n    TextEditor.prototype.adjust = function() {\n      this.textarea.outerWidth(this.element.width());\n      this.textarea.outerHeight(this.element.height());\n      return this;\n    };\n\n    TextEditor.prototype.selectWholeLineIfNoSelectionFound = function() {\n      var caret;\n      caret = this.textarea.selection.caret();\n      if (caret[0] === caret[1]) {\n        this.textarea.selection.selectWholeCurrentLine();\n      }\n    };\n\n    TextEditor.prototype.selection = function(str, keepSelection) {\n      if (keepSelection == null) {\n        keepSelection = true;\n      }\n      if (str != null) {\n        this.textarea.selection.text(str, keepSelection);\n        this.core.caretaker.save();\n        return this.change();\n      }\n      return this.textarea.selection.text();\n    };\n\n    TextEditor.prototype.enclose = function(b, a, keepSelection) {\n      if (keepSelection == null) {\n        keepSelection = true;\n      }\n      this.selectWholeLineIfNoSelectionFound();\n      this.textarea.selection.enclose(b, a, keepSelection);\n      this.core.caretaker.save();\n      return this.change();\n    };\n\n    TextEditor.prototype.insertBefore = function(str, keepSelection) {\n      if (keepSelection == null) {\n        keepSelection = true;\n      }\n      this.selectWholeLineIfNoSelectionFound();\n      this.textarea.selection.insertBefore(str, keepSelection);\n      this.core.caretaker.save();\n      return this.change();\n    };\n\n    TextEditor.prototype.insertAfter = function(str, keepSelection) {\n      if (keepSelection == null) {\n        keepSelection = true;\n      }\n      this.selectWholeLineIfNoSelectionFound();\n      this.textarea.selection.insertAfter(str, keepSelection);\n      this.core.caretaker.save();\n      return this.change();\n    };\n\n    return TextEditor;\n\n  })(BaseEditor);\n\n  namespace('Jencil.editors', function(exports) {\n    exports.BaseEditor = BaseEditor;\n    return exports.TextEditor = TextEditor;\n  });\n\n  BaseViewer = (function(_super) {\n\n    __extends(BaseViewer, _super);\n\n    function BaseViewer(core, selector, context) {\n      if (selector == null) {\n        selector = '<div>';\n      }\n      BaseViewer.__super__.constructor.call(this, core, selector, context);\n      this.element.addClass('viewer');\n    }\n\n    BaseViewer.prototype.update = function(value, force) {\n      throw new Error(\"NotImplementedError\");\n    };\n\n    return BaseViewer;\n\n  })(Panel);\n\n  TemplateViewer = (function(_super) {\n\n    __extends(TemplateViewer, _super);\n\n    function TemplateViewer(core) {\n      TemplateViewer.__super__.constructor.call(this, core);\n      this.templatePath = this.core.options.viewerTemplatePath;\n      this.element.css({\n        'position': 'relative'\n      });\n      this.curtain = curtainFactory(this.element);\n      this.iframe = $('<iframe>').appendTo(this.element).css({\n        margin: '0',\n        padding: '0',\n        border: 'none',\n        outline: 'none',\n        resize: 'none',\n        width: '100%',\n        height: '100%',\n        overflow: 'visible'\n      });\n      this.iframe.attr('frameborder', 0);\n      this.iframe = evolute(this.iframe);\n      this.iframe.init = function() {\n        var iframe;\n        iframe = this.get(0);\n        if (iframe.contentDocument != null) {\n          this.document = iframe.contentDocument;\n        } else {\n          this.document = iframe.contentWindow.document;\n        }\n        return this.document.write('<body></body>');\n      };\n      this.iframe.write = function(value) {\n        var scrollTop;\n        if (this.document != null) {\n          try {\n            scrollTop = this.document.documentElement.scrollTop;\n          } catch (e) {\n            scrollTop = 0;\n          }\n          this.document.open();\n          this.document.write(value);\n          this.document.close();\n          $(\"a\", $(this.document)).attr('target', '_blank');\n          this.document.documentElement.scrollTop = scrollTop;\n          this.width(this.document.scrollLeft);\n          this.height(this.document.scrollTop);\n          return true;\n        }\n        return false;\n      };\n      this.iframe.loadTemplate = function(templatePath, value) {\n        var _this = this;\n        return $.ajax({\n          url: templatePath,\n          success: function(data) {\n            _this._template = data;\n            return _this.write(value);\n          }\n        });\n      };\n    }\n\n    TemplateViewer.prototype.init = function() {\n      return this.iframe.init();\n    };\n\n    TemplateViewer.prototype.update = function(value, force) {\n      if (this.iframe._template != null) {\n        value = this.iframe._template.replace(\"{{content}}\", value);\n      } else if (this.templatePath != null) {\n        this.iframe.loadTemplate(this.templatePath, value);\n      }\n      return this.iframe.write(value);\n    };\n\n    TemplateViewer.prototype.adjust = function() {\n      this.iframe.outerWidth(this.element.width());\n      this.iframe.outerHeight(this.element.height());\n      return this;\n    };\n\n    return TemplateViewer;\n\n  })(BaseViewer);\n\n  AjaxViewer = (function(_super) {\n\n    __extends(AjaxViewer, _super);\n\n    function AjaxViewer(core, config) {\n      this.config = config;\n      AjaxViewer.__super__.constructor.call(this, core);\n      this.config = jQuery.extend({\n        type: 'GET',\n        dataType: 'text',\n        data: function(value) {\n          return encodeURIComponent(value);\n        },\n        url: null\n      }, this.config);\n    }\n\n    AjaxViewer.prototype.update = function(value, force) {\n      var _this = this;\n      if (this._valueCache !== value || force) {\n        this._valueCache = value;\n        return $.ajax({\n          type: this.config.type,\n          dataType: this.config.dataType,\n          data: JSON.stringify(this.config.data(value)),\n          url: this.config.url,\n          success: function(value) {\n            if (_this.iframe._template != null) {\n              value = _this.iframe._template.replace(\"{{content}}\", value);\n            } else if (_this.templatePath != null) {\n              _this.iframe.loadTemplate(_this.templatePath, value);\n            }\n            return _this.iframe.write(value);\n          }\n        });\n      }\n    };\n\n    return AjaxViewer;\n\n  })(TemplateViewer);\n\n  namespace('Jencil.viewers', function(exports) {\n    exports.BaseViewer = BaseViewer;\n    exports.TemplateViewer = TemplateViewer;\n    return exports.AjaxViewer = AjaxViewer;\n  });\n\n  BaseHelper = (function(_super) {\n\n    __extends(BaseHelper, _super);\n\n    function BaseHelper(core, selector, context) {\n      if (selector == null) {\n        selector = '<div>';\n      }\n      BaseHelper.__super__.constructor.call(this, core, selector, context);\n      this.element.addClass('helper');\n    }\n\n    return BaseHelper;\n\n  })(Panel);\n\n  TemplateHelper = (function(_super) {\n\n    __extends(TemplateHelper, _super);\n\n    function TemplateHelper(core) {\n      TemplateHelper.__super__.constructor.call(this, core);\n      this.templatePath = this.core.options.helperTemplatePath;\n      this.element.css({\n        'position': 'relative'\n      });\n      this.curtain = curtainFactory(this.element);\n      this.iframe = $('<iframe>').appendTo(this.element).css({\n        margin: '0',\n        padding: '0',\n        border: 'none',\n        outline: 'none',\n        resize: 'none',\n        width: '100%',\n        height: '100%',\n        overflow: 'visible'\n      });\n      this.iframe.attr('frameborder', 0);\n      this.iframe = evolute(this.iframe);\n      this.iframe.init = function() {\n        var iframe;\n        iframe = this.get(0);\n        if (iframe.contentDocument != null) {\n          this.document = iframe.contentDocument;\n        } else {\n          this.document = iframe.contentWindow.document;\n        }\n        return this.document.write('<body></body>');\n      };\n      this.iframe.write = function(value) {\n        var scrollTop;\n        if (this.document != null) {\n          try {\n            scrollTop = this.document.documentElement.scrollTop;\n          } catch (e) {\n            scrollTop = 0;\n          }\n          this.document.open();\n          this.document.write(value);\n          this.document.close();\n          this.document.documentElement.scrollTop = scrollTop;\n          this.width(this.document.scrollLeft);\n          this.height(this.document.scrollTop);\n          return true;\n        }\n        return false;\n      };\n      this.iframe.loadTemplate = function(templatePath) {\n        var _this = this;\n        return $.ajax({\n          url: templatePath,\n          success: function(data) {\n            return _this.write(data);\n          }\n        });\n      };\n    }\n\n    TemplateHelper.prototype.init = function() {\n      this.iframe.init();\n      if (this.templatePath != null) {\n        return this.iframe.loadTemplate(this.templatePath);\n      }\n    };\n\n    TemplateHelper.prototype.adjust = function() {\n      this.iframe.outerWidth(this.element.width());\n      this.iframe.outerHeight(this.element.height());\n      return this;\n    };\n\n    return TemplateHelper;\n\n  })(BaseHelper);\n\n  namespace('Jencil.helpers', function(exports) {\n    exports.BaseHelper = BaseHelper;\n    return exports.TemplateHelper = TemplateHelper;\n  });\n\n  Separator = (function(_super) {\n\n    __extends(Separator, _super);\n\n    function Separator(core) {\n      Separator.__super__.constructor.call(this, core, '<span>');\n      this.element.addClass('separator');\n    }\n\n    return Separator;\n\n  })(Widget);\n\n  Button = (function(_super) {\n\n    __extends(Button, _super);\n\n    function Button(core, name, text, title) {\n      this.name = name;\n      this.text = text;\n      this.title = title;\n      Button.__super__.constructor.call(this, core, '<a>');\n      this.text = Jencil.t(this.text || this.name);\n      this.title = Jencil.t(this.title || this.text);\n      this.element.addClass('button').addClass(name);\n      this.element.append($(\"<span>\" + this.text + \"</span>\"));\n      this.element.attr('title', this.title);\n    }\n\n    Button.prototype.enable = function() {\n      return this.element.removeClass('disable');\n    };\n\n    Button.prototype.disable = function() {\n      return this.element.addClass('disable');\n    };\n\n    Button.prototype.validate = function() {\n      return this;\n    };\n\n    return Button;\n\n  })(Widget);\n\n  ActionButton = (function(_super) {\n\n    __extends(ActionButton, _super);\n\n    function ActionButton(core, name, text, title, callback, shortcut) {\n      var _this = this;\n      this.shortcut = shortcut;\n      ActionButton.__super__.constructor.call(this, core, name, text, title);\n      this.callback = function() {\n        if (!_this.element.hasClass('disable')) {\n          return callback();\n        }\n      };\n      this.callback.raw = callback;\n      this.element.click(function() {\n        return _this.callback();\n      });\n      if ((this.shortcut != null) && (window.shortcut != null)) {\n        window.shortcut.add(this.shortcut, function(e) {\n          return _this.callback();\n        });\n        this.element.attr('title', \"\" + this.title + \" (\" + this.shortcut + \")\");\n      }\n    }\n\n    return ActionButton;\n\n  })(Button);\n\n  CommandButton = (function(_super) {\n\n    __extends(CommandButton, _super);\n\n    function CommandButton(core, name, text, title, command, shortcut) {\n      var callback;\n      this.command = command;\n      callback = function() {\n        var editor;\n        editor = core.editor();\n        return editor[command].call(editor);\n      };\n      CommandButton.__super__.constructor.call(this, core, name, text, title, callback, shortcut);\n    }\n\n    CommandButton.prototype.init = function() {\n      return this.validate();\n    };\n\n    CommandButton.prototype.validate = function() {\n      var editor;\n      editor = this.core.editor();\n      if (!(editor[this.command] != null)) {\n        this.disable();\n      }\n      return this;\n    };\n\n    CommandButton.factory = function(core, args) {\n      var command, name, shortcut, text, title;\n      name = text = title = command = shortcut = null;\n      switch (args.length) {\n        case 5:\n          name = args[0];\n          text = args[1];\n          title = args[2];\n          command = args[3];\n          shortcut = args[4];\n          break;\n        case 4:\n          name = args[0];\n          text = title = args[1];\n          command = args[2];\n          shortcut = args[3];\n          break;\n        case 3:\n          name = command = args[0];\n          text = title = args[1];\n          shortcut = args[2];\n          break;\n        case 2:\n          name = command = args[0];\n          text = title = args[1];\n          shortcut = null;\n          break;\n        case 1:\n          name = command = text = title = args[0];\n          shortcut = null;\n      }\n      return new CommandButton(core, name, text, title, command, shortcut);\n    };\n\n    return CommandButton;\n\n  })(ActionButton);\n\n  UndoButton = (function(_super) {\n\n    __extends(UndoButton, _super);\n\n    function UndoButton(core) {\n      var callback,\n        _this = this;\n      callback = function(e) {\n        return _this.core.caretaker.undo();\n      };\n      UndoButton.__super__.constructor.call(this, core, 'undo', 'Undo', 'Undo', callback, 'Ctrl+Z');\n    }\n\n    UndoButton.prototype.init = function() {\n      var check,\n        _this = this;\n      check = function() {\n        if (!_this.core.caretaker.canUndo()) {\n          _this.disable();\n        } else {\n          _this.enable();\n        }\n        return setTimeout(check, 100);\n      };\n      return check();\n    };\n\n    return UndoButton;\n\n  })(ActionButton);\n\n  RedoButton = (function(_super) {\n\n    __extends(RedoButton, _super);\n\n    function RedoButton(core) {\n      var callback,\n        _this = this;\n      callback = function(e) {\n        return _this.core.caretaker.redo();\n      };\n      RedoButton.__super__.constructor.call(this, core, 'redo', 'Redo', 'Redo', callback, 'Ctrl+Shift+Z');\n    }\n\n    RedoButton.prototype.init = function() {\n      var check,\n        _this = this;\n      check = function() {\n        if (!_this.core.caretaker.canRedo()) {\n          _this.disable();\n        } else {\n          _this.enable();\n        }\n        return setTimeout(check, 100);\n      };\n      return check();\n    };\n\n    return RedoButton;\n\n  })(ActionButton);\n\n  FullscreenButton = (function(_super) {\n\n    __extends(FullscreenButton, _super);\n\n    function FullscreenButton(core) {\n      var callback,\n        _this = this;\n      callback = function(e) {\n        return _this.core.fullscreen.toggle();\n      };\n      FullscreenButton.__super__.constructor.call(this, core, 'fullscreen', 'Toggle fullscreen', 'Fullscreen', callback, 'Ctrl+F');\n    }\n\n    FullscreenButton.prototype.init = function() {\n      var check,\n        _this = this;\n      check = function() {\n        if (_this.core.fullscreen.element.is(':visible')) {\n          _this.element.addClass('hide');\n        } else {\n          _this.element.removeClass('hide');\n        }\n        return setTimeout(check, 100);\n      };\n      return check();\n    };\n\n    return FullscreenButton;\n\n  })(ActionButton);\n\n  ViewerButton = (function(_super) {\n\n    __extends(ViewerButton, _super);\n\n    function ViewerButton(core) {\n      var callback,\n        _this = this;\n      callback = function(e) {\n        return _this.core.viewer().toggle();\n      };\n      ViewerButton.__super__.constructor.call(this, core, 'viewer', 'Quick view', 'Quick view', callback, 'Ctrl+Q');\n    }\n\n    ViewerButton.prototype.validate = function() {\n      if (!this.core.viewer()) {\n        this.disable();\n        return false;\n      }\n      return true;\n    };\n\n    ViewerButton.prototype.init = function() {\n      var check,\n        _this = this;\n      if (!this.validate()) {\n        return;\n      }\n      check = function() {\n        if (_this.core.viewer().element.is(':visible')) {\n          _this.element.addClass('hide');\n        } else {\n          _this.element.removeClass('hide');\n        }\n        return setTimeout(check, 100);\n      };\n      return check();\n    };\n\n    return ViewerButton;\n\n  })(ActionButton);\n\n  HelperButton = (function(_super) {\n\n    __extends(HelperButton, _super);\n\n    function HelperButton(core) {\n      var callback,\n        _this = this;\n      callback = function(e) {\n        return _this.core.helper().toggle();\n      };\n      HelperButton.__super__.constructor.call(this, core, 'helper', 'Help', 'Help', callback, 'Ctrl+H');\n    }\n\n    HelperButton.prototype.validate = function() {\n      if (!this.core.helper()) {\n        this.disable();\n        return false;\n      }\n      return true;\n    };\n\n    HelperButton.prototype.init = function() {\n      var check,\n        _this = this;\n      if (!this.validate()) {\n        return;\n      }\n      check = function() {\n        if (_this.core.helper().element.is(':visible')) {\n          _this.element.addClass('hide');\n        } else {\n          _this.element.removeClass('hide');\n        }\n        return setTimeout(check, 100);\n      };\n      return check();\n    };\n\n    return HelperButton;\n\n  })(ActionButton);\n\n  buttonFactory = function(core, value) {\n    if (value instanceof Array) {\n      return CommandButton.factory(core, value);\n    }\n    if (typeof value === 'string') {\n      switch (value) {\n        case 'Separator':\n          return new Separator(core);\n        case 'Undo':\n          return new UndoButton(core);\n        case 'Redo':\n          return new RedoButton(core);\n        case 'Fullscreen':\n          return new FullscreenButton(core);\n        case 'Viewer':\n          return new ViewerButton(core);\n        case 'Helper':\n          return new HelperButton(core);\n        default:\n          throw new Exception(\"\" + value + \" is not known Button type\");\n      }\n    }\n    return new value(core);\n  };\n\n  namespace('Jencil.buttons', function(exports) {\n    exports.Separator = Separator;\n    exports.Button = Button;\n    exports.ActionButton = ActionButton;\n    exports.CommandButton = CommandButton;\n    exports.UndoButton = UndoButton;\n    exports.RedoButton = RedoButton;\n    exports.FullscreenButton = FullscreenButton;\n    exports.ViewerButton = ViewerButton;\n    return exports.HelperButton = HelperButton;\n  });\n\n  Wrapper = (function(_super) {\n\n    __extends(Wrapper, _super);\n\n    function Wrapper(core, width, height) {\n      Wrapper.__super__.constructor.call(this, core);\n      this.element.addClass('jencil wrapper');\n      this.element.width(width);\n      this.element.height(height);\n      this.workspace = new Workspace(this.core);\n      this.workspace.element.appendTo(this.element);\n    }\n\n    Wrapper.prototype.init = function() {\n      var _this = this;\n      if ((this.element.resizable != null) && this.core.options.resizable === true) {\n        this.element.resizable({\n          start: function() {\n            var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;\n            if ((_ref = _this.core.editor()) != null) {\n              if ((_ref1 = _ref.curtain) != null) {\n                _ref1.on();\n              }\n            }\n            if ((_ref2 = _this.core.viewer()) != null) {\n              if ((_ref3 = _ref2.curtain) != null) {\n                _ref3.on();\n              }\n            }\n            return (_ref4 = _this.core.helper()) != null ? (_ref5 = _ref4.curtain) != null ? _ref5.on() : void 0 : void 0;\n          },\n          resize: function() {\n            var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;\n            if ((_ref = _this.core.editor()) != null) {\n              if ((_ref1 = _ref.curtain) != null) {\n                _ref1.refresh();\n              }\n            }\n            if ((_ref2 = _this.core.viewer()) != null) {\n              if ((_ref3 = _ref2.curtain) != null) {\n                _ref3.refresh();\n              }\n            }\n            if ((_ref4 = _this.core.helper()) != null) {\n              if ((_ref5 = _ref4.curtain) != null) {\n                _ref5.refresh();\n              }\n            }\n            return _this.adjust();\n          },\n          stop: function() {\n            var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;\n            if ((_ref = _this.core.editor()) != null) {\n              if ((_ref1 = _ref.curtain) != null) {\n                _ref1.off();\n              }\n            }\n            if ((_ref2 = _this.core.viewer()) != null) {\n              if ((_ref3 = _ref2.curtain) != null) {\n                _ref3.off();\n              }\n            }\n            if ((_ref4 = _this.core.helper()) != null) {\n              if ((_ref5 = _ref4.curtain) != null) {\n                _ref5.off();\n              }\n            }\n            return _this.adjust();\n          }\n        });\n      }\n      return this.workspace.init();\n    };\n\n    Wrapper.prototype.adjust = function() {\n      this.workspace.element.outerWidth(true, this.element.width());\n      this.workspace.element.outerHeight(true, this.element.height());\n      this.workspace.adjust();\n      return this;\n    };\n\n    return Wrapper;\n\n  })(Panel);\n\n  Workspace = (function(_super) {\n\n    __extends(Workspace, _super);\n\n    function Workspace(core) {\n      Workspace.__super__.constructor.call(this, core);\n      this.element.addClass('workspace');\n      this.profile(core.options.profile);\n    }\n\n    Workspace.prototype.profile = function(profile) {\n      var button, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3,\n        _this = this;\n      if (profile != null) {\n        if (typeof profile === 'string') {\n          profile = this.core.options.profiles[profile];\n        }\n        profile = jQuery.extend(DefaultProfile, profile);\n        profile.defaultVolume = this.core.options.defaultVolume || profile.defaultVolume;\n        profile.defaultVolume2 = this.core.options.defaultVolume2 || profile.defaultVolume2;\n        this.element.empty();\n        this.mainPanel = new profile.mainPanelClass(this.core, profile);\n        if ((_ref = this.mainPanel.editorPanel) != null) {\n          _ref.val(this.core.element.val());\n        }\n        if ((_ref1 = this.mainPanel.editorPanel) != null) {\n          _ref1.change(function(value) {\n            return _this.core.element.val(value);\n          });\n        }\n        this.toolbar = new Toolbar(this.core);\n        _ref2 = profile.toolbarButtons;\n        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {\n          button = _ref2[_i];\n          button = buttonFactory(this.core, button);\n          this.toolbar.addButton(button);\n        }\n        this.statusbar = new Statusbar(this.core);\n        _ref3 = profile.statusbarButtons;\n        for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {\n          button = _ref3[_j];\n          button = buttonFactory(this.core, button);\n          this.statusbar.addButton(button);\n        }\n        this.element.append(this.toolbar.element);\n        this.element.append(this.mainPanel.element);\n        this.element.append(this.statusbar.element);\n        this._profile = profile;\n        return this;\n      }\n      return this._profile;\n    };\n\n    Workspace.prototype.init = function() {\n      this.toolbar.init();\n      this.statusbar.init();\n      return this.mainPanel.init();\n    };\n\n    Workspace.prototype.adjust = function() {\n      var offset1, offset2;\n      this.toolbar.element.outerWidth(true, this.element.width());\n      this.statusbar.element.outerWidth(true, this.element.width());\n      this.mainPanel.element.outerWidth(true, this.element.width());\n      this.mainPanel.element.outerHeight(true, this.element.height());\n      this.mainPanel.adjust();\n      offset1 = this.toolbar.element.outerHeight(true);\n      offset2 = this.statusbar.element.outerHeight(true);\n      this.mainPanel.element.outerHeight(true, this.element.height() - (offset1 + offset2));\n      this.toolbar.adjust();\n      this.statusbar.adjust();\n      this.mainPanel.adjust();\n      return this;\n    };\n\n    Workspace.prototype.update = function(force) {\n      if (this.mainPanel.editorPanel && this.mainPanel.viewerPanel) {\n        return this.mainPanel.viewerPanel.update(this.mainPanel.editorPanel.val(), force);\n      }\n    };\n\n    return Workspace;\n\n  })(Panel);\n\n  Bar = (function(_super) {\n\n    __extends(Bar, _super);\n\n    function Bar(core) {\n      Bar.__super__.constructor.call(this, core);\n      this._buttons = [];\n    }\n\n    Bar.prototype.init = function() {\n      var button, _i, _len, _ref;\n      _ref = this._buttons;\n      for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n        button = _ref[_i];\n        button.init();\n      }\n      return this;\n    };\n\n    Bar.prototype.addButton = function(button) {\n      this._buttons.push(button);\n      return this.element.append(button.element);\n    };\n\n    return Bar;\n\n  })(Panel);\n\n  Toolbar = (function(_super) {\n\n    __extends(Toolbar, _super);\n\n    function Toolbar(core) {\n      Toolbar.__super__.constructor.call(this, core);\n      this.element.addClass('toolbar');\n    }\n\n    return Toolbar;\n\n  })(Bar);\n\n  Statusbar = (function(_super) {\n\n    __extends(Statusbar, _super);\n\n    function Statusbar(core) {\n      Statusbar.__super__.constructor.call(this, core);\n      this.element.addClass('statusbar');\n    }\n\n    return Statusbar;\n\n  })(Bar);\n\n  MonomainPanel = (function() {\n\n    function MonomainPanel(core, profile) {\n      var editorPanel;\n      editorPanel = new profile.editorClass(core);\n      editorPanel.element.addClass('mainPanel');\n      return editorPanel;\n    }\n\n    return MonomainPanel;\n\n  })();\n\n  DimainPanel = (function(_super) {\n\n    __extends(DimainPanel, _super);\n\n    function DimainPanel(core, profile) {\n      var _this = this;\n      this.editorPanel = new profile.editorClass(core);\n      this.viewerPanel = new profile.viewerClass(core);\n      DimainPanel.__super__.constructor.call(this, core, this.editorPanel, this.viewerPanel, profile.defaultVolume);\n      this.element.addClass('mainPanel');\n      this.editorPanel.change(function(value) {\n        return _this.viewerPanel.update(value);\n      });\n    }\n\n    return DimainPanel;\n\n  })(VerticalPanel);\n\n  TrimainPanel = (function(_super) {\n\n    __extends(TrimainPanel, _super);\n\n    function TrimainPanel(core, profile) {\n      var _this = this;\n      this.editorPanel = new profile.editorClass(core);\n      this.viewerPanel = new profile.viewerClass(core);\n      this.helperPanel = new profile.helperClass(core);\n      this.verticalPanel = new VerticalPanel(core, this.editorPanel, this.viewerPanel, profile.defaultVolume);\n      TrimainPanel.__super__.constructor.call(this, core, this.verticalPanel, this.helperPanel, profile.defaultVolume2);\n      this.element.addClass('mainPanel');\n      this.editorPanel.change(function(value) {\n        return _this.viewerPanel.update(value);\n      });\n    }\n\n    return TrimainPanel;\n\n  })(HorizontalPanel);\n\n  namespace('Jencil.mainpanels', function(exports) {\n    exports.MonomainPanel = MonomainPanel;\n    exports.DimainPanel = DimainPanel;\n    return exports.TrimainPanel = TrimainPanel;\n  });\n\n  Fullscreen = (function(_super) {\n\n    __extends(Fullscreen, _super);\n\n    function Fullscreen(core) {\n      var _this = this;\n      Fullscreen.__super__.constructor.call(this, core);\n      this.element.addClass('fullscreen');\n      this.element.css({\n        'position': 'fixed',\n        'top': '0',\n        'left': '0',\n        'width': '100%',\n        'height': '100%',\n        'z-index': 100\n      });\n      this.curtain = $('<div>').addClass('curtain');\n      this.curtain.css({\n        'position': 'absolute',\n        'top': '0',\n        'left': '0',\n        'width': '100%',\n        'height': '100%',\n        'background': 'black',\n        'opacity': '0.6',\n        'cursor': 'pointer'\n      });\n      this.cell = $('<div>').css({\n        'position': 'absolute',\n        'top': '5%',\n        'left': '5%',\n        'width': '90%',\n        'height': '90%'\n      });\n      if ($.browser.msie && $.browser.version < 7) {\n        this.element.css('position', 'absolute');\n        $(window).scroll(function() {\n          return _this.element.css('top', $(document).scrollTop());\n        });\n      }\n      this.curtain.click(function() {\n        return _this.off();\n      });\n      this.element.append(this.curtain);\n      this.element.append(this.cell);\n      this.element.hide();\n      this.resize = function() {\n        return _this.core.wrapper.adjust();\n      };\n    }\n\n    Fullscreen.prototype.on = function() {\n      var ratio,\n        _this = this;\n      ratio = 9.0 / 10;\n      this.cell.append(this.core.wrapper.element);\n      this.core.wrapper.element.outerWidth(true, this.element.width() * ratio);\n      this.core.wrapper.element.outerHeight(true, this.element.height() * ratio);\n      this.core.wrapper.init();\n      this.core.wrapper.adjust();\n      this.core.wrapper.workspace.update(true);\n      this.element.fadeIn('fast', function() {\n        _this.core.wrapper.element.css('width', \"100%\");\n        _this.core.wrapper.element.css('height', \"100%\");\n        return _this.core.wrapper.adjust();\n      });\n      return $(window).on('resize', this.resize);\n    };\n\n    Fullscreen.prototype.off = function() {\n      this.core.element.after(this.core.wrapper.element);\n      this.core.wrapper.element.css('width', \"\");\n      this.core.wrapper.element.css('height', \"\");\n      this.core.wrapper.init();\n      this.core.wrapper.adjust();\n      this.core.wrapper.workspace.update(true);\n      this.element.fadeOut('fast');\n      return $(window).unbind('resize', this.resize);\n    };\n\n    Fullscreen.prototype.toggle = function(callbackOn, callbackOff) {\n      if (this.element.is(':visible')) {\n        this.off();\n        return typeof callbackOff === \"function\" ? callbackOff() : void 0;\n      } else {\n        this.on();\n        return typeof callbackOn === \"function\" ? callbackOn() : void 0;\n      }\n    };\n\n    return Fullscreen;\n\n  })(Panel);\n\n  autoIndentableHtml = (function() {\n    var PATTERNS, post, pre, x;\n    PATTERNS = (function() {\n      var _i, _len, _ref, _results;\n      _ref = ['p', 'li'];\n      _results = [];\n      for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n        x = _ref[_i];\n        _results.push([x, new RegExp(\"^[\\s\\t]*<\" + x + \">\"), new RegExp(\"</\" + x + \">[\\s\\t]*$\")]);\n      }\n      return _results;\n    })();\n    pre = function(e, line) {\n      var lineCaret, pattern, _i, _len;\n      if (e.shiftKey) {\n        return;\n      }\n      for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {\n        pattern = PATTERNS[_i];\n        if (pattern[1].test(line) || pattern[2].test(line)) {\n          lineCaret = this.selection._getLineCaret();\n          this.selection.caret(lineCaret[1]);\n          return;\n        }\n      }\n    };\n    post = function(e, line, indent, insert) {\n      var pattern, _i, _len;\n      if (e.shiftKey) {\n        return;\n      }\n      for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {\n        pattern = PATTERNS[_i];\n        if (pattern[2].test(line)) {\n          x = pattern[0];\n          this.selection.insertAfter(\"<\" + x + \"></\" + x + \">\", false);\n          this.selection.caretOffset(-(3 + x.length));\n          return;\n        }\n      }\n    };\n    return function(textarea) {\n      if (!(textarea.autoIndent != null)) {\n        textarea = autoIndentable(textarea);\n      }\n      textarea.autoIndent.pre = function(e, line) {\n        return pre.call(textarea, e, line);\n      };\n      textarea.autoIndent.post = function(e, line, indent, insert) {\n        return post.call(textarea, e, line, indent, insert);\n      };\n      return textarea;\n    };\n  })();\n\n  headerMarkup = (function() {\n    var PATTERN;\n    PATTERN = new RegExp(\"^<h([1-6])>(.*)</h[1-6]>\\n?$\");\n    return function(n) {\n      var caret, replacement, text;\n      caret = this.textarea.selection.caret();\n      if (caret[0] === caret[1]) {\n        this.textarea.selection.selectWholeCurrentLine();\n      }\n      text = this.selection();\n      if (PATTERN.test(text)) {\n        if (RegExp.$1 === n.toString()) {\n          replacement = RegExp.$2;\n        } else {\n          replacement = \"<h\" + n + \">\" + RegExp.$2 + \"</h\" + n + \">\";\n        }\n        return this.selection(replacement);\n      } else {\n        return this.enclose(\"<h\" + n + \">\", \"</h\" + n + \">\\n\");\n      }\n    };\n  })();\n\n  HtmlEditor = (function(_super) {\n\n    __extends(HtmlEditor, _super);\n\n    function HtmlEditor(core) {\n      HtmlEditor.__super__.constructor.call(this, core);\n      this.textarea = autoIndentableHtml(this.textarea);\n    }\n\n    HtmlEditor.prototype.h1 = function() {\n      return headerMarkup.call(this, 1);\n    };\n\n    HtmlEditor.prototype.h2 = function() {\n      return headerMarkup.call(this, 2);\n    };\n\n    HtmlEditor.prototype.h3 = function() {\n      return headerMarkup.call(this, 3);\n    };\n\n    HtmlEditor.prototype.h4 = function() {\n      return headerMarkup.call(this, 4);\n    };\n\n    HtmlEditor.prototype.h5 = function() {\n      return headerMarkup.call(this, 5);\n    };\n\n    HtmlEditor.prototype.h6 = function() {\n      return headerMarkup.call(this, 6);\n    };\n\n    HtmlEditor.prototype.bold = function() {\n      return this.enclose(\"<b>\", \"</b>\");\n    };\n\n    HtmlEditor.prototype.italic = function() {\n      return this.enclose(\"<i>\", \"</i>\");\n    };\n\n    HtmlEditor.prototype.underline = function() {\n      return this.enclose(\"<u>\", \"</u>\");\n    };\n\n    HtmlEditor.prototype.strike = function() {\n      return this.enclose(\"<s>\", \"</s>\");\n    };\n\n    HtmlEditor.prototype.superscript = function() {\n      return this.enclose(\"<sup>\", \"</sup>\");\n    };\n\n    HtmlEditor.prototype.subscript = function() {\n      return this.enclose(\"<sub>\", \"</sub>\");\n    };\n\n    HtmlEditor.prototype.quote = function() {\n      return this.enclose(\"<q>\", \"</q>\");\n    };\n\n    HtmlEditor.prototype.blockquote = function() {\n      return this.enclose(\"\\n<blockquote>\", \"</blockquote>\\n\");\n    };\n\n    HtmlEditor.prototype.code = function() {\n      return this.enclose(\"<code>\", \"</code>\");\n    };\n\n    HtmlEditor.prototype.pre = function() {\n      return this.enclose(\"<pre>\", \"</pre>\");\n    };\n\n    HtmlEditor.prototype.anchorLink = function() {\n      var href, text;\n      text = this.selection();\n      if (!text) {\n        text = window.prompt(\"Please input a link text\", \"Here\");\n      }\n      href = window.prompt(\"Please input a link url\", \"http://\");\n      if (!(href != null)) {\n        return;\n      }\n      return this.selection(\"<a href='\" + href + \"'>\" + text + \"</a>\");\n    };\n\n    HtmlEditor.prototype.image = function() {\n      var alt, src;\n      src = window.prompt(\"Please input a image url\", \"http://\");\n      alt = window.prompt(\"(Optional) Please input a alt message\", \"Image\");\n      if (!(src != null)) {\n        return;\n      }\n      return this.selection(\"<img src='\" + src + \"' alt='\" + alt + \"'>\");\n    };\n\n    HtmlEditor.prototype.unorderedList = function() {\n      var text, x;\n      text = this.selection();\n      text = (function() {\n        var _i, _len, _ref, _results;\n        _ref = text.split(\"\\n\");\n        _results = [];\n        for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n          x = _ref[_i];\n          _results.push(\"  <li>\" + x + \"</li>\");\n        }\n        return _results;\n      })();\n      text.unshift(\"<ul>\");\n      text.push(\"</ul>\");\n      return this.selection(text.join(\"\\n\"));\n    };\n\n    HtmlEditor.prototype.orderedList = function() {\n      var text, x;\n      text = this.selection();\n      text = (function() {\n        var _i, _len, _ref, _results;\n        _ref = text.split(\"\\n\");\n        _results = [];\n        for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n          x = _ref[_i];\n          _results.push(\"  <li>\" + x + \"</li>\");\n        }\n        return _results;\n      })();\n      text.unshift(\"<ol>\");\n      text.push(\"</ol>\");\n      return this.selection(text.join(\"\\n\"));\n    };\n\n    return HtmlEditor;\n\n  })(TextEditor);\n\n  HtmlViewer = TemplateViewer;\n\n  HtmlHelper = (function(_super) {\n\n    __extends(HtmlHelper, _super);\n\n    function HtmlHelper(core) {\n      var HTML_HELPER_HTML;\n      HtmlHelper.__super__.constructor.call(this, core);\n      HTML_HELPER_HTML = \"<p><span class=\\\"key\\\">Ctrl+Z</span>\" + (Jencil.t(\"Undo\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+Shift+Z</span>\" + (Jencil.t(\"Redo\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+B</span>\" + (Jencil.t(\"Make selected text property as <b>Bold</b>\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+I</span>\" + (Jencil.t(\"Make selected text property as <i>Italic</i>\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+U</span>\" + (Jencil.t(\"Underline selected text like <u>Underline</u>\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+F</span>\" + (Jencil.t(\"Toggle fullscreen mode\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+Q</span>\" + (Jencil.t(\"Toggle quick view\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+H</span>\" + (Jencil.t(\"Toggle help\")) + \"<p>\";\n      this.element.html(HTML_HELPER_HTML);\n    }\n\n    return HtmlHelper;\n\n  })(BaseHelper);\n\n  HtmlProfile = {\n    mainPanelClass: TrimainPanel,\n    editorClass: HtmlEditor,\n    viewerClass: HtmlViewer,\n    helperClass: HtmlHelper,\n    defaultVolume: 1,\n    defaultVolume2: 0.7,\n    toolbarButtons: ['Undo', 'Redo', 'Separator', ['h1', 'H1'], ['h2', 'H2'], ['h3', 'H3'], ['h4', 'H4'], ['h5', 'H5'], ['h6', 'H6'], 'Separator', ['bold', 'Bold', 'Ctrl+B'], ['italic', 'Italic', 'Ctrl+I'], ['underline', 'Underline', 'Ctrl+U'], ['strike', 'Strikeout'], ['superscript', 'Superscript'], ['subscript', 'Subscript'], 'Separator', ['anchorLink', 'Anchor link'], ['image', 'Image'], ['unorderedList', 'Unordered list'], ['orderedList', 'Ordered list'], ['quote', 'Quote'], ['blockquote', 'Blockquote'], ['code', 'Code'], ['pre', 'Pre'], 'Separator', 'Fullscreen'],\n    statusbarButtons: ['Viewer', 'Helper']\n  };\n\n  namespace('Jencil.profiles', function(exports) {\n    return exports.HtmlProfile = HtmlProfile;\n  });\n\n  headerMarkup = (function() {\n    var appendAtxHeader, atxHeaderPattern, changeAtxHeader, removeAtxHeader, toggleAtxHeader;\n    atxHeaderPattern = new RegExp('^\\s*(#{1,6}\\s*).*');\n    appendAtxHeader = function(segment, n) {\n      var header;\n      header = \"#\".repeat(n);\n      return \"\" + header + \" \" + segment;\n    };\n    removeAtxHeader = function(segment) {\n      return segment.replace(/^(\\s*)#{1,6}\\s*/g, '$1');\n    };\n    changeAtxHeader = function(segment, n) {\n      var header;\n      header = \"#\".repeat(n);\n      return segment.replace(/^(\\s*)#{1,6}\\s*/g, \"$1\" + header + \" \");\n    };\n    toggleAtxHeader = function(textarea, n) {\n      var caret, caretOffset, exists, replacement, segment, text;\n      text = textarea.val();\n      caret = textarea.selection.caret();\n      segment = textarea.selection.text();\n      caretOffset = 0;\n      if (atxHeaderPattern.test(segment)) {\n        exists = RegExp.$1.trim();\n        if (exists.length === n) {\n          replacement = removeAtxHeader(segment);\n        } else {\n          replacement = changeAtxHeader(segment, n);\n        }\n      } else {\n        replacement = appendAtxHeader(segment, n);\n        if (caret[0] > 0 && text[caret[0] - 1] !== \"\\n\") {\n          replacement = \"\\n\" + replacement;\n        }\n        if (caret[1] < text.length && text[caret[1]] !== \"\\n\") {\n          replacement = \"\" + replacement + \"\\n\";\n          caretOffset = -1;\n        }\n      }\n      textarea.selection.text(replacement);\n      if (caretOffset !== 0) {\n        return textarea.selection.caretOffset(caretOffset);\n      }\n    };\n    return function(n) {\n      this.selectWholeLineIfNoSelectionFound();\n      return toggleAtxHeader(this.textarea, n);\n    };\n  })();\n\n  autoIndentableMarkdown = (function() {\n    var findListInfo, listPattern, orderedListPattern, post, pre, unorderedListPattern;\n    listPattern = /^(\\s*)((?:(?:\\d+\\.)|(?:[\\*\\+\\->])))(\\s+)/;\n    orderedListPattern = /^(\\s*)(\\d+)(\\.\\s+)/;\n    unorderedListPattern = /^(\\s*)([\\*\\+\\->])(\\s+)/;\n    findListInfo = function(line) {\n      var leading, mark, spaces, type;\n      if (listPattern.test(line)) {\n        leading = RegExp.$1;\n        mark = RegExp.$2;\n        spaces = RegExp.$3;\n        type = mark.endsWith(\".\") ? 1 : 2;\n      } else if (this._listInfo) {\n        return this._listInfo;\n      } else {\n        type = 0;\n      }\n      return {\n        type: type,\n        leading: leading,\n        mark: mark,\n        spaces: spaces\n      };\n    };\n    pre = function(e, line) {\n      var lineCaret, listInfo, _ref, _ref1;\n      if (e.shiftKey) {\n        return;\n      }\n      listInfo = findListInfo.call(this, line);\n      if ((_ref = listInfo.type) === 3 || _ref === 4) {\n        return true;\n      }\n      if ((_ref1 = listInfo.type) === 1 || _ref1 === 2) {\n        if (line.replace(listPattern, '').length === 0) {\n          this.selection.line(line.replace(listPattern, '$1'));\n          this._listInfo = null;\n          return true;\n        }\n        lineCaret = this.selection.lineCaret();\n        return this.selection.caret(lineCaret[1]);\n      }\n    };\n    post = function(e, line, indent, insert, cancel) {\n      var leading, listInfo, num, _ref, _ref1, _ref2, _ref3;\n      insert = null;\n      listInfo = findListInfo.call(this, line);\n      if (cancel && !e.shiftKey && ((_ref = listInfo.type) === 3 || _ref === 4)) {\n        leading = listInfo.mark + listInfo.spaces;\n        indent = line.replace(/^([\\t\\s]*).*$/, \"$1\");\n        indent = \" \".repeat(indent.length - leading.length);\n        insert = \"\\n\" + indent;\n        if (insert != null) {\n          this.selection.insertAfter(insert, false);\n        }\n        cancel = false;\n      }\n      if (cancel) {\n        return;\n      }\n      if (e.shiftKey) {\n        if ((_ref1 = listInfo.type) === 1 || _ref1 === 2) {\n          leading = listInfo.mark + listInfo.spaces;\n          insert = \" \".repeat(leading.length);\n          this._listInfo = listInfo;\n          this._listInfo.type += 2;\n        }\n      } else if ((_ref2 = listInfo.type) === 1 || _ref2 === 3) {\n        num = parseInt(listInfo.mark.replace(\".\", \"\"));\n        insert = \"\" + (num + 1) + \".\" + listInfo.spaces;\n      } else if ((_ref3 = listInfo.type) === 2 || _ref3 === 4) {\n        insert = \"\" + listInfo.mark + listInfo.spaces;\n      }\n      if (insert != null) {\n        return this.selection.insertAfter(insert, false);\n      }\n    };\n    return function(textarea) {\n      if (!(textarea.autoIndent != null)) {\n        textarea = autoIndentable(textarea);\n      }\n      textarea.autoIndent.pre = function(e, line) {\n        return pre.call(textarea, e, line);\n      };\n      textarea.autoIndent.post = function(e, line, indent, insert, cancel) {\n        return post.call(textarea, e, line, indent, insert, cancel);\n      };\n      return textarea;\n    };\n  })();\n\n  MarkdownEditor = (function(_super) {\n\n    __extends(MarkdownEditor, _super);\n\n    function MarkdownEditor(core) {\n      MarkdownEditor.__super__.constructor.call(this, core);\n      this.textarea = autoIndentableMarkdown(this.textarea);\n    }\n\n    MarkdownEditor.prototype.selectWholeLineIfNoSelectionFound = function() {\n      var caret, line, lineCaret;\n      caret = this.textarea.selection.caret();\n      if (caret[0] === caret[1]) {\n        lineCaret = this.textarea.selection.lineCaret();\n        line = this.textarea.selection.line();\n        if (/^(\\s*[\\*\\+\\-]\\s*|^\\s*\\d+\\.\\s*|^\\s*>\\s*)/g.test(line)) {\n          lineCaret[0] += RegExp.$1.length;\n        }\n        this.textarea.selection.caret(lineCaret);\n      }\n    };\n\n    MarkdownEditor.prototype.h1 = function() {\n      return headerMarkup.call(this, 1);\n    };\n\n    MarkdownEditor.prototype.h2 = function() {\n      return headerMarkup.call(this, 2);\n    };\n\n    MarkdownEditor.prototype.h3 = function() {\n      return headerMarkup.call(this, 3);\n    };\n\n    MarkdownEditor.prototype.h4 = function() {\n      return headerMarkup.call(this, 4);\n    };\n\n    MarkdownEditor.prototype.h5 = function() {\n      return headerMarkup.call(this, 5);\n    };\n\n    MarkdownEditor.prototype.h6 = function() {\n      return headerMarkup.call(this, 6);\n    };\n\n    MarkdownEditor.prototype.bold = function() {\n      return this.enclose(\"**\", \"**\");\n    };\n\n    MarkdownEditor.prototype.italic = function() {\n      return this.enclose(\"*\", \"*\");\n    };\n\n    MarkdownEditor.prototype.blockquote = (function() {\n      var match, pattern1, pattern2;\n      pattern1 = /^(\\s*)>\\s*([^\\n]*)$/m;\n      pattern2 = /^(\\s*)([^\\n]*)$/m;\n      match = function(lines) {\n        var line, _i, _len;\n        for (_i = 0, _len = lines.length; _i < _len; _i++) {\n          line = lines[_i];\n          if (line.length === 0) {\n            continue;\n          }\n          if (!pattern1.test(line)) {\n            return false;\n          }\n        }\n        return true;\n      };\n      return function() {\n        var i, line, lines, _i, _j, _ref, _ref1;\n        lines = this.selection().split(\"\\n\");\n        if (match(lines)) {\n          for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {\n            line = lines[i];\n            lines[i] = line.replace(pattern1, \"$1$2\");\n          }\n        } else {\n          for (i = _j = 0, _ref1 = lines.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {\n            line = lines[i];\n            lines[i] = line.replace(pattern2, \"$1> $2\");\n          }\n        }\n        return this.selection(lines.join(\"\\n\"));\n      };\n    })();\n\n    MarkdownEditor.prototype.code = function() {\n      var caret, lines, text, x;\n      lines = this.selection().split(\"\\n\");\n      caret = this.textarea.selection.caret();\n      if (lines.length > 1) {\n        text = (function() {\n          var _i, _len, _results;\n          _results = [];\n          for (_i = 0, _len = lines.length; _i < _len; _i++) {\n            x = lines[_i];\n            _results.push(\"\\t\" + x);\n          }\n          return _results;\n        })();\n        return this.selection(text.join(\"\\n\"));\n      } else {\n        return this.enclose(\"`\", \"`\");\n      }\n    };\n\n    MarkdownEditor.prototype.anchorLink = function() {\n      var href, text;\n      text = this.selection();\n      if (!text) {\n        text = window.prompt(\"Please input a link text\", \"Here\");\n      }\n      href = window.prompt(\"Please input a link url\", \"http://\");\n      if (!(href != null)) {\n        return;\n      }\n      return this.selection(\"[\" + text + \"](\" + href + \")\");\n    };\n\n    MarkdownEditor.prototype.image = function() {\n      var alt, src;\n      src = window.prompt(\"Please input a image url\", \"http://\");\n      alt = window.prompt(\"(Optional) Please input a alt message\", \"Image\");\n      if (!(src != null)) {\n        return;\n      }\n      return this.selection(\"![\" + alt + \"](\" + src + \")\");\n    };\n\n    MarkdownEditor.prototype.unorderedList = (function() {\n      var match, pattern1, pattern2;\n      pattern1 = /^(\\s*)\\*\\s*([^\\n]*)$/m;\n      pattern2 = /^(\\s*)([^\\n]*)$/m;\n      match = function(lines) {\n        var line, _i, _len;\n        for (_i = 0, _len = lines.length; _i < _len; _i++) {\n          line = lines[_i];\n          if (line.length === 0) {\n            continue;\n          }\n          if (!pattern1.test(line)) {\n            return false;\n          }\n        }\n        return true;\n      };\n      return function() {\n        var i, line, lines, _i, _j, _ref, _ref1;\n        lines = this.selection().split(\"\\n\");\n        if (match(lines)) {\n          for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {\n            line = lines[i];\n            lines[i] = line.replace(pattern1, \"$1$2\");\n          }\n        } else {\n          for (i = _j = 0, _ref1 = lines.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {\n            line = lines[i];\n            lines[i] = line.replace(pattern2, \"$1* $2\");\n          }\n        }\n        return this.selection(lines.join(\"\\n\"));\n      };\n    })();\n\n    MarkdownEditor.prototype.orderedList = (function() {\n      var match, pattern1, pattern2;\n      pattern1 = /^(\\s*)\\d+\\.\\s*([^\\n]*)$/m;\n      pattern2 = /^(\\s*)([^\\n]*)$/m;\n      match = function(lines) {\n        var line, _i, _len;\n        for (_i = 0, _len = lines.length; _i < _len; _i++) {\n          line = lines[_i];\n          if (line.length === 0) {\n            continue;\n          }\n          if (!pattern1.test(line)) {\n            return false;\n          }\n        }\n        return true;\n      };\n      return function() {\n        var i, line, lines, _i, _j, _ref, _ref1;\n        lines = this.selection().split(\"\\n\");\n        if (match(lines)) {\n          for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {\n            line = lines[i];\n            lines[i] = line.replace(pattern1, \"$1$2\");\n          }\n        } else {\n          for (i = _j = 0, _ref1 = lines.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {\n            line = lines[i];\n            lines[i] = line.replace(pattern2, \"$1\" + (i + 1) + \". $2\");\n          }\n        }\n        return this.selection(lines.join(\"\\n\"));\n      };\n    })();\n\n    return MarkdownEditor;\n\n  })(TextEditor);\n\n  namespace('Jencil.types.markdown.editor.MarkdownEditor', function(exports) {\n    return exports.MarkdownEditor = MarkdownEditor;\n  });\n\n  MarkdownJsViewer = (function(_super) {\n\n    __extends(MarkdownJsViewer, _super);\n\n    function MarkdownJsViewer() {\n      return MarkdownJsViewer.__super__.constructor.apply(this, arguments);\n    }\n\n    MarkdownJsViewer.prototype.update = function(value, force) {\n      var html;\n      html = window.markdown.toHTML(value);\n      return MarkdownJsViewer.__super__.update.call(this, html, force);\n    };\n\n    return MarkdownJsViewer;\n\n  })(TemplateViewer);\n\n  MarkdownProfile = {\n    mainPanelClass: DimainPanel,\n    editorClass: MarkdownEditor,\n    viewerClass: MarkdownJsViewer,\n    defaultVolume: 1,\n    toolbarButtons: ['Undo', 'Redo', 'Separator', ['h1', 'H1'], ['h2', 'H2'], ['h3', 'H3'], ['h4', 'H4'], ['h5', 'H5'], ['h6', 'H6'], 'Separator', ['bold', 'Bold', 'Ctrl+B'], ['italic', 'Italic', 'Ctrl+I'], 'Separator', ['anchorLink', 'Anchor link'], ['image', 'Image'], ['unorderedList', 'Unordered list'], ['orderedList', 'Ordered list'], ['blockquote', 'Blockquote'], ['code', 'Code'], 'Separator', 'Fullscreen'],\n    statusbarButtons: ['Viewer']\n  };\n\n  namespace('Jencil.profiles', function(exports) {\n    return exports.MarkdownProfile = MarkdownProfile;\n  });\n\n}).call(this);\n");
__$coverInitRange("js/Jencil.js", "0:94375");
__$coverInitRange("js/Jencil.js", "16:1122");
__$coverInitRange("js/Jencil.js", "1127:1622");
__$coverInitRange("js/Jencil.js", "1627:1719");
__$coverInitRange("js/Jencil.js", "1724:1819");
__$coverInitRange("js/Jencil.js", "1824:2653");
__$coverInitRange("js/Jencil.js", "2658:2933");
__$coverInitRange("js/Jencil.js", "2938:2978");
__$coverInitRange("js/Jencil.js", "2983:3031");
__$coverInitRange("js/Jencil.js", "3036:3080");
__$coverInitRange("js/Jencil.js", "3085:3129");
__$coverInitRange("js/Jencil.js", "3134:3180");
__$coverInitRange("js/Jencil.js", "3185:3221");
__$coverInitRange("js/Jencil.js", "3226:3319");
__$coverInitRange("js/Jencil.js", "3324:3590");
__$coverInitRange("js/Jencil.js", "3595:3885");
__$coverInitRange("js/Jencil.js", "3890:5451");
__$coverInitRange("js/Jencil.js", "5456:5643");
__$coverInitRange("js/Jencil.js", "5648:12161");
__$coverInitRange("js/Jencil.js", "12260:17613");
__$coverInitRange("js/Jencil.js", "17618:18257");
__$coverInitRange("js/Jencil.js", "18542:19601");
__$coverInitRange("js/Jencil.js", "21026:22773");
__$coverInitRange("js/Jencil.js", "22778:22977");
__$coverInitRange("js/Jencil.js", "22982:23199");
__$coverInitRange("js/Jencil.js", "23204:24695");
__$coverInitRange("js/Jencil.js", "24700:24778");
__$coverInitRange("js/Jencil.js", "24783:24888");
__$coverInitRange("js/Jencil.js", "24893:24995");
__$coverInitRange("js/Jencil.js", "25000:25099");
__$coverInitRange("js/Jencil.js", "25104:25202");
__$coverInitRange("js/Jencil.js", "25207:25309");
__$coverInitRange("js/Jencil.js", "25314:25412");
__$coverInitRange("js/Jencil.js", "25417:25530");
__$coverInitRange("js/Jencil.js", "25535:25645");
__$coverInitRange("js/Jencil.js", "25650:25747");
__$coverInitRange("js/Jencil.js", "25752:25941");
__$coverInitRange("js/Jencil.js", "25946:26024");
__$coverInitRange("js/Jencil.js", "26029:26546");
__$coverInitRange("js/Jencil.js", "26551:26870");
__$coverInitRange("js/Jencil.js", "26875:29373");
__$coverInitRange("js/Jencil.js", "29378:30157");
__$coverInitRange("js/Jencil.js", "30162:30951");
__$coverInitRange("js/Jencil.js", "30956:31204");
__$coverInitRange("js/Jencil.js", "31209:34029");
__$coverInitRange("js/Jencil.js", "34034:37462");
__$coverInitRange("js/Jencil.js", "37467:40807");
__$coverInitRange("js/Jencil.js", "40812:41008");
__$coverInitRange("js/Jencil.js", "41013:42531");
__$coverInitRange("js/Jencil.js", "42536:45951");
__$coverInitRange("js/Jencil.js", "45956:46089");
__$coverInitRange("js/Jencil.js", "46094:46551");
__$coverInitRange("js/Jencil.js", "46556:49174");
__$coverInitRange("js/Jencil.js", "49179:50375");
__$coverInitRange("js/Jencil.js", "50380:50558");
__$coverInitRange("js/Jencil.js", "50563:50907");
__$coverInitRange("js/Jencil.js", "50912:53189");
__$coverInitRange("js/Jencil.js", "53194:53335");
__$coverInitRange("js/Jencil.js", "53340:53589");
__$coverInitRange("js/Jencil.js", "53594:54418");
__$coverInitRange("js/Jencil.js", "54423:55259");
__$coverInitRange("js/Jencil.js", "55264:57000");
__$coverInitRange("js/Jencil.js", "57005:57699");
__$coverInitRange("js/Jencil.js", "57704:58404");
__$coverInitRange("js/Jencil.js", "58409:59214");
__$coverInitRange("js/Jencil.js", "59219:60204");
__$coverInitRange("js/Jencil.js", "60209:61182");
__$coverInitRange("js/Jencil.js", "61187:61895");
__$coverInitRange("js/Jencil.js", "61900:62312");
__$coverInitRange("js/Jencil.js", "62317:65074");
__$coverInitRange("js/Jencil.js", "65079:68182");
__$coverInitRange("js/Jencil.js", "68187:68763");
__$coverInitRange("js/Jencil.js", "68768:68992");
__$coverInitRange("js/Jencil.js", "68997:69233");
__$coverInitRange("js/Jencil.js", "69238:69502");
__$coverInitRange("js/Jencil.js", "69507:70073");
__$coverInitRange("js/Jencil.js", "70078:70821");
__$coverInitRange("js/Jencil.js", "70826:71011");
__$coverInitRange("js/Jencil.js", "71016:73876");
__$coverInitRange("js/Jencil.js", "73881:75557");
__$coverInitRange("js/Jencil.js", "75562:76256");
__$coverInitRange("js/Jencil.js", "76261:79856");
__$coverInitRange("js/Jencil.js", "79861:79888");
__$coverInitRange("js/Jencil.js", "79893:80896");
__$coverInitRange("js/Jencil.js", "80901:81707");
__$coverInitRange("js/Jencil.js", "81712:81811");
__$coverInitRange("js/Jencil.js", "81816:83529");
__$coverInitRange("js/Jencil.js", "83534:86636");
__$coverInitRange("js/Jencil.js", "86641:93049");
__$coverInitRange("js/Jencil.js", "93054:93187");
__$coverInitRange("js/Jencil.js", "93192:93646");
__$coverInitRange("js/Jencil.js", "93651:94247");
__$coverInitRange("js/Jencil.js", "94252:94359");
__$coverInitRange("js/Jencil.js", "873:958");
__$coverInitRange("js/Jencil.js", "960:1004");
__$coverInitRange("js/Jencil.js", "1006:1039");
__$coverInitRange("js/Jencil.js", "1041:1069");
__$coverInitRange("js/Jencil.js", "1071:1105");
__$coverInitRange("js/Jencil.js", "1107:1119");
__$coverInitRange("js/Jencil.js", "899:956");
__$coverInitRange("js/Jencil.js", "978:1002");
__$coverInitRange("js/Jencil.js", "1175:1211");
__$coverInitRange("js/Jencil.js", "1217:1400");
__$coverInitRange("js/Jencil.js", "1406:1418");
__$coverInitRange("js/Jencil.js", "1424:1447");
__$coverInitRange("js/Jencil.js", "1453:1586");
__$coverInitRange("js/Jencil.js", "1592:1617");
__$coverInitRange("js/Jencil.js", "1251:1394");
__$coverInitRange("js/Jencil.js", "1512:1528");
__$coverInitRange("js/Jencil.js", "1536:1580");
__$coverInitRange("js/Jencil.js", "1687:1715");
__$coverInitRange("js/Jencil.js", "1786:1815");
__$coverInitRange("js/Jencil.js", "1878:1897");
__$coverInitRange("js/Jencil.js", "1905:1947");
__$coverInitRange("js/Jencil.js", "1955:1966");
__$coverInitRange("js/Jencil.js", "1974:1997");
__$coverInitRange("js/Jencil.js", "2005:2144");
__$coverInitRange("js/Jencil.js", "2152:2165");
__$coverInitRange("js/Jencil.js", "1930:1939");
__$coverInitRange("js/Jencil.js", "2033:2087");
__$coverInitRange("js/Jencil.js", "2097:2108");
__$coverInitRange("js/Jencil.js", "2118:2136");
__$coverInitRange("js/Jencil.js", "2060:2077");
__$coverInitRange("js/Jencil.js", "2220:2259");
__$coverInitRange("js/Jencil.js", "2312:2317");
__$coverInitRange("js/Jencil.js", "2325:2355");
__$coverInitRange("js/Jencil.js", "2363:2412");
__$coverInitRange("js/Jencil.js", "2457:2488");
__$coverInitRange("js/Jencil.js", "2534:2565");
__$coverInitRange("js/Jencil.js", "2606:2642");
__$coverInitRange("js/Jencil.js", "2699:2928");
__$coverInitRange("js/Jencil.js", "2746:2922");
__$coverInitRange("js/Jencil.js", "2799:2807");
__$coverInitRange("js/Jencil.js", "2817:2876");
__$coverInitRange("js/Jencil.js", "2886:2913");
__$coverInitRange("js/Jencil.js", "3288:3315");
__$coverInitRange("js/Jencil.js", "3365:3397");
__$coverInitRange("js/Jencil.js", "3404:3463");
__$coverInitRange("js/Jencil.js", "3470:3548");
__$coverInitRange("js/Jencil.js", "3555:3581");
__$coverInitRange("js/Jencil.js", "3627:3650");
__$coverInitRange("js/Jencil.js", "3657:3749");
__$coverInitRange("js/Jencil.js", "3756:3852");
__$coverInitRange("js/Jencil.js", "3859:3876");
__$coverInitRange("js/Jencil.js", "3713:3742");
__$coverInitRange("js/Jencil.js", "3816:3845");
__$coverInitRange("js/Jencil.js", "3921:4051");
__$coverInitRange("js/Jencil.js", "4058:4250");
__$coverInitRange("js/Jencil.js", "4257:4455");
__$coverInitRange("js/Jencil.js", "4462:4841");
__$coverInitRange("js/Jencil.js", "4848:5227");
__$coverInitRange("js/Jencil.js", "5234:5323");
__$coverInitRange("js/Jencil.js", "5330:5419");
__$coverInitRange("js/Jencil.js", "5426:5442");
__$coverInitRange("js/Jencil.js", "3960:3989");
__$coverInitRange("js/Jencil.js", "3997:4017");
__$coverInitRange("js/Jencil.js", "4025:4045");
__$coverInitRange("js/Jencil.js", "4120:4212");
__$coverInitRange("js/Jencil.js", "4220:4243");
__$coverInitRange("js/Jencil.js", "4154:4183");
__$coverInitRange("js/Jencil.js", "4193:4204");
__$coverInitRange("js/Jencil.js", "4310:4364");
__$coverInitRange("js/Jencil.js", "4372:4401");
__$coverInitRange("js/Jencil.js", "4409:4429");
__$coverInitRange("js/Jencil.js", "4437:4448");
__$coverInitRange("js/Jencil.js", "4508:4522");
__$coverInitRange("js/Jencil.js", "4530:4581");
__$coverInitRange("js/Jencil.js", "4589:4619");
__$coverInitRange("js/Jencil.js", "4627:4675");
__$coverInitRange("js/Jencil.js", "4683:4727");
__$coverInitRange("js/Jencil.js", "4735:4815");
__$coverInitRange("js/Jencil.js", "4823:4834");
__$coverInitRange("js/Jencil.js", "4561:4573");
__$coverInitRange("js/Jencil.js", "4789:4807");
__$coverInitRange("js/Jencil.js", "4894:4908");
__$coverInitRange("js/Jencil.js", "4916:4967");
__$coverInitRange("js/Jencil.js", "4975:5005");
__$coverInitRange("js/Jencil.js", "5013:5061");
__$coverInitRange("js/Jencil.js", "5069:5113");
__$coverInitRange("js/Jencil.js", "5121:5201");
__$coverInitRange("js/Jencil.js", "5209:5220");
__$coverInitRange("js/Jencil.js", "4947:4959");
__$coverInitRange("js/Jencil.js", "5175:5193");
__$coverInitRange("js/Jencil.js", "5283:5316");
__$coverInitRange("js/Jencil.js", "5379:5412");
__$coverInitRange("js/Jencil.js", "5518:5567");
__$coverInitRange("js/Jencil.js", "5573:5604");
__$coverInitRange("js/Jencil.js", "5610:5639");
__$coverInitRange("js/Jencil.js", "5679:5980");
__$coverInitRange("js/Jencil.js", "5987:6577");
__$coverInitRange("js/Jencil.js", "6584:7160");
__$coverInitRange("js/Jencil.js", "7167:7540");
__$coverInitRange("js/Jencil.js", "7547:7694");
__$coverInitRange("js/Jencil.js", "7701:8029");
__$coverInitRange("js/Jencil.js", "8036:8425");
__$coverInitRange("js/Jencil.js", "8432:8848");
__$coverInitRange("js/Jencil.js", "8855:9031");
__$coverInitRange("js/Jencil.js", "9038:9497");
__$coverInitRange("js/Jencil.js", "9504:9975");
__$coverInitRange("js/Jencil.js", "9982:10716");
__$coverInitRange("js/Jencil.js", "10723:11030");
__$coverInitRange("js/Jencil.js", "11037:11220");
__$coverInitRange("js/Jencil.js", "11227:11650");
__$coverInitRange("js/Jencil.js", "11657:11839");
__$coverInitRange("js/Jencil.js", "11846:12018");
__$coverInitRange("js/Jencil.js", "12025:12129");
__$coverInitRange("js/Jencil.js", "12136:12152");
__$coverInitRange("js/Jencil.js", "5725:5749");
__$coverInitRange("js/Jencil.js", "5757:5779");
__$coverInitRange("js/Jencil.js", "5787:5878");
__$coverInitRange("js/Jencil.js", "5886:5974");
__$coverInitRange("js/Jencil.js", "5834:5870");
__$coverInitRange("js/Jencil.js", "5932:5966");
__$coverInitRange("js/Jencil.js", "6038:6067");
__$coverInitRange("js/Jencil.js", "6075:6528");
__$coverInitRange("js/Jencil.js", "6536:6550");
__$coverInitRange("js/Jencil.js", "6558:6570");
__$coverInitRange("js/Jencil.js", "6122:6167");
__$coverInitRange("js/Jencil.js", "6177:6202");
__$coverInitRange("js/Jencil.js", "6212:6249");
__$coverInitRange("js/Jencil.js", "6259:6295");
__$coverInitRange("js/Jencil.js", "6305:6346");
__$coverInitRange("js/Jencil.js", "6356:6381");
__$coverInitRange("js/Jencil.js", "6450:6481");
__$coverInitRange("js/Jencil.js", "6491:6520");
__$coverInitRange("js/Jencil.js", "6645:6665");
__$coverInitRange("js/Jencil.js", "6673:6707");
__$coverInitRange("js/Jencil.js", "6715:7064");
__$coverInitRange("js/Jencil.js", "7072:7092");
__$coverInitRange("js/Jencil.js", "7100:7134");
__$coverInitRange("js/Jencil.js", "7142:7153");
__$coverInitRange("js/Jencil.js", "6769:6811");
__$coverInitRange("js/Jencil.js", "6870:6908");
__$coverInitRange("js/Jencil.js", "6918:6938");
__$coverInitRange("js/Jencil.js", "6948:6983");
__$coverInitRange("js/Jencil.js", "6993:7032");
__$coverInitRange("js/Jencil.js", "7042:7056");
__$coverInitRange("js/Jencil.js", "7224:7329");
__$coverInitRange("js/Jencil.js", "7337:7405");
__$coverInitRange("js/Jencil.js", "7413:7502");
__$coverInitRange("js/Jencil.js", "7510:7533");
__$coverInitRange("js/Jencil.js", "7281:7295");
__$coverInitRange("js/Jencil.js", "7305:7321");
__$coverInitRange("js/Jencil.js", "7386:7397");
__$coverInitRange("js/Jencil.js", "7461:7494");
__$coverInitRange("js/Jencil.js", "7606:7615");
__$coverInitRange("js/Jencil.js", "7623:7643");
__$coverInitRange("js/Jencil.js", "7651:7687");
__$coverInitRange("js/Jencil.js", "7765:7784");
__$coverInitRange("js/Jencil.js", "7792:7826");
__$coverInitRange("js/Jencil.js", "7834:7876");
__$coverInitRange("js/Jencil.js", "7884:7921");
__$coverInitRange("js/Jencil.js", "7929:7961");
__$coverInitRange("js/Jencil.js", "7969:8003");
__$coverInitRange("js/Jencil.js", "8011:8022");
__$coverInitRange("js/Jencil.js", "8086:8107");
__$coverInitRange("js/Jencil.js", "8115:8399");
__$coverInitRange("js/Jencil.js", "8407:8418");
__$coverInitRange("js/Jencil.js", "8162:8207");
__$coverInitRange("js/Jencil.js", "8217:8234");
__$coverInitRange("js/Jencil.js", "8295:8340");
__$coverInitRange("js/Jencil.js", "8350:8391");
__$coverInitRange("js/Jencil.js", "8500:8525");
__$coverInitRange("js/Jencil.js", "8533:8567");
__$coverInitRange("js/Jencil.js", "8575:8620");
__$coverInitRange("js/Jencil.js", "8628:8651");
__$coverInitRange("js/Jencil.js", "8659:8677");
__$coverInitRange("js/Jencil.js", "8685:8728");
__$coverInitRange("js/Jencil.js", "8736:8752");
__$coverInitRange("js/Jencil.js", "8760:8780");
__$coverInitRange("js/Jencil.js", "8788:8822");
__$coverInitRange("js/Jencil.js", "8830:8841");
__$coverInitRange("js/Jencil.js", "8715:8720");
__$coverInitRange("js/Jencil.js", "8919:8994");
__$coverInitRange("js/Jencil.js", "9002:9024");
__$coverInitRange("js/Jencil.js", "8946:8986");
__$coverInitRange("js/Jencil.js", "9110:9141");
__$coverInitRange("js/Jencil.js", "9149:9183");
__$coverInitRange("js/Jencil.js", "9191:9236");
__$coverInitRange("js/Jencil.js", "9244:9262");
__$coverInitRange("js/Jencil.js", "9270:9300");
__$coverInitRange("js/Jencil.js", "9308:9326");
__$coverInitRange("js/Jencil.js", "9334:9377");
__$coverInitRange("js/Jencil.js", "9385:9401");
__$coverInitRange("js/Jencil.js", "9409:9429");
__$coverInitRange("js/Jencil.js", "9437:9471");
__$coverInitRange("js/Jencil.js", "9479:9490");
__$coverInitRange("js/Jencil.js", "9364:9369");
__$coverInitRange("js/Jencil.js", "9575:9606");
__$coverInitRange("js/Jencil.js", "9614:9648");
__$coverInitRange("js/Jencil.js", "9656:9701");
__$coverInitRange("js/Jencil.js", "9709:9727");
__$coverInitRange("js/Jencil.js", "9735:9765");
__$coverInitRange("js/Jencil.js", "9773:9778");
__$coverInitRange("js/Jencil.js", "9786:9804");
__$coverInitRange("js/Jencil.js", "9812:9855");
__$coverInitRange("js/Jencil.js", "9863:9879");
__$coverInitRange("js/Jencil.js", "9887:9907");
__$coverInitRange("js/Jencil.js", "9915:9949");
__$coverInitRange("js/Jencil.js", "9957:9968");
__$coverInitRange("js/Jencil.js", "9842:9847");
__$coverInitRange("js/Jencil.js", "10054:10090");
__$coverInitRange("js/Jencil.js", "10098:10132");
__$coverInitRange("js/Jencil.js", "10140:10158");
__$coverInitRange("js/Jencil.js", "10166:10620");
__$coverInitRange("js/Jencil.js", "10628:10648");
__$coverInitRange("js/Jencil.js", "10656:10690");
__$coverInitRange("js/Jencil.js", "10698:10709");
__$coverInitRange("js/Jencil.js", "10261:10319");
__$coverInitRange("js/Jencil.js", "10329:10358");
__$coverInitRange("js/Jencil.js", "10383:10428");
__$coverInitRange("js/Jencil.js", "10438:10474");
__$coverInitRange("js/Jencil.js", "10484:10529");
__$coverInitRange("js/Jencil.js", "10539:10586");
__$coverInitRange("js/Jencil.js", "10596:10612");
__$coverInitRange("js/Jencil.js", "10571:10576");
__$coverInitRange("js/Jencil.js", "10777:10792");
__$coverInitRange("js/Jencil.js", "10800:10828");
__$coverInitRange("js/Jencil.js", "10836:10862");
__$coverInitRange("js/Jencil.js", "10870:10910");
__$coverInitRange("js/Jencil.js", "10918:10946");
__$coverInitRange("js/Jencil.js", "10954:11002");
__$coverInitRange("js/Jencil.js", "11010:11023");
__$coverInitRange("js/Jencil.js", "10978:10994");
__$coverInitRange("js/Jencil.js", "11090:11104");
__$coverInitRange("js/Jencil.js", "11112:11164");
__$coverInitRange("js/Jencil.js", "11172:11213");
__$coverInitRange("js/Jencil.js", "11296:11321");
__$coverInitRange("js/Jencil.js", "11329:11363");
__$coverInitRange("js/Jencil.js", "11371:11420");
__$coverInitRange("js/Jencil.js", "11428:11452");
__$coverInitRange("js/Jencil.js", "11460:11479");
__$coverInitRange("js/Jencil.js", "11487:11530");
__$coverInitRange("js/Jencil.js", "11538:11554");
__$coverInitRange("js/Jencil.js", "11562:11582");
__$coverInitRange("js/Jencil.js", "11590:11624");
__$coverInitRange("js/Jencil.js", "11632:11643");
__$coverInitRange("js/Jencil.js", "11517:11522");
__$coverInitRange("js/Jencil.js", "11723:11802");
__$coverInitRange("js/Jencil.js", "11810:11832");
__$coverInitRange("js/Jencil.js", "11752:11794");
__$coverInitRange("js/Jencil.js", "11906:11920");
__$coverInitRange("js/Jencil.js", "11928:11980");
__$coverInitRange("js/Jencil.js", "11988:12011");
__$coverInitRange("js/Jencil.js", "12089:12122");
__$coverInitRange("js/Jencil.js", "12288:12462");
__$coverInitRange("js/Jencil.js", "12468:12651");
__$coverInitRange("js/Jencil.js", "12657:12843");
__$coverInitRange("js/Jencil.js", "12849:13287");
__$coverInitRange("js/Jencil.js", "13293:13735");
__$coverInitRange("js/Jencil.js", "13741:14113");
__$coverInitRange("js/Jencil.js", "14119:14185");
__$coverInitRange("js/Jencil.js", "14191:14259");
__$coverInitRange("js/Jencil.js", "14265:14331");
__$coverInitRange("js/Jencil.js", "14337:14405");
__$coverInitRange("js/Jencil.js", "14411:14789");
__$coverInitRange("js/Jencil.js", "14795:15161");
__$coverInitRange("js/Jencil.js", "15167:15376");
__$coverInitRange("js/Jencil.js", "15382:15589");
__$coverInitRange("js/Jencil.js", "15595:16091");
__$coverInitRange("js/Jencil.js", "16097:16593");
__$coverInitRange("js/Jencil.js", "16599:17585");
__$coverInitRange("js/Jencil.js", "17591:17605");
__$coverInitRange("js/Jencil.js", "12518:12584");
__$coverInitRange("js/Jencil.js", "12592:12644");
__$coverInitRange("js/Jencil.js", "12555:12576");
__$coverInitRange("js/Jencil.js", "12708:12774");
__$coverInitRange("js/Jencil.js", "12782:12836");
__$coverInitRange("js/Jencil.js", "12745:12766");
__$coverInitRange("js/Jencil.js", "12901:12911");
__$coverInitRange("js/Jencil.js", "12919:12985");
__$coverInitRange("js/Jencil.js", "12993:13102");
__$coverInitRange("js/Jencil.js", "13110:13234");
__$coverInitRange("js/Jencil.js", "13242:13280");
__$coverInitRange("js/Jencil.js", "12956:12977");
__$coverInitRange("js/Jencil.js", "13042:13063");
__$coverInitRange("js/Jencil.js", "13073:13094");
__$coverInitRange("js/Jencil.js", "13139:13183");
__$coverInitRange("js/Jencil.js", "13193:13226");
__$coverInitRange("js/Jencil.js", "13346:13356");
__$coverInitRange("js/Jencil.js", "13364:13430");
__$coverInitRange("js/Jencil.js", "13438:13547");
__$coverInitRange("js/Jencil.js", "13555:13681");
__$coverInitRange("js/Jencil.js", "13689:13728");
__$coverInitRange("js/Jencil.js", "13401:13422");
__$coverInitRange("js/Jencil.js", "13487:13508");
__$coverInitRange("js/Jencil.js", "13518:13539");
__$coverInitRange("js/Jencil.js", "13584:13629");
__$coverInitRange("js/Jencil.js", "13639:13673");
__$coverInitRange("js/Jencil.js", "13793:13802");
__$coverInitRange("js/Jencil.js", "13810:13873");
__$coverInitRange("js/Jencil.js", "13881:13911");
__$coverInitRange("js/Jencil.js", "13919:14051");
__$coverInitRange("js/Jencil.js", "14059:14086");
__$coverInitRange("js/Jencil.js", "14094:14106");
__$coverInitRange("js/Jencil.js", "13846:13865");
__$coverInitRange("js/Jencil.js", "14024:14043");
__$coverInitRange("js/Jencil.js", "14149:14178");
__$coverInitRange("js/Jencil.js", "14222:14252");
__$coverInitRange("js/Jencil.js", "14295:14324");
__$coverInitRange("js/Jencil.js", "14368:14398");
__$coverInitRange("js/Jencil.js", "14454:14493");
__$coverInitRange("js/Jencil.js", "14501:14567");
__$coverInitRange("js/Jencil.js", "14575:14632");
__$coverInitRange("js/Jencil.js", "14640:14683");
__$coverInitRange("js/Jencil.js", "14691:14730");
__$coverInitRange("js/Jencil.js", "14738:14782");
__$coverInitRange("js/Jencil.js", "14538:14559");
__$coverInitRange("js/Jencil.js", "14838:14874");
__$coverInitRange("js/Jencil.js", "14882:14948");
__$coverInitRange("js/Jencil.js", "14956:15011");
__$coverInitRange("js/Jencil.js", "15019:15060");
__$coverInitRange("js/Jencil.js", "15068:15105");
__$coverInitRange("js/Jencil.js", "15113:15154");
__$coverInitRange("js/Jencil.js", "14919:14940");
__$coverInitRange("js/Jencil.js", "15203:15213");
__$coverInitRange("js/Jencil.js", "15221:15243");
__$coverInitRange("js/Jencil.js", "15251:15343");
__$coverInitRange("js/Jencil.js", "15351:15369");
__$coverInitRange("js/Jencil.js", "15280:15299");
__$coverInitRange("js/Jencil.js", "15309:15335");
__$coverInitRange("js/Jencil.js", "15418:15428");
__$coverInitRange("js/Jencil.js", "15436:15458");
__$coverInitRange("js/Jencil.js", "15466:15557");
__$coverInitRange("js/Jencil.js", "15565:15582");
__$coverInitRange("js/Jencil.js", "15495:15513");
__$coverInitRange("js/Jencil.js", "15523:15549");
__$coverInitRange("js/Jencil.js", "15646:15664");
__$coverInitRange("js/Jencil.js", "15672:15738");
__$coverInitRange("js/Jencil.js", "15746:15855");
__$coverInitRange("js/Jencil.js", "15863:15894");
__$coverInitRange("js/Jencil.js", "15902:15962");
__$coverInitRange("js/Jencil.js", "15970:16044");
__$coverInitRange("js/Jencil.js", "16052:16084");
__$coverInitRange("js/Jencil.js", "15709:15730");
__$coverInitRange("js/Jencil.js", "15795:15816");
__$coverInitRange("js/Jencil.js", "15826:15847");
__$coverInitRange("js/Jencil.js", "15999:16036");
__$coverInitRange("js/Jencil.js", "16148:16166");
__$coverInitRange("js/Jencil.js", "16174:16240");
__$coverInitRange("js/Jencil.js", "16248:16357");
__$coverInitRange("js/Jencil.js", "16365:16396");
__$coverInitRange("js/Jencil.js", "16404:16464");
__$coverInitRange("js/Jencil.js", "16472:16546");
__$coverInitRange("js/Jencil.js", "16554:16586");
__$coverInitRange("js/Jencil.js", "16211:16232");
__$coverInitRange("js/Jencil.js", "16297:16318");
__$coverInitRange("js/Jencil.js", "16328:16349");
__$coverInitRange("js/Jencil.js", "16501:16538");
__$coverInitRange("js/Jencil.js", "16637:16708");
__$coverInitRange("js/Jencil.js", "16716:16760");
__$coverInitRange("js/Jencil.js", "16768:16814");
__$coverInitRange("js/Jencil.js", "16822:16865");
__$coverInitRange("js/Jencil.js", "16873:16918");
__$coverInitRange("js/Jencil.js", "16926:16959");
__$coverInitRange("js/Jencil.js", "16967:17002");
__$coverInitRange("js/Jencil.js", "17010:17053");
__$coverInitRange("js/Jencil.js", "17061:17106");
__$coverInitRange("js/Jencil.js", "17114:17135");
__$coverInitRange("js/Jencil.js", "17143:17172");
__$coverInitRange("js/Jencil.js", "17180:17211");
__$coverInitRange("js/Jencil.js", "17219:17248");
__$coverInitRange("js/Jencil.js", "17256:17287");
__$coverInitRange("js/Jencil.js", "17295:17324");
__$coverInitRange("js/Jencil.js", "17332:17361");
__$coverInitRange("js/Jencil.js", "17369:17400");
__$coverInitRange("js/Jencil.js", "17408:17439");
__$coverInitRange("js/Jencil.js", "17447:17478");
__$coverInitRange("js/Jencil.js", "17486:17517");
__$coverInitRange("js/Jencil.js", "17525:17554");
__$coverInitRange("js/Jencil.js", "17562:17578");
__$coverInitRange("js/Jencil.js", "16684:16700");
__$coverInitRange("js/Jencil.js", "17659:17670");
__$coverInitRange("js/Jencil.js", "17676:17711");
__$coverInitRange("js/Jencil.js", "17717:17893");
__$coverInitRange("js/Jencil.js", "17899:17996");
__$coverInitRange("js/Jencil.js", "18002:18153");
__$coverInitRange("js/Jencil.js", "18159:18232");
__$coverInitRange("js/Jencil.js", "18238:18252");
__$coverInitRange("js/Jencil.js", "17931:17948");
__$coverInitRange("js/Jencil.js", "17956:17970");
__$coverInitRange("js/Jencil.js", "17978:17989");
__$coverInitRange("js/Jencil.js", "18039:18078");
__$coverInitRange("js/Jencil.js", "18086:18127");
__$coverInitRange("js/Jencil.js", "18135:18146");
__$coverInitRange("js/Jencil.js", "18192:18206");
__$coverInitRange("js/Jencil.js", "18214:18225");
__$coverInitRange("js/Jencil.js", "18570:18593");
__$coverInitRange("js/Jencil.js", "18599:18660");
__$coverInitRange("js/Jencil.js", "18666:18830");
__$coverInitRange("js/Jencil.js", "18836:19593");
__$coverInitRange("js/Jencil.js", "18624:18653");
__$coverInitRange("js/Jencil.js", "18869:18900");
__$coverInitRange("js/Jencil.js", "18908:18956");
__$coverInitRange("js/Jencil.js", "18964:18981");
__$coverInitRange("js/Jencil.js", "18989:19029");
__$coverInitRange("js/Jencil.js", "19037:19553");
__$coverInitRange("js/Jencil.js", "19561:19567");
__$coverInitRange("js/Jencil.js", "19575:19586");
__$coverInitRange("js/Jencil.js", "19065:19077");
__$coverInitRange("js/Jencil.js", "19087:19112");
__$coverInitRange("js/Jencil.js", "19122:19197");
__$coverInitRange("js/Jencil.js", "19207:19241");
__$coverInitRange("js/Jencil.js", "19251:19281");
__$coverInitRange("js/Jencil.js", "19291:19544");
__$coverInitRange("js/Jencil.js", "19333:19359");
__$coverInitRange("js/Jencil.js", "19388:19439");
__$coverInitRange("js/Jencil.js", "19451:19534");
__$coverInitRange("js/Jencil.js", "21061:21075");
__$coverInitRange("js/Jencil.js", "21081:21776");
__$coverInitRange("js/Jencil.js", "21782:22765");
__$coverInitRange("js/Jencil.js", "21114:21159");
__$coverInitRange("js/Jencil.js", "21167:21211");
__$coverInitRange("js/Jencil.js", "21219:21247");
__$coverInitRange("js/Jencil.js", "21255:21347");
__$coverInitRange("js/Jencil.js", "21355:21521");
__$coverInitRange("js/Jencil.js", "21529:21640");
__$coverInitRange("js/Jencil.js", "21648:21667");
__$coverInitRange("js/Jencil.js", "21675:21703");
__$coverInitRange("js/Jencil.js", "21711:21729");
__$coverInitRange("js/Jencil.js", "21737:21749");
__$coverInitRange("js/Jencil.js", "21757:21769");
__$coverInitRange("js/Jencil.js", "21197:21203");
__$coverInitRange("js/Jencil.js", "21386:21430");
__$coverInitRange("js/Jencil.js", "21440:21462");
__$coverInitRange("js/Jencil.js", "21472:21513");
__$coverInitRange("js/Jencil.js", "21583:21632");
__$coverInitRange("js/Jencil.js", "21827:21902");
__$coverInitRange("js/Jencil.js", "21910:22024");
__$coverInitRange("js/Jencil.js", "22032:22120");
__$coverInitRange("js/Jencil.js", "22128:22255");
__$coverInitRange("js/Jencil.js", "22263:22392");
__$coverInitRange("js/Jencil.js", "22400:22536");
__$coverInitRange("js/Jencil.js", "22544:22715");
__$coverInitRange("js/Jencil.js", "22723:22758");
__$coverInitRange("js/Jencil.js", "21872:21894");
__$coverInitRange("js/Jencil.js", "21955:22016");
__$coverInitRange("js/Jencil.js", "22076:22111");
__$coverInitRange("js/Jencil.js", "22178:22221");
__$coverInitRange("js/Jencil.js", "22231:22246");
__$coverInitRange("js/Jencil.js", "22314:22358");
__$coverInitRange("js/Jencil.js", "22368:22383");
__$coverInitRange("js/Jencil.js", "22427:22528");
__$coverInitRange("js/Jencil.js", "22483:22517");
__$coverInitRange("js/Jencil.js", "22572:22707");
__$coverInitRange("js/Jencil.js", "22645:22696");
__$coverInitRange("js/Jencil.js", "22809:22905");
__$coverInitRange("js/Jencil.js", "22843:22898");
__$coverInitRange("js/Jencil.js", "22922:22973");
__$coverInitRange("js/Jencil.js", "22956:22966");
__$coverInitRange("js/Jencil.js", "23237:24312");
__$coverInitRange("js/Jencil.js", "24319:24430");
__$coverInitRange("js/Jencil.js", "24437:24548");
__$coverInitRange("js/Jencil.js", "24555:24666");
__$coverInitRange("js/Jencil.js", "24673:24686");
__$coverInitRange("js/Jencil.js", "23280:23320");
__$coverInitRange("js/Jencil.js", "23328:23789");
__$coverInitRange("js/Jencil.js", "23797:23850");
__$coverInitRange("js/Jencil.js", "23858:23888");
__$coverInitRange("js/Jencil.js", "23896:23928");
__$coverInitRange("js/Jencil.js", "23936:24015");
__$coverInitRange("js/Jencil.js", "24023:24096");
__$coverInitRange("js/Jencil.js", "24104:24142");
__$coverInitRange("js/Jencil.js", "24150:24221");
__$coverInitRange("js/Jencil.js", "24229:24248");
__$coverInitRange("js/Jencil.js", "24256:24277");
__$coverInitRange("js/Jencil.js", "24285:24306");
__$coverInitRange("js/Jencil.js", "23985:24006");
__$coverInitRange("js/Jencil.js", "24364:24423");
__$coverInitRange("js/Jencil.js", "24482:24541");
__$coverInitRange("js/Jencil.js", "24600:24659");
__$coverInitRange("js/Jencil.js", "24738:24773");
__$coverInitRange("js/Jencil.js", "24836:24882");
__$coverInitRange("js/Jencil.js", "24953:24989");
__$coverInitRange("js/Jencil.js", "25059:25093");
__$coverInitRange("js/Jencil.js", "25164:25196");
__$coverInitRange("js/Jencil.js", "25267:25303");
__$coverInitRange("js/Jencil.js", "25374:25406");
__$coverInitRange("js/Jencil.js", "25478:25524");
__$coverInitRange("js/Jencil.js", "25593:25639");
__$coverInitRange("js/Jencil.js", "25705:25741");
__$coverInitRange("js/Jencil.js", "25807:25856");
__$coverInitRange("js/Jencil.js", "25862:25893");
__$coverInitRange("js/Jencil.js", "25899:25935");
__$coverInitRange("js/Jencil.js", "25990:26018");
__$coverInitRange("js/Jencil.js", "26057:26379");
__$coverInitRange("js/Jencil.js", "26386:26447");
__$coverInitRange("js/Jencil.js", "26454:26517");
__$coverInitRange("js/Jencil.js", "26524:26537");
__$coverInitRange("js/Jencil.js", "26106:26122");
__$coverInitRange("js/Jencil.js", "26130:26188");
__$coverInitRange("js/Jencil.js", "26196:26329");
__$coverInitRange("js/Jencil.js", "26337:26373");
__$coverInitRange("js/Jencil.js", "26162:26180");
__$coverInitRange("js/Jencil.js", "26238:26261");
__$coverInitRange("js/Jencil.js", "26286:26321");
__$coverInitRange("js/Jencil.js", "26429:26440");
__$coverInitRange("js/Jencil.js", "26499:26510");
__$coverInitRange("js/Jencil.js", "26584:26608");
__$coverInitRange("js/Jencil.js", "26615:26836");
__$coverInitRange("js/Jencil.js", "26843:26855");
__$coverInitRange("js/Jencil.js", "26663:26721");
__$coverInitRange("js/Jencil.js", "26729:26792");
__$coverInitRange("js/Jencil.js", "26800:26830");
__$coverInitRange("js/Jencil.js", "26695:26713");
__$coverInitRange("js/Jencil.js", "26916:26948");
__$coverInitRange("js/Jencil.js", "26955:28127");
__$coverInitRange("js/Jencil.js", "28134:28264");
__$coverInitRange("js/Jencil.js", "28271:29332");
__$coverInitRange("js/Jencil.js", "29339:29359");
__$coverInitRange("js/Jencil.js", "27012:27048");
__$coverInitRange("js/Jencil.js", "27056:27070");
__$coverInitRange("js/Jencil.js", "27078:27092");
__$coverInitRange("js/Jencil.js", "27100:27124");
__$coverInitRange("js/Jencil.js", "27132:27184");
__$coverInitRange("js/Jencil.js", "27192:27225");
__$coverInitRange("js/Jencil.js", "27233:27270");
__$coverInitRange("js/Jencil.js", "27278:27320");
__$coverInitRange("js/Jencil.js", "27328:27365");
__$coverInitRange("js/Jencil.js", "27373:27508");
__$coverInitRange("js/Jencil.js", "27516:27650");
__$coverInitRange("js/Jencil.js", "27658:27782");
__$coverInitRange("js/Jencil.js", "27790:27810");
__$coverInitRange("js/Jencil.js", "27818:27838");
__$coverInitRange("js/Jencil.js", "27846:27970");
__$coverInitRange("js/Jencil.js", "27978:27998");
__$coverInitRange("js/Jencil.js", "28006:28026");
__$coverInitRange("js/Jencil.js", "28034:28121");
__$coverInitRange("js/Jencil.js", "27409:27499");
__$coverInitRange("js/Jencil.js", "27455:27489");
__$coverInitRange("js/Jencil.js", "27552:27641");
__$coverInitRange("js/Jencil.js", "27597:27631");
__$coverInitRange("js/Jencil.js", "27720:27773");
__$coverInitRange("js/Jencil.js", "27908:27961");
__$coverInitRange("js/Jencil.js", "28086:28111");
__$coverInitRange("js/Jencil.js", "28184:28204");
__$coverInitRange("js/Jencil.js", "28212:28227");
__$coverInitRange("js/Jencil.js", "28235:28257");
__$coverInitRange("js/Jencil.js", "28356:28422");
__$coverInitRange("js/Jencil.js", "28430:28484");
__$coverInitRange("js/Jencil.js", "28492:28523");
__$coverInitRange("js/Jencil.js", "28531:28550");
__$coverInitRange("js/Jencil.js", "28558:28885");
__$coverInitRange("js/Jencil.js", "28893:28924");
__$coverInitRange("js/Jencil.js", "28932:29088");
__$coverInitRange("js/Jencil.js", "29096:29325");
__$coverInitRange("js/Jencil.js", "28470:28476");
__$coverInitRange("js/Jencil.js", "28600:28608");
__$coverInitRange("js/Jencil.js", "28618:28656");
__$coverInitRange("js/Jencil.js", "28666:28693");
__$coverInitRange("js/Jencil.js", "28718:28784");
__$coverInitRange("js/Jencil.js", "28794:28841");
__$coverInitRange("js/Jencil.js", "28851:28877");
__$coverInitRange("js/Jencil.js", "28822:28831");
__$coverInitRange("js/Jencil.js", "28968:29000");
__$coverInitRange("js/Jencil.js", "29010:29079");
__$coverInitRange("js/Jencil.js", "29234:29269");
__$coverInitRange("js/Jencil.js", "29419:29451");
__$coverInitRange("js/Jencil.js", "29458:29801");
__$coverInitRange("js/Jencil.js", "29808:30108");
__$coverInitRange("js/Jencil.js", "30115:30135");
__$coverInitRange("js/Jencil.js", "29520:29532");
__$coverInitRange("js/Jencil.js", "29540:29604");
__$coverInitRange("js/Jencil.js", "29612:29674");
__$coverInitRange("js/Jencil.js", "29682:29754");
__$coverInitRange("js/Jencil.js", "29762:29795");
__$coverInitRange("js/Jencil.js", "29577:29596");
__$coverInitRange("js/Jencil.js", "29860:29917");
__$coverInitRange("js/Jencil.js", "29925:29982");
__$coverInitRange("js/Jencil.js", "29990:30052");
__$coverInitRange("js/Jencil.js", "30060:30082");
__$coverInitRange("js/Jencil.js", "30090:30101");
__$coverInitRange("js/Jencil.js", "30205:30239");
__$coverInitRange("js/Jencil.js", "30246:30597");
__$coverInitRange("js/Jencil.js", "30604:30900");
__$coverInitRange("js/Jencil.js", "30907:30929");
__$coverInitRange("js/Jencil.js", "30310:30322");
__$coverInitRange("js/Jencil.js", "30330:30394");
__$coverInitRange("js/Jencil.js", "30402:30466");
__$coverInitRange("js/Jencil.js", "30474:30548");
__$coverInitRange("js/Jencil.js", "30556:30591");
__$coverInitRange("js/Jencil.js", "30367:30386");
__$coverInitRange("js/Jencil.js", "30658:30713");
__$coverInitRange("js/Jencil.js", "30721:30776");
__$coverInitRange("js/Jencil.js", "30784:30844");
__$coverInitRange("js/Jencil.js", "30852:30874");
__$coverInitRange("js/Jencil.js", "30882:30893");
__$coverInitRange("js/Jencil.js", "31008:31031");
__$coverInitRange("js/Jencil.js", "31037:31058");
__$coverInitRange("js/Jencil.js", "31064:31101");
__$coverInitRange("js/Jencil.js", "31107:31144");
__$coverInitRange("js/Jencil.js", "31150:31198");
__$coverInitRange("js/Jencil.js", "31245:31272");
__$coverInitRange("js/Jencil.js", "31279:32925");
__$coverInitRange("js/Jencil.js", "32932:33050");
__$coverInitRange("js/Jencil.js", "33057:33339");
__$coverInitRange("js/Jencil.js", "33346:33681");
__$coverInitRange("js/Jencil.js", "33688:33992");
__$coverInitRange("js/Jencil.js", "33999:34014");
__$coverInitRange("js/Jencil.js", "31336:31380");
__$coverInitRange("js/Jencil.js", "31388:31402");
__$coverInitRange("js/Jencil.js", "31410:31424");
__$coverInitRange("js/Jencil.js", "31432:31496");
__$coverInitRange("js/Jencil.js", "31504:31551");
__$coverInitRange("js/Jencil.js", "31559:31592");
__$coverInitRange("js/Jencil.js", "31600:31633");
__$coverInitRange("js/Jencil.js", "31641:32003");
__$coverInitRange("js/Jencil.js", "32011:32465");
__$coverInitRange("js/Jencil.js", "32473:32919");
__$coverInitRange("js/Jencil.js", "31675:31690");
__$coverInitRange("js/Jencil.js", "31700:31718");
__$coverInitRange("js/Jencil.js", "31728:31804");
__$coverInitRange("js/Jencil.js", "31814:31892");
__$coverInitRange("js/Jencil.js", "31902:31921");
__$coverInitRange("js/Jencil.js", "31931:31959");
__$coverInitRange("js/Jencil.js", "31969:31994");
__$coverInitRange("js/Jencil.js", "31780:31794");
__$coverInitRange("js/Jencil.js", "31867:31882");
__$coverInitRange("js/Jencil.js", "32043:32067");
__$coverInitRange("js/Jencil.js", "32077:32096");
__$coverInitRange("js/Jencil.js", "32106:32144");
__$coverInitRange("js/Jencil.js", "32154:32188");
__$coverInitRange("js/Jencil.js", "32198:32270");
__$coverInitRange("js/Jencil.js", "32280:32354");
__$coverInitRange("js/Jencil.js", "32364:32383");
__$coverInitRange("js/Jencil.js", "32393:32421");
__$coverInitRange("js/Jencil.js", "32431:32456");
__$coverInitRange("js/Jencil.js", "32250:32260");
__$coverInitRange("js/Jencil.js", "32333:32344");
__$coverInitRange("js/Jencil.js", "32518:32542");
__$coverInitRange("js/Jencil.js", "32552:32571");
__$coverInitRange("js/Jencil.js", "32581:32609");
__$coverInitRange("js/Jencil.js", "32619:32643");
__$coverInitRange("js/Jencil.js", "32653:32724");
__$coverInitRange("js/Jencil.js", "32734:32807");
__$coverInitRange("js/Jencil.js", "32817:32836");
__$coverInitRange("js/Jencil.js", "32846:32874");
__$coverInitRange("js/Jencil.js", "32884:32909");
__$coverInitRange("js/Jencil.js", "32705:32714");
__$coverInitRange("js/Jencil.js", "32787:32797");
__$coverInitRange("js/Jencil.js", "32977:33024");
__$coverInitRange("js/Jencil.js", "33032:33043");
__$coverInitRange("js/Jencil.js", "33115:33163");
__$coverInitRange("js/Jencil.js", "33171:33305");
__$coverInitRange("js/Jencil.js", "33313:33332");
__$coverInitRange("js/Jencil.js", "33143:33155");
__$coverInitRange("js/Jencil.js", "33200:33220");
__$coverInitRange("js/Jencil.js", "33230:33276");
__$coverInitRange("js/Jencil.js", "33286:33297");
__$coverInitRange("js/Jencil.js", "33253:33266");
__$coverInitRange("js/Jencil.js", "33403:33425");
__$coverInitRange("js/Jencil.js", "33433:33481");
__$coverInitRange("js/Jencil.js", "33489:33519");
__$coverInitRange("js/Jencil.js", "33527:33633");
__$coverInitRange("js/Jencil.js", "33641:33674");
__$coverInitRange("js/Jencil.js", "33461:33473");
__$coverInitRange("js/Jencil.js", "33556:33583");
__$coverInitRange("js/Jencil.js", "33593:33625");
__$coverInitRange("js/Jencil.js", "33747:33769");
__$coverInitRange("js/Jencil.js", "33777:33803");
__$coverInitRange("js/Jencil.js", "33811:33837");
__$coverInitRange("js/Jencil.js", "33845:33901");
__$coverInitRange("js/Jencil.js", "33909:33965");
__$coverInitRange("js/Jencil.js", "33973:33985");
__$coverInitRange("js/Jencil.js", "33877:33893");
__$coverInitRange("js/Jencil.js", "33941:33957");
__$coverInitRange("js/Jencil.js", "34078:34113");
__$coverInitRange("js/Jencil.js", "34120:34742");
__$coverInitRange("js/Jencil.js", "34749:35012");
__$coverInitRange("js/Jencil.js", "35019:35114");
__$coverInitRange("js/Jencil.js", "35121:35531");
__$coverInitRange("js/Jencil.js", "35538:36047");
__$coverInitRange("js/Jencil.js", "36054:37415");
__$coverInitRange("js/Jencil.js", "37422:37445");
__$coverInitRange("js/Jencil.js", "34185:34200");
__$coverInitRange("js/Jencil.js", "34208:34288");
__$coverInitRange("js/Jencil.js", "34296:34329");
__$coverInitRange("js/Jencil.js", "34337:34370");
__$coverInitRange("js/Jencil.js", "34378:34412");
__$coverInitRange("js/Jencil.js", "34420:34475");
__$coverInitRange("js/Jencil.js", "34483:34538");
__$coverInitRange("js/Jencil.js", "34546:34636");
__$coverInitRange("js/Jencil.js", "34644:34736");
__$coverInitRange("js/Jencil.js", "34595:34628");
__$coverInitRange("js/Jencil.js", "34694:34728");
__$coverInitRange("js/Jencil.js", "34808:34825");
__$coverInitRange("js/Jencil.js", "34833:34900");
__$coverInitRange("js/Jencil.js", "34908:34932");
__$coverInitRange("js/Jencil.js", "34940:34973");
__$coverInitRange("js/Jencil.js", "34981:35005");
__$coverInitRange("js/Jencil.js", "35078:35107");
__$coverInitRange("js/Jencil.js", "35178:35188");
__$coverInitRange("js/Jencil.js", "35196:35265");
__$coverInitRange("js/Jencil.js", "35273:35305");
__$coverInitRange("js/Jencil.js", "35313:35413");
__$coverInitRange("js/Jencil.js", "35421:35496");
__$coverInitRange("js/Jencil.js", "35504:35524");
__$coverInitRange("js/Jencil.js", "35339:35405");
__$coverInitRange("js/Jencil.js", "35465:35488");
__$coverInitRange("js/Jencil.js", "35595:35617");
__$coverInitRange("js/Jencil.js", "35625:35655");
__$coverInitRange("js/Jencil.js", "35663:35695");
__$coverInitRange("js/Jencil.js", "35703:35781");
__$coverInitRange("js/Jencil.js", "35789:35858");
__$coverInitRange("js/Jencil.js", "35866:35920");
__$coverInitRange("js/Jencil.js", "35928:36003");
__$coverInitRange("js/Jencil.js", "36011:36040");
__$coverInitRange("js/Jencil.js", "35729:35773");
__$coverInitRange("js/Jencil.js", "35892:35912");
__$coverInitRange("js/Jencil.js", "35972:35995");
__$coverInitRange("js/Jencil.js", "36109:36150");
__$coverInitRange("js/Jencil.js", "36158:36178");
__$coverInitRange("js/Jencil.js", "36186:36216");
__$coverInitRange("js/Jencil.js", "36224:36281");
__$coverInitRange("js/Jencil.js", "36289:36361");
__$coverInitRange("js/Jencil.js", "36369:37270");
__$coverInitRange("js/Jencil.js", "37278:37295");
__$coverInitRange("js/Jencil.js", "37303:37320");
__$coverInitRange("js/Jencil.js", "37328:37389");
__$coverInitRange("js/Jencil.js", "37397:37408");
__$coverInitRange("js/Jencil.js", "36398:36480");
__$coverInitRange("js/Jencil.js", "36490:36573");
__$coverInitRange("js/Jencil.js", "36583:36628");
__$coverInitRange("js/Jencil.js", "36638:36661");
__$coverInitRange("js/Jencil.js", "36447:36470");
__$coverInitRange("js/Jencil.js", "36540:36563");
__$coverInitRange("js/Jencil.js", "36705:36788");
__$coverInitRange("js/Jencil.js", "36798:36880");
__$coverInitRange("js/Jencil.js", "36890:36935");
__$coverInitRange("js/Jencil.js", "36945:36977");
__$coverInitRange("js/Jencil.js", "36755:36778");
__$coverInitRange("js/Jencil.js", "36847:36870");
__$coverInitRange("js/Jencil.js", "37002:37085");
__$coverInitRange("js/Jencil.js", "37095:37178");
__$coverInitRange("js/Jencil.js", "37188:37220");
__$coverInitRange("js/Jencil.js", "37230:37262");
__$coverInitRange("js/Jencil.js", "37052:37075");
__$coverInitRange("js/Jencil.js", "37145:37168");
__$coverInitRange("js/Jencil.js", "37513:37550");
__$coverInitRange("js/Jencil.js", "37557:38059");
__$coverInitRange("js/Jencil.js", "38066:38331");
__$coverInitRange("js/Jencil.js", "38338:38436");
__$coverInitRange("js/Jencil.js", "38443:38859");
__$coverInitRange("js/Jencil.js", "38866:39381");
__$coverInitRange("js/Jencil.js", "39388:40758");
__$coverInitRange("js/Jencil.js", "40765:40790");
__$coverInitRange("js/Jencil.js", "37624:37639");
__$coverInitRange("js/Jencil.js", "37647:37729");
__$coverInitRange("js/Jencil.js", "37737:37772");
__$coverInitRange("js/Jencil.js", "37780:37812");
__$coverInitRange("js/Jencil.js", "37820:37855");
__$coverInitRange("js/Jencil.js", "37863:37953");
__$coverInitRange("js/Jencil.js", "37961:38053");
__$coverInitRange("js/Jencil.js", "37912:37945");
__$coverInitRange("js/Jencil.js", "38011:38045");
__$coverInitRange("js/Jencil.js", "38127:38144");
__$coverInitRange("js/Jencil.js", "38152:38219");
__$coverInitRange("js/Jencil.js", "38227:38251");
__$coverInitRange("js/Jencil.js", "38259:38292");
__$coverInitRange("js/Jencil.js", "38300:38324");
__$coverInitRange("js/Jencil.js", "38399:38429");
__$coverInitRange("js/Jencil.js", "38502:38512");
__$coverInitRange("js/Jencil.js", "38520:38591");
__$coverInitRange("js/Jencil.js", "38599:38632");
__$coverInitRange("js/Jencil.js", "38640:38741");
__$coverInitRange("js/Jencil.js", "38749:38824");
__$coverInitRange("js/Jencil.js", "38832:38852");
__$coverInitRange("js/Jencil.js", "38666:38733");
__$coverInitRange("js/Jencil.js", "38793:38816");
__$coverInitRange("js/Jencil.js", "38925:38947");
__$coverInitRange("js/Jencil.js", "38955:38985");
__$coverInitRange("js/Jencil.js", "38993:39026");
__$coverInitRange("js/Jencil.js", "39034:39113");
__$coverInitRange("js/Jencil.js", "39121:39192");
__$coverInitRange("js/Jencil.js", "39200:39254");
__$coverInitRange("js/Jencil.js", "39262:39337");
__$coverInitRange("js/Jencil.js", "39345:39374");
__$coverInitRange("js/Jencil.js", "39060:39105");
__$coverInitRange("js/Jencil.js", "39226:39246");
__$coverInitRange("js/Jencil.js", "39306:39329");
__$coverInitRange("js/Jencil.js", "39445:39486");
__$coverInitRange("js/Jencil.js", "39494:39514");
__$coverInitRange("js/Jencil.js", "39522:39552");
__$coverInitRange("js/Jencil.js", "39560:39618");
__$coverInitRange("js/Jencil.js", "39626:39699");
__$coverInitRange("js/Jencil.js", "39707:40612");
__$coverInitRange("js/Jencil.js", "40620:40637");
__$coverInitRange("js/Jencil.js", "40645:40662");
__$coverInitRange("js/Jencil.js", "40670:40732");
__$coverInitRange("js/Jencil.js", "40740:40751");
__$coverInitRange("js/Jencil.js", "39736:39818");
__$coverInitRange("js/Jencil.js", "39828:39911");
__$coverInitRange("js/Jencil.js", "39921:39967");
__$coverInitRange("js/Jencil.js", "39977:40000");
__$coverInitRange("js/Jencil.js", "39785:39808");
__$coverInitRange("js/Jencil.js", "39878:39901");
__$coverInitRange("js/Jencil.js", "40044:40127");
__$coverInitRange("js/Jencil.js", "40137:40219");
__$coverInitRange("js/Jencil.js", "40229:40275");
__$coverInitRange("js/Jencil.js", "40285:40317");
__$coverInitRange("js/Jencil.js", "40094:40117");
__$coverInitRange("js/Jencil.js", "40186:40209");
__$coverInitRange("js/Jencil.js", "40342:40425");
__$coverInitRange("js/Jencil.js", "40435:40518");
__$coverInitRange("js/Jencil.js", "40528:40561");
__$coverInitRange("js/Jencil.js", "40571:40604");
__$coverInitRange("js/Jencil.js", "40392:40415");
__$coverInitRange("js/Jencil.js", "40485:40508");
__$coverInitRange("js/Jencil.js", "40866:40893");
__$coverInitRange("js/Jencil.js", "40899:40942");
__$coverInitRange("js/Jencil.js", "40948:41002");
__$coverInitRange("js/Jencil.js", "41051:41080");
__$coverInitRange("js/Jencil.js", "41087:41353");
__$coverInitRange("js/Jencil.js", "41360:41456");
__$coverInitRange("js/Jencil.js", "41463:41841");
__$coverInitRange("js/Jencil.js", "41848:41878");
__$coverInitRange("js/Jencil.js", "41885:41915");
__$coverInitRange("js/Jencil.js", "41922:41952");
__$coverInitRange("js/Jencil.js", "41959:41989");
__$coverInitRange("js/Jencil.js", "41996:42026");
__$coverInitRange("js/Jencil.js", "42033:42063");
__$coverInitRange("js/Jencil.js", "42070:42102");
__$coverInitRange("js/Jencil.js", "42109:42143");
__$coverInitRange("js/Jencil.js", "42150:42187");
__$coverInitRange("js/Jencil.js", "42194:42228");
__$coverInitRange("js/Jencil.js", "42235:42274");
__$coverInitRange("js/Jencil.js", "42281:42318");
__$coverInitRange("js/Jencil.js", "42325:42359");
__$coverInitRange("js/Jencil.js", "42366:42399");
__$coverInitRange("js/Jencil.js", "42406:42447");
__$coverInitRange("js/Jencil.js", "42454:42493");
__$coverInitRange("js/Jencil.js", "42500:42517");
__$coverInitRange("js/Jencil.js", "41140:41198");
__$coverInitRange("js/Jencil.js", "41206:41274");
__$coverInitRange("js/Jencil.js", "41282:41313");
__$coverInitRange("js/Jencil.js", "41321:41347");
__$coverInitRange("js/Jencil.js", "41172:41190");
__$coverInitRange("js/Jencil.js", "41411:41449");
__$coverInitRange("js/Jencil.js", "41520:41538");
__$coverInitRange("js/Jencil.js", "41546:41643");
__$coverInitRange("js/Jencil.js", "41651:41679");
__$coverInitRange("js/Jencil.js", "41687:41815");
__$coverInitRange("js/Jencil.js", "41823:41834");
__$coverInitRange("js/Jencil.js", "41578:41614");
__$coverInitRange("js/Jencil.js", "41624:41635");
__$coverInitRange("js/Jencil.js", "41747:41766");
__$coverInitRange("js/Jencil.js", "41776:41807");
__$coverInitRange("js/Jencil.js", "42574:42603");
__$coverInitRange("js/Jencil.js", "42610:43667");
__$coverInitRange("js/Jencil.js", "43674:43871");
__$coverInitRange("js/Jencil.js", "43878:43973");
__$coverInitRange("js/Jencil.js", "43980:44060");
__$coverInitRange("js/Jencil.js", "44067:44158");
__$coverInitRange("js/Jencil.js", "44165:44342");
__$coverInitRange("js/Jencil.js", "44349:44589");
__$coverInitRange("js/Jencil.js", "44596:44940");
__$coverInitRange("js/Jencil.js", "44947:45258");
__$coverInitRange("js/Jencil.js", "45265:45584");
__$coverInitRange("js/Jencil.js", "45591:45908");
__$coverInitRange("js/Jencil.js", "45915:45932");
__$coverInitRange("js/Jencil.js", "42663:42679");
__$coverInitRange("js/Jencil.js", "42687:42745");
__$coverInitRange("js/Jencil.js", "42753:42821");
__$coverInitRange("js/Jencil.js", "42829:43023");
__$coverInitRange("js/Jencil.js", "43031:43069");
__$coverInitRange("js/Jencil.js", "43077:43229");
__$coverInitRange("js/Jencil.js", "43237:43401");
__$coverInitRange("js/Jencil.js", "43409:43454");
__$coverInitRange("js/Jencil.js", "43462:43555");
__$coverInitRange("js/Jencil.js", "43563:43661");
__$coverInitRange("js/Jencil.js", "42719:42737");
__$coverInitRange("js/Jencil.js", "43127:43175");
__$coverInitRange("js/Jencil.js", "43185:43219");
__$coverInitRange("js/Jencil.js", "43159:43165");
__$coverInitRange("js/Jencil.js", "43310:43393");
__$coverInitRange("js/Jencil.js", "43513:43547");
__$coverInitRange("js/Jencil.js", "43630:43651");
__$coverInitRange("js/Jencil.js", "43725:43830");
__$coverInitRange("js/Jencil.js", "43838:43864");
__$coverInitRange("js/Jencil.js", "43754:43778");
__$coverInitRange("js/Jencil.js", "43788:43801");
__$coverInitRange("js/Jencil.js", "43811:43822");
__$coverInitRange("js/Jencil.js", "43926:43947");
__$coverInitRange("js/Jencil.js", "43955:43966");
__$coverInitRange("js/Jencil.js", "44036:44053");
__$coverInitRange("js/Jencil.js", "44127:44151");
__$coverInitRange("js/Jencil.js", "44214:44260");
__$coverInitRange("js/Jencil.js", "44268:44316");
__$coverInitRange("js/Jencil.js", "44324:44335");
__$coverInitRange("js/Jencil.js", "44425:44434");
__$coverInitRange("js/Jencil.js", "44442:44481");
__$coverInitRange("js/Jencil.js", "44489:44582");
__$coverInitRange("js/Jencil.js", "44526:44574");
__$coverInitRange("js/Jencil.js", "44666:44731");
__$coverInitRange("js/Jencil.js", "44739:44888");
__$coverInitRange("js/Jencil.js", "44896:44933");
__$coverInitRange("js/Jencil.js", "44703:44723");
__$coverInitRange("js/Jencil.js", "44766:44814");
__$coverInitRange("js/Jencil.js", "44824:44850");
__$coverInitRange("js/Jencil.js", "44860:44880");
__$coverInitRange("js/Jencil.js", "45016:45081");
__$coverInitRange("js/Jencil.js", "45089:45129");
__$coverInitRange("js/Jencil.js", "45137:45189");
__$coverInitRange("js/Jencil.js", "45197:45223");
__$coverInitRange("js/Jencil.js", "45231:45251");
__$coverInitRange("js/Jencil.js", "45053:45073");
__$coverInitRange("js/Jencil.js", "45338:45403");
__$coverInitRange("js/Jencil.js", "45411:45451");
__$coverInitRange("js/Jencil.js", "45459:45515");
__$coverInitRange("js/Jencil.js", "45523:45549");
__$coverInitRange("js/Jencil.js", "45557:45577");
__$coverInitRange("js/Jencil.js", "45375:45395");
__$coverInitRange("js/Jencil.js", "45663:45728");
__$coverInitRange("js/Jencil.js", "45736:45776");
__$coverInitRange("js/Jencil.js", "45784:45839");
__$coverInitRange("js/Jencil.js", "45847:45873");
__$coverInitRange("js/Jencil.js", "45881:45901");
__$coverInitRange("js/Jencil.js", "45700:45720");
__$coverInitRange("js/Jencil.js", "46008:46039");
__$coverInitRange("js/Jencil.js", "46045:46083");
__$coverInitRange("js/Jencil.js", "46132:46161");
__$coverInitRange("js/Jencil.js", "46168:46400");
__$coverInitRange("js/Jencil.js", "46407:46513");
__$coverInitRange("js/Jencil.js", "46520:46537");
__$coverInitRange("js/Jencil.js", "46221:46279");
__$coverInitRange("js/Jencil.js", "46287:46355");
__$coverInitRange("js/Jencil.js", "46363:46394");
__$coverInitRange("js/Jencil.js", "46253:46271");
__$coverInitRange("js/Jencil.js", "46468:46506");
__$coverInitRange("js/Jencil.js", "46598:46631");
__$coverInitRange("js/Jencil.js", "46638:48517");
__$coverInitRange("js/Jencil.js", "48524:48607");
__$coverInitRange("js/Jencil.js", "48614:48943");
__$coverInitRange("js/Jencil.js", "48950:49127");
__$coverInitRange("js/Jencil.js", "49134:49155");
__$coverInitRange("js/Jencil.js", "46676:46729");
__$coverInitRange("js/Jencil.js", "46737:46793");
__$coverInitRange("js/Jencil.js", "46801:46859");
__$coverInitRange("js/Jencil.js", "46867:46910");
__$coverInitRange("js/Jencil.js", "46918:47174");
__$coverInitRange("js/Jencil.js", "47182:47216");
__$coverInitRange("js/Jencil.js", "47224:47258");
__$coverInitRange("js/Jencil.js", "47266:47588");
__$coverInitRange("js/Jencil.js", "47596:48223");
__$coverInitRange("js/Jencil.js", "48231:48511");
__$coverInitRange("js/Jencil.js", "47306:47316");
__$coverInitRange("js/Jencil.js", "47326:47346");
__$coverInitRange("js/Jencil.js", "47356:47526");
__$coverInitRange("js/Jencil.js", "47536:47579");
__$coverInitRange("js/Jencil.js", "47404:47442");
__$coverInitRange("js/Jencil.js", "47471:47516");
__$coverInitRange("js/Jencil.js", "47642:47655");
__$coverInitRange("js/Jencil.js", "47665:48192");
__$coverInitRange("js/Jencil.js", "48202:48214");
__$coverInitRange("js/Jencil.js", "47704:47836");
__$coverInitRange("js/Jencil.js", "47848:47868");
__$coverInitRange("js/Jencil.js", "47880:47906");
__$coverInitRange("js/Jencil.js", "47918:47939");
__$coverInitRange("js/Jencil.js", "47951:48000");
__$coverInitRange("js/Jencil.js", "48012:48063");
__$coverInitRange("js/Jencil.js", "48075:48111");
__$coverInitRange("js/Jencil.js", "48123:48159");
__$coverInitRange("js/Jencil.js", "48171:48182");
__$coverInitRange("js/Jencil.js", "47722:47773");
__$coverInitRange("js/Jencil.js", "47811:47824");
__$coverInitRange("js/Jencil.js", "48298:48314");
__$coverInitRange("js/Jencil.js", "48324:48502");
__$coverInitRange("js/Jencil.js", "48417:48439");
__$coverInitRange("js/Jencil.js", "48453:48478");
__$coverInitRange("js/Jencil.js", "48575:48600");
__$coverInitRange("js/Jencil.js", "48679:48897");
__$coverInitRange("js/Jencil.js", "48905:48936");
__$coverInitRange("js/Jencil.js", "48724:48783");
__$coverInitRange("js/Jencil.js", "48839:48889");
__$coverInitRange("js/Jencil.js", "49003:49047");
__$coverInitRange("js/Jencil.js", "49055:49101");
__$coverInitRange("js/Jencil.js", "49109:49120");
__$coverInitRange("js/Jencil.js", "49217:49246");
__$coverInitRange("js/Jencil.js", "49253:49589");
__$coverInitRange("js/Jencil.js", "49596:50328");
__$coverInitRange("js/Jencil.js", "50335:50352");
__$coverInitRange("js/Jencil.js", "49295:49315");
__$coverInitRange("js/Jencil.js", "49323:49372");
__$coverInitRange("js/Jencil.js", "49380:49583");
__$coverInitRange("js/Jencil.js", "49499:49531");
__$coverInitRange("js/Jencil.js", "49657:49673");
__$coverInitRange("js/Jencil.js", "49681:50321");
__$coverInitRange("js/Jencil.js", "49732:49756");
__$coverInitRange("js/Jencil.js", "49766:50313");
__$coverInitRange("js/Jencil.js", "49996:50243");
__$coverInitRange("js/Jencil.js", "50257:50289");
__$coverInitRange("js/Jencil.js", "50048:50108");
__$coverInitRange("js/Jencil.js", "50177:50229");
__$coverInitRange("js/Jencil.js", "50432:50463");
__$coverInitRange("js/Jencil.js", "50469:50508");
__$coverInitRange("js/Jencil.js", "50514:50552");
__$coverInitRange("js/Jencil.js", "50601:50630");
__$coverInitRange("js/Jencil.js", "50637:50869");
__$coverInitRange("js/Jencil.js", "50876:50893");
__$coverInitRange("js/Jencil.js", "50690:50748");
__$coverInitRange("js/Jencil.js", "50756:50824");
__$coverInitRange("js/Jencil.js", "50832:50863");
__$coverInitRange("js/Jencil.js", "50722:50740");
__$coverInitRange("js/Jencil.js", "50954:50987");
__$coverInitRange("js/Jencil.js", "50994:52768");
__$coverInitRange("js/Jencil.js", "52775:52958");
__$coverInitRange("js/Jencil.js", "52965:53142");
__$coverInitRange("js/Jencil.js", "53149:53170");
__$coverInitRange("js/Jencil.js", "51032:51085");
__$coverInitRange("js/Jencil.js", "51093:51149");
__$coverInitRange("js/Jencil.js", "51157:51215");
__$coverInitRange("js/Jencil.js", "51223:51266");
__$coverInitRange("js/Jencil.js", "51274:51530");
__$coverInitRange("js/Jencil.js", "51538:51572");
__$coverInitRange("js/Jencil.js", "51580:51614");
__$coverInitRange("js/Jencil.js", "51622:51944");
__$coverInitRange("js/Jencil.js", "51952:52518");
__$coverInitRange("js/Jencil.js", "52526:52762");
__$coverInitRange("js/Jencil.js", "51662:51672");
__$coverInitRange("js/Jencil.js", "51682:51702");
__$coverInitRange("js/Jencil.js", "51712:51882");
__$coverInitRange("js/Jencil.js", "51892:51935");
__$coverInitRange("js/Jencil.js", "51760:51798");
__$coverInitRange("js/Jencil.js", "51827:51872");
__$coverInitRange("js/Jencil.js", "51998:52011");
__$coverInitRange("js/Jencil.js", "52021:52487");
__$coverInitRange("js/Jencil.js", "52497:52509");
__$coverInitRange("js/Jencil.js", "52060:52192");
__$coverInitRange("js/Jencil.js", "52204:52224");
__$coverInitRange("js/Jencil.js", "52236:52262");
__$coverInitRange("js/Jencil.js", "52274:52295");
__$coverInitRange("js/Jencil.js", "52307:52358");
__$coverInitRange("js/Jencil.js", "52370:52406");
__$coverInitRange("js/Jencil.js", "52418:52454");
__$coverInitRange("js/Jencil.js", "52466:52477");
__$coverInitRange("js/Jencil.js", "52078:52129");
__$coverInitRange("js/Jencil.js", "52167:52180");
__$coverInitRange("js/Jencil.js", "52586:52602");
__$coverInitRange("js/Jencil.js", "52612:52753");
__$coverInitRange("js/Jencil.js", "52705:52729");
__$coverInitRange("js/Jencil.js", "52826:52844");
__$coverInitRange("js/Jencil.js", "52852:52951");
__$coverInitRange("js/Jencil.js", "52893:52943");
__$coverInitRange("js/Jencil.js", "53018:53062");
__$coverInitRange("js/Jencil.js", "53070:53116");
__$coverInitRange("js/Jencil.js", "53124:53135");
__$coverInitRange("js/Jencil.js", "53246:53277");
__$coverInitRange("js/Jencil.js", "53283:53329");
__$coverInitRange("js/Jencil.js", "53377:53405");
__$coverInitRange("js/Jencil.js", "53412:53551");
__$coverInitRange("js/Jencil.js", "53558:53574");
__$coverInitRange("js/Jencil.js", "53445:53503");
__$coverInitRange("js/Jencil.js", "53511:53545");
__$coverInitRange("js/Jencil.js", "53628:53653");
__$coverInitRange("js/Jencil.js", "53660:54111");
__$coverInitRange("js/Jencil.js", "54118:54212");
__$coverInitRange("js/Jencil.js", "54219:54311");
__$coverInitRange("js/Jencil.js", "54318:54383");
__$coverInitRange("js/Jencil.js", "54390:54403");
__$coverInitRange("js/Jencil.js", "53709:53725");
__$coverInitRange("js/Jencil.js", "53733:53749");
__$coverInitRange("js/Jencil.js", "53757:53775");
__$coverInitRange("js/Jencil.js", "53783:53835");
__$coverInitRange("js/Jencil.js", "53843:53887");
__$coverInitRange("js/Jencil.js", "53895:53941");
__$coverInitRange("js/Jencil.js", "53949:53995");
__$coverInitRange("js/Jencil.js", "54003:54059");
__$coverInitRange("js/Jencil.js", "54067:54105");
__$coverInitRange("js/Jencil.js", "54163:54205");
__$coverInitRange("js/Jencil.js", "54265:54304");
__$coverInitRange("js/Jencil.js", "54365:54376");
__$coverInitRange("js/Jencil.js", "54463:54494");
__$coverInitRange("js/Jencil.js", "54501:55218");
__$coverInitRange("js/Jencil.js", "55225:55244");
__$coverInitRange("js/Jencil.js", "54576:54592");
__$coverInitRange("js/Jencil.js", "54600:54624");
__$coverInitRange("js/Jencil.js", "54632:54702");
__$coverInitRange("js/Jencil.js", "54710:54835");
__$coverInitRange("js/Jencil.js", "54843:54871");
__$coverInitRange("js/Jencil.js", "54879:54952");
__$coverInitRange("js/Jencil.js", "54960:55212");
__$coverInitRange("js/Jencil.js", "54747:54826");
__$coverInitRange("js/Jencil.js", "54799:54816");
__$coverInitRange("js/Jencil.js", "54919:54942");
__$coverInitRange("js/Jencil.js", "55028:55122");
__$coverInitRange("js/Jencil.js", "55132:55204");
__$coverInitRange("js/Jencil.js", "55087:55110");
__$coverInitRange("js/Jencil.js", "55305:55337");
__$coverInitRange("js/Jencil.js", "55344:55702");
__$coverInitRange("js/Jencil.js", "55709:55788");
__$coverInitRange("js/Jencil.js", "55795:55997");
__$coverInitRange("js/Jencil.js", "56004:56952");
__$coverInitRange("js/Jencil.js", "56959:56979");
__$coverInitRange("js/Jencil.js", "55419:55431");
__$coverInitRange("js/Jencil.js", "55439:55461");
__$coverInitRange("js/Jencil.js", "55469:55597");
__$coverInitRange("js/Jencil.js", "55605:55696");
__$coverInitRange("js/Jencil.js", "55501:55511");
__$coverInitRange("js/Jencil.js", "55521:55543");
__$coverInitRange("js/Jencil.js", "55553:55588");
__$coverInitRange("js/Jencil.js", "55759:55781");
__$coverInitRange("js/Jencil.js", "55849:55859");
__$coverInitRange("js/Jencil.js", "55867:55894");
__$coverInitRange("js/Jencil.js", "55902:55971");
__$coverInitRange("js/Jencil.js", "55979:55990");
__$coverInitRange("js/Jencil.js", "55949:55963");
__$coverInitRange("js/Jencil.js", "56057:56097");
__$coverInitRange("js/Jencil.js", "56105:56152");
__$coverInitRange("js/Jencil.js", "56160:56869");
__$coverInitRange("js/Jencil.js", "56877:56945");
__$coverInitRange("js/Jencil.js", "56209:56223");
__$coverInitRange("js/Jencil.js", "56235:56249");
__$coverInitRange("js/Jencil.js", "56261:56276");
__$coverInitRange("js/Jencil.js", "56288:56305");
__$coverInitRange("js/Jencil.js", "56317:56335");
__$coverInitRange("js/Jencil.js", "56347:56352");
__$coverInitRange("js/Jencil.js", "56380:56394");
__$coverInitRange("js/Jencil.js", "56406:56428");
__$coverInitRange("js/Jencil.js", "56440:56457");
__$coverInitRange("js/Jencil.js", "56469:56487");
__$coverInitRange("js/Jencil.js", "56499:56504");
__$coverInitRange("js/Jencil.js", "56532:56556");
__$coverInitRange("js/Jencil.js", "56568:56590");
__$coverInitRange("js/Jencil.js", "56602:56620");
__$coverInitRange("js/Jencil.js", "56632:56637");
__$coverInitRange("js/Jencil.js", "56665:56689");
__$coverInitRange("js/Jencil.js", "56701:56723");
__$coverInitRange("js/Jencil.js", "56735:56750");
__$coverInitRange("js/Jencil.js", "56762:56767");
__$coverInitRange("js/Jencil.js", "56795:56834");
__$coverInitRange("js/Jencil.js", "56846:56861");
__$coverInitRange("js/Jencil.js", "57043:57072");
__$coverInitRange("js/Jencil.js", "57079:57338");
__$coverInitRange("js/Jencil.js", "57345:57654");
__$coverInitRange("js/Jencil.js", "57661:57678");
__$coverInitRange("js/Jencil.js", "57113:57147");
__$coverInitRange("js/Jencil.js", "57155:57231");
__$coverInitRange("js/Jencil.js", "57239:57332");
__$coverInitRange("js/Jencil.js", "57188:57222");
__$coverInitRange("js/Jencil.js", "57392:57423");
__$coverInitRange("js/Jencil.js", "57431:57625");
__$coverInitRange("js/Jencil.js", "57633:57647");
__$coverInitRange("js/Jencil.js", "57460:57577");
__$coverInitRange("js/Jencil.js", "57587:57616");
__$coverInitRange("js/Jencil.js", "57509:57524");
__$coverInitRange("js/Jencil.js", "57553:57567");
__$coverInitRange("js/Jencil.js", "57742:57771");
__$coverInitRange("js/Jencil.js", "57778:58043");
__$coverInitRange("js/Jencil.js", "58050:58359");
__$coverInitRange("js/Jencil.js", "58366:58383");
__$coverInitRange("js/Jencil.js", "57812:57846");
__$coverInitRange("js/Jencil.js", "57854:57930");
__$coverInitRange("js/Jencil.js", "57938:58037");
__$coverInitRange("js/Jencil.js", "57887:57921");
__$coverInitRange("js/Jencil.js", "58097:58128");
__$coverInitRange("js/Jencil.js", "58136:58330");
__$coverInitRange("js/Jencil.js", "58338:58352");
__$coverInitRange("js/Jencil.js", "58165:58282");
__$coverInitRange("js/Jencil.js", "58292:58321");
__$coverInitRange("js/Jencil.js", "58214:58229");
__$coverInitRange("js/Jencil.js", "58258:58272");
__$coverInitRange("js/Jencil.js", "58453:58488");
__$coverInitRange("js/Jencil.js", "58495:58794");
__$coverInitRange("js/Jencil.js", "58801:59163");
__$coverInitRange("js/Jencil.js", "59170:59193");
__$coverInitRange("js/Jencil.js", "58535:58569");
__$coverInitRange("js/Jencil.js", "58577:58656");
__$coverInitRange("js/Jencil.js", "58664:58788");
__$coverInitRange("js/Jencil.js", "58610:58647");
__$coverInitRange("js/Jencil.js", "58854:58885");
__$coverInitRange("js/Jencil.js", "58893:59134");
__$coverInitRange("js/Jencil.js", "59142:59156");
__$coverInitRange("js/Jencil.js", "58922:59086");
__$coverInitRange("js/Jencil.js", "59096:59125");
__$coverInitRange("js/Jencil.js", "58984:59014");
__$coverInitRange("js/Jencil.js", "59043:59076");
__$coverInitRange("js/Jencil.js", "59259:59290");
__$coverInitRange("js/Jencil.js", "59297:59575");
__$coverInitRange("js/Jencil.js", "59582:59740");
__$coverInitRange("js/Jencil.js", "59747:60157");
__$coverInitRange("js/Jencil.js", "60164:60183");
__$coverInitRange("js/Jencil.js", "59333:59367");
__$coverInitRange("js/Jencil.js", "59375:59452");
__$coverInitRange("js/Jencil.js", "59460:59569");
__$coverInitRange("js/Jencil.js", "59408:59443");
__$coverInitRange("js/Jencil.js", "59635:59714");
__$coverInitRange("js/Jencil.js", "59722:59733");
__$coverInitRange("js/Jencil.js", "59670:59684");
__$coverInitRange("js/Jencil.js", "59694:59706");
__$coverInitRange("js/Jencil.js", "59796:59827");
__$coverInitRange("js/Jencil.js", "59835:59881");
__$coverInitRange("js/Jencil.js", "59889:60128");
__$coverInitRange("js/Jencil.js", "60136:60150");
__$coverInitRange("js/Jencil.js", "59867:59873");
__$coverInitRange("js/Jencil.js", "59918:60080");
__$coverInitRange("js/Jencil.js", "60090:60119");
__$coverInitRange("js/Jencil.js", "59978:60008");
__$coverInitRange("js/Jencil.js", "60037:60070");
__$coverInitRange("js/Jencil.js", "60249:60280");
__$coverInitRange("js/Jencil.js", "60287:60553");
__$coverInitRange("js/Jencil.js", "60560:60718");
__$coverInitRange("js/Jencil.js", "60725:61135");
__$coverInitRange("js/Jencil.js", "61142:61161");
__$coverInitRange("js/Jencil.js", "60323:60357");
__$coverInitRange("js/Jencil.js", "60365:60442");
__$coverInitRange("js/Jencil.js", "60450:60547");
__$coverInitRange("js/Jencil.js", "60398:60433");
__$coverInitRange("js/Jencil.js", "60613:60692");
__$coverInitRange("js/Jencil.js", "60700:60711");
__$coverInitRange("js/Jencil.js", "60648:60662");
__$coverInitRange("js/Jencil.js", "60672:60684");
__$coverInitRange("js/Jencil.js", "60774:60805");
__$coverInitRange("js/Jencil.js", "60813:60859");
__$coverInitRange("js/Jencil.js", "60867:61106");
__$coverInitRange("js/Jencil.js", "61114:61128");
__$coverInitRange("js/Jencil.js", "60845:60851");
__$coverInitRange("js/Jencil.js", "60896:61058");
__$coverInitRange("js/Jencil.js", "61068:61097");
__$coverInitRange("js/Jencil.js", "60956:60986");
__$coverInitRange("js/Jencil.js", "61015:61048");
__$coverInitRange("js/Jencil.js", "61231:61314");
__$coverInitRange("js/Jencil.js", "61320:61862");
__$coverInitRange("js/Jencil.js", "61868:61890");
__$coverInitRange("js/Jencil.js", "61267:61308");
__$coverInitRange("js/Jencil.js", "61359:61856");
__$coverInitRange("js/Jencil.js", "61412:61438");
__$coverInitRange("js/Jencil.js", "61471:61498");
__$coverInitRange("js/Jencil.js", "61531:61558");
__$coverInitRange("js/Jencil.js", "61597:61630");
__$coverInitRange("js/Jencil.js", "61665:61694");
__$coverInitRange("js/Jencil.js", "61729:61758");
__$coverInitRange("js/Jencil.js", "61787:61848");
__$coverInitRange("js/Jencil.js", "61952:61981");
__$coverInitRange("js/Jencil.js", "61987:62010");
__$coverInitRange("js/Jencil.js", "62016:62051");
__$coverInitRange("js/Jencil.js", "62057:62094");
__$coverInitRange("js/Jencil.js", "62100:62131");
__$coverInitRange("js/Jencil.js", "62137:62168");
__$coverInitRange("js/Jencil.js", "62174:62217");
__$coverInitRange("js/Jencil.js", "62223:62258");
__$coverInitRange("js/Jencil.js", "62264:62306");
__$coverInitRange("js/Jencil.js", "62352:62378");
__$coverInitRange("js/Jencil.js", "62385:62700");
__$coverInitRange("js/Jencil.js", "62707:64797");
__$coverInitRange("js/Jencil.js", "64804:65039");
__$coverInitRange("js/Jencil.js", "65046:65060");
__$coverInitRange("js/Jencil.js", "62431:62477");
__$coverInitRange("js/Jencil.js", "62485:62524");
__$coverInitRange("js/Jencil.js", "62532:62557");
__$coverInitRange("js/Jencil.js", "62565:62592");
__$coverInitRange("js/Jencil.js", "62600:62641");
__$coverInitRange("js/Jencil.js", "62649:62694");
__$coverInitRange("js/Jencil.js", "62751:62767");
__$coverInitRange("js/Jencil.js", "62775:64754");
__$coverInitRange("js/Jencil.js", "64762:64790");
__$coverInitRange("js/Jencil.js", "62863:64746");
__$coverInitRange("js/Jencil.js", "62930:62973");
__$coverInitRange("js/Jencil.js", "62987:63139");
__$coverInitRange("js/Jencil.js", "63153:63307");
__$coverInitRange("js/Jencil.js", "63321:63430");
__$coverInitRange("js/Jencil.js", "63045:63125");
__$coverInitRange("js/Jencil.js", "63099:63109");
__$coverInitRange("js/Jencil.js", "63212:63293");
__$coverInitRange("js/Jencil.js", "63267:63277");
__$coverInitRange("js/Jencil.js", "63488:63531");
__$coverInitRange("js/Jencil.js", "63545:63702");
__$coverInitRange("js/Jencil.js", "63716:63875");
__$coverInitRange("js/Jencil.js", "63889:64048");
__$coverInitRange("js/Jencil.js", "64062:64083");
__$coverInitRange("js/Jencil.js", "63603:63688");
__$coverInitRange("js/Jencil.js", "63657:63672");
__$coverInitRange("js/Jencil.js", "63775:63861");
__$coverInitRange("js/Jencil.js", "63830:63845");
__$coverInitRange("js/Jencil.js", "63948:64034");
__$coverInitRange("js/Jencil.js", "64003:64018");
__$coverInitRange("js/Jencil.js", "64139:64182");
__$coverInitRange("js/Jencil.js", "64196:64349");
__$coverInitRange("js/Jencil.js", "64363:64518");
__$coverInitRange("js/Jencil.js", "64532:64687");
__$coverInitRange("js/Jencil.js", "64701:64722");
__$coverInitRange("js/Jencil.js", "64254:64335");
__$coverInitRange("js/Jencil.js", "64308:64319");
__$coverInitRange("js/Jencil.js", "64422:64504");
__$coverInitRange("js/Jencil.js", "64477:64488");
__$coverInitRange("js/Jencil.js", "64591:64673");
__$coverInitRange("js/Jencil.js", "64646:64657");
__$coverInitRange("js/Jencil.js", "64850:64911");
__$coverInitRange("js/Jencil.js", "64919:64982");
__$coverInitRange("js/Jencil.js", "64990:65013");
__$coverInitRange("js/Jencil.js", "65021:65032");
__$coverInitRange("js/Jencil.js", "65116:65144");
__$coverInitRange("js/Jencil.js", "65151:65322");
__$coverInitRange("js/Jencil.js", "65329:67067");
__$coverInitRange("js/Jencil.js", "67074:67211");
__$coverInitRange("js/Jencil.js", "67218:67917");
__$coverInitRange("js/Jencil.js", "67924:68145");
__$coverInitRange("js/Jencil.js", "68152:68168");
__$coverInitRange("js/Jencil.js", "65184:65232");
__$coverInitRange("js/Jencil.js", "65240:65274");
__$coverInitRange("js/Jencil.js", "65282:65316");
__$coverInitRange("js/Jencil.js", "65385:65465");
__$coverInitRange("js/Jencil.js", "65473:67032");
__$coverInitRange("js/Jencil.js", "67040:67060");
__$coverInitRange("js/Jencil.js", "65504:65604");
__$coverInitRange("js/Jencil.js", "65614:65662");
__$coverInitRange("js/Jencil.js", "65672:65752");
__$coverInitRange("js/Jencil.js", "65762:65845");
__$coverInitRange("js/Jencil.js", "65855:65875");
__$coverInitRange("js/Jencil.js", "65885:65948");
__$coverInitRange("js/Jencil.js", "65958:66062");
__$coverInitRange("js/Jencil.js", "66072:66237");
__$coverInitRange("js/Jencil.js", "66247:66284");
__$coverInitRange("js/Jencil.js", "66294:66324");
__$coverInitRange("js/Jencil.js", "66334:66520");
__$coverInitRange("js/Jencil.js", "66530:66571");
__$coverInitRange("js/Jencil.js", "66581:66613");
__$coverInitRange("js/Jencil.js", "66623:66813");
__$coverInitRange("js/Jencil.js", "66823:66864");
__$coverInitRange("js/Jencil.js", "66874:66917");
__$coverInitRange("js/Jencil.js", "66927:66970");
__$coverInitRange("js/Jencil.js", "66980:67003");
__$coverInitRange("js/Jencil.js", "67013:67024");
__$coverInitRange("js/Jencil.js", "65549:65594");
__$coverInitRange("js/Jencil.js", "66019:66052");
__$coverInitRange("js/Jencil.js", "66134:66227");
__$coverInitRange("js/Jencil.js", "66177:66213");
__$coverInitRange("js/Jencil.js", "66397:66415");
__$coverInitRange("js/Jencil.js", "66427:66468");
__$coverInitRange("js/Jencil.js", "66480:66510");
__$coverInitRange("js/Jencil.js", "66688:66706");
__$coverInitRange("js/Jencil.js", "66718:66759");
__$coverInitRange("js/Jencil.js", "66771:66803");
__$coverInitRange("js/Jencil.js", "67120:67139");
__$coverInitRange("js/Jencil.js", "67147:67168");
__$coverInitRange("js/Jencil.js", "67176:67204");
__$coverInitRange("js/Jencil.js", "67266:67286");
__$coverInitRange("js/Jencil.js", "67294:67353");
__$coverInitRange("js/Jencil.js", "67361:67422");
__$coverInitRange("js/Jencil.js", "67430:67491");
__$coverInitRange("js/Jencil.js", "67499:67562");
__$coverInitRange("js/Jencil.js", "67570:67593");
__$coverInitRange("js/Jencil.js", "67601:67649");
__$coverInitRange("js/Jencil.js", "67657:67707");
__$coverInitRange("js/Jencil.js", "67715:67800");
__$coverInitRange("js/Jencil.js", "67808:67829");
__$coverInitRange("js/Jencil.js", "67837:67860");
__$coverInitRange("js/Jencil.js", "67868:67891");
__$coverInitRange("js/Jencil.js", "67899:67910");
__$coverInitRange("js/Jencil.js", "67977:68138");
__$coverInitRange("js/Jencil.js", "68049:68130");
__$coverInitRange("js/Jencil.js", "68218:68240");
__$coverInitRange("js/Jencil.js", "68247:68348");
__$coverInitRange("js/Jencil.js", "68355:68591");
__$coverInitRange("js/Jencil.js", "68598:68732");
__$coverInitRange("js/Jencil.js", "68739:68749");
__$coverInitRange("js/Jencil.js", "68274:68316");
__$coverInitRange("js/Jencil.js", "68324:68342");
__$coverInitRange("js/Jencil.js", "68395:68421");
__$coverInitRange("js/Jencil.js", "68429:68449");
__$coverInitRange("js/Jencil.js", "68457:68565");
__$coverInitRange("js/Jencil.js", "68573:68584");
__$coverInitRange("js/Jencil.js", "68517:68534");
__$coverInitRange("js/Jencil.js", "68544:68557");
__$coverInitRange("js/Jencil.js", "68649:68675");
__$coverInitRange("js/Jencil.js", "68683:68725");
__$coverInitRange("js/Jencil.js", "68803:68829");
__$coverInitRange("js/Jencil.js", "68836:68959");
__$coverInitRange("js/Jencil.js", "68966:68980");
__$coverInitRange("js/Jencil.js", "68867:68913");
__$coverInitRange("js/Jencil.js", "68921:68953");
__$coverInitRange("js/Jencil.js", "69034:69062");
__$coverInitRange("js/Jencil.js", "69069:69198");
__$coverInitRange("js/Jencil.js", "69205:69221");
__$coverInitRange("js/Jencil.js", "69102:69150");
__$coverInitRange("js/Jencil.js", "69158:69192");
__$coverInitRange("js/Jencil.js", "69273:69466");
__$coverInitRange("js/Jencil.js", "69473:69493");
__$coverInitRange("js/Jencil.js", "69319:69334");
__$coverInitRange("js/Jencil.js", "69342:69385");
__$coverInitRange("js/Jencil.js", "69393:69434");
__$coverInitRange("js/Jencil.js", "69442:69460");
__$coverInitRange("js/Jencil.js", "69546:69576");
__$coverInitRange("js/Jencil.js", "69583:70026");
__$coverInitRange("js/Jencil.js", "70033:70051");
__$coverInitRange("js/Jencil.js", "69627:69643");
__$coverInitRange("js/Jencil.js", "69651:69699");
__$coverInitRange("js/Jencil.js", "69707:69755");
__$coverInitRange("js/Jencil.js", "69763:69872");
__$coverInitRange("js/Jencil.js", "69880:69914");
__$coverInitRange("js/Jencil.js", "69922:70020");
__$coverInitRange("js/Jencil.js", "69972:70010");
__$coverInitRange("js/Jencil.js", "70118:70149");
__$coverInitRange("js/Jencil.js", "70156:70771");
__$coverInitRange("js/Jencil.js", "70778:70797");
__$coverInitRange("js/Jencil.js", "70201:70217");
__$coverInitRange("js/Jencil.js", "70225:70273");
__$coverInitRange("js/Jencil.js", "70281:70329");
__$coverInitRange("js/Jencil.js", "70337:70385");
__$coverInitRange("js/Jencil.js", "70393:70496");
__$coverInitRange("js/Jencil.js", "70504:70617");
__$coverInitRange("js/Jencil.js", "70625:70659");
__$coverInitRange("js/Jencil.js", "70667:70765");
__$coverInitRange("js/Jencil.js", "70717:70755");
__$coverInitRange("js/Jencil.js", "70881:70918");
__$coverInitRange("js/Jencil.js", "70924:70957");
__$coverInitRange("js/Jencil.js", "70963:71005");
__$coverInitRange("js/Jencil.js", "71054:71083");
__$coverInitRange("js/Jencil.js", "71090:72387");
__$coverInitRange("js/Jencil.js", "72394:73094");
__$coverInitRange("js/Jencil.js", "73101:73509");
__$coverInitRange("js/Jencil.js", "73516:73838");
__$coverInitRange("js/Jencil.js", "73845:73862");
__$coverInitRange("js/Jencil.js", "71124:71140");
__$coverInitRange("js/Jencil.js", "71148:71197");
__$coverInitRange("js/Jencil.js", "71205:71240");
__$coverInitRange("js/Jencil.js", "71248:71419");
__$coverInitRange("js/Jencil.js", "71427:71472");
__$coverInitRange("js/Jencil.js", "71480:71716");
__$coverInitRange("js/Jencil.js", "71724:71884");
__$coverInitRange("js/Jencil.js", "71892:72113");
__$coverInitRange("js/Jencil.js", "72121:72189");
__$coverInitRange("js/Jencil.js", "72197:72230");
__$coverInitRange("js/Jencil.js", "72238:72268");
__$coverInitRange("js/Jencil.js", "72276:72295");
__$coverInitRange("js/Jencil.js", "72303:72381");
__$coverInitRange("js/Jencil.js", "71947:71987");
__$coverInitRange("js/Jencil.js", "71997:72105");
__$coverInitRange("js/Jencil.js", "72037:72093");
__$coverInitRange("js/Jencil.js", "72161:72179");
__$coverInitRange("js/Jencil.js", "72338:72372");
__$coverInitRange("js/Jencil.js", "72439:72470");
__$coverInitRange("js/Jencil.js", "72478:72494");
__$coverInitRange("js/Jencil.js", "72502:72545");
__$coverInitRange("js/Jencil.js", "72553:72625");
__$coverInitRange("js/Jencil.js", "72633:72707");
__$coverInitRange("js/Jencil.js", "72715:72739");
__$coverInitRange("js/Jencil.js", "72747:72773");
__$coverInitRange("js/Jencil.js", "72781:72821");
__$coverInitRange("js/Jencil.js", "72829:73037");
__$coverInitRange("js/Jencil.js", "73045:73087");
__$coverInitRange("js/Jencil.js", "72878:72925");
__$coverInitRange("js/Jencil.js", "72935:72983");
__$coverInitRange("js/Jencil.js", "72993:73027");
__$coverInitRange("js/Jencil.js", "73147:73197");
__$coverInitRange("js/Jencil.js", "73205:73247");
__$coverInitRange("js/Jencil.js", "73255:73298");
__$coverInitRange("js/Jencil.js", "73306:73330");
__$coverInitRange("js/Jencil.js", "73338:73364");
__$coverInitRange("js/Jencil.js", "73372:73412");
__$coverInitRange("js/Jencil.js", "73420:73448");
__$coverInitRange("js/Jencil.js", "73456:73502");
__$coverInitRange("js/Jencil.js", "73588:73831");
__$coverInitRange("js/Jencil.js", "73631:73641");
__$coverInitRange("js/Jencil.js", "73651:73716");
__$coverInitRange("js/Jencil.js", "73741:73750");
__$coverInitRange("js/Jencil.js", "73760:73823");
__$coverInitRange("js/Jencil.js", "73920:73946");
__$coverInitRange("js/Jencil.js", "73952:74278");
__$coverInitRange("js/Jencil.js", "74284:74695");
__$coverInitRange("js/Jencil.js", "74701:75146");
__$coverInitRange("js/Jencil.js", "75152:75549");
__$coverInitRange("js/Jencil.js", "73983:74011");
__$coverInitRange("js/Jencil.js", "74019:74037");
__$coverInitRange("js/Jencil.js", "74045:74058");
__$coverInitRange("js/Jencil.js", "74066:74245");
__$coverInitRange("js/Jencil.js", "74253:74268");
__$coverInitRange("js/Jencil.js", "74126:74138");
__$coverInitRange("js/Jencil.js", "74148:74237");
__$coverInitRange("js/Jencil.js", "74316:74348");
__$coverInitRange("js/Jencil.js", "74356:74396");
__$coverInitRange("js/Jencil.js", "74404:74688");
__$coverInitRange("js/Jencil.js", "74382:74388");
__$coverInitRange("js/Jencil.js", "74468:74490");
__$coverInitRange("js/Jencil.js", "74500:74680");
__$coverInitRange("js/Jencil.js", "74564:74606");
__$coverInitRange("js/Jencil.js", "74618:74652");
__$coverInitRange("js/Jencil.js", "74664:74670");
__$coverInitRange("js/Jencil.js", "74750:74771");
__$coverInitRange("js/Jencil.js", "74779:74819");
__$coverInitRange("js/Jencil.js", "74827:75139");
__$coverInitRange("js/Jencil.js", "74805:74811");
__$coverInitRange("js/Jencil.js", "74891:74913");
__$coverInitRange("js/Jencil.js", "74923:75131");
__$coverInitRange("js/Jencil.js", "74962:74976");
__$coverInitRange("js/Jencil.js", "74988:75048");
__$coverInitRange("js/Jencil.js", "75060:75103");
__$coverInitRange("js/Jencil.js", "75115:75121");
__$coverInitRange("js/Jencil.js", "75186:75275");
__$coverInitRange("js/Jencil.js", "75283:75380");
__$coverInitRange("js/Jencil.js", "75388:75519");
__$coverInitRange("js/Jencil.js", "75527:75542");
__$coverInitRange("js/Jencil.js", "75232:75267");
__$coverInitRange("js/Jencil.js", "75337:75371");
__$coverInitRange("js/Jencil.js", "75459:75510");
__$coverInitRange("js/Jencil.js", "75595:75606");
__$coverInitRange("js/Jencil.js", "75612:75664");
__$coverInitRange("js/Jencil.js", "75670:76248");
__$coverInitRange("js/Jencil.js", "75697:75725");
__$coverInitRange("js/Jencil.js", "75733:75772");
__$coverInitRange("js/Jencil.js", "75780:75873");
__$coverInitRange("js/Jencil.js", "75881:75904");
__$coverInitRange("js/Jencil.js", "75912:76241");
__$coverInitRange("js/Jencil.js", "75817:75865");
__$coverInitRange("js/Jencil.js", "75946:76110");
__$coverInitRange("js/Jencil.js", "76120:76154");
__$coverInitRange("js/Jencil.js", "75990:76013");
__$coverInitRange("js/Jencil.js", "76042:76100");
__$coverInitRange("js/Jencil.js", "76179:76233");
__$coverInitRange("js/Jencil.js", "76299:76328");
__$coverInitRange("js/Jencil.js", "76335:76481");
__$coverInitRange("js/Jencil.js", "76488:76573");
__$coverInitRange("js/Jencil.js", "76580:76665");
__$coverInitRange("js/Jencil.js", "76672:76757");
__$coverInitRange("js/Jencil.js", "76764:76849");
__$coverInitRange("js/Jencil.js", "76856:76941");
__$coverInitRange("js/Jencil.js", "76948:77033");
__$coverInitRange("js/Jencil.js", "77040:77128");
__$coverInitRange("js/Jencil.js", "77135:77225");
__$coverInitRange("js/Jencil.js", "77232:77325");
__$coverInitRange("js/Jencil.js", "77332:77422");
__$coverInitRange("js/Jencil.js", "77429:77528");
__$coverInitRange("js/Jencil.js", "77535:77632");
__$coverInitRange("js/Jencil.js", "77639:77728");
__$coverInitRange("js/Jencil.js", "77735:77851");
__$coverInitRange("js/Jencil.js", "77858:77952");
__$coverInitRange("js/Jencil.js", "77959:78050");
__$coverInitRange("js/Jencil.js", "78057:78446");
__$coverInitRange("js/Jencil.js", "78453:78789");
__$coverInitRange("js/Jencil.js", "78796:79302");
__$coverInitRange("js/Jencil.js", "79309:79813");
__$coverInitRange("js/Jencil.js", "79820:79837");
__$coverInitRange("js/Jencil.js", "76369:76418");
__$coverInitRange("js/Jencil.js", "76426:76475");
__$coverInitRange("js/Jencil.js", "76533:76566");
__$coverInitRange("js/Jencil.js", "76625:76658");
__$coverInitRange("js/Jencil.js", "76717:76750");
__$coverInitRange("js/Jencil.js", "76809:76842");
__$coverInitRange("js/Jencil.js", "76901:76934");
__$coverInitRange("js/Jencil.js", "76993:77026");
__$coverInitRange("js/Jencil.js", "77087:77121");
__$coverInitRange("js/Jencil.js", "77184:77218");
__$coverInitRange("js/Jencil.js", "77284:77318");
__$coverInitRange("js/Jencil.js", "77381:77415");
__$coverInitRange("js/Jencil.js", "77483:77521");
__$coverInitRange("js/Jencil.js", "77587:77625");
__$coverInitRange("js/Jencil.js", "77687:77721");
__$coverInitRange("js/Jencil.js", "77788:77844");
__$coverInitRange("js/Jencil.js", "77905:77945");
__$coverInitRange("js/Jencil.js", "78005:78043");
__$coverInitRange("js/Jencil.js", "78110:78124");
__$coverInitRange("js/Jencil.js", "78132:78155");
__$coverInitRange("js/Jencil.js", "78163:78248");
__$coverInitRange("js/Jencil.js", "78256:78314");
__$coverInitRange("js/Jencil.js", "78322:78367");
__$coverInitRange("js/Jencil.js", "78375:78439");
__$coverInitRange("js/Jencil.js", "78184:78240");
__$coverInitRange("js/Jencil.js", "78353:78359");
__$coverInitRange("js/Jencil.js", "78501:78513");
__$coverInitRange("js/Jencil.js", "78521:78579");
__$coverInitRange("js/Jencil.js", "78587:78656");
__$coverInitRange("js/Jencil.js", "78664:78708");
__$coverInitRange("js/Jencil.js", "78716:78782");
__$coverInitRange("js/Jencil.js", "78694:78700");
__$coverInitRange("js/Jencil.js", "78852:78863");
__$coverInitRange("js/Jencil.js", "78871:78894");
__$coverInitRange("js/Jencil.js", "78902:79195");
__$coverInitRange("js/Jencil.js", "79203:79223");
__$coverInitRange("js/Jencil.js", "79231:79249");
__$coverInitRange("js/Jencil.js", "79257:79295");
__$coverInitRange("js/Jencil.js", "78931:78959");
__$coverInitRange("js/Jencil.js", "78969:78992");
__$coverInitRange("js/Jencil.js", "79002:79015");
__$coverInitRange("js/Jencil.js", "79025:79158");
__$coverInitRange("js/Jencil.js", "79168:79183");
__$coverInitRange("js/Jencil.js", "79087:79099");
__$coverInitRange("js/Jencil.js", "79111:79148");
__$coverInitRange("js/Jencil.js", "79363:79374");
__$coverInitRange("js/Jencil.js", "79382:79405");
__$coverInitRange("js/Jencil.js", "79413:79706");
__$coverInitRange("js/Jencil.js", "79714:79734");
__$coverInitRange("js/Jencil.js", "79742:79760");
__$coverInitRange("js/Jencil.js", "79768:79806");
__$coverInitRange("js/Jencil.js", "79442:79470");
__$coverInitRange("js/Jencil.js", "79480:79503");
__$coverInitRange("js/Jencil.js", "79513:79526");
__$coverInitRange("js/Jencil.js", "79536:79669");
__$coverInitRange("js/Jencil.js", "79679:79694");
__$coverInitRange("js/Jencil.js", "79598:79610");
__$coverInitRange("js/Jencil.js", "79622:79659");
__$coverInitRange("js/Jencil.js", "79931:79960");
__$coverInitRange("js/Jencil.js", "79967:80853");
__$coverInitRange("js/Jencil.js", "80860:80877");
__$coverInitRange("js/Jencil.js", "80001:80021");
__$coverInitRange("js/Jencil.js", "80029:80078");
__$coverInitRange("js/Jencil.js", "80086:80804");
__$coverInitRange("js/Jencil.js", "80812:80847");
__$coverInitRange("js/Jencil.js", "81765:81805");
__$coverInitRange("js/Jencil.js", "81849:81937");
__$coverInitRange("js/Jencil.js", "81943:81993");
__$coverInitRange("js/Jencil.js", "81999:82135");
__$coverInitRange("js/Jencil.js", "82141:82240");
__$coverInitRange("js/Jencil.js", "82246:82411");
__$coverInitRange("js/Jencil.js", "82417:83393");
__$coverInitRange("js/Jencil.js", "83399:83521");
__$coverInitRange("js/Jencil.js", "82046:82056");
__$coverInitRange("js/Jencil.js", "82064:82086");
__$coverInitRange("js/Jencil.js", "82094:82128");
__$coverInitRange("js/Jencil.js", "82185:82233");
__$coverInitRange("js/Jencil.js", "82293:82303");
__$coverInitRange("js/Jencil.js", "82311:82333");
__$coverInitRange("js/Jencil.js", "82341:82404");
__$coverInitRange("js/Jencil.js", "82465:82523");
__$coverInitRange("js/Jencil.js", "82531:82552");
__$coverInitRange("js/Jencil.js", "82560:82594");
__$coverInitRange("js/Jencil.js", "82602:82637");
__$coverInitRange("js/Jencil.js", "82645:82660");
__$coverInitRange("js/Jencil.js", "82668:83243");
__$coverInitRange("js/Jencil.js", "83251:83287");
__$coverInitRange("js/Jencil.js", "83295:83386");
__$coverInitRange("js/Jencil.js", "82714:82739");
__$coverInitRange("js/Jencil.js", "82749:82904");
__$coverInitRange("js/Jencil.js", "82786:82824");
__$coverInitRange("js/Jencil.js", "82853:82894");
__$coverInitRange("js/Jencil.js", "82929:82970");
__$coverInitRange("js/Jencil.js", "82980:83083");
__$coverInitRange("js/Jencil.js", "83093:83235");
__$coverInitRange("js/Jencil.js", "83041:83073");
__$coverInitRange("js/Jencil.js", "83160:83197");
__$coverInitRange("js/Jencil.js", "83209:83225");
__$coverInitRange("js/Jencil.js", "83328:83378");
__$coverInitRange("js/Jencil.js", "83426:83466");
__$coverInitRange("js/Jencil.js", "83474:83514");
__$coverInitRange("js/Jencil.js", "83577:83659");
__$coverInitRange("js/Jencil.js", "83665:83721");
__$coverInitRange("js/Jencil.js", "83727:83768");
__$coverInitRange("js/Jencil.js", "83774:83821");
__$coverInitRange("js/Jencil.js", "83827:84285");
__$coverInitRange("js/Jencil.js", "84291:84900");
__$coverInitRange("js/Jencil.js", "84906:86209");
__$coverInitRange("js/Jencil.js", "86215:86628");
__$coverInitRange("js/Jencil.js", "83865:83896");
__$coverInitRange("js/Jencil.js", "83904:84165");
__$coverInitRange("js/Jencil.js", "84173:84278");
__$coverInitRange("js/Jencil.js", "83942:83961");
__$coverInitRange("js/Jencil.js", "83971:83987");
__$coverInitRange("js/Jencil.js", "83997:84015");
__$coverInitRange("js/Jencil.js", "84025:84058");
__$coverInitRange("js/Jencil.js", "84103:84124");
__$coverInitRange("js/Jencil.js", "84149:84157");
__$coverInitRange("js/Jencil.js", "84323:84359");
__$coverInitRange("js/Jencil.js", "84367:84407");
__$coverInitRange("js/Jencil.js", "84415:84455");
__$coverInitRange("js/Jencil.js", "84463:84540");
__$coverInitRange("js/Jencil.js", "84548:84893");
__$coverInitRange("js/Jencil.js", "84393:84399");
__$coverInitRange("js/Jencil.js", "84521:84532");
__$coverInitRange("js/Jencil.js", "84608:84786");
__$coverInitRange("js/Jencil.js", "84796:84834");
__$coverInitRange("js/Jencil.js", "84844:84885");
__$coverInitRange("js/Jencil.js", "84668:84720");
__$coverInitRange("js/Jencil.js", "84732:84753");
__$coverInitRange("js/Jencil.js", "84765:84776");
__$coverInitRange("js/Jencil.js", "84963:85016");
__$coverInitRange("js/Jencil.js", "85024:85037");
__$coverInitRange("js/Jencil.js", "85045:85085");
__$coverInitRange("js/Jencil.js", "85093:85491");
__$coverInitRange("js/Jencil.js", "85499:85535");
__$coverInitRange("js/Jencil.js", "85543:86108");
__$coverInitRange("js/Jencil.js", "86116:86202");
__$coverInitRange("js/Jencil.js", "85178:85219");
__$coverInitRange("js/Jencil.js", "85229:85273");
__$coverInitRange("js/Jencil.js", "85283:85334");
__$coverInitRange("js/Jencil.js", "85344:85366");
__$coverInitRange("js/Jencil.js", "85376:85459");
__$coverInitRange("js/Jencil.js", "85469:85483");
__$coverInitRange("js/Jencil.js", "85408:85449");
__$coverInitRange("js/Jencil.js", "85521:85527");
__$coverInitRange("js/Jencil.js", "85569:85802");
__$coverInitRange("js/Jencil.js", "85631:85672");
__$coverInitRange("js/Jencil.js", "85684:85719");
__$coverInitRange("js/Jencil.js", "85731:85756");
__$coverInitRange("js/Jencil.js", "85768:85792");
__$coverInitRange("js/Jencil.js", "85877:85923");
__$coverInitRange("js/Jencil.js", "85933:85980");
__$coverInitRange("js/Jencil.js", "86055:86100");
__$coverInitRange("js/Jencil.js", "86146:86194");
__$coverInitRange("js/Jencil.js", "86249:86338");
__$coverInitRange("js/Jencil.js", "86346:86443");
__$coverInitRange("js/Jencil.js", "86451:86598");
__$coverInitRange("js/Jencil.js", "86606:86621");
__$coverInitRange("js/Jencil.js", "86295:86330");
__$coverInitRange("js/Jencil.js", "86400:86434");
__$coverInitRange("js/Jencil.js", "86530:86589");
__$coverInitRange("js/Jencil.js", "86683:86716");
__$coverInitRange("js/Jencil.js", "86723:86881");
__$coverInitRange("js/Jencil.js", "86888:87368");
__$coverInitRange("js/Jencil.js", "87375:87464");
__$coverInitRange("js/Jencil.js", "87471:87560");
__$coverInitRange("js/Jencil.js", "87567:87656");
__$coverInitRange("js/Jencil.js", "87663:87752");
__$coverInitRange("js/Jencil.js", "87759:87848");
__$coverInitRange("js/Jencil.js", "87855:87944");
__$coverInitRange("js/Jencil.js", "87951:88040");
__$coverInitRange("js/Jencil.js", "88047:88136");
__$coverInitRange("js/Jencil.js", "88143:89313");
__$coverInitRange("js/Jencil.js", "89320:89902");
__$coverInitRange("js/Jencil.js", "89909:90291");
__$coverInitRange("js/Jencil.js", "90298:90624");
__$coverInitRange("js/Jencil.js", "90631:91805");
__$coverInitRange("js/Jencil.js", "91812:93002");
__$coverInitRange("js/Jencil.js", "93009:93030");
__$coverInitRange("js/Jencil.js", "86761:86814");
__$coverInitRange("js/Jencil.js", "86822:86875");
__$coverInitRange("js/Jencil.js", "86968:86994");
__$coverInitRange("js/Jencil.js", "87002:87041");
__$coverInitRange("js/Jencil.js", "87049:87361");
__$coverInitRange("js/Jencil.js", "87086:87133");
__$coverInitRange("js/Jencil.js", "87143:87180");
__$coverInitRange("js/Jencil.js", "87190:87303");
__$coverInitRange("js/Jencil.js", "87313:87353");
__$coverInitRange("js/Jencil.js", "87261:87293");
__$coverInitRange("js/Jencil.js", "87424:87457");
__$coverInitRange("js/Jencil.js", "87520:87553");
__$coverInitRange("js/Jencil.js", "87616:87649");
__$coverInitRange("js/Jencil.js", "87712:87745");
__$coverInitRange("js/Jencil.js", "87808:87841");
__$coverInitRange("js/Jencil.js", "87904:87937");
__$coverInitRange("js/Jencil.js", "88002:88033");
__$coverInitRange("js/Jencil.js", "88100:88129");
__$coverInitRange("js/Jencil.js", "88201:88230");
__$coverInitRange("js/Jencil.js", "88238:88271");
__$coverInitRange("js/Jencil.js", "88279:88308");
__$coverInitRange("js/Jencil.js", "88316:88642");
__$coverInitRange("js/Jencil.js", "88650:89303");
__$coverInitRange("js/Jencil.js", "88350:88368");
__$coverInitRange("js/Jencil.js", "88378:88612");
__$coverInitRange("js/Jencil.js", "88622:88633");
__$coverInitRange("js/Jencil.js", "88441:88457");
__$coverInitRange("js/Jencil.js", "88469:88526");
__$coverInitRange("js/Jencil.js", "88538:88602");
__$coverInitRange("js/Jencil.js", "88506:88514");
__$coverInitRange("js/Jencil.js", "88578:88590");
__$coverInitRange("js/Jencil.js", "88678:88717");
__$coverInitRange("js/Jencil.js", "88727:88763");
__$coverInitRange("js/Jencil.js", "88773:89245");
__$coverInitRange("js/Jencil.js", "89255:89294");
__$coverInitRange("js/Jencil.js", "88803:89001");
__$coverInitRange("js/Jencil.js", "88919:88934");
__$coverInitRange("js/Jencil.js", "88948:88989");
__$coverInitRange("js/Jencil.js", "89030:89235");
__$coverInitRange("js/Jencil.js", "89151:89166");
__$coverInitRange("js/Jencil.js", "89180:89223");
__$coverInitRange("js/Jencil.js", "89371:89396");
__$coverInitRange("js/Jencil.js", "89404:89440");
__$coverInitRange("js/Jencil.js", "89448:89487");
__$coverInitRange("js/Jencil.js", "89495:89895");
__$coverInitRange("js/Jencil.js", "89527:89785");
__$coverInitRange("js/Jencil.js", "89795:89833");
__$coverInitRange("js/Jencil.js", "89558:89580");
__$coverInitRange("js/Jencil.js", "89592:89605");
__$coverInitRange("js/Jencil.js", "89617:89744");
__$coverInitRange("js/Jencil.js", "89756:89771");
__$coverInitRange("js/Jencil.js", "89682:89695");
__$coverInitRange("js/Jencil.js", "89709:89732");
__$coverInitRange("js/Jencil.js", "89858:89887");
__$coverInitRange("js/Jencil.js", "89966:89980");
__$coverInitRange("js/Jencil.js", "89988:90011");
__$coverInitRange("js/Jencil.js", "90019:90104");
__$coverInitRange("js/Jencil.js", "90112:90170");
__$coverInitRange("js/Jencil.js", "90178:90223");
__$coverInitRange("js/Jencil.js", "90231:90284");
__$coverInitRange("js/Jencil.js", "90040:90096");
__$coverInitRange("js/Jencil.js", "90209:90215");
__$coverInitRange("js/Jencil.js", "90350:90362");
__$coverInitRange("js/Jencil.js", "90370:90428");
__$coverInitRange("js/Jencil.js", "90436:90505");
__$coverInitRange("js/Jencil.js", "90513:90557");
__$coverInitRange("js/Jencil.js", "90565:90617");
__$coverInitRange("js/Jencil.js", "90543:90549");
__$coverInitRange("js/Jencil.js", "90692:90721");
__$coverInitRange("js/Jencil.js", "90729:90763");
__$coverInitRange("js/Jencil.js", "90771:90800");
__$coverInitRange("js/Jencil.js", "90808:91134");
__$coverInitRange("js/Jencil.js", "91142:91795");
__$coverInitRange("js/Jencil.js", "90842:90860");
__$coverInitRange("js/Jencil.js", "90870:91104");
__$coverInitRange("js/Jencil.js", "91114:91125");
__$coverInitRange("js/Jencil.js", "90933:90949");
__$coverInitRange("js/Jencil.js", "90961:91018");
__$coverInitRange("js/Jencil.js", "91030:91094");
__$coverInitRange("js/Jencil.js", "90998:91006");
__$coverInitRange("js/Jencil.js", "91070:91082");
__$coverInitRange("js/Jencil.js", "91170:91209");
__$coverInitRange("js/Jencil.js", "91219:91255");
__$coverInitRange("js/Jencil.js", "91265:91737");
__$coverInitRange("js/Jencil.js", "91747:91786");
__$coverInitRange("js/Jencil.js", "91295:91493");
__$coverInitRange("js/Jencil.js", "91411:91426");
__$coverInitRange("js/Jencil.js", "91440:91481");
__$coverInitRange("js/Jencil.js", "91522:91727");
__$coverInitRange("js/Jencil.js", "91643:91658");
__$coverInitRange("js/Jencil.js", "91672:91715");
__$coverInitRange("js/Jencil.js", "91871:91900");
__$coverInitRange("js/Jencil.js", "91908:91945");
__$coverInitRange("js/Jencil.js", "91953:91982");
__$coverInitRange("js/Jencil.js", "91990:92316");
__$coverInitRange("js/Jencil.js", "92324:92992");
__$coverInitRange("js/Jencil.js", "92024:92042");
__$coverInitRange("js/Jencil.js", "92052:92286");
__$coverInitRange("js/Jencil.js", "92296:92307");
__$coverInitRange("js/Jencil.js", "92115:92131");
__$coverInitRange("js/Jencil.js", "92143:92200");
__$coverInitRange("js/Jencil.js", "92212:92276");
__$coverInitRange("js/Jencil.js", "92180:92188");
__$coverInitRange("js/Jencil.js", "92252:92264");
__$coverInitRange("js/Jencil.js", "92352:92391");
__$coverInitRange("js/Jencil.js", "92401:92437");
__$coverInitRange("js/Jencil.js", "92447:92934");
__$coverInitRange("js/Jencil.js", "92944:92983");
__$coverInitRange("js/Jencil.js", "92477:92675");
__$coverInitRange("js/Jencil.js", "92593:92608");
__$coverInitRange("js/Jencil.js", "92622:92663");
__$coverInitRange("js/Jencil.js", "92704:92924");
__$coverInitRange("js/Jencil.js", "92825:92840");
__$coverInitRange("js/Jencil.js", "92854:92912");
__$coverInitRange("js/Jencil.js", "93135:93181");
__$coverInitRange("js/Jencil.js", "93236:93271");
__$coverInitRange("js/Jencil.js", "93278:93388");
__$coverInitRange("js/Jencil.js", "93395:93593");
__$coverInitRange("js/Jencil.js", "93600:93623");
__$coverInitRange("js/Jencil.js", "93314:93382");
__$coverInitRange("js/Jencil.js", "93462:93470");
__$coverInitRange("js/Jencil.js", "93478:93514");
__$coverInitRange("js/Jencil.js", "93522:93586");
__$coverInitRange("js/Jencil.js", "94305:94353");
__$coverCall('js/Jencil.js', '0:94375');
(function () {
    __$coverCall('js/Jencil.js', '16:1122');
    var ActionButton, AjaxViewer, Bar, BaseEditor, BaseHelper, BaseViewer, Button, Caretaker, CommandButton, DefaultProfile, DimainPanel, Fullscreen, FullscreenButton, HelperButton, HorizontalPanel, HorizontalSplitter, HtmlEditor, HtmlHelper, HtmlProfile, HtmlViewer, MarkdownEditor, MarkdownJsViewer, MarkdownProfile, MonomainPanel, MultiplePanel, NotImplementedError, Originator, Panel, RedoButton, Selection, Separator, Splitter, Statusbar, TemplateHelper, TemplateViewer, TextEditor, Toolbar, TrimainPanel, UndoButton, VerticalPanel, VerticalSplitter, ViewerButton, Widget, Workspace, Wrapper, animate, apply, autoIndentable, autoIndentableHtml, autoIndentableMarkdown, buttonFactory, curtainFactory, evolute, headerMarkup, namespace, strutils, translate, __slice = [].slice, __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
            __$coverCall('js/Jencil.js', '873:958');
            for (var key in parent) {
                __$coverCall('js/Jencil.js', '899:956');
                if (__hasProp.call(parent, key))
                    child[key] = parent[key];
            }
            __$coverCall('js/Jencil.js', '960:1004');
            function ctor() {
                __$coverCall('js/Jencil.js', '978:1002');
                this.constructor = child;
            }
            __$coverCall('js/Jencil.js', '1006:1039');
            ctor.prototype = parent.prototype;
            __$coverCall('js/Jencil.js', '1041:1069');
            child.prototype = new ctor();
            __$coverCall('js/Jencil.js', '1071:1105');
            child.__super__ = parent.prototype;
            __$coverCall('js/Jencil.js', '1107:1119');
            return child;
        };
    __$coverCall('js/Jencil.js', '1127:1622');
    namespace = function (target, name, block) {
        __$coverCall('js/Jencil.js', '1175:1211');
        var item, top, _i, _len, _ref, _ref1;
        __$coverCall('js/Jencil.js', '1217:1400');
        if (arguments.length < 3) {
            __$coverCall('js/Jencil.js', '1251:1394');
            _ref = [typeof exports !== 'undefined' ? exports : window].concat(__slice.call(arguments)), target = _ref[0], name = _ref[1], block = _ref[2];
        }
        __$coverCall('js/Jencil.js', '1406:1418');
        top = target;
        __$coverCall('js/Jencil.js', '1424:1447');
        _ref1 = name.split('.');
        __$coverCall('js/Jencil.js', '1453:1586');
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            __$coverCall('js/Jencil.js', '1512:1528');
            item = _ref1[_i];
            __$coverCall('js/Jencil.js', '1536:1580');
            target = target[item] || (target[item] = {});
        }
        __$coverCall('js/Jencil.js', '1592:1617');
        return block(target, top);
    };
    __$coverCall('js/Jencil.js', '1627:1719');
    if (typeof window !== 'undefined' && window !== null) {
        __$coverCall('js/Jencil.js', '1687:1715');
        window.namespace = namespace;
    }
    __$coverCall('js/Jencil.js', '1724:1819');
    if (typeof exports !== 'undefined' && exports !== null) {
        __$coverCall('js/Jencil.js', '1786:1815');
        exports.namespace = namespace;
    }
    __$coverCall('js/Jencil.js', '1824:2653');
    strutils = {
        repeat: function (str, count) {
            __$coverCall('js/Jencil.js', '1878:1897');
            var pattern, result;
            __$coverCall('js/Jencil.js', '1905:1947');
            if (count < 1) {
                __$coverCall('js/Jencil.js', '1930:1939');
                return '';
            }
            __$coverCall('js/Jencil.js', '1955:1966');
            result = '';
            __$coverCall('js/Jencil.js', '1974:1997');
            pattern = str.valueOf();
            __$coverCall('js/Jencil.js', '2005:2144');
            while (count > 0) {
                __$coverCall('js/Jencil.js', '2033:2087');
                if (count & 1) {
                    __$coverCall('js/Jencil.js', '2060:2077');
                    result += pattern;
                }
                __$coverCall('js/Jencil.js', '2097:2108');
                count >>= 1;
                __$coverCall('js/Jencil.js', '2118:2136');
                pattern += pattern;
            }
            __$coverCall('js/Jencil.js', '2152:2165');
            return result;
        },
        startsWith: function (str, prefix) {
            __$coverCall('js/Jencil.js', '2220:2259');
            return str.lastIndexOf(prefix, 0) === 0;
        },
        endsWith: function (str, suffix) {
            __$coverCall('js/Jencil.js', '2312:2317');
            var l;
            __$coverCall('js/Jencil.js', '2325:2355');
            l = str.length - suffix.length;
            __$coverCall('js/Jencil.js', '2363:2412');
            return l >= 0 && str.lastIndexOf(suffix, l) === l;
        },
        trimLeft: function (str) {
            __$coverCall('js/Jencil.js', '2457:2488');
            return str.replace(/^\s+/g, '');
        },
        trimRight: function (str) {
            __$coverCall('js/Jencil.js', '2534:2565');
            return str.replace(/\s+$/g, '');
        },
        trim: function (str) {
            __$coverCall('js/Jencil.js', '2606:2642');
            return str.replace(/^\s+|\s+$/g, '');
        }
    };
    __$coverCall('js/Jencil.js', '2658:2933');
    apply = function (object, name, fn) {
        __$coverCall('js/Jencil.js', '2699:2928');
        if (!(object.prototype[name] != null)) {
            __$coverCall('js/Jencil.js', '2746:2922');
            return object.prototype[name] = function () {
                __$coverCall('js/Jencil.js', '2799:2807');
                var args;
                __$coverCall('js/Jencil.js', '2817:2876');
                args = [this].concat(Array.prototype.slice.call(arguments));
                __$coverCall('js/Jencil.js', '2886:2913');
                return fn.apply(this, args);
            };
        }
    };
    __$coverCall('js/Jencil.js', '2938:2978');
    apply(String, 'repeat', strutils.repeat);
    __$coverCall('js/Jencil.js', '2983:3031');
    apply(String, 'startsWith', strutils.startsWith);
    __$coverCall('js/Jencil.js', '3036:3080');
    apply(String, 'endsWith', strutils.endsWith);
    __$coverCall('js/Jencil.js', '3085:3129');
    apply(String, 'trimLeft', strutils.trimLeft);
    __$coverCall('js/Jencil.js', '3134:3180');
    apply(String, 'trimRight', strutils.trimRight);
    __$coverCall('js/Jencil.js', '3185:3221');
    apply(String, 'trim', strutils.trim);
    __$coverCall('js/Jencil.js', '3226:3319');
    if (typeof exports !== 'undefined' && exports !== null) {
        __$coverCall('js/Jencil.js', '3288:3315');
        exports.strutils = strutils;
    }
    __$coverCall('js/Jencil.js', '3324:3590');
    NotImplementedError = function () {
        __$coverCall('js/Jencil.js', '3365:3397');
        function NotImplementedError() {
        }
        __$coverCall('js/Jencil.js', '3404:3463');
        NotImplementedError.prototype.name = 'Not implemeted error';
        __$coverCall('js/Jencil.js', '3470:3548');
        NotImplementedError.prototype.message = 'The function has not implemented yet';
        __$coverCall('js/Jencil.js', '3555:3581');
        return NotImplementedError;
    }();
    __$coverCall('js/Jencil.js', '3595:3885');
    Originator = function () {
        __$coverCall('js/Jencil.js', '3627:3650');
        function Originator() {
        }
        __$coverCall('js/Jencil.js', '3657:3749');
        Originator.prototype.createMemento = function () {
            __$coverCall('js/Jencil.js', '3713:3742');
            throw new NotImplementedError();
        };
        __$coverCall('js/Jencil.js', '3756:3852');
        Originator.prototype.setMemento = function (memento) {
            __$coverCall('js/Jencil.js', '3816:3845');
            throw new NotImplementedError();
        };
        __$coverCall('js/Jencil.js', '3859:3876');
        return Originator;
    }();
    __$coverCall('js/Jencil.js', '3890:5451');
    Caretaker = function () {
        __$coverCall('js/Jencil.js', '3921:4051');
        function Caretaker(originator) {
            __$coverCall('js/Jencil.js', '3960:3989');
            this._originator = originator;
            __$coverCall('js/Jencil.js', '3997:4017');
            this._undoStack = [];
            __$coverCall('js/Jencil.js', '4025:4045');
            this._redoStack = [];
        }
        __$coverCall('js/Jencil.js', '4058:4250');
        Caretaker.prototype.originator = function (originator) {
            __$coverCall('js/Jencil.js', '4120:4212');
            if (originator != null) {
                __$coverCall('js/Jencil.js', '4154:4183');
                this._originator = originator;
                __$coverCall('js/Jencil.js', '4193:4204');
                return this;
            }
            __$coverCall('js/Jencil.js', '4220:4243');
            return this._originator;
        };
        __$coverCall('js/Jencil.js', '4257:4455');
        Caretaker.prototype.save = function (memento) {
            __$coverCall('js/Jencil.js', '4310:4364');
            memento = memento || this.originator().createMemento();
            __$coverCall('js/Jencil.js', '4372:4401');
            this._undoStack.push(memento);
            __$coverCall('js/Jencil.js', '4409:4429');
            this._redoStack = [];
            __$coverCall('js/Jencil.js', '4437:4448');
            return this;
        };
        __$coverCall('js/Jencil.js', '4462:4841');
        Caretaker.prototype.undo = function () {
            __$coverCall('js/Jencil.js', '4508:4522');
            var originator;
            __$coverCall('js/Jencil.js', '4530:4581');
            if (!this.canUndo()) {
                __$coverCall('js/Jencil.js', '4561:4573');
                return false;
            }
            __$coverCall('js/Jencil.js', '4589:4619');
            originator = this.originator();
            __$coverCall('js/Jencil.js', '4627:4675');
            this._redoStack.push(originator.createMemento());
            __$coverCall('js/Jencil.js', '4683:4727');
            originator.setMemento(this._undoStack.pop());
            __$coverCall('js/Jencil.js', '4735:4815');
            if (typeof originator.focus === 'function') {
                __$coverCall('js/Jencil.js', '4789:4807');
                originator.focus();
            }
            __$coverCall('js/Jencil.js', '4823:4834');
            return true;
        };
        __$coverCall('js/Jencil.js', '4848:5227');
        Caretaker.prototype.redo = function () {
            __$coverCall('js/Jencil.js', '4894:4908');
            var originator;
            __$coverCall('js/Jencil.js', '4916:4967');
            if (!this.canRedo()) {
                __$coverCall('js/Jencil.js', '4947:4959');
                return false;
            }
            __$coverCall('js/Jencil.js', '4975:5005');
            originator = this.originator();
            __$coverCall('js/Jencil.js', '5013:5061');
            this._undoStack.push(originator.createMemento());
            __$coverCall('js/Jencil.js', '5069:5113');
            originator.setMemento(this._redoStack.pop());
            __$coverCall('js/Jencil.js', '5121:5201');
            if (typeof originator.focus === 'function') {
                __$coverCall('js/Jencil.js', '5175:5193');
                originator.focus();
            }
            __$coverCall('js/Jencil.js', '5209:5220');
            return true;
        };
        __$coverCall('js/Jencil.js', '5234:5323');
        Caretaker.prototype.canUndo = function () {
            __$coverCall('js/Jencil.js', '5283:5316');
            return this._undoStack.length > 0;
        };
        __$coverCall('js/Jencil.js', '5330:5419');
        Caretaker.prototype.canRedo = function () {
            __$coverCall('js/Jencil.js', '5379:5412');
            return this._redoStack.length > 0;
        };
        __$coverCall('js/Jencil.js', '5426:5442');
        return Caretaker;
    }();
    __$coverCall('js/Jencil.js', '5456:5643');
    if (typeof exports !== 'undefined' && exports !== null) {
        __$coverCall('js/Jencil.js', '5518:5567');
        exports.NotImplementedError = NotImplementedError;
        __$coverCall('js/Jencil.js', '5573:5604');
        exports.Originator = Originator;
        __$coverCall('js/Jencil.js', '5610:5639');
        exports.Caretaker = Caretaker;
    }
    __$coverCall('js/Jencil.js', '5648:12161');
    Selection = function () {
        __$coverCall('js/Jencil.js', '5679:5980');
        function Selection(document, element) {
            __$coverCall('js/Jencil.js', '5725:5749');
            this.document = document;
            __$coverCall('js/Jencil.js', '5757:5779');
            this.element = element;
            __$coverCall('js/Jencil.js', '5787:5878');
            if (this.document instanceof jQuery) {
                __$coverCall('js/Jencil.js', '5834:5870');
                this.document = this.document.get(0);
            }
            __$coverCall('js/Jencil.js', '5886:5974');
            if (this.element instanceof jQuery) {
                __$coverCall('js/Jencil.js', '5932:5966');
                this.element = this.element.get(0);
            }
        }
        __$coverCall('js/Jencil.js', '5987:6577');
        Selection.prototype._getCaret = function () {
            __$coverCall('js/Jencil.js', '6038:6067');
            var caret, clone, e, range, s;
            __$coverCall('js/Jencil.js', '6075:6528');
            if (this.document.selection != null) {
                __$coverCall('js/Jencil.js', '6122:6167');
                range = this.document.selection.createRange();
                __$coverCall('js/Jencil.js', '6177:6202');
                clone = range.duplicate();
                __$coverCall('js/Jencil.js', '6212:6249');
                clone.moveToElementText(this.element);
                __$coverCall('js/Jencil.js', '6259:6295');
                clone.setEndPoint('EndToEnd', range);
                __$coverCall('js/Jencil.js', '6305:6346');
                s = clone.text.length - range.text.length;
                __$coverCall('js/Jencil.js', '6356:6381');
                e = s + range.text.length;
            } else if (this.element.setSelectionRange != null) {
                __$coverCall('js/Jencil.js', '6450:6481');
                s = this.element.selectionStart;
                __$coverCall('js/Jencil.js', '6491:6520');
                e = this.element.selectionEnd;
            }
            __$coverCall('js/Jencil.js', '6536:6550');
            caret = [
                s,
                e
            ];
            __$coverCall('js/Jencil.js', '6558:6570');
            return caret;
        };
        __$coverCall('js/Jencil.js', '6584:7160');
        Selection.prototype._setCaret = function (start, end) {
            __$coverCall('js/Jencil.js', '6645:6665');
            var range, scrollTop;
            __$coverCall('js/Jencil.js', '6673:6707');
            scrollTop = this.element.scrollTop;
            __$coverCall('js/Jencil.js', '6715:7064');
            if (this.element.setSelectionRange != null) {
                __$coverCall('js/Jencil.js', '6769:6811');
                this.element.setSelectionRange(start, end);
            } else if (this.element.createTextRange) {
                __$coverCall('js/Jencil.js', '6870:6908');
                range = this.element.createTextRange();
                __$coverCall('js/Jencil.js', '6918:6938');
                range.collapse(true);
                __$coverCall('js/Jencil.js', '6948:6983');
                range.moveStart('character', start);
                __$coverCall('js/Jencil.js', '6993:7032');
                range.moveEnd('character', end - start);
                __$coverCall('js/Jencil.js', '7042:7056');
                range.select();
            }
            __$coverCall('js/Jencil.js', '7072:7092');
            this.element.focus();
            __$coverCall('js/Jencil.js', '7100:7134');
            this.element.scrollTop = scrollTop;
            __$coverCall('js/Jencil.js', '7142:7153');
            return this;
        };
        __$coverCall('js/Jencil.js', '7167:7540');
        Selection.prototype.caret = function (start, end) {
            __$coverCall('js/Jencil.js', '7224:7329');
            if (start != null && start instanceof Array) {
                __$coverCall('js/Jencil.js', '7281:7295');
                end = start[1];
                __$coverCall('js/Jencil.js', '7305:7321');
                start = start[0];
            }
            __$coverCall('js/Jencil.js', '7337:7405');
            if (start != null && !(end != null)) {
                __$coverCall('js/Jencil.js', '7386:7397');
                end = start;
            }
            __$coverCall('js/Jencil.js', '7413:7502');
            if (start != null && end != null) {
                __$coverCall('js/Jencil.js', '7461:7494');
                return this._setCaret(start, end);
            }
            __$coverCall('js/Jencil.js', '7510:7533');
            return this._getCaret();
        };
        __$coverCall('js/Jencil.js', '7547:7694');
        Selection.prototype.caretOffset = function (offset) {
            __$coverCall('js/Jencil.js', '7606:7615');
            var caret;
            __$coverCall('js/Jencil.js', '7623:7643');
            caret = this.caret();
            __$coverCall('js/Jencil.js', '7651:7687');
            return this.caret(caret[0] + offset);
        };
        __$coverCall('js/Jencil.js', '7701:8029');
        Selection.prototype.replace = function (str, start, end) {
            __$coverCall('js/Jencil.js', '7765:7784');
            var a, b, scrollTop;
            __$coverCall('js/Jencil.js', '7792:7826');
            scrollTop = this.element.scrollTop;
            __$coverCall('js/Jencil.js', '7834:7876');
            b = this.element.value.substring(0, start);
            __$coverCall('js/Jencil.js', '7884:7921');
            a = this.element.value.substring(end);
            __$coverCall('js/Jencil.js', '7929:7961');
            this.element.value = b + str + a;
            __$coverCall('js/Jencil.js', '7969:8003');
            this.element.scrollTop = scrollTop;
            __$coverCall('js/Jencil.js', '8011:8022');
            return this;
        };
        __$coverCall('js/Jencil.js', '8036:8425');
        Selection.prototype._getText = function () {
            __$coverCall('js/Jencil.js', '8086:8107');
            var e, range, s, _ref;
            __$coverCall('js/Jencil.js', '8115:8399');
            if (this.document.selection != null) {
                __$coverCall('js/Jencil.js', '8162:8207');
                range = this.document.selection.createRange();
                __$coverCall('js/Jencil.js', '8217:8234');
                return range.text;
            } else if (this.element.setSelectionRange) {
                __$coverCall('js/Jencil.js', '8295:8340');
                _ref = this.caret(), s = _ref[0], e = _ref[1];
                __$coverCall('js/Jencil.js', '8350:8391');
                return this.element.value.substring(s, e);
            }
            __$coverCall('js/Jencil.js', '8407:8418');
            return null;
        };
        __$coverCall('js/Jencil.js', '8432:8848');
        Selection.prototype._setText = function (str, keepSelection) {
            __$coverCall('js/Jencil.js', '8500:8525');
            var e, s, scrollTop, _ref;
            __$coverCall('js/Jencil.js', '8533:8567');
            scrollTop = this.element.scrollTop;
            __$coverCall('js/Jencil.js', '8575:8620');
            _ref = this.caret(), s = _ref[0], e = _ref[1];
            __$coverCall('js/Jencil.js', '8628:8651');
            this.replace(str, s, e);
            __$coverCall('js/Jencil.js', '8659:8677');
            e = s + str.length;
            __$coverCall('js/Jencil.js', '8685:8728');
            if (!keepSelection) {
                __$coverCall('js/Jencil.js', '8715:8720');
                s = e;
            }
            __$coverCall('js/Jencil.js', '8736:8752');
            this.caret(s, e);
            __$coverCall('js/Jencil.js', '8760:8780');
            this.element.focus();
            __$coverCall('js/Jencil.js', '8788:8822');
            this.element.scrollTop = scrollTop;
            __$coverCall('js/Jencil.js', '8830:8841');
            return this;
        };
        __$coverCall('js/Jencil.js', '8855:9031');
        Selection.prototype.text = function (str, keepSelection) {
            __$coverCall('js/Jencil.js', '8919:8994');
            if (str != null) {
                __$coverCall('js/Jencil.js', '8946:8986');
                return this._setText(str, keepSelection);
            }
            __$coverCall('js/Jencil.js', '9002:9024');
            return this._getText();
        };
        __$coverCall('js/Jencil.js', '9038:9497');
        Selection.prototype.insertBefore = function (str, keepSelection) {
            __$coverCall('js/Jencil.js', '9110:9141');
            var e, s, scrollTop, text, _ref;
            __$coverCall('js/Jencil.js', '9149:9183');
            scrollTop = this.element.scrollTop;
            __$coverCall('js/Jencil.js', '9191:9236');
            _ref = this.caret(), s = _ref[0], e = _ref[1];
            __$coverCall('js/Jencil.js', '9244:9262');
            text = this.text();
            __$coverCall('js/Jencil.js', '9270:9300');
            this.replace(str + text, s, e);
            __$coverCall('js/Jencil.js', '9308:9326');
            e = s + str.length;
            __$coverCall('js/Jencil.js', '9334:9377');
            if (!keepSelection) {
                __$coverCall('js/Jencil.js', '9364:9369');
                s = e;
            }
            __$coverCall('js/Jencil.js', '9385:9401');
            this.caret(s, e);
            __$coverCall('js/Jencil.js', '9409:9429');
            this.element.focus();
            __$coverCall('js/Jencil.js', '9437:9471');
            this.element.scrollTop = scrollTop;
            __$coverCall('js/Jencil.js', '9479:9490');
            return this;
        };
        __$coverCall('js/Jencil.js', '9504:9975');
        Selection.prototype.insertAfter = function (str, keepSelection) {
            __$coverCall('js/Jencil.js', '9575:9606');
            var e, s, scrollTop, text, _ref;
            __$coverCall('js/Jencil.js', '9614:9648');
            scrollTop = this.element.scrollTop;
            __$coverCall('js/Jencil.js', '9656:9701');
            _ref = this.caret(), s = _ref[0], e = _ref[1];
            __$coverCall('js/Jencil.js', '9709:9727');
            text = this.text();
            __$coverCall('js/Jencil.js', '9735:9765');
            this.replace(text + str, s, e);
            __$coverCall('js/Jencil.js', '9773:9778');
            s = e;
            __$coverCall('js/Jencil.js', '9786:9804');
            e = e + str.length;
            __$coverCall('js/Jencil.js', '9812:9855');
            if (!keepSelection) {
                __$coverCall('js/Jencil.js', '9842:9847');
                s = e;
            }
            __$coverCall('js/Jencil.js', '9863:9879');
            this.caret(s, e);
            __$coverCall('js/Jencil.js', '9887:9907');
            this.element.focus();
            __$coverCall('js/Jencil.js', '9915:9949');
            this.element.scrollTop = scrollTop;
            __$coverCall('js/Jencil.js', '9957:9968');
            return this;
        };
        __$coverCall('js/Jencil.js', '9982:10716');
        Selection.prototype.enclose = function (lhs, rhs, keepSelection) {
            __$coverCall('js/Jencil.js', '10054:10090');
            var e, s, scrollTop, str, text, _ref;
            __$coverCall('js/Jencil.js', '10098:10132');
            scrollTop = this.element.scrollTop;
            __$coverCall('js/Jencil.js', '10140:10158');
            text = this.text();
            __$coverCall('js/Jencil.js', '10166:10620');
            if (text.indexOf(lhs) === 0 && text.lastIndexOf(rhs) === text.length - rhs.length) {
                __$coverCall('js/Jencil.js', '10261:10319');
                str = text.substring(lhs.length, text.length - rhs.length);
                __$coverCall('js/Jencil.js', '10329:10358');
                this.text(str, keepSelection);
            } else {
                __$coverCall('js/Jencil.js', '10383:10428');
                _ref = this.caret(), s = _ref[0], e = _ref[1];
                __$coverCall('js/Jencil.js', '10438:10474');
                this.replace(lhs + text + rhs, s, e);
                __$coverCall('js/Jencil.js', '10484:10529');
                e = s + lhs.length + text.length + rhs.length;
                __$coverCall('js/Jencil.js', '10539:10586');
                if (!keepSelection) {
                    __$coverCall('js/Jencil.js', '10571:10576');
                    s = e;
                }
                __$coverCall('js/Jencil.js', '10596:10612');
                this.caret(s, e);
            }
            __$coverCall('js/Jencil.js', '10628:10648');
            this.element.focus();
            __$coverCall('js/Jencil.js', '10656:10690');
            this.element.scrollTop = scrollTop;
            __$coverCall('js/Jencil.js', '10698:10709');
            return this;
        };
        __$coverCall('js/Jencil.js', '10723:11030');
        Selection.prototype.lineCaret = function (pos) {
            __$coverCall('js/Jencil.js', '10777:10792');
            var e, s, value;
            __$coverCall('js/Jencil.js', '10800:10828');
            pos = pos || this.caret()[0];
            __$coverCall('js/Jencil.js', '10836:10862');
            value = this.element.value;
            __$coverCall('js/Jencil.js', '10870:10910');
            s = value.lastIndexOf('\n', pos - 1) + 1;
            __$coverCall('js/Jencil.js', '10918:10946');
            e = value.indexOf('\n', pos);
            __$coverCall('js/Jencil.js', '10954:11002');
            if (e === -1) {
                __$coverCall('js/Jencil.js', '10978:10994');
                e = value.length;
            }
            __$coverCall('js/Jencil.js', '11010:11023');
            return [
                s,
                e
            ];
        };
        __$coverCall('js/Jencil.js', '11037:11220');
        Selection.prototype._getLine = function (pos) {
            __$coverCall('js/Jencil.js', '11090:11104');
            var e, s, _ref;
            __$coverCall('js/Jencil.js', '11112:11164');
            _ref = this.lineCaret(pos), s = _ref[0], e = _ref[1];
            __$coverCall('js/Jencil.js', '11172:11213');
            return this.element.value.substring(s, e);
        };
        __$coverCall('js/Jencil.js', '11227:11650');
        Selection.prototype._setLine = function (line, keepSelection) {
            __$coverCall('js/Jencil.js', '11296:11321');
            var e, s, scrollTop, _ref;
            __$coverCall('js/Jencil.js', '11329:11363');
            scrollTop = this.element.scrollTop;
            __$coverCall('js/Jencil.js', '11371:11420');
            _ref = this.lineCaret(), s = _ref[0], e = _ref[1];
            __$coverCall('js/Jencil.js', '11428:11452');
            this.replace(line, s, e);
            __$coverCall('js/Jencil.js', '11460:11479');
            e = s + line.length;
            __$coverCall('js/Jencil.js', '11487:11530');
            if (!keepSelection) {
                __$coverCall('js/Jencil.js', '11517:11522');
                s = e;
            }
            __$coverCall('js/Jencil.js', '11538:11554');
            this.caret(s, e);
            __$coverCall('js/Jencil.js', '11562:11582');
            this.element.focus();
            __$coverCall('js/Jencil.js', '11590:11624');
            this.element.scrollTop = scrollTop;
            __$coverCall('js/Jencil.js', '11632:11643');
            return this;
        };
        __$coverCall('js/Jencil.js', '11657:11839');
        Selection.prototype.line = function (value, keepSelection) {
            __$coverCall('js/Jencil.js', '11723:11802');
            if (value != null) {
                __$coverCall('js/Jencil.js', '11752:11794');
                return this._setLine(value, keepSelection);
            }
            __$coverCall('js/Jencil.js', '11810:11832');
            return this._getLine();
        };
        __$coverCall('js/Jencil.js', '11846:12018');
        Selection.prototype.selectWholeLine = function (pos) {
            __$coverCall('js/Jencil.js', '11906:11920');
            var e, s, _ref;
            __$coverCall('js/Jencil.js', '11928:11980');
            _ref = this.lineCaret(pos), s = _ref[0], e = _ref[1];
            __$coverCall('js/Jencil.js', '11988:12011');
            return this.caret(s, e);
        };
        __$coverCall('js/Jencil.js', '12025:12129');
        Selection.prototype.selectWholeCurrentLine = function () {
            __$coverCall('js/Jencil.js', '12089:12122');
            return this.selectWholeLine(null);
        };
        __$coverCall('js/Jencil.js', '12136:12152');
        return Selection;
    }();
    __$coverCall('js/Jencil.js', '12260:17613');
    evolute = function () {
        __$coverCall('js/Jencil.js', '12288:12462');
        var absoluteX, absoluteY, contentX, contentY, maxHeight, maxWidth, minHeight, minWidth, ncss, nonContentHeight, nonContentWidth, outerHeight, outerWidth, relativeX, relativeY;
        __$coverCall('js/Jencil.js', '12468:12651');
        nonContentWidth = function (includeMargin) {
            __$coverCall('js/Jencil.js', '12518:12584');
            if (includeMargin == null) {
                __$coverCall('js/Jencil.js', '12555:12576');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.js', '12592:12644');
            return this.outerWidth(includeMargin) - this.width();
        };
        __$coverCall('js/Jencil.js', '12657:12843');
        nonContentHeight = function (includeMargin) {
            __$coverCall('js/Jencil.js', '12708:12774');
            if (includeMargin == null) {
                __$coverCall('js/Jencil.js', '12745:12766');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.js', '12782:12836');
            return this.outerHeight(includeMargin) - this.height();
        };
        __$coverCall('js/Jencil.js', '12849:13287');
        outerWidth = function (includeMargin, value) {
            __$coverCall('js/Jencil.js', '12901:12911');
            var offset;
            __$coverCall('js/Jencil.js', '12919:12985');
            if (includeMargin == null) {
                __$coverCall('js/Jencil.js', '12956:12977');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.js', '12993:13102');
            if (typeof includeMargin === 'number') {
                __$coverCall('js/Jencil.js', '13042:13063');
                value = includeMargin;
                __$coverCall('js/Jencil.js', '13073:13094');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.js', '13110:13234');
            if (value != null) {
                __$coverCall('js/Jencil.js', '13139:13183');
                offset = this.nonContentWidth(includeMargin);
                __$coverCall('js/Jencil.js', '13193:13226');
                return this.width(value - offset);
            }
            __$coverCall('js/Jencil.js', '13242:13280');
            return this._outerWidth(includeMargin);
        };
        __$coverCall('js/Jencil.js', '13293:13735');
        outerHeight = function (includeMargin, value) {
            __$coverCall('js/Jencil.js', '13346:13356');
            var offset;
            __$coverCall('js/Jencil.js', '13364:13430');
            if (includeMargin == null) {
                __$coverCall('js/Jencil.js', '13401:13422');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.js', '13438:13547');
            if (typeof includeMargin === 'number') {
                __$coverCall('js/Jencil.js', '13487:13508');
                value = includeMargin;
                __$coverCall('js/Jencil.js', '13518:13539');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.js', '13555:13681');
            if (value != null) {
                __$coverCall('js/Jencil.js', '13584:13629');
                offset = this.nonContentHeight(includeMargin);
                __$coverCall('js/Jencil.js', '13639:13673');
                return this.height(value - offset);
            }
            __$coverCall('js/Jencil.js', '13689:13728');
            return this._outerHeight(includeMargin);
        };
        __$coverCall('js/Jencil.js', '13741:14113');
        ncss = function (propertyName, defaultValue) {
            __$coverCall('js/Jencil.js', '13793:13802');
            var value;
            __$coverCall('js/Jencil.js', '13810:13873');
            if (defaultValue == null) {
                __$coverCall('js/Jencil.js', '13846:13865');
                defaultValue = null;
            }
            __$coverCall('js/Jencil.js', '13881:13911');
            value = this.css(propertyName);
            __$coverCall('js/Jencil.js', '13919:14051');
            if (value === '' || value === 'none' || value === null || value === void 0 || value === NaN) {
                __$coverCall('js/Jencil.js', '14024:14043');
                return defaultValue;
            }
            __$coverCall('js/Jencil.js', '14059:14086');
            value = parseInt(value, 10);
            __$coverCall('js/Jencil.js', '14094:14106');
            return value;
        };
        __$coverCall('js/Jencil.js', '14119:14185');
        minWidth = function () {
            __$coverCall('js/Jencil.js', '14149:14178');
            return this.ncss('min-width');
        };
        __$coverCall('js/Jencil.js', '14191:14259');
        minHeight = function () {
            __$coverCall('js/Jencil.js', '14222:14252');
            return this.ncss('min-height');
        };
        __$coverCall('js/Jencil.js', '14265:14331');
        maxWidth = function () {
            __$coverCall('js/Jencil.js', '14295:14324');
            return this.ncss('max-width');
        };
        __$coverCall('js/Jencil.js', '14337:14405');
        maxHeight = function () {
            __$coverCall('js/Jencil.js', '14368:14398');
            return this.ncss('max-height');
        };
        __$coverCall('js/Jencil.js', '14411:14789');
        contentX = function (includeMargin) {
            __$coverCall('js/Jencil.js', '14454:14493');
            var borderLeft, marginLeft, paddingLeft;
            __$coverCall('js/Jencil.js', '14501:14567');
            if (includeMargin == null) {
                __$coverCall('js/Jencil.js', '14538:14559');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.js', '14575:14632');
            marginLeft = includeMargin ? this.ncss('margin-left') : 0;
            __$coverCall('js/Jencil.js', '14640:14683');
            borderLeft = this.ncss('border-left-width');
            __$coverCall('js/Jencil.js', '14691:14730');
            paddingLeft = this.ncss('padding-left');
            __$coverCall('js/Jencil.js', '14738:14782');
            return marginLeft + borderLeft + paddingLeft;
        };
        __$coverCall('js/Jencil.js', '14795:15161');
        contentY = function (includeMargin) {
            __$coverCall('js/Jencil.js', '14838:14874');
            var borderTop, marginTop, paddingTop;
            __$coverCall('js/Jencil.js', '14882:14948');
            if (includeMargin == null) {
                __$coverCall('js/Jencil.js', '14919:14940');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.js', '14956:15011');
            marginTop = includeMargin ? this.ncss('margin-top') : 0;
            __$coverCall('js/Jencil.js', '15019:15060');
            borderTop = this.ncss('border-top-width');
            __$coverCall('js/Jencil.js', '15068:15105');
            paddingTop = this.ncss('padding-top');
            __$coverCall('js/Jencil.js', '15113:15154');
            return marginTop + borderTop + paddingTop;
        };
        __$coverCall('js/Jencil.js', '15167:15376');
        absoluteX = function (value) {
            __$coverCall('js/Jencil.js', '15203:15213');
            var offset;
            __$coverCall('js/Jencil.js', '15221:15243');
            offset = this.offset();
            __$coverCall('js/Jencil.js', '15251:15343');
            if (value != null) {
                __$coverCall('js/Jencil.js', '15280:15299');
                offset.left = value;
                __$coverCall('js/Jencil.js', '15309:15335');
                return this.offset(offset);
            }
            __$coverCall('js/Jencil.js', '15351:15369');
            return offset.left;
        };
        __$coverCall('js/Jencil.js', '15382:15589');
        absoluteY = function (value) {
            __$coverCall('js/Jencil.js', '15418:15428');
            var offset;
            __$coverCall('js/Jencil.js', '15436:15458');
            offset = this.offset();
            __$coverCall('js/Jencil.js', '15466:15557');
            if (value != null) {
                __$coverCall('js/Jencil.js', '15495:15513');
                offset.top = value;
                __$coverCall('js/Jencil.js', '15523:15549');
                return this.offset(offset);
            }
            __$coverCall('js/Jencil.js', '15565:15582');
            return offset.top;
        };
        __$coverCall('js/Jencil.js', '15595:16091');
        relativeX = function (includeMargin, value) {
            __$coverCall('js/Jencil.js', '15646:15664');
            var offset, parent;
            __$coverCall('js/Jencil.js', '15672:15738');
            if (includeMargin == null) {
                __$coverCall('js/Jencil.js', '15709:15730');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.js', '15746:15855');
            if (typeof includeMargin === 'number') {
                __$coverCall('js/Jencil.js', '15795:15816');
                value = includeMargin;
                __$coverCall('js/Jencil.js', '15826:15847');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.js', '15863:15894');
            parent = evolute(this.parent());
            __$coverCall('js/Jencil.js', '15902:15962');
            offset = parent.absoluteX() + parent.contentX(includeMargin);
            __$coverCall('js/Jencil.js', '15970:16044');
            if (value != null) {
                __$coverCall('js/Jencil.js', '15999:16036');
                return this.absoluteX(value + offset);
            }
            __$coverCall('js/Jencil.js', '16052:16084');
            return this.absoluteX() - offset;
        };
        __$coverCall('js/Jencil.js', '16097:16593');
        relativeY = function (includeMargin, value) {
            __$coverCall('js/Jencil.js', '16148:16166');
            var offset, parent;
            __$coverCall('js/Jencil.js', '16174:16240');
            if (includeMargin == null) {
                __$coverCall('js/Jencil.js', '16211:16232');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.js', '16248:16357');
            if (typeof includeMargin === 'number') {
                __$coverCall('js/Jencil.js', '16297:16318');
                value = includeMargin;
                __$coverCall('js/Jencil.js', '16328:16349');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.js', '16365:16396');
            parent = evolute(this.parent());
            __$coverCall('js/Jencil.js', '16404:16464');
            offset = parent.absoluteY() + parent.contentY(includeMargin);
            __$coverCall('js/Jencil.js', '16472:16546');
            if (value != null) {
                __$coverCall('js/Jencil.js', '16501:16538');
                return this.absoluteY(value + offset);
            }
            __$coverCall('js/Jencil.js', '16554:16586');
            return this.absoluteY() - offset;
        };
        __$coverCall('js/Jencil.js', '16599:17585');
        evolute = function (jQueryObj) {
            __$coverCall('js/Jencil.js', '16637:16708');
            if (jQueryObj.__evoluted__ === true) {
                __$coverCall('js/Jencil.js', '16684:16700');
                return jQueryObj;
            }
            __$coverCall('js/Jencil.js', '16716:16760');
            jQueryObj._outerWidth = jQueryObj.outerWidth;
            __$coverCall('js/Jencil.js', '16768:16814');
            jQueryObj._outerHeight = jQueryObj.outerHeight;
            __$coverCall('js/Jencil.js', '16822:16865');
            jQueryObj.nonContentWidth = nonContentWidth;
            __$coverCall('js/Jencil.js', '16873:16918');
            jQueryObj.nonContentHeight = nonContentHeight;
            __$coverCall('js/Jencil.js', '16926:16959');
            jQueryObj.outerWidth = outerWidth;
            __$coverCall('js/Jencil.js', '16967:17002');
            jQueryObj.outerHeight = outerHeight;
            __$coverCall('js/Jencil.js', '17010:17053');
            jQueryObj.nonContentWidth = nonContentWidth;
            __$coverCall('js/Jencil.js', '17061:17106');
            jQueryObj.nonContentHeight = nonContentHeight;
            __$coverCall('js/Jencil.js', '17114:17135');
            jQueryObj.ncss = ncss;
            __$coverCall('js/Jencil.js', '17143:17172');
            jQueryObj.minWidth = minWidth;
            __$coverCall('js/Jencil.js', '17180:17211');
            jQueryObj.minHeight = minHeight;
            __$coverCall('js/Jencil.js', '17219:17248');
            jQueryObj.maxWidth = maxWidth;
            __$coverCall('js/Jencil.js', '17256:17287');
            jQueryObj.maxHeight = maxHeight;
            __$coverCall('js/Jencil.js', '17295:17324');
            jQueryObj.contentX = contentX;
            __$coverCall('js/Jencil.js', '17332:17361');
            jQueryObj.contentY = contentY;
            __$coverCall('js/Jencil.js', '17369:17400');
            jQueryObj.absoluteX = absoluteX;
            __$coverCall('js/Jencil.js', '17408:17439');
            jQueryObj.absoluteY = absoluteY;
            __$coverCall('js/Jencil.js', '17447:17478');
            jQueryObj.relativeX = relativeX;
            __$coverCall('js/Jencil.js', '17486:17517');
            jQueryObj.relativeY = relativeY;
            __$coverCall('js/Jencil.js', '17525:17554');
            jQueryObj.__evoluted__ = true;
            __$coverCall('js/Jencil.js', '17562:17578');
            return jQueryObj;
        };
        __$coverCall('js/Jencil.js', '17591:17605');
        return evolute;
    }();
    __$coverCall('js/Jencil.js', '17618:18257');
    curtainFactory = function (element) {
        __$coverCall('js/Jencil.js', '17659:17670');
        var curtain;
        __$coverCall('js/Jencil.js', '17676:17711');
        element.css('position', 'relative');
        __$coverCall('js/Jencil.js', '17717:17893');
        curtain = $('<div>').appendTo(element).hide().css({
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'overflow': 'hidden',
            'z-index': 99999
        });
        __$coverCall('js/Jencil.js', '17899:17996');
        curtain.on = function () {
            __$coverCall('js/Jencil.js', '17931:17948');
            curtain.refresh();
            __$coverCall('js/Jencil.js', '17956:17970');
            curtain.show();
            __$coverCall('js/Jencil.js', '17978:17989');
            return this;
        };
        __$coverCall('js/Jencil.js', '18002:18153');
        curtain.refresh = function () {
            __$coverCall('js/Jencil.js', '18039:18078');
            curtain.width(element.outerWidth(true));
            __$coverCall('js/Jencil.js', '18086:18127');
            curtain.height(element.outerHeight(true));
            __$coverCall('js/Jencil.js', '18135:18146');
            return this;
        };
        __$coverCall('js/Jencil.js', '18159:18232');
        curtain.off = function () {
            __$coverCall('js/Jencil.js', '18192:18206');
            curtain.hide();
            __$coverCall('js/Jencil.js', '18214:18225');
            return this;
        };
        __$coverCall('js/Jencil.js', '18238:18252');
        return curtain;
    };
    __$coverCall('js/Jencil.js', '18542:19601');
    animate = function () {
        __$coverCall('js/Jencil.js', '18570:18593');
        var defaultOptions, now;
        __$coverCall('js/Jencil.js', '18599:18660');
        now = function () {
            __$coverCall('js/Jencil.js', '18624:18653');
            return new Date().getTime();
        };
        __$coverCall('js/Jencil.js', '18666:18830');
        defaultOptions = {
            start: 0,
            end: 100,
            duration: 1000,
            callbackEach: null,
            callbackDone: null,
            easing: jQuery.easing.swing
        };
        __$coverCall('js/Jencil.js', '18836:19593');
        return function (options) {
            __$coverCall('js/Jencil.js', '18869:18900');
            var difference, startTime, step;
            __$coverCall('js/Jencil.js', '18908:18956');
            options = jQuery.extend(defaultOptions, options);
            __$coverCall('js/Jencil.js', '18964:18981');
            startTime = now();
            __$coverCall('js/Jencil.js', '18989:19029');
            difference = options.end - options.start;
            __$coverCall('js/Jencil.js', '19037:19553');
            step = function () {
                __$coverCall('js/Jencil.js', '19065:19077');
                var epoch, x;
                __$coverCall('js/Jencil.js', '19087:19112');
                epoch = now() - startTime;
                __$coverCall('js/Jencil.js', '19122:19197');
                x = options.easing(epoch / options.duration, epoch, 0, 1, options.duration);
                __$coverCall('js/Jencil.js', '19207:19241');
                x = x * difference + options.start;
                __$coverCall('js/Jencil.js', '19251:19281');
                options.callbackEach(x, epoch);
                __$coverCall('js/Jencil.js', '19291:19544');
                if (epoch < options.duration) {
                    __$coverCall('js/Jencil.js', '19333:19359');
                    return setTimeout(step, 1);
                } else {
                    __$coverCall('js/Jencil.js', '19388:19439');
                    options.callbackEach(options.end, options.duration);
                    __$coverCall('js/Jencil.js', '19451:19534');
                    return typeof options.callbackDone === 'function' ? options.callbackDone() : void 0;
                }
            };
            __$coverCall('js/Jencil.js', '19561:19567');
            step();
            __$coverCall('js/Jencil.js', '19575:19586');
            return null;
        };
    }();
    __$coverCall('js/Jencil.js', '21026:22773');
    autoIndentable = function () {
        __$coverCall('js/Jencil.js', '21061:21075');
        var autoIndent;
        __$coverCall('js/Jencil.js', '21081:21776');
        autoIndent = function (e) {
            __$coverCall('js/Jencil.js', '21114:21159');
            var cancel, indent, insert, line, _ref, _ref1;
            __$coverCall('js/Jencil.js', '21167:21211');
            if (e.which !== 13) {
                __$coverCall('js/Jencil.js', '21197:21203');
                return;
            }
            __$coverCall('js/Jencil.js', '21219:21247');
            line = this.selection.line();
            __$coverCall('js/Jencil.js', '21255:21347');
            cancel = ((_ref = this.autoIndent.pre) != null ? _ref.call(this, e, line) : void 0) === true;
            __$coverCall('js/Jencil.js', '21355:21521');
            if (cancel !== true) {
                __$coverCall('js/Jencil.js', '21386:21430');
                indent = line.replace(/^([\t\s]*).*$/, '$1');
                __$coverCall('js/Jencil.js', '21440:21462');
                insert = '\n' + indent;
                __$coverCall('js/Jencil.js', '21472:21513');
                this.selection.insertAfter(insert, false);
            }
            __$coverCall('js/Jencil.js', '21529:21640');
            if ((_ref1 = this.autoIndent.post) != null) {
                __$coverCall('js/Jencil.js', '21583:21632');
                _ref1.call(this, e, line, indent, insert, cancel);
            }
            __$coverCall('js/Jencil.js', '21648:21667');
            e.stopPropagation();
            __$coverCall('js/Jencil.js', '21675:21703');
            e.stopImmediatePropagation();
            __$coverCall('js/Jencil.js', '21711:21729');
            e.preventDefault();
            __$coverCall('js/Jencil.js', '21737:21749');
            this.focus();
            __$coverCall('js/Jencil.js', '21757:21769');
            return false;
        };
        __$coverCall('js/Jencil.js', '21782:22765');
        return function (textarea, pre, post) {
            __$coverCall('js/Jencil.js', '21827:21902');
            if (!(textarea instanceof jQuery)) {
                __$coverCall('js/Jencil.js', '21872:21894');
                textarea = $(textarea);
            }
            __$coverCall('js/Jencil.js', '21910:22024');
            if (!(textarea.selection != null)) {
                __$coverCall('js/Jencil.js', '21955:22016');
                textarea.selection = new Selection(document, textarea.get(0));
            }
            __$coverCall('js/Jencil.js', '22032:22120');
            textarea.autoIndent = function (e) {
                __$coverCall('js/Jencil.js', '22076:22111');
                return autoIndent.call(textarea, e);
            };
            __$coverCall('js/Jencil.js', '22128:22255');
            textarea.autoIndent.enable = function () {
                __$coverCall('js/Jencil.js', '22178:22221');
                textarea.on('keydown', textarea.autoIndent);
                __$coverCall('js/Jencil.js', '22231:22246');
                return textarea;
            };
            __$coverCall('js/Jencil.js', '22263:22392');
            textarea.autoIndent.disable = function () {
                __$coverCall('js/Jencil.js', '22314:22358');
                textarea.off('keydown', textarea.autoIndent);
                __$coverCall('js/Jencil.js', '22368:22383');
                return textarea;
            };
            __$coverCall('js/Jencil.js', '22400:22536');
            if (pre != null) {
                __$coverCall('js/Jencil.js', '22427:22528');
                textarea.autoIndent.pre = function (e, line) {
                    __$coverCall('js/Jencil.js', '22483:22517');
                    return pre.call(textarea, e, line);
                };
            }
            __$coverCall('js/Jencil.js', '22544:22715');
            if (post != null) {
                __$coverCall('js/Jencil.js', '22572:22707');
                textarea.autoIndent.post = function (e, line, indent, insert) {
                    __$coverCall('js/Jencil.js', '22645:22696');
                    return post.call(textarea, e, line, indent, insert);
                };
            }
            __$coverCall('js/Jencil.js', '22723:22758');
            return textarea.autoIndent.enable();
        };
    }();
    __$coverCall('js/Jencil.js', '22778:22977');
    if (window.i18n != null) {
        __$coverCall('js/Jencil.js', '22809:22905');
        translate = function (key) {
            __$coverCall('js/Jencil.js', '22843:22898');
            return i18n.t(key, { defaultValue: key });
        };
    } else {
        __$coverCall('js/Jencil.js', '22922:22973');
        translate = function (key) {
            __$coverCall('js/Jencil.js', '22956:22966');
            return key;
        };
    }
    __$coverCall('js/Jencil.js', '22982:23199');
    DefaultProfile = {
        mainPanelClass: null,
        editorClass: null,
        viewerClass: null,
        helperClass: null,
        toolbarButtons: [],
        statusbarButtons: [],
        defaultVolume: null,
        defaultVolume2: null
    };
    __$coverCall('js/Jencil.js', '23204:24695');
    this.Jencil = function () {
        __$coverCall('js/Jencil.js', '23237:24312');
        function Jencil(textarea, options) {
            __$coverCall('js/Jencil.js', '23280:23320');
            var DefaultOptions, _this = this;
            __$coverCall('js/Jencil.js', '23328:23789');
            DefaultOptions = {
                profile: 'Html',
                profiles: {
                    Html: HtmlProfile,
                    Markdown: MarkdownProfile
                },
                resizable: true,
                enableTabIndent: true,
                enableAutoIndent: true,
                tabString: '\t',
                defaultVolume: null,
                defaultVolume2: null,
                width: 640,
                height: 620,
                editorTemplatePath: null,
                viewerTemplatePath: null,
                helperTemplatePath: null
            };
            __$coverCall('js/Jencil.js', '23797:23850');
            this.options = jQuery.extend(DefaultOptions, options);
            __$coverCall('js/Jencil.js', '23858:23888');
            this.element = textarea.hide();
            __$coverCall('js/Jencil.js', '23896:23928');
            this.caretaker = new Caretaker();
            __$coverCall('js/Jencil.js', '23936:24015');
            this.caretaker.originator = function () {
                __$coverCall('js/Jencil.js', '23985:24006');
                return _this.editor();
            };
            __$coverCall('js/Jencil.js', '24023:24096');
            this.wrapper = new Wrapper(this, this.options.width, this.options.height);
            __$coverCall('js/Jencil.js', '24104:24142');
            this.fullscreen = new Fullscreen(this);
            __$coverCall('js/Jencil.js', '24150:24221');
            this.element.after(this.wrapper.element).after(this.fullscreen.element);
            __$coverCall('js/Jencil.js', '24229:24248');
            this.wrapper.init();
            __$coverCall('js/Jencil.js', '24256:24277');
            this.wrapper.adjust();
            __$coverCall('js/Jencil.js', '24285:24306');
            this.caretaker.save();
        }
        __$coverCall('js/Jencil.js', '24319:24430');
        Jencil.prototype.editor = function () {
            __$coverCall('js/Jencil.js', '24364:24423');
            return this.wrapper.workspace.mainPanel.editorPanel || null;
        };
        __$coverCall('js/Jencil.js', '24437:24548');
        Jencil.prototype.viewer = function () {
            __$coverCall('js/Jencil.js', '24482:24541');
            return this.wrapper.workspace.mainPanel.viewerPanel || null;
        };
        __$coverCall('js/Jencil.js', '24555:24666');
        Jencil.prototype.helper = function () {
            __$coverCall('js/Jencil.js', '24600:24659');
            return this.wrapper.workspace.mainPanel.helperPanel || null;
        };
        __$coverCall('js/Jencil.js', '24673:24686');
        return Jencil;
    }();
    __$coverCall('js/Jencil.js', '24700:24778');
    $.fn.jencil = function (options) {
        __$coverCall('js/Jencil.js', '24738:24773');
        return new Jencil($(this), options);
    };
    __$coverCall('js/Jencil.js', '24783:24888');
    namespace('Jencil.profiles', function (exports) {
        __$coverCall('js/Jencil.js', '24836:24882');
        return exports.DefaultProfile = DefaultProfile;
    });
    __$coverCall('js/Jencil.js', '24893:24995');
    namespace('Jencil.utils.namespace', function (exports) {
        __$coverCall('js/Jencil.js', '24953:24989');
        return exports.namespace = namespace;
    });
    __$coverCall('js/Jencil.js', '25000:25099');
    namespace('Jencil.utils.strutils', function (exports) {
        __$coverCall('js/Jencil.js', '25059:25093');
        return exports.strutils = strutils;
    });
    __$coverCall('js/Jencil.js', '25104:25202');
    namespace('Jencil.utils.evolution', function (exports) {
        __$coverCall('js/Jencil.js', '25164:25196');
        return exports.evolute = evolute;
    });
    __$coverCall('js/Jencil.js', '25207:25309');
    namespace('Jencil.utils.selection', function (exports) {
        __$coverCall('js/Jencil.js', '25267:25303');
        return exports.Selection = Selection;
    });
    __$coverCall('js/Jencil.js', '25314:25412');
    namespace('Jencil.utils.animation', function (exports) {
        __$coverCall('js/Jencil.js', '25374:25406');
        return exports.animate = animate;
    });
    __$coverCall('js/Jencil.js', '25417:25530');
    namespace('Jencil.utils.autoindent', function (exports) {
        __$coverCall('js/Jencil.js', '25478:25524');
        return exports.autoIndentable = autoIndentable;
    });
    __$coverCall('js/Jencil.js', '25535:25645');
    namespace('Jencil.utils.curtain', function (exports) {
        __$coverCall('js/Jencil.js', '25593:25639');
        return exports.curtainFactory = curtainFactory;
    });
    __$coverCall('js/Jencil.js', '25650:25747');
    namespace('Jencil.utils.i18n', function (exports) {
        __$coverCall('js/Jencil.js', '25705:25741');
        return exports.translate = translate;
    });
    __$coverCall('js/Jencil.js', '25752:25941');
    namespace('Jencil.utils.undo', function (exports) {
        __$coverCall('js/Jencil.js', '25807:25856');
        exports.NotImplementedError = NotImplementedError;
        __$coverCall('js/Jencil.js', '25862:25893');
        exports.Originator = Originator;
        __$coverCall('js/Jencil.js', '25899:25935');
        return exports.Caretaker = Caretaker;
    });
    __$coverCall('js/Jencil.js', '25946:26024');
    namespace('Jencil', function (exports) {
        __$coverCall('js/Jencil.js', '25990:26018');
        return exports.t = translate;
    });
    __$coverCall('js/Jencil.js', '26029:26546');
    Widget = function () {
        __$coverCall('js/Jencil.js', '26057:26379');
        function Widget(core, selector, context) {
            __$coverCall('js/Jencil.js', '26106:26122');
            this.core = core;
            __$coverCall('js/Jencil.js', '26130:26188');
            if (selector == null) {
                __$coverCall('js/Jencil.js', '26162:26180');
                selector = '<div>';
            }
            __$coverCall('js/Jencil.js', '26196:26329');
            if (selector instanceof jQuery) {
                __$coverCall('js/Jencil.js', '26238:26261');
                this.element = selector;
            } else {
                __$coverCall('js/Jencil.js', '26286:26321');
                this.element = $(selector, context);
            }
            __$coverCall('js/Jencil.js', '26337:26373');
            this.element = evolute(this.element);
        }
        __$coverCall('js/Jencil.js', '26386:26447');
        Widget.prototype.init = function () {
            __$coverCall('js/Jencil.js', '26429:26440');
            return this;
        };
        __$coverCall('js/Jencil.js', '26454:26517');
        Widget.prototype.adjust = function () {
            __$coverCall('js/Jencil.js', '26499:26510');
            return this;
        };
        __$coverCall('js/Jencil.js', '26524:26537');
        return Widget;
    }();
    __$coverCall('js/Jencil.js', '26551:26870');
    Panel = function (_super) {
        __$coverCall('js/Jencil.js', '26584:26608');
        __extends(Panel, _super);
        __$coverCall('js/Jencil.js', '26615:26836');
        function Panel(core, selector, context) {
            __$coverCall('js/Jencil.js', '26663:26721');
            if (selector == null) {
                __$coverCall('js/Jencil.js', '26695:26713');
                selector = '<div>';
            }
            __$coverCall('js/Jencil.js', '26729:26792');
            Panel.__super__.constructor.call(this, core, selector, context);
            __$coverCall('js/Jencil.js', '26800:26830');
            this.element.addClass('panel');
        }
        __$coverCall('js/Jencil.js', '26843:26855');
        return Panel;
    }(Widget);
    __$coverCall('js/Jencil.js', '26875:29373');
    MultiplePanel = function (_super) {
        __$coverCall('js/Jencil.js', '26916:26948');
        __extends(MultiplePanel, _super);
        __$coverCall('js/Jencil.js', '26955:28127');
        function MultiplePanel(core, fst, snd, splitter) {
            __$coverCall('js/Jencil.js', '27012:27048');
            var hide, show, _this = this;
            __$coverCall('js/Jencil.js', '27056:27070');
            this.fst = fst;
            __$coverCall('js/Jencil.js', '27078:27092');
            this.snd = snd;
            __$coverCall('js/Jencil.js', '27100:27124');
            this.splitter = splitter;
            __$coverCall('js/Jencil.js', '27132:27184');
            MultiplePanel.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.js', '27192:27225');
            this.element.addClass('multiple');
            __$coverCall('js/Jencil.js', '27233:27270');
            this.element.append(this.fst.element);
            __$coverCall('js/Jencil.js', '27278:27320');
            this.element.append(this.splitter.element);
            __$coverCall('js/Jencil.js', '27328:27365');
            this.element.append(this.snd.element);
            __$coverCall('js/Jencil.js', '27373:27508');
            show = function (callback) {
                __$coverCall('js/Jencil.js', '27409:27499');
                if (!this.element.is(':visible')) {
                    __$coverCall('js/Jencil.js', '27455:27489');
                    return this.toggle(callback, null);
                }
            };
            __$coverCall('js/Jencil.js', '27516:27650');
            hide = function (callback) {
                __$coverCall('js/Jencil.js', '27552:27641');
                if (this.element.is(':visible')) {
                    __$coverCall('js/Jencil.js', '27597:27631');
                    return this.toggle(null, callback);
                }
            };
            __$coverCall('js/Jencil.js', '27658:27782');
            this.fst.toggle = function (callbackOn, callbackOff) {
                __$coverCall('js/Jencil.js', '27720:27773');
                return _this._togglePanel(0, callbackOn, callbackOff);
            };
            __$coverCall('js/Jencil.js', '27790:27810');
            this.fst.show = show;
            __$coverCall('js/Jencil.js', '27818:27838');
            this.fst.hide = hide;
            __$coverCall('js/Jencil.js', '27846:27970');
            this.snd.toggle = function (callbackOn, callbackOff) {
                __$coverCall('js/Jencil.js', '27908:27961');
                return _this._togglePanel(1, callbackOn, callbackOff);
            };
            __$coverCall('js/Jencil.js', '27978:27998');
            this.snd.show = show;
            __$coverCall('js/Jencil.js', '28006:28026');
            this.snd.hide = hide;
            __$coverCall('js/Jencil.js', '28034:28121');
            this.splitter.element.dblclick(function () {
                __$coverCall('js/Jencil.js', '28086:28111');
                return _this.snd.toggle();
            });
        }
        __$coverCall('js/Jencil.js', '28134:28264');
        MultiplePanel.prototype.init = function () {
            __$coverCall('js/Jencil.js', '28184:28204');
            this.splitter.init();
            __$coverCall('js/Jencil.js', '28212:28227');
            this.fst.init();
            __$coverCall('js/Jencil.js', '28235:28257');
            return this.snd.init();
        };
        __$coverCall('js/Jencil.js', '28271:29332');
        MultiplePanel.prototype._togglePanel = function (to, callbackOn, callbackOff) {
            __$coverCall('js/Jencil.js', '28356:28422');
            var callbackDone, end, volume, _callbackDone, _this = this;
            __$coverCall('js/Jencil.js', '28430:28484');
            if (MultiplePanel._animating) {
                __$coverCall('js/Jencil.js', '28470:28476');
                return;
            }
            __$coverCall('js/Jencil.js', '28492:28523');
            volume = this.splitter.volume();
            __$coverCall('js/Jencil.js', '28531:28550');
            callbackDone = null;
            __$coverCall('js/Jencil.js', '28558:28885');
            if (0 < volume && volume < 1) {
                __$coverCall('js/Jencil.js', '28600:28608');
                end = to;
                __$coverCall('js/Jencil.js', '28618:28656');
                this.splitter._previousVolume = volume;
                __$coverCall('js/Jencil.js', '28666:28693');
                _callbackDone = callbackOff;
            } else {
                __$coverCall('js/Jencil.js', '28718:28784');
                end = this.splitter._previousVolume || this.splitter.defaultVolume;
                __$coverCall('js/Jencil.js', '28794:28841');
                if (end === to) {
                    __$coverCall('js/Jencil.js', '28822:28831');
                    end = 0.5;
                }
                __$coverCall('js/Jencil.js', '28851:28877');
                _callbackDone = callbackOn;
            }
            __$coverCall('js/Jencil.js', '28893:28924');
            MultiplePanel._animating = true;
            __$coverCall('js/Jencil.js', '28932:29088');
            callbackDone = function () {
                __$coverCall('js/Jencil.js', '28968:29000');
                MultiplePanel._animating = false;
                __$coverCall('js/Jencil.js', '29010:29079');
                return typeof _callbackDone === 'function' ? _callbackDone() : void 0;
            };
            __$coverCall('js/Jencil.js', '29096:29325');
            return animate({
                start: volume,
                end: end,
                duration: 500,
                callbackEach: function (value, epoch) {
                    __$coverCall('js/Jencil.js', '29234:29269');
                    return _this.splitter.volume(value);
                },
                callbackDone: callbackDone
            });
        };
        __$coverCall('js/Jencil.js', '29339:29359');
        return MultiplePanel;
    }(Panel);
    __$coverCall('js/Jencil.js', '29378:30157');
    VerticalPanel = function (_super) {
        __$coverCall('js/Jencil.js', '29419:29451');
        __extends(VerticalPanel, _super);
        __$coverCall('js/Jencil.js', '29458:29801');
        function VerticalPanel(core, fst, snd, defaultVolume) {
            __$coverCall('js/Jencil.js', '29520:29532');
            var splitter;
            __$coverCall('js/Jencil.js', '29540:29604');
            if (defaultVolume == null) {
                __$coverCall('js/Jencil.js', '29577:29596');
                defaultVolume = 0.5;
            }
            __$coverCall('js/Jencil.js', '29612:29674');
            splitter = new VerticalSplitter(core, fst, snd, defaultVolume);
            __$coverCall('js/Jencil.js', '29682:29754');
            VerticalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
            __$coverCall('js/Jencil.js', '29762:29795');
            this.element.addClass('vertical');
        }
        __$coverCall('js/Jencil.js', '29808:30108');
        VerticalPanel.prototype.adjust = function () {
            __$coverCall('js/Jencil.js', '29860:29917');
            this.fst.element.outerHeight(true, this.element.height());
            __$coverCall('js/Jencil.js', '29925:29982');
            this.snd.element.outerHeight(true, this.element.height());
            __$coverCall('js/Jencil.js', '29990:30052');
            this.splitter.element.outerHeight(true, this.element.height());
            __$coverCall('js/Jencil.js', '30060:30082');
            this.splitter.adjust();
            __$coverCall('js/Jencil.js', '30090:30101');
            return this;
        };
        __$coverCall('js/Jencil.js', '30115:30135');
        return VerticalPanel;
    }(MultiplePanel);
    __$coverCall('js/Jencil.js', '30162:30951');
    HorizontalPanel = function (_super) {
        __$coverCall('js/Jencil.js', '30205:30239');
        __extends(HorizontalPanel, _super);
        __$coverCall('js/Jencil.js', '30246:30597');
        function HorizontalPanel(core, fst, snd, defaultVolume) {
            __$coverCall('js/Jencil.js', '30310:30322');
            var splitter;
            __$coverCall('js/Jencil.js', '30330:30394');
            if (defaultVolume == null) {
                __$coverCall('js/Jencil.js', '30367:30386');
                defaultVolume = 0.5;
            }
            __$coverCall('js/Jencil.js', '30402:30466');
            splitter = new HorizontalSplitter(core, fst, snd, defaultVolume);
            __$coverCall('js/Jencil.js', '30474:30548');
            HorizontalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
            __$coverCall('js/Jencil.js', '30556:30591');
            this.element.addClass('horizontal');
        }
        __$coverCall('js/Jencil.js', '30604:30900');
        HorizontalPanel.prototype.adjust = function () {
            __$coverCall('js/Jencil.js', '30658:30713');
            this.fst.element.outerWidth(true, this.element.width());
            __$coverCall('js/Jencil.js', '30721:30776');
            this.snd.element.outerWidth(true, this.element.width());
            __$coverCall('js/Jencil.js', '30784:30844');
            this.splitter.element.outerWidth(true, this.element.width());
            __$coverCall('js/Jencil.js', '30852:30874');
            this.splitter.adjust();
            __$coverCall('js/Jencil.js', '30882:30893');
            return this;
        };
        __$coverCall('js/Jencil.js', '30907:30929');
        return HorizontalPanel;
    }(MultiplePanel);
    __$coverCall('js/Jencil.js', '30956:31204');
    namespace('Jencil.widgets', function (exports) {
        __$coverCall('js/Jencil.js', '31008:31031');
        exports.Widget = Widget;
        __$coverCall('js/Jencil.js', '31037:31058');
        exports.Panel = Panel;
        __$coverCall('js/Jencil.js', '31064:31101');
        exports.MultiplePanel = MultiplePanel;
        __$coverCall('js/Jencil.js', '31107:31144');
        exports.VerticalPanel = VerticalPanel;
        __$coverCall('js/Jencil.js', '31150:31198');
        return exports.HorizontalPanel = HorizontalPanel;
    });
    __$coverCall('js/Jencil.js', '31209:34029');
    Splitter = function (_super) {
        __$coverCall('js/Jencil.js', '31245:31272');
        __extends(Splitter, _super);
        __$coverCall('js/Jencil.js', '31279:32925');
        function Splitter(core, fst, snd, defaultVolume) {
            __$coverCall('js/Jencil.js', '31336:31380');
            var mousemove, mouseup, _this = this;
            __$coverCall('js/Jencil.js', '31388:31402');
            this.fst = fst;
            __$coverCall('js/Jencil.js', '31410:31424');
            this.snd = snd;
            __$coverCall('js/Jencil.js', '31432:31496');
            this.defaultVolume = defaultVolume != null ? defaultVolume : 0.5;
            __$coverCall('js/Jencil.js', '31504:31551');
            Splitter.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.js', '31559:31592');
            this.element.addClass('splitter');
            __$coverCall('js/Jencil.js', '31600:31633');
            this._volume = this.defaultVolume;
            __$coverCall('js/Jencil.js', '31641:32003');
            mousemove = function (e) {
                __$coverCall('js/Jencil.js', '31675:31690');
                var _ref, _ref1;
                __$coverCall('js/Jencil.js', '31700:31718');
                _this.mousemove(e);
                __$coverCall('js/Jencil.js', '31728:31804');
                if ((_ref = _this.fst.curtain) != null) {
                    __$coverCall('js/Jencil.js', '31780:31794');
                    _ref.refresh();
                }
                __$coverCall('js/Jencil.js', '31814:31892');
                if ((_ref1 = _this.snd.curtain) != null) {
                    __$coverCall('js/Jencil.js', '31867:31882');
                    _ref1.refresh();
                }
                __$coverCall('js/Jencil.js', '31902:31921');
                e.stopPropagation();
                __$coverCall('js/Jencil.js', '31931:31959');
                e.stopImmediatePropagation();
                __$coverCall('js/Jencil.js', '31969:31994');
                return e.preventDefault();
            };
            __$coverCall('js/Jencil.js', '32011:32465');
            mouseup = function (e) {
                __$coverCall('js/Jencil.js', '32043:32067');
                var $window, _ref, _ref1;
                __$coverCall('js/Jencil.js', '32077:32096');
                $window = $(window);
                __$coverCall('js/Jencil.js', '32106:32144');
                $window.unbind('mousemove', mousemove);
                __$coverCall('js/Jencil.js', '32154:32188');
                $window.unbind('mouseup', mouseup);
                __$coverCall('js/Jencil.js', '32198:32270');
                if ((_ref = _this.fst.curtain) != null) {
                    __$coverCall('js/Jencil.js', '32250:32260');
                    _ref.off();
                }
                __$coverCall('js/Jencil.js', '32280:32354');
                if ((_ref1 = _this.snd.curtain) != null) {
                    __$coverCall('js/Jencil.js', '32333:32344');
                    _ref1.off();
                }
                __$coverCall('js/Jencil.js', '32364:32383');
                e.stopPropagation();
                __$coverCall('js/Jencil.js', '32393:32421');
                e.stopImmediatePropagation();
                __$coverCall('js/Jencil.js', '32431:32456');
                return e.preventDefault();
            };
            __$coverCall('js/Jencil.js', '32473:32919');
            this.element.mousedown(function (e) {
                __$coverCall('js/Jencil.js', '32518:32542');
                var $window, _ref, _ref1;
                __$coverCall('js/Jencil.js', '32552:32571');
                $window = $(window);
                __$coverCall('js/Jencil.js', '32581:32609');
                $window.mousemove(mousemove);
                __$coverCall('js/Jencil.js', '32619:32643');
                $window.mouseup(mouseup);
                __$coverCall('js/Jencil.js', '32653:32724');
                if ((_ref = _this.fst.curtain) != null) {
                    __$coverCall('js/Jencil.js', '32705:32714');
                    _ref.on();
                }
                __$coverCall('js/Jencil.js', '32734:32807');
                if ((_ref1 = _this.snd.curtain) != null) {
                    __$coverCall('js/Jencil.js', '32787:32797');
                    _ref1.on();
                }
                __$coverCall('js/Jencil.js', '32817:32836');
                e.stopPropagation();
                __$coverCall('js/Jencil.js', '32846:32874');
                e.stopImmediatePropagation();
                __$coverCall('js/Jencil.js', '32884:32909');
                return e.preventDefault();
            });
        }
        __$coverCall('js/Jencil.js', '32932:33050');
        Splitter.prototype.init = function () {
            __$coverCall('js/Jencil.js', '32977:33024');
            this.container = evolute(this.element.parent());
            __$coverCall('js/Jencil.js', '33032:33043');
            return this;
        };
        __$coverCall('js/Jencil.js', '33057:33339');
        Splitter.prototype.volume = function (value, skip) {
            __$coverCall('js/Jencil.js', '33115:33163');
            if (skip == null) {
                __$coverCall('js/Jencil.js', '33143:33155');
                skip = false;
            }
            __$coverCall('js/Jencil.js', '33171:33305');
            if (value != null) {
                __$coverCall('js/Jencil.js', '33200:33220');
                this._volume = value;
                __$coverCall('js/Jencil.js', '33230:33276');
                if (!skip) {
                    __$coverCall('js/Jencil.js', '33253:33266');
                    this.adjust();
                }
                __$coverCall('js/Jencil.js', '33286:33297');
                return this;
            }
            __$coverCall('js/Jencil.js', '33313:33332');
            return this._volume;
        };
        __$coverCall('js/Jencil.js', '33346:33681');
        Splitter.prototype.value = function (value, skip) {
            __$coverCall('js/Jencil.js', '33403:33425');
            var valueWidth, volume;
            __$coverCall('js/Jencil.js', '33433:33481');
            if (skip == null) {
                __$coverCall('js/Jencil.js', '33461:33473');
                skip = false;
            }
            __$coverCall('js/Jencil.js', '33489:33519');
            valueWidth = this.valueWidth();
            __$coverCall('js/Jencil.js', '33527:33633');
            if (value != null) {
                __$coverCall('js/Jencil.js', '33556:33583');
                volume = value / valueWidth;
                __$coverCall('js/Jencil.js', '33593:33625');
                return this.volume(volume, skip);
            }
            __$coverCall('js/Jencil.js', '33641:33674');
            return this.volume() * valueWidth;
        };
        __$coverCall('js/Jencil.js', '33688:33992');
        Splitter.prototype.regulateValue = function (value) {
            __$coverCall('js/Jencil.js', '33747:33769');
            var maxValue, minValue;
            __$coverCall('js/Jencil.js', '33777:33803');
            minValue = this.minValue();
            __$coverCall('js/Jencil.js', '33811:33837');
            maxValue = this.maxValue();
            __$coverCall('js/Jencil.js', '33845:33901');
            if (value < minValue) {
                __$coverCall('js/Jencil.js', '33877:33893');
                value = minValue;
            }
            __$coverCall('js/Jencil.js', '33909:33965');
            if (value > maxValue) {
                __$coverCall('js/Jencil.js', '33941:33957');
                value = maxValue;
            }
            __$coverCall('js/Jencil.js', '33973:33985');
            return value;
        };
        __$coverCall('js/Jencil.js', '33999:34014');
        return Splitter;
    }(Widget);
    __$coverCall('js/Jencil.js', '34034:37462');
    VerticalSplitter = function (_super) {
        __$coverCall('js/Jencil.js', '34078:34113');
        __extends(VerticalSplitter, _super);
        __$coverCall('js/Jencil.js', '34120:34742');
        function VerticalSplitter(core, fst, snd, defaultVolume) {
            __$coverCall('js/Jencil.js', '34185:34200');
            var _ref, _ref1;
            __$coverCall('js/Jencil.js', '34208:34288');
            VerticalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);
            __$coverCall('js/Jencil.js', '34296:34329');
            this.element.addClass('vertical');
            __$coverCall('js/Jencil.js', '34337:34370');
            this.fst.element.addClass('left');
            __$coverCall('js/Jencil.js', '34378:34412');
            this.snd.element.addClass('right');
            __$coverCall('js/Jencil.js', '34420:34475');
            this.fst.element.css({ 'float': 'left' });
            __$coverCall('js/Jencil.js', '34483:34538');
            this.snd.element.css({ 'float': 'left' });
            __$coverCall('js/Jencil.js', '34546:34636');
            if ((_ref = this.fst.curtain) != null) {
                __$coverCall('js/Jencil.js', '34595:34628');
                _ref.css('pointer', 'col-resize');
            }
            __$coverCall('js/Jencil.js', '34644:34736');
            if ((_ref1 = this.snd.curtain) != null) {
                __$coverCall('js/Jencil.js', '34694:34728');
                _ref1.css('pointer', 'col-resize');
            }
        }
        __$coverCall('js/Jencil.js', '34749:35012');
        VerticalSplitter.prototype.mousemove = function (e) {
            __$coverCall('js/Jencil.js', '34808:34825');
            var offset, value;
            __$coverCall('js/Jencil.js', '34833:34900');
            offset = this.container.absoluteX() + this.container.contentX(true);
            __$coverCall('js/Jencil.js', '34908:34932');
            value = e.pageX - offset;
            __$coverCall('js/Jencil.js', '34940:34973');
            value = this.regulateValue(value);
            __$coverCall('js/Jencil.js', '34981:35005');
            return this.value(value);
        };
        __$coverCall('js/Jencil.js', '35019:35114');
        VerticalSplitter.prototype.valueWidth = function () {
            __$coverCall('js/Jencil.js', '35078:35107');
            return this.container.width();
        };
        __$coverCall('js/Jencil.js', '35121:35531');
        VerticalSplitter.prototype.minValue = function () {
            __$coverCall('js/Jencil.js', '35178:35188');
            var m1, m2;
            __$coverCall('js/Jencil.js', '35196:35265');
            m1 = this.fst.element.minWidth() + this.fst.element.nonContentWidth();
            __$coverCall('js/Jencil.js', '35273:35305');
            m2 = this.snd.element.maxWidth();
            __$coverCall('js/Jencil.js', '35313:35413');
            if (m2 != null) {
                __$coverCall('js/Jencil.js', '35339:35405');
                m2 = this.valueWidth() - (m2 + this.snd.element.nonContentWidth());
            }
            __$coverCall('js/Jencil.js', '35421:35496');
            if (m1 != null && m2 != null) {
                __$coverCall('js/Jencil.js', '35465:35488');
                return Math.max(m1, m2);
            }
            __$coverCall('js/Jencil.js', '35504:35524');
            return m1 || m2 || 0;
        };
        __$coverCall('js/Jencil.js', '35538:36047');
        VerticalSplitter.prototype.maxValue = function () {
            __$coverCall('js/Jencil.js', '35595:35617');
            var m1, m2, valueWidth;
            __$coverCall('js/Jencil.js', '35625:35655');
            valueWidth = this.valueWidth();
            __$coverCall('js/Jencil.js', '35663:35695');
            m1 = this.fst.element.maxWidth();
            __$coverCall('js/Jencil.js', '35703:35781');
            if (m1 != null) {
                __$coverCall('js/Jencil.js', '35729:35773');
                m1 = m1 + this.fst.element.nonContentWidth();
            }
            __$coverCall('js/Jencil.js', '35789:35858');
            m2 = this.snd.element.minWidth() + this.snd.element.nonContentWidth();
            __$coverCall('js/Jencil.js', '35866:35920');
            if (m2 != null) {
                __$coverCall('js/Jencil.js', '35892:35912');
                m2 = valueWidth - m2;
            }
            __$coverCall('js/Jencil.js', '35928:36003');
            if (m1 != null && m2 != null) {
                __$coverCall('js/Jencil.js', '35972:35995');
                return Math.min(m1, m2);
            }
            __$coverCall('js/Jencil.js', '36011:36040');
            return m1 || m2 || valueWidth;
        };
        __$coverCall('js/Jencil.js', '36054:37415');
        VerticalSplitter.prototype.adjust = function () {
            __$coverCall('js/Jencil.js', '36109:36150');
            var fstValue, sndValue, value, valueWidth;
            __$coverCall('js/Jencil.js', '36158:36178');
            value = this.value();
            __$coverCall('js/Jencil.js', '36186:36216');
            valueWidth = this.valueWidth();
            __$coverCall('js/Jencil.js', '36224:36281');
            fstValue = value - this.fst.element.nonContentWidth(true);
            __$coverCall('js/Jencil.js', '36289:36361');
            sndValue = valueWidth - value - this.snd.element.nonContentWidth(true);
            __$coverCall('js/Jencil.js', '36369:37270');
            if (fstValue <= 0) {
                __$coverCall('js/Jencil.js', '36398:36480');
                if (this.fst.element.is(':visible')) {
                    __$coverCall('js/Jencil.js', '36447:36470');
                    this.fst.element.hide();
                }
                __$coverCall('js/Jencil.js', '36490:36573');
                if (!this.snd.element.is(':visible')) {
                    __$coverCall('js/Jencil.js', '36540:36563');
                    this.snd.element.show();
                }
                __$coverCall('js/Jencil.js', '36583:36628');
                this.snd.element.outerWidth(true, valueWidth);
                __$coverCall('js/Jencil.js', '36638:36661');
                this._value = value = 0;
            } else if (sndValue <= 0) {
                __$coverCall('js/Jencil.js', '36705:36788');
                if (!this.fst.element.is(':visible')) {
                    __$coverCall('js/Jencil.js', '36755:36778');
                    this.fst.element.show();
                }
                __$coverCall('js/Jencil.js', '36798:36880');
                if (this.snd.element.is(':visible')) {
                    __$coverCall('js/Jencil.js', '36847:36870');
                    this.snd.element.hide();
                }
                __$coverCall('js/Jencil.js', '36890:36935');
                this.fst.element.outerWidth(true, valueWidth);
                __$coverCall('js/Jencil.js', '36945:36977');
                this._value = value = valueWidth;
            } else {
                __$coverCall('js/Jencil.js', '37002:37085');
                if (!this.fst.element.is(':visible')) {
                    __$coverCall('js/Jencil.js', '37052:37075');
                    this.fst.element.show();
                }
                __$coverCall('js/Jencil.js', '37095:37178');
                if (!this.snd.element.is(':visible')) {
                    __$coverCall('js/Jencil.js', '37145:37168');
                    this.snd.element.show();
                }
                __$coverCall('js/Jencil.js', '37188:37220');
                this.fst.element.width(fstValue);
                __$coverCall('js/Jencil.js', '37230:37262');
                this.snd.element.width(sndValue);
            }
            __$coverCall('js/Jencil.js', '37278:37295');
            this.fst.adjust();
            __$coverCall('js/Jencil.js', '37303:37320');
            this.snd.adjust();
            __$coverCall('js/Jencil.js', '37328:37389');
            this.element.relativeX(value - this.element.outerWidth() / 2);
            __$coverCall('js/Jencil.js', '37397:37408');
            return this;
        };
        __$coverCall('js/Jencil.js', '37422:37445');
        return VerticalSplitter;
    }(Splitter);
    __$coverCall('js/Jencil.js', '37467:40807');
    HorizontalSplitter = function (_super) {
        __$coverCall('js/Jencil.js', '37513:37550');
        __extends(HorizontalSplitter, _super);
        __$coverCall('js/Jencil.js', '37557:38059');
        function HorizontalSplitter(core, fst, snd, defaultVolume) {
            __$coverCall('js/Jencil.js', '37624:37639');
            var _ref, _ref1;
            __$coverCall('js/Jencil.js', '37647:37729');
            HorizontalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);
            __$coverCall('js/Jencil.js', '37737:37772');
            this.element.addClass('horizontal');
            __$coverCall('js/Jencil.js', '37780:37812');
            this.fst.element.addClass('top');
            __$coverCall('js/Jencil.js', '37820:37855');
            this.snd.element.addClass('bottom');
            __$coverCall('js/Jencil.js', '37863:37953');
            if ((_ref = this.fst.curtain) != null) {
                __$coverCall('js/Jencil.js', '37912:37945');
                _ref.css('pointer', 'raw-resize');
            }
            __$coverCall('js/Jencil.js', '37961:38053');
            if ((_ref1 = this.snd.curtain) != null) {
                __$coverCall('js/Jencil.js', '38011:38045');
                _ref1.css('pointer', 'raw-resize');
            }
        }
        __$coverCall('js/Jencil.js', '38066:38331');
        HorizontalSplitter.prototype.mousemove = function (e) {
            __$coverCall('js/Jencil.js', '38127:38144');
            var offset, value;
            __$coverCall('js/Jencil.js', '38152:38219');
            offset = this.container.absoluteY() + this.container.contentY(true);
            __$coverCall('js/Jencil.js', '38227:38251');
            value = e.pageY - offset;
            __$coverCall('js/Jencil.js', '38259:38292');
            value = this.regulateValue(value);
            __$coverCall('js/Jencil.js', '38300:38324');
            return this.value(value);
        };
        __$coverCall('js/Jencil.js', '38338:38436');
        HorizontalSplitter.prototype.valueWidth = function () {
            __$coverCall('js/Jencil.js', '38399:38429');
            return this.container.height();
        };
        __$coverCall('js/Jencil.js', '38443:38859');
        HorizontalSplitter.prototype.minValue = function () {
            __$coverCall('js/Jencil.js', '38502:38512');
            var m1, m2;
            __$coverCall('js/Jencil.js', '38520:38591');
            m1 = this.fst.element.minHeight() + this.fst.element.nonContentHeight();
            __$coverCall('js/Jencil.js', '38599:38632');
            m2 = this.snd.element.maxHeight();
            __$coverCall('js/Jencil.js', '38640:38741');
            if (m2 != null) {
                __$coverCall('js/Jencil.js', '38666:38733');
                m2 = this.valueWidth() - (m2 + this.snd.element.nonContentHeight());
            }
            __$coverCall('js/Jencil.js', '38749:38824');
            if (m1 != null && m2 != null) {
                __$coverCall('js/Jencil.js', '38793:38816');
                return Math.max(m1, m2);
            }
            __$coverCall('js/Jencil.js', '38832:38852');
            return m1 || m2 || 0;
        };
        __$coverCall('js/Jencil.js', '38866:39381');
        HorizontalSplitter.prototype.maxValue = function () {
            __$coverCall('js/Jencil.js', '38925:38947');
            var m1, m2, valueWidth;
            __$coverCall('js/Jencil.js', '38955:38985');
            valueWidth = this.valueWidth();
            __$coverCall('js/Jencil.js', '38993:39026');
            m1 = this.fst.element.maxHeight();
            __$coverCall('js/Jencil.js', '39034:39113');
            if (m1 != null) {
                __$coverCall('js/Jencil.js', '39060:39105');
                m1 = m1 + this.fst.element.nonContentHeight();
            }
            __$coverCall('js/Jencil.js', '39121:39192');
            m2 = this.snd.element.minHeight() + this.snd.element.nonContentHeight();
            __$coverCall('js/Jencil.js', '39200:39254');
            if (m2 != null) {
                __$coverCall('js/Jencil.js', '39226:39246');
                m2 = valueWidth - m2;
            }
            __$coverCall('js/Jencil.js', '39262:39337');
            if (m1 != null && m2 != null) {
                __$coverCall('js/Jencil.js', '39306:39329');
                return Math.min(m1, m2);
            }
            __$coverCall('js/Jencil.js', '39345:39374');
            return m1 || m2 || valueWidth;
        };
        __$coverCall('js/Jencil.js', '39388:40758');
        HorizontalSplitter.prototype.adjust = function () {
            __$coverCall('js/Jencil.js', '39445:39486');
            var fstValue, sndValue, value, valueWidth;
            __$coverCall('js/Jencil.js', '39494:39514');
            value = this.value();
            __$coverCall('js/Jencil.js', '39522:39552');
            valueWidth = this.valueWidth();
            __$coverCall('js/Jencil.js', '39560:39618');
            fstValue = value - this.fst.element.nonContentHeight(true);
            __$coverCall('js/Jencil.js', '39626:39699');
            sndValue = valueWidth - value - this.snd.element.nonContentHeight(true);
            __$coverCall('js/Jencil.js', '39707:40612');
            if (fstValue <= 0) {
                __$coverCall('js/Jencil.js', '39736:39818');
                if (this.fst.element.is(':visible')) {
                    __$coverCall('js/Jencil.js', '39785:39808');
                    this.fst.element.hide();
                }
                __$coverCall('js/Jencil.js', '39828:39911');
                if (!this.snd.element.is(':visible')) {
                    __$coverCall('js/Jencil.js', '39878:39901');
                    this.snd.element.show();
                }
                __$coverCall('js/Jencil.js', '39921:39967');
                this.snd.element.outerHeight(true, valueWidth);
                __$coverCall('js/Jencil.js', '39977:40000');
                this._value = value = 0;
            } else if (sndValue <= 0) {
                __$coverCall('js/Jencil.js', '40044:40127');
                if (!this.fst.element.is(':visible')) {
                    __$coverCall('js/Jencil.js', '40094:40117');
                    this.fst.element.show();
                }
                __$coverCall('js/Jencil.js', '40137:40219');
                if (this.snd.element.is(':visible')) {
                    __$coverCall('js/Jencil.js', '40186:40209');
                    this.snd.element.hide();
                }
                __$coverCall('js/Jencil.js', '40229:40275');
                this.fst.element.outerHeight(true, valueWidth);
                __$coverCall('js/Jencil.js', '40285:40317');
                this._value = value = valueWidth;
            } else {
                __$coverCall('js/Jencil.js', '40342:40425');
                if (!this.fst.element.is(':visible')) {
                    __$coverCall('js/Jencil.js', '40392:40415');
                    this.fst.element.show();
                }
                __$coverCall('js/Jencil.js', '40435:40518');
                if (!this.snd.element.is(':visible')) {
                    __$coverCall('js/Jencil.js', '40485:40508');
                    this.snd.element.show();
                }
                __$coverCall('js/Jencil.js', '40528:40561');
                this.fst.element.height(fstValue);
                __$coverCall('js/Jencil.js', '40571:40604');
                this.snd.element.height(sndValue);
            }
            __$coverCall('js/Jencil.js', '40620:40637');
            this.fst.adjust();
            __$coverCall('js/Jencil.js', '40645:40662');
            this.snd.adjust();
            __$coverCall('js/Jencil.js', '40670:40732');
            this.element.relativeY(value - this.element.outerHeight() / 2);
            __$coverCall('js/Jencil.js', '40740:40751');
            return this;
        };
        __$coverCall('js/Jencil.js', '40765:40790');
        return HorizontalSplitter;
    }(Splitter);
    __$coverCall('js/Jencil.js', '40812:41008');
    namespace('Jencil.splitters', function (exports) {
        __$coverCall('js/Jencil.js', '40866:40893');
        exports.Splitter = Splitter;
        __$coverCall('js/Jencil.js', '40899:40942');
        exports.VerticalSplitter = VerticalSplitter;
        __$coverCall('js/Jencil.js', '40948:41002');
        return exports.HorizontalSplitter = HorizontalSplitter;
    });
    __$coverCall('js/Jencil.js', '41013:42531');
    BaseEditor = function (_super) {
        __$coverCall('js/Jencil.js', '41051:41080');
        __extends(BaseEditor, _super);
        __$coverCall('js/Jencil.js', '41087:41353');
        function BaseEditor(core, selector, context) {
            __$coverCall('js/Jencil.js', '41140:41198');
            if (selector == null) {
                __$coverCall('js/Jencil.js', '41172:41190');
                selector = '<div>';
            }
            __$coverCall('js/Jencil.js', '41206:41274');
            BaseEditor.__super__.constructor.call(this, core, selector, context);
            __$coverCall('js/Jencil.js', '41282:41313');
            this.element.addClass('editor');
            __$coverCall('js/Jencil.js', '41321:41347');
            this._changeCallbacks = [];
        }
        __$coverCall('js/Jencil.js', '41360:41456');
        BaseEditor.prototype.val = function (value) {
            __$coverCall('js/Jencil.js', '41411:41449');
            throw new Error('NotImplementedError');
        };
        __$coverCall('js/Jencil.js', '41463:41841');
        BaseEditor.prototype.change = function (callback) {
            __$coverCall('js/Jencil.js', '41520:41538');
            var _i, _len, _ref;
            __$coverCall('js/Jencil.js', '41546:41643');
            if (callback != null) {
                __$coverCall('js/Jencil.js', '41578:41614');
                this._changeCallbacks.push(callback);
                __$coverCall('js/Jencil.js', '41624:41635');
                return this;
            }
            __$coverCall('js/Jencil.js', '41651:41679');
            _ref = this._changeCallbacks;
            __$coverCall('js/Jencil.js', '41687:41815');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                __$coverCall('js/Jencil.js', '41747:41766');
                callback = _ref[_i];
                __$coverCall('js/Jencil.js', '41776:41807');
                callback.call(this, this.val());
            }
            __$coverCall('js/Jencil.js', '41823:41834');
            return this;
        };
        __$coverCall('js/Jencil.js', '41848:41878');
        BaseEditor.prototype.h1 = null;
        __$coverCall('js/Jencil.js', '41885:41915');
        BaseEditor.prototype.h2 = null;
        __$coverCall('js/Jencil.js', '41922:41952');
        BaseEditor.prototype.h3 = null;
        __$coverCall('js/Jencil.js', '41959:41989');
        BaseEditor.prototype.h4 = null;
        __$coverCall('js/Jencil.js', '41996:42026');
        BaseEditor.prototype.h5 = null;
        __$coverCall('js/Jencil.js', '42033:42063');
        BaseEditor.prototype.h6 = null;
        __$coverCall('js/Jencil.js', '42070:42102');
        BaseEditor.prototype.bold = null;
        __$coverCall('js/Jencil.js', '42109:42143');
        BaseEditor.prototype.italic = null;
        __$coverCall('js/Jencil.js', '42150:42187');
        BaseEditor.prototype.underline = null;
        __$coverCall('js/Jencil.js', '42194:42228');
        BaseEditor.prototype.strike = null;
        __$coverCall('js/Jencil.js', '42235:42274');
        BaseEditor.prototype.superscript = null;
        __$coverCall('js/Jencil.js', '42281:42318');
        BaseEditor.prototype.subscript = null;
        __$coverCall('js/Jencil.js', '42325:42359');
        BaseEditor.prototype.anchor = null;
        __$coverCall('js/Jencil.js', '42366:42399');
        BaseEditor.prototype.image = null;
        __$coverCall('js/Jencil.js', '42406:42447');
        BaseEditor.prototype.unorderedList = null;
        __$coverCall('js/Jencil.js', '42454:42493');
        BaseEditor.prototype.orderedList = null;
        __$coverCall('js/Jencil.js', '42500:42517');
        return BaseEditor;
    }(Panel);
    __$coverCall('js/Jencil.js', '42536:45951');
    TextEditor = function (_super) {
        __$coverCall('js/Jencil.js', '42574:42603');
        __extends(TextEditor, _super);
        __$coverCall('js/Jencil.js', '42610:43667');
        function TextEditor(core, selector, context) {
            __$coverCall('js/Jencil.js', '42663:42679');
            var _this = this;
            __$coverCall('js/Jencil.js', '42687:42745');
            if (selector == null) {
                __$coverCall('js/Jencil.js', '42719:42737');
                selector = '<div>';
            }
            __$coverCall('js/Jencil.js', '42753:42821');
            TextEditor.__super__.constructor.call(this, core, selector, context);
            __$coverCall('js/Jencil.js', '42829:43023');
            this.textarea = $('<textarea>').appendTo(this.element).css({
                'margin': '0',
                'padding': '0',
                'border': 'none',
                'outline': 'none',
                'resize': 'none'
            });
            __$coverCall('js/Jencil.js', '43031:43069');
            this.textarea = evolute(this.textarea);
            __$coverCall('js/Jencil.js', '43077:43229');
            this.textarea.on('keydown', function (e) {
                __$coverCall('js/Jencil.js', '43127:43175');
                if (e.which !== 13) {
                    __$coverCall('js/Jencil.js', '43159:43165');
                    return;
                }
                __$coverCall('js/Jencil.js', '43185:43219');
                return _this.core.caretaker.save();
            });
            __$coverCall('js/Jencil.js', '43237:43401');
            if ($.fn.tabby != null && this.core.options.enableTabIndent) {
                __$coverCall('js/Jencil.js', '43310:43393');
                this.textarea.tabby({ 'tabString': this.core.options.tabString });
            }
            __$coverCall('js/Jencil.js', '43409:43454');
            this.textarea = autoIndentable(this.textarea);
            __$coverCall('js/Jencil.js', '43462:43555');
            if (!this.core.options.enableAutoIndent) {
                __$coverCall('js/Jencil.js', '43513:43547');
                this.textarea.autoIndent.disable();
            }
            __$coverCall('js/Jencil.js', '43563:43661');
            this.textarea.on('keypress keyup click blur', function () {
                __$coverCall('js/Jencil.js', '43630:43651');
                return _this.change();
            });
        }
        __$coverCall('js/Jencil.js', '43674:43871');
        TextEditor.prototype.val = function (value) {
            __$coverCall('js/Jencil.js', '43725:43830');
            if (value != null) {
                __$coverCall('js/Jencil.js', '43754:43778');
                this.textarea.val(value);
                __$coverCall('js/Jencil.js', '43788:43801');
                this.change();
                __$coverCall('js/Jencil.js', '43811:43822');
                return this;
            }
            __$coverCall('js/Jencil.js', '43838:43864');
            return this.textarea.val();
        };
        __$coverCall('js/Jencil.js', '43878:43973');
        TextEditor.prototype.focus = function () {
            __$coverCall('js/Jencil.js', '43926:43947');
            this.textarea.focus();
            __$coverCall('js/Jencil.js', '43955:43966');
            return this;
        };
        __$coverCall('js/Jencil.js', '43980:44060');
        TextEditor.prototype.createMemento = function () {
            __$coverCall('js/Jencil.js', '44036:44053');
            return this.val();
        };
        __$coverCall('js/Jencil.js', '44067:44158');
        TextEditor.prototype.setMemento = function (memento) {
            __$coverCall('js/Jencil.js', '44127:44151');
            return this.val(memento);
        };
        __$coverCall('js/Jencil.js', '44165:44342');
        TextEditor.prototype.adjust = function () {
            __$coverCall('js/Jencil.js', '44214:44260');
            this.textarea.outerWidth(this.element.width());
            __$coverCall('js/Jencil.js', '44268:44316');
            this.textarea.outerHeight(this.element.height());
            __$coverCall('js/Jencil.js', '44324:44335');
            return this;
        };
        __$coverCall('js/Jencil.js', '44349:44589');
        TextEditor.prototype.selectWholeLineIfNoSelectionFound = function () {
            __$coverCall('js/Jencil.js', '44425:44434');
            var caret;
            __$coverCall('js/Jencil.js', '44442:44481');
            caret = this.textarea.selection.caret();
            __$coverCall('js/Jencil.js', '44489:44582');
            if (caret[0] === caret[1]) {
                __$coverCall('js/Jencil.js', '44526:44574');
                this.textarea.selection.selectWholeCurrentLine();
            }
        };
        __$coverCall('js/Jencil.js', '44596:44940');
        TextEditor.prototype.selection = function (str, keepSelection) {
            __$coverCall('js/Jencil.js', '44666:44731');
            if (keepSelection == null) {
                __$coverCall('js/Jencil.js', '44703:44723');
                keepSelection = true;
            }
            __$coverCall('js/Jencil.js', '44739:44888');
            if (str != null) {
                __$coverCall('js/Jencil.js', '44766:44814');
                this.textarea.selection.text(str, keepSelection);
                __$coverCall('js/Jencil.js', '44824:44850');
                this.core.caretaker.save();
                __$coverCall('js/Jencil.js', '44860:44880');
                return this.change();
            }
            __$coverCall('js/Jencil.js', '44896:44933');
            return this.textarea.selection.text();
        };
        __$coverCall('js/Jencil.js', '44947:45258');
        TextEditor.prototype.enclose = function (b, a, keepSelection) {
            __$coverCall('js/Jencil.js', '45016:45081');
            if (keepSelection == null) {
                __$coverCall('js/Jencil.js', '45053:45073');
                keepSelection = true;
            }
            __$coverCall('js/Jencil.js', '45089:45129');
            this.selectWholeLineIfNoSelectionFound();
            __$coverCall('js/Jencil.js', '45137:45189');
            this.textarea.selection.enclose(b, a, keepSelection);
            __$coverCall('js/Jencil.js', '45197:45223');
            this.core.caretaker.save();
            __$coverCall('js/Jencil.js', '45231:45251');
            return this.change();
        };
        __$coverCall('js/Jencil.js', '45265:45584');
        TextEditor.prototype.insertBefore = function (str, keepSelection) {
            __$coverCall('js/Jencil.js', '45338:45403');
            if (keepSelection == null) {
                __$coverCall('js/Jencil.js', '45375:45395');
                keepSelection = true;
            }
            __$coverCall('js/Jencil.js', '45411:45451');
            this.selectWholeLineIfNoSelectionFound();
            __$coverCall('js/Jencil.js', '45459:45515');
            this.textarea.selection.insertBefore(str, keepSelection);
            __$coverCall('js/Jencil.js', '45523:45549');
            this.core.caretaker.save();
            __$coverCall('js/Jencil.js', '45557:45577');
            return this.change();
        };
        __$coverCall('js/Jencil.js', '45591:45908');
        TextEditor.prototype.insertAfter = function (str, keepSelection) {
            __$coverCall('js/Jencil.js', '45663:45728');
            if (keepSelection == null) {
                __$coverCall('js/Jencil.js', '45700:45720');
                keepSelection = true;
            }
            __$coverCall('js/Jencil.js', '45736:45776');
            this.selectWholeLineIfNoSelectionFound();
            __$coverCall('js/Jencil.js', '45784:45839');
            this.textarea.selection.insertAfter(str, keepSelection);
            __$coverCall('js/Jencil.js', '45847:45873');
            this.core.caretaker.save();
            __$coverCall('js/Jencil.js', '45881:45901');
            return this.change();
        };
        __$coverCall('js/Jencil.js', '45915:45932');
        return TextEditor;
    }(BaseEditor);
    __$coverCall('js/Jencil.js', '45956:46089');
    namespace('Jencil.editors', function (exports) {
        __$coverCall('js/Jencil.js', '46008:46039');
        exports.BaseEditor = BaseEditor;
        __$coverCall('js/Jencil.js', '46045:46083');
        return exports.TextEditor = TextEditor;
    });
    __$coverCall('js/Jencil.js', '46094:46551');
    BaseViewer = function (_super) {
        __$coverCall('js/Jencil.js', '46132:46161');
        __extends(BaseViewer, _super);
        __$coverCall('js/Jencil.js', '46168:46400');
        function BaseViewer(core, selector, context) {
            __$coverCall('js/Jencil.js', '46221:46279');
            if (selector == null) {
                __$coverCall('js/Jencil.js', '46253:46271');
                selector = '<div>';
            }
            __$coverCall('js/Jencil.js', '46287:46355');
            BaseViewer.__super__.constructor.call(this, core, selector, context);
            __$coverCall('js/Jencil.js', '46363:46394');
            this.element.addClass('viewer');
        }
        __$coverCall('js/Jencil.js', '46407:46513');
        BaseViewer.prototype.update = function (value, force) {
            __$coverCall('js/Jencil.js', '46468:46506');
            throw new Error('NotImplementedError');
        };
        __$coverCall('js/Jencil.js', '46520:46537');
        return BaseViewer;
    }(Panel);
    __$coverCall('js/Jencil.js', '46556:49174');
    TemplateViewer = function (_super) {
        __$coverCall('js/Jencil.js', '46598:46631');
        __extends(TemplateViewer, _super);
        __$coverCall('js/Jencil.js', '46638:48517');
        function TemplateViewer(core) {
            __$coverCall('js/Jencil.js', '46676:46729');
            TemplateViewer.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.js', '46737:46793');
            this.templatePath = this.core.options.viewerTemplatePath;
            __$coverCall('js/Jencil.js', '46801:46859');
            this.element.css({ 'position': 'relative' });
            __$coverCall('js/Jencil.js', '46867:46910');
            this.curtain = curtainFactory(this.element);
            __$coverCall('js/Jencil.js', '46918:47174');
            this.iframe = $('<iframe>').appendTo(this.element).css({
                margin: '0',
                padding: '0',
                border: 'none',
                outline: 'none',
                resize: 'none',
                width: '100%',
                height: '100%',
                overflow: 'visible'
            });
            __$coverCall('js/Jencil.js', '47182:47216');
            this.iframe.attr('frameborder', 0);
            __$coverCall('js/Jencil.js', '47224:47258');
            this.iframe = evolute(this.iframe);
            __$coverCall('js/Jencil.js', '47266:47588');
            this.iframe.init = function () {
                __$coverCall('js/Jencil.js', '47306:47316');
                var iframe;
                __$coverCall('js/Jencil.js', '47326:47346');
                iframe = this.get(0);
                __$coverCall('js/Jencil.js', '47356:47526');
                if (iframe.contentDocument != null) {
                    __$coverCall('js/Jencil.js', '47404:47442');
                    this.document = iframe.contentDocument;
                } else {
                    __$coverCall('js/Jencil.js', '47471:47516');
                    this.document = iframe.contentWindow.document;
                }
                __$coverCall('js/Jencil.js', '47536:47579');
                return this.document.write('<body></body>');
            };
            __$coverCall('js/Jencil.js', '47596:48223');
            this.iframe.write = function (value) {
                __$coverCall('js/Jencil.js', '47642:47655');
                var scrollTop;
                __$coverCall('js/Jencil.js', '47665:48192');
                if (this.document != null) {
                    __$coverCall('js/Jencil.js', '47704:47836');
                    try {
                        __$coverCall('js/Jencil.js', '47722:47773');
                        scrollTop = this.document.documentElement.scrollTop;
                    } catch (e) {
                        __$coverCall('js/Jencil.js', '47811:47824');
                        scrollTop = 0;
                    }
                    __$coverCall('js/Jencil.js', '47848:47868');
                    this.document.open();
                    __$coverCall('js/Jencil.js', '47880:47906');
                    this.document.write(value);
                    __$coverCall('js/Jencil.js', '47918:47939');
                    this.document.close();
                    __$coverCall('js/Jencil.js', '47951:48000');
                    $('a', $(this.document)).attr('target', '_blank');
                    __$coverCall('js/Jencil.js', '48012:48063');
                    this.document.documentElement.scrollTop = scrollTop;
                    __$coverCall('js/Jencil.js', '48075:48111');
                    this.width(this.document.scrollLeft);
                    __$coverCall('js/Jencil.js', '48123:48159');
                    this.height(this.document.scrollTop);
                    __$coverCall('js/Jencil.js', '48171:48182');
                    return true;
                }
                __$coverCall('js/Jencil.js', '48202:48214');
                return false;
            };
            __$coverCall('js/Jencil.js', '48231:48511');
            this.iframe.loadTemplate = function (templatePath, value) {
                __$coverCall('js/Jencil.js', '48298:48314');
                var _this = this;
                __$coverCall('js/Jencil.js', '48324:48502');
                return $.ajax({
                    url: templatePath,
                    success: function (data) {
                        __$coverCall('js/Jencil.js', '48417:48439');
                        _this._template = data;
                        __$coverCall('js/Jencil.js', '48453:48478');
                        return _this.write(value);
                    }
                });
            };
        }
        __$coverCall('js/Jencil.js', '48524:48607');
        TemplateViewer.prototype.init = function () {
            __$coverCall('js/Jencil.js', '48575:48600');
            return this.iframe.init();
        };
        __$coverCall('js/Jencil.js', '48614:48943');
        TemplateViewer.prototype.update = function (value, force) {
            __$coverCall('js/Jencil.js', '48679:48897');
            if (this.iframe._template != null) {
                __$coverCall('js/Jencil.js', '48724:48783');
                value = this.iframe._template.replace('{{content}}', value);
            } else if (this.templatePath != null) {
                __$coverCall('js/Jencil.js', '48839:48889');
                this.iframe.loadTemplate(this.templatePath, value);
            }
            __$coverCall('js/Jencil.js', '48905:48936');
            return this.iframe.write(value);
        };
        __$coverCall('js/Jencil.js', '48950:49127');
        TemplateViewer.prototype.adjust = function () {
            __$coverCall('js/Jencil.js', '49003:49047');
            this.iframe.outerWidth(this.element.width());
            __$coverCall('js/Jencil.js', '49055:49101');
            this.iframe.outerHeight(this.element.height());
            __$coverCall('js/Jencil.js', '49109:49120');
            return this;
        };
        __$coverCall('js/Jencil.js', '49134:49155');
        return TemplateViewer;
    }(BaseViewer);
    __$coverCall('js/Jencil.js', '49179:50375');
    AjaxViewer = function (_super) {
        __$coverCall('js/Jencil.js', '49217:49246');
        __extends(AjaxViewer, _super);
        __$coverCall('js/Jencil.js', '49253:49589');
        function AjaxViewer(core, config) {
            __$coverCall('js/Jencil.js', '49295:49315');
            this.config = config;
            __$coverCall('js/Jencil.js', '49323:49372');
            AjaxViewer.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.js', '49380:49583');
            this.config = jQuery.extend({
                type: 'GET',
                dataType: 'text',
                data: function (value) {
                    __$coverCall('js/Jencil.js', '49499:49531');
                    return encodeURIComponent(value);
                },
                url: null
            }, this.config);
        }
        __$coverCall('js/Jencil.js', '49596:50328');
        AjaxViewer.prototype.update = function (value, force) {
            __$coverCall('js/Jencil.js', '49657:49673');
            var _this = this;
            __$coverCall('js/Jencil.js', '49681:50321');
            if (this._valueCache !== value || force) {
                __$coverCall('js/Jencil.js', '49732:49756');
                this._valueCache = value;
                __$coverCall('js/Jencil.js', '49766:50313');
                return $.ajax({
                    type: this.config.type,
                    dataType: this.config.dataType,
                    data: JSON.stringify(this.config.data(value)),
                    url: this.config.url,
                    success: function (value) {
                        __$coverCall('js/Jencil.js', '49996:50243');
                        if (_this.iframe._template != null) {
                            __$coverCall('js/Jencil.js', '50048:50108');
                            value = _this.iframe._template.replace('{{content}}', value);
                        } else if (_this.templatePath != null) {
                            __$coverCall('js/Jencil.js', '50177:50229');
                            _this.iframe.loadTemplate(_this.templatePath, value);
                        }
                        __$coverCall('js/Jencil.js', '50257:50289');
                        return _this.iframe.write(value);
                    }
                });
            }
        };
        __$coverCall('js/Jencil.js', '50335:50352');
        return AjaxViewer;
    }(TemplateViewer);
    __$coverCall('js/Jencil.js', '50380:50558');
    namespace('Jencil.viewers', function (exports) {
        __$coverCall('js/Jencil.js', '50432:50463');
        exports.BaseViewer = BaseViewer;
        __$coverCall('js/Jencil.js', '50469:50508');
        exports.TemplateViewer = TemplateViewer;
        __$coverCall('js/Jencil.js', '50514:50552');
        return exports.AjaxViewer = AjaxViewer;
    });
    __$coverCall('js/Jencil.js', '50563:50907');
    BaseHelper = function (_super) {
        __$coverCall('js/Jencil.js', '50601:50630');
        __extends(BaseHelper, _super);
        __$coverCall('js/Jencil.js', '50637:50869');
        function BaseHelper(core, selector, context) {
            __$coverCall('js/Jencil.js', '50690:50748');
            if (selector == null) {
                __$coverCall('js/Jencil.js', '50722:50740');
                selector = '<div>';
            }
            __$coverCall('js/Jencil.js', '50756:50824');
            BaseHelper.__super__.constructor.call(this, core, selector, context);
            __$coverCall('js/Jencil.js', '50832:50863');
            this.element.addClass('helper');
        }
        __$coverCall('js/Jencil.js', '50876:50893');
        return BaseHelper;
    }(Panel);
    __$coverCall('js/Jencil.js', '50912:53189');
    TemplateHelper = function (_super) {
        __$coverCall('js/Jencil.js', '50954:50987');
        __extends(TemplateHelper, _super);
        __$coverCall('js/Jencil.js', '50994:52768');
        function TemplateHelper(core) {
            __$coverCall('js/Jencil.js', '51032:51085');
            TemplateHelper.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.js', '51093:51149');
            this.templatePath = this.core.options.helperTemplatePath;
            __$coverCall('js/Jencil.js', '51157:51215');
            this.element.css({ 'position': 'relative' });
            __$coverCall('js/Jencil.js', '51223:51266');
            this.curtain = curtainFactory(this.element);
            __$coverCall('js/Jencil.js', '51274:51530');
            this.iframe = $('<iframe>').appendTo(this.element).css({
                margin: '0',
                padding: '0',
                border: 'none',
                outline: 'none',
                resize: 'none',
                width: '100%',
                height: '100%',
                overflow: 'visible'
            });
            __$coverCall('js/Jencil.js', '51538:51572');
            this.iframe.attr('frameborder', 0);
            __$coverCall('js/Jencil.js', '51580:51614');
            this.iframe = evolute(this.iframe);
            __$coverCall('js/Jencil.js', '51622:51944');
            this.iframe.init = function () {
                __$coverCall('js/Jencil.js', '51662:51672');
                var iframe;
                __$coverCall('js/Jencil.js', '51682:51702');
                iframe = this.get(0);
                __$coverCall('js/Jencil.js', '51712:51882');
                if (iframe.contentDocument != null) {
                    __$coverCall('js/Jencil.js', '51760:51798');
                    this.document = iframe.contentDocument;
                } else {
                    __$coverCall('js/Jencil.js', '51827:51872');
                    this.document = iframe.contentWindow.document;
                }
                __$coverCall('js/Jencil.js', '51892:51935');
                return this.document.write('<body></body>');
            };
            __$coverCall('js/Jencil.js', '51952:52518');
            this.iframe.write = function (value) {
                __$coverCall('js/Jencil.js', '51998:52011');
                var scrollTop;
                __$coverCall('js/Jencil.js', '52021:52487');
                if (this.document != null) {
                    __$coverCall('js/Jencil.js', '52060:52192');
                    try {
                        __$coverCall('js/Jencil.js', '52078:52129');
                        scrollTop = this.document.documentElement.scrollTop;
                    } catch (e) {
                        __$coverCall('js/Jencil.js', '52167:52180');
                        scrollTop = 0;
                    }
                    __$coverCall('js/Jencil.js', '52204:52224');
                    this.document.open();
                    __$coverCall('js/Jencil.js', '52236:52262');
                    this.document.write(value);
                    __$coverCall('js/Jencil.js', '52274:52295');
                    this.document.close();
                    __$coverCall('js/Jencil.js', '52307:52358');
                    this.document.documentElement.scrollTop = scrollTop;
                    __$coverCall('js/Jencil.js', '52370:52406');
                    this.width(this.document.scrollLeft);
                    __$coverCall('js/Jencil.js', '52418:52454');
                    this.height(this.document.scrollTop);
                    __$coverCall('js/Jencil.js', '52466:52477');
                    return true;
                }
                __$coverCall('js/Jencil.js', '52497:52509');
                return false;
            };
            __$coverCall('js/Jencil.js', '52526:52762');
            this.iframe.loadTemplate = function (templatePath) {
                __$coverCall('js/Jencil.js', '52586:52602');
                var _this = this;
                __$coverCall('js/Jencil.js', '52612:52753');
                return $.ajax({
                    url: templatePath,
                    success: function (data) {
                        __$coverCall('js/Jencil.js', '52705:52729');
                        return _this.write(data);
                    }
                });
            };
        }
        __$coverCall('js/Jencil.js', '52775:52958');
        TemplateHelper.prototype.init = function () {
            __$coverCall('js/Jencil.js', '52826:52844');
            this.iframe.init();
            __$coverCall('js/Jencil.js', '52852:52951');
            if (this.templatePath != null) {
                __$coverCall('js/Jencil.js', '52893:52943');
                return this.iframe.loadTemplate(this.templatePath);
            }
        };
        __$coverCall('js/Jencil.js', '52965:53142');
        TemplateHelper.prototype.adjust = function () {
            __$coverCall('js/Jencil.js', '53018:53062');
            this.iframe.outerWidth(this.element.width());
            __$coverCall('js/Jencil.js', '53070:53116');
            this.iframe.outerHeight(this.element.height());
            __$coverCall('js/Jencil.js', '53124:53135');
            return this;
        };
        __$coverCall('js/Jencil.js', '53149:53170');
        return TemplateHelper;
    }(BaseHelper);
    __$coverCall('js/Jencil.js', '53194:53335');
    namespace('Jencil.helpers', function (exports) {
        __$coverCall('js/Jencil.js', '53246:53277');
        exports.BaseHelper = BaseHelper;
        __$coverCall('js/Jencil.js', '53283:53329');
        return exports.TemplateHelper = TemplateHelper;
    });
    __$coverCall('js/Jencil.js', '53340:53589');
    Separator = function (_super) {
        __$coverCall('js/Jencil.js', '53377:53405');
        __extends(Separator, _super);
        __$coverCall('js/Jencil.js', '53412:53551');
        function Separator(core) {
            __$coverCall('js/Jencil.js', '53445:53503');
            Separator.__super__.constructor.call(this, core, '<span>');
            __$coverCall('js/Jencil.js', '53511:53545');
            this.element.addClass('separator');
        }
        __$coverCall('js/Jencil.js', '53558:53574');
        return Separator;
    }(Widget);
    __$coverCall('js/Jencil.js', '53594:54418');
    Button = function (_super) {
        __$coverCall('js/Jencil.js', '53628:53653');
        __extends(Button, _super);
        __$coverCall('js/Jencil.js', '53660:54111');
        function Button(core, name, text, title) {
            __$coverCall('js/Jencil.js', '53709:53725');
            this.name = name;
            __$coverCall('js/Jencil.js', '53733:53749');
            this.text = text;
            __$coverCall('js/Jencil.js', '53757:53775');
            this.title = title;
            __$coverCall('js/Jencil.js', '53783:53835');
            Button.__super__.constructor.call(this, core, '<a>');
            __$coverCall('js/Jencil.js', '53843:53887');
            this.text = Jencil.t(this.text || this.name);
            __$coverCall('js/Jencil.js', '53895:53941');
            this.title = Jencil.t(this.title || this.text);
            __$coverCall('js/Jencil.js', '53949:53995');
            this.element.addClass('button').addClass(name);
            __$coverCall('js/Jencil.js', '54003:54059');
            this.element.append($('<span>' + this.text + '</span>'));
            __$coverCall('js/Jencil.js', '54067:54105');
            this.element.attr('title', this.title);
        }
        __$coverCall('js/Jencil.js', '54118:54212');
        Button.prototype.enable = function () {
            __$coverCall('js/Jencil.js', '54163:54205');
            return this.element.removeClass('disable');
        };
        __$coverCall('js/Jencil.js', '54219:54311');
        Button.prototype.disable = function () {
            __$coverCall('js/Jencil.js', '54265:54304');
            return this.element.addClass('disable');
        };
        __$coverCall('js/Jencil.js', '54318:54383');
        Button.prototype.validate = function () {
            __$coverCall('js/Jencil.js', '54365:54376');
            return this;
        };
        __$coverCall('js/Jencil.js', '54390:54403');
        return Button;
    }(Widget);
    __$coverCall('js/Jencil.js', '54423:55259');
    ActionButton = function (_super) {
        __$coverCall('js/Jencil.js', '54463:54494');
        __extends(ActionButton, _super);
        __$coverCall('js/Jencil.js', '54501:55218');
        function ActionButton(core, name, text, title, callback, shortcut) {
            __$coverCall('js/Jencil.js', '54576:54592');
            var _this = this;
            __$coverCall('js/Jencil.js', '54600:54624');
            this.shortcut = shortcut;
            __$coverCall('js/Jencil.js', '54632:54702');
            ActionButton.__super__.constructor.call(this, core, name, text, title);
            __$coverCall('js/Jencil.js', '54710:54835');
            this.callback = function () {
                __$coverCall('js/Jencil.js', '54747:54826');
                if (!_this.element.hasClass('disable')) {
                    __$coverCall('js/Jencil.js', '54799:54816');
                    return callback();
                }
            };
            __$coverCall('js/Jencil.js', '54843:54871');
            this.callback.raw = callback;
            __$coverCall('js/Jencil.js', '54879:54952');
            this.element.click(function () {
                __$coverCall('js/Jencil.js', '54919:54942');
                return _this.callback();
            });
            __$coverCall('js/Jencil.js', '54960:55212');
            if (this.shortcut != null && window.shortcut != null) {
                __$coverCall('js/Jencil.js', '55028:55122');
                window.shortcut.add(this.shortcut, function (e) {
                    __$coverCall('js/Jencil.js', '55087:55110');
                    return _this.callback();
                });
                __$coverCall('js/Jencil.js', '55132:55204');
                this.element.attr('title', '' + this.title + ' (' + this.shortcut + ')');
            }
        }
        __$coverCall('js/Jencil.js', '55225:55244');
        return ActionButton;
    }(Button);
    __$coverCall('js/Jencil.js', '55264:57000');
    CommandButton = function (_super) {
        __$coverCall('js/Jencil.js', '55305:55337');
        __extends(CommandButton, _super);
        __$coverCall('js/Jencil.js', '55344:55702');
        function CommandButton(core, name, text, title, command, shortcut) {
            __$coverCall('js/Jencil.js', '55419:55431');
            var callback;
            __$coverCall('js/Jencil.js', '55439:55461');
            this.command = command;
            __$coverCall('js/Jencil.js', '55469:55597');
            callback = function () {
                __$coverCall('js/Jencil.js', '55501:55511');
                var editor;
                __$coverCall('js/Jencil.js', '55521:55543');
                editor = core.editor();
                __$coverCall('js/Jencil.js', '55553:55588');
                return editor[command].call(editor);
            };
            __$coverCall('js/Jencil.js', '55605:55696');
            CommandButton.__super__.constructor.call(this, core, name, text, title, callback, shortcut);
        }
        __$coverCall('js/Jencil.js', '55709:55788');
        CommandButton.prototype.init = function () {
            __$coverCall('js/Jencil.js', '55759:55781');
            return this.validate();
        };
        __$coverCall('js/Jencil.js', '55795:55997');
        CommandButton.prototype.validate = function () {
            __$coverCall('js/Jencil.js', '55849:55859');
            var editor;
            __$coverCall('js/Jencil.js', '55867:55894');
            editor = this.core.editor();
            __$coverCall('js/Jencil.js', '55902:55971');
            if (!(editor[this.command] != null)) {
                __$coverCall('js/Jencil.js', '55949:55963');
                this.disable();
            }
            __$coverCall('js/Jencil.js', '55979:55990');
            return this;
        };
        __$coverCall('js/Jencil.js', '56004:56952');
        CommandButton.factory = function (core, args) {
            __$coverCall('js/Jencil.js', '56057:56097');
            var command, name, shortcut, text, title;
            __$coverCall('js/Jencil.js', '56105:56152');
            name = text = title = command = shortcut = null;
            __$coverCall('js/Jencil.js', '56160:56869');
            switch (args.length) {
            case 5:
                __$coverCall('js/Jencil.js', '56209:56223');
                name = args[0];
                __$coverCall('js/Jencil.js', '56235:56249');
                text = args[1];
                __$coverCall('js/Jencil.js', '56261:56276');
                title = args[2];
                __$coverCall('js/Jencil.js', '56288:56305');
                command = args[3];
                __$coverCall('js/Jencil.js', '56317:56335');
                shortcut = args[4];
                __$coverCall('js/Jencil.js', '56347:56352');
                break;
            case 4:
                __$coverCall('js/Jencil.js', '56380:56394');
                name = args[0];
                __$coverCall('js/Jencil.js', '56406:56428');
                text = title = args[1];
                __$coverCall('js/Jencil.js', '56440:56457');
                command = args[2];
                __$coverCall('js/Jencil.js', '56469:56487');
                shortcut = args[3];
                __$coverCall('js/Jencil.js', '56499:56504');
                break;
            case 3:
                __$coverCall('js/Jencil.js', '56532:56556');
                name = command = args[0];
                __$coverCall('js/Jencil.js', '56568:56590');
                text = title = args[1];
                __$coverCall('js/Jencil.js', '56602:56620');
                shortcut = args[2];
                __$coverCall('js/Jencil.js', '56632:56637');
                break;
            case 2:
                __$coverCall('js/Jencil.js', '56665:56689');
                name = command = args[0];
                __$coverCall('js/Jencil.js', '56701:56723');
                text = title = args[1];
                __$coverCall('js/Jencil.js', '56735:56750');
                shortcut = null;
                __$coverCall('js/Jencil.js', '56762:56767');
                break;
            case 1:
                __$coverCall('js/Jencil.js', '56795:56834');
                name = command = text = title = args[0];
                __$coverCall('js/Jencil.js', '56846:56861');
                shortcut = null;
            }
            __$coverCall('js/Jencil.js', '56877:56945');
            return new CommandButton(core, name, text, title, command, shortcut);
        };
        __$coverCall('js/Jencil.js', '56959:56979');
        return CommandButton;
    }(ActionButton);
    __$coverCall('js/Jencil.js', '57005:57699');
    UndoButton = function (_super) {
        __$coverCall('js/Jencil.js', '57043:57072');
        __extends(UndoButton, _super);
        __$coverCall('js/Jencil.js', '57079:57338');
        function UndoButton(core) {
            __$coverCall('js/Jencil.js', '57113:57147');
            var callback, _this = this;
            __$coverCall('js/Jencil.js', '57155:57231');
            callback = function (e) {
                __$coverCall('js/Jencil.js', '57188:57222');
                return _this.core.caretaker.undo();
            };
            __$coverCall('js/Jencil.js', '57239:57332');
            UndoButton.__super__.constructor.call(this, core, 'undo', 'Undo', 'Undo', callback, 'Ctrl+Z');
        }
        __$coverCall('js/Jencil.js', '57345:57654');
        UndoButton.prototype.init = function () {
            __$coverCall('js/Jencil.js', '57392:57423');
            var check, _this = this;
            __$coverCall('js/Jencil.js', '57431:57625');
            check = function () {
                __$coverCall('js/Jencil.js', '57460:57577');
                if (!_this.core.caretaker.canUndo()) {
                    __$coverCall('js/Jencil.js', '57509:57524');
                    _this.disable();
                } else {
                    __$coverCall('js/Jencil.js', '57553:57567');
                    _this.enable();
                }
                __$coverCall('js/Jencil.js', '57587:57616');
                return setTimeout(check, 100);
            };
            __$coverCall('js/Jencil.js', '57633:57647');
            return check();
        };
        __$coverCall('js/Jencil.js', '57661:57678');
        return UndoButton;
    }(ActionButton);
    __$coverCall('js/Jencil.js', '57704:58404');
    RedoButton = function (_super) {
        __$coverCall('js/Jencil.js', '57742:57771');
        __extends(RedoButton, _super);
        __$coverCall('js/Jencil.js', '57778:58043');
        function RedoButton(core) {
            __$coverCall('js/Jencil.js', '57812:57846');
            var callback, _this = this;
            __$coverCall('js/Jencil.js', '57854:57930');
            callback = function (e) {
                __$coverCall('js/Jencil.js', '57887:57921');
                return _this.core.caretaker.redo();
            };
            __$coverCall('js/Jencil.js', '57938:58037');
            RedoButton.__super__.constructor.call(this, core, 'redo', 'Redo', 'Redo', callback, 'Ctrl+Shift+Z');
        }
        __$coverCall('js/Jencil.js', '58050:58359');
        RedoButton.prototype.init = function () {
            __$coverCall('js/Jencil.js', '58097:58128');
            var check, _this = this;
            __$coverCall('js/Jencil.js', '58136:58330');
            check = function () {
                __$coverCall('js/Jencil.js', '58165:58282');
                if (!_this.core.caretaker.canRedo()) {
                    __$coverCall('js/Jencil.js', '58214:58229');
                    _this.disable();
                } else {
                    __$coverCall('js/Jencil.js', '58258:58272');
                    _this.enable();
                }
                __$coverCall('js/Jencil.js', '58292:58321');
                return setTimeout(check, 100);
            };
            __$coverCall('js/Jencil.js', '58338:58352');
            return check();
        };
        __$coverCall('js/Jencil.js', '58366:58383');
        return RedoButton;
    }(ActionButton);
    __$coverCall('js/Jencil.js', '58409:59214');
    FullscreenButton = function (_super) {
        __$coverCall('js/Jencil.js', '58453:58488');
        __extends(FullscreenButton, _super);
        __$coverCall('js/Jencil.js', '58495:58794');
        function FullscreenButton(core) {
            __$coverCall('js/Jencil.js', '58535:58569');
            var callback, _this = this;
            __$coverCall('js/Jencil.js', '58577:58656');
            callback = function (e) {
                __$coverCall('js/Jencil.js', '58610:58647');
                return _this.core.fullscreen.toggle();
            };
            __$coverCall('js/Jencil.js', '58664:58788');
            FullscreenButton.__super__.constructor.call(this, core, 'fullscreen', 'Toggle fullscreen', 'Fullscreen', callback, 'Ctrl+F');
        }
        __$coverCall('js/Jencil.js', '58801:59163');
        FullscreenButton.prototype.init = function () {
            __$coverCall('js/Jencil.js', '58854:58885');
            var check, _this = this;
            __$coverCall('js/Jencil.js', '58893:59134');
            check = function () {
                __$coverCall('js/Jencil.js', '58922:59086');
                if (_this.core.fullscreen.element.is(':visible')) {
                    __$coverCall('js/Jencil.js', '58984:59014');
                    _this.element.addClass('hide');
                } else {
                    __$coverCall('js/Jencil.js', '59043:59076');
                    _this.element.removeClass('hide');
                }
                __$coverCall('js/Jencil.js', '59096:59125');
                return setTimeout(check, 100);
            };
            __$coverCall('js/Jencil.js', '59142:59156');
            return check();
        };
        __$coverCall('js/Jencil.js', '59170:59193');
        return FullscreenButton;
    }(ActionButton);
    __$coverCall('js/Jencil.js', '59219:60204');
    ViewerButton = function (_super) {
        __$coverCall('js/Jencil.js', '59259:59290');
        __extends(ViewerButton, _super);
        __$coverCall('js/Jencil.js', '59297:59575');
        function ViewerButton(core) {
            __$coverCall('js/Jencil.js', '59333:59367');
            var callback, _this = this;
            __$coverCall('js/Jencil.js', '59375:59452');
            callback = function (e) {
                __$coverCall('js/Jencil.js', '59408:59443');
                return _this.core.viewer().toggle();
            };
            __$coverCall('js/Jencil.js', '59460:59569');
            ViewerButton.__super__.constructor.call(this, core, 'viewer', 'Quick view', 'Quick view', callback, 'Ctrl+Q');
        }
        __$coverCall('js/Jencil.js', '59582:59740');
        ViewerButton.prototype.validate = function () {
            __$coverCall('js/Jencil.js', '59635:59714');
            if (!this.core.viewer()) {
                __$coverCall('js/Jencil.js', '59670:59684');
                this.disable();
                __$coverCall('js/Jencil.js', '59694:59706');
                return false;
            }
            __$coverCall('js/Jencil.js', '59722:59733');
            return true;
        };
        __$coverCall('js/Jencil.js', '59747:60157');
        ViewerButton.prototype.init = function () {
            __$coverCall('js/Jencil.js', '59796:59827');
            var check, _this = this;
            __$coverCall('js/Jencil.js', '59835:59881');
            if (!this.validate()) {
                __$coverCall('js/Jencil.js', '59867:59873');
                return;
            }
            __$coverCall('js/Jencil.js', '59889:60128');
            check = function () {
                __$coverCall('js/Jencil.js', '59918:60080');
                if (_this.core.viewer().element.is(':visible')) {
                    __$coverCall('js/Jencil.js', '59978:60008');
                    _this.element.addClass('hide');
                } else {
                    __$coverCall('js/Jencil.js', '60037:60070');
                    _this.element.removeClass('hide');
                }
                __$coverCall('js/Jencil.js', '60090:60119');
                return setTimeout(check, 100);
            };
            __$coverCall('js/Jencil.js', '60136:60150');
            return check();
        };
        __$coverCall('js/Jencil.js', '60164:60183');
        return ViewerButton;
    }(ActionButton);
    __$coverCall('js/Jencil.js', '60209:61182');
    HelperButton = function (_super) {
        __$coverCall('js/Jencil.js', '60249:60280');
        __extends(HelperButton, _super);
        __$coverCall('js/Jencil.js', '60287:60553');
        function HelperButton(core) {
            __$coverCall('js/Jencil.js', '60323:60357');
            var callback, _this = this;
            __$coverCall('js/Jencil.js', '60365:60442');
            callback = function (e) {
                __$coverCall('js/Jencil.js', '60398:60433');
                return _this.core.helper().toggle();
            };
            __$coverCall('js/Jencil.js', '60450:60547');
            HelperButton.__super__.constructor.call(this, core, 'helper', 'Help', 'Help', callback, 'Ctrl+H');
        }
        __$coverCall('js/Jencil.js', '60560:60718');
        HelperButton.prototype.validate = function () {
            __$coverCall('js/Jencil.js', '60613:60692');
            if (!this.core.helper()) {
                __$coverCall('js/Jencil.js', '60648:60662');
                this.disable();
                __$coverCall('js/Jencil.js', '60672:60684');
                return false;
            }
            __$coverCall('js/Jencil.js', '60700:60711');
            return true;
        };
        __$coverCall('js/Jencil.js', '60725:61135');
        HelperButton.prototype.init = function () {
            __$coverCall('js/Jencil.js', '60774:60805');
            var check, _this = this;
            __$coverCall('js/Jencil.js', '60813:60859');
            if (!this.validate()) {
                __$coverCall('js/Jencil.js', '60845:60851');
                return;
            }
            __$coverCall('js/Jencil.js', '60867:61106');
            check = function () {
                __$coverCall('js/Jencil.js', '60896:61058');
                if (_this.core.helper().element.is(':visible')) {
                    __$coverCall('js/Jencil.js', '60956:60986');
                    _this.element.addClass('hide');
                } else {
                    __$coverCall('js/Jencil.js', '61015:61048');
                    _this.element.removeClass('hide');
                }
                __$coverCall('js/Jencil.js', '61068:61097');
                return setTimeout(check, 100);
            };
            __$coverCall('js/Jencil.js', '61114:61128');
            return check();
        };
        __$coverCall('js/Jencil.js', '61142:61161');
        return HelperButton;
    }(ActionButton);
    __$coverCall('js/Jencil.js', '61187:61895');
    buttonFactory = function (core, value) {
        __$coverCall('js/Jencil.js', '61231:61314');
        if (value instanceof Array) {
            __$coverCall('js/Jencil.js', '61267:61308');
            return CommandButton.factory(core, value);
        }
        __$coverCall('js/Jencil.js', '61320:61862');
        if (typeof value === 'string') {
            __$coverCall('js/Jencil.js', '61359:61856');
            switch (value) {
            case 'Separator':
                __$coverCall('js/Jencil.js', '61412:61438');
                return new Separator(core);
            case 'Undo':
                __$coverCall('js/Jencil.js', '61471:61498');
                return new UndoButton(core);
            case 'Redo':
                __$coverCall('js/Jencil.js', '61531:61558');
                return new RedoButton(core);
            case 'Fullscreen':
                __$coverCall('js/Jencil.js', '61597:61630');
                return new FullscreenButton(core);
            case 'Viewer':
                __$coverCall('js/Jencil.js', '61665:61694');
                return new ViewerButton(core);
            case 'Helper':
                __$coverCall('js/Jencil.js', '61729:61758');
                return new HelperButton(core);
            default:
                __$coverCall('js/Jencil.js', '61787:61848');
                throw new Exception('' + value + ' is not known Button type');
            }
        }
        __$coverCall('js/Jencil.js', '61868:61890');
        return new value(core);
    };
    __$coverCall('js/Jencil.js', '61900:62312');
    namespace('Jencil.buttons', function (exports) {
        __$coverCall('js/Jencil.js', '61952:61981');
        exports.Separator = Separator;
        __$coverCall('js/Jencil.js', '61987:62010');
        exports.Button = Button;
        __$coverCall('js/Jencil.js', '62016:62051');
        exports.ActionButton = ActionButton;
        __$coverCall('js/Jencil.js', '62057:62094');
        exports.CommandButton = CommandButton;
        __$coverCall('js/Jencil.js', '62100:62131');
        exports.UndoButton = UndoButton;
        __$coverCall('js/Jencil.js', '62137:62168');
        exports.RedoButton = RedoButton;
        __$coverCall('js/Jencil.js', '62174:62217');
        exports.FullscreenButton = FullscreenButton;
        __$coverCall('js/Jencil.js', '62223:62258');
        exports.ViewerButton = ViewerButton;
        __$coverCall('js/Jencil.js', '62264:62306');
        return exports.HelperButton = HelperButton;
    });
    __$coverCall('js/Jencil.js', '62317:65074');
    Wrapper = function (_super) {
        __$coverCall('js/Jencil.js', '62352:62378');
        __extends(Wrapper, _super);
        __$coverCall('js/Jencil.js', '62385:62700');
        function Wrapper(core, width, height) {
            __$coverCall('js/Jencil.js', '62431:62477');
            Wrapper.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.js', '62485:62524');
            this.element.addClass('jencil wrapper');
            __$coverCall('js/Jencil.js', '62532:62557');
            this.element.width(width);
            __$coverCall('js/Jencil.js', '62565:62592');
            this.element.height(height);
            __$coverCall('js/Jencil.js', '62600:62641');
            this.workspace = new Workspace(this.core);
            __$coverCall('js/Jencil.js', '62649:62694');
            this.workspace.element.appendTo(this.element);
        }
        __$coverCall('js/Jencil.js', '62707:64797');
        Wrapper.prototype.init = function () {
            __$coverCall('js/Jencil.js', '62751:62767');
            var _this = this;
            __$coverCall('js/Jencil.js', '62775:64754');
            if (this.element.resizable != null && this.core.options.resizable === true) {
                __$coverCall('js/Jencil.js', '62863:64746');
                this.element.resizable({
                    start: function () {
                        __$coverCall('js/Jencil.js', '62930:62973');
                        var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
                        __$coverCall('js/Jencil.js', '62987:63139');
                        if ((_ref = _this.core.editor()) != null) {
                            __$coverCall('js/Jencil.js', '63045:63125');
                            if ((_ref1 = _ref.curtain) != null) {
                                __$coverCall('js/Jencil.js', '63099:63109');
                                _ref1.on();
                            }
                        }
                        __$coverCall('js/Jencil.js', '63153:63307');
                        if ((_ref2 = _this.core.viewer()) != null) {
                            __$coverCall('js/Jencil.js', '63212:63293');
                            if ((_ref3 = _ref2.curtain) != null) {
                                __$coverCall('js/Jencil.js', '63267:63277');
                                _ref3.on();
                            }
                        }
                        __$coverCall('js/Jencil.js', '63321:63430');
                        return (_ref4 = _this.core.helper()) != null ? (_ref5 = _ref4.curtain) != null ? _ref5.on() : void 0 : void 0;
                    },
                    resize: function () {
                        __$coverCall('js/Jencil.js', '63488:63531');
                        var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
                        __$coverCall('js/Jencil.js', '63545:63702');
                        if ((_ref = _this.core.editor()) != null) {
                            __$coverCall('js/Jencil.js', '63603:63688');
                            if ((_ref1 = _ref.curtain) != null) {
                                __$coverCall('js/Jencil.js', '63657:63672');
                                _ref1.refresh();
                            }
                        }
                        __$coverCall('js/Jencil.js', '63716:63875');
                        if ((_ref2 = _this.core.viewer()) != null) {
                            __$coverCall('js/Jencil.js', '63775:63861');
                            if ((_ref3 = _ref2.curtain) != null) {
                                __$coverCall('js/Jencil.js', '63830:63845');
                                _ref3.refresh();
                            }
                        }
                        __$coverCall('js/Jencil.js', '63889:64048');
                        if ((_ref4 = _this.core.helper()) != null) {
                            __$coverCall('js/Jencil.js', '63948:64034');
                            if ((_ref5 = _ref4.curtain) != null) {
                                __$coverCall('js/Jencil.js', '64003:64018');
                                _ref5.refresh();
                            }
                        }
                        __$coverCall('js/Jencil.js', '64062:64083');
                        return _this.adjust();
                    },
                    stop: function () {
                        __$coverCall('js/Jencil.js', '64139:64182');
                        var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
                        __$coverCall('js/Jencil.js', '64196:64349');
                        if ((_ref = _this.core.editor()) != null) {
                            __$coverCall('js/Jencil.js', '64254:64335');
                            if ((_ref1 = _ref.curtain) != null) {
                                __$coverCall('js/Jencil.js', '64308:64319');
                                _ref1.off();
                            }
                        }
                        __$coverCall('js/Jencil.js', '64363:64518');
                        if ((_ref2 = _this.core.viewer()) != null) {
                            __$coverCall('js/Jencil.js', '64422:64504');
                            if ((_ref3 = _ref2.curtain) != null) {
                                __$coverCall('js/Jencil.js', '64477:64488');
                                _ref3.off();
                            }
                        }
                        __$coverCall('js/Jencil.js', '64532:64687');
                        if ((_ref4 = _this.core.helper()) != null) {
                            __$coverCall('js/Jencil.js', '64591:64673');
                            if ((_ref5 = _ref4.curtain) != null) {
                                __$coverCall('js/Jencil.js', '64646:64657');
                                _ref5.off();
                            }
                        }
                        __$coverCall('js/Jencil.js', '64701:64722');
                        return _this.adjust();
                    }
                });
            }
            __$coverCall('js/Jencil.js', '64762:64790');
            return this.workspace.init();
        };
        __$coverCall('js/Jencil.js', '64804:65039');
        Wrapper.prototype.adjust = function () {
            __$coverCall('js/Jencil.js', '64850:64911');
            this.workspace.element.outerWidth(true, this.element.width());
            __$coverCall('js/Jencil.js', '64919:64982');
            this.workspace.element.outerHeight(true, this.element.height());
            __$coverCall('js/Jencil.js', '64990:65013');
            this.workspace.adjust();
            __$coverCall('js/Jencil.js', '65021:65032');
            return this;
        };
        __$coverCall('js/Jencil.js', '65046:65060');
        return Wrapper;
    }(Panel);
    __$coverCall('js/Jencil.js', '65079:68182');
    Workspace = function (_super) {
        __$coverCall('js/Jencil.js', '65116:65144');
        __extends(Workspace, _super);
        __$coverCall('js/Jencil.js', '65151:65322');
        function Workspace(core) {
            __$coverCall('js/Jencil.js', '65184:65232');
            Workspace.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.js', '65240:65274');
            this.element.addClass('workspace');
            __$coverCall('js/Jencil.js', '65282:65316');
            this.profile(core.options.profile);
        }
        __$coverCall('js/Jencil.js', '65329:67067');
        Workspace.prototype.profile = function (profile) {
            __$coverCall('js/Jencil.js', '65385:65465');
            var button, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3, _this = this;
            __$coverCall('js/Jencil.js', '65473:67032');
            if (profile != null) {
                __$coverCall('js/Jencil.js', '65504:65604');
                if (typeof profile === 'string') {
                    __$coverCall('js/Jencil.js', '65549:65594');
                    profile = this.core.options.profiles[profile];
                }
                __$coverCall('js/Jencil.js', '65614:65662');
                profile = jQuery.extend(DefaultProfile, profile);
                __$coverCall('js/Jencil.js', '65672:65752');
                profile.defaultVolume = this.core.options.defaultVolume || profile.defaultVolume;
                __$coverCall('js/Jencil.js', '65762:65845');
                profile.defaultVolume2 = this.core.options.defaultVolume2 || profile.defaultVolume2;
                __$coverCall('js/Jencil.js', '65855:65875');
                this.element.empty();
                __$coverCall('js/Jencil.js', '65885:65948');
                this.mainPanel = new profile.mainPanelClass(this.core, profile);
                __$coverCall('js/Jencil.js', '65958:66062');
                if ((_ref = this.mainPanel.editorPanel) != null) {
                    __$coverCall('js/Jencil.js', '66019:66052');
                    _ref.val(this.core.element.val());
                }
                __$coverCall('js/Jencil.js', '66072:66237');
                if ((_ref1 = this.mainPanel.editorPanel) != null) {
                    __$coverCall('js/Jencil.js', '66134:66227');
                    _ref1.change(function (value) {
                        __$coverCall('js/Jencil.js', '66177:66213');
                        return _this.core.element.val(value);
                    });
                }
                __$coverCall('js/Jencil.js', '66247:66284');
                this.toolbar = new Toolbar(this.core);
                __$coverCall('js/Jencil.js', '66294:66324');
                _ref2 = profile.toolbarButtons;
                __$coverCall('js/Jencil.js', '66334:66520');
                for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                    __$coverCall('js/Jencil.js', '66397:66415');
                    button = _ref2[_i];
                    __$coverCall('js/Jencil.js', '66427:66468');
                    button = buttonFactory(this.core, button);
                    __$coverCall('js/Jencil.js', '66480:66510');
                    this.toolbar.addButton(button);
                }
                __$coverCall('js/Jencil.js', '66530:66571');
                this.statusbar = new Statusbar(this.core);
                __$coverCall('js/Jencil.js', '66581:66613');
                _ref3 = profile.statusbarButtons;
                __$coverCall('js/Jencil.js', '66623:66813');
                for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
                    __$coverCall('js/Jencil.js', '66688:66706');
                    button = _ref3[_j];
                    __$coverCall('js/Jencil.js', '66718:66759');
                    button = buttonFactory(this.core, button);
                    __$coverCall('js/Jencil.js', '66771:66803');
                    this.statusbar.addButton(button);
                }
                __$coverCall('js/Jencil.js', '66823:66864');
                this.element.append(this.toolbar.element);
                __$coverCall('js/Jencil.js', '66874:66917');
                this.element.append(this.mainPanel.element);
                __$coverCall('js/Jencil.js', '66927:66970');
                this.element.append(this.statusbar.element);
                __$coverCall('js/Jencil.js', '66980:67003');
                this._profile = profile;
                __$coverCall('js/Jencil.js', '67013:67024');
                return this;
            }
            __$coverCall('js/Jencil.js', '67040:67060');
            return this._profile;
        };
        __$coverCall('js/Jencil.js', '67074:67211');
        Workspace.prototype.init = function () {
            __$coverCall('js/Jencil.js', '67120:67139');
            this.toolbar.init();
            __$coverCall('js/Jencil.js', '67147:67168');
            this.statusbar.init();
            __$coverCall('js/Jencil.js', '67176:67204');
            return this.mainPanel.init();
        };
        __$coverCall('js/Jencil.js', '67218:67917');
        Workspace.prototype.adjust = function () {
            __$coverCall('js/Jencil.js', '67266:67286');
            var offset1, offset2;
            __$coverCall('js/Jencil.js', '67294:67353');
            this.toolbar.element.outerWidth(true, this.element.width());
            __$coverCall('js/Jencil.js', '67361:67422');
            this.statusbar.element.outerWidth(true, this.element.width());
            __$coverCall('js/Jencil.js', '67430:67491');
            this.mainPanel.element.outerWidth(true, this.element.width());
            __$coverCall('js/Jencil.js', '67499:67562');
            this.mainPanel.element.outerHeight(true, this.element.height());
            __$coverCall('js/Jencil.js', '67570:67593');
            this.mainPanel.adjust();
            __$coverCall('js/Jencil.js', '67601:67649');
            offset1 = this.toolbar.element.outerHeight(true);
            __$coverCall('js/Jencil.js', '67657:67707');
            offset2 = this.statusbar.element.outerHeight(true);
            __$coverCall('js/Jencil.js', '67715:67800');
            this.mainPanel.element.outerHeight(true, this.element.height() - (offset1 + offset2));
            __$coverCall('js/Jencil.js', '67808:67829');
            this.toolbar.adjust();
            __$coverCall('js/Jencil.js', '67837:67860');
            this.statusbar.adjust();
            __$coverCall('js/Jencil.js', '67868:67891');
            this.mainPanel.adjust();
            __$coverCall('js/Jencil.js', '67899:67910');
            return this;
        };
        __$coverCall('js/Jencil.js', '67924:68145');
        Workspace.prototype.update = function (force) {
            __$coverCall('js/Jencil.js', '67977:68138');
            if (this.mainPanel.editorPanel && this.mainPanel.viewerPanel) {
                __$coverCall('js/Jencil.js', '68049:68130');
                return this.mainPanel.viewerPanel.update(this.mainPanel.editorPanel.val(), force);
            }
        };
        __$coverCall('js/Jencil.js', '68152:68168');
        return Workspace;
    }(Panel);
    __$coverCall('js/Jencil.js', '68187:68763');
    Bar = function (_super) {
        __$coverCall('js/Jencil.js', '68218:68240');
        __extends(Bar, _super);
        __$coverCall('js/Jencil.js', '68247:68348');
        function Bar(core) {
            __$coverCall('js/Jencil.js', '68274:68316');
            Bar.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.js', '68324:68342');
            this._buttons = [];
        }
        __$coverCall('js/Jencil.js', '68355:68591');
        Bar.prototype.init = function () {
            __$coverCall('js/Jencil.js', '68395:68421');
            var button, _i, _len, _ref;
            __$coverCall('js/Jencil.js', '68429:68449');
            _ref = this._buttons;
            __$coverCall('js/Jencil.js', '68457:68565');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                __$coverCall('js/Jencil.js', '68517:68534');
                button = _ref[_i];
                __$coverCall('js/Jencil.js', '68544:68557');
                button.init();
            }
            __$coverCall('js/Jencil.js', '68573:68584');
            return this;
        };
        __$coverCall('js/Jencil.js', '68598:68732');
        Bar.prototype.addButton = function (button) {
            __$coverCall('js/Jencil.js', '68649:68675');
            this._buttons.push(button);
            __$coverCall('js/Jencil.js', '68683:68725');
            return this.element.append(button.element);
        };
        __$coverCall('js/Jencil.js', '68739:68749');
        return Bar;
    }(Panel);
    __$coverCall('js/Jencil.js', '68768:68992');
    Toolbar = function (_super) {
        __$coverCall('js/Jencil.js', '68803:68829');
        __extends(Toolbar, _super);
        __$coverCall('js/Jencil.js', '68836:68959');
        function Toolbar(core) {
            __$coverCall('js/Jencil.js', '68867:68913');
            Toolbar.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.js', '68921:68953');
            this.element.addClass('toolbar');
        }
        __$coverCall('js/Jencil.js', '68966:68980');
        return Toolbar;
    }(Bar);
    __$coverCall('js/Jencil.js', '68997:69233');
    Statusbar = function (_super) {
        __$coverCall('js/Jencil.js', '69034:69062');
        __extends(Statusbar, _super);
        __$coverCall('js/Jencil.js', '69069:69198');
        function Statusbar(core) {
            __$coverCall('js/Jencil.js', '69102:69150');
            Statusbar.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.js', '69158:69192');
            this.element.addClass('statusbar');
        }
        __$coverCall('js/Jencil.js', '69205:69221');
        return Statusbar;
    }(Bar);
    __$coverCall('js/Jencil.js', '69238:69502');
    MonomainPanel = function () {
        __$coverCall('js/Jencil.js', '69273:69466');
        function MonomainPanel(core, profile) {
            __$coverCall('js/Jencil.js', '69319:69334');
            var editorPanel;
            __$coverCall('js/Jencil.js', '69342:69385');
            editorPanel = new profile.editorClass(core);
            __$coverCall('js/Jencil.js', '69393:69434');
            editorPanel.element.addClass('mainPanel');
            __$coverCall('js/Jencil.js', '69442:69460');
            return editorPanel;
        }
        __$coverCall('js/Jencil.js', '69473:69493');
        return MonomainPanel;
    }();
    __$coverCall('js/Jencil.js', '69507:70073');
    DimainPanel = function (_super) {
        __$coverCall('js/Jencil.js', '69546:69576');
        __extends(DimainPanel, _super);
        __$coverCall('js/Jencil.js', '69583:70026');
        function DimainPanel(core, profile) {
            __$coverCall('js/Jencil.js', '69627:69643');
            var _this = this;
            __$coverCall('js/Jencil.js', '69651:69699');
            this.editorPanel = new profile.editorClass(core);
            __$coverCall('js/Jencil.js', '69707:69755');
            this.viewerPanel = new profile.viewerClass(core);
            __$coverCall('js/Jencil.js', '69763:69872');
            DimainPanel.__super__.constructor.call(this, core, this.editorPanel, this.viewerPanel, profile.defaultVolume);
            __$coverCall('js/Jencil.js', '69880:69914');
            this.element.addClass('mainPanel');
            __$coverCall('js/Jencil.js', '69922:70020');
            this.editorPanel.change(function (value) {
                __$coverCall('js/Jencil.js', '69972:70010');
                return _this.viewerPanel.update(value);
            });
        }
        __$coverCall('js/Jencil.js', '70033:70051');
        return DimainPanel;
    }(VerticalPanel);
    __$coverCall('js/Jencil.js', '70078:70821');
    TrimainPanel = function (_super) {
        __$coverCall('js/Jencil.js', '70118:70149');
        __extends(TrimainPanel, _super);
        __$coverCall('js/Jencil.js', '70156:70771');
        function TrimainPanel(core, profile) {
            __$coverCall('js/Jencil.js', '70201:70217');
            var _this = this;
            __$coverCall('js/Jencil.js', '70225:70273');
            this.editorPanel = new profile.editorClass(core);
            __$coverCall('js/Jencil.js', '70281:70329');
            this.viewerPanel = new profile.viewerClass(core);
            __$coverCall('js/Jencil.js', '70337:70385');
            this.helperPanel = new profile.helperClass(core);
            __$coverCall('js/Jencil.js', '70393:70496');
            this.verticalPanel = new VerticalPanel(core, this.editorPanel, this.viewerPanel, profile.defaultVolume);
            __$coverCall('js/Jencil.js', '70504:70617');
            TrimainPanel.__super__.constructor.call(this, core, this.verticalPanel, this.helperPanel, profile.defaultVolume2);
            __$coverCall('js/Jencil.js', '70625:70659');
            this.element.addClass('mainPanel');
            __$coverCall('js/Jencil.js', '70667:70765');
            this.editorPanel.change(function (value) {
                __$coverCall('js/Jencil.js', '70717:70755');
                return _this.viewerPanel.update(value);
            });
        }
        __$coverCall('js/Jencil.js', '70778:70797');
        return TrimainPanel;
    }(HorizontalPanel);
    __$coverCall('js/Jencil.js', '70826:71011');
    namespace('Jencil.mainpanels', function (exports) {
        __$coverCall('js/Jencil.js', '70881:70918');
        exports.MonomainPanel = MonomainPanel;
        __$coverCall('js/Jencil.js', '70924:70957');
        exports.DimainPanel = DimainPanel;
        __$coverCall('js/Jencil.js', '70963:71005');
        return exports.TrimainPanel = TrimainPanel;
    });
    __$coverCall('js/Jencil.js', '71016:73876');
    Fullscreen = function (_super) {
        __$coverCall('js/Jencil.js', '71054:71083');
        __extends(Fullscreen, _super);
        __$coverCall('js/Jencil.js', '71090:72387');
        function Fullscreen(core) {
            __$coverCall('js/Jencil.js', '71124:71140');
            var _this = this;
            __$coverCall('js/Jencil.js', '71148:71197');
            Fullscreen.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.js', '71205:71240');
            this.element.addClass('fullscreen');
            __$coverCall('js/Jencil.js', '71248:71419');
            this.element.css({
                'position': 'fixed',
                'top': '0',
                'left': '0',
                'width': '100%',
                'height': '100%',
                'z-index': 100
            });
            __$coverCall('js/Jencil.js', '71427:71472');
            this.curtain = $('<div>').addClass('curtain');
            __$coverCall('js/Jencil.js', '71480:71716');
            this.curtain.css({
                'position': 'absolute',
                'top': '0',
                'left': '0',
                'width': '100%',
                'height': '100%',
                'background': 'black',
                'opacity': '0.6',
                'cursor': 'pointer'
            });
            __$coverCall('js/Jencil.js', '71724:71884');
            this.cell = $('<div>').css({
                'position': 'absolute',
                'top': '5%',
                'left': '5%',
                'width': '90%',
                'height': '90%'
            });
            __$coverCall('js/Jencil.js', '71892:72113');
            if ($.browser.msie && $.browser.version < 7) {
                __$coverCall('js/Jencil.js', '71947:71987');
                this.element.css('position', 'absolute');
                __$coverCall('js/Jencil.js', '71997:72105');
                $(window).scroll(function () {
                    __$coverCall('js/Jencil.js', '72037:72093');
                    return _this.element.css('top', $(document).scrollTop());
                });
            }
            __$coverCall('js/Jencil.js', '72121:72189');
            this.curtain.click(function () {
                __$coverCall('js/Jencil.js', '72161:72179');
                return _this.off();
            });
            __$coverCall('js/Jencil.js', '72197:72230');
            this.element.append(this.curtain);
            __$coverCall('js/Jencil.js', '72238:72268');
            this.element.append(this.cell);
            __$coverCall('js/Jencil.js', '72276:72295');
            this.element.hide();
            __$coverCall('js/Jencil.js', '72303:72381');
            this.resize = function () {
                __$coverCall('js/Jencil.js', '72338:72372');
                return _this.core.wrapper.adjust();
            };
        }
        __$coverCall('js/Jencil.js', '72394:73094');
        Fullscreen.prototype.on = function () {
            __$coverCall('js/Jencil.js', '72439:72470');
            var ratio, _this = this;
            __$coverCall('js/Jencil.js', '72478:72494');
            ratio = 9 / 10;
            __$coverCall('js/Jencil.js', '72502:72545');
            this.cell.append(this.core.wrapper.element);
            __$coverCall('js/Jencil.js', '72553:72625');
            this.core.wrapper.element.outerWidth(true, this.element.width() * ratio);
            __$coverCall('js/Jencil.js', '72633:72707');
            this.core.wrapper.element.outerHeight(true, this.element.height() * ratio);
            __$coverCall('js/Jencil.js', '72715:72739');
            this.core.wrapper.init();
            __$coverCall('js/Jencil.js', '72747:72773');
            this.core.wrapper.adjust();
            __$coverCall('js/Jencil.js', '72781:72821');
            this.core.wrapper.workspace.update(true);
            __$coverCall('js/Jencil.js', '72829:73037');
            this.element.fadeIn('fast', function () {
                __$coverCall('js/Jencil.js', '72878:72925');
                _this.core.wrapper.element.css('width', '100%');
                __$coverCall('js/Jencil.js', '72935:72983');
                _this.core.wrapper.element.css('height', '100%');
                __$coverCall('js/Jencil.js', '72993:73027');
                return _this.core.wrapper.adjust();
            });
            __$coverCall('js/Jencil.js', '73045:73087');
            return $(window).on('resize', this.resize);
        };
        __$coverCall('js/Jencil.js', '73101:73509');
        Fullscreen.prototype.off = function () {
            __$coverCall('js/Jencil.js', '73147:73197');
            this.core.element.after(this.core.wrapper.element);
            __$coverCall('js/Jencil.js', '73205:73247');
            this.core.wrapper.element.css('width', '');
            __$coverCall('js/Jencil.js', '73255:73298');
            this.core.wrapper.element.css('height', '');
            __$coverCall('js/Jencil.js', '73306:73330');
            this.core.wrapper.init();
            __$coverCall('js/Jencil.js', '73338:73364');
            this.core.wrapper.adjust();
            __$coverCall('js/Jencil.js', '73372:73412');
            this.core.wrapper.workspace.update(true);
            __$coverCall('js/Jencil.js', '73420:73448');
            this.element.fadeOut('fast');
            __$coverCall('js/Jencil.js', '73456:73502');
            return $(window).unbind('resize', this.resize);
        };
        __$coverCall('js/Jencil.js', '73516:73838');
        Fullscreen.prototype.toggle = function (callbackOn, callbackOff) {
            __$coverCall('js/Jencil.js', '73588:73831');
            if (this.element.is(':visible')) {
                __$coverCall('js/Jencil.js', '73631:73641');
                this.off();
                __$coverCall('js/Jencil.js', '73651:73716');
                return typeof callbackOff === 'function' ? callbackOff() : void 0;
            } else {
                __$coverCall('js/Jencil.js', '73741:73750');
                this.on();
                __$coverCall('js/Jencil.js', '73760:73823');
                return typeof callbackOn === 'function' ? callbackOn() : void 0;
            }
        };
        __$coverCall('js/Jencil.js', '73845:73862');
        return Fullscreen;
    }(Panel);
    __$coverCall('js/Jencil.js', '73881:75557');
    autoIndentableHtml = function () {
        __$coverCall('js/Jencil.js', '73920:73946');
        var PATTERNS, post, pre, x;
        __$coverCall('js/Jencil.js', '73952:74278');
        PATTERNS = function () {
            __$coverCall('js/Jencil.js', '73983:74011');
            var _i, _len, _ref, _results;
            __$coverCall('js/Jencil.js', '74019:74037');
            _ref = [
                'p',
                'li'
            ];
            __$coverCall('js/Jencil.js', '74045:74058');
            _results = [];
            __$coverCall('js/Jencil.js', '74066:74245');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                __$coverCall('js/Jencil.js', '74126:74138');
                x = _ref[_i];
                __$coverCall('js/Jencil.js', '74148:74237');
                _results.push([
                    x,
                    new RegExp('^[s\t]*<' + x + '>'),
                    new RegExp('</' + x + '>[s\t]*$')
                ]);
            }
            __$coverCall('js/Jencil.js', '74253:74268');
            return _results;
        }();
        __$coverCall('js/Jencil.js', '74284:74695');
        pre = function (e, line) {
            __$coverCall('js/Jencil.js', '74316:74348');
            var lineCaret, pattern, _i, _len;
            __$coverCall('js/Jencil.js', '74356:74396');
            if (e.shiftKey) {
                __$coverCall('js/Jencil.js', '74382:74388');
                return;
            }
            __$coverCall('js/Jencil.js', '74404:74688');
            for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {
                __$coverCall('js/Jencil.js', '74468:74490');
                pattern = PATTERNS[_i];
                __$coverCall('js/Jencil.js', '74500:74680');
                if (pattern[1].test(line) || pattern[2].test(line)) {
                    __$coverCall('js/Jencil.js', '74564:74606');
                    lineCaret = this.selection._getLineCaret();
                    __$coverCall('js/Jencil.js', '74618:74652');
                    this.selection.caret(lineCaret[1]);
                    __$coverCall('js/Jencil.js', '74664:74670');
                    return;
                }
            }
        };
        __$coverCall('js/Jencil.js', '74701:75146');
        post = function (e, line, indent, insert) {
            __$coverCall('js/Jencil.js', '74750:74771');
            var pattern, _i, _len;
            __$coverCall('js/Jencil.js', '74779:74819');
            if (e.shiftKey) {
                __$coverCall('js/Jencil.js', '74805:74811');
                return;
            }
            __$coverCall('js/Jencil.js', '74827:75139');
            for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {
                __$coverCall('js/Jencil.js', '74891:74913');
                pattern = PATTERNS[_i];
                __$coverCall('js/Jencil.js', '74923:75131');
                if (pattern[2].test(line)) {
                    __$coverCall('js/Jencil.js', '74962:74976');
                    x = pattern[0];
                    __$coverCall('js/Jencil.js', '74988:75048');
                    this.selection.insertAfter('<' + x + '></' + x + '>', false);
                    __$coverCall('js/Jencil.js', '75060:75103');
                    this.selection.caretOffset(-(3 + x.length));
                    __$coverCall('js/Jencil.js', '75115:75121');
                    return;
                }
            }
        };
        __$coverCall('js/Jencil.js', '75152:75549');
        return function (textarea) {
            __$coverCall('js/Jencil.js', '75186:75275');
            if (!(textarea.autoIndent != null)) {
                __$coverCall('js/Jencil.js', '75232:75267');
                textarea = autoIndentable(textarea);
            }
            __$coverCall('js/Jencil.js', '75283:75380');
            textarea.autoIndent.pre = function (e, line) {
                __$coverCall('js/Jencil.js', '75337:75371');
                return pre.call(textarea, e, line);
            };
            __$coverCall('js/Jencil.js', '75388:75519');
            textarea.autoIndent.post = function (e, line, indent, insert) {
                __$coverCall('js/Jencil.js', '75459:75510');
                return post.call(textarea, e, line, indent, insert);
            };
            __$coverCall('js/Jencil.js', '75527:75542');
            return textarea;
        };
    }();
    __$coverCall('js/Jencil.js', '75562:76256');
    headerMarkup = function () {
        __$coverCall('js/Jencil.js', '75595:75606');
        var PATTERN;
        __$coverCall('js/Jencil.js', '75612:75664');
        PATTERN = new RegExp('^<h([1-6])>(.*)</h[1-6]>\n?$');
        __$coverCall('js/Jencil.js', '75670:76248');
        return function (n) {
            __$coverCall('js/Jencil.js', '75697:75725');
            var caret, replacement, text;
            __$coverCall('js/Jencil.js', '75733:75772');
            caret = this.textarea.selection.caret();
            __$coverCall('js/Jencil.js', '75780:75873');
            if (caret[0] === caret[1]) {
                __$coverCall('js/Jencil.js', '75817:75865');
                this.textarea.selection.selectWholeCurrentLine();
            }
            __$coverCall('js/Jencil.js', '75881:75904');
            text = this.selection();
            __$coverCall('js/Jencil.js', '75912:76241');
            if (PATTERN.test(text)) {
                __$coverCall('js/Jencil.js', '75946:76110');
                if (RegExp.$1 === n.toString()) {
                    __$coverCall('js/Jencil.js', '75990:76013');
                    replacement = RegExp.$2;
                } else {
                    __$coverCall('js/Jencil.js', '76042:76100');
                    replacement = '<h' + n + '>' + RegExp.$2 + '</h' + n + '>';
                }
                __$coverCall('js/Jencil.js', '76120:76154');
                return this.selection(replacement);
            } else {
                __$coverCall('js/Jencil.js', '76179:76233');
                return this.enclose('<h' + n + '>', '</h' + n + '>\n');
            }
        };
    }();
    __$coverCall('js/Jencil.js', '76261:79856');
    HtmlEditor = function (_super) {
        __$coverCall('js/Jencil.js', '76299:76328');
        __extends(HtmlEditor, _super);
        __$coverCall('js/Jencil.js', '76335:76481');
        function HtmlEditor(core) {
            __$coverCall('js/Jencil.js', '76369:76418');
            HtmlEditor.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.js', '76426:76475');
            this.textarea = autoIndentableHtml(this.textarea);
        }
        __$coverCall('js/Jencil.js', '76488:76573');
        HtmlEditor.prototype.h1 = function () {
            __$coverCall('js/Jencil.js', '76533:76566');
            return headerMarkup.call(this, 1);
        };
        __$coverCall('js/Jencil.js', '76580:76665');
        HtmlEditor.prototype.h2 = function () {
            __$coverCall('js/Jencil.js', '76625:76658');
            return headerMarkup.call(this, 2);
        };
        __$coverCall('js/Jencil.js', '76672:76757');
        HtmlEditor.prototype.h3 = function () {
            __$coverCall('js/Jencil.js', '76717:76750');
            return headerMarkup.call(this, 3);
        };
        __$coverCall('js/Jencil.js', '76764:76849');
        HtmlEditor.prototype.h4 = function () {
            __$coverCall('js/Jencil.js', '76809:76842');
            return headerMarkup.call(this, 4);
        };
        __$coverCall('js/Jencil.js', '76856:76941');
        HtmlEditor.prototype.h5 = function () {
            __$coverCall('js/Jencil.js', '76901:76934');
            return headerMarkup.call(this, 5);
        };
        __$coverCall('js/Jencil.js', '76948:77033');
        HtmlEditor.prototype.h6 = function () {
            __$coverCall('js/Jencil.js', '76993:77026');
            return headerMarkup.call(this, 6);
        };
        __$coverCall('js/Jencil.js', '77040:77128');
        HtmlEditor.prototype.bold = function () {
            __$coverCall('js/Jencil.js', '77087:77121');
            return this.enclose('<b>', '</b>');
        };
        __$coverCall('js/Jencil.js', '77135:77225');
        HtmlEditor.prototype.italic = function () {
            __$coverCall('js/Jencil.js', '77184:77218');
            return this.enclose('<i>', '</i>');
        };
        __$coverCall('js/Jencil.js', '77232:77325');
        HtmlEditor.prototype.underline = function () {
            __$coverCall('js/Jencil.js', '77284:77318');
            return this.enclose('<u>', '</u>');
        };
        __$coverCall('js/Jencil.js', '77332:77422');
        HtmlEditor.prototype.strike = function () {
            __$coverCall('js/Jencil.js', '77381:77415');
            return this.enclose('<s>', '</s>');
        };
        __$coverCall('js/Jencil.js', '77429:77528');
        HtmlEditor.prototype.superscript = function () {
            __$coverCall('js/Jencil.js', '77483:77521');
            return this.enclose('<sup>', '</sup>');
        };
        __$coverCall('js/Jencil.js', '77535:77632');
        HtmlEditor.prototype.subscript = function () {
            __$coverCall('js/Jencil.js', '77587:77625');
            return this.enclose('<sub>', '</sub>');
        };
        __$coverCall('js/Jencil.js', '77639:77728');
        HtmlEditor.prototype.quote = function () {
            __$coverCall('js/Jencil.js', '77687:77721');
            return this.enclose('<q>', '</q>');
        };
        __$coverCall('js/Jencil.js', '77735:77851');
        HtmlEditor.prototype.blockquote = function () {
            __$coverCall('js/Jencil.js', '77788:77844');
            return this.enclose('\n<blockquote>', '</blockquote>\n');
        };
        __$coverCall('js/Jencil.js', '77858:77952');
        HtmlEditor.prototype.code = function () {
            __$coverCall('js/Jencil.js', '77905:77945');
            return this.enclose('<code>', '</code>');
        };
        __$coverCall('js/Jencil.js', '77959:78050');
        HtmlEditor.prototype.pre = function () {
            __$coverCall('js/Jencil.js', '78005:78043');
            return this.enclose('<pre>', '</pre>');
        };
        __$coverCall('js/Jencil.js', '78057:78446');
        HtmlEditor.prototype.anchorLink = function () {
            __$coverCall('js/Jencil.js', '78110:78124');
            var href, text;
            __$coverCall('js/Jencil.js', '78132:78155');
            text = this.selection();
            __$coverCall('js/Jencil.js', '78163:78248');
            if (!text) {
                __$coverCall('js/Jencil.js', '78184:78240');
                text = window.prompt('Please input a link text', 'Here');
            }
            __$coverCall('js/Jencil.js', '78256:78314');
            href = window.prompt('Please input a link url', 'http://');
            __$coverCall('js/Jencil.js', '78322:78367');
            if (!(href != null)) {
                __$coverCall('js/Jencil.js', '78353:78359');
                return;
            }
            __$coverCall('js/Jencil.js', '78375:78439');
            return this.selection('<a href=\'' + href + '\'>' + text + '</a>');
        };
        __$coverCall('js/Jencil.js', '78453:78789');
        HtmlEditor.prototype.image = function () {
            __$coverCall('js/Jencil.js', '78501:78513');
            var alt, src;
            __$coverCall('js/Jencil.js', '78521:78579');
            src = window.prompt('Please input a image url', 'http://');
            __$coverCall('js/Jencil.js', '78587:78656');
            alt = window.prompt('(Optional) Please input a alt message', 'Image');
            __$coverCall('js/Jencil.js', '78664:78708');
            if (!(src != null)) {
                __$coverCall('js/Jencil.js', '78694:78700');
                return;
            }
            __$coverCall('js/Jencil.js', '78716:78782');
            return this.selection('<img src=\'' + src + '\' alt=\'' + alt + '\'>');
        };
        __$coverCall('js/Jencil.js', '78796:79302');
        HtmlEditor.prototype.unorderedList = function () {
            __$coverCall('js/Jencil.js', '78852:78863');
            var text, x;
            __$coverCall('js/Jencil.js', '78871:78894');
            text = this.selection();
            __$coverCall('js/Jencil.js', '78902:79195');
            text = function () {
                __$coverCall('js/Jencil.js', '78931:78959');
                var _i, _len, _ref, _results;
                __$coverCall('js/Jencil.js', '78969:78992');
                _ref = text.split('\n');
                __$coverCall('js/Jencil.js', '79002:79015');
                _results = [];
                __$coverCall('js/Jencil.js', '79025:79158');
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    __$coverCall('js/Jencil.js', '79087:79099');
                    x = _ref[_i];
                    __$coverCall('js/Jencil.js', '79111:79148');
                    _results.push('  <li>' + x + '</li>');
                }
                __$coverCall('js/Jencil.js', '79168:79183');
                return _results;
            }();
            __$coverCall('js/Jencil.js', '79203:79223');
            text.unshift('<ul>');
            __$coverCall('js/Jencil.js', '79231:79249');
            text.push('</ul>');
            __$coverCall('js/Jencil.js', '79257:79295');
            return this.selection(text.join('\n'));
        };
        __$coverCall('js/Jencil.js', '79309:79813');
        HtmlEditor.prototype.orderedList = function () {
            __$coverCall('js/Jencil.js', '79363:79374');
            var text, x;
            __$coverCall('js/Jencil.js', '79382:79405');
            text = this.selection();
            __$coverCall('js/Jencil.js', '79413:79706');
            text = function () {
                __$coverCall('js/Jencil.js', '79442:79470');
                var _i, _len, _ref, _results;
                __$coverCall('js/Jencil.js', '79480:79503');
                _ref = text.split('\n');
                __$coverCall('js/Jencil.js', '79513:79526');
                _results = [];
                __$coverCall('js/Jencil.js', '79536:79669');
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    __$coverCall('js/Jencil.js', '79598:79610');
                    x = _ref[_i];
                    __$coverCall('js/Jencil.js', '79622:79659');
                    _results.push('  <li>' + x + '</li>');
                }
                __$coverCall('js/Jencil.js', '79679:79694');
                return _results;
            }();
            __$coverCall('js/Jencil.js', '79714:79734');
            text.unshift('<ol>');
            __$coverCall('js/Jencil.js', '79742:79760');
            text.push('</ol>');
            __$coverCall('js/Jencil.js', '79768:79806');
            return this.selection(text.join('\n'));
        };
        __$coverCall('js/Jencil.js', '79820:79837');
        return HtmlEditor;
    }(TextEditor);
    __$coverCall('js/Jencil.js', '79861:79888');
    HtmlViewer = TemplateViewer;
    __$coverCall('js/Jencil.js', '79893:80896');
    HtmlHelper = function (_super) {
        __$coverCall('js/Jencil.js', '79931:79960');
        __extends(HtmlHelper, _super);
        __$coverCall('js/Jencil.js', '79967:80853');
        function HtmlHelper(core) {
            __$coverCall('js/Jencil.js', '80001:80021');
            var HTML_HELPER_HTML;
            __$coverCall('js/Jencil.js', '80029:80078');
            HtmlHelper.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.js', '80086:80804');
            HTML_HELPER_HTML = '<p><span class="key">Ctrl+Z</span>' + Jencil.t('Undo') + '<p>\n<p><span class="key">Ctrl+Shift+Z</span>' + Jencil.t('Redo') + '<p>\n<p><span class="key">Ctrl+B</span>' + Jencil.t('Make selected text property as <b>Bold</b>') + '<p>\n<p><span class="key">Ctrl+I</span>' + Jencil.t('Make selected text property as <i>Italic</i>') + '<p>\n<p><span class="key">Ctrl+U</span>' + Jencil.t('Underline selected text like <u>Underline</u>') + '<p>\n<p><span class="key">Ctrl+F</span>' + Jencil.t('Toggle fullscreen mode') + '<p>\n<p><span class="key">Ctrl+Q</span>' + Jencil.t('Toggle quick view') + '<p>\n<p><span class="key">Ctrl+H</span>' + Jencil.t('Toggle help') + '<p>';
            __$coverCall('js/Jencil.js', '80812:80847');
            this.element.html(HTML_HELPER_HTML);
        }
        __$coverCall('js/Jencil.js', '80860:80877');
        return HtmlHelper;
    }(BaseHelper);
    __$coverCall('js/Jencil.js', '80901:81707');
    HtmlProfile = {
        mainPanelClass: TrimainPanel,
        editorClass: HtmlEditor,
        viewerClass: HtmlViewer,
        helperClass: HtmlHelper,
        defaultVolume: 1,
        defaultVolume2: 0.7,
        toolbarButtons: [
            'Undo',
            'Redo',
            'Separator',
            [
                'h1',
                'H1'
            ],
            [
                'h2',
                'H2'
            ],
            [
                'h3',
                'H3'
            ],
            [
                'h4',
                'H4'
            ],
            [
                'h5',
                'H5'
            ],
            [
                'h6',
                'H6'
            ],
            'Separator',
            [
                'bold',
                'Bold',
                'Ctrl+B'
            ],
            [
                'italic',
                'Italic',
                'Ctrl+I'
            ],
            [
                'underline',
                'Underline',
                'Ctrl+U'
            ],
            [
                'strike',
                'Strikeout'
            ],
            [
                'superscript',
                'Superscript'
            ],
            [
                'subscript',
                'Subscript'
            ],
            'Separator',
            [
                'anchorLink',
                'Anchor link'
            ],
            [
                'image',
                'Image'
            ],
            [
                'unorderedList',
                'Unordered list'
            ],
            [
                'orderedList',
                'Ordered list'
            ],
            [
                'quote',
                'Quote'
            ],
            [
                'blockquote',
                'Blockquote'
            ],
            [
                'code',
                'Code'
            ],
            [
                'pre',
                'Pre'
            ],
            'Separator',
            'Fullscreen'
        ],
        statusbarButtons: [
            'Viewer',
            'Helper'
        ]
    };
    __$coverCall('js/Jencil.js', '81712:81811');
    namespace('Jencil.profiles', function (exports) {
        __$coverCall('js/Jencil.js', '81765:81805');
        return exports.HtmlProfile = HtmlProfile;
    });
    __$coverCall('js/Jencil.js', '81816:83529');
    headerMarkup = function () {
        __$coverCall('js/Jencil.js', '81849:81937');
        var appendAtxHeader, atxHeaderPattern, changeAtxHeader, removeAtxHeader, toggleAtxHeader;
        __$coverCall('js/Jencil.js', '81943:81993');
        atxHeaderPattern = new RegExp('^s*(#{1,6}s*).*');
        __$coverCall('js/Jencil.js', '81999:82135');
        appendAtxHeader = function (segment, n) {
            __$coverCall('js/Jencil.js', '82046:82056');
            var header;
            __$coverCall('js/Jencil.js', '82064:82086');
            header = '#'.repeat(n);
            __$coverCall('js/Jencil.js', '82094:82128');
            return '' + header + ' ' + segment;
        };
        __$coverCall('js/Jencil.js', '82141:82240');
        removeAtxHeader = function (segment) {
            __$coverCall('js/Jencil.js', '82185:82233');
            return segment.replace(/^(\s*)#{1,6}\s*/g, '$1');
        };
        __$coverCall('js/Jencil.js', '82246:82411');
        changeAtxHeader = function (segment, n) {
            __$coverCall('js/Jencil.js', '82293:82303');
            var header;
            __$coverCall('js/Jencil.js', '82311:82333');
            header = '#'.repeat(n);
            __$coverCall('js/Jencil.js', '82341:82404');
            return segment.replace(/^(\s*)#{1,6}\s*/g, '$1' + header + ' ');
        };
        __$coverCall('js/Jencil.js', '82417:83393');
        toggleAtxHeader = function (textarea, n) {
            __$coverCall('js/Jencil.js', '82465:82523');
            var caret, caretOffset, exists, replacement, segment, text;
            __$coverCall('js/Jencil.js', '82531:82552');
            text = textarea.val();
            __$coverCall('js/Jencil.js', '82560:82594');
            caret = textarea.selection.caret();
            __$coverCall('js/Jencil.js', '82602:82637');
            segment = textarea.selection.text();
            __$coverCall('js/Jencil.js', '82645:82660');
            caretOffset = 0;
            __$coverCall('js/Jencil.js', '82668:83243');
            if (atxHeaderPattern.test(segment)) {
                __$coverCall('js/Jencil.js', '82714:82739');
                exists = RegExp.$1.trim();
                __$coverCall('js/Jencil.js', '82749:82904');
                if (exists.length === n) {
                    __$coverCall('js/Jencil.js', '82786:82824');
                    replacement = removeAtxHeader(segment);
                } else {
                    __$coverCall('js/Jencil.js', '82853:82894');
                    replacement = changeAtxHeader(segment, n);
                }
            } else {
                __$coverCall('js/Jencil.js', '82929:82970');
                replacement = appendAtxHeader(segment, n);
                __$coverCall('js/Jencil.js', '82980:83083');
                if (caret[0] > 0 && text[caret[0] - 1] !== '\n') {
                    __$coverCall('js/Jencil.js', '83041:83073');
                    replacement = '\n' + replacement;
                }
                __$coverCall('js/Jencil.js', '83093:83235');
                if (caret[1] < text.length && text[caret[1]] !== '\n') {
                    __$coverCall('js/Jencil.js', '83160:83197');
                    replacement = '' + replacement + '\n';
                    __$coverCall('js/Jencil.js', '83209:83225');
                    caretOffset = -1;
                }
            }
            __$coverCall('js/Jencil.js', '83251:83287');
            textarea.selection.text(replacement);
            __$coverCall('js/Jencil.js', '83295:83386');
            if (caretOffset !== 0) {
                __$coverCall('js/Jencil.js', '83328:83378');
                return textarea.selection.caretOffset(caretOffset);
            }
        };
        __$coverCall('js/Jencil.js', '83399:83521');
        return function (n) {
            __$coverCall('js/Jencil.js', '83426:83466');
            this.selectWholeLineIfNoSelectionFound();
            __$coverCall('js/Jencil.js', '83474:83514');
            return toggleAtxHeader(this.textarea, n);
        };
    }();
    __$coverCall('js/Jencil.js', '83534:86636');
    autoIndentableMarkdown = function () {
        __$coverCall('js/Jencil.js', '83577:83659');
        var findListInfo, listPattern, orderedListPattern, post, pre, unorderedListPattern;
        __$coverCall('js/Jencil.js', '83665:83721');
        listPattern = /^(\s*)((?:(?:\d+\.)|(?:[\*\+\->])))(\s+)/;
        __$coverCall('js/Jencil.js', '83727:83768');
        orderedListPattern = /^(\s*)(\d+)(\.\s+)/;
        __$coverCall('js/Jencil.js', '83774:83821');
        unorderedListPattern = /^(\s*)([\*\+\->])(\s+)/;
        __$coverCall('js/Jencil.js', '83827:84285');
        findListInfo = function (line) {
            __$coverCall('js/Jencil.js', '83865:83896');
            var leading, mark, spaces, type;
            __$coverCall('js/Jencil.js', '83904:84165');
            if (listPattern.test(line)) {
                __$coverCall('js/Jencil.js', '83942:83961');
                leading = RegExp.$1;
                __$coverCall('js/Jencil.js', '83971:83987');
                mark = RegExp.$2;
                __$coverCall('js/Jencil.js', '83997:84015');
                spaces = RegExp.$3;
                __$coverCall('js/Jencil.js', '84025:84058');
                type = mark.endsWith('.') ? 1 : 2;
            } else if (this._listInfo) {
                __$coverCall('js/Jencil.js', '84103:84124');
                return this._listInfo;
            } else {
                __$coverCall('js/Jencil.js', '84149:84157');
                type = 0;
            }
            __$coverCall('js/Jencil.js', '84173:84278');
            return {
                type: type,
                leading: leading,
                mark: mark,
                spaces: spaces
            };
        };
        __$coverCall('js/Jencil.js', '84291:84900');
        pre = function (e, line) {
            __$coverCall('js/Jencil.js', '84323:84359');
            var lineCaret, listInfo, _ref, _ref1;
            __$coverCall('js/Jencil.js', '84367:84407');
            if (e.shiftKey) {
                __$coverCall('js/Jencil.js', '84393:84399');
                return;
            }
            __$coverCall('js/Jencil.js', '84415:84455');
            listInfo = findListInfo.call(this, line);
            __$coverCall('js/Jencil.js', '84463:84540');
            if ((_ref = listInfo.type) === 3 || _ref === 4) {
                __$coverCall('js/Jencil.js', '84521:84532');
                return true;
            }
            __$coverCall('js/Jencil.js', '84548:84893');
            if ((_ref1 = listInfo.type) === 1 || _ref1 === 2) {
                __$coverCall('js/Jencil.js', '84608:84786');
                if (line.replace(listPattern, '').length === 0) {
                    __$coverCall('js/Jencil.js', '84668:84720');
                    this.selection.line(line.replace(listPattern, '$1'));
                    __$coverCall('js/Jencil.js', '84732:84753');
                    this._listInfo = null;
                    __$coverCall('js/Jencil.js', '84765:84776');
                    return true;
                }
                __$coverCall('js/Jencil.js', '84796:84834');
                lineCaret = this.selection.lineCaret();
                __$coverCall('js/Jencil.js', '84844:84885');
                return this.selection.caret(lineCaret[1]);
            }
        };
        __$coverCall('js/Jencil.js', '84906:86209');
        post = function (e, line, indent, insert, cancel) {
            __$coverCall('js/Jencil.js', '84963:85016');
            var leading, listInfo, num, _ref, _ref1, _ref2, _ref3;
            __$coverCall('js/Jencil.js', '85024:85037');
            insert = null;
            __$coverCall('js/Jencil.js', '85045:85085');
            listInfo = findListInfo.call(this, line);
            __$coverCall('js/Jencil.js', '85093:85491');
            if (cancel && !e.shiftKey && ((_ref = listInfo.type) === 3 || _ref === 4)) {
                __$coverCall('js/Jencil.js', '85178:85219');
                leading = listInfo.mark + listInfo.spaces;
                __$coverCall('js/Jencil.js', '85229:85273');
                indent = line.replace(/^([\t\s]*).*$/, '$1');
                __$coverCall('js/Jencil.js', '85283:85334');
                indent = ' '.repeat(indent.length - leading.length);
                __$coverCall('js/Jencil.js', '85344:85366');
                insert = '\n' + indent;
                __$coverCall('js/Jencil.js', '85376:85459');
                if (insert != null) {
                    __$coverCall('js/Jencil.js', '85408:85449');
                    this.selection.insertAfter(insert, false);
                }
                __$coverCall('js/Jencil.js', '85469:85483');
                cancel = false;
            }
            __$coverCall('js/Jencil.js', '85499:85535');
            if (cancel) {
                __$coverCall('js/Jencil.js', '85521:85527');
                return;
            }
            __$coverCall('js/Jencil.js', '85543:86108');
            if (e.shiftKey) {
                __$coverCall('js/Jencil.js', '85569:85802');
                if ((_ref1 = listInfo.type) === 1 || _ref1 === 2) {
                    __$coverCall('js/Jencil.js', '85631:85672');
                    leading = listInfo.mark + listInfo.spaces;
                    __$coverCall('js/Jencil.js', '85684:85719');
                    insert = ' '.repeat(leading.length);
                    __$coverCall('js/Jencil.js', '85731:85756');
                    this._listInfo = listInfo;
                    __$coverCall('js/Jencil.js', '85768:85792');
                    this._listInfo.type += 2;
                }
            } else if ((_ref2 = listInfo.type) === 1 || _ref2 === 3) {
                __$coverCall('js/Jencil.js', '85877:85923');
                num = parseInt(listInfo.mark.replace('.', ''));
                __$coverCall('js/Jencil.js', '85933:85980');
                insert = '' + (num + 1) + '.' + listInfo.spaces;
            } else if ((_ref3 = listInfo.type) === 2 || _ref3 === 4) {
                __$coverCall('js/Jencil.js', '86055:86100');
                insert = '' + listInfo.mark + listInfo.spaces;
            }
            __$coverCall('js/Jencil.js', '86116:86202');
            if (insert != null) {
                __$coverCall('js/Jencil.js', '86146:86194');
                return this.selection.insertAfter(insert, false);
            }
        };
        __$coverCall('js/Jencil.js', '86215:86628');
        return function (textarea) {
            __$coverCall('js/Jencil.js', '86249:86338');
            if (!(textarea.autoIndent != null)) {
                __$coverCall('js/Jencil.js', '86295:86330');
                textarea = autoIndentable(textarea);
            }
            __$coverCall('js/Jencil.js', '86346:86443');
            textarea.autoIndent.pre = function (e, line) {
                __$coverCall('js/Jencil.js', '86400:86434');
                return pre.call(textarea, e, line);
            };
            __$coverCall('js/Jencil.js', '86451:86598');
            textarea.autoIndent.post = function (e, line, indent, insert, cancel) {
                __$coverCall('js/Jencil.js', '86530:86589');
                return post.call(textarea, e, line, indent, insert, cancel);
            };
            __$coverCall('js/Jencil.js', '86606:86621');
            return textarea;
        };
    }();
    __$coverCall('js/Jencil.js', '86641:93049');
    MarkdownEditor = function (_super) {
        __$coverCall('js/Jencil.js', '86683:86716');
        __extends(MarkdownEditor, _super);
        __$coverCall('js/Jencil.js', '86723:86881');
        function MarkdownEditor(core) {
            __$coverCall('js/Jencil.js', '86761:86814');
            MarkdownEditor.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.js', '86822:86875');
            this.textarea = autoIndentableMarkdown(this.textarea);
        }
        __$coverCall('js/Jencil.js', '86888:87368');
        MarkdownEditor.prototype.selectWholeLineIfNoSelectionFound = function () {
            __$coverCall('js/Jencil.js', '86968:86994');
            var caret, line, lineCaret;
            __$coverCall('js/Jencil.js', '87002:87041');
            caret = this.textarea.selection.caret();
            __$coverCall('js/Jencil.js', '87049:87361');
            if (caret[0] === caret[1]) {
                __$coverCall('js/Jencil.js', '87086:87133');
                lineCaret = this.textarea.selection.lineCaret();
                __$coverCall('js/Jencil.js', '87143:87180');
                line = this.textarea.selection.line();
                __$coverCall('js/Jencil.js', '87190:87303');
                if (/^(\s*[\*\+\-]\s*|^\s*\d+\.\s*|^\s*>\s*)/g.test(line)) {
                    __$coverCall('js/Jencil.js', '87261:87293');
                    lineCaret[0] += RegExp.$1.length;
                }
                __$coverCall('js/Jencil.js', '87313:87353');
                this.textarea.selection.caret(lineCaret);
            }
        };
        __$coverCall('js/Jencil.js', '87375:87464');
        MarkdownEditor.prototype.h1 = function () {
            __$coverCall('js/Jencil.js', '87424:87457');
            return headerMarkup.call(this, 1);
        };
        __$coverCall('js/Jencil.js', '87471:87560');
        MarkdownEditor.prototype.h2 = function () {
            __$coverCall('js/Jencil.js', '87520:87553');
            return headerMarkup.call(this, 2);
        };
        __$coverCall('js/Jencil.js', '87567:87656');
        MarkdownEditor.prototype.h3 = function () {
            __$coverCall('js/Jencil.js', '87616:87649');
            return headerMarkup.call(this, 3);
        };
        __$coverCall('js/Jencil.js', '87663:87752');
        MarkdownEditor.prototype.h4 = function () {
            __$coverCall('js/Jencil.js', '87712:87745');
            return headerMarkup.call(this, 4);
        };
        __$coverCall('js/Jencil.js', '87759:87848');
        MarkdownEditor.prototype.h5 = function () {
            __$coverCall('js/Jencil.js', '87808:87841');
            return headerMarkup.call(this, 5);
        };
        __$coverCall('js/Jencil.js', '87855:87944');
        MarkdownEditor.prototype.h6 = function () {
            __$coverCall('js/Jencil.js', '87904:87937');
            return headerMarkup.call(this, 6);
        };
        __$coverCall('js/Jencil.js', '87951:88040');
        MarkdownEditor.prototype.bold = function () {
            __$coverCall('js/Jencil.js', '88002:88033');
            return this.enclose('**', '**');
        };
        __$coverCall('js/Jencil.js', '88047:88136');
        MarkdownEditor.prototype.italic = function () {
            __$coverCall('js/Jencil.js', '88100:88129');
            return this.enclose('*', '*');
        };
        __$coverCall('js/Jencil.js', '88143:89313');
        MarkdownEditor.prototype.blockquote = function () {
            __$coverCall('js/Jencil.js', '88201:88230');
            var match, pattern1, pattern2;
            __$coverCall('js/Jencil.js', '88238:88271');
            pattern1 = /^(\s*)>\s*([^\n]*)$/m;
            __$coverCall('js/Jencil.js', '88279:88308');
            pattern2 = /^(\s*)([^\n]*)$/m;
            __$coverCall('js/Jencil.js', '88316:88642');
            match = function (lines) {
                __$coverCall('js/Jencil.js', '88350:88368');
                var line, _i, _len;
                __$coverCall('js/Jencil.js', '88378:88612');
                for (_i = 0, _len = lines.length; _i < _len; _i++) {
                    __$coverCall('js/Jencil.js', '88441:88457');
                    line = lines[_i];
                    __$coverCall('js/Jencil.js', '88469:88526');
                    if (line.length === 0) {
                        __$coverCall('js/Jencil.js', '88506:88514');
                        continue;
                    }
                    __$coverCall('js/Jencil.js', '88538:88602');
                    if (!pattern1.test(line)) {
                        __$coverCall('js/Jencil.js', '88578:88590');
                        return false;
                    }
                }
                __$coverCall('js/Jencil.js', '88622:88633');
                return true;
            };
            __$coverCall('js/Jencil.js', '88650:89303');
            return function () {
                __$coverCall('js/Jencil.js', '88678:88717');
                var i, line, lines, _i, _j, _ref, _ref1;
                __$coverCall('js/Jencil.js', '88727:88763');
                lines = this.selection().split('\n');
                __$coverCall('js/Jencil.js', '88773:89245');
                if (match(lines)) {
                    __$coverCall('js/Jencil.js', '88803:89001');
                    for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
                        __$coverCall('js/Jencil.js', '88919:88934');
                        line = lines[i];
                        __$coverCall('js/Jencil.js', '88948:88989');
                        lines[i] = line.replace(pattern1, '$1$2');
                    }
                } else {
                    __$coverCall('js/Jencil.js', '89030:89235');
                    for (i = _j = 0, _ref1 = lines.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
                        __$coverCall('js/Jencil.js', '89151:89166');
                        line = lines[i];
                        __$coverCall('js/Jencil.js', '89180:89223');
                        lines[i] = line.replace(pattern2, '$1> $2');
                    }
                }
                __$coverCall('js/Jencil.js', '89255:89294');
                return this.selection(lines.join('\n'));
            };
        }();
        __$coverCall('js/Jencil.js', '89320:89902');
        MarkdownEditor.prototype.code = function () {
            __$coverCall('js/Jencil.js', '89371:89396');
            var caret, lines, text, x;
            __$coverCall('js/Jencil.js', '89404:89440');
            lines = this.selection().split('\n');
            __$coverCall('js/Jencil.js', '89448:89487');
            caret = this.textarea.selection.caret();
            __$coverCall('js/Jencil.js', '89495:89895');
            if (lines.length > 1) {
                __$coverCall('js/Jencil.js', '89527:89785');
                text = function () {
                    __$coverCall('js/Jencil.js', '89558:89580');
                    var _i, _len, _results;
                    __$coverCall('js/Jencil.js', '89592:89605');
                    _results = [];
                    __$coverCall('js/Jencil.js', '89617:89744');
                    for (_i = 0, _len = lines.length; _i < _len; _i++) {
                        __$coverCall('js/Jencil.js', '89682:89695');
                        x = lines[_i];
                        __$coverCall('js/Jencil.js', '89709:89732');
                        _results.push('\t' + x);
                    }
                    __$coverCall('js/Jencil.js', '89756:89771');
                    return _results;
                }();
                __$coverCall('js/Jencil.js', '89795:89833');
                return this.selection(text.join('\n'));
            } else {
                __$coverCall('js/Jencil.js', '89858:89887');
                return this.enclose('`', '`');
            }
        };
        __$coverCall('js/Jencil.js', '89909:90291');
        MarkdownEditor.prototype.anchorLink = function () {
            __$coverCall('js/Jencil.js', '89966:89980');
            var href, text;
            __$coverCall('js/Jencil.js', '89988:90011');
            text = this.selection();
            __$coverCall('js/Jencil.js', '90019:90104');
            if (!text) {
                __$coverCall('js/Jencil.js', '90040:90096');
                text = window.prompt('Please input a link text', 'Here');
            }
            __$coverCall('js/Jencil.js', '90112:90170');
            href = window.prompt('Please input a link url', 'http://');
            __$coverCall('js/Jencil.js', '90178:90223');
            if (!(href != null)) {
                __$coverCall('js/Jencil.js', '90209:90215');
                return;
            }
            __$coverCall('js/Jencil.js', '90231:90284');
            return this.selection('[' + text + '](' + href + ')');
        };
        __$coverCall('js/Jencil.js', '90298:90624');
        MarkdownEditor.prototype.image = function () {
            __$coverCall('js/Jencil.js', '90350:90362');
            var alt, src;
            __$coverCall('js/Jencil.js', '90370:90428');
            src = window.prompt('Please input a image url', 'http://');
            __$coverCall('js/Jencil.js', '90436:90505');
            alt = window.prompt('(Optional) Please input a alt message', 'Image');
            __$coverCall('js/Jencil.js', '90513:90557');
            if (!(src != null)) {
                __$coverCall('js/Jencil.js', '90543:90549');
                return;
            }
            __$coverCall('js/Jencil.js', '90565:90617');
            return this.selection('![' + alt + '](' + src + ')');
        };
        __$coverCall('js/Jencil.js', '90631:91805');
        MarkdownEditor.prototype.unorderedList = function () {
            __$coverCall('js/Jencil.js', '90692:90721');
            var match, pattern1, pattern2;
            __$coverCall('js/Jencil.js', '90729:90763');
            pattern1 = /^(\s*)\*\s*([^\n]*)$/m;
            __$coverCall('js/Jencil.js', '90771:90800');
            pattern2 = /^(\s*)([^\n]*)$/m;
            __$coverCall('js/Jencil.js', '90808:91134');
            match = function (lines) {
                __$coverCall('js/Jencil.js', '90842:90860');
                var line, _i, _len;
                __$coverCall('js/Jencil.js', '90870:91104');
                for (_i = 0, _len = lines.length; _i < _len; _i++) {
                    __$coverCall('js/Jencil.js', '90933:90949');
                    line = lines[_i];
                    __$coverCall('js/Jencil.js', '90961:91018');
                    if (line.length === 0) {
                        __$coverCall('js/Jencil.js', '90998:91006');
                        continue;
                    }
                    __$coverCall('js/Jencil.js', '91030:91094');
                    if (!pattern1.test(line)) {
                        __$coverCall('js/Jencil.js', '91070:91082');
                        return false;
                    }
                }
                __$coverCall('js/Jencil.js', '91114:91125');
                return true;
            };
            __$coverCall('js/Jencil.js', '91142:91795');
            return function () {
                __$coverCall('js/Jencil.js', '91170:91209');
                var i, line, lines, _i, _j, _ref, _ref1;
                __$coverCall('js/Jencil.js', '91219:91255');
                lines = this.selection().split('\n');
                __$coverCall('js/Jencil.js', '91265:91737');
                if (match(lines)) {
                    __$coverCall('js/Jencil.js', '91295:91493');
                    for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
                        __$coverCall('js/Jencil.js', '91411:91426');
                        line = lines[i];
                        __$coverCall('js/Jencil.js', '91440:91481');
                        lines[i] = line.replace(pattern1, '$1$2');
                    }
                } else {
                    __$coverCall('js/Jencil.js', '91522:91727');
                    for (i = _j = 0, _ref1 = lines.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
                        __$coverCall('js/Jencil.js', '91643:91658');
                        line = lines[i];
                        __$coverCall('js/Jencil.js', '91672:91715');
                        lines[i] = line.replace(pattern2, '$1* $2');
                    }
                }
                __$coverCall('js/Jencil.js', '91747:91786');
                return this.selection(lines.join('\n'));
            };
        }();
        __$coverCall('js/Jencil.js', '91812:93002');
        MarkdownEditor.prototype.orderedList = function () {
            __$coverCall('js/Jencil.js', '91871:91900');
            var match, pattern1, pattern2;
            __$coverCall('js/Jencil.js', '91908:91945');
            pattern1 = /^(\s*)\d+\.\s*([^\n]*)$/m;
            __$coverCall('js/Jencil.js', '91953:91982');
            pattern2 = /^(\s*)([^\n]*)$/m;
            __$coverCall('js/Jencil.js', '91990:92316');
            match = function (lines) {
                __$coverCall('js/Jencil.js', '92024:92042');
                var line, _i, _len;
                __$coverCall('js/Jencil.js', '92052:92286');
                for (_i = 0, _len = lines.length; _i < _len; _i++) {
                    __$coverCall('js/Jencil.js', '92115:92131');
                    line = lines[_i];
                    __$coverCall('js/Jencil.js', '92143:92200');
                    if (line.length === 0) {
                        __$coverCall('js/Jencil.js', '92180:92188');
                        continue;
                    }
                    __$coverCall('js/Jencil.js', '92212:92276');
                    if (!pattern1.test(line)) {
                        __$coverCall('js/Jencil.js', '92252:92264');
                        return false;
                    }
                }
                __$coverCall('js/Jencil.js', '92296:92307');
                return true;
            };
            __$coverCall('js/Jencil.js', '92324:92992');
            return function () {
                __$coverCall('js/Jencil.js', '92352:92391');
                var i, line, lines, _i, _j, _ref, _ref1;
                __$coverCall('js/Jencil.js', '92401:92437');
                lines = this.selection().split('\n');
                __$coverCall('js/Jencil.js', '92447:92934');
                if (match(lines)) {
                    __$coverCall('js/Jencil.js', '92477:92675');
                    for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
                        __$coverCall('js/Jencil.js', '92593:92608');
                        line = lines[i];
                        __$coverCall('js/Jencil.js', '92622:92663');
                        lines[i] = line.replace(pattern1, '$1$2');
                    }
                } else {
                    __$coverCall('js/Jencil.js', '92704:92924');
                    for (i = _j = 0, _ref1 = lines.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
                        __$coverCall('js/Jencil.js', '92825:92840');
                        line = lines[i];
                        __$coverCall('js/Jencil.js', '92854:92912');
                        lines[i] = line.replace(pattern2, '$1' + (i + 1) + '. $2');
                    }
                }
                __$coverCall('js/Jencil.js', '92944:92983');
                return this.selection(lines.join('\n'));
            };
        }();
        __$coverCall('js/Jencil.js', '93009:93030');
        return MarkdownEditor;
    }(TextEditor);
    __$coverCall('js/Jencil.js', '93054:93187');
    namespace('Jencil.types.markdown.editor.MarkdownEditor', function (exports) {
        __$coverCall('js/Jencil.js', '93135:93181');
        return exports.MarkdownEditor = MarkdownEditor;
    });
    __$coverCall('js/Jencil.js', '93192:93646');
    MarkdownJsViewer = function (_super) {
        __$coverCall('js/Jencil.js', '93236:93271');
        __extends(MarkdownJsViewer, _super);
        __$coverCall('js/Jencil.js', '93278:93388');
        function MarkdownJsViewer() {
            __$coverCall('js/Jencil.js', '93314:93382');
            return MarkdownJsViewer.__super__.constructor.apply(this, arguments);
        }
        __$coverCall('js/Jencil.js', '93395:93593');
        MarkdownJsViewer.prototype.update = function (value, force) {
            __$coverCall('js/Jencil.js', '93462:93470');
            var html;
            __$coverCall('js/Jencil.js', '93478:93514');
            html = window.markdown.toHTML(value);
            __$coverCall('js/Jencil.js', '93522:93586');
            return MarkdownJsViewer.__super__.update.call(this, html, force);
        };
        __$coverCall('js/Jencil.js', '93600:93623');
        return MarkdownJsViewer;
    }(TemplateViewer);
    __$coverCall('js/Jencil.js', '93651:94247');
    MarkdownProfile = {
        mainPanelClass: DimainPanel,
        editorClass: MarkdownEditor,
        viewerClass: MarkdownJsViewer,
        defaultVolume: 1,
        toolbarButtons: [
            'Undo',
            'Redo',
            'Separator',
            [
                'h1',
                'H1'
            ],
            [
                'h2',
                'H2'
            ],
            [
                'h3',
                'H3'
            ],
            [
                'h4',
                'H4'
            ],
            [
                'h5',
                'H5'
            ],
            [
                'h6',
                'H6'
            ],
            'Separator',
            [
                'bold',
                'Bold',
                'Ctrl+B'
            ],
            [
                'italic',
                'Italic',
                'Ctrl+I'
            ],
            'Separator',
            [
                'anchorLink',
                'Anchor link'
            ],
            [
                'image',
                'Image'
            ],
            [
                'unorderedList',
                'Unordered list'
            ],
            [
                'orderedList',
                'Ordered list'
            ],
            [
                'blockquote',
                'Blockquote'
            ],
            [
                'code',
                'Code'
            ],
            'Separator',
            'Fullscreen'
        ],
        statusbarButtons: ['Viewer']
    };
    __$coverCall('js/Jencil.js', '94252:94359');
    namespace('Jencil.profiles', function (exports) {
        __$coverCall('js/Jencil.js', '94305:94353');
        return exports.MarkdownProfile = MarkdownProfile;
    });
}.call(this));