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
__$coverInit("js/Jencil.0.1.2.js", "/**\n * Jencil 0.1.2\n *\n * Author:  lambdalisue\n * URL:     http://hashnote.net/\n * License: MIT License\n * \n * Copyright (C) 2012 lambdalisue, hashnote.net allright reserved.\n *\n * This application include following Library inside\n * \n * Tabby jQuery plugin version 0.12\n * Ted Devito - http://teddevito.com/demos/textarea.html\n * Copyright (c) 2009 Ted Devito\n *\n * shortcut.js\n * http://www.openjs.com/scripts/events/keyboard_shortcuts/\n * Version : 2.01.B\n * By Binny V A\n * License : BSD\n */\n/**\n * #{NAME} #{VERSION}\n *\n * Author:  lambdalisue\n * URL:     http://hashnote.net/\n * License: MIT License\n * \n * Copyright (C) 2012 lambdalisue, hashnote.net allright reserved.\n *\n * This application include following Library inside\n * \n * Tabby jQuery plugin version 0.12\n * Ted Devito - http://teddevito.com/demos/textarea.html\n * Copyright (c) 2009 Ted Devito\n *\n * shortcut.js\n * http://www.openjs.com/scripts/events/keyboard_shortcuts/\n * Version : 2.01.B\n * By Binny V A\n * License : BSD\n */\n/**\n * http://www.openjs.com/scripts/events/keyboard_shortcuts/\n * Version : 2.01.B\n * By Binny V A\n * License : BSD\n */\nshortcut = {\n\t'all_shortcuts':{},//All the shortcuts are stored in this array\n\t'add': function(shortcut_combination,callback,opt) {\n\t\t//Provide a set of default options\n\t\tvar default_options = {\n\t\t\t'type':'keydown',\n\t\t\t'propagate':false,\n\t\t\t'disable_in_input':false,\n\t\t\t'target':document,\n\t\t\t'keycode':false\n\t\t}\n\t\tif(!opt) opt = default_options;\n\t\telse {\n\t\t\tfor(var dfo in default_options) {\n\t\t\t\tif(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];\n\t\t\t}\n\t\t}\n\n\t\tvar ele = opt.target;\n\t\tif(typeof opt.target == 'string') ele = document.getElementById(opt.target);\n\t\tvar ths = this;\n\t\tshortcut_combination = shortcut_combination.toLowerCase();\n\n\t\t//The function to be called at keypress\n\t\tvar func = function(e) {\n\t\t\te = e || window.event;\n\t\t\t\n\t\t\tif(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields\n\t\t\t\tvar element;\n\t\t\t\tif(e.target) element=e.target;\n\t\t\t\telse if(e.srcElement) element=e.srcElement;\n\t\t\t\tif(element.nodeType==3) element=element.parentNode;\n\n\t\t\t\tif(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;\n\t\t\t}\n\t\n\t\t\t//Find Which key is pressed\n\t\t\tif (e.keyCode) code = e.keyCode;\n\t\t\telse if (e.which) code = e.which;\n\t\t\tvar character = String.fromCharCode(code).toLowerCase();\n\t\t\t\n\t\t\tif(code == 188) character=\",\"; //If the user presses , when the type is onkeydown\n\t\t\tif(code == 190) character=\".\"; //If the user presses , when the type is onkeydown\n\n\t\t\tvar keys = shortcut_combination.split(\"+\");\n\t\t\t//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked\n\t\t\tvar kp = 0;\n\t\t\t\n\t\t\t//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken\n\t\t\tvar shift_nums = {\n\t\t\t\t\"`\":\"~\",\n\t\t\t\t\"1\":\"!\",\n\t\t\t\t\"2\":\"@\",\n\t\t\t\t\"3\":\"#\",\n\t\t\t\t\"4\":\"$\",\n\t\t\t\t\"5\":\"%\",\n\t\t\t\t\"6\":\"^\",\n\t\t\t\t\"7\":\"&\",\n\t\t\t\t\"8\":\"*\",\n\t\t\t\t\"9\":\"(\",\n\t\t\t\t\"0\":\")\",\n\t\t\t\t\"-\":\"_\",\n\t\t\t\t\"=\":\"+\",\n\t\t\t\t\";\":\":\",\n\t\t\t\t\"'\":\"\\\"\",\n\t\t\t\t\",\":\"<\",\n\t\t\t\t\".\":\">\",\n\t\t\t\t\"/\":\"?\",\n\t\t\t\t\"\\\\\":\"|\"\n\t\t\t}\n\t\t\t//Special Keys - and their codes\n\t\t\tvar special_keys = {\n\t\t\t\t'esc':27,\n\t\t\t\t'escape':27,\n\t\t\t\t'tab':9,\n\t\t\t\t'space':32,\n\t\t\t\t'return':13,\n\t\t\t\t'enter':13,\n\t\t\t\t'backspace':8,\n\t\n\t\t\t\t'scrolllock':145,\n\t\t\t\t'scroll_lock':145,\n\t\t\t\t'scroll':145,\n\t\t\t\t'capslock':20,\n\t\t\t\t'caps_lock':20,\n\t\t\t\t'caps':20,\n\t\t\t\t'numlock':144,\n\t\t\t\t'num_lock':144,\n\t\t\t\t'num':144,\n\t\t\t\t\n\t\t\t\t'pause':19,\n\t\t\t\t'break':19,\n\t\t\t\t\n\t\t\t\t'insert':45,\n\t\t\t\t'home':36,\n\t\t\t\t'delete':46,\n\t\t\t\t'end':35,\n\t\t\t\t\n\t\t\t\t'pageup':33,\n\t\t\t\t'page_up':33,\n\t\t\t\t'pu':33,\n\t\n\t\t\t\t'pagedown':34,\n\t\t\t\t'page_down':34,\n\t\t\t\t'pd':34,\n\t\n\t\t\t\t'left':37,\n\t\t\t\t'up':38,\n\t\t\t\t'right':39,\n\t\t\t\t'down':40,\n\t\n\t\t\t\t'f1':112,\n\t\t\t\t'f2':113,\n\t\t\t\t'f3':114,\n\t\t\t\t'f4':115,\n\t\t\t\t'f5':116,\n\t\t\t\t'f6':117,\n\t\t\t\t'f7':118,\n\t\t\t\t'f8':119,\n\t\t\t\t'f9':120,\n\t\t\t\t'f10':121,\n\t\t\t\t'f11':122,\n\t\t\t\t'f12':123\n\t\t\t}\n\t\n\t\t\tvar modifiers = { \n\t\t\t\tshift: { wanted:false, pressed:false},\n\t\t\t\tctrl : { wanted:false, pressed:false},\n\t\t\t\talt  : { wanted:false, pressed:false},\n\t\t\t\tmeta : { wanted:false, pressed:false}\t//Meta is Mac specific\n\t\t\t};\n                        \n\t\t\tif(e.ctrlKey)\tmodifiers.ctrl.pressed = true;\n\t\t\tif(e.shiftKey)\tmodifiers.shift.pressed = true;\n\t\t\tif(e.altKey)\tmodifiers.alt.pressed = true;\n\t\t\tif(e.metaKey)   modifiers.meta.pressed = true;\n                        \n\t\t\tfor(var i=0; k=keys[i],i<keys.length; i++) {\n\t\t\t\t//Modifiers\n\t\t\t\tif(k == 'ctrl' || k == 'control') {\n\t\t\t\t\tkp++;\n\t\t\t\t\tmodifiers.ctrl.wanted = true;\n\n\t\t\t\t} else if(k == 'shift') {\n\t\t\t\t\tkp++;\n\t\t\t\t\tmodifiers.shift.wanted = true;\n\n\t\t\t\t} else if(k == 'alt') {\n\t\t\t\t\tkp++;\n\t\t\t\t\tmodifiers.alt.wanted = true;\n\t\t\t\t} else if(k == 'meta') {\n\t\t\t\t\tkp++;\n\t\t\t\t\tmodifiers.meta.wanted = true;\n\t\t\t\t} else if(k.length > 1) { //If it is a special key\n\t\t\t\t\tif(special_keys[k] == code) kp++;\n\t\t\t\t\t\n\t\t\t\t} else if(opt['keycode']) {\n\t\t\t\t\tif(opt['keycode'] == code) kp++;\n\n\t\t\t\t} else { //The special keys did not match\n\t\t\t\t\tif(character == k) kp++;\n\t\t\t\t\telse {\n\t\t\t\t\t\tif(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase\n\t\t\t\t\t\t\tcharacter = shift_nums[character]; \n\t\t\t\t\t\t\tif(character == k) kp++;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\tif(kp == keys.length && \n\t\t\t\t\t\tmodifiers.ctrl.pressed == modifiers.ctrl.wanted &&\n\t\t\t\t\t\tmodifiers.shift.pressed == modifiers.shift.wanted &&\n\t\t\t\t\t\tmodifiers.alt.pressed == modifiers.alt.wanted &&\n\t\t\t\t\t\tmodifiers.meta.pressed == modifiers.meta.wanted) {\n\t\t\t\tcallback(e);\n\t\n\t\t\t\tif(!opt['propagate']) { //Stop the event\n\t\t\t\t\t//e.cancelBubble is supported by IE - this will kill the bubbling process.\n\t\t\t\t\te.cancelBubble = true;\n\t\t\t\t\te.returnValue = false;\n\t\n\t\t\t\t\t//e.stopPropagation works in Firefox.\n\t\t\t\t\tif (e.stopPropagation) {\n\t\t\t\t\t\te.stopPropagation();\n\t\t\t\t\t\te.preventDefault();\n\t\t\t\t\t}\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tthis.all_shortcuts[shortcut_combination] = {\n\t\t\t'callback':func, \n\t\t\t'target':ele, \n\t\t\t'event': opt['type']\n\t\t};\n\t\t//Attach the function with the event\n\t\tif(ele.addEventListener) ele.addEventListener(opt['type'], func, false);\n\t\telse if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);\n\t\telse ele['on'+opt['type']] = func;\n\t},\n\n\t//Remove the shortcut - just specify the shortcut and I will remove the binding\n\t'remove':function(shortcut_combination) {\n\t\tshortcut_combination = shortcut_combination.toLowerCase();\n\t\tvar binding = this.all_shortcuts[shortcut_combination];\n\t\tdelete(this.all_shortcuts[shortcut_combination])\n\t\tif(!binding) return;\n\t\tvar type = binding['event'];\n\t\tvar ele = binding['target'];\n\t\tvar callback = binding['callback'];\n\n\t\tif(ele.detachEvent) ele.detachEvent('on'+type, callback);\n\t\telse if(ele.removeEventListener) ele.removeEventListener(type, callback, false);\n\t\telse ele['on'+type] = false;\n\t}\n};\n\n/**\n * #{NAME} #{VERSION}\n *\n * Author:  lambdalisue\n * URL:     http://hashnote.net/\n * License: MIT License\n * \n * Copyright (C) 2012 lambdalisue, hashnote.net allright reserved.\n *\n * This application include following Library inside\n * \n * Tabby jQuery plugin version 0.12\n * Ted Devito - http://teddevito.com/demos/textarea.html\n * Copyright (c) 2009 Ted Devito\n *\n *\n */\n/*\n *\tTabby jQuery plugin version 0.12\n *\n *\tTed Devito - http://teddevito.com/demos/textarea.html\n *\n *\tCopyright (c) 2009 Ted Devito\n *\t \n *\tFix: SHIFT+TAB feature in Gecko engine at 2012/09/19 by lambdalisue\n *\n *\tRedistribution and use in source and binary forms, with or without modification, are permitted provided that the following \n *\tconditions are met:\n *\t\n *\t\t1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.\n *\t\t2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer  \n *\t\t\tin the documentation and/or other materials provided with the distribution.\n *\t\t3. The name of the author may not be used to endorse or promote products derived from this software without specific prior written \n *\t\t\tpermission. \n *\t \n *\tTHIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE \n *\tIMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE \n *\tLIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, \n *\tPROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY \n *\tTHEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT \n *\tOF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n *\n */\n \n// create closure\n\n(function($) {\n \n\t// plugin definition\n\n\t$.fn.tabby = function(options) {\n\t\t//debug(this);\n\t\t// build main options before element iteration\n\t\tvar opts = $.extend({}, $.fn.tabby.defaults, options);\n\t\tvar pressed = $.fn.tabby.pressed; \n\t\t\n\t\t// iterate and reformat each matched element\n\t\treturn this.each(function() {\n\t\t\t$this = $(this);\n\t\t\t\n\t\t\t// build element specific options\n\t\t\tvar options = $.meta ? $.extend({}, opts, $this.data()) : opts;\n\t\t\t\n\t\t\t$this.bind('keydown',function (e) {\n\t\t\t\tvar kc = $.fn.tabby.catch_kc(e);\n\t\t\t\tif (16 == kc) pressed.shft = true;\n\t\t\t\t/*\n\t\t\t\tbecause both CTRL+TAB and ALT+TAB default to an event (changing tab/window) that \n\t\t\t\twill prevent js from capturing the keyup event, we'll set a timer on releasing them.\n\t\t\t\t*/\n\t\t\t\tif (17 == kc) {pressed.ctrl = true;\tsetTimeout(\"$.fn.tabby.pressed.ctrl = false;\",1000);}\n\t\t\t\tif (18 == kc) {pressed.alt = true; \tsetTimeout(\"$.fn.tabby.pressed.alt = false;\",1000);}\n\t\t\t\t\t\n\t\t\t\tif (9 == kc && !pressed.ctrl && !pressed.alt) {\n\t\t\t\t\te.preventDefault; // does not work in O9.63 ??\n\t\t\t\t\tpressed.last = kc;\tsetTimeout(\"$.fn.tabby.pressed.last = null;\",0);\n\t\t\t\t\tprocess_keypress ($(e.target).get(0), pressed.shft, options);\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t}).bind('keyup',function (e) {\n\t\t\t\tif (16 == $.fn.tabby.catch_kc(e)) pressed.shft = false;\n\t\t\t}).bind('blur',function (e) { // workaround for Opera -- http://www.webdeveloper.com/forum/showthread.php?p=806588\n\t\t\t\tif (9 == pressed.last) $(e.target).one('focus',function (e) {pressed.last = null;}).get(0).focus();\n\t\t\t});\n\t\t\n\t\t});\n\t};\n\t\n\t// define and expose any extra methods\n\t$.fn.tabby.catch_kc = function(e) { return e.keyCode ? e.keyCode : e.charCode ? e.charCode : e.which; };\n\t$.fn.tabby.pressed = {shft : false, ctrl : false, alt : false, last: null};\n\t\n\t// private function for debugging\n\tfunction debug($obj) {\n\t\tif (window.console && window.console.log)\n\t\twindow.console.log('textarea count: ' + $obj.size());\n\t};\n\n\tfunction process_keypress (o,shft,options) {\n\t\tvar scrollTo = o.scrollTop;\n\t\t//var tabString = String.fromCharCode(9);\n\t\t\n\t\t// gecko; o.setSelectionRange is only available when the text box has focus\n\t\tif (o.setSelectionRange) gecko_tab (o, shft, options);\n\t\t\n\t\t// ie; document.selection is always available\n\t\telse if (document.selection) ie_tab (o, shft, options);\n\t\t\n\t\to.scrollTop = scrollTo;\n\t}\n\t\n\t// plugin defaults\n\t$.fn.tabby.defaults = {tabString : String.fromCharCode(9)};\n\t\n\tfunction gecko_tab (o, shft, options) {\n\t\tvar ss = o.selectionStart;\n\t\tvar es = o.selectionEnd;\t\n\t\t\t\t\n\t\t// when there's no selection and we're just working with the caret, we'll add/remove the tabs at the caret, providing more control\n\t\tif(ss == es) {\n\t\t\t// SHIFT+TAB\n\t\t\tif (shft) {\n\t\t\t\t// check to the left of the caret first\n\t\t\t\t//if (\"\\t\" == o.value.substring(ss-options.tabString.length, ss)) {\n\t\t\t\tif (options.tabString == o.value.substring(ss-options.tabString.length, ss)) {\n\t\t\t\t\to.value = o.value.substring(0, ss-options.tabString.length) + o.value.substring(ss); // put it back together omitting one character to the left\n\t\t\t\t\to.focus();\n\t\t\t\t\to.setSelectionRange(ss - options.tabString.length, ss - options.tabString.length);\n\t\t\t\t} \n\t\t\t\t// then check to the right of the caret\n\t\t\t\t//else if (\"\\t\" == o.value.substring(ss, ss + options.tabString.length)) {\n\t\t\t\telse if (options.tabString == o.value.substring(ss, ss + options.tabString.length)) {\n\t\t\t\t\to.value = o.value.substring(0, ss) + o.value.substring(ss + options.tabString.length); // put it back together omitting one character to the right\n\t\t\t\t\to.focus();\n\t\t\t\t\to.setSelectionRange(ss,ss);\n\t\t\t\t}\n\t\t\t}\n\t\t\t// TAB\n\t\t\telse {\t\t\t\n\t\t\t\to.value = o.value.substring(0, ss) + options.tabString + o.value.substring(ss);\n\t\t\t\to.focus();\n\t    \t\to.setSelectionRange(ss + options.tabString.length, ss + options.tabString.length);\n\t\t\t}\n\t\t} \n\t\t// selections will always add/remove tabs from the start of the line\n\t\telse {\n\t\t\t// split the textarea up into lines and figure out which lines are included in the selection\n\t\t\tvar lines = o.value.split(\"\\n\");\n\t\t\tvar indices = new Array();\n\t\t\tvar sl = 0; // start of the line\n\t\t\tvar el = 0; // end of the line\n\t\t\tvar sel = false;\n\t\t\tfor (var i in lines) {\n\t\t\t\tel = sl + lines[i].length;\n\t\t\t\tindices.push({start: sl, end: el, selected: (sl <= ss && el > ss) || (el >= es && sl < es) || (sl > ss && el < es)});\n\t\t\t\tsl = el + 1;// for \"\\n\"\n\t\t\t}\n\t\t\t\n\t\t\t// walk through the array of lines (indices) and add tabs where appropriate\t\t\t\t\t\t\n\t\t\tvar modifier = 0;\n\t\t\tfor (var i in indices) {\n\t\t\t\tif (indices[i].selected) {\n\t\t\t\t\tvar pos = indices[i].start + modifier; // adjust for tabs already inserted/removed\n\t\t\t\t\t// SHIFT+TAB\n\t\t\t\t\tif (shft && options.tabString == o.value.substring(pos,pos+options.tabString.length)) { // only SHIFT+TAB if there's a tab at the start of the line\n\t\t\t\t\t\to.value = o.value.substring(0,pos) + o.value.substring(pos + options.tabString.length); // omit the tabstring to the right\n\t\t\t\t\t\tmodifier -= options.tabString.length;\n\t\t\t\t\t}\n\t\t\t\t\t// TAB\n\t\t\t\t\telse if (!shft) {\n\t\t\t\t\t\to.value = o.value.substring(0,pos) + options.tabString + o.value.substring(pos); // insert the tabstring\n\t\t\t\t\t\tmodifier += options.tabString.length;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\to.focus();\n\t\t\tvar ns = ss + ((modifier > 0) ? options.tabString.length : (modifier < 0) ? -options.tabString.length : 0);\n\t\t\tvar ne = es + modifier;\n\t\t\to.setSelectionRange(ns,ne);\n\t\t}\n\t}\n\t\n\tfunction ie_tab (o, shft, options) {\n\t\tvar range = document.selection.createRange();\n\t\t\n\t\tif (o == range.parentElement()) {\n\t\t\t// when there's no selection and we're just working with the caret, we'll add/remove the tabs at the caret, providing more control\n\t\t\tif ('' == range.text) {\n\t\t\t\t// SHIFT+TAB\n\t\t\t\tif (shft) {\n\t\t\t\t\tvar bookmark = range.getBookmark();\n\t\t\t\t\t//first try to the left by moving opening up our empty range to the left\n\t\t\t\t    range.moveStart('character', -options.tabString.length);\n\t\t\t\t    if (options.tabString == range.text) {\n\t\t\t\t    \trange.text = '';\n\t\t\t\t    } else {\n\t\t\t\t    \t// if that didn't work then reset the range and try opening it to the right\n\t\t\t\t    \trange.moveToBookmark(bookmark);\n\t\t\t\t    \trange.moveEnd('character', options.tabString.length);\n\t\t\t\t    \tif (options.tabString == range.text) \n\t\t\t\t    \t\trange.text = '';\n\t\t\t\t    }\n\t\t\t\t    // move the pointer to the start of them empty range and select it\n\t\t\t\t    range.collapse(true);\n\t\t\t\t\trange.select();\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\telse {\n\t\t\t\t\t// very simple here. just insert the tab into the range and put the pointer at the end\n\t\t\t\t\trange.text = options.tabString; \n\t\t\t\t\trange.collapse(false);\n\t\t\t\t\trange.select();\n\t\t\t\t}\n\t\t\t}\n\t\t\t// selections will always add/remove tabs from the start of the line\n\t\t\telse {\n\t\t\t\n\t\t\t\tvar selection_text = range.text;\n\t\t\t\tvar selection_len = selection_text.length;\n\t\t\t\tvar selection_arr = selection_text.split(\"\\r\\n\");\n\t\t\t\t\n\t\t\t\tvar before_range = document.body.createTextRange();\n\t\t\t\tbefore_range.moveToElementText(o);\n\t\t\t\tbefore_range.setEndPoint(\"EndToStart\", range);\n\t\t\t\tvar before_text = before_range.text;\n\t\t\t\tvar before_arr = before_text.split(\"\\r\\n\");\n\t\t\t\tvar before_len = before_text.length; // - before_arr.length + 1;\n\t\t\t\t\n\t\t\t\tvar after_range = document.body.createTextRange();\n\t\t\t\tafter_range.moveToElementText(o);\n\t\t\t\tafter_range.setEndPoint(\"StartToEnd\", range);\n\t\t\t\tvar after_text = after_range.text; // we can accurately calculate distance to the end because we're not worried about MSIE trimming a \\r\\n\n\t\t\t\t\n\t\t\t\tvar end_range = document.body.createTextRange();\n\t\t\t\tend_range.moveToElementText(o);\n\t\t\t\tend_range.setEndPoint(\"StartToEnd\", before_range);\n\t\t\t\tvar end_text = end_range.text; // we can accurately calculate distance to the end because we're not worried about MSIE trimming a \\r\\n\n\t\t\t\t\t\t\t\t\n\t\t\t\tvar check_html = $(o).html();\n\t\t\t\t$(\"#r3\").text(before_len + \" + \" + selection_len + \" + \" + after_text.length + \" = \" + check_html.length);\t\t\t\t\n\t\t\t\tif((before_len + end_text.length) < check_html.length) {\n\t\t\t\t\tbefore_arr.push(\"\");\n\t\t\t\t\tbefore_len += 2; // for the \\r\\n that was trimmed\t\n\t\t\t\t\tif (shft && options.tabString == selection_arr[0].substring(0,options.tabString.length))\n\t\t\t\t\t\tselection_arr[0] = selection_arr[0].substring(options.tabString.length);\n\t\t\t\t\telse if (!shft) selection_arr[0] = options.tabString + selection_arr[0];\t\n\t\t\t\t} else {\n\t\t\t\t\tif (shft && options.tabString == before_arr[before_arr.length-1].substring(0,options.tabString.length)) \n\t\t\t\t\t\tbefore_arr[before_arr.length-1] = before_arr[before_arr.length-1].substring(options.tabString.length);\n\t\t\t\t\telse if (!shft) before_arr[before_arr.length-1] = options.tabString + before_arr[before_arr.length-1];\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tfor (var i = 1; i < selection_arr.length; i++) {\n\t\t\t\t\tif (shft && options.tabString == selection_arr[i].substring(0,options.tabString.length))\n\t\t\t\t\t\tselection_arr[i] = selection_arr[i].substring(options.tabString.length);\n\t\t\t\t\telse if (!shft) selection_arr[i] = options.tabString + selection_arr[i];\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tif (1 == before_arr.length && 0 == before_len) {\n\t\t\t\t\tif (shft && options.tabString == selection_arr[0].substring(0,options.tabString.length))\n\t\t\t\t\t\tselection_arr[0] = selection_arr[0].substring(options.tabString.length);\n\t\t\t\t\telse if (!shft) selection_arr[0] = options.tabString + selection_arr[0];\n\t\t\t\t}\n\n\t\t\t\tif ((before_len + selection_len + after_text.length) < check_html.length) {\n\t\t\t\t\tselection_arr.push(\"\");\n\t\t\t\t\tselection_len += 2; // for the \\r\\n that was trimmed\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tbefore_range.text = before_arr.join(\"\\r\\n\");\n\t\t\t\trange.text = selection_arr.join(\"\\r\\n\");\n\t\t\t\t\n\t\t\t\tvar new_range = document.body.createTextRange();\n\t\t\t\tnew_range.moveToElementText(o);\n\t\t\t\t\n\t\t\t\tif (0 < before_len)\tnew_range.setEndPoint(\"StartToEnd\", before_range);\n\t\t\t\telse new_range.setEndPoint(\"StartToStart\", before_range);\n\t\t\t\tnew_range.setEndPoint(\"EndToEnd\", range);\n\t\t\t\t\n\t\t\t\tnew_range.select();\n\t\t\t\t\n\t\t\t} \n\t\t}\n\t}\n\n// end of closure\n})(jQuery);\n\n\n(function() {\n  var ActionButton, AjaxViewer, Bar, BaseEditor, BaseHelper, BaseViewer, Button, Caretaker, CommandButton, DefaultProfile, DimainPanel, Fullscreen, FullscreenButton, HelperButton, HorizontalPanel, HorizontalSplitter, HtmlEditor, HtmlHelper, HtmlProfile, HtmlViewer, MonomainPanel, MultiplePanel, Originator, Panel, RedoButton, Selection, Separator, Splitter, Statusbar, TemplateHelper, TemplateViewer, TextEditor, Toolbar, TrimainPanel, UndoButton, VerticalPanel, VerticalSplitter, ViewerButton, Widget, Workspace, Wrapper, animate, autoIndentable, autoIndentableHtml, buttonFactory, curtainFactory, evolute, headerMarkup, translate,\n    __slice = [].slice,\n    __hasProp = {}.hasOwnProperty,\n    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };\n\n  window.namespace = function(target, name, block) {\n    var item, top, _i, _len, _ref, _ref1;\n    if (arguments.length < 3) {\n      _ref = [(typeof exports !== 'undefined' ? exports : window)].concat(__slice.call(arguments)), target = _ref[0], name = _ref[1], block = _ref[2];\n    }\n    top = target;\n    _ref1 = name.split('.');\n    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {\n      item = _ref1[_i];\n      target = target[item] || (target[item] = {});\n    }\n    return block(target, top);\n  };\n\n  Originator = (function() {\n\n    function Originator() {}\n\n    Originator.prototype.createMemento = function() {\n      throw new Error(\"NotImplementedError\");\n    };\n\n    Originator.prototype.setMemento = function(memento) {\n      throw new Error(\"NotImplementedError\");\n    };\n\n    return Originator;\n\n  })();\n\n  Caretaker = (function() {\n\n    function Caretaker(originator) {\n      this._originator = originator;\n      this._undoStack = [];\n      this._redoStack = [];\n    }\n\n    Caretaker.prototype.originator = function(originator) {\n      if (originator != null) {\n        this._originator = originator;\n        return this;\n      }\n      return originator;\n    };\n\n    Caretaker.prototype.save = function(memento) {\n      memento = memento || this.originator().createMemento();\n      this._undoStack.push(memento);\n      return this._redoStack = [];\n    };\n\n    Caretaker.prototype.undo = function() {\n      var originator;\n      if (!this.canUndo()) {\n        return false;\n      }\n      originator = this.originator();\n      this._redoStack.push(originator.createMemento());\n      originator.setMemento(this._undoStack.pop());\n      if (typeof originator.focus === \"function\") {\n        originator.focus();\n      }\n      return true;\n    };\n\n    Caretaker.prototype.redo = function() {\n      var originator;\n      if (!this.canRedo()) {\n        return false;\n      }\n      originator = this.originator();\n      this._undoStack.push(originator.createMemento());\n      originator.setMemento(this._redoStack.pop());\n      if (typeof originator.focus === \"function\") {\n        originator.focus();\n      }\n      return true;\n    };\n\n    Caretaker.prototype.canUndo = function() {\n      return this._undoStack.length > 0;\n    };\n\n    Caretaker.prototype.canRedo = function() {\n      return this._redoStack.length > 0;\n    };\n\n    return Caretaker;\n\n  })();\n\n  Selection = (function() {\n\n    function Selection(document, element) {\n      this.document = document;\n      this.element = element;\n      this;\n\n    }\n\n    Selection.prototype._getCaret = function() {\n      var caret, clone, e, range, s;\n      if (this.document.selection != null) {\n        range = this.document.selection.createRange();\n        clone = range.duplicate();\n        clone.moveToElementText(this.element);\n        clone.setEndPoint('EndToEnd', range);\n        s = clone.text.length - range.text.length;\n        e = s + range.text.length;\n      } else if (this.element.setSelectionRange != null) {\n        s = this.element.selectionStart;\n        e = this.element.selectionEnd;\n      }\n      caret = [s, e];\n      caret.isCollapse = s === e;\n      return caret;\n    };\n\n    Selection.prototype._setCaret = function(start, end) {\n      var range, scrollTop;\n      scrollTop = this.element.scrollTop;\n      if (this.element.setSelectionRange != null) {\n        this.element.setSelectionRange(start, end);\n      } else if (this.element.createTextRange) {\n        range = this.element.createTextRange();\n        range.collapse(true);\n        range.moveStart('character', start);\n        range.moveEnd('character', end - start);\n        range.select();\n      }\n      this.element.focus();\n      this.element.scrollTop = scrollTop;\n      return this;\n    };\n\n    Selection.prototype.caret = function(start, end) {\n      if ((start != null) && typeof start === 'array') {\n        end = start[1];\n        start = start[0];\n      }\n      if ((start != null) && !(end != null)) {\n        end = start;\n      }\n      if ((start != null) && (end != null)) {\n        return this._setCaret(start, end);\n      }\n      return this._getCaret();\n    };\n\n    Selection.prototype.caretOffset = function(offset) {\n      var caret;\n      caret = this.caret();\n      return this.caret(caret[0] + offset);\n    };\n\n    Selection.prototype._replace = function(str, start, end) {\n      var a, b, scrollTop;\n      scrollTop = this.element.scrollTop;\n      b = this.element.value.substring(0, start);\n      a = this.element.value.substring(end);\n      this.element.value = b + str + a;\n      this.element.scrollTop = scrollTop;\n      return this;\n    };\n\n    Selection.prototype._getText = function() {\n      var e, range, s, _ref;\n      if (this.document.selection != null) {\n        range = this.document.selection.createRange();\n        return range.text;\n      } else if (this.element.setSelectionRange) {\n        _ref = this.caret(), s = _ref[0], e = _ref[1];\n        return this.element.value.substring(s, e);\n      }\n      return null;\n    };\n\n    Selection.prototype._setText = function(str, keepSelection) {\n      var e, s, scrollTop, _ref;\n      scrollTop = this.element.scrollTop;\n      _ref = this.caret(), s = _ref[0], e = _ref[1];\n      this._replace(str, s, e);\n      e = s + str.length;\n      if (!keepSelection) {\n        s = e;\n      }\n      this.caret(s, e);\n      this.element.focus();\n      this.element.scrollTop = scrollTop;\n      return this;\n    };\n\n    Selection.prototype.text = function(str, keepSelection) {\n      if (str != null) {\n        return this._setText(str, keepSelection);\n      }\n      return this._getText();\n    };\n\n    Selection.prototype.insertBefore = function(str, keepSelection) {\n      var e, s, scrollTop, text, _ref;\n      scrollTop = this.element.scrollTop;\n      _ref = this.caret(), s = _ref[0], e = _ref[1];\n      text = this.text();\n      this._replace(str + text, s, e);\n      e = s + str.length;\n      if (!keepSelection) {\n        s = e;\n      }\n      this.caret(s, e);\n      this.element.focus();\n      this.element.scrollTop = scrollTop;\n      return this;\n    };\n\n    Selection.prototype.insertAfter = function(str, keepSelection) {\n      var e, s, scrollTop, text, _ref;\n      scrollTop = this.element.scrollTop;\n      _ref = this.caret(), s = _ref[0], e = _ref[1];\n      text = this.text();\n      this._replace(text + str, s, e);\n      s = e;\n      e = e + str.length;\n      if (!keepSelection) {\n        s = e;\n      }\n      this.caret(s, e);\n      this.element.focus();\n      this.element.scrollTop = scrollTop;\n      return this;\n    };\n\n    Selection.prototype.enclose = function(lhs, rhs, keepSelection) {\n      var e, s, scrollTop, str, text, _ref;\n      scrollTop = this.element.scrollTop;\n      text = this.text();\n      if (text.indexOf(lhs) === 0 && text.lastIndexOf(rhs) === (text.length - rhs.length)) {\n        str = text.substring(lhs.length, text.length - rhs.length);\n        this.text(str, keepSelection);\n      } else {\n        _ref = this.caret(), s = _ref[0], e = _ref[1];\n        this._replace(lhs + text + rhs, s, e);\n        e = s + lhs.length + text.length + rhs.length;\n        if (!keepSelection) {\n          s = e;\n        }\n        this.caret(s, e);\n      }\n      this.element.focus();\n      this.element.scrollTop = scrollTop;\n      return this;\n    };\n\n    Selection.prototype._getLineCaretOfCaret = function(caret) {\n      var e, s, value;\n      value = this.element.value;\n      s = value.lastIndexOf(\"\\n\", caret - 1) + 1;\n      e = value.indexOf(\"\\n\", caret);\n      if (e === -1) {\n        e = value.length;\n      }\n      return [s, e];\n    };\n\n    Selection.prototype._getLineCaret = function() {\n      return this._getLineCaretOfCaret(this.caret()[0]);\n    };\n\n    Selection.prototype._getLine = function() {\n      var e, s, _ref;\n      _ref = this._getLineCaret(), s = _ref[0], e = _ref[1];\n      return this.element.value.substring(s, e);\n    };\n\n    Selection.prototype._setLine = function(line, keepSelection) {\n      var e, s, scrollTop, _ref;\n      scrollTop = this.element.scrollTop;\n      _ref = this._getLineCaret(), s = _ref[0], e = _ref[1];\n      this._replace(line, s, e);\n      e = s + line.length;\n      if (!keepSelection) {\n        s = e;\n      }\n      this.caret(s, e);\n      this.element.focus();\n      this.element.scrollTop = scrollTop;\n      return this;\n    };\n\n    Selection.prototype.line = function(value, keepSelection) {\n      if (value != null) {\n        return this._setLine(value, keepSelection);\n      }\n      return this._getLine();\n    };\n\n    Selection.prototype.selectWholeLine = function(caret) {\n      var e, s, _ref;\n      _ref = this._getLineCaretOfCaret(caret), s = _ref[0], e = _ref[1];\n      return this.caret(s, e);\n    };\n\n    Selection.prototype.selectWholeCurrentLine = function() {\n      var e, s, _ref;\n      _ref = this._getLineCaretOfCaret(this.caret()[0]), s = _ref[0], e = _ref[1];\n      return this.caret(s, e);\n    };\n\n    return Selection;\n\n  })();\n\n  /*\n  Evolution\n  \n  Extend jQueryObj\n  \n  Author: lambdalisue\n  License: MIT License\n  */\n\n\n  evolute = (function() {\n    var absoluteX, absoluteY, contentX, contentY, maxHeight, maxWidth, minHeight, minWidth, ncss, nonContentHeight, nonContentWidth, outerHeight, outerWidth, relativeX, relativeY;\n    nonContentWidth = function(includeMargin) {\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      return this.outerWidth(includeMargin) - this.width();\n    };\n    nonContentHeight = function(includeMargin) {\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      return this.outerHeight(includeMargin) - this.height();\n    };\n    outerWidth = function(includeMargin, value) {\n      var offset;\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      if (typeof includeMargin === 'number') {\n        value = includeMargin;\n        includeMargin = false;\n      }\n      if (value != null) {\n        offset = this.nonContentWidth(includeMargin);\n        return this.width(value - offset);\n      }\n      return this._outerWidth(includeMargin);\n    };\n    outerHeight = function(includeMargin, value) {\n      var offset;\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      if (typeof includeMargin === 'number') {\n        value = includeMargin;\n        includeMargin = false;\n      }\n      if (value != null) {\n        offset = this.nonContentHeight(includeMargin);\n        return this.height(value - offset);\n      }\n      return this._outerHeight(includeMargin);\n    };\n    nonContentWidth = function(includeMargin) {\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      return this.outerWidth(includeMargin) - this.width();\n    };\n    nonContentHeight = function(includeMargin) {\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      return this.outerHeight(includeMargin) - this.height();\n    };\n    ncss = function(propertyName, defaultValue) {\n      var value;\n      if (defaultValue == null) {\n        defaultValue = null;\n      }\n      value = this.css(propertyName);\n      if (value === '' || value === 'none' || value === null || value === (void 0) || value === NaN) {\n        return defaultValue;\n      }\n      value = parseInt(value, 10);\n      return value;\n    };\n    minWidth = function() {\n      return this.ncss('min-width');\n    };\n    minHeight = function() {\n      return this.ncss('min-height');\n    };\n    maxWidth = function() {\n      return this.ncss('max-width');\n    };\n    maxHeight = function() {\n      return this.ncss('max-height');\n    };\n    contentX = function(includeMargin) {\n      var borderLeft, marginLeft, paddingLeft;\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      marginLeft = includeMargin ? this.ncss('margin-left') : 0;\n      borderLeft = this.ncss('border-left-width');\n      paddingLeft = this.ncss('padding-left');\n      return marginLeft + borderLeft + paddingLeft;\n    };\n    contentY = function(includeMargin) {\n      var borderTop, marginTop, paddingTop;\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      marginTop = includeMargin ? this.ncss('margin-top') : 0;\n      borderTop = this.ncss('border-top-width');\n      paddingTop = this.ncss('padding-top');\n      return marginTop + borderTop + paddingTop;\n    };\n    absoluteX = function(value) {\n      var offset;\n      offset = this.offset();\n      if (value != null) {\n        offset.left = value;\n        return this.offset(offset);\n      }\n      return offset.left;\n    };\n    absoluteY = function(value) {\n      var offset;\n      offset = this.offset();\n      if (value != null) {\n        offset.top = value;\n        return this.offset(offset);\n      }\n      return offset.top;\n    };\n    relativeX = function(includeMargin, value) {\n      var offset, parent;\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      if (typeof includeMargin === 'number') {\n        value = includeMargin;\n        includeMargin = false;\n      }\n      parent = evolute(this.parent());\n      offset = parent.absoluteX() + parent.contentX(includeMargin);\n      if (value != null) {\n        return this.absoluteX(value + offset);\n      }\n      return this.absoluteX() - offset;\n    };\n    relativeY = function(includeMargin, value) {\n      var offset, parent;\n      if (includeMargin == null) {\n        includeMargin = false;\n      }\n      if (typeof includeMargin === 'number') {\n        value = includeMargin;\n        includeMargin = false;\n      }\n      parent = evolute(this.parent());\n      offset = parent.absoluteY() + parent.contentY(includeMargin);\n      if (value != null) {\n        return this.absoluteY(value + offset);\n      }\n      return this.absoluteY() - offset;\n    };\n    evolute = function(jQueryObj) {\n      if (jQueryObj.__evoluted__ === true) {\n        return jQueryObj;\n      }\n      jQueryObj._outerWidth = jQueryObj.outerWidth;\n      jQueryObj._outerHeight = jQueryObj.outerHeight;\n      jQueryObj.nonContentWidth = nonContentWidth;\n      jQueryObj.nonContentHeight = nonContentHeight;\n      jQueryObj.outerWidth = outerWidth;\n      jQueryObj.outerHeight = outerHeight;\n      jQueryObj.nonContentWidth = nonContentWidth;\n      jQueryObj.nonContentHeight = nonContentHeight;\n      jQueryObj.ncss = ncss;\n      jQueryObj.minWidth = minWidth;\n      jQueryObj.minHeight = minHeight;\n      jQueryObj.maxWidth = maxWidth;\n      jQueryObj.maxHeight = maxHeight;\n      jQueryObj.contentX = contentX;\n      jQueryObj.contentY = contentY;\n      jQueryObj.absoluteX = absoluteX;\n      jQueryObj.absoluteY = absoluteY;\n      jQueryObj.relativeX = relativeX;\n      jQueryObj.relativeY = relativeY;\n      jQueryObj.__evoluted__ = true;\n      return jQueryObj;\n    };\n    return evolute;\n  })();\n\n  curtainFactory = function(element) {\n    var curtain;\n    element.css('position', 'relative');\n    curtain = $('<div>').appendTo(element).hide().css({\n      'position': 'absolute',\n      'top': '0',\n      'left': '0',\n      'overflow': 'hidden',\n      'z-index': 99999\n    });\n    curtain.on = function() {\n      curtain.refresh();\n      return curtain.show();\n    };\n    curtain.refresh = function() {\n      curtain.width(element.outerWidth(true));\n      return curtain.height(element.outerHeight(true));\n    };\n    curtain.off = function() {\n      return curtain.hide();\n    };\n    return curtain;\n  };\n\n  /*\n  animation\n  \n  Animate value via easing function\n  \n  The following library is required to use this library\n  \n  - jQuery\n  \n  Author:   lambdalisue (lambdalisue@hashnote.net)\n  License:  MIT License\n  \n  Copyright(C) 2012 lambdalisue, hasnote.net allright reserved\n  */\n\n\n  animate = (function() {\n    var defaultOptions, now;\n    now = function() {\n      return (new Date()).getTime();\n    };\n    defaultOptions = {\n      start: 0,\n      end: 100,\n      duration: 1000,\n      callbackEach: null,\n      callbackDone: null,\n      easing: jQuery.easing.swing\n    };\n    return function(options) {\n      var difference, startTime, step;\n      options = jQuery.extend(defaultOptions, options);\n      startTime = now();\n      difference = options.end - options.start;\n      step = function() {\n        var epoch, x;\n        epoch = now() - startTime;\n        x = options.easing(epoch / options.duration, epoch, 0, 1, options.duration);\n        x = x * difference + options.start;\n        options.callbackEach(x, epoch);\n        if (epoch < options.duration) {\n          return setTimeout(step, 1);\n        } else {\n          options.callbackEach(options.end, options.duration);\n          return typeof options.callbackDone === \"function\" ? options.callbackDone() : void 0;\n        }\n      };\n      return step();\n    };\n  })();\n\n  /*\n  autoindent\n  \n  Enable auto indentation feature in textarea\n  It is suitable with jquery.tabby.js which enable tab indentation in textarea\n  \n  The following library is required to use this library\n  \n  - jQuery\n  - selection\n  \n  Note:\n    You should use this library as CoffeeScript that's why I didn't\n    add `autoIndentable` in window namespace\n  \n  Usage:\n  \n    textarea = $('textarea')\n    textarea = autoIndentable(textarea)\n  \n    # auto indent feature is enable at default.\n    # you can disable it with\n    textarea.autoIndent.disable()\n  \n    # and enable again with\n    textarea.autoIndent.enable()\n  \n    # and also, you can add some pre/post callback\n    # which is called pre/post step of adding newline\n    # and white spaces with\n    textarea.autoIndent.pre = (e, line) ->\n      # e = Event object of jQuery\n      # line = current line of caret exists\n      console.log \"This function is called before newline adding\"\n    textarea.autoIndent.post = (e, line, indent, insert) ->\n      # e = Event object of jQuery\n      # line = current line of caret exists\n      # indent = leading white spaces of current line\n      # insert = newline and indent which is added after the caret\n      console.log \"This function is called after newline adding\"\n  \n  Author:   lambdalisue (lambdalisue@hashnote.net)\n  License:  MIT License\n  \n  Copyright(C) 2012 lambdalisue, hasnote.net allright reserved\n  */\n\n\n  autoIndentable = (function() {\n    var autoIndent;\n    autoIndent = function(e) {\n      var indent, insert, line, _ref, _ref1;\n      if (e.which !== 13) {\n        return;\n      }\n      line = this.selection.line();\n      if ((_ref = this.autoIndent.pre) != null) {\n        _ref.call(this, e, line);\n      }\n      indent = line.replace(/^([\\t\\s]*).*$/, \"$1\");\n      insert = \"\\n\" + indent;\n      this.selection.insertAfter(insert, false);\n      if ((_ref1 = this.autoIndent.post) != null) {\n        _ref1.call(this, e, line, indent, insert);\n      }\n      e.stopPropagation();\n      e.stopImmediatePropagation();\n      e.preventDefault();\n      this.focus();\n      return false;\n    };\n    return function(textarea, pre, post) {\n      if (!(textarea instanceof jQuery)) {\n        textarea = $(textarea);\n      }\n      if (!(textarea.selection != null)) {\n        textarea.selection = new Selection(document, textarea.get(0));\n      }\n      textarea.autoIndent = function(e) {\n        return autoIndent.call(textarea, e);\n      };\n      textarea.autoIndent.enable = function() {\n        textarea.on('keydown', textarea.autoIndent);\n        return textarea;\n      };\n      textarea.autoIndent.disable = function() {\n        textarea.off('keydown', textarea.autoIndent);\n        return textarea;\n      };\n      if (pre != null) {\n        textarea.autoIndent.pre = function(e, line) {\n          return pre.call(textarea, e, line);\n        };\n      }\n      if (post != null) {\n        textarea.autoIndent.post = function(e, line, indent, insert) {\n          return post.call(textarea, e, line, indent, insert);\n        };\n      }\n      return textarea.autoIndent.enable();\n    };\n  })();\n\n  if (window.i18n != null) {\n    translate = function(key) {\n      return i18n.t(key, {\n        defaultValue: key\n      });\n    };\n  } else {\n    translate = function(key) {\n      return key;\n    };\n  }\n\n  DefaultProfile = {\n    mainPanelClass: null,\n    editorClass: null,\n    viewerClass: null,\n    helperClass: null,\n    toolbarButtons: [],\n    statusbarButtons: [],\n    defaultVolume: null,\n    defaultVolume2: null\n  };\n\n  this.Jencil = (function() {\n\n    function Jencil(textarea, options) {\n      var _this = this;\n      this.options = jQuery.extend({\n        'profile': 'Html',\n        'profiles': {\n          'Html': Jencil.profiles.HtmlProfile\n        },\n        'resizable': true,\n        'enableTabIndent': true,\n        'enableAutoIndent': true,\n        'tabString': '    ',\n        'defaultVolume': null,\n        'defaultVolume2': null,\n        'width': 640,\n        'height': 620,\n        'editorTemplatePath': null,\n        'viewerTemplatePath': null,\n        'helperTemplatePath': null\n      }, options);\n      this.element = textarea.hide();\n      this.caretaker = new Caretaker();\n      this.caretaker.originator = function() {\n        return _this.editor();\n      };\n      this.wrapper = new Wrapper(this, this.options.width, this.options.height);\n      this.fullscreen = new Fullscreen(this);\n      this.element.after(this.wrapper.element).after(this.fullscreen.element);\n      this.wrapper.init();\n      this.wrapper.adjust();\n      this.caretaker.save();\n    }\n\n    Jencil.prototype.editor = function() {\n      return this.wrapper.workspace.mainPanel.editorPanel || null;\n    };\n\n    Jencil.prototype.viewer = function() {\n      return this.wrapper.workspace.mainPanel.viewerPanel || null;\n    };\n\n    Jencil.prototype.helper = function() {\n      return this.wrapper.workspace.mainPanel.helperPanel || null;\n    };\n\n    return Jencil;\n\n  })();\n\n  $.fn.jencil = function(options) {\n    return new Jencil($(this), options);\n  };\n\n  namespace('Jencil.profiles', function(exports) {\n    return exports.DefaultProfile = DefaultProfile;\n  });\n\n  namespace('Jencil.utils', function(exports) {\n    return exports.namespace = namespace;\n  });\n\n  namespace('Jencil', function(exports) {\n    return exports.t = translate;\n  });\n\n  Widget = (function() {\n\n    function Widget(core, selector, context) {\n      this.core = core;\n      if (selector == null) {\n        selector = '<div>';\n      }\n      if (selector instanceof jQuery) {\n        this.element = selector;\n      } else {\n        this.element = $(selector, context);\n      }\n      this.element = evolute(this.element);\n    }\n\n    Widget.prototype.init = function() {\n      return this;\n    };\n\n    Widget.prototype.adjust = function() {\n      return this;\n    };\n\n    return Widget;\n\n  })();\n\n  Panel = (function(_super) {\n\n    __extends(Panel, _super);\n\n    function Panel(core, selector, context) {\n      if (selector == null) {\n        selector = '<div>';\n      }\n      Panel.__super__.constructor.call(this, core, selector, context);\n      this.element.addClass('panel');\n    }\n\n    return Panel;\n\n  })(Widget);\n\n  MultiplePanel = (function(_super) {\n\n    __extends(MultiplePanel, _super);\n\n    function MultiplePanel(core, fst, snd, splitter) {\n      var hide, show,\n        _this = this;\n      this.fst = fst;\n      this.snd = snd;\n      this.splitter = splitter;\n      MultiplePanel.__super__.constructor.call(this, core);\n      this.element.addClass('multiple');\n      this.element.append(this.fst.element);\n      this.element.append(this.splitter.element);\n      this.element.append(this.snd.element);\n      show = function(callback) {\n        if (!this.element.is(':visible')) {\n          return this.toggle(callback, null);\n        }\n      };\n      hide = function(callback) {\n        if (this.element.is(':visible')) {\n          return this.toggle(null, callback);\n        }\n      };\n      this.fst.toggle = function(callbackOn, callbackOff) {\n        return _this._togglePanel(0, callbackOn, callbackOff);\n      };\n      this.fst.show = show;\n      this.fst.hide = hide;\n      this.snd.toggle = function(callbackOn, callbackOff) {\n        return _this._togglePanel(1, callbackOn, callbackOff);\n      };\n      this.snd.show = show;\n      this.snd.hide = hide;\n      this.splitter.element.dblclick(function() {\n        return _this.snd.toggle();\n      });\n    }\n\n    MultiplePanel.prototype.init = function() {\n      this.splitter.init();\n      this.fst.init();\n      return this.snd.init();\n    };\n\n    MultiplePanel.prototype._togglePanel = function(to, callbackOn, callbackOff) {\n      var callbackDone, end, volume, _callbackDone,\n        _this = this;\n      if (this._animating) {\n        return;\n      }\n      volume = this.splitter.volume();\n      callbackDone = null;\n      if ((0 < volume && volume < 1)) {\n        end = to;\n        this.splitter._previousVolume = volume;\n        _callbackDone = callbackOff;\n      } else {\n        end = this.splitter._previousVolume || this.splitter.defaultVolume;\n        if (end === to) {\n          end = 0.5;\n        }\n        _callbackDone = callbackOn;\n      }\n      this._animating = true;\n      callbackDone = function() {\n        _this._animating = false;\n        return typeof _callbackDone === \"function\" ? _callbackDone() : void 0;\n      };\n      return animate({\n        start: volume,\n        end: end,\n        duration: 500,\n        callbackEach: function(value, epoch) {\n          return _this.splitter.volume(value);\n        },\n        callbackDone: callbackDone\n      });\n    };\n\n    return MultiplePanel;\n\n  })(Panel);\n\n  VerticalPanel = (function(_super) {\n\n    __extends(VerticalPanel, _super);\n\n    function VerticalPanel(core, fst, snd, defaultVolume) {\n      var splitter;\n      if (defaultVolume == null) {\n        defaultVolume = 0.5;\n      }\n      splitter = new VerticalSplitter(core, fst, snd, defaultVolume);\n      VerticalPanel.__super__.constructor.call(this, core, fst, snd, splitter);\n      this.element.addClass('vertical');\n    }\n\n    VerticalPanel.prototype.adjust = function() {\n      this.fst.element.outerHeight(true, this.element.height());\n      this.snd.element.outerHeight(true, this.element.height());\n      this.splitter.element.outerHeight(true, this.element.height());\n      this.splitter.adjust();\n      return this;\n    };\n\n    return VerticalPanel;\n\n  })(MultiplePanel);\n\n  HorizontalPanel = (function(_super) {\n\n    __extends(HorizontalPanel, _super);\n\n    function HorizontalPanel(core, fst, snd, defaultVolume) {\n      var splitter;\n      if (defaultVolume == null) {\n        defaultVolume = 0.5;\n      }\n      splitter = new HorizontalSplitter(core, fst, snd, defaultVolume);\n      HorizontalPanel.__super__.constructor.call(this, core, fst, snd, splitter);\n      this.element.addClass('horizontal');\n    }\n\n    HorizontalPanel.prototype.adjust = function() {\n      this.fst.element.outerWidth(true, this.element.width());\n      this.snd.element.outerWidth(true, this.element.width());\n      this.splitter.element.outerWidth(true, this.element.width());\n      this.splitter.adjust();\n      return this;\n    };\n\n    return HorizontalPanel;\n\n  })(MultiplePanel);\n\n  namespace('Jencil.ui.widgets', function(exports) {\n    return exports.Widget = Widget;\n  });\n\n  namespace('Jencil.ui.widgets.panels', function(exports) {\n    exports.Panel = Panel;\n    exports.MultiplePanel = MultiplePanel;\n    exports.VerticalPanel = VerticalPanel;\n    return exports.HorizontalPanel = HorizontalPanel;\n  });\n\n  Splitter = (function(_super) {\n\n    __extends(Splitter, _super);\n\n    function Splitter(core, fst, snd, defaultVolume) {\n      var mousemove, mouseup,\n        _this = this;\n      this.fst = fst;\n      this.snd = snd;\n      this.defaultVolume = defaultVolume != null ? defaultVolume : 0.5;\n      Splitter.__super__.constructor.call(this, core);\n      this.element.addClass('splitter');\n      this._volume = this.defaultVolume;\n      mousemove = function(e) {\n        var _ref, _ref1;\n        _this.mousemove(e);\n        if ((_ref = _this.fst.curtain) != null) {\n          if (typeof _ref.refresh === \"function\") {\n            _ref.refresh();\n          }\n        }\n        if ((_ref1 = _this.snd.curtain) != null) {\n          if (typeof _ref1.refresh === \"function\") {\n            _ref1.refresh();\n          }\n        }\n        e.stopPropagation();\n        e.stopImmediatePropagation();\n        return e.preventDefault();\n      };\n      mouseup = function(e) {\n        var $window, _ref, _ref1;\n        $window = $(window);\n        $window.unbind('mousemove', mousemove);\n        $window.unbind('mouseup', mouseup);\n        if ((_ref = _this.fst.curtain) != null) {\n          if (typeof _ref.off === \"function\") {\n            _ref.off();\n          }\n        }\n        if ((_ref1 = _this.snd.curtain) != null) {\n          if (typeof _ref1.off === \"function\") {\n            _ref1.off();\n          }\n        }\n        e.stopPropagation();\n        e.stopImmediatePropagation();\n        return e.preventDefault();\n      };\n      this.element.mousedown(function(e) {\n        var $window, _ref, _ref1;\n        $window = $(window);\n        $window.mousemove(mousemove);\n        $window.mouseup(mouseup);\n        if ((_ref = _this.fst.curtain) != null) {\n          if (typeof _ref.on === \"function\") {\n            _ref.on();\n          }\n        }\n        if ((_ref1 = _this.snd.curtain) != null) {\n          if (typeof _ref1.on === \"function\") {\n            _ref1.on();\n          }\n        }\n        e.stopPropagation();\n        e.stopImmediatePropagation();\n        return e.preventDefault();\n      });\n    }\n\n    Splitter.prototype.init = function() {\n      return this.container = evolute(this.element.parent());\n    };\n\n    Splitter.prototype.volume = function(value, skip) {\n      if (skip == null) {\n        skip = false;\n      }\n      if (value != null) {\n        this._volume = value;\n        if (!skip) {\n          this.adjust();\n        }\n        return this;\n      }\n      return this._volume;\n    };\n\n    Splitter.prototype.value = function(value, skip) {\n      var valueWidth, volume;\n      if (skip == null) {\n        skip = false;\n      }\n      valueWidth = this.valueWidth();\n      if (value != null) {\n        volume = value / valueWidth;\n        return this.volume(volume, skip);\n      }\n      return this.volume() * valueWidth;\n    };\n\n    Splitter.prototype.regulateValue = function(value) {\n      var maxValue, minValue;\n      minValue = this.minValue();\n      maxValue = this.maxValue();\n      if (value < minValue) {\n        value = minValue;\n      }\n      if (value > maxValue) {\n        value = maxValue;\n      }\n      return value;\n    };\n\n    return Splitter;\n\n  })(Widget);\n\n  VerticalSplitter = (function(_super) {\n\n    __extends(VerticalSplitter, _super);\n\n    function VerticalSplitter(core, fst, snd, defaultVolume) {\n      var _ref, _ref1;\n      VerticalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);\n      this.element.addClass('vertical');\n      this.fst.element.addClass('left');\n      this.snd.element.addClass('right');\n      this.fst.element.css({\n        'float': 'left'\n      });\n      this.snd.element.css({\n        'float': 'left'\n      });\n      if ((_ref = this.fst.curtain) != null) {\n        _ref.css('pointer', 'col-resize');\n      }\n      if ((_ref1 = this.snd.curtain) != null) {\n        _ref1.css('pointer', 'col-resize');\n      }\n    }\n\n    VerticalSplitter.prototype.mousemove = function(e) {\n      var offset, value;\n      offset = this.container.absoluteX() + this.container.contentX(true);\n      value = e.pageX - offset;\n      value = this.regulateValue(value);\n      return this.value(value);\n    };\n\n    VerticalSplitter.prototype.valueWidth = function() {\n      return this.container.width();\n    };\n\n    VerticalSplitter.prototype.minValue = function() {\n      var m1, m2;\n      m1 = this.fst.element.minWidth() + this.fst.element.nonContentWidth();\n      m2 = this.snd.element.maxWidth() + this.snd.element.nonContentWidth();\n      if (m2 != null) {\n        m2 = this.valueWidth() - m2;\n      }\n      if ((m1 != null) && (m2 != null)) {\n        return Math.min(m1, m2);\n      }\n      return m1 || m2 || 0;\n    };\n\n    VerticalSplitter.prototype.maxValue = function() {\n      var m1, m2, valueWidth;\n      valueWidth = this.valueWidth();\n      m1 = this.fst.element.maxWidth() + this.fst.element.nonContentWidth();\n      m2 = this.snd.element.minWidth() + this.snd.element.nonContentWidth();\n      if (m2 != null) {\n        m2 = valueWidth - m2;\n      }\n      if ((m1 != null) && (m2 != null)) {\n        return Math.max(m1, m2);\n      }\n      return m1 || m2 || valueWidth;\n    };\n\n    VerticalSplitter.prototype.adjust = function() {\n      var fstValue, sndValue, value, valueWidth;\n      value = this.value();\n      valueWidth = this.valueWidth();\n      fstValue = value - this.fst.element.nonContentWidth(true);\n      sndValue = (valueWidth - value) - this.snd.element.nonContentWidth(true);\n      if (fstValue <= 0) {\n        if (this.fst.element.is(':visible')) {\n          this.fst.element.hide();\n        }\n        if (!this.snd.element.is(':visible')) {\n          this.snd.element.show();\n        }\n        this.snd.element.outerWidth(true, valueWidth);\n        this._value = value = 0;\n      } else if (sndValue <= 0) {\n        if (!this.fst.element.is(':visible')) {\n          this.fst.element.show();\n        }\n        if (this.snd.element.is(':visible')) {\n          this.snd.element.hide();\n        }\n        this.fst.element.outerWidth(true, valueWidth);\n        this._value = value = valueWidth;\n      } else {\n        if (!this.fst.element.is(':visible')) {\n          this.fst.element.show();\n        }\n        if (!this.snd.element.is(':visible')) {\n          this.snd.element.show();\n        }\n        this.fst.element.width(fstValue);\n        this.snd.element.width(sndValue);\n      }\n      this.fst.adjust();\n      this.snd.adjust();\n      this.element.relativeX(value - this.element.outerWidth() / 2);\n      return this;\n    };\n\n    return VerticalSplitter;\n\n  })(Splitter);\n\n  HorizontalSplitter = (function(_super) {\n\n    __extends(HorizontalSplitter, _super);\n\n    function HorizontalSplitter(core, fst, snd, defaultVolume) {\n      var _ref, _ref1;\n      HorizontalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);\n      this.element.addClass('horizontal');\n      this.fst.element.addClass('top');\n      this.snd.element.addClass('bottom');\n      if ((_ref = this.fst.curtain) != null) {\n        _ref.css('pointer', 'raw-resize');\n      }\n      if ((_ref1 = this.snd.curtain) != null) {\n        _ref1.css('pointer', 'raw-resize');\n      }\n    }\n\n    HorizontalSplitter.prototype.mousemove = function(e) {\n      var offset, value;\n      offset = this.container.absoluteY() + this.container.contentY(true);\n      value = e.pageY - offset;\n      value = this.regulateValue(value);\n      return this.value(value);\n    };\n\n    HorizontalSplitter.prototype.valueWidth = function() {\n      return this.container.height();\n    };\n\n    HorizontalSplitter.prototype.minValue = function() {\n      var m1, m2;\n      m1 = this.fst.element.minHeight() + this.fst.element.nonContentHeight();\n      m2 = this.snd.element.maxHeight() + this.snd.element.nonContentHeight();\n      if (m2 != null) {\n        m2 = this.valueWidth() - m2;\n      }\n      if ((m1 != null) && (m2 != null)) {\n        return Math.min(m1, m2);\n      }\n      return m1 || m2 || 0;\n    };\n\n    HorizontalSplitter.prototype.maxValue = function() {\n      var m1, m2, valueWidth;\n      valueWidth = this.valueWidth();\n      m1 = this.fst.element.maxHeight() + this.fst.element.nonContentHeight();\n      m2 = this.snd.element.minHeight() + this.snd.element.nonContentHeight();\n      if (m2 != null) {\n        m2 = valueWidth - m2;\n      }\n      if ((m1 != null) && (m2 != null)) {\n        return Math.max(m1, m2);\n      }\n      return m1 || m2 || valueWidth;\n    };\n\n    HorizontalSplitter.prototype.adjust = function() {\n      var fstValue, sndValue, value, valueWidth;\n      value = this.value();\n      valueWidth = this.valueWidth();\n      fstValue = value - this.fst.element.nonContentHeight(true);\n      sndValue = (valueWidth - value) - this.snd.element.nonContentHeight(true);\n      if (fstValue <= 0) {\n        if (this.fst.element.is(':visible')) {\n          this.fst.element.hide();\n        }\n        if (!this.snd.element.is(':visible')) {\n          this.snd.element.show();\n        }\n        this.snd.element.outerHeight(true, valueWidth);\n        this._value = value = 0;\n      } else if (sndValue <= 0) {\n        if (!this.fst.element.is(':visible')) {\n          this.fst.element.show();\n        }\n        if (this.snd.element.is(':visible')) {\n          this.snd.element.hide();\n        }\n        this.fst.element.outerHeight(true, valueWidth);\n        this._value = value = valueWidth;\n      } else {\n        if (!this.fst.element.is(':visible')) {\n          this.fst.element.show();\n        }\n        if (!this.snd.element.is(':visible')) {\n          this.snd.element.show();\n        }\n        this.fst.element.height(fstValue);\n        this.snd.element.height(sndValue);\n      }\n      this.fst.adjust();\n      this.snd.adjust();\n      this.element.relativeY(value - this.element.outerHeight() / 2);\n      return this;\n    };\n\n    return HorizontalSplitter;\n\n  })(Splitter);\n\n  namespace('Jencil.ui.widgets.splitters', function(exports) {\n    exports.Splitter = Splitter;\n    exports.VerticalSplitter = VerticalSplitter;\n    return exports.HorizontalSplitter = HorizontalSplitter;\n  });\n\n  BaseEditor = (function(_super) {\n\n    __extends(BaseEditor, _super);\n\n    function BaseEditor(core, selector, context) {\n      if (selector == null) {\n        selector = '<div>';\n      }\n      BaseEditor.__super__.constructor.call(this, core, selector, context);\n      this.element.addClass('editor');\n      this._changeCallbacks = [];\n    }\n\n    BaseEditor.prototype.val = function(value) {\n      throw new Error(\"NotImplementedError\");\n    };\n\n    BaseEditor.prototype.change = function(callback) {\n      var _i, _len, _ref;\n      if (callback != null) {\n        this._changeCallbacks.push(callback);\n        return this;\n      }\n      _ref = this._changeCallbacks;\n      for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n        callback = _ref[_i];\n        callback.call(this, this.val());\n      }\n      return this;\n    };\n\n    BaseEditor.prototype.h1 = null;\n\n    BaseEditor.prototype.h2 = null;\n\n    BaseEditor.prototype.h3 = null;\n\n    BaseEditor.prototype.h4 = null;\n\n    BaseEditor.prototype.h5 = null;\n\n    BaseEditor.prototype.h6 = null;\n\n    BaseEditor.prototype.bold = null;\n\n    BaseEditor.prototype.italic = null;\n\n    BaseEditor.prototype.underline = null;\n\n    BaseEditor.prototype.strike = null;\n\n    BaseEditor.prototype.superscript = null;\n\n    BaseEditor.prototype.subscript = null;\n\n    BaseEditor.prototype.anchor = null;\n\n    BaseEditor.prototype.image = null;\n\n    BaseEditor.prototype.unorderedList = null;\n\n    BaseEditor.prototype.orderedList = null;\n\n    return BaseEditor;\n\n  })(Panel);\n\n  TextEditor = (function(_super) {\n\n    __extends(TextEditor, _super);\n\n    function TextEditor(core, selector, context) {\n      var _this = this;\n      if (selector == null) {\n        selector = '<div>';\n      }\n      TextEditor.__super__.constructor.call(this, core, selector, context);\n      this.textarea = $('<textarea>').appendTo(this.element).css({\n        'margin': '0',\n        'padding': '0',\n        'border': 'none',\n        'outline': 'none',\n        'resize': 'none'\n      });\n      this.textarea = evolute(this.textarea);\n      this.textarea.on('keydown', function(e) {\n        if (e.which !== 13) {\n          return;\n        }\n        return _this.core.caretaker.save();\n      });\n      if (($.fn.tabby != null) && this.core.options.enableTabIndent) {\n        this.textarea.tabby({\n          'tabString': this.core.options.tabString\n        });\n      }\n      this.textarea = autoIndentable(this.textarea);\n      if (!this.core.options.enableAutoIndent) {\n        this.textarea.autoIndent.disable();\n      }\n      this.textarea.on('keypress keyup click blur', function() {\n        return _this.change();\n      });\n    }\n\n    TextEditor.prototype.val = function(value) {\n      if (value != null) {\n        this.textarea.val(value);\n        this.change();\n        return this;\n      }\n      return this.textarea.val();\n    };\n\n    TextEditor.prototype.focus = function() {\n      this.textarea.focus();\n      return this;\n    };\n\n    TextEditor.prototype.createMemento = function() {\n      return this.val();\n    };\n\n    TextEditor.prototype.setMemento = function(memento) {\n      return this.val(memento);\n    };\n\n    TextEditor.prototype.adjust = function() {\n      this.textarea.outerWidth(this.element.width());\n      this.textarea.outerHeight(this.element.height());\n      return this;\n    };\n\n    TextEditor.prototype.selection = function(str, keepSelection) {\n      if (keepSelection == null) {\n        keepSelection = true;\n      }\n      if (str != null) {\n        this.textarea.selection.text(str, keepSelection);\n        this.core.caretaker.save();\n        return this.change();\n      }\n      return this.textarea.selection.text();\n    };\n\n    TextEditor.prototype.enclose = function(b, a, keepSelection) {\n      var caret;\n      if (keepSelection == null) {\n        keepSelection = true;\n      }\n      caret = this.textarea.selection.caret();\n      if (caret[0] === caret[1]) {\n        this.textarea.selection.selectWholeCurrentLine();\n      }\n      this.textarea.selection.enclose(b, a, keepSelection);\n      this.core.caretaker.save();\n      return this.change();\n    };\n\n    TextEditor.prototype.insertBefore = function(str, keepSelection) {\n      var caret;\n      if (keepSelection == null) {\n        keepSelection = true;\n      }\n      caret = this.textarea.selection.caret();\n      if (caret[0] === caret[1]) {\n        this.textarea.selection.selectWholeCurrentLine();\n      }\n      this.textarea.selection.insertBefore(str, keepSelection);\n      this.core.caretaker.save();\n      return this.change();\n    };\n\n    TextEditor.prototype.insertAfter = function(str, keepSelection) {\n      var caret;\n      if (keepSelection == null) {\n        keepSelection = true;\n      }\n      caret = this.textarea.selection.caret();\n      if (caret[0] === caret[1]) {\n        this.textarea.selection.selectWholeCurrentLine();\n      }\n      this.textarea.selection.insertAfter(str, keepSelection);\n      this.core.caretaker.save();\n      return this.change();\n    };\n\n    return TextEditor;\n\n  })(BaseEditor);\n\n  namespace('Jencil.ui.widgets.editors', function(exports) {\n    exports.BaseEditor = BaseEditor;\n    return exports.TextEditor = TextEditor;\n  });\n\n  BaseViewer = (function(_super) {\n\n    __extends(BaseViewer, _super);\n\n    function BaseViewer(core, selector, context) {\n      if (selector == null) {\n        selector = '<div>';\n      }\n      BaseViewer.__super__.constructor.call(this, core, selector, context);\n      this.element.addClass('viewer');\n    }\n\n    BaseViewer.prototype.update = function(value, force) {\n      throw new Error(\"NotImplementedError\");\n    };\n\n    return BaseViewer;\n\n  })(Panel);\n\n  TemplateViewer = (function(_super) {\n\n    __extends(TemplateViewer, _super);\n\n    function TemplateViewer(core) {\n      TemplateViewer.__super__.constructor.call(this, core);\n      this.templatePath = this.core.options.viewerTemplatePath;\n      this.element.css({\n        'position': 'relative'\n      });\n      this.curtain = curtainFactory(this.element);\n      this.iframe = $('<iframe>').appendTo(this.element).css({\n        margin: '0',\n        padding: '0',\n        border: 'none',\n        outline: 'none',\n        resize: 'none',\n        width: '100%',\n        height: '100%',\n        overflow: 'visible'\n      });\n      this.iframe.attr('frameborder', 0);\n      this.iframe = evolute(this.iframe);\n      this.iframe.init = function() {\n        var iframe;\n        iframe = this.get(0);\n        if (iframe.contentDocument != null) {\n          this.document = iframe.contentDocument;\n        } else {\n          this.document = iframe.contentWindow.document;\n        }\n        return this.document.write('<body></body>');\n      };\n      this.iframe.write = function(value) {\n        var scrollTop;\n        if (this.document != null) {\n          try {\n            scrollTop = this.document.documentElement.scrollTop;\n          } catch (e) {\n            scrollTop = 0;\n          }\n          this.document.open();\n          this.document.write(value);\n          this.document.close();\n          this.document.documentElement.scrollTop = scrollTop;\n          this.width(this.document.scrollLeft);\n          this.height(this.document.scrollTop);\n          return true;\n        }\n        return false;\n      };\n      this.iframe.loadTemplate = function(templatePath, value) {\n        var _this = this;\n        return $.ajax({\n          url: templatePath,\n          success: function(data) {\n            _this._template = data;\n            return _this.write(value);\n          }\n        });\n      };\n    }\n\n    TemplateViewer.prototype.init = function() {\n      return this.iframe.init();\n    };\n\n    TemplateViewer.prototype.update = function(value, force) {\n      if (this.iframe._template != null) {\n        value = this.iframe._template.replace(\"{{content}}\", value);\n      } else if (this.templatePath != null) {\n        this.iframe.loadTemplate(this.templatePath, value);\n      }\n      return this.iframe.write(value);\n    };\n\n    TemplateViewer.prototype.adjust = function() {\n      this.iframe.outerWidth(this.element.width());\n      this.iframe.outerHeight(this.element.height());\n      return this;\n    };\n\n    return TemplateViewer;\n\n  })(BaseViewer);\n\n  AjaxViewer = (function(_super) {\n\n    __extends(AjaxViewer, _super);\n\n    function AjaxViewer(core, config) {\n      this.config = config;\n      AjaxViewer.__super__.constructor.call(this, core);\n      this.config = jQuery.extend({\n        type: 'GET',\n        dataType: 'text',\n        data: function(value) {\n          return encodeURIComponent(value);\n        },\n        url: null\n      }, this.config);\n    }\n\n    AjaxViewer.prototype.update = function(value, force) {\n      var _this = this;\n      if (this._valueCache !== value || force) {\n        this._valueCache = value;\n        return $.ajax({\n          type: this.config.type,\n          dataType: this.config.dataType,\n          data: JSON.stringify(this.config.data(value)),\n          url: this.config.url,\n          success: function(value) {\n            if (_this.iframe._template != null) {\n              value = _this.iframe._template.replace(\"{{content}}\", value);\n            } else if (_this.templatePath != null) {\n              _this.iframe.loadTemplate(_this.templatePath, value);\n            }\n            return _this.iframe.write(value);\n          }\n        });\n      }\n    };\n\n    return AjaxViewer;\n\n  })(TemplateViewer);\n\n  namespace('Jencil.ui.widgets.viewers', function(exports) {\n    exports.BaseViewer = BaseViewer;\n    exports.TemplateViewer = TemplateViewer;\n    return exports.AjaxViewer = AjaxViewer;\n  });\n\n  BaseHelper = (function(_super) {\n\n    __extends(BaseHelper, _super);\n\n    function BaseHelper(core, selector, context) {\n      if (selector == null) {\n        selector = '<div>';\n      }\n      BaseHelper.__super__.constructor.call(this, core, selector, context);\n      this.element.addClass('helper');\n    }\n\n    return BaseHelper;\n\n  })(Panel);\n\n  TemplateHelper = (function(_super) {\n\n    __extends(TemplateHelper, _super);\n\n    function TemplateHelper(core) {\n      TemplateHelper.__super__.constructor.call(this, core);\n      this.templatePath = this.core.options.helperTemplatePath;\n      this.element.css({\n        'position': 'relative'\n      });\n      this.curtain = curtainFactory(this.element);\n      this.iframe = $('<iframe>').appendTo(this.element).css({\n        margin: '0',\n        padding: '0',\n        border: 'none',\n        outline: 'none',\n        resize: 'none',\n        width: '100%',\n        height: '100%',\n        overflow: 'visible'\n      });\n      this.iframe.attr('frameborder', 0);\n      this.iframe = evolute(this.iframe);\n      this.iframe.init = function() {\n        var iframe;\n        iframe = this.get(0);\n        if (iframe.contentDocument != null) {\n          this.document = iframe.contentDocument;\n        } else {\n          this.document = iframe.contentWindow.document;\n        }\n        return this.document.write('<body></body>');\n      };\n      this.iframe.write = function(value) {\n        var scrollTop;\n        if (this.document != null) {\n          try {\n            scrollTop = this.document.documentElement.scrollTop;\n          } catch (e) {\n            scrollTop = 0;\n          }\n          this.document.open();\n          this.document.write(value);\n          this.document.close();\n          this.document.documentElement.scrollTop = scrollTop;\n          this.width(this.document.scrollLeft);\n          this.height(this.document.scrollTop);\n          return true;\n        }\n        return false;\n      };\n      this.iframe.loadTemplate = function(templatePath) {\n        var _this = this;\n        return $.ajax({\n          url: templatePath,\n          success: function(data) {\n            return _this.write(data);\n          }\n        });\n      };\n    }\n\n    TemplateHelper.prototype.init = function() {\n      this.iframe.init();\n      if (this.templatePath != null) {\n        return this.iframe.loadTemplate(this.templatePath);\n      }\n    };\n\n    TemplateHelper.prototype.adjust = function() {\n      this.iframe.outerWidth(this.element.width());\n      this.iframe.outerHeight(this.element.height());\n      return this;\n    };\n\n    return TemplateHelper;\n\n  })(BaseHelper);\n\n  namespace('Jencil.ui.widgets.helpers', function(exports) {\n    exports.BaseHelper = BaseHelper;\n    return exports.TemplateHelper = TemplateHelper;\n  });\n\n  Separator = (function(_super) {\n\n    __extends(Separator, _super);\n\n    function Separator(core) {\n      Separator.__super__.constructor.call(this, core, '<span>');\n      this.element.addClass('separator');\n    }\n\n    return Separator;\n\n  })(Widget);\n\n  Button = (function(_super) {\n\n    __extends(Button, _super);\n\n    function Button(core, name, text, title) {\n      this.name = name;\n      this.text = text;\n      this.title = title;\n      Button.__super__.constructor.call(this, core, '<a>');\n      this.text = Jencil.t(this.text || this.name);\n      this.title = Jencil.t(this.title || this.text);\n      this.element.addClass('button').addClass(name);\n      this.element.append($(\"<span>\" + this.text + \"</span>\"));\n      this.element.attr('title', this.title);\n    }\n\n    Button.prototype.enable = function() {\n      return this.element.removeClass('disable');\n    };\n\n    Button.prototype.disable = function() {\n      return this.element.addClass('disable');\n    };\n\n    Button.prototype.validate = function() {\n      return this;\n    };\n\n    return Button;\n\n  })(Widget);\n\n  ActionButton = (function(_super) {\n\n    __extends(ActionButton, _super);\n\n    function ActionButton(core, name, text, title, callback, shortcut) {\n      var _this = this;\n      this.shortcut = shortcut;\n      ActionButton.__super__.constructor.call(this, core, name, text, title);\n      this.callback = function() {\n        if (!_this.element.hasClass('disable')) {\n          return callback();\n        }\n      };\n      this.callback.raw = callback;\n      this.element.click(function() {\n        return _this.callback();\n      });\n      if ((this.shortcut != null) && (window.shortcut != null)) {\n        window.shortcut.add(this.shortcut, function(e) {\n          return _this.callback();\n        });\n        this.element.attr('title', \"\" + this.title + \" (\" + this.shortcut + \")\");\n      }\n    }\n\n    return ActionButton;\n\n  })(Button);\n\n  CommandButton = (function(_super) {\n\n    __extends(CommandButton, _super);\n\n    function CommandButton(core, name, text, title, command, shortcut) {\n      var callback;\n      this.command = command;\n      callback = function() {\n        var editor;\n        editor = core.editor();\n        return editor[command].call(editor);\n      };\n      CommandButton.__super__.constructor.call(this, core, name, text, title, callback, shortcut);\n    }\n\n    CommandButton.prototype.init = function() {\n      return this.validate();\n    };\n\n    CommandButton.prototype.validate = function() {\n      var editor;\n      editor = this.core.editor();\n      if (!(editor[this.command] != null)) {\n        this.disable();\n      }\n      return this;\n    };\n\n    CommandButton.factory = function(core, args) {\n      var command, name, shortcut, text, title;\n      name = text = title = command = shortcut = null;\n      switch (args.length) {\n        case 5:\n          name = args[0];\n          text = args[1];\n          title = args[2];\n          command = args[3];\n          shortcut = args[4];\n          break;\n        case 4:\n          name = args[0];\n          text = title = args[1];\n          command = args[2];\n          shortcut = args[3];\n          break;\n        case 3:\n          name = command = args[0];\n          text = title = args[1];\n          shortcut = args[2];\n          break;\n        case 2:\n          name = command = args[0];\n          text = title = args[1];\n          shortcut = null;\n          break;\n        case 1:\n          name = command = text = title = args[0];\n          shortcut = null;\n      }\n      return new CommandButton(core, name, text, title, command, shortcut);\n    };\n\n    return CommandButton;\n\n  })(ActionButton);\n\n  UndoButton = (function(_super) {\n\n    __extends(UndoButton, _super);\n\n    function UndoButton(core) {\n      var callback,\n        _this = this;\n      callback = function(e) {\n        return _this.core.caretaker.undo();\n      };\n      UndoButton.__super__.constructor.call(this, core, 'undo', 'Undo', 'Undo', callback, 'Ctrl+Z');\n    }\n\n    UndoButton.prototype.init = function() {\n      var check,\n        _this = this;\n      check = function() {\n        if (!_this.core.caretaker.canUndo()) {\n          _this.disable();\n        } else {\n          _this.enable();\n        }\n        return setTimeout(check, 100);\n      };\n      return check();\n    };\n\n    return UndoButton;\n\n  })(ActionButton);\n\n  RedoButton = (function(_super) {\n\n    __extends(RedoButton, _super);\n\n    function RedoButton(core) {\n      var callback,\n        _this = this;\n      callback = function(e) {\n        return _this.core.caretaker.redo();\n      };\n      RedoButton.__super__.constructor.call(this, core, 'redo', 'Redo', 'Redo', callback, 'Ctrl+Shift+Z');\n    }\n\n    RedoButton.prototype.init = function() {\n      var check,\n        _this = this;\n      check = function() {\n        if (!_this.core.caretaker.canRedo()) {\n          _this.disable();\n        } else {\n          _this.enable();\n        }\n        return setTimeout(check, 100);\n      };\n      return check();\n    };\n\n    return RedoButton;\n\n  })(ActionButton);\n\n  FullscreenButton = (function(_super) {\n\n    __extends(FullscreenButton, _super);\n\n    function FullscreenButton(core) {\n      var callback,\n        _this = this;\n      callback = function(e) {\n        return _this.core.fullscreen.toggle();\n      };\n      FullscreenButton.__super__.constructor.call(this, core, 'fullscreen', 'Toggle fullscreen', 'Fullscreen', callback, 'Ctrl+F');\n    }\n\n    FullscreenButton.prototype.init = function() {\n      var check,\n        _this = this;\n      check = function() {\n        if (_this.core.fullscreen.element.is(':visible')) {\n          _this.element.addClass('hide');\n        } else {\n          _this.element.removeClass('hide');\n        }\n        return setTimeout(check, 100);\n      };\n      return check();\n    };\n\n    return FullscreenButton;\n\n  })(ActionButton);\n\n  ViewerButton = (function(_super) {\n\n    __extends(ViewerButton, _super);\n\n    function ViewerButton(core) {\n      var callback,\n        _this = this;\n      callback = function(e) {\n        return _this.core.viewer().toggle();\n      };\n      ViewerButton.__super__.constructor.call(this, core, 'viewer', 'Quick view', 'Quick view', callback, 'Ctrl+Q');\n    }\n\n    ViewerButton.prototype.validate = function() {\n      if (!this.core.viewer()) {\n        this.disable();\n        return false;\n      }\n      return true;\n    };\n\n    ViewerButton.prototype.init = function() {\n      var check,\n        _this = this;\n      if (!this.validate()) {\n        return;\n      }\n      check = function() {\n        if (_this.core.viewer().element.is(':visible')) {\n          _this.element.addClass('hide');\n        } else {\n          _this.element.removeClass('hide');\n        }\n        return setTimeout(check, 100);\n      };\n      return check();\n    };\n\n    return ViewerButton;\n\n  })(ActionButton);\n\n  HelperButton = (function(_super) {\n\n    __extends(HelperButton, _super);\n\n    function HelperButton(core) {\n      var callback,\n        _this = this;\n      callback = function(e) {\n        return _this.core.helper().toggle();\n      };\n      HelperButton.__super__.constructor.call(this, core, 'helper', 'Help', 'Help', callback, 'Ctrl+H');\n    }\n\n    HelperButton.prototype.validate = function() {\n      if (!this.core.helper()) {\n        this.disable();\n        return false;\n      }\n      return true;\n    };\n\n    HelperButton.prototype.init = function() {\n      var check,\n        _this = this;\n      if (!this.validate()) {\n        return;\n      }\n      check = function() {\n        if (_this.core.helper().element.is(':visible')) {\n          _this.element.addClass('hide');\n        } else {\n          _this.element.removeClass('hide');\n        }\n        return setTimeout(check, 100);\n      };\n      return check();\n    };\n\n    return HelperButton;\n\n  })(ActionButton);\n\n  buttonFactory = function(core, value) {\n    if (value instanceof Array) {\n      return CommandButton.factory(core, value);\n    }\n    if (typeof value === 'string') {\n      switch (value) {\n        case 'Separator':\n          return new Separator(core);\n        case 'Undo':\n          return new UndoButton(core);\n        case 'Redo':\n          return new RedoButton(core);\n        case 'Fullscreen':\n          return new FullscreenButton(core);\n        case 'Viewer':\n          return new ViewerButton(core);\n        case 'Helper':\n          return new HelperButton(core);\n        default:\n          throw new Exception(\"\" + value + \" is not known Button type\");\n      }\n    }\n    return new value(core);\n  };\n\n  namespace('Jencil.ui.widgets.buttons', function(exports) {\n    exports.Separator = Separator;\n    exports.Button = Button;\n    exports.ActionButton = ActionButton;\n    exports.CommandButton = CommandButton;\n    exports.UndoButton = UndoButton;\n    exports.RedoButton = RedoButton;\n    exports.FullscreenButton = FullscreenButton;\n    exports.ViewerButton = ViewerButton;\n    return exports.HelperButton = HelperButton;\n  });\n\n  Wrapper = (function(_super) {\n\n    __extends(Wrapper, _super);\n\n    function Wrapper(core, width, height) {\n      Wrapper.__super__.constructor.call(this, core);\n      this.element.addClass('jencil wrapper');\n      this.element.width(width);\n      this.element.height(height);\n      this.workspace = new Workspace(this.core);\n      this.workspace.element.appendTo(this.element);\n    }\n\n    Wrapper.prototype.init = function() {\n      var _this = this;\n      if ((this.element.resizable != null) && this.core.options.resizable === true) {\n        this.element.resizable({\n          start: function() {\n            var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;\n            if ((_ref = _this.core.editor()) != null) {\n              if ((_ref1 = _ref.curtain) != null) {\n                _ref1.on();\n              }\n            }\n            if ((_ref2 = _this.core.viewer()) != null) {\n              if ((_ref3 = _ref2.curtain) != null) {\n                _ref3.on();\n              }\n            }\n            return (_ref4 = _this.core.helper()) != null ? (_ref5 = _ref4.curtain) != null ? _ref5.on() : void 0 : void 0;\n          },\n          resize: function() {\n            var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;\n            if ((_ref = _this.core.editor()) != null) {\n              if ((_ref1 = _ref.curtain) != null) {\n                _ref1.refresh();\n              }\n            }\n            if ((_ref2 = _this.core.viewer()) != null) {\n              if ((_ref3 = _ref2.curtain) != null) {\n                _ref3.refresh();\n              }\n            }\n            if ((_ref4 = _this.core.helper()) != null) {\n              if ((_ref5 = _ref4.curtain) != null) {\n                _ref5.refresh();\n              }\n            }\n            return _this.adjust();\n          },\n          stop: function() {\n            var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;\n            if ((_ref = _this.core.editor()) != null) {\n              if ((_ref1 = _ref.curtain) != null) {\n                _ref1.off();\n              }\n            }\n            if ((_ref2 = _this.core.viewer()) != null) {\n              if ((_ref3 = _ref2.curtain) != null) {\n                _ref3.off();\n              }\n            }\n            if ((_ref4 = _this.core.helper()) != null) {\n              if ((_ref5 = _ref4.curtain) != null) {\n                _ref5.off();\n              }\n            }\n            return _this.adjust();\n          }\n        });\n      }\n      return this.workspace.init();\n    };\n\n    Wrapper.prototype.adjust = function() {\n      this.workspace.element.outerWidth(true, this.element.width());\n      this.workspace.element.outerHeight(true, this.element.height());\n      this.workspace.adjust();\n      return this;\n    };\n\n    return Wrapper;\n\n  })(Panel);\n\n  Workspace = (function(_super) {\n\n    __extends(Workspace, _super);\n\n    function Workspace(core) {\n      Workspace.__super__.constructor.call(this, core);\n      this.element.addClass('workspace');\n      this.profile(core.options.profile);\n    }\n\n    Workspace.prototype.profile = function(profile) {\n      var button, _i, _j, _len, _len1, _ref, _ref1,\n        _this = this;\n      if (profile != null) {\n        if (typeof profile === 'string') {\n          profile = this.core.options.profiles[profile];\n        }\n        profile = jQuery.extend(DefaultProfile, profile);\n        profile.defaultVolume = this.core.options.defaultVolume || profile.defaultVolume;\n        profile.defaultVolume2 = this.core.options.defaultVolume2 || profile.defaultVolume2;\n        this.element.empty();\n        this.mainPanel = new profile.mainPanelClass(this.core, profile);\n        this.mainPanel.editorPanel.change(function(value) {\n          return _this.core.element.val(value);\n        });\n        this.toolbar = new Toolbar(this.core);\n        _ref = profile.toolbarButtons;\n        for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n          button = _ref[_i];\n          button = buttonFactory(this.core, button);\n          this.toolbar.addButton(button);\n        }\n        this.statusbar = new Statusbar(this.core);\n        _ref1 = profile.statusbarButtons;\n        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {\n          button = _ref1[_j];\n          button = buttonFactory(this.core, button);\n          this.statusbar.addButton(button);\n        }\n        this.element.append(this.toolbar.element);\n        this.element.append(this.mainPanel.element);\n        this.element.append(this.statusbar.element);\n        this._profile = profile;\n        return this;\n      }\n      return this._profile;\n    };\n\n    Workspace.prototype.init = function() {\n      this.toolbar.init();\n      this.statusbar.init();\n      return this.mainPanel.init();\n    };\n\n    Workspace.prototype.adjust = function() {\n      var offset1, offset2;\n      this.toolbar.element.outerWidth(true, this.element.width());\n      this.statusbar.element.outerWidth(true, this.element.width());\n      this.mainPanel.element.outerWidth(true, this.element.width());\n      this.mainPanel.element.outerHeight(true, this.element.height());\n      this.mainPanel.adjust();\n      offset1 = this.toolbar.element.outerHeight(true);\n      offset2 = this.statusbar.element.outerHeight(true);\n      this.mainPanel.element.outerHeight(true, this.element.height() - (offset1 + offset2));\n      this.toolbar.adjust();\n      this.statusbar.adjust();\n      this.mainPanel.adjust();\n      return this;\n    };\n\n    Workspace.prototype.update = function(force) {\n      if (this.mainPanel.editorPanel && this.mainPanel.viewerPanel) {\n        return this.mainPanel.viewerPanel.update(this.mainPanel.editorPanel.val(), force);\n      }\n    };\n\n    return Workspace;\n\n  })(Panel);\n\n  Bar = (function(_super) {\n\n    __extends(Bar, _super);\n\n    function Bar(core) {\n      Bar.__super__.constructor.call(this, core);\n      this._buttons = [];\n    }\n\n    Bar.prototype.init = function() {\n      var button, _i, _len, _ref;\n      _ref = this._buttons;\n      for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n        button = _ref[_i];\n        button.init();\n      }\n      return this;\n    };\n\n    Bar.prototype.addButton = function(button) {\n      this._buttons.push(button);\n      return this.element.append(button.element);\n    };\n\n    return Bar;\n\n  })(Panel);\n\n  Toolbar = (function(_super) {\n\n    __extends(Toolbar, _super);\n\n    function Toolbar(core) {\n      Toolbar.__super__.constructor.call(this, core);\n      this.element.addClass('toolbar');\n    }\n\n    return Toolbar;\n\n  })(Bar);\n\n  Statusbar = (function(_super) {\n\n    __extends(Statusbar, _super);\n\n    function Statusbar(core) {\n      Statusbar.__super__.constructor.call(this, core);\n      this.element.addClass('statusbar');\n    }\n\n    return Statusbar;\n\n  })(Bar);\n\n  MonomainPanel = (function() {\n\n    function MonomainPanel(core, profile) {\n      var editorPanel;\n      editorPanel = new profile.editorClass(core);\n      editorPanel.element.addClass('mainPanel');\n      return editorPanel;\n    }\n\n    return MonomainPanel;\n\n  })();\n\n  DimainPanel = (function(_super) {\n\n    __extends(DimainPanel, _super);\n\n    function DimainPanel(core, profile) {\n      var _this = this;\n      this.editorPanel = new profile.editorClass(core);\n      this.viewerPanel = new profile.viewerClass(core);\n      DimainPanel.__super__.constructor.call(this, core, this.editorPanel, this.viewerPanel, profile.defaultVolume);\n      this.element.addClass('mainPanel');\n      this.editorPanel.change(function(value) {\n        return _this.viewerPanel.update(value);\n      });\n    }\n\n    return DimainPanel;\n\n  })(VerticalPanel);\n\n  TrimainPanel = (function(_super) {\n\n    __extends(TrimainPanel, _super);\n\n    function TrimainPanel(core, profile) {\n      var _this = this;\n      this.editorPanel = new profile.editorClass(core);\n      this.viewerPanel = new profile.viewerClass(core);\n      this.helperPanel = new profile.helperClass(core);\n      this.verticalPanel = new VerticalPanel(core, this.editorPanel, this.viewerPanel, profile.defaultVolume);\n      TrimainPanel.__super__.constructor.call(this, core, this.verticalPanel, this.helperPanel, profile.defaultVolume2);\n      this.element.addClass('mainPanel');\n      this.editorPanel.change(function(value) {\n        return _this.viewerPanel.update(value);\n      });\n    }\n\n    return TrimainPanel;\n\n  })(HorizontalPanel);\n\n  namespace('Jencil.ui.widgets.panels', function(exports) {\n    exports.MonomainPanel = MonomainPanel;\n    exports.DimainPanel = DimainPanel;\n    return exports.TrimainPanel = TrimainPanel;\n  });\n\n  Fullscreen = (function(_super) {\n\n    __extends(Fullscreen, _super);\n\n    function Fullscreen(core) {\n      var _this = this;\n      Fullscreen.__super__.constructor.call(this, core);\n      this.element.addClass('fullscreen');\n      this.element.css({\n        'position': 'fixed',\n        'top': '0',\n        'left': '0',\n        'width': '100%',\n        'height': '100%'\n      });\n      this.curtain = $('<div>').addClass('curtain');\n      this.curtain.css({\n        'position': 'absolute',\n        'top': '0',\n        'left': '0',\n        'width': '100%',\n        'height': '100%',\n        'background': 'black',\n        'opacity': '0.6',\n        'cursor': 'pointer'\n      });\n      this.cell = $('<div>').css({\n        'position': 'absolute',\n        'top': '5%',\n        'left': '5%',\n        'width': '90%',\n        'height': '90%'\n      });\n      if ($.browser.msie && $.browser.version < 7) {\n        this.element.css('position', 'absolute');\n        $(window).scroll(function() {\n          return _this.element.css('top', $(document).scrollTop());\n        });\n      }\n      this.curtain.click(function() {\n        return _this.off();\n      });\n      this.element.append(this.curtain);\n      this.element.append(this.cell);\n      this.element.hide();\n      this.resize = function() {\n        return _this.core.wrapper.adjust();\n      };\n    }\n\n    Fullscreen.prototype.on = function() {\n      var ratio,\n        _this = this;\n      ratio = 9.0 / 10;\n      this.cell.append(this.core.wrapper.element);\n      this.core.wrapper.element.outerWidth(true, this.element.width() * ratio);\n      this.core.wrapper.element.outerHeight(true, this.element.height() * ratio);\n      this.core.wrapper.init();\n      this.core.wrapper.adjust();\n      this.core.wrapper.workspace.update(true);\n      this.element.fadeIn('fast', function() {\n        _this.core.wrapper.element.css('width', \"100%\");\n        _this.core.wrapper.element.css('height', \"100%\");\n        return _this.core.wrapper.adjust();\n      });\n      return $(window).on('resize', this.resize);\n    };\n\n    Fullscreen.prototype.off = function() {\n      this.core.element.after(this.core.wrapper.element);\n      this.core.wrapper.element.css('width', \"\");\n      this.core.wrapper.element.css('height', \"\");\n      this.core.wrapper.init();\n      this.core.wrapper.adjust();\n      this.core.wrapper.workspace.update(true);\n      this.element.fadeOut('fast');\n      return $(window).unbind('resize', this.resize);\n    };\n\n    Fullscreen.prototype.toggle = function(callbackOn, callbackOff) {\n      if (this.element.is(':visible')) {\n        this.off();\n        return typeof callbackOff === \"function\" ? callbackOff() : void 0;\n      } else {\n        this.on();\n        return typeof callbackOn === \"function\" ? callbackOn() : void 0;\n      }\n    };\n\n    return Fullscreen;\n\n  })(Panel);\n\n  autoIndentableHtml = (function() {\n    var PATTERNS, post, pre, x;\n    PATTERNS = (function() {\n      var _i, _len, _ref, _results;\n      _ref = ['p', 'li'];\n      _results = [];\n      for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n        x = _ref[_i];\n        _results.push([x, new RegExp(\"^[\\s\\t]*<\" + x + \">\"), new RegExp(\"</\" + x + \">[\\s\\t]*$\")]);\n      }\n      return _results;\n    })();\n    pre = function(e, line) {\n      var lineCaret, pattern, _i, _len;\n      console.log(\"@\", this);\n      if (e.shiftKey) {\n        return;\n      }\n      for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {\n        pattern = PATTERNS[_i];\n        if (pattern[1].test(line) || pattern[2].test(line)) {\n          lineCaret = this.selection._getLineCaret();\n          this.selection.caret(lineCaret[1]);\n          return;\n        }\n      }\n    };\n    post = function(e, line, indent, insert) {\n      var pattern, _i, _len;\n      if (e.shiftKey) {\n        return;\n      }\n      for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {\n        pattern = PATTERNS[_i];\n        if (pattern[2].test(line)) {\n          x = pattern[0];\n          this.selection.insertAfter(\"<\" + x + \"></\" + x + \">\", false);\n          this.selection.caretOffset(-(3 + x.length));\n          return;\n        }\n      }\n    };\n    return function(textarea) {\n      if (!(textarea.autoIndent != null)) {\n        textarea = autoIndentable(textarea);\n      }\n      textarea.autoIndent.pre = function(e, line) {\n        return pre.call(textarea, e, line);\n      };\n      textarea.autoIndent.post = function(e, line, indent, insert) {\n        return post.call(textarea, e, line, indent, insert);\n      };\n      return textarea;\n    };\n  })();\n\n  headerMarkup = (function() {\n    var PATTERN;\n    PATTERN = new RegExp(\"^<h([1-6])>(.*)</h[1-6]>\\n?$\");\n    return function(n) {\n      var caret, replacement, text;\n      caret = this.textarea.selection.caret();\n      if (caret[0] === caret[1]) {\n        this.textarea.selection.selectWholeCurrentLine();\n      }\n      text = this.selection();\n      if (PATTERN.test(text)) {\n        if (RegExp.$1 === n.toString()) {\n          replacement = RegExp.$2;\n        } else {\n          replacement = \"<h\" + n + \">\" + RegExp.$2 + \"</h\" + n + \">\";\n        }\n        return this.selection(replacement);\n      } else {\n        return this.enclose(\"<h\" + n + \">\", \"</h\" + n + \">\\n\");\n      }\n    };\n  })();\n\n  HtmlEditor = (function(_super) {\n\n    __extends(HtmlEditor, _super);\n\n    function HtmlEditor(core) {\n      HtmlEditor.__super__.constructor.call(this, core);\n      this.textarea = autoIndentableHtml(this.textarea);\n    }\n\n    HtmlEditor.prototype.h1 = function() {\n      return headerMarkup.call(this, 1);\n    };\n\n    HtmlEditor.prototype.h2 = function() {\n      return headerMarkup.call(this, 2);\n    };\n\n    HtmlEditor.prototype.h3 = function() {\n      return headerMarkup.call(this, 3);\n    };\n\n    HtmlEditor.prototype.h4 = function() {\n      return headerMarkup.call(this, 4);\n    };\n\n    HtmlEditor.prototype.h5 = function() {\n      return headerMarkup.call(this, 5);\n    };\n\n    HtmlEditor.prototype.h6 = function() {\n      return headerMarkup.call(this, 6);\n    };\n\n    HtmlEditor.prototype.bold = function() {\n      return this.enclose(\"<b>\", \"</b>\");\n    };\n\n    HtmlEditor.prototype.italic = function() {\n      return this.enclose(\"<i>\", \"</i>\");\n    };\n\n    HtmlEditor.prototype.underline = function() {\n      return this.enclose(\"<u>\", \"</u>\");\n    };\n\n    HtmlEditor.prototype.strike = function() {\n      return this.enclose(\"<s>\", \"</s>\");\n    };\n\n    HtmlEditor.prototype.superscript = function() {\n      return this.enclose(\"<sup>\", \"</sup>\");\n    };\n\n    HtmlEditor.prototype.subscript = function() {\n      return this.enclose(\"<sub>\", \"</sub>\");\n    };\n\n    HtmlEditor.prototype.quote = function() {\n      return this.enclose(\"<q>\", \"</q>\");\n    };\n\n    HtmlEditor.prototype.blockquote = function() {\n      return this.enclose(\"\\n<blockquote>\", \"</blockquote>\\n\");\n    };\n\n    HtmlEditor.prototype.code = function() {\n      return this.enclose(\"<code>\", \"</code>\");\n    };\n\n    HtmlEditor.prototype.pre = function() {\n      return this.enclose(\"<pre>\", \"</pre>\");\n    };\n\n    HtmlEditor.prototype.anchorLink = function() {\n      var href, text;\n      text = this.selection();\n      if (!text) {\n        text = window.prompt(\"Please input a link text\", \"Here\");\n      }\n      href = window.prompt(\"Please input a link url\", \"http://\");\n      if (!(href != null)) {\n        return;\n      }\n      return this.selection(\"<a href='\" + href + \"'>\" + text + \"</a>\");\n    };\n\n    HtmlEditor.prototype.image = function() {\n      var alt, src;\n      src = window.prompt(\"Please input a image url\", \"http://\");\n      alt = window.prompt(\"(Optional) Please input a alt message\", \"Image\");\n      if (!(src != null)) {\n        return;\n      }\n      return this.selection(\"<img src='\" + src + \"' alt='\" + alt + \"'>\");\n    };\n\n    HtmlEditor.prototype.unorderedList = function() {\n      var text, x;\n      text = this.selection();\n      text = (function() {\n        var _i, _len, _ref, _results;\n        _ref = text.split(\"\\n\");\n        _results = [];\n        for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n          x = _ref[_i];\n          _results.push(\"  <li>\" + x + \"</li>\");\n        }\n        return _results;\n      })();\n      text.unshift(\"<ul>\");\n      text.push(\"</ul>\");\n      return this.selection(text.join(\"\\n\"));\n    };\n\n    HtmlEditor.prototype.orderedList = function() {\n      var text, x;\n      text = this.selection();\n      text = (function() {\n        var _i, _len, _ref, _results;\n        _ref = text.split(\"\\n\");\n        _results = [];\n        for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n          x = _ref[_i];\n          _results.push(\"  <li>\" + x + \"</li>\");\n        }\n        return _results;\n      })();\n      text.unshift(\"<ol>\");\n      text.push(\"</ol>\");\n      return this.selection(text.join(\"\\n\"));\n    };\n\n    return HtmlEditor;\n\n  })(Jencil.ui.widgets.editors.TextEditor);\n\n  Jencil.utils.namespace('Jencil.ui.widgets.editors', function(exports) {\n    return exports.HtmlEditor = HtmlEditor;\n  });\n\n  HtmlViewer = Jencil.ui.widgets.viewers.TemplateViewer;\n\n  Jencil.utils.namespace('Jencil.ui.widgets.viewers', function(exports) {\n    return exports.HtmlViewer = HtmlViewer;\n  });\n\n  HtmlHelper = (function(_super) {\n\n    __extends(HtmlHelper, _super);\n\n    function HtmlHelper(core) {\n      var HTML_HELPER_HTML;\n      HtmlHelper.__super__.constructor.call(this, core);\n      HTML_HELPER_HTML = \"<p><span class=\\\"key\\\">Ctrl+Z</span>\" + (Jencil.t(\"Undo\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+Shift+Z</span>\" + (Jencil.t(\"Undo\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+B</span>\" + (Jencil.t(\"Make selected text property as <b>Bold</b>\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+I</span>\" + (Jencil.t(\"Make selected text property as <i>Italic</i>\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+U</span>\" + (Jencil.t(\"Underline selected text like <u>Underline</u>\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+F</span>\" + (Jencil.t(\"Toggle fullscreen mode\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+Q</span>\" + (Jencil.t(\"Toggle quick view\")) + \"<p>\\n<p><span class=\\\"key\\\">Ctrl+H</span>\" + (Jencil.t(\"Toggle help\")) + \"<p>\";\n      this.element.html(HTML_HELPER_HTML);\n    }\n\n    return HtmlHelper;\n\n  })(Jencil.ui.widgets.helpers.BaseHelper);\n\n  namespace('Jencil.ui.widgets.helpers', function(exports) {\n    return exports.HtmlHelper = HtmlHelper;\n  });\n\n  HtmlProfile = {\n    mainPanelClass: Jencil.ui.widgets.panels.TrimainPanel,\n    editorClass: HtmlEditor,\n    viewerClass: HtmlViewer,\n    helperClass: HtmlHelper,\n    defaultVolume: 1,\n    defaultVolume2: 0.7,\n    toolbarButtons: ['Undo', 'Redo', 'Separator', ['h1', 'H1'], ['h2', 'H2'], ['h3', 'H3'], ['h4', 'H4'], ['h5', 'H5'], ['h6', 'H6'], 'Separator', ['bold', 'Bold', 'Ctrl+B'], ['italic', 'Italic', 'Ctrl+I'], ['underline', 'Underline', 'Ctrl+U'], ['strike', 'Strikeout'], ['superscript', 'Superscript'], ['subscript', 'Subscript'], 'Separator', ['anchorLink', 'Anchor link'], ['image', 'Image'], ['unorderedList', 'Unordered list'], ['orderedList', 'Ordered list'], ['quote', 'Quote'], ['blockquote', 'Blockquote'], ['code', 'Code'], ['pre', 'Pre'], 'Separator', 'Fullscreen'],\n    statusbarButtons: ['Viewer', 'Helper']\n  };\n\n  Jencil.utils.namespace('Jencil.profiles', function(exports) {\n    return exports.HtmlProfile = HtmlProfile;\n  });\n\n}).call(this);\n");
__$coverInitRange("js/Jencil.0.1.2.js", "1119:6794");
__$coverInitRange("js/Jencil.0.1.2.js", "8805:18653");
__$coverInitRange("js/Jencil.0.1.2.js", "18657:98255");
__$coverInitRange("js/Jencil.0.1.2.js", "1290:1432");
__$coverInitRange("js/Jencil.0.1.2.js", "1433:1590");
__$coverInitRange("js/Jencil.0.1.2.js", "1595:1615");
__$coverInitRange("js/Jencil.0.1.2.js", "1619:1694");
__$coverInitRange("js/Jencil.0.1.2.js", "1698:1712");
__$coverInitRange("js/Jencil.0.1.2.js", "1716:1773");
__$coverInitRange("js/Jencil.0.1.2.js", "1820:5860");
__$coverInitRange("js/Jencil.0.1.2.js", "5861:5972");
__$coverInitRange("js/Jencil.0.1.2.js", "6015:6191");
__$coverInitRange("js/Jencil.0.1.2.js", "1477:1586");
__$coverInitRange("js/Jencil.0.1.2.js", "1515:1581");
__$coverInitRange("js/Jencil.0.1.2.js", "1848:1869");
__$coverInitRange("js/Jencil.0.1.2.js", "1878:2199");
__$coverInitRange("js/Jencil.0.1.2.js", "2237:2305");
__$coverInitRange("js/Jencil.0.1.2.js", "2310:2365");
__$coverInitRange("js/Jencil.0.1.2.js", "2374:2403");
__$coverInitRange("js/Jencil.0.1.2.js", "2459:2488");
__$coverInitRange("js/Jencil.0.1.2.js", "2545:2587");
__$coverInitRange("js/Jencil.0.1.2.js", "2721:2731");
__$coverInitRange("js/Jencil.0.1.2.js", "2860:3170");
__$coverInitRange("js/Jencil.0.1.2.js", "3171:3931");
__$coverInitRange("js/Jencil.0.1.2.js", "3932:4149");
__$coverInitRange("js/Jencil.0.1.2.js", "4179:4222");
__$coverInitRange("js/Jencil.0.1.2.js", "4227:4272");
__$coverInitRange("js/Jencil.0.1.2.js", "4277:4318");
__$coverInitRange("js/Jencil.0.1.2.js", "4323:4368");
__$coverInitRange("js/Jencil.0.1.2.js", "4398:5228");
__$coverInitRange("js/Jencil.0.1.2.js", "5237:5853");
__$coverInitRange("js/Jencil.0.1.2.js", "1967:1978");
__$coverInitRange("js/Jencil.0.1.2.js", "1984:2061");
__$coverInitRange("js/Jencil.0.1.2.js", "2067:2117");
__$coverInitRange("js/Jencil.0.1.2.js", "2124:2194");
__$coverInitRange("js/Jencil.0.1.2.js", "4463:5223");
__$coverInitRange("js/Jencil.0.1.2.js", "4504:4508");
__$coverInitRange("js/Jencil.0.1.2.js", "4515:4543");
__$coverInitRange("js/Jencil.0.1.2.js", "4581:4585");
__$coverInitRange("js/Jencil.0.1.2.js", "4592:4621");
__$coverInitRange("js/Jencil.0.1.2.js", "4657:4661");
__$coverInitRange("js/Jencil.0.1.2.js", "4668:4695");
__$coverInitRange("js/Jencil.0.1.2.js", "4731:4735");
__$coverInitRange("js/Jencil.0.1.2.js", "4742:4770");
__$coverInitRange("js/Jencil.0.1.2.js", "4832:4864");
__$coverInitRange("js/Jencil.0.1.2.js", "4909:4940");
__$coverInitRange("js/Jencil.0.1.2.js", "4994:5217");
__$coverInitRange("js/Jencil.0.1.2.js", "5037:5210");
__$coverInitRange("js/Jencil.0.1.2.js", "5136:5169");
__$coverInitRange("js/Jencil.0.1.2.js", "5179:5202");
__$coverInitRange("js/Jencil.0.1.2.js", "5494:5505");
__$coverInitRange("js/Jencil.0.1.2.js", "5513:5848");
__$coverInitRange("js/Jencil.0.1.2.js", "5639:5660");
__$coverInitRange("js/Jencil.0.1.2.js", "5667:5688");
__$coverInitRange("js/Jencil.0.1.2.js", "5740:5823");
__$coverInitRange("js/Jencil.0.1.2.js", "5830:5842");
__$coverInitRange("js/Jencil.0.1.2.js", "5771:5790");
__$coverInitRange("js/Jencil.0.1.2.js", "5798:5816");
__$coverInitRange("js/Jencil.0.1.2.js", "6324:6381");
__$coverInitRange("js/Jencil.0.1.2.js", "6385:6439");
__$coverInitRange("js/Jencil.0.1.2.js", "6443:6493");
__$coverInitRange("js/Jencil.0.1.2.js", "6494:6513");
__$coverInitRange("js/Jencil.0.1.2.js", "6517:6544");
__$coverInitRange("js/Jencil.0.1.2.js", "6548:6575");
__$coverInitRange("js/Jencil.0.1.2.js", "6579:6613");
__$coverInitRange("js/Jencil.0.1.2.js", "6618:6788");
__$coverInitRange("js/Jencil.0.1.2.js", "8846:10358");
__$coverInitRange("js/Jencil.0.1.2.js", "10403:10506");
__$coverInitRange("js/Jencil.0.1.2.js", "10509:10583");
__$coverInitRange("js/Jencil.0.1.2.js", "10623:10747");
__$coverInitRange("js/Jencil.0.1.2.js", "10748:10748");
__$coverInitRange("js/Jencil.0.1.2.js", "10752:11148");
__$coverInitRange("js/Jencil.0.1.2.js", "11173:11231");
__$coverInitRange("js/Jencil.0.1.2.js", "11236:14173");
__$coverInitRange("js/Jencil.0.1.2.js", "14178:18622");
__$coverInitRange("js/Jencil.0.1.2.js", "8947:9000");
__$coverInitRange("js/Jencil.0.1.2.js", "9004:9036");
__$coverInitRange("js/Jencil.0.1.2.js", "9091:10354");
__$coverInitRange("js/Jencil.0.1.2.js", "9124:9139");
__$coverInitRange("js/Jencil.0.1.2.js", "9185:9247");
__$coverInitRange("js/Jencil.0.1.2.js", "9256:10345");
__$coverInitRange("js/Jencil.0.1.2.js", "9296:9327");
__$coverInitRange("js/Jencil.0.1.2.js", "9333:9366");
__$coverInitRange("js/Jencil.0.1.2.js", "9561:9649");
__$coverInitRange("js/Jencil.0.1.2.js", "9655:9742");
__$coverInitRange("js/Jencil.0.1.2.js", "9754:10017");
__$coverInitRange("js/Jencil.0.1.2.js", "9576:9595");
__$coverInitRange("js/Jencil.0.1.2.js", "9597:9648");
__$coverInitRange("js/Jencil.0.1.2.js", "9670:9688");
__$coverInitRange("js/Jencil.0.1.2.js", "9691:9741");
__$coverInitRange("js/Jencil.0.1.2.js", "9807:9823");
__$coverInitRange("js/Jencil.0.1.2.js", "9859:9876");
__$coverInitRange("js/Jencil.0.1.2.js", "9878:9925");
__$coverInitRange("js/Jencil.0.1.2.js", "9932:9992");
__$coverInitRange("js/Jencil.0.1.2.js", "9999:10011");
__$coverInitRange("js/Jencil.0.1.2.js", "10062:10116");
__$coverInitRange("js/Jencil.0.1.2.js", "10240:10338");
__$coverInitRange("js/Jencil.0.1.2.js", "10301:10320");
__$coverInitRange("js/Jencil.0.1.2.js", "10439:10503");
__$coverInitRange("js/Jencil.0.1.2.js", "10648:10744");
__$coverInitRange("js/Jencil.0.1.2.js", "10799:10825");
__$coverInitRange("js/Jencil.0.1.2.js", "10954:11116");
__$coverInitRange("js/Jencil.0.1.2.js", "11123:11145");
__$coverInitRange("js/Jencil.0.1.2.js", "11278:11303");
__$coverInitRange("js/Jencil.0.1.2.js", "11307:11330");
__$coverInitRange("js/Jencil.0.1.2.js", "11473:14170");
__$coverInitRange("js/Jencil.0.1.2.js", "11507:12618");
__$coverInitRange("js/Jencil.0.1.2.js", "11639:12396");
__$coverInitRange("js/Jencil.0.1.2.js", "11723:11806");
__$coverInitRange("js/Jencil.0.1.2.js", "11872:11881");
__$coverInitRange("js/Jencil.0.1.2.js", "11888:11969");
__$coverInitRange("js/Jencil.0.1.2.js", "12196:12281");
__$coverInitRange("js/Jencil.0.1.2.js", "12348:12357");
__$coverInitRange("js/Jencil.0.1.2.js", "12364:12390");
__$coverInitRange("js/Jencil.0.1.2.js", "12430:12508");
__$coverInitRange("js/Jencil.0.1.2.js", "12514:12523");
__$coverInitRange("js/Jencil.0.1.2.js", "12532:12613");
__$coverInitRange("js/Jencil.0.1.2.js", "12804:12835");
__$coverInitRange("js/Jencil.0.1.2.js", "12840:12865");
__$coverInitRange("js/Jencil.0.1.2.js", "12870:12880");
__$coverInitRange("js/Jencil.0.1.2.js", "12906:12916");
__$coverInitRange("js/Jencil.0.1.2.js", "12940:12955");
__$coverInitRange("js/Jencil.0.1.2.js", "12960:13167");
__$coverInitRange("js/Jencil.0.1.2.js", "13261:13277");
__$coverInitRange("js/Jencil.0.1.2.js", "13282:13983");
__$coverInitRange("js/Jencil.0.1.2.js", "13988:13997");
__$coverInitRange("js/Jencil.0.1.2.js", "14002:14108");
__$coverInitRange("js/Jencil.0.1.2.js", "14113:14135");
__$coverInitRange("js/Jencil.0.1.2.js", "14140:14166");
__$coverInitRange("js/Jencil.0.1.2.js", "12987:13012");
__$coverInitRange("js/Jencil.0.1.2.js", "13018:13134");
__$coverInitRange("js/Jencil.0.1.2.js", "13140:13151");
__$coverInitRange("js/Jencil.0.1.2.js", "13311:13978");
__$coverInitRange("js/Jencil.0.1.2.js", "13343:13380");
__$coverInitRange("js/Jencil.0.1.2.js", "13449:13972");
__$coverInitRange("js/Jencil.0.1.2.js", "13603:13689");
__$coverInitRange("js/Jencil.0.1.2.js", "13732:13768");
__$coverInitRange("js/Jencil.0.1.2.js", "13818:13897");
__$coverInitRange("js/Jencil.0.1.2.js", "13929:13965");
__$coverInitRange("js/Jencil.0.1.2.js", "14217:14261");
__$coverInitRange("js/Jencil.0.1.2.js", "14268:18619");
__$coverInitRange("js/Jencil.0.1.2.js", "14439:18614");
__$coverInitRange("js/Jencil.0.1.2.js", "14484:15374");
__$coverInitRange("js/Jencil.0.1.2.js", "14501:14535");
__$coverInitRange("js/Jencil.0.1.2.js", "14623:14678");
__$coverInitRange("js/Jencil.0.1.2.js", "14688:15041");
__$coverInitRange("js/Jencil.0.1.2.js", "15126:15146");
__$coverInitRange("js/Jencil.0.1.2.js", "15153:15167");
__$coverInitRange("js/Jencil.0.1.2.js", "14736:14751");
__$coverInitRange("js/Jencil.0.1.2.js", "14864:14894");
__$coverInitRange("js/Jencil.0.1.2.js", "14905:14957");
__$coverInitRange("js/Jencil.0.1.2.js", "14968:15031");
__$coverInitRange("js/Jencil.0.1.2.js", "15288:15318");
__$coverInitRange("js/Jencil.0.1.2.js", "15326:15347");
__$coverInitRange("js/Jencil.0.1.2.js", "15354:15368");
__$coverInitRange("js/Jencil.0.1.2.js", "15471:15502");
__$coverInitRange("js/Jencil.0.1.2.js", "15508:15549");
__$coverInitRange("js/Jencil.0.1.2.js", "15555:15603");
__$coverInitRange("js/Jencil.0.1.2.js", "15614:15664");
__$coverInitRange("js/Jencil.0.1.2.js", "15670:15703");
__$coverInitRange("js/Jencil.0.1.2.js", "15709:15754");
__$coverInitRange("js/Jencil.0.1.2.js", "15760:15795");
__$coverInitRange("js/Jencil.0.1.2.js", "15801:15843");
__$coverInitRange("js/Jencil.0.1.2.js", "15849:15884");
__$coverInitRange("js/Jencil.0.1.2.js", "15923:15972");
__$coverInitRange("js/Jencil.0.1.2.js", "15978:16010");
__$coverInitRange("js/Jencil.0.1.2.js", "16016:16060");
__$coverInitRange("js/Jencil.0.1.2.js", "16066:16099");
__$coverInitRange("js/Jencil.0.1.2.js", "16214:16261");
__$coverInitRange("js/Jencil.0.1.2.js", "16267:16297");
__$coverInitRange("js/Jencil.0.1.2.js", "16303:16352");
__$coverInitRange("js/Jencil.0.1.2.js", "16358:16387");
__$coverInitRange("js/Jencil.0.1.2.js", "16506:16534");
__$coverInitRange("js/Jencil.0.1.2.js", "16540:16645");
__$coverInitRange("js/Jencil.0.1.2.js", "16655:17390");
__$coverInitRange("js/Jencil.0.1.2.js", "17401:17705");
__$coverInitRange("js/Jencil.0.1.2.js", "17716:18020");
__$coverInitRange("js/Jencil.0.1.2.js", "18027:18194");
__$coverInitRange("js/Jencil.0.1.2.js", "18205:18248");
__$coverInitRange("js/Jencil.0.1.2.js", "18254:18293");
__$coverInitRange("js/Jencil.0.1.2.js", "18304:18351");
__$coverInitRange("js/Jencil.0.1.2.js", "18357:18387");
__$coverInitRange("js/Jencil.0.1.2.js", "18398:18529");
__$coverInitRange("js/Jencil.0.1.2.js", "18535:18575");
__$coverInitRange("js/Jencil.0.1.2.js", "18586:18604");
__$coverInitRange("js/Jencil.0.1.2.js", "16717:16736");
__$coverInitRange("js/Jencil.0.1.2.js", "16743:16758");
__$coverInitRange("js/Jencil.0.1.2.js", "16799:17043");
__$coverInitRange("js/Jencil.0.1.2.js", "17064:17384");
__$coverInitRange("js/Jencil.0.1.2.js", "17455:17699");
__$coverInitRange("js/Jencil.0.1.2.js", "17770:18014");
__$coverInitRange("js/Jencil.0.1.2.js", "18108:18130");
__$coverInitRange("js/Jencil.0.1.2.js", "18137:18155");
__$coverInitRange("js/Jencil.0.1.2.js", "18673:19655");
__$coverInitRange("js/Jencil.0.1.2.js", "19660:20162");
__$coverInitRange("js/Jencil.0.1.2.js", "20167:20475");
__$coverInitRange("js/Jencil.0.1.2.js", "20480:22023");
__$coverInitRange("js/Jencil.0.1.2.js", "22028:28612");
__$coverInitRange("js/Jencil.0.1.2.js", "28711:34445");
__$coverInitRange("js/Jencil.0.1.2.js", "34450:35053");
__$coverInitRange("js/Jencil.0.1.2.js", "35338:36385");
__$coverInitRange("js/Jencil.0.1.2.js", "37810:39490");
__$coverInitRange("js/Jencil.0.1.2.js", "39495:39694");
__$coverInitRange("js/Jencil.0.1.2.js", "39699:39916");
__$coverInitRange("js/Jencil.0.1.2.js", "39921:41358");
__$coverInitRange("js/Jencil.0.1.2.js", "41363:41441");
__$coverInitRange("js/Jencil.0.1.2.js", "41446:41551");
__$coverInitRange("js/Jencil.0.1.2.js", "41556:41648");
__$coverInitRange("js/Jencil.0.1.2.js", "41653:41731");
__$coverInitRange("js/Jencil.0.1.2.js", "41736:42253");
__$coverInitRange("js/Jencil.0.1.2.js", "42258:42577");
__$coverInitRange("js/Jencil.0.1.2.js", "42582:45054");
__$coverInitRange("js/Jencil.0.1.2.js", "45059:45838");
__$coverInitRange("js/Jencil.0.1.2.js", "45843:46632");
__$coverInitRange("js/Jencil.0.1.2.js", "46637:46728");
__$coverInitRange("js/Jencil.0.1.2.js", "46733:46962");
__$coverInitRange("js/Jencil.0.1.2.js", "46967:50156");
__$coverInitRange("js/Jencil.0.1.2.js", "50161:53538");
__$coverInitRange("js/Jencil.0.1.2.js", "53543:56832");
__$coverInitRange("js/Jencil.0.1.2.js", "56837:57044");
__$coverInitRange("js/Jencil.0.1.2.js", "57049:58567");
__$coverInitRange("js/Jencil.0.1.2.js", "58572:62091");
__$coverInitRange("js/Jencil.0.1.2.js", "62096:62240");
__$coverInitRange("js/Jencil.0.1.2.js", "62245:62702");
__$coverInitRange("js/Jencil.0.1.2.js", "62707:65264");
__$coverInitRange("js/Jencil.0.1.2.js", "65269:66465");
__$coverInitRange("js/Jencil.0.1.2.js", "66470:66659");
__$coverInitRange("js/Jencil.0.1.2.js", "66664:67008");
__$coverInitRange("js/Jencil.0.1.2.js", "67013:69290");
__$coverInitRange("js/Jencil.0.1.2.js", "69295:69447");
__$coverInitRange("js/Jencil.0.1.2.js", "69452:69701");
__$coverInitRange("js/Jencil.0.1.2.js", "69706:70530");
__$coverInitRange("js/Jencil.0.1.2.js", "70535:71371");
__$coverInitRange("js/Jencil.0.1.2.js", "71376:73112");
__$coverInitRange("js/Jencil.0.1.2.js", "73117:73811");
__$coverInitRange("js/Jencil.0.1.2.js", "73816:74516");
__$coverInitRange("js/Jencil.0.1.2.js", "74521:75326");
__$coverInitRange("js/Jencil.0.1.2.js", "75331:76316");
__$coverInitRange("js/Jencil.0.1.2.js", "76321:77294");
__$coverInitRange("js/Jencil.0.1.2.js", "77299:78007");
__$coverInitRange("js/Jencil.0.1.2.js", "78012:78435");
__$coverInitRange("js/Jencil.0.1.2.js", "78440:81197");
__$coverInitRange("js/Jencil.0.1.2.js", "81202:84119");
__$coverInitRange("js/Jencil.0.1.2.js", "84124:84700");
__$coverInitRange("js/Jencil.0.1.2.js", "84705:84929");
__$coverInitRange("js/Jencil.0.1.2.js", "84934:85170");
__$coverInitRange("js/Jencil.0.1.2.js", "85175:85439");
__$coverInitRange("js/Jencil.0.1.2.js", "85444:86010");
__$coverInitRange("js/Jencil.0.1.2.js", "86015:86758");
__$coverInitRange("js/Jencil.0.1.2.js", "86763:86955");
__$coverInitRange("js/Jencil.0.1.2.js", "86960:89796");
__$coverInitRange("js/Jencil.0.1.2.js", "89801:91507");
__$coverInitRange("js/Jencil.0.1.2.js", "91512:92206");
__$coverInitRange("js/Jencil.0.1.2.js", "92211:95832");
__$coverInitRange("js/Jencil.0.1.2.js", "95837:95957");
__$coverInitRange("js/Jencil.0.1.2.js", "95962:96015");
__$coverInitRange("js/Jencil.0.1.2.js", "96020:96140");
__$coverInitRange("js/Jencil.0.1.2.js", "96145:97174");
__$coverInitRange("js/Jencil.0.1.2.js", "97179:97286");
__$coverInitRange("js/Jencil.0.1.2.js", "97291:98122");
__$coverInitRange("js/Jencil.0.1.2.js", "98127:98239");
__$coverInitRange("js/Jencil.0.1.2.js", "19406:19491");
__$coverInitRange("js/Jencil.0.1.2.js", "19493:19537");
__$coverInitRange("js/Jencil.0.1.2.js", "19539:19572");
__$coverInitRange("js/Jencil.0.1.2.js", "19574:19602");
__$coverInitRange("js/Jencil.0.1.2.js", "19604:19638");
__$coverInitRange("js/Jencil.0.1.2.js", "19640:19652");
__$coverInitRange("js/Jencil.0.1.2.js", "19432:19489");
__$coverInitRange("js/Jencil.0.1.2.js", "19511:19535");
__$coverInitRange("js/Jencil.0.1.2.js", "19715:19751");
__$coverInitRange("js/Jencil.0.1.2.js", "19757:19940");
__$coverInitRange("js/Jencil.0.1.2.js", "19946:19958");
__$coverInitRange("js/Jencil.0.1.2.js", "19964:19987");
__$coverInitRange("js/Jencil.0.1.2.js", "19993:20126");
__$coverInitRange("js/Jencil.0.1.2.js", "20132:20157");
__$coverInitRange("js/Jencil.0.1.2.js", "19791:19934");
__$coverInitRange("js/Jencil.0.1.2.js", "20052:20068");
__$coverInitRange("js/Jencil.0.1.2.js", "20076:20120");
__$coverInitRange("js/Jencil.0.1.2.js", "20199:20222");
__$coverInitRange("js/Jencil.0.1.2.js", "20229:20330");
__$coverInitRange("js/Jencil.0.1.2.js", "20337:20442");
__$coverInitRange("js/Jencil.0.1.2.js", "20449:20466");
__$coverInitRange("js/Jencil.0.1.2.js", "20285:20323");
__$coverInitRange("js/Jencil.0.1.2.js", "20397:20435");
__$coverInitRange("js/Jencil.0.1.2.js", "20511:20641");
__$coverInitRange("js/Jencil.0.1.2.js", "20648:20834");
__$coverInitRange("js/Jencil.0.1.2.js", "20841:21027");
__$coverInitRange("js/Jencil.0.1.2.js", "21034:21413");
__$coverInitRange("js/Jencil.0.1.2.js", "21420:21799");
__$coverInitRange("js/Jencil.0.1.2.js", "21806:21895");
__$coverInitRange("js/Jencil.0.1.2.js", "21902:21991");
__$coverInitRange("js/Jencil.0.1.2.js", "21998:22014");
__$coverInitRange("js/Jencil.0.1.2.js", "20550:20579");
__$coverInitRange("js/Jencil.0.1.2.js", "20587:20607");
__$coverInitRange("js/Jencil.0.1.2.js", "20615:20635");
__$coverInitRange("js/Jencil.0.1.2.js", "20710:20802");
__$coverInitRange("js/Jencil.0.1.2.js", "20810:20827");
__$coverInitRange("js/Jencil.0.1.2.js", "20744:20773");
__$coverInitRange("js/Jencil.0.1.2.js", "20783:20794");
__$coverInitRange("js/Jencil.0.1.2.js", "20894:20948");
__$coverInitRange("js/Jencil.0.1.2.js", "20956:20985");
__$coverInitRange("js/Jencil.0.1.2.js", "20993:21020");
__$coverInitRange("js/Jencil.0.1.2.js", "21080:21094");
__$coverInitRange("js/Jencil.0.1.2.js", "21102:21153");
__$coverInitRange("js/Jencil.0.1.2.js", "21161:21191");
__$coverInitRange("js/Jencil.0.1.2.js", "21199:21247");
__$coverInitRange("js/Jencil.0.1.2.js", "21255:21299");
__$coverInitRange("js/Jencil.0.1.2.js", "21307:21387");
__$coverInitRange("js/Jencil.0.1.2.js", "21395:21406");
__$coverInitRange("js/Jencil.0.1.2.js", "21133:21145");
__$coverInitRange("js/Jencil.0.1.2.js", "21361:21379");
__$coverInitRange("js/Jencil.0.1.2.js", "21466:21480");
__$coverInitRange("js/Jencil.0.1.2.js", "21488:21539");
__$coverInitRange("js/Jencil.0.1.2.js", "21547:21577");
__$coverInitRange("js/Jencil.0.1.2.js", "21585:21633");
__$coverInitRange("js/Jencil.0.1.2.js", "21641:21685");
__$coverInitRange("js/Jencil.0.1.2.js", "21693:21773");
__$coverInitRange("js/Jencil.0.1.2.js", "21781:21792");
__$coverInitRange("js/Jencil.0.1.2.js", "21519:21531");
__$coverInitRange("js/Jencil.0.1.2.js", "21747:21765");
__$coverInitRange("js/Jencil.0.1.2.js", "21855:21888");
__$coverInitRange("js/Jencil.0.1.2.js", "21951:21984");
__$coverInitRange("js/Jencil.0.1.2.js", "22059:22178");
__$coverInitRange("js/Jencil.0.1.2.js", "22185:22809");
__$coverInitRange("js/Jencil.0.1.2.js", "22816:23392");
__$coverInitRange("js/Jencil.0.1.2.js", "23399:23774");
__$coverInitRange("js/Jencil.0.1.2.js", "23781:23928");
__$coverInitRange("js/Jencil.0.1.2.js", "23935:24264");
__$coverInitRange("js/Jencil.0.1.2.js", "24271:24660");
__$coverInitRange("js/Jencil.0.1.2.js", "24667:25084");
__$coverInitRange("js/Jencil.0.1.2.js", "25091:25267");
__$coverInitRange("js/Jencil.0.1.2.js", "25274:25734");
__$coverInitRange("js/Jencil.0.1.2.js", "25741:26213");
__$coverInitRange("js/Jencil.0.1.2.js", "26220:26955");
__$coverInitRange("js/Jencil.0.1.2.js", "26962:27250");
__$coverInitRange("js/Jencil.0.1.2.js", "27257:27368");
__$coverInitRange("js/Jencil.0.1.2.js", "27375:27556");
__$coverInitRange("js/Jencil.0.1.2.js", "27563:27991");
__$coverInitRange("js/Jencil.0.1.2.js", "27998:28180");
__$coverInitRange("js/Jencil.0.1.2.js", "28187:28374");
__$coverInitRange("js/Jencil.0.1.2.js", "28381:28580");
__$coverInitRange("js/Jencil.0.1.2.js", "28587:28603");
__$coverInitRange("js/Jencil.0.1.2.js", "22105:22129");
__$coverInitRange("js/Jencil.0.1.2.js", "22137:22159");
__$coverInitRange("js/Jencil.0.1.2.js", "22167:22171");
__$coverInitRange("js/Jencil.0.1.2.js", "22236:22265");
__$coverInitRange("js/Jencil.0.1.2.js", "22273:22726");
__$coverInitRange("js/Jencil.0.1.2.js", "22734:22748");
__$coverInitRange("js/Jencil.0.1.2.js", "22756:22782");
__$coverInitRange("js/Jencil.0.1.2.js", "22790:22802");
__$coverInitRange("js/Jencil.0.1.2.js", "22320:22365");
__$coverInitRange("js/Jencil.0.1.2.js", "22375:22400");
__$coverInitRange("js/Jencil.0.1.2.js", "22410:22447");
__$coverInitRange("js/Jencil.0.1.2.js", "22457:22493");
__$coverInitRange("js/Jencil.0.1.2.js", "22503:22544");
__$coverInitRange("js/Jencil.0.1.2.js", "22554:22579");
__$coverInitRange("js/Jencil.0.1.2.js", "22648:22679");
__$coverInitRange("js/Jencil.0.1.2.js", "22689:22718");
__$coverInitRange("js/Jencil.0.1.2.js", "22877:22897");
__$coverInitRange("js/Jencil.0.1.2.js", "22905:22939");
__$coverInitRange("js/Jencil.0.1.2.js", "22947:23296");
__$coverInitRange("js/Jencil.0.1.2.js", "23304:23324");
__$coverInitRange("js/Jencil.0.1.2.js", "23332:23366");
__$coverInitRange("js/Jencil.0.1.2.js", "23374:23385");
__$coverInitRange("js/Jencil.0.1.2.js", "23001:23043");
__$coverInitRange("js/Jencil.0.1.2.js", "23102:23140");
__$coverInitRange("js/Jencil.0.1.2.js", "23150:23170");
__$coverInitRange("js/Jencil.0.1.2.js", "23180:23215");
__$coverInitRange("js/Jencil.0.1.2.js", "23225:23264");
__$coverInitRange("js/Jencil.0.1.2.js", "23274:23288");
__$coverInitRange("js/Jencil.0.1.2.js", "23456:23563");
__$coverInitRange("js/Jencil.0.1.2.js", "23571:23639");
__$coverInitRange("js/Jencil.0.1.2.js", "23647:23736");
__$coverInitRange("js/Jencil.0.1.2.js", "23744:23767");
__$coverInitRange("js/Jencil.0.1.2.js", "23515:23529");
__$coverInitRange("js/Jencil.0.1.2.js", "23539:23555");
__$coverInitRange("js/Jencil.0.1.2.js", "23620:23631");
__$coverInitRange("js/Jencil.0.1.2.js", "23695:23728");
__$coverInitRange("js/Jencil.0.1.2.js", "23840:23849");
__$coverInitRange("js/Jencil.0.1.2.js", "23857:23877");
__$coverInitRange("js/Jencil.0.1.2.js", "23885:23921");
__$coverInitRange("js/Jencil.0.1.2.js", "24000:24019");
__$coverInitRange("js/Jencil.0.1.2.js", "24027:24061");
__$coverInitRange("js/Jencil.0.1.2.js", "24069:24111");
__$coverInitRange("js/Jencil.0.1.2.js", "24119:24156");
__$coverInitRange("js/Jencil.0.1.2.js", "24164:24196");
__$coverInitRange("js/Jencil.0.1.2.js", "24204:24238");
__$coverInitRange("js/Jencil.0.1.2.js", "24246:24257");
__$coverInitRange("js/Jencil.0.1.2.js", "24321:24342");
__$coverInitRange("js/Jencil.0.1.2.js", "24350:24634");
__$coverInitRange("js/Jencil.0.1.2.js", "24642:24653");
__$coverInitRange("js/Jencil.0.1.2.js", "24397:24442");
__$coverInitRange("js/Jencil.0.1.2.js", "24452:24469");
__$coverInitRange("js/Jencil.0.1.2.js", "24530:24575");
__$coverInitRange("js/Jencil.0.1.2.js", "24585:24626");
__$coverInitRange("js/Jencil.0.1.2.js", "24735:24760");
__$coverInitRange("js/Jencil.0.1.2.js", "24768:24802");
__$coverInitRange("js/Jencil.0.1.2.js", "24810:24855");
__$coverInitRange("js/Jencil.0.1.2.js", "24863:24887");
__$coverInitRange("js/Jencil.0.1.2.js", "24895:24913");
__$coverInitRange("js/Jencil.0.1.2.js", "24921:24964");
__$coverInitRange("js/Jencil.0.1.2.js", "24972:24988");
__$coverInitRange("js/Jencil.0.1.2.js", "24996:25016");
__$coverInitRange("js/Jencil.0.1.2.js", "25024:25058");
__$coverInitRange("js/Jencil.0.1.2.js", "25066:25077");
__$coverInitRange("js/Jencil.0.1.2.js", "24951:24956");
__$coverInitRange("js/Jencil.0.1.2.js", "25155:25230");
__$coverInitRange("js/Jencil.0.1.2.js", "25238:25260");
__$coverInitRange("js/Jencil.0.1.2.js", "25182:25222");
__$coverInitRange("js/Jencil.0.1.2.js", "25346:25377");
__$coverInitRange("js/Jencil.0.1.2.js", "25385:25419");
__$coverInitRange("js/Jencil.0.1.2.js", "25427:25472");
__$coverInitRange("js/Jencil.0.1.2.js", "25480:25498");
__$coverInitRange("js/Jencil.0.1.2.js", "25506:25537");
__$coverInitRange("js/Jencil.0.1.2.js", "25545:25563");
__$coverInitRange("js/Jencil.0.1.2.js", "25571:25614");
__$coverInitRange("js/Jencil.0.1.2.js", "25622:25638");
__$coverInitRange("js/Jencil.0.1.2.js", "25646:25666");
__$coverInitRange("js/Jencil.0.1.2.js", "25674:25708");
__$coverInitRange("js/Jencil.0.1.2.js", "25716:25727");
__$coverInitRange("js/Jencil.0.1.2.js", "25601:25606");
__$coverInitRange("js/Jencil.0.1.2.js", "25812:25843");
__$coverInitRange("js/Jencil.0.1.2.js", "25851:25885");
__$coverInitRange("js/Jencil.0.1.2.js", "25893:25938");
__$coverInitRange("js/Jencil.0.1.2.js", "25946:25964");
__$coverInitRange("js/Jencil.0.1.2.js", "25972:26003");
__$coverInitRange("js/Jencil.0.1.2.js", "26011:26016");
__$coverInitRange("js/Jencil.0.1.2.js", "26024:26042");
__$coverInitRange("js/Jencil.0.1.2.js", "26050:26093");
__$coverInitRange("js/Jencil.0.1.2.js", "26101:26117");
__$coverInitRange("js/Jencil.0.1.2.js", "26125:26145");
__$coverInitRange("js/Jencil.0.1.2.js", "26153:26187");
__$coverInitRange("js/Jencil.0.1.2.js", "26195:26206");
__$coverInitRange("js/Jencil.0.1.2.js", "26080:26085");
__$coverInitRange("js/Jencil.0.1.2.js", "26292:26328");
__$coverInitRange("js/Jencil.0.1.2.js", "26336:26370");
__$coverInitRange("js/Jencil.0.1.2.js", "26378:26396");
__$coverInitRange("js/Jencil.0.1.2.js", "26404:26859");
__$coverInitRange("js/Jencil.0.1.2.js", "26867:26887");
__$coverInitRange("js/Jencil.0.1.2.js", "26895:26929");
__$coverInitRange("js/Jencil.0.1.2.js", "26937:26948");
__$coverInitRange("js/Jencil.0.1.2.js", "26499:26557");
__$coverInitRange("js/Jencil.0.1.2.js", "26567:26596");
__$coverInitRange("js/Jencil.0.1.2.js", "26621:26666");
__$coverInitRange("js/Jencil.0.1.2.js", "26676:26713");
__$coverInitRange("js/Jencil.0.1.2.js", "26723:26768");
__$coverInitRange("js/Jencil.0.1.2.js", "26778:26825");
__$coverInitRange("js/Jencil.0.1.2.js", "26835:26851");
__$coverInitRange("js/Jencil.0.1.2.js", "26810:26815");
__$coverInitRange("js/Jencil.0.1.2.js", "27029:27044");
__$coverInitRange("js/Jencil.0.1.2.js", "27052:27078");
__$coverInitRange("js/Jencil.0.1.2.js", "27086:27128");
__$coverInitRange("js/Jencil.0.1.2.js", "27136:27166");
__$coverInitRange("js/Jencil.0.1.2.js", "27174:27222");
__$coverInitRange("js/Jencil.0.1.2.js", "27230:27243");
__$coverInitRange("js/Jencil.0.1.2.js", "27198:27214");
__$coverInitRange("js/Jencil.0.1.2.js", "27312:27361");
__$coverInitRange("js/Jencil.0.1.2.js", "27425:27439");
__$coverInitRange("js/Jencil.0.1.2.js", "27447:27500");
__$coverInitRange("js/Jencil.0.1.2.js", "27508:27549");
__$coverInitRange("js/Jencil.0.1.2.js", "27632:27657");
__$coverInitRange("js/Jencil.0.1.2.js", "27665:27699");
__$coverInitRange("js/Jencil.0.1.2.js", "27707:27760");
__$coverInitRange("js/Jencil.0.1.2.js", "27768:27793");
__$coverInitRange("js/Jencil.0.1.2.js", "27801:27820");
__$coverInitRange("js/Jencil.0.1.2.js", "27828:27871");
__$coverInitRange("js/Jencil.0.1.2.js", "27879:27895");
__$coverInitRange("js/Jencil.0.1.2.js", "27903:27923");
__$coverInitRange("js/Jencil.0.1.2.js", "27931:27965");
__$coverInitRange("js/Jencil.0.1.2.js", "27973:27984");
__$coverInitRange("js/Jencil.0.1.2.js", "27858:27863");
__$coverInitRange("js/Jencil.0.1.2.js", "28064:28143");
__$coverInitRange("js/Jencil.0.1.2.js", "28151:28173");
__$coverInitRange("js/Jencil.0.1.2.js", "28093:28135");
__$coverInitRange("js/Jencil.0.1.2.js", "28249:28263");
__$coverInitRange("js/Jencil.0.1.2.js", "28271:28336");
__$coverInitRange("js/Jencil.0.1.2.js", "28344:28367");
__$coverInitRange("js/Jencil.0.1.2.js", "28445:28459");
__$coverInitRange("js/Jencil.0.1.2.js", "28467:28542");
__$coverInitRange("js/Jencil.0.1.2.js", "28550:28573");
__$coverInitRange("js/Jencil.0.1.2.js", "28739:28913");
__$coverInitRange("js/Jencil.0.1.2.js", "28919:29102");
__$coverInitRange("js/Jencil.0.1.2.js", "29108:29294");
__$coverInitRange("js/Jencil.0.1.2.js", "29300:29738");
__$coverInitRange("js/Jencil.0.1.2.js", "29744:30186");
__$coverInitRange("js/Jencil.0.1.2.js", "30192:30375");
__$coverInitRange("js/Jencil.0.1.2.js", "30381:30567");
__$coverInitRange("js/Jencil.0.1.2.js", "30573:30945");
__$coverInitRange("js/Jencil.0.1.2.js", "30951:31017");
__$coverInitRange("js/Jencil.0.1.2.js", "31023:31091");
__$coverInitRange("js/Jencil.0.1.2.js", "31097:31163");
__$coverInitRange("js/Jencil.0.1.2.js", "31169:31237");
__$coverInitRange("js/Jencil.0.1.2.js", "31243:31621");
__$coverInitRange("js/Jencil.0.1.2.js", "31627:31993");
__$coverInitRange("js/Jencil.0.1.2.js", "31999:32208");
__$coverInitRange("js/Jencil.0.1.2.js", "32214:32421");
__$coverInitRange("js/Jencil.0.1.2.js", "32427:32923");
__$coverInitRange("js/Jencil.0.1.2.js", "32929:33425");
__$coverInitRange("js/Jencil.0.1.2.js", "33431:34417");
__$coverInitRange("js/Jencil.0.1.2.js", "34423:34437");
__$coverInitRange("js/Jencil.0.1.2.js", "28969:29035");
__$coverInitRange("js/Jencil.0.1.2.js", "29043:29095");
__$coverInitRange("js/Jencil.0.1.2.js", "29006:29027");
__$coverInitRange("js/Jencil.0.1.2.js", "29159:29225");
__$coverInitRange("js/Jencil.0.1.2.js", "29233:29287");
__$coverInitRange("js/Jencil.0.1.2.js", "29196:29217");
__$coverInitRange("js/Jencil.0.1.2.js", "29352:29362");
__$coverInitRange("js/Jencil.0.1.2.js", "29370:29436");
__$coverInitRange("js/Jencil.0.1.2.js", "29444:29553");
__$coverInitRange("js/Jencil.0.1.2.js", "29561:29685");
__$coverInitRange("js/Jencil.0.1.2.js", "29693:29731");
__$coverInitRange("js/Jencil.0.1.2.js", "29407:29428");
__$coverInitRange("js/Jencil.0.1.2.js", "29493:29514");
__$coverInitRange("js/Jencil.0.1.2.js", "29524:29545");
__$coverInitRange("js/Jencil.0.1.2.js", "29590:29634");
__$coverInitRange("js/Jencil.0.1.2.js", "29644:29677");
__$coverInitRange("js/Jencil.0.1.2.js", "29797:29807");
__$coverInitRange("js/Jencil.0.1.2.js", "29815:29881");
__$coverInitRange("js/Jencil.0.1.2.js", "29889:29998");
__$coverInitRange("js/Jencil.0.1.2.js", "30006:30132");
__$coverInitRange("js/Jencil.0.1.2.js", "30140:30179");
__$coverInitRange("js/Jencil.0.1.2.js", "29852:29873");
__$coverInitRange("js/Jencil.0.1.2.js", "29938:29959");
__$coverInitRange("js/Jencil.0.1.2.js", "29969:29990");
__$coverInitRange("js/Jencil.0.1.2.js", "30035:30080");
__$coverInitRange("js/Jencil.0.1.2.js", "30090:30124");
__$coverInitRange("js/Jencil.0.1.2.js", "30242:30308");
__$coverInitRange("js/Jencil.0.1.2.js", "30316:30368");
__$coverInitRange("js/Jencil.0.1.2.js", "30279:30300");
__$coverInitRange("js/Jencil.0.1.2.js", "30432:30498");
__$coverInitRange("js/Jencil.0.1.2.js", "30506:30560");
__$coverInitRange("js/Jencil.0.1.2.js", "30469:30490");
__$coverInitRange("js/Jencil.0.1.2.js", "30625:30634");
__$coverInitRange("js/Jencil.0.1.2.js", "30642:30705");
__$coverInitRange("js/Jencil.0.1.2.js", "30713:30743");
__$coverInitRange("js/Jencil.0.1.2.js", "30751:30883");
__$coverInitRange("js/Jencil.0.1.2.js", "30891:30918");
__$coverInitRange("js/Jencil.0.1.2.js", "30926:30938");
__$coverInitRange("js/Jencil.0.1.2.js", "30678:30697");
__$coverInitRange("js/Jencil.0.1.2.js", "30856:30875");
__$coverInitRange("js/Jencil.0.1.2.js", "30981:31010");
__$coverInitRange("js/Jencil.0.1.2.js", "31054:31084");
__$coverInitRange("js/Jencil.0.1.2.js", "31127:31156");
__$coverInitRange("js/Jencil.0.1.2.js", "31200:31230");
__$coverInitRange("js/Jencil.0.1.2.js", "31286:31325");
__$coverInitRange("js/Jencil.0.1.2.js", "31333:31399");
__$coverInitRange("js/Jencil.0.1.2.js", "31407:31464");
__$coverInitRange("js/Jencil.0.1.2.js", "31472:31515");
__$coverInitRange("js/Jencil.0.1.2.js", "31523:31562");
__$coverInitRange("js/Jencil.0.1.2.js", "31570:31614");
__$coverInitRange("js/Jencil.0.1.2.js", "31370:31391");
__$coverInitRange("js/Jencil.0.1.2.js", "31670:31706");
__$coverInitRange("js/Jencil.0.1.2.js", "31714:31780");
__$coverInitRange("js/Jencil.0.1.2.js", "31788:31843");
__$coverInitRange("js/Jencil.0.1.2.js", "31851:31892");
__$coverInitRange("js/Jencil.0.1.2.js", "31900:31937");
__$coverInitRange("js/Jencil.0.1.2.js", "31945:31986");
__$coverInitRange("js/Jencil.0.1.2.js", "31751:31772");
__$coverInitRange("js/Jencil.0.1.2.js", "32035:32045");
__$coverInitRange("js/Jencil.0.1.2.js", "32053:32075");
__$coverInitRange("js/Jencil.0.1.2.js", "32083:32175");
__$coverInitRange("js/Jencil.0.1.2.js", "32183:32201");
__$coverInitRange("js/Jencil.0.1.2.js", "32112:32131");
__$coverInitRange("js/Jencil.0.1.2.js", "32141:32167");
__$coverInitRange("js/Jencil.0.1.2.js", "32250:32260");
__$coverInitRange("js/Jencil.0.1.2.js", "32268:32290");
__$coverInitRange("js/Jencil.0.1.2.js", "32298:32389");
__$coverInitRange("js/Jencil.0.1.2.js", "32397:32414");
__$coverInitRange("js/Jencil.0.1.2.js", "32327:32345");
__$coverInitRange("js/Jencil.0.1.2.js", "32355:32381");
__$coverInitRange("js/Jencil.0.1.2.js", "32478:32496");
__$coverInitRange("js/Jencil.0.1.2.js", "32504:32570");
__$coverInitRange("js/Jencil.0.1.2.js", "32578:32687");
__$coverInitRange("js/Jencil.0.1.2.js", "32695:32726");
__$coverInitRange("js/Jencil.0.1.2.js", "32734:32794");
__$coverInitRange("js/Jencil.0.1.2.js", "32802:32876");
__$coverInitRange("js/Jencil.0.1.2.js", "32884:32916");
__$coverInitRange("js/Jencil.0.1.2.js", "32541:32562");
__$coverInitRange("js/Jencil.0.1.2.js", "32627:32648");
__$coverInitRange("js/Jencil.0.1.2.js", "32658:32679");
__$coverInitRange("js/Jencil.0.1.2.js", "32831:32868");
__$coverInitRange("js/Jencil.0.1.2.js", "32980:32998");
__$coverInitRange("js/Jencil.0.1.2.js", "33006:33072");
__$coverInitRange("js/Jencil.0.1.2.js", "33080:33189");
__$coverInitRange("js/Jencil.0.1.2.js", "33197:33228");
__$coverInitRange("js/Jencil.0.1.2.js", "33236:33296");
__$coverInitRange("js/Jencil.0.1.2.js", "33304:33378");
__$coverInitRange("js/Jencil.0.1.2.js", "33386:33418");
__$coverInitRange("js/Jencil.0.1.2.js", "33043:33064");
__$coverInitRange("js/Jencil.0.1.2.js", "33129:33150");
__$coverInitRange("js/Jencil.0.1.2.js", "33160:33181");
__$coverInitRange("js/Jencil.0.1.2.js", "33333:33370");
__$coverInitRange("js/Jencil.0.1.2.js", "33469:33540");
__$coverInitRange("js/Jencil.0.1.2.js", "33548:33592");
__$coverInitRange("js/Jencil.0.1.2.js", "33600:33646");
__$coverInitRange("js/Jencil.0.1.2.js", "33654:33697");
__$coverInitRange("js/Jencil.0.1.2.js", "33705:33750");
__$coverInitRange("js/Jencil.0.1.2.js", "33758:33791");
__$coverInitRange("js/Jencil.0.1.2.js", "33799:33834");
__$coverInitRange("js/Jencil.0.1.2.js", "33842:33885");
__$coverInitRange("js/Jencil.0.1.2.js", "33893:33938");
__$coverInitRange("js/Jencil.0.1.2.js", "33946:33967");
__$coverInitRange("js/Jencil.0.1.2.js", "33975:34004");
__$coverInitRange("js/Jencil.0.1.2.js", "34012:34043");
__$coverInitRange("js/Jencil.0.1.2.js", "34051:34080");
__$coverInitRange("js/Jencil.0.1.2.js", "34088:34119");
__$coverInitRange("js/Jencil.0.1.2.js", "34127:34156");
__$coverInitRange("js/Jencil.0.1.2.js", "34164:34193");
__$coverInitRange("js/Jencil.0.1.2.js", "34201:34232");
__$coverInitRange("js/Jencil.0.1.2.js", "34240:34271");
__$coverInitRange("js/Jencil.0.1.2.js", "34279:34310");
__$coverInitRange("js/Jencil.0.1.2.js", "34318:34349");
__$coverInitRange("js/Jencil.0.1.2.js", "34357:34386");
__$coverInitRange("js/Jencil.0.1.2.js", "34394:34410");
__$coverInitRange("js/Jencil.0.1.2.js", "33516:33532");
__$coverInitRange("js/Jencil.0.1.2.js", "34491:34502");
__$coverInitRange("js/Jencil.0.1.2.js", "34508:34543");
__$coverInitRange("js/Jencil.0.1.2.js", "34549:34725");
__$coverInitRange("js/Jencil.0.1.2.js", "34731:34816");
__$coverInitRange("js/Jencil.0.1.2.js", "34822:34961");
__$coverInitRange("js/Jencil.0.1.2.js", "34967:35028");
__$coverInitRange("js/Jencil.0.1.2.js", "35034:35048");
__$coverInitRange("js/Jencil.0.1.2.js", "34763:34780");
__$coverInitRange("js/Jencil.0.1.2.js", "34788:34809");
__$coverInitRange("js/Jencil.0.1.2.js", "34859:34898");
__$coverInitRange("js/Jencil.0.1.2.js", "34906:34954");
__$coverInitRange("js/Jencil.0.1.2.js", "35000:35021");
__$coverInitRange("js/Jencil.0.1.2.js", "35366:35389");
__$coverInitRange("js/Jencil.0.1.2.js", "35395:35456");
__$coverInitRange("js/Jencil.0.1.2.js", "35462:35626");
__$coverInitRange("js/Jencil.0.1.2.js", "35632:36377");
__$coverInitRange("js/Jencil.0.1.2.js", "35420:35449");
__$coverInitRange("js/Jencil.0.1.2.js", "35665:35696");
__$coverInitRange("js/Jencil.0.1.2.js", "35704:35752");
__$coverInitRange("js/Jencil.0.1.2.js", "35760:35777");
__$coverInitRange("js/Jencil.0.1.2.js", "35785:35825");
__$coverInitRange("js/Jencil.0.1.2.js", "35833:36349");
__$coverInitRange("js/Jencil.0.1.2.js", "36357:36370");
__$coverInitRange("js/Jencil.0.1.2.js", "35861:35873");
__$coverInitRange("js/Jencil.0.1.2.js", "35883:35908");
__$coverInitRange("js/Jencil.0.1.2.js", "35918:35993");
__$coverInitRange("js/Jencil.0.1.2.js", "36003:36037");
__$coverInitRange("js/Jencil.0.1.2.js", "36047:36077");
__$coverInitRange("js/Jencil.0.1.2.js", "36087:36340");
__$coverInitRange("js/Jencil.0.1.2.js", "36129:36155");
__$coverInitRange("js/Jencil.0.1.2.js", "36184:36235");
__$coverInitRange("js/Jencil.0.1.2.js", "36247:36330");
__$coverInitRange("js/Jencil.0.1.2.js", "37845:37859");
__$coverInitRange("js/Jencil.0.1.2.js", "37865:38493");
__$coverInitRange("js/Jencil.0.1.2.js", "38499:39482");
__$coverInitRange("js/Jencil.0.1.2.js", "37898:37935");
__$coverInitRange("js/Jencil.0.1.2.js", "37943:37987");
__$coverInitRange("js/Jencil.0.1.2.js", "37995:38023");
__$coverInitRange("js/Jencil.0.1.2.js", "38031:38115");
__$coverInitRange("js/Jencil.0.1.2.js", "38123:38167");
__$coverInitRange("js/Jencil.0.1.2.js", "38175:38197");
__$coverInitRange("js/Jencil.0.1.2.js", "38205:38246");
__$coverInitRange("js/Jencil.0.1.2.js", "38254:38357");
__$coverInitRange("js/Jencil.0.1.2.js", "38365:38384");
__$coverInitRange("js/Jencil.0.1.2.js", "38392:38420");
__$coverInitRange("js/Jencil.0.1.2.js", "38428:38446");
__$coverInitRange("js/Jencil.0.1.2.js", "38454:38466");
__$coverInitRange("js/Jencil.0.1.2.js", "38474:38486");
__$coverInitRange("js/Jencil.0.1.2.js", "37973:37979");
__$coverInitRange("js/Jencil.0.1.2.js", "38083:38107");
__$coverInitRange("js/Jencil.0.1.2.js", "38308:38349");
__$coverInitRange("js/Jencil.0.1.2.js", "38544:38619");
__$coverInitRange("js/Jencil.0.1.2.js", "38627:38741");
__$coverInitRange("js/Jencil.0.1.2.js", "38749:38837");
__$coverInitRange("js/Jencil.0.1.2.js", "38845:38972");
__$coverInitRange("js/Jencil.0.1.2.js", "38980:39109");
__$coverInitRange("js/Jencil.0.1.2.js", "39117:39253");
__$coverInitRange("js/Jencil.0.1.2.js", "39261:39432");
__$coverInitRange("js/Jencil.0.1.2.js", "39440:39475");
__$coverInitRange("js/Jencil.0.1.2.js", "38589:38611");
__$coverInitRange("js/Jencil.0.1.2.js", "38672:38733");
__$coverInitRange("js/Jencil.0.1.2.js", "38793:38828");
__$coverInitRange("js/Jencil.0.1.2.js", "38895:38938");
__$coverInitRange("js/Jencil.0.1.2.js", "38948:38963");
__$coverInitRange("js/Jencil.0.1.2.js", "39031:39075");
__$coverInitRange("js/Jencil.0.1.2.js", "39085:39100");
__$coverInitRange("js/Jencil.0.1.2.js", "39144:39245");
__$coverInitRange("js/Jencil.0.1.2.js", "39200:39234");
__$coverInitRange("js/Jencil.0.1.2.js", "39289:39424");
__$coverInitRange("js/Jencil.0.1.2.js", "39362:39413");
__$coverInitRange("js/Jencil.0.1.2.js", "39526:39622");
__$coverInitRange("js/Jencil.0.1.2.js", "39560:39615");
__$coverInitRange("js/Jencil.0.1.2.js", "39639:39690");
__$coverInitRange("js/Jencil.0.1.2.js", "39673:39683");
__$coverInitRange("js/Jencil.0.1.2.js", "39954:40975");
__$coverInitRange("js/Jencil.0.1.2.js", "40982:41093");
__$coverInitRange("js/Jencil.0.1.2.js", "41100:41211");
__$coverInitRange("js/Jencil.0.1.2.js", "41218:41329");
__$coverInitRange("js/Jencil.0.1.2.js", "41336:41349");
__$coverInitRange("js/Jencil.0.1.2.js", "39997:40013");
__$coverInitRange("js/Jencil.0.1.2.js", "40021:40513");
__$coverInitRange("js/Jencil.0.1.2.js", "40521:40551");
__$coverInitRange("js/Jencil.0.1.2.js", "40559:40591");
__$coverInitRange("js/Jencil.0.1.2.js", "40599:40678");
__$coverInitRange("js/Jencil.0.1.2.js", "40686:40759");
__$coverInitRange("js/Jencil.0.1.2.js", "40767:40805");
__$coverInitRange("js/Jencil.0.1.2.js", "40813:40884");
__$coverInitRange("js/Jencil.0.1.2.js", "40892:40911");
__$coverInitRange("js/Jencil.0.1.2.js", "40919:40940");
__$coverInitRange("js/Jencil.0.1.2.js", "40948:40969");
__$coverInitRange("js/Jencil.0.1.2.js", "40648:40669");
__$coverInitRange("js/Jencil.0.1.2.js", "41027:41086");
__$coverInitRange("js/Jencil.0.1.2.js", "41145:41204");
__$coverInitRange("js/Jencil.0.1.2.js", "41263:41322");
__$coverInitRange("js/Jencil.0.1.2.js", "41401:41436");
__$coverInitRange("js/Jencil.0.1.2.js", "41499:41545");
__$coverInitRange("js/Jencil.0.1.2.js", "41606:41642");
__$coverInitRange("js/Jencil.0.1.2.js", "41697:41725");
__$coverInitRange("js/Jencil.0.1.2.js", "41764:42086");
__$coverInitRange("js/Jencil.0.1.2.js", "42093:42154");
__$coverInitRange("js/Jencil.0.1.2.js", "42161:42224");
__$coverInitRange("js/Jencil.0.1.2.js", "42231:42244");
__$coverInitRange("js/Jencil.0.1.2.js", "41813:41829");
__$coverInitRange("js/Jencil.0.1.2.js", "41837:41895");
__$coverInitRange("js/Jencil.0.1.2.js", "41903:42036");
__$coverInitRange("js/Jencil.0.1.2.js", "42044:42080");
__$coverInitRange("js/Jencil.0.1.2.js", "41869:41887");
__$coverInitRange("js/Jencil.0.1.2.js", "41945:41968");
__$coverInitRange("js/Jencil.0.1.2.js", "41993:42028");
__$coverInitRange("js/Jencil.0.1.2.js", "42136:42147");
__$coverInitRange("js/Jencil.0.1.2.js", "42206:42217");
__$coverInitRange("js/Jencil.0.1.2.js", "42291:42315");
__$coverInitRange("js/Jencil.0.1.2.js", "42322:42543");
__$coverInitRange("js/Jencil.0.1.2.js", "42550:42562");
__$coverInitRange("js/Jencil.0.1.2.js", "42370:42428");
__$coverInitRange("js/Jencil.0.1.2.js", "42436:42499");
__$coverInitRange("js/Jencil.0.1.2.js", "42507:42537");
__$coverInitRange("js/Jencil.0.1.2.js", "42402:42420");
__$coverInitRange("js/Jencil.0.1.2.js", "42623:42655");
__$coverInitRange("js/Jencil.0.1.2.js", "42662:43834");
__$coverInitRange("js/Jencil.0.1.2.js", "43841:43971");
__$coverInitRange("js/Jencil.0.1.2.js", "43978:45013");
__$coverInitRange("js/Jencil.0.1.2.js", "45020:45040");
__$coverInitRange("js/Jencil.0.1.2.js", "42719:42755");
__$coverInitRange("js/Jencil.0.1.2.js", "42763:42777");
__$coverInitRange("js/Jencil.0.1.2.js", "42785:42799");
__$coverInitRange("js/Jencil.0.1.2.js", "42807:42831");
__$coverInitRange("js/Jencil.0.1.2.js", "42839:42891");
__$coverInitRange("js/Jencil.0.1.2.js", "42899:42932");
__$coverInitRange("js/Jencil.0.1.2.js", "42940:42977");
__$coverInitRange("js/Jencil.0.1.2.js", "42985:43027");
__$coverInitRange("js/Jencil.0.1.2.js", "43035:43072");
__$coverInitRange("js/Jencil.0.1.2.js", "43080:43215");
__$coverInitRange("js/Jencil.0.1.2.js", "43223:43357");
__$coverInitRange("js/Jencil.0.1.2.js", "43365:43489");
__$coverInitRange("js/Jencil.0.1.2.js", "43497:43517");
__$coverInitRange("js/Jencil.0.1.2.js", "43525:43545");
__$coverInitRange("js/Jencil.0.1.2.js", "43553:43677");
__$coverInitRange("js/Jencil.0.1.2.js", "43685:43705");
__$coverInitRange("js/Jencil.0.1.2.js", "43713:43733");
__$coverInitRange("js/Jencil.0.1.2.js", "43741:43828");
__$coverInitRange("js/Jencil.0.1.2.js", "43116:43206");
__$coverInitRange("js/Jencil.0.1.2.js", "43162:43196");
__$coverInitRange("js/Jencil.0.1.2.js", "43259:43348");
__$coverInitRange("js/Jencil.0.1.2.js", "43304:43338");
__$coverInitRange("js/Jencil.0.1.2.js", "43427:43480");
__$coverInitRange("js/Jencil.0.1.2.js", "43615:43668");
__$coverInitRange("js/Jencil.0.1.2.js", "43793:43818");
__$coverInitRange("js/Jencil.0.1.2.js", "43891:43911");
__$coverInitRange("js/Jencil.0.1.2.js", "43919:43934");
__$coverInitRange("js/Jencil.0.1.2.js", "43942:43964");
__$coverInitRange("js/Jencil.0.1.2.js", "44063:44129");
__$coverInitRange("js/Jencil.0.1.2.js", "44137:44182");
__$coverInitRange("js/Jencil.0.1.2.js", "44190:44221");
__$coverInitRange("js/Jencil.0.1.2.js", "44229:44248");
__$coverInitRange("js/Jencil.0.1.2.js", "44256:44583");
__$coverInitRange("js/Jencil.0.1.2.js", "44591:44613");
__$coverInitRange("js/Jencil.0.1.2.js", "44621:44769");
__$coverInitRange("js/Jencil.0.1.2.js", "44777:45006");
__$coverInitRange("js/Jencil.0.1.2.js", "44168:44174");
__$coverInitRange("js/Jencil.0.1.2.js", "44298:44306");
__$coverInitRange("js/Jencil.0.1.2.js", "44316:44354");
__$coverInitRange("js/Jencil.0.1.2.js", "44364:44391");
__$coverInitRange("js/Jencil.0.1.2.js", "44416:44482");
__$coverInitRange("js/Jencil.0.1.2.js", "44492:44539");
__$coverInitRange("js/Jencil.0.1.2.js", "44549:44575");
__$coverInitRange("js/Jencil.0.1.2.js", "44520:44529");
__$coverInitRange("js/Jencil.0.1.2.js", "44657:44681");
__$coverInitRange("js/Jencil.0.1.2.js", "44691:44760");
__$coverInitRange("js/Jencil.0.1.2.js", "44915:44950");
__$coverInitRange("js/Jencil.0.1.2.js", "45100:45132");
__$coverInitRange("js/Jencil.0.1.2.js", "45139:45482");
__$coverInitRange("js/Jencil.0.1.2.js", "45489:45789");
__$coverInitRange("js/Jencil.0.1.2.js", "45796:45816");
__$coverInitRange("js/Jencil.0.1.2.js", "45201:45213");
__$coverInitRange("js/Jencil.0.1.2.js", "45221:45285");
__$coverInitRange("js/Jencil.0.1.2.js", "45293:45355");
__$coverInitRange("js/Jencil.0.1.2.js", "45363:45435");
__$coverInitRange("js/Jencil.0.1.2.js", "45443:45476");
__$coverInitRange("js/Jencil.0.1.2.js", "45258:45277");
__$coverInitRange("js/Jencil.0.1.2.js", "45541:45598");
__$coverInitRange("js/Jencil.0.1.2.js", "45606:45663");
__$coverInitRange("js/Jencil.0.1.2.js", "45671:45733");
__$coverInitRange("js/Jencil.0.1.2.js", "45741:45763");
__$coverInitRange("js/Jencil.0.1.2.js", "45771:45782");
__$coverInitRange("js/Jencil.0.1.2.js", "45886:45920");
__$coverInitRange("js/Jencil.0.1.2.js", "45927:46278");
__$coverInitRange("js/Jencil.0.1.2.js", "46285:46581");
__$coverInitRange("js/Jencil.0.1.2.js", "46588:46610");
__$coverInitRange("js/Jencil.0.1.2.js", "45991:46003");
__$coverInitRange("js/Jencil.0.1.2.js", "46011:46075");
__$coverInitRange("js/Jencil.0.1.2.js", "46083:46147");
__$coverInitRange("js/Jencil.0.1.2.js", "46155:46229");
__$coverInitRange("js/Jencil.0.1.2.js", "46237:46272");
__$coverInitRange("js/Jencil.0.1.2.js", "46048:46067");
__$coverInitRange("js/Jencil.0.1.2.js", "46339:46394");
__$coverInitRange("js/Jencil.0.1.2.js", "46402:46457");
__$coverInitRange("js/Jencil.0.1.2.js", "46465:46525");
__$coverInitRange("js/Jencil.0.1.2.js", "46533:46555");
__$coverInitRange("js/Jencil.0.1.2.js", "46563:46574");
__$coverInitRange("js/Jencil.0.1.2.js", "46692:46722");
__$coverInitRange("js/Jencil.0.1.2.js", "46795:46816");
__$coverInitRange("js/Jencil.0.1.2.js", "46822:46859");
__$coverInitRange("js/Jencil.0.1.2.js", "46865:46902");
__$coverInitRange("js/Jencil.0.1.2.js", "46908:46956");
__$coverInitRange("js/Jencil.0.1.2.js", "47003:47030");
__$coverInitRange("js/Jencil.0.1.2.js", "47037:49064");
__$coverInitRange("js/Jencil.0.1.2.js", "49071:49177");
__$coverInitRange("js/Jencil.0.1.2.js", "49184:49466");
__$coverInitRange("js/Jencil.0.1.2.js", "49473:49808");
__$coverInitRange("js/Jencil.0.1.2.js", "49815:50119");
__$coverInitRange("js/Jencil.0.1.2.js", "50126:50141");
__$coverInitRange("js/Jencil.0.1.2.js", "47094:47138");
__$coverInitRange("js/Jencil.0.1.2.js", "47146:47160");
__$coverInitRange("js/Jencil.0.1.2.js", "47168:47182");
__$coverInitRange("js/Jencil.0.1.2.js", "47190:47254");
__$coverInitRange("js/Jencil.0.1.2.js", "47262:47309");
__$coverInitRange("js/Jencil.0.1.2.js", "47317:47350");
__$coverInitRange("js/Jencil.0.1.2.js", "47358:47391");
__$coverInitRange("js/Jencil.0.1.2.js", "47399:47894");
__$coverInitRange("js/Jencil.0.1.2.js", "47902:48481");
__$coverInitRange("js/Jencil.0.1.2.js", "48489:49058");
__$coverInitRange("js/Jencil.0.1.2.js", "47433:47448");
__$coverInitRange("js/Jencil.0.1.2.js", "47458:47476");
__$coverInitRange("js/Jencil.0.1.2.js", "47486:47628");
__$coverInitRange("js/Jencil.0.1.2.js", "47638:47783");
__$coverInitRange("js/Jencil.0.1.2.js", "47793:47812");
__$coverInitRange("js/Jencil.0.1.2.js", "47822:47850");
__$coverInitRange("js/Jencil.0.1.2.js", "47860:47885");
__$coverInitRange("js/Jencil.0.1.2.js", "47538:47618");
__$coverInitRange("js/Jencil.0.1.2.js", "47592:47606");
__$coverInitRange("js/Jencil.0.1.2.js", "47691:47773");
__$coverInitRange("js/Jencil.0.1.2.js", "47746:47761");
__$coverInitRange("js/Jencil.0.1.2.js", "47934:47958");
__$coverInitRange("js/Jencil.0.1.2.js", "47968:47987");
__$coverInitRange("js/Jencil.0.1.2.js", "47997:48035");
__$coverInitRange("js/Jencil.0.1.2.js", "48045:48079");
__$coverInitRange("js/Jencil.0.1.2.js", "48089:48223");
__$coverInitRange("js/Jencil.0.1.2.js", "48233:48370");
__$coverInitRange("js/Jencil.0.1.2.js", "48380:48399");
__$coverInitRange("js/Jencil.0.1.2.js", "48409:48437");
__$coverInitRange("js/Jencil.0.1.2.js", "48447:48472");
__$coverInitRange("js/Jencil.0.1.2.js", "48141:48213");
__$coverInitRange("js/Jencil.0.1.2.js", "48191:48201");
__$coverInitRange("js/Jencil.0.1.2.js", "48286:48360");
__$coverInitRange("js/Jencil.0.1.2.js", "48337:48348");
__$coverInitRange("js/Jencil.0.1.2.js", "48534:48558");
__$coverInitRange("js/Jencil.0.1.2.js", "48568:48587");
__$coverInitRange("js/Jencil.0.1.2.js", "48597:48625");
__$coverInitRange("js/Jencil.0.1.2.js", "48635:48659");
__$coverInitRange("js/Jencil.0.1.2.js", "48669:48801");
__$coverInitRange("js/Jencil.0.1.2.js", "48811:48946");
__$coverInitRange("js/Jencil.0.1.2.js", "48956:48975");
__$coverInitRange("js/Jencil.0.1.2.js", "48985:49013");
__$coverInitRange("js/Jencil.0.1.2.js", "49023:49048");
__$coverInitRange("js/Jencil.0.1.2.js", "48721:48791");
__$coverInitRange("js/Jencil.0.1.2.js", "48770:48779");
__$coverInitRange("js/Jencil.0.1.2.js", "48864:48936");
__$coverInitRange("js/Jencil.0.1.2.js", "48914:48924");
__$coverInitRange("js/Jencil.0.1.2.js", "49116:49170");
__$coverInitRange("js/Jencil.0.1.2.js", "49242:49290");
__$coverInitRange("js/Jencil.0.1.2.js", "49298:49432");
__$coverInitRange("js/Jencil.0.1.2.js", "49440:49459");
__$coverInitRange("js/Jencil.0.1.2.js", "49270:49282");
__$coverInitRange("js/Jencil.0.1.2.js", "49327:49347");
__$coverInitRange("js/Jencil.0.1.2.js", "49357:49403");
__$coverInitRange("js/Jencil.0.1.2.js", "49413:49424");
__$coverInitRange("js/Jencil.0.1.2.js", "49380:49393");
__$coverInitRange("js/Jencil.0.1.2.js", "49530:49552");
__$coverInitRange("js/Jencil.0.1.2.js", "49560:49608");
__$coverInitRange("js/Jencil.0.1.2.js", "49616:49646");
__$coverInitRange("js/Jencil.0.1.2.js", "49654:49760");
__$coverInitRange("js/Jencil.0.1.2.js", "49768:49801");
__$coverInitRange("js/Jencil.0.1.2.js", "49588:49600");
__$coverInitRange("js/Jencil.0.1.2.js", "49683:49710");
__$coverInitRange("js/Jencil.0.1.2.js", "49720:49752");
__$coverInitRange("js/Jencil.0.1.2.js", "49874:49896");
__$coverInitRange("js/Jencil.0.1.2.js", "49904:49930");
__$coverInitRange("js/Jencil.0.1.2.js", "49938:49964");
__$coverInitRange("js/Jencil.0.1.2.js", "49972:50028");
__$coverInitRange("js/Jencil.0.1.2.js", "50036:50092");
__$coverInitRange("js/Jencil.0.1.2.js", "50100:50112");
__$coverInitRange("js/Jencil.0.1.2.js", "50004:50020");
__$coverInitRange("js/Jencil.0.1.2.js", "50068:50084");
__$coverInitRange("js/Jencil.0.1.2.js", "50205:50240");
__$coverInitRange("js/Jencil.0.1.2.js", "50247:50869");
__$coverInitRange("js/Jencil.0.1.2.js", "50876:51139");
__$coverInitRange("js/Jencil.0.1.2.js", "51146:51241");
__$coverInitRange("js/Jencil.0.1.2.js", "51248:51656");
__$coverInitRange("js/Jencil.0.1.2.js", "51663:52123");
__$coverInitRange("js/Jencil.0.1.2.js", "52130:53491");
__$coverInitRange("js/Jencil.0.1.2.js", "53498:53521");
__$coverInitRange("js/Jencil.0.1.2.js", "50312:50327");
__$coverInitRange("js/Jencil.0.1.2.js", "50335:50415");
__$coverInitRange("js/Jencil.0.1.2.js", "50423:50456");
__$coverInitRange("js/Jencil.0.1.2.js", "50464:50497");
__$coverInitRange("js/Jencil.0.1.2.js", "50505:50539");
__$coverInitRange("js/Jencil.0.1.2.js", "50547:50602");
__$coverInitRange("js/Jencil.0.1.2.js", "50610:50665");
__$coverInitRange("js/Jencil.0.1.2.js", "50673:50763");
__$coverInitRange("js/Jencil.0.1.2.js", "50771:50863");
__$coverInitRange("js/Jencil.0.1.2.js", "50722:50755");
__$coverInitRange("js/Jencil.0.1.2.js", "50821:50855");
__$coverInitRange("js/Jencil.0.1.2.js", "50935:50952");
__$coverInitRange("js/Jencil.0.1.2.js", "50960:51027");
__$coverInitRange("js/Jencil.0.1.2.js", "51035:51059");
__$coverInitRange("js/Jencil.0.1.2.js", "51067:51100");
__$coverInitRange("js/Jencil.0.1.2.js", "51108:51132");
__$coverInitRange("js/Jencil.0.1.2.js", "51205:51234");
__$coverInitRange("js/Jencil.0.1.2.js", "51305:51315");
__$coverInitRange("js/Jencil.0.1.2.js", "51323:51392");
__$coverInitRange("js/Jencil.0.1.2.js", "51400:51469");
__$coverInitRange("js/Jencil.0.1.2.js", "51477:51538");
__$coverInitRange("js/Jencil.0.1.2.js", "51546:51621");
__$coverInitRange("js/Jencil.0.1.2.js", "51629:51649");
__$coverInitRange("js/Jencil.0.1.2.js", "51503:51530");
__$coverInitRange("js/Jencil.0.1.2.js", "51590:51613");
__$coverInitRange("js/Jencil.0.1.2.js", "51720:51742");
__$coverInitRange("js/Jencil.0.1.2.js", "51750:51780");
__$coverInitRange("js/Jencil.0.1.2.js", "51788:51857");
__$coverInitRange("js/Jencil.0.1.2.js", "51865:51934");
__$coverInitRange("js/Jencil.0.1.2.js", "51942:51996");
__$coverInitRange("js/Jencil.0.1.2.js", "52004:52079");
__$coverInitRange("js/Jencil.0.1.2.js", "52087:52116");
__$coverInitRange("js/Jencil.0.1.2.js", "51968:51988");
__$coverInitRange("js/Jencil.0.1.2.js", "52048:52071");
__$coverInitRange("js/Jencil.0.1.2.js", "52185:52226");
__$coverInitRange("js/Jencil.0.1.2.js", "52234:52254");
__$coverInitRange("js/Jencil.0.1.2.js", "52262:52292");
__$coverInitRange("js/Jencil.0.1.2.js", "52300:52357");
__$coverInitRange("js/Jencil.0.1.2.js", "52365:52437");
__$coverInitRange("js/Jencil.0.1.2.js", "52445:53346");
__$coverInitRange("js/Jencil.0.1.2.js", "53354:53371");
__$coverInitRange("js/Jencil.0.1.2.js", "53379:53396");
__$coverInitRange("js/Jencil.0.1.2.js", "53404:53465");
__$coverInitRange("js/Jencil.0.1.2.js", "53473:53484");
__$coverInitRange("js/Jencil.0.1.2.js", "52474:52556");
__$coverInitRange("js/Jencil.0.1.2.js", "52566:52649");
__$coverInitRange("js/Jencil.0.1.2.js", "52659:52704");
__$coverInitRange("js/Jencil.0.1.2.js", "52714:52737");
__$coverInitRange("js/Jencil.0.1.2.js", "52523:52546");
__$coverInitRange("js/Jencil.0.1.2.js", "52616:52639");
__$coverInitRange("js/Jencil.0.1.2.js", "52781:52864");
__$coverInitRange("js/Jencil.0.1.2.js", "52874:52956");
__$coverInitRange("js/Jencil.0.1.2.js", "52966:53011");
__$coverInitRange("js/Jencil.0.1.2.js", "53021:53053");
__$coverInitRange("js/Jencil.0.1.2.js", "52831:52854");
__$coverInitRange("js/Jencil.0.1.2.js", "52923:52946");
__$coverInitRange("js/Jencil.0.1.2.js", "53078:53161");
__$coverInitRange("js/Jencil.0.1.2.js", "53171:53254");
__$coverInitRange("js/Jencil.0.1.2.js", "53264:53296");
__$coverInitRange("js/Jencil.0.1.2.js", "53306:53338");
__$coverInitRange("js/Jencil.0.1.2.js", "53128:53151");
__$coverInitRange("js/Jencil.0.1.2.js", "53221:53244");
__$coverInitRange("js/Jencil.0.1.2.js", "53589:53626");
__$coverInitRange("js/Jencil.0.1.2.js", "53633:54135");
__$coverInitRange("js/Jencil.0.1.2.js", "54142:54407");
__$coverInitRange("js/Jencil.0.1.2.js", "54414:54512");
__$coverInitRange("js/Jencil.0.1.2.js", "54519:54933");
__$coverInitRange("js/Jencil.0.1.2.js", "54940:55406");
__$coverInitRange("js/Jencil.0.1.2.js", "55413:56783");
__$coverInitRange("js/Jencil.0.1.2.js", "56790:56815");
__$coverInitRange("js/Jencil.0.1.2.js", "53700:53715");
__$coverInitRange("js/Jencil.0.1.2.js", "53723:53805");
__$coverInitRange("js/Jencil.0.1.2.js", "53813:53848");
__$coverInitRange("js/Jencil.0.1.2.js", "53856:53888");
__$coverInitRange("js/Jencil.0.1.2.js", "53896:53931");
__$coverInitRange("js/Jencil.0.1.2.js", "53939:54029");
__$coverInitRange("js/Jencil.0.1.2.js", "54037:54129");
__$coverInitRange("js/Jencil.0.1.2.js", "53988:54021");
__$coverInitRange("js/Jencil.0.1.2.js", "54087:54121");
__$coverInitRange("js/Jencil.0.1.2.js", "54203:54220");
__$coverInitRange("js/Jencil.0.1.2.js", "54228:54295");
__$coverInitRange("js/Jencil.0.1.2.js", "54303:54327");
__$coverInitRange("js/Jencil.0.1.2.js", "54335:54368");
__$coverInitRange("js/Jencil.0.1.2.js", "54376:54400");
__$coverInitRange("js/Jencil.0.1.2.js", "54475:54505");
__$coverInitRange("js/Jencil.0.1.2.js", "54578:54588");
__$coverInitRange("js/Jencil.0.1.2.js", "54596:54667");
__$coverInitRange("js/Jencil.0.1.2.js", "54675:54746");
__$coverInitRange("js/Jencil.0.1.2.js", "54754:54815");
__$coverInitRange("js/Jencil.0.1.2.js", "54823:54898");
__$coverInitRange("js/Jencil.0.1.2.js", "54906:54926");
__$coverInitRange("js/Jencil.0.1.2.js", "54780:54807");
__$coverInitRange("js/Jencil.0.1.2.js", "54867:54890");
__$coverInitRange("js/Jencil.0.1.2.js", "54999:55021");
__$coverInitRange("js/Jencil.0.1.2.js", "55029:55059");
__$coverInitRange("js/Jencil.0.1.2.js", "55067:55138");
__$coverInitRange("js/Jencil.0.1.2.js", "55146:55217");
__$coverInitRange("js/Jencil.0.1.2.js", "55225:55279");
__$coverInitRange("js/Jencil.0.1.2.js", "55287:55362");
__$coverInitRange("js/Jencil.0.1.2.js", "55370:55399");
__$coverInitRange("js/Jencil.0.1.2.js", "55251:55271");
__$coverInitRange("js/Jencil.0.1.2.js", "55331:55354");
__$coverInitRange("js/Jencil.0.1.2.js", "55470:55511");
__$coverInitRange("js/Jencil.0.1.2.js", "55519:55539");
__$coverInitRange("js/Jencil.0.1.2.js", "55547:55577");
__$coverInitRange("js/Jencil.0.1.2.js", "55585:55643");
__$coverInitRange("js/Jencil.0.1.2.js", "55651:55724");
__$coverInitRange("js/Jencil.0.1.2.js", "55732:56637");
__$coverInitRange("js/Jencil.0.1.2.js", "56645:56662");
__$coverInitRange("js/Jencil.0.1.2.js", "56670:56687");
__$coverInitRange("js/Jencil.0.1.2.js", "56695:56757");
__$coverInitRange("js/Jencil.0.1.2.js", "56765:56776");
__$coverInitRange("js/Jencil.0.1.2.js", "55761:55843");
__$coverInitRange("js/Jencil.0.1.2.js", "55853:55936");
__$coverInitRange("js/Jencil.0.1.2.js", "55946:55992");
__$coverInitRange("js/Jencil.0.1.2.js", "56002:56025");
__$coverInitRange("js/Jencil.0.1.2.js", "55810:55833");
__$coverInitRange("js/Jencil.0.1.2.js", "55903:55926");
__$coverInitRange("js/Jencil.0.1.2.js", "56069:56152");
__$coverInitRange("js/Jencil.0.1.2.js", "56162:56244");
__$coverInitRange("js/Jencil.0.1.2.js", "56254:56300");
__$coverInitRange("js/Jencil.0.1.2.js", "56310:56342");
__$coverInitRange("js/Jencil.0.1.2.js", "56119:56142");
__$coverInitRange("js/Jencil.0.1.2.js", "56211:56234");
__$coverInitRange("js/Jencil.0.1.2.js", "56367:56450");
__$coverInitRange("js/Jencil.0.1.2.js", "56460:56543");
__$coverInitRange("js/Jencil.0.1.2.js", "56553:56586");
__$coverInitRange("js/Jencil.0.1.2.js", "56596:56629");
__$coverInitRange("js/Jencil.0.1.2.js", "56417:56440");
__$coverInitRange("js/Jencil.0.1.2.js", "56510:56533");
__$coverInitRange("js/Jencil.0.1.2.js", "56902:56929");
__$coverInitRange("js/Jencil.0.1.2.js", "56935:56978");
__$coverInitRange("js/Jencil.0.1.2.js", "56984:57038");
__$coverInitRange("js/Jencil.0.1.2.js", "57087:57116");
__$coverInitRange("js/Jencil.0.1.2.js", "57123:57389");
__$coverInitRange("js/Jencil.0.1.2.js", "57396:57492");
__$coverInitRange("js/Jencil.0.1.2.js", "57499:57877");
__$coverInitRange("js/Jencil.0.1.2.js", "57884:57914");
__$coverInitRange("js/Jencil.0.1.2.js", "57921:57951");
__$coverInitRange("js/Jencil.0.1.2.js", "57958:57988");
__$coverInitRange("js/Jencil.0.1.2.js", "57995:58025");
__$coverInitRange("js/Jencil.0.1.2.js", "58032:58062");
__$coverInitRange("js/Jencil.0.1.2.js", "58069:58099");
__$coverInitRange("js/Jencil.0.1.2.js", "58106:58138");
__$coverInitRange("js/Jencil.0.1.2.js", "58145:58179");
__$coverInitRange("js/Jencil.0.1.2.js", "58186:58223");
__$coverInitRange("js/Jencil.0.1.2.js", "58230:58264");
__$coverInitRange("js/Jencil.0.1.2.js", "58271:58310");
__$coverInitRange("js/Jencil.0.1.2.js", "58317:58354");
__$coverInitRange("js/Jencil.0.1.2.js", "58361:58395");
__$coverInitRange("js/Jencil.0.1.2.js", "58402:58435");
__$coverInitRange("js/Jencil.0.1.2.js", "58442:58483");
__$coverInitRange("js/Jencil.0.1.2.js", "58490:58529");
__$coverInitRange("js/Jencil.0.1.2.js", "58536:58553");
__$coverInitRange("js/Jencil.0.1.2.js", "57176:57234");
__$coverInitRange("js/Jencil.0.1.2.js", "57242:57310");
__$coverInitRange("js/Jencil.0.1.2.js", "57318:57349");
__$coverInitRange("js/Jencil.0.1.2.js", "57357:57383");
__$coverInitRange("js/Jencil.0.1.2.js", "57208:57226");
__$coverInitRange("js/Jencil.0.1.2.js", "57447:57485");
__$coverInitRange("js/Jencil.0.1.2.js", "57556:57574");
__$coverInitRange("js/Jencil.0.1.2.js", "57582:57679");
__$coverInitRange("js/Jencil.0.1.2.js", "57687:57715");
__$coverInitRange("js/Jencil.0.1.2.js", "57723:57851");
__$coverInitRange("js/Jencil.0.1.2.js", "57859:57870");
__$coverInitRange("js/Jencil.0.1.2.js", "57614:57650");
__$coverInitRange("js/Jencil.0.1.2.js", "57660:57671");
__$coverInitRange("js/Jencil.0.1.2.js", "57783:57802");
__$coverInitRange("js/Jencil.0.1.2.js", "57812:57843");
__$coverInitRange("js/Jencil.0.1.2.js", "58610:58639");
__$coverInitRange("js/Jencil.0.1.2.js", "58646:59703");
__$coverInitRange("js/Jencil.0.1.2.js", "59710:59907");
__$coverInitRange("js/Jencil.0.1.2.js", "59914:60009");
__$coverInitRange("js/Jencil.0.1.2.js", "60016:60096");
__$coverInitRange("js/Jencil.0.1.2.js", "60103:60194");
__$coverInitRange("js/Jencil.0.1.2.js", "60201:60378");
__$coverInitRange("js/Jencil.0.1.2.js", "60385:60729");
__$coverInitRange("js/Jencil.0.1.2.js", "60736:61164");
__$coverInitRange("js/Jencil.0.1.2.js", "61171:61607");
__$coverInitRange("js/Jencil.0.1.2.js", "61614:62048");
__$coverInitRange("js/Jencil.0.1.2.js", "62055:62072");
__$coverInitRange("js/Jencil.0.1.2.js", "58699:58715");
__$coverInitRange("js/Jencil.0.1.2.js", "58723:58781");
__$coverInitRange("js/Jencil.0.1.2.js", "58789:58857");
__$coverInitRange("js/Jencil.0.1.2.js", "58865:59059");
__$coverInitRange("js/Jencil.0.1.2.js", "59067:59105");
__$coverInitRange("js/Jencil.0.1.2.js", "59113:59265");
__$coverInitRange("js/Jencil.0.1.2.js", "59273:59437");
__$coverInitRange("js/Jencil.0.1.2.js", "59445:59490");
__$coverInitRange("js/Jencil.0.1.2.js", "59498:59591");
__$coverInitRange("js/Jencil.0.1.2.js", "59599:59697");
__$coverInitRange("js/Jencil.0.1.2.js", "58755:58773");
__$coverInitRange("js/Jencil.0.1.2.js", "59163:59211");
__$coverInitRange("js/Jencil.0.1.2.js", "59221:59255");
__$coverInitRange("js/Jencil.0.1.2.js", "59195:59201");
__$coverInitRange("js/Jencil.0.1.2.js", "59346:59429");
__$coverInitRange("js/Jencil.0.1.2.js", "59549:59583");
__$coverInitRange("js/Jencil.0.1.2.js", "59666:59687");
__$coverInitRange("js/Jencil.0.1.2.js", "59761:59866");
__$coverInitRange("js/Jencil.0.1.2.js", "59874:59900");
__$coverInitRange("js/Jencil.0.1.2.js", "59790:59814");
__$coverInitRange("js/Jencil.0.1.2.js", "59824:59837");
__$coverInitRange("js/Jencil.0.1.2.js", "59847:59858");
__$coverInitRange("js/Jencil.0.1.2.js", "59962:59983");
__$coverInitRange("js/Jencil.0.1.2.js", "59991:60002");
__$coverInitRange("js/Jencil.0.1.2.js", "60072:60089");
__$coverInitRange("js/Jencil.0.1.2.js", "60163:60187");
__$coverInitRange("js/Jencil.0.1.2.js", "60250:60296");
__$coverInitRange("js/Jencil.0.1.2.js", "60304:60352");
__$coverInitRange("js/Jencil.0.1.2.js", "60360:60371");
__$coverInitRange("js/Jencil.0.1.2.js", "60455:60520");
__$coverInitRange("js/Jencil.0.1.2.js", "60528:60677");
__$coverInitRange("js/Jencil.0.1.2.js", "60685:60722");
__$coverInitRange("js/Jencil.0.1.2.js", "60492:60512");
__$coverInitRange("js/Jencil.0.1.2.js", "60555:60603");
__$coverInitRange("js/Jencil.0.1.2.js", "60613:60639");
__$coverInitRange("js/Jencil.0.1.2.js", "60649:60669");
__$coverInitRange("js/Jencil.0.1.2.js", "60805:60814");
__$coverInitRange("js/Jencil.0.1.2.js", "60822:60887");
__$coverInitRange("js/Jencil.0.1.2.js", "60895:60934");
__$coverInitRange("js/Jencil.0.1.2.js", "60942:61035");
__$coverInitRange("js/Jencil.0.1.2.js", "61043:61095");
__$coverInitRange("js/Jencil.0.1.2.js", "61103:61129");
__$coverInitRange("js/Jencil.0.1.2.js", "61137:61157");
__$coverInitRange("js/Jencil.0.1.2.js", "60859:60879");
__$coverInitRange("js/Jencil.0.1.2.js", "60979:61027");
__$coverInitRange("js/Jencil.0.1.2.js", "61244:61253");
__$coverInitRange("js/Jencil.0.1.2.js", "61261:61326");
__$coverInitRange("js/Jencil.0.1.2.js", "61334:61373");
__$coverInitRange("js/Jencil.0.1.2.js", "61381:61474");
__$coverInitRange("js/Jencil.0.1.2.js", "61482:61538");
__$coverInitRange("js/Jencil.0.1.2.js", "61546:61572");
__$coverInitRange("js/Jencil.0.1.2.js", "61580:61600");
__$coverInitRange("js/Jencil.0.1.2.js", "61298:61318");
__$coverInitRange("js/Jencil.0.1.2.js", "61418:61466");
__$coverInitRange("js/Jencil.0.1.2.js", "61686:61695");
__$coverInitRange("js/Jencil.0.1.2.js", "61703:61768");
__$coverInitRange("js/Jencil.0.1.2.js", "61776:61815");
__$coverInitRange("js/Jencil.0.1.2.js", "61823:61916");
__$coverInitRange("js/Jencil.0.1.2.js", "61924:61979");
__$coverInitRange("js/Jencil.0.1.2.js", "61987:62013");
__$coverInitRange("js/Jencil.0.1.2.js", "62021:62041");
__$coverInitRange("js/Jencil.0.1.2.js", "61740:61760");
__$coverInitRange("js/Jencil.0.1.2.js", "61860:61908");
__$coverInitRange("js/Jencil.0.1.2.js", "62159:62190");
__$coverInitRange("js/Jencil.0.1.2.js", "62196:62234");
__$coverInitRange("js/Jencil.0.1.2.js", "62283:62312");
__$coverInitRange("js/Jencil.0.1.2.js", "62319:62551");
__$coverInitRange("js/Jencil.0.1.2.js", "62558:62664");
__$coverInitRange("js/Jencil.0.1.2.js", "62671:62688");
__$coverInitRange("js/Jencil.0.1.2.js", "62372:62430");
__$coverInitRange("js/Jencil.0.1.2.js", "62438:62506");
__$coverInitRange("js/Jencil.0.1.2.js", "62514:62545");
__$coverInitRange("js/Jencil.0.1.2.js", "62404:62422");
__$coverInitRange("js/Jencil.0.1.2.js", "62619:62657");
__$coverInitRange("js/Jencil.0.1.2.js", "62749:62782");
__$coverInitRange("js/Jencil.0.1.2.js", "62789:64607");
__$coverInitRange("js/Jencil.0.1.2.js", "64614:64697");
__$coverInitRange("js/Jencil.0.1.2.js", "64704:65033");
__$coverInitRange("js/Jencil.0.1.2.js", "65040:65217");
__$coverInitRange("js/Jencil.0.1.2.js", "65224:65245");
__$coverInitRange("js/Jencil.0.1.2.js", "62827:62880");
__$coverInitRange("js/Jencil.0.1.2.js", "62888:62944");
__$coverInitRange("js/Jencil.0.1.2.js", "62952:63010");
__$coverInitRange("js/Jencil.0.1.2.js", "63018:63061");
__$coverInitRange("js/Jencil.0.1.2.js", "63069:63325");
__$coverInitRange("js/Jencil.0.1.2.js", "63333:63367");
__$coverInitRange("js/Jencil.0.1.2.js", "63375:63409");
__$coverInitRange("js/Jencil.0.1.2.js", "63417:63739");
__$coverInitRange("js/Jencil.0.1.2.js", "63747:64313");
__$coverInitRange("js/Jencil.0.1.2.js", "64321:64601");
__$coverInitRange("js/Jencil.0.1.2.js", "63457:63467");
__$coverInitRange("js/Jencil.0.1.2.js", "63477:63497");
__$coverInitRange("js/Jencil.0.1.2.js", "63507:63677");
__$coverInitRange("js/Jencil.0.1.2.js", "63687:63730");
__$coverInitRange("js/Jencil.0.1.2.js", "63555:63593");
__$coverInitRange("js/Jencil.0.1.2.js", "63622:63667");
__$coverInitRange("js/Jencil.0.1.2.js", "63793:63806");
__$coverInitRange("js/Jencil.0.1.2.js", "63816:64282");
__$coverInitRange("js/Jencil.0.1.2.js", "64292:64304");
__$coverInitRange("js/Jencil.0.1.2.js", "63855:63987");
__$coverInitRange("js/Jencil.0.1.2.js", "63999:64019");
__$coverInitRange("js/Jencil.0.1.2.js", "64031:64057");
__$coverInitRange("js/Jencil.0.1.2.js", "64069:64090");
__$coverInitRange("js/Jencil.0.1.2.js", "64102:64153");
__$coverInitRange("js/Jencil.0.1.2.js", "64165:64201");
__$coverInitRange("js/Jencil.0.1.2.js", "64213:64249");
__$coverInitRange("js/Jencil.0.1.2.js", "64261:64272");
__$coverInitRange("js/Jencil.0.1.2.js", "63873:63924");
__$coverInitRange("js/Jencil.0.1.2.js", "63962:63975");
__$coverInitRange("js/Jencil.0.1.2.js", "64388:64404");
__$coverInitRange("js/Jencil.0.1.2.js", "64414:64592");
__$coverInitRange("js/Jencil.0.1.2.js", "64507:64529");
__$coverInitRange("js/Jencil.0.1.2.js", "64543:64568");
__$coverInitRange("js/Jencil.0.1.2.js", "64665:64690");
__$coverInitRange("js/Jencil.0.1.2.js", "64769:64987");
__$coverInitRange("js/Jencil.0.1.2.js", "64995:65026");
__$coverInitRange("js/Jencil.0.1.2.js", "64814:64873");
__$coverInitRange("js/Jencil.0.1.2.js", "64929:64979");
__$coverInitRange("js/Jencil.0.1.2.js", "65093:65137");
__$coverInitRange("js/Jencil.0.1.2.js", "65145:65191");
__$coverInitRange("js/Jencil.0.1.2.js", "65199:65210");
__$coverInitRange("js/Jencil.0.1.2.js", "65307:65336");
__$coverInitRange("js/Jencil.0.1.2.js", "65343:65679");
__$coverInitRange("js/Jencil.0.1.2.js", "65686:66418");
__$coverInitRange("js/Jencil.0.1.2.js", "66425:66442");
__$coverInitRange("js/Jencil.0.1.2.js", "65385:65405");
__$coverInitRange("js/Jencil.0.1.2.js", "65413:65462");
__$coverInitRange("js/Jencil.0.1.2.js", "65470:65673");
__$coverInitRange("js/Jencil.0.1.2.js", "65589:65621");
__$coverInitRange("js/Jencil.0.1.2.js", "65747:65763");
__$coverInitRange("js/Jencil.0.1.2.js", "65771:66411");
__$coverInitRange("js/Jencil.0.1.2.js", "65822:65846");
__$coverInitRange("js/Jencil.0.1.2.js", "65856:66403");
__$coverInitRange("js/Jencil.0.1.2.js", "66086:66333");
__$coverInitRange("js/Jencil.0.1.2.js", "66347:66379");
__$coverInitRange("js/Jencil.0.1.2.js", "66138:66198");
__$coverInitRange("js/Jencil.0.1.2.js", "66267:66319");
__$coverInitRange("js/Jencil.0.1.2.js", "66533:66564");
__$coverInitRange("js/Jencil.0.1.2.js", "66570:66609");
__$coverInitRange("js/Jencil.0.1.2.js", "66615:66653");
__$coverInitRange("js/Jencil.0.1.2.js", "66702:66731");
__$coverInitRange("js/Jencil.0.1.2.js", "66738:66970");
__$coverInitRange("js/Jencil.0.1.2.js", "66977:66994");
__$coverInitRange("js/Jencil.0.1.2.js", "66791:66849");
__$coverInitRange("js/Jencil.0.1.2.js", "66857:66925");
__$coverInitRange("js/Jencil.0.1.2.js", "66933:66964");
__$coverInitRange("js/Jencil.0.1.2.js", "66823:66841");
__$coverInitRange("js/Jencil.0.1.2.js", "67055:67088");
__$coverInitRange("js/Jencil.0.1.2.js", "67095:68869");
__$coverInitRange("js/Jencil.0.1.2.js", "68876:69059");
__$coverInitRange("js/Jencil.0.1.2.js", "69066:69243");
__$coverInitRange("js/Jencil.0.1.2.js", "69250:69271");
__$coverInitRange("js/Jencil.0.1.2.js", "67133:67186");
__$coverInitRange("js/Jencil.0.1.2.js", "67194:67250");
__$coverInitRange("js/Jencil.0.1.2.js", "67258:67316");
__$coverInitRange("js/Jencil.0.1.2.js", "67324:67367");
__$coverInitRange("js/Jencil.0.1.2.js", "67375:67631");
__$coverInitRange("js/Jencil.0.1.2.js", "67639:67673");
__$coverInitRange("js/Jencil.0.1.2.js", "67681:67715");
__$coverInitRange("js/Jencil.0.1.2.js", "67723:68045");
__$coverInitRange("js/Jencil.0.1.2.js", "68053:68619");
__$coverInitRange("js/Jencil.0.1.2.js", "68627:68863");
__$coverInitRange("js/Jencil.0.1.2.js", "67763:67773");
__$coverInitRange("js/Jencil.0.1.2.js", "67783:67803");
__$coverInitRange("js/Jencil.0.1.2.js", "67813:67983");
__$coverInitRange("js/Jencil.0.1.2.js", "67993:68036");
__$coverInitRange("js/Jencil.0.1.2.js", "67861:67899");
__$coverInitRange("js/Jencil.0.1.2.js", "67928:67973");
__$coverInitRange("js/Jencil.0.1.2.js", "68099:68112");
__$coverInitRange("js/Jencil.0.1.2.js", "68122:68588");
__$coverInitRange("js/Jencil.0.1.2.js", "68598:68610");
__$coverInitRange("js/Jencil.0.1.2.js", "68161:68293");
__$coverInitRange("js/Jencil.0.1.2.js", "68305:68325");
__$coverInitRange("js/Jencil.0.1.2.js", "68337:68363");
__$coverInitRange("js/Jencil.0.1.2.js", "68375:68396");
__$coverInitRange("js/Jencil.0.1.2.js", "68408:68459");
__$coverInitRange("js/Jencil.0.1.2.js", "68471:68507");
__$coverInitRange("js/Jencil.0.1.2.js", "68519:68555");
__$coverInitRange("js/Jencil.0.1.2.js", "68567:68578");
__$coverInitRange("js/Jencil.0.1.2.js", "68179:68230");
__$coverInitRange("js/Jencil.0.1.2.js", "68268:68281");
__$coverInitRange("js/Jencil.0.1.2.js", "68687:68703");
__$coverInitRange("js/Jencil.0.1.2.js", "68713:68854");
__$coverInitRange("js/Jencil.0.1.2.js", "68806:68830");
__$coverInitRange("js/Jencil.0.1.2.js", "68927:68945");
__$coverInitRange("js/Jencil.0.1.2.js", "68953:69052");
__$coverInitRange("js/Jencil.0.1.2.js", "68994:69044");
__$coverInitRange("js/Jencil.0.1.2.js", "69119:69163");
__$coverInitRange("js/Jencil.0.1.2.js", "69171:69217");
__$coverInitRange("js/Jencil.0.1.2.js", "69225:69236");
__$coverInitRange("js/Jencil.0.1.2.js", "69358:69389");
__$coverInitRange("js/Jencil.0.1.2.js", "69395:69441");
__$coverInitRange("js/Jencil.0.1.2.js", "69489:69517");
__$coverInitRange("js/Jencil.0.1.2.js", "69524:69663");
__$coverInitRange("js/Jencil.0.1.2.js", "69670:69686");
__$coverInitRange("js/Jencil.0.1.2.js", "69557:69615");
__$coverInitRange("js/Jencil.0.1.2.js", "69623:69657");
__$coverInitRange("js/Jencil.0.1.2.js", "69740:69765");
__$coverInitRange("js/Jencil.0.1.2.js", "69772:70223");
__$coverInitRange("js/Jencil.0.1.2.js", "70230:70324");
__$coverInitRange("js/Jencil.0.1.2.js", "70331:70423");
__$coverInitRange("js/Jencil.0.1.2.js", "70430:70495");
__$coverInitRange("js/Jencil.0.1.2.js", "70502:70515");
__$coverInitRange("js/Jencil.0.1.2.js", "69821:69837");
__$coverInitRange("js/Jencil.0.1.2.js", "69845:69861");
__$coverInitRange("js/Jencil.0.1.2.js", "69869:69887");
__$coverInitRange("js/Jencil.0.1.2.js", "69895:69947");
__$coverInitRange("js/Jencil.0.1.2.js", "69955:69999");
__$coverInitRange("js/Jencil.0.1.2.js", "70007:70053");
__$coverInitRange("js/Jencil.0.1.2.js", "70061:70107");
__$coverInitRange("js/Jencil.0.1.2.js", "70115:70171");
__$coverInitRange("js/Jencil.0.1.2.js", "70179:70217");
__$coverInitRange("js/Jencil.0.1.2.js", "70275:70317");
__$coverInitRange("js/Jencil.0.1.2.js", "70377:70416");
__$coverInitRange("js/Jencil.0.1.2.js", "70477:70488");
__$coverInitRange("js/Jencil.0.1.2.js", "70575:70606");
__$coverInitRange("js/Jencil.0.1.2.js", "70613:71330");
__$coverInitRange("js/Jencil.0.1.2.js", "71337:71356");
__$coverInitRange("js/Jencil.0.1.2.js", "70688:70704");
__$coverInitRange("js/Jencil.0.1.2.js", "70712:70736");
__$coverInitRange("js/Jencil.0.1.2.js", "70744:70814");
__$coverInitRange("js/Jencil.0.1.2.js", "70822:70947");
__$coverInitRange("js/Jencil.0.1.2.js", "70955:70983");
__$coverInitRange("js/Jencil.0.1.2.js", "70991:71064");
__$coverInitRange("js/Jencil.0.1.2.js", "71072:71324");
__$coverInitRange("js/Jencil.0.1.2.js", "70859:70938");
__$coverInitRange("js/Jencil.0.1.2.js", "70911:70928");
__$coverInitRange("js/Jencil.0.1.2.js", "71031:71054");
__$coverInitRange("js/Jencil.0.1.2.js", "71140:71234");
__$coverInitRange("js/Jencil.0.1.2.js", "71244:71316");
__$coverInitRange("js/Jencil.0.1.2.js", "71199:71222");
__$coverInitRange("js/Jencil.0.1.2.js", "71417:71449");
__$coverInitRange("js/Jencil.0.1.2.js", "71456:71814");
__$coverInitRange("js/Jencil.0.1.2.js", "71821:71900");
__$coverInitRange("js/Jencil.0.1.2.js", "71907:72109");
__$coverInitRange("js/Jencil.0.1.2.js", "72116:73064");
__$coverInitRange("js/Jencil.0.1.2.js", "73071:73091");
__$coverInitRange("js/Jencil.0.1.2.js", "71531:71543");
__$coverInitRange("js/Jencil.0.1.2.js", "71551:71573");
__$coverInitRange("js/Jencil.0.1.2.js", "71581:71709");
__$coverInitRange("js/Jencil.0.1.2.js", "71717:71808");
__$coverInitRange("js/Jencil.0.1.2.js", "71613:71623");
__$coverInitRange("js/Jencil.0.1.2.js", "71633:71655");
__$coverInitRange("js/Jencil.0.1.2.js", "71665:71700");
__$coverInitRange("js/Jencil.0.1.2.js", "71871:71893");
__$coverInitRange("js/Jencil.0.1.2.js", "71961:71971");
__$coverInitRange("js/Jencil.0.1.2.js", "71979:72006");
__$coverInitRange("js/Jencil.0.1.2.js", "72014:72083");
__$coverInitRange("js/Jencil.0.1.2.js", "72091:72102");
__$coverInitRange("js/Jencil.0.1.2.js", "72061:72075");
__$coverInitRange("js/Jencil.0.1.2.js", "72169:72209");
__$coverInitRange("js/Jencil.0.1.2.js", "72217:72264");
__$coverInitRange("js/Jencil.0.1.2.js", "72272:72981");
__$coverInitRange("js/Jencil.0.1.2.js", "72989:73057");
__$coverInitRange("js/Jencil.0.1.2.js", "72321:72335");
__$coverInitRange("js/Jencil.0.1.2.js", "72347:72361");
__$coverInitRange("js/Jencil.0.1.2.js", "72373:72388");
__$coverInitRange("js/Jencil.0.1.2.js", "72400:72417");
__$coverInitRange("js/Jencil.0.1.2.js", "72429:72447");
__$coverInitRange("js/Jencil.0.1.2.js", "72459:72464");
__$coverInitRange("js/Jencil.0.1.2.js", "72492:72506");
__$coverInitRange("js/Jencil.0.1.2.js", "72518:72540");
__$coverInitRange("js/Jencil.0.1.2.js", "72552:72569");
__$coverInitRange("js/Jencil.0.1.2.js", "72581:72599");
__$coverInitRange("js/Jencil.0.1.2.js", "72611:72616");
__$coverInitRange("js/Jencil.0.1.2.js", "72644:72668");
__$coverInitRange("js/Jencil.0.1.2.js", "72680:72702");
__$coverInitRange("js/Jencil.0.1.2.js", "72714:72732");
__$coverInitRange("js/Jencil.0.1.2.js", "72744:72749");
__$coverInitRange("js/Jencil.0.1.2.js", "72777:72801");
__$coverInitRange("js/Jencil.0.1.2.js", "72813:72835");
__$coverInitRange("js/Jencil.0.1.2.js", "72847:72862");
__$coverInitRange("js/Jencil.0.1.2.js", "72874:72879");
__$coverInitRange("js/Jencil.0.1.2.js", "72907:72946");
__$coverInitRange("js/Jencil.0.1.2.js", "72958:72973");
__$coverInitRange("js/Jencil.0.1.2.js", "73155:73184");
__$coverInitRange("js/Jencil.0.1.2.js", "73191:73450");
__$coverInitRange("js/Jencil.0.1.2.js", "73457:73766");
__$coverInitRange("js/Jencil.0.1.2.js", "73773:73790");
__$coverInitRange("js/Jencil.0.1.2.js", "73225:73259");
__$coverInitRange("js/Jencil.0.1.2.js", "73267:73343");
__$coverInitRange("js/Jencil.0.1.2.js", "73351:73444");
__$coverInitRange("js/Jencil.0.1.2.js", "73300:73334");
__$coverInitRange("js/Jencil.0.1.2.js", "73504:73535");
__$coverInitRange("js/Jencil.0.1.2.js", "73543:73737");
__$coverInitRange("js/Jencil.0.1.2.js", "73745:73759");
__$coverInitRange("js/Jencil.0.1.2.js", "73572:73689");
__$coverInitRange("js/Jencil.0.1.2.js", "73699:73728");
__$coverInitRange("js/Jencil.0.1.2.js", "73621:73636");
__$coverInitRange("js/Jencil.0.1.2.js", "73665:73679");
__$coverInitRange("js/Jencil.0.1.2.js", "73854:73883");
__$coverInitRange("js/Jencil.0.1.2.js", "73890:74155");
__$coverInitRange("js/Jencil.0.1.2.js", "74162:74471");
__$coverInitRange("js/Jencil.0.1.2.js", "74478:74495");
__$coverInitRange("js/Jencil.0.1.2.js", "73924:73958");
__$coverInitRange("js/Jencil.0.1.2.js", "73966:74042");
__$coverInitRange("js/Jencil.0.1.2.js", "74050:74149");
__$coverInitRange("js/Jencil.0.1.2.js", "73999:74033");
__$coverInitRange("js/Jencil.0.1.2.js", "74209:74240");
__$coverInitRange("js/Jencil.0.1.2.js", "74248:74442");
__$coverInitRange("js/Jencil.0.1.2.js", "74450:74464");
__$coverInitRange("js/Jencil.0.1.2.js", "74277:74394");
__$coverInitRange("js/Jencil.0.1.2.js", "74404:74433");
__$coverInitRange("js/Jencil.0.1.2.js", "74326:74341");
__$coverInitRange("js/Jencil.0.1.2.js", "74370:74384");
__$coverInitRange("js/Jencil.0.1.2.js", "74565:74600");
__$coverInitRange("js/Jencil.0.1.2.js", "74607:74906");
__$coverInitRange("js/Jencil.0.1.2.js", "74913:75275");
__$coverInitRange("js/Jencil.0.1.2.js", "75282:75305");
__$coverInitRange("js/Jencil.0.1.2.js", "74647:74681");
__$coverInitRange("js/Jencil.0.1.2.js", "74689:74768");
__$coverInitRange("js/Jencil.0.1.2.js", "74776:74900");
__$coverInitRange("js/Jencil.0.1.2.js", "74722:74759");
__$coverInitRange("js/Jencil.0.1.2.js", "74966:74997");
__$coverInitRange("js/Jencil.0.1.2.js", "75005:75246");
__$coverInitRange("js/Jencil.0.1.2.js", "75254:75268");
__$coverInitRange("js/Jencil.0.1.2.js", "75034:75198");
__$coverInitRange("js/Jencil.0.1.2.js", "75208:75237");
__$coverInitRange("js/Jencil.0.1.2.js", "75096:75126");
__$coverInitRange("js/Jencil.0.1.2.js", "75155:75188");
__$coverInitRange("js/Jencil.0.1.2.js", "75371:75402");
__$coverInitRange("js/Jencil.0.1.2.js", "75409:75687");
__$coverInitRange("js/Jencil.0.1.2.js", "75694:75852");
__$coverInitRange("js/Jencil.0.1.2.js", "75859:76269");
__$coverInitRange("js/Jencil.0.1.2.js", "76276:76295");
__$coverInitRange("js/Jencil.0.1.2.js", "75445:75479");
__$coverInitRange("js/Jencil.0.1.2.js", "75487:75564");
__$coverInitRange("js/Jencil.0.1.2.js", "75572:75681");
__$coverInitRange("js/Jencil.0.1.2.js", "75520:75555");
__$coverInitRange("js/Jencil.0.1.2.js", "75747:75826");
__$coverInitRange("js/Jencil.0.1.2.js", "75834:75845");
__$coverInitRange("js/Jencil.0.1.2.js", "75782:75796");
__$coverInitRange("js/Jencil.0.1.2.js", "75806:75818");
__$coverInitRange("js/Jencil.0.1.2.js", "75908:75939");
__$coverInitRange("js/Jencil.0.1.2.js", "75947:75993");
__$coverInitRange("js/Jencil.0.1.2.js", "76001:76240");
__$coverInitRange("js/Jencil.0.1.2.js", "76248:76262");
__$coverInitRange("js/Jencil.0.1.2.js", "75979:75985");
__$coverInitRange("js/Jencil.0.1.2.js", "76030:76192");
__$coverInitRange("js/Jencil.0.1.2.js", "76202:76231");
__$coverInitRange("js/Jencil.0.1.2.js", "76090:76120");
__$coverInitRange("js/Jencil.0.1.2.js", "76149:76182");
__$coverInitRange("js/Jencil.0.1.2.js", "76361:76392");
__$coverInitRange("js/Jencil.0.1.2.js", "76399:76665");
__$coverInitRange("js/Jencil.0.1.2.js", "76672:76830");
__$coverInitRange("js/Jencil.0.1.2.js", "76837:77247");
__$coverInitRange("js/Jencil.0.1.2.js", "77254:77273");
__$coverInitRange("js/Jencil.0.1.2.js", "76435:76469");
__$coverInitRange("js/Jencil.0.1.2.js", "76477:76554");
__$coverInitRange("js/Jencil.0.1.2.js", "76562:76659");
__$coverInitRange("js/Jencil.0.1.2.js", "76510:76545");
__$coverInitRange("js/Jencil.0.1.2.js", "76725:76804");
__$coverInitRange("js/Jencil.0.1.2.js", "76812:76823");
__$coverInitRange("js/Jencil.0.1.2.js", "76760:76774");
__$coverInitRange("js/Jencil.0.1.2.js", "76784:76796");
__$coverInitRange("js/Jencil.0.1.2.js", "76886:76917");
__$coverInitRange("js/Jencil.0.1.2.js", "76925:76971");
__$coverInitRange("js/Jencil.0.1.2.js", "76979:77218");
__$coverInitRange("js/Jencil.0.1.2.js", "77226:77240");
__$coverInitRange("js/Jencil.0.1.2.js", "76957:76963");
__$coverInitRange("js/Jencil.0.1.2.js", "77008:77170");
__$coverInitRange("js/Jencil.0.1.2.js", "77180:77209");
__$coverInitRange("js/Jencil.0.1.2.js", "77068:77098");
__$coverInitRange("js/Jencil.0.1.2.js", "77127:77160");
__$coverInitRange("js/Jencil.0.1.2.js", "77343:77426");
__$coverInitRange("js/Jencil.0.1.2.js", "77432:77974");
__$coverInitRange("js/Jencil.0.1.2.js", "77980:78002");
__$coverInitRange("js/Jencil.0.1.2.js", "77379:77420");
__$coverInitRange("js/Jencil.0.1.2.js", "77471:77968");
__$coverInitRange("js/Jencil.0.1.2.js", "77524:77550");
__$coverInitRange("js/Jencil.0.1.2.js", "77583:77610");
__$coverInitRange("js/Jencil.0.1.2.js", "77643:77670");
__$coverInitRange("js/Jencil.0.1.2.js", "77709:77742");
__$coverInitRange("js/Jencil.0.1.2.js", "77777:77806");
__$coverInitRange("js/Jencil.0.1.2.js", "77841:77870");
__$coverInitRange("js/Jencil.0.1.2.js", "77899:77960");
__$coverInitRange("js/Jencil.0.1.2.js", "78075:78104");
__$coverInitRange("js/Jencil.0.1.2.js", "78110:78133");
__$coverInitRange("js/Jencil.0.1.2.js", "78139:78174");
__$coverInitRange("js/Jencil.0.1.2.js", "78180:78217");
__$coverInitRange("js/Jencil.0.1.2.js", "78223:78254");
__$coverInitRange("js/Jencil.0.1.2.js", "78260:78291");
__$coverInitRange("js/Jencil.0.1.2.js", "78297:78340");
__$coverInitRange("js/Jencil.0.1.2.js", "78346:78381");
__$coverInitRange("js/Jencil.0.1.2.js", "78387:78429");
__$coverInitRange("js/Jencil.0.1.2.js", "78475:78501");
__$coverInitRange("js/Jencil.0.1.2.js", "78508:78823");
__$coverInitRange("js/Jencil.0.1.2.js", "78830:80920");
__$coverInitRange("js/Jencil.0.1.2.js", "80927:81162");
__$coverInitRange("js/Jencil.0.1.2.js", "81169:81183");
__$coverInitRange("js/Jencil.0.1.2.js", "78554:78600");
__$coverInitRange("js/Jencil.0.1.2.js", "78608:78647");
__$coverInitRange("js/Jencil.0.1.2.js", "78655:78680");
__$coverInitRange("js/Jencil.0.1.2.js", "78688:78715");
__$coverInitRange("js/Jencil.0.1.2.js", "78723:78764");
__$coverInitRange("js/Jencil.0.1.2.js", "78772:78817");
__$coverInitRange("js/Jencil.0.1.2.js", "78874:78890");
__$coverInitRange("js/Jencil.0.1.2.js", "78898:80877");
__$coverInitRange("js/Jencil.0.1.2.js", "80885:80913");
__$coverInitRange("js/Jencil.0.1.2.js", "78986:80869");
__$coverInitRange("js/Jencil.0.1.2.js", "79053:79096");
__$coverInitRange("js/Jencil.0.1.2.js", "79110:79262");
__$coverInitRange("js/Jencil.0.1.2.js", "79276:79430");
__$coverInitRange("js/Jencil.0.1.2.js", "79444:79553");
__$coverInitRange("js/Jencil.0.1.2.js", "79168:79248");
__$coverInitRange("js/Jencil.0.1.2.js", "79222:79232");
__$coverInitRange("js/Jencil.0.1.2.js", "79335:79416");
__$coverInitRange("js/Jencil.0.1.2.js", "79390:79400");
__$coverInitRange("js/Jencil.0.1.2.js", "79611:79654");
__$coverInitRange("js/Jencil.0.1.2.js", "79668:79825");
__$coverInitRange("js/Jencil.0.1.2.js", "79839:79998");
__$coverInitRange("js/Jencil.0.1.2.js", "80012:80171");
__$coverInitRange("js/Jencil.0.1.2.js", "80185:80206");
__$coverInitRange("js/Jencil.0.1.2.js", "79726:79811");
__$coverInitRange("js/Jencil.0.1.2.js", "79780:79795");
__$coverInitRange("js/Jencil.0.1.2.js", "79898:79984");
__$coverInitRange("js/Jencil.0.1.2.js", "79953:79968");
__$coverInitRange("js/Jencil.0.1.2.js", "80071:80157");
__$coverInitRange("js/Jencil.0.1.2.js", "80126:80141");
__$coverInitRange("js/Jencil.0.1.2.js", "80262:80305");
__$coverInitRange("js/Jencil.0.1.2.js", "80319:80472");
__$coverInitRange("js/Jencil.0.1.2.js", "80486:80641");
__$coverInitRange("js/Jencil.0.1.2.js", "80655:80810");
__$coverInitRange("js/Jencil.0.1.2.js", "80824:80845");
__$coverInitRange("js/Jencil.0.1.2.js", "80377:80458");
__$coverInitRange("js/Jencil.0.1.2.js", "80431:80442");
__$coverInitRange("js/Jencil.0.1.2.js", "80545:80627");
__$coverInitRange("js/Jencil.0.1.2.js", "80600:80611");
__$coverInitRange("js/Jencil.0.1.2.js", "80714:80796");
__$coverInitRange("js/Jencil.0.1.2.js", "80769:80780");
__$coverInitRange("js/Jencil.0.1.2.js", "80973:81034");
__$coverInitRange("js/Jencil.0.1.2.js", "81042:81105");
__$coverInitRange("js/Jencil.0.1.2.js", "81113:81136");
__$coverInitRange("js/Jencil.0.1.2.js", "81144:81155");
__$coverInitRange("js/Jencil.0.1.2.js", "81239:81267");
__$coverInitRange("js/Jencil.0.1.2.js", "81274:81445");
__$coverInitRange("js/Jencil.0.1.2.js", "81452:83004");
__$coverInitRange("js/Jencil.0.1.2.js", "83011:83148");
__$coverInitRange("js/Jencil.0.1.2.js", "83155:83854");
__$coverInitRange("js/Jencil.0.1.2.js", "83861:84082");
__$coverInitRange("js/Jencil.0.1.2.js", "84089:84105");
__$coverInitRange("js/Jencil.0.1.2.js", "81307:81355");
__$coverInitRange("js/Jencil.0.1.2.js", "81363:81397");
__$coverInitRange("js/Jencil.0.1.2.js", "81405:81439");
__$coverInitRange("js/Jencil.0.1.2.js", "81508:81574");
__$coverInitRange("js/Jencil.0.1.2.js", "81582:82969");
__$coverInitRange("js/Jencil.0.1.2.js", "82977:82997");
__$coverInitRange("js/Jencil.0.1.2.js", "81613:81713");
__$coverInitRange("js/Jencil.0.1.2.js", "81723:81771");
__$coverInitRange("js/Jencil.0.1.2.js", "81781:81861");
__$coverInitRange("js/Jencil.0.1.2.js", "81871:81954");
__$coverInitRange("js/Jencil.0.1.2.js", "81964:81984");
__$coverInitRange("js/Jencil.0.1.2.js", "81994:82057");
__$coverInitRange("js/Jencil.0.1.2.js", "82067:82177");
__$coverInitRange("js/Jencil.0.1.2.js", "82187:82224");
__$coverInitRange("js/Jencil.0.1.2.js", "82234:82263");
__$coverInitRange("js/Jencil.0.1.2.js", "82273:82457");
__$coverInitRange("js/Jencil.0.1.2.js", "82467:82508");
__$coverInitRange("js/Jencil.0.1.2.js", "82518:82550");
__$coverInitRange("js/Jencil.0.1.2.js", "82560:82750");
__$coverInitRange("js/Jencil.0.1.2.js", "82760:82801");
__$coverInitRange("js/Jencil.0.1.2.js", "82811:82854");
__$coverInitRange("js/Jencil.0.1.2.js", "82864:82907");
__$coverInitRange("js/Jencil.0.1.2.js", "82917:82940");
__$coverInitRange("js/Jencil.0.1.2.js", "82950:82961");
__$coverInitRange("js/Jencil.0.1.2.js", "81658:81703");
__$coverInitRange("js/Jencil.0.1.2.js", "82129:82165");
__$coverInitRange("js/Jencil.0.1.2.js", "82335:82352");
__$coverInitRange("js/Jencil.0.1.2.js", "82364:82405");
__$coverInitRange("js/Jencil.0.1.2.js", "82417:82447");
__$coverInitRange("js/Jencil.0.1.2.js", "82625:82643");
__$coverInitRange("js/Jencil.0.1.2.js", "82655:82696");
__$coverInitRange("js/Jencil.0.1.2.js", "82708:82740");
__$coverInitRange("js/Jencil.0.1.2.js", "83057:83076");
__$coverInitRange("js/Jencil.0.1.2.js", "83084:83105");
__$coverInitRange("js/Jencil.0.1.2.js", "83113:83141");
__$coverInitRange("js/Jencil.0.1.2.js", "83203:83223");
__$coverInitRange("js/Jencil.0.1.2.js", "83231:83290");
__$coverInitRange("js/Jencil.0.1.2.js", "83298:83359");
__$coverInitRange("js/Jencil.0.1.2.js", "83367:83428");
__$coverInitRange("js/Jencil.0.1.2.js", "83436:83499");
__$coverInitRange("js/Jencil.0.1.2.js", "83507:83530");
__$coverInitRange("js/Jencil.0.1.2.js", "83538:83586");
__$coverInitRange("js/Jencil.0.1.2.js", "83594:83644");
__$coverInitRange("js/Jencil.0.1.2.js", "83652:83737");
__$coverInitRange("js/Jencil.0.1.2.js", "83745:83766");
__$coverInitRange("js/Jencil.0.1.2.js", "83774:83797");
__$coverInitRange("js/Jencil.0.1.2.js", "83805:83828");
__$coverInitRange("js/Jencil.0.1.2.js", "83836:83847");
__$coverInitRange("js/Jencil.0.1.2.js", "83914:84075");
__$coverInitRange("js/Jencil.0.1.2.js", "83986:84067");
__$coverInitRange("js/Jencil.0.1.2.js", "84155:84177");
__$coverInitRange("js/Jencil.0.1.2.js", "84184:84285");
__$coverInitRange("js/Jencil.0.1.2.js", "84292:84528");
__$coverInitRange("js/Jencil.0.1.2.js", "84535:84669");
__$coverInitRange("js/Jencil.0.1.2.js", "84676:84686");
__$coverInitRange("js/Jencil.0.1.2.js", "84211:84253");
__$coverInitRange("js/Jencil.0.1.2.js", "84261:84279");
__$coverInitRange("js/Jencil.0.1.2.js", "84332:84358");
__$coverInitRange("js/Jencil.0.1.2.js", "84366:84386");
__$coverInitRange("js/Jencil.0.1.2.js", "84394:84502");
__$coverInitRange("js/Jencil.0.1.2.js", "84510:84521");
__$coverInitRange("js/Jencil.0.1.2.js", "84454:84471");
__$coverInitRange("js/Jencil.0.1.2.js", "84481:84494");
__$coverInitRange("js/Jencil.0.1.2.js", "84586:84612");
__$coverInitRange("js/Jencil.0.1.2.js", "84620:84662");
__$coverInitRange("js/Jencil.0.1.2.js", "84740:84766");
__$coverInitRange("js/Jencil.0.1.2.js", "84773:84896");
__$coverInitRange("js/Jencil.0.1.2.js", "84903:84917");
__$coverInitRange("js/Jencil.0.1.2.js", "84804:84850");
__$coverInitRange("js/Jencil.0.1.2.js", "84858:84890");
__$coverInitRange("js/Jencil.0.1.2.js", "84971:84999");
__$coverInitRange("js/Jencil.0.1.2.js", "85006:85135");
__$coverInitRange("js/Jencil.0.1.2.js", "85142:85158");
__$coverInitRange("js/Jencil.0.1.2.js", "85039:85087");
__$coverInitRange("js/Jencil.0.1.2.js", "85095:85129");
__$coverInitRange("js/Jencil.0.1.2.js", "85210:85403");
__$coverInitRange("js/Jencil.0.1.2.js", "85410:85430");
__$coverInitRange("js/Jencil.0.1.2.js", "85256:85271");
__$coverInitRange("js/Jencil.0.1.2.js", "85279:85322");
__$coverInitRange("js/Jencil.0.1.2.js", "85330:85371");
__$coverInitRange("js/Jencil.0.1.2.js", "85379:85397");
__$coverInitRange("js/Jencil.0.1.2.js", "85483:85513");
__$coverInitRange("js/Jencil.0.1.2.js", "85520:85963");
__$coverInitRange("js/Jencil.0.1.2.js", "85970:85988");
__$coverInitRange("js/Jencil.0.1.2.js", "85564:85580");
__$coverInitRange("js/Jencil.0.1.2.js", "85588:85636");
__$coverInitRange("js/Jencil.0.1.2.js", "85644:85692");
__$coverInitRange("js/Jencil.0.1.2.js", "85700:85809");
__$coverInitRange("js/Jencil.0.1.2.js", "85817:85851");
__$coverInitRange("js/Jencil.0.1.2.js", "85859:85957");
__$coverInitRange("js/Jencil.0.1.2.js", "85909:85947");
__$coverInitRange("js/Jencil.0.1.2.js", "86055:86086");
__$coverInitRange("js/Jencil.0.1.2.js", "86093:86708");
__$coverInitRange("js/Jencil.0.1.2.js", "86715:86734");
__$coverInitRange("js/Jencil.0.1.2.js", "86138:86154");
__$coverInitRange("js/Jencil.0.1.2.js", "86162:86210");
__$coverInitRange("js/Jencil.0.1.2.js", "86218:86266");
__$coverInitRange("js/Jencil.0.1.2.js", "86274:86322");
__$coverInitRange("js/Jencil.0.1.2.js", "86330:86433");
__$coverInitRange("js/Jencil.0.1.2.js", "86441:86554");
__$coverInitRange("js/Jencil.0.1.2.js", "86562:86596");
__$coverInitRange("js/Jencil.0.1.2.js", "86604:86702");
__$coverInitRange("js/Jencil.0.1.2.js", "86654:86692");
__$coverInitRange("js/Jencil.0.1.2.js", "86825:86862");
__$coverInitRange("js/Jencil.0.1.2.js", "86868:86901");
__$coverInitRange("js/Jencil.0.1.2.js", "86907:86949");
__$coverInitRange("js/Jencil.0.1.2.js", "86998:87027");
__$coverInitRange("js/Jencil.0.1.2.js", "87034:88307");
__$coverInitRange("js/Jencil.0.1.2.js", "88314:89014");
__$coverInitRange("js/Jencil.0.1.2.js", "89021:89429");
__$coverInitRange("js/Jencil.0.1.2.js", "89436:89758");
__$coverInitRange("js/Jencil.0.1.2.js", "89765:89782");
__$coverInitRange("js/Jencil.0.1.2.js", "87068:87084");
__$coverInitRange("js/Jencil.0.1.2.js", "87092:87141");
__$coverInitRange("js/Jencil.0.1.2.js", "87149:87184");
__$coverInitRange("js/Jencil.0.1.2.js", "87192:87339");
__$coverInitRange("js/Jencil.0.1.2.js", "87347:87392");
__$coverInitRange("js/Jencil.0.1.2.js", "87400:87636");
__$coverInitRange("js/Jencil.0.1.2.js", "87644:87804");
__$coverInitRange("js/Jencil.0.1.2.js", "87812:88033");
__$coverInitRange("js/Jencil.0.1.2.js", "88041:88109");
__$coverInitRange("js/Jencil.0.1.2.js", "88117:88150");
__$coverInitRange("js/Jencil.0.1.2.js", "88158:88188");
__$coverInitRange("js/Jencil.0.1.2.js", "88196:88215");
__$coverInitRange("js/Jencil.0.1.2.js", "88223:88301");
__$coverInitRange("js/Jencil.0.1.2.js", "87867:87907");
__$coverInitRange("js/Jencil.0.1.2.js", "87917:88025");
__$coverInitRange("js/Jencil.0.1.2.js", "87957:88013");
__$coverInitRange("js/Jencil.0.1.2.js", "88081:88099");
__$coverInitRange("js/Jencil.0.1.2.js", "88258:88292");
__$coverInitRange("js/Jencil.0.1.2.js", "88359:88390");
__$coverInitRange("js/Jencil.0.1.2.js", "88398:88414");
__$coverInitRange("js/Jencil.0.1.2.js", "88422:88465");
__$coverInitRange("js/Jencil.0.1.2.js", "88473:88545");
__$coverInitRange("js/Jencil.0.1.2.js", "88553:88627");
__$coverInitRange("js/Jencil.0.1.2.js", "88635:88659");
__$coverInitRange("js/Jencil.0.1.2.js", "88667:88693");
__$coverInitRange("js/Jencil.0.1.2.js", "88701:88741");
__$coverInitRange("js/Jencil.0.1.2.js", "88749:88957");
__$coverInitRange("js/Jencil.0.1.2.js", "88965:89007");
__$coverInitRange("js/Jencil.0.1.2.js", "88798:88845");
__$coverInitRange("js/Jencil.0.1.2.js", "88855:88903");
__$coverInitRange("js/Jencil.0.1.2.js", "88913:88947");
__$coverInitRange("js/Jencil.0.1.2.js", "89067:89117");
__$coverInitRange("js/Jencil.0.1.2.js", "89125:89167");
__$coverInitRange("js/Jencil.0.1.2.js", "89175:89218");
__$coverInitRange("js/Jencil.0.1.2.js", "89226:89250");
__$coverInitRange("js/Jencil.0.1.2.js", "89258:89284");
__$coverInitRange("js/Jencil.0.1.2.js", "89292:89332");
__$coverInitRange("js/Jencil.0.1.2.js", "89340:89368");
__$coverInitRange("js/Jencil.0.1.2.js", "89376:89422");
__$coverInitRange("js/Jencil.0.1.2.js", "89508:89751");
__$coverInitRange("js/Jencil.0.1.2.js", "89551:89561");
__$coverInitRange("js/Jencil.0.1.2.js", "89571:89636");
__$coverInitRange("js/Jencil.0.1.2.js", "89661:89670");
__$coverInitRange("js/Jencil.0.1.2.js", "89680:89743");
__$coverInitRange("js/Jencil.0.1.2.js", "89840:89866");
__$coverInitRange("js/Jencil.0.1.2.js", "89872:90198");
__$coverInitRange("js/Jencil.0.1.2.js", "90204:90645");
__$coverInitRange("js/Jencil.0.1.2.js", "90651:91096");
__$coverInitRange("js/Jencil.0.1.2.js", "91102:91499");
__$coverInitRange("js/Jencil.0.1.2.js", "89903:89931");
__$coverInitRange("js/Jencil.0.1.2.js", "89939:89957");
__$coverInitRange("js/Jencil.0.1.2.js", "89965:89978");
__$coverInitRange("js/Jencil.0.1.2.js", "89986:90165");
__$coverInitRange("js/Jencil.0.1.2.js", "90173:90188");
__$coverInitRange("js/Jencil.0.1.2.js", "90046:90058");
__$coverInitRange("js/Jencil.0.1.2.js", "90068:90157");
__$coverInitRange("js/Jencil.0.1.2.js", "90236:90268");
__$coverInitRange("js/Jencil.0.1.2.js", "90276:90298");
__$coverInitRange("js/Jencil.0.1.2.js", "90306:90346");
__$coverInitRange("js/Jencil.0.1.2.js", "90354:90638");
__$coverInitRange("js/Jencil.0.1.2.js", "90332:90338");
__$coverInitRange("js/Jencil.0.1.2.js", "90418:90440");
__$coverInitRange("js/Jencil.0.1.2.js", "90450:90630");
__$coverInitRange("js/Jencil.0.1.2.js", "90514:90556");
__$coverInitRange("js/Jencil.0.1.2.js", "90568:90602");
__$coverInitRange("js/Jencil.0.1.2.js", "90614:90620");
__$coverInitRange("js/Jencil.0.1.2.js", "90700:90721");
__$coverInitRange("js/Jencil.0.1.2.js", "90729:90769");
__$coverInitRange("js/Jencil.0.1.2.js", "90777:91089");
__$coverInitRange("js/Jencil.0.1.2.js", "90755:90761");
__$coverInitRange("js/Jencil.0.1.2.js", "90841:90863");
__$coverInitRange("js/Jencil.0.1.2.js", "90873:91081");
__$coverInitRange("js/Jencil.0.1.2.js", "90912:90926");
__$coverInitRange("js/Jencil.0.1.2.js", "90938:90998");
__$coverInitRange("js/Jencil.0.1.2.js", "91010:91053");
__$coverInitRange("js/Jencil.0.1.2.js", "91065:91071");
__$coverInitRange("js/Jencil.0.1.2.js", "91136:91225");
__$coverInitRange("js/Jencil.0.1.2.js", "91233:91330");
__$coverInitRange("js/Jencil.0.1.2.js", "91338:91469");
__$coverInitRange("js/Jencil.0.1.2.js", "91477:91492");
__$coverInitRange("js/Jencil.0.1.2.js", "91182:91217");
__$coverInitRange("js/Jencil.0.1.2.js", "91287:91321");
__$coverInitRange("js/Jencil.0.1.2.js", "91409:91460");
__$coverInitRange("js/Jencil.0.1.2.js", "91545:91556");
__$coverInitRange("js/Jencil.0.1.2.js", "91562:91614");
__$coverInitRange("js/Jencil.0.1.2.js", "91620:92198");
__$coverInitRange("js/Jencil.0.1.2.js", "91647:91675");
__$coverInitRange("js/Jencil.0.1.2.js", "91683:91722");
__$coverInitRange("js/Jencil.0.1.2.js", "91730:91823");
__$coverInitRange("js/Jencil.0.1.2.js", "91831:91854");
__$coverInitRange("js/Jencil.0.1.2.js", "91862:92191");
__$coverInitRange("js/Jencil.0.1.2.js", "91767:91815");
__$coverInitRange("js/Jencil.0.1.2.js", "91896:92060");
__$coverInitRange("js/Jencil.0.1.2.js", "92070:92104");
__$coverInitRange("js/Jencil.0.1.2.js", "91940:91963");
__$coverInitRange("js/Jencil.0.1.2.js", "91992:92050");
__$coverInitRange("js/Jencil.0.1.2.js", "92129:92183");
__$coverInitRange("js/Jencil.0.1.2.js", "92249:92278");
__$coverInitRange("js/Jencil.0.1.2.js", "92285:92431");
__$coverInitRange("js/Jencil.0.1.2.js", "92438:92523");
__$coverInitRange("js/Jencil.0.1.2.js", "92530:92615");
__$coverInitRange("js/Jencil.0.1.2.js", "92622:92707");
__$coverInitRange("js/Jencil.0.1.2.js", "92714:92799");
__$coverInitRange("js/Jencil.0.1.2.js", "92806:92891");
__$coverInitRange("js/Jencil.0.1.2.js", "92898:92983");
__$coverInitRange("js/Jencil.0.1.2.js", "92990:93078");
__$coverInitRange("js/Jencil.0.1.2.js", "93085:93175");
__$coverInitRange("js/Jencil.0.1.2.js", "93182:93275");
__$coverInitRange("js/Jencil.0.1.2.js", "93282:93372");
__$coverInitRange("js/Jencil.0.1.2.js", "93379:93478");
__$coverInitRange("js/Jencil.0.1.2.js", "93485:93582");
__$coverInitRange("js/Jencil.0.1.2.js", "93589:93678");
__$coverInitRange("js/Jencil.0.1.2.js", "93685:93801");
__$coverInitRange("js/Jencil.0.1.2.js", "93808:93902");
__$coverInitRange("js/Jencil.0.1.2.js", "93909:94000");
__$coverInitRange("js/Jencil.0.1.2.js", "94007:94396");
__$coverInitRange("js/Jencil.0.1.2.js", "94403:94739");
__$coverInitRange("js/Jencil.0.1.2.js", "94746:95252");
__$coverInitRange("js/Jencil.0.1.2.js", "95259:95763");
__$coverInitRange("js/Jencil.0.1.2.js", "95770:95787");
__$coverInitRange("js/Jencil.0.1.2.js", "92319:92368");
__$coverInitRange("js/Jencil.0.1.2.js", "92376:92425");
__$coverInitRange("js/Jencil.0.1.2.js", "92483:92516");
__$coverInitRange("js/Jencil.0.1.2.js", "92575:92608");
__$coverInitRange("js/Jencil.0.1.2.js", "92667:92700");
__$coverInitRange("js/Jencil.0.1.2.js", "92759:92792");
__$coverInitRange("js/Jencil.0.1.2.js", "92851:92884");
__$coverInitRange("js/Jencil.0.1.2.js", "92943:92976");
__$coverInitRange("js/Jencil.0.1.2.js", "93037:93071");
__$coverInitRange("js/Jencil.0.1.2.js", "93134:93168");
__$coverInitRange("js/Jencil.0.1.2.js", "93234:93268");
__$coverInitRange("js/Jencil.0.1.2.js", "93331:93365");
__$coverInitRange("js/Jencil.0.1.2.js", "93433:93471");
__$coverInitRange("js/Jencil.0.1.2.js", "93537:93575");
__$coverInitRange("js/Jencil.0.1.2.js", "93637:93671");
__$coverInitRange("js/Jencil.0.1.2.js", "93738:93794");
__$coverInitRange("js/Jencil.0.1.2.js", "93855:93895");
__$coverInitRange("js/Jencil.0.1.2.js", "93955:93993");
__$coverInitRange("js/Jencil.0.1.2.js", "94060:94074");
__$coverInitRange("js/Jencil.0.1.2.js", "94082:94105");
__$coverInitRange("js/Jencil.0.1.2.js", "94113:94198");
__$coverInitRange("js/Jencil.0.1.2.js", "94206:94264");
__$coverInitRange("js/Jencil.0.1.2.js", "94272:94317");
__$coverInitRange("js/Jencil.0.1.2.js", "94325:94389");
__$coverInitRange("js/Jencil.0.1.2.js", "94134:94190");
__$coverInitRange("js/Jencil.0.1.2.js", "94303:94309");
__$coverInitRange("js/Jencil.0.1.2.js", "94451:94463");
__$coverInitRange("js/Jencil.0.1.2.js", "94471:94529");
__$coverInitRange("js/Jencil.0.1.2.js", "94537:94606");
__$coverInitRange("js/Jencil.0.1.2.js", "94614:94658");
__$coverInitRange("js/Jencil.0.1.2.js", "94666:94732");
__$coverInitRange("js/Jencil.0.1.2.js", "94644:94650");
__$coverInitRange("js/Jencil.0.1.2.js", "94802:94813");
__$coverInitRange("js/Jencil.0.1.2.js", "94821:94844");
__$coverInitRange("js/Jencil.0.1.2.js", "94852:95145");
__$coverInitRange("js/Jencil.0.1.2.js", "95153:95173");
__$coverInitRange("js/Jencil.0.1.2.js", "95181:95199");
__$coverInitRange("js/Jencil.0.1.2.js", "95207:95245");
__$coverInitRange("js/Jencil.0.1.2.js", "94881:94909");
__$coverInitRange("js/Jencil.0.1.2.js", "94919:94942");
__$coverInitRange("js/Jencil.0.1.2.js", "94952:94965");
__$coverInitRange("js/Jencil.0.1.2.js", "94975:95108");
__$coverInitRange("js/Jencil.0.1.2.js", "95118:95133");
__$coverInitRange("js/Jencil.0.1.2.js", "95037:95049");
__$coverInitRange("js/Jencil.0.1.2.js", "95061:95098");
__$coverInitRange("js/Jencil.0.1.2.js", "95313:95324");
__$coverInitRange("js/Jencil.0.1.2.js", "95332:95355");
__$coverInitRange("js/Jencil.0.1.2.js", "95363:95656");
__$coverInitRange("js/Jencil.0.1.2.js", "95664:95684");
__$coverInitRange("js/Jencil.0.1.2.js", "95692:95710");
__$coverInitRange("js/Jencil.0.1.2.js", "95718:95756");
__$coverInitRange("js/Jencil.0.1.2.js", "95392:95420");
__$coverInitRange("js/Jencil.0.1.2.js", "95430:95453");
__$coverInitRange("js/Jencil.0.1.2.js", "95463:95476");
__$coverInitRange("js/Jencil.0.1.2.js", "95486:95619");
__$coverInitRange("js/Jencil.0.1.2.js", "95629:95644");
__$coverInitRange("js/Jencil.0.1.2.js", "95548:95560");
__$coverInitRange("js/Jencil.0.1.2.js", "95572:95609");
__$coverInitRange("js/Jencil.0.1.2.js", "95913:95951");
__$coverInitRange("js/Jencil.0.1.2.js", "96096:96134");
__$coverInitRange("js/Jencil.0.1.2.js", "96183:96212");
__$coverInitRange("js/Jencil.0.1.2.js", "96219:97105");
__$coverInitRange("js/Jencil.0.1.2.js", "97112:97129");
__$coverInitRange("js/Jencil.0.1.2.js", "96253:96273");
__$coverInitRange("js/Jencil.0.1.2.js", "96281:96330");
__$coverInitRange("js/Jencil.0.1.2.js", "96338:97056");
__$coverInitRange("js/Jencil.0.1.2.js", "97064:97099");
__$coverInitRange("js/Jencil.0.1.2.js", "97242:97280");
__$coverInitRange("js/Jencil.0.1.2.js", "98193:98233");
__$coverCall('js/Jencil.0.1.2.js', '1119:6794');
shortcut = {
    'all_shortcuts': {},
    'add': function (shortcut_combination, callback, opt) {
        __$coverCall('js/Jencil.0.1.2.js', '1290:1432');
        var default_options = {
                'type': 'keydown',
                'propagate': false,
                'disable_in_input': false,
                'target': document,
                'keycode': false
            };
        __$coverCall('js/Jencil.0.1.2.js', '1433:1590');
        if (!opt)
            opt = default_options;
        else {
            __$coverCall('js/Jencil.0.1.2.js', '1477:1586');
            for (var dfo in default_options) {
                __$coverCall('js/Jencil.0.1.2.js', '1515:1581');
                if (typeof opt[dfo] == 'undefined')
                    opt[dfo] = default_options[dfo];
            }
        }
        __$coverCall('js/Jencil.0.1.2.js', '1595:1615');
        var ele = opt.target;
        __$coverCall('js/Jencil.0.1.2.js', '1619:1694');
        if (typeof opt.target == 'string')
            ele = document.getElementById(opt.target);
        __$coverCall('js/Jencil.0.1.2.js', '1698:1712');
        var ths = this;
        __$coverCall('js/Jencil.0.1.2.js', '1716:1773');
        shortcut_combination = shortcut_combination.toLowerCase();
        __$coverCall('js/Jencil.0.1.2.js', '1820:5860');
        var func = function (e) {
            __$coverCall('js/Jencil.0.1.2.js', '1848:1869');
            e = e || window.event;
            __$coverCall('js/Jencil.0.1.2.js', '1878:2199');
            if (opt['disable_in_input']) {
                __$coverCall('js/Jencil.0.1.2.js', '1967:1978');
                var element;
                __$coverCall('js/Jencil.0.1.2.js', '1984:2061');
                if (e.target)
                    element = e.target;
                else if (e.srcElement)
                    element = e.srcElement;
                __$coverCall('js/Jencil.0.1.2.js', '2067:2117');
                if (element.nodeType == 3)
                    element = element.parentNode;
                __$coverCall('js/Jencil.0.1.2.js', '2124:2194');
                if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA')
                    return;
            }
            __$coverCall('js/Jencil.0.1.2.js', '2237:2305');
            if (e.keyCode)
                code = e.keyCode;
            else if (e.which)
                code = e.which;
            __$coverCall('js/Jencil.0.1.2.js', '2310:2365');
            var character = String.fromCharCode(code).toLowerCase();
            __$coverCall('js/Jencil.0.1.2.js', '2374:2403');
            if (code == 188)
                character = ',';
            __$coverCall('js/Jencil.0.1.2.js', '2459:2488');
            if (code == 190)
                character = '.';
            __$coverCall('js/Jencil.0.1.2.js', '2545:2587');
            var keys = shortcut_combination.split('+');
            __$coverCall('js/Jencil.0.1.2.js', '2721:2731');
            var kp = 0;
            __$coverCall('js/Jencil.0.1.2.js', '2860:3170');
            var shift_nums = {
                    '`': '~',
                    '1': '!',
                    '2': '@',
                    '3': '#',
                    '4': '$',
                    '5': '%',
                    '6': '^',
                    '7': '&',
                    '8': '*',
                    '9': '(',
                    '0': ')',
                    '-': '_',
                    '=': '+',
                    ';': ':',
                    '\'': '"',
                    ',': '<',
                    '.': '>',
                    '/': '?',
                    '\\': '|'
                };
            __$coverCall('js/Jencil.0.1.2.js', '3171:3931');
            var special_keys = {
                    'esc': 27,
                    'escape': 27,
                    'tab': 9,
                    'space': 32,
                    'return': 13,
                    'enter': 13,
                    'backspace': 8,
                    'scrolllock': 145,
                    'scroll_lock': 145,
                    'scroll': 145,
                    'capslock': 20,
                    'caps_lock': 20,
                    'caps': 20,
                    'numlock': 144,
                    'num_lock': 144,
                    'num': 144,
                    'pause': 19,
                    'break': 19,
                    'insert': 45,
                    'home': 36,
                    'delete': 46,
                    'end': 35,
                    'pageup': 33,
                    'page_up': 33,
                    'pu': 33,
                    'pagedown': 34,
                    'page_down': 34,
                    'pd': 34,
                    'left': 37,
                    'up': 38,
                    'right': 39,
                    'down': 40,
                    'f1': 112,
                    'f2': 113,
                    'f3': 114,
                    'f4': 115,
                    'f5': 116,
                    'f6': 117,
                    'f7': 118,
                    'f8': 119,
                    'f9': 120,
                    'f10': 121,
                    'f11': 122,
                    'f12': 123
                };
            __$coverCall('js/Jencil.0.1.2.js', '3932:4149');
            var modifiers = {
                    shift: {
                        wanted: false,
                        pressed: false
                    },
                    ctrl: {
                        wanted: false,
                        pressed: false
                    },
                    alt: {
                        wanted: false,
                        pressed: false
                    },
                    meta: {
                        wanted: false,
                        pressed: false
                    }
                };
            __$coverCall('js/Jencil.0.1.2.js', '4179:4222');
            if (e.ctrlKey)
                modifiers.ctrl.pressed = true;
            __$coverCall('js/Jencil.0.1.2.js', '4227:4272');
            if (e.shiftKey)
                modifiers.shift.pressed = true;
            __$coverCall('js/Jencil.0.1.2.js', '4277:4318');
            if (e.altKey)
                modifiers.alt.pressed = true;
            __$coverCall('js/Jencil.0.1.2.js', '4323:4368');
            if (e.metaKey)
                modifiers.meta.pressed = true;
            __$coverCall('js/Jencil.0.1.2.js', '4398:5228');
            for (var i = 0; k = keys[i], i < keys.length; i++) {
                __$coverCall('js/Jencil.0.1.2.js', '4463:5223');
                if (k == 'ctrl' || k == 'control') {
                    __$coverCall('js/Jencil.0.1.2.js', '4504:4508');
                    kp++;
                    __$coverCall('js/Jencil.0.1.2.js', '4515:4543');
                    modifiers.ctrl.wanted = true;
                } else if (k == 'shift') {
                    __$coverCall('js/Jencil.0.1.2.js', '4581:4585');
                    kp++;
                    __$coverCall('js/Jencil.0.1.2.js', '4592:4621');
                    modifiers.shift.wanted = true;
                } else if (k == 'alt') {
                    __$coverCall('js/Jencil.0.1.2.js', '4657:4661');
                    kp++;
                    __$coverCall('js/Jencil.0.1.2.js', '4668:4695');
                    modifiers.alt.wanted = true;
                } else if (k == 'meta') {
                    __$coverCall('js/Jencil.0.1.2.js', '4731:4735');
                    kp++;
                    __$coverCall('js/Jencil.0.1.2.js', '4742:4770');
                    modifiers.meta.wanted = true;
                } else if (k.length > 1) {
                    __$coverCall('js/Jencil.0.1.2.js', '4832:4864');
                    if (special_keys[k] == code)
                        kp++;
                } else if (opt['keycode']) {
                    __$coverCall('js/Jencil.0.1.2.js', '4909:4940');
                    if (opt['keycode'] == code)
                        kp++;
                } else {
                    __$coverCall('js/Jencil.0.1.2.js', '4994:5217');
                    if (character == k)
                        kp++;
                    else {
                        __$coverCall('js/Jencil.0.1.2.js', '5037:5210');
                        if (shift_nums[character] && e.shiftKey) {
                            __$coverCall('js/Jencil.0.1.2.js', '5136:5169');
                            character = shift_nums[character];
                            __$coverCall('js/Jencil.0.1.2.js', '5179:5202');
                            if (character == k)
                                kp++;
                        }
                    }
                }
            }
            __$coverCall('js/Jencil.0.1.2.js', '5237:5853');
            if (kp == keys.length && modifiers.ctrl.pressed == modifiers.ctrl.wanted && modifiers.shift.pressed == modifiers.shift.wanted && modifiers.alt.pressed == modifiers.alt.wanted && modifiers.meta.pressed == modifiers.meta.wanted) {
                __$coverCall('js/Jencil.0.1.2.js', '5494:5505');
                callback(e);
                __$coverCall('js/Jencil.0.1.2.js', '5513:5848');
                if (!opt['propagate']) {
                    __$coverCall('js/Jencil.0.1.2.js', '5639:5660');
                    e.cancelBubble = true;
                    __$coverCall('js/Jencil.0.1.2.js', '5667:5688');
                    e.returnValue = false;
                    __$coverCall('js/Jencil.0.1.2.js', '5740:5823');
                    if (e.stopPropagation) {
                        __$coverCall('js/Jencil.0.1.2.js', '5771:5790');
                        e.stopPropagation();
                        __$coverCall('js/Jencil.0.1.2.js', '5798:5816');
                        e.preventDefault();
                    }
                    __$coverCall('js/Jencil.0.1.2.js', '5830:5842');
                    return false;
                }
            }
        };
        __$coverCall('js/Jencil.0.1.2.js', '5861:5972');
        this.all_shortcuts[shortcut_combination] = {
            'callback': func,
            'target': ele,
            'event': opt['type']
        };
        __$coverCall('js/Jencil.0.1.2.js', '6015:6191');
        if (ele.addEventListener)
            ele.addEventListener(opt['type'], func, false);
        else if (ele.attachEvent)
            ele.attachEvent('on' + opt['type'], func);
        else
            ele['on' + opt['type']] = func;
    },
    'remove': function (shortcut_combination) {
        __$coverCall('js/Jencil.0.1.2.js', '6324:6381');
        shortcut_combination = shortcut_combination.toLowerCase();
        __$coverCall('js/Jencil.0.1.2.js', '6385:6439');
        var binding = this.all_shortcuts[shortcut_combination];
        __$coverCall('js/Jencil.0.1.2.js', '6443:6493');
        delete this.all_shortcuts[shortcut_combination];
        __$coverCall('js/Jencil.0.1.2.js', '6494:6513');
        if (!binding)
            return;
        __$coverCall('js/Jencil.0.1.2.js', '6517:6544');
        var type = binding['event'];
        __$coverCall('js/Jencil.0.1.2.js', '6548:6575');
        var ele = binding['target'];
        __$coverCall('js/Jencil.0.1.2.js', '6579:6613');
        var callback = binding['callback'];
        __$coverCall('js/Jencil.0.1.2.js', '6618:6788');
        if (ele.detachEvent)
            ele.detachEvent('on' + type, callback);
        else if (ele.removeEventListener)
            ele.removeEventListener(type, callback, false);
        else
            ele['on' + type] = false;
    }
};
__$coverCall('js/Jencil.0.1.2.js', '8805:18653');
(function ($) {
    __$coverCall('js/Jencil.0.1.2.js', '8846:10358');
    $.fn.tabby = function (options) {
        __$coverCall('js/Jencil.0.1.2.js', '8947:9000');
        var opts = $.extend({}, $.fn.tabby.defaults, options);
        __$coverCall('js/Jencil.0.1.2.js', '9004:9036');
        var pressed = $.fn.tabby.pressed;
        __$coverCall('js/Jencil.0.1.2.js', '9091:10354');
        return this.each(function () {
            __$coverCall('js/Jencil.0.1.2.js', '9124:9139');
            $this = $(this);
            __$coverCall('js/Jencil.0.1.2.js', '9185:9247');
            var options = $.meta ? $.extend({}, opts, $this.data()) : opts;
            __$coverCall('js/Jencil.0.1.2.js', '9256:10345');
            $this.bind('keydown', function (e) {
                __$coverCall('js/Jencil.0.1.2.js', '9296:9327');
                var kc = $.fn.tabby.catch_kc(e);
                __$coverCall('js/Jencil.0.1.2.js', '9333:9366');
                if (16 == kc)
                    pressed.shft = true;
                __$coverCall('js/Jencil.0.1.2.js', '9561:9649');
                if (17 == kc) {
                    __$coverCall('js/Jencil.0.1.2.js', '9576:9595');
                    pressed.ctrl = true;
                    __$coverCall('js/Jencil.0.1.2.js', '9597:9648');
                    setTimeout('$.fn.tabby.pressed.ctrl = false;', 1000);
                }
                __$coverCall('js/Jencil.0.1.2.js', '9655:9742');
                if (18 == kc) {
                    __$coverCall('js/Jencil.0.1.2.js', '9670:9688');
                    pressed.alt = true;
                    __$coverCall('js/Jencil.0.1.2.js', '9691:9741');
                    setTimeout('$.fn.tabby.pressed.alt = false;', 1000);
                }
                __$coverCall('js/Jencil.0.1.2.js', '9754:10017');
                if (9 == kc && !pressed.ctrl && !pressed.alt) {
                    __$coverCall('js/Jencil.0.1.2.js', '9807:9823');
                    e.preventDefault;
                    __$coverCall('js/Jencil.0.1.2.js', '9859:9876');
                    pressed.last = kc;
                    __$coverCall('js/Jencil.0.1.2.js', '9878:9925');
                    setTimeout('$.fn.tabby.pressed.last = null;', 0);
                    __$coverCall('js/Jencil.0.1.2.js', '9932:9992');
                    process_keypress($(e.target).get(0), pressed.shft, options);
                    __$coverCall('js/Jencil.0.1.2.js', '9999:10011');
                    return false;
                }
            }).bind('keyup', function (e) {
                __$coverCall('js/Jencil.0.1.2.js', '10062:10116');
                if (16 == $.fn.tabby.catch_kc(e))
                    pressed.shft = false;
            }).bind('blur', function (e) {
                __$coverCall('js/Jencil.0.1.2.js', '10240:10338');
                if (9 == pressed.last)
                    $(e.target).one('focus', function (e) {
                        __$coverCall('js/Jencil.0.1.2.js', '10301:10320');
                        pressed.last = null;
                    }).get(0).focus();
            });
        });
    };
    __$coverCall('js/Jencil.0.1.2.js', '10403:10506');
    $.fn.tabby.catch_kc = function (e) {
        __$coverCall('js/Jencil.0.1.2.js', '10439:10503');
        return e.keyCode ? e.keyCode : e.charCode ? e.charCode : e.which;
    };
    __$coverCall('js/Jencil.0.1.2.js', '10509:10583');
    $.fn.tabby.pressed = {
        shft: false,
        ctrl: false,
        alt: false,
        last: null
    };
    __$coverCall('js/Jencil.0.1.2.js', '10623:10747');
    function debug($obj) {
        __$coverCall('js/Jencil.0.1.2.js', '10648:10744');
        if (window.console && window.console.log)
            window.console.log('textarea count: ' + $obj.size());
    }
    __$coverCall('js/Jencil.0.1.2.js', '10748:10748');
    ;
    __$coverCall('js/Jencil.0.1.2.js', '10752:11148');
    function process_keypress(o, shft, options) {
        __$coverCall('js/Jencil.0.1.2.js', '10799:10825');
        var scrollTo = o.scrollTop;
        __$coverCall('js/Jencil.0.1.2.js', '10954:11116');
        if (o.setSelectionRange)
            gecko_tab(o, shft, options);
        else if (document.selection)
            ie_tab(o, shft, options);
        __$coverCall('js/Jencil.0.1.2.js', '11123:11145');
        o.scrollTop = scrollTo;
    }
    __$coverCall('js/Jencil.0.1.2.js', '11173:11231');
    $.fn.tabby.defaults = { tabString: String.fromCharCode(9) };
    __$coverCall('js/Jencil.0.1.2.js', '11236:14173');
    function gecko_tab(o, shft, options) {
        __$coverCall('js/Jencil.0.1.2.js', '11278:11303');
        var ss = o.selectionStart;
        __$coverCall('js/Jencil.0.1.2.js', '11307:11330');
        var es = o.selectionEnd;
        __$coverCall('js/Jencil.0.1.2.js', '11473:14170');
        if (ss == es) {
            __$coverCall('js/Jencil.0.1.2.js', '11507:12618');
            if (shft) {
                __$coverCall('js/Jencil.0.1.2.js', '11639:12396');
                if (options.tabString == o.value.substring(ss - options.tabString.length, ss)) {
                    __$coverCall('js/Jencil.0.1.2.js', '11723:11806');
                    o.value = o.value.substring(0, ss - options.tabString.length) + o.value.substring(ss);
                    __$coverCall('js/Jencil.0.1.2.js', '11872:11881');
                    o.focus();
                    __$coverCall('js/Jencil.0.1.2.js', '11888:11969');
                    o.setSelectionRange(ss - options.tabString.length, ss - options.tabString.length);
                } else if (options.tabString == o.value.substring(ss, ss + options.tabString.length)) {
                    __$coverCall('js/Jencil.0.1.2.js', '12196:12281');
                    o.value = o.value.substring(0, ss) + o.value.substring(ss + options.tabString.length);
                    __$coverCall('js/Jencil.0.1.2.js', '12348:12357');
                    o.focus();
                    __$coverCall('js/Jencil.0.1.2.js', '12364:12390');
                    o.setSelectionRange(ss, ss);
                }
            } else {
                __$coverCall('js/Jencil.0.1.2.js', '12430:12508');
                o.value = o.value.substring(0, ss) + options.tabString + o.value.substring(ss);
                __$coverCall('js/Jencil.0.1.2.js', '12514:12523');
                o.focus();
                __$coverCall('js/Jencil.0.1.2.js', '12532:12613');
                o.setSelectionRange(ss + options.tabString.length, ss + options.tabString.length);
            }
        } else {
            __$coverCall('js/Jencil.0.1.2.js', '12804:12835');
            var lines = o.value.split('\n');
            __$coverCall('js/Jencil.0.1.2.js', '12840:12865');
            var indices = new Array();
            __$coverCall('js/Jencil.0.1.2.js', '12870:12880');
            var sl = 0;
            __$coverCall('js/Jencil.0.1.2.js', '12906:12916');
            var el = 0;
            __$coverCall('js/Jencil.0.1.2.js', '12940:12955');
            var sel = false;
            __$coverCall('js/Jencil.0.1.2.js', '12960:13167');
            for (var i in lines) {
                __$coverCall('js/Jencil.0.1.2.js', '12987:13012');
                el = sl + lines[i].length;
                __$coverCall('js/Jencil.0.1.2.js', '13018:13134');
                indices.push({
                    start: sl,
                    end: el,
                    selected: sl <= ss && el > ss || el >= es && sl < es || sl > ss && el < es
                });
                __$coverCall('js/Jencil.0.1.2.js', '13140:13151');
                sl = el + 1;
            }
            __$coverCall('js/Jencil.0.1.2.js', '13261:13277');
            var modifier = 0;
            __$coverCall('js/Jencil.0.1.2.js', '13282:13983');
            for (var i in indices) {
                __$coverCall('js/Jencil.0.1.2.js', '13311:13978');
                if (indices[i].selected) {
                    __$coverCall('js/Jencil.0.1.2.js', '13343:13380');
                    var pos = indices[i].start + modifier;
                    __$coverCall('js/Jencil.0.1.2.js', '13449:13972');
                    if (shft && options.tabString == o.value.substring(pos, pos + options.tabString.length)) {
                        __$coverCall('js/Jencil.0.1.2.js', '13603:13689');
                        o.value = o.value.substring(0, pos) + o.value.substring(pos + options.tabString.length);
                        __$coverCall('js/Jencil.0.1.2.js', '13732:13768');
                        modifier -= options.tabString.length;
                    } else if (!shft) {
                        __$coverCall('js/Jencil.0.1.2.js', '13818:13897');
                        o.value = o.value.substring(0, pos) + options.tabString + o.value.substring(pos);
                        __$coverCall('js/Jencil.0.1.2.js', '13929:13965');
                        modifier += options.tabString.length;
                    }
                }
            }
            __$coverCall('js/Jencil.0.1.2.js', '13988:13997');
            o.focus();
            __$coverCall('js/Jencil.0.1.2.js', '14002:14108');
            var ns = ss + (modifier > 0 ? options.tabString.length : modifier < 0 ? -options.tabString.length : 0);
            __$coverCall('js/Jencil.0.1.2.js', '14113:14135');
            var ne = es + modifier;
            __$coverCall('js/Jencil.0.1.2.js', '14140:14166');
            o.setSelectionRange(ns, ne);
        }
    }
    __$coverCall('js/Jencil.0.1.2.js', '14178:18622');
    function ie_tab(o, shft, options) {
        __$coverCall('js/Jencil.0.1.2.js', '14217:14261');
        var range = document.selection.createRange();
        __$coverCall('js/Jencil.0.1.2.js', '14268:18619');
        if (o == range.parentElement()) {
            __$coverCall('js/Jencil.0.1.2.js', '14439:18614');
            if ('' == range.text) {
                __$coverCall('js/Jencil.0.1.2.js', '14484:15374');
                if (shft) {
                    __$coverCall('js/Jencil.0.1.2.js', '14501:14535');
                    var bookmark = range.getBookmark();
                    __$coverCall('js/Jencil.0.1.2.js', '14623:14678');
                    range.moveStart('character', -options.tabString.length);
                    __$coverCall('js/Jencil.0.1.2.js', '14688:15041');
                    if (options.tabString == range.text) {
                        __$coverCall('js/Jencil.0.1.2.js', '14736:14751');
                        range.text = '';
                    } else {
                        __$coverCall('js/Jencil.0.1.2.js', '14864:14894');
                        range.moveToBookmark(bookmark);
                        __$coverCall('js/Jencil.0.1.2.js', '14905:14957');
                        range.moveEnd('character', options.tabString.length);
                        __$coverCall('js/Jencil.0.1.2.js', '14968:15031');
                        if (options.tabString == range.text)
                            range.text = '';
                    }
                    __$coverCall('js/Jencil.0.1.2.js', '15126:15146');
                    range.collapse(true);
                    __$coverCall('js/Jencil.0.1.2.js', '15153:15167');
                    range.select();
                } else {
                    __$coverCall('js/Jencil.0.1.2.js', '15288:15318');
                    range.text = options.tabString;
                    __$coverCall('js/Jencil.0.1.2.js', '15326:15347');
                    range.collapse(false);
                    __$coverCall('js/Jencil.0.1.2.js', '15354:15368');
                    range.select();
                }
            } else {
                __$coverCall('js/Jencil.0.1.2.js', '15471:15502');
                var selection_text = range.text;
                __$coverCall('js/Jencil.0.1.2.js', '15508:15549');
                var selection_len = selection_text.length;
                __$coverCall('js/Jencil.0.1.2.js', '15555:15603');
                var selection_arr = selection_text.split('\r\n');
                __$coverCall('js/Jencil.0.1.2.js', '15614:15664');
                var before_range = document.body.createTextRange();
                __$coverCall('js/Jencil.0.1.2.js', '15670:15703');
                before_range.moveToElementText(o);
                __$coverCall('js/Jencil.0.1.2.js', '15709:15754');
                before_range.setEndPoint('EndToStart', range);
                __$coverCall('js/Jencil.0.1.2.js', '15760:15795');
                var before_text = before_range.text;
                __$coverCall('js/Jencil.0.1.2.js', '15801:15843');
                var before_arr = before_text.split('\r\n');
                __$coverCall('js/Jencil.0.1.2.js', '15849:15884');
                var before_len = before_text.length;
                __$coverCall('js/Jencil.0.1.2.js', '15923:15972');
                var after_range = document.body.createTextRange();
                __$coverCall('js/Jencil.0.1.2.js', '15978:16010');
                after_range.moveToElementText(o);
                __$coverCall('js/Jencil.0.1.2.js', '16016:16060');
                after_range.setEndPoint('StartToEnd', range);
                __$coverCall('js/Jencil.0.1.2.js', '16066:16099');
                var after_text = after_range.text;
                __$coverCall('js/Jencil.0.1.2.js', '16214:16261');
                var end_range = document.body.createTextRange();
                __$coverCall('js/Jencil.0.1.2.js', '16267:16297');
                end_range.moveToElementText(o);
                __$coverCall('js/Jencil.0.1.2.js', '16303:16352');
                end_range.setEndPoint('StartToEnd', before_range);
                __$coverCall('js/Jencil.0.1.2.js', '16358:16387');
                var end_text = end_range.text;
                __$coverCall('js/Jencil.0.1.2.js', '16506:16534');
                var check_html = $(o).html();
                __$coverCall('js/Jencil.0.1.2.js', '16540:16645');
                $('#r3').text(before_len + ' + ' + selection_len + ' + ' + after_text.length + ' = ' + check_html.length);
                __$coverCall('js/Jencil.0.1.2.js', '16655:17390');
                if (before_len + end_text.length < check_html.length) {
                    __$coverCall('js/Jencil.0.1.2.js', '16717:16736');
                    before_arr.push('');
                    __$coverCall('js/Jencil.0.1.2.js', '16743:16758');
                    before_len += 2;
                    __$coverCall('js/Jencil.0.1.2.js', '16799:17043');
                    if (shft && options.tabString == selection_arr[0].substring(0, options.tabString.length))
                        selection_arr[0] = selection_arr[0].substring(options.tabString.length);
                    else if (!shft)
                        selection_arr[0] = options.tabString + selection_arr[0];
                } else {
                    __$coverCall('js/Jencil.0.1.2.js', '17064:17384');
                    if (shft && options.tabString == before_arr[before_arr.length - 1].substring(0, options.tabString.length))
                        before_arr[before_arr.length - 1] = before_arr[before_arr.length - 1].substring(options.tabString.length);
                    else if (!shft)
                        before_arr[before_arr.length - 1] = options.tabString + before_arr[before_arr.length - 1];
                }
                __$coverCall('js/Jencil.0.1.2.js', '17401:17705');
                for (var i = 1; i < selection_arr.length; i++) {
                    __$coverCall('js/Jencil.0.1.2.js', '17455:17699');
                    if (shft && options.tabString == selection_arr[i].substring(0, options.tabString.length))
                        selection_arr[i] = selection_arr[i].substring(options.tabString.length);
                    else if (!shft)
                        selection_arr[i] = options.tabString + selection_arr[i];
                }
                __$coverCall('js/Jencil.0.1.2.js', '17716:18020');
                if (1 == before_arr.length && 0 == before_len) {
                    __$coverCall('js/Jencil.0.1.2.js', '17770:18014');
                    if (shft && options.tabString == selection_arr[0].substring(0, options.tabString.length))
                        selection_arr[0] = selection_arr[0].substring(options.tabString.length);
                    else if (!shft)
                        selection_arr[0] = options.tabString + selection_arr[0];
                }
                __$coverCall('js/Jencil.0.1.2.js', '18027:18194');
                if (before_len + selection_len + after_text.length < check_html.length) {
                    __$coverCall('js/Jencil.0.1.2.js', '18108:18130');
                    selection_arr.push('');
                    __$coverCall('js/Jencil.0.1.2.js', '18137:18155');
                    selection_len += 2;
                }
                __$coverCall('js/Jencil.0.1.2.js', '18205:18248');
                before_range.text = before_arr.join('\r\n');
                __$coverCall('js/Jencil.0.1.2.js', '18254:18293');
                range.text = selection_arr.join('\r\n');
                __$coverCall('js/Jencil.0.1.2.js', '18304:18351');
                var new_range = document.body.createTextRange();
                __$coverCall('js/Jencil.0.1.2.js', '18357:18387');
                new_range.moveToElementText(o);
                __$coverCall('js/Jencil.0.1.2.js', '18398:18529');
                if (0 < before_len)
                    new_range.setEndPoint('StartToEnd', before_range);
                else
                    new_range.setEndPoint('StartToStart', before_range);
                __$coverCall('js/Jencil.0.1.2.js', '18535:18575');
                new_range.setEndPoint('EndToEnd', range);
                __$coverCall('js/Jencil.0.1.2.js', '18586:18604');
                new_range.select();
            }
        }
    }
}(jQuery));
__$coverCall('js/Jencil.0.1.2.js', '18657:98255');
(function () {
    __$coverCall('js/Jencil.0.1.2.js', '18673:19655');
    var ActionButton, AjaxViewer, Bar, BaseEditor, BaseHelper, BaseViewer, Button, Caretaker, CommandButton, DefaultProfile, DimainPanel, Fullscreen, FullscreenButton, HelperButton, HorizontalPanel, HorizontalSplitter, HtmlEditor, HtmlHelper, HtmlProfile, HtmlViewer, MonomainPanel, MultiplePanel, Originator, Panel, RedoButton, Selection, Separator, Splitter, Statusbar, TemplateHelper, TemplateViewer, TextEditor, Toolbar, TrimainPanel, UndoButton, VerticalPanel, VerticalSplitter, ViewerButton, Widget, Workspace, Wrapper, animate, autoIndentable, autoIndentableHtml, buttonFactory, curtainFactory, evolute, headerMarkup, translate, __slice = [].slice, __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
            __$coverCall('js/Jencil.0.1.2.js', '19406:19491');
            for (var key in parent) {
                __$coverCall('js/Jencil.0.1.2.js', '19432:19489');
                if (__hasProp.call(parent, key))
                    child[key] = parent[key];
            }
            __$coverCall('js/Jencil.0.1.2.js', '19493:19537');
            function ctor() {
                __$coverCall('js/Jencil.0.1.2.js', '19511:19535');
                this.constructor = child;
            }
            __$coverCall('js/Jencil.0.1.2.js', '19539:19572');
            ctor.prototype = parent.prototype;
            __$coverCall('js/Jencil.0.1.2.js', '19574:19602');
            child.prototype = new ctor();
            __$coverCall('js/Jencil.0.1.2.js', '19604:19638');
            child.__super__ = parent.prototype;
            __$coverCall('js/Jencil.0.1.2.js', '19640:19652');
            return child;
        };
    __$coverCall('js/Jencil.0.1.2.js', '19660:20162');
    window.namespace = function (target, name, block) {
        __$coverCall('js/Jencil.0.1.2.js', '19715:19751');
        var item, top, _i, _len, _ref, _ref1;
        __$coverCall('js/Jencil.0.1.2.js', '19757:19940');
        if (arguments.length < 3) {
            __$coverCall('js/Jencil.0.1.2.js', '19791:19934');
            _ref = [typeof exports !== 'undefined' ? exports : window].concat(__slice.call(arguments)), target = _ref[0], name = _ref[1], block = _ref[2];
        }
        __$coverCall('js/Jencil.0.1.2.js', '19946:19958');
        top = target;
        __$coverCall('js/Jencil.0.1.2.js', '19964:19987');
        _ref1 = name.split('.');
        __$coverCall('js/Jencil.0.1.2.js', '19993:20126');
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            __$coverCall('js/Jencil.0.1.2.js', '20052:20068');
            item = _ref1[_i];
            __$coverCall('js/Jencil.0.1.2.js', '20076:20120');
            target = target[item] || (target[item] = {});
        }
        __$coverCall('js/Jencil.0.1.2.js', '20132:20157');
        return block(target, top);
    };
    __$coverCall('js/Jencil.0.1.2.js', '20167:20475');
    Originator = function () {
        __$coverCall('js/Jencil.0.1.2.js', '20199:20222');
        function Originator() {
        }
        __$coverCall('js/Jencil.0.1.2.js', '20229:20330');
        Originator.prototype.createMemento = function () {
            __$coverCall('js/Jencil.0.1.2.js', '20285:20323');
            throw new Error('NotImplementedError');
        };
        __$coverCall('js/Jencil.0.1.2.js', '20337:20442');
        Originator.prototype.setMemento = function (memento) {
            __$coverCall('js/Jencil.0.1.2.js', '20397:20435');
            throw new Error('NotImplementedError');
        };
        __$coverCall('js/Jencil.0.1.2.js', '20449:20466');
        return Originator;
    }();
    __$coverCall('js/Jencil.0.1.2.js', '20480:22023');
    Caretaker = function () {
        __$coverCall('js/Jencil.0.1.2.js', '20511:20641');
        function Caretaker(originator) {
            __$coverCall('js/Jencil.0.1.2.js', '20550:20579');
            this._originator = originator;
            __$coverCall('js/Jencil.0.1.2.js', '20587:20607');
            this._undoStack = [];
            __$coverCall('js/Jencil.0.1.2.js', '20615:20635');
            this._redoStack = [];
        }
        __$coverCall('js/Jencil.0.1.2.js', '20648:20834');
        Caretaker.prototype.originator = function (originator) {
            __$coverCall('js/Jencil.0.1.2.js', '20710:20802');
            if (originator != null) {
                __$coverCall('js/Jencil.0.1.2.js', '20744:20773');
                this._originator = originator;
                __$coverCall('js/Jencil.0.1.2.js', '20783:20794');
                return this;
            }
            __$coverCall('js/Jencil.0.1.2.js', '20810:20827');
            return originator;
        };
        __$coverCall('js/Jencil.0.1.2.js', '20841:21027');
        Caretaker.prototype.save = function (memento) {
            __$coverCall('js/Jencil.0.1.2.js', '20894:20948');
            memento = memento || this.originator().createMemento();
            __$coverCall('js/Jencil.0.1.2.js', '20956:20985');
            this._undoStack.push(memento);
            __$coverCall('js/Jencil.0.1.2.js', '20993:21020');
            return this._redoStack = [];
        };
        __$coverCall('js/Jencil.0.1.2.js', '21034:21413');
        Caretaker.prototype.undo = function () {
            __$coverCall('js/Jencil.0.1.2.js', '21080:21094');
            var originator;
            __$coverCall('js/Jencil.0.1.2.js', '21102:21153');
            if (!this.canUndo()) {
                __$coverCall('js/Jencil.0.1.2.js', '21133:21145');
                return false;
            }
            __$coverCall('js/Jencil.0.1.2.js', '21161:21191');
            originator = this.originator();
            __$coverCall('js/Jencil.0.1.2.js', '21199:21247');
            this._redoStack.push(originator.createMemento());
            __$coverCall('js/Jencil.0.1.2.js', '21255:21299');
            originator.setMemento(this._undoStack.pop());
            __$coverCall('js/Jencil.0.1.2.js', '21307:21387');
            if (typeof originator.focus === 'function') {
                __$coverCall('js/Jencil.0.1.2.js', '21361:21379');
                originator.focus();
            }
            __$coverCall('js/Jencil.0.1.2.js', '21395:21406');
            return true;
        };
        __$coverCall('js/Jencil.0.1.2.js', '21420:21799');
        Caretaker.prototype.redo = function () {
            __$coverCall('js/Jencil.0.1.2.js', '21466:21480');
            var originator;
            __$coverCall('js/Jencil.0.1.2.js', '21488:21539');
            if (!this.canRedo()) {
                __$coverCall('js/Jencil.0.1.2.js', '21519:21531');
                return false;
            }
            __$coverCall('js/Jencil.0.1.2.js', '21547:21577');
            originator = this.originator();
            __$coverCall('js/Jencil.0.1.2.js', '21585:21633');
            this._undoStack.push(originator.createMemento());
            __$coverCall('js/Jencil.0.1.2.js', '21641:21685');
            originator.setMemento(this._redoStack.pop());
            __$coverCall('js/Jencil.0.1.2.js', '21693:21773');
            if (typeof originator.focus === 'function') {
                __$coverCall('js/Jencil.0.1.2.js', '21747:21765');
                originator.focus();
            }
            __$coverCall('js/Jencil.0.1.2.js', '21781:21792');
            return true;
        };
        __$coverCall('js/Jencil.0.1.2.js', '21806:21895');
        Caretaker.prototype.canUndo = function () {
            __$coverCall('js/Jencil.0.1.2.js', '21855:21888');
            return this._undoStack.length > 0;
        };
        __$coverCall('js/Jencil.0.1.2.js', '21902:21991');
        Caretaker.prototype.canRedo = function () {
            __$coverCall('js/Jencil.0.1.2.js', '21951:21984');
            return this._redoStack.length > 0;
        };
        __$coverCall('js/Jencil.0.1.2.js', '21998:22014');
        return Caretaker;
    }();
    __$coverCall('js/Jencil.0.1.2.js', '22028:28612');
    Selection = function () {
        __$coverCall('js/Jencil.0.1.2.js', '22059:22178');
        function Selection(document, element) {
            __$coverCall('js/Jencil.0.1.2.js', '22105:22129');
            this.document = document;
            __$coverCall('js/Jencil.0.1.2.js', '22137:22159');
            this.element = element;
            __$coverCall('js/Jencil.0.1.2.js', '22167:22171');
            this;
        }
        __$coverCall('js/Jencil.0.1.2.js', '22185:22809');
        Selection.prototype._getCaret = function () {
            __$coverCall('js/Jencil.0.1.2.js', '22236:22265');
            var caret, clone, e, range, s;
            __$coverCall('js/Jencil.0.1.2.js', '22273:22726');
            if (this.document.selection != null) {
                __$coverCall('js/Jencil.0.1.2.js', '22320:22365');
                range = this.document.selection.createRange();
                __$coverCall('js/Jencil.0.1.2.js', '22375:22400');
                clone = range.duplicate();
                __$coverCall('js/Jencil.0.1.2.js', '22410:22447');
                clone.moveToElementText(this.element);
                __$coverCall('js/Jencil.0.1.2.js', '22457:22493');
                clone.setEndPoint('EndToEnd', range);
                __$coverCall('js/Jencil.0.1.2.js', '22503:22544');
                s = clone.text.length - range.text.length;
                __$coverCall('js/Jencil.0.1.2.js', '22554:22579');
                e = s + range.text.length;
            } else if (this.element.setSelectionRange != null) {
                __$coverCall('js/Jencil.0.1.2.js', '22648:22679');
                s = this.element.selectionStart;
                __$coverCall('js/Jencil.0.1.2.js', '22689:22718');
                e = this.element.selectionEnd;
            }
            __$coverCall('js/Jencil.0.1.2.js', '22734:22748');
            caret = [
                s,
                e
            ];
            __$coverCall('js/Jencil.0.1.2.js', '22756:22782');
            caret.isCollapse = s === e;
            __$coverCall('js/Jencil.0.1.2.js', '22790:22802');
            return caret;
        };
        __$coverCall('js/Jencil.0.1.2.js', '22816:23392');
        Selection.prototype._setCaret = function (start, end) {
            __$coverCall('js/Jencil.0.1.2.js', '22877:22897');
            var range, scrollTop;
            __$coverCall('js/Jencil.0.1.2.js', '22905:22939');
            scrollTop = this.element.scrollTop;
            __$coverCall('js/Jencil.0.1.2.js', '22947:23296');
            if (this.element.setSelectionRange != null) {
                __$coverCall('js/Jencil.0.1.2.js', '23001:23043');
                this.element.setSelectionRange(start, end);
            } else if (this.element.createTextRange) {
                __$coverCall('js/Jencil.0.1.2.js', '23102:23140');
                range = this.element.createTextRange();
                __$coverCall('js/Jencil.0.1.2.js', '23150:23170');
                range.collapse(true);
                __$coverCall('js/Jencil.0.1.2.js', '23180:23215');
                range.moveStart('character', start);
                __$coverCall('js/Jencil.0.1.2.js', '23225:23264');
                range.moveEnd('character', end - start);
                __$coverCall('js/Jencil.0.1.2.js', '23274:23288');
                range.select();
            }
            __$coverCall('js/Jencil.0.1.2.js', '23304:23324');
            this.element.focus();
            __$coverCall('js/Jencil.0.1.2.js', '23332:23366');
            this.element.scrollTop = scrollTop;
            __$coverCall('js/Jencil.0.1.2.js', '23374:23385');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '23399:23774');
        Selection.prototype.caret = function (start, end) {
            __$coverCall('js/Jencil.0.1.2.js', '23456:23563');
            if (start != null && typeof start === 'array') {
                __$coverCall('js/Jencil.0.1.2.js', '23515:23529');
                end = start[1];
                __$coverCall('js/Jencil.0.1.2.js', '23539:23555');
                start = start[0];
            }
            __$coverCall('js/Jencil.0.1.2.js', '23571:23639');
            if (start != null && !(end != null)) {
                __$coverCall('js/Jencil.0.1.2.js', '23620:23631');
                end = start;
            }
            __$coverCall('js/Jencil.0.1.2.js', '23647:23736');
            if (start != null && end != null) {
                __$coverCall('js/Jencil.0.1.2.js', '23695:23728');
                return this._setCaret(start, end);
            }
            __$coverCall('js/Jencil.0.1.2.js', '23744:23767');
            return this._getCaret();
        };
        __$coverCall('js/Jencil.0.1.2.js', '23781:23928');
        Selection.prototype.caretOffset = function (offset) {
            __$coverCall('js/Jencil.0.1.2.js', '23840:23849');
            var caret;
            __$coverCall('js/Jencil.0.1.2.js', '23857:23877');
            caret = this.caret();
            __$coverCall('js/Jencil.0.1.2.js', '23885:23921');
            return this.caret(caret[0] + offset);
        };
        __$coverCall('js/Jencil.0.1.2.js', '23935:24264');
        Selection.prototype._replace = function (str, start, end) {
            __$coverCall('js/Jencil.0.1.2.js', '24000:24019');
            var a, b, scrollTop;
            __$coverCall('js/Jencil.0.1.2.js', '24027:24061');
            scrollTop = this.element.scrollTop;
            __$coverCall('js/Jencil.0.1.2.js', '24069:24111');
            b = this.element.value.substring(0, start);
            __$coverCall('js/Jencil.0.1.2.js', '24119:24156');
            a = this.element.value.substring(end);
            __$coverCall('js/Jencil.0.1.2.js', '24164:24196');
            this.element.value = b + str + a;
            __$coverCall('js/Jencil.0.1.2.js', '24204:24238');
            this.element.scrollTop = scrollTop;
            __$coverCall('js/Jencil.0.1.2.js', '24246:24257');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '24271:24660');
        Selection.prototype._getText = function () {
            __$coverCall('js/Jencil.0.1.2.js', '24321:24342');
            var e, range, s, _ref;
            __$coverCall('js/Jencil.0.1.2.js', '24350:24634');
            if (this.document.selection != null) {
                __$coverCall('js/Jencil.0.1.2.js', '24397:24442');
                range = this.document.selection.createRange();
                __$coverCall('js/Jencil.0.1.2.js', '24452:24469');
                return range.text;
            } else if (this.element.setSelectionRange) {
                __$coverCall('js/Jencil.0.1.2.js', '24530:24575');
                _ref = this.caret(), s = _ref[0], e = _ref[1];
                __$coverCall('js/Jencil.0.1.2.js', '24585:24626');
                return this.element.value.substring(s, e);
            }
            __$coverCall('js/Jencil.0.1.2.js', '24642:24653');
            return null;
        };
        __$coverCall('js/Jencil.0.1.2.js', '24667:25084');
        Selection.prototype._setText = function (str, keepSelection) {
            __$coverCall('js/Jencil.0.1.2.js', '24735:24760');
            var e, s, scrollTop, _ref;
            __$coverCall('js/Jencil.0.1.2.js', '24768:24802');
            scrollTop = this.element.scrollTop;
            __$coverCall('js/Jencil.0.1.2.js', '24810:24855');
            _ref = this.caret(), s = _ref[0], e = _ref[1];
            __$coverCall('js/Jencil.0.1.2.js', '24863:24887');
            this._replace(str, s, e);
            __$coverCall('js/Jencil.0.1.2.js', '24895:24913');
            e = s + str.length;
            __$coverCall('js/Jencil.0.1.2.js', '24921:24964');
            if (!keepSelection) {
                __$coverCall('js/Jencil.0.1.2.js', '24951:24956');
                s = e;
            }
            __$coverCall('js/Jencil.0.1.2.js', '24972:24988');
            this.caret(s, e);
            __$coverCall('js/Jencil.0.1.2.js', '24996:25016');
            this.element.focus();
            __$coverCall('js/Jencil.0.1.2.js', '25024:25058');
            this.element.scrollTop = scrollTop;
            __$coverCall('js/Jencil.0.1.2.js', '25066:25077');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '25091:25267');
        Selection.prototype.text = function (str, keepSelection) {
            __$coverCall('js/Jencil.0.1.2.js', '25155:25230');
            if (str != null) {
                __$coverCall('js/Jencil.0.1.2.js', '25182:25222');
                return this._setText(str, keepSelection);
            }
            __$coverCall('js/Jencil.0.1.2.js', '25238:25260');
            return this._getText();
        };
        __$coverCall('js/Jencil.0.1.2.js', '25274:25734');
        Selection.prototype.insertBefore = function (str, keepSelection) {
            __$coverCall('js/Jencil.0.1.2.js', '25346:25377');
            var e, s, scrollTop, text, _ref;
            __$coverCall('js/Jencil.0.1.2.js', '25385:25419');
            scrollTop = this.element.scrollTop;
            __$coverCall('js/Jencil.0.1.2.js', '25427:25472');
            _ref = this.caret(), s = _ref[0], e = _ref[1];
            __$coverCall('js/Jencil.0.1.2.js', '25480:25498');
            text = this.text();
            __$coverCall('js/Jencil.0.1.2.js', '25506:25537');
            this._replace(str + text, s, e);
            __$coverCall('js/Jencil.0.1.2.js', '25545:25563');
            e = s + str.length;
            __$coverCall('js/Jencil.0.1.2.js', '25571:25614');
            if (!keepSelection) {
                __$coverCall('js/Jencil.0.1.2.js', '25601:25606');
                s = e;
            }
            __$coverCall('js/Jencil.0.1.2.js', '25622:25638');
            this.caret(s, e);
            __$coverCall('js/Jencil.0.1.2.js', '25646:25666');
            this.element.focus();
            __$coverCall('js/Jencil.0.1.2.js', '25674:25708');
            this.element.scrollTop = scrollTop;
            __$coverCall('js/Jencil.0.1.2.js', '25716:25727');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '25741:26213');
        Selection.prototype.insertAfter = function (str, keepSelection) {
            __$coverCall('js/Jencil.0.1.2.js', '25812:25843');
            var e, s, scrollTop, text, _ref;
            __$coverCall('js/Jencil.0.1.2.js', '25851:25885');
            scrollTop = this.element.scrollTop;
            __$coverCall('js/Jencil.0.1.2.js', '25893:25938');
            _ref = this.caret(), s = _ref[0], e = _ref[1];
            __$coverCall('js/Jencil.0.1.2.js', '25946:25964');
            text = this.text();
            __$coverCall('js/Jencil.0.1.2.js', '25972:26003');
            this._replace(text + str, s, e);
            __$coverCall('js/Jencil.0.1.2.js', '26011:26016');
            s = e;
            __$coverCall('js/Jencil.0.1.2.js', '26024:26042');
            e = e + str.length;
            __$coverCall('js/Jencil.0.1.2.js', '26050:26093');
            if (!keepSelection) {
                __$coverCall('js/Jencil.0.1.2.js', '26080:26085');
                s = e;
            }
            __$coverCall('js/Jencil.0.1.2.js', '26101:26117');
            this.caret(s, e);
            __$coverCall('js/Jencil.0.1.2.js', '26125:26145');
            this.element.focus();
            __$coverCall('js/Jencil.0.1.2.js', '26153:26187');
            this.element.scrollTop = scrollTop;
            __$coverCall('js/Jencil.0.1.2.js', '26195:26206');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '26220:26955');
        Selection.prototype.enclose = function (lhs, rhs, keepSelection) {
            __$coverCall('js/Jencil.0.1.2.js', '26292:26328');
            var e, s, scrollTop, str, text, _ref;
            __$coverCall('js/Jencil.0.1.2.js', '26336:26370');
            scrollTop = this.element.scrollTop;
            __$coverCall('js/Jencil.0.1.2.js', '26378:26396');
            text = this.text();
            __$coverCall('js/Jencil.0.1.2.js', '26404:26859');
            if (text.indexOf(lhs) === 0 && text.lastIndexOf(rhs) === text.length - rhs.length) {
                __$coverCall('js/Jencil.0.1.2.js', '26499:26557');
                str = text.substring(lhs.length, text.length - rhs.length);
                __$coverCall('js/Jencil.0.1.2.js', '26567:26596');
                this.text(str, keepSelection);
            } else {
                __$coverCall('js/Jencil.0.1.2.js', '26621:26666');
                _ref = this.caret(), s = _ref[0], e = _ref[1];
                __$coverCall('js/Jencil.0.1.2.js', '26676:26713');
                this._replace(lhs + text + rhs, s, e);
                __$coverCall('js/Jencil.0.1.2.js', '26723:26768');
                e = s + lhs.length + text.length + rhs.length;
                __$coverCall('js/Jencil.0.1.2.js', '26778:26825');
                if (!keepSelection) {
                    __$coverCall('js/Jencil.0.1.2.js', '26810:26815');
                    s = e;
                }
                __$coverCall('js/Jencil.0.1.2.js', '26835:26851');
                this.caret(s, e);
            }
            __$coverCall('js/Jencil.0.1.2.js', '26867:26887');
            this.element.focus();
            __$coverCall('js/Jencil.0.1.2.js', '26895:26929');
            this.element.scrollTop = scrollTop;
            __$coverCall('js/Jencil.0.1.2.js', '26937:26948');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '26962:27250');
        Selection.prototype._getLineCaretOfCaret = function (caret) {
            __$coverCall('js/Jencil.0.1.2.js', '27029:27044');
            var e, s, value;
            __$coverCall('js/Jencil.0.1.2.js', '27052:27078');
            value = this.element.value;
            __$coverCall('js/Jencil.0.1.2.js', '27086:27128');
            s = value.lastIndexOf('\n', caret - 1) + 1;
            __$coverCall('js/Jencil.0.1.2.js', '27136:27166');
            e = value.indexOf('\n', caret);
            __$coverCall('js/Jencil.0.1.2.js', '27174:27222');
            if (e === -1) {
                __$coverCall('js/Jencil.0.1.2.js', '27198:27214');
                e = value.length;
            }
            __$coverCall('js/Jencil.0.1.2.js', '27230:27243');
            return [
                s,
                e
            ];
        };
        __$coverCall('js/Jencil.0.1.2.js', '27257:27368');
        Selection.prototype._getLineCaret = function () {
            __$coverCall('js/Jencil.0.1.2.js', '27312:27361');
            return this._getLineCaretOfCaret(this.caret()[0]);
        };
        __$coverCall('js/Jencil.0.1.2.js', '27375:27556');
        Selection.prototype._getLine = function () {
            __$coverCall('js/Jencil.0.1.2.js', '27425:27439');
            var e, s, _ref;
            __$coverCall('js/Jencil.0.1.2.js', '27447:27500');
            _ref = this._getLineCaret(), s = _ref[0], e = _ref[1];
            __$coverCall('js/Jencil.0.1.2.js', '27508:27549');
            return this.element.value.substring(s, e);
        };
        __$coverCall('js/Jencil.0.1.2.js', '27563:27991');
        Selection.prototype._setLine = function (line, keepSelection) {
            __$coverCall('js/Jencil.0.1.2.js', '27632:27657');
            var e, s, scrollTop, _ref;
            __$coverCall('js/Jencil.0.1.2.js', '27665:27699');
            scrollTop = this.element.scrollTop;
            __$coverCall('js/Jencil.0.1.2.js', '27707:27760');
            _ref = this._getLineCaret(), s = _ref[0], e = _ref[1];
            __$coverCall('js/Jencil.0.1.2.js', '27768:27793');
            this._replace(line, s, e);
            __$coverCall('js/Jencil.0.1.2.js', '27801:27820');
            e = s + line.length;
            __$coverCall('js/Jencil.0.1.2.js', '27828:27871');
            if (!keepSelection) {
                __$coverCall('js/Jencil.0.1.2.js', '27858:27863');
                s = e;
            }
            __$coverCall('js/Jencil.0.1.2.js', '27879:27895');
            this.caret(s, e);
            __$coverCall('js/Jencil.0.1.2.js', '27903:27923');
            this.element.focus();
            __$coverCall('js/Jencil.0.1.2.js', '27931:27965');
            this.element.scrollTop = scrollTop;
            __$coverCall('js/Jencil.0.1.2.js', '27973:27984');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '27998:28180');
        Selection.prototype.line = function (value, keepSelection) {
            __$coverCall('js/Jencil.0.1.2.js', '28064:28143');
            if (value != null) {
                __$coverCall('js/Jencil.0.1.2.js', '28093:28135');
                return this._setLine(value, keepSelection);
            }
            __$coverCall('js/Jencil.0.1.2.js', '28151:28173');
            return this._getLine();
        };
        __$coverCall('js/Jencil.0.1.2.js', '28187:28374');
        Selection.prototype.selectWholeLine = function (caret) {
            __$coverCall('js/Jencil.0.1.2.js', '28249:28263');
            var e, s, _ref;
            __$coverCall('js/Jencil.0.1.2.js', '28271:28336');
            _ref = this._getLineCaretOfCaret(caret), s = _ref[0], e = _ref[1];
            __$coverCall('js/Jencil.0.1.2.js', '28344:28367');
            return this.caret(s, e);
        };
        __$coverCall('js/Jencil.0.1.2.js', '28381:28580');
        Selection.prototype.selectWholeCurrentLine = function () {
            __$coverCall('js/Jencil.0.1.2.js', '28445:28459');
            var e, s, _ref;
            __$coverCall('js/Jencil.0.1.2.js', '28467:28542');
            _ref = this._getLineCaretOfCaret(this.caret()[0]), s = _ref[0], e = _ref[1];
            __$coverCall('js/Jencil.0.1.2.js', '28550:28573');
            return this.caret(s, e);
        };
        __$coverCall('js/Jencil.0.1.2.js', '28587:28603');
        return Selection;
    }();
    __$coverCall('js/Jencil.0.1.2.js', '28711:34445');
    evolute = function () {
        __$coverCall('js/Jencil.0.1.2.js', '28739:28913');
        var absoluteX, absoluteY, contentX, contentY, maxHeight, maxWidth, minHeight, minWidth, ncss, nonContentHeight, nonContentWidth, outerHeight, outerWidth, relativeX, relativeY;
        __$coverCall('js/Jencil.0.1.2.js', '28919:29102');
        nonContentWidth = function (includeMargin) {
            __$coverCall('js/Jencil.0.1.2.js', '28969:29035');
            if (includeMargin == null) {
                __$coverCall('js/Jencil.0.1.2.js', '29006:29027');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.0.1.2.js', '29043:29095');
            return this.outerWidth(includeMargin) - this.width();
        };
        __$coverCall('js/Jencil.0.1.2.js', '29108:29294');
        nonContentHeight = function (includeMargin) {
            __$coverCall('js/Jencil.0.1.2.js', '29159:29225');
            if (includeMargin == null) {
                __$coverCall('js/Jencil.0.1.2.js', '29196:29217');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.0.1.2.js', '29233:29287');
            return this.outerHeight(includeMargin) - this.height();
        };
        __$coverCall('js/Jencil.0.1.2.js', '29300:29738');
        outerWidth = function (includeMargin, value) {
            __$coverCall('js/Jencil.0.1.2.js', '29352:29362');
            var offset;
            __$coverCall('js/Jencil.0.1.2.js', '29370:29436');
            if (includeMargin == null) {
                __$coverCall('js/Jencil.0.1.2.js', '29407:29428');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.0.1.2.js', '29444:29553');
            if (typeof includeMargin === 'number') {
                __$coverCall('js/Jencil.0.1.2.js', '29493:29514');
                value = includeMargin;
                __$coverCall('js/Jencil.0.1.2.js', '29524:29545');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.0.1.2.js', '29561:29685');
            if (value != null) {
                __$coverCall('js/Jencil.0.1.2.js', '29590:29634');
                offset = this.nonContentWidth(includeMargin);
                __$coverCall('js/Jencil.0.1.2.js', '29644:29677');
                return this.width(value - offset);
            }
            __$coverCall('js/Jencil.0.1.2.js', '29693:29731');
            return this._outerWidth(includeMargin);
        };
        __$coverCall('js/Jencil.0.1.2.js', '29744:30186');
        outerHeight = function (includeMargin, value) {
            __$coverCall('js/Jencil.0.1.2.js', '29797:29807');
            var offset;
            __$coverCall('js/Jencil.0.1.2.js', '29815:29881');
            if (includeMargin == null) {
                __$coverCall('js/Jencil.0.1.2.js', '29852:29873');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.0.1.2.js', '29889:29998');
            if (typeof includeMargin === 'number') {
                __$coverCall('js/Jencil.0.1.2.js', '29938:29959');
                value = includeMargin;
                __$coverCall('js/Jencil.0.1.2.js', '29969:29990');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.0.1.2.js', '30006:30132');
            if (value != null) {
                __$coverCall('js/Jencil.0.1.2.js', '30035:30080');
                offset = this.nonContentHeight(includeMargin);
                __$coverCall('js/Jencil.0.1.2.js', '30090:30124');
                return this.height(value - offset);
            }
            __$coverCall('js/Jencil.0.1.2.js', '30140:30179');
            return this._outerHeight(includeMargin);
        };
        __$coverCall('js/Jencil.0.1.2.js', '30192:30375');
        nonContentWidth = function (includeMargin) {
            __$coverCall('js/Jencil.0.1.2.js', '30242:30308');
            if (includeMargin == null) {
                __$coverCall('js/Jencil.0.1.2.js', '30279:30300');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.0.1.2.js', '30316:30368');
            return this.outerWidth(includeMargin) - this.width();
        };
        __$coverCall('js/Jencil.0.1.2.js', '30381:30567');
        nonContentHeight = function (includeMargin) {
            __$coverCall('js/Jencil.0.1.2.js', '30432:30498');
            if (includeMargin == null) {
                __$coverCall('js/Jencil.0.1.2.js', '30469:30490');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.0.1.2.js', '30506:30560');
            return this.outerHeight(includeMargin) - this.height();
        };
        __$coverCall('js/Jencil.0.1.2.js', '30573:30945');
        ncss = function (propertyName, defaultValue) {
            __$coverCall('js/Jencil.0.1.2.js', '30625:30634');
            var value;
            __$coverCall('js/Jencil.0.1.2.js', '30642:30705');
            if (defaultValue == null) {
                __$coverCall('js/Jencil.0.1.2.js', '30678:30697');
                defaultValue = null;
            }
            __$coverCall('js/Jencil.0.1.2.js', '30713:30743');
            value = this.css(propertyName);
            __$coverCall('js/Jencil.0.1.2.js', '30751:30883');
            if (value === '' || value === 'none' || value === null || value === void 0 || value === NaN) {
                __$coverCall('js/Jencil.0.1.2.js', '30856:30875');
                return defaultValue;
            }
            __$coverCall('js/Jencil.0.1.2.js', '30891:30918');
            value = parseInt(value, 10);
            __$coverCall('js/Jencil.0.1.2.js', '30926:30938');
            return value;
        };
        __$coverCall('js/Jencil.0.1.2.js', '30951:31017');
        minWidth = function () {
            __$coverCall('js/Jencil.0.1.2.js', '30981:31010');
            return this.ncss('min-width');
        };
        __$coverCall('js/Jencil.0.1.2.js', '31023:31091');
        minHeight = function () {
            __$coverCall('js/Jencil.0.1.2.js', '31054:31084');
            return this.ncss('min-height');
        };
        __$coverCall('js/Jencil.0.1.2.js', '31097:31163');
        maxWidth = function () {
            __$coverCall('js/Jencil.0.1.2.js', '31127:31156');
            return this.ncss('max-width');
        };
        __$coverCall('js/Jencil.0.1.2.js', '31169:31237');
        maxHeight = function () {
            __$coverCall('js/Jencil.0.1.2.js', '31200:31230');
            return this.ncss('max-height');
        };
        __$coverCall('js/Jencil.0.1.2.js', '31243:31621');
        contentX = function (includeMargin) {
            __$coverCall('js/Jencil.0.1.2.js', '31286:31325');
            var borderLeft, marginLeft, paddingLeft;
            __$coverCall('js/Jencil.0.1.2.js', '31333:31399');
            if (includeMargin == null) {
                __$coverCall('js/Jencil.0.1.2.js', '31370:31391');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.0.1.2.js', '31407:31464');
            marginLeft = includeMargin ? this.ncss('margin-left') : 0;
            __$coverCall('js/Jencil.0.1.2.js', '31472:31515');
            borderLeft = this.ncss('border-left-width');
            __$coverCall('js/Jencil.0.1.2.js', '31523:31562');
            paddingLeft = this.ncss('padding-left');
            __$coverCall('js/Jencil.0.1.2.js', '31570:31614');
            return marginLeft + borderLeft + paddingLeft;
        };
        __$coverCall('js/Jencil.0.1.2.js', '31627:31993');
        contentY = function (includeMargin) {
            __$coverCall('js/Jencil.0.1.2.js', '31670:31706');
            var borderTop, marginTop, paddingTop;
            __$coverCall('js/Jencil.0.1.2.js', '31714:31780');
            if (includeMargin == null) {
                __$coverCall('js/Jencil.0.1.2.js', '31751:31772');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.0.1.2.js', '31788:31843');
            marginTop = includeMargin ? this.ncss('margin-top') : 0;
            __$coverCall('js/Jencil.0.1.2.js', '31851:31892');
            borderTop = this.ncss('border-top-width');
            __$coverCall('js/Jencil.0.1.2.js', '31900:31937');
            paddingTop = this.ncss('padding-top');
            __$coverCall('js/Jencil.0.1.2.js', '31945:31986');
            return marginTop + borderTop + paddingTop;
        };
        __$coverCall('js/Jencil.0.1.2.js', '31999:32208');
        absoluteX = function (value) {
            __$coverCall('js/Jencil.0.1.2.js', '32035:32045');
            var offset;
            __$coverCall('js/Jencil.0.1.2.js', '32053:32075');
            offset = this.offset();
            __$coverCall('js/Jencil.0.1.2.js', '32083:32175');
            if (value != null) {
                __$coverCall('js/Jencil.0.1.2.js', '32112:32131');
                offset.left = value;
                __$coverCall('js/Jencil.0.1.2.js', '32141:32167');
                return this.offset(offset);
            }
            __$coverCall('js/Jencil.0.1.2.js', '32183:32201');
            return offset.left;
        };
        __$coverCall('js/Jencil.0.1.2.js', '32214:32421');
        absoluteY = function (value) {
            __$coverCall('js/Jencil.0.1.2.js', '32250:32260');
            var offset;
            __$coverCall('js/Jencil.0.1.2.js', '32268:32290');
            offset = this.offset();
            __$coverCall('js/Jencil.0.1.2.js', '32298:32389');
            if (value != null) {
                __$coverCall('js/Jencil.0.1.2.js', '32327:32345');
                offset.top = value;
                __$coverCall('js/Jencil.0.1.2.js', '32355:32381');
                return this.offset(offset);
            }
            __$coverCall('js/Jencil.0.1.2.js', '32397:32414');
            return offset.top;
        };
        __$coverCall('js/Jencil.0.1.2.js', '32427:32923');
        relativeX = function (includeMargin, value) {
            __$coverCall('js/Jencil.0.1.2.js', '32478:32496');
            var offset, parent;
            __$coverCall('js/Jencil.0.1.2.js', '32504:32570');
            if (includeMargin == null) {
                __$coverCall('js/Jencil.0.1.2.js', '32541:32562');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.0.1.2.js', '32578:32687');
            if (typeof includeMargin === 'number') {
                __$coverCall('js/Jencil.0.1.2.js', '32627:32648');
                value = includeMargin;
                __$coverCall('js/Jencil.0.1.2.js', '32658:32679');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.0.1.2.js', '32695:32726');
            parent = evolute(this.parent());
            __$coverCall('js/Jencil.0.1.2.js', '32734:32794');
            offset = parent.absoluteX() + parent.contentX(includeMargin);
            __$coverCall('js/Jencil.0.1.2.js', '32802:32876');
            if (value != null) {
                __$coverCall('js/Jencil.0.1.2.js', '32831:32868');
                return this.absoluteX(value + offset);
            }
            __$coverCall('js/Jencil.0.1.2.js', '32884:32916');
            return this.absoluteX() - offset;
        };
        __$coverCall('js/Jencil.0.1.2.js', '32929:33425');
        relativeY = function (includeMargin, value) {
            __$coverCall('js/Jencil.0.1.2.js', '32980:32998');
            var offset, parent;
            __$coverCall('js/Jencil.0.1.2.js', '33006:33072');
            if (includeMargin == null) {
                __$coverCall('js/Jencil.0.1.2.js', '33043:33064');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.0.1.2.js', '33080:33189');
            if (typeof includeMargin === 'number') {
                __$coverCall('js/Jencil.0.1.2.js', '33129:33150');
                value = includeMargin;
                __$coverCall('js/Jencil.0.1.2.js', '33160:33181');
                includeMargin = false;
            }
            __$coverCall('js/Jencil.0.1.2.js', '33197:33228');
            parent = evolute(this.parent());
            __$coverCall('js/Jencil.0.1.2.js', '33236:33296');
            offset = parent.absoluteY() + parent.contentY(includeMargin);
            __$coverCall('js/Jencil.0.1.2.js', '33304:33378');
            if (value != null) {
                __$coverCall('js/Jencil.0.1.2.js', '33333:33370');
                return this.absoluteY(value + offset);
            }
            __$coverCall('js/Jencil.0.1.2.js', '33386:33418');
            return this.absoluteY() - offset;
        };
        __$coverCall('js/Jencil.0.1.2.js', '33431:34417');
        evolute = function (jQueryObj) {
            __$coverCall('js/Jencil.0.1.2.js', '33469:33540');
            if (jQueryObj.__evoluted__ === true) {
                __$coverCall('js/Jencil.0.1.2.js', '33516:33532');
                return jQueryObj;
            }
            __$coverCall('js/Jencil.0.1.2.js', '33548:33592');
            jQueryObj._outerWidth = jQueryObj.outerWidth;
            __$coverCall('js/Jencil.0.1.2.js', '33600:33646');
            jQueryObj._outerHeight = jQueryObj.outerHeight;
            __$coverCall('js/Jencil.0.1.2.js', '33654:33697');
            jQueryObj.nonContentWidth = nonContentWidth;
            __$coverCall('js/Jencil.0.1.2.js', '33705:33750');
            jQueryObj.nonContentHeight = nonContentHeight;
            __$coverCall('js/Jencil.0.1.2.js', '33758:33791');
            jQueryObj.outerWidth = outerWidth;
            __$coverCall('js/Jencil.0.1.2.js', '33799:33834');
            jQueryObj.outerHeight = outerHeight;
            __$coverCall('js/Jencil.0.1.2.js', '33842:33885');
            jQueryObj.nonContentWidth = nonContentWidth;
            __$coverCall('js/Jencil.0.1.2.js', '33893:33938');
            jQueryObj.nonContentHeight = nonContentHeight;
            __$coverCall('js/Jencil.0.1.2.js', '33946:33967');
            jQueryObj.ncss = ncss;
            __$coverCall('js/Jencil.0.1.2.js', '33975:34004');
            jQueryObj.minWidth = minWidth;
            __$coverCall('js/Jencil.0.1.2.js', '34012:34043');
            jQueryObj.minHeight = minHeight;
            __$coverCall('js/Jencil.0.1.2.js', '34051:34080');
            jQueryObj.maxWidth = maxWidth;
            __$coverCall('js/Jencil.0.1.2.js', '34088:34119');
            jQueryObj.maxHeight = maxHeight;
            __$coverCall('js/Jencil.0.1.2.js', '34127:34156');
            jQueryObj.contentX = contentX;
            __$coverCall('js/Jencil.0.1.2.js', '34164:34193');
            jQueryObj.contentY = contentY;
            __$coverCall('js/Jencil.0.1.2.js', '34201:34232');
            jQueryObj.absoluteX = absoluteX;
            __$coverCall('js/Jencil.0.1.2.js', '34240:34271');
            jQueryObj.absoluteY = absoluteY;
            __$coverCall('js/Jencil.0.1.2.js', '34279:34310');
            jQueryObj.relativeX = relativeX;
            __$coverCall('js/Jencil.0.1.2.js', '34318:34349');
            jQueryObj.relativeY = relativeY;
            __$coverCall('js/Jencil.0.1.2.js', '34357:34386');
            jQueryObj.__evoluted__ = true;
            __$coverCall('js/Jencil.0.1.2.js', '34394:34410');
            return jQueryObj;
        };
        __$coverCall('js/Jencil.0.1.2.js', '34423:34437');
        return evolute;
    }();
    __$coverCall('js/Jencil.0.1.2.js', '34450:35053');
    curtainFactory = function (element) {
        __$coverCall('js/Jencil.0.1.2.js', '34491:34502');
        var curtain;
        __$coverCall('js/Jencil.0.1.2.js', '34508:34543');
        element.css('position', 'relative');
        __$coverCall('js/Jencil.0.1.2.js', '34549:34725');
        curtain = $('<div>').appendTo(element).hide().css({
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'overflow': 'hidden',
            'z-index': 99999
        });
        __$coverCall('js/Jencil.0.1.2.js', '34731:34816');
        curtain.on = function () {
            __$coverCall('js/Jencil.0.1.2.js', '34763:34780');
            curtain.refresh();
            __$coverCall('js/Jencil.0.1.2.js', '34788:34809');
            return curtain.show();
        };
        __$coverCall('js/Jencil.0.1.2.js', '34822:34961');
        curtain.refresh = function () {
            __$coverCall('js/Jencil.0.1.2.js', '34859:34898');
            curtain.width(element.outerWidth(true));
            __$coverCall('js/Jencil.0.1.2.js', '34906:34954');
            return curtain.height(element.outerHeight(true));
        };
        __$coverCall('js/Jencil.0.1.2.js', '34967:35028');
        curtain.off = function () {
            __$coverCall('js/Jencil.0.1.2.js', '35000:35021');
            return curtain.hide();
        };
        __$coverCall('js/Jencil.0.1.2.js', '35034:35048');
        return curtain;
    };
    __$coverCall('js/Jencil.0.1.2.js', '35338:36385');
    animate = function () {
        __$coverCall('js/Jencil.0.1.2.js', '35366:35389');
        var defaultOptions, now;
        __$coverCall('js/Jencil.0.1.2.js', '35395:35456');
        now = function () {
            __$coverCall('js/Jencil.0.1.2.js', '35420:35449');
            return new Date().getTime();
        };
        __$coverCall('js/Jencil.0.1.2.js', '35462:35626');
        defaultOptions = {
            start: 0,
            end: 100,
            duration: 1000,
            callbackEach: null,
            callbackDone: null,
            easing: jQuery.easing.swing
        };
        __$coverCall('js/Jencil.0.1.2.js', '35632:36377');
        return function (options) {
            __$coverCall('js/Jencil.0.1.2.js', '35665:35696');
            var difference, startTime, step;
            __$coverCall('js/Jencil.0.1.2.js', '35704:35752');
            options = jQuery.extend(defaultOptions, options);
            __$coverCall('js/Jencil.0.1.2.js', '35760:35777');
            startTime = now();
            __$coverCall('js/Jencil.0.1.2.js', '35785:35825');
            difference = options.end - options.start;
            __$coverCall('js/Jencil.0.1.2.js', '35833:36349');
            step = function () {
                __$coverCall('js/Jencil.0.1.2.js', '35861:35873');
                var epoch, x;
                __$coverCall('js/Jencil.0.1.2.js', '35883:35908');
                epoch = now() - startTime;
                __$coverCall('js/Jencil.0.1.2.js', '35918:35993');
                x = options.easing(epoch / options.duration, epoch, 0, 1, options.duration);
                __$coverCall('js/Jencil.0.1.2.js', '36003:36037');
                x = x * difference + options.start;
                __$coverCall('js/Jencil.0.1.2.js', '36047:36077');
                options.callbackEach(x, epoch);
                __$coverCall('js/Jencil.0.1.2.js', '36087:36340');
                if (epoch < options.duration) {
                    __$coverCall('js/Jencil.0.1.2.js', '36129:36155');
                    return setTimeout(step, 1);
                } else {
                    __$coverCall('js/Jencil.0.1.2.js', '36184:36235');
                    options.callbackEach(options.end, options.duration);
                    __$coverCall('js/Jencil.0.1.2.js', '36247:36330');
                    return typeof options.callbackDone === 'function' ? options.callbackDone() : void 0;
                }
            };
            __$coverCall('js/Jencil.0.1.2.js', '36357:36370');
            return step();
        };
    }();
    __$coverCall('js/Jencil.0.1.2.js', '37810:39490');
    autoIndentable = function () {
        __$coverCall('js/Jencil.0.1.2.js', '37845:37859');
        var autoIndent;
        __$coverCall('js/Jencil.0.1.2.js', '37865:38493');
        autoIndent = function (e) {
            __$coverCall('js/Jencil.0.1.2.js', '37898:37935');
            var indent, insert, line, _ref, _ref1;
            __$coverCall('js/Jencil.0.1.2.js', '37943:37987');
            if (e.which !== 13) {
                __$coverCall('js/Jencil.0.1.2.js', '37973:37979');
                return;
            }
            __$coverCall('js/Jencil.0.1.2.js', '37995:38023');
            line = this.selection.line();
            __$coverCall('js/Jencil.0.1.2.js', '38031:38115');
            if ((_ref = this.autoIndent.pre) != null) {
                __$coverCall('js/Jencil.0.1.2.js', '38083:38107');
                _ref.call(this, e, line);
            }
            __$coverCall('js/Jencil.0.1.2.js', '38123:38167');
            indent = line.replace(/^([\t\s]*).*$/, '$1');
            __$coverCall('js/Jencil.0.1.2.js', '38175:38197');
            insert = '\n' + indent;
            __$coverCall('js/Jencil.0.1.2.js', '38205:38246');
            this.selection.insertAfter(insert, false);
            __$coverCall('js/Jencil.0.1.2.js', '38254:38357');
            if ((_ref1 = this.autoIndent.post) != null) {
                __$coverCall('js/Jencil.0.1.2.js', '38308:38349');
                _ref1.call(this, e, line, indent, insert);
            }
            __$coverCall('js/Jencil.0.1.2.js', '38365:38384');
            e.stopPropagation();
            __$coverCall('js/Jencil.0.1.2.js', '38392:38420');
            e.stopImmediatePropagation();
            __$coverCall('js/Jencil.0.1.2.js', '38428:38446');
            e.preventDefault();
            __$coverCall('js/Jencil.0.1.2.js', '38454:38466');
            this.focus();
            __$coverCall('js/Jencil.0.1.2.js', '38474:38486');
            return false;
        };
        __$coverCall('js/Jencil.0.1.2.js', '38499:39482');
        return function (textarea, pre, post) {
            __$coverCall('js/Jencil.0.1.2.js', '38544:38619');
            if (!(textarea instanceof jQuery)) {
                __$coverCall('js/Jencil.0.1.2.js', '38589:38611');
                textarea = $(textarea);
            }
            __$coverCall('js/Jencil.0.1.2.js', '38627:38741');
            if (!(textarea.selection != null)) {
                __$coverCall('js/Jencil.0.1.2.js', '38672:38733');
                textarea.selection = new Selection(document, textarea.get(0));
            }
            __$coverCall('js/Jencil.0.1.2.js', '38749:38837');
            textarea.autoIndent = function (e) {
                __$coverCall('js/Jencil.0.1.2.js', '38793:38828');
                return autoIndent.call(textarea, e);
            };
            __$coverCall('js/Jencil.0.1.2.js', '38845:38972');
            textarea.autoIndent.enable = function () {
                __$coverCall('js/Jencil.0.1.2.js', '38895:38938');
                textarea.on('keydown', textarea.autoIndent);
                __$coverCall('js/Jencil.0.1.2.js', '38948:38963');
                return textarea;
            };
            __$coverCall('js/Jencil.0.1.2.js', '38980:39109');
            textarea.autoIndent.disable = function () {
                __$coverCall('js/Jencil.0.1.2.js', '39031:39075');
                textarea.off('keydown', textarea.autoIndent);
                __$coverCall('js/Jencil.0.1.2.js', '39085:39100');
                return textarea;
            };
            __$coverCall('js/Jencil.0.1.2.js', '39117:39253');
            if (pre != null) {
                __$coverCall('js/Jencil.0.1.2.js', '39144:39245');
                textarea.autoIndent.pre = function (e, line) {
                    __$coverCall('js/Jencil.0.1.2.js', '39200:39234');
                    return pre.call(textarea, e, line);
                };
            }
            __$coverCall('js/Jencil.0.1.2.js', '39261:39432');
            if (post != null) {
                __$coverCall('js/Jencil.0.1.2.js', '39289:39424');
                textarea.autoIndent.post = function (e, line, indent, insert) {
                    __$coverCall('js/Jencil.0.1.2.js', '39362:39413');
                    return post.call(textarea, e, line, indent, insert);
                };
            }
            __$coverCall('js/Jencil.0.1.2.js', '39440:39475');
            return textarea.autoIndent.enable();
        };
    }();
    __$coverCall('js/Jencil.0.1.2.js', '39495:39694');
    if (window.i18n != null) {
        __$coverCall('js/Jencil.0.1.2.js', '39526:39622');
        translate = function (key) {
            __$coverCall('js/Jencil.0.1.2.js', '39560:39615');
            return i18n.t(key, { defaultValue: key });
        };
    } else {
        __$coverCall('js/Jencil.0.1.2.js', '39639:39690');
        translate = function (key) {
            __$coverCall('js/Jencil.0.1.2.js', '39673:39683');
            return key;
        };
    }
    __$coverCall('js/Jencil.0.1.2.js', '39699:39916');
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
    __$coverCall('js/Jencil.0.1.2.js', '39921:41358');
    this.Jencil = function () {
        __$coverCall('js/Jencil.0.1.2.js', '39954:40975');
        function Jencil(textarea, options) {
            __$coverCall('js/Jencil.0.1.2.js', '39997:40013');
            var _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '40021:40513');
            this.options = jQuery.extend({
                'profile': 'Html',
                'profiles': { 'Html': Jencil.profiles.HtmlProfile },
                'resizable': true,
                'enableTabIndent': true,
                'enableAutoIndent': true,
                'tabString': '    ',
                'defaultVolume': null,
                'defaultVolume2': null,
                'width': 640,
                'height': 620,
                'editorTemplatePath': null,
                'viewerTemplatePath': null,
                'helperTemplatePath': null
            }, options);
            __$coverCall('js/Jencil.0.1.2.js', '40521:40551');
            this.element = textarea.hide();
            __$coverCall('js/Jencil.0.1.2.js', '40559:40591');
            this.caretaker = new Caretaker();
            __$coverCall('js/Jencil.0.1.2.js', '40599:40678');
            this.caretaker.originator = function () {
                __$coverCall('js/Jencil.0.1.2.js', '40648:40669');
                return _this.editor();
            };
            __$coverCall('js/Jencil.0.1.2.js', '40686:40759');
            this.wrapper = new Wrapper(this, this.options.width, this.options.height);
            __$coverCall('js/Jencil.0.1.2.js', '40767:40805');
            this.fullscreen = new Fullscreen(this);
            __$coverCall('js/Jencil.0.1.2.js', '40813:40884');
            this.element.after(this.wrapper.element).after(this.fullscreen.element);
            __$coverCall('js/Jencil.0.1.2.js', '40892:40911');
            this.wrapper.init();
            __$coverCall('js/Jencil.0.1.2.js', '40919:40940');
            this.wrapper.adjust();
            __$coverCall('js/Jencil.0.1.2.js', '40948:40969');
            this.caretaker.save();
        }
        __$coverCall('js/Jencil.0.1.2.js', '40982:41093');
        Jencil.prototype.editor = function () {
            __$coverCall('js/Jencil.0.1.2.js', '41027:41086');
            return this.wrapper.workspace.mainPanel.editorPanel || null;
        };
        __$coverCall('js/Jencil.0.1.2.js', '41100:41211');
        Jencil.prototype.viewer = function () {
            __$coverCall('js/Jencil.0.1.2.js', '41145:41204');
            return this.wrapper.workspace.mainPanel.viewerPanel || null;
        };
        __$coverCall('js/Jencil.0.1.2.js', '41218:41329');
        Jencil.prototype.helper = function () {
            __$coverCall('js/Jencil.0.1.2.js', '41263:41322');
            return this.wrapper.workspace.mainPanel.helperPanel || null;
        };
        __$coverCall('js/Jencil.0.1.2.js', '41336:41349');
        return Jencil;
    }();
    __$coverCall('js/Jencil.0.1.2.js', '41363:41441');
    $.fn.jencil = function (options) {
        __$coverCall('js/Jencil.0.1.2.js', '41401:41436');
        return new Jencil($(this), options);
    };
    __$coverCall('js/Jencil.0.1.2.js', '41446:41551');
    namespace('Jencil.profiles', function (exports) {
        __$coverCall('js/Jencil.0.1.2.js', '41499:41545');
        return exports.DefaultProfile = DefaultProfile;
    });
    __$coverCall('js/Jencil.0.1.2.js', '41556:41648');
    namespace('Jencil.utils', function (exports) {
        __$coverCall('js/Jencil.0.1.2.js', '41606:41642');
        return exports.namespace = namespace;
    });
    __$coverCall('js/Jencil.0.1.2.js', '41653:41731');
    namespace('Jencil', function (exports) {
        __$coverCall('js/Jencil.0.1.2.js', '41697:41725');
        return exports.t = translate;
    });
    __$coverCall('js/Jencil.0.1.2.js', '41736:42253');
    Widget = function () {
        __$coverCall('js/Jencil.0.1.2.js', '41764:42086');
        function Widget(core, selector, context) {
            __$coverCall('js/Jencil.0.1.2.js', '41813:41829');
            this.core = core;
            __$coverCall('js/Jencil.0.1.2.js', '41837:41895');
            if (selector == null) {
                __$coverCall('js/Jencil.0.1.2.js', '41869:41887');
                selector = '<div>';
            }
            __$coverCall('js/Jencil.0.1.2.js', '41903:42036');
            if (selector instanceof jQuery) {
                __$coverCall('js/Jencil.0.1.2.js', '41945:41968');
                this.element = selector;
            } else {
                __$coverCall('js/Jencil.0.1.2.js', '41993:42028');
                this.element = $(selector, context);
            }
            __$coverCall('js/Jencil.0.1.2.js', '42044:42080');
            this.element = evolute(this.element);
        }
        __$coverCall('js/Jencil.0.1.2.js', '42093:42154');
        Widget.prototype.init = function () {
            __$coverCall('js/Jencil.0.1.2.js', '42136:42147');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '42161:42224');
        Widget.prototype.adjust = function () {
            __$coverCall('js/Jencil.0.1.2.js', '42206:42217');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '42231:42244');
        return Widget;
    }();
    __$coverCall('js/Jencil.0.1.2.js', '42258:42577');
    Panel = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '42291:42315');
        __extends(Panel, _super);
        __$coverCall('js/Jencil.0.1.2.js', '42322:42543');
        function Panel(core, selector, context) {
            __$coverCall('js/Jencil.0.1.2.js', '42370:42428');
            if (selector == null) {
                __$coverCall('js/Jencil.0.1.2.js', '42402:42420');
                selector = '<div>';
            }
            __$coverCall('js/Jencil.0.1.2.js', '42436:42499');
            Panel.__super__.constructor.call(this, core, selector, context);
            __$coverCall('js/Jencil.0.1.2.js', '42507:42537');
            this.element.addClass('panel');
        }
        __$coverCall('js/Jencil.0.1.2.js', '42550:42562');
        return Panel;
    }(Widget);
    __$coverCall('js/Jencil.0.1.2.js', '42582:45054');
    MultiplePanel = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '42623:42655');
        __extends(MultiplePanel, _super);
        __$coverCall('js/Jencil.0.1.2.js', '42662:43834');
        function MultiplePanel(core, fst, snd, splitter) {
            __$coverCall('js/Jencil.0.1.2.js', '42719:42755');
            var hide, show, _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '42763:42777');
            this.fst = fst;
            __$coverCall('js/Jencil.0.1.2.js', '42785:42799');
            this.snd = snd;
            __$coverCall('js/Jencil.0.1.2.js', '42807:42831');
            this.splitter = splitter;
            __$coverCall('js/Jencil.0.1.2.js', '42839:42891');
            MultiplePanel.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.0.1.2.js', '42899:42932');
            this.element.addClass('multiple');
            __$coverCall('js/Jencil.0.1.2.js', '42940:42977');
            this.element.append(this.fst.element);
            __$coverCall('js/Jencil.0.1.2.js', '42985:43027');
            this.element.append(this.splitter.element);
            __$coverCall('js/Jencil.0.1.2.js', '43035:43072');
            this.element.append(this.snd.element);
            __$coverCall('js/Jencil.0.1.2.js', '43080:43215');
            show = function (callback) {
                __$coverCall('js/Jencil.0.1.2.js', '43116:43206');
                if (!this.element.is(':visible')) {
                    __$coverCall('js/Jencil.0.1.2.js', '43162:43196');
                    return this.toggle(callback, null);
                }
            };
            __$coverCall('js/Jencil.0.1.2.js', '43223:43357');
            hide = function (callback) {
                __$coverCall('js/Jencil.0.1.2.js', '43259:43348');
                if (this.element.is(':visible')) {
                    __$coverCall('js/Jencil.0.1.2.js', '43304:43338');
                    return this.toggle(null, callback);
                }
            };
            __$coverCall('js/Jencil.0.1.2.js', '43365:43489');
            this.fst.toggle = function (callbackOn, callbackOff) {
                __$coverCall('js/Jencil.0.1.2.js', '43427:43480');
                return _this._togglePanel(0, callbackOn, callbackOff);
            };
            __$coverCall('js/Jencil.0.1.2.js', '43497:43517');
            this.fst.show = show;
            __$coverCall('js/Jencil.0.1.2.js', '43525:43545');
            this.fst.hide = hide;
            __$coverCall('js/Jencil.0.1.2.js', '43553:43677');
            this.snd.toggle = function (callbackOn, callbackOff) {
                __$coverCall('js/Jencil.0.1.2.js', '43615:43668');
                return _this._togglePanel(1, callbackOn, callbackOff);
            };
            __$coverCall('js/Jencil.0.1.2.js', '43685:43705');
            this.snd.show = show;
            __$coverCall('js/Jencil.0.1.2.js', '43713:43733');
            this.snd.hide = hide;
            __$coverCall('js/Jencil.0.1.2.js', '43741:43828');
            this.splitter.element.dblclick(function () {
                __$coverCall('js/Jencil.0.1.2.js', '43793:43818');
                return _this.snd.toggle();
            });
        }
        __$coverCall('js/Jencil.0.1.2.js', '43841:43971');
        MultiplePanel.prototype.init = function () {
            __$coverCall('js/Jencil.0.1.2.js', '43891:43911');
            this.splitter.init();
            __$coverCall('js/Jencil.0.1.2.js', '43919:43934');
            this.fst.init();
            __$coverCall('js/Jencil.0.1.2.js', '43942:43964');
            return this.snd.init();
        };
        __$coverCall('js/Jencil.0.1.2.js', '43978:45013');
        MultiplePanel.prototype._togglePanel = function (to, callbackOn, callbackOff) {
            __$coverCall('js/Jencil.0.1.2.js', '44063:44129');
            var callbackDone, end, volume, _callbackDone, _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '44137:44182');
            if (this._animating) {
                __$coverCall('js/Jencil.0.1.2.js', '44168:44174');
                return;
            }
            __$coverCall('js/Jencil.0.1.2.js', '44190:44221');
            volume = this.splitter.volume();
            __$coverCall('js/Jencil.0.1.2.js', '44229:44248');
            callbackDone = null;
            __$coverCall('js/Jencil.0.1.2.js', '44256:44583');
            if (0 < volume && volume < 1) {
                __$coverCall('js/Jencil.0.1.2.js', '44298:44306');
                end = to;
                __$coverCall('js/Jencil.0.1.2.js', '44316:44354');
                this.splitter._previousVolume = volume;
                __$coverCall('js/Jencil.0.1.2.js', '44364:44391');
                _callbackDone = callbackOff;
            } else {
                __$coverCall('js/Jencil.0.1.2.js', '44416:44482');
                end = this.splitter._previousVolume || this.splitter.defaultVolume;
                __$coverCall('js/Jencil.0.1.2.js', '44492:44539');
                if (end === to) {
                    __$coverCall('js/Jencil.0.1.2.js', '44520:44529');
                    end = 0.5;
                }
                __$coverCall('js/Jencil.0.1.2.js', '44549:44575');
                _callbackDone = callbackOn;
            }
            __$coverCall('js/Jencil.0.1.2.js', '44591:44613');
            this._animating = true;
            __$coverCall('js/Jencil.0.1.2.js', '44621:44769');
            callbackDone = function () {
                __$coverCall('js/Jencil.0.1.2.js', '44657:44681');
                _this._animating = false;
                __$coverCall('js/Jencil.0.1.2.js', '44691:44760');
                return typeof _callbackDone === 'function' ? _callbackDone() : void 0;
            };
            __$coverCall('js/Jencil.0.1.2.js', '44777:45006');
            return animate({
                start: volume,
                end: end,
                duration: 500,
                callbackEach: function (value, epoch) {
                    __$coverCall('js/Jencil.0.1.2.js', '44915:44950');
                    return _this.splitter.volume(value);
                },
                callbackDone: callbackDone
            });
        };
        __$coverCall('js/Jencil.0.1.2.js', '45020:45040');
        return MultiplePanel;
    }(Panel);
    __$coverCall('js/Jencil.0.1.2.js', '45059:45838');
    VerticalPanel = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '45100:45132');
        __extends(VerticalPanel, _super);
        __$coverCall('js/Jencil.0.1.2.js', '45139:45482');
        function VerticalPanel(core, fst, snd, defaultVolume) {
            __$coverCall('js/Jencil.0.1.2.js', '45201:45213');
            var splitter;
            __$coverCall('js/Jencil.0.1.2.js', '45221:45285');
            if (defaultVolume == null) {
                __$coverCall('js/Jencil.0.1.2.js', '45258:45277');
                defaultVolume = 0.5;
            }
            __$coverCall('js/Jencil.0.1.2.js', '45293:45355');
            splitter = new VerticalSplitter(core, fst, snd, defaultVolume);
            __$coverCall('js/Jencil.0.1.2.js', '45363:45435');
            VerticalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
            __$coverCall('js/Jencil.0.1.2.js', '45443:45476');
            this.element.addClass('vertical');
        }
        __$coverCall('js/Jencil.0.1.2.js', '45489:45789');
        VerticalPanel.prototype.adjust = function () {
            __$coverCall('js/Jencil.0.1.2.js', '45541:45598');
            this.fst.element.outerHeight(true, this.element.height());
            __$coverCall('js/Jencil.0.1.2.js', '45606:45663');
            this.snd.element.outerHeight(true, this.element.height());
            __$coverCall('js/Jencil.0.1.2.js', '45671:45733');
            this.splitter.element.outerHeight(true, this.element.height());
            __$coverCall('js/Jencil.0.1.2.js', '45741:45763');
            this.splitter.adjust();
            __$coverCall('js/Jencil.0.1.2.js', '45771:45782');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '45796:45816');
        return VerticalPanel;
    }(MultiplePanel);
    __$coverCall('js/Jencil.0.1.2.js', '45843:46632');
    HorizontalPanel = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '45886:45920');
        __extends(HorizontalPanel, _super);
        __$coverCall('js/Jencil.0.1.2.js', '45927:46278');
        function HorizontalPanel(core, fst, snd, defaultVolume) {
            __$coverCall('js/Jencil.0.1.2.js', '45991:46003');
            var splitter;
            __$coverCall('js/Jencil.0.1.2.js', '46011:46075');
            if (defaultVolume == null) {
                __$coverCall('js/Jencil.0.1.2.js', '46048:46067');
                defaultVolume = 0.5;
            }
            __$coverCall('js/Jencil.0.1.2.js', '46083:46147');
            splitter = new HorizontalSplitter(core, fst, snd, defaultVolume);
            __$coverCall('js/Jencil.0.1.2.js', '46155:46229');
            HorizontalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
            __$coverCall('js/Jencil.0.1.2.js', '46237:46272');
            this.element.addClass('horizontal');
        }
        __$coverCall('js/Jencil.0.1.2.js', '46285:46581');
        HorizontalPanel.prototype.adjust = function () {
            __$coverCall('js/Jencil.0.1.2.js', '46339:46394');
            this.fst.element.outerWidth(true, this.element.width());
            __$coverCall('js/Jencil.0.1.2.js', '46402:46457');
            this.snd.element.outerWidth(true, this.element.width());
            __$coverCall('js/Jencil.0.1.2.js', '46465:46525');
            this.splitter.element.outerWidth(true, this.element.width());
            __$coverCall('js/Jencil.0.1.2.js', '46533:46555');
            this.splitter.adjust();
            __$coverCall('js/Jencil.0.1.2.js', '46563:46574');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '46588:46610');
        return HorizontalPanel;
    }(MultiplePanel);
    __$coverCall('js/Jencil.0.1.2.js', '46637:46728');
    namespace('Jencil.ui.widgets', function (exports) {
        __$coverCall('js/Jencil.0.1.2.js', '46692:46722');
        return exports.Widget = Widget;
    });
    __$coverCall('js/Jencil.0.1.2.js', '46733:46962');
    namespace('Jencil.ui.widgets.panels', function (exports) {
        __$coverCall('js/Jencil.0.1.2.js', '46795:46816');
        exports.Panel = Panel;
        __$coverCall('js/Jencil.0.1.2.js', '46822:46859');
        exports.MultiplePanel = MultiplePanel;
        __$coverCall('js/Jencil.0.1.2.js', '46865:46902');
        exports.VerticalPanel = VerticalPanel;
        __$coverCall('js/Jencil.0.1.2.js', '46908:46956');
        return exports.HorizontalPanel = HorizontalPanel;
    });
    __$coverCall('js/Jencil.0.1.2.js', '46967:50156');
    Splitter = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '47003:47030');
        __extends(Splitter, _super);
        __$coverCall('js/Jencil.0.1.2.js', '47037:49064');
        function Splitter(core, fst, snd, defaultVolume) {
            __$coverCall('js/Jencil.0.1.2.js', '47094:47138');
            var mousemove, mouseup, _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '47146:47160');
            this.fst = fst;
            __$coverCall('js/Jencil.0.1.2.js', '47168:47182');
            this.snd = snd;
            __$coverCall('js/Jencil.0.1.2.js', '47190:47254');
            this.defaultVolume = defaultVolume != null ? defaultVolume : 0.5;
            __$coverCall('js/Jencil.0.1.2.js', '47262:47309');
            Splitter.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.0.1.2.js', '47317:47350');
            this.element.addClass('splitter');
            __$coverCall('js/Jencil.0.1.2.js', '47358:47391');
            this._volume = this.defaultVolume;
            __$coverCall('js/Jencil.0.1.2.js', '47399:47894');
            mousemove = function (e) {
                __$coverCall('js/Jencil.0.1.2.js', '47433:47448');
                var _ref, _ref1;
                __$coverCall('js/Jencil.0.1.2.js', '47458:47476');
                _this.mousemove(e);
                __$coverCall('js/Jencil.0.1.2.js', '47486:47628');
                if ((_ref = _this.fst.curtain) != null) {
                    __$coverCall('js/Jencil.0.1.2.js', '47538:47618');
                    if (typeof _ref.refresh === 'function') {
                        __$coverCall('js/Jencil.0.1.2.js', '47592:47606');
                        _ref.refresh();
                    }
                }
                __$coverCall('js/Jencil.0.1.2.js', '47638:47783');
                if ((_ref1 = _this.snd.curtain) != null) {
                    __$coverCall('js/Jencil.0.1.2.js', '47691:47773');
                    if (typeof _ref1.refresh === 'function') {
                        __$coverCall('js/Jencil.0.1.2.js', '47746:47761');
                        _ref1.refresh();
                    }
                }
                __$coverCall('js/Jencil.0.1.2.js', '47793:47812');
                e.stopPropagation();
                __$coverCall('js/Jencil.0.1.2.js', '47822:47850');
                e.stopImmediatePropagation();
                __$coverCall('js/Jencil.0.1.2.js', '47860:47885');
                return e.preventDefault();
            };
            __$coverCall('js/Jencil.0.1.2.js', '47902:48481');
            mouseup = function (e) {
                __$coverCall('js/Jencil.0.1.2.js', '47934:47958');
                var $window, _ref, _ref1;
                __$coverCall('js/Jencil.0.1.2.js', '47968:47987');
                $window = $(window);
                __$coverCall('js/Jencil.0.1.2.js', '47997:48035');
                $window.unbind('mousemove', mousemove);
                __$coverCall('js/Jencil.0.1.2.js', '48045:48079');
                $window.unbind('mouseup', mouseup);
                __$coverCall('js/Jencil.0.1.2.js', '48089:48223');
                if ((_ref = _this.fst.curtain) != null) {
                    __$coverCall('js/Jencil.0.1.2.js', '48141:48213');
                    if (typeof _ref.off === 'function') {
                        __$coverCall('js/Jencil.0.1.2.js', '48191:48201');
                        _ref.off();
                    }
                }
                __$coverCall('js/Jencil.0.1.2.js', '48233:48370');
                if ((_ref1 = _this.snd.curtain) != null) {
                    __$coverCall('js/Jencil.0.1.2.js', '48286:48360');
                    if (typeof _ref1.off === 'function') {
                        __$coverCall('js/Jencil.0.1.2.js', '48337:48348');
                        _ref1.off();
                    }
                }
                __$coverCall('js/Jencil.0.1.2.js', '48380:48399');
                e.stopPropagation();
                __$coverCall('js/Jencil.0.1.2.js', '48409:48437');
                e.stopImmediatePropagation();
                __$coverCall('js/Jencil.0.1.2.js', '48447:48472');
                return e.preventDefault();
            };
            __$coverCall('js/Jencil.0.1.2.js', '48489:49058');
            this.element.mousedown(function (e) {
                __$coverCall('js/Jencil.0.1.2.js', '48534:48558');
                var $window, _ref, _ref1;
                __$coverCall('js/Jencil.0.1.2.js', '48568:48587');
                $window = $(window);
                __$coverCall('js/Jencil.0.1.2.js', '48597:48625');
                $window.mousemove(mousemove);
                __$coverCall('js/Jencil.0.1.2.js', '48635:48659');
                $window.mouseup(mouseup);
                __$coverCall('js/Jencil.0.1.2.js', '48669:48801');
                if ((_ref = _this.fst.curtain) != null) {
                    __$coverCall('js/Jencil.0.1.2.js', '48721:48791');
                    if (typeof _ref.on === 'function') {
                        __$coverCall('js/Jencil.0.1.2.js', '48770:48779');
                        _ref.on();
                    }
                }
                __$coverCall('js/Jencil.0.1.2.js', '48811:48946');
                if ((_ref1 = _this.snd.curtain) != null) {
                    __$coverCall('js/Jencil.0.1.2.js', '48864:48936');
                    if (typeof _ref1.on === 'function') {
                        __$coverCall('js/Jencil.0.1.2.js', '48914:48924');
                        _ref1.on();
                    }
                }
                __$coverCall('js/Jencil.0.1.2.js', '48956:48975');
                e.stopPropagation();
                __$coverCall('js/Jencil.0.1.2.js', '48985:49013');
                e.stopImmediatePropagation();
                __$coverCall('js/Jencil.0.1.2.js', '49023:49048');
                return e.preventDefault();
            });
        }
        __$coverCall('js/Jencil.0.1.2.js', '49071:49177');
        Splitter.prototype.init = function () {
            __$coverCall('js/Jencil.0.1.2.js', '49116:49170');
            return this.container = evolute(this.element.parent());
        };
        __$coverCall('js/Jencil.0.1.2.js', '49184:49466');
        Splitter.prototype.volume = function (value, skip) {
            __$coverCall('js/Jencil.0.1.2.js', '49242:49290');
            if (skip == null) {
                __$coverCall('js/Jencil.0.1.2.js', '49270:49282');
                skip = false;
            }
            __$coverCall('js/Jencil.0.1.2.js', '49298:49432');
            if (value != null) {
                __$coverCall('js/Jencil.0.1.2.js', '49327:49347');
                this._volume = value;
                __$coverCall('js/Jencil.0.1.2.js', '49357:49403');
                if (!skip) {
                    __$coverCall('js/Jencil.0.1.2.js', '49380:49393');
                    this.adjust();
                }
                __$coverCall('js/Jencil.0.1.2.js', '49413:49424');
                return this;
            }
            __$coverCall('js/Jencil.0.1.2.js', '49440:49459');
            return this._volume;
        };
        __$coverCall('js/Jencil.0.1.2.js', '49473:49808');
        Splitter.prototype.value = function (value, skip) {
            __$coverCall('js/Jencil.0.1.2.js', '49530:49552');
            var valueWidth, volume;
            __$coverCall('js/Jencil.0.1.2.js', '49560:49608');
            if (skip == null) {
                __$coverCall('js/Jencil.0.1.2.js', '49588:49600');
                skip = false;
            }
            __$coverCall('js/Jencil.0.1.2.js', '49616:49646');
            valueWidth = this.valueWidth();
            __$coverCall('js/Jencil.0.1.2.js', '49654:49760');
            if (value != null) {
                __$coverCall('js/Jencil.0.1.2.js', '49683:49710');
                volume = value / valueWidth;
                __$coverCall('js/Jencil.0.1.2.js', '49720:49752');
                return this.volume(volume, skip);
            }
            __$coverCall('js/Jencil.0.1.2.js', '49768:49801');
            return this.volume() * valueWidth;
        };
        __$coverCall('js/Jencil.0.1.2.js', '49815:50119');
        Splitter.prototype.regulateValue = function (value) {
            __$coverCall('js/Jencil.0.1.2.js', '49874:49896');
            var maxValue, minValue;
            __$coverCall('js/Jencil.0.1.2.js', '49904:49930');
            minValue = this.minValue();
            __$coverCall('js/Jencil.0.1.2.js', '49938:49964');
            maxValue = this.maxValue();
            __$coverCall('js/Jencil.0.1.2.js', '49972:50028');
            if (value < minValue) {
                __$coverCall('js/Jencil.0.1.2.js', '50004:50020');
                value = minValue;
            }
            __$coverCall('js/Jencil.0.1.2.js', '50036:50092');
            if (value > maxValue) {
                __$coverCall('js/Jencil.0.1.2.js', '50068:50084');
                value = maxValue;
            }
            __$coverCall('js/Jencil.0.1.2.js', '50100:50112');
            return value;
        };
        __$coverCall('js/Jencil.0.1.2.js', '50126:50141');
        return Splitter;
    }(Widget);
    __$coverCall('js/Jencil.0.1.2.js', '50161:53538');
    VerticalSplitter = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '50205:50240');
        __extends(VerticalSplitter, _super);
        __$coverCall('js/Jencil.0.1.2.js', '50247:50869');
        function VerticalSplitter(core, fst, snd, defaultVolume) {
            __$coverCall('js/Jencil.0.1.2.js', '50312:50327');
            var _ref, _ref1;
            __$coverCall('js/Jencil.0.1.2.js', '50335:50415');
            VerticalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);
            __$coverCall('js/Jencil.0.1.2.js', '50423:50456');
            this.element.addClass('vertical');
            __$coverCall('js/Jencil.0.1.2.js', '50464:50497');
            this.fst.element.addClass('left');
            __$coverCall('js/Jencil.0.1.2.js', '50505:50539');
            this.snd.element.addClass('right');
            __$coverCall('js/Jencil.0.1.2.js', '50547:50602');
            this.fst.element.css({ 'float': 'left' });
            __$coverCall('js/Jencil.0.1.2.js', '50610:50665');
            this.snd.element.css({ 'float': 'left' });
            __$coverCall('js/Jencil.0.1.2.js', '50673:50763');
            if ((_ref = this.fst.curtain) != null) {
                __$coverCall('js/Jencil.0.1.2.js', '50722:50755');
                _ref.css('pointer', 'col-resize');
            }
            __$coverCall('js/Jencil.0.1.2.js', '50771:50863');
            if ((_ref1 = this.snd.curtain) != null) {
                __$coverCall('js/Jencil.0.1.2.js', '50821:50855');
                _ref1.css('pointer', 'col-resize');
            }
        }
        __$coverCall('js/Jencil.0.1.2.js', '50876:51139');
        VerticalSplitter.prototype.mousemove = function (e) {
            __$coverCall('js/Jencil.0.1.2.js', '50935:50952');
            var offset, value;
            __$coverCall('js/Jencil.0.1.2.js', '50960:51027');
            offset = this.container.absoluteX() + this.container.contentX(true);
            __$coverCall('js/Jencil.0.1.2.js', '51035:51059');
            value = e.pageX - offset;
            __$coverCall('js/Jencil.0.1.2.js', '51067:51100');
            value = this.regulateValue(value);
            __$coverCall('js/Jencil.0.1.2.js', '51108:51132');
            return this.value(value);
        };
        __$coverCall('js/Jencil.0.1.2.js', '51146:51241');
        VerticalSplitter.prototype.valueWidth = function () {
            __$coverCall('js/Jencil.0.1.2.js', '51205:51234');
            return this.container.width();
        };
        __$coverCall('js/Jencil.0.1.2.js', '51248:51656');
        VerticalSplitter.prototype.minValue = function () {
            __$coverCall('js/Jencil.0.1.2.js', '51305:51315');
            var m1, m2;
            __$coverCall('js/Jencil.0.1.2.js', '51323:51392');
            m1 = this.fst.element.minWidth() + this.fst.element.nonContentWidth();
            __$coverCall('js/Jencil.0.1.2.js', '51400:51469');
            m2 = this.snd.element.maxWidth() + this.snd.element.nonContentWidth();
            __$coverCall('js/Jencil.0.1.2.js', '51477:51538');
            if (m2 != null) {
                __$coverCall('js/Jencil.0.1.2.js', '51503:51530');
                m2 = this.valueWidth() - m2;
            }
            __$coverCall('js/Jencil.0.1.2.js', '51546:51621');
            if (m1 != null && m2 != null) {
                __$coverCall('js/Jencil.0.1.2.js', '51590:51613');
                return Math.min(m1, m2);
            }
            __$coverCall('js/Jencil.0.1.2.js', '51629:51649');
            return m1 || m2 || 0;
        };
        __$coverCall('js/Jencil.0.1.2.js', '51663:52123');
        VerticalSplitter.prototype.maxValue = function () {
            __$coverCall('js/Jencil.0.1.2.js', '51720:51742');
            var m1, m2, valueWidth;
            __$coverCall('js/Jencil.0.1.2.js', '51750:51780');
            valueWidth = this.valueWidth();
            __$coverCall('js/Jencil.0.1.2.js', '51788:51857');
            m1 = this.fst.element.maxWidth() + this.fst.element.nonContentWidth();
            __$coverCall('js/Jencil.0.1.2.js', '51865:51934');
            m2 = this.snd.element.minWidth() + this.snd.element.nonContentWidth();
            __$coverCall('js/Jencil.0.1.2.js', '51942:51996');
            if (m2 != null) {
                __$coverCall('js/Jencil.0.1.2.js', '51968:51988');
                m2 = valueWidth - m2;
            }
            __$coverCall('js/Jencil.0.1.2.js', '52004:52079');
            if (m1 != null && m2 != null) {
                __$coverCall('js/Jencil.0.1.2.js', '52048:52071');
                return Math.max(m1, m2);
            }
            __$coverCall('js/Jencil.0.1.2.js', '52087:52116');
            return m1 || m2 || valueWidth;
        };
        __$coverCall('js/Jencil.0.1.2.js', '52130:53491');
        VerticalSplitter.prototype.adjust = function () {
            __$coverCall('js/Jencil.0.1.2.js', '52185:52226');
            var fstValue, sndValue, value, valueWidth;
            __$coverCall('js/Jencil.0.1.2.js', '52234:52254');
            value = this.value();
            __$coverCall('js/Jencil.0.1.2.js', '52262:52292');
            valueWidth = this.valueWidth();
            __$coverCall('js/Jencil.0.1.2.js', '52300:52357');
            fstValue = value - this.fst.element.nonContentWidth(true);
            __$coverCall('js/Jencil.0.1.2.js', '52365:52437');
            sndValue = valueWidth - value - this.snd.element.nonContentWidth(true);
            __$coverCall('js/Jencil.0.1.2.js', '52445:53346');
            if (fstValue <= 0) {
                __$coverCall('js/Jencil.0.1.2.js', '52474:52556');
                if (this.fst.element.is(':visible')) {
                    __$coverCall('js/Jencil.0.1.2.js', '52523:52546');
                    this.fst.element.hide();
                }
                __$coverCall('js/Jencil.0.1.2.js', '52566:52649');
                if (!this.snd.element.is(':visible')) {
                    __$coverCall('js/Jencil.0.1.2.js', '52616:52639');
                    this.snd.element.show();
                }
                __$coverCall('js/Jencil.0.1.2.js', '52659:52704');
                this.snd.element.outerWidth(true, valueWidth);
                __$coverCall('js/Jencil.0.1.2.js', '52714:52737');
                this._value = value = 0;
            } else if (sndValue <= 0) {
                __$coverCall('js/Jencil.0.1.2.js', '52781:52864');
                if (!this.fst.element.is(':visible')) {
                    __$coverCall('js/Jencil.0.1.2.js', '52831:52854');
                    this.fst.element.show();
                }
                __$coverCall('js/Jencil.0.1.2.js', '52874:52956');
                if (this.snd.element.is(':visible')) {
                    __$coverCall('js/Jencil.0.1.2.js', '52923:52946');
                    this.snd.element.hide();
                }
                __$coverCall('js/Jencil.0.1.2.js', '52966:53011');
                this.fst.element.outerWidth(true, valueWidth);
                __$coverCall('js/Jencil.0.1.2.js', '53021:53053');
                this._value = value = valueWidth;
            } else {
                __$coverCall('js/Jencil.0.1.2.js', '53078:53161');
                if (!this.fst.element.is(':visible')) {
                    __$coverCall('js/Jencil.0.1.2.js', '53128:53151');
                    this.fst.element.show();
                }
                __$coverCall('js/Jencil.0.1.2.js', '53171:53254');
                if (!this.snd.element.is(':visible')) {
                    __$coverCall('js/Jencil.0.1.2.js', '53221:53244');
                    this.snd.element.show();
                }
                __$coverCall('js/Jencil.0.1.2.js', '53264:53296');
                this.fst.element.width(fstValue);
                __$coverCall('js/Jencil.0.1.2.js', '53306:53338');
                this.snd.element.width(sndValue);
            }
            __$coverCall('js/Jencil.0.1.2.js', '53354:53371');
            this.fst.adjust();
            __$coverCall('js/Jencil.0.1.2.js', '53379:53396');
            this.snd.adjust();
            __$coverCall('js/Jencil.0.1.2.js', '53404:53465');
            this.element.relativeX(value - this.element.outerWidth() / 2);
            __$coverCall('js/Jencil.0.1.2.js', '53473:53484');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '53498:53521');
        return VerticalSplitter;
    }(Splitter);
    __$coverCall('js/Jencil.0.1.2.js', '53543:56832');
    HorizontalSplitter = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '53589:53626');
        __extends(HorizontalSplitter, _super);
        __$coverCall('js/Jencil.0.1.2.js', '53633:54135');
        function HorizontalSplitter(core, fst, snd, defaultVolume) {
            __$coverCall('js/Jencil.0.1.2.js', '53700:53715');
            var _ref, _ref1;
            __$coverCall('js/Jencil.0.1.2.js', '53723:53805');
            HorizontalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);
            __$coverCall('js/Jencil.0.1.2.js', '53813:53848');
            this.element.addClass('horizontal');
            __$coverCall('js/Jencil.0.1.2.js', '53856:53888');
            this.fst.element.addClass('top');
            __$coverCall('js/Jencil.0.1.2.js', '53896:53931');
            this.snd.element.addClass('bottom');
            __$coverCall('js/Jencil.0.1.2.js', '53939:54029');
            if ((_ref = this.fst.curtain) != null) {
                __$coverCall('js/Jencil.0.1.2.js', '53988:54021');
                _ref.css('pointer', 'raw-resize');
            }
            __$coverCall('js/Jencil.0.1.2.js', '54037:54129');
            if ((_ref1 = this.snd.curtain) != null) {
                __$coverCall('js/Jencil.0.1.2.js', '54087:54121');
                _ref1.css('pointer', 'raw-resize');
            }
        }
        __$coverCall('js/Jencil.0.1.2.js', '54142:54407');
        HorizontalSplitter.prototype.mousemove = function (e) {
            __$coverCall('js/Jencil.0.1.2.js', '54203:54220');
            var offset, value;
            __$coverCall('js/Jencil.0.1.2.js', '54228:54295');
            offset = this.container.absoluteY() + this.container.contentY(true);
            __$coverCall('js/Jencil.0.1.2.js', '54303:54327');
            value = e.pageY - offset;
            __$coverCall('js/Jencil.0.1.2.js', '54335:54368');
            value = this.regulateValue(value);
            __$coverCall('js/Jencil.0.1.2.js', '54376:54400');
            return this.value(value);
        };
        __$coverCall('js/Jencil.0.1.2.js', '54414:54512');
        HorizontalSplitter.prototype.valueWidth = function () {
            __$coverCall('js/Jencil.0.1.2.js', '54475:54505');
            return this.container.height();
        };
        __$coverCall('js/Jencil.0.1.2.js', '54519:54933');
        HorizontalSplitter.prototype.minValue = function () {
            __$coverCall('js/Jencil.0.1.2.js', '54578:54588');
            var m1, m2;
            __$coverCall('js/Jencil.0.1.2.js', '54596:54667');
            m1 = this.fst.element.minHeight() + this.fst.element.nonContentHeight();
            __$coverCall('js/Jencil.0.1.2.js', '54675:54746');
            m2 = this.snd.element.maxHeight() + this.snd.element.nonContentHeight();
            __$coverCall('js/Jencil.0.1.2.js', '54754:54815');
            if (m2 != null) {
                __$coverCall('js/Jencil.0.1.2.js', '54780:54807');
                m2 = this.valueWidth() - m2;
            }
            __$coverCall('js/Jencil.0.1.2.js', '54823:54898');
            if (m1 != null && m2 != null) {
                __$coverCall('js/Jencil.0.1.2.js', '54867:54890');
                return Math.min(m1, m2);
            }
            __$coverCall('js/Jencil.0.1.2.js', '54906:54926');
            return m1 || m2 || 0;
        };
        __$coverCall('js/Jencil.0.1.2.js', '54940:55406');
        HorizontalSplitter.prototype.maxValue = function () {
            __$coverCall('js/Jencil.0.1.2.js', '54999:55021');
            var m1, m2, valueWidth;
            __$coverCall('js/Jencil.0.1.2.js', '55029:55059');
            valueWidth = this.valueWidth();
            __$coverCall('js/Jencil.0.1.2.js', '55067:55138');
            m1 = this.fst.element.maxHeight() + this.fst.element.nonContentHeight();
            __$coverCall('js/Jencil.0.1.2.js', '55146:55217');
            m2 = this.snd.element.minHeight() + this.snd.element.nonContentHeight();
            __$coverCall('js/Jencil.0.1.2.js', '55225:55279');
            if (m2 != null) {
                __$coverCall('js/Jencil.0.1.2.js', '55251:55271');
                m2 = valueWidth - m2;
            }
            __$coverCall('js/Jencil.0.1.2.js', '55287:55362');
            if (m1 != null && m2 != null) {
                __$coverCall('js/Jencil.0.1.2.js', '55331:55354');
                return Math.max(m1, m2);
            }
            __$coverCall('js/Jencil.0.1.2.js', '55370:55399');
            return m1 || m2 || valueWidth;
        };
        __$coverCall('js/Jencil.0.1.2.js', '55413:56783');
        HorizontalSplitter.prototype.adjust = function () {
            __$coverCall('js/Jencil.0.1.2.js', '55470:55511');
            var fstValue, sndValue, value, valueWidth;
            __$coverCall('js/Jencil.0.1.2.js', '55519:55539');
            value = this.value();
            __$coverCall('js/Jencil.0.1.2.js', '55547:55577');
            valueWidth = this.valueWidth();
            __$coverCall('js/Jencil.0.1.2.js', '55585:55643');
            fstValue = value - this.fst.element.nonContentHeight(true);
            __$coverCall('js/Jencil.0.1.2.js', '55651:55724');
            sndValue = valueWidth - value - this.snd.element.nonContentHeight(true);
            __$coverCall('js/Jencil.0.1.2.js', '55732:56637');
            if (fstValue <= 0) {
                __$coverCall('js/Jencil.0.1.2.js', '55761:55843');
                if (this.fst.element.is(':visible')) {
                    __$coverCall('js/Jencil.0.1.2.js', '55810:55833');
                    this.fst.element.hide();
                }
                __$coverCall('js/Jencil.0.1.2.js', '55853:55936');
                if (!this.snd.element.is(':visible')) {
                    __$coverCall('js/Jencil.0.1.2.js', '55903:55926');
                    this.snd.element.show();
                }
                __$coverCall('js/Jencil.0.1.2.js', '55946:55992');
                this.snd.element.outerHeight(true, valueWidth);
                __$coverCall('js/Jencil.0.1.2.js', '56002:56025');
                this._value = value = 0;
            } else if (sndValue <= 0) {
                __$coverCall('js/Jencil.0.1.2.js', '56069:56152');
                if (!this.fst.element.is(':visible')) {
                    __$coverCall('js/Jencil.0.1.2.js', '56119:56142');
                    this.fst.element.show();
                }
                __$coverCall('js/Jencil.0.1.2.js', '56162:56244');
                if (this.snd.element.is(':visible')) {
                    __$coverCall('js/Jencil.0.1.2.js', '56211:56234');
                    this.snd.element.hide();
                }
                __$coverCall('js/Jencil.0.1.2.js', '56254:56300');
                this.fst.element.outerHeight(true, valueWidth);
                __$coverCall('js/Jencil.0.1.2.js', '56310:56342');
                this._value = value = valueWidth;
            } else {
                __$coverCall('js/Jencil.0.1.2.js', '56367:56450');
                if (!this.fst.element.is(':visible')) {
                    __$coverCall('js/Jencil.0.1.2.js', '56417:56440');
                    this.fst.element.show();
                }
                __$coverCall('js/Jencil.0.1.2.js', '56460:56543');
                if (!this.snd.element.is(':visible')) {
                    __$coverCall('js/Jencil.0.1.2.js', '56510:56533');
                    this.snd.element.show();
                }
                __$coverCall('js/Jencil.0.1.2.js', '56553:56586');
                this.fst.element.height(fstValue);
                __$coverCall('js/Jencil.0.1.2.js', '56596:56629');
                this.snd.element.height(sndValue);
            }
            __$coverCall('js/Jencil.0.1.2.js', '56645:56662');
            this.fst.adjust();
            __$coverCall('js/Jencil.0.1.2.js', '56670:56687');
            this.snd.adjust();
            __$coverCall('js/Jencil.0.1.2.js', '56695:56757');
            this.element.relativeY(value - this.element.outerHeight() / 2);
            __$coverCall('js/Jencil.0.1.2.js', '56765:56776');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '56790:56815');
        return HorizontalSplitter;
    }(Splitter);
    __$coverCall('js/Jencil.0.1.2.js', '56837:57044');
    namespace('Jencil.ui.widgets.splitters', function (exports) {
        __$coverCall('js/Jencil.0.1.2.js', '56902:56929');
        exports.Splitter = Splitter;
        __$coverCall('js/Jencil.0.1.2.js', '56935:56978');
        exports.VerticalSplitter = VerticalSplitter;
        __$coverCall('js/Jencil.0.1.2.js', '56984:57038');
        return exports.HorizontalSplitter = HorizontalSplitter;
    });
    __$coverCall('js/Jencil.0.1.2.js', '57049:58567');
    BaseEditor = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '57087:57116');
        __extends(BaseEditor, _super);
        __$coverCall('js/Jencil.0.1.2.js', '57123:57389');
        function BaseEditor(core, selector, context) {
            __$coverCall('js/Jencil.0.1.2.js', '57176:57234');
            if (selector == null) {
                __$coverCall('js/Jencil.0.1.2.js', '57208:57226');
                selector = '<div>';
            }
            __$coverCall('js/Jencil.0.1.2.js', '57242:57310');
            BaseEditor.__super__.constructor.call(this, core, selector, context);
            __$coverCall('js/Jencil.0.1.2.js', '57318:57349');
            this.element.addClass('editor');
            __$coverCall('js/Jencil.0.1.2.js', '57357:57383');
            this._changeCallbacks = [];
        }
        __$coverCall('js/Jencil.0.1.2.js', '57396:57492');
        BaseEditor.prototype.val = function (value) {
            __$coverCall('js/Jencil.0.1.2.js', '57447:57485');
            throw new Error('NotImplementedError');
        };
        __$coverCall('js/Jencil.0.1.2.js', '57499:57877');
        BaseEditor.prototype.change = function (callback) {
            __$coverCall('js/Jencil.0.1.2.js', '57556:57574');
            var _i, _len, _ref;
            __$coverCall('js/Jencil.0.1.2.js', '57582:57679');
            if (callback != null) {
                __$coverCall('js/Jencil.0.1.2.js', '57614:57650');
                this._changeCallbacks.push(callback);
                __$coverCall('js/Jencil.0.1.2.js', '57660:57671');
                return this;
            }
            __$coverCall('js/Jencil.0.1.2.js', '57687:57715');
            _ref = this._changeCallbacks;
            __$coverCall('js/Jencil.0.1.2.js', '57723:57851');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                __$coverCall('js/Jencil.0.1.2.js', '57783:57802');
                callback = _ref[_i];
                __$coverCall('js/Jencil.0.1.2.js', '57812:57843');
                callback.call(this, this.val());
            }
            __$coverCall('js/Jencil.0.1.2.js', '57859:57870');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '57884:57914');
        BaseEditor.prototype.h1 = null;
        __$coverCall('js/Jencil.0.1.2.js', '57921:57951');
        BaseEditor.prototype.h2 = null;
        __$coverCall('js/Jencil.0.1.2.js', '57958:57988');
        BaseEditor.prototype.h3 = null;
        __$coverCall('js/Jencil.0.1.2.js', '57995:58025');
        BaseEditor.prototype.h4 = null;
        __$coverCall('js/Jencil.0.1.2.js', '58032:58062');
        BaseEditor.prototype.h5 = null;
        __$coverCall('js/Jencil.0.1.2.js', '58069:58099');
        BaseEditor.prototype.h6 = null;
        __$coverCall('js/Jencil.0.1.2.js', '58106:58138');
        BaseEditor.prototype.bold = null;
        __$coverCall('js/Jencil.0.1.2.js', '58145:58179');
        BaseEditor.prototype.italic = null;
        __$coverCall('js/Jencil.0.1.2.js', '58186:58223');
        BaseEditor.prototype.underline = null;
        __$coverCall('js/Jencil.0.1.2.js', '58230:58264');
        BaseEditor.prototype.strike = null;
        __$coverCall('js/Jencil.0.1.2.js', '58271:58310');
        BaseEditor.prototype.superscript = null;
        __$coverCall('js/Jencil.0.1.2.js', '58317:58354');
        BaseEditor.prototype.subscript = null;
        __$coverCall('js/Jencil.0.1.2.js', '58361:58395');
        BaseEditor.prototype.anchor = null;
        __$coverCall('js/Jencil.0.1.2.js', '58402:58435');
        BaseEditor.prototype.image = null;
        __$coverCall('js/Jencil.0.1.2.js', '58442:58483');
        BaseEditor.prototype.unorderedList = null;
        __$coverCall('js/Jencil.0.1.2.js', '58490:58529');
        BaseEditor.prototype.orderedList = null;
        __$coverCall('js/Jencil.0.1.2.js', '58536:58553');
        return BaseEditor;
    }(Panel);
    __$coverCall('js/Jencil.0.1.2.js', '58572:62091');
    TextEditor = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '58610:58639');
        __extends(TextEditor, _super);
        __$coverCall('js/Jencil.0.1.2.js', '58646:59703');
        function TextEditor(core, selector, context) {
            __$coverCall('js/Jencil.0.1.2.js', '58699:58715');
            var _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '58723:58781');
            if (selector == null) {
                __$coverCall('js/Jencil.0.1.2.js', '58755:58773');
                selector = '<div>';
            }
            __$coverCall('js/Jencil.0.1.2.js', '58789:58857');
            TextEditor.__super__.constructor.call(this, core, selector, context);
            __$coverCall('js/Jencil.0.1.2.js', '58865:59059');
            this.textarea = $('<textarea>').appendTo(this.element).css({
                'margin': '0',
                'padding': '0',
                'border': 'none',
                'outline': 'none',
                'resize': 'none'
            });
            __$coverCall('js/Jencil.0.1.2.js', '59067:59105');
            this.textarea = evolute(this.textarea);
            __$coverCall('js/Jencil.0.1.2.js', '59113:59265');
            this.textarea.on('keydown', function (e) {
                __$coverCall('js/Jencil.0.1.2.js', '59163:59211');
                if (e.which !== 13) {
                    __$coverCall('js/Jencil.0.1.2.js', '59195:59201');
                    return;
                }
                __$coverCall('js/Jencil.0.1.2.js', '59221:59255');
                return _this.core.caretaker.save();
            });
            __$coverCall('js/Jencil.0.1.2.js', '59273:59437');
            if ($.fn.tabby != null && this.core.options.enableTabIndent) {
                __$coverCall('js/Jencil.0.1.2.js', '59346:59429');
                this.textarea.tabby({ 'tabString': this.core.options.tabString });
            }
            __$coverCall('js/Jencil.0.1.2.js', '59445:59490');
            this.textarea = autoIndentable(this.textarea);
            __$coverCall('js/Jencil.0.1.2.js', '59498:59591');
            if (!this.core.options.enableAutoIndent) {
                __$coverCall('js/Jencil.0.1.2.js', '59549:59583');
                this.textarea.autoIndent.disable();
            }
            __$coverCall('js/Jencil.0.1.2.js', '59599:59697');
            this.textarea.on('keypress keyup click blur', function () {
                __$coverCall('js/Jencil.0.1.2.js', '59666:59687');
                return _this.change();
            });
        }
        __$coverCall('js/Jencil.0.1.2.js', '59710:59907');
        TextEditor.prototype.val = function (value) {
            __$coverCall('js/Jencil.0.1.2.js', '59761:59866');
            if (value != null) {
                __$coverCall('js/Jencil.0.1.2.js', '59790:59814');
                this.textarea.val(value);
                __$coverCall('js/Jencil.0.1.2.js', '59824:59837');
                this.change();
                __$coverCall('js/Jencil.0.1.2.js', '59847:59858');
                return this;
            }
            __$coverCall('js/Jencil.0.1.2.js', '59874:59900');
            return this.textarea.val();
        };
        __$coverCall('js/Jencil.0.1.2.js', '59914:60009');
        TextEditor.prototype.focus = function () {
            __$coverCall('js/Jencil.0.1.2.js', '59962:59983');
            this.textarea.focus();
            __$coverCall('js/Jencil.0.1.2.js', '59991:60002');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '60016:60096');
        TextEditor.prototype.createMemento = function () {
            __$coverCall('js/Jencil.0.1.2.js', '60072:60089');
            return this.val();
        };
        __$coverCall('js/Jencil.0.1.2.js', '60103:60194');
        TextEditor.prototype.setMemento = function (memento) {
            __$coverCall('js/Jencil.0.1.2.js', '60163:60187');
            return this.val(memento);
        };
        __$coverCall('js/Jencil.0.1.2.js', '60201:60378');
        TextEditor.prototype.adjust = function () {
            __$coverCall('js/Jencil.0.1.2.js', '60250:60296');
            this.textarea.outerWidth(this.element.width());
            __$coverCall('js/Jencil.0.1.2.js', '60304:60352');
            this.textarea.outerHeight(this.element.height());
            __$coverCall('js/Jencil.0.1.2.js', '60360:60371');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '60385:60729');
        TextEditor.prototype.selection = function (str, keepSelection) {
            __$coverCall('js/Jencil.0.1.2.js', '60455:60520');
            if (keepSelection == null) {
                __$coverCall('js/Jencil.0.1.2.js', '60492:60512');
                keepSelection = true;
            }
            __$coverCall('js/Jencil.0.1.2.js', '60528:60677');
            if (str != null) {
                __$coverCall('js/Jencil.0.1.2.js', '60555:60603');
                this.textarea.selection.text(str, keepSelection);
                __$coverCall('js/Jencil.0.1.2.js', '60613:60639');
                this.core.caretaker.save();
                __$coverCall('js/Jencil.0.1.2.js', '60649:60669');
                return this.change();
            }
            __$coverCall('js/Jencil.0.1.2.js', '60685:60722');
            return this.textarea.selection.text();
        };
        __$coverCall('js/Jencil.0.1.2.js', '60736:61164');
        TextEditor.prototype.enclose = function (b, a, keepSelection) {
            __$coverCall('js/Jencil.0.1.2.js', '60805:60814');
            var caret;
            __$coverCall('js/Jencil.0.1.2.js', '60822:60887');
            if (keepSelection == null) {
                __$coverCall('js/Jencil.0.1.2.js', '60859:60879');
                keepSelection = true;
            }
            __$coverCall('js/Jencil.0.1.2.js', '60895:60934');
            caret = this.textarea.selection.caret();
            __$coverCall('js/Jencil.0.1.2.js', '60942:61035');
            if (caret[0] === caret[1]) {
                __$coverCall('js/Jencil.0.1.2.js', '60979:61027');
                this.textarea.selection.selectWholeCurrentLine();
            }
            __$coverCall('js/Jencil.0.1.2.js', '61043:61095');
            this.textarea.selection.enclose(b, a, keepSelection);
            __$coverCall('js/Jencil.0.1.2.js', '61103:61129');
            this.core.caretaker.save();
            __$coverCall('js/Jencil.0.1.2.js', '61137:61157');
            return this.change();
        };
        __$coverCall('js/Jencil.0.1.2.js', '61171:61607');
        TextEditor.prototype.insertBefore = function (str, keepSelection) {
            __$coverCall('js/Jencil.0.1.2.js', '61244:61253');
            var caret;
            __$coverCall('js/Jencil.0.1.2.js', '61261:61326');
            if (keepSelection == null) {
                __$coverCall('js/Jencil.0.1.2.js', '61298:61318');
                keepSelection = true;
            }
            __$coverCall('js/Jencil.0.1.2.js', '61334:61373');
            caret = this.textarea.selection.caret();
            __$coverCall('js/Jencil.0.1.2.js', '61381:61474');
            if (caret[0] === caret[1]) {
                __$coverCall('js/Jencil.0.1.2.js', '61418:61466');
                this.textarea.selection.selectWholeCurrentLine();
            }
            __$coverCall('js/Jencil.0.1.2.js', '61482:61538');
            this.textarea.selection.insertBefore(str, keepSelection);
            __$coverCall('js/Jencil.0.1.2.js', '61546:61572');
            this.core.caretaker.save();
            __$coverCall('js/Jencil.0.1.2.js', '61580:61600');
            return this.change();
        };
        __$coverCall('js/Jencil.0.1.2.js', '61614:62048');
        TextEditor.prototype.insertAfter = function (str, keepSelection) {
            __$coverCall('js/Jencil.0.1.2.js', '61686:61695');
            var caret;
            __$coverCall('js/Jencil.0.1.2.js', '61703:61768');
            if (keepSelection == null) {
                __$coverCall('js/Jencil.0.1.2.js', '61740:61760');
                keepSelection = true;
            }
            __$coverCall('js/Jencil.0.1.2.js', '61776:61815');
            caret = this.textarea.selection.caret();
            __$coverCall('js/Jencil.0.1.2.js', '61823:61916');
            if (caret[0] === caret[1]) {
                __$coverCall('js/Jencil.0.1.2.js', '61860:61908');
                this.textarea.selection.selectWholeCurrentLine();
            }
            __$coverCall('js/Jencil.0.1.2.js', '61924:61979');
            this.textarea.selection.insertAfter(str, keepSelection);
            __$coverCall('js/Jencil.0.1.2.js', '61987:62013');
            this.core.caretaker.save();
            __$coverCall('js/Jencil.0.1.2.js', '62021:62041');
            return this.change();
        };
        __$coverCall('js/Jencil.0.1.2.js', '62055:62072');
        return TextEditor;
    }(BaseEditor);
    __$coverCall('js/Jencil.0.1.2.js', '62096:62240');
    namespace('Jencil.ui.widgets.editors', function (exports) {
        __$coverCall('js/Jencil.0.1.2.js', '62159:62190');
        exports.BaseEditor = BaseEditor;
        __$coverCall('js/Jencil.0.1.2.js', '62196:62234');
        return exports.TextEditor = TextEditor;
    });
    __$coverCall('js/Jencil.0.1.2.js', '62245:62702');
    BaseViewer = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '62283:62312');
        __extends(BaseViewer, _super);
        __$coverCall('js/Jencil.0.1.2.js', '62319:62551');
        function BaseViewer(core, selector, context) {
            __$coverCall('js/Jencil.0.1.2.js', '62372:62430');
            if (selector == null) {
                __$coverCall('js/Jencil.0.1.2.js', '62404:62422');
                selector = '<div>';
            }
            __$coverCall('js/Jencil.0.1.2.js', '62438:62506');
            BaseViewer.__super__.constructor.call(this, core, selector, context);
            __$coverCall('js/Jencil.0.1.2.js', '62514:62545');
            this.element.addClass('viewer');
        }
        __$coverCall('js/Jencil.0.1.2.js', '62558:62664');
        BaseViewer.prototype.update = function (value, force) {
            __$coverCall('js/Jencil.0.1.2.js', '62619:62657');
            throw new Error('NotImplementedError');
        };
        __$coverCall('js/Jencil.0.1.2.js', '62671:62688');
        return BaseViewer;
    }(Panel);
    __$coverCall('js/Jencil.0.1.2.js', '62707:65264');
    TemplateViewer = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '62749:62782');
        __extends(TemplateViewer, _super);
        __$coverCall('js/Jencil.0.1.2.js', '62789:64607');
        function TemplateViewer(core) {
            __$coverCall('js/Jencil.0.1.2.js', '62827:62880');
            TemplateViewer.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.0.1.2.js', '62888:62944');
            this.templatePath = this.core.options.viewerTemplatePath;
            __$coverCall('js/Jencil.0.1.2.js', '62952:63010');
            this.element.css({ 'position': 'relative' });
            __$coverCall('js/Jencil.0.1.2.js', '63018:63061');
            this.curtain = curtainFactory(this.element);
            __$coverCall('js/Jencil.0.1.2.js', '63069:63325');
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
            __$coverCall('js/Jencil.0.1.2.js', '63333:63367');
            this.iframe.attr('frameborder', 0);
            __$coverCall('js/Jencil.0.1.2.js', '63375:63409');
            this.iframe = evolute(this.iframe);
            __$coverCall('js/Jencil.0.1.2.js', '63417:63739');
            this.iframe.init = function () {
                __$coverCall('js/Jencil.0.1.2.js', '63457:63467');
                var iframe;
                __$coverCall('js/Jencil.0.1.2.js', '63477:63497');
                iframe = this.get(0);
                __$coverCall('js/Jencil.0.1.2.js', '63507:63677');
                if (iframe.contentDocument != null) {
                    __$coverCall('js/Jencil.0.1.2.js', '63555:63593');
                    this.document = iframe.contentDocument;
                } else {
                    __$coverCall('js/Jencil.0.1.2.js', '63622:63667');
                    this.document = iframe.contentWindow.document;
                }
                __$coverCall('js/Jencil.0.1.2.js', '63687:63730');
                return this.document.write('<body></body>');
            };
            __$coverCall('js/Jencil.0.1.2.js', '63747:64313');
            this.iframe.write = function (value) {
                __$coverCall('js/Jencil.0.1.2.js', '63793:63806');
                var scrollTop;
                __$coverCall('js/Jencil.0.1.2.js', '63816:64282');
                if (this.document != null) {
                    __$coverCall('js/Jencil.0.1.2.js', '63855:63987');
                    try {
                        __$coverCall('js/Jencil.0.1.2.js', '63873:63924');
                        scrollTop = this.document.documentElement.scrollTop;
                    } catch (e) {
                        __$coverCall('js/Jencil.0.1.2.js', '63962:63975');
                        scrollTop = 0;
                    }
                    __$coverCall('js/Jencil.0.1.2.js', '63999:64019');
                    this.document.open();
                    __$coverCall('js/Jencil.0.1.2.js', '64031:64057');
                    this.document.write(value);
                    __$coverCall('js/Jencil.0.1.2.js', '64069:64090');
                    this.document.close();
                    __$coverCall('js/Jencil.0.1.2.js', '64102:64153');
                    this.document.documentElement.scrollTop = scrollTop;
                    __$coverCall('js/Jencil.0.1.2.js', '64165:64201');
                    this.width(this.document.scrollLeft);
                    __$coverCall('js/Jencil.0.1.2.js', '64213:64249');
                    this.height(this.document.scrollTop);
                    __$coverCall('js/Jencil.0.1.2.js', '64261:64272');
                    return true;
                }
                __$coverCall('js/Jencil.0.1.2.js', '64292:64304');
                return false;
            };
            __$coverCall('js/Jencil.0.1.2.js', '64321:64601');
            this.iframe.loadTemplate = function (templatePath, value) {
                __$coverCall('js/Jencil.0.1.2.js', '64388:64404');
                var _this = this;
                __$coverCall('js/Jencil.0.1.2.js', '64414:64592');
                return $.ajax({
                    url: templatePath,
                    success: function (data) {
                        __$coverCall('js/Jencil.0.1.2.js', '64507:64529');
                        _this._template = data;
                        __$coverCall('js/Jencil.0.1.2.js', '64543:64568');
                        return _this.write(value);
                    }
                });
            };
        }
        __$coverCall('js/Jencil.0.1.2.js', '64614:64697');
        TemplateViewer.prototype.init = function () {
            __$coverCall('js/Jencil.0.1.2.js', '64665:64690');
            return this.iframe.init();
        };
        __$coverCall('js/Jencil.0.1.2.js', '64704:65033');
        TemplateViewer.prototype.update = function (value, force) {
            __$coverCall('js/Jencil.0.1.2.js', '64769:64987');
            if (this.iframe._template != null) {
                __$coverCall('js/Jencil.0.1.2.js', '64814:64873');
                value = this.iframe._template.replace('{{content}}', value);
            } else if (this.templatePath != null) {
                __$coverCall('js/Jencil.0.1.2.js', '64929:64979');
                this.iframe.loadTemplate(this.templatePath, value);
            }
            __$coverCall('js/Jencil.0.1.2.js', '64995:65026');
            return this.iframe.write(value);
        };
        __$coverCall('js/Jencil.0.1.2.js', '65040:65217');
        TemplateViewer.prototype.adjust = function () {
            __$coverCall('js/Jencil.0.1.2.js', '65093:65137');
            this.iframe.outerWidth(this.element.width());
            __$coverCall('js/Jencil.0.1.2.js', '65145:65191');
            this.iframe.outerHeight(this.element.height());
            __$coverCall('js/Jencil.0.1.2.js', '65199:65210');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '65224:65245');
        return TemplateViewer;
    }(BaseViewer);
    __$coverCall('js/Jencil.0.1.2.js', '65269:66465');
    AjaxViewer = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '65307:65336');
        __extends(AjaxViewer, _super);
        __$coverCall('js/Jencil.0.1.2.js', '65343:65679');
        function AjaxViewer(core, config) {
            __$coverCall('js/Jencil.0.1.2.js', '65385:65405');
            this.config = config;
            __$coverCall('js/Jencil.0.1.2.js', '65413:65462');
            AjaxViewer.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.0.1.2.js', '65470:65673');
            this.config = jQuery.extend({
                type: 'GET',
                dataType: 'text',
                data: function (value) {
                    __$coverCall('js/Jencil.0.1.2.js', '65589:65621');
                    return encodeURIComponent(value);
                },
                url: null
            }, this.config);
        }
        __$coverCall('js/Jencil.0.1.2.js', '65686:66418');
        AjaxViewer.prototype.update = function (value, force) {
            __$coverCall('js/Jencil.0.1.2.js', '65747:65763');
            var _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '65771:66411');
            if (this._valueCache !== value || force) {
                __$coverCall('js/Jencil.0.1.2.js', '65822:65846');
                this._valueCache = value;
                __$coverCall('js/Jencil.0.1.2.js', '65856:66403');
                return $.ajax({
                    type: this.config.type,
                    dataType: this.config.dataType,
                    data: JSON.stringify(this.config.data(value)),
                    url: this.config.url,
                    success: function (value) {
                        __$coverCall('js/Jencil.0.1.2.js', '66086:66333');
                        if (_this.iframe._template != null) {
                            __$coverCall('js/Jencil.0.1.2.js', '66138:66198');
                            value = _this.iframe._template.replace('{{content}}', value);
                        } else if (_this.templatePath != null) {
                            __$coverCall('js/Jencil.0.1.2.js', '66267:66319');
                            _this.iframe.loadTemplate(_this.templatePath, value);
                        }
                        __$coverCall('js/Jencil.0.1.2.js', '66347:66379');
                        return _this.iframe.write(value);
                    }
                });
            }
        };
        __$coverCall('js/Jencil.0.1.2.js', '66425:66442');
        return AjaxViewer;
    }(TemplateViewer);
    __$coverCall('js/Jencil.0.1.2.js', '66470:66659');
    namespace('Jencil.ui.widgets.viewers', function (exports) {
        __$coverCall('js/Jencil.0.1.2.js', '66533:66564');
        exports.BaseViewer = BaseViewer;
        __$coverCall('js/Jencil.0.1.2.js', '66570:66609');
        exports.TemplateViewer = TemplateViewer;
        __$coverCall('js/Jencil.0.1.2.js', '66615:66653');
        return exports.AjaxViewer = AjaxViewer;
    });
    __$coverCall('js/Jencil.0.1.2.js', '66664:67008');
    BaseHelper = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '66702:66731');
        __extends(BaseHelper, _super);
        __$coverCall('js/Jencil.0.1.2.js', '66738:66970');
        function BaseHelper(core, selector, context) {
            __$coverCall('js/Jencil.0.1.2.js', '66791:66849');
            if (selector == null) {
                __$coverCall('js/Jencil.0.1.2.js', '66823:66841');
                selector = '<div>';
            }
            __$coverCall('js/Jencil.0.1.2.js', '66857:66925');
            BaseHelper.__super__.constructor.call(this, core, selector, context);
            __$coverCall('js/Jencil.0.1.2.js', '66933:66964');
            this.element.addClass('helper');
        }
        __$coverCall('js/Jencil.0.1.2.js', '66977:66994');
        return BaseHelper;
    }(Panel);
    __$coverCall('js/Jencil.0.1.2.js', '67013:69290');
    TemplateHelper = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '67055:67088');
        __extends(TemplateHelper, _super);
        __$coverCall('js/Jencil.0.1.2.js', '67095:68869');
        function TemplateHelper(core) {
            __$coverCall('js/Jencil.0.1.2.js', '67133:67186');
            TemplateHelper.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.0.1.2.js', '67194:67250');
            this.templatePath = this.core.options.helperTemplatePath;
            __$coverCall('js/Jencil.0.1.2.js', '67258:67316');
            this.element.css({ 'position': 'relative' });
            __$coverCall('js/Jencil.0.1.2.js', '67324:67367');
            this.curtain = curtainFactory(this.element);
            __$coverCall('js/Jencil.0.1.2.js', '67375:67631');
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
            __$coverCall('js/Jencil.0.1.2.js', '67639:67673');
            this.iframe.attr('frameborder', 0);
            __$coverCall('js/Jencil.0.1.2.js', '67681:67715');
            this.iframe = evolute(this.iframe);
            __$coverCall('js/Jencil.0.1.2.js', '67723:68045');
            this.iframe.init = function () {
                __$coverCall('js/Jencil.0.1.2.js', '67763:67773');
                var iframe;
                __$coverCall('js/Jencil.0.1.2.js', '67783:67803');
                iframe = this.get(0);
                __$coverCall('js/Jencil.0.1.2.js', '67813:67983');
                if (iframe.contentDocument != null) {
                    __$coverCall('js/Jencil.0.1.2.js', '67861:67899');
                    this.document = iframe.contentDocument;
                } else {
                    __$coverCall('js/Jencil.0.1.2.js', '67928:67973');
                    this.document = iframe.contentWindow.document;
                }
                __$coverCall('js/Jencil.0.1.2.js', '67993:68036');
                return this.document.write('<body></body>');
            };
            __$coverCall('js/Jencil.0.1.2.js', '68053:68619');
            this.iframe.write = function (value) {
                __$coverCall('js/Jencil.0.1.2.js', '68099:68112');
                var scrollTop;
                __$coverCall('js/Jencil.0.1.2.js', '68122:68588');
                if (this.document != null) {
                    __$coverCall('js/Jencil.0.1.2.js', '68161:68293');
                    try {
                        __$coverCall('js/Jencil.0.1.2.js', '68179:68230');
                        scrollTop = this.document.documentElement.scrollTop;
                    } catch (e) {
                        __$coverCall('js/Jencil.0.1.2.js', '68268:68281');
                        scrollTop = 0;
                    }
                    __$coverCall('js/Jencil.0.1.2.js', '68305:68325');
                    this.document.open();
                    __$coverCall('js/Jencil.0.1.2.js', '68337:68363');
                    this.document.write(value);
                    __$coverCall('js/Jencil.0.1.2.js', '68375:68396');
                    this.document.close();
                    __$coverCall('js/Jencil.0.1.2.js', '68408:68459');
                    this.document.documentElement.scrollTop = scrollTop;
                    __$coverCall('js/Jencil.0.1.2.js', '68471:68507');
                    this.width(this.document.scrollLeft);
                    __$coverCall('js/Jencil.0.1.2.js', '68519:68555');
                    this.height(this.document.scrollTop);
                    __$coverCall('js/Jencil.0.1.2.js', '68567:68578');
                    return true;
                }
                __$coverCall('js/Jencil.0.1.2.js', '68598:68610');
                return false;
            };
            __$coverCall('js/Jencil.0.1.2.js', '68627:68863');
            this.iframe.loadTemplate = function (templatePath) {
                __$coverCall('js/Jencil.0.1.2.js', '68687:68703');
                var _this = this;
                __$coverCall('js/Jencil.0.1.2.js', '68713:68854');
                return $.ajax({
                    url: templatePath,
                    success: function (data) {
                        __$coverCall('js/Jencil.0.1.2.js', '68806:68830');
                        return _this.write(data);
                    }
                });
            };
        }
        __$coverCall('js/Jencil.0.1.2.js', '68876:69059');
        TemplateHelper.prototype.init = function () {
            __$coverCall('js/Jencil.0.1.2.js', '68927:68945');
            this.iframe.init();
            __$coverCall('js/Jencil.0.1.2.js', '68953:69052');
            if (this.templatePath != null) {
                __$coverCall('js/Jencil.0.1.2.js', '68994:69044');
                return this.iframe.loadTemplate(this.templatePath);
            }
        };
        __$coverCall('js/Jencil.0.1.2.js', '69066:69243');
        TemplateHelper.prototype.adjust = function () {
            __$coverCall('js/Jencil.0.1.2.js', '69119:69163');
            this.iframe.outerWidth(this.element.width());
            __$coverCall('js/Jencil.0.1.2.js', '69171:69217');
            this.iframe.outerHeight(this.element.height());
            __$coverCall('js/Jencil.0.1.2.js', '69225:69236');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '69250:69271');
        return TemplateHelper;
    }(BaseHelper);
    __$coverCall('js/Jencil.0.1.2.js', '69295:69447');
    namespace('Jencil.ui.widgets.helpers', function (exports) {
        __$coverCall('js/Jencil.0.1.2.js', '69358:69389');
        exports.BaseHelper = BaseHelper;
        __$coverCall('js/Jencil.0.1.2.js', '69395:69441');
        return exports.TemplateHelper = TemplateHelper;
    });
    __$coverCall('js/Jencil.0.1.2.js', '69452:69701');
    Separator = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '69489:69517');
        __extends(Separator, _super);
        __$coverCall('js/Jencil.0.1.2.js', '69524:69663');
        function Separator(core) {
            __$coverCall('js/Jencil.0.1.2.js', '69557:69615');
            Separator.__super__.constructor.call(this, core, '<span>');
            __$coverCall('js/Jencil.0.1.2.js', '69623:69657');
            this.element.addClass('separator');
        }
        __$coverCall('js/Jencil.0.1.2.js', '69670:69686');
        return Separator;
    }(Widget);
    __$coverCall('js/Jencil.0.1.2.js', '69706:70530');
    Button = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '69740:69765');
        __extends(Button, _super);
        __$coverCall('js/Jencil.0.1.2.js', '69772:70223');
        function Button(core, name, text, title) {
            __$coverCall('js/Jencil.0.1.2.js', '69821:69837');
            this.name = name;
            __$coverCall('js/Jencil.0.1.2.js', '69845:69861');
            this.text = text;
            __$coverCall('js/Jencil.0.1.2.js', '69869:69887');
            this.title = title;
            __$coverCall('js/Jencil.0.1.2.js', '69895:69947');
            Button.__super__.constructor.call(this, core, '<a>');
            __$coverCall('js/Jencil.0.1.2.js', '69955:69999');
            this.text = Jencil.t(this.text || this.name);
            __$coverCall('js/Jencil.0.1.2.js', '70007:70053');
            this.title = Jencil.t(this.title || this.text);
            __$coverCall('js/Jencil.0.1.2.js', '70061:70107');
            this.element.addClass('button').addClass(name);
            __$coverCall('js/Jencil.0.1.2.js', '70115:70171');
            this.element.append($('<span>' + this.text + '</span>'));
            __$coverCall('js/Jencil.0.1.2.js', '70179:70217');
            this.element.attr('title', this.title);
        }
        __$coverCall('js/Jencil.0.1.2.js', '70230:70324');
        Button.prototype.enable = function () {
            __$coverCall('js/Jencil.0.1.2.js', '70275:70317');
            return this.element.removeClass('disable');
        };
        __$coverCall('js/Jencil.0.1.2.js', '70331:70423');
        Button.prototype.disable = function () {
            __$coverCall('js/Jencil.0.1.2.js', '70377:70416');
            return this.element.addClass('disable');
        };
        __$coverCall('js/Jencil.0.1.2.js', '70430:70495');
        Button.prototype.validate = function () {
            __$coverCall('js/Jencil.0.1.2.js', '70477:70488');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '70502:70515');
        return Button;
    }(Widget);
    __$coverCall('js/Jencil.0.1.2.js', '70535:71371');
    ActionButton = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '70575:70606');
        __extends(ActionButton, _super);
        __$coverCall('js/Jencil.0.1.2.js', '70613:71330');
        function ActionButton(core, name, text, title, callback, shortcut) {
            __$coverCall('js/Jencil.0.1.2.js', '70688:70704');
            var _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '70712:70736');
            this.shortcut = shortcut;
            __$coverCall('js/Jencil.0.1.2.js', '70744:70814');
            ActionButton.__super__.constructor.call(this, core, name, text, title);
            __$coverCall('js/Jencil.0.1.2.js', '70822:70947');
            this.callback = function () {
                __$coverCall('js/Jencil.0.1.2.js', '70859:70938');
                if (!_this.element.hasClass('disable')) {
                    __$coverCall('js/Jencil.0.1.2.js', '70911:70928');
                    return callback();
                }
            };
            __$coverCall('js/Jencil.0.1.2.js', '70955:70983');
            this.callback.raw = callback;
            __$coverCall('js/Jencil.0.1.2.js', '70991:71064');
            this.element.click(function () {
                __$coverCall('js/Jencil.0.1.2.js', '71031:71054');
                return _this.callback();
            });
            __$coverCall('js/Jencil.0.1.2.js', '71072:71324');
            if (this.shortcut != null && window.shortcut != null) {
                __$coverCall('js/Jencil.0.1.2.js', '71140:71234');
                window.shortcut.add(this.shortcut, function (e) {
                    __$coverCall('js/Jencil.0.1.2.js', '71199:71222');
                    return _this.callback();
                });
                __$coverCall('js/Jencil.0.1.2.js', '71244:71316');
                this.element.attr('title', '' + this.title + ' (' + this.shortcut + ')');
            }
        }
        __$coverCall('js/Jencil.0.1.2.js', '71337:71356');
        return ActionButton;
    }(Button);
    __$coverCall('js/Jencil.0.1.2.js', '71376:73112');
    CommandButton = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '71417:71449');
        __extends(CommandButton, _super);
        __$coverCall('js/Jencil.0.1.2.js', '71456:71814');
        function CommandButton(core, name, text, title, command, shortcut) {
            __$coverCall('js/Jencil.0.1.2.js', '71531:71543');
            var callback;
            __$coverCall('js/Jencil.0.1.2.js', '71551:71573');
            this.command = command;
            __$coverCall('js/Jencil.0.1.2.js', '71581:71709');
            callback = function () {
                __$coverCall('js/Jencil.0.1.2.js', '71613:71623');
                var editor;
                __$coverCall('js/Jencil.0.1.2.js', '71633:71655');
                editor = core.editor();
                __$coverCall('js/Jencil.0.1.2.js', '71665:71700');
                return editor[command].call(editor);
            };
            __$coverCall('js/Jencil.0.1.2.js', '71717:71808');
            CommandButton.__super__.constructor.call(this, core, name, text, title, callback, shortcut);
        }
        __$coverCall('js/Jencil.0.1.2.js', '71821:71900');
        CommandButton.prototype.init = function () {
            __$coverCall('js/Jencil.0.1.2.js', '71871:71893');
            return this.validate();
        };
        __$coverCall('js/Jencil.0.1.2.js', '71907:72109');
        CommandButton.prototype.validate = function () {
            __$coverCall('js/Jencil.0.1.2.js', '71961:71971');
            var editor;
            __$coverCall('js/Jencil.0.1.2.js', '71979:72006');
            editor = this.core.editor();
            __$coverCall('js/Jencil.0.1.2.js', '72014:72083');
            if (!(editor[this.command] != null)) {
                __$coverCall('js/Jencil.0.1.2.js', '72061:72075');
                this.disable();
            }
            __$coverCall('js/Jencil.0.1.2.js', '72091:72102');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '72116:73064');
        CommandButton.factory = function (core, args) {
            __$coverCall('js/Jencil.0.1.2.js', '72169:72209');
            var command, name, shortcut, text, title;
            __$coverCall('js/Jencil.0.1.2.js', '72217:72264');
            name = text = title = command = shortcut = null;
            __$coverCall('js/Jencil.0.1.2.js', '72272:72981');
            switch (args.length) {
            case 5:
                __$coverCall('js/Jencil.0.1.2.js', '72321:72335');
                name = args[0];
                __$coverCall('js/Jencil.0.1.2.js', '72347:72361');
                text = args[1];
                __$coverCall('js/Jencil.0.1.2.js', '72373:72388');
                title = args[2];
                __$coverCall('js/Jencil.0.1.2.js', '72400:72417');
                command = args[3];
                __$coverCall('js/Jencil.0.1.2.js', '72429:72447');
                shortcut = args[4];
                __$coverCall('js/Jencil.0.1.2.js', '72459:72464');
                break;
            case 4:
                __$coverCall('js/Jencil.0.1.2.js', '72492:72506');
                name = args[0];
                __$coverCall('js/Jencil.0.1.2.js', '72518:72540');
                text = title = args[1];
                __$coverCall('js/Jencil.0.1.2.js', '72552:72569');
                command = args[2];
                __$coverCall('js/Jencil.0.1.2.js', '72581:72599');
                shortcut = args[3];
                __$coverCall('js/Jencil.0.1.2.js', '72611:72616');
                break;
            case 3:
                __$coverCall('js/Jencil.0.1.2.js', '72644:72668');
                name = command = args[0];
                __$coverCall('js/Jencil.0.1.2.js', '72680:72702');
                text = title = args[1];
                __$coverCall('js/Jencil.0.1.2.js', '72714:72732');
                shortcut = args[2];
                __$coverCall('js/Jencil.0.1.2.js', '72744:72749');
                break;
            case 2:
                __$coverCall('js/Jencil.0.1.2.js', '72777:72801');
                name = command = args[0];
                __$coverCall('js/Jencil.0.1.2.js', '72813:72835');
                text = title = args[1];
                __$coverCall('js/Jencil.0.1.2.js', '72847:72862');
                shortcut = null;
                __$coverCall('js/Jencil.0.1.2.js', '72874:72879');
                break;
            case 1:
                __$coverCall('js/Jencil.0.1.2.js', '72907:72946');
                name = command = text = title = args[0];
                __$coverCall('js/Jencil.0.1.2.js', '72958:72973');
                shortcut = null;
            }
            __$coverCall('js/Jencil.0.1.2.js', '72989:73057');
            return new CommandButton(core, name, text, title, command, shortcut);
        };
        __$coverCall('js/Jencil.0.1.2.js', '73071:73091');
        return CommandButton;
    }(ActionButton);
    __$coverCall('js/Jencil.0.1.2.js', '73117:73811');
    UndoButton = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '73155:73184');
        __extends(UndoButton, _super);
        __$coverCall('js/Jencil.0.1.2.js', '73191:73450');
        function UndoButton(core) {
            __$coverCall('js/Jencil.0.1.2.js', '73225:73259');
            var callback, _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '73267:73343');
            callback = function (e) {
                __$coverCall('js/Jencil.0.1.2.js', '73300:73334');
                return _this.core.caretaker.undo();
            };
            __$coverCall('js/Jencil.0.1.2.js', '73351:73444');
            UndoButton.__super__.constructor.call(this, core, 'undo', 'Undo', 'Undo', callback, 'Ctrl+Z');
        }
        __$coverCall('js/Jencil.0.1.2.js', '73457:73766');
        UndoButton.prototype.init = function () {
            __$coverCall('js/Jencil.0.1.2.js', '73504:73535');
            var check, _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '73543:73737');
            check = function () {
                __$coverCall('js/Jencil.0.1.2.js', '73572:73689');
                if (!_this.core.caretaker.canUndo()) {
                    __$coverCall('js/Jencil.0.1.2.js', '73621:73636');
                    _this.disable();
                } else {
                    __$coverCall('js/Jencil.0.1.2.js', '73665:73679');
                    _this.enable();
                }
                __$coverCall('js/Jencil.0.1.2.js', '73699:73728');
                return setTimeout(check, 100);
            };
            __$coverCall('js/Jencil.0.1.2.js', '73745:73759');
            return check();
        };
        __$coverCall('js/Jencil.0.1.2.js', '73773:73790');
        return UndoButton;
    }(ActionButton);
    __$coverCall('js/Jencil.0.1.2.js', '73816:74516');
    RedoButton = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '73854:73883');
        __extends(RedoButton, _super);
        __$coverCall('js/Jencil.0.1.2.js', '73890:74155');
        function RedoButton(core) {
            __$coverCall('js/Jencil.0.1.2.js', '73924:73958');
            var callback, _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '73966:74042');
            callback = function (e) {
                __$coverCall('js/Jencil.0.1.2.js', '73999:74033');
                return _this.core.caretaker.redo();
            };
            __$coverCall('js/Jencil.0.1.2.js', '74050:74149');
            RedoButton.__super__.constructor.call(this, core, 'redo', 'Redo', 'Redo', callback, 'Ctrl+Shift+Z');
        }
        __$coverCall('js/Jencil.0.1.2.js', '74162:74471');
        RedoButton.prototype.init = function () {
            __$coverCall('js/Jencil.0.1.2.js', '74209:74240');
            var check, _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '74248:74442');
            check = function () {
                __$coverCall('js/Jencil.0.1.2.js', '74277:74394');
                if (!_this.core.caretaker.canRedo()) {
                    __$coverCall('js/Jencil.0.1.2.js', '74326:74341');
                    _this.disable();
                } else {
                    __$coverCall('js/Jencil.0.1.2.js', '74370:74384');
                    _this.enable();
                }
                __$coverCall('js/Jencil.0.1.2.js', '74404:74433');
                return setTimeout(check, 100);
            };
            __$coverCall('js/Jencil.0.1.2.js', '74450:74464');
            return check();
        };
        __$coverCall('js/Jencil.0.1.2.js', '74478:74495');
        return RedoButton;
    }(ActionButton);
    __$coverCall('js/Jencil.0.1.2.js', '74521:75326');
    FullscreenButton = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '74565:74600');
        __extends(FullscreenButton, _super);
        __$coverCall('js/Jencil.0.1.2.js', '74607:74906');
        function FullscreenButton(core) {
            __$coverCall('js/Jencil.0.1.2.js', '74647:74681');
            var callback, _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '74689:74768');
            callback = function (e) {
                __$coverCall('js/Jencil.0.1.2.js', '74722:74759');
                return _this.core.fullscreen.toggle();
            };
            __$coverCall('js/Jencil.0.1.2.js', '74776:74900');
            FullscreenButton.__super__.constructor.call(this, core, 'fullscreen', 'Toggle fullscreen', 'Fullscreen', callback, 'Ctrl+F');
        }
        __$coverCall('js/Jencil.0.1.2.js', '74913:75275');
        FullscreenButton.prototype.init = function () {
            __$coverCall('js/Jencil.0.1.2.js', '74966:74997');
            var check, _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '75005:75246');
            check = function () {
                __$coverCall('js/Jencil.0.1.2.js', '75034:75198');
                if (_this.core.fullscreen.element.is(':visible')) {
                    __$coverCall('js/Jencil.0.1.2.js', '75096:75126');
                    _this.element.addClass('hide');
                } else {
                    __$coverCall('js/Jencil.0.1.2.js', '75155:75188');
                    _this.element.removeClass('hide');
                }
                __$coverCall('js/Jencil.0.1.2.js', '75208:75237');
                return setTimeout(check, 100);
            };
            __$coverCall('js/Jencil.0.1.2.js', '75254:75268');
            return check();
        };
        __$coverCall('js/Jencil.0.1.2.js', '75282:75305');
        return FullscreenButton;
    }(ActionButton);
    __$coverCall('js/Jencil.0.1.2.js', '75331:76316');
    ViewerButton = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '75371:75402');
        __extends(ViewerButton, _super);
        __$coverCall('js/Jencil.0.1.2.js', '75409:75687');
        function ViewerButton(core) {
            __$coverCall('js/Jencil.0.1.2.js', '75445:75479');
            var callback, _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '75487:75564');
            callback = function (e) {
                __$coverCall('js/Jencil.0.1.2.js', '75520:75555');
                return _this.core.viewer().toggle();
            };
            __$coverCall('js/Jencil.0.1.2.js', '75572:75681');
            ViewerButton.__super__.constructor.call(this, core, 'viewer', 'Quick view', 'Quick view', callback, 'Ctrl+Q');
        }
        __$coverCall('js/Jencil.0.1.2.js', '75694:75852');
        ViewerButton.prototype.validate = function () {
            __$coverCall('js/Jencil.0.1.2.js', '75747:75826');
            if (!this.core.viewer()) {
                __$coverCall('js/Jencil.0.1.2.js', '75782:75796');
                this.disable();
                __$coverCall('js/Jencil.0.1.2.js', '75806:75818');
                return false;
            }
            __$coverCall('js/Jencil.0.1.2.js', '75834:75845');
            return true;
        };
        __$coverCall('js/Jencil.0.1.2.js', '75859:76269');
        ViewerButton.prototype.init = function () {
            __$coverCall('js/Jencil.0.1.2.js', '75908:75939');
            var check, _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '75947:75993');
            if (!this.validate()) {
                __$coverCall('js/Jencil.0.1.2.js', '75979:75985');
                return;
            }
            __$coverCall('js/Jencil.0.1.2.js', '76001:76240');
            check = function () {
                __$coverCall('js/Jencil.0.1.2.js', '76030:76192');
                if (_this.core.viewer().element.is(':visible')) {
                    __$coverCall('js/Jencil.0.1.2.js', '76090:76120');
                    _this.element.addClass('hide');
                } else {
                    __$coverCall('js/Jencil.0.1.2.js', '76149:76182');
                    _this.element.removeClass('hide');
                }
                __$coverCall('js/Jencil.0.1.2.js', '76202:76231');
                return setTimeout(check, 100);
            };
            __$coverCall('js/Jencil.0.1.2.js', '76248:76262');
            return check();
        };
        __$coverCall('js/Jencil.0.1.2.js', '76276:76295');
        return ViewerButton;
    }(ActionButton);
    __$coverCall('js/Jencil.0.1.2.js', '76321:77294');
    HelperButton = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '76361:76392');
        __extends(HelperButton, _super);
        __$coverCall('js/Jencil.0.1.2.js', '76399:76665');
        function HelperButton(core) {
            __$coverCall('js/Jencil.0.1.2.js', '76435:76469');
            var callback, _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '76477:76554');
            callback = function (e) {
                __$coverCall('js/Jencil.0.1.2.js', '76510:76545');
                return _this.core.helper().toggle();
            };
            __$coverCall('js/Jencil.0.1.2.js', '76562:76659');
            HelperButton.__super__.constructor.call(this, core, 'helper', 'Help', 'Help', callback, 'Ctrl+H');
        }
        __$coverCall('js/Jencil.0.1.2.js', '76672:76830');
        HelperButton.prototype.validate = function () {
            __$coverCall('js/Jencil.0.1.2.js', '76725:76804');
            if (!this.core.helper()) {
                __$coverCall('js/Jencil.0.1.2.js', '76760:76774');
                this.disable();
                __$coverCall('js/Jencil.0.1.2.js', '76784:76796');
                return false;
            }
            __$coverCall('js/Jencil.0.1.2.js', '76812:76823');
            return true;
        };
        __$coverCall('js/Jencil.0.1.2.js', '76837:77247');
        HelperButton.prototype.init = function () {
            __$coverCall('js/Jencil.0.1.2.js', '76886:76917');
            var check, _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '76925:76971');
            if (!this.validate()) {
                __$coverCall('js/Jencil.0.1.2.js', '76957:76963');
                return;
            }
            __$coverCall('js/Jencil.0.1.2.js', '76979:77218');
            check = function () {
                __$coverCall('js/Jencil.0.1.2.js', '77008:77170');
                if (_this.core.helper().element.is(':visible')) {
                    __$coverCall('js/Jencil.0.1.2.js', '77068:77098');
                    _this.element.addClass('hide');
                } else {
                    __$coverCall('js/Jencil.0.1.2.js', '77127:77160');
                    _this.element.removeClass('hide');
                }
                __$coverCall('js/Jencil.0.1.2.js', '77180:77209');
                return setTimeout(check, 100);
            };
            __$coverCall('js/Jencil.0.1.2.js', '77226:77240');
            return check();
        };
        __$coverCall('js/Jencil.0.1.2.js', '77254:77273');
        return HelperButton;
    }(ActionButton);
    __$coverCall('js/Jencil.0.1.2.js', '77299:78007');
    buttonFactory = function (core, value) {
        __$coverCall('js/Jencil.0.1.2.js', '77343:77426');
        if (value instanceof Array) {
            __$coverCall('js/Jencil.0.1.2.js', '77379:77420');
            return CommandButton.factory(core, value);
        }
        __$coverCall('js/Jencil.0.1.2.js', '77432:77974');
        if (typeof value === 'string') {
            __$coverCall('js/Jencil.0.1.2.js', '77471:77968');
            switch (value) {
            case 'Separator':
                __$coverCall('js/Jencil.0.1.2.js', '77524:77550');
                return new Separator(core);
            case 'Undo':
                __$coverCall('js/Jencil.0.1.2.js', '77583:77610');
                return new UndoButton(core);
            case 'Redo':
                __$coverCall('js/Jencil.0.1.2.js', '77643:77670');
                return new RedoButton(core);
            case 'Fullscreen':
                __$coverCall('js/Jencil.0.1.2.js', '77709:77742');
                return new FullscreenButton(core);
            case 'Viewer':
                __$coverCall('js/Jencil.0.1.2.js', '77777:77806');
                return new ViewerButton(core);
            case 'Helper':
                __$coverCall('js/Jencil.0.1.2.js', '77841:77870');
                return new HelperButton(core);
            default:
                __$coverCall('js/Jencil.0.1.2.js', '77899:77960');
                throw new Exception('' + value + ' is not known Button type');
            }
        }
        __$coverCall('js/Jencil.0.1.2.js', '77980:78002');
        return new value(core);
    };
    __$coverCall('js/Jencil.0.1.2.js', '78012:78435');
    namespace('Jencil.ui.widgets.buttons', function (exports) {
        __$coverCall('js/Jencil.0.1.2.js', '78075:78104');
        exports.Separator = Separator;
        __$coverCall('js/Jencil.0.1.2.js', '78110:78133');
        exports.Button = Button;
        __$coverCall('js/Jencil.0.1.2.js', '78139:78174');
        exports.ActionButton = ActionButton;
        __$coverCall('js/Jencil.0.1.2.js', '78180:78217');
        exports.CommandButton = CommandButton;
        __$coverCall('js/Jencil.0.1.2.js', '78223:78254');
        exports.UndoButton = UndoButton;
        __$coverCall('js/Jencil.0.1.2.js', '78260:78291');
        exports.RedoButton = RedoButton;
        __$coverCall('js/Jencil.0.1.2.js', '78297:78340');
        exports.FullscreenButton = FullscreenButton;
        __$coverCall('js/Jencil.0.1.2.js', '78346:78381');
        exports.ViewerButton = ViewerButton;
        __$coverCall('js/Jencil.0.1.2.js', '78387:78429');
        return exports.HelperButton = HelperButton;
    });
    __$coverCall('js/Jencil.0.1.2.js', '78440:81197');
    Wrapper = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '78475:78501');
        __extends(Wrapper, _super);
        __$coverCall('js/Jencil.0.1.2.js', '78508:78823');
        function Wrapper(core, width, height) {
            __$coverCall('js/Jencil.0.1.2.js', '78554:78600');
            Wrapper.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.0.1.2.js', '78608:78647');
            this.element.addClass('jencil wrapper');
            __$coverCall('js/Jencil.0.1.2.js', '78655:78680');
            this.element.width(width);
            __$coverCall('js/Jencil.0.1.2.js', '78688:78715');
            this.element.height(height);
            __$coverCall('js/Jencil.0.1.2.js', '78723:78764');
            this.workspace = new Workspace(this.core);
            __$coverCall('js/Jencil.0.1.2.js', '78772:78817');
            this.workspace.element.appendTo(this.element);
        }
        __$coverCall('js/Jencil.0.1.2.js', '78830:80920');
        Wrapper.prototype.init = function () {
            __$coverCall('js/Jencil.0.1.2.js', '78874:78890');
            var _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '78898:80877');
            if (this.element.resizable != null && this.core.options.resizable === true) {
                __$coverCall('js/Jencil.0.1.2.js', '78986:80869');
                this.element.resizable({
                    start: function () {
                        __$coverCall('js/Jencil.0.1.2.js', '79053:79096');
                        var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
                        __$coverCall('js/Jencil.0.1.2.js', '79110:79262');
                        if ((_ref = _this.core.editor()) != null) {
                            __$coverCall('js/Jencil.0.1.2.js', '79168:79248');
                            if ((_ref1 = _ref.curtain) != null) {
                                __$coverCall('js/Jencil.0.1.2.js', '79222:79232');
                                _ref1.on();
                            }
                        }
                        __$coverCall('js/Jencil.0.1.2.js', '79276:79430');
                        if ((_ref2 = _this.core.viewer()) != null) {
                            __$coverCall('js/Jencil.0.1.2.js', '79335:79416');
                            if ((_ref3 = _ref2.curtain) != null) {
                                __$coverCall('js/Jencil.0.1.2.js', '79390:79400');
                                _ref3.on();
                            }
                        }
                        __$coverCall('js/Jencil.0.1.2.js', '79444:79553');
                        return (_ref4 = _this.core.helper()) != null ? (_ref5 = _ref4.curtain) != null ? _ref5.on() : void 0 : void 0;
                    },
                    resize: function () {
                        __$coverCall('js/Jencil.0.1.2.js', '79611:79654');
                        var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
                        __$coverCall('js/Jencil.0.1.2.js', '79668:79825');
                        if ((_ref = _this.core.editor()) != null) {
                            __$coverCall('js/Jencil.0.1.2.js', '79726:79811');
                            if ((_ref1 = _ref.curtain) != null) {
                                __$coverCall('js/Jencil.0.1.2.js', '79780:79795');
                                _ref1.refresh();
                            }
                        }
                        __$coverCall('js/Jencil.0.1.2.js', '79839:79998');
                        if ((_ref2 = _this.core.viewer()) != null) {
                            __$coverCall('js/Jencil.0.1.2.js', '79898:79984');
                            if ((_ref3 = _ref2.curtain) != null) {
                                __$coverCall('js/Jencil.0.1.2.js', '79953:79968');
                                _ref3.refresh();
                            }
                        }
                        __$coverCall('js/Jencil.0.1.2.js', '80012:80171');
                        if ((_ref4 = _this.core.helper()) != null) {
                            __$coverCall('js/Jencil.0.1.2.js', '80071:80157');
                            if ((_ref5 = _ref4.curtain) != null) {
                                __$coverCall('js/Jencil.0.1.2.js', '80126:80141');
                                _ref5.refresh();
                            }
                        }
                        __$coverCall('js/Jencil.0.1.2.js', '80185:80206');
                        return _this.adjust();
                    },
                    stop: function () {
                        __$coverCall('js/Jencil.0.1.2.js', '80262:80305');
                        var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
                        __$coverCall('js/Jencil.0.1.2.js', '80319:80472');
                        if ((_ref = _this.core.editor()) != null) {
                            __$coverCall('js/Jencil.0.1.2.js', '80377:80458');
                            if ((_ref1 = _ref.curtain) != null) {
                                __$coverCall('js/Jencil.0.1.2.js', '80431:80442');
                                _ref1.off();
                            }
                        }
                        __$coverCall('js/Jencil.0.1.2.js', '80486:80641');
                        if ((_ref2 = _this.core.viewer()) != null) {
                            __$coverCall('js/Jencil.0.1.2.js', '80545:80627');
                            if ((_ref3 = _ref2.curtain) != null) {
                                __$coverCall('js/Jencil.0.1.2.js', '80600:80611');
                                _ref3.off();
                            }
                        }
                        __$coverCall('js/Jencil.0.1.2.js', '80655:80810');
                        if ((_ref4 = _this.core.helper()) != null) {
                            __$coverCall('js/Jencil.0.1.2.js', '80714:80796');
                            if ((_ref5 = _ref4.curtain) != null) {
                                __$coverCall('js/Jencil.0.1.2.js', '80769:80780');
                                _ref5.off();
                            }
                        }
                        __$coverCall('js/Jencil.0.1.2.js', '80824:80845');
                        return _this.adjust();
                    }
                });
            }
            __$coverCall('js/Jencil.0.1.2.js', '80885:80913');
            return this.workspace.init();
        };
        __$coverCall('js/Jencil.0.1.2.js', '80927:81162');
        Wrapper.prototype.adjust = function () {
            __$coverCall('js/Jencil.0.1.2.js', '80973:81034');
            this.workspace.element.outerWidth(true, this.element.width());
            __$coverCall('js/Jencil.0.1.2.js', '81042:81105');
            this.workspace.element.outerHeight(true, this.element.height());
            __$coverCall('js/Jencil.0.1.2.js', '81113:81136');
            this.workspace.adjust();
            __$coverCall('js/Jencil.0.1.2.js', '81144:81155');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '81169:81183');
        return Wrapper;
    }(Panel);
    __$coverCall('js/Jencil.0.1.2.js', '81202:84119');
    Workspace = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '81239:81267');
        __extends(Workspace, _super);
        __$coverCall('js/Jencil.0.1.2.js', '81274:81445');
        function Workspace(core) {
            __$coverCall('js/Jencil.0.1.2.js', '81307:81355');
            Workspace.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.0.1.2.js', '81363:81397');
            this.element.addClass('workspace');
            __$coverCall('js/Jencil.0.1.2.js', '81405:81439');
            this.profile(core.options.profile);
        }
        __$coverCall('js/Jencil.0.1.2.js', '81452:83004');
        Workspace.prototype.profile = function (profile) {
            __$coverCall('js/Jencil.0.1.2.js', '81508:81574');
            var button, _i, _j, _len, _len1, _ref, _ref1, _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '81582:82969');
            if (profile != null) {
                __$coverCall('js/Jencil.0.1.2.js', '81613:81713');
                if (typeof profile === 'string') {
                    __$coverCall('js/Jencil.0.1.2.js', '81658:81703');
                    profile = this.core.options.profiles[profile];
                }
                __$coverCall('js/Jencil.0.1.2.js', '81723:81771');
                profile = jQuery.extend(DefaultProfile, profile);
                __$coverCall('js/Jencil.0.1.2.js', '81781:81861');
                profile.defaultVolume = this.core.options.defaultVolume || profile.defaultVolume;
                __$coverCall('js/Jencil.0.1.2.js', '81871:81954');
                profile.defaultVolume2 = this.core.options.defaultVolume2 || profile.defaultVolume2;
                __$coverCall('js/Jencil.0.1.2.js', '81964:81984');
                this.element.empty();
                __$coverCall('js/Jencil.0.1.2.js', '81994:82057');
                this.mainPanel = new profile.mainPanelClass(this.core, profile);
                __$coverCall('js/Jencil.0.1.2.js', '82067:82177');
                this.mainPanel.editorPanel.change(function (value) {
                    __$coverCall('js/Jencil.0.1.2.js', '82129:82165');
                    return _this.core.element.val(value);
                });
                __$coverCall('js/Jencil.0.1.2.js', '82187:82224');
                this.toolbar = new Toolbar(this.core);
                __$coverCall('js/Jencil.0.1.2.js', '82234:82263');
                _ref = profile.toolbarButtons;
                __$coverCall('js/Jencil.0.1.2.js', '82273:82457');
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    __$coverCall('js/Jencil.0.1.2.js', '82335:82352');
                    button = _ref[_i];
                    __$coverCall('js/Jencil.0.1.2.js', '82364:82405');
                    button = buttonFactory(this.core, button);
                    __$coverCall('js/Jencil.0.1.2.js', '82417:82447');
                    this.toolbar.addButton(button);
                }
                __$coverCall('js/Jencil.0.1.2.js', '82467:82508');
                this.statusbar = new Statusbar(this.core);
                __$coverCall('js/Jencil.0.1.2.js', '82518:82550');
                _ref1 = profile.statusbarButtons;
                __$coverCall('js/Jencil.0.1.2.js', '82560:82750');
                for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                    __$coverCall('js/Jencil.0.1.2.js', '82625:82643');
                    button = _ref1[_j];
                    __$coverCall('js/Jencil.0.1.2.js', '82655:82696');
                    button = buttonFactory(this.core, button);
                    __$coverCall('js/Jencil.0.1.2.js', '82708:82740');
                    this.statusbar.addButton(button);
                }
                __$coverCall('js/Jencil.0.1.2.js', '82760:82801');
                this.element.append(this.toolbar.element);
                __$coverCall('js/Jencil.0.1.2.js', '82811:82854');
                this.element.append(this.mainPanel.element);
                __$coverCall('js/Jencil.0.1.2.js', '82864:82907');
                this.element.append(this.statusbar.element);
                __$coverCall('js/Jencil.0.1.2.js', '82917:82940');
                this._profile = profile;
                __$coverCall('js/Jencil.0.1.2.js', '82950:82961');
                return this;
            }
            __$coverCall('js/Jencil.0.1.2.js', '82977:82997');
            return this._profile;
        };
        __$coverCall('js/Jencil.0.1.2.js', '83011:83148');
        Workspace.prototype.init = function () {
            __$coverCall('js/Jencil.0.1.2.js', '83057:83076');
            this.toolbar.init();
            __$coverCall('js/Jencil.0.1.2.js', '83084:83105');
            this.statusbar.init();
            __$coverCall('js/Jencil.0.1.2.js', '83113:83141');
            return this.mainPanel.init();
        };
        __$coverCall('js/Jencil.0.1.2.js', '83155:83854');
        Workspace.prototype.adjust = function () {
            __$coverCall('js/Jencil.0.1.2.js', '83203:83223');
            var offset1, offset2;
            __$coverCall('js/Jencil.0.1.2.js', '83231:83290');
            this.toolbar.element.outerWidth(true, this.element.width());
            __$coverCall('js/Jencil.0.1.2.js', '83298:83359');
            this.statusbar.element.outerWidth(true, this.element.width());
            __$coverCall('js/Jencil.0.1.2.js', '83367:83428');
            this.mainPanel.element.outerWidth(true, this.element.width());
            __$coverCall('js/Jencil.0.1.2.js', '83436:83499');
            this.mainPanel.element.outerHeight(true, this.element.height());
            __$coverCall('js/Jencil.0.1.2.js', '83507:83530');
            this.mainPanel.adjust();
            __$coverCall('js/Jencil.0.1.2.js', '83538:83586');
            offset1 = this.toolbar.element.outerHeight(true);
            __$coverCall('js/Jencil.0.1.2.js', '83594:83644');
            offset2 = this.statusbar.element.outerHeight(true);
            __$coverCall('js/Jencil.0.1.2.js', '83652:83737');
            this.mainPanel.element.outerHeight(true, this.element.height() - (offset1 + offset2));
            __$coverCall('js/Jencil.0.1.2.js', '83745:83766');
            this.toolbar.adjust();
            __$coverCall('js/Jencil.0.1.2.js', '83774:83797');
            this.statusbar.adjust();
            __$coverCall('js/Jencil.0.1.2.js', '83805:83828');
            this.mainPanel.adjust();
            __$coverCall('js/Jencil.0.1.2.js', '83836:83847');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '83861:84082');
        Workspace.prototype.update = function (force) {
            __$coverCall('js/Jencil.0.1.2.js', '83914:84075');
            if (this.mainPanel.editorPanel && this.mainPanel.viewerPanel) {
                __$coverCall('js/Jencil.0.1.2.js', '83986:84067');
                return this.mainPanel.viewerPanel.update(this.mainPanel.editorPanel.val(), force);
            }
        };
        __$coverCall('js/Jencil.0.1.2.js', '84089:84105');
        return Workspace;
    }(Panel);
    __$coverCall('js/Jencil.0.1.2.js', '84124:84700');
    Bar = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '84155:84177');
        __extends(Bar, _super);
        __$coverCall('js/Jencil.0.1.2.js', '84184:84285');
        function Bar(core) {
            __$coverCall('js/Jencil.0.1.2.js', '84211:84253');
            Bar.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.0.1.2.js', '84261:84279');
            this._buttons = [];
        }
        __$coverCall('js/Jencil.0.1.2.js', '84292:84528');
        Bar.prototype.init = function () {
            __$coverCall('js/Jencil.0.1.2.js', '84332:84358');
            var button, _i, _len, _ref;
            __$coverCall('js/Jencil.0.1.2.js', '84366:84386');
            _ref = this._buttons;
            __$coverCall('js/Jencil.0.1.2.js', '84394:84502');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                __$coverCall('js/Jencil.0.1.2.js', '84454:84471');
                button = _ref[_i];
                __$coverCall('js/Jencil.0.1.2.js', '84481:84494');
                button.init();
            }
            __$coverCall('js/Jencil.0.1.2.js', '84510:84521');
            return this;
        };
        __$coverCall('js/Jencil.0.1.2.js', '84535:84669');
        Bar.prototype.addButton = function (button) {
            __$coverCall('js/Jencil.0.1.2.js', '84586:84612');
            this._buttons.push(button);
            __$coverCall('js/Jencil.0.1.2.js', '84620:84662');
            return this.element.append(button.element);
        };
        __$coverCall('js/Jencil.0.1.2.js', '84676:84686');
        return Bar;
    }(Panel);
    __$coverCall('js/Jencil.0.1.2.js', '84705:84929');
    Toolbar = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '84740:84766');
        __extends(Toolbar, _super);
        __$coverCall('js/Jencil.0.1.2.js', '84773:84896');
        function Toolbar(core) {
            __$coverCall('js/Jencil.0.1.2.js', '84804:84850');
            Toolbar.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.0.1.2.js', '84858:84890');
            this.element.addClass('toolbar');
        }
        __$coverCall('js/Jencil.0.1.2.js', '84903:84917');
        return Toolbar;
    }(Bar);
    __$coverCall('js/Jencil.0.1.2.js', '84934:85170');
    Statusbar = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '84971:84999');
        __extends(Statusbar, _super);
        __$coverCall('js/Jencil.0.1.2.js', '85006:85135');
        function Statusbar(core) {
            __$coverCall('js/Jencil.0.1.2.js', '85039:85087');
            Statusbar.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.0.1.2.js', '85095:85129');
            this.element.addClass('statusbar');
        }
        __$coverCall('js/Jencil.0.1.2.js', '85142:85158');
        return Statusbar;
    }(Bar);
    __$coverCall('js/Jencil.0.1.2.js', '85175:85439');
    MonomainPanel = function () {
        __$coverCall('js/Jencil.0.1.2.js', '85210:85403');
        function MonomainPanel(core, profile) {
            __$coverCall('js/Jencil.0.1.2.js', '85256:85271');
            var editorPanel;
            __$coverCall('js/Jencil.0.1.2.js', '85279:85322');
            editorPanel = new profile.editorClass(core);
            __$coverCall('js/Jencil.0.1.2.js', '85330:85371');
            editorPanel.element.addClass('mainPanel');
            __$coverCall('js/Jencil.0.1.2.js', '85379:85397');
            return editorPanel;
        }
        __$coverCall('js/Jencil.0.1.2.js', '85410:85430');
        return MonomainPanel;
    }();
    __$coverCall('js/Jencil.0.1.2.js', '85444:86010');
    DimainPanel = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '85483:85513');
        __extends(DimainPanel, _super);
        __$coverCall('js/Jencil.0.1.2.js', '85520:85963');
        function DimainPanel(core, profile) {
            __$coverCall('js/Jencil.0.1.2.js', '85564:85580');
            var _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '85588:85636');
            this.editorPanel = new profile.editorClass(core);
            __$coverCall('js/Jencil.0.1.2.js', '85644:85692');
            this.viewerPanel = new profile.viewerClass(core);
            __$coverCall('js/Jencil.0.1.2.js', '85700:85809');
            DimainPanel.__super__.constructor.call(this, core, this.editorPanel, this.viewerPanel, profile.defaultVolume);
            __$coverCall('js/Jencil.0.1.2.js', '85817:85851');
            this.element.addClass('mainPanel');
            __$coverCall('js/Jencil.0.1.2.js', '85859:85957');
            this.editorPanel.change(function (value) {
                __$coverCall('js/Jencil.0.1.2.js', '85909:85947');
                return _this.viewerPanel.update(value);
            });
        }
        __$coverCall('js/Jencil.0.1.2.js', '85970:85988');
        return DimainPanel;
    }(VerticalPanel);
    __$coverCall('js/Jencil.0.1.2.js', '86015:86758');
    TrimainPanel = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '86055:86086');
        __extends(TrimainPanel, _super);
        __$coverCall('js/Jencil.0.1.2.js', '86093:86708');
        function TrimainPanel(core, profile) {
            __$coverCall('js/Jencil.0.1.2.js', '86138:86154');
            var _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '86162:86210');
            this.editorPanel = new profile.editorClass(core);
            __$coverCall('js/Jencil.0.1.2.js', '86218:86266');
            this.viewerPanel = new profile.viewerClass(core);
            __$coverCall('js/Jencil.0.1.2.js', '86274:86322');
            this.helperPanel = new profile.helperClass(core);
            __$coverCall('js/Jencil.0.1.2.js', '86330:86433');
            this.verticalPanel = new VerticalPanel(core, this.editorPanel, this.viewerPanel, profile.defaultVolume);
            __$coverCall('js/Jencil.0.1.2.js', '86441:86554');
            TrimainPanel.__super__.constructor.call(this, core, this.verticalPanel, this.helperPanel, profile.defaultVolume2);
            __$coverCall('js/Jencil.0.1.2.js', '86562:86596');
            this.element.addClass('mainPanel');
            __$coverCall('js/Jencil.0.1.2.js', '86604:86702');
            this.editorPanel.change(function (value) {
                __$coverCall('js/Jencil.0.1.2.js', '86654:86692');
                return _this.viewerPanel.update(value);
            });
        }
        __$coverCall('js/Jencil.0.1.2.js', '86715:86734');
        return TrimainPanel;
    }(HorizontalPanel);
    __$coverCall('js/Jencil.0.1.2.js', '86763:86955');
    namespace('Jencil.ui.widgets.panels', function (exports) {
        __$coverCall('js/Jencil.0.1.2.js', '86825:86862');
        exports.MonomainPanel = MonomainPanel;
        __$coverCall('js/Jencil.0.1.2.js', '86868:86901');
        exports.DimainPanel = DimainPanel;
        __$coverCall('js/Jencil.0.1.2.js', '86907:86949');
        return exports.TrimainPanel = TrimainPanel;
    });
    __$coverCall('js/Jencil.0.1.2.js', '86960:89796');
    Fullscreen = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '86998:87027');
        __extends(Fullscreen, _super);
        __$coverCall('js/Jencil.0.1.2.js', '87034:88307');
        function Fullscreen(core) {
            __$coverCall('js/Jencil.0.1.2.js', '87068:87084');
            var _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '87092:87141');
            Fullscreen.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.0.1.2.js', '87149:87184');
            this.element.addClass('fullscreen');
            __$coverCall('js/Jencil.0.1.2.js', '87192:87339');
            this.element.css({
                'position': 'fixed',
                'top': '0',
                'left': '0',
                'width': '100%',
                'height': '100%'
            });
            __$coverCall('js/Jencil.0.1.2.js', '87347:87392');
            this.curtain = $('<div>').addClass('curtain');
            __$coverCall('js/Jencil.0.1.2.js', '87400:87636');
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
            __$coverCall('js/Jencil.0.1.2.js', '87644:87804');
            this.cell = $('<div>').css({
                'position': 'absolute',
                'top': '5%',
                'left': '5%',
                'width': '90%',
                'height': '90%'
            });
            __$coverCall('js/Jencil.0.1.2.js', '87812:88033');
            if ($.browser.msie && $.browser.version < 7) {
                __$coverCall('js/Jencil.0.1.2.js', '87867:87907');
                this.element.css('position', 'absolute');
                __$coverCall('js/Jencil.0.1.2.js', '87917:88025');
                $(window).scroll(function () {
                    __$coverCall('js/Jencil.0.1.2.js', '87957:88013');
                    return _this.element.css('top', $(document).scrollTop());
                });
            }
            __$coverCall('js/Jencil.0.1.2.js', '88041:88109');
            this.curtain.click(function () {
                __$coverCall('js/Jencil.0.1.2.js', '88081:88099');
                return _this.off();
            });
            __$coverCall('js/Jencil.0.1.2.js', '88117:88150');
            this.element.append(this.curtain);
            __$coverCall('js/Jencil.0.1.2.js', '88158:88188');
            this.element.append(this.cell);
            __$coverCall('js/Jencil.0.1.2.js', '88196:88215');
            this.element.hide();
            __$coverCall('js/Jencil.0.1.2.js', '88223:88301');
            this.resize = function () {
                __$coverCall('js/Jencil.0.1.2.js', '88258:88292');
                return _this.core.wrapper.adjust();
            };
        }
        __$coverCall('js/Jencil.0.1.2.js', '88314:89014');
        Fullscreen.prototype.on = function () {
            __$coverCall('js/Jencil.0.1.2.js', '88359:88390');
            var ratio, _this = this;
            __$coverCall('js/Jencil.0.1.2.js', '88398:88414');
            ratio = 9 / 10;
            __$coverCall('js/Jencil.0.1.2.js', '88422:88465');
            this.cell.append(this.core.wrapper.element);
            __$coverCall('js/Jencil.0.1.2.js', '88473:88545');
            this.core.wrapper.element.outerWidth(true, this.element.width() * ratio);
            __$coverCall('js/Jencil.0.1.2.js', '88553:88627');
            this.core.wrapper.element.outerHeight(true, this.element.height() * ratio);
            __$coverCall('js/Jencil.0.1.2.js', '88635:88659');
            this.core.wrapper.init();
            __$coverCall('js/Jencil.0.1.2.js', '88667:88693');
            this.core.wrapper.adjust();
            __$coverCall('js/Jencil.0.1.2.js', '88701:88741');
            this.core.wrapper.workspace.update(true);
            __$coverCall('js/Jencil.0.1.2.js', '88749:88957');
            this.element.fadeIn('fast', function () {
                __$coverCall('js/Jencil.0.1.2.js', '88798:88845');
                _this.core.wrapper.element.css('width', '100%');
                __$coverCall('js/Jencil.0.1.2.js', '88855:88903');
                _this.core.wrapper.element.css('height', '100%');
                __$coverCall('js/Jencil.0.1.2.js', '88913:88947');
                return _this.core.wrapper.adjust();
            });
            __$coverCall('js/Jencil.0.1.2.js', '88965:89007');
            return $(window).on('resize', this.resize);
        };
        __$coverCall('js/Jencil.0.1.2.js', '89021:89429');
        Fullscreen.prototype.off = function () {
            __$coverCall('js/Jencil.0.1.2.js', '89067:89117');
            this.core.element.after(this.core.wrapper.element);
            __$coverCall('js/Jencil.0.1.2.js', '89125:89167');
            this.core.wrapper.element.css('width', '');
            __$coverCall('js/Jencil.0.1.2.js', '89175:89218');
            this.core.wrapper.element.css('height', '');
            __$coverCall('js/Jencil.0.1.2.js', '89226:89250');
            this.core.wrapper.init();
            __$coverCall('js/Jencil.0.1.2.js', '89258:89284');
            this.core.wrapper.adjust();
            __$coverCall('js/Jencil.0.1.2.js', '89292:89332');
            this.core.wrapper.workspace.update(true);
            __$coverCall('js/Jencil.0.1.2.js', '89340:89368');
            this.element.fadeOut('fast');
            __$coverCall('js/Jencil.0.1.2.js', '89376:89422');
            return $(window).unbind('resize', this.resize);
        };
        __$coverCall('js/Jencil.0.1.2.js', '89436:89758');
        Fullscreen.prototype.toggle = function (callbackOn, callbackOff) {
            __$coverCall('js/Jencil.0.1.2.js', '89508:89751');
            if (this.element.is(':visible')) {
                __$coverCall('js/Jencil.0.1.2.js', '89551:89561');
                this.off();
                __$coverCall('js/Jencil.0.1.2.js', '89571:89636');
                return typeof callbackOff === 'function' ? callbackOff() : void 0;
            } else {
                __$coverCall('js/Jencil.0.1.2.js', '89661:89670');
                this.on();
                __$coverCall('js/Jencil.0.1.2.js', '89680:89743');
                return typeof callbackOn === 'function' ? callbackOn() : void 0;
            }
        };
        __$coverCall('js/Jencil.0.1.2.js', '89765:89782');
        return Fullscreen;
    }(Panel);
    __$coverCall('js/Jencil.0.1.2.js', '89801:91507');
    autoIndentableHtml = function () {
        __$coverCall('js/Jencil.0.1.2.js', '89840:89866');
        var PATTERNS, post, pre, x;
        __$coverCall('js/Jencil.0.1.2.js', '89872:90198');
        PATTERNS = function () {
            __$coverCall('js/Jencil.0.1.2.js', '89903:89931');
            var _i, _len, _ref, _results;
            __$coverCall('js/Jencil.0.1.2.js', '89939:89957');
            _ref = [
                'p',
                'li'
            ];
            __$coverCall('js/Jencil.0.1.2.js', '89965:89978');
            _results = [];
            __$coverCall('js/Jencil.0.1.2.js', '89986:90165');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                __$coverCall('js/Jencil.0.1.2.js', '90046:90058');
                x = _ref[_i];
                __$coverCall('js/Jencil.0.1.2.js', '90068:90157');
                _results.push([
                    x,
                    new RegExp('^[s\t]*<' + x + '>'),
                    new RegExp('</' + x + '>[s\t]*$')
                ]);
            }
            __$coverCall('js/Jencil.0.1.2.js', '90173:90188');
            return _results;
        }();
        __$coverCall('js/Jencil.0.1.2.js', '90204:90645');
        pre = function (e, line) {
            __$coverCall('js/Jencil.0.1.2.js', '90236:90268');
            var lineCaret, pattern, _i, _len;
            __$coverCall('js/Jencil.0.1.2.js', '90276:90298');
            console.log('@', this);
            __$coverCall('js/Jencil.0.1.2.js', '90306:90346');
            if (e.shiftKey) {
                __$coverCall('js/Jencil.0.1.2.js', '90332:90338');
                return;
            }
            __$coverCall('js/Jencil.0.1.2.js', '90354:90638');
            for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {
                __$coverCall('js/Jencil.0.1.2.js', '90418:90440');
                pattern = PATTERNS[_i];
                __$coverCall('js/Jencil.0.1.2.js', '90450:90630');
                if (pattern[1].test(line) || pattern[2].test(line)) {
                    __$coverCall('js/Jencil.0.1.2.js', '90514:90556');
                    lineCaret = this.selection._getLineCaret();
                    __$coverCall('js/Jencil.0.1.2.js', '90568:90602');
                    this.selection.caret(lineCaret[1]);
                    __$coverCall('js/Jencil.0.1.2.js', '90614:90620');
                    return;
                }
            }
        };
        __$coverCall('js/Jencil.0.1.2.js', '90651:91096');
        post = function (e, line, indent, insert) {
            __$coverCall('js/Jencil.0.1.2.js', '90700:90721');
            var pattern, _i, _len;
            __$coverCall('js/Jencil.0.1.2.js', '90729:90769');
            if (e.shiftKey) {
                __$coverCall('js/Jencil.0.1.2.js', '90755:90761');
                return;
            }
            __$coverCall('js/Jencil.0.1.2.js', '90777:91089');
            for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {
                __$coverCall('js/Jencil.0.1.2.js', '90841:90863');
                pattern = PATTERNS[_i];
                __$coverCall('js/Jencil.0.1.2.js', '90873:91081');
                if (pattern[2].test(line)) {
                    __$coverCall('js/Jencil.0.1.2.js', '90912:90926');
                    x = pattern[0];
                    __$coverCall('js/Jencil.0.1.2.js', '90938:90998');
                    this.selection.insertAfter('<' + x + '></' + x + '>', false);
                    __$coverCall('js/Jencil.0.1.2.js', '91010:91053');
                    this.selection.caretOffset(-(3 + x.length));
                    __$coverCall('js/Jencil.0.1.2.js', '91065:91071');
                    return;
                }
            }
        };
        __$coverCall('js/Jencil.0.1.2.js', '91102:91499');
        return function (textarea) {
            __$coverCall('js/Jencil.0.1.2.js', '91136:91225');
            if (!(textarea.autoIndent != null)) {
                __$coverCall('js/Jencil.0.1.2.js', '91182:91217');
                textarea = autoIndentable(textarea);
            }
            __$coverCall('js/Jencil.0.1.2.js', '91233:91330');
            textarea.autoIndent.pre = function (e, line) {
                __$coverCall('js/Jencil.0.1.2.js', '91287:91321');
                return pre.call(textarea, e, line);
            };
            __$coverCall('js/Jencil.0.1.2.js', '91338:91469');
            textarea.autoIndent.post = function (e, line, indent, insert) {
                __$coverCall('js/Jencil.0.1.2.js', '91409:91460');
                return post.call(textarea, e, line, indent, insert);
            };
            __$coverCall('js/Jencil.0.1.2.js', '91477:91492');
            return textarea;
        };
    }();
    __$coverCall('js/Jencil.0.1.2.js', '91512:92206');
    headerMarkup = function () {
        __$coverCall('js/Jencil.0.1.2.js', '91545:91556');
        var PATTERN;
        __$coverCall('js/Jencil.0.1.2.js', '91562:91614');
        PATTERN = new RegExp('^<h([1-6])>(.*)</h[1-6]>\n?$');
        __$coverCall('js/Jencil.0.1.2.js', '91620:92198');
        return function (n) {
            __$coverCall('js/Jencil.0.1.2.js', '91647:91675');
            var caret, replacement, text;
            __$coverCall('js/Jencil.0.1.2.js', '91683:91722');
            caret = this.textarea.selection.caret();
            __$coverCall('js/Jencil.0.1.2.js', '91730:91823');
            if (caret[0] === caret[1]) {
                __$coverCall('js/Jencil.0.1.2.js', '91767:91815');
                this.textarea.selection.selectWholeCurrentLine();
            }
            __$coverCall('js/Jencil.0.1.2.js', '91831:91854');
            text = this.selection();
            __$coverCall('js/Jencil.0.1.2.js', '91862:92191');
            if (PATTERN.test(text)) {
                __$coverCall('js/Jencil.0.1.2.js', '91896:92060');
                if (RegExp.$1 === n.toString()) {
                    __$coverCall('js/Jencil.0.1.2.js', '91940:91963');
                    replacement = RegExp.$2;
                } else {
                    __$coverCall('js/Jencil.0.1.2.js', '91992:92050');
                    replacement = '<h' + n + '>' + RegExp.$2 + '</h' + n + '>';
                }
                __$coverCall('js/Jencil.0.1.2.js', '92070:92104');
                return this.selection(replacement);
            } else {
                __$coverCall('js/Jencil.0.1.2.js', '92129:92183');
                return this.enclose('<h' + n + '>', '</h' + n + '>\n');
            }
        };
    }();
    __$coverCall('js/Jencil.0.1.2.js', '92211:95832');
    HtmlEditor = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '92249:92278');
        __extends(HtmlEditor, _super);
        __$coverCall('js/Jencil.0.1.2.js', '92285:92431');
        function HtmlEditor(core) {
            __$coverCall('js/Jencil.0.1.2.js', '92319:92368');
            HtmlEditor.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.0.1.2.js', '92376:92425');
            this.textarea = autoIndentableHtml(this.textarea);
        }
        __$coverCall('js/Jencil.0.1.2.js', '92438:92523');
        HtmlEditor.prototype.h1 = function () {
            __$coverCall('js/Jencil.0.1.2.js', '92483:92516');
            return headerMarkup.call(this, 1);
        };
        __$coverCall('js/Jencil.0.1.2.js', '92530:92615');
        HtmlEditor.prototype.h2 = function () {
            __$coverCall('js/Jencil.0.1.2.js', '92575:92608');
            return headerMarkup.call(this, 2);
        };
        __$coverCall('js/Jencil.0.1.2.js', '92622:92707');
        HtmlEditor.prototype.h3 = function () {
            __$coverCall('js/Jencil.0.1.2.js', '92667:92700');
            return headerMarkup.call(this, 3);
        };
        __$coverCall('js/Jencil.0.1.2.js', '92714:92799');
        HtmlEditor.prototype.h4 = function () {
            __$coverCall('js/Jencil.0.1.2.js', '92759:92792');
            return headerMarkup.call(this, 4);
        };
        __$coverCall('js/Jencil.0.1.2.js', '92806:92891');
        HtmlEditor.prototype.h5 = function () {
            __$coverCall('js/Jencil.0.1.2.js', '92851:92884');
            return headerMarkup.call(this, 5);
        };
        __$coverCall('js/Jencil.0.1.2.js', '92898:92983');
        HtmlEditor.prototype.h6 = function () {
            __$coverCall('js/Jencil.0.1.2.js', '92943:92976');
            return headerMarkup.call(this, 6);
        };
        __$coverCall('js/Jencil.0.1.2.js', '92990:93078');
        HtmlEditor.prototype.bold = function () {
            __$coverCall('js/Jencil.0.1.2.js', '93037:93071');
            return this.enclose('<b>', '</b>');
        };
        __$coverCall('js/Jencil.0.1.2.js', '93085:93175');
        HtmlEditor.prototype.italic = function () {
            __$coverCall('js/Jencil.0.1.2.js', '93134:93168');
            return this.enclose('<i>', '</i>');
        };
        __$coverCall('js/Jencil.0.1.2.js', '93182:93275');
        HtmlEditor.prototype.underline = function () {
            __$coverCall('js/Jencil.0.1.2.js', '93234:93268');
            return this.enclose('<u>', '</u>');
        };
        __$coverCall('js/Jencil.0.1.2.js', '93282:93372');
        HtmlEditor.prototype.strike = function () {
            __$coverCall('js/Jencil.0.1.2.js', '93331:93365');
            return this.enclose('<s>', '</s>');
        };
        __$coverCall('js/Jencil.0.1.2.js', '93379:93478');
        HtmlEditor.prototype.superscript = function () {
            __$coverCall('js/Jencil.0.1.2.js', '93433:93471');
            return this.enclose('<sup>', '</sup>');
        };
        __$coverCall('js/Jencil.0.1.2.js', '93485:93582');
        HtmlEditor.prototype.subscript = function () {
            __$coverCall('js/Jencil.0.1.2.js', '93537:93575');
            return this.enclose('<sub>', '</sub>');
        };
        __$coverCall('js/Jencil.0.1.2.js', '93589:93678');
        HtmlEditor.prototype.quote = function () {
            __$coverCall('js/Jencil.0.1.2.js', '93637:93671');
            return this.enclose('<q>', '</q>');
        };
        __$coverCall('js/Jencil.0.1.2.js', '93685:93801');
        HtmlEditor.prototype.blockquote = function () {
            __$coverCall('js/Jencil.0.1.2.js', '93738:93794');
            return this.enclose('\n<blockquote>', '</blockquote>\n');
        };
        __$coverCall('js/Jencil.0.1.2.js', '93808:93902');
        HtmlEditor.prototype.code = function () {
            __$coverCall('js/Jencil.0.1.2.js', '93855:93895');
            return this.enclose('<code>', '</code>');
        };
        __$coverCall('js/Jencil.0.1.2.js', '93909:94000');
        HtmlEditor.prototype.pre = function () {
            __$coverCall('js/Jencil.0.1.2.js', '93955:93993');
            return this.enclose('<pre>', '</pre>');
        };
        __$coverCall('js/Jencil.0.1.2.js', '94007:94396');
        HtmlEditor.prototype.anchorLink = function () {
            __$coverCall('js/Jencil.0.1.2.js', '94060:94074');
            var href, text;
            __$coverCall('js/Jencil.0.1.2.js', '94082:94105');
            text = this.selection();
            __$coverCall('js/Jencil.0.1.2.js', '94113:94198');
            if (!text) {
                __$coverCall('js/Jencil.0.1.2.js', '94134:94190');
                text = window.prompt('Please input a link text', 'Here');
            }
            __$coverCall('js/Jencil.0.1.2.js', '94206:94264');
            href = window.prompt('Please input a link url', 'http://');
            __$coverCall('js/Jencil.0.1.2.js', '94272:94317');
            if (!(href != null)) {
                __$coverCall('js/Jencil.0.1.2.js', '94303:94309');
                return;
            }
            __$coverCall('js/Jencil.0.1.2.js', '94325:94389');
            return this.selection('<a href=\'' + href + '\'>' + text + '</a>');
        };
        __$coverCall('js/Jencil.0.1.2.js', '94403:94739');
        HtmlEditor.prototype.image = function () {
            __$coverCall('js/Jencil.0.1.2.js', '94451:94463');
            var alt, src;
            __$coverCall('js/Jencil.0.1.2.js', '94471:94529');
            src = window.prompt('Please input a image url', 'http://');
            __$coverCall('js/Jencil.0.1.2.js', '94537:94606');
            alt = window.prompt('(Optional) Please input a alt message', 'Image');
            __$coverCall('js/Jencil.0.1.2.js', '94614:94658');
            if (!(src != null)) {
                __$coverCall('js/Jencil.0.1.2.js', '94644:94650');
                return;
            }
            __$coverCall('js/Jencil.0.1.2.js', '94666:94732');
            return this.selection('<img src=\'' + src + '\' alt=\'' + alt + '\'>');
        };
        __$coverCall('js/Jencil.0.1.2.js', '94746:95252');
        HtmlEditor.prototype.unorderedList = function () {
            __$coverCall('js/Jencil.0.1.2.js', '94802:94813');
            var text, x;
            __$coverCall('js/Jencil.0.1.2.js', '94821:94844');
            text = this.selection();
            __$coverCall('js/Jencil.0.1.2.js', '94852:95145');
            text = function () {
                __$coverCall('js/Jencil.0.1.2.js', '94881:94909');
                var _i, _len, _ref, _results;
                __$coverCall('js/Jencil.0.1.2.js', '94919:94942');
                _ref = text.split('\n');
                __$coverCall('js/Jencil.0.1.2.js', '94952:94965');
                _results = [];
                __$coverCall('js/Jencil.0.1.2.js', '94975:95108');
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    __$coverCall('js/Jencil.0.1.2.js', '95037:95049');
                    x = _ref[_i];
                    __$coverCall('js/Jencil.0.1.2.js', '95061:95098');
                    _results.push('  <li>' + x + '</li>');
                }
                __$coverCall('js/Jencil.0.1.2.js', '95118:95133');
                return _results;
            }();
            __$coverCall('js/Jencil.0.1.2.js', '95153:95173');
            text.unshift('<ul>');
            __$coverCall('js/Jencil.0.1.2.js', '95181:95199');
            text.push('</ul>');
            __$coverCall('js/Jencil.0.1.2.js', '95207:95245');
            return this.selection(text.join('\n'));
        };
        __$coverCall('js/Jencil.0.1.2.js', '95259:95763');
        HtmlEditor.prototype.orderedList = function () {
            __$coverCall('js/Jencil.0.1.2.js', '95313:95324');
            var text, x;
            __$coverCall('js/Jencil.0.1.2.js', '95332:95355');
            text = this.selection();
            __$coverCall('js/Jencil.0.1.2.js', '95363:95656');
            text = function () {
                __$coverCall('js/Jencil.0.1.2.js', '95392:95420');
                var _i, _len, _ref, _results;
                __$coverCall('js/Jencil.0.1.2.js', '95430:95453');
                _ref = text.split('\n');
                __$coverCall('js/Jencil.0.1.2.js', '95463:95476');
                _results = [];
                __$coverCall('js/Jencil.0.1.2.js', '95486:95619');
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    __$coverCall('js/Jencil.0.1.2.js', '95548:95560');
                    x = _ref[_i];
                    __$coverCall('js/Jencil.0.1.2.js', '95572:95609');
                    _results.push('  <li>' + x + '</li>');
                }
                __$coverCall('js/Jencil.0.1.2.js', '95629:95644');
                return _results;
            }();
            __$coverCall('js/Jencil.0.1.2.js', '95664:95684');
            text.unshift('<ol>');
            __$coverCall('js/Jencil.0.1.2.js', '95692:95710');
            text.push('</ol>');
            __$coverCall('js/Jencil.0.1.2.js', '95718:95756');
            return this.selection(text.join('\n'));
        };
        __$coverCall('js/Jencil.0.1.2.js', '95770:95787');
        return HtmlEditor;
    }(Jencil.ui.widgets.editors.TextEditor);
    __$coverCall('js/Jencil.0.1.2.js', '95837:95957');
    Jencil.utils.namespace('Jencil.ui.widgets.editors', function (exports) {
        __$coverCall('js/Jencil.0.1.2.js', '95913:95951');
        return exports.HtmlEditor = HtmlEditor;
    });
    __$coverCall('js/Jencil.0.1.2.js', '95962:96015');
    HtmlViewer = Jencil.ui.widgets.viewers.TemplateViewer;
    __$coverCall('js/Jencil.0.1.2.js', '96020:96140');
    Jencil.utils.namespace('Jencil.ui.widgets.viewers', function (exports) {
        __$coverCall('js/Jencil.0.1.2.js', '96096:96134');
        return exports.HtmlViewer = HtmlViewer;
    });
    __$coverCall('js/Jencil.0.1.2.js', '96145:97174');
    HtmlHelper = function (_super) {
        __$coverCall('js/Jencil.0.1.2.js', '96183:96212');
        __extends(HtmlHelper, _super);
        __$coverCall('js/Jencil.0.1.2.js', '96219:97105');
        function HtmlHelper(core) {
            __$coverCall('js/Jencil.0.1.2.js', '96253:96273');
            var HTML_HELPER_HTML;
            __$coverCall('js/Jencil.0.1.2.js', '96281:96330');
            HtmlHelper.__super__.constructor.call(this, core);
            __$coverCall('js/Jencil.0.1.2.js', '96338:97056');
            HTML_HELPER_HTML = '<p><span class="key">Ctrl+Z</span>' + Jencil.t('Undo') + '<p>\n<p><span class="key">Ctrl+Shift+Z</span>' + Jencil.t('Undo') + '<p>\n<p><span class="key">Ctrl+B</span>' + Jencil.t('Make selected text property as <b>Bold</b>') + '<p>\n<p><span class="key">Ctrl+I</span>' + Jencil.t('Make selected text property as <i>Italic</i>') + '<p>\n<p><span class="key">Ctrl+U</span>' + Jencil.t('Underline selected text like <u>Underline</u>') + '<p>\n<p><span class="key">Ctrl+F</span>' + Jencil.t('Toggle fullscreen mode') + '<p>\n<p><span class="key">Ctrl+Q</span>' + Jencil.t('Toggle quick view') + '<p>\n<p><span class="key">Ctrl+H</span>' + Jencil.t('Toggle help') + '<p>';
            __$coverCall('js/Jencil.0.1.2.js', '97064:97099');
            this.element.html(HTML_HELPER_HTML);
        }
        __$coverCall('js/Jencil.0.1.2.js', '97112:97129');
        return HtmlHelper;
    }(Jencil.ui.widgets.helpers.BaseHelper);
    __$coverCall('js/Jencil.0.1.2.js', '97179:97286');
    namespace('Jencil.ui.widgets.helpers', function (exports) {
        __$coverCall('js/Jencil.0.1.2.js', '97242:97280');
        return exports.HtmlHelper = HtmlHelper;
    });
    __$coverCall('js/Jencil.0.1.2.js', '97291:98122');
    HtmlProfile = {
        mainPanelClass: Jencil.ui.widgets.panels.TrimainPanel,
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
    __$coverCall('js/Jencil.0.1.2.js', '98127:98239');
    Jencil.utils.namespace('Jencil.profiles', function (exports) {
        __$coverCall('js/Jencil.0.1.2.js', '98193:98233');
        return exports.HtmlProfile = HtmlProfile;
    });
}.call(this));