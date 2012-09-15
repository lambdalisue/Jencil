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

// Released under MIT license
// Copyright (c) 2009-2010 Dominic Baggott
// Copyright (c) 2009-2010 Ash Berlin
// Copyright (c) 2011 Christoph Dorn <christoph@christophdorn.com> (http://www.christophdorn.com)

(function( expose ) {

/**
 *  class Markdown
 *
 *  Markdown processing in Javascript done right. We have very particular views
 *  on what constitutes 'right' which include:
 *
 *  - produces well-formed HTML (this means that em and strong nesting is
 *    important)
 *
 *  - has an intermediate representation to allow processing of parsed data (We
 *    in fact have two, both as [JsonML]: a markdown tree and an HTML tree).
 *
 *  - is easily extensible to add new dialects without having to rewrite the
 *    entire parsing mechanics
 *
 *  - has a good test suite
 *
 *  This implementation fulfills all of these (except that the test suite could
 *  do with expanding to automatically run all the fixtures from other Markdown
 *  implementations.)
 *
 *  ##### Intermediate Representation
 *
 *  *TODO* Talk about this :) Its JsonML, but document the node names we use.
 *
 *  [JsonML]: http://jsonml.org/ "JSON Markup Language"
 **/
var Markdown = expose.Markdown = function Markdown(dialect) {
  switch (typeof dialect) {
    case "undefined":
      this.dialect = Markdown.dialects.Gruber;
      break;
    case "object":
      this.dialect = dialect;
      break;
    default:
      if (dialect in Markdown.dialects) {
        this.dialect = Markdown.dialects[dialect];
      }
      else {
        throw new Error("Unknown Markdown dialect '" + String(dialect) + "'");
      }
      break;
  }
  this.em_state = [];
  this.strong_state = [];
  this.debug_indent = "";
};

/**
 *  parse( markdown, [dialect] ) -> JsonML
 *  - markdown (String): markdown string to parse
 *  - dialect (String | Dialect): the dialect to use, defaults to gruber
 *
 *  Parse `markdown` and return a markdown document as a Markdown.JsonML tree.
 **/
expose.parse = function( source, dialect ) {
  // dialect will default if undefined
  var md = new Markdown( dialect );
  return md.toTree( source );
};

/**
 *  toHTML( markdown, [dialect]  ) -> String
 *  toHTML( md_tree ) -> String
 *  - markdown (String): markdown string to parse
 *  - md_tree (Markdown.JsonML): parsed markdown tree
 *
 *  Take markdown (either as a string or as a JsonML tree) and run it through
 *  [[toHTMLTree]] then turn it into a well-formated HTML fragment.
 **/
expose.toHTML = function toHTML( source , dialect , options ) {
  var input = expose.toHTMLTree( source , dialect , options );

  return expose.renderJsonML( input );
};

/**
 *  toHTMLTree( markdown, [dialect] ) -> JsonML
 *  toHTMLTree( md_tree ) -> JsonML
 *  - markdown (String): markdown string to parse
 *  - dialect (String | Dialect): the dialect to use, defaults to gruber
 *  - md_tree (Markdown.JsonML): parsed markdown tree
 *
 *  Turn markdown into HTML, represented as a JsonML tree. If a string is given
 *  to this function, it is first parsed into a markdown tree by calling
 *  [[parse]].
 **/
expose.toHTMLTree = function toHTMLTree( input, dialect , options ) {
  // convert string input to an MD tree
  if ( typeof input ==="string" ) input = this.parse( input, dialect );

  // Now convert the MD tree to an HTML tree

  // remove references from the tree
  var attrs = extract_attr( input ),
      refs = {};

  if ( attrs && attrs.references ) {
    refs = attrs.references;
  }

  var html = convert_tree_to_html( input, refs , options );
  merge_text_nodes( html );
  return html;
};

// For Spidermonkey based engines
function mk_block_toSource() {
  return "Markdown.mk_block( " +
          uneval(this.toString()) +
          ", " +
          uneval(this.trailing) +
          ", " +
          uneval(this.lineNumber) +
          " )";
}

// node
function mk_block_inspect() {
  var util = require('util');
  return "Markdown.mk_block( " +
          util.inspect(this.toString()) +
          ", " +
          util.inspect(this.trailing) +
          ", " +
          util.inspect(this.lineNumber) +
          " )";

}

var mk_block = Markdown.mk_block = function(block, trail, line) {
  // Be helpful for default case in tests.
  if ( arguments.length == 1 ) trail = "\n\n";

  var s = new String(block);
  s.trailing = trail;
  // To make it clear its not just a string
  s.inspect = mk_block_inspect;
  s.toSource = mk_block_toSource;

  if (line != undefined)
    s.lineNumber = line;

  return s;
};

function count_lines( str ) {
  var n = 0, i = -1;
  while ( ( i = str.indexOf('\n', i+1) ) !== -1) n++;
  return n;
}

// Internal - split source into rough blocks
Markdown.prototype.split_blocks = function splitBlocks( input, startLine ) {
  // [\s\S] matches _anything_ (newline or space)
  var re = /([\s\S]+?)($|\n(?:\s*\n|$)+)/g,
      blocks = [],
      m;

  var line_no = 1;

  if ( ( m = /^(\s*\n)/.exec(input) ) != null ) {
    // skip (but count) leading blank lines
    line_no += count_lines( m[0] );
    re.lastIndex = m[0].length;
  }

  while ( ( m = re.exec(input) ) !== null ) {
    blocks.push( mk_block( m[1], m[2], line_no ) );
    line_no += count_lines( m[0] );
  }

  return blocks;
};

/**
 *  Markdown#processBlock( block, next ) -> undefined | [ JsonML, ... ]
 *  - block (String): the block to process
 *  - next (Array): the following blocks
 *
 * Process `block` and return an array of JsonML nodes representing `block`.
 *
 * It does this by asking each block level function in the dialect to process
 * the block until one can. Succesful handling is indicated by returning an
 * array (with zero or more JsonML nodes), failure by a false value.
 *
 * Blocks handlers are responsible for calling [[Markdown#processInline]]
 * themselves as appropriate.
 *
 * If the blocks were split incorrectly or adjacent blocks need collapsing you
 * can adjust `next` in place using shift/splice etc.
 *
 * If any of this default behaviour is not right for the dialect, you can
 * define a `__call__` method on the dialect that will get invoked to handle
 * the block processing.
 */
Markdown.prototype.processBlock = function processBlock( block, next ) {
  var cbs = this.dialect.block,
      ord = cbs.__order__;

  if ( "__call__" in cbs ) {
    return cbs.__call__.call(this, block, next);
  }

  for ( var i = 0; i < ord.length; i++ ) {
    //D:this.debug( "Testing", ord[i] );
    var res = cbs[ ord[i] ].call( this, block, next );
    if ( res ) {
      //D:this.debug("  matched");
      if ( !isArray(res) || ( res.length > 0 && !( isArray(res[0]) ) ) )
        this.debug(ord[i], "didn't return a proper array");
      //D:this.debug( "" );
      return res;
    }
  }

  // Uhoh! no match! Should we throw an error?
  return [];
};

Markdown.prototype.processInline = function processInline( block ) {
  return this.dialect.inline.__call__.call( this, String( block ) );
};

/**
 *  Markdown#toTree( source ) -> JsonML
 *  - source (String): markdown source to parse
 *
 *  Parse `source` into a JsonML tree representing the markdown document.
 **/
// custom_tree means set this.tree to `custom_tree` and restore old value on return
Markdown.prototype.toTree = function toTree( source, custom_root ) {
  var blocks = source instanceof Array ? source : this.split_blocks( source );

  // Make tree a member variable so its easier to mess with in extensions
  var old_tree = this.tree;
  try {
    this.tree = custom_root || this.tree || [ "markdown" ];

    blocks:
    while ( blocks.length ) {
      var b = this.processBlock( blocks.shift(), blocks );

      // Reference blocks and the like won't return any content
      if ( !b.length ) continue blocks;

      this.tree.push.apply( this.tree, b );
    }
    return this.tree;
  }
  finally {
    if ( custom_root ) {
      this.tree = old_tree;
    }
  }
};

// Noop by default
Markdown.prototype.debug = function () {
  var args = Array.prototype.slice.call( arguments);
  args.unshift(this.debug_indent);
  if (typeof print !== "undefined")
      print.apply( print, args );
  if (typeof console !== "undefined" && typeof console.log !== "undefined")
      console.log.apply( null, args );
}

Markdown.prototype.loop_re_over_block = function( re, block, cb ) {
  // Dont use /g regexps with this
  var m,
      b = block.valueOf();

  while ( b.length && (m = re.exec(b) ) != null) {
    b = b.substr( m[0].length );
    cb.call(this, m);
  }
  return b;
};

/**
 * Markdown.dialects
 *
 * Namespace of built-in dialects.
 **/
Markdown.dialects = {};

/**
 * Markdown.dialects.Gruber
 *
 * The default dialect that follows the rules set out by John Gruber's
 * markdown.pl as closely as possible. Well actually we follow the behaviour of
 * that script which in some places is not exactly what the syntax web page
 * says.
 **/
Markdown.dialects.Gruber = {
  block: {
    atxHeader: function atxHeader( block, next ) {
      var m = block.match( /^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/ );

      if ( !m ) return undefined;

      var header = [ "header", { level: m[ 1 ].length } ];
      Array.prototype.push.apply(header, this.processInline(m[ 2 ]));

      if ( m[0].length < block.length )
        next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

      return [ header ];
    },

    setextHeader: function setextHeader( block, next ) {
      var m = block.match( /^(.*)\n([-=])\2\2+(?:\n|$)/ );

      if ( !m ) return undefined;

      var level = ( m[ 2 ] === "=" ) ? 1 : 2;
      var header = [ "header", { level : level }, m[ 1 ] ];

      if ( m[0].length < block.length )
        next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

      return [ header ];
    },

    code: function code( block, next ) {
      // |    Foo
      // |bar
      // should be a code block followed by a paragraph. Fun
      //
      // There might also be adjacent code block to merge.

      var ret = [],
          re = /^(?: {0,3}\t| {4})(.*)\n?/,
          lines;

      // 4 spaces + content
      if ( !block.match( re ) ) return undefined;

      block_search:
      do {
        // Now pull out the rest of the lines
        var b = this.loop_re_over_block(
                  re, block.valueOf(), function( m ) { ret.push( m[1] ); } );

        if (b.length) {
          // Case alluded to in first comment. push it back on as a new block
          next.unshift( mk_block(b, block.trailing) );
          break block_search;
        }
        else if (next.length) {
          // Check the next block - it might be code too
          if ( !next[0].match( re ) ) break block_search;

          // Pull how how many blanks lines follow - minus two to account for .join
          ret.push ( block.trailing.replace(/[^\n]/g, '').substring(2) );

          block = next.shift();
        }
        else {
          break block_search;
        }
      } while (true);

      return [ [ "code_block", ret.join("\n") ] ];
    },

    horizRule: function horizRule( block, next ) {
      // this needs to find any hr in the block to handle abutting blocks
      var m = block.match( /^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/ );

      if ( !m ) {
        return undefined;
      }

      var jsonml = [ [ "hr" ] ];

      // if there's a leading abutting block, process it
      if ( m[ 1 ] ) {
        jsonml.unshift.apply( jsonml, this.processBlock( m[ 1 ], [] ) );
      }

      // if there's a trailing abutting block, stick it into next
      if ( m[ 3 ] ) {
        next.unshift( mk_block( m[ 3 ] ) );
      }

      return jsonml;
    },

    // There are two types of lists. Tight and loose. Tight lists have no whitespace
    // between the items (and result in text just in the <li>) and loose lists,
    // which have an empty line between list items, resulting in (one or more)
    // paragraphs inside the <li>.
    //
    // There are all sorts weird edge cases about the original markdown.pl's
    // handling of lists:
    //
    // * Nested lists are supposed to be indented by four chars per level. But
    //   if they aren't, you can get a nested list by indenting by less than
    //   four so long as the indent doesn't match an indent of an existing list
    //   item in the 'nest stack'.
    //
    // * The type of the list (bullet or number) is controlled just by the
    //    first item at the indent. Subsequent changes are ignored unless they
    //    are for nested lists
    //
    lists: (function( ) {
      // Use a closure to hide a few variables.
      var any_list = "[*+-]|\\d+\\.",
          bullet_list = /[*+-]/,
          number_list = /\d+\./,
          // Capture leading indent as it matters for determining nested lists.
          is_list_re = new RegExp( "^( {0,3})(" + any_list + ")[ \t]+" ),
          indent_re = "(?: {0,3}\\t| {4})";

      // TODO: Cache this regexp for certain depths.
      // Create a regexp suitable for matching an li for a given stack depth
      function regex_for_depth( depth ) {

        return new RegExp(
          // m[1] = indent, m[2] = list_type
          "(?:^(" + indent_re + "{0," + depth + "} {0,3})(" + any_list + ")\\s+)|" +
          // m[3] = cont
          "(^" + indent_re + "{0," + (depth-1) + "}[ ]{0,4})"
        );
      }
      function expand_tab( input ) {
        return input.replace( / {0,3}\t/g, "    " );
      }

      // Add inline content `inline` to `li`. inline comes from processInline
      // so is an array of content
      function add(li, loose, inline, nl) {
        if (loose) {
          li.push( [ "para" ].concat(inline) );
          return;
        }
        // Hmmm, should this be any block level element or just paras?
        var add_to = li[li.length -1] instanceof Array && li[li.length - 1][0] == "para"
                   ? li[li.length -1]
                   : li;

        // If there is already some content in this list, add the new line in
        if (nl && li.length > 1) inline.unshift(nl);

        for (var i=0; i < inline.length; i++) {
          var what = inline[i],
              is_str = typeof what == "string";
          if (is_str && add_to.length > 1 && typeof add_to[add_to.length-1] == "string" ) {
            add_to[ add_to.length-1 ] += what;
          }
          else {
            add_to.push( what );
          }
        }
      }

      // contained means have an indent greater than the current one. On
      // *every* line in the block
      function get_contained_blocks( depth, blocks ) {

        var re = new RegExp( "^(" + indent_re + "{" + depth + "}.*?\\n?)*$" ),
            replace = new RegExp("^" + indent_re + "{" + depth + "}", "gm"),
            ret = [];

        while ( blocks.length > 0 ) {
          if ( re.exec( blocks[0] ) ) {
            var b = blocks.shift(),
                // Now remove that indent
                x = b.replace( replace, "");

            ret.push( mk_block( x, b.trailing, b.lineNumber ) );
          }
          break;
        }
        return ret;
      }

      // passed to stack.forEach to turn list items up the stack into paras
      function paragraphify(s, i, stack) {
        var list = s.list;
        var last_li = list[list.length-1];

        if (last_li[1] instanceof Array && last_li[1][0] == "para") {
          return;
        }
        if (i+1 == stack.length) {
          // Last stack frame
          // Keep the same array, but replace the contents
          last_li.push( ["para"].concat( last_li.splice(1) ) );
        }
        else {
          var sublist = last_li.pop();
          last_li.push( ["para"].concat( last_li.splice(1) ), sublist );
        }
      }

      // The matcher function
      return function( block, next ) {
        var m = block.match( is_list_re );
        if ( !m ) return undefined;

        function make_list( m ) {
          var list = bullet_list.exec( m[2] )
                   ? ["bulletlist"]
                   : ["numberlist"];

          stack.push( { list: list, indent: m[1] } );
          return list;
        }


        var stack = [], // Stack of lists for nesting.
            list = make_list( m ),
            last_li,
            loose = false,
            ret = [ stack[0].list ],
            i;

        // Loop to search over block looking for inner block elements and loose lists
        loose_search:
        while( true ) {
          // Split into lines preserving new lines at end of line
          var lines = block.split( /(?=\n)/ );

          // We have to grab all lines for a li and call processInline on them
          // once as there are some inline things that can span lines.
          var li_accumulate = "";

          // Loop over the lines in this block looking for tight lists.
          tight_search:
          for (var line_no=0; line_no < lines.length; line_no++) {
            var nl = "",
                l = lines[line_no].replace(/^\n/, function(n) { nl = n; return ""; });

            // TODO: really should cache this
            var line_re = regex_for_depth( stack.length );

            m = l.match( line_re );
            //print( "line:", uneval(l), "\nline match:", uneval(m) );

            // We have a list item
            if ( m[1] !== undefined ) {
              // Process the previous list item, if any
              if ( li_accumulate.length ) {
                add( last_li, loose, this.processInline( li_accumulate ), nl );
                // Loose mode will have been dealt with. Reset it
                loose = false;
                li_accumulate = "";
              }

              m[1] = expand_tab( m[1] );
              var wanted_depth = Math.floor(m[1].length/4)+1;
              //print( "want:", wanted_depth, "stack:", stack.length);
              if ( wanted_depth > stack.length ) {
                // Deep enough for a nested list outright
                //print ( "new nested list" );
                list = make_list( m );
                last_li.push( list );
                last_li = list[1] = [ "listitem" ];
              }
              else {
                // We aren't deep enough to be strictly a new level. This is
                // where Md.pl goes nuts. If the indent matches a level in the
                // stack, put it there, else put it one deeper then the
                // wanted_depth deserves.
                var found = false;
                for (i = 0; i < stack.length; i++) {
                  if ( stack[ i ].indent != m[1] ) continue;
                  list = stack[ i ].list;
                  stack.splice( i+1 );
                  found = true;
                  break;
                }

                if (!found) {
                  //print("not found. l:", uneval(l));
                  wanted_depth++;
                  if (wanted_depth <= stack.length) {
                    stack.splice(wanted_depth);
                    //print("Desired depth now", wanted_depth, "stack:", stack.length);
                    list = stack[wanted_depth-1].list;
                    //print("list:", uneval(list) );
                  }
                  else {
                    //print ("made new stack for messy indent");
                    list = make_list(m);
                    last_li.push(list);
                  }
                }

                //print( uneval(list), "last", list === stack[stack.length-1].list );
                last_li = [ "listitem" ];
                list.push(last_li);
              } // end depth of shenegains
              nl = "";
            }

            // Add content
            if (l.length > m[0].length) {
              li_accumulate += nl + l.substr( m[0].length );
            }
          } // tight_search

          if ( li_accumulate.length ) {
            add( last_li, loose, this.processInline( li_accumulate ), nl );
            // Loose mode will have been dealt with. Reset it
            loose = false;
            li_accumulate = "";
          }

          // Look at the next block - we might have a loose list. Or an extra
          // paragraph for the current li
          var contained = get_contained_blocks( stack.length, next );

          // Deal with code blocks or properly nested lists
          if (contained.length > 0) {
            // Make sure all listitems up the stack are paragraphs
            forEach( stack, paragraphify, this);

            last_li.push.apply( last_li, this.toTree( contained, [] ) );
          }

          var next_block = next[0] && next[0].valueOf() || "";

          if ( next_block.match(is_list_re) || next_block.match( /^ / ) ) {
            block = next.shift();

            // Check for an HR following a list: features/lists/hr_abutting
            var hr = this.dialect.block.horizRule( block, next );

            if (hr) {
              ret.push.apply(ret, hr);
              break;
            }

            // Make sure all listitems up the stack are paragraphs
            forEach( stack, paragraphify, this);

            loose = true;
            continue loose_search;
          }
          break;
        } // loose_search

        return ret;
      };
    })(),

    blockquote: function blockquote( block, next ) {
      if ( !block.match( /^>/m ) )
        return undefined;

      var jsonml = [];

      // separate out the leading abutting block, if any
      if ( block[ 0 ] != ">" ) {
        var lines = block.split( /\n/ ),
            prev = [];

        // keep shifting lines until you find a crotchet
        while ( lines.length && lines[ 0 ][ 0 ] != ">" ) {
            prev.push( lines.shift() );
        }

        // reassemble!
        block = lines.join( "\n" );
        jsonml.push.apply( jsonml, this.processBlock( prev.join( "\n" ), [] ) );
      }

      // if the next block is also a blockquote merge it in
      while ( next.length && next[ 0 ][ 0 ] == ">" ) {
        var b = next.shift();
        block = new String(block + block.trailing + b);
        block.trailing = b.trailing;
      }

      // Strip off the leading "> " and re-process as a block.
      var input = block.replace( /^> ?/gm, '' ),
          old_tree = this.tree;
      jsonml.push( this.toTree( input, [ "blockquote" ] ) );

      return jsonml;
    },

    referenceDefn: function referenceDefn( block, next) {
      var re = /^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;
      // interesting matches are [ , ref_id, url, , title, title ]

      if ( !block.match(re) )
        return undefined;

      // make an attribute node if it doesn't exist
      if ( !extract_attr( this.tree ) ) {
        this.tree.splice( 1, 0, {} );
      }

      var attrs = extract_attr( this.tree );

      // make a references hash if it doesn't exist
      if ( attrs.references === undefined ) {
        attrs.references = {};
      }

      var b = this.loop_re_over_block(re, block, function( m ) {

        if ( m[2] && m[2][0] == '<' && m[2][m[2].length-1] == '>' )
          m[2] = m[2].substring( 1, m[2].length - 1 );

        var ref = attrs.references[ m[1].toLowerCase() ] = {
          href: m[2]
        };

        if (m[4] !== undefined)
          ref.title = m[4];
        else if (m[5] !== undefined)
          ref.title = m[5];

      } );

      if (b.length)
        next.unshift( mk_block( b, block.trailing ) );

      return [];
    },

    para: function para( block, next ) {
      // everything's a para!
      return [ ["para"].concat( this.processInline( block ) ) ];
    }
  }
};

Markdown.dialects.Gruber.inline = {

    __oneElement__: function oneElement( text, patterns_or_re, previous_nodes ) {
      var m,
          res,
          lastIndex = 0;

      patterns_or_re = patterns_or_re || this.dialect.inline.__patterns__;
      var re = new RegExp( "([\\s\\S]*?)(" + (patterns_or_re.source || patterns_or_re) + ")" );

      m = re.exec( text );
      if (!m) {
        // Just boring text
        return [ text.length, text ];
      }
      else if ( m[1] ) {
        // Some un-interesting text matched. Return that first
        return [ m[1].length, m[1] ];
      }

      var res;
      if ( m[2] in this.dialect.inline ) {
        res = this.dialect.inline[ m[2] ].call(
                  this,
                  text.substr( m.index ), m, previous_nodes || [] );
      }
      // Default for now to make dev easier. just slurp special and output it.
      res = res || [ m[2].length, m[2] ];
      return res;
    },

    __call__: function inline( text, patterns ) {

      var out = [],
          res;

      function add(x) {
        //D:self.debug("  adding output", uneval(x));
        if (typeof x == "string" && typeof out[out.length-1] == "string")
          out[ out.length-1 ] += x;
        else
          out.push(x);
      }

      while ( text.length > 0 ) {
        res = this.dialect.inline.__oneElement__.call(this, text, patterns, out );
        text = text.substr( res.shift() );
        forEach(res, add )
      }

      return out;
    },

    // These characters are intersting elsewhere, so have rules for them so that
    // chunks of plain text blocks don't include them
    "]": function () {},
    "}": function () {},

    "\\": function escaped( text ) {
      // [ length of input processed, node/children to add... ]
      // Only esacape: \ ` * _ { } [ ] ( ) # * + - . !
      if ( text.match( /^\\[\\`\*_{}\[\]()#\+.!\-]/ ) )
        return [ 2, text[1] ];
      else
        // Not an esacpe
        return [ 1, "\\" ];
    },

    "![": function image( text ) {

      // Unlike images, alt text is plain text only. no other elements are
      // allowed in there

      // ![Alt text](/path/to/img.jpg "Optional title")
      //      1          2            3       4         <--- captures
      var m = text.match( /^!\[(.*?)\][ \t]*\([ \t]*(\S*)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/ );

      if ( m ) {
        if ( m[2] && m[2][0] == '<' && m[2][m[2].length-1] == '>' )
          m[2] = m[2].substring( 1, m[2].length - 1 );

        m[2] = this.dialect.inline.__call__.call( this, m[2], /\\/ )[0];

        var attrs = { alt: m[1], href: m[2] || "" };
        if ( m[4] !== undefined)
          attrs.title = m[4];

        return [ m[0].length, [ "img", attrs ] ];
      }

      // ![Alt text][id]
      m = text.match( /^!\[(.*?)\][ \t]*\[(.*?)\]/ );

      if ( m ) {
        // We can't check if the reference is known here as it likely wont be
        // found till after. Check it in md tree->hmtl tree conversion
        return [ m[0].length, [ "img_ref", { alt: m[1], ref: m[2].toLowerCase(), original: m[0] } ] ];
      }

      // Just consume the '!['
      return [ 2, "![" ];
    },

    "[": function link( text ) {

      var orig = String(text);
      // Inline content is possible inside `link text`
      var res = Markdown.DialectHelpers.inline_until_char.call( this, text.substr(1), ']' );

      // No closing ']' found. Just consume the [
      if ( !res ) return [ 1, '[' ];

      var consumed = 1 + res[ 0 ],
          children = res[ 1 ],
          link,
          attrs;

      // At this point the first [...] has been parsed. See what follows to find
      // out which kind of link we are (reference or direct url)
      text = text.substr( consumed );

      // [link text](/path/to/img.jpg "Optional title")
      //                 1            2       3         <--- captures
      // This will capture up to the last paren in the block. We then pull
      // back based on if there a matching ones in the url
      //    ([here](/url/(test))
      // The parens have to be balanced
      var m = text.match( /^\s*\([ \t]*(\S+)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/ );
      if ( m ) {
        var url = m[1];
        consumed += m[0].length;

        if ( url && url[0] == '<' && url[url.length-1] == '>' )
          url = url.substring( 1, url.length - 1 );

        // If there is a title we don't have to worry about parens in the url
        if ( !m[3] ) {
          var open_parens = 1; // One open that isn't in the capture
          for (var len = 0; len < url.length; len++) {
            switch ( url[len] ) {
            case '(':
              open_parens++;
              break;
            case ')':
              if ( --open_parens == 0) {
                consumed -= url.length - len;
                url = url.substring(0, len);
              }
              break;
            }
          }
        }

        // Process escapes only
        url = this.dialect.inline.__call__.call( this, url, /\\/ )[0];

        attrs = { href: url || "" };
        if ( m[3] !== undefined)
          attrs.title = m[3];

        link = [ "link", attrs ].concat( children );
        return [ consumed, link ];
      }

      // [Alt text][id]
      // [Alt text] [id]
      m = text.match( /^\s*\[(.*?)\]/ );

      if ( m ) {

        consumed += m[ 0 ].length;

        // [links][] uses links as its reference
        attrs = { ref: ( m[ 1 ] || String(children) ).toLowerCase(),  original: orig.substr( 0, consumed ) };

        link = [ "link_ref", attrs ].concat( children );

        // We can't check if the reference is known here as it likely wont be
        // found till after. Check it in md tree->hmtl tree conversion.
        // Store the original so that conversion can revert if the ref isn't found.
        return [ consumed, link ];
      }

      // [id]
      // Only if id is plain (no formatting.)
      if ( children.length == 1 && typeof children[0] == "string" ) {

        attrs = { ref: children[0].toLowerCase(),  original: orig.substr( 0, consumed ) };
        link = [ "link_ref", attrs, children[0] ];
        return [ consumed, link ];
      }

      // Just consume the '['
      return [ 1, "[" ];
    },


    "<": function autoLink( text ) {
      var m;

      if ( ( m = text.match( /^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/ ) ) != null ) {
        if ( m[3] ) {
          return [ m[0].length, [ "link", { href: "mailto:" + m[3] }, m[3] ] ];

        }
        else if ( m[2] == "mailto" ) {
          return [ m[0].length, [ "link", { href: m[1] }, m[1].substr("mailto:".length ) ] ];
        }
        else
          return [ m[0].length, [ "link", { href: m[1] }, m[1] ] ];
      }

      return [ 1, "<" ];
    },

    "`": function inlineCode( text ) {
      // Inline code block. as many backticks as you like to start it
      // Always skip over the opening ticks.
      var m = text.match( /(`+)(([\s\S]*?)\1)/ );

      if ( m && m[2] )
        return [ m[1].length + m[2].length, [ "inlinecode", m[3] ] ];
      else {
        // TODO: No matching end code found - warn!
        return [ 1, "`" ];
      }
    },

    "  \n": function lineBreak( text ) {
      return [ 3, [ "linebreak" ] ];
    }

};

// Meta Helper/generator method for em and strong handling
function strong_em( tag, md ) {

  var state_slot = tag + "_state",
      other_slot = tag == "strong" ? "em_state" : "strong_state";

  function CloseTag(len) {
    this.len_after = len;
    this.name = "close_" + md;
  }

  return function ( text, orig_match ) {

    if (this[state_slot][0] == md) {
      // Most recent em is of this type
      //D:this.debug("closing", md);
      this[state_slot].shift();

      // "Consume" everything to go back to the recrusion in the else-block below
      return[ text.length, new CloseTag(text.length-md.length) ];
    }
    else {
      // Store a clone of the em/strong states
      var other = this[other_slot].slice(),
          state = this[state_slot].slice();

      this[state_slot].unshift(md);

      //D:this.debug_indent += "  ";

      // Recurse
      var res = this.processInline( text.substr( md.length ) );
      //D:this.debug_indent = this.debug_indent.substr(2);

      var last = res[res.length - 1];

      //D:this.debug("processInline from", tag + ": ", uneval( res ) );

      var check = this[state_slot].shift();
      if (last instanceof CloseTag) {
        res.pop();
        // We matched! Huzzah.
        var consumed = text.length - last.len_after;
        return [ consumed, [ tag ].concat(res) ];
      }
      else {
        // Restore the state of the other kind. We might have mistakenly closed it.
        this[other_slot] = other;
        this[state_slot] = state;

        // We can't reuse the processed result as it could have wrong parsing contexts in it.
        return [ md.length, md ];
      }
    }
  }; // End returned function
}

Markdown.dialects.Gruber.inline["**"] = strong_em("strong", "**");
Markdown.dialects.Gruber.inline["__"] = strong_em("strong", "__");
Markdown.dialects.Gruber.inline["*"]  = strong_em("em", "*");
Markdown.dialects.Gruber.inline["_"]  = strong_em("em", "_");


// Build default order from insertion order.
Markdown.buildBlockOrder = function(d) {
  var ord = [];
  for ( var i in d ) {
    if ( i == "__order__" || i == "__call__" ) continue;
    ord.push( i );
  }
  d.__order__ = ord;
};

// Build patterns for inline matcher
Markdown.buildInlinePatterns = function(d) {
  var patterns = [];

  for ( var i in d ) {
    // __foo__ is reserved and not a pattern
    if ( i.match( /^__.*__$/) ) continue;
    var l = i.replace( /([\\.*+?|()\[\]{}])/g, "\\$1" )
             .replace( /\n/, "\\n" );
    patterns.push( i.length == 1 ? l : "(?:" + l + ")" );
  }

  patterns = patterns.join("|");
  d.__patterns__ = patterns;
  //print("patterns:", uneval( patterns ) );

  var fn = d.__call__;
  d.__call__ = function(text, pattern) {
    if (pattern != undefined) {
      return fn.call(this, text, pattern);
    }
    else
    {
      return fn.call(this, text, patterns);
    }
  };
};

Markdown.DialectHelpers = {};
Markdown.DialectHelpers.inline_until_char = function( text, want ) {
  var consumed = 0,
      nodes = [];

  while ( true ) {
    if ( text[ consumed ] == want ) {
      // Found the character we were looking for
      consumed++;
      return [ consumed, nodes ];
    }

    if ( consumed >= text.length ) {
      // No closing char found. Abort.
      return null;
    }

    var res = this.dialect.inline.__oneElement__.call(this, text.substr( consumed ) );
    consumed += res[ 0 ];
    // Add any returned nodes.
    nodes.push.apply( nodes, res.slice( 1 ) );
  }
}

// Helper function to make sub-classing a dialect easier
Markdown.subclassDialect = function( d ) {
  function Block() {}
  Block.prototype = d.block;
  function Inline() {}
  Inline.prototype = d.inline;

  return { block: new Block(), inline: new Inline() };
};

Markdown.buildBlockOrder ( Markdown.dialects.Gruber.block );
Markdown.buildInlinePatterns( Markdown.dialects.Gruber.inline );

Markdown.dialects.Maruku = Markdown.subclassDialect( Markdown.dialects.Gruber );

Markdown.dialects.Maruku.processMetaHash = function processMetaHash( meta_string ) {
  var meta = split_meta_hash( meta_string ),
      attr = {};

  for ( var i = 0; i < meta.length; ++i ) {
    // id: #foo
    if ( /^#/.test( meta[ i ] ) ) {
      attr.id = meta[ i ].substring( 1 );
    }
    // class: .foo
    else if ( /^\./.test( meta[ i ] ) ) {
      // if class already exists, append the new one
      if ( attr['class'] ) {
        attr['class'] = attr['class'] + meta[ i ].replace( /./, " " );
      }
      else {
        attr['class'] = meta[ i ].substring( 1 );
      }
    }
    // attribute: foo=bar
    else if ( /\=/.test( meta[ i ] ) ) {
      var s = meta[ i ].split( /\=/ );
      attr[ s[ 0 ] ] = s[ 1 ];
    }
  }

  return attr;
}

function split_meta_hash( meta_string ) {
  var meta = meta_string.split( "" ),
      parts = [ "" ],
      in_quotes = false;

  while ( meta.length ) {
    var letter = meta.shift();
    switch ( letter ) {
      case " " :
        // if we're in a quoted section, keep it
        if ( in_quotes ) {
          parts[ parts.length - 1 ] += letter;
        }
        // otherwise make a new part
        else {
          parts.push( "" );
        }
        break;
      case "'" :
      case '"' :
        // reverse the quotes and move straight on
        in_quotes = !in_quotes;
        break;
      case "\\" :
        // shift off the next letter to be used straight away.
        // it was escaped so we'll keep it whatever it is
        letter = meta.shift();
      default :
        parts[ parts.length - 1 ] += letter;
        break;
    }
  }

  return parts;
}

Markdown.dialects.Maruku.block.document_meta = function document_meta( block, next ) {
  // we're only interested in the first block
  if ( block.lineNumber > 1 ) return undefined;

  // document_meta blocks consist of one or more lines of `Key: Value\n`
  if ( ! block.match( /^(?:\w+:.*\n)*\w+:.*$/ ) ) return undefined;

  // make an attribute node if it doesn't exist
  if ( !extract_attr( this.tree ) ) {
    this.tree.splice( 1, 0, {} );
  }

  var pairs = block.split( /\n/ );
  for ( p in pairs ) {
    var m = pairs[ p ].match( /(\w+):\s*(.*)$/ ),
        key = m[ 1 ].toLowerCase(),
        value = m[ 2 ];

    this.tree[ 1 ][ key ] = value;
  }

  // document_meta produces no content!
  return [];
};

Markdown.dialects.Maruku.block.block_meta = function block_meta( block, next ) {
  // check if the last line of the block is an meta hash
  var m = block.match( /(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/ );
  if ( !m ) return undefined;

  // process the meta hash
  var attr = this.dialect.processMetaHash( m[ 2 ] );

  var hash;

  // if we matched ^ then we need to apply meta to the previous block
  if ( m[ 1 ] === "" ) {
    var node = this.tree[ this.tree.length - 1 ];
    hash = extract_attr( node );

    // if the node is a string (rather than JsonML), bail
    if ( typeof node === "string" ) return undefined;

    // create the attribute hash if it doesn't exist
    if ( !hash ) {
      hash = {};
      node.splice( 1, 0, hash );
    }

    // add the attributes in
    for ( a in attr ) {
      hash[ a ] = attr[ a ];
    }

    // return nothing so the meta hash is removed
    return [];
  }

  // pull the meta hash off the block and process what's left
  var b = block.replace( /\n.*$/, "" ),
      result = this.processBlock( b, [] );

  // get or make the attributes hash
  hash = extract_attr( result[ 0 ] );
  if ( !hash ) {
    hash = {};
    result[ 0 ].splice( 1, 0, hash );
  }

  // attach the attributes to the block
  for ( a in attr ) {
    hash[ a ] = attr[ a ];
  }

  return result;
};

Markdown.dialects.Maruku.block.definition_list = function definition_list( block, next ) {
  // one or more terms followed by one or more definitions, in a single block
  var tight = /^((?:[^\s:].*\n)+):\s+([\s\S]+)$/,
      list = [ "dl" ],
      i;

  // see if we're dealing with a tight or loose block
  if ( ( m = block.match( tight ) ) ) {
    // pull subsequent tight DL blocks out of `next`
    var blocks = [ block ];
    while ( next.length && tight.exec( next[ 0 ] ) ) {
      blocks.push( next.shift() );
    }

    for ( var b = 0; b < blocks.length; ++b ) {
      var m = blocks[ b ].match( tight ),
          terms = m[ 1 ].replace( /\n$/, "" ).split( /\n/ ),
          defns = m[ 2 ].split( /\n:\s+/ );

      // print( uneval( m ) );

      for ( i = 0; i < terms.length; ++i ) {
        list.push( [ "dt", terms[ i ] ] );
      }

      for ( i = 0; i < defns.length; ++i ) {
        // run inline processing over the definition
        list.push( [ "dd" ].concat( this.processInline( defns[ i ].replace( /(\n)\s+/, "$1" ) ) ) );
      }
    }
  }
  else {
    return undefined;
  }

  return [ list ];
};

Markdown.dialects.Maruku.inline[ "{:" ] = function inline_meta( text, matches, out ) {
  if ( !out.length ) {
    return [ 2, "{:" ];
  }

  // get the preceeding element
  var before = out[ out.length - 1 ];

  if ( typeof before === "string" ) {
    return [ 2, "{:" ];
  }

  // match a meta hash
  var m = text.match( /^\{:\s*((?:\\\}|[^\}])*)\s*\}/ );

  // no match, false alarm
  if ( !m ) {
    return [ 2, "{:" ];
  }

  // attach the attributes to the preceeding element
  var meta = this.dialect.processMetaHash( m[ 1 ] ),
      attr = extract_attr( before );

  if ( !attr ) {
    attr = {};
    before.splice( 1, 0, attr );
  }

  for ( var k in meta ) {
    attr[ k ] = meta[ k ];
  }

  // cut out the string and replace it with nothing
  return [ m[ 0 ].length, "" ];
};

Markdown.buildBlockOrder ( Markdown.dialects.Maruku.block );
Markdown.buildInlinePatterns( Markdown.dialects.Maruku.inline );

var isArray = Array.isArray || function(obj) {
  return Object.prototype.toString.call(obj) == '[object Array]';
};

var forEach;
// Don't mess with Array.prototype. Its not friendly
if ( Array.prototype.forEach ) {
  forEach = function( arr, cb, thisp ) {
    return arr.forEach( cb, thisp );
  };
}
else {
  forEach = function(arr, cb, thisp) {
    for (var i = 0; i < arr.length; i++) {
      cb.call(thisp || arr, arr[i], i, arr);
    }
  }
}

function extract_attr( jsonml ) {
  return isArray(jsonml)
      && jsonml.length > 1
      && typeof jsonml[ 1 ] === "object"
      && !( isArray(jsonml[ 1 ]) )
      ? jsonml[ 1 ]
      : undefined;
}



/**
 *  renderJsonML( jsonml[, options] ) -> String
 *  - jsonml (Array): JsonML array to render to XML
 *  - options (Object): options
 *
 *  Converts the given JsonML into well-formed XML.
 *
 *  The options currently understood are:
 *
 *  - root (Boolean): wether or not the root node should be included in the
 *    output, or just its children. The default `false` is to not include the
 *    root itself.
 */
expose.renderJsonML = function( jsonml, options ) {
  options = options || {};
  // include the root element in the rendered output?
  options.root = options.root || false;

  var content = [];

  if ( options.root ) {
    content.push( render_tree( jsonml ) );
  }
  else {
    jsonml.shift(); // get rid of the tag
    if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) ) {
      jsonml.shift(); // get rid of the attributes
    }

    while ( jsonml.length ) {
      content.push( render_tree( jsonml.shift() ) );
    }
  }

  return content.join( "\n\n" );
};

function escapeHTML( text ) {
  return text.replace( /&/g, "&amp;" )
             .replace( /</g, "&lt;" )
             .replace( />/g, "&gt;" )
             .replace( /"/g, "&quot;" )
             .replace( /'/g, "&#39;" );
}

function render_tree( jsonml ) {
  // basic case
  if ( typeof jsonml === "string" ) {
    return escapeHTML( jsonml );
  }

  var tag = jsonml.shift(),
      attributes = {},
      content = [];

  if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) ) {
    attributes = jsonml.shift();
  }

  while ( jsonml.length ) {
    content.push( arguments.callee( jsonml.shift() ) );
  }

  var tag_attrs = "";
  for ( var a in attributes ) {
    tag_attrs += " " + a + '="' + escapeHTML( attributes[ a ] ) + '"';
  }

  // be careful about adding whitespace here for inline elements
  if ( tag == "img" || tag == "br" || tag == "hr" ) {
    return "<"+ tag + tag_attrs + "/>";
  }
  else {
    return "<"+ tag + tag_attrs + ">" + content.join( "" ) + "</" + tag + ">";
  }
}

function convert_tree_to_html( tree, references, options ) {
  var i;
  options = options || {};

  // shallow clone
  var jsonml = tree.slice( 0 );

  if (typeof options.preprocessTreeNode === "function") {
      jsonml = options.preprocessTreeNode(jsonml, references);
  }

  // Clone attributes if they exist
  var attrs = extract_attr( jsonml );
  if ( attrs ) {
    jsonml[ 1 ] = {};
    for ( i in attrs ) {
      jsonml[ 1 ][ i ] = attrs[ i ];
    }
    attrs = jsonml[ 1 ];
  }

  // basic case
  if ( typeof jsonml === "string" ) {
    return jsonml;
  }

  // convert this node
  switch ( jsonml[ 0 ] ) {
    case "header":
      jsonml[ 0 ] = "h" + jsonml[ 1 ].level;
      delete jsonml[ 1 ].level;
      break;
    case "bulletlist":
      jsonml[ 0 ] = "ul";
      break;
    case "numberlist":
      jsonml[ 0 ] = "ol";
      break;
    case "listitem":
      jsonml[ 0 ] = "li";
      break;
    case "para":
      jsonml[ 0 ] = "p";
      break;
    case "markdown":
      jsonml[ 0 ] = "html";
      if ( attrs ) delete attrs.references;
      break;
    case "code_block":
      jsonml[ 0 ] = "pre";
      i = attrs ? 2 : 1;
      var code = [ "code" ];
      code.push.apply( code, jsonml.splice( i ) );
      jsonml[ i ] = code;
      break;
    case "inlinecode":
      jsonml[ 0 ] = "code";
      break;
    case "img":
      jsonml[ 1 ].src = jsonml[ 1 ].href;
      delete jsonml[ 1 ].href;
      break;
    case "linebreak":
      jsonml[ 0 ] = "br";
    break;
    case "link":
      jsonml[ 0 ] = "a";
      break;
    case "link_ref":
      jsonml[ 0 ] = "a";

      // grab this ref and clean up the attribute node
      var ref = references[ attrs.ref ];

      // if the reference exists, make the link
      if ( ref ) {
        delete attrs.ref;

        // add in the href and title, if present
        attrs.href = ref.href;
        if ( ref.title ) {
          attrs.title = ref.title;
        }

        // get rid of the unneeded original text
        delete attrs.original;
      }
      // the reference doesn't exist, so revert to plain text
      else {
        return attrs.original;
      }
      break;
    case "img_ref":
      jsonml[ 0 ] = "img";

      // grab this ref and clean up the attribute node
      var ref = references[ attrs.ref ];

      // if the reference exists, make the link
      if ( ref ) {
        delete attrs.ref;

        // add in the href and title, if present
        attrs.src = ref.href;
        if ( ref.title ) {
          attrs.title = ref.title;
        }

        // get rid of the unneeded original text
        delete attrs.original;
      }
      // the reference doesn't exist, so revert to plain text
      else {
        return attrs.original;
      }
      break;
  }

  // convert all the children
  i = 1;

  // deal with the attribute node, if it exists
  if ( attrs ) {
    // if there are keys, skip over it
    for ( var key in jsonml[ 1 ] ) {
      i = 2;
    }
    // if there aren't, remove it
    if ( i === 1 ) {
      jsonml.splice( i, 1 );
    }
  }

  for ( ; i < jsonml.length; ++i ) {
    jsonml[ i ] = arguments.callee( jsonml[ i ], references, options );
  }

  return jsonml;
}


// merges adjacent text nodes into a single node
function merge_text_nodes( jsonml ) {
  // skip the tag name and attribute hash
  var i = extract_attr( jsonml ) ? 2 : 1;

  while ( i < jsonml.length ) {
    // if it's a string check the next item too
    if ( typeof jsonml[ i ] === "string" ) {
      if ( i + 1 < jsonml.length && typeof jsonml[ i + 1 ] === "string" ) {
        // merge the second string into the first and remove it
        jsonml[ i ] += jsonml.splice( i + 1, 1 )[ 0 ];
      }
      else {
        ++i;
      }
    }
    // if it's not a string recurse
    else {
      arguments.callee( jsonml[ i ] );
      ++i;
    }
  }
}

} )( (function() {
  if ( typeof exports === "undefined" ) {
    window.markdown = {};
    return window.markdown;
  }
  else {
    return exports;
  }
} )() );

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
}

// i18next, v1.5.5
// Copyright (c)2012 Jan Mühlemann (jamuhl).
// Distributed under MIT license
// http://i18next.com
(function(){function a(e,t){if(!t||typeof t=="function")return e;for(var n in t)e[n]=t[n];return e}function f(e,t,n){var r,i=0,s=e.length,o=s===undefined||typeof e=="function";if(n){if(o){for(r in e)if(t.apply(e[r],n)===!1)break}else for(;i<s;)if(t.apply(e[i++],n)===!1)break}else if(o){for(r in e)if(t.call(e[r],r,e[r])===!1)break}else for(;i<s;)if(t.call(e[i],i,e[i++])===!1)break;return e}function l(e){var t=function(e){if(window.XMLHttpRequest)return e(null,new XMLHttpRequest);if(window.ActiveXObject)try{return e(null,new ActiveXObject("Msxml2.XMLHTTP"))}catch(t){return e(null,new ActiveXObject("Microsoft.XMLHTTP"))}return e(new Error)},n=function(e){if(typeof e=="string")return e;var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return t.join("&")},r=function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);r<128?t+=String.fromCharCode(r):r>127&&r<2048?(t+=String.fromCharCode(r>>6|192),t+=String.fromCharCode(r&63|128)):(t+=String.fromCharCode(r>>12|224),t+=String.fromCharCode(r>>6&63|128),t+=String.fromCharCode(r&63|128))}return t},i=function(e){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";e=r(e);var n="",i,s,o,u,a,f,l,c=0;do i=e.charCodeAt(c++),s=e.charCodeAt(c++),o=e.charCodeAt(c++),u=i>>2,a=(i&3)<<4|s>>4,f=(s&15)<<2|o>>6,l=o&63,isNaN(s)?f=l=64:isNaN(o)&&(l=64),n+=t.charAt(u)+t.charAt(a)+t.charAt(f)+t.charAt(l),i=s=o="",u=a=f=l="";while(c<e.length);return n},s=function(){var e=arguments[0];for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)n.hasOwnProperty(r)&&(e[r]=n[r])}return e},o=function(e,r,i,u){typeof i=="function"&&(u=i,i={}),i.cache=i.cache||!1,i.data=i.data||{},i.headers=i.headers||{},i.jsonp=i.jsonp||!1,i.async=i.async===undefined?!0:i.async;var a=s({accept:"*/*","content-type":"application/x-www-form-urlencoded;charset=UTF-8"},o.headers,i.headers),f;a["content-type"]==="application/json"?f=JSON.stringify(i.data):f=n(i.data);if(e==="GET"){var l=[];f&&(l.push(f),f=null),i.cache||l.push("_="+(new Date).getTime()),i.jsonp&&(l.push("callback="+i.jsonp),l.push("jsonp="+i.jsonp)),l="?"+l.join("&"),r+=l!=="?"?l:"";if(i.jsonp){var c=document.getElementsByTagName("head")[0],h=document.createElement("script");h.type="text/javascript",h.src=r,c.appendChild(h);return}}t(function(t,n){if(t)return u(t);n.open(e,r,i.async);for(var s in a)a.hasOwnProperty(s)&&n.setRequestHeader(s,a[s]);n.onreadystatechange=function(){if(n.readyState===4){var e=n.responseText||"";if(!u)return;u(n.status,{text:function(){return e},json:function(){return JSON.parse(e)}})}},n.send(f)})},u={authBasic:function(e,t){o.headers.Authorization="Basic "+i(e+":"+t)},connect:function(e,t,n){return o("CONNECT",e,t,n)},del:function(e,t,n){return o("DELETE",e,t,n)},get:function(e,t,n){return o("GET",e,t,n)},head:function(e,t,n){return o("HEAD",e,t,n)},headers:function(e){o.headers=e||{}},isAllowed:function(e,t,n){this.options(e,function(e,r){n(r.text().indexOf(t)!==-1)})},options:function(e,t,n){return o("OPTIONS",e,t,n)},patch:function(e,t,n){return o("PATCH",e,t,n)},post:function(e,t,n){return o("POST",e,t,n)},put:function(e,t,n){return o("PUT",e,t,n)},trace:function(e,t,n){return o("TRACE",e,t,n)}},a=e.sendType?e.sendType.toLowerCase():"get";u[a](e.url,{async:e.async},function(t,n){t===200?e.success(n.json(),t,null):e.error(n.text(),t,null)})}function h(e,s){typeof e=="function"&&(s=e,e={}),e=e||{},c.extend(u,e),typeof u.ns=="string"&&(u.ns={namespaces:[u.ns],defaultNs:u.ns}),u.lng||(u.lng=c.detectLanguage()),u.lng?c.cookie.create("i18next",u.lng,u.cookieExpirationTime):(u.lng=u.fallbackLng,c.cookie.remove("i18next")),o=c.toLanguages(u.lng),i=o[0],c.log("currentLng set to: "+i),N.setCurrentLng(i),t&&u.setJqueryExt&&m();var a;t&&t.Deferred&&(a=t.Deferred());if(u.resStore)return r=u.resStore,s&&s(E),a&&a.resolve(),a;var f=c.toLanguages(u.lng);typeof u.preload=="string"&&(u.preload=[u.preload]);for(var l=0,h=u.preload.length;l<h;l++){var p=c.toLanguages(u.preload[l]);for(var d=0,v=p.length;d<v;d++)f.indexOf(p[d])<0&&f.push(p[d])}return n.sync.load(f,u,function(e,t){r=t,s&&s(E),a&&a.resolve()}),a}function p(e,t){typeof e=="string"&&(e=[e]);for(var n=0,r=e.length;n<r;n++)u.preload.indexOf(e[n])<0&&u.preload.push(e[n]);return h(t)}function d(e,t){return h({lng:e},t)}function v(){return i}function m(){function e(e,n,r){if(n.length===0)return;var i="text";if(n.indexOf("[")===0){var s=n.split("]");n=s[1],i=s[0].substr(1,s[0].length-1)}n.indexOf(";")===n.length-1&&(n=n.substr(0,n.length-2));var o;i==="html"?(o=t.extend({defaultValue:e.html()},r),e.html(t.t(n,o))):i==="text"?(o=t.extend({defaultValue:e.text()},r),e.text(t.t(n,o))):(o=t.extend({defaultValue:e.attr(i)},r),e.attr(i,t.t(n,o)))}function n(n,r){var i=n.attr("data-i18n");if(!i)return;!r&&u.useDataAttrOptions===!0&&(r=n.data("i18n-options")),r=r||{};if(i.indexOf(";")<=i.length-1){var s=i.split(";");t.each(s,function(t,i){e(n,i,r)})}else e(n,k,r);u.useDataAttrOptions===!0&&n.data("i18n-options",r)}t.t=t.t||E,t.fn.i18n=function(e){return this.each(function(){n(t(this),e);var r=t(this).find("[data-i18n]");r.each(function(){n(t(this),e)})})}}function g(e,t,n){return e.indexOf(u.interpolationPrefix)<0?e:(c.each(t,function(t,r){typeof r=="object"?e=g(e,r,t):e=e.replace(new RegExp([u.interpolationPrefix,n?n+"."+t:t,u.interpolationSuffix].join(""),"g"),r)}),e)}function y(e,t){var n=c.extend({},t);delete n.postProcess;while(e.indexOf(u.reusePrefix)!=-1){s++;if(s>u.maxRecursion)break;var r=e.indexOf(u.reusePrefix),i=e.indexOf(u.reuseSuffix,r)+u.reuseSuffix.length,o=e.substring(r,i),a=o.replace(u.reusePrefix,"").replace(u.reuseSuffix,""),f=S(a,n);e=e.replace(o,f)}return e}function b(e){return e.context&&typeof e.context=="string"}function w(e){return e.count!==undefined&&typeof e.count!="string"&&e.count!==1}function E(e,t){return s=0,S(e,t)}function S(e,t){t=t||{};var s,a,f=t.defaultValue||e,l=o;if(t.lng){l=c.toLanguages(t.lng);if(!r[l[0]]){var h=u.getAsync;u.getAsync=!1,n.sync.load(l,u,function(e,t){c.extend(r,t),u.getAsync=h})}}if(!r)return f;var p=u.ns.defaultNs;if(e.indexOf(u.nsseparator)>-1){var d=e.split(u.nsseparator);p=d[0],e=d[1]}if(b(t)){s=c.extend({},t),delete s.context,s.defaultValue=u.contextNotFound;var v=p+":"+e+"_"+t.context;a=E(v,s);if(a!=u.contextNotFound)return g(a,{context:t.context})}if(w(t)){s=c.extend({},t),delete s.count,s.defaultValue=u.pluralNotFound;var m=p+":"+e+u.pluralSuffix,x=N.get(i,t.count);x>=0?m=m+"_"+x:x===1&&(m=p+":"+e),a=E(m,s);if(a!=u.pluralNotFound)return g(a,{count:t.count})}var k,L=e.split(u.keyseparator);for(var A=0,O=l.length;A<O;A++){if(k)break;var M=l[A],_=0,D=r[M]&&r[M][p];while(L[_])D=D&&D[L[_]],_++;if(D){if(typeof D=="string")D=g(D,t),D=y(D,t);else if(Object.prototype.toString.apply(D)==="[object Array]"&&!u.returnObjectTrees&&!t.returnObjectTrees)D=D.join("\n"),D=g(D,t),D=y(D,t);else if(!u.returnObjectTrees&&!t.returnObjectTrees)D="key '"+p+":"+e+" ("+M+")' "+"returned a object instead of string.",c.log(D);else for(var P in D)D[P]=S(e+"."+P,t);k=D}}!k&&u.sendMissing&&(t.lng?T.postMissing(t.lng,p,e,f,l):T.postMissing(u.lng,p,e,f,l));var H=t.postProcess||u.postProcess;return k&&H&&C[H]&&(k=C[H](k,e,t)),k||(f=g(f,t),f=y(f,t)),k?k:f}function x(){var e,t=[];window&&(function(){var e=window.location.search.substring(1),n=e.split("&");for(var r=0;r<n.length;r++){var i=n[r].indexOf("=");if(i>0){var s=n[r].substring(0,i),o=n[r].substring(i+1);t[s]=o}}}(),t.setLng&&(e=t.setLng));if(!e&&document){var n=c.cookie.read("i18next");n&&(e=n)}return!e&&navigator&&(e=navigator.language?navigator.language:navigator.userLanguage),e}Array.prototype.indexOf||(Array.prototype.indexOf=function(e){"use strict";if(this==null)throw new TypeError;var t=Object(this),n=t.length>>>0;if(n===0)return-1;var r=0;arguments.length>0&&(r=Number(arguments[1]),r!=r?r=0:r!=0&&r!=Infinity&&r!=-Infinity&&(r=(r>0||-1)*Math.floor(Math.abs(r))));if(r>=n)return-1;var i=r>=0?r:Math.max(n-Math.abs(r),0);for(;i<n;i++)if(i in t&&t[i]===e)return i;return-1});var e=this,t=e.jQuery,n={},r={},i,s=0,o=[];typeof module!="undefined"&&module.exports?module.exports=n:typeof define=="function"&&define.amd?define(n):t?t.i18n=t.i18n||n:e.i18n=e.i18n||n;var u={lng:undefined,load:"all",preload:[],lowerCaseLng:!1,returnObjectTrees:!1,fallbackLng:"dev",ns:"translation",nsseparator:":",keyseparator:".",debug:!1,resGetPath:"locales/__lng__/__ns__.json",resPostPath:"locales/add/__lng__/__ns__",getAsync:!0,postAsync:!0,resStore:undefined,useLocalStorage:!1,localStorageExpirationTime:6048e5,dynamicLoad:!1,sendMissing:!1,sendMissingTo:"fallback",sendType:"POST",interpolationPrefix:"__",interpolationSuffix:"__",reusePrefix:"$t(",reuseSuffix:")",pluralSuffix:"_plural",pluralNotFound:["plural_not_found",Math.random()].join(""),contextNotFound:["context_not_found",Math.random()].join(""),setJqueryExt:!0,useDataAttrOptions:!1,cookieExpirationTime:undefined,postProcess:undefined},c={extend:t?t.extend:a,each:t?t.each:f,ajax:t?t.ajax:l,detectLanguage:x,log:function(e){u.debug&&console.log(e)},cookie:{create:function(e,t,n){var r;if(n){var i=new Date;i.setTime(i.getTime()+n*60*1e3),r="; expires="+i.toGMTString()}else r="";document.cookie=e+"="+t+r+"; path=/"},read:function(e){var t=e+"=",n=document.cookie.split(";");for(var r=0;r<n.length;r++){var i=n[r];while(i.charAt(0)==" ")i=i.substring(1,i.length);if(i.indexOf(t)===0)return i.substring(t.length,i.length)}return null},remove:function(e){this.create(e,"",-1)}},toLanguages:function(e){var t=[];if(e.indexOf("-")===2&&e.length===5){var n=e.split("-");e=u.lowerCaseLng?n[0].toLowerCase()+"-"+n[1].toLowerCase():n[0].toLowerCase()+"-"+n[1].toUpperCase(),u.load!=="unspecific"&&t.push(e),u.load!=="current"&&t.push(e.substr(0,2))}else t.push(e);return t.indexOf(u.fallbackLng)===-1&&u.fallbackLng&&t.push(u.fallbackLng),t}},T={load:function(e,t,n){t.useLocalStorage?T._loadLocal(e,t,function(r,i){var s=[];for(var o=0,u=e.length;o<u;o++)i[e[o]]||s.push(e[o]);s.length>0?T._fetch(s,t,function(e,t){c.extend(i,t),T._storeLocal(t),n(null,i)}):n(null,i)}):T._fetch(e,t,function(e,t){n(null,t)})},_loadLocal:function(e,t,n){var r={},i=(new Date).getTime();if(window.localStorage){var s=e.length;c.each(e,function(e,o){var u=window.localStorage.getItem("res_"+o);u&&(u=JSON.parse(u),u.i18nStamp&&u.i18nStamp+t.localStorageExpirationTime>i&&(r[o]=u)),s--,s===0&&n(null,r)})}},_storeLocal:function(e){if(window.localStorage)for(var t in e)e[t].i18nStamp=(new Date).getTime(),window.localStorage.setItem("res_"+t,JSON.stringify(e[t]));return},_fetch:function(e,t,n){var r=t.ns,i={};if(!t.dynamicLoad){var s=r.namespaces.length*e.length,o;c.each(r.namespaces,function(r,u){c.each(e,function(e,r){T._fetchOne(r,u,t,function(e,t){e&&(o=o||[],o.push(e)),i[r]=i[r]||{},i[r][u]=t,s--,s===0&&n(o,i)})})})}else{var u=g(t.resGetPath,{lng:e.join("+"),ns:r.namespaces.join("+")});c.ajax({url:u,success:function(e,t,r){c.log("loaded: "+u),n(null,e)},error:function(e,t,r){c.log("failed loading: "+u),n("failed loading resource.json error: "+r)},dataType:"json",async:t.getAsync})}},_fetchOne:function(e,t,n,r){var i=g(n.resGetPath,{lng:e,ns:t});c.ajax({url:i,success:function(e,t,n){c.log("loaded: "+i),r(null,e)},error:function(e,t,n){c.log("failed loading: "+i),r(n,{})},dataType:"json",async:n.getAsync})},postMissing:function(e,t,n,i,s){var o={};o[n]=i;var a=[];if(u.sendMissingTo==="fallback")a.push({lng:u.fallbackLng,url:g(u.resPostPath,{lng:u.fallbackLng,ns:t})});else if(u.sendMissingTo==="current")a.push({lng:e,url:g(u.resPostPath,{lng:e,ns:t})});else if(u.sendMissingTo==="all")for(var f=0,l=s.length;f<l;f++)a.push({lng:s[f],url:g(u.resPostPath,{lng:s[f],ns:t})});for(var h=0,p=a.length;h<p;h++){var d=a[h];c.ajax({url:d.url,type:u.sendType,data:o,success:function(e,s,o){c.log("posted missing key '"+n+"' to: "+d.url),r[d.lng][t][n]=i},error:function(e,t,r){c.log("failed posting missing key '"+n+"' to: "+d.url)},dataType:"json",async:u.postAsync})}}},N={rules:{ach:{name:"Acholi",numbers:[1,2],plurals:function(e){return Number(e>1)}},af:{name:"Afrikaans",numbers:[2,1],plurals:function(e){return Number(e!=1)}},ak:{name:"Akan",numbers:[1,2],plurals:function(e){return Number(e>1)}},am:{name:"Amharic",numbers:[1,2],plurals:function(e){return Number(e>1)}},an:{name:"Aragonese",numbers:[2,1],plurals:function(e){return Number(e!=1)}},ar:{name:"Arabic",numbers:[0,1,2,3,11,100],plurals:function(e){return Number(e===0?0:e==1?1:e==2?2:e%100>=3&&e%100<=10?3:e%100>=11?4:5)}},arn:{name:"Mapudungun",numbers:[1,2],plurals:function(e){return Number(e>1)}},ast:{name:"Asturian",numbers:[2,1],plurals:function(e){return Number(e!=1)}},ay:{name:"Aymará",numbers:[1],plurals:function(e){return 0}},az:{name:"Azerbaijani",numbers:[2,1],plurals:function(e){return Number(e!=1)}},be:{name:"Belarusian",numbers:[5,1,2],plurals:function(e){return Number(e%10==1&&e%100!=11?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2)}},bg:{name:"Bulgarian",numbers:[2,1],plurals:function(e){return Number(e!=1)}},bn:{name:"Bengali",numbers:[2,1],plurals:function(e){return Number(e!=1)}},bo:{name:"Tibetan",numbers:[1],plurals:function(e){return 0}},br:{name:"Breton",numbers:[1,2],plurals:function(e){return Number(e>1)}},bs:{name:"Bosnian",numbers:[5,1,2],plurals:function(e){return Number(e%10==1&&e%100!=11?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2)}},ca:{name:"Catalan",numbers:[2,1],plurals:function(e){return Number(e!=1)}},cgg:{name:"Chiga",numbers:[1],plurals:function(e){return 0}},cs:{name:"Czech",numbers:[5,1,2],plurals:function(e){return Number(e==1?0:e>=2&&e<=4?1:2)}},csb:{name:"Kashubian",numbers:[5,1,2],plurals:function(e){return Number(e==1?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2)}},cy:{name:"Welsh",numbers:[3,1,2,8],plurals:function(e){return Number(e==1?0:e==2?1:e!=8&&e!=11?2:3)}},da:{name:"Danish",numbers:[2,1],plurals:function(e){return Number(e!=1)}},de:{name:"German",numbers:[2,1],plurals:function(e){return Number(e!=1)}},dz:{name:"Dzongkha",numbers:[1],plurals:function(e){return 0}},el:{name:"Greek",numbers:[2,1],plurals:function(e){return Number(e!=1)}},en:{name:"English",numbers:[2,1],plurals:function(e){return Number(e!=1)}},eo:{name:"Esperanto",numbers:[2,1],plurals:function(e){return Number(e!=1)}},es:{name:"Spanish",numbers:[2,1],plurals:function(e){return Number(e!=1)}},es_ar:{name:"Argentinean Spanish",numbers:[2,1],plurals:function(e){return Number(e!=1)}},et:{name:"Estonian",numbers:[2,1],plurals:function(e){return Number(e!=1)}},eu:{name:"Basque",numbers:[2,1],plurals:function(e){return Number(e!=1)}},fa:{name:"Persian",numbers:[1],plurals:function(e){return 0}},fi:{name:"Finnish",numbers:[2,1],plurals:function(e){return Number(e!=1)}},fil:{name:"Filipino",numbers:[1,2],plurals:function(e){return Number(e>1)}},fo:{name:"Faroese",numbers:[2,1],plurals:function(e){return Number(e!=1)}},fr:{name:"French",numbers:[1,2],plurals:function(e){return Number(e>1)}},fur:{name:"Friulian",numbers:[2,1],plurals:function(e){return Number(e!=1)}},fy:{name:"Frisian",numbers:[2,1],plurals:function(e){return Number(e!=1)}},ga:{name:"Irish",numbers:[3,1,2,7,11],plurals:function(e){return Number(e==1?0:e==2?1:e<7?2:e<11?3:4)}},gd:{name:"Scottish Gaelic",numbers:[20,1,2,3],plurals:function(e){return Number(e==1||e==11?0:e==2||e==12?1:e>2&&e<20?2:3)}},gl:{name:"Galician",numbers:[2,1],plurals:function(e){return Number(e!=1)}},gu:{name:"Gujarati",numbers:[2,1],plurals:function(e){return Number(e!=1)}},gun:{name:"Gun",numbers:[1,2],plurals:function(e){return Number(e>1)}},ha:{name:"Hausa",numbers:[2,1],plurals:function(e){return Number(e!=1)}},he:{name:"Hebrew",numbers:[2,1],plurals:function(e){return Number(e!=1)}},hi:{name:"Hindi",numbers:[2,1],plurals:function(e){return Number(e!=1)}},hr:{name:"Croatian",numbers:[5,1,2],plurals:function(e){return Number(e%10==1&&e%100!=11?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2)}},hu:{name:"Hungarian",numbers:[2,1],plurals:function(e){return Number(e!=1)}},hy:{name:"Armenian",numbers:[2,1],plurals:function(e){return Number(e!=1)}},ia:{name:"Interlingua",numbers:[2,1],plurals:function(e){return Number(e!=1)}},id:{name:"Indonesian",numbers:[1],plurals:function(e){return 0}},is:{name:"Icelandic",numbers:[2,1],plurals:function(e){return Number(e%10!=1||e%100==11)}},it:{name:"Italian",numbers:[2,1],plurals:function(e){return Number(e!=1)}},ja:{name:"Japanese",numbers:[1],plurals:function(e){return 0}},jbo:{name:"Lojban",numbers:[1],plurals:function(e){return 0}},jv:{name:"Javanese",numbers:[0,1],plurals:function(e){return Number(e!==0)}},ka:{name:"Georgian",numbers:[1],plurals:function(e){return 0}},kk:{name:"Kazakh",numbers:[1],plurals:function(e){return 0}},km:{name:"Khmer",numbers:[1],plurals:function(e){return 0}},kn:{name:"Kannada",numbers:[2,1],plurals:function(e){return Number(e!=1)}},ko:{name:"Korean",numbers:[1],plurals:function(e){return 0}},ku:{name:"Kurdish",numbers:[2,1],plurals:function(e){return Number(e!=1)}},kw:{name:"Cornish",numbers:[4,1,2,3],plurals:function(e){return Number(e==1?0:e==2?1:e==3?2:3)}},ky:{name:"Kyrgyz",numbers:[1],plurals:function(e){return 0}},lb:{name:"Letzeburgesch",numbers:[2,1],plurals:function(e){return Number(e!=1)}},ln:{name:"Lingala",numbers:[1,2],plurals:function(e){return Number(e>1)}},lo:{name:"Lao",numbers:[1],plurals:function(e){return 0}},lt:{name:"Lithuanian",numbers:[10,1,2],plurals:function(e){return Number(e%10==1&&e%100!=11?0:e%10>=2&&(e%100<10||e%100>=20)?1:2)}},lv:{name:"Latvian",numbers:[0,1,2],plurals:function(e){return Number(e%10==1&&e%100!=11?0:e!==0?1:2)}},mai:{name:"Maithili",numbers:[2,1],plurals:function(e){return Number(e!=1)}},mfe:{name:"Mauritian Creole",numbers:[1,2],plurals:function(e){return Number(e>1)}},mg:{name:"Malagasy",numbers:[1,2],plurals:function(e){return Number(e>1)}},mi:{name:"Maori",numbers:[1,2],plurals:function(e){return Number(e>1)}},mk:{name:"Macedonian",numbers:[2,1],plurals:function(e){return Number(e==1||e%10==1?0:1)}},ml:{name:"Malayalam",numbers:[2,1],plurals:function(e){return Number(e!=1)}},mn:{name:"Mongolian",numbers:[2,1],plurals:function(e){return Number(e!=1)}},mnk:{name:"Mandinka",numbers:[0,1,2],plurals:function(e){return Number(e==1?1:2)}},mr:{name:"Marathi",numbers:[2,1],plurals:function(e){return Number(e!=1)}},ms:{name:"Malay",numbers:[1],plurals:function(e){return 0}},mt:{name:"Maltese",numbers:[2,1,11,20],plurals:function(e){return Number(e==1?0:e===0||e%100>1&&e%100<11?1:e%100>10&&e%100<20?2:3)}},nah:{name:"Nahuatl",numbers:[2,1],plurals:function(e){return Number(e!=1)}},nap:{name:"Neapolitan",numbers:[2,1],plurals:function(e){return Number(e!=1)}},nb:{name:"Norwegian Bokmal",numbers:[2,1],plurals:function(e){return Number(e!=1)}},ne:{name:"Nepali",numbers:[2,1],plurals:function(e){return Number(e!=1)}},nl:{name:"Dutch",numbers:[2,1],plurals:function(e){return Number(e!=1)}},nn:{name:"Norwegian Nynorsk",numbers:[2,1],plurals:function(e){return Number(e!=1)}},no:{name:"Norwegian",numbers:[2,1],plurals:function(e){return Number(e!=1)}},nso:{name:"Northern Sotho",numbers:[2,1],plurals:function(e){return Number(e!=1)}},oc:{name:"Occitan",numbers:[1,2],plurals:function(e){return Number(e>1)}},or:{name:"Oriya",numbers:[2,1],plurals:function(e){return Number(e!=1)}},pa:{name:"Punjabi",numbers:[2,1],plurals:function(e){return Number(e!=1)}},pap:{name:"Papiamento",numbers:[2,1],plurals:function(e){return Number(e!=1)}},pl:{name:"Polish",numbers:[5,1,2],plurals:function(e){return Number(e==1?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2)}},pms:{name:"Piemontese",numbers:[2,1],plurals:function(e){return Number(e!=1)}},ps:{name:"Pashto",numbers:[2,1],plurals:function(e){return Number(e!=1)}},pt:{name:"Portuguese",numbers:[2,1],plurals:function(e){return Number(e!=1)}},pt_br:{name:"Brazilian Portuguese",numbers:[2,1],plurals:function(e){return Number(e!=1)}},rm:{name:"Romansh",numbers:[2,1],plurals:function(e){return Number(e!=1)}},ro:{name:"Romanian",numbers:[2,1,20],plurals:function(e){return Number(e==1?0:e===0||e%100>0&&e%100<20?1:2)}},ru:{name:"Russian",numbers:[5,1,2],plurals:function(e){return Number(e%10==1&&e%100!=11?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2)}},sah:{name:"Yakut",numbers:[1],plurals:function(e){return 0}},sco:{name:"Scots",numbers:[2,1],plurals:function(e){return Number(e!=1)}},se:{name:"Northern Sami",numbers:[2,1],plurals:function(e){return Number(e!=1)}},si:{name:"Sinhala",numbers:[2,1],plurals:function(e){return Number(e!=1)}},sk:{name:"Slovak",numbers:[5,1,2],plurals:function(e){return Number(e==1?0:e>=2&&e<=4?1:2)}},sl:{name:"Slovenian",numbers:[5,1,2,3],plurals:function(e){return Number(e%100==1?1:e%100==2?2:e%100==3||e%100==4?3:0)}},so:{name:"Somali",numbers:[2,1],plurals:function(e){return Number(e!=1)}},son:{name:"Songhay",numbers:[2,1],plurals:function(e){return Number(e!=1)}},sq:{name:"Albanian",numbers:[2,1],plurals:function(e){return Number(e!=1)}},sr:{name:"Serbian",numbers:[5,1,2],plurals:function(e){return Number(e%10==1&&e%100!=11?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2)}},su:{name:"Sundanese",numbers:[1],plurals:function(e){return 0}},sv:{name:"Swedish",numbers:[2,1],plurals:function(e){return Number(e!=1)}},sw:{name:"Swahili",numbers:[2,1],plurals:function(e){return Number(e!=1)}},ta:{name:"Tamil",numbers:[2,1],plurals:function(e){return Number(e!=1)}},te:{name:"Telugu",numbers:[2,1],plurals:function(e){return Number(e!=1)}},tg:{name:"Tajik",numbers:[1,2],plurals:function(e){return Number(e>1)}},th:{name:"Thai",numbers:[1],plurals:function(e){return 0}},ti:{name:"Tigrinya",numbers:[1,2],plurals:function(e){return Number(e>1)}},tk:{name:"Turkmen",numbers:[2,1],plurals:function(e){return Number(e!=1)}},tr:{name:"Turkish",numbers:[1,2],plurals:function(e){return Number(e>1)}},tt:{name:"Tatar",numbers:[1],plurals:function(e){return 0}},ug:{name:"Uyghur",numbers:[1],plurals:function(e){return 0}},uk:{name:"Ukrainian",numbers:[5,1,2],plurals:function(e){return Number(e%10==1&&e%100!=11?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2)}},ur:{name:"Urdu",numbers:[2,1],plurals:function(e){return Number(e!=1)}},uz:{name:"Uzbek",numbers:[1,2],plurals:function(e){return Number(e>1)}},vi:{name:"Vietnamese",numbers:[1],plurals:function(e){return 0}},wa:{name:"Walloon",numbers:[1,2],plurals:function(e){return Number(e>1)}},wo:{name:"Wolof",numbers:[1],plurals:function(e){return 0}},yo:{name:"Yoruba",numbers:[2,1],plurals:function(e){return Number(e!=1)}},zh:{name:"Chinese",numbers:[1],plurals:function(e){return 0}}},addRule:function(e,t){N.rules[e]=t},setCurrentLng:function(e){if(!N.currentRule||N.currentRule.lng!==e){var t=e.split("-");N.currentRule={lng:e,rule:N.rules[t[0]]}}},get:function(e,t){function r(t,n){var r;N.currentRule&&N.currentRule.lng===e?r=N.currentRule.rule:r=N.rules[t];if(r){var i=r.plurals(n),s=r.numbers[i];return r.numbers.length===2&&(s===2?s=1:s===1&&(s=-1)),s}return n===1?"1":"-1"}var n=e.split("-");return r(n[0],t)}},C={},L=function(e,t){C[e]=t},A=function(){function e(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}function t(e,t){for(var n=[];t>0;n[--t]=e);return n.join("")}var n=function(){return n.cache.hasOwnProperty(arguments[0])||(n.cache[arguments[0]]=n.parse(arguments[0])),n.format.call(null,n.cache[arguments[0]],arguments)};return n.format=function(n,r){var i=1,s=n.length,o="",u,a=[],f,l,c,h,p,d;for(f=0;f<s;f++){o=e(n[f]);if(o==="string")a.push(n[f]);else if(o==="array"){c=n[f];if(c[2]){u=r[i];for(l=0;l<c[2].length;l++){if(!u.hasOwnProperty(c[2][l]))throw A('[sprintf] property "%s" does not exist',c[2][l]);u=u[c[2][l]]}}else c[1]?u=r[c[1]]:u=r[i++];if(/[^s]/.test(c[8])&&e(u)!="number")throw A("[sprintf] expecting number but found %s",e(u));switch(c[8]){case"b":u=u.toString(2);break;case"c":u=String.fromCharCode(u);break;case"d":u=parseInt(u,10);break;case"e":u=c[7]?u.toExponential(c[7]):u.toExponential();break;case"f":u=c[7]?parseFloat(u).toFixed(c[7]):parseFloat(u);break;case"o":u=u.toString(8);break;case"s":u=(u=String(u))&&c[7]?u.substring(0,c[7]):u;break;case"u":u=Math.abs(u);break;case"x":u=u.toString(16);break;case"X":u=u.toString(16).toUpperCase()}u=/[def]/.test(c[8])&&c[3]&&u>=0?"+"+u:u,p=c[4]?c[4]=="0"?"0":c[4].charAt(1):" ",d=c[6]-String(u).length,h=c[6]?t(p,d):"",a.push(c[5]?u+h:h+u)}}return a.join("")},n.cache={},n.parse=function(e){var t=e,n=[],r=[],i=0;while(t){if((n=/^[^\x25]+/.exec(t))!==null)r.push(n[0]);else if((n=/^\x25{2}/.exec(t))!==null)r.push("%");else{if((n=/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(t))===null)throw"[sprintf] huh?";if(n[2]){i|=1;var s=[],o=n[2],u=[];if((u=/^([a-z_][a-z_\d]*)/i.exec(o))===null)throw"[sprintf] huh?";s.push(u[1]);while((o=o.substring(u[0].length))!=="")if((u=/^\.([a-z_][a-z_\d]*)/i.exec(o))!==null)s.push(u[1]);else{if((u=/^\[(\d+)\]/.exec(o))===null)throw"[sprintf] huh?";s.push(u[1])}n[2]=s}else i|=2;if(i===3)throw"[sprintf] mixing positional and named placeholders is not (yet) supported";r.push(n)}t=t.substring(n[0].length)}return r},n}(),O=function(e,t){return t.unshift(e),A.apply(null,t)};L("sprintf",function(e,t,n){return n.sprintf?Object.prototype.toString.apply(n.sprintf)==="[object Array]"?O(e,n.sprintf):typeof n.sprintf=="object"?A(e,n.sprintf):e:e}),n.init=h,n.setLng=d,n.preload=p,n.t=E,n.translate=E,n.detectLanguage=c.detectLanguage,n.pluralExtensions=N,n.sync=T,n.functions=c,n.lng=v,n.addPostProcessor=L,n.options=u})();
