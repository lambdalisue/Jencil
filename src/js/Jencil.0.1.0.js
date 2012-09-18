/**
 * Jencil 0.1.0
 *
 * Author:  lambdalisue
 * URL:     http://hashnote.net/
 * License: MIT License
 * 
 * Copyright (C) 2012 lambdalisue, hashnote.net allright reserved.
 *
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

/*
* Tabby jQuery plugin version 0.12
*
* Ted Devito - http://teddevito.com/demos/textarea.html
*
* Copyright (c) 2009 Ted Devito
*
* Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following
* conditions are met:
*
* 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer
* in the documentation and/or other materials provided with the distribution.
* 3. The name of the author may not be used to endorse or promote products derived from this software without specific prior written
* permission.
*
* THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
* PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
* THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
* OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
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
if (18 == kc) {pressed.alt = true; setTimeout("$.fn.tabby.pressed.alt = false;",1000);}

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
if ("\t" == o.value.substring(ss-options.tabString.length, ss)) {
o.value = o.value.substring(0, ss-options.tabString.length) + o.value.substring(ss); // put it back together omitting one character to the left
o.focus();
o.setSelectionRange(ss - options.tabString.length, ss - options.tabString.length);
}
// then check to the right of the caret
else if ("\t" == o.value.substring(ss, ss + options.tabString.length)) {
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

// i18next, v1.5.6
// Copyright (c)2012 Jan Mühlemann (jamuhl).
// Distributed under MIT license
// http://i18next.com
(function() {

    // add indexOf to non ECMA-262 standard compliant browsers
    if (!Array.prototype.indexOf) {  
        Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {  
            "use strict";  
            if (this == null) {  
                throw new TypeError();  
            }  
            var t = Object(this);  
            var len = t.length >>> 0;  
            if (len === 0) {  
                return -1;  
            }  
            var n = 0;  
            if (arguments.length > 0) {  
                n = Number(arguments[1]);  
                if (n != n) { // shortcut for verifying if it's NaN  
                    n = 0;  
                } else if (n != 0 && n != Infinity && n != -Infinity) {  
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));  
                }  
            }  
            if (n >= len) {  
                return -1;  
            }  
            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);  
            for (; k < len; k++) {  
                if (k in t && t[k] === searchElement) {  
                    return k;  
                }  
            }  
            return -1;  
        }
    } 

    var root = this
      , $ = root.jQuery
      , i18n = {}
      , resStore = {}
      , currentLng
      , replacementCounter = 0
      , languages = [];


    // Export the i18next object for **CommonJS**. 
    // If we're not in CommonJS, add `i18n` to the
    // global object or to jquery.
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = i18n;
    } else {
        if ($) {
            $.i18n = $.i18n || i18n;
        }
        
        root.i18n = root.i18n || i18n;
    }
    // defaults
    var o = {
        lng: undefined,
        load: 'all',
        preload: [],
        lowerCaseLng: false,
        returnObjectTrees: false,
        fallbackLng: 'dev',
        ns: 'translation',
        nsseparator: ':',
        keyseparator: '.',
        debug: false,
        
        resGetPath: 'locales/__lng__/__ns__.json',
        resPostPath: 'locales/add/__lng__/__ns__',
    
        getAsync: true,
        postAsync: true,
    
        resStore: undefined,
        useLocalStorage: false,
        localStorageExpirationTime: 7*24*60*60*1000,
    
        dynamicLoad: false,
        sendMissing: false,
        sendMissingTo: 'fallback', // current | all
        sendType: 'POST',
    
        interpolationPrefix: '__',
        interpolationSuffix: '__',
        reusePrefix: '$t(',
        reuseSuffix: ')',
        pluralSuffix: '_plural',
        pluralNotFound: ['plural_not_found', Math.random()].join(''),
        contextNotFound: ['context_not_found', Math.random()].join(''),
    
        setJqueryExt: true,
        useDataAttrOptions: false,
        cookieExpirationTime: undefined,
    
        postProcess: undefined
    };
    function _extend(target, source) {
        if (!source || typeof source === 'function') {
            return target;
        }
        
        for (var attr in source) { target[attr] = source[attr]; }
        return target;
    }
    
    function _each(object, callback, args) {
        var name, i = 0,
            length = object.length,
            isObj = length === undefined || typeof object === "function";
    
        if (args) {
            if (isObj) {
                for (name in object) {
                    if (callback.apply(object[name], args) === false) {
                        break;
                    }
                }
            } else {
                for ( ; i < length; ) {
                    if (callback.apply(object[i++], args) === false) {
                        break;
                    }
                }
            }
    
        // A special, fast, case for the most common use of each
        } else {
            if (isObj) {
                for (name in object) {
                    if (callback.call(object[name], name, object[name]) === false) {
                        break;
                    }
                }
            } else {
                for ( ; i < length; ) {
                    if (callback.call(object[i], i, object[i++]) === false) {
                        break;
                    }
                }
            }
        }
    
        return object;
    }
    
    function _ajax(options) {
    
        // v0.5.0 of https://github.com/goloroden/http.js
        var getXhr = function (callback) {
            // Use the native XHR object if the browser supports it.
            if (window.XMLHttpRequest) {
                return callback(null, new XMLHttpRequest());
            } else if (window.ActiveXObject) {
                // In Internet Explorer check for ActiveX versions of the XHR object.
                try {
                    return callback(null, new ActiveXObject("Msxml2.XMLHTTP"));
                } catch (e) {
                    return callback(null, new ActiveXObject("Microsoft.XMLHTTP"));
                }
            }
    
            // If no XHR support was found, throw an error.
            return callback(new Error());
        };
    
        var encodeUsingUrlEncoding = function (data) {
            if(typeof data === 'string') {
                return data;
            }
    
            var result = [];
            for(var dataItem in data) {
                if(data.hasOwnProperty(dataItem)) {
                    result.push(encodeURIComponent(dataItem) + '=' + encodeURIComponent(data[dataItem]));
                }
            }
    
            return result.join('&');
        };
    
        var utf8 = function (text) {
            text = text.replace(/\r\n/g, '\n');
            var result = '';
    
            for(var i = 0; i < text.length; i++) {
                var c = text.charCodeAt(i);
    
                if(c < 128) {
                        result += String.fromCharCode(c);
                } else if((c > 127) && (c < 2048)) {
                        result += String.fromCharCode((c >> 6) | 192);
                        result += String.fromCharCode((c & 63) | 128);
                } else {
                        result += String.fromCharCode((c >> 12) | 224);
                        result += String.fromCharCode(((c >> 6) & 63) | 128);
                        result += String.fromCharCode((c & 63) | 128);
                }
            }
    
            return result;
        };
    
        var base64 = function (text) {
            var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    
            text = utf8(text);
            var result = '',
                    chr1, chr2, chr3,
                    enc1, enc2, enc3, enc4,
                    i = 0;
    
            do {
                chr1 = text.charCodeAt(i++);
                chr2 = text.charCodeAt(i++);
                chr3 = text.charCodeAt(i++);
    
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
    
                if(isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if(isNaN(chr3)) {
                    enc4 = 64;
                }
    
                result +=
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = '';
                enc1 = enc2 = enc3 = enc4 = '';
            } while(i < text.length);
    
            return result;
        };
    
        var mergeHeaders = function () {
            // Use the first header object as base.
            var result = arguments[0];
    
            // Iterate through the remaining header objects and add them.
            for(var i = 1; i < arguments.length; i++) {
                var currentHeaders = arguments[i];
                for(var header in currentHeaders) {
                    if(currentHeaders.hasOwnProperty(header)) {
                        result[header] = currentHeaders[header];
                    }
                }
            }
    
            // Return the merged headers.
            return result;
        };
    
        var ajax = function (method, url, options, callback) {
            // Adjust parameters.
            if(typeof options === 'function') {
                callback = options;
                options = {};
            }
    
            // Set default parameter values.
            options.cache = options.cache || false;
            options.data = options.data || {};
            options.headers = options.headers || {};
            options.jsonp = options.jsonp || false;
            options.async = options.async === undefined ? true : options.async;
    
            // Merge the various header objects.
            var headers = mergeHeaders({
                'accept': '*/*',
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }, ajax.headers, options.headers);
    
            // Encode the data according to the content-type.
            var payload;
            if (headers['content-type'] === 'application/json') {
                payload = JSON.stringify(options.data);
            } else {
                payload = encodeUsingUrlEncoding(options.data);            
            }
    
            // Specially prepare GET requests: Setup the query string, handle caching and make a JSONP call
            // if neccessary.
            if(method === 'GET') {
                // Setup the query string.
                var queryString = [];
                if(payload) {
                    queryString.push(payload);
                    payload = null;
                }
    
                // Handle caching.
                if(!options.cache) {
                    queryString.push('_=' + (new Date()).getTime());
                }
    
                // If neccessary prepare the query string for a JSONP call.
                if(options.jsonp) {
                    queryString.push('callback=' + options.jsonp);
                    queryString.push('jsonp=' + options.jsonp);
                }
    
                // Merge the query string and attach it to the url.
                queryString = '?' + queryString.join('&');
                url += queryString !== '?' ? queryString : '';
    
                // Make a JSONP call if neccessary.
                if(options.jsonp) {
                    var head = document.getElementsByTagName('head')[0];
                    var script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = url;
                    head.appendChild(script);                
                    return;
                }
            }
    
            // Since we got here, it is no JSONP request, so make a normal XHR request.
            getXhr(function (err, xhr) {
                if(err) return callback(err);
    
                // Open the request.
                xhr.open(method, url, options.async);
    
                // Set the request headers.
                for(var header in headers) {
                    if(headers.hasOwnProperty(header)) {
                        xhr.setRequestHeader(header, headers[header]);
                    }
                }
    
                // Handle the request events.
                xhr.onreadystatechange = function () {
                    if(xhr.readyState === 4) {
                        var data = xhr.responseText || '';
    
                        // If no callback is given, return.
                        if(!callback) {
                            return;
                        }
    
                        // Return an object that provides access to the data as text and JSON.
                        callback(xhr.status, {
                            text: function () {
                                return data;
                            },
    
                            json: function () {
                                return JSON.parse(data);
                            }
                        });
                    }
                };
    
                // Actually send the XHR request.
                xhr.send(payload);
            });
        };
    
        // Define the external interface.
        var http = {
            authBasic: function (username, password) {
                ajax.headers['Authorization'] = 'Basic ' + base64(username + ':' + password);
            },
    
            connect: function (url, options, callback) {
                return ajax('CONNECT', url, options, callback);            
            },
    
            del: function (url, options, callback) {
                return ajax('DELETE', url, options, callback);            
            },
    
            get: function (url, options, callback) {
                return ajax('GET', url, options, callback);
            },
    
            head: function (url, options, callback) {
                return ajax('HEAD', url, options, callback);
            },
    
            headers: function (headers) {
                ajax.headers = headers || {};
            },
    
            isAllowed: function (url, verb, callback) {
                this.options(url, function (status, data) {
                    callback(data.text().indexOf(verb) !== -1);
                });
            },
    
            options: function (url, options, callback) {
                return ajax('OPTIONS', url, options, callback);
            },
    
            patch: function (url, options, callback) {
                return ajax('PATCH', url, options, callback);            
            },
    
            post: function (url, options, callback) {
                return ajax('POST', url, options, callback);            
            },
            
            put: function (url, options, callback) {
                return ajax('PUT', url, options, callback);            
            },
    
            trace: function (url, options, callback) {
                return ajax('TRACE', url, options, callback);
            }
        };
    
    
        var methode = options.sendType ? options.sendType.toLowerCase() : 'get';
    
        http[methode](options.url, {async: options.async}, function (status, data) {
            if (status === 200) {
                options.success(data.json(), status, null);
            } else {
                options.error(data.text(), status, null);
            }
        });
    }
    
    var _cookie = {
        create: function(name,value,minutes) {
            var expires;
            if (minutes) {
                var date = new Date();
                date.setTime(date.getTime()+(minutes*60*1000));
                expires = "; expires="+date.toGMTString();
            }
            else expires = "";
            document.cookie = name+"="+value+expires+"; path=/";
        },
    
        read: function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        },
    
        remove: function(name) {
            this.create(name,"",-1);
        }
    };
    
    var cookie_noop = {
        create: function(name,value,minutes) {},
        read: function(name) { return null; },
        remove: function(name) {}
    };
    
    
    
    // move dependent functions to a container so that
    // they can be overriden easier in no jquery environment (node.js)
    var f = {
        extend: $ ? $.extend : _extend,
        each: $ ? $.each : _each,
        ajax: $ ? $.ajax : _ajax,
        cookie: typeof document !== 'undefined' ? _cookie : cookie_noop,
        detectLanguage: detectLanguage,
        log: function(str) {
            if (o.debug) console.log(str);
        },
        toLanguages: function(lng) {
            var languages = [];
            if (lng.indexOf('-') === 2 && lng.length === 5) {
                var parts = lng.split('-');
    
                lng = o.lowerCaseLng ? 
                    parts[0].toLowerCase() +  '-' + parts[1].toLowerCase() :
                    parts[0].toLowerCase() +  '-' + parts[1].toUpperCase();
    
                if (o.load !== 'unspecific') languages.push(lng);
                if (o.load !== 'current') languages.push(lng.substr(0, 2));
            } else {
                languages.push(lng);
            }
    
            if (languages.indexOf(o.fallbackLng) === -1 && o.fallbackLng) languages.push(o.fallbackLng);
    
            return languages;
        }
    };
    function init(options, cb) {
        
        if (typeof options === 'function') {
            cb = options;
            options = {};
        }
        options = options || {};
        
        // override defaults with passed in options
        f.extend(o, options);
    
        // create namespace object if namespace is passed in as string
        if (typeof o.ns == 'string') {
            o.ns = { namespaces: [o.ns], defaultNs: o.ns};
        }
    
        if (!o.lng) o.lng = f.detectLanguage(); 
        if (o.lng) {
            // set cookie with lng set (as detectLanguage will set cookie on need)
            f.cookie.create('i18next', o.lng, o.cookieExpirationTime);
        } else {
            o.lng =  o.fallbackLng;
            f.cookie.remove('i18next');
        }
    
        languages = f.toLanguages(o.lng);
        currentLng = languages[0];
        f.log('currentLng set to: ' + currentLng);
    
        pluralExtensions.setCurrentLng(currentLng);
    
        // add JQuery extensions
        if ($ && o.setJqueryExt) addJqueryFunct();
    
        // jQuery deferred
        var deferred;
        if ($ && $.Deferred) {
            deferred = $.Deferred();
        }
    
        // return immidiatly if res are passed in
        if (o.resStore) {
            resStore = o.resStore;
            if (cb) cb(translate);
            if (deferred) deferred.resolve();
            return deferred;
        }
    
        // languages to load
        var lngsToLoad = f.toLanguages(o.lng);
        if (typeof o.preload === 'string') o.preload = [o.preload];
        for (var i = 0, l = o.preload.length; i < l; i++) {
            var pres = f.toLanguages(o.preload[i]);
            for (var y = 0, len = pres.length; y < len; y++) {
                if (lngsToLoad.indexOf(pres[y]) < 0) {
                    lngsToLoad.push(pres[y]);
                }
            }
        }
    
        // else load them
        i18n.sync.load(lngsToLoad, o, function(err, store) {
            resStore = store;
    
            if (cb) cb(translate);
            if (deferred) deferred.resolve();
        });
    
        return deferred;
    }
    function preload(lngs, cb) {
        if (typeof lngs === 'string') lngs = [lngs];
        for (var i = 0, l = lngs.length; i < l; i++) {
            if (o.preload.indexOf(lngs[i]) < 0) {
                o.preload.push(lngs[i]);
            }
        }
        return init(cb);
    }
    
    function setLng(lng, cb) {
        return init({lng: lng}, cb);
    }
    
    function lng() {
        return currentLng;
    }
    function addJqueryFunct() {
        // $.t shortcut
        $.t = $.t || translate;
    
        function parse(ele, key, options) {
            if (key.length === 0) return;
    
            var attr = 'text';
    
            if (key.indexOf('[') === 0) {
                var parts = key.split(']');
                key = parts[1];
                attr = parts[0].substr(1, parts[0].length-1);
            }
    
            if (key.indexOf(';') === key.length-1) {
                key = key.substr(0, key.length-2);
            }
    
            var optionsToUse;
            if (attr === 'html') {
                optionsToUse = $.extend({ defaultValue: ele.html() }, options);
                ele.html($.t(key, optionsToUse));
            } 
            else if (attr === 'text') {
                optionsToUse = $.extend({ defaultValue: ele.text() }, options);
                ele.text($.t(key, optionsToUse));
            } else {
                optionsToUse = $.extend({ defaultValue: ele.attr(attr) }, options);
                ele.attr(attr, $.t(key, optionsToUse));
            }
        }
    
        function localize(ele, options) {
            var key = ele.attr('data-i18n');
            if (!key) return;
    
            if (!options && o.useDataAttrOptions === true) {
                options = ele.data("i18n-options");
            }
            options = options || {};
    
            if (key.indexOf(';') <= key.length-1) {
                var keys = key.split(';');
    
                $.each(keys, function(m, k) {
                    parse(ele, k, options);
                });
    
            } else {
                parse(ele, k, options);
            }
    
            if (o.useDataAttrOptions === true) ele.data("i18n-options", options);
        }
    
        // fn
        $.fn.i18n = function (options) {
            return this.each(function() {
                // localize element itself
                localize($(this), options);
    
                // localize childs
                var elements =  $(this).find('[data-i18n]');
                elements.each(function() { 
                    localize($(this), options);
                });
            });
        };
    }
    function applyReplacement(str, replacementHash, nestedKey) {
        if (str.indexOf(o.interpolationPrefix) < 0) return str;
    
        f.each(replacementHash, function(key, value) {
            if (typeof value === 'object') {
                str = applyReplacement(str, value, key);
            } else {
                str = str.replace(new RegExp([o.interpolationPrefix, nestedKey ? nestedKey + '.' + key : key, o.interpolationSuffix].join(''), 'g'), value);
            }
        });
        return str;
    }
    
    function applyReuse(translated, options){
        var opts = f.extend({}, options);
        delete opts.postProcess;
    
        while (translated.indexOf(o.reusePrefix) != -1) {
            replacementCounter++;
            if (replacementCounter > o.maxRecursion) { break; } // safety net for too much recursion
            var index_of_opening = translated.indexOf(o.reusePrefix);
            var index_of_end_of_closing = translated.indexOf(o.reuseSuffix, index_of_opening) + o.reuseSuffix.length;
            var token = translated.substring(index_of_opening, index_of_end_of_closing);
            var token_sans_symbols = token.replace(o.reusePrefix, '').replace(o.reuseSuffix, '');
            var translated_token = _translate(token_sans_symbols, opts);
            translated = translated.replace(token, translated_token);
        }
        return translated;
    }
    
    function hasContext(options) {
        return (options.context && typeof options.context == 'string');
    }
    
    function needsPlural(options) {
        return (options.count !== undefined && typeof options.count != 'string' && options.count !== 1);
    }
    
    function translate(key, options){
        replacementCounter = 0;
        return _translate(key, options);
    }
    
    function _translate(key, options){
        options = options || {};
    
        var optionsSansCount, translated
          , notfound = options.defaultValue || key
          , lngs = languages;
    
        if (options.lng) {
            lngs = f.toLanguages(options.lng);
    
            if (!resStore[lngs[0]]) {
                var oldAsync = o.getAsync;
                o.getAsync = false;
    
                i18n.sync.load(lngs, o, function(err, store) {
                    f.extend(resStore, store);
                    o.getAsync = oldAsync;
                });
            }
        }
    
        if (!resStore) { return notfound; } // no resStore to translate from
    
        var ns = o.ns.defaultNs;
        if (key.indexOf(o.nsseparator) > -1) {
            var parts = key.split(o.nsseparator);
            ns = parts[0];
            key = parts[1];
        }
    
        if (hasContext(options)) {
            optionsSansCount = f.extend({}, options);
            delete optionsSansCount.context;
            optionsSansCount.defaultValue = o.contextNotFound;
    
            var contextKey = ns + ':' + key + '_' + options.context;
            
            translated = translate(contextKey, optionsSansCount);
            if (translated != o.contextNotFound) {
                return applyReplacement(translated, { context: options.context }); // apply replacement for context only
            } // else continue translation with original/nonContext key
        }
    
        if (needsPlural(options)) {
            optionsSansCount = f.extend({}, options);
            delete optionsSansCount.count;
            optionsSansCount.defaultValue = o.pluralNotFound;
    
            var pluralKey = ns + ':' + key + o.pluralSuffix;
            var pluralExtension = pluralExtensions.get(currentLng, options.count);
            if (pluralExtension >= 0) { 
                pluralKey = pluralKey + '_' + pluralExtension; 
            } else if (pluralExtension === 1) {
                pluralKey = ns + ':' + key; // singular
            }
            
            translated = translate(pluralKey, optionsSansCount);
            if (translated != o.pluralNotFound) {
                return applyReplacement(translated, { count: options.count }); // apply replacement for count only
            } // else continue translation with original/singular key
        }
    
        var found;
        var keys = key.split(o.keyseparator);
        for (var i = 0, len = lngs.length; i < len; i++ ) {
            if (found) break;
    
            var l = lngs[i];
    
            var x = 0;
            var value = resStore[l] && resStore[l][ns];
            while (keys[x]) {
                value = value && value[keys[x]];
                x++;
            }
            if (value) {
                if (typeof value === 'string') {
                    value = applyReplacement(value, options);
                    value = applyReuse(value, options);
                } else if (Object.prototype.toString.apply(value) === '[object Array]' && !o.returnObjectTrees && !options.returnObjectTrees) {
                    value = value.join('\n');
                    value = applyReplacement(value, options);
                    value = applyReuse(value, options);
                } else {
                    if (!o.returnObjectTrees && !options.returnObjectTrees) {
                        value = 'key \'' + ns + ':' + key + ' (' + l + ')\' ' + 
                                'returned a object instead of string.';
                        f.log(value);
                    } else {
                        for (var m in value) {
                            // apply translation on childs
                            value[m] = _translate(key + '.' + m, options);
                        }
                    }
                }
                found = value;
            }
        }
    
        if (!found && o.sendMissing) {
            if (options.lng) {
                sync.postMissing(options.lng, ns, key, notfound, lngs);
            } else {
                sync.postMissing(o.lng, ns, key, notfound, lngs);
            }
        }
    
        var postProcessor = options.postProcess || o.postProcess;
        if (found && postProcessor) {
            if (postProcessors[postProcessor]) {
                found = postProcessors[postProcessor](found, key, options);
            }
        }
    
        if (!found) {
            notfound = applyReplacement(notfound, options);
            notfound = applyReuse(notfound, options);
        }
    
        return (found) ? found : notfound;
    }
    function detectLanguage() {
        var detectedLng;
    
        // get from qs
        var qsParm = [];
        if (typeof window !== 'undefined') {
            (function() {
                var query = window.location.search.substring(1);
                var parms = query.split('&');
                for (var i=0; i<parms.length; i++) {
                    var pos = parms[i].indexOf('=');
                    if (pos > 0) {
                        var key = parms[i].substring(0,pos);
                        var val = parms[i].substring(pos+1);
                        qsParm[key] = val;
                    }
                }
            })();
            if (qsParm.setLng) {
                detectedLng = qsParm.setLng;
            }
        }
    
        // get from cookie
        if (!detectedLng && typeof document !== 'undefined') {
            var c = f.cookie.read('i18next');
            if (c) detectedLng = c;
        }
    
        // get from navigator
        if (!detectedLng && typeof navigator !== 'undefined') {
            detectedLng =  (navigator.language) ? navigator.language : navigator.userLanguage;
        }
        
        return detectedLng;
    }
    var sync = {
    
        load: function(lngs, options, cb) {
            if (options.useLocalStorage) {
                sync._loadLocal(lngs, options, function(err, store) {
                    var missingLngs = [];
                    for (var i = 0, len = lngs.length; i < len; i++) {
                        if (!store[lngs[i]]) missingLngs.push(lngs[i]);
                    }
    
                    if (missingLngs.length > 0) {
                        sync._fetch(missingLngs, options, function(err, fetched){
                            f.extend(store, fetched);
                            sync._storeLocal(fetched);
    
                            cb(null, store);
                        });
                    } else {
                        cb(null, store);
                    }
                });
            } else {
                sync._fetch(lngs, options, function(err, store){
                    cb(null, store);
                });
            }
        },
    
        _loadLocal: function(lngs, options, cb) {
            var store = {}
              , nowMS = new Date().getTime();
    
            if(window.localStorage) {
    
                var todo = lngs.length;
    
                f.each(lngs, function(key, lng) {
                    var local = window.localStorage.getItem('res_' + lng);
    
                    if (local) {
                        local = JSON.parse(local);
    
                        if (local.i18nStamp && local.i18nStamp + options.localStorageExpirationTime > nowMS) {
                            store[lng] = local;
                        }
                    }
    
                    todo--; // wait for all done befor callback
                    if (todo === 0) cb(null, store);
                });
            }
        },
    
        _storeLocal: function(store) {
            if(window.localStorage) {
                for (var m in store) {
                    store[m].i18nStamp = new Date().getTime();
                    window.localStorage.setItem('res_' + m, JSON.stringify(store[m]));
                }
            }
            return;
        },
    
        _fetch: function(lngs, options, cb) {
            var ns = options.ns
              , store = {};
            
            if (!options.dynamicLoad) {
                var todo = ns.namespaces.length * lngs.length
                  , errors;
    
                // load each file individual
                f.each(ns.namespaces, function(nsIndex, nsValue) {
                    f.each(lngs, function(lngIndex, lngValue) {
                        sync._fetchOne(lngValue, nsValue, options, function(err, data) {
                            if (err) {
                                errors = errors || [];
                                errors.push(err);
                            }
                            store[lngValue] = store[lngValue] || {};
                            store[lngValue][nsValue] = data;
    
                            todo--; // wait for all done befor callback
                            if (todo === 0) cb(errors, store);
                        });
                    });
                });
            } else {
                var url = applyReplacement(options.resGetPath, { lng: lngs.join('+'), ns: ns.namespaces.join('+') });
                // load all needed stuff once
                f.ajax({
                    url: url,
                    success: function(data, status, xhr) {
                        f.log('loaded: ' + url);
                        cb(null, data);
                    },
                    error : function(xhr, status, error) {
                        f.log('failed loading: ' + url);
                        cb('failed loading resource.json error: ' + error);
                    },
                    dataType: "json",
                    async : options.getAsync
                });         
            }
        },
    
        _fetchOne: function(lng, ns, options, done) {
            var url = applyReplacement(options.resGetPath, { lng: lng, ns: ns });
            f.ajax({
                url: url,
                success: function(data, status, xhr) {
                    f.log('loaded: ' + url);
                    done(null, data);
                },
                error : function(xhr, status, error) {
                    f.log('failed loading: ' + url);
                    done(error, {});
                },
                dataType: "json",
                async : options.getAsync
            });
        },
    
        postMissing: function(lng, ns, key, defaultValue, lngs) {
            var payload = {};
            payload[key] = defaultValue;
    
            var urls = [];
    
            if (o.sendMissingTo === 'fallback') {
                urls.push({lng: o.fallbackLng, url: applyReplacement(o.resPostPath, { lng: o.fallbackLng, ns: ns })});
            } else if (o.sendMissingTo === 'current') {
                urls.push({lng: lng, url: applyReplacement(o.resPostPath, { lng: lng, ns: ns })});
            } else if (o.sendMissingTo === 'all') {
                for (var i = 0, l = lngs.length; i < l; i++) {
                    urls.push({lng: lngs[i], url: applyReplacement(o.resPostPath, { lng: lngs[i], ns: ns })});
                }
            }
    
            for (var y = 0, len = urls.length; y < len; y++) {
                var item = urls[y];
                f.ajax({
                    url: item.url,
                    type: o.sendType,
                    data: payload,
                    success: function(data, status, xhr) {
                        f.log('posted missing key \'' + key + '\' to: ' + item.url);
                        resStore[item.lng][ns][key] = defaultValue;
                    },
                    error : function(xhr, status, error) {
                        f.log('failed posting missing key \'' + key + '\' to: ' + item.url);
                    },
                    dataType: "json",
                    async : o.postAsync
                });
            }
        }
    };
    // definition http://translate.sourceforge.net/wiki/l10n/pluralforms
    var pluralExtensions = {
    
        rules: {
            "ach": {
                "name": "Acholi", 
                "numbers": [
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n > 1); }
            }, 
            "af": {
                "name": "Afrikaans", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "ak": {
                "name": "Akan", 
                "numbers": [
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n > 1); }
            }, 
            "am": {
                "name": "Amharic", 
                "numbers": [
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n > 1); }
            }, 
            "an": {
                "name": "Aragonese", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "ar": {
                "name": "Arabic", 
                "numbers": [
                    0, 
                    1, 
                    2, 
                    3, 
                    11, 
                    100
                ], 
                "plurals": function(n) { return Number(n===0 ? 0 : n==1 ? 1 : n==2 ? 2 : n%100>=3 && n%100<=10 ? 3 : n%100>=11 ? 4 : 5); }
            }, 
            "arn": {
                "name": "Mapudungun", 
                "numbers": [
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n > 1); }
            }, 
            "ast": {
                "name": "Asturian", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "ay": {
                "name": "Aymar\u00e1", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "az": {
                "name": "Azerbaijani", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "be": {
                "name": "Belarusian", 
                "numbers": [
                    5, 
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2); }
            }, 
            "bg": {
                "name": "Bulgarian", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "bn": {
                "name": "Bengali", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "bo": {
                "name": "Tibetan", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "br": {
                "name": "Breton", 
                "numbers": [
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n > 1); }
            }, 
            "bs": {
                "name": "Bosnian", 
                "numbers": [
                    5, 
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2); }
            }, 
            "ca": {
                "name": "Catalan", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "cgg": {
                "name": "Chiga", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "cs": {
                "name": "Czech", 
                "numbers": [
                    5, 
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number((n==1) ? 0 : (n>=2 && n<=4) ? 1 : 2); }
            }, 
            "csb": {
                "name": "Kashubian", 
                "numbers": [
                    5, 
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n==1 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2); }
            }, 
            "cy": {
                "name": "Welsh", 
                "numbers": [
                    3, 
                    1, 
                    2, 
                    8
                ], 
                "plurals": function(n) { return Number((n==1) ? 0 : (n==2) ? 1 : (n != 8 && n != 11) ? 2 : 3); }
            }, 
            "da": {
                "name": "Danish", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "de": {
                "name": "German", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "dz": {
                "name": "Dzongkha", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "el": {
                "name": "Greek", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "en": {
                "name": "English", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "eo": {
                "name": "Esperanto", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "es": {
                "name": "Spanish", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "es_ar": {
                "name": "Argentinean Spanish", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "et": {
                "name": "Estonian", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "eu": {
                "name": "Basque", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "fa": {
                "name": "Persian", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "fi": {
                "name": "Finnish", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "fil": {
                "name": "Filipino", 
                "numbers": [
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n > 1); }
            }, 
            "fo": {
                "name": "Faroese", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "fr": {
                "name": "French", 
                "numbers": [
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n > 1); }
            }, 
            "fur": {
                "name": "Friulian", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "fy": {
                "name": "Frisian", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "ga": {
                "name": "Irish", 
                "numbers": [
                    3, 
                    1, 
                    2, 
                    7, 
                    11
                ], 
                "plurals": function(n) { return Number(n==1 ? 0 : n==2 ? 1 : n<7 ? 2 : n<11 ? 3 : 4) ;}
            }, 
            "gd": {
                "name": "Scottish Gaelic", 
                "numbers": [
                    20, 
                    1, 
                    2, 
                    3
                ], 
                "plurals": function(n) { return Number((n==1 || n==11) ? 0 : (n==2 || n==12) ? 1 : (n > 2 && n < 20) ? 2 : 3); }
            }, 
            "gl": {
                "name": "Galician", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "gu": {
                "name": "Gujarati", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "gun": {
                "name": "Gun", 
                "numbers": [
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n > 1); }
            }, 
            "ha": {
                "name": "Hausa", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "he": {
                "name": "Hebrew", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "hi": {
                "name": "Hindi", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "hr": {
                "name": "Croatian", 
                "numbers": [
                    5, 
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2); }
            }, 
            "hu": {
                "name": "Hungarian", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "hy": {
                "name": "Armenian", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "ia": {
                "name": "Interlingua", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "id": {
                "name": "Indonesian", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "is": {
                "name": "Icelandic", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n%10!=1 || n%100==11); }
            }, 
            "it": {
                "name": "Italian", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "ja": {
                "name": "Japanese", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "jbo": {
                "name": "Lojban", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "jv": {
                "name": "Javanese", 
                "numbers": [
                    0, 
                    1
                ], 
                "plurals": function(n) { return Number(n !== 0); }
            }, 
            "ka": {
                "name": "Georgian", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "kk": {
                "name": "Kazakh", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "km": {
                "name": "Khmer", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "kn": {
                "name": "Kannada", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "ko": {
                "name": "Korean", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "ku": {
                "name": "Kurdish", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "kw": {
                "name": "Cornish", 
                "numbers": [
                    4, 
                    1, 
                    2, 
                    3
                ], 
                "plurals": function(n) { return Number((n==1) ? 0 : (n==2) ? 1 : (n == 3) ? 2 : 3); }
            }, 
            "ky": {
                "name": "Kyrgyz", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "lb": {
                "name": "Letzeburgesch", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "ln": {
                "name": "Lingala", 
                "numbers": [
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n > 1); }
            }, 
            "lo": {
                "name": "Lao", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "lt": {
                "name": "Lithuanian", 
                "numbers": [
                    10, 
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n%10==1 && n%100!=11 ? 0 : n%10>=2 && (n%100<10 || n%100>=20) ? 1 : 2); }
            }, 
            "lv": {
                "name": "Latvian", 
                "numbers": [
                    0, 
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n%10==1 && n%100!=11 ? 0 : n !== 0 ? 1 : 2); }
            }, 
            "mai": {
                "name": "Maithili", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "mfe": {
                "name": "Mauritian Creole", 
                "numbers": [
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n > 1); }
            }, 
            "mg": {
                "name": "Malagasy", 
                "numbers": [
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n > 1); }
            }, 
            "mi": {
                "name": "Maori", 
                "numbers": [
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n > 1); }
            }, 
            "mk": {
                "name": "Macedonian", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n==1 || n%10==1 ? 0 : 1); }
            }, 
            "ml": {
                "name": "Malayalam", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "mn": {
                "name": "Mongolian", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "mnk": {
                "name": "Mandinka", 
                "numbers": [
                    0, 
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(0 ? 0 : n==1 ? 1 : 2); }
            }, 
            "mr": {
                "name": "Marathi", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "ms": {
                "name": "Malay", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "mt": {
                "name": "Maltese", 
                "numbers": [
                    2, 
                    1, 
                    11, 
                    20
                ], 
                "plurals": function(n) { return Number(n==1 ? 0 : n===0 || ( n%100>1 && n%100<11) ? 1 : (n%100>10 && n%100<20 ) ? 2 : 3); }
            }, 
            "nah": {
                "name": "Nahuatl", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "nap": {
                "name": "Neapolitan", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "nb": {
                "name": "Norwegian Bokmal", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "ne": {
                "name": "Nepali", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "nl": {
                "name": "Dutch", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "nn": {
                "name": "Norwegian Nynorsk", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "no": {
                "name": "Norwegian", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "nso": {
                "name": "Northern Sotho", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "oc": {
                "name": "Occitan", 
                "numbers": [
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n > 1); }
            }, 
            "or": {
                "name": "Oriya", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "pa": {
                "name": "Punjabi", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "pap": {
                "name": "Papiamento", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "pl": {
                "name": "Polish", 
                "numbers": [
                    5, 
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n==1 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2); }
            }, 
            "pms": {
                "name": "Piemontese", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "ps": {
                "name": "Pashto", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "pt": {
                "name": "Portuguese", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "pt_br": {
                "name": "Brazilian Portuguese", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "rm": {
                "name": "Romansh", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "ro": {
                "name": "Romanian", 
                "numbers": [
                    2, 
                    1, 
                    20
                ], 
                "plurals": function(n) { return Number(n==1 ? 0 : (n===0 || (n%100 > 0 && n%100 < 20)) ? 1 : 2); }
            }, 
            "ru": {
                "name": "Russian", 
                "numbers": [
                    5, 
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2); }
            }, 
            "sah": {
                "name": "Yakut", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "sco": {
                "name": "Scots", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "se": {
                "name": "Northern Sami", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "si": {
                "name": "Sinhala", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "sk": {
                "name": "Slovak", 
                "numbers": [
                    5, 
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number((n==1) ? 0 : (n>=2 && n<=4) ? 1 : 2); }
            }, 
            "sl": {
                "name": "Slovenian", 
                "numbers": [
                    5, 
                    1, 
                    2, 
                    3
                ], 
                "plurals": function(n) { return Number(n%100==1 ? 1 : n%100==2 ? 2 : n%100==3 || n%100==4 ? 3 : 0); }
            }, 
            "so": {
                "name": "Somali", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "son": {
                "name": "Songhay", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "sq": {
                "name": "Albanian", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "sr": {
                "name": "Serbian", 
                "numbers": [
                    5, 
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2); }
            }, 
            "su": {
                "name": "Sundanese", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "sv": {
                "name": "Swedish", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "sw": {
                "name": "Swahili", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "ta": {
                "name": "Tamil", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "te": {
                "name": "Telugu", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "tg": {
                "name": "Tajik", 
                "numbers": [
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n > 1); }
            }, 
            "th": {
                "name": "Thai", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "ti": {
                "name": "Tigrinya", 
                "numbers": [
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n > 1); }
            }, 
            "tk": {
                "name": "Turkmen", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "tr": {
                "name": "Turkish", 
                "numbers": [
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n > 1); }
            }, 
            "tt": {
                "name": "Tatar", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "ug": {
                "name": "Uyghur", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "uk": {
                "name": "Ukrainian", 
                "numbers": [
                    5, 
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2); }
            }, 
            "ur": {
                "name": "Urdu", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "uz": {
                "name": "Uzbek", 
                "numbers": [
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n > 1); }
            }, 
            "vi": {
                "name": "Vietnamese", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "wa": {
                "name": "Walloon", 
                "numbers": [
                    1, 
                    2
                ], 
                "plurals": function(n) { return Number(n > 1); }
            }, 
            "wo": {
                "name": "Wolof", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }, 
            "yo": {
                "name": "Yoruba", 
                "numbers": [
                    2, 
                    1
                ], 
                "plurals": function(n) { return Number(n != 1); }
            }, 
            "zh": {
                "name": "Chinese", 
                "numbers": [
                    1
                ], 
                "plurals": function(n) { return 0; }
            }
        },
    
        // for demonstration only sl and ar is added but you can add your own pluralExtensions
        addRule: function(lng, obj) {
            pluralExtensions.rules[lng] = obj;    
        },
    
        setCurrentLng: function(lng) {
            if (!pluralExtensions.currentRule || pluralExtensions.currentRule.lng !== lng) {
                var parts = lng.split('-');
    
                pluralExtensions.currentRule = {
                    lng: lng,
                    rule: pluralExtensions.rules[parts[0]]
                };
            }
        },
    
        get: function(lng, count) {
            var parts = lng.split('-');
    
            function getResult(l, c) {
                var ext;
                if (pluralExtensions.currentRule && pluralExtensions.currentRule.lng === lng) {
                    ext = pluralExtensions.currentRule.rule; 
                } else {
                    ext = pluralExtensions.rules[l];
                }
                if (ext) {
                    var i = ext.plurals(c);
                    var number = ext.numbers[i];
                    if (ext.numbers.length === 2) {
                        if (number === 2) { 
                            number = 1;
                        } else if (number === 1) {
                            number = -1;
                        }
                    } //console.log(count + '-' + number);
                    return number;
                } else {
                    return c === 1 ? '1' : '-1';
                }
            }
                        
            return getResult(parts[0], count);
        }
    
    };
    var postProcessors = {};
    var addPostProcessor = function(name, fc) {
        postProcessors[name] = fc;
    };
    // sprintf support
    var sprintf = (function() {
        function get_type(variable) {
            return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
        }
        function str_repeat(input, multiplier) {
            for (var output = []; multiplier > 0; output[--multiplier] = input) {/* do nothing */}
            return output.join('');
        }
    
        var str_format = function() {
            if (!str_format.cache.hasOwnProperty(arguments[0])) {
                str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
            }
            return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
        };
    
        str_format.format = function(parse_tree, argv) {
            var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
            for (i = 0; i < tree_length; i++) {
                node_type = get_type(parse_tree[i]);
                if (node_type === 'string') {
                    output.push(parse_tree[i]);
                }
                else if (node_type === 'array') {
                    match = parse_tree[i]; // convenience purposes only
                    if (match[2]) { // keyword argument
                        arg = argv[cursor];
                        for (k = 0; k < match[2].length; k++) {
                            if (!arg.hasOwnProperty(match[2][k])) {
                                throw(sprintf('[sprintf] property "%s" does not exist', match[2][k]));
                            }
                            arg = arg[match[2][k]];
                        }
                    }
                    else if (match[1]) { // positional argument (explicit)
                        arg = argv[match[1]];
                    }
                    else { // positional argument (implicit)
                        arg = argv[cursor++];
                    }
    
                    if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
                        throw(sprintf('[sprintf] expecting number but found %s', get_type(arg)));
                    }
                    switch (match[8]) {
                        case 'b': arg = arg.toString(2); break;
                        case 'c': arg = String.fromCharCode(arg); break;
                        case 'd': arg = parseInt(arg, 10); break;
                        case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
                        case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
                        case 'o': arg = arg.toString(8); break;
                        case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
                        case 'u': arg = Math.abs(arg); break;
                        case 'x': arg = arg.toString(16); break;
                        case 'X': arg = arg.toString(16).toUpperCase(); break;
                    }
                    arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
                    pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
                    pad_length = match[6] - String(arg).length;
                    pad = match[6] ? str_repeat(pad_character, pad_length) : '';
                    output.push(match[5] ? arg + pad : pad + arg);
                }
            }
            return output.join('');
        };
    
        str_format.cache = {};
    
        str_format.parse = function(fmt) {
            var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
            while (_fmt) {
                if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
                    parse_tree.push(match[0]);
                }
                else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
                    parse_tree.push('%');
                }
                else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
                    if (match[2]) {
                        arg_names |= 1;
                        var field_list = [], replacement_field = match[2], field_match = [];
                        if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                            field_list.push(field_match[1]);
                            while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                                if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                                    field_list.push(field_match[1]);
                                }
                                else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                                    field_list.push(field_match[1]);
                                }
                                else {
                                    throw('[sprintf] huh?');
                                }
                            }
                        }
                        else {
                            throw('[sprintf] huh?');
                        }
                        match[2] = field_list;
                    }
                    else {
                        arg_names |= 2;
                    }
                    if (arg_names === 3) {
                        throw('[sprintf] mixing positional and named placeholders is not (yet) supported');
                    }
                    parse_tree.push(match);
                }
                else {
                    throw('[sprintf] huh?');
                }
                _fmt = _fmt.substring(match[0].length);
            }
            return parse_tree;
        };
    
        return str_format;
    })();
    
    var vsprintf = function(fmt, argv) {
        argv.unshift(fmt);
        return sprintf.apply(null, argv);
    };
    
    addPostProcessor("sprintf", function(val, key, opts) {
        if (!opts.sprintf) return val;
    
        if (Object.prototype.toString.apply(opts.sprintf) === '[object Array]') {
            return vsprintf(val, opts.sprintf);
        } else if (typeof opts.sprintf === 'object') {
            return sprintf(val, opts.sprintf);
        }
    
        return val;
    });
    // public api interface
    i18n.init = init;
    i18n.setLng = setLng;
    i18n.preload = preload;
    i18n.t = translate;
    i18n.translate = translate;
    i18n.detectLanguage = f.detectLanguage;
    i18n.pluralExtensions = pluralExtensions;
    i18n.sync = sync;
    i18n.functions = f;
    i18n.lng = lng;
    i18n.addPostProcessor = addPostProcessor;
    i18n.options = o;

})();

(function() {
  var ActionButton, AjaxViewer, Bar, BaseEditor, BaseViewer, Button, Caretaker, CommandButton, DimainPanel, Fullscreen, FullscreenButton, GithubFlavorMarkdownViewer, HelperButton, HorizontalPanel, HorizontalSplitter, HtmlEditor, HtmlHelper, HtmlProfile, HtmlViewer, MarkdownEditor, MarkdownHelper, MarkdownProfile, MarkdownViewer, MonomainPanel, MultiplePanel, Originator, Panel, Profile, RedoButton, Selection, Separator, Splitter, Statusbar, TemplateViewer, TextEditor, Toolbar, TrimainPanel, UndoButton, VerticalPanel, VerticalSplitter, ViewerButton, Widget, Workspace, Wrapper, animate, buttonFactory, curtainFactory, evolute,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.namespace = function(target, name, block) {
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

  Originator = (function() {

    function Originator() {}

    Originator.prototype.createMemento = function() {
      throw new Error("NotImplementedError");
    };

    Originator.prototype.setMemento = function(memento) {
      throw new Error("NotImplementedError");
    };

    /* DEBUG---
    */


    Originator.validate = function(instance) {
      if (!(instance.createMemento != null)) {
        throw new Error("Originator instance need `createMemento` method");
      }
      if (!(instance.setMemento != null)) {
        throw new Error("Originator instance need `setMemento` method");
      }
    };

    /* ---DEBUG
    */


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
        /* DEBUG---
        */

        Originator.validate(originator);
        /* ---DEBUG
        */

        this._originator = originator;
        return this;
      }
      return originator;
    };

    Caretaker.prototype.save = function(memento) {
      memento = memento || this.originator().createMemento();
      this._undoStack.push(memento);
      return this._redoStack = [];
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
      return curtain.show();
    };
    curtain.refresh = function() {
      curtain.width(element.outerWidth(true));
      return curtain.height(element.outerHeight(true));
    };
    curtain.off = function() {
      return curtain.hide();
    };
    return curtain;
  };

  animate = function(options) {
    /*
      Animate using easing function
    */

    var difference, startTime, step;
    options = $.extend({
      start: 0,
      end: 100,
      duration: 1000,
      callback: null,
      done: null,
      easing: null
    }, options);
    startTime = animate.now();
    difference = options.end - options.start;
    options.easing = options.easing || animate.easings["default"];
    step = function() {
      var epoch, x;
      epoch = animate.now() - startTime;
      x = options.easing(epoch, 0, 1, options.duration);
      x = x * difference + options.start;
      options.callback(x, epoch);
      if (epoch < options.duration) {
        return setTimeout(step, 1);
      } else {
        options.callback(options.end, options.duration);
        return typeof options.done === "function" ? options.done() : void 0;
      }
    };
    step();
    return null;
  };

  animate.now = function() {
    return (new Date()).getTime();
  };

  animate.easings = {
    "default": function(t, start, end, duration) {
      return jQuery.easing.swing(t / duration, t, start, end, duration);
    }
  };

  if (typeof exports !== "undefined" && exports !== null) {
    exports.animate = animate;
  }

  Profile = (function() {

    function Profile() {}

    Profile.prototype.mainPanelClass = null;

    Profile.prototype.editorClass = null;

    Profile.prototype.viewerClass = null;

    Profile.prototype.helperClass = null;

    Profile.prototype.buttons = null;

    return Profile;

  })();

  this.Jencil = (function() {

    function Jencil(textarea, options) {
      var _this = this;
      this.options = jQuery.extend({
        'profile': Jencil.filetypes.html.HtmlProfile,
        'resizable': true,
        'enableTabIndent': true,
        'enableAutoIndent': true
      }, options);
      this.element = textarea.hide();
      this.caretaker = new Caretaker();
      this.caretaker.originator = function() {
        return _this.editor();
      };
      this.wrapper = new Wrapper(this);
      this.fullscreen = new Fullscreen(this);
      this.element.after(this.wrapper.element).after(this.fullscreen.element);
      this.wrapper.init();
      this.wrapper.adjust();
      this.caretaker.save();
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

    return Jencil;

  })();

  $.fn.jencil = function(options) {
    return new Jencil($(this), options);
  };

  namespace('Jencil.profiles', function(exports) {
    return exports.Profile = Profile;
  });

  namespace('Jencil.utils', function(exports) {
    return exports.namespace = namespace;
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
      var callbackDone, end, volume,
        _this = this;
      volume = this.splitter.volume();
      callbackDone = null;
      if ((0 < volume && volume < 1)) {
        end = to;
        this.splitter._previousVolume = volume;
        callbackDone = callbackOff;
      } else {
        end = this.splitter._previousVolume || this.splitter.defaultVolume;
        if (end === to) {
          end = 0.5;
        }
        callbackDone = callbackOn;
      }
      return animate({
        done: callbackDone,
        start: volume,
        end: end,
        duration: 500,
        callback: function(value, epoch) {
          return _this.splitter.volume(value);
        }
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

  namespace('Jencil.ui.widgets', function(exports) {
    return exports.Widget = Widget;
  });

  namespace('Jencil.ui.widgets.panels', function(exports) {
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
          if (typeof _ref.refresh === "function") {
            _ref.refresh();
          }
        }
        if ((_ref1 = _this.snd.curtain) != null) {
          if (typeof _ref1.refresh === "function") {
            _ref1.refresh();
          }
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
          if (typeof _ref.off === "function") {
            _ref.off();
          }
        }
        if ((_ref1 = _this.snd.curtain) != null) {
          if (typeof _ref1.off === "function") {
            _ref1.off();
          }
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
          if (typeof _ref.on === "function") {
            _ref.on();
          }
        }
        if ((_ref1 = _this.snd.curtain) != null) {
          if (typeof _ref1.on === "function") {
            _ref1.on();
          }
        }
        e.stopPropagation();
        e.stopImmediatePropagation();
        return e.preventDefault();
      });
    }

    Splitter.prototype.init = function() {
      return this.container = evolute(this.element.parent());
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
      m2 = this.snd.element.maxWidth() + this.snd.element.nonContentWidth();
      if (m2 != null) {
        m2 = this.valueWidth() - m2;
      }
      if ((m1 != null) && (m2 != null)) {
        return Math.min(m1, m2);
      }
      return m1 || m2 || 0;
    };

    VerticalSplitter.prototype.maxValue = function() {
      var m1, m2, valueWidth;
      valueWidth = this.valueWidth();
      m1 = this.fst.element.maxWidth() + this.fst.element.nonContentWidth();
      m2 = this.snd.element.minWidth() + this.snd.element.nonContentWidth();
      if (m2 != null) {
        m2 = valueWidth - m2;
      }
      if ((m1 != null) && (m2 != null)) {
        return Math.max(m1, m2);
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
      m2 = this.snd.element.maxHeight() + this.snd.element.nonContentHeight();
      if (m2 != null) {
        m2 = this.valueWidth() - m2;
      }
      if ((m1 != null) && (m2 != null)) {
        return Math.min(m1, m2);
      }
      return m1 || m2 || 0;
    };

    HorizontalSplitter.prototype.maxValue = function() {
      var m1, m2, valueWidth;
      valueWidth = this.valueWidth();
      m1 = this.fst.element.maxHeight() + this.fst.element.nonContentHeight();
      m2 = this.snd.element.minHeight() + this.snd.element.nonContentHeight();
      if (m2 != null) {
        m2 = valueWidth - m2;
      }
      if ((m1 != null) && (m2 != null)) {
        return Math.max(m1, m2);
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

  namespace('Jencil.ui.widgets.splitters', function(exports) {
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
      this.textarea.selection = new Selection(window.document, this.textarea.get(0));
      if (($.fn.tabby != null) && this.core.options.enableTabIndent) {
        this.textarea.tabby({
          'tabString': '    '
        });
      }
      this.textarea.autoindent = function(e) {
        var indent, insert, line, _base, _base1;
        if (e.which === 13) {
          _this.core.caretaker.save();
          line = _this.textarea.selection.line();
          if (typeof (_base = _this.textarea.autoindent).preCallback === "function") {
            _base.preCallback(e, line);
          }
          indent = line.replace(/^(\s*).*$/, "$1");
          insert = "\n" + indent;
          _this.textarea.selection.insertAfter(insert, false);
          if (typeof (_base1 = _this.textarea.autoindent).postCallback === "function") {
            _base1.postCallback(e, line, indent, insert);
          }
          _this.textarea.focus();
          e.stopPropagation();
          e.stopImmediatePropagation();
          e.preventDefault();
          _this.change();
          return false;
        }
      };
      this.textarea.on('keydown', function(e) {
        if (_this.core.options.enableAutoIndent) {
          return _this.textarea.autoindent(e);
        }
      });
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
      var caret;
      if (keepSelection == null) {
        keepSelection = true;
      }
      caret = this.textarea.selection.caret();
      if (caret[0] === caret[1]) {
        this.textarea.selection.selectWholeCurrentLine();
      }
      this.textarea.selection.enclose(b, a, keepSelection);
      this.core.caretaker.save();
      return this.change();
    };

    TextEditor.prototype.insertBefore = function(str, keepSelection) {
      var caret;
      if (keepSelection == null) {
        keepSelection = true;
      }
      caret = this.textarea.selection.caret();
      if (caret[0] === caret[1]) {
        this.textarea.selection.selectWholeCurrentLine();
      }
      this.textarea.selection.insertBefore(str, keepSelection);
      this.core.caretaker.save();
      return this.change();
    };

    TextEditor.prototype.insertAfter = function(str, keepSelection) {
      var caret;
      if (keepSelection == null) {
        keepSelection = true;
      }
      caret = this.textarea.selection.caret();
      if (caret[0] === caret[1]) {
        this.textarea.selection.selectWholeCurrentLine();
      }
      this.textarea.selection.insertAfter(str, keepSelection);
      this.core.caretaker.save();
      return this.change();
    };

    return TextEditor;

  })(BaseEditor);

  namespace('Jencil.ui.widgets.editors', function(exports) {
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

  namespace('Jencil.ui.widgets.viewers', function(exports) {
    exports.BaseViewer = BaseViewer;
    exports.TemplateViewer = TemplateViewer;
    return exports.AjaxViewer = AjaxViewer;
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
      this.text = this.text || this.name;
      this.title = this.title || this.text;
      this.element.addClass('button').addClass(name);
      this.element.append($("<span>" + this.text + "</span>"));
      this.element.attr('title', this.title);
    }

    Button.prototype.enable = function() {
      return this.element.removeClass('disable');
    };

    Button.prototype.disable = function() {
      return this.element.addClass('disable');
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
          return callback();
        }
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

    CommandButton.prototype.init = function() {
      return this.validate();
    };

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
        if (!_this.core.caretaker.canUndo()) {
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
        if (!_this.core.caretaker.canRedo()) {
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
        if (_this.core.fullscreen.element.is(':visible')) {
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
      ViewerButton.__super__.constructor.call(this, core, 'viewer', 'Toggle viewer', 'Viewer', callback);
    }

    ViewerButton.prototype.validate = function() {
      if (!this.core.viewer()) {
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
      HelperButton.__super__.constructor.call(this, core, 'helper', 'Toggle helper', 'Helper', callback);
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

  namespace('Jencil.ui.widgets.buttons', function(exports) {
    exports.Separator = Separator;
    exports.Button = Button;
    exports.ActionButton = ActionButton;
    exports.CommandButton = CommandButton;
    exports.UndoButton = UndoButton;
    exports.RedoButton = RedoButton;
    exports.FullscreenButton = FullscreenButton;
    exports.ViewerButton = ViewerButton;
    return exports.HelperButton = HelperButton;
  });

  Wrapper = (function(_super) {

    __extends(Wrapper, _super);

    function Wrapper(core) {
      Wrapper.__super__.constructor.call(this, core);
      this.element.addClass('jencil wrapper');
      this.workspace = new Workspace(this.core);
      this.workspace.element.appendTo(this.element);
    }

    Wrapper.prototype.init = function() {
      var _this = this;
      if ((this.element.resizable != null) && this.core.options.resizable === true) {
        this.element.resizable({
          start: function() {
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
            return (_ref4 = _this.core.helper()) != null ? (_ref5 = _ref4.curtain) != null ? _ref5.on() : void 0 : void 0;
          },
          resize: function() {
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
          stop: function() {
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
        });
      }
      return this.workspace.init();
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
      this.profile(new core.options.profile);
    }

    Workspace.prototype.profile = function(profile) {
      var button, _i, _j, _len, _len1, _ref, _ref1,
        _this = this;
      if (profile != null) {
        this.element.empty();
        this.mainPanel = new profile.mainPanelClass(this.core, profile);
        this.mainPanel.editorPanel.change(function(value) {
          return _this.core.element.val(value);
        });
        this.toolbar = new Toolbar(this.core);
        _ref = profile.toolbarButtons;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          button = _ref[_i];
          button = buttonFactory(this.core, button);
          this.toolbar.addButton(button);
        }
        this.statusbar = new Statusbar(this.core);
        _ref1 = profile.statusbarButtons;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          button = _ref1[_j];
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

    return TrimainPanel;

  })(HorizontalPanel);

  namespace('Jencil.ui.widgets.panels', function(exports) {
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
        'height': '100%'
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

  HtmlEditor = (function(_super) {

    __extends(HtmlEditor, _super);

    function HtmlEditor(core) {
      var singleLineTags, x,
        _this = this;
      HtmlEditor.__super__.constructor.call(this, core);
      singleLineTags = (function() {
        var _i, _len, _ref, _results;
        _ref = ['p', 'li'];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          x = _ref[_i];
          _results.push(["<" + x + ">", "</" + x + ">", new RegExp("^\s*<" + x + ">"), new RegExp("</" + x + ">\s*$")]);
        }
        return _results;
      })();
      this.textarea.autoindent.preCallback = function(e, line) {
        var lineCaret, pattern, _i, _len;
        if (e.shiftKey) {
          return;
        }
        for (_i = 0, _len = singleLineTags.length; _i < _len; _i++) {
          pattern = singleLineTags[_i];
          if (pattern[3].test(line)) {
            lineCaret = _this.textarea.selection._getLineCaret();
            _this.textarea.selection.caret(lineCaret[1]);
            return;
          }
        }
      };
      this.textarea.autoindent.postCallback = function(e, line) {
        var pattern, _i, _len;
        if (e.shiftKey) {
          return;
        }
        for (_i = 0, _len = singleLineTags.length; _i < _len; _i++) {
          pattern = singleLineTags[_i];
          if (pattern[3].test(line)) {
            _this.textarea.selection.insertAfter("" + pattern[0] + pattern[1], false);
            _this.textarea.selection.caretOffset(-pattern[1].length);
            return;
          }
        }
      };
    }

    HtmlEditor._headerPattern = new RegExp("^<h([1-6])>(.*)</h[1-6]>\n?$");

    HtmlEditor.prototype._header = function(n) {
      var caret, replacement, text;
      caret = this.textarea.selection.caret();
      if (caret[0] === caret[1]) {
        this.textarea.selection.selectWholeCurrentLine();
      }
      text = this.selection();
      if (HtmlEditor._headerPattern.test(text)) {
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

    HtmlEditor.prototype.h1 = function() {
      return this._header(1);
    };

    HtmlEditor.prototype.h2 = function() {
      return this._header(2);
    };

    HtmlEditor.prototype.h3 = function() {
      return this._header(3);
    };

    HtmlEditor.prototype.h4 = function() {
      return this._header(4);
    };

    HtmlEditor.prototype.h5 = function() {
      return this._header(5);
    };

    HtmlEditor.prototype.h6 = function() {
      return this._header(6);
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

  })(Jencil.ui.widgets.editors.TextEditor);

  HtmlViewer = Jencil.ui.widgets.viewers.TemplateViewer;

  HtmlHelper = (function(_super) {

    __extends(HtmlHelper, _super);

    function HtmlHelper(core) {
      HtmlHelper.__super__.constructor.call(this, core);
      this.element.addClass('helper');
    }

    return HtmlHelper;

  })(Jencil.ui.widgets.panels.Panel);

  HtmlProfile = (function(_super) {

    __extends(HtmlProfile, _super);

    function HtmlProfile() {
      this.mainPanelClass = Jencil.ui.widgets.panels.TrimainPanel;
      this.editorClass = HtmlEditor;
      this.viewerClass = HtmlViewer;
      this.helperClass = HtmlHelper;
      this.defaultVolume = 1;
      this.defaultVolume2 = 1;
      this.toolbarButtons = ['Undo', 'Redo', 'Separator', ['h1', 'H1'], ['h2', 'H2'], ['h3', 'H3'], ['h4', 'H4'], ['h5', 'H5'], ['h6', 'H6'], 'Separator', ['bold', 'Bold', 'Ctrl+B'], ['italic', 'Italic', 'Ctrl+I'], ['underline', 'Underline', 'Ctrl+U'], ['strike', 'Strikeout'], ['superscript', 'Superscript'], ['subscript', 'Subscript'], 'Separator', ['anchorLink', 'Anchor link'], ['image', 'Image'], ['unorderedList', 'Unordered list'], ['orderedList', 'Ordered list'], ['quote', 'Quote'], ['blockquote', 'Blockquote'], ['code', 'Code'], ['pre', 'Pre'], 'Separator', 'Fullscreen'];
      this.statusbarButtons = ['Viewer', 'Helper'];
    }

    return HtmlProfile;

  })(Jencil.profiles.Profile);

  Jencil.utils.namespace('Jencil.filetypes.html', function(exports) {
    exports.HtmlEditor = HtmlEditor;
    exports.HtmlViewer = HtmlViewer;
    return exports.HtmlProfile = HtmlProfile;
  });

  MarkdownViewer = (function(_super) {

    __extends(MarkdownViewer, _super);

    function MarkdownViewer(core) {
      var config;
      config = {
        type: 'POST',
        dataType: 'text',
        data: function(value) {
          return {
            text: value,
            mode: 'markdown'
          };
        },
        url: 'https://api.github.com/markdown'
      };
      MarkdownViewer.__super__.constructor.call(this, core, config);
    }

    return MarkdownViewer;

  })(AjaxViewer);

  GithubFlavorMarkdownViewer = (function(_super) {

    __extends(GithubFlavorMarkdownViewer, _super);

    function GithubFlavorMarkdownViewer(core) {
      var config;
      config = {
        type: 'POST',
        dataType: 'text',
        data: function(value) {
          return {
            text: value,
            mode: 'gfm'
          };
        },
        url: 'https://api.github.com/markdown'
      };
      GithubFlavorMarkdownViewer.__super__.constructor.call(this, core, config);
    }

    return GithubFlavorMarkdownViewer;

  })(AjaxViewer);

  MarkdownEditor = (function(_super) {

    __extends(MarkdownEditor, _super);

    function MarkdownEditor() {
      return MarkdownEditor.__super__.constructor.apply(this, arguments);
    }

    MarkdownEditor.prototype.h1 = function() {
      return this.insertBefore("# ");
    };

    MarkdownEditor.prototype.h2 = function() {
      return this.insertBefore("## ");
    };

    MarkdownEditor.prototype.h3 = function() {
      return this.insertBefore("### ");
    };

    MarkdownEditor.prototype.h4 = function() {
      return this.insertBefore("#### ");
    };

    MarkdownEditor.prototype.h5 = function() {
      return this.insertBefore("##### ");
    };

    MarkdownEditor.prototype.h6 = function() {
      return this.insertBefore("###### ");
    };

    MarkdownEditor.prototype.bold = function() {
      return this.enclose("**", "**");
    };

    MarkdownEditor.prototype.italic = function() {
      return this.enclose("*", "*");
    };

    MarkdownEditor.prototype.anchor = function() {
      var href, text;
      text = this.selection();
      if (!text) {
        text = window.prompt("Please input a link text", "Here");
      }
      href = window.prompt("Please input a link url", "http://");
      return this.selection("[" + text + "](" + href + ")");
    };

    MarkdownEditor.prototype.image = function() {
      var alt, src;
      src = window.prompt("Please input a image url", "http://");
      alt = window.prompt("(Optional) Please input a alt message", "Image");
      return this.selection("![" + alt + "](" + src + ")");
    };

    MarkdownEditor.prototype.unorderedList = function() {
      var text, x;
      text = this.selection();
      text = (function() {
        var _i, _len, _ref, _results;
        _ref = text.split("\n");
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          x = _ref[_i];
          _results.push("-   " + x);
        }
        return _results;
      })();
      text.unshift("");
      text.push("");
      return this.selection(text.join("\n"));
    };

    MarkdownEditor.prototype.orderedList = function() {
      var i, text, x;
      text = this.selection();
      text = (function() {
        var _i, _len, _ref, _results;
        _ref = text.split("\n");
        _results = [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          x = _ref[i];
          _results.push("" + i + ". " + x);
        }
        return _results;
      })();
      text.unshift("");
      text.push("");
      return this.selection(text.join("\n"));
    };

    return MarkdownEditor;

  })(HtmlEditor);

  MarkdownHelper = (function(_super) {

    __extends(MarkdownHelper, _super);

    function MarkdownHelper(core) {
      MarkdownHelper.__super__.constructor.call(this, core);
      this.element.addClass('helper');
    }

    return MarkdownHelper;

  })(Jencil.ui.widgets.panels.Panel);

  MarkdownProfile = (function(_super) {

    __extends(MarkdownProfile, _super);

    function MarkdownProfile() {
      this.mainPanelClass = Jencil.ui.widgets.panels.TrimainPanel;
      this.editorClass = MarkdownEditor;
      this.viewerClass = MarkdownViewer;
      this.helperClass = MarkdownHelper;
      this.defaultVolume = 1;
      this.defaultVolume2 = 1;
      this.toolbarButtons = ['Undo', 'Redo', 'Separator', ['h1', 'H1'], ['h2', 'H2'], ['h3', 'H3'], ['h4', 'H4'], ['h5', 'H5'], ['h6', 'H6'], 'Separator', ['bold', 'Bold', 'Ctrl+B'], ['italic', 'Italic', 'Ctrl+I'], 'Separator', ['anchor', 'Anchor link'], ['image', 'Image'], ['unorderedList', 'Unordered list'], ['orderedList', 'Ordered list'], 'Separator', 'Fullscreen'];
      this.statusbarButtons = ['Viewer', 'Helper'];
    }

    return MarkdownProfile;

  })(Jencil.profiles.Profile);

  Jencil.utils.namespace('Jencil.filetypes.markdown', function(exports) {
    exports.MarkdownEditor = MarkdownEditor;
    exports.MarkdownViewer = MarkdownViewer;
    return exports.MarkdownProfile = MarkdownProfile;
  });

}).call(this);
