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
__$coverInit("src/js/types/markdown/editor.js", "var MarkdownEditor, autoIndentableMarkdown, headerMarkup,\n  __hasProp = {}.hasOwnProperty,\n  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };\n\nheaderMarkup = (function() {\n  var appendAtxHeader, atxHeaderPattern, changeAtxHeader, removeAtxHeader, toggleAtxHeader;\n  atxHeaderPattern = new RegExp('^\\s*(#{1,6}\\s*).*');\n  appendAtxHeader = function(segment, n) {\n    var header;\n    header = \"#\".repeat(n);\n    return \"\" + header + \" \" + segment;\n  };\n  removeAtxHeader = function(segment) {\n    return segment.replace(/^(\\s*)#{1,6}\\s*/g, '$1');\n  };\n  changeAtxHeader = function(segment, n) {\n    var header;\n    header = \"#\".repeat(n);\n    return segment.replace(/^(\\s*)#{1,6}\\s*/g, \"$1\" + header + \" \");\n  };\n  toggleAtxHeader = function(textarea, n) {\n    var caret, caretOffset, exists, replacement, segment, text;\n    text = textarea.val();\n    caret = textarea.selection.caret();\n    segment = textarea.selection.text();\n    caretOffset = 0;\n    if (atxHeaderPattern.test(segment)) {\n      exists = RegExp.$1.trim();\n      if (exists.length === n) {\n        replacement = removeAtxHeader(segment);\n      } else {\n        replacement = changeAtxHeader(segment, n);\n      }\n    } else {\n      replacement = appendAtxHeader(segment, n);\n      if (caret[0] > 0 && text[caret[0] - 1] !== \"\\n\") {\n        replacement = \"\\n\" + replacement;\n      }\n      if (caret[1] < text.length && text[caret[1]] !== \"\\n\") {\n        replacement = \"\" + replacement + \"\\n\";\n        caretOffset = -1;\n      }\n    }\n    textarea.selection.text(replacement);\n    if (caretOffset !== 0) {\n      return textarea.selection.caretOffset(caretOffset);\n    }\n  };\n  return function(n) {\n    this.selectWholeLineIfNoSelectionFound();\n    return toggleAtxHeader(this.textarea, n);\n  };\n})();\n\nautoIndentableMarkdown = (function() {\n  var findListInfo, listPattern, orderedListPattern, post, pre, unorderedListPattern;\n  listPattern = /^(\\s*)((?:(?:\\d+\\.)|(?:[\\*\\+\\->])))(\\s+)/;\n  orderedListPattern = /^(\\s*)(\\d+)(\\.\\s+)/;\n  unorderedListPattern = /^(\\s*)([\\*\\+\\->])(\\s+)/;\n  findListInfo = function(line) {\n    var leading, mark, spaces, type;\n    if (listPattern.test(line)) {\n      leading = RegExp.$1;\n      mark = RegExp.$2;\n      spaces = RegExp.$3;\n      type = mark.endsWith(\".\") ? 1 : 2;\n    } else if (this._listInfo) {\n      return this._listInfo;\n    } else {\n      type = 0;\n    }\n    return {\n      type: type,\n      leading: leading,\n      mark: mark,\n      spaces: spaces\n    };\n  };\n  pre = function(e, line) {\n    var lineCaret, listInfo, _ref, _ref1;\n    if (e.shiftKey) {\n      return;\n    }\n    listInfo = findListInfo.call(this, line);\n    if ((_ref = listInfo.type) === 3 || _ref === 4) {\n      return true;\n    }\n    if ((_ref1 = listInfo.type) === 1 || _ref1 === 2) {\n      if (line.replace(listPattern, '').length === 0) {\n        this.selection.line(line.replace(listPattern, '$1'));\n        this._listInfo = null;\n        return true;\n      }\n      lineCaret = this.selection.lineCaret();\n      return this.selection.caret(lineCaret[1]);\n    }\n  };\n  post = function(e, line, indent, insert, cancel) {\n    var leading, listInfo, num, _ref, _ref1, _ref2, _ref3;\n    insert = null;\n    listInfo = findListInfo.call(this, line);\n    if (cancel && !e.shiftKey && ((_ref = listInfo.type) === 3 || _ref === 4)) {\n      leading = listInfo.mark + listInfo.spaces;\n      indent = line.replace(/^([\\t\\s]*).*$/, \"$1\");\n      indent = \" \".repeat(indent.length - leading.length);\n      insert = \"\\n\" + indent;\n      if (insert != null) {\n        this.selection.insertAfter(insert, false);\n      }\n      cancel = false;\n    }\n    if (cancel) {\n      return;\n    }\n    if (e.shiftKey) {\n      if ((_ref1 = listInfo.type) === 1 || _ref1 === 2) {\n        leading = listInfo.mark + listInfo.spaces;\n        insert = \" \".repeat(leading.length);\n        this._listInfo = listInfo;\n        this._listInfo.type += 2;\n      }\n    } else if ((_ref2 = listInfo.type) === 1 || _ref2 === 3) {\n      num = parseInt(listInfo.mark.replace(\".\", \"\"));\n      insert = \"\" + (num + 1) + \".\" + listInfo.spaces;\n    } else if ((_ref3 = listInfo.type) === 2 || _ref3 === 4) {\n      insert = \"\" + listInfo.mark + listInfo.spaces;\n    }\n    if (insert != null) {\n      return this.selection.insertAfter(insert, false);\n    }\n  };\n  return function(textarea) {\n    if (!(textarea.autoIndent != null)) {\n      textarea = autoIndentable(textarea);\n    }\n    textarea.autoIndent.pre = function(e, line) {\n      return pre.call(textarea, e, line);\n    };\n    textarea.autoIndent.post = function(e, line, indent, insert, cancel) {\n      return post.call(textarea, e, line, indent, insert, cancel);\n    };\n    return textarea;\n  };\n})();\n\nMarkdownEditor = (function(_super) {\n\n  __extends(MarkdownEditor, _super);\n\n  function MarkdownEditor(core) {\n    MarkdownEditor.__super__.constructor.call(this, core);\n    this.textarea = autoIndentableMarkdown(this.textarea);\n  }\n\n  MarkdownEditor.prototype.selectWholeLineIfNoSelectionFound = function() {\n    var caret, line, lineCaret;\n    caret = this.textarea.selection.caret();\n    if (caret[0] === caret[1]) {\n      lineCaret = this.textarea.selection.lineCaret();\n      line = this.textarea.selection.line();\n      if (/^(\\s*[\\*\\+\\-]\\s*|^\\s*\\d+\\.\\s*|^\\s*>\\s*)/g.test(line)) {\n        lineCaret[0] += RegExp.$1.length;\n      }\n      this.textarea.selection.caret(lineCaret);\n    }\n  };\n\n  MarkdownEditor.prototype.h1 = function() {\n    return headerMarkup.call(this, 1);\n  };\n\n  MarkdownEditor.prototype.h2 = function() {\n    return headerMarkup.call(this, 2);\n  };\n\n  MarkdownEditor.prototype.h3 = function() {\n    return headerMarkup.call(this, 3);\n  };\n\n  MarkdownEditor.prototype.h4 = function() {\n    return headerMarkup.call(this, 4);\n  };\n\n  MarkdownEditor.prototype.h5 = function() {\n    return headerMarkup.call(this, 5);\n  };\n\n  MarkdownEditor.prototype.h6 = function() {\n    return headerMarkup.call(this, 6);\n  };\n\n  MarkdownEditor.prototype.bold = function() {\n    return this.enclose(\"**\", \"**\");\n  };\n\n  MarkdownEditor.prototype.italic = function() {\n    return this.enclose(\"*\", \"*\");\n  };\n\n  MarkdownEditor.prototype.blockquote = (function() {\n    var match, pattern1, pattern2;\n    pattern1 = /^(\\s*)>\\s*([^\\n]*)$/m;\n    pattern2 = /^(\\s*)([^\\n]*)$/m;\n    match = function(lines) {\n      var line, _i, _len;\n      for (_i = 0, _len = lines.length; _i < _len; _i++) {\n        line = lines[_i];\n        if (line.length === 0) {\n          continue;\n        }\n        if (!pattern1.test(line)) {\n          return false;\n        }\n      }\n      return true;\n    };\n    return function() {\n      var i, line, lines, _i, _j, _ref, _ref1;\n      lines = this.selection().split(\"\\n\");\n      if (match(lines)) {\n        for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {\n          line = lines[i];\n          lines[i] = line.replace(pattern1, \"$1$2\");\n        }\n      } else {\n        for (i = _j = 0, _ref1 = lines.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {\n          line = lines[i];\n          lines[i] = line.replace(pattern2, \"$1> $2\");\n        }\n      }\n      return this.selection(lines.join(\"\\n\"));\n    };\n  })();\n\n  MarkdownEditor.prototype.code = function() {\n    var caret, lines, text, x;\n    lines = this.selection().split(\"\\n\");\n    caret = this.textarea.selection.caret();\n    if (lines.length > 1) {\n      text = (function() {\n        var _i, _len, _results;\n        _results = [];\n        for (_i = 0, _len = lines.length; _i < _len; _i++) {\n          x = lines[_i];\n          _results.push(\"\\t\" + x);\n        }\n        return _results;\n      })();\n      return this.selection(text.join(\"\\n\"));\n    } else {\n      return this.enclose(\"`\", \"`\");\n    }\n  };\n\n  MarkdownEditor.prototype.anchorLink = function() {\n    var href, text;\n    text = this.selection();\n    if (!text) {\n      text = window.prompt(\"Please input a link text\", \"Here\");\n    }\n    href = window.prompt(\"Please input a link url\", \"http://\");\n    if (!(href != null)) {\n      return;\n    }\n    return this.selection(\"[\" + text + \"](\" + href + \")\");\n  };\n\n  MarkdownEditor.prototype.image = function() {\n    var alt, src;\n    src = window.prompt(\"Please input a image url\", \"http://\");\n    alt = window.prompt(\"(Optional) Please input a alt message\", \"Image\");\n    if (!(src != null)) {\n      return;\n    }\n    return this.selection(\"![\" + alt + \"](\" + src + \")\");\n  };\n\n  MarkdownEditor.prototype.unorderedList = (function() {\n    var match, pattern1, pattern2;\n    pattern1 = /^(\\s*)\\*\\s*([^\\n]*)$/m;\n    pattern2 = /^(\\s*)([^\\n]*)$/m;\n    match = function(lines) {\n      var line, _i, _len;\n      for (_i = 0, _len = lines.length; _i < _len; _i++) {\n        line = lines[_i];\n        if (line.length === 0) {\n          continue;\n        }\n        if (!pattern1.test(line)) {\n          return false;\n        }\n      }\n      return true;\n    };\n    return function() {\n      var i, line, lines, _i, _j, _ref, _ref1;\n      lines = this.selection().split(\"\\n\");\n      if (match(lines)) {\n        for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {\n          line = lines[i];\n          lines[i] = line.replace(pattern1, \"$1$2\");\n        }\n      } else {\n        for (i = _j = 0, _ref1 = lines.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {\n          line = lines[i];\n          lines[i] = line.replace(pattern2, \"$1* $2\");\n        }\n      }\n      return this.selection(lines.join(\"\\n\"));\n    };\n  })();\n\n  MarkdownEditor.prototype.orderedList = (function() {\n    var match, pattern1, pattern2;\n    pattern1 = /^(\\s*)\\d+\\.\\s*([^\\n]*)$/m;\n    pattern2 = /^(\\s*)([^\\n]*)$/m;\n    match = function(lines) {\n      var line, _i, _len;\n      for (_i = 0, _len = lines.length; _i < _len; _i++) {\n        line = lines[_i];\n        if (line.length === 0) {\n          continue;\n        }\n        if (!pattern1.test(line)) {\n          return false;\n        }\n      }\n      return true;\n    };\n    return function() {\n      var i, line, lines, _i, _j, _ref, _ref1;\n      lines = this.selection().split(\"\\n\");\n      if (match(lines)) {\n        for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {\n          line = lines[i];\n          lines[i] = line.replace(pattern1, \"$1$2\");\n        }\n      } else {\n        for (i = _j = 0, _ref1 = lines.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {\n          line = lines[i];\n          lines[i] = line.replace(pattern2, \"$1\" + (i + 1) + \". $2\");\n        }\n      }\n      return this.selection(lines.join(\"\\n\"));\n    };\n  })();\n\n  return MarkdownEditor;\n\n})(TextEditor);\n\nnamespace('Jencil.types.markdown.editor.MarkdownEditor', function(exports) {\n  return exports.MarkdownEditor = MarkdownEditor;\n});\n");
__$coverInitRange("src/js/types/markdown/editor.js", "0:380");
__$coverInitRange("src/js/types/markdown/editor.js", "383:2000");
__$coverInitRange("src/js/types/markdown/editor.js", "2003:4927");
__$coverInitRange("src/js/types/markdown/editor.js", "4930:10968");
__$coverInitRange("src/js/types/markdown/editor.js", "10971:11100");
__$coverInitRange("src/js/types/markdown/editor.js", "131:216");
__$coverInitRange("src/js/types/markdown/editor.js", "218:262");
__$coverInitRange("src/js/types/markdown/editor.js", "264:297");
__$coverInitRange("src/js/types/markdown/editor.js", "299:327");
__$coverInitRange("src/js/types/markdown/editor.js", "329:363");
__$coverInitRange("src/js/types/markdown/editor.js", "365:377");
__$coverInitRange("src/js/types/markdown/editor.js", "157:214");
__$coverInitRange("src/js/types/markdown/editor.js", "236:260");
__$coverInitRange("src/js/types/markdown/editor.js", "414:502");
__$coverInitRange("src/js/types/markdown/editor.js", "506:556");
__$coverInitRange("src/js/types/markdown/editor.js", "560:688");
__$coverInitRange("src/js/types/markdown/editor.js", "692:787");
__$coverInitRange("src/js/types/markdown/editor.js", "791:948");
__$coverInitRange("src/js/types/markdown/editor.js", "952:1874");
__$coverInitRange("src/js/types/markdown/editor.js", "1878:1994");
__$coverInitRange("src/js/types/markdown/editor.js", "605:615");
__$coverInitRange("src/js/types/markdown/editor.js", "621:643");
__$coverInitRange("src/js/types/markdown/editor.js", "649:683");
__$coverInitRange("src/js/types/markdown/editor.js", "734:782");
__$coverInitRange("src/js/types/markdown/editor.js", "836:846");
__$coverInitRange("src/js/types/markdown/editor.js", "852:874");
__$coverInitRange("src/js/types/markdown/editor.js", "880:943");
__$coverInitRange("src/js/types/markdown/editor.js", "998:1056");
__$coverInitRange("src/js/types/markdown/editor.js", "1062:1083");
__$coverInitRange("src/js/types/markdown/editor.js", "1089:1123");
__$coverInitRange("src/js/types/markdown/editor.js", "1129:1164");
__$coverInitRange("src/js/types/markdown/editor.js", "1170:1185");
__$coverInitRange("src/js/types/markdown/editor.js", "1191:1734");
__$coverInitRange("src/js/types/markdown/editor.js", "1740:1776");
__$coverInitRange("src/js/types/markdown/editor.js", "1782:1869");
__$coverInitRange("src/js/types/markdown/editor.js", "1235:1260");
__$coverInitRange("src/js/types/markdown/editor.js", "1268:1415");
__$coverInitRange("src/js/types/markdown/editor.js", "1303:1341");
__$coverInitRange("src/js/types/markdown/editor.js", "1366:1407");
__$coverInitRange("src/js/types/markdown/editor.js", "1436:1477");
__$coverInitRange("src/js/types/markdown/editor.js", "1485:1584");
__$coverInitRange("src/js/types/markdown/editor.js", "1592:1728");
__$coverInitRange("src/js/types/markdown/editor.js", "1544:1576");
__$coverInitRange("src/js/types/markdown/editor.js", "1657:1694");
__$coverInitRange("src/js/types/markdown/editor.js", "1704:1720");
__$coverInitRange("src/js/types/markdown/editor.js", "1813:1863");
__$coverInitRange("src/js/types/markdown/editor.js", "1903:1943");
__$coverInitRange("src/js/types/markdown/editor.js", "1949:1989");
__$coverInitRange("src/js/types/markdown/editor.js", "2044:2126");
__$coverInitRange("src/js/types/markdown/editor.js", "2130:2186");
__$coverInitRange("src/js/types/markdown/editor.js", "2190:2231");
__$coverInitRange("src/js/types/markdown/editor.js", "2235:2282");
__$coverInitRange("src/js/types/markdown/editor.js", "2286:2708");
__$coverInitRange("src/js/types/markdown/editor.js", "2712:3285");
__$coverInitRange("src/js/types/markdown/editor.js", "3289:4526");
__$coverInitRange("src/js/types/markdown/editor.js", "4530:4921");
__$coverInitRange("src/js/types/markdown/editor.js", "2322:2353");
__$coverInitRange("src/js/types/markdown/editor.js", "2359:2602");
__$coverInitRange("src/js/types/markdown/editor.js", "2608:2703");
__$coverInitRange("src/js/types/markdown/editor.js", "2395:2414");
__$coverInitRange("src/js/types/markdown/editor.js", "2422:2438");
__$coverInitRange("src/js/types/markdown/editor.js", "2446:2464");
__$coverInitRange("src/js/types/markdown/editor.js", "2472:2505");
__$coverInitRange("src/js/types/markdown/editor.js", "2546:2567");
__$coverInitRange("src/js/types/markdown/editor.js", "2588:2596");
__$coverInitRange("src/js/types/markdown/editor.js", "2742:2778");
__$coverInitRange("src/js/types/markdown/editor.js", "2784:2820");
__$coverInitRange("src/js/types/markdown/editor.js", "2826:2866");
__$coverInitRange("src/js/types/markdown/editor.js", "2872:2945");
__$coverInitRange("src/js/types/markdown/editor.js", "2951:3280");
__$coverInitRange("src/js/types/markdown/editor.js", "2808:2814");
__$coverInitRange("src/js/types/markdown/editor.js", "2928:2939");
__$coverInitRange("src/js/types/markdown/editor.js", "3009:3179");
__$coverInitRange("src/js/types/markdown/editor.js", "3187:3225");
__$coverInitRange("src/js/types/markdown/editor.js", "3233:3274");
__$coverInitRange("src/js/types/markdown/editor.js", "3067:3119");
__$coverInitRange("src/js/types/markdown/editor.js", "3129:3150");
__$coverInitRange("src/js/types/markdown/editor.js", "3160:3171");
__$coverInitRange("src/js/types/markdown/editor.js", "3344:3397");
__$coverInitRange("src/js/types/markdown/editor.js", "3403:3416");
__$coverInitRange("src/js/types/markdown/editor.js", "3422:3462");
__$coverInitRange("src/js/types/markdown/editor.js", "3468:3848");
__$coverInitRange("src/js/types/markdown/editor.js", "3854:3886");
__$coverInitRange("src/js/types/markdown/editor.js", "3892:4433");
__$coverInitRange("src/js/types/markdown/editor.js", "4439:4521");
__$coverInitRange("src/js/types/markdown/editor.js", "3551:3592");
__$coverInitRange("src/js/types/markdown/editor.js", "3600:3644");
__$coverInitRange("src/js/types/markdown/editor.js", "3652:3703");
__$coverInitRange("src/js/types/markdown/editor.js", "3711:3733");
__$coverInitRange("src/js/types/markdown/editor.js", "3741:3820");
__$coverInitRange("src/js/types/markdown/editor.js", "3828:3842");
__$coverInitRange("src/js/types/markdown/editor.js", "3771:3812");
__$coverInitRange("src/js/types/markdown/editor.js", "3874:3880");
__$coverInitRange("src/js/types/markdown/editor.js", "3916:4139");
__$coverInitRange("src/js/types/markdown/editor.js", "3976:4017");
__$coverInitRange("src/js/types/markdown/editor.js", "4027:4062");
__$coverInitRange("src/js/types/markdown/editor.js", "4072:4097");
__$coverInitRange("src/js/types/markdown/editor.js", "4107:4131");
__$coverInitRange("src/js/types/markdown/editor.js", "4210:4256");
__$coverInitRange("src/js/types/markdown/editor.js", "4264:4311");
__$coverInitRange("src/js/types/markdown/editor.js", "4382:4427");
__$coverInitRange("src/js/types/markdown/editor.js", "4467:4515");
__$coverInitRange("src/js/types/markdown/editor.js", "4562:4647");
__$coverInitRange("src/js/types/markdown/editor.js", "4653:4746");
__$coverInitRange("src/js/types/markdown/editor.js", "4752:4895");
__$coverInitRange("src/js/types/markdown/editor.js", "4901:4916");
__$coverInitRange("src/js/types/markdown/editor.js", "4606:4641");
__$coverInitRange("src/js/types/markdown/editor.js", "4705:4739");
__$coverInitRange("src/js/types/markdown/editor.js", "4829:4888");
__$coverInitRange("src/js/types/markdown/editor.js", "4970:5003");
__$coverInitRange("src/js/types/markdown/editor.js", "5008:5160");
__$coverInitRange("src/js/types/markdown/editor.js", "5165:5623");
__$coverInitRange("src/js/types/markdown/editor.js", "5628:5713");
__$coverInitRange("src/js/types/markdown/editor.js", "5718:5803");
__$coverInitRange("src/js/types/markdown/editor.js", "5808:5893");
__$coverInitRange("src/js/types/markdown/editor.js", "5898:5983");
__$coverInitRange("src/js/types/markdown/editor.js", "5988:6073");
__$coverInitRange("src/js/types/markdown/editor.js", "6078:6163");
__$coverInitRange("src/js/types/markdown/editor.js", "6168:6253");
__$coverInitRange("src/js/types/markdown/editor.js", "6258:6343");
__$coverInitRange("src/js/types/markdown/editor.js", "6348:7452");
__$coverInitRange("src/js/types/markdown/editor.js", "7457:8003");
__$coverInitRange("src/js/types/markdown/editor.js", "8008:8368");
__$coverInitRange("src/js/types/markdown/editor.js", "8373:8683");
__$coverInitRange("src/js/types/markdown/editor.js", "8688:9796");
__$coverInitRange("src/js/types/markdown/editor.js", "9801:10925");
__$coverInitRange("src/js/types/markdown/editor.js", "10930:10951");
__$coverInitRange("src/js/types/markdown/editor.js", "5044:5097");
__$coverInitRange("src/js/types/markdown/editor.js", "5103:5156");
__$coverInitRange("src/js/types/markdown/editor.js", "5243:5269");
__$coverInitRange("src/js/types/markdown/editor.js", "5275:5314");
__$coverInitRange("src/js/types/markdown/editor.js", "5320:5618");
__$coverInitRange("src/js/types/markdown/editor.js", "5355:5402");
__$coverInitRange("src/js/types/markdown/editor.js", "5410:5447");
__$coverInitRange("src/js/types/markdown/editor.js", "5455:5564");
__$coverInitRange("src/js/types/markdown/editor.js", "5572:5612");
__$coverInitRange("src/js/types/markdown/editor.js", "5524:5556");
__$coverInitRange("src/js/types/markdown/editor.js", "5675:5708");
__$coverInitRange("src/js/types/markdown/editor.js", "5765:5798");
__$coverInitRange("src/js/types/markdown/editor.js", "5855:5888");
__$coverInitRange("src/js/types/markdown/editor.js", "5945:5978");
__$coverInitRange("src/js/types/markdown/editor.js", "6035:6068");
__$coverInitRange("src/js/types/markdown/editor.js", "6125:6158");
__$coverInitRange("src/js/types/markdown/editor.js", "6217:6248");
__$coverInitRange("src/js/types/markdown/editor.js", "6309:6338");
__$coverInitRange("src/js/types/markdown/editor.js", "6404:6433");
__$coverInitRange("src/js/types/markdown/editor.js", "6439:6472");
__$coverInitRange("src/js/types/markdown/editor.js", "6478:6507");
__$coverInitRange("src/js/types/markdown/editor.js", "6513:6815");
__$coverInitRange("src/js/types/markdown/editor.js", "6821:7444");
__$coverInitRange("src/js/types/markdown/editor.js", "6545:6563");
__$coverInitRange("src/js/types/markdown/editor.js", "6571:6789");
__$coverInitRange("src/js/types/markdown/editor.js", "6797:6808");
__$coverInitRange("src/js/types/markdown/editor.js", "6632:6648");
__$coverInitRange("src/js/types/markdown/editor.js", "6658:6711");
__$coverInitRange("src/js/types/markdown/editor.js", "6721:6781");
__$coverInitRange("src/js/types/markdown/editor.js", "6693:6701");
__$coverInitRange("src/js/types/markdown/editor.js", "6759:6771");
__$coverInitRange("src/js/types/markdown/editor.js", "6847:6886");
__$coverInitRange("src/js/types/markdown/editor.js", "6894:6930");
__$coverInitRange("src/js/types/markdown/editor.js", "6938:7390");
__$coverInitRange("src/js/types/markdown/editor.js", "7398:7437");
__$coverInitRange("src/js/types/markdown/editor.js", "6966:7158");
__$coverInitRange("src/js/types/markdown/editor.js", "7080:7095");
__$coverInitRange("src/js/types/markdown/editor.js", "7107:7148");
__$coverInitRange("src/js/types/markdown/editor.js", "7183:7382");
__$coverInitRange("src/js/types/markdown/editor.js", "7302:7317");
__$coverInitRange("src/js/types/markdown/editor.js", "7329:7372");
__$coverInitRange("src/js/types/markdown/editor.js", "7506:7531");
__$coverInitRange("src/js/types/markdown/editor.js", "7537:7573");
__$coverInitRange("src/js/types/markdown/editor.js", "7579:7618");
__$coverInitRange("src/js/types/markdown/editor.js", "7624:7998");
__$coverInitRange("src/js/types/markdown/editor.js", "7654:7896");
__$coverInitRange("src/js/types/markdown/editor.js", "7904:7942");
__$coverInitRange("src/js/types/markdown/editor.js", "7683:7705");
__$coverInitRange("src/js/types/markdown/editor.js", "7715:7728");
__$coverInitRange("src/js/types/markdown/editor.js", "7738:7859");
__$coverInitRange("src/js/types/markdown/editor.js", "7869:7884");
__$coverInitRange("src/js/types/markdown/editor.js", "7801:7814");
__$coverInitRange("src/js/types/markdown/editor.js", "7826:7849");
__$coverInitRange("src/js/types/markdown/editor.js", "7963:7992");
__$coverInitRange("src/js/types/markdown/editor.js", "8063:8077");
__$coverInitRange("src/js/types/markdown/editor.js", "8083:8106");
__$coverInitRange("src/js/types/markdown/editor.js", "8112:8193");
__$coverInitRange("src/js/types/markdown/editor.js", "8199:8257");
__$coverInitRange("src/js/types/markdown/editor.js", "8263:8304");
__$coverInitRange("src/js/types/markdown/editor.js", "8310:8363");
__$coverInitRange("src/js/types/markdown/editor.js", "8131:8187");
__$coverInitRange("src/js/types/markdown/editor.js", "8292:8298");
__$coverInitRange("src/js/types/markdown/editor.js", "8423:8435");
__$coverInitRange("src/js/types/markdown/editor.js", "8441:8499");
__$coverInitRange("src/js/types/markdown/editor.js", "8505:8574");
__$coverInitRange("src/js/types/markdown/editor.js", "8580:8620");
__$coverInitRange("src/js/types/markdown/editor.js", "8626:8678");
__$coverInitRange("src/js/types/markdown/editor.js", "8608:8614");
__$coverInitRange("src/js/types/markdown/editor.js", "8747:8776");
__$coverInitRange("src/js/types/markdown/editor.js", "8782:8816");
__$coverInitRange("src/js/types/markdown/editor.js", "8822:8851");
__$coverInitRange("src/js/types/markdown/editor.js", "8857:9159");
__$coverInitRange("src/js/types/markdown/editor.js", "9165:9788");
__$coverInitRange("src/js/types/markdown/editor.js", "8889:8907");
__$coverInitRange("src/js/types/markdown/editor.js", "8915:9133");
__$coverInitRange("src/js/types/markdown/editor.js", "9141:9152");
__$coverInitRange("src/js/types/markdown/editor.js", "8976:8992");
__$coverInitRange("src/js/types/markdown/editor.js", "9002:9055");
__$coverInitRange("src/js/types/markdown/editor.js", "9065:9125");
__$coverInitRange("src/js/types/markdown/editor.js", "9037:9045");
__$coverInitRange("src/js/types/markdown/editor.js", "9103:9115");
__$coverInitRange("src/js/types/markdown/editor.js", "9191:9230");
__$coverInitRange("src/js/types/markdown/editor.js", "9238:9274");
__$coverInitRange("src/js/types/markdown/editor.js", "9282:9734");
__$coverInitRange("src/js/types/markdown/editor.js", "9742:9781");
__$coverInitRange("src/js/types/markdown/editor.js", "9310:9502");
__$coverInitRange("src/js/types/markdown/editor.js", "9424:9439");
__$coverInitRange("src/js/types/markdown/editor.js", "9451:9492");
__$coverInitRange("src/js/types/markdown/editor.js", "9527:9726");
__$coverInitRange("src/js/types/markdown/editor.js", "9646:9661");
__$coverInitRange("src/js/types/markdown/editor.js", "9673:9716");
__$coverInitRange("src/js/types/markdown/editor.js", "9858:9887");
__$coverInitRange("src/js/types/markdown/editor.js", "9893:9930");
__$coverInitRange("src/js/types/markdown/editor.js", "9936:9965");
__$coverInitRange("src/js/types/markdown/editor.js", "9971:10273");
__$coverInitRange("src/js/types/markdown/editor.js", "10279:10917");
__$coverInitRange("src/js/types/markdown/editor.js", "10003:10021");
__$coverInitRange("src/js/types/markdown/editor.js", "10029:10247");
__$coverInitRange("src/js/types/markdown/editor.js", "10255:10266");
__$coverInitRange("src/js/types/markdown/editor.js", "10090:10106");
__$coverInitRange("src/js/types/markdown/editor.js", "10116:10169");
__$coverInitRange("src/js/types/markdown/editor.js", "10179:10239");
__$coverInitRange("src/js/types/markdown/editor.js", "10151:10159");
__$coverInitRange("src/js/types/markdown/editor.js", "10217:10229");
__$coverInitRange("src/js/types/markdown/editor.js", "10305:10344");
__$coverInitRange("src/js/types/markdown/editor.js", "10352:10388");
__$coverInitRange("src/js/types/markdown/editor.js", "10396:10863");
__$coverInitRange("src/js/types/markdown/editor.js", "10871:10910");
__$coverInitRange("src/js/types/markdown/editor.js", "10424:10616");
__$coverInitRange("src/js/types/markdown/editor.js", "10538:10553");
__$coverInitRange("src/js/types/markdown/editor.js", "10565:10606");
__$coverInitRange("src/js/types/markdown/editor.js", "10641:10855");
__$coverInitRange("src/js/types/markdown/editor.js", "10760:10775");
__$coverInitRange("src/js/types/markdown/editor.js", "10787:10845");
__$coverInitRange("src/js/types/markdown/editor.js", "11050:11096");
__$coverCall('src/js/types/markdown/editor.js', '0:380');
var MarkdownEditor, autoIndentableMarkdown, headerMarkup, __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
        __$coverCall('src/js/types/markdown/editor.js', '131:216');
        for (var key in parent) {
            __$coverCall('src/js/types/markdown/editor.js', '157:214');
            if (__hasProp.call(parent, key))
                child[key] = parent[key];
        }
        __$coverCall('src/js/types/markdown/editor.js', '218:262');
        function ctor() {
            __$coverCall('src/js/types/markdown/editor.js', '236:260');
            this.constructor = child;
        }
        __$coverCall('src/js/types/markdown/editor.js', '264:297');
        ctor.prototype = parent.prototype;
        __$coverCall('src/js/types/markdown/editor.js', '299:327');
        child.prototype = new ctor();
        __$coverCall('src/js/types/markdown/editor.js', '329:363');
        child.__super__ = parent.prototype;
        __$coverCall('src/js/types/markdown/editor.js', '365:377');
        return child;
    };
__$coverCall('src/js/types/markdown/editor.js', '383:2000');
headerMarkup = function () {
    __$coverCall('src/js/types/markdown/editor.js', '414:502');
    var appendAtxHeader, atxHeaderPattern, changeAtxHeader, removeAtxHeader, toggleAtxHeader;
    __$coverCall('src/js/types/markdown/editor.js', '506:556');
    atxHeaderPattern = new RegExp('^s*(#{1,6}s*).*');
    __$coverCall('src/js/types/markdown/editor.js', '560:688');
    appendAtxHeader = function (segment, n) {
        __$coverCall('src/js/types/markdown/editor.js', '605:615');
        var header;
        __$coverCall('src/js/types/markdown/editor.js', '621:643');
        header = '#'.repeat(n);
        __$coverCall('src/js/types/markdown/editor.js', '649:683');
        return '' + header + ' ' + segment;
    };
    __$coverCall('src/js/types/markdown/editor.js', '692:787');
    removeAtxHeader = function (segment) {
        __$coverCall('src/js/types/markdown/editor.js', '734:782');
        return segment.replace(/^(\s*)#{1,6}\s*/g, '$1');
    };
    __$coverCall('src/js/types/markdown/editor.js', '791:948');
    changeAtxHeader = function (segment, n) {
        __$coverCall('src/js/types/markdown/editor.js', '836:846');
        var header;
        __$coverCall('src/js/types/markdown/editor.js', '852:874');
        header = '#'.repeat(n);
        __$coverCall('src/js/types/markdown/editor.js', '880:943');
        return segment.replace(/^(\s*)#{1,6}\s*/g, '$1' + header + ' ');
    };
    __$coverCall('src/js/types/markdown/editor.js', '952:1874');
    toggleAtxHeader = function (textarea, n) {
        __$coverCall('src/js/types/markdown/editor.js', '998:1056');
        var caret, caretOffset, exists, replacement, segment, text;
        __$coverCall('src/js/types/markdown/editor.js', '1062:1083');
        text = textarea.val();
        __$coverCall('src/js/types/markdown/editor.js', '1089:1123');
        caret = textarea.selection.caret();
        __$coverCall('src/js/types/markdown/editor.js', '1129:1164');
        segment = textarea.selection.text();
        __$coverCall('src/js/types/markdown/editor.js', '1170:1185');
        caretOffset = 0;
        __$coverCall('src/js/types/markdown/editor.js', '1191:1734');
        if (atxHeaderPattern.test(segment)) {
            __$coverCall('src/js/types/markdown/editor.js', '1235:1260');
            exists = RegExp.$1.trim();
            __$coverCall('src/js/types/markdown/editor.js', '1268:1415');
            if (exists.length === n) {
                __$coverCall('src/js/types/markdown/editor.js', '1303:1341');
                replacement = removeAtxHeader(segment);
            } else {
                __$coverCall('src/js/types/markdown/editor.js', '1366:1407');
                replacement = changeAtxHeader(segment, n);
            }
        } else {
            __$coverCall('src/js/types/markdown/editor.js', '1436:1477');
            replacement = appendAtxHeader(segment, n);
            __$coverCall('src/js/types/markdown/editor.js', '1485:1584');
            if (caret[0] > 0 && text[caret[0] - 1] !== '\n') {
                __$coverCall('src/js/types/markdown/editor.js', '1544:1576');
                replacement = '\n' + replacement;
            }
            __$coverCall('src/js/types/markdown/editor.js', '1592:1728');
            if (caret[1] < text.length && text[caret[1]] !== '\n') {
                __$coverCall('src/js/types/markdown/editor.js', '1657:1694');
                replacement = '' + replacement + '\n';
                __$coverCall('src/js/types/markdown/editor.js', '1704:1720');
                caretOffset = -1;
            }
        }
        __$coverCall('src/js/types/markdown/editor.js', '1740:1776');
        textarea.selection.text(replacement);
        __$coverCall('src/js/types/markdown/editor.js', '1782:1869');
        if (caretOffset !== 0) {
            __$coverCall('src/js/types/markdown/editor.js', '1813:1863');
            return textarea.selection.caretOffset(caretOffset);
        }
    };
    __$coverCall('src/js/types/markdown/editor.js', '1878:1994');
    return function (n) {
        __$coverCall('src/js/types/markdown/editor.js', '1903:1943');
        this.selectWholeLineIfNoSelectionFound();
        __$coverCall('src/js/types/markdown/editor.js', '1949:1989');
        return toggleAtxHeader(this.textarea, n);
    };
}();
__$coverCall('src/js/types/markdown/editor.js', '2003:4927');
autoIndentableMarkdown = function () {
    __$coverCall('src/js/types/markdown/editor.js', '2044:2126');
    var findListInfo, listPattern, orderedListPattern, post, pre, unorderedListPattern;
    __$coverCall('src/js/types/markdown/editor.js', '2130:2186');
    listPattern = /^(\s*)((?:(?:\d+\.)|(?:[\*\+\->])))(\s+)/;
    __$coverCall('src/js/types/markdown/editor.js', '2190:2231');
    orderedListPattern = /^(\s*)(\d+)(\.\s+)/;
    __$coverCall('src/js/types/markdown/editor.js', '2235:2282');
    unorderedListPattern = /^(\s*)([\*\+\->])(\s+)/;
    __$coverCall('src/js/types/markdown/editor.js', '2286:2708');
    findListInfo = function (line) {
        __$coverCall('src/js/types/markdown/editor.js', '2322:2353');
        var leading, mark, spaces, type;
        __$coverCall('src/js/types/markdown/editor.js', '2359:2602');
        if (listPattern.test(line)) {
            __$coverCall('src/js/types/markdown/editor.js', '2395:2414');
            leading = RegExp.$1;
            __$coverCall('src/js/types/markdown/editor.js', '2422:2438');
            mark = RegExp.$2;
            __$coverCall('src/js/types/markdown/editor.js', '2446:2464');
            spaces = RegExp.$3;
            __$coverCall('src/js/types/markdown/editor.js', '2472:2505');
            type = mark.endsWith('.') ? 1 : 2;
        } else if (this._listInfo) {
            __$coverCall('src/js/types/markdown/editor.js', '2546:2567');
            return this._listInfo;
        } else {
            __$coverCall('src/js/types/markdown/editor.js', '2588:2596');
            type = 0;
        }
        __$coverCall('src/js/types/markdown/editor.js', '2608:2703');
        return {
            type: type,
            leading: leading,
            mark: mark,
            spaces: spaces
        };
    };
    __$coverCall('src/js/types/markdown/editor.js', '2712:3285');
    pre = function (e, line) {
        __$coverCall('src/js/types/markdown/editor.js', '2742:2778');
        var lineCaret, listInfo, _ref, _ref1;
        __$coverCall('src/js/types/markdown/editor.js', '2784:2820');
        if (e.shiftKey) {
            __$coverCall('src/js/types/markdown/editor.js', '2808:2814');
            return;
        }
        __$coverCall('src/js/types/markdown/editor.js', '2826:2866');
        listInfo = findListInfo.call(this, line);
        __$coverCall('src/js/types/markdown/editor.js', '2872:2945');
        if ((_ref = listInfo.type) === 3 || _ref === 4) {
            __$coverCall('src/js/types/markdown/editor.js', '2928:2939');
            return true;
        }
        __$coverCall('src/js/types/markdown/editor.js', '2951:3280');
        if ((_ref1 = listInfo.type) === 1 || _ref1 === 2) {
            __$coverCall('src/js/types/markdown/editor.js', '3009:3179');
            if (line.replace(listPattern, '').length === 0) {
                __$coverCall('src/js/types/markdown/editor.js', '3067:3119');
                this.selection.line(line.replace(listPattern, '$1'));
                __$coverCall('src/js/types/markdown/editor.js', '3129:3150');
                this._listInfo = null;
                __$coverCall('src/js/types/markdown/editor.js', '3160:3171');
                return true;
            }
            __$coverCall('src/js/types/markdown/editor.js', '3187:3225');
            lineCaret = this.selection.lineCaret();
            __$coverCall('src/js/types/markdown/editor.js', '3233:3274');
            return this.selection.caret(lineCaret[1]);
        }
    };
    __$coverCall('src/js/types/markdown/editor.js', '3289:4526');
    post = function (e, line, indent, insert, cancel) {
        __$coverCall('src/js/types/markdown/editor.js', '3344:3397');
        var leading, listInfo, num, _ref, _ref1, _ref2, _ref3;
        __$coverCall('src/js/types/markdown/editor.js', '3403:3416');
        insert = null;
        __$coverCall('src/js/types/markdown/editor.js', '3422:3462');
        listInfo = findListInfo.call(this, line);
        __$coverCall('src/js/types/markdown/editor.js', '3468:3848');
        if (cancel && !e.shiftKey && ((_ref = listInfo.type) === 3 || _ref === 4)) {
            __$coverCall('src/js/types/markdown/editor.js', '3551:3592');
            leading = listInfo.mark + listInfo.spaces;
            __$coverCall('src/js/types/markdown/editor.js', '3600:3644');
            indent = line.replace(/^([\t\s]*).*$/, '$1');
            __$coverCall('src/js/types/markdown/editor.js', '3652:3703');
            indent = ' '.repeat(indent.length - leading.length);
            __$coverCall('src/js/types/markdown/editor.js', '3711:3733');
            insert = '\n' + indent;
            __$coverCall('src/js/types/markdown/editor.js', '3741:3820');
            if (insert != null) {
                __$coverCall('src/js/types/markdown/editor.js', '3771:3812');
                this.selection.insertAfter(insert, false);
            }
            __$coverCall('src/js/types/markdown/editor.js', '3828:3842');
            cancel = false;
        }
        __$coverCall('src/js/types/markdown/editor.js', '3854:3886');
        if (cancel) {
            __$coverCall('src/js/types/markdown/editor.js', '3874:3880');
            return;
        }
        __$coverCall('src/js/types/markdown/editor.js', '3892:4433');
        if (e.shiftKey) {
            __$coverCall('src/js/types/markdown/editor.js', '3916:4139');
            if ((_ref1 = listInfo.type) === 1 || _ref1 === 2) {
                __$coverCall('src/js/types/markdown/editor.js', '3976:4017');
                leading = listInfo.mark + listInfo.spaces;
                __$coverCall('src/js/types/markdown/editor.js', '4027:4062');
                insert = ' '.repeat(leading.length);
                __$coverCall('src/js/types/markdown/editor.js', '4072:4097');
                this._listInfo = listInfo;
                __$coverCall('src/js/types/markdown/editor.js', '4107:4131');
                this._listInfo.type += 2;
            }
        } else if ((_ref2 = listInfo.type) === 1 || _ref2 === 3) {
            __$coverCall('src/js/types/markdown/editor.js', '4210:4256');
            num = parseInt(listInfo.mark.replace('.', ''));
            __$coverCall('src/js/types/markdown/editor.js', '4264:4311');
            insert = '' + (num + 1) + '.' + listInfo.spaces;
        } else if ((_ref3 = listInfo.type) === 2 || _ref3 === 4) {
            __$coverCall('src/js/types/markdown/editor.js', '4382:4427');
            insert = '' + listInfo.mark + listInfo.spaces;
        }
        __$coverCall('src/js/types/markdown/editor.js', '4439:4521');
        if (insert != null) {
            __$coverCall('src/js/types/markdown/editor.js', '4467:4515');
            return this.selection.insertAfter(insert, false);
        }
    };
    __$coverCall('src/js/types/markdown/editor.js', '4530:4921');
    return function (textarea) {
        __$coverCall('src/js/types/markdown/editor.js', '4562:4647');
        if (!(textarea.autoIndent != null)) {
            __$coverCall('src/js/types/markdown/editor.js', '4606:4641');
            textarea = autoIndentable(textarea);
        }
        __$coverCall('src/js/types/markdown/editor.js', '4653:4746');
        textarea.autoIndent.pre = function (e, line) {
            __$coverCall('src/js/types/markdown/editor.js', '4705:4739');
            return pre.call(textarea, e, line);
        };
        __$coverCall('src/js/types/markdown/editor.js', '4752:4895');
        textarea.autoIndent.post = function (e, line, indent, insert, cancel) {
            __$coverCall('src/js/types/markdown/editor.js', '4829:4888');
            return post.call(textarea, e, line, indent, insert, cancel);
        };
        __$coverCall('src/js/types/markdown/editor.js', '4901:4916');
        return textarea;
    };
}();
__$coverCall('src/js/types/markdown/editor.js', '4930:10968');
MarkdownEditor = function (_super) {
    __$coverCall('src/js/types/markdown/editor.js', '4970:5003');
    __extends(MarkdownEditor, _super);
    __$coverCall('src/js/types/markdown/editor.js', '5008:5160');
    function MarkdownEditor(core) {
        __$coverCall('src/js/types/markdown/editor.js', '5044:5097');
        MarkdownEditor.__super__.constructor.call(this, core);
        __$coverCall('src/js/types/markdown/editor.js', '5103:5156');
        this.textarea = autoIndentableMarkdown(this.textarea);
    }
    __$coverCall('src/js/types/markdown/editor.js', '5165:5623');
    MarkdownEditor.prototype.selectWholeLineIfNoSelectionFound = function () {
        __$coverCall('src/js/types/markdown/editor.js', '5243:5269');
        var caret, line, lineCaret;
        __$coverCall('src/js/types/markdown/editor.js', '5275:5314');
        caret = this.textarea.selection.caret();
        __$coverCall('src/js/types/markdown/editor.js', '5320:5618');
        if (caret[0] === caret[1]) {
            __$coverCall('src/js/types/markdown/editor.js', '5355:5402');
            lineCaret = this.textarea.selection.lineCaret();
            __$coverCall('src/js/types/markdown/editor.js', '5410:5447');
            line = this.textarea.selection.line();
            __$coverCall('src/js/types/markdown/editor.js', '5455:5564');
            if (/^(\s*[\*\+\-]\s*|^\s*\d+\.\s*|^\s*>\s*)/g.test(line)) {
                __$coverCall('src/js/types/markdown/editor.js', '5524:5556');
                lineCaret[0] += RegExp.$1.length;
            }
            __$coverCall('src/js/types/markdown/editor.js', '5572:5612');
            this.textarea.selection.caret(lineCaret);
        }
    };
    __$coverCall('src/js/types/markdown/editor.js', '5628:5713');
    MarkdownEditor.prototype.h1 = function () {
        __$coverCall('src/js/types/markdown/editor.js', '5675:5708');
        return headerMarkup.call(this, 1);
    };
    __$coverCall('src/js/types/markdown/editor.js', '5718:5803');
    MarkdownEditor.prototype.h2 = function () {
        __$coverCall('src/js/types/markdown/editor.js', '5765:5798');
        return headerMarkup.call(this, 2);
    };
    __$coverCall('src/js/types/markdown/editor.js', '5808:5893');
    MarkdownEditor.prototype.h3 = function () {
        __$coverCall('src/js/types/markdown/editor.js', '5855:5888');
        return headerMarkup.call(this, 3);
    };
    __$coverCall('src/js/types/markdown/editor.js', '5898:5983');
    MarkdownEditor.prototype.h4 = function () {
        __$coverCall('src/js/types/markdown/editor.js', '5945:5978');
        return headerMarkup.call(this, 4);
    };
    __$coverCall('src/js/types/markdown/editor.js', '5988:6073');
    MarkdownEditor.prototype.h5 = function () {
        __$coverCall('src/js/types/markdown/editor.js', '6035:6068');
        return headerMarkup.call(this, 5);
    };
    __$coverCall('src/js/types/markdown/editor.js', '6078:6163');
    MarkdownEditor.prototype.h6 = function () {
        __$coverCall('src/js/types/markdown/editor.js', '6125:6158');
        return headerMarkup.call(this, 6);
    };
    __$coverCall('src/js/types/markdown/editor.js', '6168:6253');
    MarkdownEditor.prototype.bold = function () {
        __$coverCall('src/js/types/markdown/editor.js', '6217:6248');
        return this.enclose('**', '**');
    };
    __$coverCall('src/js/types/markdown/editor.js', '6258:6343');
    MarkdownEditor.prototype.italic = function () {
        __$coverCall('src/js/types/markdown/editor.js', '6309:6338');
        return this.enclose('*', '*');
    };
    __$coverCall('src/js/types/markdown/editor.js', '6348:7452');
    MarkdownEditor.prototype.blockquote = function () {
        __$coverCall('src/js/types/markdown/editor.js', '6404:6433');
        var match, pattern1, pattern2;
        __$coverCall('src/js/types/markdown/editor.js', '6439:6472');
        pattern1 = /^(\s*)>\s*([^\n]*)$/m;
        __$coverCall('src/js/types/markdown/editor.js', '6478:6507');
        pattern2 = /^(\s*)([^\n]*)$/m;
        __$coverCall('src/js/types/markdown/editor.js', '6513:6815');
        match = function (lines) {
            __$coverCall('src/js/types/markdown/editor.js', '6545:6563');
            var line, _i, _len;
            __$coverCall('src/js/types/markdown/editor.js', '6571:6789');
            for (_i = 0, _len = lines.length; _i < _len; _i++) {
                __$coverCall('src/js/types/markdown/editor.js', '6632:6648');
                line = lines[_i];
                __$coverCall('src/js/types/markdown/editor.js', '6658:6711');
                if (line.length === 0) {
                    __$coverCall('src/js/types/markdown/editor.js', '6693:6701');
                    continue;
                }
                __$coverCall('src/js/types/markdown/editor.js', '6721:6781');
                if (!pattern1.test(line)) {
                    __$coverCall('src/js/types/markdown/editor.js', '6759:6771');
                    return false;
                }
            }
            __$coverCall('src/js/types/markdown/editor.js', '6797:6808');
            return true;
        };
        __$coverCall('src/js/types/markdown/editor.js', '6821:7444');
        return function () {
            __$coverCall('src/js/types/markdown/editor.js', '6847:6886');
            var i, line, lines, _i, _j, _ref, _ref1;
            __$coverCall('src/js/types/markdown/editor.js', '6894:6930');
            lines = this.selection().split('\n');
            __$coverCall('src/js/types/markdown/editor.js', '6938:7390');
            if (match(lines)) {
                __$coverCall('src/js/types/markdown/editor.js', '6966:7158');
                for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
                    __$coverCall('src/js/types/markdown/editor.js', '7080:7095');
                    line = lines[i];
                    __$coverCall('src/js/types/markdown/editor.js', '7107:7148');
                    lines[i] = line.replace(pattern1, '$1$2');
                }
            } else {
                __$coverCall('src/js/types/markdown/editor.js', '7183:7382');
                for (i = _j = 0, _ref1 = lines.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
                    __$coverCall('src/js/types/markdown/editor.js', '7302:7317');
                    line = lines[i];
                    __$coverCall('src/js/types/markdown/editor.js', '7329:7372');
                    lines[i] = line.replace(pattern2, '$1> $2');
                }
            }
            __$coverCall('src/js/types/markdown/editor.js', '7398:7437');
            return this.selection(lines.join('\n'));
        };
    }();
    __$coverCall('src/js/types/markdown/editor.js', '7457:8003');
    MarkdownEditor.prototype.code = function () {
        __$coverCall('src/js/types/markdown/editor.js', '7506:7531');
        var caret, lines, text, x;
        __$coverCall('src/js/types/markdown/editor.js', '7537:7573');
        lines = this.selection().split('\n');
        __$coverCall('src/js/types/markdown/editor.js', '7579:7618');
        caret = this.textarea.selection.caret();
        __$coverCall('src/js/types/markdown/editor.js', '7624:7998');
        if (lines.length > 1) {
            __$coverCall('src/js/types/markdown/editor.js', '7654:7896');
            text = function () {
                __$coverCall('src/js/types/markdown/editor.js', '7683:7705');
                var _i, _len, _results;
                __$coverCall('src/js/types/markdown/editor.js', '7715:7728');
                _results = [];
                __$coverCall('src/js/types/markdown/editor.js', '7738:7859');
                for (_i = 0, _len = lines.length; _i < _len; _i++) {
                    __$coverCall('src/js/types/markdown/editor.js', '7801:7814');
                    x = lines[_i];
                    __$coverCall('src/js/types/markdown/editor.js', '7826:7849');
                    _results.push('\t' + x);
                }
                __$coverCall('src/js/types/markdown/editor.js', '7869:7884');
                return _results;
            }();
            __$coverCall('src/js/types/markdown/editor.js', '7904:7942');
            return this.selection(text.join('\n'));
        } else {
            __$coverCall('src/js/types/markdown/editor.js', '7963:7992');
            return this.enclose('`', '`');
        }
    };
    __$coverCall('src/js/types/markdown/editor.js', '8008:8368');
    MarkdownEditor.prototype.anchorLink = function () {
        __$coverCall('src/js/types/markdown/editor.js', '8063:8077');
        var href, text;
        __$coverCall('src/js/types/markdown/editor.js', '8083:8106');
        text = this.selection();
        __$coverCall('src/js/types/markdown/editor.js', '8112:8193');
        if (!text) {
            __$coverCall('src/js/types/markdown/editor.js', '8131:8187');
            text = window.prompt('Please input a link text', 'Here');
        }
        __$coverCall('src/js/types/markdown/editor.js', '8199:8257');
        href = window.prompt('Please input a link url', 'http://');
        __$coverCall('src/js/types/markdown/editor.js', '8263:8304');
        if (!(href != null)) {
            __$coverCall('src/js/types/markdown/editor.js', '8292:8298');
            return;
        }
        __$coverCall('src/js/types/markdown/editor.js', '8310:8363');
        return this.selection('[' + text + '](' + href + ')');
    };
    __$coverCall('src/js/types/markdown/editor.js', '8373:8683');
    MarkdownEditor.prototype.image = function () {
        __$coverCall('src/js/types/markdown/editor.js', '8423:8435');
        var alt, src;
        __$coverCall('src/js/types/markdown/editor.js', '8441:8499');
        src = window.prompt('Please input a image url', 'http://');
        __$coverCall('src/js/types/markdown/editor.js', '8505:8574');
        alt = window.prompt('(Optional) Please input a alt message', 'Image');
        __$coverCall('src/js/types/markdown/editor.js', '8580:8620');
        if (!(src != null)) {
            __$coverCall('src/js/types/markdown/editor.js', '8608:8614');
            return;
        }
        __$coverCall('src/js/types/markdown/editor.js', '8626:8678');
        return this.selection('![' + alt + '](' + src + ')');
    };
    __$coverCall('src/js/types/markdown/editor.js', '8688:9796');
    MarkdownEditor.prototype.unorderedList = function () {
        __$coverCall('src/js/types/markdown/editor.js', '8747:8776');
        var match, pattern1, pattern2;
        __$coverCall('src/js/types/markdown/editor.js', '8782:8816');
        pattern1 = /^(\s*)\*\s*([^\n]*)$/m;
        __$coverCall('src/js/types/markdown/editor.js', '8822:8851');
        pattern2 = /^(\s*)([^\n]*)$/m;
        __$coverCall('src/js/types/markdown/editor.js', '8857:9159');
        match = function (lines) {
            __$coverCall('src/js/types/markdown/editor.js', '8889:8907');
            var line, _i, _len;
            __$coverCall('src/js/types/markdown/editor.js', '8915:9133');
            for (_i = 0, _len = lines.length; _i < _len; _i++) {
                __$coverCall('src/js/types/markdown/editor.js', '8976:8992');
                line = lines[_i];
                __$coverCall('src/js/types/markdown/editor.js', '9002:9055');
                if (line.length === 0) {
                    __$coverCall('src/js/types/markdown/editor.js', '9037:9045');
                    continue;
                }
                __$coverCall('src/js/types/markdown/editor.js', '9065:9125');
                if (!pattern1.test(line)) {
                    __$coverCall('src/js/types/markdown/editor.js', '9103:9115');
                    return false;
                }
            }
            __$coverCall('src/js/types/markdown/editor.js', '9141:9152');
            return true;
        };
        __$coverCall('src/js/types/markdown/editor.js', '9165:9788');
        return function () {
            __$coverCall('src/js/types/markdown/editor.js', '9191:9230');
            var i, line, lines, _i, _j, _ref, _ref1;
            __$coverCall('src/js/types/markdown/editor.js', '9238:9274');
            lines = this.selection().split('\n');
            __$coverCall('src/js/types/markdown/editor.js', '9282:9734');
            if (match(lines)) {
                __$coverCall('src/js/types/markdown/editor.js', '9310:9502');
                for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
                    __$coverCall('src/js/types/markdown/editor.js', '9424:9439');
                    line = lines[i];
                    __$coverCall('src/js/types/markdown/editor.js', '9451:9492');
                    lines[i] = line.replace(pattern1, '$1$2');
                }
            } else {
                __$coverCall('src/js/types/markdown/editor.js', '9527:9726');
                for (i = _j = 0, _ref1 = lines.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
                    __$coverCall('src/js/types/markdown/editor.js', '9646:9661');
                    line = lines[i];
                    __$coverCall('src/js/types/markdown/editor.js', '9673:9716');
                    lines[i] = line.replace(pattern2, '$1* $2');
                }
            }
            __$coverCall('src/js/types/markdown/editor.js', '9742:9781');
            return this.selection(lines.join('\n'));
        };
    }();
    __$coverCall('src/js/types/markdown/editor.js', '9801:10925');
    MarkdownEditor.prototype.orderedList = function () {
        __$coverCall('src/js/types/markdown/editor.js', '9858:9887');
        var match, pattern1, pattern2;
        __$coverCall('src/js/types/markdown/editor.js', '9893:9930');
        pattern1 = /^(\s*)\d+\.\s*([^\n]*)$/m;
        __$coverCall('src/js/types/markdown/editor.js', '9936:9965');
        pattern2 = /^(\s*)([^\n]*)$/m;
        __$coverCall('src/js/types/markdown/editor.js', '9971:10273');
        match = function (lines) {
            __$coverCall('src/js/types/markdown/editor.js', '10003:10021');
            var line, _i, _len;
            __$coverCall('src/js/types/markdown/editor.js', '10029:10247');
            for (_i = 0, _len = lines.length; _i < _len; _i++) {
                __$coverCall('src/js/types/markdown/editor.js', '10090:10106');
                line = lines[_i];
                __$coverCall('src/js/types/markdown/editor.js', '10116:10169');
                if (line.length === 0) {
                    __$coverCall('src/js/types/markdown/editor.js', '10151:10159');
                    continue;
                }
                __$coverCall('src/js/types/markdown/editor.js', '10179:10239');
                if (!pattern1.test(line)) {
                    __$coverCall('src/js/types/markdown/editor.js', '10217:10229');
                    return false;
                }
            }
            __$coverCall('src/js/types/markdown/editor.js', '10255:10266');
            return true;
        };
        __$coverCall('src/js/types/markdown/editor.js', '10279:10917');
        return function () {
            __$coverCall('src/js/types/markdown/editor.js', '10305:10344');
            var i, line, lines, _i, _j, _ref, _ref1;
            __$coverCall('src/js/types/markdown/editor.js', '10352:10388');
            lines = this.selection().split('\n');
            __$coverCall('src/js/types/markdown/editor.js', '10396:10863');
            if (match(lines)) {
                __$coverCall('src/js/types/markdown/editor.js', '10424:10616');
                for (i = _i = 0, _ref = lines.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
                    __$coverCall('src/js/types/markdown/editor.js', '10538:10553');
                    line = lines[i];
                    __$coverCall('src/js/types/markdown/editor.js', '10565:10606');
                    lines[i] = line.replace(pattern1, '$1$2');
                }
            } else {
                __$coverCall('src/js/types/markdown/editor.js', '10641:10855');
                for (i = _j = 0, _ref1 = lines.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
                    __$coverCall('src/js/types/markdown/editor.js', '10760:10775');
                    line = lines[i];
                    __$coverCall('src/js/types/markdown/editor.js', '10787:10845');
                    lines[i] = line.replace(pattern2, '$1' + (i + 1) + '. $2');
                }
            }
            __$coverCall('src/js/types/markdown/editor.js', '10871:10910');
            return this.selection(lines.join('\n'));
        };
    }();
    __$coverCall('src/js/types/markdown/editor.js', '10930:10951');
    return MarkdownEditor;
}(TextEditor);
__$coverCall('src/js/types/markdown/editor.js', '10971:11100');
namespace('Jencil.types.markdown.editor.MarkdownEditor', function (exports) {
    __$coverCall('src/js/types/markdown/editor.js', '11050:11096');
    return exports.MarkdownEditor = MarkdownEditor;
});