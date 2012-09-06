(function() {
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
    
    
    jQuery.prototype._outerWidth = jQuery.prototype.outerWidth;
    
    jQuery.prototype.outerWidth = function(includeMargin, value) {
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
    
    jQuery.prototype._outerHeight = jQuery.prototype.outerHeight;
    
    jQuery.prototype.outerHeight = function(includeMargin, value) {
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
    
    jQuery.prototype.nonContentWidth = function(includeMargin) {
      if (includeMargin == null) {
        includeMargin = false;
      }
      return this._outerWidth(includeMargin) - this.width();
    };
    
    jQuery.prototype.nonContentHeight = function(includeMargin) {
      if (includeMargin == null) {
        includeMargin = false;
      }
      return this._outerHeight(includeMargin) - this.height();
    };
    
    jQuery.prototype.ncss = function(propertyName, defaultValue) {
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
    
    jQuery.prototype.minWidth = function() {
      return this.ncss('min-width');
    };
    
    jQuery.prototype.minHeight = function() {
      return this.ncss('min-height');
    };
    
    jQuery.prototype.maxWidth = function() {
      return this.ncss('max-width');
    };
    
    jQuery.prototype.maxHeight = function() {
      return this.ncss('max-height');
    };
    
    jQuery.prototype.contentX = function(includeMargin) {
      var borderLeft, marginLeft, paddingLeft;
      if (includeMargin == null) {
        includeMargin = false;
      }
      marginLeft = includeMargin ? this.ncss('margin-left') : 0;
      borderLeft = this.ncss('border-left-width');
      paddingLeft = this.ncss('padding-left');
      return marginLeft + borderLeft + paddingLeft;
    };
    
    jQuery.prototype.contentY = function(includeMargin) {
      var borderTop, marginTop, paddingTop;
      if (includeMargin == null) {
        includeMargin = false;
      }
      marginTop = includeMargin ? this.ncss('margin-top') : 0;
      borderTop = this.ncss('border-top-width');
      paddingTop = this.ncss('padding-top');
      return marginTop + borderTop + paddingTop;
    };
    
    jQuery.prototype.absoluteX = function(value) {
      var offset;
      offset = this.offset();
      if (value != null) {
        offset.left = value;
        return this.offset(offset);
      }
      return offset.left;
    };
    
    jQuery.prototype.absoluteY = function(value) {
      var offset;
      offset = this.offset();
      if (value != null) {
        offset.top = value;
        return this.offset(offset);
      }
      return offset.top;
    };
    
    jQuery.prototype.relativeX = function(includeMargin, value) {
      var offset, parent;
      if (includeMargin == null) {
        includeMargin = false;
      }
      if (typeof includeMargin === 'number') {
        value = includeMargin;
        includeMargin = false;
      }
      parent = this.parent();
      offset = parent.absoluteX() + parent.contentX(includeMargin);
      if (value != null) {
        return this.absoluteX(value + offset);
      }
      return this.absoluteX() - offset;
    };
    
    jQuery.prototype.relativeY = function(includeMargin, value) {
      var offset, parent;
      if (includeMargin == null) {
        includeMargin = false;
      }
      if (typeof includeMargin === 'number') {
        value = includeMargin;
        includeMargin = false;
      }
      parent = this.parent();
      offset = parent.absoluteY() + parent.contentY(includeMargin);
      if (value != null) {
        return this.absoluteY(value + offset);
      }
      return this.absoluteY() - offset;
    };
    
    var Caretaker, Command, DummyCommand, Originator,
      __hasProp = {}.hasOwnProperty,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
    
    Command = (function() {
    
      function Command(receiver, callback) {
        var _this = this;
        this._receiver = receiver;
        this._callback = callback || function() {
          return _this.callback();
        };
      }
    
      Command.prototype.callback = function() {
        throw "NotImplementedError";
      };
    
      Command.prototype.getReceiver = function() {
        return this._receiver;
      };
    
      Command.prototype.getCallback = function() {
        return this._callback;
      };
    
      Command.prototype.invoke = function() {
        var callback, receiver;
        receiver = this.getReceiver();
        callback = this.getCallback();
        this._prev = receiver.createMemento();
        callback.call(receiver);
        return this._next = receiver.createMemento();
      };
    
      Command.prototype.undo = function() {
        var receiver;
        receiver = this.getReceiver();
        return receiver.setMemento(this._prev);
      };
    
      Command.prototype.redo = function() {
        var receiver;
        receiver = this.getReceiver();
        return receiver.setMemento(this._next);
      };
    
      return Command;
    
    })();
    
    DummyCommand = (function(_super) {
    
      __extends(DummyCommand, _super);
    
      function DummyCommand(receiver) {
        DummyCommand.__super__.constructor.call(this, receiver, function() {
          return this;
        });
      }
    
      return DummyCommand;
    
    })(Command);
    
    Originator = (function() {
    
      function Originator() {}
    
      Originator.prototype.createMemento = function() {
        throw "NotImplementedError";
      };
    
      Originator.prototype.setMemento = function(memento) {
        throw "NotImplementedError";
      };
    
      return Originator;
    
    })();
    
    Caretaker = (function() {
    
      function Caretaker() {
        this._undoStack = [];
        this._redoStack = [];
      }
    
      Caretaker.prototype.invoke = function(command) {
        command.invoke();
        this._redoStack = [];
        return this._undoStack.push(command);
      };
    
      Caretaker.prototype.undo = function() {
        var command;
        if (!this.canUndo()) {
          return false;
        }
        command = this._undoStack.pop();
        command.undo();
        this._redoStack.push(command);
        return true;
      };
    
      Caretaker.prototype.redo = function() {
        var command;
        if (!this.canRedo()) {
          return false;
        }
        command = this._redoStack.pop();
        command.redo();
        this._undoStack.push(command);
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
    
    var animate;
    
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
          return options.callback(options.end, options.duration);
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
    
    var JencilCore;
    
    JencilCore = (function() {
    
      function JencilCore(textarea) {
        var _this = this;
        this.caretaker = new Caretaker();
        this.profile = new MarkdownProfile();
        this.element = textarea;
        this.element.hide();
        this.fullscreen = new Fullscreen(this);
        this.wrapper = new Wrapper(this);
        this.element.after(this.fullscreen.element);
        this.element.after(this.wrapper.element);
        this.update(function(value) {
          return _this.element.val(value);
        });
        $(window).resize(function() {
          return _this.adjust();
        });
        this.init().adjust();
      }
    
      JencilCore.prototype.setProfile = function(profile) {
        return this.wrapper.workspace.reconstructor(profile);
      };
    
      JencilCore.prototype.getEditor = function() {
        return this.wrapper.workspace.editorPanel;
      };
    
      JencilCore.prototype.getViewer = function() {
        return this.wrapper.workspace.viewerPanel;
      };
    
      JencilCore.prototype.init = function() {
        this.wrapper.init();
        return this;
      };
    
      JencilCore.prototype.adjust = function() {
        this.wrapper.adjust();
        return this;
      };
    
      JencilCore.prototype.focus = function() {
        this.getEditor().focus();
        return this;
      };
    
      JencilCore.prototype.update = function(callback) {
        var editor;
        editor = this.getEditor();
        if (callback != null) {
          editor.update(callback);
          return this;
        }
        this.editor.update();
        return this;
      };
    
      JencilCore.prototype.options = {
        defaultSplitterVolume: 1,
        previewTemplatePath: null
      };
    
      return JencilCore;
    
    })();
    
    $.fn.jencil = function(options) {
      var $this, instance;
      $this = $(this);
      instance = new JencilCore($this);
      return $this.data('jencil', instance);
    };
    
    var CommandBase, EditorCommand, EditorMarkupCommand,
      __hasProp = {}.hasOwnProperty,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
    
    CommandBase = (function(_super) {
    
      __extends(CommandBase, _super);
    
      function CommandBase(core, receiver, callback) {
        this.core = core;
        CommandBase.__super__.constructor.call(this, receiver, callback);
      }
    
      return CommandBase;
    
    })(Command);
    
    EditorCommand = (function(_super) {
    
      __extends(EditorCommand, _super);
    
      function EditorCommand(core, callback) {
        EditorCommand.__super__.constructor.call(this, core, null, callback);
      }
    
      EditorCommand.prototype.getReceiver = function() {
        return this.core.getEditor();
      };
    
      return EditorCommand;
    
    })(CommandBase);
    
    EditorMarkupCommand = (function(_super) {
    
      __extends(EditorMarkupCommand, _super);
    
      function EditorMarkupCommand(core, name) {
        this.name = name;
        EditorMarkupCommand.__super__.constructor.call(this, core, null);
      }
    
      EditorMarkupCommand.prototype.getCallback = function() {
        var receiver;
        receiver = this.getReceiver();
        return receiver[this.name];
      };
    
      return EditorMarkupCommand;
    
    })(EditorCommand);
    
    var Widget;
    
    Widget = (function() {
    
      function Widget(core, selector, context) {
        var instance;
        this.core = core;
        if (selector == null) {
          selector = '<div>';
        }
        if (selector instanceof jQuery) {
          this.element = selector;
        } else {
          this.element = jQuery(selector, context);
        }
        instance = this.element.data('widget-instance');
        if ((instance != null) && instance instanceof Widget) {
          return instance;
        }
        this.element.data('widget-instance', this);
      }
    
      Widget.prototype.factory = function(jQueryObj) {
        return new Widget(this.core, jQueryObj);
      };
    
      Widget.prototype.parent = function() {
        if (this._parentCache != null) {
          return this._parentCache;
        }
        this._parentCache = this.factory(this.element.parent());
        return this._parentCache;
      };
    
      Widget.prototype.children = function() {
        var c;
        if (this._childrenCache != null) {
          return this._childrenCache;
        }
        this._childrenCache = (function() {
          var _i, _len, _ref, _results;
          _ref = this.element.children();
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            c = _ref[_i];
            _results.push(this.factory(jQuery(c)));
          }
          return _results;
        }).call(this);
        return this._childrenCache;
      };
    
      Widget.prototype.init = function() {
        var child, _i, _len, _ref;
        _ref = this.children();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          child.init();
        }
        return this.adjust();
      };
    
      Widget.prototype.adjust = function() {
        var child, _i, _len, _ref;
        _ref = this.children();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          child.adjust();
        }
        return this;
      };
    
      return Widget;
    
    })();
    
    var HorizontalSplitter, Splitter, VerticalSplitter,
      __hasProp = {}.hasOwnProperty,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
    
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
          _this.mousemove(e);
          e.stopPropagation();
          e.stopImmediatePropagation();
          return e.preventDefault();
        };
        mouseup = function(e) {
          var $window;
          $window = $(window);
          $window.unbind('mousemove', mousemove);
          $window.unbind('mouseup', mouseup);
          e.stopPropagation();
          e.stopImmediatePropagation();
          return e.preventDefault();
        };
        this.element.mousedown(function(e) {
          var $window;
          $window = $(window);
          $window.mousemove(mousemove);
          $window.mouseup(mouseup);
          e.stopPropagation();
          e.stopImmediatePropagation();
          return e.preventDefault();
        });
      }
    
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
      }
    
      VerticalSplitter.prototype.mousemove = function(e) {
        var container, value;
        container = this.fst.parent();
        value = e.pageX - (container.element.absoluteX() + container.element.contentX(true));
        value = this.regulateValue(value);
        return this.value(value);
      };
    
      VerticalSplitter.prototype.valueWidth = function() {
        var container;
        container = this.fst.parent();
        return container.element.width();
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
        HorizontalSplitter.__super__.constructor.call(this, core, fst, snd, defaultVolume);
        this.element.addClass('horizontal');
        this.fst.element.addClass('top');
        this.snd.element.addClass('bottom');
      }
    
      HorizontalSplitter.prototype.mousemove = function(e) {
        var container, value;
        container = this.fst.parent();
        value = e.pageY - (container.element.absoluteY() + container.element.contentY(true));
        value = this.regulateValue(value);
        return this.value(value);
      };
    
      HorizontalSplitter.prototype.valueWidth = function() {
        var container;
        container = this.fst.parent();
        return container.element.height();
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
    
    var Fullscreen, HorizontalPanel, Panel, VerticalPanel,
      __hasProp = {}.hasOwnProperty,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
    
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
    
    VerticalPanel = (function(_super) {
    
      __extends(VerticalPanel, _super);
    
      function VerticalPanel(core, fst, snd, defaultVolume) {
        this.fst = fst;
        this.snd = snd;
        this.defaultVolume = defaultVolume != null ? defaultVolume : 0.5;
        VerticalPanel.__super__.constructor.call(this, core);
        this.element.addClass('vertical');
        this.fst = this.fst || new Panel(core);
        this.snd = this.snd || new Panel(core);
        this.splitter = new VerticalSplitter(core, this.fst, this.snd, this.defaultVolume);
        this.element.append(this.fst.element);
        this.element.append(this.splitter.element);
        this.element.append(this.snd.element);
      }
    
      VerticalPanel.prototype.init = function() {
        this.splitter.init();
        this.fst.init();
        return this.snd.init();
      };
    
      VerticalPanel.prototype.adjust = function() {
        this.fst.element.outerHeight(this.element.height());
        this.snd.element.outerHeight(this.element.height());
        this.splitter.element.outerHeight(this.element.height());
        this.splitter.adjust();
        return this;
      };
    
      return VerticalPanel;
    
    })(Panel);
    
    HorizontalPanel = (function(_super) {
    
      __extends(HorizontalPanel, _super);
    
      function HorizontalPanel(core, fst, snd, defaultVolume) {
        this.fst = fst;
        this.snd = snd;
        this.defaultVolume = defaultVolume != null ? defaultVolume : 0.5;
        HorizontalPanel.__super__.constructor.call(this, core);
        this.element.addClass('horizontal');
        this.fst = this.fst || new Panel(core);
        this.snd = this.snd || new Panel(core);
        this.splitter = new HorizontalSplitter(core, this.fst, this.snd, this.defaultVolume);
        this.element.append(this.fst.element);
        this.element.append(this.splitter.element);
        this.element.append(this.snd.element);
      }
    
      HorizontalPanel.prototype.init = function() {
        this.splitter.init();
        this.fst.init();
        return this.snd.init();
      };
    
      HorizontalPanel.prototype.adjust = function() {
        this.fst.element.outerWidth(this.element.width());
        this.snd.element.outerWidth(this.element.width());
        this.splitter.element.outerWidth(this.element.width());
        this.splitter.adjust();
        return this;
      };
    
      return HorizontalPanel;
    
    })(Panel);
    
    Fullscreen = (function(_super) {
    
      __extends(Fullscreen, _super);
    
      function Fullscreen(core) {
        var _this = this;
        Fullscreen.__super__.constructor.call(this, core);
        this.element.addClass('fullscreen');
        this.element.css({
          'display': 'table',
          'position': 'fixed',
          'top': '0',
          'left': '0',
          'width': '100%',
          'height': '100%'
        });
        if ($.browser.msie && $.browser.version < 7) {
          this.element.css('position', 'absolute');
          $(window).scroll(function() {
            return _this.element.css('top', $(document).scrollTop());
          });
        }
        this.curtain = $('<div>').addClass('curtain');
        this.curtain.css({
          'position': 'absolute',
          'top': '0',
          'left': '0',
          'width': '100%',
          'height': '100%',
          'background': 'black',
          'opacity': '0.6'
        });
        this.curtain.click(function() {
          return _this.hide();
        });
        this.cell = $('<div>').css({
          'display': 'table-cell',
          'vertical-align': 'middle',
          'width': '95%',
          'height': '95%'
        });
        this.element.append(this.curtain);
        this.element.append(this.cell);
        this.element.hide();
      }
    
      Fullscreen.prototype.show = function() {
        var _this = this;
        this._width = this.core.wrapper.element.css('width');
        this._height = this.core.wrapper.element.css('height');
        this.core.wrapper.element.css('width', '90%');
        this.core.wrapper.element.css('height', '90%');
        this.cell.append(this.core.wrapper.element);
        return this.element.fadeIn('fast', function() {
          _this.core.init();
          return _this.core.adjust();
        });
      };
    
      Fullscreen.prototype.hide = function() {
        var _this = this;
        this.core.wrapper.element.css('width', this._width);
        this.core.wrapper.element.css('height', this._height);
        this.core.element.after(this.core.wrapper.element);
        return this.element.fadeOut('fast', function() {
          _this.core.init();
          return _this.core.adjust();
        });
      };
    
      return Fullscreen;
    
    })(Panel);
    
    var Toolbar,
      __hasProp = {}.hasOwnProperty,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
    
    Toolbar = (function(_super) {
    
      __extends(Toolbar, _super);
    
      function Toolbar(core) {
        Toolbar.__super__.constructor.call(this, core);
        this.element.addClass('toolbar');
      }
    
      return Toolbar;
    
    })(Panel);
    
    var ActionButton, Button, CommandButton, EditorMarkupButton, Separator,
      __hasProp = {}.hasOwnProperty,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
    
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
    
      function Button(core, name) {
        this.name = name;
        Button.__super__.constructor.call(this, core, '<a>');
        this.element.addClass('button').addClass(name);
        this.element.append($("<span>" + name + "</span>"));
        this.element.attr('title', name);
      }
    
      return Button;
    
    })(Widget);
    
    ActionButton = (function(_super) {
    
      __extends(ActionButton, _super);
    
      function ActionButton(core, name, callback, shortcut) {
        var _this = this;
        this.callback = callback;
        this.shortcut = shortcut;
        ActionButton.__super__.constructor.call(this, core, name);
        this.element.click(function() {
          return _this.callback();
        });
        if ((this.shortcut != null) && (window.shortcut != null)) {
          window.shortcut.add(this.shortcut, function() {
            return _this.callback();
          });
          this.element.attr('title', "" + name + " (" + this.shortcut + ")");
        }
      }
    
      return ActionButton;
    
    })(Button);
    
    CommandButton = (function(_super) {
    
      __extends(CommandButton, _super);
    
      function CommandButton(core, name, command, shortcut) {
        var callback,
          _this = this;
        this.command = command;
        callback = function() {
          return _this.core.caretaker.invoke(_this.command);
        };
        CommandButton.__super__.constructor.call(this, core, name, callback, shortcut);
      }
    
      return CommandButton;
    
    })(ActionButton);
    
    EditorMarkupButton = (function(_super) {
    
      __extends(EditorMarkupButton, _super);
    
      function EditorMarkupButton(core, name, shortcut) {
        var command;
        command = new EditorMarkupCommand(core, name);
        EditorMarkupButton.__super__.constructor.call(this, core, name, command, shortcut);
      }
    
      return EditorMarkupButton;
    
    })(CommandButton);
    
    var FullscreenButton, PreviewButton, RedoButton, UndoButton,
      __hasProp = {}.hasOwnProperty,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
    
    UndoButton = (function(_super) {
    
      __extends(UndoButton, _super);
    
      function UndoButton(core) {
        var callback, check,
          _this = this;
        callback = function(e) {
          return _this.core.caretaker.undo();
        };
        check = function() {
          if (!_this.core.caretaker.canUndo()) {
            _this.element.addClass('disabled');
          } else {
            _this.element.removeClass('disabled');
          }
          return setTimeout(check, 100);
        };
        UndoButton.__super__.constructor.call(this, core, 'undo', callback, 'Ctrl+Z');
        check();
      }
    
      return UndoButton;
    
    })(ActionButton);
    
    RedoButton = (function(_super) {
    
      __extends(RedoButton, _super);
    
      function RedoButton(core) {
        var callback, check,
          _this = this;
        callback = function(e) {
          return _this.core.caretaker.redo();
        };
        check = function() {
          if (!_this.core.caretaker.canRedo()) {
            _this.element.addClass('disabled');
          } else {
            _this.element.removeClass('disabled');
          }
          return setTimeout(check, 100);
        };
        RedoButton.__super__.constructor.call(this, core, 'redo', callback, 'Ctrl+Shift+Z');
        check();
      }
    
      return RedoButton;
    
    })(ActionButton);
    
    FullscreenButton = (function(_super) {
    
      __extends(FullscreenButton, _super);
    
      function FullscreenButton(core) {
        var callback,
          _this = this;
        callback = function(e) {
          if (_this.core.fullscreen.element.is(':visible')) {
            _this.core.fullscreen.hide();
            return _this.element.removeClass('hide');
          } else {
            _this.core.fullscreen.show();
            return _this.element.addClass('hide');
          }
        };
        FullscreenButton.__super__.constructor.call(this, core, 'fullscreen', callback, 'Ctrl+F');
      }
    
      return FullscreenButton;
    
    })(ActionButton);
    
    PreviewButton = (function(_super) {
    
      __extends(PreviewButton, _super);
    
      function PreviewButton(core) {
        var callback,
          _this = this;
        callback = function(e) {
          var viewer;
          viewer = _this.core.getViewer();
          if (!viewer.element.is(':visible')) {
            _this.element.addClass('hide');
          } else {
            _this.element.removeClass('hide');
          }
          return _this.core.wrapper.workspace.toggleViewer();
        };
        PreviewButton.__super__.constructor.call(this, core, 'preview', callback, 'Ctrl+P');
      }
    
      PreviewButton.prototype.init = function() {
        if (this.core.wrapper.workspace.mainPanel.splitter.defaultValue === 0) {
          return this.element.addClass('hide');
        } else {
          return this.element.removeClass('hide');
        }
      };
    
      return PreviewButton;
    
    })(ActionButton);
    
    var AlignCenterButton, AlignJustifyButton, AlignLeftButton, AlignRightButton, AnchorButton, BoldButton, H1Button, H2Button, H3Button, H4Button, H5Button, H6Button, ImageButton, IndentButton, ItalicButton, OrderedListButton, OutdentButton, StrikeButton, SubscriptButton, SuperscriptButton, UnderlineButton, UnorderedListButton,
      __hasProp = {}.hasOwnProperty,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
    
    H1Button = (function(_super) {
    
      __extends(H1Button, _super);
    
      function H1Button(core) {
        H1Button.__super__.constructor.call(this, core, 'h1');
      }
    
      return H1Button;
    
    })(EditorMarkupButton);
    
    H2Button = (function(_super) {
    
      __extends(H2Button, _super);
    
      function H2Button(core) {
        H2Button.__super__.constructor.call(this, core, 'h2');
      }
    
      return H2Button;
    
    })(EditorMarkupButton);
    
    H3Button = (function(_super) {
    
      __extends(H3Button, _super);
    
      function H3Button(core) {
        H3Button.__super__.constructor.call(this, core, 'h3');
      }
    
      return H3Button;
    
    })(EditorMarkupButton);
    
    H4Button = (function(_super) {
    
      __extends(H4Button, _super);
    
      function H4Button(core) {
        H4Button.__super__.constructor.call(this, core, 'h4');
      }
    
      return H4Button;
    
    })(EditorMarkupButton);
    
    H5Button = (function(_super) {
    
      __extends(H5Button, _super);
    
      function H5Button(core) {
        H5Button.__super__.constructor.call(this, core, 'h5');
      }
    
      return H5Button;
    
    })(EditorMarkupButton);
    
    H6Button = (function(_super) {
    
      __extends(H6Button, _super);
    
      function H6Button(core) {
        H6Button.__super__.constructor.call(this, core, 'h6');
      }
    
      return H6Button;
    
    })(EditorMarkupButton);
    
    BoldButton = (function(_super) {
    
      __extends(BoldButton, _super);
    
      function BoldButton(core) {
        BoldButton.__super__.constructor.call(this, core, 'bold', "Ctrl+B");
      }
    
      return BoldButton;
    
    })(EditorMarkupButton);
    
    ItalicButton = (function(_super) {
    
      __extends(ItalicButton, _super);
    
      function ItalicButton(core) {
        ItalicButton.__super__.constructor.call(this, core, 'italic', "Ctrl+I");
      }
    
      return ItalicButton;
    
    })(EditorMarkupButton);
    
    UnderlineButton = (function(_super) {
    
      __extends(UnderlineButton, _super);
    
      function UnderlineButton(core) {
        UnderlineButton.__super__.constructor.call(this, core, 'underline', "Ctrl+U");
      }
    
      return UnderlineButton;
    
    })(EditorMarkupButton);
    
    StrikeButton = (function(_super) {
    
      __extends(StrikeButton, _super);
    
      function StrikeButton(core) {
        StrikeButton.__super__.constructor.call(this, core, 'strike');
      }
    
      return StrikeButton;
    
    })(EditorMarkupButton);
    
    SuperscriptButton = (function(_super) {
    
      __extends(SuperscriptButton, _super);
    
      function SuperscriptButton(core) {
        SuperscriptButton.__super__.constructor.call(this, core, 'superscript');
      }
    
      return SuperscriptButton;
    
    })(EditorMarkupButton);
    
    SubscriptButton = (function(_super) {
    
      __extends(SubscriptButton, _super);
    
      function SubscriptButton(core) {
        SubscriptButton.__super__.constructor.call(this, core, 'subscript');
      }
    
      return SubscriptButton;
    
    })(EditorMarkupButton);
    
    AnchorButton = (function(_super) {
    
      __extends(AnchorButton, _super);
    
      function AnchorButton(core) {
        AnchorButton.__super__.constructor.call(this, core, 'anchor');
      }
    
      return AnchorButton;
    
    })(EditorMarkupButton);
    
    ImageButton = (function(_super) {
    
      __extends(ImageButton, _super);
    
      function ImageButton(core) {
        ImageButton.__super__.constructor.call(this, core, 'image');
      }
    
      return ImageButton;
    
    })(EditorMarkupButton);
    
    UnorderedListButton = (function(_super) {
    
      __extends(UnorderedListButton, _super);
    
      function UnorderedListButton(core) {
        UnorderedListButton.__super__.constructor.call(this, core, 'unorderedList');
      }
    
      return UnorderedListButton;
    
    })(EditorMarkupButton);
    
    OrderedListButton = (function(_super) {
    
      __extends(OrderedListButton, _super);
    
      function OrderedListButton(core) {
        OrderedListButton.__super__.constructor.call(this, core, 'orderedList');
      }
    
      return OrderedListButton;
    
    })(EditorMarkupButton);
    
    IndentButton = (function(_super) {
    
      __extends(IndentButton, _super);
    
      function IndentButton(core) {
        IndentButton.__super__.constructor.call(this, core, 'indent');
      }
    
      return IndentButton;
    
    })(EditorMarkupButton);
    
    OutdentButton = (function(_super) {
    
      __extends(OutdentButton, _super);
    
      function OutdentButton(core) {
        OutdentButton.__super__.constructor.call(this, core, 'outdent');
      }
    
      return OutdentButton;
    
    })(EditorMarkupButton);
    
    AlignLeftButton = (function(_super) {
    
      __extends(AlignLeftButton, _super);
    
      function AlignLeftButton(core) {
        AlignLeftButton.__super__.constructor.call(this, core, 'alignLeft');
      }
    
      return AlignLeftButton;
    
    })(EditorMarkupButton);
    
    AlignCenterButton = (function(_super) {
    
      __extends(AlignCenterButton, _super);
    
      function AlignCenterButton(core) {
        AlignCenterButton.__super__.constructor.call(this, core, 'alignCenter');
      }
    
      return AlignCenterButton;
    
    })(EditorMarkupButton);
    
    AlignRightButton = (function(_super) {
    
      __extends(AlignRightButton, _super);
    
      function AlignRightButton(core) {
        AlignRightButton.__super__.constructor.call(this, core, 'alignRight');
      }
    
      return AlignRightButton;
    
    })(EditorMarkupButton);
    
    AlignJustifyButton = (function(_super) {
    
      __extends(AlignJustifyButton, _super);
    
      function AlignJustifyButton(core) {
        AlignJustifyButton.__super__.constructor.call(this, core, 'alignJustify');
      }
    
      return AlignJustifyButton;
    
    })(EditorMarkupButton);
    
    var Workspace, Wrapper,
      __hasProp = {}.hasOwnProperty,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
    
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
        if (this.element.resizable != null) {
          this.element.resizable({
            resize: function() {
              return _this.adjust();
            },
            stop: function() {
              return _this.adjust();
            }
          });
        }
        this.workspace.init();
        return this;
      };
    
      Wrapper.prototype.adjust = function() {
        this.workspace.element.outerWidth(this.element.width());
        this.workspace.element.outerHeight(this.element.height());
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
        this.reconstructor(core.profile);
      }
    
      Workspace.prototype.reconstructor = function(profile) {
        var button, buttonClass, buttonClasses, editorClass, viewerClass, _i, _len,
          _this = this;
        this.element.empty();
        editorClass = profile.getEditorClass();
        this.editorPanel = new editorClass(this.core);
        viewerClass = profile.getViewerClass();
        this.viewerPanel = new viewerClass(this.core);
        this.editorPanel.update(function(value) {
          return _this.viewerPanel.update(value);
        });
        this.mainPanel = new VerticalPanel(this.core, this.editorPanel, this.viewerPanel, this.core.options.defaultSplitterVolume);
        this.mainPanel.element.addClass('mainPanel');
        this.toolbar = new Toolbar(this.core);
        buttonClasses = profile.getButtonClasses();
        for (_i = 0, _len = buttonClasses.length; _i < _len; _i++) {
          buttonClass = buttonClasses[_i];
          button = new buttonClass(this.core);
          this.toolbar.element.append(button.element);
        }
        this.toolbar.element.appendTo(this.element);
        return this.mainPanel.element.appendTo(this.element);
      };
    
      Workspace.prototype.init = function() {
        this.toolbar.init();
        return this.mainPanel.init();
      };
    
      Workspace.prototype.adjust = function() {
        this.toolbar.element.outerWidth(this.element.width());
        this.mainPanel.element.outerWidth(this.element.width());
        this.mainPanel.element.outerHeight(this.element.height() - this.toolbar.element.outerHeight());
        this.toolbar.adjust();
        this.mainPanel.adjust();
        return this;
      };
    
      Workspace.prototype.toggleViewer = function(callback) {
        var end, volume,
          _this = this;
        volume = this.mainPanel.splitter.volume();
        if ((0 < volume && volume < 1)) {
          end = 1;
          this._previousSplitterVolume = volume;
        } else {
          end = this._previousSplitterVolume || this.mainPanel.splitter.defaultVolume;
          if (end === 1) {
            end = 0.5;
          }
        }
        return animate({
          start: volume,
          end: end,
          duration: 500,
          callback: function(value, epoch) {
            return _this.mainPanel.splitter.volume(value);
          }
        });
      };
    
      return Workspace;
    
    })(Panel);
    
    var Editor, TextEditor, TextPanel,
      __hasProp = {}.hasOwnProperty,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
    
    Editor = (function(_super) {
    
      __extends(Editor, _super);
    
      function Editor(core, selector, context) {
        Editor.__super__.constructor.call(this, core, selector, context);
        this.element.addClass('editor');
        this._updateCallbacks = [];
      }
    
      Editor.prototype.focus = function() {
        throw "NotImplementedError";
      };
    
      Editor.prototype.getValue = function() {
        throw "NotImplementedError";
      };
    
      Editor.prototype.setValue = function() {
        throw "NotImplementedError";
      };
    
      Editor.prototype.update = function(callback) {
        var _i, _len, _ref, _results;
        if (callback != null) {
          this._updateCallbacks.push(callback);
          return this;
        }
        _ref = this._updateCallbacks;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          callback = _ref[_i];
          _results.push(callback.call(this, this.getValue()));
        }
        return _results;
      };
    
      Editor.prototype.createMemento = function() {
        return this.getValue();
      };
    
      Editor.prototype.setMemento = function(memento) {
        return this.setValue(memento);
      };
    
      return Editor;
    
    })(Panel);
    
    TextPanel = (function(_super) {
    
      __extends(TextPanel, _super);
    
      function TextPanel(core) {
        TextPanel.__super__.constructor.call(this, core, '<textarea>');
        this.element.css({
          margin: '0',
          padding: '0',
          border: 'none',
          outline: 'none',
          resize: 'none'
        });
        if ($.fn.tabby != null) {
          this.element.tabby();
        }
        this.helper = new Textarea(window.document, this.element.get(0));
      }
    
      TextPanel.prototype.caret = function(start, end) {
        return this.helper.selection.caret(start, end);
      };
    
      TextPanel.prototype.selection = function(value) {
        if (value != null) {
          return this.helper.selection.replaceSelection(value, true);
        }
        return this.helper.selection.text();
      };
    
      TextPanel.prototype.insertBefore = function(str) {
        return this.helper.selection.insertBeforeSelection(str, true);
      };
    
      TextPanel.prototype.insertAfter = function(str) {
        return this.helper.selection.insertAfterSelection(str, true);
      };
    
      TextPanel.prototype.wrap = function(before, after) {
        return this.helper.selection.wrapSelection(before, after, true);
      };
    
      return TextPanel;
    
    })(Panel);
    
    TextEditor = (function(_super) {
    
      __extends(TextEditor, _super);
    
      function TextEditor(core) {
        var _this = this;
        TextEditor.__super__.constructor.call(this, core);
        this.textPanel = new TextPanel(core);
        this.element.append(this.textPanel.element);
        this.textPanel.element.on('keyup keypress click blur', function() {
          return _this.update();
        });
        this.textPanel.element.on('keyup', function(e) {
          var dummyCommand;
          if (e.which === 13) {
            dummyCommand = new DummyCommand(_this);
            return _this.core.caretaker.invoke(dummyCommand);
          }
        });
      }
    
      TextEditor.prototype.adjust = function() {
        this.textPanel.element.outerWidth(this.element.width());
        this.textPanel.element.outerHeight(this.element.height());
        this.textPanel.adjust();
        return this;
      };
    
      TextEditor.prototype.focus = function() {
        this.textPanel.element.focus();
        return this;
      };
    
      TextEditor.prototype.getValue = function() {
        return this.textPanel.helper.val();
      };
    
      TextEditor.prototype.setValue = function(value) {
        this.textPanel.helper.val(value);
        this.update();
        return this;
      };
    
      TextEditor.prototype.caret = function(start, end) {
        this.textPanel.focus();
        return this.textPanel.caret(start, end);
      };
    
      TextEditor.prototype.selection = function(value) {
        if (value != null) {
          this.textPanel.selection(value);
          this.update();
          return this;
        }
        return this.textPanel.selection(value);
      };
    
      TextEditor.prototype.insertBefore = function(str) {
        this.textPanel.insertBefore(str);
        return this.update();
      };
    
      TextEditor.prototype.insertAfter = function(str) {
        this.textPanel.insertAfter(str);
        return this.update();
      };
    
      TextEditor.prototype.wrap = function(before, after) {
        this.textPanel.wrap(before, after);
        return this.update();
      };
    
      return TextEditor;
    
    })(Editor);
    
    var HtmlEditor,
      __hasProp = {}.hasOwnProperty,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
    
    HtmlEditor = (function(_super) {
    
      __extends(HtmlEditor, _super);
    
      function HtmlEditor() {
        return HtmlEditor.__super__.constructor.apply(this, arguments);
      }
    
      HtmlEditor.prototype.h1 = function() {
        return this.wrap("<h1>", "</h1>");
      };
    
      HtmlEditor.prototype.h2 = function() {
        return this.wrap("<h2>", "</h2>");
      };
    
      HtmlEditor.prototype.h3 = function() {
        return this.wrap("<h3>", "</h3>");
      };
    
      HtmlEditor.prototype.h4 = function() {
        return this.wrap("<h4>", "</h4>");
      };
    
      HtmlEditor.prototype.h5 = function() {
        return this.wrap("<h5>", "</h5>");
      };
    
      HtmlEditor.prototype.h6 = function() {
        return this.wrap("<h6>", "</h6>");
      };
    
      HtmlEditor.prototype.bold = function() {
        return this.wrap("<b>", "</b>");
      };
    
      HtmlEditor.prototype.italic = function() {
        return this.wrap("<i>", "</i>");
      };
    
      HtmlEditor.prototype.underline = function() {
        return this.wrap("<u>", "</u>");
      };
    
      HtmlEditor.prototype.strike = function() {
        return this.wrap("<s>", "</s>");
      };
    
      HtmlEditor.prototype.superscript = function() {
        return this.wrap("<sup>", "</sup>");
      };
    
      HtmlEditor.prototype.subscript = function() {
        return this.wrap("<sub>", "</sub>");
      };
    
      HtmlEditor.prototype.anchor = function() {
        var href, text;
        text = this.selection();
        if (!text) {
          text = window.prompt("Please input a link text", "Here");
        }
        href = window.prompt("Please input a link url", "http://");
        return this.selection("<a href='" + href + "'>" + text + "</a>");
      };
    
      HtmlEditor.prototype.image = function() {
        var alt, src;
        src = window.prompt("Please input a image url", "http://");
        alt = window.prompt("(Optional) Please input a alt message", "Image");
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
    
      HtmlEditor.prototype.indent = function() {
        var text, x;
        text = this.selection();
        text = (function() {
          var _i, _len, _ref, _results;
          _ref = text.split("\n");
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            x = _ref[_i];
            _results.push("  " + x);
          }
          return _results;
        })();
        text.unshift("<div style='margin-left: 4em'>");
        text.push("</div>");
        return this.selection(text.join("\n"));
      };
    
      HtmlEditor.prototype.outdent = function() {
        var text, x;
        text = this.selection();
        text = (function() {
          var _i, _len, _ref, _results;
          _ref = text.split("\n");
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            x = _ref[_i];
            _results.push("  " + x);
          }
          return _results;
        })();
        text.unshift("<div style='margin-left: -4em'>");
        text.push("</div>");
        return this.selection(text.join("\n"));
      };
    
      HtmlEditor.prototype.alignLeft = function() {
        var text, x;
        text = this.selection();
        text = (function() {
          var _i, _len, _ref, _results;
          _ref = text.split("\n");
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            x = _ref[_i];
            _results.push("  " + x);
          }
          return _results;
        })();
        text.unshift("<div style='text-align: left'>");
        text.push("</div>");
        return this.selection(text.join("\n"));
      };
    
      HtmlEditor.prototype.alignCenter = function() {
        var text, x;
        text = this.selection();
        text = (function() {
          var _i, _len, _ref, _results;
          _ref = text.split("\n");
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            x = _ref[_i];
            _results.push("  " + x);
          }
          return _results;
        })();
        text.unshift("<div style='text-align: center'>");
        text.push("</div>");
        return this.selection(text.join("\n"));
      };
    
      HtmlEditor.prototype.alignRight = function() {
        var text, x;
        text = this.selection();
        text = (function() {
          var _i, _len, _ref, _results;
          _ref = text.split("\n");
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            x = _ref[_i];
            _results.push("  " + x);
          }
          return _results;
        })();
        text.unshift("<div style='text-align: right'>");
        text.push("</div>");
        return this.selection(text.join("\n"));
      };
    
      HtmlEditor.prototype.alignJustify = function() {
        var text, x;
        text = this.selection();
        text = (function() {
          var _i, _len, _ref, _results;
          _ref = text.split("\n");
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            x = _ref[_i];
            _results.push("  " + x);
          }
          return _results;
        })();
        text.unshift("<div style='text-align: justify'>");
        text.push("</div>");
        return this.selection(text.join("\n"));
      };
    
      return HtmlEditor;
    
    })(TextEditor);
    
    var MarkdownEditor,
      __hasProp = {}.hasOwnProperty,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
    
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
        return this.wrap("**", "**");
      };
    
      MarkdownEditor.prototype.italic = function() {
        return this.wrap("*", "*");
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
    
      MarkdownEditor.prototype.indent = function() {
        var text, x;
        text = this.selection();
        text = (function() {
          var _i, _len, _ref, _results;
          _ref = text.split("\n");
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            x = _ref[_i];
            _results.push("  " + x);
          }
          return _results;
        })();
        text.unshift("");
        text.push("");
        return this.selection(text.join("\n"));
      };
    
      return MarkdownEditor;
    
    })(HtmlEditor);
    
    var IframePanel, TemplatePanel, TemplateViewer, Viewer,
      __hasProp = {}.hasOwnProperty,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
    
    Viewer = (function(_super) {
    
      __extends(Viewer, _super);
    
      function Viewer(core, selector, context) {
        Viewer.__super__.constructor.call(this, core, selector, context);
        this.element.addClass('viewer');
      }
    
      Viewer.prototype.update = function(value) {
        throw "NotImplementedError";
      };
    
      return Viewer;
    
    })(Panel);
    
    IframePanel = (function(_super) {
    
      __extends(IframePanel, _super);
    
      function IframePanel(core) {
        IframePanel.__super__.constructor.call(this, core, '<iframe>');
        this.element.css({
          margin: '0',
          padding: '0',
          border: 'none',
          outline: 'none',
          resize: 'none',
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        });
        this.element.attr('frameborder', 0);
      }
    
      IframePanel.prototype.init = function() {
        var iframe;
        iframe = this.element.get(0);
        if (iframe.contentDocument != null) {
          this.document = iframe.contentDocument;
        } else {
          this.document = iframe.contentWindow.document;
        }
        return this.document.write('<body></body>');
      };
    
      IframePanel.prototype.write = function(content) {
        var scrollTop;
        if (this.document != null) {
          try {
            scrollTop = this.document.documentElement.scrollTop;
          } catch (e) {
            scrollTop = 0;
          }
          this.document.open();
          this.document.write(content);
          this.document.close();
          this.document.documentElement.scrollTop = scrollTop;
          return true;
        }
        return false;
      };
    
      return IframePanel;
    
    })(Panel);
    
    TemplatePanel = (function(_super) {
    
      __extends(TemplatePanel, _super);
    
      function TemplatePanel() {
        return TemplatePanel.__super__.constructor.apply(this, arguments);
      }
    
      TemplatePanel.prototype.loadTemplate = function(templatePath, value) {
        var _this = this;
        return $.ajax({
          url: templatePath,
          success: function(data) {
            _this._template = data;
            return _this.write(value);
          }
        });
      };
    
      TemplatePanel.prototype.write = function(content) {
        if (this._template != null) {
          content = this._template.replace("{{content}}", content);
        } else if (this.templatePath != null) {
          this.loadTemplate(this.templatePath, content);
        }
        return TemplatePanel.__super__.write.call(this, content);
      };
    
      return TemplatePanel;
    
    })(IframePanel);
    
    TemplateViewer = (function(_super) {
    
      __extends(TemplateViewer, _super);
    
      function TemplateViewer(core) {
        TemplateViewer.__super__.constructor.call(this, core);
        this.templatePanel = new TemplatePanel(core);
        this.templatePanel.templatePath = this.core.options.previewTemplatePath;
        this.element.append(this.templatePanel.element);
      }
    
      TemplateViewer.prototype.adjust = function() {
        this.templatePanel.element.outerWidth(this.element.width());
        this.templatePanel.element.outerHeight(this.element.height());
        this.templatePanel.adjust();
        return this;
      };
    
      TemplateViewer.prototype.update = function(value) {
        this.templatePanel.write(value);
        return this;
      };
    
      return TemplateViewer;
    
    })(Viewer);
    
    var HtmlViewer;
    
    HtmlViewer = TemplateViewer;
    
    var MarkdownViewer,
      __hasProp = {}.hasOwnProperty,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
    
    MarkdownViewer = (function(_super) {
    
      __extends(MarkdownViewer, _super);
    
      function MarkdownViewer() {
        return MarkdownViewer.__super__.constructor.apply(this, arguments);
      }
    
      MarkdownViewer.prototype.update = function(value) {
        return MarkdownViewer.__super__.update.call(this, window.markdown.toHTML(value));
      };
    
      return MarkdownViewer;
    
    })(TemplateViewer);
    
    var Profile;
    
    Profile = (function() {
    
      function Profile() {}
    
      Profile.prototype.buttonClasses = [H1Button, H2Button, H3Button, H4Button, H5Button, H6Button, Separator, UndoButton, RedoButton, Separator, BoldButton, ItalicButton, UnderlineButton, StrikeButton, SuperscriptButton, SubscriptButton, Separator, AnchorButton, ImageButton, Separator, UnorderedListButton, OrderedListButton, Separator, IndentButton, OutdentButton, Separator, AlignLeftButton, AlignCenterButton, AlignRightButton, AlignJustifyButton, Separator, FullscreenButton, PreviewButton];
    
      Profile.prototype.getEditorClass = function() {
        return this.editorClass;
      };
    
      Profile.prototype.getViewerClass = function() {
        return this.viewerClass;
      };
    
      Profile.prototype.getButtonClasses = function() {
        return this.buttonClasses;
      };
    
      return Profile;
    
    })();
    
    var HtmlProfile,
      __hasProp = {}.hasOwnProperty,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
    
    HtmlProfile = (function(_super) {
    
      __extends(HtmlProfile, _super);
    
      function HtmlProfile() {
        return HtmlProfile.__super__.constructor.apply(this, arguments);
      }
    
      HtmlProfile.prototype.editorClass = HtmlEditor;
    
      HtmlProfile.prototype.viewerClass = HtmlViewer;
    
      return HtmlProfile;
    
    })(Profile);
    
    var MarkdownProfile,
      __hasProp = {}.hasOwnProperty,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
    
    MarkdownProfile = (function(_super) {
    
      __extends(MarkdownProfile, _super);
    
      function MarkdownProfile() {
        return MarkdownProfile.__super__.constructor.apply(this, arguments);
      }
    
      MarkdownProfile.prototype.editorClass = MarkdownEditor;
    
      MarkdownProfile.prototype.viewerClass = MarkdownViewer;
    
      return MarkdownProfile;
    
    })(Profile);
    
}).call(this);