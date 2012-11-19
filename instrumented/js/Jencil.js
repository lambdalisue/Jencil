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
__$coverInit("src/js/Jencil.js", "(function() {\n  var ActionButton, AjaxViewer, Bar, BaseEditor, BaseHelper, BaseViewer, Button, Caretaker, CommandButton, DefaultProfile, DimainPanel, Fullscreen, FullscreenButton, HelperButton, HorizontalPanel, HorizontalSplitter, HtmlEditor, HtmlHelper, HtmlProfile, HtmlViewer, MarkdownEditor, MarkdownJsViewer, MarkdownProfile, MonomainPanel, MultiPanel, MultiplePanel, NotImplementedError, Originator, Panel, RedoButton, Selection, Separator, Splitter, Statusbar, TemplateHelper, TemplateViewer, TextEditor, Toolbar, TrimainPanel, UndoButton, VerticalPanel, VerticalSplitter, ViewerButton, Widget, Workspace, Wrapper, animate, apply, autoIndentable, autoIndentableHtml, autoIndentableMarkdown, buttonFactory, curtainFactory, evolute, headerMarkup, namespace, strutils, translate,\n    __slice = [].slice,\n    __hasProp = {}.hasOwnProperty,\n    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };\n\n  namespace = function(target, name, block) {\n    var item, top, _i, _len, _ref, _ref1;\n    if (arguments.length < 3) {\n      _ref = [(typeof exports !== 'undefined' ? exports : window)].concat(__slice.call(arguments)), target = _ref[0], name = _ref[1], block = _ref[2];\n    }\n    top = target;\n    _ref1 = name.split('.');\n    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {\n      item = _ref1[_i];\n      target = target[item] || (target[item] = {});\n    }\n    return block(target, top);\n  };\n\n  if (typeof window !== \"undefined\" && window !== null) {\n    window.namespace = namespace;\n  }\n\n  if (typeof exports !== \"undefined\" && exports !== null) {\n    exports.namespace = namespace;\n  }\n\n  strutils = {\n    repeat: function(str, count) {\n      var pattern, result;\n      if (count < 1) {\n        return '';\n      }\n      result = '';\n      pattern = str.valueOf();\n      while (count > 0) {\n        if (count & 1) {\n          result += pattern;\n        }\n        count >>= 1;\n        pattern += pattern;\n      }\n      return result;\n    },\n    startsWith: function(str, prefix) {\n      return str.lastIndexOf(prefix, 0) === 0;\n    },\n    endsWith: function(str, suffix) {\n      var l;\n      l = str.length - suffix.length;\n      return l >= 0 && str.lastIndexOf(suffix, l) === l;\n    },\n    trimLeft: function(str) {\n      return str.replace(/^\\s+/g, '');\n    },\n    trimRight: function(str) {\n      return str.replace(/\\s+$/g, '');\n    },\n    trim: function(str) {\n      return str.replace(/^\\s+|\\s+$/g, '');\n    }\n  };\n\n  apply = function(object, name, fn) {\n    if (!(object.prototype[name] != null)) {\n      return object.prototype[name] = function() {\n        var args;\n        args = [this].concat(Array.prototype.slice.call(arguments));\n        return fn.apply(this, args);\n      };\n    }\n  };\n\n  apply(String, 'repeat', strutils.repeat);\n\n  apply(String, 'startsWith', strutils.startsWith);\n\n  apply(String, 'endsWith', strutils.endsWith);\n\n  apply(String, 'trimLeft', strutils.trimLeft);\n\n  apply(String, 'trimRight', strutils.trimRight);\n\n  apply(String, 'trim', strutils.trim);\n\n  if (typeof exports !== \"undefined\" && exports !== null) {\n    exports.strutils = strutils;\n  }\n\n  NotImplementedError = (function() {\n\n    function NotImplementedError() {}\n\n    NotImplementedError.prototype.name = 'Not implemeted error';\n\n    NotImplementedError.prototype.message = 'The function has not implemented yet';\n\n    return NotImplementedError;\n\n  })();\n\n  Originator = (function() {\n\n    function Originator() {}\n\n    Originator.prototype.createMemento = function() {\n      throw new NotImplementedError;\n    };\n\n    Originator.prototype.setMemento = function(memento) {\n      throw new NotImplementedError;\n    };\n\n    return Originator;\n\n  })();\n\n  Caretaker = (function() {\n\n    function Caretaker(originator) {\n      this._originator = originator;\n      this._undoStack = [];\n      this._redoStack = [];\n    }\n\n    Caretaker.prototype.originator = function(originator) {\n      if (originator != null) {\n        this._originator = originator;\n        return this;\n      }\n      return this._originator;\n    };\n\n    Caretaker.prototype.save = function(memento) {\n      memento = memento || this.originator().createMemento();\n      this._undoStack.push(memento);\n      this._redoStack = [];\n      return this;\n    };\n\n    Caretaker.prototype.undo = function() {\n      var originator;\n      if (!this.canUndo()) {\n        return false;\n      }\n      originator = this.originator();\n      this._redoStack.push(originator.createMemento());\n      originator.setMemento(this._undoStack.pop());\n      if (typeof originator.focus === \"function\") {\n        originator.focus();\n      }\n      return true;\n    };\n\n    Caretaker.prototype.redo = function() {\n      var originator;\n      if (!this.canRedo()) {\n        return false;\n      }\n      originator = this.originator();\n      this._undoStack.push(originator.createMemento());\n      originator.setMemento(this._redoStack.pop());\n      if (typeof originator.focus === \"function\") {\n        originator.focus();\n      }\n      return true;\n    };\n\n    Caretaker.prototype.canUndo = function() {\n      return this._undoStack.length > 0;\n    };\n\n    Caretaker.prototype.canRedo = function() {\n      return this._redoStack.length > 0;\n    };\n\n    return Caretaker;\n\n  })();\n\n  if (typeof exports !== \"undefined\" && exports !== null) {\n    exports.NotImplementedError = NotImplementedError;\n    exports.Originator = Originator;\n    exports.Caretaker = Caretaker;\n  }\n\n  Selection = (function() {\n\n    function Selection(document, element) {\n      this.document = document;\n      this.element = element;\n      if (this.document instanceof jQuery) {\n        this.document = this.document.get(0);\n      }\n      if (this.element instanceof jQuery) {\n        this.element = this.element.get(0);\n      }\n    }\n\n    Selection.prototype._getCaret = function() {\n      var caret, clone, e, range, s;\n      if (this.document.selection != null) {\n        range = this.document.selection.createRange();\n        clone = range.duplicate();\n        clone.moveToElementText(this.element);\n        clone.setEndPoint('EndToEnd', range);\n        s = clone.text.length - range.text.length;\n        e = s + range.text.length;\n      } else if (this.element.setSelectionRange != null) {\n        s = this.element.selectionStart;\n        e = this.element.selectionEnd;\n      }\n      caret = [s, e];\n      return caret;\n    };\n\n    Selection.prototype._setCaret = function(start, end) {\n      var range, scrollTop;\n      scrollTop = this.element.scrollTop;\n      if (this.element.setSelectionRange != null) {\n        this.element.setSelectionRange(start, end);\n      } else if (this.element.createTextRange) {\n        range = this.element.createTextRange();\n        range.collapse(true);\n        range.moveStart('character', start);\n        range.moveEnd('character', end - start);\n        range.select();\n      }\n      this.element.focus();\n      this.element.scrollTop = scrollTop;\n      return this;\n    };\n\n    Selection.prototype.caret = function(start, end) {\n      if ((start != null) && start instanceof Array) {\n        end = start[1];\n        start = start[0];\n      }\n      if ((start != null) && !(end != null)) {\n        end = start;\n      }\n      if ((start != null) && (end != null)) {\n        return this._setCaret(start, end);\n      }\n      return this._getCaret();\n    };\n\n    Selection.prototype.caretOffset = function(offset) {\n      var caret;\n      caret = this.caret();\n      return this.caret(caret[0] + offset);\n    };\n\n    Selection.prototype.replace = function(str, start, end) {\n      var a, b, scrollTop;\n      scrollTop = this.element.scrollTop;\n      b = this.element.value.substring(0, start);\n      a = this.element.value.substring(end);\n      this.element.value = b + str + a;\n      this.element.scrollTop = scrollTop;\n      return this;\n    };\n\n    Selection.prototype._getText = function() {\n      var e, range, s, _ref;\n      if (this.document.selection != null) {\n        range = this.document.selection.createRange();\n        return range.text;\n      } else if (this.element.setSelectionRange) {\n        _ref = this.caret(), s = _ref[0], e = _ref[1];\n        return this.element.value.substring(s, e);\n      }\n      return null;\n    };\n\n    Selection.prototype._setText = function(str, keepSelection) {\n      var e, s, scrollTop, _ref;\n      scrollTop = this.element.scrollTop;\n      _ref = this.caret(), s = _ref[0], e = _ref[1];\n      this.replace(str, s, e);\n      e = s + str.length;\n      if (!keepSelection) {\n        s = e;\n      }\n      this.caret(s, e);\n      this.element.focus();\n      this.element.scrollTop = scrollTop;\n      return this;\n    };\n\n    Selection.prototype.text = function(str, keepSelection) {\n      if (str != null) {\n        return this._setText(str, keepSelection);\n      }\n      return this._getText();\n    };\n\n    Selection.prototype.insertBefore = function(str, keepSelection) {\n      var e, s, scrollTop, text, _ref;\n      scrollTop = this.element.scrollTop;\n      _ref = this.caret(), s = _ref[0], e = _ref[1];\n      text = this.text();\n      this.replace(str + text, s, e);\n      e = s + str.length;\n      if (!keepSelection) {\n        s = e;\n      }\n      this.caret(s, e);\n      this.element.focus();\n      this.element.scrollTop = scrollTop;\n      return this;\n    };\n\n    Selection.prototype.insertAfter = function(str, keepSelection) {\n      var e, s, scrollTop, text, _ref;\n      scrollTop = this.element.scrollTop;\n      _ref = this.caret(), s = _ref[0], e = _ref[1];\n      text = this.text();\n      this.replace(text + str, s, e);\n      s = e;\n      e = e + str.length;\n      if (!keepSelection) {\n        s = e;\n      }\n      this.caret(s, e);\n      this.element.focus();\n      this.element.scrollTop = scrollTop;\n      return this;\n    };\n\n    Selection.prototype.enclose = function(lhs, rhs, keepSelection) {\n      var e, s, scrollTop, str, text, _ref;\n      scrollTop = this.element.scrollTop;\n      text = this.text();\n      if (text.indexOf(lhs) === 0 && text.lastIndexOf(rhs) === (text.length - rhs.length)) {\n        str = text.substring(lhs.length, text.length - rhs.length);\n        this.text(str, keepSelection);\n      } else {\n        _ref = this.caret(), s = _ref[0], e = _ref[1];\n        this.replace(lhs + text + rhs, s, e);\n        e = s + lhs.length + text.length + rhs.length;\n        if (!keepSelection) {\n          s = e;\n        }\n        this.caret(s, e);\n      }\n      this.element.focus();\n      this.element.scrollTop = scrollTop;\n      return this;\n    };\n\n    Selection.prototype.lineCaret = function(pos) {\n      var e, s, value;\n      pos = pos || this.caret()[0];\n      value = this.element.value;\n      s = value.lastIndexOf(\"\\n\", pos - 1) + 1;\n      e = value.indexOf(\"\\n\", pos);\n      if (e === -1) {\n        e = value.length;\n      }\n      return [s, e];\n    };\n\n    Selection.prototype._getLine = function(pos) {\n      var e, s, _ref;\n      _ref = this.lineCaret(pos), s = _ref[0], e = _ref[1];\n      return this.element.value.substring(s, e);\n    };\n\n    Selection.prototype._setLine = function(line, keepSelection) {\n      var e, s, scrollTop, _ref;\n      scrollTop = this.element.scrollTop;\n      _ref = this.lineCaret(), s = _ref[0], e = _ref[1];\n      this.replace(line, s, e);\n      e = s + line.length;\n      if (!keepSelection) {\n        s = e;\n      }\n      this.caret(s, e);\n      this.element.focus();\n      this.element.scrollTop = scrollTop;\n      return this;\n    };\n\n    Selection.prototype.line = function(value, keepSelection) {\n      if (value != null) {\n        return this._setLine(value, keepSelection);\n      }\n      return this._getLine();\n    };\n\n    Selection.prototype.selectWholeLine = function(pos) {\n      var e, s, _ref;\n      _ref = this.lineCaret(pos), s = _ref[0], e = _ref[1];\n      return this.caret(s, e);\n    };\n\n    Selection.prototype.selectWholeCurrentLine = function() {\n      return this.selectWholeLine(null);\n    };\n\n    return Selection;\n\n  })();\n\n  /*\n  Evolution\n  \n  Extend jQueryObj\n  \n  Author: lambdalisue\n  License: MIT License\n  */\n\n\n  evolute = (function() {\n    var absoluteX, absoluteY, contentX, contentY, maxHeight, maxWidth, minHeight, minWidth, ncss, nonContentHeight, nonContentWidth, outerHeight, outerWidth, relativeX, relativeY;\n    nonContentWidth = function(includeMargin) {\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      return this.outerWidth(includeMargin) - this.width();\n    };\n    nonContentHeight = function(includeMargin) {\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      return this.outerHeight(includeMargin) - this.height();\n    };\n    outerWidth = function(includeMargin, value) {\n      var offset;\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      if (typeof includeMargin === 'number') {\n        value = includeMargin;\n        includeMargin = false;\n      }\n      if (value != null) {\n        offset = this.nonContentWidth(includeMargin);\n        return this.width(value - offset);\n      }\n      return this._outerWidth(includeMargin);\n    };\n    outerHeight = function(includeMargin, value) {\n      var offset;\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      if (typeof includeMargin === 'number') {\n        value = includeMargin;\n        includeMargin = false;\n      }\n      if (value != null) {\n        offset = this.nonContentHeight(includeMargin);\n        return this.height(value - offset);\n      }\n      return this._outerHeight(includeMargin);\n    };\n    ncss = function(propertyName, defaultValue) {\n      var value;\n      if (defaultValue == null) {\n        defaultValue = null;\n      }\n      value = this.css(propertyName);\n      if (value === '' || value === 'none' || value === null || value === (void 0) || value === NaN) {\n        return defaultValue;\n      }\n      value = parseInt(value, 10);\n      return value;\n    };\n    minWidth = function() {\n      return this.ncss('min-width');\n    };\n    minHeight = function() {\n      return this.ncss('min-height');\n    };\n    maxWidth = function() {\n      return this.ncss('max-width');\n    };\n    maxHeight = function() {\n      return this.ncss('max-height');\n    };\n    contentX = function(includeMargin) {\n      var borderLeft, marginLeft, paddingLeft;\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      marginLeft = includeMargin ? this.ncss('margin-left') : 0;\n      borderLeft = this.ncss('border-left-width');\n      paddingLeft = this.ncss('padding-left');\n      return marginLeft + borderLeft + paddingLeft;\n    };\n    contentY = function(includeMargin) {\n      var borderTop, marginTop, paddingTop;\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      marginTop = includeMargin ? this.ncss('margin-top') : 0;\n      borderTop = this.ncss('border-top-width');\n      paddingTop = this.ncss('padding-top');\n      return marginTop + borderTop + paddingTop;\n    };\n    absoluteX = function(value) {\n      var offset;\n      offset = this.offset();\n      if (value != null) {\n        offset.left = value;\n        return this.offset(offset);\n      }\n      return offset.left;\n    };\n    absoluteY = function(value) {\n      var offset;\n      offset = this.offset();\n      if (value != null) {\n        offset.top = value;\n        return this.offset(offset);\n      }\n      return offset.top;\n    };\n    relativeX = function(includeMargin, value) {\n      var offset, parent;\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      if (typeof includeMargin === 'number') {\n        value = includeMargin;\n        includeMargin = false;\n      }\n      parent = evolute(this.parent());\n      offset = parent.absoluteX() + parent.contentX(includeMargin);\n      if (value != null) {\n        return this.absoluteX(value + offset);\n      }\n      return this.absoluteX() - offset;\n    };\n    relativeY = function(includeMargin, value) {\n      var offset, parent;\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      if (typeof includeMargin === 'number') {\n        value = includeMargin;\n        includeMargin = false;\n      }\n      parent = evolute(this.parent());\n      offset = parent.absoluteY() + parent.contentY(includeMargin);\n      if (value != null) {\n        return this.absoluteY(value + offset);\n      }\n      return this.absoluteY() - offset;\n    };\n    evolute = function(jQueryObj) {\n      if (jQueryObj.__evoluted__ === true) {\n        return jQueryObj;\n      }\n      jQueryObj._outerWidth = jQueryObj.outerWidth;\n      jQueryObj._outerHeight = jQueryObj.outerHeight;\n      jQueryObj.nonContentWidth = nonContentWidth;\n      jQueryObj.nonContentHeight = nonContentHeight;\n      jQueryObj.outerWidth = outerWidth;\n      jQueryObj.outerHeight = outerHeight;\n      jQueryObj.nonContentWidth = nonContentWidth;\n      jQueryObj.nonContentHeight = nonContentHeight;\n      jQueryObj.ncss = ncss;\n      jQueryObj.minWidth = minWidth;\n      jQueryObj.minHeight = minHeight;\n      jQueryObj.maxWidth = maxWidth;\n      jQueryObj.maxHeight = maxHeight;\n      jQueryObj.contentX = contentX;\n      jQueryObj.contentY = contentY;\n      jQueryObj.absoluteX = absoluteX;\n      jQueryObj.absoluteY = absoluteY;\n      jQueryObj.relativeX = relativeX;\n      jQueryObj.relativeY = relativeY;\n      jQueryObj.__evoluted__ = true;\n      return jQueryObj;\n    };\n    return evolute;\n  })();\n\n  curtainFactory = function(element) {\n    var curtain;\n    element.css('position', 'relative');\n    curtain = $('<div>').appendTo(element).hide().css({\n      'position': 'absolute',\n      'top': '0',\n      'left': '0',\n      'overflow': 'hidden',\n      'z-index': 99999\n    });\n    curtain.on = function() {\n      curtain.refresh();\n      curtain.show();\n      return this;\n    };\n    curtain.refresh = function() {\n      curtain.width(element.outerWidth(true));\n      curtain.height(element.outerHeight(true));\n      return this;\n    };\n    curtain.off = function() {\n      curtain.hide();\n      return this;\n    };\n    return curtain;\n  };\n\n  /*\n  animation\n  \n  Animate value via easing function\n  \n  The following library is required to use this library\n  \n  - jQuery\n  \n  Author:   lambdalisue (lambdalisue@hashnote.net)\n  License:  MIT License\n  \n  Copyright(C) 2012 lambdalisue, hasnote.net allright reserved\n  */\n\n\n  animate = (function() {\n    var defaultOptions, now;\n    now = function() {\n      return (new Date()).getTime();\n    };\n    defaultOptions = {\n      start: 0,\n      end: 100,\n      duration: 1000,\n      callbackEach: null,\n      callbackDone: null,\n      easing: jQuery.easing.swing\n    };\n    return function(options) {\n      var difference, startTime, step;\n      options = jQuery.extend(defaultOptions, options);\n      startTime = now();\n      difference = options.end - options.start;\n      step = function() {\n        var epoch, x;\n        epoch = now() - startTime;\n        x = options.easing(epoch / options.duration, epoch, 0, 1, options.duration);\n        x = x * difference + options.start;\n        options.callbackEach(x, epoch);\n        if (epoch < options.duration) {\n          return setTimeout(step, 1);\n        } else {\n          options.callbackEach(options.end, options.duration);\n          return typeof options.callbackDone === \"function\" ? options.callbackDone() : void 0;\n        }\n      };\n      step();\n      return null;\n    };\n  })();\n\n  /*\n  autoindent\n  \n  Enable auto indentation feature in textarea\n  It is suitable with jquery.tabby.js which enable tab indentation in textarea\n  \n  The following library is required to use this library\n  \n  - jQuery\n  - selection\n  \n  Note:\n    You should use this library as CoffeeScript that's why I didn't\n    add `autoIndentable` in window namespace\n  \n  Usage:\n  \n    textarea = $('textarea')\n    textarea = autoIndentable(textarea)\n  \n    # auto indent feature is enable at default.\n    # you can disable it with\n    textarea.autoIndent.disable()\n  \n    # and enable again with\n    textarea.autoIndent.enable()\n  \n    # and also, you can add some pre/post callback\n    # which is called pre/post step of adding newline\n    # and white spaces with\n    textarea.autoIndent.pre = (e, line) ->\n      # e = Event object of jQuery\n      # line = current line of caret exists\n      console.log \"This function is called before newline adding\"\n    textarea.autoIndent.post = (e, line, indent, insert) ->\n      # e = Event object of jQuery\n      # line = current line of caret exists\n      # indent = leading white spaces of current line\n      # insert = newline and indent which is added after the caret\n      console.log \"This function is called after newline adding\"\n  \n  Author:   lambdalisue (lambdalisue@hashnote.net)\n  License:  MIT License\n  \n  Copyright(C) 2012 lambdalisue, hasnote.net allright reserved\n  */\n\n\n  autoIndentable = (function() {\n    var autoIndent;\n    autoIndent = function(e) {\n      var cancel, indent, insert, line, _ref, _ref1;\n      if (e.which !== 13) {\n        return;\n      }\n      line = this.selection.line();\n      cancel = ((_ref = this.autoIndent.pre) != null ? _ref.call(this, e, line) : void 0) === true;\n      if (cancel !== true) {\n        indent = line.replace(/^([\\t\\s]*).*$/, \"$1\");\n        insert = \"\\n\" + indent;\n        this.selection.insertAfter(insert, false);\n      }\n      if ((_ref1 = this.autoIndent.post) != null) {\n        _ref1.call(this, e, line, indent, insert, cancel);\n      }\n      e.stopPropagation();\n      e.stopImmediatePropagation();\n      e.preventDefault();\n      this.focus();\n      return false;\n    };\n    return function(textarea, pre, post) {\n      if (!(textarea instanceof jQuery)) {\n        textarea = $(textarea);\n      }\n      if (!(textarea.selection != null)) {\n        textarea.selection = new Selection(document, textarea.get(0));\n      }\n      textarea.autoIndent = function(e) {\n        return autoIndent.call(textarea, e);\n      };\n      textarea.autoIndent.enable = function() {\n        textarea.on('keydown', textarea.autoIndent);\n        return textarea;\n      };\n      textarea.autoIndent.disable = function() {\n        textarea.off('keydown', textarea.autoIndent);\n        return textarea;\n      };\n      if (pre != null) {\n        textarea.autoIndent.pre = function(e, line) {\n          return pre.call(textarea, e, line);\n        };\n      }\n      if (post != null) {\n        textarea.autoIndent.post = function(e, line, indent, insert) {\n          return post.call(textarea, e, line, indent, insert);\n        };\n      }\n      return textarea.autoIndent.enable();\n    };\n  })();\n\n  if (window.i18n != null) {\n    translate = function(key) {\n      return i18n.t(key, {\n        defaultValue: key\n      });\n    };\n  } else {\n    translate = function(key) {\n      return key;\n    };\n  }\n\n  DefaultProfile = {\n    mainPanelClass: null,\n    editorClass: null,\n    viewerClass: null,\n    helperClass: null,\n    toolbarButtons: [],\n    statusbarButtons: [],\n    defaultVolume: null,\n    defaultVolume2: null\n  };\n\n  this.Jencil = (function() {\n\n    function Jencil(textarea, options) {\n      var DefaultOptions,\n        _this = this;\n      DefaultOptions = {\n        profile: 'Html',\n        profiles: {\n          Html: HtmlProfile,\n          Markdown: MarkdownProfile\n        },\n        resizable: true,\n        enableTabIndent: true,\n        enableAutoIndent: true,\n        tabString: '\\t',\n        defaultVolume: null,\n        defaultVolume2: null,\n        width: 640,\n        height: 620,\n        editorTemplatePath: null,\n        viewerTemplatePath: null,\n        helperTemplatePath: null\n      };\n      this.options = jQuery.extend(DefaultOptions, options);\n      this.element = textarea.hide();\n      this.caretaker = new Caretaker();\n      this.caretaker.originator = function() {\n        return _this.editor();\n      };\n      this.wrapper = new Wrapper(this, this.options.width, this.options.height);\n      this.fullscreen = new Fullscreen(this);\n      this.element.after(this.wrapper.element).after(this.fullscreen.element);\n      this.profile(this.options.profile);\n    }\n\n    Jencil.prototype.editor = function() {\n      return this.wrapper.workspace.mainPanel.editorPanel || null;\n    };\n\n    Jencil.prototype.viewer = function() {\n      return this.wrapper.workspace.mainPanel.viewerPanel || null;\n    };\n\n    Jencil.prototype.helper = function() {\n      return this.wrapper.workspace.mainPanel.helperPanel || null;\n    };\n\n    Jencil.prototype.profile = function(profileNameOrInstance) {\n      this.wrapper.init(profileNameOrInstance);\n      this.wrapper.adjust();\n      return this.caretaker.save();\n    };\n\n    return Jencil;\n\n  })();\n\n  $.fn.jencil = function(options) {\n    return $(this).each(function() {\n      var self;\n      self = $(this);\n      return self.data('jencil', new Jencil(self, options));\n    });\n  };\n\n  namespace('Jencil.profiles', function(exports) {\n    return exports.DefaultProfile = DefaultProfile;\n  });\n\n  namespace('Jencil.utils.namespace', function(exports) {\n    return exports.namespace = namespace;\n  });\n\n  namespace('Jencil.utils.strutils', function(exports) {\n    return exports.strutils = strutils;\n  });\n\n  namespace('Jencil.utils.evolution', function(exports) {\n    return exports.evolute = evolute;\n  });\n\n  namespace('Jencil.utils.selection', function(exports) {\n    return exports.Selection = Selection;\n  });\n\n  namespace('Jencil.utils.animation', function(exports) {\n    return exports.animate = animate;\n  });\n\n  namespace('Jencil.utils.autoindent', function(exports) {\n    return exports.autoIndentable = autoIndentable;\n  });\n\n  namespace('Jencil.utils.curtain', function(exports) {\n    return exports.curtainFactory = curtainFactory;\n  });\n\n  namespace('Jencil.utils.i18n', function(exports) {\n    return exports.translate = translate;\n  });\n\n  namespace('Jencil.utils.undo', function(exports) {\n    exports.NotImplementedError = NotImplementedError;\n    exports.Originator = Originator;\n    return exports.Caretaker = Caretaker;\n  });\n\n  namespace('Jencil', function(exports) {\n    return exports.t = translate;\n  });\n\n  Widget = (function() {\n\n    function Widget(core, selector, context) {\n      this.core = core;\n      if (selector == null) {\n        selector = '<div>';\n      }\n      if (selector instanceof jQuery) {\n        this.element = selector;\n      } else {\n        this.element = $(selector, context);\n      }\n      this.element = evolute(this.element);\n    }\n\n    Widget.prototype.init = function() {\n      return this;\n    };\n\n    Widget.prototype.adjust = function() {\n      return this;\n    };\n\n    return Widget;\n\n  })();\n\n  Panel = (function(_super) {\n\n    __extends(Panel, _super);\n\n    function Panel(core, selector, context) {\n      if (selector == null) {\n        selector = '<div>';\n      }\n      Panel.__super__.constructor.call(this, core, selector, context);\n      this.element.addClass('panel');\n    }\n\n    return Panel;\n\n  })(Widget);\n\n  MultiplePanel = (function(_super) {\n\n    __extends(MultiplePanel, _super);\n\n    function MultiplePanel(core, fst, snd, splitter) {\n      var hide, show,\n        _this = this;\n      this.fst = fst;\n      this.snd = snd;\n      this.splitter = splitter;\n      MultiplePanel.__super__.constructor.call(this, core);\n      this.element.addClass('multiple');\n      this.element.append(this.fst.element);\n      this.element.append(this.splitter.element);\n      this.element.append(this.snd.element);\n      show = function(callback) {\n        if (!this.element.is(':visible')) {\n          return this.toggle(callback, null);\n        }\n      };\n      hide = function(callback) {\n        if (this.element.is(':visible')) {\n          return this.toggle(null, callback);\n        }\n      };\n      this.fst.toggle = function(callbackOn, callbackOff) {\n        return _this._togglePanel(0, callbackOn, callbackOff);\n      };\n      this.fst.show = show;\n      this.fst.hide = hide;\n      this.snd.toggle = function(callbackOn, callbackOff) {\n        return _this._togglePanel(1, callbackOn, callbackOff);\n      };\n      this.snd.show = show;\n      this.snd.hide = hide;\n      this.splitter.element.dblclick(function() {\n        return _this.snd.toggle();\n      });\n    }\n\n    MultiplePanel.prototype.init = function() {\n      this.splitter.init();\n      this.fst.init();\n      return this.snd.init();\n    };\n\n    MultiplePanel.prototype._togglePanel = function(to, callbackOn, callbackOff) {\n      var callbackDone, end, volume, _callbackDone,\n        _this = this;\n      if (MultiplePanel._animating) {\n        return;\n      }\n      volume = this.splitter.volume();\n      callbackDone = null;\n      if ((0 < volume && volume < 1)) {\n        end = to;\n        this.splitter._previousVolume = volume;\n        _callbackDone = callbackOff;\n      } else {\n        end = this.splitter._previousVolume || this.splitter.defaultVolume;\n        if (end === to) {\n          end = 0.5;\n        }\n        _callbackDone = callbackOn;\n      }\n      MultiplePanel._animating = true;\n      callbackDone = function() {\n        MultiplePanel._animating = false;\n        return typeof _callbackDone === \"function\" ? _callbackDone() : void 0;\n      };\n      return animate({\n        start: volume,\n        end: end,\n        duration: 500,\n        callbackEach: function(value, epoch) {\n          return _this.splitter.volume(value);\n        },\n        callbackDone: callbackDone\n      });\n    };\n\n    return MultiplePanel;\n\n  })(Panel);\n\n  VerticalPanel = (function(_super) {\n\n    __extends(VerticalPanel, _super);\n\n    function VerticalPanel(core, fst, snd, defaultVolume) {\n      var splitter;\n      if (defaultVolume == null) {\n        defaultVolume = 0.5;\n      }\n      splitter = new VerticalSplitter(core, fst, snd, defaultVolume);\n      VerticalPanel.__super__.constructor.call(this, core, fst, snd, splitter);\n      this.element.addClass('vertical');\n    }\n\n    VerticalPanel.prototype.adjust = function() {\n      this.fst.element.outerHeight(true, this.element.height());\n      this.snd.element.outerHeight(true, this.element.height());\n      this.splitter.element.outerHeight(true, this.element.height());\n      this.splitter.adjust();\n      return this;\n    };\n\n    return VerticalPanel;\n\n  })(MultiplePanel);\n\n  HorizontalPanel = (function(_super) {\n\n    __extends(HorizontalPanel, _super);\n\n    function HorizontalPanel(core, fst, snd, defaultVolume) {\n      var splitter;\n      if (defaultVolume == null) {\n        defaultVolume = 0.5;\n      }\n      splitter = new HorizontalSplitter(core, fst, snd, defaultVolume);\n      HorizontalPanel.__super__.constructor.call(this, core, fst, snd, splitter);\n      this.element.addClass('horizontal');\n    }\n\n    HorizontalPanel.prototype.adjust = function() {\n      this.fst.element.outerWidth(true, this.element.width());\n      this.snd.element.outerWidth(true, this.element.width());\n      this.splitter.element.outerWidth(true, this.element.width());\n      this.splitter.adjust();\n      return this;\n    };\n\n    return HorizontalPanel;\n\n  })(MultiplePanel);\n\n  namespace('Jencil.widgets', function(exports) {\n    exports.Widget = Widget;\n    exports.Panel = Panel;\n    exports.MultiplePanel = MultiplePanel;\n    exports.VerticalPanel = VerticalPanel;\n    return exports.HorizontalPanel = HorizontalPanel;\n  });\n\n  Splitter = (function(_super) {\n\n    __extends(Splitter, _super);\n\n    function Splitter(core, fst, snd, defaultVolume) {\n      var mousemove, mouseup,\n        _this = this;\n      this.fst = fst;\n      this.snd = snd;\n      this.defaultVolume = defaultVolume != null ? defaultVolume : 0.5;\n      Splitter.__super__.constructor.call(this, core);\n      this.element.addClass('splitter');\n      this._volume = this.defaultVolume;\n      mousemove = function(e) {\n        var _ref, _ref1;\n        _this.mousemove(e);\n        if ((_ref = _this.fst.curtain) != null) {\n          _ref.refresh();\n        }\n        if ((_ref1 = _this.snd.curtain) != null) {\n          _ref1.refresh();\n        }\n        e.stopPropagation();\n        e.stopImmediatePropagation();\n        return e.preventDefault();\n      };\n      mouseup = function(e) {\n        var $window, _ref, _ref1;\n        $window = $(window);\n        $window.unbind('mousemove', mousemove);\n        $window.unbind('mouseup', mouseup);\n        if ((_ref = _this.fst.curtain) != null) {\n          _ref.off();\n        }\n        if ((_ref1 = _this.snd.curtain) != null) {\n          _ref1.off();\n        }\n        e.stopPropagation();\n        e.stopImmediatePropagation();\n        return e.preventDefault();\n      };\n      this.element.mousedown(function(e) {\n        var $window, _ref, _ref1;\n        $window = $(window);\n        $window.mousemove(mousemove);\n        $window.mouseup(mouseup);\n        if ((_ref = _this.fst.curtain) != null) {\n          _ref.on();\n        }\n        if ((_ref1 = _this.snd.curtain) != null) {\n          _ref1.on();\n        }\n        e.stopPropagation();\n        e.stopImmediatePropagation();\n        return e.preventDefault();\n      });\n    }\n\n    Splitter.prototype.init = function() {\n      this.container = evolute(this.element.parent());\n      return this;\n    };\n\n    Splitter.prototype.volume = function(value, skip) {\n      if (skip == null) {\n        skip = false;\n      }\n      if (value != null) {\n        this._volume = value;\n        if (!skip) {\n          this.adjust();\n        }\n        return this;\n      }\n      return this._volume;\n    };\n\n    Splitter.prototype.value = function(value, skip) {\n      var valueWidth, volume;\n      if (skip == null) {\n        skip = false;\n      }\n      valueWidth = this.valueWidth();\n      if (value != null) {\n        volume = value / valueWidth;\n        return this.volume(volume, skip);\n      }\n      return this.volume() * valueWidth;\n    };\n\n    Splitter.prototype.regulateValue = function(value) {\n      var maxValue, minValue;\n      minValue = this.minValue();\n      maxValue = this.maxValue();\n      if (value < minValue) {\n        value = minValue;\n      }\n      if (value > maxValue) {\n        value = maxValue;\n      }\n      return value;\n    };\n\n    return Splitter;\n\n  })(Widget);\n\n  VerticalSplitter = (function(_super) {\n\n    __extends(VerticalSplitter, _super);\n\n    function VerticalSplitter(core, fst, snd, defaultVolume) {\n      var _ref, _ref1;\n      VerticalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);\n      this.element.addClass('vertical');\n      this.fst.element.addClass('left');\n      this.snd.element.addClass('right');\n      this.fst.element.css({\n        'float': 'left'\n      });\n      this.snd.element.css({\n        'float': 'left'\n      });\n      if ((_ref = this.fst.curtain) != null) {\n        _ref.css('pointer', 'col-resize');\n      }\n      if ((_ref1 = this.snd.curtain) != null) {\n        _ref1.css('pointer', 'col-resize');\n      }\n    }\n\n    VerticalSplitter.prototype.mousemove = function(e) {\n      var offset, value;\n      offset = this.container.absoluteX() + this.container.contentX(true);\n      value = e.pageX - offset;\n      value = this.regulateValue(value);\n      return this.value(value);\n    };\n\n    VerticalSplitter.prototype.valueWidth = function() {\n      return this.container.width();\n    };\n\n    VerticalSplitter.prototype.minValue = function() {\n      var m1, m2;\n      m1 = this.fst.element.minWidth() + this.fst.element.nonContentWidth();\n      m2 = this.snd.element.maxWidth();\n      if (m2 != null) {\n        m2 = this.valueWidth() - (m2 + this.snd.element.nonContentWidth());\n      }\n      if ((m1 != null) && (m2 != null)) {\n        return Math.max(m1, m2);\n      }\n      return m1 || m2 || 0;\n    };\n\n    VerticalSplitter.prototype.maxValue = function() {\n      var m1, m2, valueWidth;\n      valueWidth = this.valueWidth();\n      m1 = this.fst.element.maxWidth();\n      if (m1 != null) {\n        m1 = m1 + this.fst.element.nonContentWidth();\n      }\n      m2 = this.snd.element.minWidth() + this.snd.element.nonContentWidth();\n      if (m2 != null) {\n        m2 = valueWidth - m2;\n      }\n      if ((m1 != null) && (m2 != null)) {\n        return Math.min(m1, m2);\n      }\n      return m1 || m2 || valueWidth;\n    };\n\n    VerticalSplitter.prototype.adjust = function() {\n      var fstValue, sndValue, value, valueWidth;\n      value = this.value();\n      valueWidth = this.valueWidth();\n      fstValue = value - this.fst.element.nonContentWidth(true);\n      sndValue = (valueWidth - value) - this.snd.element.nonContentWidth(true);\n      if (fstValue <= 0) {\n        if (this.fst.element.is(':visible')) {\n          this.fst.element.hide();\n        }\n        if (!this.snd.element.is(':visible')) {\n          this.snd.element.show();\n        }\n        this.snd.element.outerWidth(true, valueWidth);\n        this._value = value = 0;\n      } else if (sndValue <= 0) {\n        if (!this.fst.element.is(':visible')) {\n          this.fst.element.show();\n        }\n        if (this.snd.element.is(':visible')) {\n          this.snd.element.hide();\n        }\n        this.fst.element.outerWidth(true, valueWidth);\n        this._value = value = valueWidth;\n      } else {\n        if (!this.fst.element.is(':visible')) {\n          this.fst.element.show();\n        }\n        if (!this.snd.element.is(':visible')) {\n          this.snd.element.show();\n        }\n        this.fst.element.width(fstValue);\n        this.snd.element.width(sndValue);\n      }\n      this.fst.adjust();\n      this.snd.adjust();\n      this.element.relativeX(value - this.element.outerWidth() / 2);\n      return this;\n    };\n\n    return VerticalSplitter;\n\n  })(Splitter);\n\n  HorizontalSplitter = (function(_super) {\n\n    __extends(HorizontalSplitter, _super);\n\n    function HorizontalSplitter(core, fst, snd, defaultVolume) {\n      var _ref, _ref1;\n      HorizontalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);\n      this.element.addClass('horizontal');\n      this.fst.element.addClass('top');\n      this.snd.element.addClass('bottom');\n      if ((_ref = this.fst.curtain) != null) {\n        _ref.css('pointer', 'raw-resize');\n      }\n      if ((_ref1 = this.snd.curtain) != null) {\n        _ref1.css('pointer', 'raw-resize');\n      }\n    }\n\n    HorizontalSplitter.prototype.mousemove = function(e) {\n      var offset, value;\n      offset = this.container.absoluteY() + this.container.contentY(true);\n      value = e.pageY - offset;\n      value = this.regulateValue(value);\n      return this.value(value);\n    };\n\n    HorizontalSplitter.prototype.valueWidth = function() {\n      return this.container.height();\n    };\n\n    HorizontalSplitter.prototype.minValue = function() {\n      var m1, m2;\n      m1 = this.fst.element.minHeight() + this.fst.element.nonContentHeight();\n      m2 = this.snd.element.maxHeight();\n      if (m2 != null) {\n        m2 = this.valueWidth() - (m2 + this.snd.element.nonContentHeight());\n      }\n      if ((m1 != null) && (m2 != null)) {\n        return Math.max(m1, m2);\n      }\n      return m1 || m2 || 0;\n    };\n\n    HorizontalSplitter.prototype.maxValue = function() {\n      var m1, m2, valueWidth;\n      valueWidth = this.valueWidth();\n      m1 = this.fst.element.maxHeight();\n      if (m1 != null) {\n        m1 = m1 + this.fst.element.nonContentHeight();\n      }\n      m2 = this.snd.element.minHeight() + this.snd.element.nonContentHeight();\n      if (m2 != null) {\n        m2 = valueWidth - m2;\n      }\n      if ((m1 != null) && (m2 != null)) {\n        return Math.min(m1, m2);\n      }\n      return m1 || m2 || valueWidth;\n    };\n\n    HorizontalSplitter.prototype.adjust = function() {\n      var fstValue, sndValue, value, valueWidth;\n      value = this.value();\n      valueWidth = this.valueWidth();\n      fstValue = value - this.fst.element.nonContentHeight(true);\n      sndValue = (valueWidth - value) - this.snd.element.nonContentHeight(true);\n      if (fstValue <= 0) {\n        if (this.fst.element.is(':visible')) {\n          this.fst.element.hide();\n        }\n        if (!this.snd.element.is(':visible')) {\n          this.snd.element.show();\n        }\n        this.snd.element.outerHeight(true, valueWidth);\n        this._value = value = 0;\n      } else if (sndValue <= 0) {\n        if (!this.fst.element.is(':visible')) {\n          this.fst.element.show();\n        }\n        if (this.snd.element.is(':visible')) {\n          this.snd.element.hide();\n        }\n        this.fst.element.outerHeight(true, valueWidth);\n        this._value = value = valueWidth;\n      } else {\n        if (!this.fst.element.is(':visible')) {\n          this.fst.element.show();\n        }\n        if (!this.snd.element.is(':visible')) {\n          this.snd.element.show();\n        }\n        this.fst.element.height(fstValue);\n        this.snd.element.height(sndValue);\n      }\n      this.fst.adjust();\n      this.snd.adjust();\n      this.element.relativeY(value - this.element.outerHeight() / 2);\n      return this;\n    };\n\n    return HorizontalSplitter;\n\n  })(Splitter);\n\n  namespace('Jencil.splitters', function(exports) {\n    exports.Splitter = Splitter;\n    exports.VerticalSplitter = VerticalSplitter;\n    return exports.HorizontalSplitter = HorizontalSplitter;\n  });\n\n  BaseEditor = (function(_super) {\n\n    __extends(BaseEditor, _super);\n\n    function BaseEditor(core, selector, context) {\n      if (selector == null) {\n        selector = '<div>';\n      }\n      BaseEditor.__super__.constructor.call(this, core, selector, context);\n      this.element.addClass('editor');\n      this._changeCallbacks = [];\n    }\n\n    BaseEditor.prototype.val = function(value) {\n      throw new Error(\"NotImplementedError\");\n    };\n\n    BaseEditor.prototype.change = function(callback) {\n      var _i, _len, _ref;\n      if (callback != null) {\n        this._changeCallbacks.push(callback);\n        return this;\n      }\n      _ref = this._changeCallbacks;\n      for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n        callback = _ref[_i];\n        callback.call(this, this.val());\n      }\n      return this;\n    };\n\n    BaseEditor.prototype.h1 = null;\n\n    BaseEditor.prototype.h2 = null;\n\n    BaseEditor.prototype.h3 = null;\n\n    BaseEditor.prototype.h4 = null;\n\n    BaseEditor.prototype.h5 = null;\n\n    BaseEditor.prototype.h6 = null;\n\n    BaseEditor.prototype.bold = null;\n\n    BaseEditor.prototype.italic = null;\n\n    BaseEditor.prototype.underline = null;\n\n    BaseEditor.prototype.strike = null;\n\n    BaseEditor.prototype.superscript = null;\n\n    BaseEditor.prototype.subscript = null;\n\n    BaseEditor.prototype.anchor = null;\n\n    BaseEditor.prototype.image = null;\n\n    BaseEditor.prototype.unorderedList = null;\n\n    BaseEditor.prototype.orderedList = null;\n\n    return BaseEditor;\n\n  })(Panel);\n\n  TextEditor = (function(_super) {\n\n    __extends(TextEditor, _super);\n\n    function TextEditor(core, selector, context) {\n      var _this = this;\n      if (selector == null) {\n        selector = '<div>';\n      }\n      TextEditor.__super__.constructor.call(this, core, selector, context);\n      this.textarea = $('<textarea>').appendTo(this.element).css({\n        'margin': '0',\n        'padding': '0',\n        'border': 'none',\n        'outline': 'none',\n        'resize': 'none'\n      });\n      this.textarea = evolute(this.textarea);\n      this.textarea.on('keydown', function(e) {\n        if (e.which !== 13) {\n          return;\n        }\n        return _this.core.caretaker.save();\n      });\n      if (($.fn.tabby != null) && this.core.options.enableTabIndent) {\n        this.textarea.tabby({\n          'tabString': this.core.options.tabString\n        });\n      }\n      this.textarea = autoIndentable(this.textarea);\n      if (!this.core.options.enableAutoIndent) {\n        this.textarea.autoIndent.disable();\n      }\n      this.textarea.on('keypress keyup click blur', function() {\n        return _this.change();\n      });\n    }\n\n    TextEditor.prototype.val = function(value) {\n      if (value != null) {\n        this.textarea.val(value);\n        this.change();\n        return this;\n      }\n      return this.textarea.val();\n    };\n\n    TextEditor.prototype.focus = function() {\n      this.textarea.focus();\n      return this;\n    };\n\n    TextEditor.prototype.createMemento = function() {\n      return this.val();\n    };\n\n    TextEditor.prototype.setMemento = function(memento) {\n      return this.val(memento);\n    };\n\n    TextEditor.prototype.adjust = function() {\n      this.textarea.outerWidth(this.element.width());\n      this.textarea.outerHeight(this.element.height());\n      return this;\n    };\n\n    TextEditor.prototype.selectWholeLineIfNoSelectionFound = function() {\n      var caret;\n      caret = this.textarea.selection.caret();\n      if (caret[0] === caret[1]) {\n        this.textarea.selection.selectWholeCurrentLine();\n      }\n    };\n\n    TextEditor.prototype.selection = function(str, keepSelection) {\n      if (keepSelection == null) {\n        keepSelection = true;\n      }\n      if (str != null) {\n        this.textarea.selection.text(str, keepSelection);\n        this.core.caretaker.save();\n        return this.change();\n      }\n      return this.textarea.selection.text();\n    };\n\n    TextEditor.prototype.enclose = function(b, a, keepSelection) {\n      if (keepSelection == null) {\n        keepSelection = true;\n      }\n      this.selectWholeLineIfNoSelectionFound();\n      this.textarea.selection.enclose(b, a, keepSelection);\n      this.core.caretaker.save();\n      return this.change();\n    };\n\n    TextEditor.prototype.insertBefore = function(str, keepSelection) {\n      if (keepSelection == null) {\n        keepSelection = true;\n      }\n      this.selectWholeLineIfNoSelectionFound();\n      this.textarea.selection.insertBefore(str, keepSelection);\n      this.core.caretaker.save();\n      return this.change();\n    };\n\n    TextEditor.prototype.insertAfter = function(str, keepSelection) {\n      if (keepSelection == null) {\n        keepSelection = true;\n      }\n      this.selectWholeLineIfNoSelectionFound();\n      this.textarea.selection.insertAfter(str, keepSelection);\n      this.core.caretaker.save();\n      return this.change();\n    };\n\n    return TextEditor;\n\n  })(BaseEditor);\n\n  namespace('Jencil.editors', function(exports) {\n    exports.BaseEditor = BaseEditor;\n    return exports.TextEditor = TextEditor;\n  });\n\n  BaseViewer = (function(_super) {\n\n    __extends(BaseViewer, _super);\n\n    function BaseViewer(core, selector, context) {\n      if (selector == null) {\n        selector = '<div>';\n      }\n      BaseViewer.__super__.constructor.call(this, core, selector, context);\n      this.element.addClass('viewer');\n    }\n\n    BaseViewer.prototype.update = function(value, force) {\n      throw new Error(\"NotImplementedError\");\n    };\n\n    return BaseViewer;\n\n  })(Panel);\n\n  TemplateViewer = (function(_super) {\n\n    __extends(TemplateViewer, _super);\n\n    function TemplateViewer(core) {\n      TemplateViewer.__super__.constructor.call(this, core);\n      this.templatePath = this.core.options.viewerTemplatePath;\n      this.element.css({\n        'position': 'relative'\n      });\n      this.curtain = curtainFactory(this.element);\n      this.iframe = $('<iframe>').appendTo(this.element).css({\n        margin: '0',\n        padding: '0',\n        border: 'none',\n        outline: 'none',\n        resize: 'none',\n        width: '100%',\n        height: '100%',\n        overflow: 'visible'\n      });\n      this.iframe.attr('frameborder', 0);\n      this.iframe = evolute(this.iframe);\n      this.iframe.init = function() {\n        var iframe;\n        iframe = this.get(0);\n        if (iframe.contentDocument != null) {\n          this.document = iframe.contentDocument;\n        } else {\n          this.document = iframe.contentWindow.document;\n        }\n        return this.document.write('<body></body>');\n      };\n      this.iframe.write = function(value) {\n        var scrollTop;\n        if (this.document != null) {\n          try {\n            scrollTop = this.document.documentElement.scrollTop;\n          } catch (e) {\n            scrollTop = 0;\n          }\n          this.document.open();\n          this.document.write(value);\n          this.document.close();\n          $(\"a\", $(this.document)).attr('target', '_blank');\n          this.document.documentElement.scrollTop = scrollTop;\n          this.width(this.document.scrollLeft);\n          this.height(this.document.scrollTop);\n          return true;\n        }\n        return false;\n      };\n      this.iframe.loadTemplate = function(templatePath, value) {\n        var _this = this;\n        return $.ajax({\n          url: templatePath,\n          success: function(data) {\n            _this._template = data;\n            return _this.write(value);\n          }\n        });\n      };\n    }\n\n    TemplateViewer.prototype.init = function() {\n      return this.iframe.init();\n    };\n\n    TemplateViewer.prototype.update = function(value, force) {\n      if (!this.element.is(':visible') && !force) {\n        return;\n      }\n      if (this.iframe._template != null) {\n        value = this.iframe._template.replace(\"{{content}}\", value);\n      } else if (this.templatePath != null) {\n        this.iframe.loadTemplate(this.templatePath, value);\n      }\n      return this.iframe.write(value);\n    };\n\n    TemplateViewer.prototype.adjust = function() {\n      this.iframe.outerWidth(this.element.width());\n      this.iframe.outerHeight(this.element.height());\n      return this;\n    };\n\n    return TemplateViewer;\n\n  })(BaseViewer);\n\n  AjaxViewer = (function(_super) {\n\n    __extends(AjaxViewer, _super);\n\n    function AjaxViewer(core, config) {\n      this.config = config;\n      AjaxViewer.__super__.constructor.call(this, core);\n      this.config = jQuery.extend({\n        type: 'GET',\n        dataType: 'text',\n        data: function(value) {\n          return encodeURIComponent(value);\n        },\n        url: null\n      }, this.config);\n    }\n\n    AjaxViewer.prototype.update = function(value, force) {\n      var _this = this;\n      if (this._valueCache !== value || force) {\n        this._valueCache = value;\n        return $.ajax({\n          type: this.config.type,\n          dataType: this.config.dataType,\n          data: JSON.stringify(this.config.data(value)),\n          url: this.config.url,\n          success: function(value) {\n            if (_this.iframe._template != null) {\n              value = _this.iframe._template.replace(\"{{content}}\", value);\n            } else if (_this.templatePath != null) {\n              _this.iframe.loadTemplate(_this.templatePath, value);\n            }\n            return _this.iframe.write(value);\n          }\n        });\n      }\n    };\n\n    return AjaxViewer;\n\n  })(TemplateViewer);\n\n  namespace('Jencil.viewers', function(exports) {\n    exports.BaseViewer = BaseViewer;\n    exports.TemplateViewer = TemplateViewer;\n    return exports.AjaxViewer = AjaxViewer;\n  });\n\n  BaseHelper = (function(_super) {\n\n    __extends(BaseHelper, _super);\n\n    function BaseHelper(core, selector, context) {\n      if (selector == null) {\n        selector = '<div>';\n      }\n      BaseHelper.__super__.constructor.call(this, core, selector, context);\n      this.element.addClass('helper');\n    }\n\n    return BaseHelper;\n\n  })(Panel);\n\n  TemplateHelper = (function(_super) {\n\n    __extends(TemplateHelper, _super);\n\n    function TemplateHelper(core) {\n      TemplateHelper.__super__.constructor.call(this, core);\n      this.templatePath = this.core.options.helperTemplatePath;\n      this.element.css({\n        'position': 'relative'\n      });\n      this.curtain = curtainFactory(this.element);\n      this.iframe = $('<iframe>').appendTo(this.element).css({\n        margin: '0',\n        padding: '0',\n        border: 'none',\n        outline: 'none',\n        resize: 'none',\n        width: '100%',\n        height: '100%',\n        overflow: 'visible'\n      });\n      this.iframe.attr('frameborder', 0);\n      this.iframe = evolute(this.iframe);\n      this.iframe.init = function() {\n        var iframe;\n        iframe = this.get(0);\n        if (iframe.contentDocument != null) {\n          this.document = iframe.contentDocument;\n        } else {\n          this.document = iframe.contentWindow.document;\n        }\n        return this.document.write('<body></body>');\n      };\n      this.iframe.write = function(value) {\n        var scrollTop;\n        if (this.document != null) {\n          try {\n            scrollTop = this.document.documentElement.scrollTop;\n          } catch (e) {\n            scrollTop = 0;\n          }\n          this.document.open();\n          this.document.write(value);\n          this.document.close();\n          this.document.documentElement.scrollTop = scrollTop;\n          this.width(this.document.scrollLeft);\n          this.height(this.document.scrollTop);\n          return true;\n        }\n        return false;\n      };\n      this.iframe.loadTemplate = function(templatePath) {\n        var _this = this;\n        return $.ajax({\n          url: templatePath,\n          success: function(data) {\n            return _this.write(data);\n          }\n        });\n      };\n    }\n\n    TemplateHelper.prototype.init = function() {\n      this.iframe.init();\n      if (this.templatePath != null) {\n        return this.iframe.loadTemplate(this.templatePath);\n      }\n    };\n\n    TemplateHelper.prototype.adjust = function() {\n      this.iframe.outerWidth(this.element.width());\n      this.iframe.outerHeight(this.element.height());\n      return this;\n    };\n\n    return TemplateHelper;\n\n  })(BaseHelper);\n\n  namespace('Jencil.helpers', function(exports) {\n    exports.BaseHelper = BaseHelper;\n    return exports.TemplateHelper = TemplateHelper;\n  });\n\n  Separator = (function(_super) {\n\n    __extends(Separator, _super);\n\n    function Separator(core) {\n      Separator.__super__.constructor.call(this, core, '<span>');\n      this.element.addClass('separator');\n    }\n\n    return Separator;\n\n  })(Widget);\n\n  Button = (function(_super) {\n\n    __extends(Button, _super);\n\n    function Button(core, name, text, title) {\n      this.name = name;\n      this.text = text;\n      this.title = title;\n      Button.__super__.constructor.call(this, core, '<a>');\n      this.text = Jencil.t(this.text || this.name);\n      this.title = Jencil.t(this.title || this.text);\n      this.element.addClass('button').addClass(name);\n      this.element.append($(\"<span>\" + this.text + \"</span>\"));\n      this.element.attr('title', this.title);\n    }\n\n    Button.prototype.enable = function() {\n      this.element.removeClass('disable');\n      return this;\n    };\n\n    Button.prototype.disable = function() {\n      this.element.addClass('disable');\n      return this;\n    };\n\n    Button.prototype.init = function() {\n      this.validate();\n      return this;\n    };\n\n    Button.prototype.validate = function() {\n      return this;\n    };\n\n    return Button;\n\n  })(Widget);\n\n  ActionButton = (function(_super) {\n\n    __extends(ActionButton, _super);\n\n    function ActionButton(core, name, text, title, callback, shortcut) {\n      var _this = this;\n      this.shortcut = shortcut;\n      ActionButton.__super__.constructor.call(this, core, name, text, title);\n      this.callback = function() {\n        if (!_this.element.hasClass('disable')) {\n          _this.callback.raw();\n        }\n        return _this;\n      };\n      this.callback.raw = callback;\n      this.element.click(function() {\n        return _this.callback();\n      });\n      if ((this.shortcut != null) && (window.shortcut != null)) {\n        window.shortcut.add(this.shortcut, function(e) {\n          return _this.callback();\n        });\n        this.element.attr('title', \"\" + this.title + \" (\" + this.shortcut + \")\");\n      }\n    }\n\n    return ActionButton;\n\n  })(Button);\n\n  CommandButton = (function(_super) {\n\n    __extends(CommandButton, _super);\n\n    function CommandButton(core, name, text, title, command, shortcut) {\n      var callback;\n      this.command = command;\n      callback = function() {\n        var editor;\n        editor = core.editor();\n        return editor[command].call(editor);\n      };\n      CommandButton.__super__.constructor.call(this, core, name, text, title, callback, shortcut);\n    }\n\n    CommandButton.prototype.validate = function() {\n      var editor;\n      editor = this.core.editor();\n      if (!(editor[this.command] != null)) {\n        this.disable();\n      }\n      return this;\n    };\n\n    CommandButton.factory = function(core, args) {\n      var command, name, shortcut, text, title;\n      name = text = title = command = shortcut = null;\n      switch (args.length) {\n        case 5:\n          name = args[0];\n          text = args[1];\n          title = args[2];\n          command = args[3];\n          shortcut = args[4];\n          break;\n        case 4:\n          name = args[0];\n          text = title = args[1];\n          command = args[2];\n          shortcut = args[3];\n          break;\n        case 3:\n          name = command = args[0];\n          text = title = args[1];\n          shortcut = args[2];\n          break;\n        case 2:\n          name = command = args[0];\n          text = title = args[1];\n          shortcut = null;\n          break;\n        case 1:\n          name = command = text = title = args[0];\n          shortcut = null;\n      }\n      return new CommandButton(core, name, text, title, command, shortcut);\n    };\n\n    return CommandButton;\n\n  })(ActionButton);\n\n  UndoButton = (function(_super) {\n\n    __extends(UndoButton, _super);\n\n    function UndoButton(core) {\n      var callback,\n        _this = this;\n      callback = function(e) {\n        return _this.core.caretaker.undo();\n      };\n      UndoButton.__super__.constructor.call(this, core, 'undo', 'Undo', 'Undo', callback, 'Ctrl+Z');\n    }\n\n    UndoButton.prototype.init = function() {\n      var check,\n        _this = this;\n      check = function() {\n        if (_this.core.caretaker.canUndo() === false) {\n          _this.disable();\n        } else {\n          _this.enable();\n        }\n        return setTimeout(check, 100);\n      };\n      return check();\n    };\n\n    return UndoButton;\n\n  })(ActionButton);\n\n  RedoButton = (function(_super) {\n\n    __extends(RedoButton, _super);\n\n    function RedoButton(core) {\n      var callback,\n        _this = this;\n      callback = function(e) {\n        return _this.core.caretaker.redo();\n      };\n      RedoButton.__super__.constructor.call(this, core, 'redo', 'Redo', 'Redo', callback, 'Ctrl+Shift+Z');\n    }\n\n    RedoButton.prototype.init = function() {\n      var check,\n        _this = this;\n      check = function() {\n        if (_this.core.caretaker.canRedo() === false) {\n          _this.disable();\n        } else {\n          _this.enable();\n        }\n        return setTimeout(check, 100);\n      };\n      return check();\n    };\n\n    return RedoButton;\n\n  })(ActionButton);\n\n  FullscreenButton = (function(_super) {\n\n    __extends(FullscreenButton, _super);\n\n    function FullscreenButton(core) {\n      var callback,\n        _this = this;\n      callback = function(e) {\n        return _this.core.fullscreen.toggle();\n      };\n      FullscreenButton.__super__.constructor.call(this, core, 'fullscreen', 'Toggle fullscreen', 'Fullscreen', callback, 'Ctrl+F');\n    }\n\n    FullscreenButton.prototype.init = function() {\n      var check,\n        _this = this;\n      check = function() {\n        if (_this.core.fullscreen.element.is(':visible') === true) {\n          _this.element.addClass('hide');\n        } else {\n          _this.element.removeClass('hide');\n        }\n        return setTimeout(check, 100);\n      };\n      return check();\n    };\n\n    return FullscreenButton;\n\n  })(ActionButton);\n\n  ViewerButton = (function(_super) {\n\n    __extends(ViewerButton, _super);\n\n    function ViewerButton(core) {\n      var callback,\n        _this = this;\n      callback = function(e) {\n        return _this.core.viewer().toggle();\n      };\n      ViewerButton.__super__.constructor.call(this, core, 'viewer', 'Quick view', 'Quick view', callback, 'Ctrl+Q');\n    }\n\n    ViewerButton.prototype.validate = function() {\n      if (!(this.core.viewer() != null)) {\n        this.disable();\n        return false;\n      }\n      return true;\n    };\n\n    ViewerButton.prototype.init = function() {\n      var check,\n        _this = this;\n      if (!this.validate()) {\n        return;\n      }\n      check = function() {\n        if (_this.core.viewer().element.is(':visible')) {\n          _this.element.addClass('hide');\n        } else {\n          _this.element.removeClass('hide');\n        }\n        return setTimeout(check, 100);\n      };\n      return check();\n    };\n\n    return ViewerButton;\n\n  })(ActionButton);\n\n  HelperButton = (function(_super) {\n\n    __extends(HelperButton, _super);\n\n    function HelperButton(core) {\n      var callback,\n        _this = this;\n      callback = function(e) {\n        return _this.core.helper().toggle();\n      };\n      HelperButton.__super__.constructor.call(this, core, 'helper', 'Help', 'Help', callback, 'Ctrl+H');\n    }\n\n    HelperButton.prototype.validate = function() {\n      if (!this.core.helper()) {\n        this.disable();\n        return false;\n      }\n      return true;\n    };\n\n    HelperButton.prototype.init = function() {\n      var check,\n        _this = this;\n      if (!this.validate()) {\n        return;\n      }\n      check = function() {\n        if (_this.core.helper().element.is(':visible')) {\n          _this.element.addClass('hide');\n        } else {\n          _this.element.removeClass('hide');\n        }\n        return setTimeout(check, 100);\n      };\n      return check();\n    };\n\n    return HelperButton;\n\n  })(ActionButton);\n\n  buttonFactory = function(core, value) {\n    if (value instanceof Array) {\n      return CommandButton.factory(core, value);\n    }\n    if (typeof value === 'string') {\n      switch (value) {\n        case 'Separator':\n          return new Separator(core);\n        case 'Undo':\n          return new UndoButton(core);\n        case 'Redo':\n          return new RedoButton(core);\n        case 'Fullscreen':\n          return new FullscreenButton(core);\n        case 'Viewer':\n          return new ViewerButton(core);\n        case 'Helper':\n          return new HelperButton(core);\n        default:\n          throw new Exception(\"\" + value + \" is not known Button type\");\n      }\n    }\n    return new value(core);\n  };\n\n  namespace('Jencil.buttons', function(exports) {\n    exports.Separator = Separator;\n    exports.Button = Button;\n    exports.ActionButton = ActionButton;\n    exports.CommandButton = CommandButton;\n    exports.UndoButton = UndoButton;\n    exports.RedoButton = RedoButton;\n    exports.FullscreenButton = FullscreenButton;\n    exports.ViewerButton = ViewerButton;\n    exports.HelperButton = HelperButton;\n    return exports.buttonFactory = buttonFactory;\n  });\n\n  Wrapper = (function(_super) {\n\n    __extends(Wrapper, _super);\n\n    function Wrapper(core, width, height) {\n      var _this = this;\n      Wrapper.__super__.constructor.call(this, core);\n      this.element.addClass('jencil wrapper');\n      this.element.width(width);\n      this.element.height(height);\n      this.workspace = new Workspace(this.core);\n      this.workspace.element.appendTo(this.element);\n      this.curtain = {\n        on: function() {\n          var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;\n          if ((_ref = _this.core.editor()) != null) {\n            if ((_ref1 = _ref.curtain) != null) {\n              _ref1.on();\n            }\n          }\n          if ((_ref2 = _this.core.viewer()) != null) {\n            if ((_ref3 = _ref2.curtain) != null) {\n              _ref3.on();\n            }\n          }\n          if ((_ref4 = _this.core.helper()) != null) {\n            if ((_ref5 = _ref4.curtain) != null) {\n              _ref5.on();\n            }\n          }\n          return _this.adjust();\n        },\n        refresh: function() {\n          var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;\n          if ((_ref = _this.core.editor()) != null) {\n            if ((_ref1 = _ref.curtain) != null) {\n              _ref1.refresh();\n            }\n          }\n          if ((_ref2 = _this.core.viewer()) != null) {\n            if ((_ref3 = _ref2.curtain) != null) {\n              _ref3.refresh();\n            }\n          }\n          if ((_ref4 = _this.core.helper()) != null) {\n            if ((_ref5 = _ref4.curtain) != null) {\n              _ref5.refresh();\n            }\n          }\n          return _this.adjust();\n        },\n        off: function() {\n          var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;\n          if ((_ref = _this.core.editor()) != null) {\n            if ((_ref1 = _ref.curtain) != null) {\n              _ref1.off();\n            }\n          }\n          if ((_ref2 = _this.core.viewer()) != null) {\n            if ((_ref3 = _ref2.curtain) != null) {\n              _ref3.off();\n            }\n          }\n          if ((_ref4 = _this.core.helper()) != null) {\n            if ((_ref5 = _ref4.curtain) != null) {\n              _ref5.off();\n            }\n          }\n          return _this.adjust();\n        }\n      };\n    }\n\n    Wrapper.prototype.init = function(profileNameOrInstance) {\n      var _this = this;\n      if ((this.element.resizable != null) && this.core.options.resizable === true) {\n        this.element.resizable({\n          start: function() {\n            return _this.curtain.on();\n          },\n          resize: function() {\n            return _this.curtain.refresh();\n          },\n          stop: function() {\n            return _this.curtain.off();\n          }\n        });\n      }\n      this.workspace.profile(profileNameOrInstance);\n      this.workspace.init();\n      return this;\n    };\n\n    Wrapper.prototype.adjust = function() {\n      this.workspace.element.outerWidth(true, this.element.width());\n      this.workspace.element.outerHeight(true, this.element.height());\n      this.workspace.adjust();\n      return this;\n    };\n\n    return Wrapper;\n\n  })(Panel);\n\n  Workspace = (function(_super) {\n\n    __extends(Workspace, _super);\n\n    function Workspace(core) {\n      Workspace.__super__.constructor.call(this, core);\n      this.element.addClass('workspace');\n    }\n\n    Workspace.prototype.profile = function(profileNameOrInstance) {\n      var button, profile, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3,\n        _this = this;\n      if (profileNameOrInstance != null) {\n        if (typeof profileNameOrInstance === 'string') {\n          profileNameOrInstance = this.core.options.profiles[profileNameOrInstance];\n        }\n        profile = jQuery.extend(true, DefaultProfile, profileNameOrInstance);\n        profile.defaultVolume = this.core.options.defaultVolume || profile.defaultVolume;\n        profile.defaultVolume2 = this.core.options.defaultVolume2 || profile.defaultVolume2;\n        this.element.empty();\n        this.mainPanel = new profile.mainPanelClass(this.core, profile);\n        if ((_ref = this.mainPanel.editorPanel) != null) {\n          _ref.val(this.core.element.val());\n        }\n        if ((_ref1 = this.mainPanel.editorPanel) != null) {\n          _ref1.change(function(value) {\n            return _this.core.element.val(value);\n          });\n        }\n        this.toolbar = new Toolbar(this.core);\n        _ref2 = profile.toolbarButtons;\n        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {\n          button = _ref2[_i];\n          button = buttonFactory(this.core, button);\n          this.toolbar.addButton(button);\n        }\n        this.statusbar = new Statusbar(this.core);\n        _ref3 = profile.statusbarButtons;\n        for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {\n          button = _ref3[_j];\n          button = buttonFactory(this.core, button);\n          this.statusbar.addButton(button);\n        }\n        this.element.append(this.toolbar.element);\n        this.element.append(this.mainPanel.element);\n        this.element.append(this.statusbar.element);\n        this._profile = profile;\n        return this;\n      }\n      return this._profile;\n    };\n\n    Workspace.prototype.init = function() {\n      this.toolbar.init();\n      this.statusbar.init();\n      return this.mainPanel.init();\n    };\n\n    Workspace.prototype.adjust = function() {\n      var offset1, offset2;\n      this.toolbar.element.outerWidth(true, this.element.width());\n      this.statusbar.element.outerWidth(true, this.element.width());\n      this.mainPanel.element.outerWidth(true, this.element.width());\n      this.mainPanel.element.outerHeight(true, this.element.height());\n      this.mainPanel.adjust();\n      offset1 = this.toolbar.element.outerHeight(true);\n      offset2 = this.statusbar.element.outerHeight(true);\n      this.mainPanel.element.outerHeight(true, this.element.height() - (offset1 + offset2));\n      this.toolbar.adjust();\n      this.statusbar.adjust();\n      this.mainPanel.adjust();\n      return this;\n    };\n\n    Workspace.prototype.update = function(force) {\n      if (this.mainPanel.editorPanel && this.mainPanel.viewerPanel) {\n        return this.mainPanel.viewerPanel.update(this.mainPanel.editorPanel.val(), force);\n      }\n    };\n\n    return Workspace;\n\n  })(Panel);\n\n  Bar = (function(_super) {\n\n    __extends(Bar, _super);\n\n    function Bar(core) {\n      Bar.__super__.constructor.call(this, core);\n      this._buttons = [];\n    }\n\n    Bar.prototype.init = function() {\n      var button, _i, _len, _ref;\n      _ref = this._buttons;\n      for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n        button = _ref[_i];\n        button.init();\n      }\n      return this;\n    };\n\n    Bar.prototype.addButton = function(button) {\n      this._buttons.push(button);\n      return this.element.append(button.element);\n    };\n\n    return Bar;\n\n  })(Panel);\n\n  Toolbar = (function(_super) {\n\n    __extends(Toolbar, _super);\n\n    function Toolbar(core) {\n      Toolbar.__super__.constructor.call(this, core);\n      this.element.addClass('toolbar');\n    }\n\n    return Toolbar;\n\n  })(Bar);\n\n  Statusbar = (function(_super) {\n\n    __extends(Statusbar, _super);\n\n    function Statusbar(core) {\n      Statusbar.__super__.constructor.call(this, core);\n      this.element.addClass('statusbar');\n    }\n\n    return Statusbar;\n\n  })(Bar);\n\n  namespace('Jencil.workspace', function(exports) {\n    exports.Wrapper = Wrapper;\n    exports.Workspace = Workspace;\n    exports.Bar = Bar;\n    exports.Toolbar = Toolbar;\n    return exports.Statusbar = Statusbar;\n  });\n\n  MultiPanel = (function(_super) {\n\n    __extends(MultiPanel, _super);\n\n    function MultiPanel(core, fst, snd, splitter) {\n      var hide, show,\n        _this = this;\n      this.fst = fst;\n      this.snd = snd;\n      this.splitter = splitter;\n      MultiPanel.__super__.constructor.call(this, core);\n      this.element.addClass('multi');\n      this.element.append(this.fst.element);\n      this.element.append(this.splitter.element);\n      this.element.append(this.snd.element);\n      show = function(callback) {\n        if (!this.element.is(':visible')) {\n          return this.toggle(callback, null);\n        }\n      };\n      hide = function(callback) {\n        if (this.element.is(':visible')) {\n          return this.toggle(null, callback);\n        }\n      };\n      this.fst.toggle = function(callbackOn, callbackOff) {\n        return _this._togglePanel(0, callbackOn, callbackOff);\n      };\n      this.fst.show = show;\n      this.fst.hide = hide;\n      this.snd.toggle = function(callbackOn, callbackOff) {\n        return _this._togglePanel(1, callbackOn, callbackOff);\n      };\n      this.snd.show = show;\n      this.snd.hide = hide;\n      this.splitter.element.dblclick(function() {\n        return _this.snd.toggle();\n      });\n    }\n\n    MultiPanel.prototype.init = function() {\n      this.splitter.init();\n      this.fst.init();\n      return this.snd.init();\n    };\n\n    MultiPanel.prototype._togglePanel = function(to, callbackOn, callbackOff) {\n      var callbackDone, end, volume, _callbackDone,\n        _this = this;\n      if (MultiPanel._animating) {\n        return;\n      }\n      volume = this.splitter.volume();\n      callbackDone = null;\n      if ((0 < volume && volume < 1)) {\n        end = to;\n        this.splitter._previousVolume = volume;\n        _callbackDone = callbackOff;\n      } else {\n        end = this.splitter._previousVolume || this.splitter.defaultVolume;\n        if (end === to) {\n          end = 0.5;\n        }\n        _callbackDone = callbackOn;\n      }\n      MultiPanel._animating = true;\n      callbackDone = function() {\n        MultiPanel._animating = false;\n        return typeof _callbackDone === \"function\" ? _callbackDone() : void 0;\n      };\n      return animate({\n        start: volume,\n        end: end,\n        duration: 500,\n        callbackEach: function(value, epoch) {\n          return _this.splitter.volume(value);\n        },\n        callbackDone: callbackDone\n      });\n    };\n\n    return MultiPanel;\n\n  })(Panel);\n\n  VerticalPanel = (function(_super) {\n\n    __extends(VerticalPanel, _super);\n\n    function VerticalPanel(core, fst, snd, defaultVolume) {\n      var splitter;\n      if (defaultVolume == null) {\n        defaultVolume = 0.5;\n      }\n      splitter = new VerticalSplitter(core, fst, snd, defaultVolume);\n      VerticalPanel.__super__.constructor.call(this, core, fst, snd, splitter);\n      this.element.addClass('vertical');\n    }\n\n    VerticalPanel.prototype.adjust = function() {\n      this.fst.element.outerHeight(true, this.element.height());\n      this.snd.element.outerHeight(true, this.element.height());\n      this.splitter.element.outerHeight(true, this.element.height());\n      this.splitter.adjust();\n      return this;\n    };\n\n    return VerticalPanel;\n\n  })(MultiPanel);\n\n  HorizontalPanel = (function(_super) {\n\n    __extends(HorizontalPanel, _super);\n\n    function HorizontalPanel(core, fst, snd, defaultVolume) {\n      var splitter;\n      if (defaultVolume == null) {\n        defaultVolume = 0.5;\n      }\n      splitter = new HorizontalSplitter(core, fst, snd, defaultVolume);\n      HorizontalPanel.__super__.constructor.call(this, core, fst, snd, splitter);\n      this.element.addClass('horizontal');\n    }\n\n    HorizontalPanel.prototype.adjust = function() {\n      this.fst.element.outerWidth(true, this.element.width());\n      this.snd.element.outerWidth(true, this.element.width());\n      this.splitter.element.outerWidth(true, this.element.width());\n      this.splitter.adjust();\n      return this;\n    };\n\n    return HorizontalPanel;\n\n  })(MultiPanel);\n\n  namespace('Jencil.multipanels', function(exports) {\n    exports.MultiPanel = MultiPanel;\n    exports.VerticalPanel = VerticalPanel;\n    return exports.HorizontalPanel = HorizontalPanel;\n  });\n\n  MonomainPanel = (function() {\n\n    function MonomainPanel(core, profile) {\n      var editorPanel;\n      editorPanel = new profile.editorClass(core);\n      editorPanel.element.addClass('mainPanel');\n      return editorPanel;\n    }\n\n    return MonomainPanel;\n\n  })();\n\n  DimainPanel = (function(_super) {\n\n    __extends(DimainPanel, _super);\n\n    function DimainPanel(core, profile) {\n      var _this = this;\n      this.editorPanel = new profile.editorClass(core);\n      this.viewerPanel = new profile.viewerClass(core);\n      DimainPanel.__super__.constructor.call(this, core, this.editorPanel, this.viewerPanel, profile.defaultVolume);\n      this.element.addClass('mainPanel');\n      this.editorPanel.change(function(value) {\n        return _this.viewerPanel.update(value);\n      });\n    }\n\n    DimainPanel.prototype.init = function() {\n      DimainPanel.__super__.init.call(this);\n      return this.viewerPanel.update(this.editorPanel.val());\n    };\n\n    return DimainPanel;\n\n  })(VerticalPanel);\n\n  TrimainPanel = (function(_super) {\n\n    __extends(TrimainPanel, _super);\n\n    function TrimainPanel(core, profile) {\n      var _this = this;\n      this.editorPanel = new profile.editorClass(core);\n      this.viewerPanel = new profile.viewerClass(core);\n      this.helperPanel = new profile.helperClass(core);\n      this.verticalPanel = new VerticalPanel(core, this.editorPanel, this.viewerPanel, profile.defaultVolume);\n      TrimainPanel.__super__.constructor.call(this, core, this.verticalPanel, this.helperPanel, profile.defaultVolume2);\n      this.element.addClass('mainPanel');\n      this.editorPanel.change(function(value) {\n        return _this.viewerPanel.update(value);\n      });\n    }\n\n    TrimainPanel.prototype.init = function() {\n      TrimainPanel.__super__.init.call(this);\n      return this.viewerPanel.update(this.editorPanel.val());\n    };\n\n    return TrimainPanel;\n\n  })(HorizontalPanel);\n\n  namespace('Jencil.mainpanels', function(exports) {\n    exports.MonomainPanel = MonomainPanel;\n    exports.DimainPanel = DimainPanel;\n    return exports.TrimainPanel = TrimainPanel;\n  });\n\n  Fullscreen = (function(_super) {\n\n    __extends(Fullscreen, _super);\n\n    function Fullscreen(core) {\n      var _this = this;\n      Fullscreen.__super__.constructor.call(this, core);\n      this.element.addClass('fullscreen');\n      this.element.css({\n        'position': 'fixed',\n        'top': '0',\n        'left': '0',\n        'width': '100%',\n        'height': '100%',\n        'z-index': 100\n      });\n      this.curtain = $('<div>').addClass('curtain');\n      this.curtain.css({\n        'position': 'absolute',\n        'top': '0',\n        'left': '0',\n        'width': '100%',\n        'height': '100%',\n        'background': 'black',\n        'opacity': '0.6',\n        'cursor': 'pointer'\n      });\n      this.cell = $('<div>').css({\n        'position': 'absolute',\n        'top': '5%',\n        'left': '5%',\n        'width': '90%',\n        'height': '90%'\n      });\n      if ($.browser.msie && $.browser.version < 7) {\n        this.element.css('position', 'absolute');\n        $(window).scroll(function() {\n          return _this.element.css('top', $(document).scrollTop());\n        });\n      }\n      this.curtain.click(function() {\n        return _this.off();\n      });\n      this.element.append(this.curtain);\n      this.element.append(this.cell);\n      this.element.hide();\n      this.resize = function() {\n        return _this.core.wrapper.adjust();\n      };\n    }\n\n    Fullscreen.prototype.on = function() {\n      var ratio,\n        _this = this;\n      ratio = 9.0 / 10;\n      this.cell.append(this.core.wrapper.element);\n      this.core.wrapper.element.outerWidth(true, this.element.width() * ratio);\n      this.core.wrapper.element.outerHeight(true, this.element.height() * ratio);\n      this.core.wrapper.init();\n      this.core.wrapper.adjust();\n      this.core.wrapper.workspace.update(true);\n      this.element.fadeIn('fast', function() {\n        _this.core.wrapper.element.css('width', \"100%\");\n        _this.core.wrapper.element.css('height', \"100%\");\n        return _this.core.wrapper.adjust();\n      });\n      return $(window).on('resize', this.resize);\n    };\n\n    Fullscreen.prototype.off = function() {\n      this.core.element.after(this.core.wrapper.element);\n      this.core.wrapper.element.css('width', \"\");\n      this.core.wrapper.element.css('height', \"\");\n      this.core.wrapper.init();\n      this.core.wrapper.adjust();\n      this.core.wrapper.workspace.update(true);\n      this.element.fadeOut('fast');\n      return $(window).unbind('resize', this.resize);\n    };\n\n    Fullscreen.prototype.toggle = function(callbackOn, callbackOff) {\n      if (this.element.is(':visible')) {\n        this.off();\n        return typeof callbackOff === \"function\" ? callbackOff() : void 0;\n      } else {\n        this.on();\n        return typeof callbackOn === \"function\" ? callbackOn() : void 0;\n      }\n    };\n\n    return Fullscreen;\n\n  })(Panel);\n\n  autoIndentableHtml = (function() {\n    var PATTERNS, post, pre, x;\n    PATTERNS = (function() {\n      var _i, _len, _ref, _results;\n      _ref = ['p', 'li'];\n      _results = [];\n      for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n        x = _ref[_i];\n        _results.push([x, new RegExp(\"^[\\s\\t]*<\" + x + \">\"), new RegExp(\"</\" + x + \">[\\s\\t]*$\")]);\n      }\n      return _results;\n    })();\n    pre = function(e, line) {\n      var lineCaret, pattern, _i, _len;\n      if (e.shiftKey) {\n        return;\n      }\n      for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {\n        pattern = PATTERNS[_i];\n        if (pattern[1].test(line) || pattern[2].test(line)) {\n          lineCaret = this.selection._getLineCaret();\n          this.selection.caret(lineCaret[1]);\n          return;\n        }\n      }\n    };\n    post = function(e, line, indent, insert) {\n      var pattern, _i, _len;\n      if (e.shiftKey) {\n        return;\n      }\n      for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {\n        pattern = PATTERNS[_i];\n        if (pattern[2].test(line)) {\n          x = pattern[0];\n          this.selection.insertAfter(\"<\" + x + \"></\" + x + \">\", false);\n          this.selection.caretOffset(-(3 + x.length));\n          return;\n        }\n      }\n    };\n    return function(textarea) {\n      if (!(textarea.autoIndent != null)) {\n        textarea = autoIndentable(textarea);\n      }\n      textarea.autoIndent.pre = function(e, line) {\n        return pre.call(textarea, e, line);\n      };\n      textarea.autoIndent.post = function(e, line, indent, insert) {\n        return post.call(textarea, e, line, indent, insert);\n      };\n      return textarea;\n    };\n  })();\n\n  headerMarkup = (function() {\n    var PATTERN;\n    PATTERN = new RegExp(\"^<h([1-6])>(.*)</h[1-6]>\\n?$\");\n    return function(n) {\n      var caret, replacement, text;\n      caret = this.textarea.selection.caret();\n      if (caret[0] === caret[1]) {\n        this.textarea.selection.selectWholeCurrentLine();\n      }\n      text = this.selection();\n      if (PATTERN.test(text)) {\n        if (RegExp.$1 === n.toString()) {\n          replacement = RegExp.$2;\n        } else {\n          replacement = \"<h\" + n + \">\" + RegExp.$2 + \"</h\" + n + \">\";\n        }\n        return this.selection(replacement);\n      } else {\n        return this.enclose(\"<h\" + n + \">\", \"</h\" + n + \">\\n\");\n      }\n    };\n  })();\n\n  HtmlEditor = (function(_super) {\n\n    __extends(HtmlEditor, _super);\n\n    function HtmlEditor(core) {\n      HtmlEditor.__super__.constructor.call(this, core);\n      this.textarea = autoIndentableHtml(this.textarea);\n    }\n\n    HtmlEditor.prototype.h1 = function() {\n      return headerMarkup.call(this, 1);\n    };\n\n    HtmlEditor.prototype.h2 = function() {\n      return headerMarkup.call(this, 2);\n    };\n\n    HtmlEditor.prototype.h3 = function() {\n      return headerMarkup.call(this, 3);\n    };\n\n    HtmlEditor.prototype.h4 = function() {\n      return headerMarkup.call(this, 4);\n    };\n\n    HtmlEditor.prototype.h5 = function() {\n      return headerMarkup.call(this, 5);\n    };\n\n    HtmlEditor.prototype.h6 = function() {\n      return headerMarkup.call(this, 6);\n    };\n\n    HtmlEditor.prototype.bold = function() {\n      return this.enclose(\"<b>\", \"</b>\");\n    };\n\n    HtmlEditor.prototype.italic = function() {\n      return this.enclose(\"<i>\", \"</i>\");\n    };\n\n    HtmlEditor.prototype.underline = function() {\n      return this.enclose(\"<u>\", \"</u>\");\n    };\n\n    HtmlEditor.prototype.strike = function() {\n      return this.enclose(\"<s>\", \"</s>\");\n    };\n\n    HtmlEditor.prototype.superscript = function() {\n      return this.enclose(\"<sup>\", \"</sup>\");\n    };\n\n    HtmlEditor.prototype.subscript = function() {\n      return this.enclose(\"<sub>\", \"</sub>\");\n    };\n\n    HtmlEditor.prototype.quote = function() {\n      return this.enclose(\"<q>\", \"</q>\");\n    };\n\n    HtmlEditor.prototype.blockquote = function() {\n      return this.enclose(\"\\n<blockquote>\", \"</blockquote>\\n\");\n    };\n\n    HtmlEditor.prototype.code = function() {\n      return this.enclose(\"<code>\", \"</code>\");\n    };\n\n    HtmlEditor.prototype.pre = function() {\n      return this.enclose(\"<pre>\", \"</pre>\");\n    };\n\n    HtmlEditor.prototype.anchorLink = function() {\n      var href, text;\n      text = this.selection();\n      if (!text) {\n        text = window.prompt(\"Please input a link text\", \"Here\");\n      }\n      href = window.prompt(\"Please input a link url\", \"http://\");\n      if (!(href != null)) {\n        return;\n      }\n      return this.selection(\"<a href='\" + href + \"'>\" + text + \"</a>\");\n    };\n\n    HtmlEditor.prototype.image = function() {\n      var alt, src;\n      src = window.prompt(\"Please input a image url\", \"http://\");\n      alt = window.prompt(\"(Optional) Please input a alt message\", \"Image\");\n      if (!(src != null)) {\n        return;\n      }\n      return this.selection(\"<img src='\" + src + \"' alt='\" + alt + \"'>\");\n    };\n\n    HtmlEditor.prototype.unorderedList = function() {\n      var text, x;\n      text = this.selection();\n      text = (function() {\n        var _i, _len, _ref, _results;\n        _ref = text.split(\"\\n\");\n        _results = [];\n        for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n          x = _ref[_i];\n          _results.push(\"  <li>\" + x + \"</li>\");\n        }\n        return _results;\n      })();\n      text.unshift(\"<ul>\");\n      text.push(\"</ul>\");\n      return this.selection(text.join(\"\\n\"));\n    };\n\n    HtmlEditor.prototype.orderedList = function() {\n      var text, x;\n      text = this.selection();\n      text = (function() {\n        var _i, _len, _ref, _results;\n        _ref = text.split(\"\\n\");\n        _results = [];\n        for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n          x = _ref[_i];\n          _results.push(\"  <li>\" + x + \"</li>\");\n        }\n        return _results;\n      })();\n      text.unshift(\"<ol>\");\n      text.push(\"</ol>\");\n      return this.selection(text.join(\"\\n\"));\n    };\n\n    return HtmlEditor;\n\n  })(TextEditor);\n\n  HtmlViewer = TemplateViewer;\n\n  HtmlHelper = (function(_super) {\n\n    __extends(HtmlHelper, _super);\n\n    function HtmlHelper(core) {\n      var HTML_HELPER_HTML;\n      HtmlHelper.__super__.constructor.call(this, core);\n      HTML_HELPER_HTML = \"<p><span class=\\\"key\\\">Ctrl+Z</span>\" + (Jencil.t(\"Undo\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+Shift+Z</span>\" + (Jencil.t(\"Redo\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+B</span>\" + (Jencil.t(\"Make selected text property as <b>Bold</b>\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+I</span>\" + (Jencil.t(\"Make selected text property as <i>Italic</i>\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+U</span>\" + (Jencil.t(\"Underline selected text like <u>Underline</u>\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+F</span>\" + (Jencil.t(\"Toggle fullscreen mode\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+Q</span>\" + (Jencil.t(\"Toggle quick view\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+H</span>\" + (Jencil.t(\"Toggle help\")) + \"<p>\";\n      this.element.html(HTML_HELPER_HTML);\n    }\n\n    return HtmlHelper;\n\n  })(BaseHelper);\n\n  HtmlProfile = {\n    mainPanelClass: TrimainPanel,\n    editorClass: HtmlEditor,\n    viewerClass: HtmlViewer,\n    helperClass: HtmlHelper,\n    defaultVolume: 1,\n    defaultVolume2: 0.7,\n    toolbarButtons: ['Undo', 'Redo', 'Separator', ['h1', 'H1'], ['h2', 'H2'], ['h3', 'H3'], ['h4', 'H4'], ['h5', 'H5'], ['h6', 'H6'], 'Separator', ['bold', 'Bold', 'Ctrl+B'], ['italic', 'Italic', 'Ctrl+I'], ['underline', 'Underline', 'Ctrl+U'], ['strike', 'Strikeout'], ['superscript', 'Superscript'], ['subscript', 'Subscript'], 'Separator', ['anchorLink', 'Anchor link'], ['image', 'Image'], ['unorderedList', 'Unordered list'], ['orderedList', 'Ordered list'], ['quote', 'Quote'], ['blockquote', 'Blockquote'], ['code', 'Code'], ['pre', 'Pre'], 'Separator', 'Fullscreen'],\n    statusbarButtons: ['Viewer', 'Helper']\n  };\n\n  namespace('Jencil.profiles', function(exports) {\n    return exports.HtmlProfile = HtmlProfile;\n  });\n\n  headerMarkup = (function() {\n    var appendAtxHeader, atxHeaderPattern, changeAtxHeader, removeAtxHeader, toggleAtxHeader;\n    atxHeaderPattern = new RegExp('^\\s*(#{1,6}\\s*).*');\n    appendAtxHeader = function(segment, n) {\n      var header;\n      header = \"#\".repeat(n);\n      return \"\" + header + \" \" + segment;\n    };\n    removeAtxHeader = function(segment) {\n      return segment.replace(/^(\\s*)#{1,6}\\s*/g, '$1');\n    };\n    changeAtxHeader = function(segment, n) {\n      var header;\n      header = \"#\".repeat(n);\n      return segment.replace(/^(\\s*)#{1,6}\\s*/g, \"$1\" + header + \" \");\n    };\n    toggleAtxHeader = function(textarea, n) {\n      var caret, caretOffset, exists, replacement, segment, text;\n      text = textarea.val();\n      caret = textarea.selection.caret();\n      segment = textarea.selection.text();\n      caretOffset = 0;\n      if (atxHeaderPattern.test(segment)) {\n        exists = RegExp.$1.trim();\n        if (exists.length === n) {\n          replacement = removeAtxHeader(segment);\n        } else {\n          replacement = changeAtxHeader(segment, n);\n        }\n      } else {\n        replacement = appendAtxHeader(segment, n);\n        if (caret[0] > 0 && text[caret[0] - 1] !== \"\\n\") {\n          replacement = \"\\n\" + replacement;\n        }\n        if (caret[1] < text.length && text[caret[1]] !== \"\\n\") {\n          replacement = \"\" + replacement + \"\\n\";\n          caretOffset = -1;\n        }\n      }\n      textarea.selection.text(replacement);\n      if (caretOffset !== 0) {\n        return textarea.selection.caretOffset(caretOffset);\n      }\n    };\n    return function(n) {\n      this.selectWholeLineIfNoSelectionFound();\n      return toggleAtxHeader(this.textarea, n);\n    };\n  })();\n\n  autoIndentableMarkdown = (function() {\n    var findListInfo, listPattern, orderedListPattern, post, pre, unorderedListPattern;\n    listPattern = /^(\\s*)((?:(?:\\d+\\.)|(?:[\\*\\+\\->])))(\\s+)/;\n    orderedListPattern = /^(\\s*)(\\d+)(\\.\\s+)/;\n    unorderedListPattern = /^(\\s*)([\\*\\+\\->])(\\s+)/;\n    findListInfo = function(line) {\n      var leading, mark, spaces, type;\n      if (listPattern.test(line)) {\n        leading = RegExp.$1;\n        mark = RegExp.$2;\n        spaces = RegExp.$3;\n        type = mark.endsWith(\".\") ? 1 : 2;\n      } else if (this._listInfo) {\n        return this._listInfo;\n      } else {\n        type = 0;\n      }\n      return {\n        type: type,\n        leading: leading,\n        mark: mark,\n        spaces: spaces\n      };\n    };\n    pre = function(e, line) {\n      var lineCaret, listInfo, _ref, _ref1;\n      if (e.shiftKey) {\n        return;\n      }\n      listInfo = findListInfo.call(this, line);\n      if ((_ref = listInfo.type) === 3 || _ref === 4) {\n        return true;\n      }\n      if ((_ref1 = listInfo.type) === 1 || _ref1 === 2) {\n        if (line.replace(listPattern, '').length === 0) {\n          this.selection.line(line.replace(listPattern, '$1'));\n          this._listInfo = null;\n          return true;\n        }\n        lineCaret = this.selection.lineCaret();\n        return this.selection.caret(lineCaret[1]);\n      }\n    };\n    post = function(e, line, indent, insert, cancel) {\n      var leading, listInfo, num, _ref, _ref1, _ref2, _ref3;\n      insert = null;\n      listInfo = findListInfo.call(this, line);\n      if (cancel && !e.shiftKey && ((_ref = listInfo.type) === 3 || _ref === 4)) {\n        leading = listInfo.mark + listInfo.spaces;\n        indent = line.replace(/^([\\t\\s]*).*$/, \"$1\");\n        indent = \" \".repeat(indent.length - leading.length);\n        insert = \"\\n\" + indent;\n        if (insert != null) {\n          this.selection.insertAfter(insert, false);\n        }\n        cancel = false;\n      }\n      if (cancel) {\n        return;\n      }\n      if (e.shiftKey) {\n        if ((_ref1 = listInfo.type) === 1 || _ref1 === 2) {\n          leading = listInfo.mark + listInfo.spaces;\n          insert = \" \".repeat(leading.length);\n          this._listInfo = listInfo;\n          this._listInfo.type += 2;\n        }\n      } else if ((_ref2 = listInfo.type) === 1 || _ref2 === 3) {\n        num = parseInt(listInfo.mark.replace(\".\", \"\"));\n        insert = \"\" + (num + 1) + \".\" + listInfo.spaces;\n      } else if ((_ref3 = listInfo.type) === 2 || _ref3 === 4) {\n        insert = \"\" + listInfo.mark + listInfo.spaces;\n      }\n      if (insert != null) {\n        return this.selection.insertAfter(insert, false);\n      }\n    };\n    return function(textarea) {\n      if (!(textarea.autoIndent != null)) {\n        textarea = autoIndentable(textarea);\n      }\n      textarea.autoIndent.pre = function(e, line) {\n        return pre.call(textarea, e, line);\n      };\n      textarea.autoIndent.post = function(e, line, indent, insert, cancel) {\n        return post.call(textarea, e, line, indent, insert, cancel);\n      };\n      return textarea;\n    };\n  })();\n\n  MarkdownEditor = (function(_super) {\n\n    __extends(MarkdownEditor, _super);\n\n    function MarkdownEditor(core) {\n      MarkdownEditor.__super__.constructor.call(this, core);\n      this.textarea = autoIndentableMarkdown(this.textarea);\n    }\n\n    MarkdownEditor.prototype.selectWholeLineIfNoSelectionFound = function() {\n      var caret, line, lineCaret;\n      caret = this.textarea.selection.caret();\n      if (caret[0] === caret[1]) {\n        lineCaret = this.textarea.selection.lineCaret();\n        line = this.textarea.selection.line();\n        if (/^(\\s*[\\*\\+\\-]\\s*|^\\s*\\d+\\.\\s*|^\\s*>\\s*)/g.test(line)) {\n          lineCaret[0] += RegExp.$1.length;\n        }\n        this.textarea.selection.caret(lineCaret);\n      }\n    };\n\n    MarkdownEditor.prototype.h1 = function() {\n      return headerMarkup.call(this, 1);\n    };\n\n    MarkdownEditor.prototype.h2 = function() {\n      return headerMarkup.call(this, 2);\n    };\n\n    MarkdownEditor.prototype.h3 = function() {\n      return headerMarkup.call(this, 3);\n    };\n\n    MarkdownEditor.prototype.h4 = function() {\n      return headerMarkup.call(this, 4);\n    };\n\n    MarkdownEditor.prototype.h5 = function() {\n      return headerMarkup.call(this, 5);\n    };\n\n    MarkdownEditor.prototype.h6 = function() {\n      return headerMarkup.call(this, 6);\n    };\n\n    MarkdownEditor.prototype.bold = function() {\n      return this.enclose(\"**\", \"**\");\n    };\n\n    MarkdownEditor.prototype.italic = function() {\n      return this.enclose(\"*\", \"*\");\n    };\n\n    MarkdownEditor.prototype.blockquote = (function() {\n      var match, pattern1, pattern2;\n      pattern1 = /^(\\s*)>\\s*([^\\n]*)$/m;\n      pattern2 = /^(\\s*)([^\\n]*)$/m;\n      match = function(lines) {\n        var line, _i, _len;\n        for (_i = 0, _len = lines.length; _i < _len; _i++) {\n          line = lines[_i];\n          if (line.length === 0) {\n            continue;\n          }\n          if (!pattern1.test(line)) {\n            return false;\n          }\n        }\n        return true;\n      };\n      return function() {\n        var i, line, lines, _i, _j, _ref, _ref1;\n        lines = this.selection().split(\"\\n\");\n        if (match(lines)) {\n          for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {\n            line = lines[i];\n            lines[i] = line.replace(pattern1, \"$1$2\");\n          }\n        } else {\n          for (i = _j = 0, _ref1 = lines.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {\n            line = lines[i];\n            lines[i] = line.replace(pattern2, \"$1> $2\");\n          }\n        }\n        return this.selection(lines.join(\"\\n\"));\n      };\n    })();\n\n    MarkdownEditor.prototype.code = function() {\n      var caret, lines, text, x;\n      lines = this.selection().split(\"\\n\");\n      caret = this.textarea.selection.caret();\n      if (lines.length > 1) {\n        text = (function() {\n          var _i, _len, _results;\n          _results = [];\n          for (_i = 0, _len = lines.length; _i < _len; _i++) {\n            x = lines[_i];\n            _results.push(\"\\t\" + x);\n          }\n          return _results;\n        })();\n        return this.selection(text.join(\"\\n\"));\n      } else {\n        return this.enclose(\"`\", \"`\");\n      }\n    };\n\n    MarkdownEditor.prototype.anchorLink = function() {\n      var href, text;\n      text = this.selection();\n      if (!text) {\n        text = window.prompt(\"Please input a link text\", \"Here\");\n      }\n      href = window.prompt(\"Please input a link url\", \"http://\");\n      if (!(href != null)) {\n        return;\n      }\n      return this.selection(\"[\" + text + \"](\" + href + \")\");\n    };\n\n    MarkdownEditor.prototype.image = function() {\n      var alt, src;\n      src = window.prompt(\"Please input a image url\", \"http://\");\n      alt = window.prompt(\"(Optional) Please input a alt message\", \"Image\");\n      if (!(src != null)) {\n        return;\n      }\n      return this.selection(\"![\" + alt + \"](\" + src + \")\");\n    };\n\n    MarkdownEditor.prototype.unorderedList = (function() {\n      var match, pattern1, pattern2;\n      pattern1 = /^(\\s*)\\*\\s*([^\\n]*)$/m;\n      pattern2 = /^(\\s*)([^\\n]*)$/m;\n      match = function(lines) {\n        var line, _i, _len;\n        for (_i = 0, _len = lines.length; _i < _len; _i++) {\n          line = lines[_i];\n          if (line.length === 0) {\n            continue;\n          }\n          if (!pattern1.test(line)) {\n            return false;\n          }\n        }\n        return true;\n      };\n      return function() {\n        var i, line, lines, _i, _j, _ref, _ref1;\n        lines = this.selection().split(\"\\n\");\n        if (match(lines)) {\n          for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {\n            line = lines[i];\n            lines[i] = line.replace(pattern1, \"$1$2\");\n          }\n        } else {\n          for (i = _j = 0, _ref1 = lines.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {\n            line = lines[i];\n            lines[i] = line.replace(pattern2, \"$1* $2\");\n          }\n        }\n        return this.selection(lines.join(\"\\n\"));\n      };\n    })();\n\n    MarkdownEditor.prototype.orderedList = (function() {\n      var match, pattern1, pattern2;\n      pattern1 = /^(\\s*)\\d+\\.\\s*([^\\n]*)$/m;\n      pattern2 = /^(\\s*)([^\\n]*)$/m;\n      match = function(lines) {\n        var line, _i, _len;\n        for (_i = 0, _len = lines.length; _i < _len; _i++) {\n          line = lines[_i];\n          if (line.length === 0) {\n            continue;\n          }\n          if (!pattern1.test(line)) {\n            return false;\n          }\n        }\n        return true;\n      };\n      return function() {\n        var i, line, lines, _i, _j, _ref, _ref1;\n        lines = this.selection().split(\"\\n\");\n        if (match(lines)) {\n          for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {\n            line = lines[i];\n            lines[i] = line.replace(pattern1, \"$1$2\");\n          }\n        } else {\n          for (i = _j = 0, _ref1 = lines.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {\n            line = lines[i];\n            lines[i] = line.replace(pattern2, \"$1\" + (i + 1) + \". $2\");\n          }\n        }\n        return this.selection(lines.join(\"\\n\"));\n      };\n    })();\n\n    return MarkdownEditor;\n\n  })(TextEditor);\n\n  namespace('Jencil.types.markdown.editor.MarkdownEditor', function(exports) {\n    return exports.MarkdownEditor = MarkdownEditor;\n  });\n\n  MarkdownJsViewer = (function(_super) {\n\n    __extends(MarkdownJsViewer, _super);\n\n    function MarkdownJsViewer() {\n      return MarkdownJsViewer.__super__.constructor.apply(this, arguments);\n    }\n\n    MarkdownJsViewer.prototype.update = function(value, force) {\n      var html;\n      html = window.markdown.toHTML(value);\n      return MarkdownJsViewer.__super__.update.call(this, html, force);\n    };\n\n    return MarkdownJsViewer;\n\n  })(TemplateViewer);\n\n  MarkdownProfile = {\n    mainPanelClass: DimainPanel,\n    editorClass: MarkdownEditor,\n    viewerClass: MarkdownJsViewer,\n    defaultVolume: 1,\n    toolbarButtons: ['Undo', 'Redo', 'Separator', ['h1', 'H1'], ['h2', 'H2'], ['h3', 'H3'], ['h4', 'H4'], ['h5', 'H5'], ['h6', 'H6'], 'Separator', ['bold', 'Bold', 'Ctrl+B'], ['italic', 'Italic', 'Ctrl+I'], 'Separator', ['anchorLink', 'Anchor link'], ['image', 'Image'], ['unorderedList', 'Unordered list'], ['orderedList', 'Ordered list'], ['blockquote', 'Blockquote'], ['code', 'Code'], 'Separator', 'Fullscreen'],\n    statusbarButtons: ['Viewer']\n  };\n\n  namespace('Jencil.profiles', function(exports) {\n    return exports.MarkdownProfile = MarkdownProfile;\n  });\n\n}).call(this);\n");
__$coverInitRange("src/js/Jencil.js", "0:100038");
__$coverInitRange("src/js/Jencil.js", "16:1134");
__$coverInitRange("src/js/Jencil.js", "1139:1634");
__$coverInitRange("src/js/Jencil.js", "1639:1731");
__$coverInitRange("src/js/Jencil.js", "1736:1831");
__$coverInitRange("src/js/Jencil.js", "1836:2665");
__$coverInitRange("src/js/Jencil.js", "2670:2945");
__$coverInitRange("src/js/Jencil.js", "2950:2990");
__$coverInitRange("src/js/Jencil.js", "2995:3043");
__$coverInitRange("src/js/Jencil.js", "3048:3092");
__$coverInitRange("src/js/Jencil.js", "3097:3141");
__$coverInitRange("src/js/Jencil.js", "3146:3192");
__$coverInitRange("src/js/Jencil.js", "3197:3233");
__$coverInitRange("src/js/Jencil.js", "3238:3331");
__$coverInitRange("src/js/Jencil.js", "3336:3602");
__$coverInitRange("src/js/Jencil.js", "3607:3897");
__$coverInitRange("src/js/Jencil.js", "3902:5463");
__$coverInitRange("src/js/Jencil.js", "5468:5655");
__$coverInitRange("src/js/Jencil.js", "5660:12173");
__$coverInitRange("src/js/Jencil.js", "12272:17625");
__$coverInitRange("src/js/Jencil.js", "17630:18269");
__$coverInitRange("src/js/Jencil.js", "18554:19613");
__$coverInitRange("src/js/Jencil.js", "21038:22785");
__$coverInitRange("src/js/Jencil.js", "22790:22989");
__$coverInitRange("src/js/Jencil.js", "22994:23211");
__$coverInitRange("src/js/Jencil.js", "23216:24850");
__$coverInitRange("src/js/Jencil.js", "24855:25036");
__$coverInitRange("src/js/Jencil.js", "25041:25146");
__$coverInitRange("src/js/Jencil.js", "25151:25253");
__$coverInitRange("src/js/Jencil.js", "25258:25357");
__$coverInitRange("src/js/Jencil.js", "25362:25460");
__$coverInitRange("src/js/Jencil.js", "25465:25567");
__$coverInitRange("src/js/Jencil.js", "25572:25670");
__$coverInitRange("src/js/Jencil.js", "25675:25788");
__$coverInitRange("src/js/Jencil.js", "25793:25903");
__$coverInitRange("src/js/Jencil.js", "25908:26005");
__$coverInitRange("src/js/Jencil.js", "26010:26199");
__$coverInitRange("src/js/Jencil.js", "26204:26282");
__$coverInitRange("src/js/Jencil.js", "26287:26804");
__$coverInitRange("src/js/Jencil.js", "26809:27128");
__$coverInitRange("src/js/Jencil.js", "27133:29631");
__$coverInitRange("src/js/Jencil.js", "29636:30415");
__$coverInitRange("src/js/Jencil.js", "30420:31209");
__$coverInitRange("src/js/Jencil.js", "31214:31462");
__$coverInitRange("src/js/Jencil.js", "31467:34287");
__$coverInitRange("src/js/Jencil.js", "34292:37720");
__$coverInitRange("src/js/Jencil.js", "37725:41065");
__$coverInitRange("src/js/Jencil.js", "41070:41266");
__$coverInitRange("src/js/Jencil.js", "41271:42789");
__$coverInitRange("src/js/Jencil.js", "42794:46209");
__$coverInitRange("src/js/Jencil.js", "46214:46347");
__$coverInitRange("src/js/Jencil.js", "46352:46809");
__$coverInitRange("src/js/Jencil.js", "46814:49508");
__$coverInitRange("src/js/Jencil.js", "49513:50709");
__$coverInitRange("src/js/Jencil.js", "50714:50892");
__$coverInitRange("src/js/Jencil.js", "50897:51241");
__$coverInitRange("src/js/Jencil.js", "51246:53523");
__$coverInitRange("src/js/Jencil.js", "53528:53669");
__$coverInitRange("src/js/Jencil.js", "53674:53923");
__$coverInitRange("src/js/Jencil.js", "53928:54867");
__$coverInitRange("src/js/Jencil.js", "54872:55733");
__$coverInitRange("src/js/Jencil.js", "55738:57388");
__$coverInitRange("src/js/Jencil.js", "57393:58096");
__$coverInitRange("src/js/Jencil.js", "58101:58810");
__$coverInitRange("src/js/Jencil.js", "58815:59629");
__$coverInitRange("src/js/Jencil.js", "59634:60629");
__$coverInitRange("src/js/Jencil.js", "60634:61607");
__$coverInitRange("src/js/Jencil.js", "61612:62320");
__$coverInitRange("src/js/Jencil.js", "62325:62780");
__$coverInitRange("src/js/Jencil.js", "62785:65898");
__$coverInitRange("src/js/Jencil.js", "65903:69063");
__$coverInitRange("src/js/Jencil.js", "69068:69644");
__$coverInitRange("src/js/Jencil.js", "69649:69873");
__$coverInitRange("src/js/Jencil.js", "69878:70114");
__$coverInitRange("src/js/Jencil.js", "70119:70335");
__$coverInitRange("src/js/Jencil.js", "70340:72805");
__$coverInitRange("src/js/Jencil.js", "72810:73586");
__$coverInitRange("src/js/Jencil.js", "73591:74377");
__$coverInitRange("src/js/Jencil.js", "74382:74572");
__$coverInitRange("src/js/Jencil.js", "74577:74841");
__$coverInitRange("src/js/Jencil.js", "74846:75573");
__$coverInitRange("src/js/Jencil.js", "75578:76484");
__$coverInitRange("src/js/Jencil.js", "76489:76674");
__$coverInitRange("src/js/Jencil.js", "76679:79539");
__$coverInitRange("src/js/Jencil.js", "79544:81220");
__$coverInitRange("src/js/Jencil.js", "81225:81919");
__$coverInitRange("src/js/Jencil.js", "81924:85519");
__$coverInitRange("src/js/Jencil.js", "85524:85551");
__$coverInitRange("src/js/Jencil.js", "85556:86559");
__$coverInitRange("src/js/Jencil.js", "86564:87370");
__$coverInitRange("src/js/Jencil.js", "87375:87474");
__$coverInitRange("src/js/Jencil.js", "87479:89192");
__$coverInitRange("src/js/Jencil.js", "89197:92299");
__$coverInitRange("src/js/Jencil.js", "92304:98712");
__$coverInitRange("src/js/Jencil.js", "98717:98850");
__$coverInitRange("src/js/Jencil.js", "98855:99309");
__$coverInitRange("src/js/Jencil.js", "99314:99910");
__$coverInitRange("src/js/Jencil.js", "99915:100022");
__$coverInitRange("src/js/Jencil.js", "885:970");
__$coverInitRange("src/js/Jencil.js", "972:1016");
__$coverInitRange("src/js/Jencil.js", "1018:1051");
__$coverInitRange("src/js/Jencil.js", "1053:1081");
__$coverInitRange("src/js/Jencil.js", "1083:1117");
__$coverInitRange("src/js/Jencil.js", "1119:1131");
__$coverInitRange("src/js/Jencil.js", "911:968");
__$coverInitRange("src/js/Jencil.js", "990:1014");
__$coverInitRange("src/js/Jencil.js", "1187:1223");
__$coverInitRange("src/js/Jencil.js", "1229:1412");
__$coverInitRange("src/js/Jencil.js", "1418:1430");
__$coverInitRange("src/js/Jencil.js", "1436:1459");
__$coverInitRange("src/js/Jencil.js", "1465:1598");
__$coverInitRange("src/js/Jencil.js", "1604:1629");
__$coverInitRange("src/js/Jencil.js", "1263:1406");
__$coverInitRange("src/js/Jencil.js", "1524:1540");
__$coverInitRange("src/js/Jencil.js", "1548:1592");
__$coverInitRange("src/js/Jencil.js", "1699:1727");
__$coverInitRange("src/js/Jencil.js", "1798:1827");
__$coverInitRange("src/js/Jencil.js", "1890:1909");
__$coverInitRange("src/js/Jencil.js", "1917:1959");
__$coverInitRange("src/js/Jencil.js", "1967:1978");
__$coverInitRange("src/js/Jencil.js", "1986:2009");
__$coverInitRange("src/js/Jencil.js", "2017:2156");
__$coverInitRange("src/js/Jencil.js", "2164:2177");
__$coverInitRange("src/js/Jencil.js", "1942:1951");
__$coverInitRange("src/js/Jencil.js", "2045:2099");
__$coverInitRange("src/js/Jencil.js", "2109:2120");
__$coverInitRange("src/js/Jencil.js", "2130:2148");
__$coverInitRange("src/js/Jencil.js", "2072:2089");
__$coverInitRange("src/js/Jencil.js", "2232:2271");
__$coverInitRange("src/js/Jencil.js", "2324:2329");
__$coverInitRange("src/js/Jencil.js", "2337:2367");
__$coverInitRange("src/js/Jencil.js", "2375:2424");
__$coverInitRange("src/js/Jencil.js", "2469:2500");
__$coverInitRange("src/js/Jencil.js", "2546:2577");
__$coverInitRange("src/js/Jencil.js", "2618:2654");
__$coverInitRange("src/js/Jencil.js", "2711:2940");
__$coverInitRange("src/js/Jencil.js", "2758:2934");
__$coverInitRange("src/js/Jencil.js", "2811:2819");
__$coverInitRange("src/js/Jencil.js", "2829:2888");
__$coverInitRange("src/js/Jencil.js", "2898:2925");
__$coverInitRange("src/js/Jencil.js", "3300:3327");
__$coverInitRange("src/js/Jencil.js", "3377:3409");
__$coverInitRange("src/js/Jencil.js", "3416:3475");
__$coverInitRange("src/js/Jencil.js", "3482:3560");
__$coverInitRange("src/js/Jencil.js", "3567:3593");
__$coverInitRange("src/js/Jencil.js", "3639:3662");
__$coverInitRange("src/js/Jencil.js", "3669:3761");
__$coverInitRange("src/js/Jencil.js", "3768:3864");
__$coverInitRange("src/js/Jencil.js", "3871:3888");
__$coverInitRange("src/js/Jencil.js", "3725:3754");
__$coverInitRange("src/js/Jencil.js", "3828:3857");
__$coverInitRange("src/js/Jencil.js", "3933:4063");
__$coverInitRange("src/js/Jencil.js", "4070:4262");
__$coverInitRange("src/js/Jencil.js", "4269:4467");
__$coverInitRange("src/js/Jencil.js", "4474:4853");
__$coverInitRange("src/js/Jencil.js", "4860:5239");
__$coverInitRange("src/js/Jencil.js", "5246:5335");
__$coverInitRange("src/js/Jencil.js", "5342:5431");
__$coverInitRange("src/js/Jencil.js", "5438:5454");
__$coverInitRange("src/js/Jencil.js", "3972:4001");
__$coverInitRange("src/js/Jencil.js", "4009:4029");
__$coverInitRange("src/js/Jencil.js", "4037:4057");
__$coverInitRange("src/js/Jencil.js", "4132:4224");
__$coverInitRange("src/js/Jencil.js", "4232:4255");
__$coverInitRange("src/js/Jencil.js", "4166:4195");
__$coverInitRange("src/js/Jencil.js", "4205:4216");
__$coverInitRange("src/js/Jencil.js", "4322:4376");
__$coverInitRange("src/js/Jencil.js", "4384:4413");
__$coverInitRange("src/js/Jencil.js", "4421:4441");
__$coverInitRange("src/js/Jencil.js", "4449:4460");
__$coverInitRange("src/js/Jencil.js", "4520:4534");
__$coverInitRange("src/js/Jencil.js", "4542:4593");
__$coverInitRange("src/js/Jencil.js", "4601:4631");
__$coverInitRange("src/js/Jencil.js", "4639:4687");
__$coverInitRange("src/js/Jencil.js", "4695:4739");
__$coverInitRange("src/js/Jencil.js", "4747:4827");
__$coverInitRange("src/js/Jencil.js", "4835:4846");
__$coverInitRange("src/js/Jencil.js", "4573:4585");
__$coverInitRange("src/js/Jencil.js", "4801:4819");
__$coverInitRange("src/js/Jencil.js", "4906:4920");
__$coverInitRange("src/js/Jencil.js", "4928:4979");
__$coverInitRange("src/js/Jencil.js", "4987:5017");
__$coverInitRange("src/js/Jencil.js", "5025:5073");
__$coverInitRange("src/js/Jencil.js", "5081:5125");
__$coverInitRange("src/js/Jencil.js", "5133:5213");
__$coverInitRange("src/js/Jencil.js", "5221:5232");
__$coverInitRange("src/js/Jencil.js", "4959:4971");
__$coverInitRange("src/js/Jencil.js", "5187:5205");
__$coverInitRange("src/js/Jencil.js", "5295:5328");
__$coverInitRange("src/js/Jencil.js", "5391:5424");
__$coverInitRange("src/js/Jencil.js", "5530:5579");
__$coverInitRange("src/js/Jencil.js", "5585:5616");
__$coverInitRange("src/js/Jencil.js", "5622:5651");
__$coverInitRange("src/js/Jencil.js", "5691:5992");
__$coverInitRange("src/js/Jencil.js", "5999:6589");
__$coverInitRange("src/js/Jencil.js", "6596:7172");
__$coverInitRange("src/js/Jencil.js", "7179:7552");
__$coverInitRange("src/js/Jencil.js", "7559:7706");
__$coverInitRange("src/js/Jencil.js", "7713:8041");
__$coverInitRange("src/js/Jencil.js", "8048:8437");
__$coverInitRange("src/js/Jencil.js", "8444:8860");
__$coverInitRange("src/js/Jencil.js", "8867:9043");
__$coverInitRange("src/js/Jencil.js", "9050:9509");
__$coverInitRange("src/js/Jencil.js", "9516:9987");
__$coverInitRange("src/js/Jencil.js", "9994:10728");
__$coverInitRange("src/js/Jencil.js", "10735:11042");
__$coverInitRange("src/js/Jencil.js", "11049:11232");
__$coverInitRange("src/js/Jencil.js", "11239:11662");
__$coverInitRange("src/js/Jencil.js", "11669:11851");
__$coverInitRange("src/js/Jencil.js", "11858:12030");
__$coverInitRange("src/js/Jencil.js", "12037:12141");
__$coverInitRange("src/js/Jencil.js", "12148:12164");
__$coverInitRange("src/js/Jencil.js", "5737:5761");
__$coverInitRange("src/js/Jencil.js", "5769:5791");
__$coverInitRange("src/js/Jencil.js", "5799:5890");
__$coverInitRange("src/js/Jencil.js", "5898:5986");
__$coverInitRange("src/js/Jencil.js", "5846:5882");
__$coverInitRange("src/js/Jencil.js", "5944:5978");
__$coverInitRange("src/js/Jencil.js", "6050:6079");
__$coverInitRange("src/js/Jencil.js", "6087:6540");
__$coverInitRange("src/js/Jencil.js", "6548:6562");
__$coverInitRange("src/js/Jencil.js", "6570:6582");
__$coverInitRange("src/js/Jencil.js", "6134:6179");
__$coverInitRange("src/js/Jencil.js", "6189:6214");
__$coverInitRange("src/js/Jencil.js", "6224:6261");
__$coverInitRange("src/js/Jencil.js", "6271:6307");
__$coverInitRange("src/js/Jencil.js", "6317:6358");
__$coverInitRange("src/js/Jencil.js", "6368:6393");
__$coverInitRange("src/js/Jencil.js", "6462:6493");
__$coverInitRange("src/js/Jencil.js", "6503:6532");
__$coverInitRange("src/js/Jencil.js", "6657:6677");
__$coverInitRange("src/js/Jencil.js", "6685:6719");
__$coverInitRange("src/js/Jencil.js", "6727:7076");
__$coverInitRange("src/js/Jencil.js", "7084:7104");
__$coverInitRange("src/js/Jencil.js", "7112:7146");
__$coverInitRange("src/js/Jencil.js", "7154:7165");
__$coverInitRange("src/js/Jencil.js", "6781:6823");
__$coverInitRange("src/js/Jencil.js", "6882:6920");
__$coverInitRange("src/js/Jencil.js", "6930:6950");
__$coverInitRange("src/js/Jencil.js", "6960:6995");
__$coverInitRange("src/js/Jencil.js", "7005:7044");
__$coverInitRange("src/js/Jencil.js", "7054:7068");
__$coverInitRange("src/js/Jencil.js", "7236:7341");
__$coverInitRange("src/js/Jencil.js", "7349:7417");
__$coverInitRange("src/js/Jencil.js", "7425:7514");
__$coverInitRange("src/js/Jencil.js", "7522:7545");
__$coverInitRange("src/js/Jencil.js", "7293:7307");
__$coverInitRange("src/js/Jencil.js", "7317:7333");
__$coverInitRange("src/js/Jencil.js", "7398:7409");
__$coverInitRange("src/js/Jencil.js", "7473:7506");
__$coverInitRange("src/js/Jencil.js", "7618:7627");
__$coverInitRange("src/js/Jencil.js", "7635:7655");
__$coverInitRange("src/js/Jencil.js", "7663:7699");
__$coverInitRange("src/js/Jencil.js", "7777:7796");
__$coverInitRange("src/js/Jencil.js", "7804:7838");
__$coverInitRange("src/js/Jencil.js", "7846:7888");
__$coverInitRange("src/js/Jencil.js", "7896:7933");
__$coverInitRange("src/js/Jencil.js", "7941:7973");
__$coverInitRange("src/js/Jencil.js", "7981:8015");
__$coverInitRange("src/js/Jencil.js", "8023:8034");
__$coverInitRange("src/js/Jencil.js", "8098:8119");
__$coverInitRange("src/js/Jencil.js", "8127:8411");
__$coverInitRange("src/js/Jencil.js", "8419:8430");
__$coverInitRange("src/js/Jencil.js", "8174:8219");
__$coverInitRange("src/js/Jencil.js", "8229:8246");
__$coverInitRange("src/js/Jencil.js", "8307:8352");
__$coverInitRange("src/js/Jencil.js", "8362:8403");
__$coverInitRange("src/js/Jencil.js", "8512:8537");
__$coverInitRange("src/js/Jencil.js", "8545:8579");
__$coverInitRange("src/js/Jencil.js", "8587:8632");
__$coverInitRange("src/js/Jencil.js", "8640:8663");
__$coverInitRange("src/js/Jencil.js", "8671:8689");
__$coverInitRange("src/js/Jencil.js", "8697:8740");
__$coverInitRange("src/js/Jencil.js", "8748:8764");
__$coverInitRange("src/js/Jencil.js", "8772:8792");
__$coverInitRange("src/js/Jencil.js", "8800:8834");
__$coverInitRange("src/js/Jencil.js", "8842:8853");
__$coverInitRange("src/js/Jencil.js", "8727:8732");
__$coverInitRange("src/js/Jencil.js", "8931:9006");
__$coverInitRange("src/js/Jencil.js", "9014:9036");
__$coverInitRange("src/js/Jencil.js", "8958:8998");
__$coverInitRange("src/js/Jencil.js", "9122:9153");
__$coverInitRange("src/js/Jencil.js", "9161:9195");
__$coverInitRange("src/js/Jencil.js", "9203:9248");
__$coverInitRange("src/js/Jencil.js", "9256:9274");
__$coverInitRange("src/js/Jencil.js", "9282:9312");
__$coverInitRange("src/js/Jencil.js", "9320:9338");
__$coverInitRange("src/js/Jencil.js", "9346:9389");
__$coverInitRange("src/js/Jencil.js", "9397:9413");
__$coverInitRange("src/js/Jencil.js", "9421:9441");
__$coverInitRange("src/js/Jencil.js", "9449:9483");
__$coverInitRange("src/js/Jencil.js", "9491:9502");
__$coverInitRange("src/js/Jencil.js", "9376:9381");
__$coverInitRange("src/js/Jencil.js", "9587:9618");
__$coverInitRange("src/js/Jencil.js", "9626:9660");
__$coverInitRange("src/js/Jencil.js", "9668:9713");
__$coverInitRange("src/js/Jencil.js", "9721:9739");
__$coverInitRange("src/js/Jencil.js", "9747:9777");
__$coverInitRange("src/js/Jencil.js", "9785:9790");
__$coverInitRange("src/js/Jencil.js", "9798:9816");
__$coverInitRange("src/js/Jencil.js", "9824:9867");
__$coverInitRange("src/js/Jencil.js", "9875:9891");
__$coverInitRange("src/js/Jencil.js", "9899:9919");
__$coverInitRange("src/js/Jencil.js", "9927:9961");
__$coverInitRange("src/js/Jencil.js", "9969:9980");
__$coverInitRange("src/js/Jencil.js", "9854:9859");
__$coverInitRange("src/js/Jencil.js", "10066:10102");
__$coverInitRange("src/js/Jencil.js", "10110:10144");
__$coverInitRange("src/js/Jencil.js", "10152:10170");
__$coverInitRange("src/js/Jencil.js", "10178:10632");
__$coverInitRange("src/js/Jencil.js", "10640:10660");
__$coverInitRange("src/js/Jencil.js", "10668:10702");
__$coverInitRange("src/js/Jencil.js", "10710:10721");
__$coverInitRange("src/js/Jencil.js", "10273:10331");
__$coverInitRange("src/js/Jencil.js", "10341:10370");
__$coverInitRange("src/js/Jencil.js", "10395:10440");
__$coverInitRange("src/js/Jencil.js", "10450:10486");
__$coverInitRange("src/js/Jencil.js", "10496:10541");
__$coverInitRange("src/js/Jencil.js", "10551:10598");
__$coverInitRange("src/js/Jencil.js", "10608:10624");
__$coverInitRange("src/js/Jencil.js", "10583:10588");
__$coverInitRange("src/js/Jencil.js", "10789:10804");
__$coverInitRange("src/js/Jencil.js", "10812:10840");
__$coverInitRange("src/js/Jencil.js", "10848:10874");
__$coverInitRange("src/js/Jencil.js", "10882:10922");
__$coverInitRange("src/js/Jencil.js", "10930:10958");
__$coverInitRange("src/js/Jencil.js", "10966:11014");
__$coverInitRange("src/js/Jencil.js", "11022:11035");
__$coverInitRange("src/js/Jencil.js", "10990:11006");
__$coverInitRange("src/js/Jencil.js", "11102:11116");
__$coverInitRange("src/js/Jencil.js", "11124:11176");
__$coverInitRange("src/js/Jencil.js", "11184:11225");
__$coverInitRange("src/js/Jencil.js", "11308:11333");
__$coverInitRange("src/js/Jencil.js", "11341:11375");
__$coverInitRange("src/js/Jencil.js", "11383:11432");
__$coverInitRange("src/js/Jencil.js", "11440:11464");
__$coverInitRange("src/js/Jencil.js", "11472:11491");
__$coverInitRange("src/js/Jencil.js", "11499:11542");
__$coverInitRange("src/js/Jencil.js", "11550:11566");
__$coverInitRange("src/js/Jencil.js", "11574:11594");
__$coverInitRange("src/js/Jencil.js", "11602:11636");
__$coverInitRange("src/js/Jencil.js", "11644:11655");
__$coverInitRange("src/js/Jencil.js", "11529:11534");
__$coverInitRange("src/js/Jencil.js", "11735:11814");
__$coverInitRange("src/js/Jencil.js", "11822:11844");
__$coverInitRange("src/js/Jencil.js", "11764:11806");
__$coverInitRange("src/js/Jencil.js", "11918:11932");
__$coverInitRange("src/js/Jencil.js", "11940:11992");
__$coverInitRange("src/js/Jencil.js", "12000:12023");
__$coverInitRange("src/js/Jencil.js", "12101:12134");
__$coverInitRange("src/js/Jencil.js", "12300:12474");
__$coverInitRange("src/js/Jencil.js", "12480:12663");
__$coverInitRange("src/js/Jencil.js", "12669:12855");
__$coverInitRange("src/js/Jencil.js", "12861:13299");
__$coverInitRange("src/js/Jencil.js", "13305:13747");
__$coverInitRange("src/js/Jencil.js", "13753:14125");
__$coverInitRange("src/js/Jencil.js", "14131:14197");
__$coverInitRange("src/js/Jencil.js", "14203:14271");
__$coverInitRange("src/js/Jencil.js", "14277:14343");
__$coverInitRange("src/js/Jencil.js", "14349:14417");
__$coverInitRange("src/js/Jencil.js", "14423:14801");
__$coverInitRange("src/js/Jencil.js", "14807:15173");
__$coverInitRange("src/js/Jencil.js", "15179:15388");
__$coverInitRange("src/js/Jencil.js", "15394:15601");
__$coverInitRange("src/js/Jencil.js", "15607:16103");
__$coverInitRange("src/js/Jencil.js", "16109:16605");
__$coverInitRange("src/js/Jencil.js", "16611:17597");
__$coverInitRange("src/js/Jencil.js", "17603:17617");
__$coverInitRange("src/js/Jencil.js", "12530:12596");
__$coverInitRange("src/js/Jencil.js", "12604:12656");
__$coverInitRange("src/js/Jencil.js", "12567:12588");
__$coverInitRange("src/js/Jencil.js", "12720:12786");
__$coverInitRange("src/js/Jencil.js", "12794:12848");
__$coverInitRange("src/js/Jencil.js", "12757:12778");
__$coverInitRange("src/js/Jencil.js", "12913:12923");
__$coverInitRange("src/js/Jencil.js", "12931:12997");
__$coverInitRange("src/js/Jencil.js", "13005:13114");
__$coverInitRange("src/js/Jencil.js", "13122:13246");
__$coverInitRange("src/js/Jencil.js", "13254:13292");
__$coverInitRange("src/js/Jencil.js", "12968:12989");
__$coverInitRange("src/js/Jencil.js", "13054:13075");
__$coverInitRange("src/js/Jencil.js", "13085:13106");
__$coverInitRange("src/js/Jencil.js", "13151:13195");
__$coverInitRange("src/js/Jencil.js", "13205:13238");
__$coverInitRange("src/js/Jencil.js", "13358:13368");
__$coverInitRange("src/js/Jencil.js", "13376:13442");
__$coverInitRange("src/js/Jencil.js", "13450:13559");
__$coverInitRange("src/js/Jencil.js", "13567:13693");
__$coverInitRange("src/js/Jencil.js", "13701:13740");
__$coverInitRange("src/js/Jencil.js", "13413:13434");
__$coverInitRange("src/js/Jencil.js", "13499:13520");
__$coverInitRange("src/js/Jencil.js", "13530:13551");
__$coverInitRange("src/js/Jencil.js", "13596:13641");
__$coverInitRange("src/js/Jencil.js", "13651:13685");
__$coverInitRange("src/js/Jencil.js", "13805:13814");
__$coverInitRange("src/js/Jencil.js", "13822:13885");
__$coverInitRange("src/js/Jencil.js", "13893:13923");
__$coverInitRange("src/js/Jencil.js", "13931:14063");
__$coverInitRange("src/js/Jencil.js", "14071:14098");
__$coverInitRange("src/js/Jencil.js", "14106:14118");
__$coverInitRange("src/js/Jencil.js", "13858:13877");
__$coverInitRange("src/js/Jencil.js", "14036:14055");
__$coverInitRange("src/js/Jencil.js", "14161:14190");
__$coverInitRange("src/js/Jencil.js", "14234:14264");
__$coverInitRange("src/js/Jencil.js", "14307:14336");
__$coverInitRange("src/js/Jencil.js", "14380:14410");
__$coverInitRange("src/js/Jencil.js", "14466:14505");
__$coverInitRange("src/js/Jencil.js", "14513:14579");
__$coverInitRange("src/js/Jencil.js", "14587:14644");
__$coverInitRange("src/js/Jencil.js", "14652:14695");
__$coverInitRange("src/js/Jencil.js", "14703:14742");
__$coverInitRange("src/js/Jencil.js", "14750:14794");
__$coverInitRange("src/js/Jencil.js", "14550:14571");
__$coverInitRange("src/js/Jencil.js", "14850:14886");
__$coverInitRange("src/js/Jencil.js", "14894:14960");
__$coverInitRange("src/js/Jencil.js", "14968:15023");
__$coverInitRange("src/js/Jencil.js", "15031:15072");
__$coverInitRange("src/js/Jencil.js", "15080:15117");
__$coverInitRange("src/js/Jencil.js", "15125:15166");
__$coverInitRange("src/js/Jencil.js", "14931:14952");
__$coverInitRange("src/js/Jencil.js", "15215:15225");
__$coverInitRange("src/js/Jencil.js", "15233:15255");
__$coverInitRange("src/js/Jencil.js", "15263:15355");
__$coverInitRange("src/js/Jencil.js", "15363:15381");
__$coverInitRange("src/js/Jencil.js", "15292:15311");
__$coverInitRange("src/js/Jencil.js", "15321:15347");
__$coverInitRange("src/js/Jencil.js", "15430:15440");
__$coverInitRange("src/js/Jencil.js", "15448:15470");
__$coverInitRange("src/js/Jencil.js", "15478:15569");
__$coverInitRange("src/js/Jencil.js", "15577:15594");
__$coverInitRange("src/js/Jencil.js", "15507:15525");
__$coverInitRange("src/js/Jencil.js", "15535:15561");
__$coverInitRange("src/js/Jencil.js", "15658:15676");
__$coverInitRange("src/js/Jencil.js", "15684:15750");
__$coverInitRange("src/js/Jencil.js", "15758:15867");
__$coverInitRange("src/js/Jencil.js", "15875:15906");
__$coverInitRange("src/js/Jencil.js", "15914:15974");
__$coverInitRange("src/js/Jencil.js", "15982:16056");
__$coverInitRange("src/js/Jencil.js", "16064:16096");
__$coverInitRange("src/js/Jencil.js", "15721:15742");
__$coverInitRange("src/js/Jencil.js", "15807:15828");
__$coverInitRange("src/js/Jencil.js", "15838:15859");
__$coverInitRange("src/js/Jencil.js", "16011:16048");
__$coverInitRange("src/js/Jencil.js", "16160:16178");
__$coverInitRange("src/js/Jencil.js", "16186:16252");
__$coverInitRange("src/js/Jencil.js", "16260:16369");
__$coverInitRange("src/js/Jencil.js", "16377:16408");
__$coverInitRange("src/js/Jencil.js", "16416:16476");
__$coverInitRange("src/js/Jencil.js", "16484:16558");
__$coverInitRange("src/js/Jencil.js", "16566:16598");
__$coverInitRange("src/js/Jencil.js", "16223:16244");
__$coverInitRange("src/js/Jencil.js", "16309:16330");
__$coverInitRange("src/js/Jencil.js", "16340:16361");
__$coverInitRange("src/js/Jencil.js", "16513:16550");
__$coverInitRange("src/js/Jencil.js", "16649:16720");
__$coverInitRange("src/js/Jencil.js", "16728:16772");
__$coverInitRange("src/js/Jencil.js", "16780:16826");
__$coverInitRange("src/js/Jencil.js", "16834:16877");
__$coverInitRange("src/js/Jencil.js", "16885:16930");
__$coverInitRange("src/js/Jencil.js", "16938:16971");
__$coverInitRange("src/js/Jencil.js", "16979:17014");
__$coverInitRange("src/js/Jencil.js", "17022:17065");
__$coverInitRange("src/js/Jencil.js", "17073:17118");
__$coverInitRange("src/js/Jencil.js", "17126:17147");
__$coverInitRange("src/js/Jencil.js", "17155:17184");
__$coverInitRange("src/js/Jencil.js", "17192:17223");
__$coverInitRange("src/js/Jencil.js", "17231:17260");
__$coverInitRange("src/js/Jencil.js", "17268:17299");
__$coverInitRange("src/js/Jencil.js", "17307:17336");
__$coverInitRange("src/js/Jencil.js", "17344:17373");
__$coverInitRange("src/js/Jencil.js", "17381:17412");
__$coverInitRange("src/js/Jencil.js", "17420:17451");
__$coverInitRange("src/js/Jencil.js", "17459:17490");
__$coverInitRange("src/js/Jencil.js", "17498:17529");
__$coverInitRange("src/js/Jencil.js", "17537:17566");
__$coverInitRange("src/js/Jencil.js", "17574:17590");
__$coverInitRange("src/js/Jencil.js", "16696:16712");
__$coverInitRange("src/js/Jencil.js", "17671:17682");
__$coverInitRange("src/js/Jencil.js", "17688:17723");
__$coverInitRange("src/js/Jencil.js", "17729:17905");
__$coverInitRange("src/js/Jencil.js", "17911:18008");
__$coverInitRange("src/js/Jencil.js", "18014:18165");
__$coverInitRange("src/js/Jencil.js", "18171:18244");
__$coverInitRange("src/js/Jencil.js", "18250:18264");
__$coverInitRange("src/js/Jencil.js", "17943:17960");
__$coverInitRange("src/js/Jencil.js", "17968:17982");
__$coverInitRange("src/js/Jencil.js", "17990:18001");
__$coverInitRange("src/js/Jencil.js", "18051:18090");
__$coverInitRange("src/js/Jencil.js", "18098:18139");
__$coverInitRange("src/js/Jencil.js", "18147:18158");
__$coverInitRange("src/js/Jencil.js", "18204:18218");
__$coverInitRange("src/js/Jencil.js", "18226:18237");
__$coverInitRange("src/js/Jencil.js", "18582:18605");
__$coverInitRange("src/js/Jencil.js", "18611:18672");
__$coverInitRange("src/js/Jencil.js", "18678:18842");
__$coverInitRange("src/js/Jencil.js", "18848:19605");
__$coverInitRange("src/js/Jencil.js", "18636:18665");
__$coverInitRange("src/js/Jencil.js", "18881:18912");
__$coverInitRange("src/js/Jencil.js", "18920:18968");
__$coverInitRange("src/js/Jencil.js", "18976:18993");
__$coverInitRange("src/js/Jencil.js", "19001:19041");
__$coverInitRange("src/js/Jencil.js", "19049:19565");
__$coverInitRange("src/js/Jencil.js", "19573:19579");
__$coverInitRange("src/js/Jencil.js", "19587:19598");
__$coverInitRange("src/js/Jencil.js", "19077:19089");
__$coverInitRange("src/js/Jencil.js", "19099:19124");
__$coverInitRange("src/js/Jencil.js", "19134:19209");
__$coverInitRange("src/js/Jencil.js", "19219:19253");
__$coverInitRange("src/js/Jencil.js", "19263:19293");
__$coverInitRange("src/js/Jencil.js", "19303:19556");
__$coverInitRange("src/js/Jencil.js", "19345:19371");
__$coverInitRange("src/js/Jencil.js", "19400:19451");
__$coverInitRange("src/js/Jencil.js", "19463:19546");
__$coverInitRange("src/js/Jencil.js", "21073:21087");
__$coverInitRange("src/js/Jencil.js", "21093:21788");
__$coverInitRange("src/js/Jencil.js", "21794:22777");
__$coverInitRange("src/js/Jencil.js", "21126:21171");
__$coverInitRange("src/js/Jencil.js", "21179:21223");
__$coverInitRange("src/js/Jencil.js", "21231:21259");
__$coverInitRange("src/js/Jencil.js", "21267:21359");
__$coverInitRange("src/js/Jencil.js", "21367:21533");
__$coverInitRange("src/js/Jencil.js", "21541:21652");
__$coverInitRange("src/js/Jencil.js", "21660:21679");
__$coverInitRange("src/js/Jencil.js", "21687:21715");
__$coverInitRange("src/js/Jencil.js", "21723:21741");
__$coverInitRange("src/js/Jencil.js", "21749:21761");
__$coverInitRange("src/js/Jencil.js", "21769:21781");
__$coverInitRange("src/js/Jencil.js", "21209:21215");
__$coverInitRange("src/js/Jencil.js", "21398:21442");
__$coverInitRange("src/js/Jencil.js", "21452:21474");
__$coverInitRange("src/js/Jencil.js", "21484:21525");
__$coverInitRange("src/js/Jencil.js", "21595:21644");
__$coverInitRange("src/js/Jencil.js", "21839:21914");
__$coverInitRange("src/js/Jencil.js", "21922:22036");
__$coverInitRange("src/js/Jencil.js", "22044:22132");
__$coverInitRange("src/js/Jencil.js", "22140:22267");
__$coverInitRange("src/js/Jencil.js", "22275:22404");
__$coverInitRange("src/js/Jencil.js", "22412:22548");
__$coverInitRange("src/js/Jencil.js", "22556:22727");
__$coverInitRange("src/js/Jencil.js", "22735:22770");
__$coverInitRange("src/js/Jencil.js", "21884:21906");
__$coverInitRange("src/js/Jencil.js", "21967:22028");
__$coverInitRange("src/js/Jencil.js", "22088:22123");
__$coverInitRange("src/js/Jencil.js", "22190:22233");
__$coverInitRange("src/js/Jencil.js", "22243:22258");
__$coverInitRange("src/js/Jencil.js", "22326:22370");
__$coverInitRange("src/js/Jencil.js", "22380:22395");
__$coverInitRange("src/js/Jencil.js", "22439:22540");
__$coverInitRange("src/js/Jencil.js", "22495:22529");
__$coverInitRange("src/js/Jencil.js", "22584:22719");
__$coverInitRange("src/js/Jencil.js", "22657:22708");
__$coverInitRange("src/js/Jencil.js", "22821:22917");
__$coverInitRange("src/js/Jencil.js", "22855:22910");
__$coverInitRange("src/js/Jencil.js", "22934:22985");
__$coverInitRange("src/js/Jencil.js", "22968:22978");
__$coverInitRange("src/js/Jencil.js", "23249:24281");
__$coverInitRange("src/js/Jencil.js", "24288:24399");
__$coverInitRange("src/js/Jencil.js", "24406:24517");
__$coverInitRange("src/js/Jencil.js", "24524:24635");
__$coverInitRange("src/js/Jencil.js", "24642:24821");
__$coverInitRange("src/js/Jencil.js", "24828:24841");
__$coverInitRange("src/js/Jencil.js", "23292:23332");
__$coverInitRange("src/js/Jencil.js", "23340:23801");
__$coverInitRange("src/js/Jencil.js", "23809:23862");
__$coverInitRange("src/js/Jencil.js", "23870:23900");
__$coverInitRange("src/js/Jencil.js", "23908:23940");
__$coverInitRange("src/js/Jencil.js", "23948:24027");
__$coverInitRange("src/js/Jencil.js", "24035:24108");
__$coverInitRange("src/js/Jencil.js", "24116:24154");
__$coverInitRange("src/js/Jencil.js", "24162:24233");
__$coverInitRange("src/js/Jencil.js", "24241:24275");
__$coverInitRange("src/js/Jencil.js", "23997:24018");
__$coverInitRange("src/js/Jencil.js", "24333:24392");
__$coverInitRange("src/js/Jencil.js", "24451:24510");
__$coverInitRange("src/js/Jencil.js", "24569:24628");
__$coverInitRange("src/js/Jencil.js", "24709:24749");
__$coverInitRange("src/js/Jencil.js", "24757:24778");
__$coverInitRange("src/js/Jencil.js", "24786:24814");
__$coverInitRange("src/js/Jencil.js", "24893:25031");
__$coverInitRange("src/js/Jencil.js", "24932:24940");
__$coverInitRange("src/js/Jencil.js", "24948:24962");
__$coverInitRange("src/js/Jencil.js", "24970:25023");
__$coverInitRange("src/js/Jencil.js", "25094:25140");
__$coverInitRange("src/js/Jencil.js", "25211:25247");
__$coverInitRange("src/js/Jencil.js", "25317:25351");
__$coverInitRange("src/js/Jencil.js", "25422:25454");
__$coverInitRange("src/js/Jencil.js", "25525:25561");
__$coverInitRange("src/js/Jencil.js", "25632:25664");
__$coverInitRange("src/js/Jencil.js", "25736:25782");
__$coverInitRange("src/js/Jencil.js", "25851:25897");
__$coverInitRange("src/js/Jencil.js", "25963:25999");
__$coverInitRange("src/js/Jencil.js", "26065:26114");
__$coverInitRange("src/js/Jencil.js", "26120:26151");
__$coverInitRange("src/js/Jencil.js", "26157:26193");
__$coverInitRange("src/js/Jencil.js", "26248:26276");
__$coverInitRange("src/js/Jencil.js", "26315:26637");
__$coverInitRange("src/js/Jencil.js", "26644:26705");
__$coverInitRange("src/js/Jencil.js", "26712:26775");
__$coverInitRange("src/js/Jencil.js", "26782:26795");
__$coverInitRange("src/js/Jencil.js", "26364:26380");
__$coverInitRange("src/js/Jencil.js", "26388:26446");
__$coverInitRange("src/js/Jencil.js", "26454:26587");
__$coverInitRange("src/js/Jencil.js", "26595:26631");
__$coverInitRange("src/js/Jencil.js", "26420:26438");
__$coverInitRange("src/js/Jencil.js", "26496:26519");
__$coverInitRange("src/js/Jencil.js", "26544:26579");
__$coverInitRange("src/js/Jencil.js", "26687:26698");
__$coverInitRange("src/js/Jencil.js", "26757:26768");
__$coverInitRange("src/js/Jencil.js", "26842:26866");
__$coverInitRange("src/js/Jencil.js", "26873:27094");
__$coverInitRange("src/js/Jencil.js", "27101:27113");
__$coverInitRange("src/js/Jencil.js", "26921:26979");
__$coverInitRange("src/js/Jencil.js", "26987:27050");
__$coverInitRange("src/js/Jencil.js", "27058:27088");
__$coverInitRange("src/js/Jencil.js", "26953:26971");
__$coverInitRange("src/js/Jencil.js", "27174:27206");
__$coverInitRange("src/js/Jencil.js", "27213:28385");
__$coverInitRange("src/js/Jencil.js", "28392:28522");
__$coverInitRange("src/js/Jencil.js", "28529:29590");
__$coverInitRange("src/js/Jencil.js", "29597:29617");
__$coverInitRange("src/js/Jencil.js", "27270:27306");
__$coverInitRange("src/js/Jencil.js", "27314:27328");
__$coverInitRange("src/js/Jencil.js", "27336:27350");
__$coverInitRange("src/js/Jencil.js", "27358:27382");
__$coverInitRange("src/js/Jencil.js", "27390:27442");
__$coverInitRange("src/js/Jencil.js", "27450:27483");
__$coverInitRange("src/js/Jencil.js", "27491:27528");
__$coverInitRange("src/js/Jencil.js", "27536:27578");
__$coverInitRange("src/js/Jencil.js", "27586:27623");
__$coverInitRange("src/js/Jencil.js", "27631:27766");
__$coverInitRange("src/js/Jencil.js", "27774:27908");
__$coverInitRange("src/js/Jencil.js", "27916:28040");
__$coverInitRange("src/js/Jencil.js", "28048:28068");
__$coverInitRange("src/js/Jencil.js", "28076:28096");
__$coverInitRange("src/js/Jencil.js", "28104:28228");
__$coverInitRange("src/js/Jencil.js", "28236:28256");
__$coverInitRange("src/js/Jencil.js", "28264:28284");
__$coverInitRange("src/js/Jencil.js", "28292:28379");
__$coverInitRange("src/js/Jencil.js", "27667:27757");
__$coverInitRange("src/js/Jencil.js", "27713:27747");
__$coverInitRange("src/js/Jencil.js", "27810:27899");
__$coverInitRange("src/js/Jencil.js", "27855:27889");
__$coverInitRange("src/js/Jencil.js", "27978:28031");
__$coverInitRange("src/js/Jencil.js", "28166:28219");
__$coverInitRange("src/js/Jencil.js", "28344:28369");
__$coverInitRange("src/js/Jencil.js", "28442:28462");
__$coverInitRange("src/js/Jencil.js", "28470:28485");
__$coverInitRange("src/js/Jencil.js", "28493:28515");
__$coverInitRange("src/js/Jencil.js", "28614:28680");
__$coverInitRange("src/js/Jencil.js", "28688:28742");
__$coverInitRange("src/js/Jencil.js", "28750:28781");
__$coverInitRange("src/js/Jencil.js", "28789:28808");
__$coverInitRange("src/js/Jencil.js", "28816:29143");
__$coverInitRange("src/js/Jencil.js", "29151:29182");
__$coverInitRange("src/js/Jencil.js", "29190:29346");
__$coverInitRange("src/js/Jencil.js", "29354:29583");
__$coverInitRange("src/js/Jencil.js", "28728:28734");
__$coverInitRange("src/js/Jencil.js", "28858:28866");
__$coverInitRange("src/js/Jencil.js", "28876:28914");
__$coverInitRange("src/js/Jencil.js", "28924:28951");
__$coverInitRange("src/js/Jencil.js", "28976:29042");
__$coverInitRange("src/js/Jencil.js", "29052:29099");
__$coverInitRange("src/js/Jencil.js", "29109:29135");
__$coverInitRange("src/js/Jencil.js", "29080:29089");
__$coverInitRange("src/js/Jencil.js", "29226:29258");
__$coverInitRange("src/js/Jencil.js", "29268:29337");
__$coverInitRange("src/js/Jencil.js", "29492:29527");
__$coverInitRange("src/js/Jencil.js", "29677:29709");
__$coverInitRange("src/js/Jencil.js", "29716:30059");
__$coverInitRange("src/js/Jencil.js", "30066:30366");
__$coverInitRange("src/js/Jencil.js", "30373:30393");
__$coverInitRange("src/js/Jencil.js", "29778:29790");
__$coverInitRange("src/js/Jencil.js", "29798:29862");
__$coverInitRange("src/js/Jencil.js", "29870:29932");
__$coverInitRange("src/js/Jencil.js", "29940:30012");
__$coverInitRange("src/js/Jencil.js", "30020:30053");
__$coverInitRange("src/js/Jencil.js", "29835:29854");
__$coverInitRange("src/js/Jencil.js", "30118:30175");
__$coverInitRange("src/js/Jencil.js", "30183:30240");
__$coverInitRange("src/js/Jencil.js", "30248:30310");
__$coverInitRange("src/js/Jencil.js", "30318:30340");
__$coverInitRange("src/js/Jencil.js", "30348:30359");
__$coverInitRange("src/js/Jencil.js", "30463:30497");
__$coverInitRange("src/js/Jencil.js", "30504:30855");
__$coverInitRange("src/js/Jencil.js", "30862:31158");
__$coverInitRange("src/js/Jencil.js", "31165:31187");
__$coverInitRange("src/js/Jencil.js", "30568:30580");
__$coverInitRange("src/js/Jencil.js", "30588:30652");
__$coverInitRange("src/js/Jencil.js", "30660:30724");
__$coverInitRange("src/js/Jencil.js", "30732:30806");
__$coverInitRange("src/js/Jencil.js", "30814:30849");
__$coverInitRange("src/js/Jencil.js", "30625:30644");
__$coverInitRange("src/js/Jencil.js", "30916:30971");
__$coverInitRange("src/js/Jencil.js", "30979:31034");
__$coverInitRange("src/js/Jencil.js", "31042:31102");
__$coverInitRange("src/js/Jencil.js", "31110:31132");
__$coverInitRange("src/js/Jencil.js", "31140:31151");
__$coverInitRange("src/js/Jencil.js", "31266:31289");
__$coverInitRange("src/js/Jencil.js", "31295:31316");
__$coverInitRange("src/js/Jencil.js", "31322:31359");
__$coverInitRange("src/js/Jencil.js", "31365:31402");
__$coverInitRange("src/js/Jencil.js", "31408:31456");
__$coverInitRange("src/js/Jencil.js", "31503:31530");
__$coverInitRange("src/js/Jencil.js", "31537:33183");
__$coverInitRange("src/js/Jencil.js", "33190:33308");
__$coverInitRange("src/js/Jencil.js", "33315:33597");
__$coverInitRange("src/js/Jencil.js", "33604:33939");
__$coverInitRange("src/js/Jencil.js", "33946:34250");
__$coverInitRange("src/js/Jencil.js", "34257:34272");
__$coverInitRange("src/js/Jencil.js", "31594:31638");
__$coverInitRange("src/js/Jencil.js", "31646:31660");
__$coverInitRange("src/js/Jencil.js", "31668:31682");
__$coverInitRange("src/js/Jencil.js", "31690:31754");
__$coverInitRange("src/js/Jencil.js", "31762:31809");
__$coverInitRange("src/js/Jencil.js", "31817:31850");
__$coverInitRange("src/js/Jencil.js", "31858:31891");
__$coverInitRange("src/js/Jencil.js", "31899:32261");
__$coverInitRange("src/js/Jencil.js", "32269:32723");
__$coverInitRange("src/js/Jencil.js", "32731:33177");
__$coverInitRange("src/js/Jencil.js", "31933:31948");
__$coverInitRange("src/js/Jencil.js", "31958:31976");
__$coverInitRange("src/js/Jencil.js", "31986:32062");
__$coverInitRange("src/js/Jencil.js", "32072:32150");
__$coverInitRange("src/js/Jencil.js", "32160:32179");
__$coverInitRange("src/js/Jencil.js", "32189:32217");
__$coverInitRange("src/js/Jencil.js", "32227:32252");
__$coverInitRange("src/js/Jencil.js", "32038:32052");
__$coverInitRange("src/js/Jencil.js", "32125:32140");
__$coverInitRange("src/js/Jencil.js", "32301:32325");
__$coverInitRange("src/js/Jencil.js", "32335:32354");
__$coverInitRange("src/js/Jencil.js", "32364:32402");
__$coverInitRange("src/js/Jencil.js", "32412:32446");
__$coverInitRange("src/js/Jencil.js", "32456:32528");
__$coverInitRange("src/js/Jencil.js", "32538:32612");
__$coverInitRange("src/js/Jencil.js", "32622:32641");
__$coverInitRange("src/js/Jencil.js", "32651:32679");
__$coverInitRange("src/js/Jencil.js", "32689:32714");
__$coverInitRange("src/js/Jencil.js", "32508:32518");
__$coverInitRange("src/js/Jencil.js", "32591:32602");
__$coverInitRange("src/js/Jencil.js", "32776:32800");
__$coverInitRange("src/js/Jencil.js", "32810:32829");
__$coverInitRange("src/js/Jencil.js", "32839:32867");
__$coverInitRange("src/js/Jencil.js", "32877:32901");
__$coverInitRange("src/js/Jencil.js", "32911:32982");
__$coverInitRange("src/js/Jencil.js", "32992:33065");
__$coverInitRange("src/js/Jencil.js", "33075:33094");
__$coverInitRange("src/js/Jencil.js", "33104:33132");
__$coverInitRange("src/js/Jencil.js", "33142:33167");
__$coverInitRange("src/js/Jencil.js", "32963:32972");
__$coverInitRange("src/js/Jencil.js", "33045:33055");
__$coverInitRange("src/js/Jencil.js", "33235:33282");
__$coverInitRange("src/js/Jencil.js", "33290:33301");
__$coverInitRange("src/js/Jencil.js", "33373:33421");
__$coverInitRange("src/js/Jencil.js", "33429:33563");
__$coverInitRange("src/js/Jencil.js", "33571:33590");
__$coverInitRange("src/js/Jencil.js", "33401:33413");
__$coverInitRange("src/js/Jencil.js", "33458:33478");
__$coverInitRange("src/js/Jencil.js", "33488:33534");
__$coverInitRange("src/js/Jencil.js", "33544:33555");
__$coverInitRange("src/js/Jencil.js", "33511:33524");
__$coverInitRange("src/js/Jencil.js", "33661:33683");
__$coverInitRange("src/js/Jencil.js", "33691:33739");
__$coverInitRange("src/js/Jencil.js", "33747:33777");
__$coverInitRange("src/js/Jencil.js", "33785:33891");
__$coverInitRange("src/js/Jencil.js", "33899:33932");
__$coverInitRange("src/js/Jencil.js", "33719:33731");
__$coverInitRange("src/js/Jencil.js", "33814:33841");
__$coverInitRange("src/js/Jencil.js", "33851:33883");
__$coverInitRange("src/js/Jencil.js", "34005:34027");
__$coverInitRange("src/js/Jencil.js", "34035:34061");
__$coverInitRange("src/js/Jencil.js", "34069:34095");
__$coverInitRange("src/js/Jencil.js", "34103:34159");
__$coverInitRange("src/js/Jencil.js", "34167:34223");
__$coverInitRange("src/js/Jencil.js", "34231:34243");
__$coverInitRange("src/js/Jencil.js", "34135:34151");
__$coverInitRange("src/js/Jencil.js", "34199:34215");
__$coverInitRange("src/js/Jencil.js", "34336:34371");
__$coverInitRange("src/js/Jencil.js", "34378:35000");
__$coverInitRange("src/js/Jencil.js", "35007:35270");
__$coverInitRange("src/js/Jencil.js", "35277:35372");
__$coverInitRange("src/js/Jencil.js", "35379:35789");
__$coverInitRange("src/js/Jencil.js", "35796:36305");
__$coverInitRange("src/js/Jencil.js", "36312:37673");
__$coverInitRange("src/js/Jencil.js", "37680:37703");
__$coverInitRange("src/js/Jencil.js", "34443:34458");
__$coverInitRange("src/js/Jencil.js", "34466:34546");
__$coverInitRange("src/js/Jencil.js", "34554:34587");
__$coverInitRange("src/js/Jencil.js", "34595:34628");
__$coverInitRange("src/js/Jencil.js", "34636:34670");
__$coverInitRange("src/js/Jencil.js", "34678:34733");
__$coverInitRange("src/js/Jencil.js", "34741:34796");
__$coverInitRange("src/js/Jencil.js", "34804:34894");
__$coverInitRange("src/js/Jencil.js", "34902:34994");
__$coverInitRange("src/js/Jencil.js", "34853:34886");
__$coverInitRange("src/js/Jencil.js", "34952:34986");
__$coverInitRange("src/js/Jencil.js", "35066:35083");
__$coverInitRange("src/js/Jencil.js", "35091:35158");
__$coverInitRange("src/js/Jencil.js", "35166:35190");
__$coverInitRange("src/js/Jencil.js", "35198:35231");
__$coverInitRange("src/js/Jencil.js", "35239:35263");
__$coverInitRange("src/js/Jencil.js", "35336:35365");
__$coverInitRange("src/js/Jencil.js", "35436:35446");
__$coverInitRange("src/js/Jencil.js", "35454:35523");
__$coverInitRange("src/js/Jencil.js", "35531:35563");
__$coverInitRange("src/js/Jencil.js", "35571:35671");
__$coverInitRange("src/js/Jencil.js", "35679:35754");
__$coverInitRange("src/js/Jencil.js", "35762:35782");
__$coverInitRange("src/js/Jencil.js", "35597:35663");
__$coverInitRange("src/js/Jencil.js", "35723:35746");
__$coverInitRange("src/js/Jencil.js", "35853:35875");
__$coverInitRange("src/js/Jencil.js", "35883:35913");
__$coverInitRange("src/js/Jencil.js", "35921:35953");
__$coverInitRange("src/js/Jencil.js", "35961:36039");
__$coverInitRange("src/js/Jencil.js", "36047:36116");
__$coverInitRange("src/js/Jencil.js", "36124:36178");
__$coverInitRange("src/js/Jencil.js", "36186:36261");
__$coverInitRange("src/js/Jencil.js", "36269:36298");
__$coverInitRange("src/js/Jencil.js", "35987:36031");
__$coverInitRange("src/js/Jencil.js", "36150:36170");
__$coverInitRange("src/js/Jencil.js", "36230:36253");
__$coverInitRange("src/js/Jencil.js", "36367:36408");
__$coverInitRange("src/js/Jencil.js", "36416:36436");
__$coverInitRange("src/js/Jencil.js", "36444:36474");
__$coverInitRange("src/js/Jencil.js", "36482:36539");
__$coverInitRange("src/js/Jencil.js", "36547:36619");
__$coverInitRange("src/js/Jencil.js", "36627:37528");
__$coverInitRange("src/js/Jencil.js", "37536:37553");
__$coverInitRange("src/js/Jencil.js", "37561:37578");
__$coverInitRange("src/js/Jencil.js", "37586:37647");
__$coverInitRange("src/js/Jencil.js", "37655:37666");
__$coverInitRange("src/js/Jencil.js", "36656:36738");
__$coverInitRange("src/js/Jencil.js", "36748:36831");
__$coverInitRange("src/js/Jencil.js", "36841:36886");
__$coverInitRange("src/js/Jencil.js", "36896:36919");
__$coverInitRange("src/js/Jencil.js", "36705:36728");
__$coverInitRange("src/js/Jencil.js", "36798:36821");
__$coverInitRange("src/js/Jencil.js", "36963:37046");
__$coverInitRange("src/js/Jencil.js", "37056:37138");
__$coverInitRange("src/js/Jencil.js", "37148:37193");
__$coverInitRange("src/js/Jencil.js", "37203:37235");
__$coverInitRange("src/js/Jencil.js", "37013:37036");
__$coverInitRange("src/js/Jencil.js", "37105:37128");
__$coverInitRange("src/js/Jencil.js", "37260:37343");
__$coverInitRange("src/js/Jencil.js", "37353:37436");
__$coverInitRange("src/js/Jencil.js", "37446:37478");
__$coverInitRange("src/js/Jencil.js", "37488:37520");
__$coverInitRange("src/js/Jencil.js", "37310:37333");
__$coverInitRange("src/js/Jencil.js", "37403:37426");
__$coverInitRange("src/js/Jencil.js", "37771:37808");
__$coverInitRange("src/js/Jencil.js", "37815:38317");
__$coverInitRange("src/js/Jencil.js", "38324:38589");
__$coverInitRange("src/js/Jencil.js", "38596:38694");
__$coverInitRange("src/js/Jencil.js", "38701:39117");
__$coverInitRange("src/js/Jencil.js", "39124:39639");
__$coverInitRange("src/js/Jencil.js", "39646:41016");
__$coverInitRange("src/js/Jencil.js", "41023:41048");
__$coverInitRange("src/js/Jencil.js", "37882:37897");
__$coverInitRange("src/js/Jencil.js", "37905:37987");
__$coverInitRange("src/js/Jencil.js", "37995:38030");
__$coverInitRange("src/js/Jencil.js", "38038:38070");
__$coverInitRange("src/js/Jencil.js", "38078:38113");
__$coverInitRange("src/js/Jencil.js", "38121:38211");
__$coverInitRange("src/js/Jencil.js", "38219:38311");
__$coverInitRange("src/js/Jencil.js", "38170:38203");
__$coverInitRange("src/js/Jencil.js", "38269:38303");
__$coverInitRange("src/js/Jencil.js", "38385:38402");
__$coverInitRange("src/js/Jencil.js", "38410:38477");
__$coverInitRange("src/js/Jencil.js", "38485:38509");
__$coverInitRange("src/js/Jencil.js", "38517:38550");
__$coverInitRange("src/js/Jencil.js", "38558:38582");
__$coverInitRange("src/js/Jencil.js", "38657:38687");
__$coverInitRange("src/js/Jencil.js", "38760:38770");
__$coverInitRange("src/js/Jencil.js", "38778:38849");
__$coverInitRange("src/js/Jencil.js", "38857:38890");
__$coverInitRange("src/js/Jencil.js", "38898:38999");
__$coverInitRange("src/js/Jencil.js", "39007:39082");
__$coverInitRange("src/js/Jencil.js", "39090:39110");
__$coverInitRange("src/js/Jencil.js", "38924:38991");
__$coverInitRange("src/js/Jencil.js", "39051:39074");
__$coverInitRange("src/js/Jencil.js", "39183:39205");
__$coverInitRange("src/js/Jencil.js", "39213:39243");
__$coverInitRange("src/js/Jencil.js", "39251:39284");
__$coverInitRange("src/js/Jencil.js", "39292:39371");
__$coverInitRange("src/js/Jencil.js", "39379:39450");
__$coverInitRange("src/js/Jencil.js", "39458:39512");
__$coverInitRange("src/js/Jencil.js", "39520:39595");
__$coverInitRange("src/js/Jencil.js", "39603:39632");
__$coverInitRange("src/js/Jencil.js", "39318:39363");
__$coverInitRange("src/js/Jencil.js", "39484:39504");
__$coverInitRange("src/js/Jencil.js", "39564:39587");
__$coverInitRange("src/js/Jencil.js", "39703:39744");
__$coverInitRange("src/js/Jencil.js", "39752:39772");
__$coverInitRange("src/js/Jencil.js", "39780:39810");
__$coverInitRange("src/js/Jencil.js", "39818:39876");
__$coverInitRange("src/js/Jencil.js", "39884:39957");
__$coverInitRange("src/js/Jencil.js", "39965:40870");
__$coverInitRange("src/js/Jencil.js", "40878:40895");
__$coverInitRange("src/js/Jencil.js", "40903:40920");
__$coverInitRange("src/js/Jencil.js", "40928:40990");
__$coverInitRange("src/js/Jencil.js", "40998:41009");
__$coverInitRange("src/js/Jencil.js", "39994:40076");
__$coverInitRange("src/js/Jencil.js", "40086:40169");
__$coverInitRange("src/js/Jencil.js", "40179:40225");
__$coverInitRange("src/js/Jencil.js", "40235:40258");
__$coverInitRange("src/js/Jencil.js", "40043:40066");
__$coverInitRange("src/js/Jencil.js", "40136:40159");
__$coverInitRange("src/js/Jencil.js", "40302:40385");
__$coverInitRange("src/js/Jencil.js", "40395:40477");
__$coverInitRange("src/js/Jencil.js", "40487:40533");
__$coverInitRange("src/js/Jencil.js", "40543:40575");
__$coverInitRange("src/js/Jencil.js", "40352:40375");
__$coverInitRange("src/js/Jencil.js", "40444:40467");
__$coverInitRange("src/js/Jencil.js", "40600:40683");
__$coverInitRange("src/js/Jencil.js", "40693:40776");
__$coverInitRange("src/js/Jencil.js", "40786:40819");
__$coverInitRange("src/js/Jencil.js", "40829:40862");
__$coverInitRange("src/js/Jencil.js", "40650:40673");
__$coverInitRange("src/js/Jencil.js", "40743:40766");
__$coverInitRange("src/js/Jencil.js", "41124:41151");
__$coverInitRange("src/js/Jencil.js", "41157:41200");
__$coverInitRange("src/js/Jencil.js", "41206:41260");
__$coverInitRange("src/js/Jencil.js", "41309:41338");
__$coverInitRange("src/js/Jencil.js", "41345:41611");
__$coverInitRange("src/js/Jencil.js", "41618:41714");
__$coverInitRange("src/js/Jencil.js", "41721:42099");
__$coverInitRange("src/js/Jencil.js", "42106:42136");
__$coverInitRange("src/js/Jencil.js", "42143:42173");
__$coverInitRange("src/js/Jencil.js", "42180:42210");
__$coverInitRange("src/js/Jencil.js", "42217:42247");
__$coverInitRange("src/js/Jencil.js", "42254:42284");
__$coverInitRange("src/js/Jencil.js", "42291:42321");
__$coverInitRange("src/js/Jencil.js", "42328:42360");
__$coverInitRange("src/js/Jencil.js", "42367:42401");
__$coverInitRange("src/js/Jencil.js", "42408:42445");
__$coverInitRange("src/js/Jencil.js", "42452:42486");
__$coverInitRange("src/js/Jencil.js", "42493:42532");
__$coverInitRange("src/js/Jencil.js", "42539:42576");
__$coverInitRange("src/js/Jencil.js", "42583:42617");
__$coverInitRange("src/js/Jencil.js", "42624:42657");
__$coverInitRange("src/js/Jencil.js", "42664:42705");
__$coverInitRange("src/js/Jencil.js", "42712:42751");
__$coverInitRange("src/js/Jencil.js", "42758:42775");
__$coverInitRange("src/js/Jencil.js", "41398:41456");
__$coverInitRange("src/js/Jencil.js", "41464:41532");
__$coverInitRange("src/js/Jencil.js", "41540:41571");
__$coverInitRange("src/js/Jencil.js", "41579:41605");
__$coverInitRange("src/js/Jencil.js", "41430:41448");
__$coverInitRange("src/js/Jencil.js", "41669:41707");
__$coverInitRange("src/js/Jencil.js", "41778:41796");
__$coverInitRange("src/js/Jencil.js", "41804:41901");
__$coverInitRange("src/js/Jencil.js", "41909:41937");
__$coverInitRange("src/js/Jencil.js", "41945:42073");
__$coverInitRange("src/js/Jencil.js", "42081:42092");
__$coverInitRange("src/js/Jencil.js", "41836:41872");
__$coverInitRange("src/js/Jencil.js", "41882:41893");
__$coverInitRange("src/js/Jencil.js", "42005:42024");
__$coverInitRange("src/js/Jencil.js", "42034:42065");
__$coverInitRange("src/js/Jencil.js", "42832:42861");
__$coverInitRange("src/js/Jencil.js", "42868:43925");
__$coverInitRange("src/js/Jencil.js", "43932:44129");
__$coverInitRange("src/js/Jencil.js", "44136:44231");
__$coverInitRange("src/js/Jencil.js", "44238:44318");
__$coverInitRange("src/js/Jencil.js", "44325:44416");
__$coverInitRange("src/js/Jencil.js", "44423:44600");
__$coverInitRange("src/js/Jencil.js", "44607:44847");
__$coverInitRange("src/js/Jencil.js", "44854:45198");
__$coverInitRange("src/js/Jencil.js", "45205:45516");
__$coverInitRange("src/js/Jencil.js", "45523:45842");
__$coverInitRange("src/js/Jencil.js", "45849:46166");
__$coverInitRange("src/js/Jencil.js", "46173:46190");
__$coverInitRange("src/js/Jencil.js", "42921:42937");
__$coverInitRange("src/js/Jencil.js", "42945:43003");
__$coverInitRange("src/js/Jencil.js", "43011:43079");
__$coverInitRange("src/js/Jencil.js", "43087:43281");
__$coverInitRange("src/js/Jencil.js", "43289:43327");
__$coverInitRange("src/js/Jencil.js", "43335:43487");
__$coverInitRange("src/js/Jencil.js", "43495:43659");
__$coverInitRange("src/js/Jencil.js", "43667:43712");
__$coverInitRange("src/js/Jencil.js", "43720:43813");
__$coverInitRange("src/js/Jencil.js", "43821:43919");
__$coverInitRange("src/js/Jencil.js", "42977:42995");
__$coverInitRange("src/js/Jencil.js", "43385:43433");
__$coverInitRange("src/js/Jencil.js", "43443:43477");
__$coverInitRange("src/js/Jencil.js", "43417:43423");
__$coverInitRange("src/js/Jencil.js", "43568:43651");
__$coverInitRange("src/js/Jencil.js", "43771:43805");
__$coverInitRange("src/js/Jencil.js", "43888:43909");
__$coverInitRange("src/js/Jencil.js", "43983:44088");
__$coverInitRange("src/js/Jencil.js", "44096:44122");
__$coverInitRange("src/js/Jencil.js", "44012:44036");
__$coverInitRange("src/js/Jencil.js", "44046:44059");
__$coverInitRange("src/js/Jencil.js", "44069:44080");
__$coverInitRange("src/js/Jencil.js", "44184:44205");
__$coverInitRange("src/js/Jencil.js", "44213:44224");
__$coverInitRange("src/js/Jencil.js", "44294:44311");
__$coverInitRange("src/js/Jencil.js", "44385:44409");
__$coverInitRange("src/js/Jencil.js", "44472:44518");
__$coverInitRange("src/js/Jencil.js", "44526:44574");
__$coverInitRange("src/js/Jencil.js", "44582:44593");
__$coverInitRange("src/js/Jencil.js", "44683:44692");
__$coverInitRange("src/js/Jencil.js", "44700:44739");
__$coverInitRange("src/js/Jencil.js", "44747:44840");
__$coverInitRange("src/js/Jencil.js", "44784:44832");
__$coverInitRange("src/js/Jencil.js", "44924:44989");
__$coverInitRange("src/js/Jencil.js", "44997:45146");
__$coverInitRange("src/js/Jencil.js", "45154:45191");
__$coverInitRange("src/js/Jencil.js", "44961:44981");
__$coverInitRange("src/js/Jencil.js", "45024:45072");
__$coverInitRange("src/js/Jencil.js", "45082:45108");
__$coverInitRange("src/js/Jencil.js", "45118:45138");
__$coverInitRange("src/js/Jencil.js", "45274:45339");
__$coverInitRange("src/js/Jencil.js", "45347:45387");
__$coverInitRange("src/js/Jencil.js", "45395:45447");
__$coverInitRange("src/js/Jencil.js", "45455:45481");
__$coverInitRange("src/js/Jencil.js", "45489:45509");
__$coverInitRange("src/js/Jencil.js", "45311:45331");
__$coverInitRange("src/js/Jencil.js", "45596:45661");
__$coverInitRange("src/js/Jencil.js", "45669:45709");
__$coverInitRange("src/js/Jencil.js", "45717:45773");
__$coverInitRange("src/js/Jencil.js", "45781:45807");
__$coverInitRange("src/js/Jencil.js", "45815:45835");
__$coverInitRange("src/js/Jencil.js", "45633:45653");
__$coverInitRange("src/js/Jencil.js", "45921:45986");
__$coverInitRange("src/js/Jencil.js", "45994:46034");
__$coverInitRange("src/js/Jencil.js", "46042:46097");
__$coverInitRange("src/js/Jencil.js", "46105:46131");
__$coverInitRange("src/js/Jencil.js", "46139:46159");
__$coverInitRange("src/js/Jencil.js", "45958:45978");
__$coverInitRange("src/js/Jencil.js", "46266:46297");
__$coverInitRange("src/js/Jencil.js", "46303:46341");
__$coverInitRange("src/js/Jencil.js", "46390:46419");
__$coverInitRange("src/js/Jencil.js", "46426:46658");
__$coverInitRange("src/js/Jencil.js", "46665:46771");
__$coverInitRange("src/js/Jencil.js", "46778:46795");
__$coverInitRange("src/js/Jencil.js", "46479:46537");
__$coverInitRange("src/js/Jencil.js", "46545:46613");
__$coverInitRange("src/js/Jencil.js", "46621:46652");
__$coverInitRange("src/js/Jencil.js", "46511:46529");
__$coverInitRange("src/js/Jencil.js", "46726:46764");
__$coverInitRange("src/js/Jencil.js", "46856:46889");
__$coverInitRange("src/js/Jencil.js", "46896:48775");
__$coverInitRange("src/js/Jencil.js", "48782:48865");
__$coverInitRange("src/js/Jencil.js", "48872:49277");
__$coverInitRange("src/js/Jencil.js", "49284:49461");
__$coverInitRange("src/js/Jencil.js", "49468:49489");
__$coverInitRange("src/js/Jencil.js", "46934:46987");
__$coverInitRange("src/js/Jencil.js", "46995:47051");
__$coverInitRange("src/js/Jencil.js", "47059:47117");
__$coverInitRange("src/js/Jencil.js", "47125:47168");
__$coverInitRange("src/js/Jencil.js", "47176:47432");
__$coverInitRange("src/js/Jencil.js", "47440:47474");
__$coverInitRange("src/js/Jencil.js", "47482:47516");
__$coverInitRange("src/js/Jencil.js", "47524:47846");
__$coverInitRange("src/js/Jencil.js", "47854:48481");
__$coverInitRange("src/js/Jencil.js", "48489:48769");
__$coverInitRange("src/js/Jencil.js", "47564:47574");
__$coverInitRange("src/js/Jencil.js", "47584:47604");
__$coverInitRange("src/js/Jencil.js", "47614:47784");
__$coverInitRange("src/js/Jencil.js", "47794:47837");
__$coverInitRange("src/js/Jencil.js", "47662:47700");
__$coverInitRange("src/js/Jencil.js", "47729:47774");
__$coverInitRange("src/js/Jencil.js", "47900:47913");
__$coverInitRange("src/js/Jencil.js", "47923:48450");
__$coverInitRange("src/js/Jencil.js", "48460:48472");
__$coverInitRange("src/js/Jencil.js", "47962:48094");
__$coverInitRange("src/js/Jencil.js", "48106:48126");
__$coverInitRange("src/js/Jencil.js", "48138:48164");
__$coverInitRange("src/js/Jencil.js", "48176:48197");
__$coverInitRange("src/js/Jencil.js", "48209:48258");
__$coverInitRange("src/js/Jencil.js", "48270:48321");
__$coverInitRange("src/js/Jencil.js", "48333:48369");
__$coverInitRange("src/js/Jencil.js", "48381:48417");
__$coverInitRange("src/js/Jencil.js", "48429:48440");
__$coverInitRange("src/js/Jencil.js", "47980:48031");
__$coverInitRange("src/js/Jencil.js", "48069:48082");
__$coverInitRange("src/js/Jencil.js", "48556:48572");
__$coverInitRange("src/js/Jencil.js", "48582:48760");
__$coverInitRange("src/js/Jencil.js", "48675:48697");
__$coverInitRange("src/js/Jencil.js", "48711:48736");
__$coverInitRange("src/js/Jencil.js", "48833:48858");
__$coverInitRange("src/js/Jencil.js", "48937:49005");
__$coverInitRange("src/js/Jencil.js", "49013:49231");
__$coverInitRange("src/js/Jencil.js", "49239:49270");
__$coverInitRange("src/js/Jencil.js", "48991:48997");
__$coverInitRange("src/js/Jencil.js", "49058:49117");
__$coverInitRange("src/js/Jencil.js", "49173:49223");
__$coverInitRange("src/js/Jencil.js", "49337:49381");
__$coverInitRange("src/js/Jencil.js", "49389:49435");
__$coverInitRange("src/js/Jencil.js", "49443:49454");
__$coverInitRange("src/js/Jencil.js", "49551:49580");
__$coverInitRange("src/js/Jencil.js", "49587:49923");
__$coverInitRange("src/js/Jencil.js", "49930:50662");
__$coverInitRange("src/js/Jencil.js", "50669:50686");
__$coverInitRange("src/js/Jencil.js", "49629:49649");
__$coverInitRange("src/js/Jencil.js", "49657:49706");
__$coverInitRange("src/js/Jencil.js", "49714:49917");
__$coverInitRange("src/js/Jencil.js", "49833:49865");
__$coverInitRange("src/js/Jencil.js", "49991:50007");
__$coverInitRange("src/js/Jencil.js", "50015:50655");
__$coverInitRange("src/js/Jencil.js", "50066:50090");
__$coverInitRange("src/js/Jencil.js", "50100:50647");
__$coverInitRange("src/js/Jencil.js", "50330:50577");
__$coverInitRange("src/js/Jencil.js", "50591:50623");
__$coverInitRange("src/js/Jencil.js", "50382:50442");
__$coverInitRange("src/js/Jencil.js", "50511:50563");
__$coverInitRange("src/js/Jencil.js", "50766:50797");
__$coverInitRange("src/js/Jencil.js", "50803:50842");
__$coverInitRange("src/js/Jencil.js", "50848:50886");
__$coverInitRange("src/js/Jencil.js", "50935:50964");
__$coverInitRange("src/js/Jencil.js", "50971:51203");
__$coverInitRange("src/js/Jencil.js", "51210:51227");
__$coverInitRange("src/js/Jencil.js", "51024:51082");
__$coverInitRange("src/js/Jencil.js", "51090:51158");
__$coverInitRange("src/js/Jencil.js", "51166:51197");
__$coverInitRange("src/js/Jencil.js", "51056:51074");
__$coverInitRange("src/js/Jencil.js", "51288:51321");
__$coverInitRange("src/js/Jencil.js", "51328:53102");
__$coverInitRange("src/js/Jencil.js", "53109:53292");
__$coverInitRange("src/js/Jencil.js", "53299:53476");
__$coverInitRange("src/js/Jencil.js", "53483:53504");
__$coverInitRange("src/js/Jencil.js", "51366:51419");
__$coverInitRange("src/js/Jencil.js", "51427:51483");
__$coverInitRange("src/js/Jencil.js", "51491:51549");
__$coverInitRange("src/js/Jencil.js", "51557:51600");
__$coverInitRange("src/js/Jencil.js", "51608:51864");
__$coverInitRange("src/js/Jencil.js", "51872:51906");
__$coverInitRange("src/js/Jencil.js", "51914:51948");
__$coverInitRange("src/js/Jencil.js", "51956:52278");
__$coverInitRange("src/js/Jencil.js", "52286:52852");
__$coverInitRange("src/js/Jencil.js", "52860:53096");
__$coverInitRange("src/js/Jencil.js", "51996:52006");
__$coverInitRange("src/js/Jencil.js", "52016:52036");
__$coverInitRange("src/js/Jencil.js", "52046:52216");
__$coverInitRange("src/js/Jencil.js", "52226:52269");
__$coverInitRange("src/js/Jencil.js", "52094:52132");
__$coverInitRange("src/js/Jencil.js", "52161:52206");
__$coverInitRange("src/js/Jencil.js", "52332:52345");
__$coverInitRange("src/js/Jencil.js", "52355:52821");
__$coverInitRange("src/js/Jencil.js", "52831:52843");
__$coverInitRange("src/js/Jencil.js", "52394:52526");
__$coverInitRange("src/js/Jencil.js", "52538:52558");
__$coverInitRange("src/js/Jencil.js", "52570:52596");
__$coverInitRange("src/js/Jencil.js", "52608:52629");
__$coverInitRange("src/js/Jencil.js", "52641:52692");
__$coverInitRange("src/js/Jencil.js", "52704:52740");
__$coverInitRange("src/js/Jencil.js", "52752:52788");
__$coverInitRange("src/js/Jencil.js", "52800:52811");
__$coverInitRange("src/js/Jencil.js", "52412:52463");
__$coverInitRange("src/js/Jencil.js", "52501:52514");
__$coverInitRange("src/js/Jencil.js", "52920:52936");
__$coverInitRange("src/js/Jencil.js", "52946:53087");
__$coverInitRange("src/js/Jencil.js", "53039:53063");
__$coverInitRange("src/js/Jencil.js", "53160:53178");
__$coverInitRange("src/js/Jencil.js", "53186:53285");
__$coverInitRange("src/js/Jencil.js", "53227:53277");
__$coverInitRange("src/js/Jencil.js", "53352:53396");
__$coverInitRange("src/js/Jencil.js", "53404:53450");
__$coverInitRange("src/js/Jencil.js", "53458:53469");
__$coverInitRange("src/js/Jencil.js", "53580:53611");
__$coverInitRange("src/js/Jencil.js", "53617:53663");
__$coverInitRange("src/js/Jencil.js", "53711:53739");
__$coverInitRange("src/js/Jencil.js", "53746:53885");
__$coverInitRange("src/js/Jencil.js", "53892:53908");
__$coverInitRange("src/js/Jencil.js", "53779:53837");
__$coverInitRange("src/js/Jencil.js", "53845:53879");
__$coverInitRange("src/js/Jencil.js", "53962:53987");
__$coverInitRange("src/js/Jencil.js", "53994:54445");
__$coverInitRange("src/js/Jencil.js", "54452:54558");
__$coverInitRange("src/js/Jencil.js", "54565:54669");
__$coverInitRange("src/js/Jencil.js", "54676:54760");
__$coverInitRange("src/js/Jencil.js", "54767:54832");
__$coverInitRange("src/js/Jencil.js", "54839:54852");
__$coverInitRange("src/js/Jencil.js", "54043:54059");
__$coverInitRange("src/js/Jencil.js", "54067:54083");
__$coverInitRange("src/js/Jencil.js", "54091:54109");
__$coverInitRange("src/js/Jencil.js", "54117:54169");
__$coverInitRange("src/js/Jencil.js", "54177:54221");
__$coverInitRange("src/js/Jencil.js", "54229:54275");
__$coverInitRange("src/js/Jencil.js", "54283:54329");
__$coverInitRange("src/js/Jencil.js", "54337:54393");
__$coverInitRange("src/js/Jencil.js", "54401:54439");
__$coverInitRange("src/js/Jencil.js", "54497:54532");
__$coverInitRange("src/js/Jencil.js", "54540:54551");
__$coverInitRange("src/js/Jencil.js", "54611:54643");
__$coverInitRange("src/js/Jencil.js", "54651:54662");
__$coverInitRange("src/js/Jencil.js", "54719:54734");
__$coverInitRange("src/js/Jencil.js", "54742:54753");
__$coverInitRange("src/js/Jencil.js", "54814:54825");
__$coverInitRange("src/js/Jencil.js", "54912:54943");
__$coverInitRange("src/js/Jencil.js", "54950:55692");
__$coverInitRange("src/js/Jencil.js", "55699:55718");
__$coverInitRange("src/js/Jencil.js", "55025:55041");
__$coverInitRange("src/js/Jencil.js", "55049:55073");
__$coverInitRange("src/js/Jencil.js", "55081:55151");
__$coverInitRange("src/js/Jencil.js", "55159:55309");
__$coverInitRange("src/js/Jencil.js", "55317:55345");
__$coverInitRange("src/js/Jencil.js", "55353:55426");
__$coverInitRange("src/js/Jencil.js", "55434:55686");
__$coverInitRange("src/js/Jencil.js", "55196:55278");
__$coverInitRange("src/js/Jencil.js", "55288:55300");
__$coverInitRange("src/js/Jencil.js", "55248:55268");
__$coverInitRange("src/js/Jencil.js", "55393:55416");
__$coverInitRange("src/js/Jencil.js", "55502:55596");
__$coverInitRange("src/js/Jencil.js", "55606:55678");
__$coverInitRange("src/js/Jencil.js", "55561:55584");
__$coverInitRange("src/js/Jencil.js", "55779:55811");
__$coverInitRange("src/js/Jencil.js", "55818:56176");
__$coverInitRange("src/js/Jencil.js", "56183:56385");
__$coverInitRange("src/js/Jencil.js", "56392:57340");
__$coverInitRange("src/js/Jencil.js", "57347:57367");
__$coverInitRange("src/js/Jencil.js", "55893:55905");
__$coverInitRange("src/js/Jencil.js", "55913:55935");
__$coverInitRange("src/js/Jencil.js", "55943:56071");
__$coverInitRange("src/js/Jencil.js", "56079:56170");
__$coverInitRange("src/js/Jencil.js", "55975:55985");
__$coverInitRange("src/js/Jencil.js", "55995:56017");
__$coverInitRange("src/js/Jencil.js", "56027:56062");
__$coverInitRange("src/js/Jencil.js", "56237:56247");
__$coverInitRange("src/js/Jencil.js", "56255:56282");
__$coverInitRange("src/js/Jencil.js", "56290:56359");
__$coverInitRange("src/js/Jencil.js", "56367:56378");
__$coverInitRange("src/js/Jencil.js", "56337:56351");
__$coverInitRange("src/js/Jencil.js", "56445:56485");
__$coverInitRange("src/js/Jencil.js", "56493:56540");
__$coverInitRange("src/js/Jencil.js", "56548:57257");
__$coverInitRange("src/js/Jencil.js", "57265:57333");
__$coverInitRange("src/js/Jencil.js", "56597:56611");
__$coverInitRange("src/js/Jencil.js", "56623:56637");
__$coverInitRange("src/js/Jencil.js", "56649:56664");
__$coverInitRange("src/js/Jencil.js", "56676:56693");
__$coverInitRange("src/js/Jencil.js", "56705:56723");
__$coverInitRange("src/js/Jencil.js", "56735:56740");
__$coverInitRange("src/js/Jencil.js", "56768:56782");
__$coverInitRange("src/js/Jencil.js", "56794:56816");
__$coverInitRange("src/js/Jencil.js", "56828:56845");
__$coverInitRange("src/js/Jencil.js", "56857:56875");
__$coverInitRange("src/js/Jencil.js", "56887:56892");
__$coverInitRange("src/js/Jencil.js", "56920:56944");
__$coverInitRange("src/js/Jencil.js", "56956:56978");
__$coverInitRange("src/js/Jencil.js", "56990:57008");
__$coverInitRange("src/js/Jencil.js", "57020:57025");
__$coverInitRange("src/js/Jencil.js", "57053:57077");
__$coverInitRange("src/js/Jencil.js", "57089:57111");
__$coverInitRange("src/js/Jencil.js", "57123:57138");
__$coverInitRange("src/js/Jencil.js", "57150:57155");
__$coverInitRange("src/js/Jencil.js", "57183:57222");
__$coverInitRange("src/js/Jencil.js", "57234:57249");
__$coverInitRange("src/js/Jencil.js", "57431:57460");
__$coverInitRange("src/js/Jencil.js", "57467:57726");
__$coverInitRange("src/js/Jencil.js", "57733:58051");
__$coverInitRange("src/js/Jencil.js", "58058:58075");
__$coverInitRange("src/js/Jencil.js", "57501:57535");
__$coverInitRange("src/js/Jencil.js", "57543:57619");
__$coverInitRange("src/js/Jencil.js", "57627:57720");
__$coverInitRange("src/js/Jencil.js", "57576:57610");
__$coverInitRange("src/js/Jencil.js", "57780:57811");
__$coverInitRange("src/js/Jencil.js", "57819:58022");
__$coverInitRange("src/js/Jencil.js", "58030:58044");
__$coverInitRange("src/js/Jencil.js", "57848:57974");
__$coverInitRange("src/js/Jencil.js", "57984:58013");
__$coverInitRange("src/js/Jencil.js", "57906:57921");
__$coverInitRange("src/js/Jencil.js", "57950:57964");
__$coverInitRange("src/js/Jencil.js", "58139:58168");
__$coverInitRange("src/js/Jencil.js", "58175:58440");
__$coverInitRange("src/js/Jencil.js", "58447:58765");
__$coverInitRange("src/js/Jencil.js", "58772:58789");
__$coverInitRange("src/js/Jencil.js", "58209:58243");
__$coverInitRange("src/js/Jencil.js", "58251:58327");
__$coverInitRange("src/js/Jencil.js", "58335:58434");
__$coverInitRange("src/js/Jencil.js", "58284:58318");
__$coverInitRange("src/js/Jencil.js", "58494:58525");
__$coverInitRange("src/js/Jencil.js", "58533:58736");
__$coverInitRange("src/js/Jencil.js", "58744:58758");
__$coverInitRange("src/js/Jencil.js", "58562:58688");
__$coverInitRange("src/js/Jencil.js", "58698:58727");
__$coverInitRange("src/js/Jencil.js", "58620:58635");
__$coverInitRange("src/js/Jencil.js", "58664:58678");
__$coverInitRange("src/js/Jencil.js", "58859:58894");
__$coverInitRange("src/js/Jencil.js", "58901:59200");
__$coverInitRange("src/js/Jencil.js", "59207:59578");
__$coverInitRange("src/js/Jencil.js", "59585:59608");
__$coverInitRange("src/js/Jencil.js", "58941:58975");
__$coverInitRange("src/js/Jencil.js", "58983:59062");
__$coverInitRange("src/js/Jencil.js", "59070:59194");
__$coverInitRange("src/js/Jencil.js", "59016:59053");
__$coverInitRange("src/js/Jencil.js", "59260:59291");
__$coverInitRange("src/js/Jencil.js", "59299:59549");
__$coverInitRange("src/js/Jencil.js", "59557:59571");
__$coverInitRange("src/js/Jencil.js", "59328:59501");
__$coverInitRange("src/js/Jencil.js", "59511:59540");
__$coverInitRange("src/js/Jencil.js", "59399:59429");
__$coverInitRange("src/js/Jencil.js", "59458:59491");
__$coverInitRange("src/js/Jencil.js", "59674:59705");
__$coverInitRange("src/js/Jencil.js", "59712:59990");
__$coverInitRange("src/js/Jencil.js", "59997:60165");
__$coverInitRange("src/js/Jencil.js", "60172:60582");
__$coverInitRange("src/js/Jencil.js", "60589:60608");
__$coverInitRange("src/js/Jencil.js", "59748:59782");
__$coverInitRange("src/js/Jencil.js", "59790:59867");
__$coverInitRange("src/js/Jencil.js", "59875:59984");
__$coverInitRange("src/js/Jencil.js", "59823:59858");
__$coverInitRange("src/js/Jencil.js", "60050:60139");
__$coverInitRange("src/js/Jencil.js", "60147:60158");
__$coverInitRange("src/js/Jencil.js", "60095:60109");
__$coverInitRange("src/js/Jencil.js", "60119:60131");
__$coverInitRange("src/js/Jencil.js", "60221:60252");
__$coverInitRange("src/js/Jencil.js", "60260:60306");
__$coverInitRange("src/js/Jencil.js", "60314:60553");
__$coverInitRange("src/js/Jencil.js", "60561:60575");
__$coverInitRange("src/js/Jencil.js", "60292:60298");
__$coverInitRange("src/js/Jencil.js", "60343:60505");
__$coverInitRange("src/js/Jencil.js", "60515:60544");
__$coverInitRange("src/js/Jencil.js", "60403:60433");
__$coverInitRange("src/js/Jencil.js", "60462:60495");
__$coverInitRange("src/js/Jencil.js", "60674:60705");
__$coverInitRange("src/js/Jencil.js", "60712:60978");
__$coverInitRange("src/js/Jencil.js", "60985:61143");
__$coverInitRange("src/js/Jencil.js", "61150:61560");
__$coverInitRange("src/js/Jencil.js", "61567:61586");
__$coverInitRange("src/js/Jencil.js", "60748:60782");
__$coverInitRange("src/js/Jencil.js", "60790:60867");
__$coverInitRange("src/js/Jencil.js", "60875:60972");
__$coverInitRange("src/js/Jencil.js", "60823:60858");
__$coverInitRange("src/js/Jencil.js", "61038:61117");
__$coverInitRange("src/js/Jencil.js", "61125:61136");
__$coverInitRange("src/js/Jencil.js", "61073:61087");
__$coverInitRange("src/js/Jencil.js", "61097:61109");
__$coverInitRange("src/js/Jencil.js", "61199:61230");
__$coverInitRange("src/js/Jencil.js", "61238:61284");
__$coverInitRange("src/js/Jencil.js", "61292:61531");
__$coverInitRange("src/js/Jencil.js", "61539:61553");
__$coverInitRange("src/js/Jencil.js", "61270:61276");
__$coverInitRange("src/js/Jencil.js", "61321:61483");
__$coverInitRange("src/js/Jencil.js", "61493:61522");
__$coverInitRange("src/js/Jencil.js", "61381:61411");
__$coverInitRange("src/js/Jencil.js", "61440:61473");
__$coverInitRange("src/js/Jencil.js", "61656:61739");
__$coverInitRange("src/js/Jencil.js", "61745:62287");
__$coverInitRange("src/js/Jencil.js", "62293:62315");
__$coverInitRange("src/js/Jencil.js", "61692:61733");
__$coverInitRange("src/js/Jencil.js", "61784:62281");
__$coverInitRange("src/js/Jencil.js", "61837:61863");
__$coverInitRange("src/js/Jencil.js", "61896:61923");
__$coverInitRange("src/js/Jencil.js", "61956:61983");
__$coverInitRange("src/js/Jencil.js", "62022:62055");
__$coverInitRange("src/js/Jencil.js", "62090:62119");
__$coverInitRange("src/js/Jencil.js", "62154:62183");
__$coverInitRange("src/js/Jencil.js", "62212:62273");
__$coverInitRange("src/js/Jencil.js", "62377:62406");
__$coverInitRange("src/js/Jencil.js", "62412:62435");
__$coverInitRange("src/js/Jencil.js", "62441:62476");
__$coverInitRange("src/js/Jencil.js", "62482:62519");
__$coverInitRange("src/js/Jencil.js", "62525:62556");
__$coverInitRange("src/js/Jencil.js", "62562:62593");
__$coverInitRange("src/js/Jencil.js", "62599:62642");
__$coverInitRange("src/js/Jencil.js", "62648:62683");
__$coverInitRange("src/js/Jencil.js", "62689:62724");
__$coverInitRange("src/js/Jencil.js", "62730:62774");
__$coverInitRange("src/js/Jencil.js", "62820:62846");
__$coverInitRange("src/js/Jencil.js", "62853:65035");
__$coverInitRange("src/js/Jencil.js", "65042:65621");
__$coverInitRange("src/js/Jencil.js", "65628:65863");
__$coverInitRange("src/js/Jencil.js", "65870:65884");
__$coverInitRange("src/js/Jencil.js", "62899:62915");
__$coverInitRange("src/js/Jencil.js", "62923:62969");
__$coverInitRange("src/js/Jencil.js", "62977:63016");
__$coverInitRange("src/js/Jencil.js", "63024:63049");
__$coverInitRange("src/js/Jencil.js", "63057:63084");
__$coverInitRange("src/js/Jencil.js", "63092:63133");
__$coverInitRange("src/js/Jencil.js", "63141:63186");
__$coverInitRange("src/js/Jencil.js", "63194:65029");
__$coverInitRange("src/js/Jencil.js", "63246:63289");
__$coverInitRange("src/js/Jencil.js", "63301:63445");
__$coverInitRange("src/js/Jencil.js", "63457:63603");
__$coverInitRange("src/js/Jencil.js", "63615:63761");
__$coverInitRange("src/js/Jencil.js", "63773:63794");
__$coverInitRange("src/js/Jencil.js", "63357:63433");
__$coverInitRange("src/js/Jencil.js", "63409:63419");
__$coverInitRange("src/js/Jencil.js", "63514:63591");
__$coverInitRange("src/js/Jencil.js", "63567:63577");
__$coverInitRange("src/js/Jencil.js", "63672:63749");
__$coverInitRange("src/js/Jencil.js", "63725:63735");
__$coverInitRange("src/js/Jencil.js", "63847:63890");
__$coverInitRange("src/js/Jencil.js", "63902:64051");
__$coverInitRange("src/js/Jencil.js", "64063:64214");
__$coverInitRange("src/js/Jencil.js", "64226:64377");
__$coverInitRange("src/js/Jencil.js", "64389:64410");
__$coverInitRange("src/js/Jencil.js", "63958:64039");
__$coverInitRange("src/js/Jencil.js", "64010:64025");
__$coverInitRange("src/js/Jencil.js", "64120:64202");
__$coverInitRange("src/js/Jencil.js", "64173:64188");
__$coverInitRange("src/js/Jencil.js", "64283:64365");
__$coverInitRange("src/js/Jencil.js", "64336:64351");
__$coverInitRange("src/js/Jencil.js", "64459:64502");
__$coverInitRange("src/js/Jencil.js", "64514:64659");
__$coverInitRange("src/js/Jencil.js", "64671:64818");
__$coverInitRange("src/js/Jencil.js", "64830:64977");
__$coverInitRange("src/js/Jencil.js", "64989:65010");
__$coverInitRange("src/js/Jencil.js", "64570:64647");
__$coverInitRange("src/js/Jencil.js", "64622:64633");
__$coverInitRange("src/js/Jencil.js", "64728:64806");
__$coverInitRange("src/js/Jencil.js", "64781:64792");
__$coverInitRange("src/js/Jencil.js", "64887:64965");
__$coverInitRange("src/js/Jencil.js", "64940:64951");
__$coverInitRange("src/js/Jencil.js", "65107:65123");
__$coverInitRange("src/js/Jencil.js", "65131:65513");
__$coverInitRange("src/js/Jencil.js", "65521:65566");
__$coverInitRange("src/js/Jencil.js", "65574:65595");
__$coverInitRange("src/js/Jencil.js", "65603:65614");
__$coverInitRange("src/js/Jencil.js", "65219:65505");
__$coverInitRange("src/js/Jencil.js", "65286:65311");
__$coverInitRange("src/js/Jencil.js", "65369:65399");
__$coverInitRange("src/js/Jencil.js", "65455:65481");
__$coverInitRange("src/js/Jencil.js", "65674:65735");
__$coverInitRange("src/js/Jencil.js", "65743:65806");
__$coverInitRange("src/js/Jencil.js", "65814:65837");
__$coverInitRange("src/js/Jencil.js", "65845:65856");
__$coverInitRange("src/js/Jencil.js", "65940:65968");
__$coverInitRange("src/js/Jencil.js", "65975:66104");
__$coverInitRange("src/js/Jencil.js", "66111:67948");
__$coverInitRange("src/js/Jencil.js", "67955:68092");
__$coverInitRange("src/js/Jencil.js", "68099:68798");
__$coverInitRange("src/js/Jencil.js", "68805:69026");
__$coverInitRange("src/js/Jencil.js", "69033:69049");
__$coverInitRange("src/js/Jencil.js", "66008:66056");
__$coverInitRange("src/js/Jencil.js", "66064:66098");
__$coverInitRange("src/js/Jencil.js", "66181:66270");
__$coverInitRange("src/js/Jencil.js", "66278:67913");
__$coverInitRange("src/js/Jencil.js", "67921:67941");
__$coverInitRange("src/js/Jencil.js", "66323:66465");
__$coverInitRange("src/js/Jencil.js", "66475:66543");
__$coverInitRange("src/js/Jencil.js", "66553:66633");
__$coverInitRange("src/js/Jencil.js", "66643:66726");
__$coverInitRange("src/js/Jencil.js", "66736:66756");
__$coverInitRange("src/js/Jencil.js", "66766:66829");
__$coverInitRange("src/js/Jencil.js", "66839:66943");
__$coverInitRange("src/js/Jencil.js", "66953:67118");
__$coverInitRange("src/js/Jencil.js", "67128:67165");
__$coverInitRange("src/js/Jencil.js", "67175:67205");
__$coverInitRange("src/js/Jencil.js", "67215:67401");
__$coverInitRange("src/js/Jencil.js", "67411:67452");
__$coverInitRange("src/js/Jencil.js", "67462:67494");
__$coverInitRange("src/js/Jencil.js", "67504:67694");
__$coverInitRange("src/js/Jencil.js", "67704:67745");
__$coverInitRange("src/js/Jencil.js", "67755:67798");
__$coverInitRange("src/js/Jencil.js", "67808:67851");
__$coverInitRange("src/js/Jencil.js", "67861:67884");
__$coverInitRange("src/js/Jencil.js", "67894:67905");
__$coverInitRange("src/js/Jencil.js", "66382:66455");
__$coverInitRange("src/js/Jencil.js", "66900:66933");
__$coverInitRange("src/js/Jencil.js", "67015:67108");
__$coverInitRange("src/js/Jencil.js", "67058:67094");
__$coverInitRange("src/js/Jencil.js", "67278:67296");
__$coverInitRange("src/js/Jencil.js", "67308:67349");
__$coverInitRange("src/js/Jencil.js", "67361:67391");
__$coverInitRange("src/js/Jencil.js", "67569:67587");
__$coverInitRange("src/js/Jencil.js", "67599:67640");
__$coverInitRange("src/js/Jencil.js", "67652:67684");
__$coverInitRange("src/js/Jencil.js", "68001:68020");
__$coverInitRange("src/js/Jencil.js", "68028:68049");
__$coverInitRange("src/js/Jencil.js", "68057:68085");
__$coverInitRange("src/js/Jencil.js", "68147:68167");
__$coverInitRange("src/js/Jencil.js", "68175:68234");
__$coverInitRange("src/js/Jencil.js", "68242:68303");
__$coverInitRange("src/js/Jencil.js", "68311:68372");
__$coverInitRange("src/js/Jencil.js", "68380:68443");
__$coverInitRange("src/js/Jencil.js", "68451:68474");
__$coverInitRange("src/js/Jencil.js", "68482:68530");
__$coverInitRange("src/js/Jencil.js", "68538:68588");
__$coverInitRange("src/js/Jencil.js", "68596:68681");
__$coverInitRange("src/js/Jencil.js", "68689:68710");
__$coverInitRange("src/js/Jencil.js", "68718:68741");
__$coverInitRange("src/js/Jencil.js", "68749:68772");
__$coverInitRange("src/js/Jencil.js", "68780:68791");
__$coverInitRange("src/js/Jencil.js", "68858:69019");
__$coverInitRange("src/js/Jencil.js", "68930:69011");
__$coverInitRange("src/js/Jencil.js", "69099:69121");
__$coverInitRange("src/js/Jencil.js", "69128:69229");
__$coverInitRange("src/js/Jencil.js", "69236:69472");
__$coverInitRange("src/js/Jencil.js", "69479:69613");
__$coverInitRange("src/js/Jencil.js", "69620:69630");
__$coverInitRange("src/js/Jencil.js", "69155:69197");
__$coverInitRange("src/js/Jencil.js", "69205:69223");
__$coverInitRange("src/js/Jencil.js", "69276:69302");
__$coverInitRange("src/js/Jencil.js", "69310:69330");
__$coverInitRange("src/js/Jencil.js", "69338:69446");
__$coverInitRange("src/js/Jencil.js", "69454:69465");
__$coverInitRange("src/js/Jencil.js", "69398:69415");
__$coverInitRange("src/js/Jencil.js", "69425:69438");
__$coverInitRange("src/js/Jencil.js", "69530:69556");
__$coverInitRange("src/js/Jencil.js", "69564:69606");
__$coverInitRange("src/js/Jencil.js", "69684:69710");
__$coverInitRange("src/js/Jencil.js", "69717:69840");
__$coverInitRange("src/js/Jencil.js", "69847:69861");
__$coverInitRange("src/js/Jencil.js", "69748:69794");
__$coverInitRange("src/js/Jencil.js", "69802:69834");
__$coverInitRange("src/js/Jencil.js", "69915:69943");
__$coverInitRange("src/js/Jencil.js", "69950:70079");
__$coverInitRange("src/js/Jencil.js", "70086:70102");
__$coverInitRange("src/js/Jencil.js", "69983:70031");
__$coverInitRange("src/js/Jencil.js", "70039:70073");
__$coverInitRange("src/js/Jencil.js", "70173:70198");
__$coverInitRange("src/js/Jencil.js", "70204:70233");
__$coverInitRange("src/js/Jencil.js", "70239:70256");
__$coverInitRange("src/js/Jencil.js", "70262:70287");
__$coverInitRange("src/js/Jencil.js", "70293:70329");
__$coverInitRange("src/js/Jencil.js", "70378:70407");
__$coverInitRange("src/js/Jencil.js", "70414:71577");
__$coverInitRange("src/js/Jencil.js", "71584:71711");
__$coverInitRange("src/js/Jencil.js", "71718:72767");
__$coverInitRange("src/js/Jencil.js", "72774:72791");
__$coverInitRange("src/js/Jencil.js", "70468:70504");
__$coverInitRange("src/js/Jencil.js", "70512:70526");
__$coverInitRange("src/js/Jencil.js", "70534:70548");
__$coverInitRange("src/js/Jencil.js", "70556:70580");
__$coverInitRange("src/js/Jencil.js", "70588:70637");
__$coverInitRange("src/js/Jencil.js", "70645:70675");
__$coverInitRange("src/js/Jencil.js", "70683:70720");
__$coverInitRange("src/js/Jencil.js", "70728:70770");
__$coverInitRange("src/js/Jencil.js", "70778:70815");
__$coverInitRange("src/js/Jencil.js", "70823:70958");
__$coverInitRange("src/js/Jencil.js", "70966:71100");
__$coverInitRange("src/js/Jencil.js", "71108:71232");
__$coverInitRange("src/js/Jencil.js", "71240:71260");
__$coverInitRange("src/js/Jencil.js", "71268:71288");
__$coverInitRange("src/js/Jencil.js", "71296:71420");
__$coverInitRange("src/js/Jencil.js", "71428:71448");
__$coverInitRange("src/js/Jencil.js", "71456:71476");
__$coverInitRange("src/js/Jencil.js", "71484:71571");
__$coverInitRange("src/js/Jencil.js", "70859:70949");
__$coverInitRange("src/js/Jencil.js", "70905:70939");
__$coverInitRange("src/js/Jencil.js", "71002:71091");
__$coverInitRange("src/js/Jencil.js", "71047:71081");
__$coverInitRange("src/js/Jencil.js", "71170:71223");
__$coverInitRange("src/js/Jencil.js", "71358:71411");
__$coverInitRange("src/js/Jencil.js", "71536:71561");
__$coverInitRange("src/js/Jencil.js", "71631:71651");
__$coverInitRange("src/js/Jencil.js", "71659:71674");
__$coverInitRange("src/js/Jencil.js", "71682:71704");
__$coverInitRange("src/js/Jencil.js", "71800:71866");
__$coverInitRange("src/js/Jencil.js", "71874:71925");
__$coverInitRange("src/js/Jencil.js", "71933:71964");
__$coverInitRange("src/js/Jencil.js", "71972:71991");
__$coverInitRange("src/js/Jencil.js", "71999:72326");
__$coverInitRange("src/js/Jencil.js", "72334:72362");
__$coverInitRange("src/js/Jencil.js", "72370:72523");
__$coverInitRange("src/js/Jencil.js", "72531:72760");
__$coverInitRange("src/js/Jencil.js", "71911:71917");
__$coverInitRange("src/js/Jencil.js", "72041:72049");
__$coverInitRange("src/js/Jencil.js", "72059:72097");
__$coverInitRange("src/js/Jencil.js", "72107:72134");
__$coverInitRange("src/js/Jencil.js", "72159:72225");
__$coverInitRange("src/js/Jencil.js", "72235:72282");
__$coverInitRange("src/js/Jencil.js", "72292:72318");
__$coverInitRange("src/js/Jencil.js", "72263:72272");
__$coverInitRange("src/js/Jencil.js", "72406:72435");
__$coverInitRange("src/js/Jencil.js", "72445:72514");
__$coverInitRange("src/js/Jencil.js", "72669:72704");
__$coverInitRange("src/js/Jencil.js", "72851:72883");
__$coverInitRange("src/js/Jencil.js", "72890:73233");
__$coverInitRange("src/js/Jencil.js", "73240:73540");
__$coverInitRange("src/js/Jencil.js", "73547:73567");
__$coverInitRange("src/js/Jencil.js", "72952:72964");
__$coverInitRange("src/js/Jencil.js", "72972:73036");
__$coverInitRange("src/js/Jencil.js", "73044:73106");
__$coverInitRange("src/js/Jencil.js", "73114:73186");
__$coverInitRange("src/js/Jencil.js", "73194:73227");
__$coverInitRange("src/js/Jencil.js", "73009:73028");
__$coverInitRange("src/js/Jencil.js", "73292:73349");
__$coverInitRange("src/js/Jencil.js", "73357:73414");
__$coverInitRange("src/js/Jencil.js", "73422:73484");
__$coverInitRange("src/js/Jencil.js", "73492:73514");
__$coverInitRange("src/js/Jencil.js", "73522:73533");
__$coverInitRange("src/js/Jencil.js", "73634:73668");
__$coverInitRange("src/js/Jencil.js", "73675:74026");
__$coverInitRange("src/js/Jencil.js", "74033:74329");
__$coverInitRange("src/js/Jencil.js", "74336:74358");
__$coverInitRange("src/js/Jencil.js", "73739:73751");
__$coverInitRange("src/js/Jencil.js", "73759:73823");
__$coverInitRange("src/js/Jencil.js", "73831:73895");
__$coverInitRange("src/js/Jencil.js", "73903:73977");
__$coverInitRange("src/js/Jencil.js", "73985:74020");
__$coverInitRange("src/js/Jencil.js", "73796:73815");
__$coverInitRange("src/js/Jencil.js", "74087:74142");
__$coverInitRange("src/js/Jencil.js", "74150:74205");
__$coverInitRange("src/js/Jencil.js", "74213:74273");
__$coverInitRange("src/js/Jencil.js", "74281:74303");
__$coverInitRange("src/js/Jencil.js", "74311:74322");
__$coverInitRange("src/js/Jencil.js", "74438:74469");
__$coverInitRange("src/js/Jencil.js", "74475:74512");
__$coverInitRange("src/js/Jencil.js", "74518:74566");
__$coverInitRange("src/js/Jencil.js", "74612:74805");
__$coverInitRange("src/js/Jencil.js", "74812:74832");
__$coverInitRange("src/js/Jencil.js", "74658:74673");
__$coverInitRange("src/js/Jencil.js", "74681:74724");
__$coverInitRange("src/js/Jencil.js", "74732:74773");
__$coverInitRange("src/js/Jencil.js", "74781:74799");
__$coverInitRange("src/js/Jencil.js", "74885:74915");
__$coverInitRange("src/js/Jencil.js", "74922:75365");
__$coverInitRange("src/js/Jencil.js", "75372:75526");
__$coverInitRange("src/js/Jencil.js", "75533:75551");
__$coverInitRange("src/js/Jencil.js", "74966:74982");
__$coverInitRange("src/js/Jencil.js", "74990:75038");
__$coverInitRange("src/js/Jencil.js", "75046:75094");
__$coverInitRange("src/js/Jencil.js", "75102:75211");
__$coverInitRange("src/js/Jencil.js", "75219:75253");
__$coverInitRange("src/js/Jencil.js", "75261:75359");
__$coverInitRange("src/js/Jencil.js", "75311:75349");
__$coverInitRange("src/js/Jencil.js", "75420:75457");
__$coverInitRange("src/js/Jencil.js", "75465:75519");
__$coverInitRange("src/js/Jencil.js", "75618:75649");
__$coverInitRange("src/js/Jencil.js", "75656:76271");
__$coverInitRange("src/js/Jencil.js", "76278:76434");
__$coverInitRange("src/js/Jencil.js", "76441:76460");
__$coverInitRange("src/js/Jencil.js", "75701:75717");
__$coverInitRange("src/js/Jencil.js", "75725:75773");
__$coverInitRange("src/js/Jencil.js", "75781:75829");
__$coverInitRange("src/js/Jencil.js", "75837:75885");
__$coverInitRange("src/js/Jencil.js", "75893:75996");
__$coverInitRange("src/js/Jencil.js", "76004:76117");
__$coverInitRange("src/js/Jencil.js", "76125:76159");
__$coverInitRange("src/js/Jencil.js", "76167:76265");
__$coverInitRange("src/js/Jencil.js", "76217:76255");
__$coverInitRange("src/js/Jencil.js", "76327:76365");
__$coverInitRange("src/js/Jencil.js", "76373:76427");
__$coverInitRange("src/js/Jencil.js", "76544:76581");
__$coverInitRange("src/js/Jencil.js", "76587:76620");
__$coverInitRange("src/js/Jencil.js", "76626:76668");
__$coverInitRange("src/js/Jencil.js", "76717:76746");
__$coverInitRange("src/js/Jencil.js", "76753:78050");
__$coverInitRange("src/js/Jencil.js", "78057:78757");
__$coverInitRange("src/js/Jencil.js", "78764:79172");
__$coverInitRange("src/js/Jencil.js", "79179:79501");
__$coverInitRange("src/js/Jencil.js", "79508:79525");
__$coverInitRange("src/js/Jencil.js", "76787:76803");
__$coverInitRange("src/js/Jencil.js", "76811:76860");
__$coverInitRange("src/js/Jencil.js", "76868:76903");
__$coverInitRange("src/js/Jencil.js", "76911:77082");
__$coverInitRange("src/js/Jencil.js", "77090:77135");
__$coverInitRange("src/js/Jencil.js", "77143:77379");
__$coverInitRange("src/js/Jencil.js", "77387:77547");
__$coverInitRange("src/js/Jencil.js", "77555:77776");
__$coverInitRange("src/js/Jencil.js", "77784:77852");
__$coverInitRange("src/js/Jencil.js", "77860:77893");
__$coverInitRange("src/js/Jencil.js", "77901:77931");
__$coverInitRange("src/js/Jencil.js", "77939:77958");
__$coverInitRange("src/js/Jencil.js", "77966:78044");
__$coverInitRange("src/js/Jencil.js", "77610:77650");
__$coverInitRange("src/js/Jencil.js", "77660:77768");
__$coverInitRange("src/js/Jencil.js", "77700:77756");
__$coverInitRange("src/js/Jencil.js", "77824:77842");
__$coverInitRange("src/js/Jencil.js", "78001:78035");
__$coverInitRange("src/js/Jencil.js", "78102:78133");
__$coverInitRange("src/js/Jencil.js", "78141:78157");
__$coverInitRange("src/js/Jencil.js", "78165:78208");
__$coverInitRange("src/js/Jencil.js", "78216:78288");
__$coverInitRange("src/js/Jencil.js", "78296:78370");
__$coverInitRange("src/js/Jencil.js", "78378:78402");
__$coverInitRange("src/js/Jencil.js", "78410:78436");
__$coverInitRange("src/js/Jencil.js", "78444:78484");
__$coverInitRange("src/js/Jencil.js", "78492:78700");
__$coverInitRange("src/js/Jencil.js", "78708:78750");
__$coverInitRange("src/js/Jencil.js", "78541:78588");
__$coverInitRange("src/js/Jencil.js", "78598:78646");
__$coverInitRange("src/js/Jencil.js", "78656:78690");
__$coverInitRange("src/js/Jencil.js", "78810:78860");
__$coverInitRange("src/js/Jencil.js", "78868:78910");
__$coverInitRange("src/js/Jencil.js", "78918:78961");
__$coverInitRange("src/js/Jencil.js", "78969:78993");
__$coverInitRange("src/js/Jencil.js", "79001:79027");
__$coverInitRange("src/js/Jencil.js", "79035:79075");
__$coverInitRange("src/js/Jencil.js", "79083:79111");
__$coverInitRange("src/js/Jencil.js", "79119:79165");
__$coverInitRange("src/js/Jencil.js", "79251:79494");
__$coverInitRange("src/js/Jencil.js", "79294:79304");
__$coverInitRange("src/js/Jencil.js", "79314:79379");
__$coverInitRange("src/js/Jencil.js", "79404:79413");
__$coverInitRange("src/js/Jencil.js", "79423:79486");
__$coverInitRange("src/js/Jencil.js", "79583:79609");
__$coverInitRange("src/js/Jencil.js", "79615:79941");
__$coverInitRange("src/js/Jencil.js", "79947:80358");
__$coverInitRange("src/js/Jencil.js", "80364:80809");
__$coverInitRange("src/js/Jencil.js", "80815:81212");
__$coverInitRange("src/js/Jencil.js", "79646:79674");
__$coverInitRange("src/js/Jencil.js", "79682:79700");
__$coverInitRange("src/js/Jencil.js", "79708:79721");
__$coverInitRange("src/js/Jencil.js", "79729:79908");
__$coverInitRange("src/js/Jencil.js", "79916:79931");
__$coverInitRange("src/js/Jencil.js", "79789:79801");
__$coverInitRange("src/js/Jencil.js", "79811:79900");
__$coverInitRange("src/js/Jencil.js", "79979:80011");
__$coverInitRange("src/js/Jencil.js", "80019:80059");
__$coverInitRange("src/js/Jencil.js", "80067:80351");
__$coverInitRange("src/js/Jencil.js", "80045:80051");
__$coverInitRange("src/js/Jencil.js", "80131:80153");
__$coverInitRange("src/js/Jencil.js", "80163:80343");
__$coverInitRange("src/js/Jencil.js", "80227:80269");
__$coverInitRange("src/js/Jencil.js", "80281:80315");
__$coverInitRange("src/js/Jencil.js", "80327:80333");
__$coverInitRange("src/js/Jencil.js", "80413:80434");
__$coverInitRange("src/js/Jencil.js", "80442:80482");
__$coverInitRange("src/js/Jencil.js", "80490:80802");
__$coverInitRange("src/js/Jencil.js", "80468:80474");
__$coverInitRange("src/js/Jencil.js", "80554:80576");
__$coverInitRange("src/js/Jencil.js", "80586:80794");
__$coverInitRange("src/js/Jencil.js", "80625:80639");
__$coverInitRange("src/js/Jencil.js", "80651:80711");
__$coverInitRange("src/js/Jencil.js", "80723:80766");
__$coverInitRange("src/js/Jencil.js", "80778:80784");
__$coverInitRange("src/js/Jencil.js", "80849:80938");
__$coverInitRange("src/js/Jencil.js", "80946:81043");
__$coverInitRange("src/js/Jencil.js", "81051:81182");
__$coverInitRange("src/js/Jencil.js", "81190:81205");
__$coverInitRange("src/js/Jencil.js", "80895:80930");
__$coverInitRange("src/js/Jencil.js", "81000:81034");
__$coverInitRange("src/js/Jencil.js", "81122:81173");
__$coverInitRange("src/js/Jencil.js", "81258:81269");
__$coverInitRange("src/js/Jencil.js", "81275:81327");
__$coverInitRange("src/js/Jencil.js", "81333:81911");
__$coverInitRange("src/js/Jencil.js", "81360:81388");
__$coverInitRange("src/js/Jencil.js", "81396:81435");
__$coverInitRange("src/js/Jencil.js", "81443:81536");
__$coverInitRange("src/js/Jencil.js", "81544:81567");
__$coverInitRange("src/js/Jencil.js", "81575:81904");
__$coverInitRange("src/js/Jencil.js", "81480:81528");
__$coverInitRange("src/js/Jencil.js", "81609:81773");
__$coverInitRange("src/js/Jencil.js", "81783:81817");
__$coverInitRange("src/js/Jencil.js", "81653:81676");
__$coverInitRange("src/js/Jencil.js", "81705:81763");
__$coverInitRange("src/js/Jencil.js", "81842:81896");
__$coverInitRange("src/js/Jencil.js", "81962:81991");
__$coverInitRange("src/js/Jencil.js", "81998:82144");
__$coverInitRange("src/js/Jencil.js", "82151:82236");
__$coverInitRange("src/js/Jencil.js", "82243:82328");
__$coverInitRange("src/js/Jencil.js", "82335:82420");
__$coverInitRange("src/js/Jencil.js", "82427:82512");
__$coverInitRange("src/js/Jencil.js", "82519:82604");
__$coverInitRange("src/js/Jencil.js", "82611:82696");
__$coverInitRange("src/js/Jencil.js", "82703:82791");
__$coverInitRange("src/js/Jencil.js", "82798:82888");
__$coverInitRange("src/js/Jencil.js", "82895:82988");
__$coverInitRange("src/js/Jencil.js", "82995:83085");
__$coverInitRange("src/js/Jencil.js", "83092:83191");
__$coverInitRange("src/js/Jencil.js", "83198:83295");
__$coverInitRange("src/js/Jencil.js", "83302:83391");
__$coverInitRange("src/js/Jencil.js", "83398:83514");
__$coverInitRange("src/js/Jencil.js", "83521:83615");
__$coverInitRange("src/js/Jencil.js", "83622:83713");
__$coverInitRange("src/js/Jencil.js", "83720:84109");
__$coverInitRange("src/js/Jencil.js", "84116:84452");
__$coverInitRange("src/js/Jencil.js", "84459:84965");
__$coverInitRange("src/js/Jencil.js", "84972:85476");
__$coverInitRange("src/js/Jencil.js", "85483:85500");
__$coverInitRange("src/js/Jencil.js", "82032:82081");
__$coverInitRange("src/js/Jencil.js", "82089:82138");
__$coverInitRange("src/js/Jencil.js", "82196:82229");
__$coverInitRange("src/js/Jencil.js", "82288:82321");
__$coverInitRange("src/js/Jencil.js", "82380:82413");
__$coverInitRange("src/js/Jencil.js", "82472:82505");
__$coverInitRange("src/js/Jencil.js", "82564:82597");
__$coverInitRange("src/js/Jencil.js", "82656:82689");
__$coverInitRange("src/js/Jencil.js", "82750:82784");
__$coverInitRange("src/js/Jencil.js", "82847:82881");
__$coverInitRange("src/js/Jencil.js", "82947:82981");
__$coverInitRange("src/js/Jencil.js", "83044:83078");
__$coverInitRange("src/js/Jencil.js", "83146:83184");
__$coverInitRange("src/js/Jencil.js", "83250:83288");
__$coverInitRange("src/js/Jencil.js", "83350:83384");
__$coverInitRange("src/js/Jencil.js", "83451:83507");
__$coverInitRange("src/js/Jencil.js", "83568:83608");
__$coverInitRange("src/js/Jencil.js", "83668:83706");
__$coverInitRange("src/js/Jencil.js", "83773:83787");
__$coverInitRange("src/js/Jencil.js", "83795:83818");
__$coverInitRange("src/js/Jencil.js", "83826:83911");
__$coverInitRange("src/js/Jencil.js", "83919:83977");
__$coverInitRange("src/js/Jencil.js", "83985:84030");
__$coverInitRange("src/js/Jencil.js", "84038:84102");
__$coverInitRange("src/js/Jencil.js", "83847:83903");
__$coverInitRange("src/js/Jencil.js", "84016:84022");
__$coverInitRange("src/js/Jencil.js", "84164:84176");
__$coverInitRange("src/js/Jencil.js", "84184:84242");
__$coverInitRange("src/js/Jencil.js", "84250:84319");
__$coverInitRange("src/js/Jencil.js", "84327:84371");
__$coverInitRange("src/js/Jencil.js", "84379:84445");
__$coverInitRange("src/js/Jencil.js", "84357:84363");
__$coverInitRange("src/js/Jencil.js", "84515:84526");
__$coverInitRange("src/js/Jencil.js", "84534:84557");
__$coverInitRange("src/js/Jencil.js", "84565:84858");
__$coverInitRange("src/js/Jencil.js", "84866:84886");
__$coverInitRange("src/js/Jencil.js", "84894:84912");
__$coverInitRange("src/js/Jencil.js", "84920:84958");
__$coverInitRange("src/js/Jencil.js", "84594:84622");
__$coverInitRange("src/js/Jencil.js", "84632:84655");
__$coverInitRange("src/js/Jencil.js", "84665:84678");
__$coverInitRange("src/js/Jencil.js", "84688:84821");
__$coverInitRange("src/js/Jencil.js", "84831:84846");
__$coverInitRange("src/js/Jencil.js", "84750:84762");
__$coverInitRange("src/js/Jencil.js", "84774:84811");
__$coverInitRange("src/js/Jencil.js", "85026:85037");
__$coverInitRange("src/js/Jencil.js", "85045:85068");
__$coverInitRange("src/js/Jencil.js", "85076:85369");
__$coverInitRange("src/js/Jencil.js", "85377:85397");
__$coverInitRange("src/js/Jencil.js", "85405:85423");
__$coverInitRange("src/js/Jencil.js", "85431:85469");
__$coverInitRange("src/js/Jencil.js", "85105:85133");
__$coverInitRange("src/js/Jencil.js", "85143:85166");
__$coverInitRange("src/js/Jencil.js", "85176:85189");
__$coverInitRange("src/js/Jencil.js", "85199:85332");
__$coverInitRange("src/js/Jencil.js", "85342:85357");
__$coverInitRange("src/js/Jencil.js", "85261:85273");
__$coverInitRange("src/js/Jencil.js", "85285:85322");
__$coverInitRange("src/js/Jencil.js", "85594:85623");
__$coverInitRange("src/js/Jencil.js", "85630:86516");
__$coverInitRange("src/js/Jencil.js", "86523:86540");
__$coverInitRange("src/js/Jencil.js", "85664:85684");
__$coverInitRange("src/js/Jencil.js", "85692:85741");
__$coverInitRange("src/js/Jencil.js", "85749:86467");
__$coverInitRange("src/js/Jencil.js", "86475:86510");
__$coverInitRange("src/js/Jencil.js", "87428:87468");
__$coverInitRange("src/js/Jencil.js", "87512:87600");
__$coverInitRange("src/js/Jencil.js", "87606:87656");
__$coverInitRange("src/js/Jencil.js", "87662:87798");
__$coverInitRange("src/js/Jencil.js", "87804:87903");
__$coverInitRange("src/js/Jencil.js", "87909:88074");
__$coverInitRange("src/js/Jencil.js", "88080:89056");
__$coverInitRange("src/js/Jencil.js", "89062:89184");
__$coverInitRange("src/js/Jencil.js", "87709:87719");
__$coverInitRange("src/js/Jencil.js", "87727:87749");
__$coverInitRange("src/js/Jencil.js", "87757:87791");
__$coverInitRange("src/js/Jencil.js", "87848:87896");
__$coverInitRange("src/js/Jencil.js", "87956:87966");
__$coverInitRange("src/js/Jencil.js", "87974:87996");
__$coverInitRange("src/js/Jencil.js", "88004:88067");
__$coverInitRange("src/js/Jencil.js", "88128:88186");
__$coverInitRange("src/js/Jencil.js", "88194:88215");
__$coverInitRange("src/js/Jencil.js", "88223:88257");
__$coverInitRange("src/js/Jencil.js", "88265:88300");
__$coverInitRange("src/js/Jencil.js", "88308:88323");
__$coverInitRange("src/js/Jencil.js", "88331:88906");
__$coverInitRange("src/js/Jencil.js", "88914:88950");
__$coverInitRange("src/js/Jencil.js", "88958:89049");
__$coverInitRange("src/js/Jencil.js", "88377:88402");
__$coverInitRange("src/js/Jencil.js", "88412:88567");
__$coverInitRange("src/js/Jencil.js", "88449:88487");
__$coverInitRange("src/js/Jencil.js", "88516:88557");
__$coverInitRange("src/js/Jencil.js", "88592:88633");
__$coverInitRange("src/js/Jencil.js", "88643:88746");
__$coverInitRange("src/js/Jencil.js", "88756:88898");
__$coverInitRange("src/js/Jencil.js", "88704:88736");
__$coverInitRange("src/js/Jencil.js", "88823:88860");
__$coverInitRange("src/js/Jencil.js", "88872:88888");
__$coverInitRange("src/js/Jencil.js", "88991:89041");
__$coverInitRange("src/js/Jencil.js", "89089:89129");
__$coverInitRange("src/js/Jencil.js", "89137:89177");
__$coverInitRange("src/js/Jencil.js", "89240:89322");
__$coverInitRange("src/js/Jencil.js", "89328:89384");
__$coverInitRange("src/js/Jencil.js", "89390:89431");
__$coverInitRange("src/js/Jencil.js", "89437:89484");
__$coverInitRange("src/js/Jencil.js", "89490:89948");
__$coverInitRange("src/js/Jencil.js", "89954:90563");
__$coverInitRange("src/js/Jencil.js", "90569:91872");
__$coverInitRange("src/js/Jencil.js", "91878:92291");
__$coverInitRange("src/js/Jencil.js", "89528:89559");
__$coverInitRange("src/js/Jencil.js", "89567:89828");
__$coverInitRange("src/js/Jencil.js", "89836:89941");
__$coverInitRange("src/js/Jencil.js", "89605:89624");
__$coverInitRange("src/js/Jencil.js", "89634:89650");
__$coverInitRange("src/js/Jencil.js", "89660:89678");
__$coverInitRange("src/js/Jencil.js", "89688:89721");
__$coverInitRange("src/js/Jencil.js", "89766:89787");
__$coverInitRange("src/js/Jencil.js", "89812:89820");
__$coverInitRange("src/js/Jencil.js", "89986:90022");
__$coverInitRange("src/js/Jencil.js", "90030:90070");
__$coverInitRange("src/js/Jencil.js", "90078:90118");
__$coverInitRange("src/js/Jencil.js", "90126:90203");
__$coverInitRange("src/js/Jencil.js", "90211:90556");
__$coverInitRange("src/js/Jencil.js", "90056:90062");
__$coverInitRange("src/js/Jencil.js", "90184:90195");
__$coverInitRange("src/js/Jencil.js", "90271:90449");
__$coverInitRange("src/js/Jencil.js", "90459:90497");
__$coverInitRange("src/js/Jencil.js", "90507:90548");
__$coverInitRange("src/js/Jencil.js", "90331:90383");
__$coverInitRange("src/js/Jencil.js", "90395:90416");
__$coverInitRange("src/js/Jencil.js", "90428:90439");
__$coverInitRange("src/js/Jencil.js", "90626:90679");
__$coverInitRange("src/js/Jencil.js", "90687:90700");
__$coverInitRange("src/js/Jencil.js", "90708:90748");
__$coverInitRange("src/js/Jencil.js", "90756:91154");
__$coverInitRange("src/js/Jencil.js", "91162:91198");
__$coverInitRange("src/js/Jencil.js", "91206:91771");
__$coverInitRange("src/js/Jencil.js", "91779:91865");
__$coverInitRange("src/js/Jencil.js", "90841:90882");
__$coverInitRange("src/js/Jencil.js", "90892:90936");
__$coverInitRange("src/js/Jencil.js", "90946:90997");
__$coverInitRange("src/js/Jencil.js", "91007:91029");
__$coverInitRange("src/js/Jencil.js", "91039:91122");
__$coverInitRange("src/js/Jencil.js", "91132:91146");
__$coverInitRange("src/js/Jencil.js", "91071:91112");
__$coverInitRange("src/js/Jencil.js", "91184:91190");
__$coverInitRange("src/js/Jencil.js", "91232:91465");
__$coverInitRange("src/js/Jencil.js", "91294:91335");
__$coverInitRange("src/js/Jencil.js", "91347:91382");
__$coverInitRange("src/js/Jencil.js", "91394:91419");
__$coverInitRange("src/js/Jencil.js", "91431:91455");
__$coverInitRange("src/js/Jencil.js", "91540:91586");
__$coverInitRange("src/js/Jencil.js", "91596:91643");
__$coverInitRange("src/js/Jencil.js", "91718:91763");
__$coverInitRange("src/js/Jencil.js", "91809:91857");
__$coverInitRange("src/js/Jencil.js", "91912:92001");
__$coverInitRange("src/js/Jencil.js", "92009:92106");
__$coverInitRange("src/js/Jencil.js", "92114:92261");
__$coverInitRange("src/js/Jencil.js", "92269:92284");
__$coverInitRange("src/js/Jencil.js", "91958:91993");
__$coverInitRange("src/js/Jencil.js", "92063:92097");
__$coverInitRange("src/js/Jencil.js", "92193:92252");
__$coverInitRange("src/js/Jencil.js", "92346:92379");
__$coverInitRange("src/js/Jencil.js", "92386:92544");
__$coverInitRange("src/js/Jencil.js", "92551:93031");
__$coverInitRange("src/js/Jencil.js", "93038:93127");
__$coverInitRange("src/js/Jencil.js", "93134:93223");
__$coverInitRange("src/js/Jencil.js", "93230:93319");
__$coverInitRange("src/js/Jencil.js", "93326:93415");
__$coverInitRange("src/js/Jencil.js", "93422:93511");
__$coverInitRange("src/js/Jencil.js", "93518:93607");
__$coverInitRange("src/js/Jencil.js", "93614:93703");
__$coverInitRange("src/js/Jencil.js", "93710:93799");
__$coverInitRange("src/js/Jencil.js", "93806:94976");
__$coverInitRange("src/js/Jencil.js", "94983:95565");
__$coverInitRange("src/js/Jencil.js", "95572:95954");
__$coverInitRange("src/js/Jencil.js", "95961:96287");
__$coverInitRange("src/js/Jencil.js", "96294:97468");
__$coverInitRange("src/js/Jencil.js", "97475:98665");
__$coverInitRange("src/js/Jencil.js", "98672:98693");
__$coverInitRange("src/js/Jencil.js", "92424:92477");
__$coverInitRange("src/js/Jencil.js", "92485:92538");
__$coverInitRange("src/js/Jencil.js", "92631:92657");
__$coverInitRange("src/js/Jencil.js", "92665:92704");
__$coverInitRange("src/js/Jencil.js", "92712:93024");
__$coverInitRange("src/js/Jencil.js", "92749:92796");
__$coverInitRange("src/js/Jencil.js", "92806:92843");
__$coverInitRange("src/js/Jencil.js", "92853:92966");
__$coverInitRange("src/js/Jencil.js", "92976:93016");
__$coverInitRange("src/js/Jencil.js", "92924:92956");
__$coverInitRange("src/js/Jencil.js", "93087:93120");
__$coverInitRange("src/js/Jencil.js", "93183:93216");
__$coverInitRange("src/js/Jencil.js", "93279:93312");
__$coverInitRange("src/js/Jencil.js", "93375:93408");
__$coverInitRange("src/js/Jencil.js", "93471:93504");
__$coverInitRange("src/js/Jencil.js", "93567:93600");
__$coverInitRange("src/js/Jencil.js", "93665:93696");
__$coverInitRange("src/js/Jencil.js", "93763:93792");
__$coverInitRange("src/js/Jencil.js", "93864:93893");
__$coverInitRange("src/js/Jencil.js", "93901:93934");
__$coverInitRange("src/js/Jencil.js", "93942:93971");
__$coverInitRange("src/js/Jencil.js", "93979:94305");
__$coverInitRange("src/js/Jencil.js", "94313:94966");
__$coverInitRange("src/js/Jencil.js", "94013:94031");
__$coverInitRange("src/js/Jencil.js", "94041:94275");
__$coverInitRange("src/js/Jencil.js", "94285:94296");
__$coverInitRange("src/js/Jencil.js", "94104:94120");
__$coverInitRange("src/js/Jencil.js", "94132:94189");
__$coverInitRange("src/js/Jencil.js", "94201:94265");
__$coverInitRange("src/js/Jencil.js", "94169:94177");
__$coverInitRange("src/js/Jencil.js", "94241:94253");
__$coverInitRange("src/js/Jencil.js", "94341:94380");
__$coverInitRange("src/js/Jencil.js", "94390:94426");
__$coverInitRange("src/js/Jencil.js", "94436:94908");
__$coverInitRange("src/js/Jencil.js", "94918:94957");
__$coverInitRange("src/js/Jencil.js", "94466:94664");
__$coverInitRange("src/js/Jencil.js", "94582:94597");
__$coverInitRange("src/js/Jencil.js", "94611:94652");
__$coverInitRange("src/js/Jencil.js", "94693:94898");
__$coverInitRange("src/js/Jencil.js", "94814:94829");
__$coverInitRange("src/js/Jencil.js", "94843:94886");
__$coverInitRange("src/js/Jencil.js", "95034:95059");
__$coverInitRange("src/js/Jencil.js", "95067:95103");
__$coverInitRange("src/js/Jencil.js", "95111:95150");
__$coverInitRange("src/js/Jencil.js", "95158:95558");
__$coverInitRange("src/js/Jencil.js", "95190:95448");
__$coverInitRange("src/js/Jencil.js", "95458:95496");
__$coverInitRange("src/js/Jencil.js", "95221:95243");
__$coverInitRange("src/js/Jencil.js", "95255:95268");
__$coverInitRange("src/js/Jencil.js", "95280:95407");
__$coverInitRange("src/js/Jencil.js", "95419:95434");
__$coverInitRange("src/js/Jencil.js", "95345:95358");
__$coverInitRange("src/js/Jencil.js", "95372:95395");
__$coverInitRange("src/js/Jencil.js", "95521:95550");
__$coverInitRange("src/js/Jencil.js", "95629:95643");
__$coverInitRange("src/js/Jencil.js", "95651:95674");
__$coverInitRange("src/js/Jencil.js", "95682:95767");
__$coverInitRange("src/js/Jencil.js", "95775:95833");
__$coverInitRange("src/js/Jencil.js", "95841:95886");
__$coverInitRange("src/js/Jencil.js", "95894:95947");
__$coverInitRange("src/js/Jencil.js", "95703:95759");
__$coverInitRange("src/js/Jencil.js", "95872:95878");
__$coverInitRange("src/js/Jencil.js", "96013:96025");
__$coverInitRange("src/js/Jencil.js", "96033:96091");
__$coverInitRange("src/js/Jencil.js", "96099:96168");
__$coverInitRange("src/js/Jencil.js", "96176:96220");
__$coverInitRange("src/js/Jencil.js", "96228:96280");
__$coverInitRange("src/js/Jencil.js", "96206:96212");
__$coverInitRange("src/js/Jencil.js", "96355:96384");
__$coverInitRange("src/js/Jencil.js", "96392:96426");
__$coverInitRange("src/js/Jencil.js", "96434:96463");
__$coverInitRange("src/js/Jencil.js", "96471:96797");
__$coverInitRange("src/js/Jencil.js", "96805:97458");
__$coverInitRange("src/js/Jencil.js", "96505:96523");
__$coverInitRange("src/js/Jencil.js", "96533:96767");
__$coverInitRange("src/js/Jencil.js", "96777:96788");
__$coverInitRange("src/js/Jencil.js", "96596:96612");
__$coverInitRange("src/js/Jencil.js", "96624:96681");
__$coverInitRange("src/js/Jencil.js", "96693:96757");
__$coverInitRange("src/js/Jencil.js", "96661:96669");
__$coverInitRange("src/js/Jencil.js", "96733:96745");
__$coverInitRange("src/js/Jencil.js", "96833:96872");
__$coverInitRange("src/js/Jencil.js", "96882:96918");
__$coverInitRange("src/js/Jencil.js", "96928:97400");
__$coverInitRange("src/js/Jencil.js", "97410:97449");
__$coverInitRange("src/js/Jencil.js", "96958:97156");
__$coverInitRange("src/js/Jencil.js", "97074:97089");
__$coverInitRange("src/js/Jencil.js", "97103:97144");
__$coverInitRange("src/js/Jencil.js", "97185:97390");
__$coverInitRange("src/js/Jencil.js", "97306:97321");
__$coverInitRange("src/js/Jencil.js", "97335:97378");
__$coverInitRange("src/js/Jencil.js", "97534:97563");
__$coverInitRange("src/js/Jencil.js", "97571:97608");
__$coverInitRange("src/js/Jencil.js", "97616:97645");
__$coverInitRange("src/js/Jencil.js", "97653:97979");
__$coverInitRange("src/js/Jencil.js", "97987:98655");
__$coverInitRange("src/js/Jencil.js", "97687:97705");
__$coverInitRange("src/js/Jencil.js", "97715:97949");
__$coverInitRange("src/js/Jencil.js", "97959:97970");
__$coverInitRange("src/js/Jencil.js", "97778:97794");
__$coverInitRange("src/js/Jencil.js", "97806:97863");
__$coverInitRange("src/js/Jencil.js", "97875:97939");
__$coverInitRange("src/js/Jencil.js", "97843:97851");
__$coverInitRange("src/js/Jencil.js", "97915:97927");
__$coverInitRange("src/js/Jencil.js", "98015:98054");
__$coverInitRange("src/js/Jencil.js", "98064:98100");
__$coverInitRange("src/js/Jencil.js", "98110:98597");
__$coverInitRange("src/js/Jencil.js", "98607:98646");
__$coverInitRange("src/js/Jencil.js", "98140:98338");
__$coverInitRange("src/js/Jencil.js", "98256:98271");
__$coverInitRange("src/js/Jencil.js", "98285:98326");
__$coverInitRange("src/js/Jencil.js", "98367:98587");
__$coverInitRange("src/js/Jencil.js", "98488:98503");
__$coverInitRange("src/js/Jencil.js", "98517:98575");
__$coverInitRange("src/js/Jencil.js", "98798:98844");
__$coverInitRange("src/js/Jencil.js", "98899:98934");
__$coverInitRange("src/js/Jencil.js", "98941:99051");
__$coverInitRange("src/js/Jencil.js", "99058:99256");
__$coverInitRange("src/js/Jencil.js", "99263:99286");
__$coverInitRange("src/js/Jencil.js", "98977:99045");
__$coverInitRange("src/js/Jencil.js", "99125:99133");
__$coverInitRange("src/js/Jencil.js", "99141:99177");
__$coverInitRange("src/js/Jencil.js", "99185:99249");
__$coverInitRange("src/js/Jencil.js", "99968:100016");
__$coverCall('src/js/Jencil.js', '0:100038');
(function () {
    __$coverCall('src/js/Jencil.js', '16:1134');
    var ActionButton, AjaxViewer, Bar, BaseEditor, BaseHelper, BaseViewer, Button, Caretaker, CommandButton, DefaultProfile, DimainPanel, Fullscreen, FullscreenButton, HelperButton, HorizontalPanel, HorizontalSplitter, HtmlEditor, HtmlHelper, HtmlProfile, HtmlViewer, MarkdownEditor, MarkdownJsViewer, MarkdownProfile, MonomainPanel, MultiPanel, MultiplePanel, NotImplementedError, Originator, Panel, RedoButton, Selection, Separator, Splitter, Statusbar, TemplateHelper, TemplateViewer, TextEditor, Toolbar, TrimainPanel, UndoButton, VerticalPanel, VerticalSplitter, ViewerButton, Widget, Workspace, Wrapper, animate, apply, autoIndentable, autoIndentableHtml, autoIndentableMarkdown, buttonFactory, curtainFactory, evolute, headerMarkup, namespace, strutils, translate, __slice = [].slice, __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
            __$coverCall('src/js/Jencil.js', '885:970');
            for (var key in parent) {
                __$coverCall('src/js/Jencil.js', '911:968');
                if (__hasProp.call(parent, key))
                    child[key] = parent[key];
            }
            __$coverCall('src/js/Jencil.js', '972:1016');
            function ctor() {
                __$coverCall('src/js/Jencil.js', '990:1014');
                this.constructor = child;
            }
            __$coverCall('src/js/Jencil.js', '1018:1051');
            ctor.prototype = parent.prototype;
            __$coverCall('src/js/Jencil.js', '1053:1081');
            child.prototype = new ctor();
            __$coverCall('src/js/Jencil.js', '1083:1117');
            child.__super__ = parent.prototype;
            __$coverCall('src/js/Jencil.js', '1119:1131');
            return child;
        };
    __$coverCall('src/js/Jencil.js', '1139:1634');
    namespace = function (target, name, block) {
        __$coverCall('src/js/Jencil.js', '1187:1223');
        var item, top, _i, _len, _ref, _ref1;
        __$coverCall('src/js/Jencil.js', '1229:1412');
        if (arguments.length < 3) {
            __$coverCall('src/js/Jencil.js', '1263:1406');
            _ref = [typeof exports !== 'undefined' ? exports : window].concat(__slice.call(arguments)), target = _ref[0], name = _ref[1], block = _ref[2];
        }
        __$coverCall('src/js/Jencil.js', '1418:1430');
        top = target;
        __$coverCall('src/js/Jencil.js', '1436:1459');
        _ref1 = name.split('.');
        __$coverCall('src/js/Jencil.js', '1465:1598');
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            __$coverCall('src/js/Jencil.js', '1524:1540');
            item = _ref1[_i];
            __$coverCall('src/js/Jencil.js', '1548:1592');
            target = target[item] || (target[item] = {});
        }
        __$coverCall('src/js/Jencil.js', '1604:1629');
        return block(target, top);
    };
    __$coverCall('src/js/Jencil.js', '1639:1731');
    if (typeof window !== 'undefined' && window !== null) {
        __$coverCall('src/js/Jencil.js', '1699:1727');
        window.namespace = namespace;
    }
    __$coverCall('src/js/Jencil.js', '1736:1831');
    if (typeof exports !== 'undefined' && exports !== null) {
        __$coverCall('src/js/Jencil.js', '1798:1827');
        exports.namespace = namespace;
    }
    __$coverCall('src/js/Jencil.js', '1836:2665');
    strutils = {
        repeat: function (str, count) {
            __$coverCall('src/js/Jencil.js', '1890:1909');
            var pattern, result;
            __$coverCall('src/js/Jencil.js', '1917:1959');
            if (count < 1) {
                __$coverCall('src/js/Jencil.js', '1942:1951');
                return '';
            }
            __$coverCall('src/js/Jencil.js', '1967:1978');
            result = '';
            __$coverCall('src/js/Jencil.js', '1986:2009');
            pattern = str.valueOf();
            __$coverCall('src/js/Jencil.js', '2017:2156');
            while (count > 0) {
                __$coverCall('src/js/Jencil.js', '2045:2099');
                if (count & 1) {
                    __$coverCall('src/js/Jencil.js', '2072:2089');
                    result += pattern;
                }
                __$coverCall('src/js/Jencil.js', '2109:2120');
                count >>= 1;
                __$coverCall('src/js/Jencil.js', '2130:2148');
                pattern += pattern;
            }
            __$coverCall('src/js/Jencil.js', '2164:2177');
            return result;
        },
        startsWith: function (str, prefix) {
            __$coverCall('src/js/Jencil.js', '2232:2271');
            return str.lastIndexOf(prefix, 0) === 0;
        },
        endsWith: function (str, suffix) {
            __$coverCall('src/js/Jencil.js', '2324:2329');
            var l;
            __$coverCall('src/js/Jencil.js', '2337:2367');
            l = str.length - suffix.length;
            __$coverCall('src/js/Jencil.js', '2375:2424');
            return l >= 0 && str.lastIndexOf(suffix, l) === l;
        },
        trimLeft: function (str) {
            __$coverCall('src/js/Jencil.js', '2469:2500');
            return str.replace(/^\s+/g, '');
        },
        trimRight: function (str) {
            __$coverCall('src/js/Jencil.js', '2546:2577');
            return str.replace(/\s+$/g, '');
        },
        trim: function (str) {
            __$coverCall('src/js/Jencil.js', '2618:2654');
            return str.replace(/^\s+|\s+$/g, '');
        }
    };
    __$coverCall('src/js/Jencil.js', '2670:2945');
    apply = function (object, name, fn) {
        __$coverCall('src/js/Jencil.js', '2711:2940');
        if (!(object.prototype[name] != null)) {
            __$coverCall('src/js/Jencil.js', '2758:2934');
            return object.prototype[name] = function () {
                __$coverCall('src/js/Jencil.js', '2811:2819');
                var args;
                __$coverCall('src/js/Jencil.js', '2829:2888');
                args = [this].concat(Array.prototype.slice.call(arguments));
                __$coverCall('src/js/Jencil.js', '2898:2925');
                return fn.apply(this, args);
            };
        }
    };
    __$coverCall('src/js/Jencil.js', '2950:2990');
    apply(String, 'repeat', strutils.repeat);
    __$coverCall('src/js/Jencil.js', '2995:3043');
    apply(String, 'startsWith', strutils.startsWith);
    __$coverCall('src/js/Jencil.js', '3048:3092');
    apply(String, 'endsWith', strutils.endsWith);
    __$coverCall('src/js/Jencil.js', '3097:3141');
    apply(String, 'trimLeft', strutils.trimLeft);
    __$coverCall('src/js/Jencil.js', '3146:3192');
    apply(String, 'trimRight', strutils.trimRight);
    __$coverCall('src/js/Jencil.js', '3197:3233');
    apply(String, 'trim', strutils.trim);
    __$coverCall('src/js/Jencil.js', '3238:3331');
    if (typeof exports !== 'undefined' && exports !== null) {
        __$coverCall('src/js/Jencil.js', '3300:3327');
        exports.strutils = strutils;
    }
    __$coverCall('src/js/Jencil.js', '3336:3602');
    NotImplementedError = function () {
        __$coverCall('src/js/Jencil.js', '3377:3409');
        function NotImplementedError() {
        }
        __$coverCall('src/js/Jencil.js', '3416:3475');
        NotImplementedError.prototype.name = 'Not implemeted error';
        __$coverCall('src/js/Jencil.js', '3482:3560');
        NotImplementedError.prototype.message = 'The function has not implemented yet';
        __$coverCall('src/js/Jencil.js', '3567:3593');
        return NotImplementedError;
    }();
    __$coverCall('src/js/Jencil.js', '3607:3897');
    Originator = function () {
        __$coverCall('src/js/Jencil.js', '3639:3662');
        function Originator() {
        }
        __$coverCall('src/js/Jencil.js', '3669:3761');
        Originator.prototype.createMemento = function () {
            __$coverCall('src/js/Jencil.js', '3725:3754');
            throw new NotImplementedError();
        };
        __$coverCall('src/js/Jencil.js', '3768:3864');
        Originator.prototype.setMemento = function (memento) {
            __$coverCall('src/js/Jencil.js', '3828:3857');
            throw new NotImplementedError();
        };
        __$coverCall('src/js/Jencil.js', '3871:3888');
        return Originator;
    }();
    __$coverCall('src/js/Jencil.js', '3902:5463');
    Caretaker = function () {
        __$coverCall('src/js/Jencil.js', '3933:4063');
        function Caretaker(originator) {
            __$coverCall('src/js/Jencil.js', '3972:4001');
            this._originator = originator;
            __$coverCall('src/js/Jencil.js', '4009:4029');
            this._undoStack = [];
            __$coverCall('src/js/Jencil.js', '4037:4057');
            this._redoStack = [];
        }
        __$coverCall('src/js/Jencil.js', '4070:4262');
        Caretaker.prototype.originator = function (originator) {
            __$coverCall('src/js/Jencil.js', '4132:4224');
            if (originator != null) {
                __$coverCall('src/js/Jencil.js', '4166:4195');
                this._originator = originator;
                __$coverCall('src/js/Jencil.js', '4205:4216');
                return this;
            }
            __$coverCall('src/js/Jencil.js', '4232:4255');
            return this._originator;
        };
        __$coverCall('src/js/Jencil.js', '4269:4467');
        Caretaker.prototype.save = function (memento) {
            __$coverCall('src/js/Jencil.js', '4322:4376');
            memento = memento || this.originator().createMemento();
            __$coverCall('src/js/Jencil.js', '4384:4413');
            this._undoStack.push(memento);
            __$coverCall('src/js/Jencil.js', '4421:4441');
            this._redoStack = [];
            __$coverCall('src/js/Jencil.js', '4449:4460');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '4474:4853');
        Caretaker.prototype.undo = function () {
            __$coverCall('src/js/Jencil.js', '4520:4534');
            var originator;
            __$coverCall('src/js/Jencil.js', '4542:4593');
            if (!this.canUndo()) {
                __$coverCall('src/js/Jencil.js', '4573:4585');
                return false;
            }
            __$coverCall('src/js/Jencil.js', '4601:4631');
            originator = this.originator();
            __$coverCall('src/js/Jencil.js', '4639:4687');
            this._redoStack.push(originator.createMemento());
            __$coverCall('src/js/Jencil.js', '4695:4739');
            originator.setMemento(this._undoStack.pop());
            __$coverCall('src/js/Jencil.js', '4747:4827');
            if (typeof originator.focus === 'function') {
                __$coverCall('src/js/Jencil.js', '4801:4819');
                originator.focus();
            }
            __$coverCall('src/js/Jencil.js', '4835:4846');
            return true;
        };
        __$coverCall('src/js/Jencil.js', '4860:5239');
        Caretaker.prototype.redo = function () {
            __$coverCall('src/js/Jencil.js', '4906:4920');
            var originator;
            __$coverCall('src/js/Jencil.js', '4928:4979');
            if (!this.canRedo()) {
                __$coverCall('src/js/Jencil.js', '4959:4971');
                return false;
            }
            __$coverCall('src/js/Jencil.js', '4987:5017');
            originator = this.originator();
            __$coverCall('src/js/Jencil.js', '5025:5073');
            this._undoStack.push(originator.createMemento());
            __$coverCall('src/js/Jencil.js', '5081:5125');
            originator.setMemento(this._redoStack.pop());
            __$coverCall('src/js/Jencil.js', '5133:5213');
            if (typeof originator.focus === 'function') {
                __$coverCall('src/js/Jencil.js', '5187:5205');
                originator.focus();
            }
            __$coverCall('src/js/Jencil.js', '5221:5232');
            return true;
        };
        __$coverCall('src/js/Jencil.js', '5246:5335');
        Caretaker.prototype.canUndo = function () {
            __$coverCall('src/js/Jencil.js', '5295:5328');
            return this._undoStack.length > 0;
        };
        __$coverCall('src/js/Jencil.js', '5342:5431');
        Caretaker.prototype.canRedo = function () {
            __$coverCall('src/js/Jencil.js', '5391:5424');
            return this._redoStack.length > 0;
        };
        __$coverCall('src/js/Jencil.js', '5438:5454');
        return Caretaker;
    }();
    __$coverCall('src/js/Jencil.js', '5468:5655');
    if (typeof exports !== 'undefined' && exports !== null) {
        __$coverCall('src/js/Jencil.js', '5530:5579');
        exports.NotImplementedError = NotImplementedError;
        __$coverCall('src/js/Jencil.js', '5585:5616');
        exports.Originator = Originator;
        __$coverCall('src/js/Jencil.js', '5622:5651');
        exports.Caretaker = Caretaker;
    }
    __$coverCall('src/js/Jencil.js', '5660:12173');
    Selection = function () {
        __$coverCall('src/js/Jencil.js', '5691:5992');
        function Selection(document, element) {
            __$coverCall('src/js/Jencil.js', '5737:5761');
            this.document = document;
            __$coverCall('src/js/Jencil.js', '5769:5791');
            this.element = element;
            __$coverCall('src/js/Jencil.js', '5799:5890');
            if (this.document instanceof jQuery) {
                __$coverCall('src/js/Jencil.js', '5846:5882');
                this.document = this.document.get(0);
            }
            __$coverCall('src/js/Jencil.js', '5898:5986');
            if (this.element instanceof jQuery) {
                __$coverCall('src/js/Jencil.js', '5944:5978');
                this.element = this.element.get(0);
            }
        }
        __$coverCall('src/js/Jencil.js', '5999:6589');
        Selection.prototype._getCaret = function () {
            __$coverCall('src/js/Jencil.js', '6050:6079');
            var caret, clone, e, range, s;
            __$coverCall('src/js/Jencil.js', '6087:6540');
            if (this.document.selection != null) {
                __$coverCall('src/js/Jencil.js', '6134:6179');
                range = this.document.selection.createRange();
                __$coverCall('src/js/Jencil.js', '6189:6214');
                clone = range.duplicate();
                __$coverCall('src/js/Jencil.js', '6224:6261');
                clone.moveToElementText(this.element);
                __$coverCall('src/js/Jencil.js', '6271:6307');
                clone.setEndPoint('EndToEnd', range);
                __$coverCall('src/js/Jencil.js', '6317:6358');
                s = clone.text.length - range.text.length;
                __$coverCall('src/js/Jencil.js', '6368:6393');
                e = s + range.text.length;
            } else if (this.element.setSelectionRange != null) {
                __$coverCall('src/js/Jencil.js', '6462:6493');
                s = this.element.selectionStart;
                __$coverCall('src/js/Jencil.js', '6503:6532');
                e = this.element.selectionEnd;
            }
            __$coverCall('src/js/Jencil.js', '6548:6562');
            caret = [
                s,
                e
            ];
            __$coverCall('src/js/Jencil.js', '6570:6582');
            return caret;
        };
        __$coverCall('src/js/Jencil.js', '6596:7172');
        Selection.prototype._setCaret = function (start, end) {
            __$coverCall('src/js/Jencil.js', '6657:6677');
            var range, scrollTop;
            __$coverCall('src/js/Jencil.js', '6685:6719');
            scrollTop = this.element.scrollTop;
            __$coverCall('src/js/Jencil.js', '6727:7076');
            if (this.element.setSelectionRange != null) {
                __$coverCall('src/js/Jencil.js', '6781:6823');
                this.element.setSelectionRange(start, end);
            } else if (this.element.createTextRange) {
                __$coverCall('src/js/Jencil.js', '6882:6920');
                range = this.element.createTextRange();
                __$coverCall('src/js/Jencil.js', '6930:6950');
                range.collapse(true);
                __$coverCall('src/js/Jencil.js', '6960:6995');
                range.moveStart('character', start);
                __$coverCall('src/js/Jencil.js', '7005:7044');
                range.moveEnd('character', end - start);
                __$coverCall('src/js/Jencil.js', '7054:7068');
                range.select();
            }
            __$coverCall('src/js/Jencil.js', '7084:7104');
            this.element.focus();
            __$coverCall('src/js/Jencil.js', '7112:7146');
            this.element.scrollTop = scrollTop;
            __$coverCall('src/js/Jencil.js', '7154:7165');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '7179:7552');
        Selection.prototype.caret = function (start, end) {
            __$coverCall('src/js/Jencil.js', '7236:7341');
            if (start != null && start instanceof Array) {
                __$coverCall('src/js/Jencil.js', '7293:7307');
                end = start[1];
                __$coverCall('src/js/Jencil.js', '7317:7333');
                start = start[0];
            }
            __$coverCall('src/js/Jencil.js', '7349:7417');
            if (start != null && !(end != null)) {
                __$coverCall('src/js/Jencil.js', '7398:7409');
                end = start;
            }
            __$coverCall('src/js/Jencil.js', '7425:7514');
            if (start != null && end != null) {
                __$coverCall('src/js/Jencil.js', '7473:7506');
                return this._setCaret(start, end);
            }
            __$coverCall('src/js/Jencil.js', '7522:7545');
            return this._getCaret();
        };
        __$coverCall('src/js/Jencil.js', '7559:7706');
        Selection.prototype.caretOffset = function (offset) {
            __$coverCall('src/js/Jencil.js', '7618:7627');
            var caret;
            __$coverCall('src/js/Jencil.js', '7635:7655');
            caret = this.caret();
            __$coverCall('src/js/Jencil.js', '7663:7699');
            return this.caret(caret[0] + offset);
        };
        __$coverCall('src/js/Jencil.js', '7713:8041');
        Selection.prototype.replace = function (str, start, end) {
            __$coverCall('src/js/Jencil.js', '7777:7796');
            var a, b, scrollTop;
            __$coverCall('src/js/Jencil.js', '7804:7838');
            scrollTop = this.element.scrollTop;
            __$coverCall('src/js/Jencil.js', '7846:7888');
            b = this.element.value.substring(0, start);
            __$coverCall('src/js/Jencil.js', '7896:7933');
            a = this.element.value.substring(end);
            __$coverCall('src/js/Jencil.js', '7941:7973');
            this.element.value = b + str + a;
            __$coverCall('src/js/Jencil.js', '7981:8015');
            this.element.scrollTop = scrollTop;
            __$coverCall('src/js/Jencil.js', '8023:8034');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '8048:8437');
        Selection.prototype._getText = function () {
            __$coverCall('src/js/Jencil.js', '8098:8119');
            var e, range, s, _ref;
            __$coverCall('src/js/Jencil.js', '8127:8411');
            if (this.document.selection != null) {
                __$coverCall('src/js/Jencil.js', '8174:8219');
                range = this.document.selection.createRange();
                __$coverCall('src/js/Jencil.js', '8229:8246');
                return range.text;
            } else if (this.element.setSelectionRange) {
                __$coverCall('src/js/Jencil.js', '8307:8352');
                _ref = this.caret(), s = _ref[0], e = _ref[1];
                __$coverCall('src/js/Jencil.js', '8362:8403');
                return this.element.value.substring(s, e);
            }
            __$coverCall('src/js/Jencil.js', '8419:8430');
            return null;
        };
        __$coverCall('src/js/Jencil.js', '8444:8860');
        Selection.prototype._setText = function (str, keepSelection) {
            __$coverCall('src/js/Jencil.js', '8512:8537');
            var e, s, scrollTop, _ref;
            __$coverCall('src/js/Jencil.js', '8545:8579');
            scrollTop = this.element.scrollTop;
            __$coverCall('src/js/Jencil.js', '8587:8632');
            _ref = this.caret(), s = _ref[0], e = _ref[1];
            __$coverCall('src/js/Jencil.js', '8640:8663');
            this.replace(str, s, e);
            __$coverCall('src/js/Jencil.js', '8671:8689');
            e = s + str.length;
            __$coverCall('src/js/Jencil.js', '8697:8740');
            if (!keepSelection) {
                __$coverCall('src/js/Jencil.js', '8727:8732');
                s = e;
            }
            __$coverCall('src/js/Jencil.js', '8748:8764');
            this.caret(s, e);
            __$coverCall('src/js/Jencil.js', '8772:8792');
            this.element.focus();
            __$coverCall('src/js/Jencil.js', '8800:8834');
            this.element.scrollTop = scrollTop;
            __$coverCall('src/js/Jencil.js', '8842:8853');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '8867:9043');
        Selection.prototype.text = function (str, keepSelection) {
            __$coverCall('src/js/Jencil.js', '8931:9006');
            if (str != null) {
                __$coverCall('src/js/Jencil.js', '8958:8998');
                return this._setText(str, keepSelection);
            }
            __$coverCall('src/js/Jencil.js', '9014:9036');
            return this._getText();
        };
        __$coverCall('src/js/Jencil.js', '9050:9509');
        Selection.prototype.insertBefore = function (str, keepSelection) {
            __$coverCall('src/js/Jencil.js', '9122:9153');
            var e, s, scrollTop, text, _ref;
            __$coverCall('src/js/Jencil.js', '9161:9195');
            scrollTop = this.element.scrollTop;
            __$coverCall('src/js/Jencil.js', '9203:9248');
            _ref = this.caret(), s = _ref[0], e = _ref[1];
            __$coverCall('src/js/Jencil.js', '9256:9274');
            text = this.text();
            __$coverCall('src/js/Jencil.js', '9282:9312');
            this.replace(str + text, s, e);
            __$coverCall('src/js/Jencil.js', '9320:9338');
            e = s + str.length;
            __$coverCall('src/js/Jencil.js', '9346:9389');
            if (!keepSelection) {
                __$coverCall('src/js/Jencil.js', '9376:9381');
                s = e;
            }
            __$coverCall('src/js/Jencil.js', '9397:9413');
            this.caret(s, e);
            __$coverCall('src/js/Jencil.js', '9421:9441');
            this.element.focus();
            __$coverCall('src/js/Jencil.js', '9449:9483');
            this.element.scrollTop = scrollTop;
            __$coverCall('src/js/Jencil.js', '9491:9502');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '9516:9987');
        Selection.prototype.insertAfter = function (str, keepSelection) {
            __$coverCall('src/js/Jencil.js', '9587:9618');
            var e, s, scrollTop, text, _ref;
            __$coverCall('src/js/Jencil.js', '9626:9660');
            scrollTop = this.element.scrollTop;
            __$coverCall('src/js/Jencil.js', '9668:9713');
            _ref = this.caret(), s = _ref[0], e = _ref[1];
            __$coverCall('src/js/Jencil.js', '9721:9739');
            text = this.text();
            __$coverCall('src/js/Jencil.js', '9747:9777');
            this.replace(text + str, s, e);
            __$coverCall('src/js/Jencil.js', '9785:9790');
            s = e;
            __$coverCall('src/js/Jencil.js', '9798:9816');
            e = e + str.length;
            __$coverCall('src/js/Jencil.js', '9824:9867');
            if (!keepSelection) {
                __$coverCall('src/js/Jencil.js', '9854:9859');
                s = e;
            }
            __$coverCall('src/js/Jencil.js', '9875:9891');
            this.caret(s, e);
            __$coverCall('src/js/Jencil.js', '9899:9919');
            this.element.focus();
            __$coverCall('src/js/Jencil.js', '9927:9961');
            this.element.scrollTop = scrollTop;
            __$coverCall('src/js/Jencil.js', '9969:9980');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '9994:10728');
        Selection.prototype.enclose = function (lhs, rhs, keepSelection) {
            __$coverCall('src/js/Jencil.js', '10066:10102');
            var e, s, scrollTop, str, text, _ref;
            __$coverCall('src/js/Jencil.js', '10110:10144');
            scrollTop = this.element.scrollTop;
            __$coverCall('src/js/Jencil.js', '10152:10170');
            text = this.text();
            __$coverCall('src/js/Jencil.js', '10178:10632');
            if (text.indexOf(lhs) === 0 && text.lastIndexOf(rhs) === text.length - rhs.length) {
                __$coverCall('src/js/Jencil.js', '10273:10331');
                str = text.substring(lhs.length, text.length - rhs.length);
                __$coverCall('src/js/Jencil.js', '10341:10370');
                this.text(str, keepSelection);
            } else {
                __$coverCall('src/js/Jencil.js', '10395:10440');
                _ref = this.caret(), s = _ref[0], e = _ref[1];
                __$coverCall('src/js/Jencil.js', '10450:10486');
                this.replace(lhs + text + rhs, s, e);
                __$coverCall('src/js/Jencil.js', '10496:10541');
                e = s + lhs.length + text.length + rhs.length;
                __$coverCall('src/js/Jencil.js', '10551:10598');
                if (!keepSelection) {
                    __$coverCall('src/js/Jencil.js', '10583:10588');
                    s = e;
                }
                __$coverCall('src/js/Jencil.js', '10608:10624');
                this.caret(s, e);
            }
            __$coverCall('src/js/Jencil.js', '10640:10660');
            this.element.focus();
            __$coverCall('src/js/Jencil.js', '10668:10702');
            this.element.scrollTop = scrollTop;
            __$coverCall('src/js/Jencil.js', '10710:10721');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '10735:11042');
        Selection.prototype.lineCaret = function (pos) {
            __$coverCall('src/js/Jencil.js', '10789:10804');
            var e, s, value;
            __$coverCall('src/js/Jencil.js', '10812:10840');
            pos = pos || this.caret()[0];
            __$coverCall('src/js/Jencil.js', '10848:10874');
            value = this.element.value;
            __$coverCall('src/js/Jencil.js', '10882:10922');
            s = value.lastIndexOf('\n', pos - 1) + 1;
            __$coverCall('src/js/Jencil.js', '10930:10958');
            e = value.indexOf('\n', pos);
            __$coverCall('src/js/Jencil.js', '10966:11014');
            if (e === -1) {
                __$coverCall('src/js/Jencil.js', '10990:11006');
                e = value.length;
            }
            __$coverCall('src/js/Jencil.js', '11022:11035');
            return [
                s,
                e
            ];
        };
        __$coverCall('src/js/Jencil.js', '11049:11232');
        Selection.prototype._getLine = function (pos) {
            __$coverCall('src/js/Jencil.js', '11102:11116');
            var e, s, _ref;
            __$coverCall('src/js/Jencil.js', '11124:11176');
            _ref = this.lineCaret(pos), s = _ref[0], e = _ref[1];
            __$coverCall('src/js/Jencil.js', '11184:11225');
            return this.element.value.substring(s, e);
        };
        __$coverCall('src/js/Jencil.js', '11239:11662');
        Selection.prototype._setLine = function (line, keepSelection) {
            __$coverCall('src/js/Jencil.js', '11308:11333');
            var e, s, scrollTop, _ref;
            __$coverCall('src/js/Jencil.js', '11341:11375');
            scrollTop = this.element.scrollTop;
            __$coverCall('src/js/Jencil.js', '11383:11432');
            _ref = this.lineCaret(), s = _ref[0], e = _ref[1];
            __$coverCall('src/js/Jencil.js', '11440:11464');
            this.replace(line, s, e);
            __$coverCall('src/js/Jencil.js', '11472:11491');
            e = s + line.length;
            __$coverCall('src/js/Jencil.js', '11499:11542');
            if (!keepSelection) {
                __$coverCall('src/js/Jencil.js', '11529:11534');
                s = e;
            }
            __$coverCall('src/js/Jencil.js', '11550:11566');
            this.caret(s, e);
            __$coverCall('src/js/Jencil.js', '11574:11594');
            this.element.focus();
            __$coverCall('src/js/Jencil.js', '11602:11636');
            this.element.scrollTop = scrollTop;
            __$coverCall('src/js/Jencil.js', '11644:11655');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '11669:11851');
        Selection.prototype.line = function (value, keepSelection) {
            __$coverCall('src/js/Jencil.js', '11735:11814');
            if (value != null) {
                __$coverCall('src/js/Jencil.js', '11764:11806');
                return this._setLine(value, keepSelection);
            }
            __$coverCall('src/js/Jencil.js', '11822:11844');
            return this._getLine();
        };
        __$coverCall('src/js/Jencil.js', '11858:12030');
        Selection.prototype.selectWholeLine = function (pos) {
            __$coverCall('src/js/Jencil.js', '11918:11932');
            var e, s, _ref;
            __$coverCall('src/js/Jencil.js', '11940:11992');
            _ref = this.lineCaret(pos), s = _ref[0], e = _ref[1];
            __$coverCall('src/js/Jencil.js', '12000:12023');
            return this.caret(s, e);
        };
        __$coverCall('src/js/Jencil.js', '12037:12141');
        Selection.prototype.selectWholeCurrentLine = function () {
            __$coverCall('src/js/Jencil.js', '12101:12134');
            return this.selectWholeLine(null);
        };
        __$coverCall('src/js/Jencil.js', '12148:12164');
        return Selection;
    }();
    __$coverCall('src/js/Jencil.js', '12272:17625');
    evolute = function () {
        __$coverCall('src/js/Jencil.js', '12300:12474');
        var absoluteX, absoluteY, contentX, contentY, maxHeight, maxWidth, minHeight, minWidth, ncss, nonContentHeight, nonContentWidth, outerHeight, outerWidth, relativeX, relativeY;
        __$coverCall('src/js/Jencil.js', '12480:12663');
        nonContentWidth = function (includeMargin) {
            __$coverCall('src/js/Jencil.js', '12530:12596');
            if (includeMargin == null) {
                __$coverCall('src/js/Jencil.js', '12567:12588');
                includeMargin = false;
            }
            __$coverCall('src/js/Jencil.js', '12604:12656');
            return this.outerWidth(includeMargin) - this.width();
        };
        __$coverCall('src/js/Jencil.js', '12669:12855');
        nonContentHeight = function (includeMargin) {
            __$coverCall('src/js/Jencil.js', '12720:12786');
            if (includeMargin == null) {
                __$coverCall('src/js/Jencil.js', '12757:12778');
                includeMargin = false;
            }
            __$coverCall('src/js/Jencil.js', '12794:12848');
            return this.outerHeight(includeMargin) - this.height();
        };
        __$coverCall('src/js/Jencil.js', '12861:13299');
        outerWidth = function (includeMargin, value) {
            __$coverCall('src/js/Jencil.js', '12913:12923');
            var offset;
            __$coverCall('src/js/Jencil.js', '12931:12997');
            if (includeMargin == null) {
                __$coverCall('src/js/Jencil.js', '12968:12989');
                includeMargin = false;
            }
            __$coverCall('src/js/Jencil.js', '13005:13114');
            if (typeof includeMargin === 'number') {
                __$coverCall('src/js/Jencil.js', '13054:13075');
                value = includeMargin;
                __$coverCall('src/js/Jencil.js', '13085:13106');
                includeMargin = false;
            }
            __$coverCall('src/js/Jencil.js', '13122:13246');
            if (value != null) {
                __$coverCall('src/js/Jencil.js', '13151:13195');
                offset = this.nonContentWidth(includeMargin);
                __$coverCall('src/js/Jencil.js', '13205:13238');
                return this.width(value - offset);
            }
            __$coverCall('src/js/Jencil.js', '13254:13292');
            return this._outerWidth(includeMargin);
        };
        __$coverCall('src/js/Jencil.js', '13305:13747');
        outerHeight = function (includeMargin, value) {
            __$coverCall('src/js/Jencil.js', '13358:13368');
            var offset;
            __$coverCall('src/js/Jencil.js', '13376:13442');
            if (includeMargin == null) {
                __$coverCall('src/js/Jencil.js', '13413:13434');
                includeMargin = false;
            }
            __$coverCall('src/js/Jencil.js', '13450:13559');
            if (typeof includeMargin === 'number') {
                __$coverCall('src/js/Jencil.js', '13499:13520');
                value = includeMargin;
                __$coverCall('src/js/Jencil.js', '13530:13551');
                includeMargin = false;
            }
            __$coverCall('src/js/Jencil.js', '13567:13693');
            if (value != null) {
                __$coverCall('src/js/Jencil.js', '13596:13641');
                offset = this.nonContentHeight(includeMargin);
                __$coverCall('src/js/Jencil.js', '13651:13685');
                return this.height(value - offset);
            }
            __$coverCall('src/js/Jencil.js', '13701:13740');
            return this._outerHeight(includeMargin);
        };
        __$coverCall('src/js/Jencil.js', '13753:14125');
        ncss = function (propertyName, defaultValue) {
            __$coverCall('src/js/Jencil.js', '13805:13814');
            var value;
            __$coverCall('src/js/Jencil.js', '13822:13885');
            if (defaultValue == null) {
                __$coverCall('src/js/Jencil.js', '13858:13877');
                defaultValue = null;
            }
            __$coverCall('src/js/Jencil.js', '13893:13923');
            value = this.css(propertyName);
            __$coverCall('src/js/Jencil.js', '13931:14063');
            if (value === '' || value === 'none' || value === null || value === void 0 || value === NaN) {
                __$coverCall('src/js/Jencil.js', '14036:14055');
                return defaultValue;
            }
            __$coverCall('src/js/Jencil.js', '14071:14098');
            value = parseInt(value, 10);
            __$coverCall('src/js/Jencil.js', '14106:14118');
            return value;
        };
        __$coverCall('src/js/Jencil.js', '14131:14197');
        minWidth = function () {
            __$coverCall('src/js/Jencil.js', '14161:14190');
            return this.ncss('min-width');
        };
        __$coverCall('src/js/Jencil.js', '14203:14271');
        minHeight = function () {
            __$coverCall('src/js/Jencil.js', '14234:14264');
            return this.ncss('min-height');
        };
        __$coverCall('src/js/Jencil.js', '14277:14343');
        maxWidth = function () {
            __$coverCall('src/js/Jencil.js', '14307:14336');
            return this.ncss('max-width');
        };
        __$coverCall('src/js/Jencil.js', '14349:14417');
        maxHeight = function () {
            __$coverCall('src/js/Jencil.js', '14380:14410');
            return this.ncss('max-height');
        };
        __$coverCall('src/js/Jencil.js', '14423:14801');
        contentX = function (includeMargin) {
            __$coverCall('src/js/Jencil.js', '14466:14505');
            var borderLeft, marginLeft, paddingLeft;
            __$coverCall('src/js/Jencil.js', '14513:14579');
            if (includeMargin == null) {
                __$coverCall('src/js/Jencil.js', '14550:14571');
                includeMargin = false;
            }
            __$coverCall('src/js/Jencil.js', '14587:14644');
            marginLeft = includeMargin ? this.ncss('margin-left') : 0;
            __$coverCall('src/js/Jencil.js', '14652:14695');
            borderLeft = this.ncss('border-left-width');
            __$coverCall('src/js/Jencil.js', '14703:14742');
            paddingLeft = this.ncss('padding-left');
            __$coverCall('src/js/Jencil.js', '14750:14794');
            return marginLeft + borderLeft + paddingLeft;
        };
        __$coverCall('src/js/Jencil.js', '14807:15173');
        contentY = function (includeMargin) {
            __$coverCall('src/js/Jencil.js', '14850:14886');
            var borderTop, marginTop, paddingTop;
            __$coverCall('src/js/Jencil.js', '14894:14960');
            if (includeMargin == null) {
                __$coverCall('src/js/Jencil.js', '14931:14952');
                includeMargin = false;
            }
            __$coverCall('src/js/Jencil.js', '14968:15023');
            marginTop = includeMargin ? this.ncss('margin-top') : 0;
            __$coverCall('src/js/Jencil.js', '15031:15072');
            borderTop = this.ncss('border-top-width');
            __$coverCall('src/js/Jencil.js', '15080:15117');
            paddingTop = this.ncss('padding-top');
            __$coverCall('src/js/Jencil.js', '15125:15166');
            return marginTop + borderTop + paddingTop;
        };
        __$coverCall('src/js/Jencil.js', '15179:15388');
        absoluteX = function (value) {
            __$coverCall('src/js/Jencil.js', '15215:15225');
            var offset;
            __$coverCall('src/js/Jencil.js', '15233:15255');
            offset = this.offset();
            __$coverCall('src/js/Jencil.js', '15263:15355');
            if (value != null) {
                __$coverCall('src/js/Jencil.js', '15292:15311');
                offset.left = value;
                __$coverCall('src/js/Jencil.js', '15321:15347');
                return this.offset(offset);
            }
            __$coverCall('src/js/Jencil.js', '15363:15381');
            return offset.left;
        };
        __$coverCall('src/js/Jencil.js', '15394:15601');
        absoluteY = function (value) {
            __$coverCall('src/js/Jencil.js', '15430:15440');
            var offset;
            __$coverCall('src/js/Jencil.js', '15448:15470');
            offset = this.offset();
            __$coverCall('src/js/Jencil.js', '15478:15569');
            if (value != null) {
                __$coverCall('src/js/Jencil.js', '15507:15525');
                offset.top = value;
                __$coverCall('src/js/Jencil.js', '15535:15561');
                return this.offset(offset);
            }
            __$coverCall('src/js/Jencil.js', '15577:15594');
            return offset.top;
        };
        __$coverCall('src/js/Jencil.js', '15607:16103');
        relativeX = function (includeMargin, value) {
            __$coverCall('src/js/Jencil.js', '15658:15676');
            var offset, parent;
            __$coverCall('src/js/Jencil.js', '15684:15750');
            if (includeMargin == null) {
                __$coverCall('src/js/Jencil.js', '15721:15742');
                includeMargin = false;
            }
            __$coverCall('src/js/Jencil.js', '15758:15867');
            if (typeof includeMargin === 'number') {
                __$coverCall('src/js/Jencil.js', '15807:15828');
                value = includeMargin;
                __$coverCall('src/js/Jencil.js', '15838:15859');
                includeMargin = false;
            }
            __$coverCall('src/js/Jencil.js', '15875:15906');
            parent = evolute(this.parent());
            __$coverCall('src/js/Jencil.js', '15914:15974');
            offset = parent.absoluteX() + parent.contentX(includeMargin);
            __$coverCall('src/js/Jencil.js', '15982:16056');
            if (value != null) {
                __$coverCall('src/js/Jencil.js', '16011:16048');
                return this.absoluteX(value + offset);
            }
            __$coverCall('src/js/Jencil.js', '16064:16096');
            return this.absoluteX() - offset;
        };
        __$coverCall('src/js/Jencil.js', '16109:16605');
        relativeY = function (includeMargin, value) {
            __$coverCall('src/js/Jencil.js', '16160:16178');
            var offset, parent;
            __$coverCall('src/js/Jencil.js', '16186:16252');
            if (includeMargin == null) {
                __$coverCall('src/js/Jencil.js', '16223:16244');
                includeMargin = false;
            }
            __$coverCall('src/js/Jencil.js', '16260:16369');
            if (typeof includeMargin === 'number') {
                __$coverCall('src/js/Jencil.js', '16309:16330');
                value = includeMargin;
                __$coverCall('src/js/Jencil.js', '16340:16361');
                includeMargin = false;
            }
            __$coverCall('src/js/Jencil.js', '16377:16408');
            parent = evolute(this.parent());
            __$coverCall('src/js/Jencil.js', '16416:16476');
            offset = parent.absoluteY() + parent.contentY(includeMargin);
            __$coverCall('src/js/Jencil.js', '16484:16558');
            if (value != null) {
                __$coverCall('src/js/Jencil.js', '16513:16550');
                return this.absoluteY(value + offset);
            }
            __$coverCall('src/js/Jencil.js', '16566:16598');
            return this.absoluteY() - offset;
        };
        __$coverCall('src/js/Jencil.js', '16611:17597');
        evolute = function (jQueryObj) {
            __$coverCall('src/js/Jencil.js', '16649:16720');
            if (jQueryObj.__evoluted__ === true) {
                __$coverCall('src/js/Jencil.js', '16696:16712');
                return jQueryObj;
            }
            __$coverCall('src/js/Jencil.js', '16728:16772');
            jQueryObj._outerWidth = jQueryObj.outerWidth;
            __$coverCall('src/js/Jencil.js', '16780:16826');
            jQueryObj._outerHeight = jQueryObj.outerHeight;
            __$coverCall('src/js/Jencil.js', '16834:16877');
            jQueryObj.nonContentWidth = nonContentWidth;
            __$coverCall('src/js/Jencil.js', '16885:16930');
            jQueryObj.nonContentHeight = nonContentHeight;
            __$coverCall('src/js/Jencil.js', '16938:16971');
            jQueryObj.outerWidth = outerWidth;
            __$coverCall('src/js/Jencil.js', '16979:17014');
            jQueryObj.outerHeight = outerHeight;
            __$coverCall('src/js/Jencil.js', '17022:17065');
            jQueryObj.nonContentWidth = nonContentWidth;
            __$coverCall('src/js/Jencil.js', '17073:17118');
            jQueryObj.nonContentHeight = nonContentHeight;
            __$coverCall('src/js/Jencil.js', '17126:17147');
            jQueryObj.ncss = ncss;
            __$coverCall('src/js/Jencil.js', '17155:17184');
            jQueryObj.minWidth = minWidth;
            __$coverCall('src/js/Jencil.js', '17192:17223');
            jQueryObj.minHeight = minHeight;
            __$coverCall('src/js/Jencil.js', '17231:17260');
            jQueryObj.maxWidth = maxWidth;
            __$coverCall('src/js/Jencil.js', '17268:17299');
            jQueryObj.maxHeight = maxHeight;
            __$coverCall('src/js/Jencil.js', '17307:17336');
            jQueryObj.contentX = contentX;
            __$coverCall('src/js/Jencil.js', '17344:17373');
            jQueryObj.contentY = contentY;
            __$coverCall('src/js/Jencil.js', '17381:17412');
            jQueryObj.absoluteX = absoluteX;
            __$coverCall('src/js/Jencil.js', '17420:17451');
            jQueryObj.absoluteY = absoluteY;
            __$coverCall('src/js/Jencil.js', '17459:17490');
            jQueryObj.relativeX = relativeX;
            __$coverCall('src/js/Jencil.js', '17498:17529');
            jQueryObj.relativeY = relativeY;
            __$coverCall('src/js/Jencil.js', '17537:17566');
            jQueryObj.__evoluted__ = true;
            __$coverCall('src/js/Jencil.js', '17574:17590');
            return jQueryObj;
        };
        __$coverCall('src/js/Jencil.js', '17603:17617');
        return evolute;
    }();
    __$coverCall('src/js/Jencil.js', '17630:18269');
    curtainFactory = function (element) {
        __$coverCall('src/js/Jencil.js', '17671:17682');
        var curtain;
        __$coverCall('src/js/Jencil.js', '17688:17723');
        element.css('position', 'relative');
        __$coverCall('src/js/Jencil.js', '17729:17905');
        curtain = $('<div>').appendTo(element).hide().css({
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'overflow': 'hidden',
            'z-index': 99999
        });
        __$coverCall('src/js/Jencil.js', '17911:18008');
        curtain.on = function () {
            __$coverCall('src/js/Jencil.js', '17943:17960');
            curtain.refresh();
            __$coverCall('src/js/Jencil.js', '17968:17982');
            curtain.show();
            __$coverCall('src/js/Jencil.js', '17990:18001');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '18014:18165');
        curtain.refresh = function () {
            __$coverCall('src/js/Jencil.js', '18051:18090');
            curtain.width(element.outerWidth(true));
            __$coverCall('src/js/Jencil.js', '18098:18139');
            curtain.height(element.outerHeight(true));
            __$coverCall('src/js/Jencil.js', '18147:18158');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '18171:18244');
        curtain.off = function () {
            __$coverCall('src/js/Jencil.js', '18204:18218');
            curtain.hide();
            __$coverCall('src/js/Jencil.js', '18226:18237');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '18250:18264');
        return curtain;
    };
    __$coverCall('src/js/Jencil.js', '18554:19613');
    animate = function () {
        __$coverCall('src/js/Jencil.js', '18582:18605');
        var defaultOptions, now;
        __$coverCall('src/js/Jencil.js', '18611:18672');
        now = function () {
            __$coverCall('src/js/Jencil.js', '18636:18665');
            return new Date().getTime();
        };
        __$coverCall('src/js/Jencil.js', '18678:18842');
        defaultOptions = {
            start: 0,
            end: 100,
            duration: 1000,
            callbackEach: null,
            callbackDone: null,
            easing: jQuery.easing.swing
        };
        __$coverCall('src/js/Jencil.js', '18848:19605');
        return function (options) {
            __$coverCall('src/js/Jencil.js', '18881:18912');
            var difference, startTime, step;
            __$coverCall('src/js/Jencil.js', '18920:18968');
            options = jQuery.extend(defaultOptions, options);
            __$coverCall('src/js/Jencil.js', '18976:18993');
            startTime = now();
            __$coverCall('src/js/Jencil.js', '19001:19041');
            difference = options.end - options.start;
            __$coverCall('src/js/Jencil.js', '19049:19565');
            step = function () {
                __$coverCall('src/js/Jencil.js', '19077:19089');
                var epoch, x;
                __$coverCall('src/js/Jencil.js', '19099:19124');
                epoch = now() - startTime;
                __$coverCall('src/js/Jencil.js', '19134:19209');
                x = options.easing(epoch / options.duration, epoch, 0, 1, options.duration);
                __$coverCall('src/js/Jencil.js', '19219:19253');
                x = x * difference + options.start;
                __$coverCall('src/js/Jencil.js', '19263:19293');
                options.callbackEach(x, epoch);
                __$coverCall('src/js/Jencil.js', '19303:19556');
                if (epoch < options.duration) {
                    __$coverCall('src/js/Jencil.js', '19345:19371');
                    return setTimeout(step, 1);
                } else {
                    __$coverCall('src/js/Jencil.js', '19400:19451');
                    options.callbackEach(options.end, options.duration);
                    __$coverCall('src/js/Jencil.js', '19463:19546');
                    return typeof options.callbackDone === 'function' ? options.callbackDone() : void 0;
                }
            };
            __$coverCall('src/js/Jencil.js', '19573:19579');
            step();
            __$coverCall('src/js/Jencil.js', '19587:19598');
            return null;
        };
    }();
    __$coverCall('src/js/Jencil.js', '21038:22785');
    autoIndentable = function () {
        __$coverCall('src/js/Jencil.js', '21073:21087');
        var autoIndent;
        __$coverCall('src/js/Jencil.js', '21093:21788');
        autoIndent = function (e) {
            __$coverCall('src/js/Jencil.js', '21126:21171');
            var cancel, indent, insert, line, _ref, _ref1;
            __$coverCall('src/js/Jencil.js', '21179:21223');
            if (e.which !== 13) {
                __$coverCall('src/js/Jencil.js', '21209:21215');
                return;
            }
            __$coverCall('src/js/Jencil.js', '21231:21259');
            line = this.selection.line();
            __$coverCall('src/js/Jencil.js', '21267:21359');
            cancel = ((_ref = this.autoIndent.pre) != null ? _ref.call(this, e, line) : void 0) === true;
            __$coverCall('src/js/Jencil.js', '21367:21533');
            if (cancel !== true) {
                __$coverCall('src/js/Jencil.js', '21398:21442');
                indent = line.replace(/^([\t\s]*).*$/, '$1');
                __$coverCall('src/js/Jencil.js', '21452:21474');
                insert = '\n' + indent;
                __$coverCall('src/js/Jencil.js', '21484:21525');
                this.selection.insertAfter(insert, false);
            }
            __$coverCall('src/js/Jencil.js', '21541:21652');
            if ((_ref1 = this.autoIndent.post) != null) {
                __$coverCall('src/js/Jencil.js', '21595:21644');
                _ref1.call(this, e, line, indent, insert, cancel);
            }
            __$coverCall('src/js/Jencil.js', '21660:21679');
            e.stopPropagation();
            __$coverCall('src/js/Jencil.js', '21687:21715');
            e.stopImmediatePropagation();
            __$coverCall('src/js/Jencil.js', '21723:21741');
            e.preventDefault();
            __$coverCall('src/js/Jencil.js', '21749:21761');
            this.focus();
            __$coverCall('src/js/Jencil.js', '21769:21781');
            return false;
        };
        __$coverCall('src/js/Jencil.js', '21794:22777');
        return function (textarea, pre, post) {
            __$coverCall('src/js/Jencil.js', '21839:21914');
            if (!(textarea instanceof jQuery)) {
                __$coverCall('src/js/Jencil.js', '21884:21906');
                textarea = $(textarea);
            }
            __$coverCall('src/js/Jencil.js', '21922:22036');
            if (!(textarea.selection != null)) {
                __$coverCall('src/js/Jencil.js', '21967:22028');
                textarea.selection = new Selection(document, textarea.get(0));
            }
            __$coverCall('src/js/Jencil.js', '22044:22132');
            textarea.autoIndent = function (e) {
                __$coverCall('src/js/Jencil.js', '22088:22123');
                return autoIndent.call(textarea, e);
            };
            __$coverCall('src/js/Jencil.js', '22140:22267');
            textarea.autoIndent.enable = function () {
                __$coverCall('src/js/Jencil.js', '22190:22233');
                textarea.on('keydown', textarea.autoIndent);
                __$coverCall('src/js/Jencil.js', '22243:22258');
                return textarea;
            };
            __$coverCall('src/js/Jencil.js', '22275:22404');
            textarea.autoIndent.disable = function () {
                __$coverCall('src/js/Jencil.js', '22326:22370');
                textarea.off('keydown', textarea.autoIndent);
                __$coverCall('src/js/Jencil.js', '22380:22395');
                return textarea;
            };
            __$coverCall('src/js/Jencil.js', '22412:22548');
            if (pre != null) {
                __$coverCall('src/js/Jencil.js', '22439:22540');
                textarea.autoIndent.pre = function (e, line) {
                    __$coverCall('src/js/Jencil.js', '22495:22529');
                    return pre.call(textarea, e, line);
                };
            }
            __$coverCall('src/js/Jencil.js', '22556:22727');
            if (post != null) {
                __$coverCall('src/js/Jencil.js', '22584:22719');
                textarea.autoIndent.post = function (e, line, indent, insert) {
                    __$coverCall('src/js/Jencil.js', '22657:22708');
                    return post.call(textarea, e, line, indent, insert);
                };
            }
            __$coverCall('src/js/Jencil.js', '22735:22770');
            return textarea.autoIndent.enable();
        };
    }();
    __$coverCall('src/js/Jencil.js', '22790:22989');
    if (window.i18n != null) {
        __$coverCall('src/js/Jencil.js', '22821:22917');
        translate = function (key) {
            __$coverCall('src/js/Jencil.js', '22855:22910');
            return i18n.t(key, { defaultValue: key });
        };
    } else {
        __$coverCall('src/js/Jencil.js', '22934:22985');
        translate = function (key) {
            __$coverCall('src/js/Jencil.js', '22968:22978');
            return key;
        };
    }
    __$coverCall('src/js/Jencil.js', '22994:23211');
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
    __$coverCall('src/js/Jencil.js', '23216:24850');
    this.Jencil = function () {
        __$coverCall('src/js/Jencil.js', '23249:24281');
        function Jencil(textarea, options) {
            __$coverCall('src/js/Jencil.js', '23292:23332');
            var DefaultOptions, _this = this;
            __$coverCall('src/js/Jencil.js', '23340:23801');
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
            __$coverCall('src/js/Jencil.js', '23809:23862');
            this.options = jQuery.extend(DefaultOptions, options);
            __$coverCall('src/js/Jencil.js', '23870:23900');
            this.element = textarea.hide();
            __$coverCall('src/js/Jencil.js', '23908:23940');
            this.caretaker = new Caretaker();
            __$coverCall('src/js/Jencil.js', '23948:24027');
            this.caretaker.originator = function () {
                __$coverCall('src/js/Jencil.js', '23997:24018');
                return _this.editor();
            };
            __$coverCall('src/js/Jencil.js', '24035:24108');
            this.wrapper = new Wrapper(this, this.options.width, this.options.height);
            __$coverCall('src/js/Jencil.js', '24116:24154');
            this.fullscreen = new Fullscreen(this);
            __$coverCall('src/js/Jencil.js', '24162:24233');
            this.element.after(this.wrapper.element).after(this.fullscreen.element);
            __$coverCall('src/js/Jencil.js', '24241:24275');
            this.profile(this.options.profile);
        }
        __$coverCall('src/js/Jencil.js', '24288:24399');
        Jencil.prototype.editor = function () {
            __$coverCall('src/js/Jencil.js', '24333:24392');
            return this.wrapper.workspace.mainPanel.editorPanel || null;
        };
        __$coverCall('src/js/Jencil.js', '24406:24517');
        Jencil.prototype.viewer = function () {
            __$coverCall('src/js/Jencil.js', '24451:24510');
            return this.wrapper.workspace.mainPanel.viewerPanel || null;
        };
        __$coverCall('src/js/Jencil.js', '24524:24635');
        Jencil.prototype.helper = function () {
            __$coverCall('src/js/Jencil.js', '24569:24628');
            return this.wrapper.workspace.mainPanel.helperPanel || null;
        };
        __$coverCall('src/js/Jencil.js', '24642:24821');
        Jencil.prototype.profile = function (profileNameOrInstance) {
            __$coverCall('src/js/Jencil.js', '24709:24749');
            this.wrapper.init(profileNameOrInstance);
            __$coverCall('src/js/Jencil.js', '24757:24778');
            this.wrapper.adjust();
            __$coverCall('src/js/Jencil.js', '24786:24814');
            return this.caretaker.save();
        };
        __$coverCall('src/js/Jencil.js', '24828:24841');
        return Jencil;
    }();
    __$coverCall('src/js/Jencil.js', '24855:25036');
    $.fn.jencil = function (options) {
        __$coverCall('src/js/Jencil.js', '24893:25031');
        return $(this).each(function () {
            __$coverCall('src/js/Jencil.js', '24932:24940');
            var self;
            __$coverCall('src/js/Jencil.js', '24948:24962');
            self = $(this);
            __$coverCall('src/js/Jencil.js', '24970:25023');
            return self.data('jencil', new Jencil(self, options));
        });
    };
    __$coverCall('src/js/Jencil.js', '25041:25146');
    namespace('Jencil.profiles', function (exports) {
        __$coverCall('src/js/Jencil.js', '25094:25140');
        return exports.DefaultProfile = DefaultProfile;
    });
    __$coverCall('src/js/Jencil.js', '25151:25253');
    namespace('Jencil.utils.namespace', function (exports) {
        __$coverCall('src/js/Jencil.js', '25211:25247');
        return exports.namespace = namespace;
    });
    __$coverCall('src/js/Jencil.js', '25258:25357');
    namespace('Jencil.utils.strutils', function (exports) {
        __$coverCall('src/js/Jencil.js', '25317:25351');
        return exports.strutils = strutils;
    });
    __$coverCall('src/js/Jencil.js', '25362:25460');
    namespace('Jencil.utils.evolution', function (exports) {
        __$coverCall('src/js/Jencil.js', '25422:25454');
        return exports.evolute = evolute;
    });
    __$coverCall('src/js/Jencil.js', '25465:25567');
    namespace('Jencil.utils.selection', function (exports) {
        __$coverCall('src/js/Jencil.js', '25525:25561');
        return exports.Selection = Selection;
    });
    __$coverCall('src/js/Jencil.js', '25572:25670');
    namespace('Jencil.utils.animation', function (exports) {
        __$coverCall('src/js/Jencil.js', '25632:25664');
        return exports.animate = animate;
    });
    __$coverCall('src/js/Jencil.js', '25675:25788');
    namespace('Jencil.utils.autoindent', function (exports) {
        __$coverCall('src/js/Jencil.js', '25736:25782');
        return exports.autoIndentable = autoIndentable;
    });
    __$coverCall('src/js/Jencil.js', '25793:25903');
    namespace('Jencil.utils.curtain', function (exports) {
        __$coverCall('src/js/Jencil.js', '25851:25897');
        return exports.curtainFactory = curtainFactory;
    });
    __$coverCall('src/js/Jencil.js', '25908:26005');
    namespace('Jencil.utils.i18n', function (exports) {
        __$coverCall('src/js/Jencil.js', '25963:25999');
        return exports.translate = translate;
    });
    __$coverCall('src/js/Jencil.js', '26010:26199');
    namespace('Jencil.utils.undo', function (exports) {
        __$coverCall('src/js/Jencil.js', '26065:26114');
        exports.NotImplementedError = NotImplementedError;
        __$coverCall('src/js/Jencil.js', '26120:26151');
        exports.Originator = Originator;
        __$coverCall('src/js/Jencil.js', '26157:26193');
        return exports.Caretaker = Caretaker;
    });
    __$coverCall('src/js/Jencil.js', '26204:26282');
    namespace('Jencil', function (exports) {
        __$coverCall('src/js/Jencil.js', '26248:26276');
        return exports.t = translate;
    });
    __$coverCall('src/js/Jencil.js', '26287:26804');
    Widget = function () {
        __$coverCall('src/js/Jencil.js', '26315:26637');
        function Widget(core, selector, context) {
            __$coverCall('src/js/Jencil.js', '26364:26380');
            this.core = core;
            __$coverCall('src/js/Jencil.js', '26388:26446');
            if (selector == null) {
                __$coverCall('src/js/Jencil.js', '26420:26438');
                selector = '<div>';
            }
            __$coverCall('src/js/Jencil.js', '26454:26587');
            if (selector instanceof jQuery) {
                __$coverCall('src/js/Jencil.js', '26496:26519');
                this.element = selector;
            } else {
                __$coverCall('src/js/Jencil.js', '26544:26579');
                this.element = $(selector, context);
            }
            __$coverCall('src/js/Jencil.js', '26595:26631');
            this.element = evolute(this.element);
        }
        __$coverCall('src/js/Jencil.js', '26644:26705');
        Widget.prototype.init = function () {
            __$coverCall('src/js/Jencil.js', '26687:26698');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '26712:26775');
        Widget.prototype.adjust = function () {
            __$coverCall('src/js/Jencil.js', '26757:26768');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '26782:26795');
        return Widget;
    }();
    __$coverCall('src/js/Jencil.js', '26809:27128');
    Panel = function (_super) {
        __$coverCall('src/js/Jencil.js', '26842:26866');
        __extends(Panel, _super);
        __$coverCall('src/js/Jencil.js', '26873:27094');
        function Panel(core, selector, context) {
            __$coverCall('src/js/Jencil.js', '26921:26979');
            if (selector == null) {
                __$coverCall('src/js/Jencil.js', '26953:26971');
                selector = '<div>';
            }
            __$coverCall('src/js/Jencil.js', '26987:27050');
            Panel.__super__.constructor.call(this, core, selector, context);
            __$coverCall('src/js/Jencil.js', '27058:27088');
            this.element.addClass('panel');
        }
        __$coverCall('src/js/Jencil.js', '27101:27113');
        return Panel;
    }(Widget);
    __$coverCall('src/js/Jencil.js', '27133:29631');
    MultiplePanel = function (_super) {
        __$coverCall('src/js/Jencil.js', '27174:27206');
        __extends(MultiplePanel, _super);
        __$coverCall('src/js/Jencil.js', '27213:28385');
        function MultiplePanel(core, fst, snd, splitter) {
            __$coverCall('src/js/Jencil.js', '27270:27306');
            var hide, show, _this = this;
            __$coverCall('src/js/Jencil.js', '27314:27328');
            this.fst = fst;
            __$coverCall('src/js/Jencil.js', '27336:27350');
            this.snd = snd;
            __$coverCall('src/js/Jencil.js', '27358:27382');
            this.splitter = splitter;
            __$coverCall('src/js/Jencil.js', '27390:27442');
            MultiplePanel.__super__.constructor.call(this, core);
            __$coverCall('src/js/Jencil.js', '27450:27483');
            this.element.addClass('multiple');
            __$coverCall('src/js/Jencil.js', '27491:27528');
            this.element.append(this.fst.element);
            __$coverCall('src/js/Jencil.js', '27536:27578');
            this.element.append(this.splitter.element);
            __$coverCall('src/js/Jencil.js', '27586:27623');
            this.element.append(this.snd.element);
            __$coverCall('src/js/Jencil.js', '27631:27766');
            show = function (callback) {
                __$coverCall('src/js/Jencil.js', '27667:27757');
                if (!this.element.is(':visible')) {
                    __$coverCall('src/js/Jencil.js', '27713:27747');
                    return this.toggle(callback, null);
                }
            };
            __$coverCall('src/js/Jencil.js', '27774:27908');
            hide = function (callback) {
                __$coverCall('src/js/Jencil.js', '27810:27899');
                if (this.element.is(':visible')) {
                    __$coverCall('src/js/Jencil.js', '27855:27889');
                    return this.toggle(null, callback);
                }
            };
            __$coverCall('src/js/Jencil.js', '27916:28040');
            this.fst.toggle = function (callbackOn, callbackOff) {
                __$coverCall('src/js/Jencil.js', '27978:28031');
                return _this._togglePanel(0, callbackOn, callbackOff);
            };
            __$coverCall('src/js/Jencil.js', '28048:28068');
            this.fst.show = show;
            __$coverCall('src/js/Jencil.js', '28076:28096');
            this.fst.hide = hide;
            __$coverCall('src/js/Jencil.js', '28104:28228');
            this.snd.toggle = function (callbackOn, callbackOff) {
                __$coverCall('src/js/Jencil.js', '28166:28219');
                return _this._togglePanel(1, callbackOn, callbackOff);
            };
            __$coverCall('src/js/Jencil.js', '28236:28256');
            this.snd.show = show;
            __$coverCall('src/js/Jencil.js', '28264:28284');
            this.snd.hide = hide;
            __$coverCall('src/js/Jencil.js', '28292:28379');
            this.splitter.element.dblclick(function () {
                __$coverCall('src/js/Jencil.js', '28344:28369');
                return _this.snd.toggle();
            });
        }
        __$coverCall('src/js/Jencil.js', '28392:28522');
        MultiplePanel.prototype.init = function () {
            __$coverCall('src/js/Jencil.js', '28442:28462');
            this.splitter.init();
            __$coverCall('src/js/Jencil.js', '28470:28485');
            this.fst.init();
            __$coverCall('src/js/Jencil.js', '28493:28515');
            return this.snd.init();
        };
        __$coverCall('src/js/Jencil.js', '28529:29590');
        MultiplePanel.prototype._togglePanel = function (to, callbackOn, callbackOff) {
            __$coverCall('src/js/Jencil.js', '28614:28680');
            var callbackDone, end, volume, _callbackDone, _this = this;
            __$coverCall('src/js/Jencil.js', '28688:28742');
            if (MultiplePanel._animating) {
                __$coverCall('src/js/Jencil.js', '28728:28734');
                return;
            }
            __$coverCall('src/js/Jencil.js', '28750:28781');
            volume = this.splitter.volume();
            __$coverCall('src/js/Jencil.js', '28789:28808');
            callbackDone = null;
            __$coverCall('src/js/Jencil.js', '28816:29143');
            if (0 < volume && volume < 1) {
                __$coverCall('src/js/Jencil.js', '28858:28866');
                end = to;
                __$coverCall('src/js/Jencil.js', '28876:28914');
                this.splitter._previousVolume = volume;
                __$coverCall('src/js/Jencil.js', '28924:28951');
                _callbackDone = callbackOff;
            } else {
                __$coverCall('src/js/Jencil.js', '28976:29042');
                end = this.splitter._previousVolume || this.splitter.defaultVolume;
                __$coverCall('src/js/Jencil.js', '29052:29099');
                if (end === to) {
                    __$coverCall('src/js/Jencil.js', '29080:29089');
                    end = 0.5;
                }
                __$coverCall('src/js/Jencil.js', '29109:29135');
                _callbackDone = callbackOn;
            }
            __$coverCall('src/js/Jencil.js', '29151:29182');
            MultiplePanel._animating = true;
            __$coverCall('src/js/Jencil.js', '29190:29346');
            callbackDone = function () {
                __$coverCall('src/js/Jencil.js', '29226:29258');
                MultiplePanel._animating = false;
                __$coverCall('src/js/Jencil.js', '29268:29337');
                return typeof _callbackDone === 'function' ? _callbackDone() : void 0;
            };
            __$coverCall('src/js/Jencil.js', '29354:29583');
            return animate({
                start: volume,
                end: end,
                duration: 500,
                callbackEach: function (value, epoch) {
                    __$coverCall('src/js/Jencil.js', '29492:29527');
                    return _this.splitter.volume(value);
                },
                callbackDone: callbackDone
            });
        };
        __$coverCall('src/js/Jencil.js', '29597:29617');
        return MultiplePanel;
    }(Panel);
    __$coverCall('src/js/Jencil.js', '29636:30415');
    VerticalPanel = function (_super) {
        __$coverCall('src/js/Jencil.js', '29677:29709');
        __extends(VerticalPanel, _super);
        __$coverCall('src/js/Jencil.js', '29716:30059');
        function VerticalPanel(core, fst, snd, defaultVolume) {
            __$coverCall('src/js/Jencil.js', '29778:29790');
            var splitter;
            __$coverCall('src/js/Jencil.js', '29798:29862');
            if (defaultVolume == null) {
                __$coverCall('src/js/Jencil.js', '29835:29854');
                defaultVolume = 0.5;
            }
            __$coverCall('src/js/Jencil.js', '29870:29932');
            splitter = new VerticalSplitter(core, fst, snd, defaultVolume);
            __$coverCall('src/js/Jencil.js', '29940:30012');
            VerticalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
            __$coverCall('src/js/Jencil.js', '30020:30053');
            this.element.addClass('vertical');
        }
        __$coverCall('src/js/Jencil.js', '30066:30366');
        VerticalPanel.prototype.adjust = function () {
            __$coverCall('src/js/Jencil.js', '30118:30175');
            this.fst.element.outerHeight(true, this.element.height());
            __$coverCall('src/js/Jencil.js', '30183:30240');
            this.snd.element.outerHeight(true, this.element.height());
            __$coverCall('src/js/Jencil.js', '30248:30310');
            this.splitter.element.outerHeight(true, this.element.height());
            __$coverCall('src/js/Jencil.js', '30318:30340');
            this.splitter.adjust();
            __$coverCall('src/js/Jencil.js', '30348:30359');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '30373:30393');
        return VerticalPanel;
    }(MultiplePanel);
    __$coverCall('src/js/Jencil.js', '30420:31209');
    HorizontalPanel = function (_super) {
        __$coverCall('src/js/Jencil.js', '30463:30497');
        __extends(HorizontalPanel, _super);
        __$coverCall('src/js/Jencil.js', '30504:30855');
        function HorizontalPanel(core, fst, snd, defaultVolume) {
            __$coverCall('src/js/Jencil.js', '30568:30580');
            var splitter;
            __$coverCall('src/js/Jencil.js', '30588:30652');
            if (defaultVolume == null) {
                __$coverCall('src/js/Jencil.js', '30625:30644');
                defaultVolume = 0.5;
            }
            __$coverCall('src/js/Jencil.js', '30660:30724');
            splitter = new HorizontalSplitter(core, fst, snd, defaultVolume);
            __$coverCall('src/js/Jencil.js', '30732:30806');
            HorizontalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
            __$coverCall('src/js/Jencil.js', '30814:30849');
            this.element.addClass('horizontal');
        }
        __$coverCall('src/js/Jencil.js', '30862:31158');
        HorizontalPanel.prototype.adjust = function () {
            __$coverCall('src/js/Jencil.js', '30916:30971');
            this.fst.element.outerWidth(true, this.element.width());
            __$coverCall('src/js/Jencil.js', '30979:31034');
            this.snd.element.outerWidth(true, this.element.width());
            __$coverCall('src/js/Jencil.js', '31042:31102');
            this.splitter.element.outerWidth(true, this.element.width());
            __$coverCall('src/js/Jencil.js', '31110:31132');
            this.splitter.adjust();
            __$coverCall('src/js/Jencil.js', '31140:31151');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '31165:31187');
        return HorizontalPanel;
    }(MultiplePanel);
    __$coverCall('src/js/Jencil.js', '31214:31462');
    namespace('Jencil.widgets', function (exports) {
        __$coverCall('src/js/Jencil.js', '31266:31289');
        exports.Widget = Widget;
        __$coverCall('src/js/Jencil.js', '31295:31316');
        exports.Panel = Panel;
        __$coverCall('src/js/Jencil.js', '31322:31359');
        exports.MultiplePanel = MultiplePanel;
        __$coverCall('src/js/Jencil.js', '31365:31402');
        exports.VerticalPanel = VerticalPanel;
        __$coverCall('src/js/Jencil.js', '31408:31456');
        return exports.HorizontalPanel = HorizontalPanel;
    });
    __$coverCall('src/js/Jencil.js', '31467:34287');
    Splitter = function (_super) {
        __$coverCall('src/js/Jencil.js', '31503:31530');
        __extends(Splitter, _super);
        __$coverCall('src/js/Jencil.js', '31537:33183');
        function Splitter(core, fst, snd, defaultVolume) {
            __$coverCall('src/js/Jencil.js', '31594:31638');
            var mousemove, mouseup, _this = this;
            __$coverCall('src/js/Jencil.js', '31646:31660');
            this.fst = fst;
            __$coverCall('src/js/Jencil.js', '31668:31682');
            this.snd = snd;
            __$coverCall('src/js/Jencil.js', '31690:31754');
            this.defaultVolume = defaultVolume != null ? defaultVolume : 0.5;
            __$coverCall('src/js/Jencil.js', '31762:31809');
            Splitter.__super__.constructor.call(this, core);
            __$coverCall('src/js/Jencil.js', '31817:31850');
            this.element.addClass('splitter');
            __$coverCall('src/js/Jencil.js', '31858:31891');
            this._volume = this.defaultVolume;
            __$coverCall('src/js/Jencil.js', '31899:32261');
            mousemove = function (e) {
                __$coverCall('src/js/Jencil.js', '31933:31948');
                var _ref, _ref1;
                __$coverCall('src/js/Jencil.js', '31958:31976');
                _this.mousemove(e);
                __$coverCall('src/js/Jencil.js', '31986:32062');
                if ((_ref = _this.fst.curtain) != null) {
                    __$coverCall('src/js/Jencil.js', '32038:32052');
                    _ref.refresh();
                }
                __$coverCall('src/js/Jencil.js', '32072:32150');
                if ((_ref1 = _this.snd.curtain) != null) {
                    __$coverCall('src/js/Jencil.js', '32125:32140');
                    _ref1.refresh();
                }
                __$coverCall('src/js/Jencil.js', '32160:32179');
                e.stopPropagation();
                __$coverCall('src/js/Jencil.js', '32189:32217');
                e.stopImmediatePropagation();
                __$coverCall('src/js/Jencil.js', '32227:32252');
                return e.preventDefault();
            };
            __$coverCall('src/js/Jencil.js', '32269:32723');
            mouseup = function (e) {
                __$coverCall('src/js/Jencil.js', '32301:32325');
                var $window, _ref, _ref1;
                __$coverCall('src/js/Jencil.js', '32335:32354');
                $window = $(window);
                __$coverCall('src/js/Jencil.js', '32364:32402');
                $window.unbind('mousemove', mousemove);
                __$coverCall('src/js/Jencil.js', '32412:32446');
                $window.unbind('mouseup', mouseup);
                __$coverCall('src/js/Jencil.js', '32456:32528');
                if ((_ref = _this.fst.curtain) != null) {
                    __$coverCall('src/js/Jencil.js', '32508:32518');
                    _ref.off();
                }
                __$coverCall('src/js/Jencil.js', '32538:32612');
                if ((_ref1 = _this.snd.curtain) != null) {
                    __$coverCall('src/js/Jencil.js', '32591:32602');
                    _ref1.off();
                }
                __$coverCall('src/js/Jencil.js', '32622:32641');
                e.stopPropagation();
                __$coverCall('src/js/Jencil.js', '32651:32679');
                e.stopImmediatePropagation();
                __$coverCall('src/js/Jencil.js', '32689:32714');
                return e.preventDefault();
            };
            __$coverCall('src/js/Jencil.js', '32731:33177');
            this.element.mousedown(function (e) {
                __$coverCall('src/js/Jencil.js', '32776:32800');
                var $window, _ref, _ref1;
                __$coverCall('src/js/Jencil.js', '32810:32829');
                $window = $(window);
                __$coverCall('src/js/Jencil.js', '32839:32867');
                $window.mousemove(mousemove);
                __$coverCall('src/js/Jencil.js', '32877:32901');
                $window.mouseup(mouseup);
                __$coverCall('src/js/Jencil.js', '32911:32982');
                if ((_ref = _this.fst.curtain) != null) {
                    __$coverCall('src/js/Jencil.js', '32963:32972');
                    _ref.on();
                }
                __$coverCall('src/js/Jencil.js', '32992:33065');
                if ((_ref1 = _this.snd.curtain) != null) {
                    __$coverCall('src/js/Jencil.js', '33045:33055');
                    _ref1.on();
                }
                __$coverCall('src/js/Jencil.js', '33075:33094');
                e.stopPropagation();
                __$coverCall('src/js/Jencil.js', '33104:33132');
                e.stopImmediatePropagation();
                __$coverCall('src/js/Jencil.js', '33142:33167');
                return e.preventDefault();
            });
        }
        __$coverCall('src/js/Jencil.js', '33190:33308');
        Splitter.prototype.init = function () {
            __$coverCall('src/js/Jencil.js', '33235:33282');
            this.container = evolute(this.element.parent());
            __$coverCall('src/js/Jencil.js', '33290:33301');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '33315:33597');
        Splitter.prototype.volume = function (value, skip) {
            __$coverCall('src/js/Jencil.js', '33373:33421');
            if (skip == null) {
                __$coverCall('src/js/Jencil.js', '33401:33413');
                skip = false;
            }
            __$coverCall('src/js/Jencil.js', '33429:33563');
            if (value != null) {
                __$coverCall('src/js/Jencil.js', '33458:33478');
                this._volume = value;
                __$coverCall('src/js/Jencil.js', '33488:33534');
                if (!skip) {
                    __$coverCall('src/js/Jencil.js', '33511:33524');
                    this.adjust();
                }
                __$coverCall('src/js/Jencil.js', '33544:33555');
                return this;
            }
            __$coverCall('src/js/Jencil.js', '33571:33590');
            return this._volume;
        };
        __$coverCall('src/js/Jencil.js', '33604:33939');
        Splitter.prototype.value = function (value, skip) {
            __$coverCall('src/js/Jencil.js', '33661:33683');
            var valueWidth, volume;
            __$coverCall('src/js/Jencil.js', '33691:33739');
            if (skip == null) {
                __$coverCall('src/js/Jencil.js', '33719:33731');
                skip = false;
            }
            __$coverCall('src/js/Jencil.js', '33747:33777');
            valueWidth = this.valueWidth();
            __$coverCall('src/js/Jencil.js', '33785:33891');
            if (value != null) {
                __$coverCall('src/js/Jencil.js', '33814:33841');
                volume = value / valueWidth;
                __$coverCall('src/js/Jencil.js', '33851:33883');
                return this.volume(volume, skip);
            }
            __$coverCall('src/js/Jencil.js', '33899:33932');
            return this.volume() * valueWidth;
        };
        __$coverCall('src/js/Jencil.js', '33946:34250');
        Splitter.prototype.regulateValue = function (value) {
            __$coverCall('src/js/Jencil.js', '34005:34027');
            var maxValue, minValue;
            __$coverCall('src/js/Jencil.js', '34035:34061');
            minValue = this.minValue();
            __$coverCall('src/js/Jencil.js', '34069:34095');
            maxValue = this.maxValue();
            __$coverCall('src/js/Jencil.js', '34103:34159');
            if (value < minValue) {
                __$coverCall('src/js/Jencil.js', '34135:34151');
                value = minValue;
            }
            __$coverCall('src/js/Jencil.js', '34167:34223');
            if (value > maxValue) {
                __$coverCall('src/js/Jencil.js', '34199:34215');
                value = maxValue;
            }
            __$coverCall('src/js/Jencil.js', '34231:34243');
            return value;
        };
        __$coverCall('src/js/Jencil.js', '34257:34272');
        return Splitter;
    }(Widget);
    __$coverCall('src/js/Jencil.js', '34292:37720');
    VerticalSplitter = function (_super) {
        __$coverCall('src/js/Jencil.js', '34336:34371');
        __extends(VerticalSplitter, _super);
        __$coverCall('src/js/Jencil.js', '34378:35000');
        function VerticalSplitter(core, fst, snd, defaultVolume) {
            __$coverCall('src/js/Jencil.js', '34443:34458');
            var _ref, _ref1;
            __$coverCall('src/js/Jencil.js', '34466:34546');
            VerticalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);
            __$coverCall('src/js/Jencil.js', '34554:34587');
            this.element.addClass('vertical');
            __$coverCall('src/js/Jencil.js', '34595:34628');
            this.fst.element.addClass('left');
            __$coverCall('src/js/Jencil.js', '34636:34670');
            this.snd.element.addClass('right');
            __$coverCall('src/js/Jencil.js', '34678:34733');
            this.fst.element.css({ 'float': 'left' });
            __$coverCall('src/js/Jencil.js', '34741:34796');
            this.snd.element.css({ 'float': 'left' });
            __$coverCall('src/js/Jencil.js', '34804:34894');
            if ((_ref = this.fst.curtain) != null) {
                __$coverCall('src/js/Jencil.js', '34853:34886');
                _ref.css('pointer', 'col-resize');
            }
            __$coverCall('src/js/Jencil.js', '34902:34994');
            if ((_ref1 = this.snd.curtain) != null) {
                __$coverCall('src/js/Jencil.js', '34952:34986');
                _ref1.css('pointer', 'col-resize');
            }
        }
        __$coverCall('src/js/Jencil.js', '35007:35270');
        VerticalSplitter.prototype.mousemove = function (e) {
            __$coverCall('src/js/Jencil.js', '35066:35083');
            var offset, value;
            __$coverCall('src/js/Jencil.js', '35091:35158');
            offset = this.container.absoluteX() + this.container.contentX(true);
            __$coverCall('src/js/Jencil.js', '35166:35190');
            value = e.pageX - offset;
            __$coverCall('src/js/Jencil.js', '35198:35231');
            value = this.regulateValue(value);
            __$coverCall('src/js/Jencil.js', '35239:35263');
            return this.value(value);
        };
        __$coverCall('src/js/Jencil.js', '35277:35372');
        VerticalSplitter.prototype.valueWidth = function () {
            __$coverCall('src/js/Jencil.js', '35336:35365');
            return this.container.width();
        };
        __$coverCall('src/js/Jencil.js', '35379:35789');
        VerticalSplitter.prototype.minValue = function () {
            __$coverCall('src/js/Jencil.js', '35436:35446');
            var m1, m2;
            __$coverCall('src/js/Jencil.js', '35454:35523');
            m1 = this.fst.element.minWidth() + this.fst.element.nonContentWidth();
            __$coverCall('src/js/Jencil.js', '35531:35563');
            m2 = this.snd.element.maxWidth();
            __$coverCall('src/js/Jencil.js', '35571:35671');
            if (m2 != null) {
                __$coverCall('src/js/Jencil.js', '35597:35663');
                m2 = this.valueWidth() - (m2 + this.snd.element.nonContentWidth());
            }
            __$coverCall('src/js/Jencil.js', '35679:35754');
            if (m1 != null && m2 != null) {
                __$coverCall('src/js/Jencil.js', '35723:35746');
                return Math.max(m1, m2);
            }
            __$coverCall('src/js/Jencil.js', '35762:35782');
            return m1 || m2 || 0;
        };
        __$coverCall('src/js/Jencil.js', '35796:36305');
        VerticalSplitter.prototype.maxValue = function () {
            __$coverCall('src/js/Jencil.js', '35853:35875');
            var m1, m2, valueWidth;
            __$coverCall('src/js/Jencil.js', '35883:35913');
            valueWidth = this.valueWidth();
            __$coverCall('src/js/Jencil.js', '35921:35953');
            m1 = this.fst.element.maxWidth();
            __$coverCall('src/js/Jencil.js', '35961:36039');
            if (m1 != null) {
                __$coverCall('src/js/Jencil.js', '35987:36031');
                m1 = m1 + this.fst.element.nonContentWidth();
            }
            __$coverCall('src/js/Jencil.js', '36047:36116');
            m2 = this.snd.element.minWidth() + this.snd.element.nonContentWidth();
            __$coverCall('src/js/Jencil.js', '36124:36178');
            if (m2 != null) {
                __$coverCall('src/js/Jencil.js', '36150:36170');
                m2 = valueWidth - m2;
            }
            __$coverCall('src/js/Jencil.js', '36186:36261');
            if (m1 != null && m2 != null) {
                __$coverCall('src/js/Jencil.js', '36230:36253');
                return Math.min(m1, m2);
            }
            __$coverCall('src/js/Jencil.js', '36269:36298');
            return m1 || m2 || valueWidth;
        };
        __$coverCall('src/js/Jencil.js', '36312:37673');
        VerticalSplitter.prototype.adjust = function () {
            __$coverCall('src/js/Jencil.js', '36367:36408');
            var fstValue, sndValue, value, valueWidth;
            __$coverCall('src/js/Jencil.js', '36416:36436');
            value = this.value();
            __$coverCall('src/js/Jencil.js', '36444:36474');
            valueWidth = this.valueWidth();
            __$coverCall('src/js/Jencil.js', '36482:36539');
            fstValue = value - this.fst.element.nonContentWidth(true);
            __$coverCall('src/js/Jencil.js', '36547:36619');
            sndValue = valueWidth - value - this.snd.element.nonContentWidth(true);
            __$coverCall('src/js/Jencil.js', '36627:37528');
            if (fstValue <= 0) {
                __$coverCall('src/js/Jencil.js', '36656:36738');
                if (this.fst.element.is(':visible')) {
                    __$coverCall('src/js/Jencil.js', '36705:36728');
                    this.fst.element.hide();
                }
                __$coverCall('src/js/Jencil.js', '36748:36831');
                if (!this.snd.element.is(':visible')) {
                    __$coverCall('src/js/Jencil.js', '36798:36821');
                    this.snd.element.show();
                }
                __$coverCall('src/js/Jencil.js', '36841:36886');
                this.snd.element.outerWidth(true, valueWidth);
                __$coverCall('src/js/Jencil.js', '36896:36919');
                this._value = value = 0;
            } else if (sndValue <= 0) {
                __$coverCall('src/js/Jencil.js', '36963:37046');
                if (!this.fst.element.is(':visible')) {
                    __$coverCall('src/js/Jencil.js', '37013:37036');
                    this.fst.element.show();
                }
                __$coverCall('src/js/Jencil.js', '37056:37138');
                if (this.snd.element.is(':visible')) {
                    __$coverCall('src/js/Jencil.js', '37105:37128');
                    this.snd.element.hide();
                }
                __$coverCall('src/js/Jencil.js', '37148:37193');
                this.fst.element.outerWidth(true, valueWidth);
                __$coverCall('src/js/Jencil.js', '37203:37235');
                this._value = value = valueWidth;
            } else {
                __$coverCall('src/js/Jencil.js', '37260:37343');
                if (!this.fst.element.is(':visible')) {
                    __$coverCall('src/js/Jencil.js', '37310:37333');
                    this.fst.element.show();
                }
                __$coverCall('src/js/Jencil.js', '37353:37436');
                if (!this.snd.element.is(':visible')) {
                    __$coverCall('src/js/Jencil.js', '37403:37426');
                    this.snd.element.show();
                }
                __$coverCall('src/js/Jencil.js', '37446:37478');
                this.fst.element.width(fstValue);
                __$coverCall('src/js/Jencil.js', '37488:37520');
                this.snd.element.width(sndValue);
            }
            __$coverCall('src/js/Jencil.js', '37536:37553');
            this.fst.adjust();
            __$coverCall('src/js/Jencil.js', '37561:37578');
            this.snd.adjust();
            __$coverCall('src/js/Jencil.js', '37586:37647');
            this.element.relativeX(value - this.element.outerWidth() / 2);
            __$coverCall('src/js/Jencil.js', '37655:37666');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '37680:37703');
        return VerticalSplitter;
    }(Splitter);
    __$coverCall('src/js/Jencil.js', '37725:41065');
    HorizontalSplitter = function (_super) {
        __$coverCall('src/js/Jencil.js', '37771:37808');
        __extends(HorizontalSplitter, _super);
        __$coverCall('src/js/Jencil.js', '37815:38317');
        function HorizontalSplitter(core, fst, snd, defaultVolume) {
            __$coverCall('src/js/Jencil.js', '37882:37897');
            var _ref, _ref1;
            __$coverCall('src/js/Jencil.js', '37905:37987');
            HorizontalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);
            __$coverCall('src/js/Jencil.js', '37995:38030');
            this.element.addClass('horizontal');
            __$coverCall('src/js/Jencil.js', '38038:38070');
            this.fst.element.addClass('top');
            __$coverCall('src/js/Jencil.js', '38078:38113');
            this.snd.element.addClass('bottom');
            __$coverCall('src/js/Jencil.js', '38121:38211');
            if ((_ref = this.fst.curtain) != null) {
                __$coverCall('src/js/Jencil.js', '38170:38203');
                _ref.css('pointer', 'raw-resize');
            }
            __$coverCall('src/js/Jencil.js', '38219:38311');
            if ((_ref1 = this.snd.curtain) != null) {
                __$coverCall('src/js/Jencil.js', '38269:38303');
                _ref1.css('pointer', 'raw-resize');
            }
        }
        __$coverCall('src/js/Jencil.js', '38324:38589');
        HorizontalSplitter.prototype.mousemove = function (e) {
            __$coverCall('src/js/Jencil.js', '38385:38402');
            var offset, value;
            __$coverCall('src/js/Jencil.js', '38410:38477');
            offset = this.container.absoluteY() + this.container.contentY(true);
            __$coverCall('src/js/Jencil.js', '38485:38509');
            value = e.pageY - offset;
            __$coverCall('src/js/Jencil.js', '38517:38550');
            value = this.regulateValue(value);
            __$coverCall('src/js/Jencil.js', '38558:38582');
            return this.value(value);
        };
        __$coverCall('src/js/Jencil.js', '38596:38694');
        HorizontalSplitter.prototype.valueWidth = function () {
            __$coverCall('src/js/Jencil.js', '38657:38687');
            return this.container.height();
        };
        __$coverCall('src/js/Jencil.js', '38701:39117');
        HorizontalSplitter.prototype.minValue = function () {
            __$coverCall('src/js/Jencil.js', '38760:38770');
            var m1, m2;
            __$coverCall('src/js/Jencil.js', '38778:38849');
            m1 = this.fst.element.minHeight() + this.fst.element.nonContentHeight();
            __$coverCall('src/js/Jencil.js', '38857:38890');
            m2 = this.snd.element.maxHeight();
            __$coverCall('src/js/Jencil.js', '38898:38999');
            if (m2 != null) {
                __$coverCall('src/js/Jencil.js', '38924:38991');
                m2 = this.valueWidth() - (m2 + this.snd.element.nonContentHeight());
            }
            __$coverCall('src/js/Jencil.js', '39007:39082');
            if (m1 != null && m2 != null) {
                __$coverCall('src/js/Jencil.js', '39051:39074');
                return Math.max(m1, m2);
            }
            __$coverCall('src/js/Jencil.js', '39090:39110');
            return m1 || m2 || 0;
        };
        __$coverCall('src/js/Jencil.js', '39124:39639');
        HorizontalSplitter.prototype.maxValue = function () {
            __$coverCall('src/js/Jencil.js', '39183:39205');
            var m1, m2, valueWidth;
            __$coverCall('src/js/Jencil.js', '39213:39243');
            valueWidth = this.valueWidth();
            __$coverCall('src/js/Jencil.js', '39251:39284');
            m1 = this.fst.element.maxHeight();
            __$coverCall('src/js/Jencil.js', '39292:39371');
            if (m1 != null) {
                __$coverCall('src/js/Jencil.js', '39318:39363');
                m1 = m1 + this.fst.element.nonContentHeight();
            }
            __$coverCall('src/js/Jencil.js', '39379:39450');
            m2 = this.snd.element.minHeight() + this.snd.element.nonContentHeight();
            __$coverCall('src/js/Jencil.js', '39458:39512');
            if (m2 != null) {
                __$coverCall('src/js/Jencil.js', '39484:39504');
                m2 = valueWidth - m2;
            }
            __$coverCall('src/js/Jencil.js', '39520:39595');
            if (m1 != null && m2 != null) {
                __$coverCall('src/js/Jencil.js', '39564:39587');
                return Math.min(m1, m2);
            }
            __$coverCall('src/js/Jencil.js', '39603:39632');
            return m1 || m2 || valueWidth;
        };
        __$coverCall('src/js/Jencil.js', '39646:41016');
        HorizontalSplitter.prototype.adjust = function () {
            __$coverCall('src/js/Jencil.js', '39703:39744');
            var fstValue, sndValue, value, valueWidth;
            __$coverCall('src/js/Jencil.js', '39752:39772');
            value = this.value();
            __$coverCall('src/js/Jencil.js', '39780:39810');
            valueWidth = this.valueWidth();
            __$coverCall('src/js/Jencil.js', '39818:39876');
            fstValue = value - this.fst.element.nonContentHeight(true);
            __$coverCall('src/js/Jencil.js', '39884:39957');
            sndValue = valueWidth - value - this.snd.element.nonContentHeight(true);
            __$coverCall('src/js/Jencil.js', '39965:40870');
            if (fstValue <= 0) {
                __$coverCall('src/js/Jencil.js', '39994:40076');
                if (this.fst.element.is(':visible')) {
                    __$coverCall('src/js/Jencil.js', '40043:40066');
                    this.fst.element.hide();
                }
                __$coverCall('src/js/Jencil.js', '40086:40169');
                if (!this.snd.element.is(':visible')) {
                    __$coverCall('src/js/Jencil.js', '40136:40159');
                    this.snd.element.show();
                }
                __$coverCall('src/js/Jencil.js', '40179:40225');
                this.snd.element.outerHeight(true, valueWidth);
                __$coverCall('src/js/Jencil.js', '40235:40258');
                this._value = value = 0;
            } else if (sndValue <= 0) {
                __$coverCall('src/js/Jencil.js', '40302:40385');
                if (!this.fst.element.is(':visible')) {
                    __$coverCall('src/js/Jencil.js', '40352:40375');
                    this.fst.element.show();
                }
                __$coverCall('src/js/Jencil.js', '40395:40477');
                if (this.snd.element.is(':visible')) {
                    __$coverCall('src/js/Jencil.js', '40444:40467');
                    this.snd.element.hide();
                }
                __$coverCall('src/js/Jencil.js', '40487:40533');
                this.fst.element.outerHeight(true, valueWidth);
                __$coverCall('src/js/Jencil.js', '40543:40575');
                this._value = value = valueWidth;
            } else {
                __$coverCall('src/js/Jencil.js', '40600:40683');
                if (!this.fst.element.is(':visible')) {
                    __$coverCall('src/js/Jencil.js', '40650:40673');
                    this.fst.element.show();
                }
                __$coverCall('src/js/Jencil.js', '40693:40776');
                if (!this.snd.element.is(':visible')) {
                    __$coverCall('src/js/Jencil.js', '40743:40766');
                    this.snd.element.show();
                }
                __$coverCall('src/js/Jencil.js', '40786:40819');
                this.fst.element.height(fstValue);
                __$coverCall('src/js/Jencil.js', '40829:40862');
                this.snd.element.height(sndValue);
            }
            __$coverCall('src/js/Jencil.js', '40878:40895');
            this.fst.adjust();
            __$coverCall('src/js/Jencil.js', '40903:40920');
            this.snd.adjust();
            __$coverCall('src/js/Jencil.js', '40928:40990');
            this.element.relativeY(value - this.element.outerHeight() / 2);
            __$coverCall('src/js/Jencil.js', '40998:41009');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '41023:41048');
        return HorizontalSplitter;
    }(Splitter);
    __$coverCall('src/js/Jencil.js', '41070:41266');
    namespace('Jencil.splitters', function (exports) {
        __$coverCall('src/js/Jencil.js', '41124:41151');
        exports.Splitter = Splitter;
        __$coverCall('src/js/Jencil.js', '41157:41200');
        exports.VerticalSplitter = VerticalSplitter;
        __$coverCall('src/js/Jencil.js', '41206:41260');
        return exports.HorizontalSplitter = HorizontalSplitter;
    });
    __$coverCall('src/js/Jencil.js', '41271:42789');
    BaseEditor = function (_super) {
        __$coverCall('src/js/Jencil.js', '41309:41338');
        __extends(BaseEditor, _super);
        __$coverCall('src/js/Jencil.js', '41345:41611');
        function BaseEditor(core, selector, context) {
            __$coverCall('src/js/Jencil.js', '41398:41456');
            if (selector == null) {
                __$coverCall('src/js/Jencil.js', '41430:41448');
                selector = '<div>';
            }
            __$coverCall('src/js/Jencil.js', '41464:41532');
            BaseEditor.__super__.constructor.call(this, core, selector, context);
            __$coverCall('src/js/Jencil.js', '41540:41571');
            this.element.addClass('editor');
            __$coverCall('src/js/Jencil.js', '41579:41605');
            this._changeCallbacks = [];
        }
        __$coverCall('src/js/Jencil.js', '41618:41714');
        BaseEditor.prototype.val = function (value) {
            __$coverCall('src/js/Jencil.js', '41669:41707');
            throw new Error('NotImplementedError');
        };
        __$coverCall('src/js/Jencil.js', '41721:42099');
        BaseEditor.prototype.change = function (callback) {
            __$coverCall('src/js/Jencil.js', '41778:41796');
            var _i, _len, _ref;
            __$coverCall('src/js/Jencil.js', '41804:41901');
            if (callback != null) {
                __$coverCall('src/js/Jencil.js', '41836:41872');
                this._changeCallbacks.push(callback);
                __$coverCall('src/js/Jencil.js', '41882:41893');
                return this;
            }
            __$coverCall('src/js/Jencil.js', '41909:41937');
            _ref = this._changeCallbacks;
            __$coverCall('src/js/Jencil.js', '41945:42073');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                __$coverCall('src/js/Jencil.js', '42005:42024');
                callback = _ref[_i];
                __$coverCall('src/js/Jencil.js', '42034:42065');
                callback.call(this, this.val());
            }
            __$coverCall('src/js/Jencil.js', '42081:42092');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '42106:42136');
        BaseEditor.prototype.h1 = null;
        __$coverCall('src/js/Jencil.js', '42143:42173');
        BaseEditor.prototype.h2 = null;
        __$coverCall('src/js/Jencil.js', '42180:42210');
        BaseEditor.prototype.h3 = null;
        __$coverCall('src/js/Jencil.js', '42217:42247');
        BaseEditor.prototype.h4 = null;
        __$coverCall('src/js/Jencil.js', '42254:42284');
        BaseEditor.prototype.h5 = null;
        __$coverCall('src/js/Jencil.js', '42291:42321');
        BaseEditor.prototype.h6 = null;
        __$coverCall('src/js/Jencil.js', '42328:42360');
        BaseEditor.prototype.bold = null;
        __$coverCall('src/js/Jencil.js', '42367:42401');
        BaseEditor.prototype.italic = null;
        __$coverCall('src/js/Jencil.js', '42408:42445');
        BaseEditor.prototype.underline = null;
        __$coverCall('src/js/Jencil.js', '42452:42486');
        BaseEditor.prototype.strike = null;
        __$coverCall('src/js/Jencil.js', '42493:42532');
        BaseEditor.prototype.superscript = null;
        __$coverCall('src/js/Jencil.js', '42539:42576');
        BaseEditor.prototype.subscript = null;
        __$coverCall('src/js/Jencil.js', '42583:42617');
        BaseEditor.prototype.anchor = null;
        __$coverCall('src/js/Jencil.js', '42624:42657');
        BaseEditor.prototype.image = null;
        __$coverCall('src/js/Jencil.js', '42664:42705');
        BaseEditor.prototype.unorderedList = null;
        __$coverCall('src/js/Jencil.js', '42712:42751');
        BaseEditor.prototype.orderedList = null;
        __$coverCall('src/js/Jencil.js', '42758:42775');
        return BaseEditor;
    }(Panel);
    __$coverCall('src/js/Jencil.js', '42794:46209');
    TextEditor = function (_super) {
        __$coverCall('src/js/Jencil.js', '42832:42861');
        __extends(TextEditor, _super);
        __$coverCall('src/js/Jencil.js', '42868:43925');
        function TextEditor(core, selector, context) {
            __$coverCall('src/js/Jencil.js', '42921:42937');
            var _this = this;
            __$coverCall('src/js/Jencil.js', '42945:43003');
            if (selector == null) {
                __$coverCall('src/js/Jencil.js', '42977:42995');
                selector = '<div>';
            }
            __$coverCall('src/js/Jencil.js', '43011:43079');
            TextEditor.__super__.constructor.call(this, core, selector, context);
            __$coverCall('src/js/Jencil.js', '43087:43281');
            this.textarea = $('<textarea>').appendTo(this.element).css({
                'margin': '0',
                'padding': '0',
                'border': 'none',
                'outline': 'none',
                'resize': 'none'
            });
            __$coverCall('src/js/Jencil.js', '43289:43327');
            this.textarea = evolute(this.textarea);
            __$coverCall('src/js/Jencil.js', '43335:43487');
            this.textarea.on('keydown', function (e) {
                __$coverCall('src/js/Jencil.js', '43385:43433');
                if (e.which !== 13) {
                    __$coverCall('src/js/Jencil.js', '43417:43423');
                    return;
                }
                __$coverCall('src/js/Jencil.js', '43443:43477');
                return _this.core.caretaker.save();
            });
            __$coverCall('src/js/Jencil.js', '43495:43659');
            if ($.fn.tabby != null && this.core.options.enableTabIndent) {
                __$coverCall('src/js/Jencil.js', '43568:43651');
                this.textarea.tabby({ 'tabString': this.core.options.tabString });
            }
            __$coverCall('src/js/Jencil.js', '43667:43712');
            this.textarea = autoIndentable(this.textarea);
            __$coverCall('src/js/Jencil.js', '43720:43813');
            if (!this.core.options.enableAutoIndent) {
                __$coverCall('src/js/Jencil.js', '43771:43805');
                this.textarea.autoIndent.disable();
            }
            __$coverCall('src/js/Jencil.js', '43821:43919');
            this.textarea.on('keypress keyup click blur', function () {
                __$coverCall('src/js/Jencil.js', '43888:43909');
                return _this.change();
            });
        }
        __$coverCall('src/js/Jencil.js', '43932:44129');
        TextEditor.prototype.val = function (value) {
            __$coverCall('src/js/Jencil.js', '43983:44088');
            if (value != null) {
                __$coverCall('src/js/Jencil.js', '44012:44036');
                this.textarea.val(value);
                __$coverCall('src/js/Jencil.js', '44046:44059');
                this.change();
                __$coverCall('src/js/Jencil.js', '44069:44080');
                return this;
            }
            __$coverCall('src/js/Jencil.js', '44096:44122');
            return this.textarea.val();
        };
        __$coverCall('src/js/Jencil.js', '44136:44231');
        TextEditor.prototype.focus = function () {
            __$coverCall('src/js/Jencil.js', '44184:44205');
            this.textarea.focus();
            __$coverCall('src/js/Jencil.js', '44213:44224');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '44238:44318');
        TextEditor.prototype.createMemento = function () {
            __$coverCall('src/js/Jencil.js', '44294:44311');
            return this.val();
        };
        __$coverCall('src/js/Jencil.js', '44325:44416');
        TextEditor.prototype.setMemento = function (memento) {
            __$coverCall('src/js/Jencil.js', '44385:44409');
            return this.val(memento);
        };
        __$coverCall('src/js/Jencil.js', '44423:44600');
        TextEditor.prototype.adjust = function () {
            __$coverCall('src/js/Jencil.js', '44472:44518');
            this.textarea.outerWidth(this.element.width());
            __$coverCall('src/js/Jencil.js', '44526:44574');
            this.textarea.outerHeight(this.element.height());
            __$coverCall('src/js/Jencil.js', '44582:44593');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '44607:44847');
        TextEditor.prototype.selectWholeLineIfNoSelectionFound = function () {
            __$coverCall('src/js/Jencil.js', '44683:44692');
            var caret;
            __$coverCall('src/js/Jencil.js', '44700:44739');
            caret = this.textarea.selection.caret();
            __$coverCall('src/js/Jencil.js', '44747:44840');
            if (caret[0] === caret[1]) {
                __$coverCall('src/js/Jencil.js', '44784:44832');
                this.textarea.selection.selectWholeCurrentLine();
            }
        };
        __$coverCall('src/js/Jencil.js', '44854:45198');
        TextEditor.prototype.selection = function (str, keepSelection) {
            __$coverCall('src/js/Jencil.js', '44924:44989');
            if (keepSelection == null) {
                __$coverCall('src/js/Jencil.js', '44961:44981');
                keepSelection = true;
            }
            __$coverCall('src/js/Jencil.js', '44997:45146');
            if (str != null) {
                __$coverCall('src/js/Jencil.js', '45024:45072');
                this.textarea.selection.text(str, keepSelection);
                __$coverCall('src/js/Jencil.js', '45082:45108');
                this.core.caretaker.save();
                __$coverCall('src/js/Jencil.js', '45118:45138');
                return this.change();
            }
            __$coverCall('src/js/Jencil.js', '45154:45191');
            return this.textarea.selection.text();
        };
        __$coverCall('src/js/Jencil.js', '45205:45516');
        TextEditor.prototype.enclose = function (b, a, keepSelection) {
            __$coverCall('src/js/Jencil.js', '45274:45339');
            if (keepSelection == null) {
                __$coverCall('src/js/Jencil.js', '45311:45331');
                keepSelection = true;
            }
            __$coverCall('src/js/Jencil.js', '45347:45387');
            this.selectWholeLineIfNoSelectionFound();
            __$coverCall('src/js/Jencil.js', '45395:45447');
            this.textarea.selection.enclose(b, a, keepSelection);
            __$coverCall('src/js/Jencil.js', '45455:45481');
            this.core.caretaker.save();
            __$coverCall('src/js/Jencil.js', '45489:45509');
            return this.change();
        };
        __$coverCall('src/js/Jencil.js', '45523:45842');
        TextEditor.prototype.insertBefore = function (str, keepSelection) {
            __$coverCall('src/js/Jencil.js', '45596:45661');
            if (keepSelection == null) {
                __$coverCall('src/js/Jencil.js', '45633:45653');
                keepSelection = true;
            }
            __$coverCall('src/js/Jencil.js', '45669:45709');
            this.selectWholeLineIfNoSelectionFound();
            __$coverCall('src/js/Jencil.js', '45717:45773');
            this.textarea.selection.insertBefore(str, keepSelection);
            __$coverCall('src/js/Jencil.js', '45781:45807');
            this.core.caretaker.save();
            __$coverCall('src/js/Jencil.js', '45815:45835');
            return this.change();
        };
        __$coverCall('src/js/Jencil.js', '45849:46166');
        TextEditor.prototype.insertAfter = function (str, keepSelection) {
            __$coverCall('src/js/Jencil.js', '45921:45986');
            if (keepSelection == null) {
                __$coverCall('src/js/Jencil.js', '45958:45978');
                keepSelection = true;
            }
            __$coverCall('src/js/Jencil.js', '45994:46034');
            this.selectWholeLineIfNoSelectionFound();
            __$coverCall('src/js/Jencil.js', '46042:46097');
            this.textarea.selection.insertAfter(str, keepSelection);
            __$coverCall('src/js/Jencil.js', '46105:46131');
            this.core.caretaker.save();
            __$coverCall('src/js/Jencil.js', '46139:46159');
            return this.change();
        };
        __$coverCall('src/js/Jencil.js', '46173:46190');
        return TextEditor;
    }(BaseEditor);
    __$coverCall('src/js/Jencil.js', '46214:46347');
    namespace('Jencil.editors', function (exports) {
        __$coverCall('src/js/Jencil.js', '46266:46297');
        exports.BaseEditor = BaseEditor;
        __$coverCall('src/js/Jencil.js', '46303:46341');
        return exports.TextEditor = TextEditor;
    });
    __$coverCall('src/js/Jencil.js', '46352:46809');
    BaseViewer = function (_super) {
        __$coverCall('src/js/Jencil.js', '46390:46419');
        __extends(BaseViewer, _super);
        __$coverCall('src/js/Jencil.js', '46426:46658');
        function BaseViewer(core, selector, context) {
            __$coverCall('src/js/Jencil.js', '46479:46537');
            if (selector == null) {
                __$coverCall('src/js/Jencil.js', '46511:46529');
                selector = '<div>';
            }
            __$coverCall('src/js/Jencil.js', '46545:46613');
            BaseViewer.__super__.constructor.call(this, core, selector, context);
            __$coverCall('src/js/Jencil.js', '46621:46652');
            this.element.addClass('viewer');
        }
        __$coverCall('src/js/Jencil.js', '46665:46771');
        BaseViewer.prototype.update = function (value, force) {
            __$coverCall('src/js/Jencil.js', '46726:46764');
            throw new Error('NotImplementedError');
        };
        __$coverCall('src/js/Jencil.js', '46778:46795');
        return BaseViewer;
    }(Panel);
    __$coverCall('src/js/Jencil.js', '46814:49508');
    TemplateViewer = function (_super) {
        __$coverCall('src/js/Jencil.js', '46856:46889');
        __extends(TemplateViewer, _super);
        __$coverCall('src/js/Jencil.js', '46896:48775');
        function TemplateViewer(core) {
            __$coverCall('src/js/Jencil.js', '46934:46987');
            TemplateViewer.__super__.constructor.call(this, core);
            __$coverCall('src/js/Jencil.js', '46995:47051');
            this.templatePath = this.core.options.viewerTemplatePath;
            __$coverCall('src/js/Jencil.js', '47059:47117');
            this.element.css({ 'position': 'relative' });
            __$coverCall('src/js/Jencil.js', '47125:47168');
            this.curtain = curtainFactory(this.element);
            __$coverCall('src/js/Jencil.js', '47176:47432');
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
            __$coverCall('src/js/Jencil.js', '47440:47474');
            this.iframe.attr('frameborder', 0);
            __$coverCall('src/js/Jencil.js', '47482:47516');
            this.iframe = evolute(this.iframe);
            __$coverCall('src/js/Jencil.js', '47524:47846');
            this.iframe.init = function () {
                __$coverCall('src/js/Jencil.js', '47564:47574');
                var iframe;
                __$coverCall('src/js/Jencil.js', '47584:47604');
                iframe = this.get(0);
                __$coverCall('src/js/Jencil.js', '47614:47784');
                if (iframe.contentDocument != null) {
                    __$coverCall('src/js/Jencil.js', '47662:47700');
                    this.document = iframe.contentDocument;
                } else {
                    __$coverCall('src/js/Jencil.js', '47729:47774');
                    this.document = iframe.contentWindow.document;
                }
                __$coverCall('src/js/Jencil.js', '47794:47837');
                return this.document.write('<body></body>');
            };
            __$coverCall('src/js/Jencil.js', '47854:48481');
            this.iframe.write = function (value) {
                __$coverCall('src/js/Jencil.js', '47900:47913');
                var scrollTop;
                __$coverCall('src/js/Jencil.js', '47923:48450');
                if (this.document != null) {
                    __$coverCall('src/js/Jencil.js', '47962:48094');
                    try {
                        __$coverCall('src/js/Jencil.js', '47980:48031');
                        scrollTop = this.document.documentElement.scrollTop;
                    } catch (e) {
                        __$coverCall('src/js/Jencil.js', '48069:48082');
                        scrollTop = 0;
                    }
                    __$coverCall('src/js/Jencil.js', '48106:48126');
                    this.document.open();
                    __$coverCall('src/js/Jencil.js', '48138:48164');
                    this.document.write(value);
                    __$coverCall('src/js/Jencil.js', '48176:48197');
                    this.document.close();
                    __$coverCall('src/js/Jencil.js', '48209:48258');
                    $('a', $(this.document)).attr('target', '_blank');
                    __$coverCall('src/js/Jencil.js', '48270:48321');
                    this.document.documentElement.scrollTop = scrollTop;
                    __$coverCall('src/js/Jencil.js', '48333:48369');
                    this.width(this.document.scrollLeft);
                    __$coverCall('src/js/Jencil.js', '48381:48417');
                    this.height(this.document.scrollTop);
                    __$coverCall('src/js/Jencil.js', '48429:48440');
                    return true;
                }
                __$coverCall('src/js/Jencil.js', '48460:48472');
                return false;
            };
            __$coverCall('src/js/Jencil.js', '48489:48769');
            this.iframe.loadTemplate = function (templatePath, value) {
                __$coverCall('src/js/Jencil.js', '48556:48572');
                var _this = this;
                __$coverCall('src/js/Jencil.js', '48582:48760');
                return $.ajax({
                    url: templatePath,
                    success: function (data) {
                        __$coverCall('src/js/Jencil.js', '48675:48697');
                        _this._template = data;
                        __$coverCall('src/js/Jencil.js', '48711:48736');
                        return _this.write(value);
                    }
                });
            };
        }
        __$coverCall('src/js/Jencil.js', '48782:48865');
        TemplateViewer.prototype.init = function () {
            __$coverCall('src/js/Jencil.js', '48833:48858');
            return this.iframe.init();
        };
        __$coverCall('src/js/Jencil.js', '48872:49277');
        TemplateViewer.prototype.update = function (value, force) {
            __$coverCall('src/js/Jencil.js', '48937:49005');
            if (!this.element.is(':visible') && !force) {
                __$coverCall('src/js/Jencil.js', '48991:48997');
                return;
            }
            __$coverCall('src/js/Jencil.js', '49013:49231');
            if (this.iframe._template != null) {
                __$coverCall('src/js/Jencil.js', '49058:49117');
                value = this.iframe._template.replace('{{content}}', value);
            } else if (this.templatePath != null) {
                __$coverCall('src/js/Jencil.js', '49173:49223');
                this.iframe.loadTemplate(this.templatePath, value);
            }
            __$coverCall('src/js/Jencil.js', '49239:49270');
            return this.iframe.write(value);
        };
        __$coverCall('src/js/Jencil.js', '49284:49461');
        TemplateViewer.prototype.adjust = function () {
            __$coverCall('src/js/Jencil.js', '49337:49381');
            this.iframe.outerWidth(this.element.width());
            __$coverCall('src/js/Jencil.js', '49389:49435');
            this.iframe.outerHeight(this.element.height());
            __$coverCall('src/js/Jencil.js', '49443:49454');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '49468:49489');
        return TemplateViewer;
    }(BaseViewer);
    __$coverCall('src/js/Jencil.js', '49513:50709');
    AjaxViewer = function (_super) {
        __$coverCall('src/js/Jencil.js', '49551:49580');
        __extends(AjaxViewer, _super);
        __$coverCall('src/js/Jencil.js', '49587:49923');
        function AjaxViewer(core, config) {
            __$coverCall('src/js/Jencil.js', '49629:49649');
            this.config = config;
            __$coverCall('src/js/Jencil.js', '49657:49706');
            AjaxViewer.__super__.constructor.call(this, core);
            __$coverCall('src/js/Jencil.js', '49714:49917');
            this.config = jQuery.extend({
                type: 'GET',
                dataType: 'text',
                data: function (value) {
                    __$coverCall('src/js/Jencil.js', '49833:49865');
                    return encodeURIComponent(value);
                },
                url: null
            }, this.config);
        }
        __$coverCall('src/js/Jencil.js', '49930:50662');
        AjaxViewer.prototype.update = function (value, force) {
            __$coverCall('src/js/Jencil.js', '49991:50007');
            var _this = this;
            __$coverCall('src/js/Jencil.js', '50015:50655');
            if (this._valueCache !== value || force) {
                __$coverCall('src/js/Jencil.js', '50066:50090');
                this._valueCache = value;
                __$coverCall('src/js/Jencil.js', '50100:50647');
                return $.ajax({
                    type: this.config.type,
                    dataType: this.config.dataType,
                    data: JSON.stringify(this.config.data(value)),
                    url: this.config.url,
                    success: function (value) {
                        __$coverCall('src/js/Jencil.js', '50330:50577');
                        if (_this.iframe._template != null) {
                            __$coverCall('src/js/Jencil.js', '50382:50442');
                            value = _this.iframe._template.replace('{{content}}', value);
                        } else if (_this.templatePath != null) {
                            __$coverCall('src/js/Jencil.js', '50511:50563');
                            _this.iframe.loadTemplate(_this.templatePath, value);
                        }
                        __$coverCall('src/js/Jencil.js', '50591:50623');
                        return _this.iframe.write(value);
                    }
                });
            }
        };
        __$coverCall('src/js/Jencil.js', '50669:50686');
        return AjaxViewer;
    }(TemplateViewer);
    __$coverCall('src/js/Jencil.js', '50714:50892');
    namespace('Jencil.viewers', function (exports) {
        __$coverCall('src/js/Jencil.js', '50766:50797');
        exports.BaseViewer = BaseViewer;
        __$coverCall('src/js/Jencil.js', '50803:50842');
        exports.TemplateViewer = TemplateViewer;
        __$coverCall('src/js/Jencil.js', '50848:50886');
        return exports.AjaxViewer = AjaxViewer;
    });
    __$coverCall('src/js/Jencil.js', '50897:51241');
    BaseHelper = function (_super) {
        __$coverCall('src/js/Jencil.js', '50935:50964');
        __extends(BaseHelper, _super);
        __$coverCall('src/js/Jencil.js', '50971:51203');
        function BaseHelper(core, selector, context) {
            __$coverCall('src/js/Jencil.js', '51024:51082');
            if (selector == null) {
                __$coverCall('src/js/Jencil.js', '51056:51074');
                selector = '<div>';
            }
            __$coverCall('src/js/Jencil.js', '51090:51158');
            BaseHelper.__super__.constructor.call(this, core, selector, context);
            __$coverCall('src/js/Jencil.js', '51166:51197');
            this.element.addClass('helper');
        }
        __$coverCall('src/js/Jencil.js', '51210:51227');
        return BaseHelper;
    }(Panel);
    __$coverCall('src/js/Jencil.js', '51246:53523');
    TemplateHelper = function (_super) {
        __$coverCall('src/js/Jencil.js', '51288:51321');
        __extends(TemplateHelper, _super);
        __$coverCall('src/js/Jencil.js', '51328:53102');
        function TemplateHelper(core) {
            __$coverCall('src/js/Jencil.js', '51366:51419');
            TemplateHelper.__super__.constructor.call(this, core);
            __$coverCall('src/js/Jencil.js', '51427:51483');
            this.templatePath = this.core.options.helperTemplatePath;
            __$coverCall('src/js/Jencil.js', '51491:51549');
            this.element.css({ 'position': 'relative' });
            __$coverCall('src/js/Jencil.js', '51557:51600');
            this.curtain = curtainFactory(this.element);
            __$coverCall('src/js/Jencil.js', '51608:51864');
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
            __$coverCall('src/js/Jencil.js', '51872:51906');
            this.iframe.attr('frameborder', 0);
            __$coverCall('src/js/Jencil.js', '51914:51948');
            this.iframe = evolute(this.iframe);
            __$coverCall('src/js/Jencil.js', '51956:52278');
            this.iframe.init = function () {
                __$coverCall('src/js/Jencil.js', '51996:52006');
                var iframe;
                __$coverCall('src/js/Jencil.js', '52016:52036');
                iframe = this.get(0);
                __$coverCall('src/js/Jencil.js', '52046:52216');
                if (iframe.contentDocument != null) {
                    __$coverCall('src/js/Jencil.js', '52094:52132');
                    this.document = iframe.contentDocument;
                } else {
                    __$coverCall('src/js/Jencil.js', '52161:52206');
                    this.document = iframe.contentWindow.document;
                }
                __$coverCall('src/js/Jencil.js', '52226:52269');
                return this.document.write('<body></body>');
            };
            __$coverCall('src/js/Jencil.js', '52286:52852');
            this.iframe.write = function (value) {
                __$coverCall('src/js/Jencil.js', '52332:52345');
                var scrollTop;
                __$coverCall('src/js/Jencil.js', '52355:52821');
                if (this.document != null) {
                    __$coverCall('src/js/Jencil.js', '52394:52526');
                    try {
                        __$coverCall('src/js/Jencil.js', '52412:52463');
                        scrollTop = this.document.documentElement.scrollTop;
                    } catch (e) {
                        __$coverCall('src/js/Jencil.js', '52501:52514');
                        scrollTop = 0;
                    }
                    __$coverCall('src/js/Jencil.js', '52538:52558');
                    this.document.open();
                    __$coverCall('src/js/Jencil.js', '52570:52596');
                    this.document.write(value);
                    __$coverCall('src/js/Jencil.js', '52608:52629');
                    this.document.close();
                    __$coverCall('src/js/Jencil.js', '52641:52692');
                    this.document.documentElement.scrollTop = scrollTop;
                    __$coverCall('src/js/Jencil.js', '52704:52740');
                    this.width(this.document.scrollLeft);
                    __$coverCall('src/js/Jencil.js', '52752:52788');
                    this.height(this.document.scrollTop);
                    __$coverCall('src/js/Jencil.js', '52800:52811');
                    return true;
                }
                __$coverCall('src/js/Jencil.js', '52831:52843');
                return false;
            };
            __$coverCall('src/js/Jencil.js', '52860:53096');
            this.iframe.loadTemplate = function (templatePath) {
                __$coverCall('src/js/Jencil.js', '52920:52936');
                var _this = this;
                __$coverCall('src/js/Jencil.js', '52946:53087');
                return $.ajax({
                    url: templatePath,
                    success: function (data) {
                        __$coverCall('src/js/Jencil.js', '53039:53063');
                        return _this.write(data);
                    }
                });
            };
        }
        __$coverCall('src/js/Jencil.js', '53109:53292');
        TemplateHelper.prototype.init = function () {
            __$coverCall('src/js/Jencil.js', '53160:53178');
            this.iframe.init();
            __$coverCall('src/js/Jencil.js', '53186:53285');
            if (this.templatePath != null) {
                __$coverCall('src/js/Jencil.js', '53227:53277');
                return this.iframe.loadTemplate(this.templatePath);
            }
        };
        __$coverCall('src/js/Jencil.js', '53299:53476');
        TemplateHelper.prototype.adjust = function () {
            __$coverCall('src/js/Jencil.js', '53352:53396');
            this.iframe.outerWidth(this.element.width());
            __$coverCall('src/js/Jencil.js', '53404:53450');
            this.iframe.outerHeight(this.element.height());
            __$coverCall('src/js/Jencil.js', '53458:53469');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '53483:53504');
        return TemplateHelper;
    }(BaseHelper);
    __$coverCall('src/js/Jencil.js', '53528:53669');
    namespace('Jencil.helpers', function (exports) {
        __$coverCall('src/js/Jencil.js', '53580:53611');
        exports.BaseHelper = BaseHelper;
        __$coverCall('src/js/Jencil.js', '53617:53663');
        return exports.TemplateHelper = TemplateHelper;
    });
    __$coverCall('src/js/Jencil.js', '53674:53923');
    Separator = function (_super) {
        __$coverCall('src/js/Jencil.js', '53711:53739');
        __extends(Separator, _super);
        __$coverCall('src/js/Jencil.js', '53746:53885');
        function Separator(core) {
            __$coverCall('src/js/Jencil.js', '53779:53837');
            Separator.__super__.constructor.call(this, core, '<span>');
            __$coverCall('src/js/Jencil.js', '53845:53879');
            this.element.addClass('separator');
        }
        __$coverCall('src/js/Jencil.js', '53892:53908');
        return Separator;
    }(Widget);
    __$coverCall('src/js/Jencil.js', '53928:54867');
    Button = function (_super) {
        __$coverCall('src/js/Jencil.js', '53962:53987');
        __extends(Button, _super);
        __$coverCall('src/js/Jencil.js', '53994:54445');
        function Button(core, name, text, title) {
            __$coverCall('src/js/Jencil.js', '54043:54059');
            this.name = name;
            __$coverCall('src/js/Jencil.js', '54067:54083');
            this.text = text;
            __$coverCall('src/js/Jencil.js', '54091:54109');
            this.title = title;
            __$coverCall('src/js/Jencil.js', '54117:54169');
            Button.__super__.constructor.call(this, core, '<a>');
            __$coverCall('src/js/Jencil.js', '54177:54221');
            this.text = Jencil.t(this.text || this.name);
            __$coverCall('src/js/Jencil.js', '54229:54275');
            this.title = Jencil.t(this.title || this.text);
            __$coverCall('src/js/Jencil.js', '54283:54329');
            this.element.addClass('button').addClass(name);
            __$coverCall('src/js/Jencil.js', '54337:54393');
            this.element.append($('<span>' + this.text + '</span>'));
            __$coverCall('src/js/Jencil.js', '54401:54439');
            this.element.attr('title', this.title);
        }
        __$coverCall('src/js/Jencil.js', '54452:54558');
        Button.prototype.enable = function () {
            __$coverCall('src/js/Jencil.js', '54497:54532');
            this.element.removeClass('disable');
            __$coverCall('src/js/Jencil.js', '54540:54551');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '54565:54669');
        Button.prototype.disable = function () {
            __$coverCall('src/js/Jencil.js', '54611:54643');
            this.element.addClass('disable');
            __$coverCall('src/js/Jencil.js', '54651:54662');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '54676:54760');
        Button.prototype.init = function () {
            __$coverCall('src/js/Jencil.js', '54719:54734');
            this.validate();
            __$coverCall('src/js/Jencil.js', '54742:54753');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '54767:54832');
        Button.prototype.validate = function () {
            __$coverCall('src/js/Jencil.js', '54814:54825');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '54839:54852');
        return Button;
    }(Widget);
    __$coverCall('src/js/Jencil.js', '54872:55733');
    ActionButton = function (_super) {
        __$coverCall('src/js/Jencil.js', '54912:54943');
        __extends(ActionButton, _super);
        __$coverCall('src/js/Jencil.js', '54950:55692');
        function ActionButton(core, name, text, title, callback, shortcut) {
            __$coverCall('src/js/Jencil.js', '55025:55041');
            var _this = this;
            __$coverCall('src/js/Jencil.js', '55049:55073');
            this.shortcut = shortcut;
            __$coverCall('src/js/Jencil.js', '55081:55151');
            ActionButton.__super__.constructor.call(this, core, name, text, title);
            __$coverCall('src/js/Jencil.js', '55159:55309');
            this.callback = function () {
                __$coverCall('src/js/Jencil.js', '55196:55278');
                if (!_this.element.hasClass('disable')) {
                    __$coverCall('src/js/Jencil.js', '55248:55268');
                    _this.callback.raw();
                }
                __$coverCall('src/js/Jencil.js', '55288:55300');
                return _this;
            };
            __$coverCall('src/js/Jencil.js', '55317:55345');
            this.callback.raw = callback;
            __$coverCall('src/js/Jencil.js', '55353:55426');
            this.element.click(function () {
                __$coverCall('src/js/Jencil.js', '55393:55416');
                return _this.callback();
            });
            __$coverCall('src/js/Jencil.js', '55434:55686');
            if (this.shortcut != null && window.shortcut != null) {
                __$coverCall('src/js/Jencil.js', '55502:55596');
                window.shortcut.add(this.shortcut, function (e) {
                    __$coverCall('src/js/Jencil.js', '55561:55584');
                    return _this.callback();
                });
                __$coverCall('src/js/Jencil.js', '55606:55678');
                this.element.attr('title', '' + this.title + ' (' + this.shortcut + ')');
            }
        }
        __$coverCall('src/js/Jencil.js', '55699:55718');
        return ActionButton;
    }(Button);
    __$coverCall('src/js/Jencil.js', '55738:57388');
    CommandButton = function (_super) {
        __$coverCall('src/js/Jencil.js', '55779:55811');
        __extends(CommandButton, _super);
        __$coverCall('src/js/Jencil.js', '55818:56176');
        function CommandButton(core, name, text, title, command, shortcut) {
            __$coverCall('src/js/Jencil.js', '55893:55905');
            var callback;
            __$coverCall('src/js/Jencil.js', '55913:55935');
            this.command = command;
            __$coverCall('src/js/Jencil.js', '55943:56071');
            callback = function () {
                __$coverCall('src/js/Jencil.js', '55975:55985');
                var editor;
                __$coverCall('src/js/Jencil.js', '55995:56017');
                editor = core.editor();
                __$coverCall('src/js/Jencil.js', '56027:56062');
                return editor[command].call(editor);
            };
            __$coverCall('src/js/Jencil.js', '56079:56170');
            CommandButton.__super__.constructor.call(this, core, name, text, title, callback, shortcut);
        }
        __$coverCall('src/js/Jencil.js', '56183:56385');
        CommandButton.prototype.validate = function () {
            __$coverCall('src/js/Jencil.js', '56237:56247');
            var editor;
            __$coverCall('src/js/Jencil.js', '56255:56282');
            editor = this.core.editor();
            __$coverCall('src/js/Jencil.js', '56290:56359');
            if (!(editor[this.command] != null)) {
                __$coverCall('src/js/Jencil.js', '56337:56351');
                this.disable();
            }
            __$coverCall('src/js/Jencil.js', '56367:56378');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '56392:57340');
        CommandButton.factory = function (core, args) {
            __$coverCall('src/js/Jencil.js', '56445:56485');
            var command, name, shortcut, text, title;
            __$coverCall('src/js/Jencil.js', '56493:56540');
            name = text = title = command = shortcut = null;
            __$coverCall('src/js/Jencil.js', '56548:57257');
            switch (args.length) {
            case 5:
                __$coverCall('src/js/Jencil.js', '56597:56611');
                name = args[0];
                __$coverCall('src/js/Jencil.js', '56623:56637');
                text = args[1];
                __$coverCall('src/js/Jencil.js', '56649:56664');
                title = args[2];
                __$coverCall('src/js/Jencil.js', '56676:56693');
                command = args[3];
                __$coverCall('src/js/Jencil.js', '56705:56723');
                shortcut = args[4];
                __$coverCall('src/js/Jencil.js', '56735:56740');
                break;
            case 4:
                __$coverCall('src/js/Jencil.js', '56768:56782');
                name = args[0];
                __$coverCall('src/js/Jencil.js', '56794:56816');
                text = title = args[1];
                __$coverCall('src/js/Jencil.js', '56828:56845');
                command = args[2];
                __$coverCall('src/js/Jencil.js', '56857:56875');
                shortcut = args[3];
                __$coverCall('src/js/Jencil.js', '56887:56892');
                break;
            case 3:
                __$coverCall('src/js/Jencil.js', '56920:56944');
                name = command = args[0];
                __$coverCall('src/js/Jencil.js', '56956:56978');
                text = title = args[1];
                __$coverCall('src/js/Jencil.js', '56990:57008');
                shortcut = args[2];
                __$coverCall('src/js/Jencil.js', '57020:57025');
                break;
            case 2:
                __$coverCall('src/js/Jencil.js', '57053:57077');
                name = command = args[0];
                __$coverCall('src/js/Jencil.js', '57089:57111');
                text = title = args[1];
                __$coverCall('src/js/Jencil.js', '57123:57138');
                shortcut = null;
                __$coverCall('src/js/Jencil.js', '57150:57155');
                break;
            case 1:
                __$coverCall('src/js/Jencil.js', '57183:57222');
                name = command = text = title = args[0];
                __$coverCall('src/js/Jencil.js', '57234:57249');
                shortcut = null;
            }
            __$coverCall('src/js/Jencil.js', '57265:57333');
            return new CommandButton(core, name, text, title, command, shortcut);
        };
        __$coverCall('src/js/Jencil.js', '57347:57367');
        return CommandButton;
    }(ActionButton);
    __$coverCall('src/js/Jencil.js', '57393:58096');
    UndoButton = function (_super) {
        __$coverCall('src/js/Jencil.js', '57431:57460');
        __extends(UndoButton, _super);
        __$coverCall('src/js/Jencil.js', '57467:57726');
        function UndoButton(core) {
            __$coverCall('src/js/Jencil.js', '57501:57535');
            var callback, _this = this;
            __$coverCall('src/js/Jencil.js', '57543:57619');
            callback = function (e) {
                __$coverCall('src/js/Jencil.js', '57576:57610');
                return _this.core.caretaker.undo();
            };
            __$coverCall('src/js/Jencil.js', '57627:57720');
            UndoButton.__super__.constructor.call(this, core, 'undo', 'Undo', 'Undo', callback, 'Ctrl+Z');
        }
        __$coverCall('src/js/Jencil.js', '57733:58051');
        UndoButton.prototype.init = function () {
            __$coverCall('src/js/Jencil.js', '57780:57811');
            var check, _this = this;
            __$coverCall('src/js/Jencil.js', '57819:58022');
            check = function () {
                __$coverCall('src/js/Jencil.js', '57848:57974');
                if (_this.core.caretaker.canUndo() === false) {
                    __$coverCall('src/js/Jencil.js', '57906:57921');
                    _this.disable();
                } else {
                    __$coverCall('src/js/Jencil.js', '57950:57964');
                    _this.enable();
                }
                __$coverCall('src/js/Jencil.js', '57984:58013');
                return setTimeout(check, 100);
            };
            __$coverCall('src/js/Jencil.js', '58030:58044');
            return check();
        };
        __$coverCall('src/js/Jencil.js', '58058:58075');
        return UndoButton;
    }(ActionButton);
    __$coverCall('src/js/Jencil.js', '58101:58810');
    RedoButton = function (_super) {
        __$coverCall('src/js/Jencil.js', '58139:58168');
        __extends(RedoButton, _super);
        __$coverCall('src/js/Jencil.js', '58175:58440');
        function RedoButton(core) {
            __$coverCall('src/js/Jencil.js', '58209:58243');
            var callback, _this = this;
            __$coverCall('src/js/Jencil.js', '58251:58327');
            callback = function (e) {
                __$coverCall('src/js/Jencil.js', '58284:58318');
                return _this.core.caretaker.redo();
            };
            __$coverCall('src/js/Jencil.js', '58335:58434');
            RedoButton.__super__.constructor.call(this, core, 'redo', 'Redo', 'Redo', callback, 'Ctrl+Shift+Z');
        }
        __$coverCall('src/js/Jencil.js', '58447:58765');
        RedoButton.prototype.init = function () {
            __$coverCall('src/js/Jencil.js', '58494:58525');
            var check, _this = this;
            __$coverCall('src/js/Jencil.js', '58533:58736');
            check = function () {
                __$coverCall('src/js/Jencil.js', '58562:58688');
                if (_this.core.caretaker.canRedo() === false) {
                    __$coverCall('src/js/Jencil.js', '58620:58635');
                    _this.disable();
                } else {
                    __$coverCall('src/js/Jencil.js', '58664:58678');
                    _this.enable();
                }
                __$coverCall('src/js/Jencil.js', '58698:58727');
                return setTimeout(check, 100);
            };
            __$coverCall('src/js/Jencil.js', '58744:58758');
            return check();
        };
        __$coverCall('src/js/Jencil.js', '58772:58789');
        return RedoButton;
    }(ActionButton);
    __$coverCall('src/js/Jencil.js', '58815:59629');
    FullscreenButton = function (_super) {
        __$coverCall('src/js/Jencil.js', '58859:58894');
        __extends(FullscreenButton, _super);
        __$coverCall('src/js/Jencil.js', '58901:59200');
        function FullscreenButton(core) {
            __$coverCall('src/js/Jencil.js', '58941:58975');
            var callback, _this = this;
            __$coverCall('src/js/Jencil.js', '58983:59062');
            callback = function (e) {
                __$coverCall('src/js/Jencil.js', '59016:59053');
                return _this.core.fullscreen.toggle();
            };
            __$coverCall('src/js/Jencil.js', '59070:59194');
            FullscreenButton.__super__.constructor.call(this, core, 'fullscreen', 'Toggle fullscreen', 'Fullscreen', callback, 'Ctrl+F');
        }
        __$coverCall('src/js/Jencil.js', '59207:59578');
        FullscreenButton.prototype.init = function () {
            __$coverCall('src/js/Jencil.js', '59260:59291');
            var check, _this = this;
            __$coverCall('src/js/Jencil.js', '59299:59549');
            check = function () {
                __$coverCall('src/js/Jencil.js', '59328:59501');
                if (_this.core.fullscreen.element.is(':visible') === true) {
                    __$coverCall('src/js/Jencil.js', '59399:59429');
                    _this.element.addClass('hide');
                } else {
                    __$coverCall('src/js/Jencil.js', '59458:59491');
                    _this.element.removeClass('hide');
                }
                __$coverCall('src/js/Jencil.js', '59511:59540');
                return setTimeout(check, 100);
            };
            __$coverCall('src/js/Jencil.js', '59557:59571');
            return check();
        };
        __$coverCall('src/js/Jencil.js', '59585:59608');
        return FullscreenButton;
    }(ActionButton);
    __$coverCall('src/js/Jencil.js', '59634:60629');
    ViewerButton = function (_super) {
        __$coverCall('src/js/Jencil.js', '59674:59705');
        __extends(ViewerButton, _super);
        __$coverCall('src/js/Jencil.js', '59712:59990');
        function ViewerButton(core) {
            __$coverCall('src/js/Jencil.js', '59748:59782');
            var callback, _this = this;
            __$coverCall('src/js/Jencil.js', '59790:59867');
            callback = function (e) {
                __$coverCall('src/js/Jencil.js', '59823:59858');
                return _this.core.viewer().toggle();
            };
            __$coverCall('src/js/Jencil.js', '59875:59984');
            ViewerButton.__super__.constructor.call(this, core, 'viewer', 'Quick view', 'Quick view', callback, 'Ctrl+Q');
        }
        __$coverCall('src/js/Jencil.js', '59997:60165');
        ViewerButton.prototype.validate = function () {
            __$coverCall('src/js/Jencil.js', '60050:60139');
            if (!(this.core.viewer() != null)) {
                __$coverCall('src/js/Jencil.js', '60095:60109');
                this.disable();
                __$coverCall('src/js/Jencil.js', '60119:60131');
                return false;
            }
            __$coverCall('src/js/Jencil.js', '60147:60158');
            return true;
        };
        __$coverCall('src/js/Jencil.js', '60172:60582');
        ViewerButton.prototype.init = function () {
            __$coverCall('src/js/Jencil.js', '60221:60252');
            var check, _this = this;
            __$coverCall('src/js/Jencil.js', '60260:60306');
            if (!this.validate()) {
                __$coverCall('src/js/Jencil.js', '60292:60298');
                return;
            }
            __$coverCall('src/js/Jencil.js', '60314:60553');
            check = function () {
                __$coverCall('src/js/Jencil.js', '60343:60505');
                if (_this.core.viewer().element.is(':visible')) {
                    __$coverCall('src/js/Jencil.js', '60403:60433');
                    _this.element.addClass('hide');
                } else {
                    __$coverCall('src/js/Jencil.js', '60462:60495');
                    _this.element.removeClass('hide');
                }
                __$coverCall('src/js/Jencil.js', '60515:60544');
                return setTimeout(check, 100);
            };
            __$coverCall('src/js/Jencil.js', '60561:60575');
            return check();
        };
        __$coverCall('src/js/Jencil.js', '60589:60608');
        return ViewerButton;
    }(ActionButton);
    __$coverCall('src/js/Jencil.js', '60634:61607');
    HelperButton = function (_super) {
        __$coverCall('src/js/Jencil.js', '60674:60705');
        __extends(HelperButton, _super);
        __$coverCall('src/js/Jencil.js', '60712:60978');
        function HelperButton(core) {
            __$coverCall('src/js/Jencil.js', '60748:60782');
            var callback, _this = this;
            __$coverCall('src/js/Jencil.js', '60790:60867');
            callback = function (e) {
                __$coverCall('src/js/Jencil.js', '60823:60858');
                return _this.core.helper().toggle();
            };
            __$coverCall('src/js/Jencil.js', '60875:60972');
            HelperButton.__super__.constructor.call(this, core, 'helper', 'Help', 'Help', callback, 'Ctrl+H');
        }
        __$coverCall('src/js/Jencil.js', '60985:61143');
        HelperButton.prototype.validate = function () {
            __$coverCall('src/js/Jencil.js', '61038:61117');
            if (!this.core.helper()) {
                __$coverCall('src/js/Jencil.js', '61073:61087');
                this.disable();
                __$coverCall('src/js/Jencil.js', '61097:61109');
                return false;
            }
            __$coverCall('src/js/Jencil.js', '61125:61136');
            return true;
        };
        __$coverCall('src/js/Jencil.js', '61150:61560');
        HelperButton.prototype.init = function () {
            __$coverCall('src/js/Jencil.js', '61199:61230');
            var check, _this = this;
            __$coverCall('src/js/Jencil.js', '61238:61284');
            if (!this.validate()) {
                __$coverCall('src/js/Jencil.js', '61270:61276');
                return;
            }
            __$coverCall('src/js/Jencil.js', '61292:61531');
            check = function () {
                __$coverCall('src/js/Jencil.js', '61321:61483');
                if (_this.core.helper().element.is(':visible')) {
                    __$coverCall('src/js/Jencil.js', '61381:61411');
                    _this.element.addClass('hide');
                } else {
                    __$coverCall('src/js/Jencil.js', '61440:61473');
                    _this.element.removeClass('hide');
                }
                __$coverCall('src/js/Jencil.js', '61493:61522');
                return setTimeout(check, 100);
            };
            __$coverCall('src/js/Jencil.js', '61539:61553');
            return check();
        };
        __$coverCall('src/js/Jencil.js', '61567:61586');
        return HelperButton;
    }(ActionButton);
    __$coverCall('src/js/Jencil.js', '61612:62320');
    buttonFactory = function (core, value) {
        __$coverCall('src/js/Jencil.js', '61656:61739');
        if (value instanceof Array) {
            __$coverCall('src/js/Jencil.js', '61692:61733');
            return CommandButton.factory(core, value);
        }
        __$coverCall('src/js/Jencil.js', '61745:62287');
        if (typeof value === 'string') {
            __$coverCall('src/js/Jencil.js', '61784:62281');
            switch (value) {
            case 'Separator':
                __$coverCall('src/js/Jencil.js', '61837:61863');
                return new Separator(core);
            case 'Undo':
                __$coverCall('src/js/Jencil.js', '61896:61923');
                return new UndoButton(core);
            case 'Redo':
                __$coverCall('src/js/Jencil.js', '61956:61983');
                return new RedoButton(core);
            case 'Fullscreen':
                __$coverCall('src/js/Jencil.js', '62022:62055');
                return new FullscreenButton(core);
            case 'Viewer':
                __$coverCall('src/js/Jencil.js', '62090:62119');
                return new ViewerButton(core);
            case 'Helper':
                __$coverCall('src/js/Jencil.js', '62154:62183');
                return new HelperButton(core);
            default:
                __$coverCall('src/js/Jencil.js', '62212:62273');
                throw new Exception('' + value + ' is not known Button type');
            }
        }
        __$coverCall('src/js/Jencil.js', '62293:62315');
        return new value(core);
    };
    __$coverCall('src/js/Jencil.js', '62325:62780');
    namespace('Jencil.buttons', function (exports) {
        __$coverCall('src/js/Jencil.js', '62377:62406');
        exports.Separator = Separator;
        __$coverCall('src/js/Jencil.js', '62412:62435');
        exports.Button = Button;
        __$coverCall('src/js/Jencil.js', '62441:62476');
        exports.ActionButton = ActionButton;
        __$coverCall('src/js/Jencil.js', '62482:62519');
        exports.CommandButton = CommandButton;
        __$coverCall('src/js/Jencil.js', '62525:62556');
        exports.UndoButton = UndoButton;
        __$coverCall('src/js/Jencil.js', '62562:62593');
        exports.RedoButton = RedoButton;
        __$coverCall('src/js/Jencil.js', '62599:62642');
        exports.FullscreenButton = FullscreenButton;
        __$coverCall('src/js/Jencil.js', '62648:62683');
        exports.ViewerButton = ViewerButton;
        __$coverCall('src/js/Jencil.js', '62689:62724');
        exports.HelperButton = HelperButton;
        __$coverCall('src/js/Jencil.js', '62730:62774');
        return exports.buttonFactory = buttonFactory;
    });
    __$coverCall('src/js/Jencil.js', '62785:65898');
    Wrapper = function (_super) {
        __$coverCall('src/js/Jencil.js', '62820:62846');
        __extends(Wrapper, _super);
        __$coverCall('src/js/Jencil.js', '62853:65035');
        function Wrapper(core, width, height) {
            __$coverCall('src/js/Jencil.js', '62899:62915');
            var _this = this;
            __$coverCall('src/js/Jencil.js', '62923:62969');
            Wrapper.__super__.constructor.call(this, core);
            __$coverCall('src/js/Jencil.js', '62977:63016');
            this.element.addClass('jencil wrapper');
            __$coverCall('src/js/Jencil.js', '63024:63049');
            this.element.width(width);
            __$coverCall('src/js/Jencil.js', '63057:63084');
            this.element.height(height);
            __$coverCall('src/js/Jencil.js', '63092:63133');
            this.workspace = new Workspace(this.core);
            __$coverCall('src/js/Jencil.js', '63141:63186');
            this.workspace.element.appendTo(this.element);
            __$coverCall('src/js/Jencil.js', '63194:65029');
            this.curtain = {
                on: function () {
                    __$coverCall('src/js/Jencil.js', '63246:63289');
                    var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
                    __$coverCall('src/js/Jencil.js', '63301:63445');
                    if ((_ref = _this.core.editor()) != null) {
                        __$coverCall('src/js/Jencil.js', '63357:63433');
                        if ((_ref1 = _ref.curtain) != null) {
                            __$coverCall('src/js/Jencil.js', '63409:63419');
                            _ref1.on();
                        }
                    }
                    __$coverCall('src/js/Jencil.js', '63457:63603');
                    if ((_ref2 = _this.core.viewer()) != null) {
                        __$coverCall('src/js/Jencil.js', '63514:63591');
                        if ((_ref3 = _ref2.curtain) != null) {
                            __$coverCall('src/js/Jencil.js', '63567:63577');
                            _ref3.on();
                        }
                    }
                    __$coverCall('src/js/Jencil.js', '63615:63761');
                    if ((_ref4 = _this.core.helper()) != null) {
                        __$coverCall('src/js/Jencil.js', '63672:63749');
                        if ((_ref5 = _ref4.curtain) != null) {
                            __$coverCall('src/js/Jencil.js', '63725:63735');
                            _ref5.on();
                        }
                    }
                    __$coverCall('src/js/Jencil.js', '63773:63794');
                    return _this.adjust();
                },
                refresh: function () {
                    __$coverCall('src/js/Jencil.js', '63847:63890');
                    var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
                    __$coverCall('src/js/Jencil.js', '63902:64051');
                    if ((_ref = _this.core.editor()) != null) {
                        __$coverCall('src/js/Jencil.js', '63958:64039');
                        if ((_ref1 = _ref.curtain) != null) {
                            __$coverCall('src/js/Jencil.js', '64010:64025');
                            _ref1.refresh();
                        }
                    }
                    __$coverCall('src/js/Jencil.js', '64063:64214');
                    if ((_ref2 = _this.core.viewer()) != null) {
                        __$coverCall('src/js/Jencil.js', '64120:64202');
                        if ((_ref3 = _ref2.curtain) != null) {
                            __$coverCall('src/js/Jencil.js', '64173:64188');
                            _ref3.refresh();
                        }
                    }
                    __$coverCall('src/js/Jencil.js', '64226:64377');
                    if ((_ref4 = _this.core.helper()) != null) {
                        __$coverCall('src/js/Jencil.js', '64283:64365');
                        if ((_ref5 = _ref4.curtain) != null) {
                            __$coverCall('src/js/Jencil.js', '64336:64351');
                            _ref5.refresh();
                        }
                    }
                    __$coverCall('src/js/Jencil.js', '64389:64410');
                    return _this.adjust();
                },
                off: function () {
                    __$coverCall('src/js/Jencil.js', '64459:64502');
                    var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
                    __$coverCall('src/js/Jencil.js', '64514:64659');
                    if ((_ref = _this.core.editor()) != null) {
                        __$coverCall('src/js/Jencil.js', '64570:64647');
                        if ((_ref1 = _ref.curtain) != null) {
                            __$coverCall('src/js/Jencil.js', '64622:64633');
                            _ref1.off();
                        }
                    }
                    __$coverCall('src/js/Jencil.js', '64671:64818');
                    if ((_ref2 = _this.core.viewer()) != null) {
                        __$coverCall('src/js/Jencil.js', '64728:64806');
                        if ((_ref3 = _ref2.curtain) != null) {
                            __$coverCall('src/js/Jencil.js', '64781:64792');
                            _ref3.off();
                        }
                    }
                    __$coverCall('src/js/Jencil.js', '64830:64977');
                    if ((_ref4 = _this.core.helper()) != null) {
                        __$coverCall('src/js/Jencil.js', '64887:64965');
                        if ((_ref5 = _ref4.curtain) != null) {
                            __$coverCall('src/js/Jencil.js', '64940:64951');
                            _ref5.off();
                        }
                    }
                    __$coverCall('src/js/Jencil.js', '64989:65010');
                    return _this.adjust();
                }
            };
        }
        __$coverCall('src/js/Jencil.js', '65042:65621');
        Wrapper.prototype.init = function (profileNameOrInstance) {
            __$coverCall('src/js/Jencil.js', '65107:65123');
            var _this = this;
            __$coverCall('src/js/Jencil.js', '65131:65513');
            if (this.element.resizable != null && this.core.options.resizable === true) {
                __$coverCall('src/js/Jencil.js', '65219:65505');
                this.element.resizable({
                    start: function () {
                        __$coverCall('src/js/Jencil.js', '65286:65311');
                        return _this.curtain.on();
                    },
                    resize: function () {
                        __$coverCall('src/js/Jencil.js', '65369:65399');
                        return _this.curtain.refresh();
                    },
                    stop: function () {
                        __$coverCall('src/js/Jencil.js', '65455:65481');
                        return _this.curtain.off();
                    }
                });
            }
            __$coverCall('src/js/Jencil.js', '65521:65566');
            this.workspace.profile(profileNameOrInstance);
            __$coverCall('src/js/Jencil.js', '65574:65595');
            this.workspace.init();
            __$coverCall('src/js/Jencil.js', '65603:65614');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '65628:65863');
        Wrapper.prototype.adjust = function () {
            __$coverCall('src/js/Jencil.js', '65674:65735');
            this.workspace.element.outerWidth(true, this.element.width());
            __$coverCall('src/js/Jencil.js', '65743:65806');
            this.workspace.element.outerHeight(true, this.element.height());
            __$coverCall('src/js/Jencil.js', '65814:65837');
            this.workspace.adjust();
            __$coverCall('src/js/Jencil.js', '65845:65856');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '65870:65884');
        return Wrapper;
    }(Panel);
    __$coverCall('src/js/Jencil.js', '65903:69063');
    Workspace = function (_super) {
        __$coverCall('src/js/Jencil.js', '65940:65968');
        __extends(Workspace, _super);
        __$coverCall('src/js/Jencil.js', '65975:66104');
        function Workspace(core) {
            __$coverCall('src/js/Jencil.js', '66008:66056');
            Workspace.__super__.constructor.call(this, core);
            __$coverCall('src/js/Jencil.js', '66064:66098');
            this.element.addClass('workspace');
        }
        __$coverCall('src/js/Jencil.js', '66111:67948');
        Workspace.prototype.profile = function (profileNameOrInstance) {
            __$coverCall('src/js/Jencil.js', '66181:66270');
            var button, profile, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3, _this = this;
            __$coverCall('src/js/Jencil.js', '66278:67913');
            if (profileNameOrInstance != null) {
                __$coverCall('src/js/Jencil.js', '66323:66465');
                if (typeof profileNameOrInstance === 'string') {
                    __$coverCall('src/js/Jencil.js', '66382:66455');
                    profileNameOrInstance = this.core.options.profiles[profileNameOrInstance];
                }
                __$coverCall('src/js/Jencil.js', '66475:66543');
                profile = jQuery.extend(true, DefaultProfile, profileNameOrInstance);
                __$coverCall('src/js/Jencil.js', '66553:66633');
                profile.defaultVolume = this.core.options.defaultVolume || profile.defaultVolume;
                __$coverCall('src/js/Jencil.js', '66643:66726');
                profile.defaultVolume2 = this.core.options.defaultVolume2 || profile.defaultVolume2;
                __$coverCall('src/js/Jencil.js', '66736:66756');
                this.element.empty();
                __$coverCall('src/js/Jencil.js', '66766:66829');
                this.mainPanel = new profile.mainPanelClass(this.core, profile);
                __$coverCall('src/js/Jencil.js', '66839:66943');
                if ((_ref = this.mainPanel.editorPanel) != null) {
                    __$coverCall('src/js/Jencil.js', '66900:66933');
                    _ref.val(this.core.element.val());
                }
                __$coverCall('src/js/Jencil.js', '66953:67118');
                if ((_ref1 = this.mainPanel.editorPanel) != null) {
                    __$coverCall('src/js/Jencil.js', '67015:67108');
                    _ref1.change(function (value) {
                        __$coverCall('src/js/Jencil.js', '67058:67094');
                        return _this.core.element.val(value);
                    });
                }
                __$coverCall('src/js/Jencil.js', '67128:67165');
                this.toolbar = new Toolbar(this.core);
                __$coverCall('src/js/Jencil.js', '67175:67205');
                _ref2 = profile.toolbarButtons;
                __$coverCall('src/js/Jencil.js', '67215:67401');
                for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                    __$coverCall('src/js/Jencil.js', '67278:67296');
                    button = _ref2[_i];
                    __$coverCall('src/js/Jencil.js', '67308:67349');
                    button = buttonFactory(this.core, button);
                    __$coverCall('src/js/Jencil.js', '67361:67391');
                    this.toolbar.addButton(button);
                }
                __$coverCall('src/js/Jencil.js', '67411:67452');
                this.statusbar = new Statusbar(this.core);
                __$coverCall('src/js/Jencil.js', '67462:67494');
                _ref3 = profile.statusbarButtons;
                __$coverCall('src/js/Jencil.js', '67504:67694');
                for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
                    __$coverCall('src/js/Jencil.js', '67569:67587');
                    button = _ref3[_j];
                    __$coverCall('src/js/Jencil.js', '67599:67640');
                    button = buttonFactory(this.core, button);
                    __$coverCall('src/js/Jencil.js', '67652:67684');
                    this.statusbar.addButton(button);
                }
                __$coverCall('src/js/Jencil.js', '67704:67745');
                this.element.append(this.toolbar.element);
                __$coverCall('src/js/Jencil.js', '67755:67798');
                this.element.append(this.mainPanel.element);
                __$coverCall('src/js/Jencil.js', '67808:67851');
                this.element.append(this.statusbar.element);
                __$coverCall('src/js/Jencil.js', '67861:67884');
                this._profile = profile;
                __$coverCall('src/js/Jencil.js', '67894:67905');
                return this;
            }
            __$coverCall('src/js/Jencil.js', '67921:67941');
            return this._profile;
        };
        __$coverCall('src/js/Jencil.js', '67955:68092');
        Workspace.prototype.init = function () {
            __$coverCall('src/js/Jencil.js', '68001:68020');
            this.toolbar.init();
            __$coverCall('src/js/Jencil.js', '68028:68049');
            this.statusbar.init();
            __$coverCall('src/js/Jencil.js', '68057:68085');
            return this.mainPanel.init();
        };
        __$coverCall('src/js/Jencil.js', '68099:68798');
        Workspace.prototype.adjust = function () {
            __$coverCall('src/js/Jencil.js', '68147:68167');
            var offset1, offset2;
            __$coverCall('src/js/Jencil.js', '68175:68234');
            this.toolbar.element.outerWidth(true, this.element.width());
            __$coverCall('src/js/Jencil.js', '68242:68303');
            this.statusbar.element.outerWidth(true, this.element.width());
            __$coverCall('src/js/Jencil.js', '68311:68372');
            this.mainPanel.element.outerWidth(true, this.element.width());
            __$coverCall('src/js/Jencil.js', '68380:68443');
            this.mainPanel.element.outerHeight(true, this.element.height());
            __$coverCall('src/js/Jencil.js', '68451:68474');
            this.mainPanel.adjust();
            __$coverCall('src/js/Jencil.js', '68482:68530');
            offset1 = this.toolbar.element.outerHeight(true);
            __$coverCall('src/js/Jencil.js', '68538:68588');
            offset2 = this.statusbar.element.outerHeight(true);
            __$coverCall('src/js/Jencil.js', '68596:68681');
            this.mainPanel.element.outerHeight(true, this.element.height() - (offset1 + offset2));
            __$coverCall('src/js/Jencil.js', '68689:68710');
            this.toolbar.adjust();
            __$coverCall('src/js/Jencil.js', '68718:68741');
            this.statusbar.adjust();
            __$coverCall('src/js/Jencil.js', '68749:68772');
            this.mainPanel.adjust();
            __$coverCall('src/js/Jencil.js', '68780:68791');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '68805:69026');
        Workspace.prototype.update = function (force) {
            __$coverCall('src/js/Jencil.js', '68858:69019');
            if (this.mainPanel.editorPanel && this.mainPanel.viewerPanel) {
                __$coverCall('src/js/Jencil.js', '68930:69011');
                return this.mainPanel.viewerPanel.update(this.mainPanel.editorPanel.val(), force);
            }
        };
        __$coverCall('src/js/Jencil.js', '69033:69049');
        return Workspace;
    }(Panel);
    __$coverCall('src/js/Jencil.js', '69068:69644');
    Bar = function (_super) {
        __$coverCall('src/js/Jencil.js', '69099:69121');
        __extends(Bar, _super);
        __$coverCall('src/js/Jencil.js', '69128:69229');
        function Bar(core) {
            __$coverCall('src/js/Jencil.js', '69155:69197');
            Bar.__super__.constructor.call(this, core);
            __$coverCall('src/js/Jencil.js', '69205:69223');
            this._buttons = [];
        }
        __$coverCall('src/js/Jencil.js', '69236:69472');
        Bar.prototype.init = function () {
            __$coverCall('src/js/Jencil.js', '69276:69302');
            var button, _i, _len, _ref;
            __$coverCall('src/js/Jencil.js', '69310:69330');
            _ref = this._buttons;
            __$coverCall('src/js/Jencil.js', '69338:69446');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                __$coverCall('src/js/Jencil.js', '69398:69415');
                button = _ref[_i];
                __$coverCall('src/js/Jencil.js', '69425:69438');
                button.init();
            }
            __$coverCall('src/js/Jencil.js', '69454:69465');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '69479:69613');
        Bar.prototype.addButton = function (button) {
            __$coverCall('src/js/Jencil.js', '69530:69556');
            this._buttons.push(button);
            __$coverCall('src/js/Jencil.js', '69564:69606');
            return this.element.append(button.element);
        };
        __$coverCall('src/js/Jencil.js', '69620:69630');
        return Bar;
    }(Panel);
    __$coverCall('src/js/Jencil.js', '69649:69873');
    Toolbar = function (_super) {
        __$coverCall('src/js/Jencil.js', '69684:69710');
        __extends(Toolbar, _super);
        __$coverCall('src/js/Jencil.js', '69717:69840');
        function Toolbar(core) {
            __$coverCall('src/js/Jencil.js', '69748:69794');
            Toolbar.__super__.constructor.call(this, core);
            __$coverCall('src/js/Jencil.js', '69802:69834');
            this.element.addClass('toolbar');
        }
        __$coverCall('src/js/Jencil.js', '69847:69861');
        return Toolbar;
    }(Bar);
    __$coverCall('src/js/Jencil.js', '69878:70114');
    Statusbar = function (_super) {
        __$coverCall('src/js/Jencil.js', '69915:69943');
        __extends(Statusbar, _super);
        __$coverCall('src/js/Jencil.js', '69950:70079');
        function Statusbar(core) {
            __$coverCall('src/js/Jencil.js', '69983:70031');
            Statusbar.__super__.constructor.call(this, core);
            __$coverCall('src/js/Jencil.js', '70039:70073');
            this.element.addClass('statusbar');
        }
        __$coverCall('src/js/Jencil.js', '70086:70102');
        return Statusbar;
    }(Bar);
    __$coverCall('src/js/Jencil.js', '70119:70335');
    namespace('Jencil.workspace', function (exports) {
        __$coverCall('src/js/Jencil.js', '70173:70198');
        exports.Wrapper = Wrapper;
        __$coverCall('src/js/Jencil.js', '70204:70233');
        exports.Workspace = Workspace;
        __$coverCall('src/js/Jencil.js', '70239:70256');
        exports.Bar = Bar;
        __$coverCall('src/js/Jencil.js', '70262:70287');
        exports.Toolbar = Toolbar;
        __$coverCall('src/js/Jencil.js', '70293:70329');
        return exports.Statusbar = Statusbar;
    });
    __$coverCall('src/js/Jencil.js', '70340:72805');
    MultiPanel = function (_super) {
        __$coverCall('src/js/Jencil.js', '70378:70407');
        __extends(MultiPanel, _super);
        __$coverCall('src/js/Jencil.js', '70414:71577');
        function MultiPanel(core, fst, snd, splitter) {
            __$coverCall('src/js/Jencil.js', '70468:70504');
            var hide, show, _this = this;
            __$coverCall('src/js/Jencil.js', '70512:70526');
            this.fst = fst;
            __$coverCall('src/js/Jencil.js', '70534:70548');
            this.snd = snd;
            __$coverCall('src/js/Jencil.js', '70556:70580');
            this.splitter = splitter;
            __$coverCall('src/js/Jencil.js', '70588:70637');
            MultiPanel.__super__.constructor.call(this, core);
            __$coverCall('src/js/Jencil.js', '70645:70675');
            this.element.addClass('multi');
            __$coverCall('src/js/Jencil.js', '70683:70720');
            this.element.append(this.fst.element);
            __$coverCall('src/js/Jencil.js', '70728:70770');
            this.element.append(this.splitter.element);
            __$coverCall('src/js/Jencil.js', '70778:70815');
            this.element.append(this.snd.element);
            __$coverCall('src/js/Jencil.js', '70823:70958');
            show = function (callback) {
                __$coverCall('src/js/Jencil.js', '70859:70949');
                if (!this.element.is(':visible')) {
                    __$coverCall('src/js/Jencil.js', '70905:70939');
                    return this.toggle(callback, null);
                }
            };
            __$coverCall('src/js/Jencil.js', '70966:71100');
            hide = function (callback) {
                __$coverCall('src/js/Jencil.js', '71002:71091');
                if (this.element.is(':visible')) {
                    __$coverCall('src/js/Jencil.js', '71047:71081');
                    return this.toggle(null, callback);
                }
            };
            __$coverCall('src/js/Jencil.js', '71108:71232');
            this.fst.toggle = function (callbackOn, callbackOff) {
                __$coverCall('src/js/Jencil.js', '71170:71223');
                return _this._togglePanel(0, callbackOn, callbackOff);
            };
            __$coverCall('src/js/Jencil.js', '71240:71260');
            this.fst.show = show;
            __$coverCall('src/js/Jencil.js', '71268:71288');
            this.fst.hide = hide;
            __$coverCall('src/js/Jencil.js', '71296:71420');
            this.snd.toggle = function (callbackOn, callbackOff) {
                __$coverCall('src/js/Jencil.js', '71358:71411');
                return _this._togglePanel(1, callbackOn, callbackOff);
            };
            __$coverCall('src/js/Jencil.js', '71428:71448');
            this.snd.show = show;
            __$coverCall('src/js/Jencil.js', '71456:71476');
            this.snd.hide = hide;
            __$coverCall('src/js/Jencil.js', '71484:71571');
            this.splitter.element.dblclick(function () {
                __$coverCall('src/js/Jencil.js', '71536:71561');
                return _this.snd.toggle();
            });
        }
        __$coverCall('src/js/Jencil.js', '71584:71711');
        MultiPanel.prototype.init = function () {
            __$coverCall('src/js/Jencil.js', '71631:71651');
            this.splitter.init();
            __$coverCall('src/js/Jencil.js', '71659:71674');
            this.fst.init();
            __$coverCall('src/js/Jencil.js', '71682:71704');
            return this.snd.init();
        };
        __$coverCall('src/js/Jencil.js', '71718:72767');
        MultiPanel.prototype._togglePanel = function (to, callbackOn, callbackOff) {
            __$coverCall('src/js/Jencil.js', '71800:71866');
            var callbackDone, end, volume, _callbackDone, _this = this;
            __$coverCall('src/js/Jencil.js', '71874:71925');
            if (MultiPanel._animating) {
                __$coverCall('src/js/Jencil.js', '71911:71917');
                return;
            }
            __$coverCall('src/js/Jencil.js', '71933:71964');
            volume = this.splitter.volume();
            __$coverCall('src/js/Jencil.js', '71972:71991');
            callbackDone = null;
            __$coverCall('src/js/Jencil.js', '71999:72326');
            if (0 < volume && volume < 1) {
                __$coverCall('src/js/Jencil.js', '72041:72049');
                end = to;
                __$coverCall('src/js/Jencil.js', '72059:72097');
                this.splitter._previousVolume = volume;
                __$coverCall('src/js/Jencil.js', '72107:72134');
                _callbackDone = callbackOff;
            } else {
                __$coverCall('src/js/Jencil.js', '72159:72225');
                end = this.splitter._previousVolume || this.splitter.defaultVolume;
                __$coverCall('src/js/Jencil.js', '72235:72282');
                if (end === to) {
                    __$coverCall('src/js/Jencil.js', '72263:72272');
                    end = 0.5;
                }
                __$coverCall('src/js/Jencil.js', '72292:72318');
                _callbackDone = callbackOn;
            }
            __$coverCall('src/js/Jencil.js', '72334:72362');
            MultiPanel._animating = true;
            __$coverCall('src/js/Jencil.js', '72370:72523');
            callbackDone = function () {
                __$coverCall('src/js/Jencil.js', '72406:72435');
                MultiPanel._animating = false;
                __$coverCall('src/js/Jencil.js', '72445:72514');
                return typeof _callbackDone === 'function' ? _callbackDone() : void 0;
            };
            __$coverCall('src/js/Jencil.js', '72531:72760');
            return animate({
                start: volume,
                end: end,
                duration: 500,
                callbackEach: function (value, epoch) {
                    __$coverCall('src/js/Jencil.js', '72669:72704');
                    return _this.splitter.volume(value);
                },
                callbackDone: callbackDone
            });
        };
        __$coverCall('src/js/Jencil.js', '72774:72791');
        return MultiPanel;
    }(Panel);
    __$coverCall('src/js/Jencil.js', '72810:73586');
    VerticalPanel = function (_super) {
        __$coverCall('src/js/Jencil.js', '72851:72883');
        __extends(VerticalPanel, _super);
        __$coverCall('src/js/Jencil.js', '72890:73233');
        function VerticalPanel(core, fst, snd, defaultVolume) {
            __$coverCall('src/js/Jencil.js', '72952:72964');
            var splitter;
            __$coverCall('src/js/Jencil.js', '72972:73036');
            if (defaultVolume == null) {
                __$coverCall('src/js/Jencil.js', '73009:73028');
                defaultVolume = 0.5;
            }
            __$coverCall('src/js/Jencil.js', '73044:73106');
            splitter = new VerticalSplitter(core, fst, snd, defaultVolume);
            __$coverCall('src/js/Jencil.js', '73114:73186');
            VerticalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
            __$coverCall('src/js/Jencil.js', '73194:73227');
            this.element.addClass('vertical');
        }
        __$coverCall('src/js/Jencil.js', '73240:73540');
        VerticalPanel.prototype.adjust = function () {
            __$coverCall('src/js/Jencil.js', '73292:73349');
            this.fst.element.outerHeight(true, this.element.height());
            __$coverCall('src/js/Jencil.js', '73357:73414');
            this.snd.element.outerHeight(true, this.element.height());
            __$coverCall('src/js/Jencil.js', '73422:73484');
            this.splitter.element.outerHeight(true, this.element.height());
            __$coverCall('src/js/Jencil.js', '73492:73514');
            this.splitter.adjust();
            __$coverCall('src/js/Jencil.js', '73522:73533');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '73547:73567');
        return VerticalPanel;
    }(MultiPanel);
    __$coverCall('src/js/Jencil.js', '73591:74377');
    HorizontalPanel = function (_super) {
        __$coverCall('src/js/Jencil.js', '73634:73668');
        __extends(HorizontalPanel, _super);
        __$coverCall('src/js/Jencil.js', '73675:74026');
        function HorizontalPanel(core, fst, snd, defaultVolume) {
            __$coverCall('src/js/Jencil.js', '73739:73751');
            var splitter;
            __$coverCall('src/js/Jencil.js', '73759:73823');
            if (defaultVolume == null) {
                __$coverCall('src/js/Jencil.js', '73796:73815');
                defaultVolume = 0.5;
            }
            __$coverCall('src/js/Jencil.js', '73831:73895');
            splitter = new HorizontalSplitter(core, fst, snd, defaultVolume);
            __$coverCall('src/js/Jencil.js', '73903:73977');
            HorizontalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
            __$coverCall('src/js/Jencil.js', '73985:74020');
            this.element.addClass('horizontal');
        }
        __$coverCall('src/js/Jencil.js', '74033:74329');
        HorizontalPanel.prototype.adjust = function () {
            __$coverCall('src/js/Jencil.js', '74087:74142');
            this.fst.element.outerWidth(true, this.element.width());
            __$coverCall('src/js/Jencil.js', '74150:74205');
            this.snd.element.outerWidth(true, this.element.width());
            __$coverCall('src/js/Jencil.js', '74213:74273');
            this.splitter.element.outerWidth(true, this.element.width());
            __$coverCall('src/js/Jencil.js', '74281:74303');
            this.splitter.adjust();
            __$coverCall('src/js/Jencil.js', '74311:74322');
            return this;
        };
        __$coverCall('src/js/Jencil.js', '74336:74358');
        return HorizontalPanel;
    }(MultiPanel);
    __$coverCall('src/js/Jencil.js', '74382:74572');
    namespace('Jencil.multipanels', function (exports) {
        __$coverCall('src/js/Jencil.js', '74438:74469');
        exports.MultiPanel = MultiPanel;
        __$coverCall('src/js/Jencil.js', '74475:74512');
        exports.VerticalPanel = VerticalPanel;
        __$coverCall('src/js/Jencil.js', '74518:74566');
        return exports.HorizontalPanel = HorizontalPanel;
    });
    __$coverCall('src/js/Jencil.js', '74577:74841');
    MonomainPanel = function () {
        __$coverCall('src/js/Jencil.js', '74612:74805');
        function MonomainPanel(core, profile) {
            __$coverCall('src/js/Jencil.js', '74658:74673');
            var editorPanel;
            __$coverCall('src/js/Jencil.js', '74681:74724');
            editorPanel = new profile.editorClass(core);
            __$coverCall('src/js/Jencil.js', '74732:74773');
            editorPanel.element.addClass('mainPanel');
            __$coverCall('src/js/Jencil.js', '74781:74799');
            return editorPanel;
        }
        __$coverCall('src/js/Jencil.js', '74812:74832');
        return MonomainPanel;
    }();
    __$coverCall('src/js/Jencil.js', '74846:75573');
    DimainPanel = function (_super) {
        __$coverCall('src/js/Jencil.js', '74885:74915');
        __extends(DimainPanel, _super);
        __$coverCall('src/js/Jencil.js', '74922:75365');
        function DimainPanel(core, profile) {
            __$coverCall('src/js/Jencil.js', '74966:74982');
            var _this = this;
            __$coverCall('src/js/Jencil.js', '74990:75038');
            this.editorPanel = new profile.editorClass(core);
            __$coverCall('src/js/Jencil.js', '75046:75094');
            this.viewerPanel = new profile.viewerClass(core);
            __$coverCall('src/js/Jencil.js', '75102:75211');
            DimainPanel.__super__.constructor.call(this, core, this.editorPanel, this.viewerPanel, profile.defaultVolume);
            __$coverCall('src/js/Jencil.js', '75219:75253');
            this.element.addClass('mainPanel');
            __$coverCall('src/js/Jencil.js', '75261:75359');
            this.editorPanel.change(function (value) {
                __$coverCall('src/js/Jencil.js', '75311:75349');
                return _this.viewerPanel.update(value);
            });
        }
        __$coverCall('src/js/Jencil.js', '75372:75526');
        DimainPanel.prototype.init = function () {
            __$coverCall('src/js/Jencil.js', '75420:75457');
            DimainPanel.__super__.init.call(this);
            __$coverCall('src/js/Jencil.js', '75465:75519');
            return this.viewerPanel.update(this.editorPanel.val());
        };
        __$coverCall('src/js/Jencil.js', '75533:75551');
        return DimainPanel;
    }(VerticalPanel);
    __$coverCall('src/js/Jencil.js', '75578:76484');
    TrimainPanel = function (_super) {
        __$coverCall('src/js/Jencil.js', '75618:75649');
        __extends(TrimainPanel, _super);
        __$coverCall('src/js/Jencil.js', '75656:76271');
        function TrimainPanel(core, profile) {
            __$coverCall('src/js/Jencil.js', '75701:75717');
            var _this = this;
            __$coverCall('src/js/Jencil.js', '75725:75773');
            this.editorPanel = new profile.editorClass(core);
            __$coverCall('src/js/Jencil.js', '75781:75829');
            this.viewerPanel = new profile.viewerClass(core);
            __$coverCall('src/js/Jencil.js', '75837:75885');
            this.helperPanel = new profile.helperClass(core);
            __$coverCall('src/js/Jencil.js', '75893:75996');
            this.verticalPanel = new VerticalPanel(core, this.editorPanel, this.viewerPanel, profile.defaultVolume);
            __$coverCall('src/js/Jencil.js', '76004:76117');
            TrimainPanel.__super__.constructor.call(this, core, this.verticalPanel, this.helperPanel, profile.defaultVolume2);
            __$coverCall('src/js/Jencil.js', '76125:76159');
            this.element.addClass('mainPanel');
            __$coverCall('src/js/Jencil.js', '76167:76265');
            this.editorPanel.change(function (value) {
                __$coverCall('src/js/Jencil.js', '76217:76255');
                return _this.viewerPanel.update(value);
            });
        }
        __$coverCall('src/js/Jencil.js', '76278:76434');
        TrimainPanel.prototype.init = function () {
            __$coverCall('src/js/Jencil.js', '76327:76365');
            TrimainPanel.__super__.init.call(this);
            __$coverCall('src/js/Jencil.js', '76373:76427');
            return this.viewerPanel.update(this.editorPanel.val());
        };
        __$coverCall('src/js/Jencil.js', '76441:76460');
        return TrimainPanel;
    }(HorizontalPanel);
    __$coverCall('src/js/Jencil.js', '76489:76674');
    namespace('Jencil.mainpanels', function (exports) {
        __$coverCall('src/js/Jencil.js', '76544:76581');
        exports.MonomainPanel = MonomainPanel;
        __$coverCall('src/js/Jencil.js', '76587:76620');
        exports.DimainPanel = DimainPanel;
        __$coverCall('src/js/Jencil.js', '76626:76668');
        return exports.TrimainPanel = TrimainPanel;
    });
    __$coverCall('src/js/Jencil.js', '76679:79539');
    Fullscreen = function (_super) {
        __$coverCall('src/js/Jencil.js', '76717:76746');
        __extends(Fullscreen, _super);
        __$coverCall('src/js/Jencil.js', '76753:78050');
        function Fullscreen(core) {
            __$coverCall('src/js/Jencil.js', '76787:76803');
            var _this = this;
            __$coverCall('src/js/Jencil.js', '76811:76860');
            Fullscreen.__super__.constructor.call(this, core);
            __$coverCall('src/js/Jencil.js', '76868:76903');
            this.element.addClass('fullscreen');
            __$coverCall('src/js/Jencil.js', '76911:77082');
            this.element.css({
                'position': 'fixed',
                'top': '0',
                'left': '0',
                'width': '100%',
                'height': '100%',
                'z-index': 100
            });
            __$coverCall('src/js/Jencil.js', '77090:77135');
            this.curtain = $('<div>').addClass('curtain');
            __$coverCall('src/js/Jencil.js', '77143:77379');
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
            __$coverCall('src/js/Jencil.js', '77387:77547');
            this.cell = $('<div>').css({
                'position': 'absolute',
                'top': '5%',
                'left': '5%',
                'width': '90%',
                'height': '90%'
            });
            __$coverCall('src/js/Jencil.js', '77555:77776');
            if ($.browser.msie && $.browser.version < 7) {
                __$coverCall('src/js/Jencil.js', '77610:77650');
                this.element.css('position', 'absolute');
                __$coverCall('src/js/Jencil.js', '77660:77768');
                $(window).scroll(function () {
                    __$coverCall('src/js/Jencil.js', '77700:77756');
                    return _this.element.css('top', $(document).scrollTop());
                });
            }
            __$coverCall('src/js/Jencil.js', '77784:77852');
            this.curtain.click(function () {
                __$coverCall('src/js/Jencil.js', '77824:77842');
                return _this.off();
            });
            __$coverCall('src/js/Jencil.js', '77860:77893');
            this.element.append(this.curtain);
            __$coverCall('src/js/Jencil.js', '77901:77931');
            this.element.append(this.cell);
            __$coverCall('src/js/Jencil.js', '77939:77958');
            this.element.hide();
            __$coverCall('src/js/Jencil.js', '77966:78044');
            this.resize = function () {
                __$coverCall('src/js/Jencil.js', '78001:78035');
                return _this.core.wrapper.adjust();
            };
        }
        __$coverCall('src/js/Jencil.js', '78057:78757');
        Fullscreen.prototype.on = function () {
            __$coverCall('src/js/Jencil.js', '78102:78133');
            var ratio, _this = this;
            __$coverCall('src/js/Jencil.js', '78141:78157');
            ratio = 9 / 10;
            __$coverCall('src/js/Jencil.js', '78165:78208');
            this.cell.append(this.core.wrapper.element);
            __$coverCall('src/js/Jencil.js', '78216:78288');
            this.core.wrapper.element.outerWidth(true, this.element.width() * ratio);
            __$coverCall('src/js/Jencil.js', '78296:78370');
            this.core.wrapper.element.outerHeight(true, this.element.height() * ratio);
            __$coverCall('src/js/Jencil.js', '78378:78402');
            this.core.wrapper.init();
            __$coverCall('src/js/Jencil.js', '78410:78436');
            this.core.wrapper.adjust();
            __$coverCall('src/js/Jencil.js', '78444:78484');
            this.core.wrapper.workspace.update(true);
            __$coverCall('src/js/Jencil.js', '78492:78700');
            this.element.fadeIn('fast', function () {
                __$coverCall('src/js/Jencil.js', '78541:78588');
                _this.core.wrapper.element.css('width', '100%');
                __$coverCall('src/js/Jencil.js', '78598:78646');
                _this.core.wrapper.element.css('height', '100%');
                __$coverCall('src/js/Jencil.js', '78656:78690');
                return _this.core.wrapper.adjust();
            });
            __$coverCall('src/js/Jencil.js', '78708:78750');
            return $(window).on('resize', this.resize);
        };
        __$coverCall('src/js/Jencil.js', '78764:79172');
        Fullscreen.prototype.off = function () {
            __$coverCall('src/js/Jencil.js', '78810:78860');
            this.core.element.after(this.core.wrapper.element);
            __$coverCall('src/js/Jencil.js', '78868:78910');
            this.core.wrapper.element.css('width', '');
            __$coverCall('src/js/Jencil.js', '78918:78961');
            this.core.wrapper.element.css('height', '');
            __$coverCall('src/js/Jencil.js', '78969:78993');
            this.core.wrapper.init();
            __$coverCall('src/js/Jencil.js', '79001:79027');
            this.core.wrapper.adjust();
            __$coverCall('src/js/Jencil.js', '79035:79075');
            this.core.wrapper.workspace.update(true);
            __$coverCall('src/js/Jencil.js', '79083:79111');
            this.element.fadeOut('fast');
            __$coverCall('src/js/Jencil.js', '79119:79165');
            return $(window).unbind('resize', this.resize);
        };
        __$coverCall('src/js/Jencil.js', '79179:79501');
        Fullscreen.prototype.toggle = function (callbackOn, callbackOff) {
            __$coverCall('src/js/Jencil.js', '79251:79494');
            if (this.element.is(':visible')) {
                __$coverCall('src/js/Jencil.js', '79294:79304');
                this.off();
                __$coverCall('src/js/Jencil.js', '79314:79379');
                return typeof callbackOff === 'function' ? callbackOff() : void 0;
            } else {
                __$coverCall('src/js/Jencil.js', '79404:79413');
                this.on();
                __$coverCall('src/js/Jencil.js', '79423:79486');
                return typeof callbackOn === 'function' ? callbackOn() : void 0;
            }
        };
        __$coverCall('src/js/Jencil.js', '79508:79525');
        return Fullscreen;
    }(Panel);
    __$coverCall('src/js/Jencil.js', '79544:81220');
    autoIndentableHtml = function () {
        __$coverCall('src/js/Jencil.js', '79583:79609');
        var PATTERNS, post, pre, x;
        __$coverCall('src/js/Jencil.js', '79615:79941');
        PATTERNS = function () {
            __$coverCall('src/js/Jencil.js', '79646:79674');
            var _i, _len, _ref, _results;
            __$coverCall('src/js/Jencil.js', '79682:79700');
            _ref = [
                'p',
                'li'
            ];
            __$coverCall('src/js/Jencil.js', '79708:79721');
            _results = [];
            __$coverCall('src/js/Jencil.js', '79729:79908');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                __$coverCall('src/js/Jencil.js', '79789:79801');
                x = _ref[_i];
                __$coverCall('src/js/Jencil.js', '79811:79900');
                _results.push([
                    x,
                    new RegExp('^[s\t]*<' + x + '>'),
                    new RegExp('</' + x + '>[s\t]*$')
                ]);
            }
            __$coverCall('src/js/Jencil.js', '79916:79931');
            return _results;
        }();
        __$coverCall('src/js/Jencil.js', '79947:80358');
        pre = function (e, line) {
            __$coverCall('src/js/Jencil.js', '79979:80011');
            var lineCaret, pattern, _i, _len;
            __$coverCall('src/js/Jencil.js', '80019:80059');
            if (e.shiftKey) {
                __$coverCall('src/js/Jencil.js', '80045:80051');
                return;
            }
            __$coverCall('src/js/Jencil.js', '80067:80351');
            for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {
                __$coverCall('src/js/Jencil.js', '80131:80153');
                pattern = PATTERNS[_i];
                __$coverCall('src/js/Jencil.js', '80163:80343');
                if (pattern[1].test(line) || pattern[2].test(line)) {
                    __$coverCall('src/js/Jencil.js', '80227:80269');
                    lineCaret = this.selection._getLineCaret();
                    __$coverCall('src/js/Jencil.js', '80281:80315');
                    this.selection.caret(lineCaret[1]);
                    __$coverCall('src/js/Jencil.js', '80327:80333');
                    return;
                }
            }
        };
        __$coverCall('src/js/Jencil.js', '80364:80809');
        post = function (e, line, indent, insert) {
            __$coverCall('src/js/Jencil.js', '80413:80434');
            var pattern, _i, _len;
            __$coverCall('src/js/Jencil.js', '80442:80482');
            if (e.shiftKey) {
                __$coverCall('src/js/Jencil.js', '80468:80474');
                return;
            }
            __$coverCall('src/js/Jencil.js', '80490:80802');
            for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {
                __$coverCall('src/js/Jencil.js', '80554:80576');
                pattern = PATTERNS[_i];
                __$coverCall('src/js/Jencil.js', '80586:80794');
                if (pattern[2].test(line)) {
                    __$coverCall('src/js/Jencil.js', '80625:80639');
                    x = pattern[0];
                    __$coverCall('src/js/Jencil.js', '80651:80711');
                    this.selection.insertAfter('<' + x + '></' + x + '>', false);
                    __$coverCall('src/js/Jencil.js', '80723:80766');
                    this.selection.caretOffset(-(3 + x.length));
                    __$coverCall('src/js/Jencil.js', '80778:80784');
                    return;
                }
            }
        };
        __$coverCall('src/js/Jencil.js', '80815:81212');
        return function (textarea) {
            __$coverCall('src/js/Jencil.js', '80849:80938');
            if (!(textarea.autoIndent != null)) {
                __$coverCall('src/js/Jencil.js', '80895:80930');
                textarea = autoIndentable(textarea);
            }
            __$coverCall('src/js/Jencil.js', '80946:81043');
            textarea.autoIndent.pre = function (e, line) {
                __$coverCall('src/js/Jencil.js', '81000:81034');
                return pre.call(textarea, e, line);
            };
            __$coverCall('src/js/Jencil.js', '81051:81182');
            textarea.autoIndent.post = function (e, line, indent, insert) {
                __$coverCall('src/js/Jencil.js', '81122:81173');
                return post.call(textarea, e, line, indent, insert);
            };
            __$coverCall('src/js/Jencil.js', '81190:81205');
            return textarea;
        };
    }();
    __$coverCall('src/js/Jencil.js', '81225:81919');
    headerMarkup = function () {
        __$coverCall('src/js/Jencil.js', '81258:81269');
        var PATTERN;
        __$coverCall('src/js/Jencil.js', '81275:81327');
        PATTERN = new RegExp('^<h([1-6])>(.*)</h[1-6]>\n?$');
        __$coverCall('src/js/Jencil.js', '81333:81911');
        return function (n) {
            __$coverCall('src/js/Jencil.js', '81360:81388');
            var caret, replacement, text;
            __$coverCall('src/js/Jencil.js', '81396:81435');
            caret = this.textarea.selection.caret();
            __$coverCall('src/js/Jencil.js', '81443:81536');
            if (caret[0] === caret[1]) {
                __$coverCall('src/js/Jencil.js', '81480:81528');
                this.textarea.selection.selectWholeCurrentLine();
            }
            __$coverCall('src/js/Jencil.js', '81544:81567');
            text = this.selection();
            __$coverCall('src/js/Jencil.js', '81575:81904');
            if (PATTERN.test(text)) {
                __$coverCall('src/js/Jencil.js', '81609:81773');
                if (RegExp.$1 === n.toString()) {
                    __$coverCall('src/js/Jencil.js', '81653:81676');
                    replacement = RegExp.$2;
                } else {
                    __$coverCall('src/js/Jencil.js', '81705:81763');
                    replacement = '<h' + n + '>' + RegExp.$2 + '</h' + n + '>';
                }
                __$coverCall('src/js/Jencil.js', '81783:81817');
                return this.selection(replacement);
            } else {
                __$coverCall('src/js/Jencil.js', '81842:81896');
                return this.enclose('<h' + n + '>', '</h' + n + '>\n');
            }
        };
    }();
    __$coverCall('src/js/Jencil.js', '81924:85519');
    HtmlEditor = function (_super) {
        __$coverCall('src/js/Jencil.js', '81962:81991');
        __extends(HtmlEditor, _super);
        __$coverCall('src/js/Jencil.js', '81998:82144');
        function HtmlEditor(core) {
            __$coverCall('src/js/Jencil.js', '82032:82081');
            HtmlEditor.__super__.constructor.call(this, core);
            __$coverCall('src/js/Jencil.js', '82089:82138');
            this.textarea = autoIndentableHtml(this.textarea);
        }
        __$coverCall('src/js/Jencil.js', '82151:82236');
        HtmlEditor.prototype.h1 = function () {
            __$coverCall('src/js/Jencil.js', '82196:82229');
            return headerMarkup.call(this, 1);
        };
        __$coverCall('src/js/Jencil.js', '82243:82328');
        HtmlEditor.prototype.h2 = function () {
            __$coverCall('src/js/Jencil.js', '82288:82321');
            return headerMarkup.call(this, 2);
        };
        __$coverCall('src/js/Jencil.js', '82335:82420');
        HtmlEditor.prototype.h3 = function () {
            __$coverCall('src/js/Jencil.js', '82380:82413');
            return headerMarkup.call(this, 3);
        };
        __$coverCall('src/js/Jencil.js', '82427:82512');
        HtmlEditor.prototype.h4 = function () {
            __$coverCall('src/js/Jencil.js', '82472:82505');
            return headerMarkup.call(this, 4);
        };
        __$coverCall('src/js/Jencil.js', '82519:82604');
        HtmlEditor.prototype.h5 = function () {
            __$coverCall('src/js/Jencil.js', '82564:82597');
            return headerMarkup.call(this, 5);
        };
        __$coverCall('src/js/Jencil.js', '82611:82696');
        HtmlEditor.prototype.h6 = function () {
            __$coverCall('src/js/Jencil.js', '82656:82689');
            return headerMarkup.call(this, 6);
        };
        __$coverCall('src/js/Jencil.js', '82703:82791');
        HtmlEditor.prototype.bold = function () {
            __$coverCall('src/js/Jencil.js', '82750:82784');
            return this.enclose('<b>', '</b>');
        };
        __$coverCall('src/js/Jencil.js', '82798:82888');
        HtmlEditor.prototype.italic = function () {
            __$coverCall('src/js/Jencil.js', '82847:82881');
            return this.enclose('<i>', '</i>');
        };
        __$coverCall('src/js/Jencil.js', '82895:82988');
        HtmlEditor.prototype.underline = function () {
            __$coverCall('src/js/Jencil.js', '82947:82981');
            return this.enclose('<u>', '</u>');
        };
        __$coverCall('src/js/Jencil.js', '82995:83085');
        HtmlEditor.prototype.strike = function () {
            __$coverCall('src/js/Jencil.js', '83044:83078');
            return this.enclose('<s>', '</s>');
        };
        __$coverCall('src/js/Jencil.js', '83092:83191');
        HtmlEditor.prototype.superscript = function () {
            __$coverCall('src/js/Jencil.js', '83146:83184');
            return this.enclose('<sup>', '</sup>');
        };
        __$coverCall('src/js/Jencil.js', '83198:83295');
        HtmlEditor.prototype.subscript = function () {
            __$coverCall('src/js/Jencil.js', '83250:83288');
            return this.enclose('<sub>', '</sub>');
        };
        __$coverCall('src/js/Jencil.js', '83302:83391');
        HtmlEditor.prototype.quote = function () {
            __$coverCall('src/js/Jencil.js', '83350:83384');
            return this.enclose('<q>', '</q>');
        };
        __$coverCall('src/js/Jencil.js', '83398:83514');
        HtmlEditor.prototype.blockquote = function () {
            __$coverCall('src/js/Jencil.js', '83451:83507');
            return this.enclose('\n<blockquote>', '</blockquote>\n');
        };
        __$coverCall('src/js/Jencil.js', '83521:83615');
        HtmlEditor.prototype.code = function () {
            __$coverCall('src/js/Jencil.js', '83568:83608');
            return this.enclose('<code>', '</code>');
        };
        __$coverCall('src/js/Jencil.js', '83622:83713');
        HtmlEditor.prototype.pre = function () {
            __$coverCall('src/js/Jencil.js', '83668:83706');
            return this.enclose('<pre>', '</pre>');
        };
        __$coverCall('src/js/Jencil.js', '83720:84109');
        HtmlEditor.prototype.anchorLink = function () {
            __$coverCall('src/js/Jencil.js', '83773:83787');
            var href, text;
            __$coverCall('src/js/Jencil.js', '83795:83818');
            text = this.selection();
            __$coverCall('src/js/Jencil.js', '83826:83911');
            if (!text) {
                __$coverCall('src/js/Jencil.js', '83847:83903');
                text = window.prompt('Please input a link text', 'Here');
            }
            __$coverCall('src/js/Jencil.js', '83919:83977');
            href = window.prompt('Please input a link url', 'http://');
            __$coverCall('src/js/Jencil.js', '83985:84030');
            if (!(href != null)) {
                __$coverCall('src/js/Jencil.js', '84016:84022');
                return;
            }
            __$coverCall('src/js/Jencil.js', '84038:84102');
            return this.selection('<a href=\'' + href + '\'>' + text + '</a>');
        };
        __$coverCall('src/js/Jencil.js', '84116:84452');
        HtmlEditor.prototype.image = function () {
            __$coverCall('src/js/Jencil.js', '84164:84176');
            var alt, src;
            __$coverCall('src/js/Jencil.js', '84184:84242');
            src = window.prompt('Please input a image url', 'http://');
            __$coverCall('src/js/Jencil.js', '84250:84319');
            alt = window.prompt('(Optional) Please input a alt message', 'Image');
            __$coverCall('src/js/Jencil.js', '84327:84371');
            if (!(src != null)) {
                __$coverCall('src/js/Jencil.js', '84357:84363');
                return;
            }
            __$coverCall('src/js/Jencil.js', '84379:84445');
            return this.selection('<img src=\'' + src + '\' alt=\'' + alt + '\'>');
        };
        __$coverCall('src/js/Jencil.js', '84459:84965');
        HtmlEditor.prototype.unorderedList = function () {
            __$coverCall('src/js/Jencil.js', '84515:84526');
            var text, x;
            __$coverCall('src/js/Jencil.js', '84534:84557');
            text = this.selection();
            __$coverCall('src/js/Jencil.js', '84565:84858');
            text = function () {
                __$coverCall('src/js/Jencil.js', '84594:84622');
                var _i, _len, _ref, _results;
                __$coverCall('src/js/Jencil.js', '84632:84655');
                _ref = text.split('\n');
                __$coverCall('src/js/Jencil.js', '84665:84678');
                _results = [];
                __$coverCall('src/js/Jencil.js', '84688:84821');
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    __$coverCall('src/js/Jencil.js', '84750:84762');
                    x = _ref[_i];
                    __$coverCall('src/js/Jencil.js', '84774:84811');
                    _results.push('  <li>' + x + '</li>');
                }
                __$coverCall('src/js/Jencil.js', '84831:84846');
                return _results;
            }();
            __$coverCall('src/js/Jencil.js', '84866:84886');
            text.unshift('<ul>');
            __$coverCall('src/js/Jencil.js', '84894:84912');
            text.push('</ul>');
            __$coverCall('src/js/Jencil.js', '84920:84958');
            return this.selection(text.join('\n'));
        };
        __$coverCall('src/js/Jencil.js', '84972:85476');
        HtmlEditor.prototype.orderedList = function () {
            __$coverCall('src/js/Jencil.js', '85026:85037');
            var text, x;
            __$coverCall('src/js/Jencil.js', '85045:85068');
            text = this.selection();
            __$coverCall('src/js/Jencil.js', '85076:85369');
            text = function () {
                __$coverCall('src/js/Jencil.js', '85105:85133');
                var _i, _len, _ref, _results;
                __$coverCall('src/js/Jencil.js', '85143:85166');
                _ref = text.split('\n');
                __$coverCall('src/js/Jencil.js', '85176:85189');
                _results = [];
                __$coverCall('src/js/Jencil.js', '85199:85332');
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    __$coverCall('src/js/Jencil.js', '85261:85273');
                    x = _ref[_i];
                    __$coverCall('src/js/Jencil.js', '85285:85322');
                    _results.push('  <li>' + x + '</li>');
                }
                __$coverCall('src/js/Jencil.js', '85342:85357');
                return _results;
            }();
            __$coverCall('src/js/Jencil.js', '85377:85397');
            text.unshift('<ol>');
            __$coverCall('src/js/Jencil.js', '85405:85423');
            text.push('</ol>');
            __$coverCall('src/js/Jencil.js', '85431:85469');
            return this.selection(text.join('\n'));
        };
        __$coverCall('src/js/Jencil.js', '85483:85500');
        return HtmlEditor;
    }(TextEditor);
    __$coverCall('src/js/Jencil.js', '85524:85551');
    HtmlViewer = TemplateViewer;
    __$coverCall('src/js/Jencil.js', '85556:86559');
    HtmlHelper = function (_super) {
        __$coverCall('src/js/Jencil.js', '85594:85623');
        __extends(HtmlHelper, _super);
        __$coverCall('src/js/Jencil.js', '85630:86516');
        function HtmlHelper(core) {
            __$coverCall('src/js/Jencil.js', '85664:85684');
            var HTML_HELPER_HTML;
            __$coverCall('src/js/Jencil.js', '85692:85741');
            HtmlHelper.__super__.constructor.call(this, core);
            __$coverCall('src/js/Jencil.js', '85749:86467');
            HTML_HELPER_HTML = '<p><span class="key">Ctrl+Z</span>' + Jencil.t('Undo') + '<p>\n<p><span class="key">Ctrl+Shift+Z</span>' + Jencil.t('Redo') + '<p>\n<p><span class="key">Ctrl+B</span>' + Jencil.t('Make selected text property as <b>Bold</b>') + '<p>\n<p><span class="key">Ctrl+I</span>' + Jencil.t('Make selected text property as <i>Italic</i>') + '<p>\n<p><span class="key">Ctrl+U</span>' + Jencil.t('Underline selected text like <u>Underline</u>') + '<p>\n<p><span class="key">Ctrl+F</span>' + Jencil.t('Toggle fullscreen mode') + '<p>\n<p><span class="key">Ctrl+Q</span>' + Jencil.t('Toggle quick view') + '<p>\n<p><span class="key">Ctrl+H</span>' + Jencil.t('Toggle help') + '<p>';
            __$coverCall('src/js/Jencil.js', '86475:86510');
            this.element.html(HTML_HELPER_HTML);
        }
        __$coverCall('src/js/Jencil.js', '86523:86540');
        return HtmlHelper;
    }(BaseHelper);
    __$coverCall('src/js/Jencil.js', '86564:87370');
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
    __$coverCall('src/js/Jencil.js', '87375:87474');
    namespace('Jencil.profiles', function (exports) {
        __$coverCall('src/js/Jencil.js', '87428:87468');
        return exports.HtmlProfile = HtmlProfile;
    });
    __$coverCall('src/js/Jencil.js', '87479:89192');
    headerMarkup = function () {
        __$coverCall('src/js/Jencil.js', '87512:87600');
        var appendAtxHeader, atxHeaderPattern, changeAtxHeader, removeAtxHeader, toggleAtxHeader;
        __$coverCall('src/js/Jencil.js', '87606:87656');
        atxHeaderPattern = new RegExp('^s*(#{1,6}s*).*');
        __$coverCall('src/js/Jencil.js', '87662:87798');
        appendAtxHeader = function (segment, n) {
            __$coverCall('src/js/Jencil.js', '87709:87719');
            var header;
            __$coverCall('src/js/Jencil.js', '87727:87749');
            header = '#'.repeat(n);
            __$coverCall('src/js/Jencil.js', '87757:87791');
            return '' + header + ' ' + segment;
        };
        __$coverCall('src/js/Jencil.js', '87804:87903');
        removeAtxHeader = function (segment) {
            __$coverCall('src/js/Jencil.js', '87848:87896');
            return segment.replace(/^(\s*)#{1,6}\s*/g, '$1');
        };
        __$coverCall('src/js/Jencil.js', '87909:88074');
        changeAtxHeader = function (segment, n) {
            __$coverCall('src/js/Jencil.js', '87956:87966');
            var header;
            __$coverCall('src/js/Jencil.js', '87974:87996');
            header = '#'.repeat(n);
            __$coverCall('src/js/Jencil.js', '88004:88067');
            return segment.replace(/^(\s*)#{1,6}\s*/g, '$1' + header + ' ');
        };
        __$coverCall('src/js/Jencil.js', '88080:89056');
        toggleAtxHeader = function (textarea, n) {
            __$coverCall('src/js/Jencil.js', '88128:88186');
            var caret, caretOffset, exists, replacement, segment, text;
            __$coverCall('src/js/Jencil.js', '88194:88215');
            text = textarea.val();
            __$coverCall('src/js/Jencil.js', '88223:88257');
            caret = textarea.selection.caret();
            __$coverCall('src/js/Jencil.js', '88265:88300');
            segment = textarea.selection.text();
            __$coverCall('src/js/Jencil.js', '88308:88323');
            caretOffset = 0;
            __$coverCall('src/js/Jencil.js', '88331:88906');
            if (atxHeaderPattern.test(segment)) {
                __$coverCall('src/js/Jencil.js', '88377:88402');
                exists = RegExp.$1.trim();
                __$coverCall('src/js/Jencil.js', '88412:88567');
                if (exists.length === n) {
                    __$coverCall('src/js/Jencil.js', '88449:88487');
                    replacement = removeAtxHeader(segment);
                } else {
                    __$coverCall('src/js/Jencil.js', '88516:88557');
                    replacement = changeAtxHeader(segment, n);
                }
            } else {
                __$coverCall('src/js/Jencil.js', '88592:88633');
                replacement = appendAtxHeader(segment, n);
                __$coverCall('src/js/Jencil.js', '88643:88746');
                if (caret[0] > 0 && text[caret[0] - 1] !== '\n') {
                    __$coverCall('src/js/Jencil.js', '88704:88736');
                    replacement = '\n' + replacement;
                }
                __$coverCall('src/js/Jencil.js', '88756:88898');
                if (caret[1] < text.length && text[caret[1]] !== '\n') {
                    __$coverCall('src/js/Jencil.js', '88823:88860');
                    replacement = '' + replacement + '\n';
                    __$coverCall('src/js/Jencil.js', '88872:88888');
                    caretOffset = -1;
                }
            }
            __$coverCall('src/js/Jencil.js', '88914:88950');
            textarea.selection.text(replacement);
            __$coverCall('src/js/Jencil.js', '88958:89049');
            if (caretOffset !== 0) {
                __$coverCall('src/js/Jencil.js', '88991:89041');
                return textarea.selection.caretOffset(caretOffset);
            }
        };
        __$coverCall('src/js/Jencil.js', '89062:89184');
        return function (n) {
            __$coverCall('src/js/Jencil.js', '89089:89129');
            this.selectWholeLineIfNoSelectionFound();
            __$coverCall('src/js/Jencil.js', '89137:89177');
            return toggleAtxHeader(this.textarea, n);
        };
    }();
    __$coverCall('src/js/Jencil.js', '89197:92299');
    autoIndentableMarkdown = function () {
        __$coverCall('src/js/Jencil.js', '89240:89322');
        var findListInfo, listPattern, orderedListPattern, post, pre, unorderedListPattern;
        __$coverCall('src/js/Jencil.js', '89328:89384');
        listPattern = /^(\s*)((?:(?:\d+\.)|(?:[\*\+\->])))(\s+)/;
        __$coverCall('src/js/Jencil.js', '89390:89431');
        orderedListPattern = /^(\s*)(\d+)(\.\s+)/;
        __$coverCall('src/js/Jencil.js', '89437:89484');
        unorderedListPattern = /^(\s*)([\*\+\->])(\s+)/;
        __$coverCall('src/js/Jencil.js', '89490:89948');
        findListInfo = function (line) {
            __$coverCall('src/js/Jencil.js', '89528:89559');
            var leading, mark, spaces, type;
            __$coverCall('src/js/Jencil.js', '89567:89828');
            if (listPattern.test(line)) {
                __$coverCall('src/js/Jencil.js', '89605:89624');
                leading = RegExp.$1;
                __$coverCall('src/js/Jencil.js', '89634:89650');
                mark = RegExp.$2;
                __$coverCall('src/js/Jencil.js', '89660:89678');
                spaces = RegExp.$3;
                __$coverCall('src/js/Jencil.js', '89688:89721');
                type = mark.endsWith('.') ? 1 : 2;
            } else if (this._listInfo) {
                __$coverCall('src/js/Jencil.js', '89766:89787');
                return this._listInfo;
            } else {
                __$coverCall('src/js/Jencil.js', '89812:89820');
                type = 0;
            }
            __$coverCall('src/js/Jencil.js', '89836:89941');
            return {
                type: type,
                leading: leading,
                mark: mark,
                spaces: spaces
            };
        };
        __$coverCall('src/js/Jencil.js', '89954:90563');
        pre = function (e, line) {
            __$coverCall('src/js/Jencil.js', '89986:90022');
            var lineCaret, listInfo, _ref, _ref1;
            __$coverCall('src/js/Jencil.js', '90030:90070');
            if (e.shiftKey) {
                __$coverCall('src/js/Jencil.js', '90056:90062');
                return;
            }
            __$coverCall('src/js/Jencil.js', '90078:90118');
            listInfo = findListInfo.call(this, line);
            __$coverCall('src/js/Jencil.js', '90126:90203');
            if ((_ref = listInfo.type) === 3 || _ref === 4) {
                __$coverCall('src/js/Jencil.js', '90184:90195');
                return true;
            }
            __$coverCall('src/js/Jencil.js', '90211:90556');
            if ((_ref1 = listInfo.type) === 1 || _ref1 === 2) {
                __$coverCall('src/js/Jencil.js', '90271:90449');
                if (line.replace(listPattern, '').length === 0) {
                    __$coverCall('src/js/Jencil.js', '90331:90383');
                    this.selection.line(line.replace(listPattern, '$1'));
                    __$coverCall('src/js/Jencil.js', '90395:90416');
                    this._listInfo = null;
                    __$coverCall('src/js/Jencil.js', '90428:90439');
                    return true;
                }
                __$coverCall('src/js/Jencil.js', '90459:90497');
                lineCaret = this.selection.lineCaret();
                __$coverCall('src/js/Jencil.js', '90507:90548');
                return this.selection.caret(lineCaret[1]);
            }
        };
        __$coverCall('src/js/Jencil.js', '90569:91872');
        post = function (e, line, indent, insert, cancel) {
            __$coverCall('src/js/Jencil.js', '90626:90679');
            var leading, listInfo, num, _ref, _ref1, _ref2, _ref3;
            __$coverCall('src/js/Jencil.js', '90687:90700');
            insert = null;
            __$coverCall('src/js/Jencil.js', '90708:90748');
            listInfo = findListInfo.call(this, line);
            __$coverCall('src/js/Jencil.js', '90756:91154');
            if (cancel && !e.shiftKey && ((_ref = listInfo.type) === 3 || _ref === 4)) {
                __$coverCall('src/js/Jencil.js', '90841:90882');
                leading = listInfo.mark + listInfo.spaces;
                __$coverCall('src/js/Jencil.js', '90892:90936');
                indent = line.replace(/^([\t\s]*).*$/, '$1');
                __$coverCall('src/js/Jencil.js', '90946:90997');
                indent = ' '.repeat(indent.length - leading.length);
                __$coverCall('src/js/Jencil.js', '91007:91029');
                insert = '\n' + indent;
                __$coverCall('src/js/Jencil.js', '91039:91122');
                if (insert != null) {
                    __$coverCall('src/js/Jencil.js', '91071:91112');
                    this.selection.insertAfter(insert, false);
                }
                __$coverCall('src/js/Jencil.js', '91132:91146');
                cancel = false;
            }
            __$coverCall('src/js/Jencil.js', '91162:91198');
            if (cancel) {
                __$coverCall('src/js/Jencil.js', '91184:91190');
                return;
            }
            __$coverCall('src/js/Jencil.js', '91206:91771');
            if (e.shiftKey) {
                __$coverCall('src/js/Jencil.js', '91232:91465');
                if ((_ref1 = listInfo.type) === 1 || _ref1 === 2) {
                    __$coverCall('src/js/Jencil.js', '91294:91335');
                    leading = listInfo.mark + listInfo.spaces;
                    __$coverCall('src/js/Jencil.js', '91347:91382');
                    insert = ' '.repeat(leading.length);
                    __$coverCall('src/js/Jencil.js', '91394:91419');
                    this._listInfo = listInfo;
                    __$coverCall('src/js/Jencil.js', '91431:91455');
                    this._listInfo.type += 2;
                }
            } else if ((_ref2 = listInfo.type) === 1 || _ref2 === 3) {
                __$coverCall('src/js/Jencil.js', '91540:91586');
                num = parseInt(listInfo.mark.replace('.', ''));
                __$coverCall('src/js/Jencil.js', '91596:91643');
                insert = '' + (num + 1) + '.' + listInfo.spaces;
            } else if ((_ref3 = listInfo.type) === 2 || _ref3 === 4) {
                __$coverCall('src/js/Jencil.js', '91718:91763');
                insert = '' + listInfo.mark + listInfo.spaces;
            }
            __$coverCall('src/js/Jencil.js', '91779:91865');
            if (insert != null) {
                __$coverCall('src/js/Jencil.js', '91809:91857');
                return this.selection.insertAfter(insert, false);
            }
        };
        __$coverCall('src/js/Jencil.js', '91878:92291');
        return function (textarea) {
            __$coverCall('src/js/Jencil.js', '91912:92001');
            if (!(textarea.autoIndent != null)) {
                __$coverCall('src/js/Jencil.js', '91958:91993');
                textarea = autoIndentable(textarea);
            }
            __$coverCall('src/js/Jencil.js', '92009:92106');
            textarea.autoIndent.pre = function (e, line) {
                __$coverCall('src/js/Jencil.js', '92063:92097');
                return pre.call(textarea, e, line);
            };
            __$coverCall('src/js/Jencil.js', '92114:92261');
            textarea.autoIndent.post = function (e, line, indent, insert, cancel) {
                __$coverCall('src/js/Jencil.js', '92193:92252');
                return post.call(textarea, e, line, indent, insert, cancel);
            };
            __$coverCall('src/js/Jencil.js', '92269:92284');
            return textarea;
        };
    }();
    __$coverCall('src/js/Jencil.js', '92304:98712');
    MarkdownEditor = function (_super) {
        __$coverCall('src/js/Jencil.js', '92346:92379');
        __extends(MarkdownEditor, _super);
        __$coverCall('src/js/Jencil.js', '92386:92544');
        function MarkdownEditor(core) {
            __$coverCall('src/js/Jencil.js', '92424:92477');
            MarkdownEditor.__super__.constructor.call(this, core);
            __$coverCall('src/js/Jencil.js', '92485:92538');
            this.textarea = autoIndentableMarkdown(this.textarea);
        }
        __$coverCall('src/js/Jencil.js', '92551:93031');
        MarkdownEditor.prototype.selectWholeLineIfNoSelectionFound = function () {
            __$coverCall('src/js/Jencil.js', '92631:92657');
            var caret, line, lineCaret;
            __$coverCall('src/js/Jencil.js', '92665:92704');
            caret = this.textarea.selection.caret();
            __$coverCall('src/js/Jencil.js', '92712:93024');
            if (caret[0] === caret[1]) {
                __$coverCall('src/js/Jencil.js', '92749:92796');
                lineCaret = this.textarea.selection.lineCaret();
                __$coverCall('src/js/Jencil.js', '92806:92843');
                line = this.textarea.selection.line();
                __$coverCall('src/js/Jencil.js', '92853:92966');
                if (/^(\s*[\*\+\-]\s*|^\s*\d+\.\s*|^\s*>\s*)/g.test(line)) {
                    __$coverCall('src/js/Jencil.js', '92924:92956');
                    lineCaret[0] += RegExp.$1.length;
                }
                __$coverCall('src/js/Jencil.js', '92976:93016');
                this.textarea.selection.caret(lineCaret);
            }
        };
        __$coverCall('src/js/Jencil.js', '93038:93127');
        MarkdownEditor.prototype.h1 = function () {
            __$coverCall('src/js/Jencil.js', '93087:93120');
            return headerMarkup.call(this, 1);
        };
        __$coverCall('src/js/Jencil.js', '93134:93223');
        MarkdownEditor.prototype.h2 = function () {
            __$coverCall('src/js/Jencil.js', '93183:93216');
            return headerMarkup.call(this, 2);
        };
        __$coverCall('src/js/Jencil.js', '93230:93319');
        MarkdownEditor.prototype.h3 = function () {
            __$coverCall('src/js/Jencil.js', '93279:93312');
            return headerMarkup.call(this, 3);
        };
        __$coverCall('src/js/Jencil.js', '93326:93415');
        MarkdownEditor.prototype.h4 = function () {
            __$coverCall('src/js/Jencil.js', '93375:93408');
            return headerMarkup.call(this, 4);
        };
        __$coverCall('src/js/Jencil.js', '93422:93511');
        MarkdownEditor.prototype.h5 = function () {
            __$coverCall('src/js/Jencil.js', '93471:93504');
            return headerMarkup.call(this, 5);
        };
        __$coverCall('src/js/Jencil.js', '93518:93607');
        MarkdownEditor.prototype.h6 = function () {
            __$coverCall('src/js/Jencil.js', '93567:93600');
            return headerMarkup.call(this, 6);
        };
        __$coverCall('src/js/Jencil.js', '93614:93703');
        MarkdownEditor.prototype.bold = function () {
            __$coverCall('src/js/Jencil.js', '93665:93696');
            return this.enclose('**', '**');
        };
        __$coverCall('src/js/Jencil.js', '93710:93799');
        MarkdownEditor.prototype.italic = function () {
            __$coverCall('src/js/Jencil.js', '93763:93792');
            return this.enclose('*', '*');
        };
        __$coverCall('src/js/Jencil.js', '93806:94976');
        MarkdownEditor.prototype.blockquote = function () {
            __$coverCall('src/js/Jencil.js', '93864:93893');
            var match, pattern1, pattern2;
            __$coverCall('src/js/Jencil.js', '93901:93934');
            pattern1 = /^(\s*)>\s*([^\n]*)$/m;
            __$coverCall('src/js/Jencil.js', '93942:93971');
            pattern2 = /^(\s*)([^\n]*)$/m;
            __$coverCall('src/js/Jencil.js', '93979:94305');
            match = function (lines) {
                __$coverCall('src/js/Jencil.js', '94013:94031');
                var line, _i, _len;
                __$coverCall('src/js/Jencil.js', '94041:94275');
                for (_i = 0, _len = lines.length; _i < _len; _i++) {
                    __$coverCall('src/js/Jencil.js', '94104:94120');
                    line = lines[_i];
                    __$coverCall('src/js/Jencil.js', '94132:94189');
                    if (line.length === 0) {
                        __$coverCall('src/js/Jencil.js', '94169:94177');
                        continue;
                    }
                    __$coverCall('src/js/Jencil.js', '94201:94265');
                    if (!pattern1.test(line)) {
                        __$coverCall('src/js/Jencil.js', '94241:94253');
                        return false;
                    }
                }
                __$coverCall('src/js/Jencil.js', '94285:94296');
                return true;
            };
            __$coverCall('src/js/Jencil.js', '94313:94966');
            return function () {
                __$coverCall('src/js/Jencil.js', '94341:94380');
                var i, line, lines, _i, _j, _ref, _ref1;
                __$coverCall('src/js/Jencil.js', '94390:94426');
                lines = this.selection().split('\n');
                __$coverCall('src/js/Jencil.js', '94436:94908');
                if (match(lines)) {
                    __$coverCall('src/js/Jencil.js', '94466:94664');
                    for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
                        __$coverCall('src/js/Jencil.js', '94582:94597');
                        line = lines[i];
                        __$coverCall('src/js/Jencil.js', '94611:94652');
                        lines[i] = line.replace(pattern1, '$1$2');
                    }
                } else {
                    __$coverCall('src/js/Jencil.js', '94693:94898');
                    for (i = _j = 0, _ref1 = lines.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
                        __$coverCall('src/js/Jencil.js', '94814:94829');
                        line = lines[i];
                        __$coverCall('src/js/Jencil.js', '94843:94886');
                        lines[i] = line.replace(pattern2, '$1> $2');
                    }
                }
                __$coverCall('src/js/Jencil.js', '94918:94957');
                return this.selection(lines.join('\n'));
            };
        }();
        __$coverCall('src/js/Jencil.js', '94983:95565');
        MarkdownEditor.prototype.code = function () {
            __$coverCall('src/js/Jencil.js', '95034:95059');
            var caret, lines, text, x;
            __$coverCall('src/js/Jencil.js', '95067:95103');
            lines = this.selection().split('\n');
            __$coverCall('src/js/Jencil.js', '95111:95150');
            caret = this.textarea.selection.caret();
            __$coverCall('src/js/Jencil.js', '95158:95558');
            if (lines.length > 1) {
                __$coverCall('src/js/Jencil.js', '95190:95448');
                text = function () {
                    __$coverCall('src/js/Jencil.js', '95221:95243');
                    var _i, _len, _results;
                    __$coverCall('src/js/Jencil.js', '95255:95268');
                    _results = [];
                    __$coverCall('src/js/Jencil.js', '95280:95407');
                    for (_i = 0, _len = lines.length; _i < _len; _i++) {
                        __$coverCall('src/js/Jencil.js', '95345:95358');
                        x = lines[_i];
                        __$coverCall('src/js/Jencil.js', '95372:95395');
                        _results.push('\t' + x);
                    }
                    __$coverCall('src/js/Jencil.js', '95419:95434');
                    return _results;
                }();
                __$coverCall('src/js/Jencil.js', '95458:95496');
                return this.selection(text.join('\n'));
            } else {
                __$coverCall('src/js/Jencil.js', '95521:95550');
                return this.enclose('`', '`');
            }
        };
        __$coverCall('src/js/Jencil.js', '95572:95954');
        MarkdownEditor.prototype.anchorLink = function () {
            __$coverCall('src/js/Jencil.js', '95629:95643');
            var href, text;
            __$coverCall('src/js/Jencil.js', '95651:95674');
            text = this.selection();
            __$coverCall('src/js/Jencil.js', '95682:95767');
            if (!text) {
                __$coverCall('src/js/Jencil.js', '95703:95759');
                text = window.prompt('Please input a link text', 'Here');
            }
            __$coverCall('src/js/Jencil.js', '95775:95833');
            href = window.prompt('Please input a link url', 'http://');
            __$coverCall('src/js/Jencil.js', '95841:95886');
            if (!(href != null)) {
                __$coverCall('src/js/Jencil.js', '95872:95878');
                return;
            }
            __$coverCall('src/js/Jencil.js', '95894:95947');
            return this.selection('[' + text + '](' + href + ')');
        };
        __$coverCall('src/js/Jencil.js', '95961:96287');
        MarkdownEditor.prototype.image = function () {
            __$coverCall('src/js/Jencil.js', '96013:96025');
            var alt, src;
            __$coverCall('src/js/Jencil.js', '96033:96091');
            src = window.prompt('Please input a image url', 'http://');
            __$coverCall('src/js/Jencil.js', '96099:96168');
            alt = window.prompt('(Optional) Please input a alt message', 'Image');
            __$coverCall('src/js/Jencil.js', '96176:96220');
            if (!(src != null)) {
                __$coverCall('src/js/Jencil.js', '96206:96212');
                return;
            }
            __$coverCall('src/js/Jencil.js', '96228:96280');
            return this.selection('![' + alt + '](' + src + ')');
        };
        __$coverCall('src/js/Jencil.js', '96294:97468');
        MarkdownEditor.prototype.unorderedList = function () {
            __$coverCall('src/js/Jencil.js', '96355:96384');
            var match, pattern1, pattern2;
            __$coverCall('src/js/Jencil.js', '96392:96426');
            pattern1 = /^(\s*)\*\s*([^\n]*)$/m;
            __$coverCall('src/js/Jencil.js', '96434:96463');
            pattern2 = /^(\s*)([^\n]*)$/m;
            __$coverCall('src/js/Jencil.js', '96471:96797');
            match = function (lines) {
                __$coverCall('src/js/Jencil.js', '96505:96523');
                var line, _i, _len;
                __$coverCall('src/js/Jencil.js', '96533:96767');
                for (_i = 0, _len = lines.length; _i < _len; _i++) {
                    __$coverCall('src/js/Jencil.js', '96596:96612');
                    line = lines[_i];
                    __$coverCall('src/js/Jencil.js', '96624:96681');
                    if (line.length === 0) {
                        __$coverCall('src/js/Jencil.js', '96661:96669');
                        continue;
                    }
                    __$coverCall('src/js/Jencil.js', '96693:96757');
                    if (!pattern1.test(line)) {
                        __$coverCall('src/js/Jencil.js', '96733:96745');
                        return false;
                    }
                }
                __$coverCall('src/js/Jencil.js', '96777:96788');
                return true;
            };
            __$coverCall('src/js/Jencil.js', '96805:97458');
            return function () {
                __$coverCall('src/js/Jencil.js', '96833:96872');
                var i, line, lines, _i, _j, _ref, _ref1;
                __$coverCall('src/js/Jencil.js', '96882:96918');
                lines = this.selection().split('\n');
                __$coverCall('src/js/Jencil.js', '96928:97400');
                if (match(lines)) {
                    __$coverCall('src/js/Jencil.js', '96958:97156');
                    for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
                        __$coverCall('src/js/Jencil.js', '97074:97089');
                        line = lines[i];
                        __$coverCall('src/js/Jencil.js', '97103:97144');
                        lines[i] = line.replace(pattern1, '$1$2');
                    }
                } else {
                    __$coverCall('src/js/Jencil.js', '97185:97390');
                    for (i = _j = 0, _ref1 = lines.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
                        __$coverCall('src/js/Jencil.js', '97306:97321');
                        line = lines[i];
                        __$coverCall('src/js/Jencil.js', '97335:97378');
                        lines[i] = line.replace(pattern2, '$1* $2');
                    }
                }
                __$coverCall('src/js/Jencil.js', '97410:97449');
                return this.selection(lines.join('\n'));
            };
        }();
        __$coverCall('src/js/Jencil.js', '97475:98665');
        MarkdownEditor.prototype.orderedList = function () {
            __$coverCall('src/js/Jencil.js', '97534:97563');
            var match, pattern1, pattern2;
            __$coverCall('src/js/Jencil.js', '97571:97608');
            pattern1 = /^(\s*)\d+\.\s*([^\n]*)$/m;
            __$coverCall('src/js/Jencil.js', '97616:97645');
            pattern2 = /^(\s*)([^\n]*)$/m;
            __$coverCall('src/js/Jencil.js', '97653:97979');
            match = function (lines) {
                __$coverCall('src/js/Jencil.js', '97687:97705');
                var line, _i, _len;
                __$coverCall('src/js/Jencil.js', '97715:97949');
                for (_i = 0, _len = lines.length; _i < _len; _i++) {
                    __$coverCall('src/js/Jencil.js', '97778:97794');
                    line = lines[_i];
                    __$coverCall('src/js/Jencil.js', '97806:97863');
                    if (line.length === 0) {
                        __$coverCall('src/js/Jencil.js', '97843:97851');
                        continue;
                    }
                    __$coverCall('src/js/Jencil.js', '97875:97939');
                    if (!pattern1.test(line)) {
                        __$coverCall('src/js/Jencil.js', '97915:97927');
                        return false;
                    }
                }
                __$coverCall('src/js/Jencil.js', '97959:97970');
                return true;
            };
            __$coverCall('src/js/Jencil.js', '97987:98655');
            return function () {
                __$coverCall('src/js/Jencil.js', '98015:98054');
                var i, line, lines, _i, _j, _ref, _ref1;
                __$coverCall('src/js/Jencil.js', '98064:98100');
                lines = this.selection().split('\n');
                __$coverCall('src/js/Jencil.js', '98110:98597');
                if (match(lines)) {
                    __$coverCall('src/js/Jencil.js', '98140:98338');
                    for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
                        __$coverCall('src/js/Jencil.js', '98256:98271');
                        line = lines[i];
                        __$coverCall('src/js/Jencil.js', '98285:98326');
                        lines[i] = line.replace(pattern1, '$1$2');
                    }
                } else {
                    __$coverCall('src/js/Jencil.js', '98367:98587');
                    for (i = _j = 0, _ref1 = lines.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
                        __$coverCall('src/js/Jencil.js', '98488:98503');
                        line = lines[i];
                        __$coverCall('src/js/Jencil.js', '98517:98575');
                        lines[i] = line.replace(pattern2, '$1' + (i + 1) + '. $2');
                    }
                }
                __$coverCall('src/js/Jencil.js', '98607:98646');
                return this.selection(lines.join('\n'));
            };
        }();
        __$coverCall('src/js/Jencil.js', '98672:98693');
        return MarkdownEditor;
    }(TextEditor);
    __$coverCall('src/js/Jencil.js', '98717:98850');
    namespace('Jencil.types.markdown.editor.MarkdownEditor', function (exports) {
        __$coverCall('src/js/Jencil.js', '98798:98844');
        return exports.MarkdownEditor = MarkdownEditor;
    });
    __$coverCall('src/js/Jencil.js', '98855:99309');
    MarkdownJsViewer = function (_super) {
        __$coverCall('src/js/Jencil.js', '98899:98934');
        __extends(MarkdownJsViewer, _super);
        __$coverCall('src/js/Jencil.js', '98941:99051');
        function MarkdownJsViewer() {
            __$coverCall('src/js/Jencil.js', '98977:99045');
            return MarkdownJsViewer.__super__.constructor.apply(this, arguments);
        }
        __$coverCall('src/js/Jencil.js', '99058:99256');
        MarkdownJsViewer.prototype.update = function (value, force) {
            __$coverCall('src/js/Jencil.js', '99125:99133');
            var html;
            __$coverCall('src/js/Jencil.js', '99141:99177');
            html = window.markdown.toHTML(value);
            __$coverCall('src/js/Jencil.js', '99185:99249');
            return MarkdownJsViewer.__super__.update.call(this, html, force);
        };
        __$coverCall('src/js/Jencil.js', '99263:99286');
        return MarkdownJsViewer;
    }(TemplateViewer);
    __$coverCall('src/js/Jencil.js', '99314:99910');
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
    __$coverCall('src/js/Jencil.js', '99915:100022');
    namespace('Jencil.profiles', function (exports) {
        __$coverCall('src/js/Jencil.js', '99968:100016');
        return exports.MarkdownProfile = MarkdownProfile;
    });
}.call(this));