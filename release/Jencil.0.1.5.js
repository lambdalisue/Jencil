/**
 * Jencil 0.1.5
 *
 * Author:  lambdalisue
 * URL:     http://hashnote.net/
 * License: MIT License
 * 
 * Copyright (C) 2012 lambdalisue, hashnote.net allright reserved.
 *
 * This application include following Library inside
 * 
 * Tabby jQuery plugin version 0.12
 * Ted Devito - http://teddevito.com/demos/textarea.html
 * Copyright (c) 2009 Ted Devito
 *
 * shortcut.js
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */
/**
 * #{NAME} #{VERSION}
 *
 * Author:  lambdalisue
 * URL:     http://hashnote.net/
 * License: MIT License
 * 
 * Copyright (C) 2012 lambdalisue, hashnote.net allright reserved.
 *
 * This application include following Library inside
 * 
 * Tabby jQuery plugin version 0.12
 * Ted Devito - http://teddevito.com/demos/textarea.html
 * Copyright (c) 2009 Ted Devito
 *
 * shortcut.js
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */
/**
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */
shortcut = {
	'all_shortcuts':{},//All the shortcuts are stored in this array
	'add': function(shortcut_combination,callback,opt) {
		//Provide a set of default options
		var default_options = {
			'type':'keydown',
			'propagate':false,
			'disable_in_input':false,
			'target':document,
			'keycode':false
		}
		if(!opt) opt = default_options;
		else {
			for(var dfo in default_options) {
				if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
			}
		}

		var ele = opt.target;
		if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
		var ths = this;
		shortcut_combination = shortcut_combination.toLowerCase();

		//The function to be called at keypress
		var func = function(e) {
			e = e || window.event;
			
			if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
				var element;
				if(e.target) element=e.target;
				else if(e.srcElement) element=e.srcElement;
				if(element.nodeType==3) element=element.parentNode;

				if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
			}
	
			//Find Which key is pressed
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = String.fromCharCode(code).toLowerCase();
			
			if(code == 188) character=","; //If the user presses , when the type is onkeydown
			if(code == 190) character="."; //If the user presses , when the type is onkeydown

			var keys = shortcut_combination.split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp = 0;
			
			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			var shift_nums = {
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"^",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			}
			//Special Keys - and their codes
			var special_keys = {
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,
	
				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,
				
				'pause':19,
				'break':19,
				
				'insert':45,
				'home':36,
				'delete':46,
				'end':35,
				
				'pageup':33,
				'page_up':33,
				'pu':33,
	
				'pagedown':34,
				'page_down':34,
				'pd':34,
	
				'left':37,
				'up':38,
				'right':39,
				'down':40,
	
				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123
			}
	
			var modifiers = { 
				shift: { wanted:false, pressed:false},
				ctrl : { wanted:false, pressed:false},
				alt  : { wanted:false, pressed:false},
				meta : { wanted:false, pressed:false}	//Meta is Mac specific
			};
                        
			if(e.ctrlKey)	modifiers.ctrl.pressed = true;
			if(e.shiftKey)	modifiers.shift.pressed = true;
			if(e.altKey)	modifiers.alt.pressed = true;
			if(e.metaKey)   modifiers.meta.pressed = true;
                        
			for(var i=0; k=keys[i],i<keys.length; i++) {
				//Modifiers
				if(k == 'ctrl' || k == 'control') {
					kp++;
					modifiers.ctrl.wanted = true;

				} else if(k == 'shift') {
					kp++;
					modifiers.shift.wanted = true;

				} else if(k == 'alt') {
					kp++;
					modifiers.alt.wanted = true;
				} else if(k == 'meta') {
					kp++;
					modifiers.meta.wanted = true;
				} else if(k.length > 1) { //If it is a special key
					if(special_keys[k] == code) kp++;
					
				} else if(opt['keycode']) {
					if(opt['keycode'] == code) kp++;

				} else { //The special keys did not match
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
							character = shift_nums[character]; 
							if(character == k) kp++;
						}
					}
				}
			}
			
			if(kp == keys.length && 
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
				callback(e);
	
				if(!opt['propagate']) { //Stop the event
					//e.cancelBubble is supported by IE - this will kill the bubbling process.
					e.cancelBubble = true;
					e.returnValue = false;
	
					//e.stopPropagation works in Firefox.
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		this.all_shortcuts[shortcut_combination] = {
			'callback':func, 
			'target':ele, 
			'event': opt['type']
		};
		//Attach the function with the event
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
		else ele['on'+opt['type']] = func;
	},

	//Remove the shortcut - just specify the shortcut and I will remove the binding
	'remove':function(shortcut_combination) {
		shortcut_combination = shortcut_combination.toLowerCase();
		var binding = this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination])
		if(!binding) return;
		var type = binding['event'];
		var ele = binding['target'];
		var callback = binding['callback'];

		if(ele.detachEvent) ele.detachEvent('on'+type, callback);
		else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on'+type] = false;
	}
};

/**
 * #{NAME} #{VERSION}
 *
 * Author:  lambdalisue
 * URL:     http://hashnote.net/
 * License: MIT License
 * 
 * Copyright (C) 2012 lambdalisue, hashnote.net allright reserved.
 *
 * This application include following Library inside
 * 
 * Tabby jQuery plugin version 0.12
 * Ted Devito - http://teddevito.com/demos/textarea.html
 * Copyright (c) 2009 Ted Devito
 *
 *
 */
/*
 *	Tabby jQuery plugin version 0.12
 *
 *	Ted Devito - http://teddevito.com/demos/textarea.html
 *
 *	Copyright (c) 2009 Ted Devito
 *	 
 *	Fix: SHIFT+TAB feature in Gecko engine at 2012/09/19 by lambdalisue
 *
 *	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following 
 *	conditions are met:
 *	
 *		1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *		2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer  
 *			in the documentation and/or other materials provided with the distribution.
 *		3. The name of the author may not be used to endorse or promote products derived from this software without specific prior written 
 *			permission. 
 *	 
 *	THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE 
 *	IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE 
 *	LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, 
 *	PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY 
 *	THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT 
 *	OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
 
// create closure

(function($) {
 
	// plugin definition

	$.fn.tabby = function(options) {
		//debug(this);
		// build main options before element iteration
		var opts = $.extend({}, $.fn.tabby.defaults, options);
		var pressed = $.fn.tabby.pressed; 
		
		// iterate and reformat each matched element
		return this.each(function() {
			$this = $(this);
			
			// build element specific options
			var options = $.meta ? $.extend({}, opts, $this.data()) : opts;
			
			$this.bind('keydown',function (e) {
				var kc = $.fn.tabby.catch_kc(e);
				if (16 == kc) pressed.shft = true;
				/*
				because both CTRL+TAB and ALT+TAB default to an event (changing tab/window) that 
				will prevent js from capturing the keyup event, we'll set a timer on releasing them.
				*/
				if (17 == kc) {pressed.ctrl = true;	setTimeout("$.fn.tabby.pressed.ctrl = false;",1000);}
				if (18 == kc) {pressed.alt = true; 	setTimeout("$.fn.tabby.pressed.alt = false;",1000);}
					
				if (9 == kc && !pressed.ctrl && !pressed.alt) {
					e.preventDefault; // does not work in O9.63 ??
					pressed.last = kc;	setTimeout("$.fn.tabby.pressed.last = null;",0);
					process_keypress ($(e.target).get(0), pressed.shft, options);
					return false;
				}
				
			}).bind('keyup',function (e) {
				if (16 == $.fn.tabby.catch_kc(e)) pressed.shft = false;
			}).bind('blur',function (e) { // workaround for Opera -- http://www.webdeveloper.com/forum/showthread.php?p=806588
				if (9 == pressed.last) $(e.target).one('focus',function (e) {pressed.last = null;}).get(0).focus();
			});
		
		});
	};
	
	// define and expose any extra methods
	$.fn.tabby.catch_kc = function(e) { return e.keyCode ? e.keyCode : e.charCode ? e.charCode : e.which; };
	$.fn.tabby.pressed = {shft : false, ctrl : false, alt : false, last: null};
	
	// private function for debugging
	function debug($obj) {
		if (window.console && window.console.log)
		window.console.log('textarea count: ' + $obj.size());
	};

	function process_keypress (o,shft,options) {
		var scrollTo = o.scrollTop;
		//var tabString = String.fromCharCode(9);
		
		// gecko; o.setSelectionRange is only available when the text box has focus
		if (o.setSelectionRange) gecko_tab (o, shft, options);
		
		// ie; document.selection is always available
		else if (document.selection) ie_tab (o, shft, options);
		
		o.scrollTop = scrollTo;
	}
	
	// plugin defaults
	$.fn.tabby.defaults = {tabString : String.fromCharCode(9)};
	
	function gecko_tab (o, shft, options) {
		var ss = o.selectionStart;
		var es = o.selectionEnd;	
				
		// when there's no selection and we're just working with the caret, we'll add/remove the tabs at the caret, providing more control
		if(ss == es) {
			// SHIFT+TAB
			if (shft) {
				// check to the left of the caret first
				//if ("\t" == o.value.substring(ss-options.tabString.length, ss)) {
				if (options.tabString == o.value.substring(ss-options.tabString.length, ss)) {
					o.value = o.value.substring(0, ss-options.tabString.length) + o.value.substring(ss); // put it back together omitting one character to the left
					o.focus();
					o.setSelectionRange(ss - options.tabString.length, ss - options.tabString.length);
				} 
				// then check to the right of the caret
				//else if ("\t" == o.value.substring(ss, ss + options.tabString.length)) {
				else if (options.tabString == o.value.substring(ss, ss + options.tabString.length)) {
					o.value = o.value.substring(0, ss) + o.value.substring(ss + options.tabString.length); // put it back together omitting one character to the right
					o.focus();
					o.setSelectionRange(ss,ss);
				}
			}
			// TAB
			else {			
				o.value = o.value.substring(0, ss) + options.tabString + o.value.substring(ss);
				o.focus();
	    		o.setSelectionRange(ss + options.tabString.length, ss + options.tabString.length);
			}
		} 
		// selections will always add/remove tabs from the start of the line
		else {
			// split the textarea up into lines and figure out which lines are included in the selection
			var lines = o.value.split("\n");
			var indices = new Array();
			var sl = 0; // start of the line
			var el = 0; // end of the line
			var sel = false;
			for (var i in lines) {
				el = sl + lines[i].length;
				indices.push({start: sl, end: el, selected: (sl <= ss && el > ss) || (el >= es && sl < es) || (sl > ss && el < es)});
				sl = el + 1;// for "\n"
			}
			
			// walk through the array of lines (indices) and add tabs where appropriate						
			var modifier = 0;
			for (var i in indices) {
				if (indices[i].selected) {
					var pos = indices[i].start + modifier; // adjust for tabs already inserted/removed
					// SHIFT+TAB
					if (shft && options.tabString == o.value.substring(pos,pos+options.tabString.length)) { // only SHIFT+TAB if there's a tab at the start of the line
						o.value = o.value.substring(0,pos) + o.value.substring(pos + options.tabString.length); // omit the tabstring to the right
						modifier -= options.tabString.length;
					}
					// TAB
					else if (!shft) {
						o.value = o.value.substring(0,pos) + options.tabString + o.value.substring(pos); // insert the tabstring
						modifier += options.tabString.length;
					}
				}
			}
			o.focus();
			var ns = ss + ((modifier > 0) ? options.tabString.length : (modifier < 0) ? -options.tabString.length : 0);
			var ne = es + modifier;
			o.setSelectionRange(ns,ne);
		}
	}
	
	function ie_tab (o, shft, options) {
		var range = document.selection.createRange();
		
		if (o == range.parentElement()) {
			// when there's no selection and we're just working with the caret, we'll add/remove the tabs at the caret, providing more control
			if ('' == range.text) {
				// SHIFT+TAB
				if (shft) {
					var bookmark = range.getBookmark();
					//first try to the left by moving opening up our empty range to the left
				    range.moveStart('character', -options.tabString.length);
				    if (options.tabString == range.text) {
				    	range.text = '';
				    } else {
				    	// if that didn't work then reset the range and try opening it to the right
				    	range.moveToBookmark(bookmark);
				    	range.moveEnd('character', options.tabString.length);
				    	if (options.tabString == range.text) 
				    		range.text = '';
				    }
				    // move the pointer to the start of them empty range and select it
				    range.collapse(true);
					range.select();
				}
				
				else {
					// very simple here. just insert the tab into the range and put the pointer at the end
					range.text = options.tabString; 
					range.collapse(false);
					range.select();
				}
			}
			// selections will always add/remove tabs from the start of the line
			else {
			
				var selection_text = range.text;
				var selection_len = selection_text.length;
				var selection_arr = selection_text.split("\r\n");
				
				var before_range = document.body.createTextRange();
				before_range.moveToElementText(o);
				before_range.setEndPoint("EndToStart", range);
				var before_text = before_range.text;
				var before_arr = before_text.split("\r\n");
				var before_len = before_text.length; // - before_arr.length + 1;
				
				var after_range = document.body.createTextRange();
				after_range.moveToElementText(o);
				after_range.setEndPoint("StartToEnd", range);
				var after_text = after_range.text; // we can accurately calculate distance to the end because we're not worried about MSIE trimming a \r\n
				
				var end_range = document.body.createTextRange();
				end_range.moveToElementText(o);
				end_range.setEndPoint("StartToEnd", before_range);
				var end_text = end_range.text; // we can accurately calculate distance to the end because we're not worried about MSIE trimming a \r\n
								
				var check_html = $(o).html();
				$("#r3").text(before_len + " + " + selection_len + " + " + after_text.length + " = " + check_html.length);				
				if((before_len + end_text.length) < check_html.length) {
					before_arr.push("");
					before_len += 2; // for the \r\n that was trimmed	
					if (shft && options.tabString == selection_arr[0].substring(0,options.tabString.length))
						selection_arr[0] = selection_arr[0].substring(options.tabString.length);
					else if (!shft) selection_arr[0] = options.tabString + selection_arr[0];	
				} else {
					if (shft && options.tabString == before_arr[before_arr.length-1].substring(0,options.tabString.length)) 
						before_arr[before_arr.length-1] = before_arr[before_arr.length-1].substring(options.tabString.length);
					else if (!shft) before_arr[before_arr.length-1] = options.tabString + before_arr[before_arr.length-1];
				}
				
				for (var i = 1; i < selection_arr.length; i++) {
					if (shft && options.tabString == selection_arr[i].substring(0,options.tabString.length))
						selection_arr[i] = selection_arr[i].substring(options.tabString.length);
					else if (!shft) selection_arr[i] = options.tabString + selection_arr[i];
				}
				
				if (1 == before_arr.length && 0 == before_len) {
					if (shft && options.tabString == selection_arr[0].substring(0,options.tabString.length))
						selection_arr[0] = selection_arr[0].substring(options.tabString.length);
					else if (!shft) selection_arr[0] = options.tabString + selection_arr[0];
				}

				if ((before_len + selection_len + after_text.length) < check_html.length) {
					selection_arr.push("");
					selection_len += 2; // for the \r\n that was trimmed
				}
				
				before_range.text = before_arr.join("\r\n");
				range.text = selection_arr.join("\r\n");
				
				var new_range = document.body.createTextRange();
				new_range.moveToElementText(o);
				
				if (0 < before_len)	new_range.setEndPoint("StartToEnd", before_range);
				else new_range.setEndPoint("StartToStart", before_range);
				new_range.setEndPoint("EndToEnd", range);
				
				new_range.select();
				
			} 
		}
	}

// end of closure
})(jQuery);


(function() {
  var ActionButton, AjaxViewer, Bar, BaseEditor, BaseHelper, BaseViewer, Button, Caretaker, CommandButton, DefaultProfile, DimainPanel, Fullscreen, FullscreenButton, HelperButton, HorizontalPanel, HorizontalSplitter, HtmlEditor, HtmlHelper, HtmlProfile, HtmlViewer, MarkdownEditor, MarkdownJsViewer, MarkdownProfile, MonomainPanel, MultiPanel, MultiplePanel, NotImplementedError, Originator, Panel, RedoButton, Selection, Separator, Splitter, Statusbar, TemplateHelper, TemplateViewer, TextEditor, Toolbar, TrimainPanel, UndoButton, VerticalPanel, VerticalSplitter, ViewerButton, Widget, Workspace, Wrapper, animate, apply, autoIndentable, autoIndentableHtml, autoIndentableMarkdown, buttonFactory, curtainFactory, evolute, headerMarkup, namespace, strutils, translate,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  namespace = function(target, name, block) {
    var item, top, _i, _len, _ref, _ref1;
    if (arguments.length < 3) {
      _ref = [(typeof exports !== 'undefined' ? exports : window)].concat(__slice.call(arguments)), target = _ref[0], name = _ref[1], block = _ref[2];
    }
    top = target;
    _ref1 = name.split('.');
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      item = _ref1[_i];
      target = target[item] || (target[item] = {});
    }
    return block(target, top);
  };

  if (typeof window !== "undefined" && window !== null) {
    window.namespace = namespace;
  }

  if (typeof exports !== "undefined" && exports !== null) {
    exports.namespace = namespace;
  }

  strutils = {
    repeat: function(str, count) {
      var pattern, result;
      if (count < 1) {
        return '';
      }
      result = '';
      pattern = str.valueOf();
      while (count > 0) {
        if (count & 1) {
          result += pattern;
        }
        count >>= 1;
        pattern += pattern;
      }
      return result;
    },
    startsWith: function(str, prefix) {
      return str.lastIndexOf(prefix, 0) === 0;
    },
    endsWith: function(str, suffix) {
      var l;
      l = str.length - suffix.length;
      return l >= 0 && str.lastIndexOf(suffix, l) === l;
    },
    trimLeft: function(str) {
      return str.replace(/^\s+/g, '');
    },
    trimRight: function(str) {
      return str.replace(/\s+$/g, '');
    },
    trim: function(str) {
      return str.replace(/^\s+|\s+$/g, '');
    }
  };

  apply = function(object, name, fn) {
    if (!(object.prototype[name] != null)) {
      return object.prototype[name] = function() {
        var args;
        args = [this].concat(Array.prototype.slice.call(arguments));
        return fn.apply(this, args);
      };
    }
  };

  apply(String, 'repeat', strutils.repeat);

  apply(String, 'startsWith', strutils.startsWith);

  apply(String, 'endsWith', strutils.endsWith);

  apply(String, 'trimLeft', strutils.trimLeft);

  apply(String, 'trimRight', strutils.trimRight);

  apply(String, 'trim', strutils.trim);

  if (typeof exports !== "undefined" && exports !== null) {
    exports.strutils = strutils;
  }

  NotImplementedError = (function() {

    function NotImplementedError() {}

    NotImplementedError.prototype.name = 'Not implemeted error';

    NotImplementedError.prototype.message = 'The function has not implemented yet';

    return NotImplementedError;

  })();

  Originator = (function() {

    function Originator() {}

    Originator.prototype.createMemento = function() {
      throw new NotImplementedError;
    };

    Originator.prototype.setMemento = function(memento) {
      throw new NotImplementedError;
    };

    return Originator;

  })();

  Caretaker = (function() {

    function Caretaker(originator) {
      this._originator = originator;
      this._undoStack = [];
      this._redoStack = [];
    }

    Caretaker.prototype.originator = function(originator) {
      if (originator != null) {
        this._originator = originator;
        return this;
      }
      return this._originator;
    };

    Caretaker.prototype.save = function(memento) {
      memento = memento || this.originator().createMemento();
      this._undoStack.push(memento);
      this._redoStack = [];
      return this;
    };

    Caretaker.prototype.undo = function() {
      var originator;
      if (!this.canUndo()) {
        return false;
      }
      originator = this.originator();
      this._redoStack.push(originator.createMemento());
      originator.setMemento(this._undoStack.pop());
      if (typeof originator.focus === "function") {
        originator.focus();
      }
      return true;
    };

    Caretaker.prototype.redo = function() {
      var originator;
      if (!this.canRedo()) {
        return false;
      }
      originator = this.originator();
      this._undoStack.push(originator.createMemento());
      originator.setMemento(this._redoStack.pop());
      if (typeof originator.focus === "function") {
        originator.focus();
      }
      return true;
    };

    Caretaker.prototype.canUndo = function() {
      return this._undoStack.length > 0;
    };

    Caretaker.prototype.canRedo = function() {
      return this._redoStack.length > 0;
    };

    return Caretaker;

  })();

  if (typeof exports !== "undefined" && exports !== null) {
    exports.NotImplementedError = NotImplementedError;
    exports.Originator = Originator;
    exports.Caretaker = Caretaker;
  }

  Selection = (function() {

    function Selection(document, element) {
      this.document = document;
      this.element = element;
      if (this.document instanceof jQuery) {
        this.document = this.document.get(0);
      }
      if (this.element instanceof jQuery) {
        this.element = this.element.get(0);
      }
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
      if ((start != null) && start instanceof Array) {
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

    Selection.prototype.replace = function(str, start, end) {
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

    Selection.prototype.insertAfter = function(str, keepSelection) {
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

    Selection.prototype.enclose = function(lhs, rhs, keepSelection) {
      var e, s, scrollTop, str, text, _ref;
      scrollTop = this.element.scrollTop;
      text = this.text();
      if (text.indexOf(lhs) === 0 && text.lastIndexOf(rhs) === (text.length - rhs.length)) {
        str = text.substring(lhs.length, text.length - rhs.length);
        this.text(str, keepSelection);
      } else {
        _ref = this.caret(), s = _ref[0], e = _ref[1];
        this.replace(lhs + text + rhs, s, e);
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

    Selection.prototype.lineCaret = function(pos) {
      var e, s, value;
      pos = pos || this.caret()[0];
      value = this.element.value;
      s = value.lastIndexOf("\n", pos - 1) + 1;
      e = value.indexOf("\n", pos);
      if (e === -1) {
        e = value.length;
      }
      return [s, e];
    };

    Selection.prototype._getLine = function(pos) {
      var e, s, _ref;
      _ref = this.lineCaret(pos), s = _ref[0], e = _ref[1];
      return this.element.value.substring(s, e);
    };

    Selection.prototype._setLine = function(line, keepSelection) {
      var e, s, scrollTop, _ref;
      scrollTop = this.element.scrollTop;
      _ref = this.lineCaret(), s = _ref[0], e = _ref[1];
      this.replace(line, s, e);
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

    Selection.prototype.selectWholeLine = function(pos) {
      var e, s, _ref;
      _ref = this.lineCaret(pos), s = _ref[0], e = _ref[1];
      return this.caret(s, e);
    };

    Selection.prototype.selectWholeCurrentLine = function() {
      return this.selectWholeLine(null);
    };

    return Selection;

  })();

  /*
  Evolution
  
  Extend jQueryObj
  
  Author: lambdalisue
  License: MIT License
  */


  evolute = (function() {
    var absoluteX, absoluteY, contentX, contentY, maxHeight, maxWidth, minHeight, minWidth, ncss, nonContentHeight, nonContentWidth, outerHeight, outerWidth, relativeX, relativeY;
    nonContentWidth = function(includeMargin) {
      if (includeMargin == null) {
        includeMargin = false;
      }
      return this.outerWidth(includeMargin) - this.width();
    };
    nonContentHeight = function(includeMargin) {
      if (includeMargin == null) {
        includeMargin = false;
      }
      return this.outerHeight(includeMargin) - this.height();
    };
    outerWidth = function(includeMargin, value) {
      var offset;
      if (includeMargin == null) {
        includeMargin = false;
      }
      if (typeof includeMargin === 'number') {
        value = includeMargin;
        includeMargin = false;
      }
      if (value != null) {
        offset = this.nonContentWidth(includeMargin);
        return this.width(value - offset);
      }
      return this._outerWidth(includeMargin);
    };
    outerHeight = function(includeMargin, value) {
      var offset;
      if (includeMargin == null) {
        includeMargin = false;
      }
      if (typeof includeMargin === 'number') {
        value = includeMargin;
        includeMargin = false;
      }
      if (value != null) {
        offset = this.nonContentHeight(includeMargin);
        return this.height(value - offset);
      }
      return this._outerHeight(includeMargin);
    };
    ncss = function(propertyName, defaultValue) {
      var value;
      if (defaultValue == null) {
        defaultValue = null;
      }
      value = this.css(propertyName);
      if (value === '' || value === 'none' || value === null || value === (void 0) || value === NaN) {
        return defaultValue;
      }
      value = parseInt(value, 10);
      return value;
    };
    minWidth = function() {
      return this.ncss('min-width');
    };
    minHeight = function() {
      return this.ncss('min-height');
    };
    maxWidth = function() {
      return this.ncss('max-width');
    };
    maxHeight = function() {
      return this.ncss('max-height');
    };
    contentX = function(includeMargin) {
      var borderLeft, marginLeft, paddingLeft;
      if (includeMargin == null) {
        includeMargin = false;
      }
      marginLeft = includeMargin ? this.ncss('margin-left') : 0;
      borderLeft = this.ncss('border-left-width');
      paddingLeft = this.ncss('padding-left');
      return marginLeft + borderLeft + paddingLeft;
    };
    contentY = function(includeMargin) {
      var borderTop, marginTop, paddingTop;
      if (includeMargin == null) {
        includeMargin = false;
      }
      marginTop = includeMargin ? this.ncss('margin-top') : 0;
      borderTop = this.ncss('border-top-width');
      paddingTop = this.ncss('padding-top');
      return marginTop + borderTop + paddingTop;
    };
    absoluteX = function(value) {
      var offset;
      offset = this.offset();
      if (value != null) {
        offset.left = value;
        return this.offset(offset);
      }
      return offset.left;
    };
    absoluteY = function(value) {
      var offset;
      offset = this.offset();
      if (value != null) {
        offset.top = value;
        return this.offset(offset);
      }
      return offset.top;
    };
    relativeX = function(includeMargin, value) {
      var offset, parent;
      if (includeMargin == null) {
        includeMargin = false;
      }
      if (typeof includeMargin === 'number') {
        value = includeMargin;
        includeMargin = false;
      }
      parent = evolute(this.parent());
      offset = parent.absoluteX() + parent.contentX(includeMargin);
      if (value != null) {
        return this.absoluteX(value + offset);
      }
      return this.absoluteX() - offset;
    };
    relativeY = function(includeMargin, value) {
      var offset, parent;
      if (includeMargin == null) {
        includeMargin = false;
      }
      if (typeof includeMargin === 'number') {
        value = includeMargin;
        includeMargin = false;
      }
      parent = evolute(this.parent());
      offset = parent.absoluteY() + parent.contentY(includeMargin);
      if (value != null) {
        return this.absoluteY(value + offset);
      }
      return this.absoluteY() - offset;
    };
    evolute = function(jQueryObj) {
      if (jQueryObj.__evoluted__ === true) {
        return jQueryObj;
      }
      jQueryObj._outerWidth = jQueryObj.outerWidth;
      jQueryObj._outerHeight = jQueryObj.outerHeight;
      jQueryObj.nonContentWidth = nonContentWidth;
      jQueryObj.nonContentHeight = nonContentHeight;
      jQueryObj.outerWidth = outerWidth;
      jQueryObj.outerHeight = outerHeight;
      jQueryObj.nonContentWidth = nonContentWidth;
      jQueryObj.nonContentHeight = nonContentHeight;
      jQueryObj.ncss = ncss;
      jQueryObj.minWidth = minWidth;
      jQueryObj.minHeight = minHeight;
      jQueryObj.maxWidth = maxWidth;
      jQueryObj.maxHeight = maxHeight;
      jQueryObj.contentX = contentX;
      jQueryObj.contentY = contentY;
      jQueryObj.absoluteX = absoluteX;
      jQueryObj.absoluteY = absoluteY;
      jQueryObj.relativeX = relativeX;
      jQueryObj.relativeY = relativeY;
      jQueryObj.__evoluted__ = true;
      return jQueryObj;
    };
    return evolute;
  })();

  curtainFactory = function(element) {
    var curtain;
    element.css('position', 'relative');
    curtain = $('<div>').appendTo(element).hide().css({
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'overflow': 'hidden',
      'z-index': 99999
    });
    curtain.on = function() {
      curtain.refresh();
      curtain.show();
      return this;
    };
    curtain.refresh = function() {
      curtain.width(element.outerWidth(true));
      curtain.height(element.outerHeight(true));
      return this;
    };
    curtain.off = function() {
      curtain.hide();
      return this;
    };
    return curtain;
  };

  /*
  animation
  
  Animate value via easing function
  
  The following library is required to use this library
  
  - jQuery
  
  Author:   lambdalisue (lambdalisue@hashnote.net)
  License:  MIT License
  
  Copyright(C) 2012 lambdalisue, hasnote.net allright reserved
  */


  animate = (function() {
    var defaultOptions, now;
    now = function() {
      return (new Date()).getTime();
    };
    defaultOptions = {
      start: 0,
      end: 100,
      duration: 1000,
      callbackEach: null,
      callbackDone: null,
      easing: jQuery.easing.swing
    };
    return function(options) {
      var difference, startTime, step;
      options = jQuery.extend(defaultOptions, options);
      startTime = now();
      difference = options.end - options.start;
      step = function() {
        var epoch, x;
        epoch = now() - startTime;
        x = options.easing(epoch / options.duration, epoch, 0, 1, options.duration);
        x = x * difference + options.start;
        options.callbackEach(x, epoch);
        if (epoch < options.duration) {
          return setTimeout(step, 1);
        } else {
          options.callbackEach(options.end, options.duration);
          return typeof options.callbackDone === "function" ? options.callbackDone() : void 0;
        }
      };
      step();
      return null;
    };
  })();

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

  if (window.i18n != null) {
    translate = function(key) {
      return i18n.t(key, {
        defaultValue: key
      });
    };
  } else {
    translate = function(key) {
      return key;
    };
  }

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

  this.Jencil = (function() {

    function Jencil(textarea, options) {
      var DefaultOptions,
        _this = this;
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
      this.options = jQuery.extend(DefaultOptions, options);
      this.element = textarea.hide();
      this.caretaker = new Caretaker();
      this.caretaker.originator = function() {
        return _this.editor();
      };
      this.wrapper = new Wrapper(this, this.options.width, this.options.height);
      this.fullscreen = new Fullscreen(this);
      this.element.after(this.wrapper.element).after(this.fullscreen.element);
      this.profile(this.options.profile);
    }

    Jencil.prototype.editor = function() {
      return this.wrapper.workspace.mainPanel.editorPanel || null;
    };

    Jencil.prototype.viewer = function() {
      return this.wrapper.workspace.mainPanel.viewerPanel || null;
    };

    Jencil.prototype.helper = function() {
      return this.wrapper.workspace.mainPanel.helperPanel || null;
    };

    Jencil.prototype.profile = function(profileNameOrInstance) {
      this.wrapper.init(profileNameOrInstance);
      this.wrapper.adjust();
      return this.caretaker.save();
    };

    return Jencil;

  })();

  $.fn.jencil = function(options) {
    return $(this).each(function() {
      var self;
      self = $(this);
      return self.data('jencil', new Jencil(self, options));
    });
  };

  namespace('Jencil.profiles', function(exports) {
    return exports.DefaultProfile = DefaultProfile;
  });

  namespace('Jencil.utils.namespace', function(exports) {
    return exports.namespace = namespace;
  });

  namespace('Jencil.utils.strutils', function(exports) {
    return exports.strutils = strutils;
  });

  namespace('Jencil.utils.evolution', function(exports) {
    return exports.evolute = evolute;
  });

  namespace('Jencil.utils.selection', function(exports) {
    return exports.Selection = Selection;
  });

  namespace('Jencil.utils.animation', function(exports) {
    return exports.animate = animate;
  });

  namespace('Jencil.utils.autoindent', function(exports) {
    return exports.autoIndentable = autoIndentable;
  });

  namespace('Jencil.utils.curtain', function(exports) {
    return exports.curtainFactory = curtainFactory;
  });

  namespace('Jencil.utils.i18n', function(exports) {
    return exports.translate = translate;
  });

  namespace('Jencil.utils.undo', function(exports) {
    exports.NotImplementedError = NotImplementedError;
    exports.Originator = Originator;
    return exports.Caretaker = Caretaker;
  });

  namespace('Jencil', function(exports) {
    return exports.t = translate;
  });

  Widget = (function() {

    function Widget(core, selector, context) {
      this.core = core;
      if (selector == null) {
        selector = '<div>';
      }
      if (selector instanceof jQuery) {
        this.element = selector;
      } else {
        this.element = $(selector, context);
      }
      this.element = evolute(this.element);
    }

    Widget.prototype.init = function() {
      return this;
    };

    Widget.prototype.adjust = function() {
      return this;
    };

    return Widget;

  })();

  Panel = (function(_super) {

    __extends(Panel, _super);

    function Panel(core, selector, context) {
      if (selector == null) {
        selector = '<div>';
      }
      Panel.__super__.constructor.call(this, core, selector, context);
      this.element.addClass('panel');
    }

    return Panel;

  })(Widget);

  MultiplePanel = (function(_super) {

    __extends(MultiplePanel, _super);

    function MultiplePanel(core, fst, snd, splitter) {
      var hide, show,
        _this = this;
      this.fst = fst;
      this.snd = snd;
      this.splitter = splitter;
      MultiplePanel.__super__.constructor.call(this, core);
      this.element.addClass('multiple');
      this.element.append(this.fst.element);
      this.element.append(this.splitter.element);
      this.element.append(this.snd.element);
      show = function(callback) {
        if (!this.element.is(':visible')) {
          return this.toggle(callback, null);
        }
      };
      hide = function(callback) {
        if (this.element.is(':visible')) {
          return this.toggle(null, callback);
        }
      };
      this.fst.toggle = function(callbackOn, callbackOff) {
        return _this._togglePanel(0, callbackOn, callbackOff);
      };
      this.fst.show = show;
      this.fst.hide = hide;
      this.snd.toggle = function(callbackOn, callbackOff) {
        return _this._togglePanel(1, callbackOn, callbackOff);
      };
      this.snd.show = show;
      this.snd.hide = hide;
      this.splitter.element.dblclick(function() {
        return _this.snd.toggle();
      });
    }

    MultiplePanel.prototype.init = function() {
      this.splitter.init();
      this.fst.init();
      return this.snd.init();
    };

    MultiplePanel.prototype._togglePanel = function(to, callbackOn, callbackOff) {
      var callbackDone, end, volume, _callbackDone,
        _this = this;
      if (MultiplePanel._animating) {
        return;
      }
      volume = this.splitter.volume();
      callbackDone = null;
      if ((0 < volume && volume < 1)) {
        end = to;
        this.splitter._previousVolume = volume;
        _callbackDone = callbackOff;
      } else {
        end = this.splitter._previousVolume || this.splitter.defaultVolume;
        if (end === to) {
          end = 0.5;
        }
        _callbackDone = callbackOn;
      }
      MultiplePanel._animating = true;
      callbackDone = function() {
        MultiplePanel._animating = false;
        return typeof _callbackDone === "function" ? _callbackDone() : void 0;
      };
      return animate({
        start: volume,
        end: end,
        duration: 500,
        callbackEach: function(value, epoch) {
          return _this.splitter.volume(value);
        },
        callbackDone: callbackDone
      });
    };

    return MultiplePanel;

  })(Panel);

  VerticalPanel = (function(_super) {

    __extends(VerticalPanel, _super);

    function VerticalPanel(core, fst, snd, defaultVolume) {
      var splitter;
      if (defaultVolume == null) {
        defaultVolume = 0.5;
      }
      splitter = new VerticalSplitter(core, fst, snd, defaultVolume);
      VerticalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
      this.element.addClass('vertical');
    }

    VerticalPanel.prototype.adjust = function() {
      this.fst.element.outerHeight(true, this.element.height());
      this.snd.element.outerHeight(true, this.element.height());
      this.splitter.element.outerHeight(true, this.element.height());
      this.splitter.adjust();
      return this;
    };

    return VerticalPanel;

  })(MultiplePanel);

  HorizontalPanel = (function(_super) {

    __extends(HorizontalPanel, _super);

    function HorizontalPanel(core, fst, snd, defaultVolume) {
      var splitter;
      if (defaultVolume == null) {
        defaultVolume = 0.5;
      }
      splitter = new HorizontalSplitter(core, fst, snd, defaultVolume);
      HorizontalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
      this.element.addClass('horizontal');
    }

    HorizontalPanel.prototype.adjust = function() {
      this.fst.element.outerWidth(true, this.element.width());
      this.snd.element.outerWidth(true, this.element.width());
      this.splitter.element.outerWidth(true, this.element.width());
      this.splitter.adjust();
      return this;
    };

    return HorizontalPanel;

  })(MultiplePanel);

  namespace('Jencil.widgets', function(exports) {
    exports.Widget = Widget;
    exports.Panel = Panel;
    exports.MultiplePanel = MultiplePanel;
    exports.VerticalPanel = VerticalPanel;
    return exports.HorizontalPanel = HorizontalPanel;
  });

  Splitter = (function(_super) {

    __extends(Splitter, _super);

    function Splitter(core, fst, snd, defaultVolume) {
      var mousemove, mouseup,
        _this = this;
      this.fst = fst;
      this.snd = snd;
      this.defaultVolume = defaultVolume != null ? defaultVolume : 0.5;
      Splitter.__super__.constructor.call(this, core);
      this.element.addClass('splitter');
      this._volume = this.defaultVolume;
      mousemove = function(e) {
        var _ref, _ref1;
        _this.mousemove(e);
        if ((_ref = _this.fst.curtain) != null) {
          _ref.refresh();
        }
        if ((_ref1 = _this.snd.curtain) != null) {
          _ref1.refresh();
        }
        e.stopPropagation();
        e.stopImmediatePropagation();
        return e.preventDefault();
      };
      mouseup = function(e) {
        var $window, _ref, _ref1;
        $window = $(window);
        $window.unbind('mousemove', mousemove);
        $window.unbind('mouseup', mouseup);
        if ((_ref = _this.fst.curtain) != null) {
          _ref.off();
        }
        if ((_ref1 = _this.snd.curtain) != null) {
          _ref1.off();
        }
        e.stopPropagation();
        e.stopImmediatePropagation();
        return e.preventDefault();
      };
      this.element.mousedown(function(e) {
        var $window, _ref, _ref1;
        $window = $(window);
        $window.mousemove(mousemove);
        $window.mouseup(mouseup);
        if ((_ref = _this.fst.curtain) != null) {
          _ref.on();
        }
        if ((_ref1 = _this.snd.curtain) != null) {
          _ref1.on();
        }
        e.stopPropagation();
        e.stopImmediatePropagation();
        return e.preventDefault();
      });
    }

    Splitter.prototype.init = function() {
      this.container = evolute(this.element.parent());
      return this;
    };

    Splitter.prototype.volume = function(value, skip) {
      if (skip == null) {
        skip = false;
      }
      if (value != null) {
        this._volume = value;
        if (!skip) {
          this.adjust();
        }
        return this;
      }
      return this._volume;
    };

    Splitter.prototype.value = function(value, skip) {
      var valueWidth, volume;
      if (skip == null) {
        skip = false;
      }
      valueWidth = this.valueWidth();
      if (value != null) {
        volume = value / valueWidth;
        return this.volume(volume, skip);
      }
      return this.volume() * valueWidth;
    };

    Splitter.prototype.regulateValue = function(value) {
      var maxValue, minValue;
      minValue = this.minValue();
      maxValue = this.maxValue();
      if (value < minValue) {
        value = minValue;
      }
      if (value > maxValue) {
        value = maxValue;
      }
      return value;
    };

    return Splitter;

  })(Widget);

  VerticalSplitter = (function(_super) {

    __extends(VerticalSplitter, _super);

    function VerticalSplitter(core, fst, snd, defaultVolume) {
      var _ref, _ref1;
      VerticalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);
      this.element.addClass('vertical');
      this.fst.element.addClass('left');
      this.snd.element.addClass('right');
      this.fst.element.css({
        'float': 'left'
      });
      this.snd.element.css({
        'float': 'left'
      });
      if ((_ref = this.fst.curtain) != null) {
        _ref.css('pointer', 'col-resize');
      }
      if ((_ref1 = this.snd.curtain) != null) {
        _ref1.css('pointer', 'col-resize');
      }
    }

    VerticalSplitter.prototype.mousemove = function(e) {
      var offset, value;
      offset = this.container.absoluteX() + this.container.contentX(true);
      value = e.pageX - offset;
      value = this.regulateValue(value);
      return this.value(value);
    };

    VerticalSplitter.prototype.valueWidth = function() {
      return this.container.width();
    };

    VerticalSplitter.prototype.minValue = function() {
      var m1, m2;
      m1 = this.fst.element.minWidth() + this.fst.element.nonContentWidth();
      m2 = this.snd.element.maxWidth();
      if (m2 != null) {
        m2 = this.valueWidth() - (m2 + this.snd.element.nonContentWidth());
      }
      if ((m1 != null) && (m2 != null)) {
        return Math.max(m1, m2);
      }
      return m1 || m2 || 0;
    };

    VerticalSplitter.prototype.maxValue = function() {
      var m1, m2, valueWidth;
      valueWidth = this.valueWidth();
      m1 = this.fst.element.maxWidth();
      if (m1 != null) {
        m1 = m1 + this.fst.element.nonContentWidth();
      }
      m2 = this.snd.element.minWidth() + this.snd.element.nonContentWidth();
      if (m2 != null) {
        m2 = valueWidth - m2;
      }
      if ((m1 != null) && (m2 != null)) {
        return Math.min(m1, m2);
      }
      return m1 || m2 || valueWidth;
    };

    VerticalSplitter.prototype.adjust = function() {
      var fstValue, sndValue, value, valueWidth;
      value = this.value();
      valueWidth = this.valueWidth();
      fstValue = value - this.fst.element.nonContentWidth(true);
      sndValue = (valueWidth - value) - this.snd.element.nonContentWidth(true);
      if (fstValue <= 0) {
        if (this.fst.element.is(':visible')) {
          this.fst.element.hide();
        }
        if (!this.snd.element.is(':visible')) {
          this.snd.element.show();
        }
        this.snd.element.outerWidth(true, valueWidth);
        this._value = value = 0;
      } else if (sndValue <= 0) {
        if (!this.fst.element.is(':visible')) {
          this.fst.element.show();
        }
        if (this.snd.element.is(':visible')) {
          this.snd.element.hide();
        }
        this.fst.element.outerWidth(true, valueWidth);
        this._value = value = valueWidth;
      } else {
        if (!this.fst.element.is(':visible')) {
          this.fst.element.show();
        }
        if (!this.snd.element.is(':visible')) {
          this.snd.element.show();
        }
        this.fst.element.width(fstValue);
        this.snd.element.width(sndValue);
      }
      this.fst.adjust();
      this.snd.adjust();
      this.element.relativeX(value - this.element.outerWidth() / 2);
      return this;
    };

    return VerticalSplitter;

  })(Splitter);

  HorizontalSplitter = (function(_super) {

    __extends(HorizontalSplitter, _super);

    function HorizontalSplitter(core, fst, snd, defaultVolume) {
      var _ref, _ref1;
      HorizontalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);
      this.element.addClass('horizontal');
      this.fst.element.addClass('top');
      this.snd.element.addClass('bottom');
      if ((_ref = this.fst.curtain) != null) {
        _ref.css('pointer', 'raw-resize');
      }
      if ((_ref1 = this.snd.curtain) != null) {
        _ref1.css('pointer', 'raw-resize');
      }
    }

    HorizontalSplitter.prototype.mousemove = function(e) {
      var offset, value;
      offset = this.container.absoluteY() + this.container.contentY(true);
      value = e.pageY - offset;
      value = this.regulateValue(value);
      return this.value(value);
    };

    HorizontalSplitter.prototype.valueWidth = function() {
      return this.container.height();
    };

    HorizontalSplitter.prototype.minValue = function() {
      var m1, m2;
      m1 = this.fst.element.minHeight() + this.fst.element.nonContentHeight();
      m2 = this.snd.element.maxHeight();
      if (m2 != null) {
        m2 = this.valueWidth() - (m2 + this.snd.element.nonContentHeight());
      }
      if ((m1 != null) && (m2 != null)) {
        return Math.max(m1, m2);
      }
      return m1 || m2 || 0;
    };

    HorizontalSplitter.prototype.maxValue = function() {
      var m1, m2, valueWidth;
      valueWidth = this.valueWidth();
      m1 = this.fst.element.maxHeight();
      if (m1 != null) {
        m1 = m1 + this.fst.element.nonContentHeight();
      }
      m2 = this.snd.element.minHeight() + this.snd.element.nonContentHeight();
      if (m2 != null) {
        m2 = valueWidth - m2;
      }
      if ((m1 != null) && (m2 != null)) {
        return Math.min(m1, m2);
      }
      return m1 || m2 || valueWidth;
    };

    HorizontalSplitter.prototype.adjust = function() {
      var fstValue, sndValue, value, valueWidth;
      value = this.value();
      valueWidth = this.valueWidth();
      fstValue = value - this.fst.element.nonContentHeight(true);
      sndValue = (valueWidth - value) - this.snd.element.nonContentHeight(true);
      if (fstValue <= 0) {
        if (this.fst.element.is(':visible')) {
          this.fst.element.hide();
        }
        if (!this.snd.element.is(':visible')) {
          this.snd.element.show();
        }
        this.snd.element.outerHeight(true, valueWidth);
        this._value = value = 0;
      } else if (sndValue <= 0) {
        if (!this.fst.element.is(':visible')) {
          this.fst.element.show();
        }
        if (this.snd.element.is(':visible')) {
          this.snd.element.hide();
        }
        this.fst.element.outerHeight(true, valueWidth);
        this._value = value = valueWidth;
      } else {
        if (!this.fst.element.is(':visible')) {
          this.fst.element.show();
        }
        if (!this.snd.element.is(':visible')) {
          this.snd.element.show();
        }
        this.fst.element.height(fstValue);
        this.snd.element.height(sndValue);
      }
      this.fst.adjust();
      this.snd.adjust();
      this.element.relativeY(value - this.element.outerHeight() / 2);
      return this;
    };

    return HorizontalSplitter;

  })(Splitter);

  namespace('Jencil.splitters', function(exports) {
    exports.Splitter = Splitter;
    exports.VerticalSplitter = VerticalSplitter;
    return exports.HorizontalSplitter = HorizontalSplitter;
  });

  BaseEditor = (function(_super) {

    __extends(BaseEditor, _super);

    function BaseEditor(core, selector, context) {
      if (selector == null) {
        selector = '<div>';
      }
      BaseEditor.__super__.constructor.call(this, core, selector, context);
      this.element.addClass('editor');
      this._changeCallbacks = [];
    }

    BaseEditor.prototype.val = function(value) {
      throw new Error("NotImplementedError");
    };

    BaseEditor.prototype.change = function(callback) {
      var _i, _len, _ref;
      if (callback != null) {
        this._changeCallbacks.push(callback);
        return this;
      }
      _ref = this._changeCallbacks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        callback.call(this, this.val());
      }
      return this;
    };

    BaseEditor.prototype.h1 = null;

    BaseEditor.prototype.h2 = null;

    BaseEditor.prototype.h3 = null;

    BaseEditor.prototype.h4 = null;

    BaseEditor.prototype.h5 = null;

    BaseEditor.prototype.h6 = null;

    BaseEditor.prototype.bold = null;

    BaseEditor.prototype.italic = null;

    BaseEditor.prototype.underline = null;

    BaseEditor.prototype.strike = null;

    BaseEditor.prototype.superscript = null;

    BaseEditor.prototype.subscript = null;

    BaseEditor.prototype.anchor = null;

    BaseEditor.prototype.image = null;

    BaseEditor.prototype.unorderedList = null;

    BaseEditor.prototype.orderedList = null;

    return BaseEditor;

  })(Panel);

  TextEditor = (function(_super) {

    __extends(TextEditor, _super);

    function TextEditor(core, selector, context) {
      var _this = this;
      if (selector == null) {
        selector = '<div>';
      }
      TextEditor.__super__.constructor.call(this, core, selector, context);
      this.textarea = $('<textarea>').appendTo(this.element).css({
        'margin': '0',
        'padding': '0',
        'border': 'none',
        'outline': 'none',
        'resize': 'none'
      });
      this.textarea = evolute(this.textarea);
      this.textarea.on('keydown', function(e) {
        if (e.which !== 13) {
          return;
        }
        return _this.core.caretaker.save();
      });
      if (($.fn.tabby != null) && this.core.options.enableTabIndent) {
        this.textarea.tabby({
          'tabString': this.core.options.tabString
        });
      }
      this.textarea = autoIndentable(this.textarea);
      if (!this.core.options.enableAutoIndent) {
        this.textarea.autoIndent.disable();
      }
      this.textarea.on('keypress keyup click blur', function() {
        return _this.change();
      });
    }

    TextEditor.prototype.val = function(value) {
      if (value != null) {
        this.textarea.val(value);
        this.change();
        return this;
      }
      return this.textarea.val();
    };

    TextEditor.prototype.focus = function() {
      this.textarea.focus();
      return this;
    };

    TextEditor.prototype.createMemento = function() {
      return this.val();
    };

    TextEditor.prototype.setMemento = function(memento) {
      return this.val(memento);
    };

    TextEditor.prototype.adjust = function() {
      this.textarea.outerWidth(this.element.width());
      this.textarea.outerHeight(this.element.height());
      return this;
    };

    TextEditor.prototype.selectWholeLineIfNoSelectionFound = function() {
      var caret;
      caret = this.textarea.selection.caret();
      if (caret[0] === caret[1]) {
        this.textarea.selection.selectWholeCurrentLine();
      }
    };

    TextEditor.prototype.selection = function(str, keepSelection) {
      if (keepSelection == null) {
        keepSelection = true;
      }
      if (str != null) {
        this.textarea.selection.text(str, keepSelection);
        this.core.caretaker.save();
        return this.change();
      }
      return this.textarea.selection.text();
    };

    TextEditor.prototype.enclose = function(b, a, keepSelection) {
      if (keepSelection == null) {
        keepSelection = true;
      }
      this.selectWholeLineIfNoSelectionFound();
      this.textarea.selection.enclose(b, a, keepSelection);
      this.core.caretaker.save();
      return this.change();
    };

    TextEditor.prototype.insertBefore = function(str, keepSelection) {
      if (keepSelection == null) {
        keepSelection = true;
      }
      this.selectWholeLineIfNoSelectionFound();
      this.textarea.selection.insertBefore(str, keepSelection);
      this.core.caretaker.save();
      return this.change();
    };

    TextEditor.prototype.insertAfter = function(str, keepSelection) {
      if (keepSelection == null) {
        keepSelection = true;
      }
      this.selectWholeLineIfNoSelectionFound();
      this.textarea.selection.insertAfter(str, keepSelection);
      this.core.caretaker.save();
      return this.change();
    };

    return TextEditor;

  })(BaseEditor);

  namespace('Jencil.editors', function(exports) {
    exports.BaseEditor = BaseEditor;
    return exports.TextEditor = TextEditor;
  });

  BaseViewer = (function(_super) {

    __extends(BaseViewer, _super);

    function BaseViewer(core, selector, context) {
      if (selector == null) {
        selector = '<div>';
      }
      BaseViewer.__super__.constructor.call(this, core, selector, context);
      this.element.addClass('viewer');
    }

    BaseViewer.prototype.update = function(value, force) {
      throw new Error("NotImplementedError");
    };

    return BaseViewer;

  })(Panel);

  TemplateViewer = (function(_super) {

    __extends(TemplateViewer, _super);

    function TemplateViewer(core) {
      TemplateViewer.__super__.constructor.call(this, core);
      this.templatePath = this.core.options.viewerTemplatePath;
      this.element.css({
        'position': 'relative'
      });
      this.curtain = curtainFactory(this.element);
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
      this.iframe.attr('frameborder', 0);
      this.iframe = evolute(this.iframe);
      this.iframe.init = function() {
        var iframe;
        iframe = this.get(0);
        if (iframe.contentDocument != null) {
          this.document = iframe.contentDocument;
        } else {
          this.document = iframe.contentWindow.document;
        }
        return this.document.write('<body></body>');
      };
      this.iframe.write = function(value) {
        var scrollTop;
        if (this.document != null) {
          try {
            scrollTop = this.document.documentElement.scrollTop;
          } catch (e) {
            scrollTop = 0;
          }
          this.document.open();
          this.document.write(value);
          this.document.close();
          $("a", $(this.document)).attr('target', '_blank');
          this.document.documentElement.scrollTop = scrollTop;
          this.width(this.document.scrollLeft);
          this.height(this.document.scrollTop);
          return true;
        }
        return false;
      };
      this.iframe.loadTemplate = function(templatePath, value) {
        var _this = this;
        return $.ajax({
          url: templatePath,
          success: function(data) {
            _this._template = data;
            return _this.write(value);
          }
        });
      };
    }

    TemplateViewer.prototype.init = function() {
      return this.iframe.init();
    };

    TemplateViewer.prototype.update = function(value, force) {
      if (!this.element.is(':visible') && !force) {
        return;
      }
      if (this.iframe._template != null) {
        value = this.iframe._template.replace("{{content}}", value);
      } else if (this.templatePath != null) {
        this.iframe.loadTemplate(this.templatePath, value);
      }
      return this.iframe.write(value);
    };

    TemplateViewer.prototype.adjust = function() {
      this.iframe.outerWidth(this.element.width());
      this.iframe.outerHeight(this.element.height());
      return this;
    };

    return TemplateViewer;

  })(BaseViewer);

  AjaxViewer = (function(_super) {

    __extends(AjaxViewer, _super);

    function AjaxViewer(core, config) {
      this.config = config;
      AjaxViewer.__super__.constructor.call(this, core);
      this.config = jQuery.extend({
        type: 'GET',
        dataType: 'text',
        data: function(value) {
          return encodeURIComponent(value);
        },
        url: null
      }, this.config);
    }

    AjaxViewer.prototype.update = function(value, force) {
      var _this = this;
      if (this._valueCache !== value || force) {
        this._valueCache = value;
        return $.ajax({
          type: this.config.type,
          dataType: this.config.dataType,
          data: JSON.stringify(this.config.data(value)),
          url: this.config.url,
          success: function(value) {
            if (_this.iframe._template != null) {
              value = _this.iframe._template.replace("{{content}}", value);
            } else if (_this.templatePath != null) {
              _this.iframe.loadTemplate(_this.templatePath, value);
            }
            return _this.iframe.write(value);
          }
        });
      }
    };

    return AjaxViewer;

  })(TemplateViewer);

  namespace('Jencil.viewers', function(exports) {
    exports.BaseViewer = BaseViewer;
    exports.TemplateViewer = TemplateViewer;
    return exports.AjaxViewer = AjaxViewer;
  });

  BaseHelper = (function(_super) {

    __extends(BaseHelper, _super);

    function BaseHelper(core, selector, context) {
      if (selector == null) {
        selector = '<div>';
      }
      BaseHelper.__super__.constructor.call(this, core, selector, context);
      this.element.addClass('helper');
    }

    return BaseHelper;

  })(Panel);

  TemplateHelper = (function(_super) {

    __extends(TemplateHelper, _super);

    function TemplateHelper(core) {
      TemplateHelper.__super__.constructor.call(this, core);
      this.templatePath = this.core.options.helperTemplatePath;
      this.element.css({
        'position': 'relative'
      });
      this.curtain = curtainFactory(this.element);
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
      this.iframe.attr('frameborder', 0);
      this.iframe = evolute(this.iframe);
      this.iframe.init = function() {
        var iframe;
        iframe = this.get(0);
        if (iframe.contentDocument != null) {
          this.document = iframe.contentDocument;
        } else {
          this.document = iframe.contentWindow.document;
        }
        return this.document.write('<body></body>');
      };
      this.iframe.write = function(value) {
        var scrollTop;
        if (this.document != null) {
          try {
            scrollTop = this.document.documentElement.scrollTop;
          } catch (e) {
            scrollTop = 0;
          }
          this.document.open();
          this.document.write(value);
          this.document.close();
          this.document.documentElement.scrollTop = scrollTop;
          this.width(this.document.scrollLeft);
          this.height(this.document.scrollTop);
          return true;
        }
        return false;
      };
      this.iframe.loadTemplate = function(templatePath) {
        var _this = this;
        return $.ajax({
          url: templatePath,
          success: function(data) {
            return _this.write(data);
          }
        });
      };
    }

    TemplateHelper.prototype.init = function() {
      this.iframe.init();
      if (this.templatePath != null) {
        return this.iframe.loadTemplate(this.templatePath);
      }
    };

    TemplateHelper.prototype.adjust = function() {
      this.iframe.outerWidth(this.element.width());
      this.iframe.outerHeight(this.element.height());
      return this;
    };

    return TemplateHelper;

  })(BaseHelper);

  namespace('Jencil.helpers', function(exports) {
    exports.BaseHelper = BaseHelper;
    return exports.TemplateHelper = TemplateHelper;
  });

  Separator = (function(_super) {

    __extends(Separator, _super);

    function Separator(core) {
      Separator.__super__.constructor.call(this, core, '<span>');
      this.element.addClass('separator');
    }

    return Separator;

  })(Widget);

  Button = (function(_super) {

    __extends(Button, _super);

    function Button(core, name, text, title) {
      this.name = name;
      this.text = text;
      this.title = title;
      Button.__super__.constructor.call(this, core, '<a>');
      this.text = Jencil.t(this.text || this.name);
      this.title = Jencil.t(this.title || this.text);
      this.element.addClass('button').addClass(name);
      this.element.append($("<span>" + this.text + "</span>"));
      this.element.attr('title', this.title);
    }

    Button.prototype.enable = function() {
      this.element.removeClass('disable');
      return this;
    };

    Button.prototype.disable = function() {
      this.element.addClass('disable');
      return this;
    };

    Button.prototype.init = function() {
      this.validate();
      return this;
    };

    Button.prototype.validate = function() {
      return this;
    };

    return Button;

  })(Widget);

  ActionButton = (function(_super) {

    __extends(ActionButton, _super);

    function ActionButton(core, name, text, title, callback, shortcut) {
      var _this = this;
      this.shortcut = shortcut;
      ActionButton.__super__.constructor.call(this, core, name, text, title);
      this.callback = function() {
        if (!_this.element.hasClass('disable')) {
          _this.callback.raw();
        }
        return _this;
      };
      this.callback.raw = callback;
      this.element.click(function() {
        return _this.callback();
      });
      if ((this.shortcut != null) && (window.shortcut != null)) {
        window.shortcut.add(this.shortcut, function(e) {
          return _this.callback();
        });
        this.element.attr('title', "" + this.title + " (" + this.shortcut + ")");
      }
    }

    return ActionButton;

  })(Button);

  CommandButton = (function(_super) {

    __extends(CommandButton, _super);

    function CommandButton(core, name, text, title, command, shortcut) {
      var callback;
      this.command = command;
      callback = function() {
        var editor;
        editor = core.editor();
        return editor[command].call(editor);
      };
      CommandButton.__super__.constructor.call(this, core, name, text, title, callback, shortcut);
    }

    CommandButton.prototype.validate = function() {
      var editor;
      editor = this.core.editor();
      if (!(editor[this.command] != null)) {
        this.disable();
      }
      return this;
    };

    CommandButton.factory = function(core, args) {
      var command, name, shortcut, text, title;
      name = text = title = command = shortcut = null;
      switch (args.length) {
        case 5:
          name = args[0];
          text = args[1];
          title = args[2];
          command = args[3];
          shortcut = args[4];
          break;
        case 4:
          name = args[0];
          text = title = args[1];
          command = args[2];
          shortcut = args[3];
          break;
        case 3:
          name = command = args[0];
          text = title = args[1];
          shortcut = args[2];
          break;
        case 2:
          name = command = args[0];
          text = title = args[1];
          shortcut = null;
          break;
        case 1:
          name = command = text = title = args[0];
          shortcut = null;
      }
      return new CommandButton(core, name, text, title, command, shortcut);
    };

    return CommandButton;

  })(ActionButton);

  UndoButton = (function(_super) {

    __extends(UndoButton, _super);

    function UndoButton(core) {
      var callback,
        _this = this;
      callback = function(e) {
        return _this.core.caretaker.undo();
      };
      UndoButton.__super__.constructor.call(this, core, 'undo', 'Undo', 'Undo', callback, 'Ctrl+Z');
    }

    UndoButton.prototype.init = function() {
      var check,
        _this = this;
      check = function() {
        if (_this.core.caretaker.canUndo() === false) {
          _this.disable();
        } else {
          _this.enable();
        }
        return setTimeout(check, 100);
      };
      return check();
    };

    return UndoButton;

  })(ActionButton);

  RedoButton = (function(_super) {

    __extends(RedoButton, _super);

    function RedoButton(core) {
      var callback,
        _this = this;
      callback = function(e) {
        return _this.core.caretaker.redo();
      };
      RedoButton.__super__.constructor.call(this, core, 'redo', 'Redo', 'Redo', callback, 'Ctrl+Shift+Z');
    }

    RedoButton.prototype.init = function() {
      var check,
        _this = this;
      check = function() {
        if (_this.core.caretaker.canRedo() === false) {
          _this.disable();
        } else {
          _this.enable();
        }
        return setTimeout(check, 100);
      };
      return check();
    };

    return RedoButton;

  })(ActionButton);

  FullscreenButton = (function(_super) {

    __extends(FullscreenButton, _super);

    function FullscreenButton(core) {
      var callback,
        _this = this;
      callback = function(e) {
        return _this.core.fullscreen.toggle();
      };
      FullscreenButton.__super__.constructor.call(this, core, 'fullscreen', 'Toggle fullscreen', 'Fullscreen', callback, 'Ctrl+F');
    }

    FullscreenButton.prototype.init = function() {
      var check,
        _this = this;
      check = function() {
        if (_this.core.fullscreen.element.is(':visible') === true) {
          _this.element.addClass('hide');
        } else {
          _this.element.removeClass('hide');
        }
        return setTimeout(check, 100);
      };
      return check();
    };

    return FullscreenButton;

  })(ActionButton);

  ViewerButton = (function(_super) {

    __extends(ViewerButton, _super);

    function ViewerButton(core) {
      var callback,
        _this = this;
      callback = function(e) {
        return _this.core.viewer().toggle();
      };
      ViewerButton.__super__.constructor.call(this, core, 'viewer', 'Quick view', 'Quick view', callback, 'Ctrl+Q');
    }

    ViewerButton.prototype.validate = function() {
      if (!(this.core.viewer() != null)) {
        this.disable();
        return false;
      }
      return true;
    };

    ViewerButton.prototype.init = function() {
      var check,
        _this = this;
      if (!this.validate()) {
        return;
      }
      check = function() {
        if (_this.core.viewer().element.is(':visible')) {
          _this.element.addClass('hide');
        } else {
          _this.element.removeClass('hide');
        }
        return setTimeout(check, 100);
      };
      return check();
    };

    return ViewerButton;

  })(ActionButton);

  HelperButton = (function(_super) {

    __extends(HelperButton, _super);

    function HelperButton(core) {
      var callback,
        _this = this;
      callback = function(e) {
        return _this.core.helper().toggle();
      };
      HelperButton.__super__.constructor.call(this, core, 'helper', 'Help', 'Help', callback, 'Ctrl+H');
    }

    HelperButton.prototype.validate = function() {
      if (!this.core.helper()) {
        this.disable();
        return false;
      }
      return true;
    };

    HelperButton.prototype.init = function() {
      var check,
        _this = this;
      if (!this.validate()) {
        return;
      }
      check = function() {
        if (_this.core.helper().element.is(':visible')) {
          _this.element.addClass('hide');
        } else {
          _this.element.removeClass('hide');
        }
        return setTimeout(check, 100);
      };
      return check();
    };

    return HelperButton;

  })(ActionButton);

  buttonFactory = function(core, value) {
    if (value instanceof Array) {
      return CommandButton.factory(core, value);
    }
    if (typeof value === 'string') {
      switch (value) {
        case 'Separator':
          return new Separator(core);
        case 'Undo':
          return new UndoButton(core);
        case 'Redo':
          return new RedoButton(core);
        case 'Fullscreen':
          return new FullscreenButton(core);
        case 'Viewer':
          return new ViewerButton(core);
        case 'Helper':
          return new HelperButton(core);
        default:
          throw new Exception("" + value + " is not known Button type");
      }
    }
    return new value(core);
  };

  namespace('Jencil.buttons', function(exports) {
    exports.Separator = Separator;
    exports.Button = Button;
    exports.ActionButton = ActionButton;
    exports.CommandButton = CommandButton;
    exports.UndoButton = UndoButton;
    exports.RedoButton = RedoButton;
    exports.FullscreenButton = FullscreenButton;
    exports.ViewerButton = ViewerButton;
    exports.HelperButton = HelperButton;
    return exports.buttonFactory = buttonFactory;
  });

  Wrapper = (function(_super) {

    __extends(Wrapper, _super);

    function Wrapper(core, width, height) {
      var _this = this;
      Wrapper.__super__.constructor.call(this, core);
      this.element.addClass('jencil wrapper');
      this.element.width(width);
      this.element.height(height);
      this.workspace = new Workspace(this.core);
      this.workspace.element.appendTo(this.element);
      this.curtain = {
        on: function() {
          var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
          if ((_ref = _this.core.editor()) != null) {
            if ((_ref1 = _ref.curtain) != null) {
              _ref1.on();
            }
          }
          if ((_ref2 = _this.core.viewer()) != null) {
            if ((_ref3 = _ref2.curtain) != null) {
              _ref3.on();
            }
          }
          if ((_ref4 = _this.core.helper()) != null) {
            if ((_ref5 = _ref4.curtain) != null) {
              _ref5.on();
            }
          }
          return _this.adjust();
        },
        refresh: function() {
          var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
          if ((_ref = _this.core.editor()) != null) {
            if ((_ref1 = _ref.curtain) != null) {
              _ref1.refresh();
            }
          }
          if ((_ref2 = _this.core.viewer()) != null) {
            if ((_ref3 = _ref2.curtain) != null) {
              _ref3.refresh();
            }
          }
          if ((_ref4 = _this.core.helper()) != null) {
            if ((_ref5 = _ref4.curtain) != null) {
              _ref5.refresh();
            }
          }
          return _this.adjust();
        },
        off: function() {
          var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
          if ((_ref = _this.core.editor()) != null) {
            if ((_ref1 = _ref.curtain) != null) {
              _ref1.off();
            }
          }
          if ((_ref2 = _this.core.viewer()) != null) {
            if ((_ref3 = _ref2.curtain) != null) {
              _ref3.off();
            }
          }
          if ((_ref4 = _this.core.helper()) != null) {
            if ((_ref5 = _ref4.curtain) != null) {
              _ref5.off();
            }
          }
          return _this.adjust();
        }
      };
    }

    Wrapper.prototype.init = function(profileNameOrInstance) {
      var _this = this;
      if ((this.element.resizable != null) && this.core.options.resizable === true) {
        this.element.resizable({
          start: function() {
            return _this.curtain.on();
          },
          resize: function() {
            return _this.curtain.refresh();
          },
          stop: function() {
            return _this.curtain.off();
          }
        });
      }
      this.workspace.profile(profileNameOrInstance);
      this.workspace.init();
      return this;
    };

    Wrapper.prototype.adjust = function() {
      this.workspace.element.outerWidth(true, this.element.width());
      this.workspace.element.outerHeight(true, this.element.height());
      this.workspace.adjust();
      return this;
    };

    return Wrapper;

  })(Panel);

  Workspace = (function(_super) {

    __extends(Workspace, _super);

    function Workspace(core) {
      Workspace.__super__.constructor.call(this, core);
      this.element.addClass('workspace');
    }

    Workspace.prototype.profile = function(profileNameOrInstance) {
      var button, profile, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3,
        _this = this;
      if (profileNameOrInstance != null) {
        if (typeof profileNameOrInstance === 'string') {
          profileNameOrInstance = this.core.options.profiles[profileNameOrInstance];
        }
        profile = jQuery.extend(true, DefaultProfile, profileNameOrInstance);
        profile.defaultVolume = this.core.options.defaultVolume || profile.defaultVolume;
        profile.defaultVolume2 = this.core.options.defaultVolume2 || profile.defaultVolume2;
        this.element.empty();
        this.mainPanel = new profile.mainPanelClass(this.core, profile);
        if ((_ref = this.mainPanel.editorPanel) != null) {
          _ref.val(this.core.element.val());
        }
        if ((_ref1 = this.mainPanel.editorPanel) != null) {
          _ref1.change(function(value) {
            return _this.core.element.val(value);
          });
        }
        this.toolbar = new Toolbar(this.core);
        _ref2 = profile.toolbarButtons;
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          button = _ref2[_i];
          button = buttonFactory(this.core, button);
          this.toolbar.addButton(button);
        }
        this.statusbar = new Statusbar(this.core);
        _ref3 = profile.statusbarButtons;
        for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
          button = _ref3[_j];
          button = buttonFactory(this.core, button);
          this.statusbar.addButton(button);
        }
        this.element.append(this.toolbar.element);
        this.element.append(this.mainPanel.element);
        this.element.append(this.statusbar.element);
        this._profile = profile;
        return this;
      }
      return this._profile;
    };

    Workspace.prototype.init = function() {
      this.toolbar.init();
      this.statusbar.init();
      return this.mainPanel.init();
    };

    Workspace.prototype.adjust = function() {
      var offset1, offset2;
      this.toolbar.element.outerWidth(true, this.element.width());
      this.statusbar.element.outerWidth(true, this.element.width());
      this.mainPanel.element.outerWidth(true, this.element.width());
      this.mainPanel.element.outerHeight(true, this.element.height());
      this.mainPanel.adjust();
      offset1 = this.toolbar.element.outerHeight(true);
      offset2 = this.statusbar.element.outerHeight(true);
      this.mainPanel.element.outerHeight(true, this.element.height() - (offset1 + offset2));
      this.toolbar.adjust();
      this.statusbar.adjust();
      this.mainPanel.adjust();
      return this;
    };

    Workspace.prototype.update = function(force) {
      if (this.mainPanel.editorPanel && this.mainPanel.viewerPanel) {
        return this.mainPanel.viewerPanel.update(this.mainPanel.editorPanel.val(), force);
      }
    };

    return Workspace;

  })(Panel);

  Bar = (function(_super) {

    __extends(Bar, _super);

    function Bar(core) {
      Bar.__super__.constructor.call(this, core);
      this._buttons = [];
    }

    Bar.prototype.init = function() {
      var button, _i, _len, _ref;
      _ref = this._buttons;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        button = _ref[_i];
        button.init();
      }
      return this;
    };

    Bar.prototype.addButton = function(button) {
      this._buttons.push(button);
      return this.element.append(button.element);
    };

    return Bar;

  })(Panel);

  Toolbar = (function(_super) {

    __extends(Toolbar, _super);

    function Toolbar(core) {
      Toolbar.__super__.constructor.call(this, core);
      this.element.addClass('toolbar');
    }

    return Toolbar;

  })(Bar);

  Statusbar = (function(_super) {

    __extends(Statusbar, _super);

    function Statusbar(core) {
      Statusbar.__super__.constructor.call(this, core);
      this.element.addClass('statusbar');
    }

    return Statusbar;

  })(Bar);

  namespace('Jencil.workspace', function(exports) {
    exports.Wrapper = Wrapper;
    exports.Workspace = Workspace;
    exports.Bar = Bar;
    exports.Toolbar = Toolbar;
    return exports.Statusbar = Statusbar;
  });

  MultiPanel = (function(_super) {

    __extends(MultiPanel, _super);

    function MultiPanel(core, fst, snd, splitter) {
      var hide, show,
        _this = this;
      this.fst = fst;
      this.snd = snd;
      this.splitter = splitter;
      MultiPanel.__super__.constructor.call(this, core);
      this.element.addClass('multi');
      this.element.append(this.fst.element);
      this.element.append(this.splitter.element);
      this.element.append(this.snd.element);
      show = function(callback) {
        if (!this.element.is(':visible')) {
          return this.toggle(callback, null);
        }
      };
      hide = function(callback) {
        if (this.element.is(':visible')) {
          return this.toggle(null, callback);
        }
      };
      this.fst.toggle = function(callbackOn, callbackOff) {
        return _this._togglePanel(0, callbackOn, callbackOff);
      };
      this.fst.show = show;
      this.fst.hide = hide;
      this.snd.toggle = function(callbackOn, callbackOff) {
        return _this._togglePanel(1, callbackOn, callbackOff);
      };
      this.snd.show = show;
      this.snd.hide = hide;
      this.splitter.element.dblclick(function() {
        return _this.snd.toggle();
      });
    }

    MultiPanel.prototype.init = function() {
      this.splitter.init();
      this.fst.init();
      return this.snd.init();
    };

    MultiPanel.prototype._togglePanel = function(to, callbackOn, callbackOff) {
      var callbackDone, end, volume, _callbackDone,
        _this = this;
      if (MultiPanel._animating) {
        return;
      }
      volume = this.splitter.volume();
      callbackDone = null;
      if ((0 < volume && volume < 1)) {
        end = to;
        this.splitter._previousVolume = volume;
        _callbackDone = callbackOff;
      } else {
        end = this.splitter._previousVolume || this.splitter.defaultVolume;
        if (end === to) {
          end = 0.5;
        }
        _callbackDone = callbackOn;
      }
      MultiPanel._animating = true;
      callbackDone = function() {
        MultiPanel._animating = false;
        return typeof _callbackDone === "function" ? _callbackDone() : void 0;
      };
      return animate({
        start: volume,
        end: end,
        duration: 500,
        callbackEach: function(value, epoch) {
          return _this.splitter.volume(value);
        },
        callbackDone: callbackDone
      });
    };

    return MultiPanel;

  })(Panel);

  VerticalPanel = (function(_super) {

    __extends(VerticalPanel, _super);

    function VerticalPanel(core, fst, snd, defaultVolume) {
      var splitter;
      if (defaultVolume == null) {
        defaultVolume = 0.5;
      }
      splitter = new VerticalSplitter(core, fst, snd, defaultVolume);
      VerticalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
      this.element.addClass('vertical');
    }

    VerticalPanel.prototype.adjust = function() {
      this.fst.element.outerHeight(true, this.element.height());
      this.snd.element.outerHeight(true, this.element.height());
      this.splitter.element.outerHeight(true, this.element.height());
      this.splitter.adjust();
      return this;
    };

    return VerticalPanel;

  })(MultiPanel);

  HorizontalPanel = (function(_super) {

    __extends(HorizontalPanel, _super);

    function HorizontalPanel(core, fst, snd, defaultVolume) {
      var splitter;
      if (defaultVolume == null) {
        defaultVolume = 0.5;
      }
      splitter = new HorizontalSplitter(core, fst, snd, defaultVolume);
      HorizontalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
      this.element.addClass('horizontal');
    }

    HorizontalPanel.prototype.adjust = function() {
      this.fst.element.outerWidth(true, this.element.width());
      this.snd.element.outerWidth(true, this.element.width());
      this.splitter.element.outerWidth(true, this.element.width());
      this.splitter.adjust();
      return this;
    };

    return HorizontalPanel;

  })(MultiPanel);

  namespace('Jencil.multipanels', function(exports) {
    exports.MultiPanel = MultiPanel;
    exports.VerticalPanel = VerticalPanel;
    return exports.HorizontalPanel = HorizontalPanel;
  });

  MonomainPanel = (function() {

    function MonomainPanel(core, profile) {
      var editorPanel;
      editorPanel = new profile.editorClass(core);
      editorPanel.element.addClass('mainPanel');
      return editorPanel;
    }

    return MonomainPanel;

  })();

  DimainPanel = (function(_super) {

    __extends(DimainPanel, _super);

    function DimainPanel(core, profile) {
      var _this = this;
      this.editorPanel = new profile.editorClass(core);
      this.viewerPanel = new profile.viewerClass(core);
      DimainPanel.__super__.constructor.call(this, core, this.editorPanel, this.viewerPanel, profile.defaultVolume);
      this.element.addClass('mainPanel');
      this.editorPanel.change(function(value) {
        return _this.viewerPanel.update(value);
      });
    }

    DimainPanel.prototype.init = function() {
      DimainPanel.__super__.init.call(this);
      return this.viewerPanel.update(this.editorPanel.val());
    };

    return DimainPanel;

  })(VerticalPanel);

  TrimainPanel = (function(_super) {

    __extends(TrimainPanel, _super);

    function TrimainPanel(core, profile) {
      var _this = this;
      this.editorPanel = new profile.editorClass(core);
      this.viewerPanel = new profile.viewerClass(core);
      this.helperPanel = new profile.helperClass(core);
      this.verticalPanel = new VerticalPanel(core, this.editorPanel, this.viewerPanel, profile.defaultVolume);
      TrimainPanel.__super__.constructor.call(this, core, this.verticalPanel, this.helperPanel, profile.defaultVolume2);
      this.element.addClass('mainPanel');
      this.editorPanel.change(function(value) {
        return _this.viewerPanel.update(value);
      });
    }

    TrimainPanel.prototype.init = function() {
      TrimainPanel.__super__.init.call(this);
      return this.viewerPanel.update(this.editorPanel.val());
    };

    return TrimainPanel;

  })(HorizontalPanel);

  namespace('Jencil.mainpanels', function(exports) {
    exports.MonomainPanel = MonomainPanel;
    exports.DimainPanel = DimainPanel;
    return exports.TrimainPanel = TrimainPanel;
  });

  Fullscreen = (function(_super) {

    __extends(Fullscreen, _super);

    function Fullscreen(core) {
      var _this = this;
      Fullscreen.__super__.constructor.call(this, core);
      this.element.addClass('fullscreen');
      this.element.css({
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'width': '100%',
        'height': '100%',
        'z-index': 100
      });
      this.curtain = $('<div>').addClass('curtain');
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
      this.cell = $('<div>').css({
        'position': 'absolute',
        'top': '5%',
        'left': '5%',
        'width': '90%',
        'height': '90%'
      });
      if ($.browser.msie && $.browser.version < 7) {
        this.element.css('position', 'absolute');
        $(window).scroll(function() {
          return _this.element.css('top', $(document).scrollTop());
        });
      }
      this.curtain.click(function() {
        return _this.off();
      });
      this.element.append(this.curtain);
      this.element.append(this.cell);
      this.element.hide();
      this.resize = function() {
        return _this.core.wrapper.adjust();
      };
    }

    Fullscreen.prototype.on = function() {
      var ratio,
        _this = this;
      ratio = 9.0 / 10;
      this.cell.append(this.core.wrapper.element);
      this.core.wrapper.element.outerWidth(true, this.element.width() * ratio);
      this.core.wrapper.element.outerHeight(true, this.element.height() * ratio);
      this.core.wrapper.init();
      this.core.wrapper.adjust();
      this.core.wrapper.workspace.update(true);
      this.element.fadeIn('fast', function() {
        _this.core.wrapper.element.css('width', "100%");
        _this.core.wrapper.element.css('height', "100%");
        return _this.core.wrapper.adjust();
      });
      return $(window).on('resize', this.resize);
    };

    Fullscreen.prototype.off = function() {
      this.core.element.after(this.core.wrapper.element);
      this.core.wrapper.element.css('width', "");
      this.core.wrapper.element.css('height', "");
      this.core.wrapper.init();
      this.core.wrapper.adjust();
      this.core.wrapper.workspace.update(true);
      this.element.fadeOut('fast');
      return $(window).unbind('resize', this.resize);
    };

    Fullscreen.prototype.toggle = function(callbackOn, callbackOff) {
      if (this.element.is(':visible')) {
        this.off();
        return typeof callbackOff === "function" ? callbackOff() : void 0;
      } else {
        this.on();
        return typeof callbackOn === "function" ? callbackOn() : void 0;
      }
    };

    return Fullscreen;

  })(Panel);

  autoIndentableHtml = (function() {
    var PATTERNS, post, pre, x;
    PATTERNS = (function() {
      var _i, _len, _ref, _results;
      _ref = ['p', 'li'];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        _results.push([x, new RegExp("^[\s\t]*<" + x + ">"), new RegExp("</" + x + ">[\s\t]*$")]);
      }
      return _results;
    })();
    pre = function(e, line) {
      var lineCaret, pattern, _i, _len;
      if (e.shiftKey) {
        return;
      }
      for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {
        pattern = PATTERNS[_i];
        if (pattern[1].test(line) || pattern[2].test(line)) {
          lineCaret = this.selection._getLineCaret();
          this.selection.caret(lineCaret[1]);
          return;
        }
      }
    };
    post = function(e, line, indent, insert) {
      var pattern, _i, _len;
      if (e.shiftKey) {
        return;
      }
      for (_i = 0, _len = PATTERNS.length; _i < _len; _i++) {
        pattern = PATTERNS[_i];
        if (pattern[2].test(line)) {
          x = pattern[0];
          this.selection.insertAfter("<" + x + "></" + x + ">", false);
          this.selection.caretOffset(-(3 + x.length));
          return;
        }
      }
    };
    return function(textarea) {
      if (!(textarea.autoIndent != null)) {
        textarea = autoIndentable(textarea);
      }
      textarea.autoIndent.pre = function(e, line) {
        return pre.call(textarea, e, line);
      };
      textarea.autoIndent.post = function(e, line, indent, insert) {
        return post.call(textarea, e, line, indent, insert);
      };
      return textarea;
    };
  })();

  headerMarkup = (function() {
    var PATTERN;
    PATTERN = new RegExp("^<h([1-6])>(.*)</h[1-6]>\n?$");
    return function(n) {
      var caret, replacement, text;
      caret = this.textarea.selection.caret();
      if (caret[0] === caret[1]) {
        this.textarea.selection.selectWholeCurrentLine();
      }
      text = this.selection();
      if (PATTERN.test(text)) {
        if (RegExp.$1 === n.toString()) {
          replacement = RegExp.$2;
        } else {
          replacement = "<h" + n + ">" + RegExp.$2 + "</h" + n + ">";
        }
        return this.selection(replacement);
      } else {
        return this.enclose("<h" + n + ">", "</h" + n + ">\n");
      }
    };
  })();

  HtmlEditor = (function(_super) {

    __extends(HtmlEditor, _super);

    function HtmlEditor(core) {
      HtmlEditor.__super__.constructor.call(this, core);
      this.textarea = autoIndentableHtml(this.textarea);
    }

    HtmlEditor.prototype.h1 = function() {
      return headerMarkup.call(this, 1);
    };

    HtmlEditor.prototype.h2 = function() {
      return headerMarkup.call(this, 2);
    };

    HtmlEditor.prototype.h3 = function() {
      return headerMarkup.call(this, 3);
    };

    HtmlEditor.prototype.h4 = function() {
      return headerMarkup.call(this, 4);
    };

    HtmlEditor.prototype.h5 = function() {
      return headerMarkup.call(this, 5);
    };

    HtmlEditor.prototype.h6 = function() {
      return headerMarkup.call(this, 6);
    };

    HtmlEditor.prototype.bold = function() {
      return this.enclose("<b>", "</b>");
    };

    HtmlEditor.prototype.italic = function() {
      return this.enclose("<i>", "</i>");
    };

    HtmlEditor.prototype.underline = function() {
      return this.enclose("<u>", "</u>");
    };

    HtmlEditor.prototype.strike = function() {
      return this.enclose("<s>", "</s>");
    };

    HtmlEditor.prototype.superscript = function() {
      return this.enclose("<sup>", "</sup>");
    };

    HtmlEditor.prototype.subscript = function() {
      return this.enclose("<sub>", "</sub>");
    };

    HtmlEditor.prototype.quote = function() {
      return this.enclose("<q>", "</q>");
    };

    HtmlEditor.prototype.blockquote = function() {
      return this.enclose("\n<blockquote>", "</blockquote>\n");
    };

    HtmlEditor.prototype.code = function() {
      return this.enclose("<code>", "</code>");
    };

    HtmlEditor.prototype.pre = function() {
      return this.enclose("<pre>", "</pre>");
    };

    HtmlEditor.prototype.anchorLink = function() {
      var href, text;
      text = this.selection();
      if (!text) {
        text = window.prompt("Please input a link text", "Here");
      }
      href = window.prompt("Please input a link url", "http://");
      if (!(href != null)) {
        return;
      }
      return this.selection("<a href='" + href + "'>" + text + "</a>");
    };

    HtmlEditor.prototype.image = function() {
      var alt, src;
      src = window.prompt("Please input a image url", "http://");
      alt = window.prompt("(Optional) Please input a alt message", "Image");
      if (!(src != null)) {
        return;
      }
      return this.selection("<img src='" + src + "' alt='" + alt + "'>");
    };

    HtmlEditor.prototype.unorderedList = function() {
      var text, x;
      text = this.selection();
      text = (function() {
        var _i, _len, _ref, _results;
        _ref = text.split("\n");
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          x = _ref[_i];
          _results.push("  <li>" + x + "</li>");
        }
        return _results;
      })();
      text.unshift("<ul>");
      text.push("</ul>");
      return this.selection(text.join("\n"));
    };

    HtmlEditor.prototype.orderedList = function() {
      var text, x;
      text = this.selection();
      text = (function() {
        var _i, _len, _ref, _results;
        _ref = text.split("\n");
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          x = _ref[_i];
          _results.push("  <li>" + x + "</li>");
        }
        return _results;
      })();
      text.unshift("<ol>");
      text.push("</ol>");
      return this.selection(text.join("\n"));
    };

    return HtmlEditor;

  })(TextEditor);

  HtmlViewer = TemplateViewer;

  HtmlHelper = (function(_super) {

    __extends(HtmlHelper, _super);

    function HtmlHelper(core) {
      var HTML_HELPER_HTML;
      HtmlHelper.__super__.constructor.call(this, core);
      HTML_HELPER_HTML = "<p><span class=\"key\">Ctrl+Z</span>" + (Jencil.t("Undo")) + "<p>\n<p><span class=\"key\">Ctrl+Shift+Z</span>" + (Jencil.t("Redo")) + "<p>\n<p><span class=\"key\">Ctrl+B</span>" + (Jencil.t("Make selected text property as <b>Bold</b>")) + "<p>\n<p><span class=\"key\">Ctrl+I</span>" + (Jencil.t("Make selected text property as <i>Italic</i>")) + "<p>\n<p><span class=\"key\">Ctrl+U</span>" + (Jencil.t("Underline selected text like <u>Underline</u>")) + "<p>\n<p><span class=\"key\">Ctrl+F</span>" + (Jencil.t("Toggle fullscreen mode")) + "<p>\n<p><span class=\"key\">Ctrl+Q</span>" + (Jencil.t("Toggle quick view")) + "<p>\n<p><span class=\"key\">Ctrl+H</span>" + (Jencil.t("Toggle help")) + "<p>";
      this.element.html(HTML_HELPER_HTML);
    }

    return HtmlHelper;

  })(BaseHelper);

  HtmlProfile = {
    mainPanelClass: TrimainPanel,
    editorClass: HtmlEditor,
    viewerClass: HtmlViewer,
    helperClass: HtmlHelper,
    defaultVolume: 1,
    defaultVolume2: 0.7,
    toolbarButtons: ['Undo', 'Redo', 'Separator', ['h1', 'H1'], ['h2', 'H2'], ['h3', 'H3'], ['h4', 'H4'], ['h5', 'H5'], ['h6', 'H6'], 'Separator', ['bold', 'Bold', 'Ctrl+B'], ['italic', 'Italic', 'Ctrl+I'], ['underline', 'Underline', 'Ctrl+U'], ['strike', 'Strikeout'], ['superscript', 'Superscript'], ['subscript', 'Subscript'], 'Separator', ['anchorLink', 'Anchor link'], ['image', 'Image'], ['unorderedList', 'Unordered list'], ['orderedList', 'Ordered list'], ['quote', 'Quote'], ['blockquote', 'Blockquote'], ['code', 'Code'], ['pre', 'Pre'], 'Separator', 'Fullscreen'],
    statusbarButtons: ['Viewer', 'Helper']
  };

  namespace('Jencil.profiles', function(exports) {
    return exports.HtmlProfile = HtmlProfile;
  });

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

  MarkdownJsViewer = (function(_super) {

    __extends(MarkdownJsViewer, _super);

    function MarkdownJsViewer() {
      return MarkdownJsViewer.__super__.constructor.apply(this, arguments);
    }

    MarkdownJsViewer.prototype.update = function(value, force) {
      var html;
      html = window.markdown.toHTML(value);
      return MarkdownJsViewer.__super__.update.call(this, html, force);
    };

    return MarkdownJsViewer;

  })(TemplateViewer);

  MarkdownProfile = {
    mainPanelClass: DimainPanel,
    editorClass: MarkdownEditor,
    viewerClass: MarkdownJsViewer,
    defaultVolume: 1,
    toolbarButtons: ['Undo', 'Redo', 'Separator', ['h1', 'H1'], ['h2', 'H2'], ['h3', 'H3'], ['h4', 'H4'], ['h5', 'H5'], ['h6', 'H6'], 'Separator', ['bold', 'Bold', 'Ctrl+B'], ['italic', 'Italic', 'Ctrl+I'], 'Separator', ['anchorLink', 'Anchor link'], ['image', 'Image'], ['unorderedList', 'Unordered list'], ['orderedList', 'Ordered list'], ['blockquote', 'Blockquote'], ['code', 'Code'], 'Separator', 'Fullscreen'],
    statusbarButtons: ['Viewer']
  };

  namespace('Jencil.profiles', function(exports) {
    return exports.MarkdownProfile = MarkdownProfile;
  });

}).call(this);
