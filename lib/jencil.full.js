/*!
 * Jencil - A JavaScript Cross-browser WYSIWYM and WYSIWYG editor v0.0.2
 * http://lambdalisue.github.com/Jencil
 * 
 * Copyright 2011 (c) hashnote.net, Alisue allright reserved.
 * Licensed under the MIT license.
 * 
 * Dependencies:
 * - jQuery v1.4.2
 *   http://jquery.com/
 * - Tabby jQuery plugin v0.12
 *   http://teddevito.com/demos/textarea.html
 * - Textarea v0.1.0 (included)
 *   http://demos.textarea.hashnote.net/
 * - Richarea v0.1.1 (included)
 *   http://demos.richarea.hashnote.net/
 * 
 * Includes Tabby jQuery plugin v0.12
 *   http://teddevito.com/demos/textarea.html
 *   Copyright (c) 2009 Ted Devito
 * 
 * Includes Textarea v0.1.0
 *   http://demos.textarea.hashnote.net/
 *   Copyright (c) 2011 hashnote.net, Alisue allright reserved
 * 
 * Includes Richarea v0.1.1 (included)
 *   http://demos.richarea.hashnote.net/
 *   Copyright (c) 2011 hashnote.net, Alisue allright reserved
 * 
 * Last-Modified: Thu, 06 Oct 2011 13:52:43 GMT
 */
/*!
 * Textarea - JavaScript textarea munipulate library v0.1.1
 * 
 * Cross browser textarea munipulator library written in CoffeeScript
 * 
 * Author: Alisue (lambdalisue@hashnote.net)
 * License: MIT License
 * Version: v0.1.1
 * Url: http://github.com/lambdalisue/Textarea
 * Date: Sat, 01 Oct 2011 18:15:34 GMT
 * Reference:
 * - http://archiva.jp/web/javascript/getRange_in_textarea.html
 * - http://livepipe.net/control/textarea
 * - http://markitup.jaysalvat.com/home/
 */
(function(){this.Textarea=function(){function e(a){this.textarea=typeof jQuery!=="undefined"&&jQuery!==null&&a instanceof jQuery?a.get(0):a}e.prototype.getValue=function(){return this.textarea.value};e.prototype.setValue=function(a){return this.textarea.value=a};e.prototype.getSelection=function(){var a,c;if(document.selection)c=document.selection.createRange(),a=c.duplicate(),a.moveToElementText(this.textarea),a.setEndPoint("EndToEnd",c),a=a.text.length-c.text.length,c=a+c.text.length;else if(this.textarea.setSelectionRange)a=
this.textarea.selectionStart,c=this.textarea.selectionEnd;return[a,c]};e.prototype.setSelection=function(a,c){var b,g;g=this.textarea.scrollTop;if(this.textarea.createTextRange){if($.browser.opera&&$.browser.version>=9.5&&length===0)return!1;b=this.textarea.createTextRange();b.collapse(!0);b.moveStart("character",a);b.moveEnd("character",c-a);b.select()}else this.textarea.setSelectionRange&&this.textarea.setSelectionRange(a,c);this.textarea.focus();return this.textarea.scrollTop=g};e.prototype.getSelected=
function(){var a,c,b;if(document.selection)return a=document.selection.createRange(),a.text;else if(this.textarea.setSelectionRange)return b=this.getSelection(),c=b[0],a=b[1],this.textarea.value.substring(c,a);return!1};e.prototype._replaceSelected=function(a,c,b){c==null&&(c=void 0);b==null&&(b=void 0);if(document.selection)return this.textarea.focus(),b=document.selection.createRange(),b.text=a,b.select();else if(this.textarea.setSelectionRange)return c=this.textarea.value.substring(0,c),b=this.textarea.value.substring(b),
this.textarea.value=c+a+b};e.prototype.replaceSelected=function(a,c){var b,g,d,f;c==null&&(c=!1);g=this.textarea.scrollTop;f=this.getSelection();d=f[0];b=f[1];this._replaceSelected(a,d,b);b=d+a.length;c||(d=b);this.setSelection(d,b);this.textarea.focus();return this.textarea.scrollTop=g};e.prototype.insertBeforeSelected=function(a,c){var b,g,d,f;c==null&&(c=!1);g=this.textarea.scrollTop;d=this.getSelection();f=d[0];b=d[1];d=this.getSelected();this._replaceSelected(a+d,f,b);b=f+a.length;c||(f=b);this.setSelection(f,
b);this.textarea.focus();return this.textarea.scrollTop=g};e.prototype.insertAfterSelected=function(a,c){var b,g,d,f;c==null&&(c=!1);g=this.textarea.scrollTop;d=this.getSelection();f=d[0];b=d[1];d=this.getSelected();this._replaceSelected(d+a,f,b);b=f+a.length;c?f+=d.length:f=b;this.setSelection(f,b);this.textarea.focus();return this.textarea.scrollTop=g};e.prototype.wrapSelected=function(a,c,b,g){var d,f,h,e,i;b==null&&(b=!1);g==null&&(g=void 0);h=this.getSelected();return h.indexOf(a)===0&&h.lastIndexOf(c)===
h.length-c.length?(a=h.substring(a.length,h.length-c.length),this.replaceSelected(a,b)):(h===""&&g!=null?h=g:g=void 0,f=this.textarea.scrollTop,i=this.getSelection(),e=i[0],d=i[1],this._replaceSelected(a+h+c,e,d),b?g?(d=e+a.length+h.length,e+=a.length):d=e+a.length+c.length+h.length:e=d=e+a.length+h.length+c.length,this.setSelection(e,d),this.textarea.focus(),this.textarea.scrollTop=f)};return e}()}).call(this);

/*!
 * Richarea - JavaScript contentEditable munipulate library v0.1.2
 *
 * Cross browser contentEditable iframe munipulator library written in CoffeeScript
 *
 * Author: Alisue (lambdalisue@hashnote.net)
 * License: MIT License.
 * Version: v0.1.2
 * Url: http://github.com/lambdalisue/Richarea
 * Date: Sat, 01 Oct 2011 06:26:25 GMT
 * References (ja):
 * - http://arinogotokuatumarite.blog19.fc2.com/blog-entry-101.html
 * - http://uhyohyohyo.sakura.ne.jp/javascript/8_3.html
 * References (en):
 * - http://msdn.microsoft.com/en-us/library/ms535872(v=VS.85).aspx
 * - http://www.quirksmode.org/dom/range_intro.html
 * - http://stackoverflow.com/questions/1223324/selection-startcontainer-in-ie
 * - http://stackoverflow.com/questions/4811822/get-a-ranges-start-and-end-offsets-relative-to-its-parent-container
 * - http://www.quirksmode.org/dom/execCommand.html
 * - http://stackoverflow.com/questions/3972014/get-caret-position-in-contenteditable-div
 */
(function(){var h,i,o,l,p,s,q,t,v,k,m=function(a,b){return function(){return a.apply(b,arguments)}},r=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;b<c;b++)if(this[b]===a)return b;return-1};o=function(){function a(){this.browser=this.searchString(a.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"An unknown browser";this.OS=this.searchString(a.dataOS)||"An unknown OS"}a.prototype.searchString=function(b){var c,
a,e;for(a=0,e=b.length;a<e;a++)if(c=b[a],this.versionSearchString=c.versionSearch||c.identify,c.string!=null)if(c.string.indexOf(c.subString)!==-1)return c.identify;else if(c.prop)return c.identify;return[]};a.prototype.searchVersion=function(b){var c;c=b.indexOf(this.versionSearchString);return c===-1?void 0:parseFloat(b.substring(c+this.versionSearchString.length+1))};a.dataBrowser=[{string:navigator.userAgent,subString:"Chrome",identify:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",
versionSearch:"OmniWeb/",identify:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identify:"Safari",versionSearch:"Version"},{prop:window.opera,identify:"Opera",versionSearch:"Version"},{string:navigator.vendor,subString:"iCab",identify:"iCab"},{string:navigator.vendor,subString:"KDE",identify:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identify:"Firefox"},{string:navigator.vendor,subString:"Camino",identify:"Camino"},{string:navigator.userAgent,subString:"Netscape",identify:"Netscape"},
{string:navigator.userAgent,subString:"MSIE",identify:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identify:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identify:"Netscape",versionSearch:"Mozilla"}];a.dataOS=[{string:navigator.platform,subString:"Win",identify:"Windows"},{string:navigator.platform,subString:"Mac",identify:"Mac"},{string:navigator.userAgent,subString:"iPhone",identify:"iPhone/iPad"},{string:navigator.platform,subString:"Linux",
identify:"Linux"}];return a}();if(typeof exports!=="undefined"&&exports!==null)exports.Detector=o;k=function(a,b){var c,d;for(d in b)c=b[d],a.prototype[d]=c;return a};if(typeof exports!=="undefined"&&exports!==null)exports.partial=k;i=function(){function a(){}a.findChildPosition=function(b){var c;for(c=0;b.previousSibling;)b=b.previousSibling,c+=1;return c};a.isDataNode=function(b){return b!=null&&b.nodeValue!=null&&b.data!=null};a.isDataContainerNode=function(b){var c,d,e;if(b.firstChild==null)return!1;
e=b.childNodes;for(c=0,d=e.length;c<d;c++)if(b=e[c],!a.isDataNode(b))return!1;return!0};a.isAncestorOf=function(b,c){var d,e,f;d=!a.isDataNode(b);e=typeof b.contains==="function"?b.contains(a.isDataNode(c)?c.parentNode:c):void 0;f=c.parentNode===b;return d&&(e||f)};a.isAncestorOrSelf=function(b,c){return a.isAncestorOf(b,c)||b===c};a.findClosestAncestor=function(b,c){if(a.isAncestorOf(b,c))for(;(c!=null?c.parentNode:void 0)!==b;)c=c.parentNode;return c};a.getNodeLength=function(b){if(a.isDataNode(b))return b.length||
b.childNodes.length};a.splitDataNode=function(b,c){var d;if(!a.isDataNode(b))return!1;d=b.cloneNode(!1);b.deleteData(c,b.length);d.deleteData(0,c);return b.parentNode.insertBefore(d,b.nextSibling)};return a}();q=function(){function a(){}a.convertToW3CRange=function(b,c){var a,e,f,g;a=function(b,a,d){var e,f,g,i,h;g=c.createElement("span");f=a.duplicate();f.collapse(d);i=f.parentElement();e=function(b,a){return b.compareEndPoints(d?"StartToStart":"StartToEnd",a)};h=function(){i.insertBefore(g,g.previousSibling);
return f.moveToElementText(g)};for(h();e(f,a)>0&&g.previousSibling;)h();if(e(f,a)===-1&&g.nextSibling)f.setEndPoint(d?"EndToStart":"EndToEnd",a),b[d?"setStart":"setEnd"](g.nextSibling,f.text.length);else b[d?"setStartBefore":"setEndBefore"](g);return g.parentNode.removeChild(g)};g=new t(c);e=b.compareEndPoints("StartToEnd",b)!==0;f=b.parentElement().isContentEditable;if(e&&f)a(g,b,!0),a(g,b,!1),g.startContainer===g.endContainer&&g.endOffset===1&&i.isDataContainerNode(g.startContainer)&&(a=i.getNodeLength(g.endContainer.firstChild),
g.setEnd(g.endContainer,a));else if(f)f=b.duplicate(),e=f.parentElement(),a=c.createElement("span"),e.insertBefore(a,e.firstChild),f.moveToElementText(a),f.setEndPoint("EndToEnd",b),f=f.text.length,g.setStart(e,f),g.setEnd(e,f),e.removeChild(a);return g};a.convertFromW3CRange=function(b){var a,d;a=function(b,a,c){var d,w,n,h,u;n=a[c?"startContainer":"endContainer"];h=a[c?"startOffset":"endOffset"];u=0;d=i.isDataNode(n)?n:n.childNodes[h];w=d.parentNode;if(n.nodeType===3||n.nodeType===4)u=h;n=a._document.createElement("span");
w.insertBefore(n,d);a=a._document.body.createTextRange();a.moveToElementText(n);n.parentNode.removeChild(n);b.setEndPoint(c?"StartToStart":"EndToStart",a);return b[c?"moveStart":"moveEnd"]("character",u)};d=b._document.body.createTextRange();a(d,b,!0);a(d,b,!1);return d};return a}();p=function(){function a(b){var a;this.range=b;if(!this.range.collapsed)a=b.commonAncestorContainer,this._current=null,this._next=b.startContainer===a&&!i.isDataNode(b.startContainer)?b.startContainer.childNodes[b.startOffset]:
i.findClosestAncestor(a,b.startContainer),this._end=b.endContainer===a&&!i.isDataNode(b.endContainer)?b.endContainer.childNodes[b.endOffset]:i.findClosestAncestor(a,b.endContainer).nextSibling}a.prototype.hasNext=function(){return this._next!=null};a.prototype.next=function(){var b;b=this._current=this._next;this._next=this._current!=null&&this._current.nextSibling!==this._end?this._current.nextSibling:null;i.isDataNode(this._current)&&(this.range.endContainer===this._current&&(b=b.cloneNode(!0),
b.deleteData(this.range.endOffset,b.length-this.range.endOffset)),this.range.startContainer===this._current&&(b=b.cloneNode(!0),b.deleteData(0,this.range.startOffset)));return b};a.prototype.remove=function(){var b,a;return i.isDataNode(this._current&&(this.range.startContainer===this._current||this.range.endContainer===this._current))?(a=this.range.startContainer===this._current?this.range.startOffset:0,b=this.range.endContainer===this._current?this.range.endOffset:this._current.length,this._current.deleteData(a,
b-a)):this._current.parentNode.removeChild(this._current)};a.prototype.hasPartialSubtree=function(){var b,a,d;b=!i.isDataNode(this._current);a=i.isAncestorOrSelf(this._current,this.range.startContainer);d=i.isAncestorOrSelf(this._current,this.range.endContainer);return b&&(a||d)};a.prototype.getSubtreeIterator=function(){var b;b=new t(this.range._document);b.selectNodeContents(this._current);i.isAncestorOrSelf(this._current,this.range.startContainer)&&b.setStart(this.range.startContainer,this.range.startOffset);
i.isAncestorOrSelf(this._current,this.range.endContainer)&&b.setEnd(this.range.endContainer,this.range.endOffset);return new a(b)};return a}();t=function(){function a(b){this._document=b;this.startContainer=b.body;this.startOffset=0;this.endContainer=b.body;this.endOffset=i.getNodeLength(b.body);this.commonAncestorContainer=null;this.collapsed=!1}a.START_TO_START=0;a.START_TO_END=1;a.END_TO_END=2;a.END_TO_START=3;a.prototype._refreshProperties=function(){var b;this.collapsed=this.startContainer===
this.endContainer&&this.startOffset===this.endOffset;for(b=this.startContainer;b!=null&&b!==this.endContainer&&!i.isAncestorOf(b,this.endContainer);)b=b.parentNode;return this.commonAncestorContainer=b};a.prototype.setStart=function(b,a){this.startContainer=b;this.startOffset=a;return this._refreshProperties()};a.prototype.setEnd=function(b,a){this.endContainer=b;this.endOffset=a;return this._refreshProperties()};a.prototype.setStartBefore=function(b){var a;a=b.parentNode;b=i.findChildPosition(b);
return this.setStart(a,b)};a.prototype.setStartAfter=function(b){var a;a=b.parentNode;b=i.findChildPosition(b);return this.setStart(a,b+1)};a.prototype.setEndBefore=function(b){var a;a=b.parentNode;b=i.findChildPosition(b);return this.setEnd(a,b)};a.prototype.setEndAfter=function(b){var a;a=b.parentNode;b=i.findChildPosition(b);return this.setEnd(a,b+1)};a.prototype.selectNode=function(b){this.setStartBefore(b);return this.setEndAfter(b)};a.prototype.selectNodeContents=function(b){this.setStart(b,
0);return this.setEnd(b,i.getNodeLength(b))};a.prototype.collapse=function(b){return b?this.setEnd(this.startContainer,this.startOffset):this.setStart(this.endContainer,this.endOffset)};a.prototype.cloneContents=function(){var b;b=function(a){var d,e;for(d=document.createDocumentFragment();(e=a.next())!=null;)e=e.cloneNode(!a.hasPartialSubtree()),a.hasPartialSubtree()&&e.appendChild(b(a.getSubtreeIterator())),d.appendChild(e);return flag};return b(new p(this))};a.prototype.extractContents=function(){var b,
a;a=this.cloneRange();this.startContainer!==this.commonAncestorContainer&&this.setStartAfter(i.findClosestAncestor(this.commonAncestorContainer,this.startContainer));this.collapse(!0);b=function(a){var c,f;for(c=document.createDocumentFragment();(f=a.next())!=null;)a.hasPartialSubtree(),a.hasPartialSubtree()?f=f.cloneNode(!1):a.remove(),a.hasPartialSubtree()&&f.appendChild(b(a.getSubtreeIterator())),c.appendChild(f);return c};return b(new p(a))};a.prototype.deleteContents=function(){var b,a;a=this.cloneRange();
this.startContainer!==this.commonAncestorContainer&&this.setStartAfter(i.findClosestAncestor(this.commonAncestorContainer,this.startContainer));this.collapse(!0);return b=function(d){for(;d.next();)d.hasPartialSubtree()?b(d.getSubtreeIterator()):d.remove();return b(new p(a))}};a.prototype.insertNode=function(b){i.isDataNode(this.startContainer)?(i.splitDataNode(this.startContainer,this.startOffset),this.startContainer.parentNode.insertBefore(b,this.startContainer.nextSibling)):this.startContainer.insertBefore(b,
this.startContainer.childNodes[this.startOffset]);return this.setStart(this.startContainer,this.startOffset)};a.prototype.surroundContents=function(b){var a;a=this.extractContents();this.insertNode(b);b.appendChild(a);return this.selectNode(b)};a.prototype.compareBoundaryPoints=function(b,c){var d,e,f,g;switch(b){case a.START_TO_START:case a.START_TO_END:d=this.startContainer;f=this.startOffset;break;case a.END_TO_END:case a.END_TO_START:d=this.endContainer,f=this.endOffset}switch(b){case a.START_TO_START:case a.END_TO_START:e=
c.startContainer;g=c.startOffset;break;case a.START_TO_END:case a.END_TO_END:e=c.endContainer,g=c.endOffset}if(d.sourceIndex<e.souceIndex)return-1;if(d.sourceIndex===e.sourceIndex){if(f<g)return-1;if(f===g)return 0}return 1};a.prototype.cloneRange=function(){var b;b=new a(this.document);b.setStart(this.startContainer,this.startOffset);b.setEnd(this.endContainer,this.endOffset);return b};a.prototype.detach=function(){};a.prototype.toString=function(){return q.convertFromW3CRange(this).text};a.prototype.createContextualFragment=
function(b){var a;a=i.isDataNode(this.startContainer)?this.startContainer.parentNode:this.startContainer;a=a.cloneNode(!1);a.innerHTML=b;for(b=this._document.createDocumentFragment();a.firstChild!=null;)b.appendChild(a.firstChild);return b};return a}();v=function(){function a(b){this.rangeCount=0;this._document=b;this._document.parentWindow.focus();this._document.attachEvent("onselectionchange",m(function(){return this._selectionChangeHolder()},this));this._refreshProperties()}a.prototype._selectionChangeHolder=
function(){var b,a;a=this._document.selection.createRange();b=a.compareEndPoints("StartToEnd",a)!==0;a=a.parentElement().isContentEditable;return b&&a?this.rangeCount=1:this.rangeCount=0};a.prototype._refreshProperties=function(){var b;b=this.getRangeAt(0);return this.isCollapsed=b==null||b.collapsed?!0:!1};a.prototype.addRange=function(b){var a;a=this._document.selection.createRange();b=q.convertFromW3CRange(b);return this._selectionExists(a)?(b.compareEndPoints("StartToStart",a)===-1?b.compareEndPoints("StartToEnd",
a)>-1&&b.compareEndPoints("EndToEnd",a)===-1&&a.setEndPoint("StartToStart",b):b.compareEndPoints("EndToStart",a)<1&&b.compareEndPoints("EndToEnd",a)>-1&&a.sendEndPoint("EndToEnd",b),a.select()):b.select()};a.prototype.removeAllRanges=function(){return this._document.selection.empty()};a.prototype.getRangeAt=function(){var b;try{return b=this._document.selection.createRange(),q.convertToW3CRange(b,this._document)}catch(a){return null}};a.prototype.toString=function(){return this._document.selection.createRange().text};
return a}();String.prototype.startsWith=function(a){return this.lastIndexOf(a,0)===0};String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")};l=function(){function a(){}a.prototype.CONTAINER_ELEMENTS="body,div,center,blockquote,li,td".split(",");a.prototype.BLOCK_ELEMENTS="address,dir,dl,form,h1,h2,h3,h4,h5,h6,hr,menu,noframes,ol,p,pre,table,ul,xmp".split(",");a.prototype.createElementFromHTML=function(b){var a;a=document.createElement("div");a.innerHTML=b;return a.firstChild};a.prototype.getTextContent=
function(b,a){var d;a==null&&(a=!1);d=b.textContent||b.nodeValue;return a?d.trim():d};a.prototype.isContainerNode=function(b){var c;var a;return(c=(a=b.tagName)!=null?a.toLowerCase():void 0,b=c)&&r.call(this.CONTAINER_ELEMENTS,b)>=0};a.prototype.isBlockNode=function(b){var c;var a;return(c=(a=b.tagName)!=null?a.toLowerCase():void 0,b=c)&&r.call(this.BLOCK_ELEMENTS,b)>=0};a.prototype.isInlineNode=function(b){return!this.isContainerNode(b&&!this.isBlockNode(b))};a.prototype.isVisibleNode=function(b){var a,
d,e;if(b.nodeType===3)return b=this.getTextContent(b),b=b.replace(/\s\t\r\n/,""),b.length!==0;else{e=b.childNodes;for(a=0,d=e.length;a<d;a++)if(b=e[a],this.isVisibleNode(b)===!1)return!1;return!0}};a.prototype.isIsolateNode=function(a){return!a.nextSibling&&!a.previousSibling};a.prototype.getNextNode=function(a){for(;!a.nextSibling;)if(a=a.parentNode,!a)return null;return a.nextSibling};a.prototype.getNextLeaf=function(a){for(a=this.getNextNode(a);(a!=null?a.firstChild:void 0)!=null;)a=a.firstChild;
return a};a.prototype.getPreviousNode=function(a){for(;!a.previousSibling;)if(a=a.parentNode,!a)return null;return a.previousSibling};a.prototype.getPreviousLeaf=function(a){for(a=this.getPreviousNode(a);(a!=null?a.lastChild:void 0)!=null;)a=a.lastChild;return a};a.prototype.extractLeaf=function(a,c,d){var e,f,g,j;c==null&&(c=void 0);d==null&&(d=void 0);f=this.getTextContent(a,!1);c==null&&(c=0);if(d==null)d=f.length;if(c===d||c===0&&d===f.length)return a;e=f.substring(0,c);c=f.substring(c,d);g=f.substring(d,
f.length);d=a.nextSibling;f=a.parentNode;f.removeChild(a);e.length>0&&(a=document.createTextNode(e.trim()),this.isVisibleNode(a)&&f.insertBefore(a,d));c.length>0&&(j=document.createTextNode(c.trim()),f.insertBefore(j,d));g.length>0&&(a=document.createTextNode(g.trim()),this.isVisibleNode(a)&&f.insertBefore(a,d));return j};return a}();if(typeof exports!=="undefined"&&exports!==null)exports.NodeUtils=l;if(typeof require!=="undefined"&&require!==null)k=require("./partial").partial,l=require("./nodeutils.core").NodeUtils;
l=k(l,{_unwrapNode:function(a){var b,c,d,e;d=a.parentNode;c=d.nextSibling;b=d.parentNode;b.removeChild(d);for(e=[];d.firstChild!=null;)a=d.firstChild,e.push(b.insertBefore(a,c));return e},unwrapNode:function(a,b,c){var d,e,f;for(c==null&&(c=!1);a.parentNode!=null&&(c||this.isIsolateNode(a));){d=a.parentNode;if(e=(f=d.tagName)!=null?f.toLowerCase():void 0,r.call(b,e)>=0)return this._unwrapNode(a),!0;a=d}return!1},convertNode:function(a,b,c,d){var e,f,g,j;d==null&&(d=!1);for(g=function(a,b){var c,d;
c=a.nextSibling;d=a.parentNode;for(d.removeChild(a);a.firstChild!=null;)b.appendChild(a.firstChild);return d.insertBefore(b,c)};a.parentNode!=null&&(d||this.isIsolateNode(a));){e=a.parentNode;f=(j=e.tagName)!=null?j.toLowerCase():void 0;if(r.call(b,f)>=0)return f===c.tagName.toLowerCase()?this._unwrapNode(a):g(e,c),!0;a=e}return!1},wrapLeaf:function(a,b,c){var d,e,f;c==null&&(c=!0);if(!this.isVisibleNode(a))return!1;e=function(a,b){var c,d;c=a.nextSibling;d=a.parentNode;d.removeChild(a);b.appendChild(a);
return d.insertBefore(b,c)};f=function(a,b){var c,d,e,f,h;f=a.parentNode;h=null;if(a.previousSibling!=null){h=f.cloneNode(!1);for(c=a;c.previousSibling!=null;)c=c.previousSibling,h.insertBefore(c,h.firstChild)}e=null;if(a.nextSibling!=null){e=f.cloneNode(!1);for(c=a;c.nextSibling!=null;)c=c.nextSibling,e.insertBefore(c,null)}d=f.nextSibling;c=f.parentNode;c.removeChild(f);h!=null&&c.insertBefore(h,d);b.appendChild(a);c.insertBefore(b,d);if(e!=null)return c.insertBefore(e,d)};if(this.isContainerNode(b)){if(c||
!this.unwrapNode(a,[b.tagName.toLowerCase()],!0)){for(c=a;c.parentNode!=null;){d=c.parentNode;if(this.isContainerNode(d))return e(c,b),!0;c=d}e(a,b)}}else if(this.isBlockNode(b)){if(c||!this.convertNode(a,this.BLOCK_ELEMENTS,b,!0)){for(c=a;c.parentNode!=null;){d=c.parentNode;if(this.isContainerNode(d)&&this.isBlockNode(d))return f(c,b),!0;c=d}for(c=a;c.parentNode!=null;){d=c.parentNode;if(this.isContainerNode(d))return e(c,b),!0;c=d}e(a,b)}}else(c||!this.unwrapNode(a,[b.tagName.toLowerCase()],!0))&&
e(a,b);return!0},wrapNode:function(a,b,c,d,e){var f,g,j,h;c==null&&(c=!1);d==null&&(d=void 0);e==null&&(e=void 0);if(a.firstChild==null)return a=this.extractLeaf(a,d,e),this.wrapLeaf(a,b,c);d==null&&(d=0);if(e==null)e=a.childNodes.length;j=a.childNodes;h=[];for(f=0,g=j.length;f<g;f++)a=j[f],h.push(a!=null?this.wrapNode(a,b,c,d,e):void 0);return h},wrapRange:function(a,b,c){var d,e,f,g,j,h;c==null&&(c=!1);if(a.startContainer===a.endContainer)return this.wrapNode(a.startContainer,b,c,a.startOffset,
a.endOffset);if(!c&&(e=!1,this.isContainerNode(b)?e=this.convertNode(a.commonAncestorContainer,[(j=b.tagName)!=null?j.toLowerCase():void 0],b,!0):this.isBlockNode(b)&&(e=this.convertNode(a.commonAncestorContainer,this.BLOCK_ELEMENTS,b,!0)),e===!0))return!0;if(this.isContainerNode(b))b.appendChild(a.extractContents()),a.insertNode(b);else{if(this.isBlockNode(b)){if(!function(a,b){var c;for(c=a;c!=null||c===b;){if(this.isBlockNode(c))return!0;c=this.getNextNode(c)}return!1}(a.startContainer,a.endContainer)){b.appendChild(a.extractContents());
a.insertNode(b);return}g=!0}else g=!1;e=function(a){return g?this.getNextNode(a):this.getNextLeaf(a)};d=function(a){return g?this.getPreviousNode(a):this.getPreviousLeaf(a)};a.startContainer.firstChild!=null?j=a.startContainer.childNodes[a.startOffset]:(j=e(a.startContainer),this.wrapNode(a.startContainer,b,c,a.startOffset,void 0));a.endContainer.firstChild!=null?d=a.endOffset>0?a.endContainer.childNodes[a.endOffset-1]:d(a.endContainer):(d=d(a.endContainer),this.wrapNode(a.endContainer,b,c,void 0,
a.endOffset));for(h=[];j!=null&&j!==a.endContainer;){f=e(j);j.parentNode!=null&&this.wrapNode(j,b,c);if(j===d)break;h.push(j=f)}return h}},unwrapRange:function(a,b,c){c==null&&(c=!1);return this.unwrapNode(a.commonAncestorContainer,b,c)},convertRange:function(a,b,c,d){d==null&&(d=!1);return this.convertNode(a.commonAncestorContainer,b,c,d)}});if(typeof exports!=="undefined"&&exports!==null)exports.NodeUtils=l;if(typeof require!=="undefined"&&require!==null)k=require("./partial").partial,l=require("./nodeutils.wrap").NodeUtils;
l=k(l,{unstyleLeaf:function(a,b,c){var d,e,f;c==null&&(c=!1);for(d=c?"div":"span";a.parentNode!=null&&a.parentNode.tagName!=null;){c=a.parentNode;e=c.tagName.toLowerCase();if(e===d){for(e=0,f=b.length;e<f;e++)d=b[e],c.style[d]="";c.getAttribute("style")===""&&this._unwrapNode(a);return!0}a=c}return!1},styleLeaf:function(a,b,c,d){var e,f,g,j,h,i,k,l,m;c==null&&(c=!1);d==null&&(d=!1);m=c?"div":"span";l=document.createElement(m);for(g in b)k=b[g],l.style[g]=k;i=function(){var a;a=[];for(g in b)k=b[g],
a.push(g);return a}();f=function(a){var b,c,d;for(c=0,d=i.length;c<d;c++)if(b=i[c],a.style[b]!==l.style[b])return!1;return!0};for(e=a;e.parentNode!=null&&e.parentNode.tagName!=null;){j=e.parentNode;h=j.tagName.toLowerCase();if(h===m){if(!d&&f(j))this.unstyleLeaf(e,i,c);else for(g in b)k=b[g],j.style[g]=k;return!0}e=j}this.wrapLeaf(a,l);return!0},styleNode:function(a,b,c,d,e,f){var g,h,i,k;c==null&&(c=!1);d==null&&(d=!1);e==null&&(e=void 0);f==null&&(f=void 0);if(a.firstChild==null)return a=this.extractLeaf(a,
e,f),this.styleLeaf(a,b,c,d);e==null&&(e=0);if(f==null)f=a.childNodes.length;i=a.childNodes;k=[];for(g=0,h=i.length;g<h;g++)a=i[g],k.push(a!=null?this.styleNode(a,b,c,d,e,f):void 0);return k},styleRange:function(a,b,c,d){var e,f,g,h,i;c==null&&(c=!1);d==null&&(d=!1);if(a.startContainer===a.endContainer)return this.styleNode(a.startContainer,b,c,d,a.startOffset,a.endOffset);f=function(a){return this.getNextLeaf(a)};e=function(a){return this.getPreviousLeaf(a)};a.startContainer.firstChild!=null?h=a.startContainer.childNodes[a.startOffset]:
(h=f(a.startContainer),this.styleNode(a.startContainer,b,c,d,a.startOffset,void 0));a.endContainer.firstChild!=null?e=a.endOffset>0?a.endContainer.childNodes[a.endOffset-1]:e(a.endContainer):(e=e(a.endContainer),this.styleNode(a.endContainer,b,c,d,void 0,a.endOffset));for(i=[];h!=null&&h!==a.endContainer;){g=f(h);h.parentNode!=null&&this.styleNode(h,b,c,d);if(h===e)break;i.push(h=g)}return i},unstyleRange:function(a,b,c,d){c==null&&(c=!1);d==null&&(d=!1);return this.unstyleLeaf(a.commonAncestorContainer,
b,c,d)}});if(typeof exports!=="undefined"&&exports!==null)exports.NodeUtils=l;h=function(){function a(a){this.raw=a;this.utils=new l}a.prototype.execCommand=function(a,c,d){var e,f,g;d==null&&(d=!1);e=m(function(){if(this.raw.window.getSelection!=null)return this.raw.window.getSelection();else if(this.raw.document.selection!=null)return new v(this.raw.document)},this)();if(e==null)return((f=window.console)!=null?f.error:void 0)!=null&&console.error("This browser does not support W3C type of range or Microsoft type of range."),
!1;e=e.getRangeAt(0);switch(a){case "wrap":this.utils.wrapRange(e,this.utils.createElementFromHTML(c),d);break;case "unwrap":this.utils.unwrapRange(e,c,d);break;case "style":this.utils.styleRange(e,c,d);break;case "unstyle":this.utils.unstyleRange(e,c,d);break;default:return((g=window.console)!=null?g.error:void 0)!=null&&console.error("Unknown command type has passed. type: "+a),!1}return!0};return a}();if(typeof exports!=="undefined"&&exports!==null)exports.API=h;if(typeof require!=="undefined"&&
require!==null)k=require("../utils/partial").partial,h=require("./api.core").API;h=k(h,{strong:function(){return this.execCommand("wrap","<strong>")},em:function(){return this.execCommand("wrap","<em>")},ins:function(){return this.execCommand("wrap","<ins>")},del:function(){return this.execCommand("wrap","<del>")},sub:function(){return this.execCommand("wrap","<sub>")},sup:function(){return this.execCommand("wrap","<sup>")}});if(typeof exports!=="undefined"&&exports!==null)exports.API=h;if(typeof require!==
"undefined"&&require!==null)k=require("../utils/partial").partial,h=require("./api.core").API;h=k(h,{blockquote:function(){return this.execCommand("wrap","<blockquote>",!0)},unblockquote:function(){return this.execCommand("unwrap",["blockquote"],!0)},heading:function(a){return this.execCommand("wrap","<h"+a+">")},h1:function(){return this.heading(1)},h2:function(){return this.heading(2)},h3:function(){return this.heading(3)},h4:function(){return this.heading(4)},h5:function(){return this.heading(5)},
h6:function(){return this.heading(6)},p:function(){return this.execCommand("wrap","<p>")},pre:function(){return this.execCommand("wrap","<pre>")}});if(typeof exports!=="undefined"&&exports!==null)exports.API=h;if(typeof require!=="undefined"&&require!==null)k=require("../utils/partial").partial,h=require("./api.core").API;h=k(h,{a:function(a){return this.execCommand("wrap","<a href='"+a+"'>")},img:function(a){return this.execCommand("wrap","<img src='"+a+"'>")},ul:function(){return this.raw.execCommand("insertUnorderedList")},
ol:function(){return this.raw.execCommand("insertOrderedList")},hr:function(){return this.raw.execCommand("insertHorizontalRule")}});if(typeof exports!=="undefined"&&exports!==null)exports.API=h;if(typeof require!=="undefined"&&require!==null)k=require("../utils/partial").partial,h=require("./commandapi.core").API;h=k(h,{forecolor:function(a){return this.execCommand("style",{color:a})},backcolor:function(a){return this.execCommand("style",{backgroundColor:a})},fontfamily:function(a){return this.execCommand("style",
{fontFamily:a})},fontsize:function(a){return this.execCommand("style",{fontSize:a})},justifyleft:function(){return this.execCommand("style",{textAlign:"left"},!0)},justifycenter:function(){return this.execCommand("style",{textAlign:"center"},!0)},justifyright:function(){return this.execCommand("style",{textAlign:"right"},!0)},justifyfull:function(){return this.execCommand("style",{textAlign:"justify"},!0)}});if(typeof exports!=="undefined"&&exports!==null)exports.API=h;if(typeof require!=="undefined"&&
require!==null)k=require("../utils/partial").partial,h=require("./api.core").API;h=k(h,{indent:function(){return this.raw.execCommand("indent")},outdent:function(){return this.raw.execCommand("outdent")}});if(typeof exports!=="undefined"&&exports!==null)exports.API=h;if(typeof require!=="undefined"&&require!==null)o=require("./utils/detector").Detector;s=function(){function a(a){var c,d;this.iframe=a;c=new o;this._loaded=!1;this._callbacks=[];this.ready(m(function(){var a,b;this.document=this.iframe.contentDocument!=
null?this.iframe.contentDocument:this.iframe.contentWindow.document;this.document.body==null&&this.document.writeln("<body></body>");this.body=this.document.body;this.body.style.cursor="text";this.body.style.height="100%";c.browser==="Explorer"&&c.version<9&&(a=m(function(){return this.body.style.height=""+this.iframe.offsetHeight+"px"},this),setTimeout(m(function(){var b,c;((b=this.iframe)!=null?b.offsetHeight:void 0)!==((c=this.body)!=null?c.offsetHeight:void 0)&&a();return setTimeout(arguments.callee,
100)},this),100));if(this.body.spellcheck!=null)this.body.spellcheck=!1;this.body.contentEditable!=null?this.body.contentEditable=!0:this.document.designMode!=null?this.document.designMode="On":((b=window.console)!=null?b.error:void 0)!=null&&console.error("This browser doesn't support contentEditable nor designMode");return this.window=this.iframe.contentWindow},this));d=m(function(){var a,b,c,d;this._loaded=!0;d=this._callbacks;for(b=0,c=d.length;b<c;b++)a=d[b],a();return this._callbacks=void 0},
this);this.iframe.getAttribute("src")!=null?c.browser==="Explorer"&&c.version<9?this.iframe.attachEvent("onreadystatechange",m(function(){if(this.iframe.readyState==="complete")return this.iframe.onreadystatechange=null,d()},this)):this.iframe.addEventListener("load",m(function(){return d()},this),!1):d()}a.prototype.ready=function(a){a==null&&(a=void 0);return a==null?this._loaded:this._loaded?a():this._callbacks.push(a)};a.prototype.getValue=function(){if(this.ready())return this.body.innerHTML};
a.prototype.setValue=function(a){if(this.ready())return this.body.innerHTML=a};a.prototype.execCommand=function(a,c,d){c==null&&(c=!1);d==null&&(d=null);return this.document.execCommand(a,c,d)};a.prototype.queryCommandState=function(a){return this.document.queryCommandState(a)};a.prototype.queryCommandEnabled=function(a){return this.document.queryCommandEnabled(a)};a.prototype.queryCommandIndeterm=function(a){return this.document.queryCommandIndeterm(a)};a.prototype.queryCommandSupported=function(a){return this.document.queryCommandSupported(a)};
a.prototype.queryCommandValue=function(a){return this.document.queryCommandValue(a)};return a}();if(typeof exports!=="undefined"&&exports!==null)exports.Rawarea=s;this.Richarea=function(){function a(a){this.iframe=a;if(window.jQuery!=null&&this.iframe instanceof jQuery)this.iframe=this.iframe.get(0);this.raw=new s(this.iframe);this.raw.ready(m(function(){var a;if(this.iframe.innerHTML!=null)return a=this.iframe.innerHTML,a=a.split("&lt;").join("<"),a=a.split("&gt;").join(">"),this.setValue(a)},this));
this.api=new h(this.raw)}a.prototype.ready=function(a){a==null&&(a=void 0);return this.raw.ready(a)};a.prototype.getValue=function(){return this.raw.getValue()};a.prototype.setValue=function(a){return this.raw.setValue(a)};a.prototype.execCommand=function(a,c){var d;c==null&&(c=void 0);if(a in this.api)return this.api[a](c);else if(((d=window.console)!=null?d.error:void 0)!=null)return console.error("Command '"+a+"' not found.")};return a}();if(typeof exports!=="undefined"&&exports!==null)exports.Richarea=
Richarea}).call(this);

/*
 *	Tabby jQuery plugin version 0.12
 *
 *	Ted Devito - http://teddevito.com/demos/textarea.html
 *
 *	Copyright (c) 2009 Ted Devito
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

/*!
 * Jencil - A JavaScript Cross-browser WYSIWYM and WYSIWYG editor v0.0.2
 * http://lambdalisue.github.com/Jencil
 * 
 * Copyright 2011 (c) hashnote.net, Alisue allright reserved.
 * Licensed under the MIT license.
 * 
 * Dependencies:
 * - jQuery v1.4.2
 *   http://jquery.com/
 * - Tabby jQuery plugin v0.12
 *   http://teddevito.com/demos/textarea.html
 * - Textarea v0.1.0 (included)
 *   http://demos.textarea.hashnote.net/
 * - Richarea v0.1.1 (included)
 *   http://demos.richarea.hashnote.net/
 * 
 * Includes Tabby jQuery plugin v0.12
 *   http://teddevito.com/demos/textarea.html
 *   Copyright (c) 2009 Ted Devito
 * 
 * Includes Textarea v0.1.0
 *   http://demos.textarea.hashnote.net/
 *   Copyright (c) 2011 hashnote.net, Alisue allright reserved
 * 
 * Includes Richarea v0.1.1 (included)
 *   http://demos.richarea.hashnote.net/
 *   Copyright (c) 2011 hashnote.net, Alisue allright reserved
 * 
 * Last-Modified: Thu, 06 Oct 2011 13:52:43 GMT
 */
(function() {
  /*
  Detect browser name, version and OS
  
  @ref: http://www.quirksmode.org/js/detect.html
  */
  var $, Detector;
  var __slice = Array.prototype.slice, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Detector = (function() {
    function Detector() {
      this.browser = this.searchString(Detector.dataBrowser) || "An unknown browser";
      this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "An unknown browser";
      this.OS = this.searchString(Detector.dataOS) || "An unknown OS";
    }
    Detector.prototype.searchString = function(data) {
      var row, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        row = data[_i];
        this.versionSearchString = row.versionSearch || row.identify;
        if (row.string != null) {
          if (row.string.indexOf(row.subString) !== -1) {
            return row.identify;
          } else if (row.prop) {
            return row.identify;
          }
        }
      }
      return _results;
    };
    Detector.prototype.searchVersion = function(dataString) {
      var index;
      index = dataString.indexOf(this.versionSearchString);
      if (index === -1) {
        return;
      }
      return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    };
    Detector.dataBrowser = [
      {
        string: navigator.userAgent,
        subString: 'Chrome',
        identify: 'Chrome'
      }, {
        string: navigator.userAgent,
        subString: 'OmniWeb',
        versionSearch: 'OmniWeb/',
        identify: 'OmniWeb'
      }, {
        string: navigator.vendor,
        subString: 'Apple',
        identify: 'Safari',
        versionSearch: 'Version'
      }, {
        prop: window.opera,
        identify: 'Opera',
        versionSearch: 'Version'
      }, {
        string: navigator.vendor,
        subString: 'iCab',
        identify: 'iCab'
      }, {
        string: navigator.vendor,
        subString: 'KDE',
        identify: 'Konqueror'
      }, {
        string: navigator.userAgent,
        subString: 'Firefox',
        identify: 'Firefox'
      }, {
        string: navigator.vendor,
        subString: 'Camino',
        identify: 'Camino'
      }, {
        string: navigator.userAgent,
        subString: 'Netscape',
        identify: 'Netscape'
      }, {
        string: navigator.userAgent,
        subString: 'MSIE',
        identify: 'Explorer',
        versionSearch: 'MSIE'
      }, {
        string: navigator.userAgent,
        subString: 'Gecko',
        identify: 'Mozilla',
        versionSearch: 'rv'
      }, {
        string: navigator.userAgent,
        subString: 'Mozilla',
        identify: 'Netscape',
        versionSearch: 'Mozilla'
      }
    ];
    Detector.dataOS = [
      {
        string: navigator.platform,
        subString: 'Win',
        identify: 'Windows'
      }, {
        string: navigator.platform,
        subString: 'Mac',
        identify: 'Mac'
      }, {
        string: navigator.userAgent,
        subString: 'iPhone',
        identify: 'iPhone/iPad'
      }, {
        string: navigator.platform,
        subString: 'Linux',
        identify: 'Linux'
      }
    ];
    return Detector;
  })();
  if (typeof exports !== "undefined" && exports !== null) {
    exports.Detector = Detector;
  }
  window.namespace = function(target, name, block) {
    var item, top, _i, _len, _ref, _ref2;
    if (arguments.length < 3) {
      _ref = [(typeof exports !== 'undefined' ? exports : window)].concat(__slice.call(arguments)), target = _ref[0], name = _ref[1], block = _ref[2];
    }
    top = target;
    _ref2 = name.split('.');
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      item = _ref2[_i];
      target = target[item] || (target[item] = {});
    }
    return block(target, top);
  };
  if (typeof exports !== "undefined" && exports !== null) {
    exports.namespace = namespace;
  }
  /*
  dynamicloader
  
  CoffeeScript dynamic javascript load utils.
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  */
  namespace(this, 'dynamicloader.script', function(exports) {
    var include, load;
    exports.include = include = function(url) {
      var script;
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      document.head = document.head || document.getElementsByTagName('head')[0];
      return document.head.appendChild(script);
    };
    exports.load = load = function(url, check, callback, timeout) {
      var _check;
      if (timeout == null) {
        timeout = 5000;
      }
      _check = new Function("return !!(" + check + ")");
      if (!_check()) {
        include(url);
        setTimeout(function() {
          return timeout = true;
        }, timeout);
        return setTimeout(function() {
          if (timeout !== true && !_check()) {
            return setTimeout(arguments.callee, 100);
          } else {
            return typeof callback === "function" ? callback() : void 0;
          }
        }, 100);
      } else {
        return typeof callback === "function" ? callback() : void 0;
      }
    };
    return exports.loadall = function(sets, callback, timeout) {
      var cursor, process;
      if (timeout == null) {
        timeout = 5000;
      }
      cursor = 0;
      process = function() {
        var check, url;
        url = sets[cursor][0];
        check = sets[cursor][1];
        cursor++;
        if (cursor > sets.length) {
          return typeof callback === "function" ? callback() : void 0;
        } else {
          return load(url, check, next);
        }
      };
      return next();
    };
  });
  namespace('dynamicloader.css', function(exports) {
    exports.include = function(url, media) {
      var link;
      if (media == null) {
        media = 'all';
      }
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.media = media;
      link.href = url;
      document.head = document.head || document.getElementsByTagName('head')[0];
      return document.head.appendChild(link);
    };
    return exports.remove = function(pattern) {
      return $('link').each(function(a, tag) {
        var match;
        match = tag.href.match(pattern);
        if (match != null) {
          return $(tag).remove();
        }
      });
    };
  });
  /*
  Jencil core
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  Dependencies:
  - Jencil.options (jencil.options.js)
  - Jencil.utils.path (jencil.utils.js)
  - Jencil.theme (jencil.theme.js)
  */
  if (!(String.prototype.startsWith != null)) {
    String.prototype.startsWith = function(str) {
      return this.lastIndexOf(str, 0) === 0;
    };
  }
  if (!(String.prototype.endsWith != null)) {
    String.prototype.endsWith = function(suffix) {
      var offset;
      offset = this.length - suffix.length;
      return offset >= 0 && this.lastIndexOf(suffix, offset) === offset;
    };
  }
  if (!(String.prototype.replaceAll != null)) {
    String.prototype.replaceAll = function(search, replace) {
      return this.split(search).join(replace);
    };
  }
  if (!(String.prototype.trim != null)) {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }
  $ = jQuery;
  $.fn.jencil = function(options) {
    options = $.extend(true, Jencil.options["default"], options);
    if (this.length > 1 && (options.documentTypeElement != null)) {
      logger.warn('documentTypeElement is not avaialble on multiple textarea');
      options.documentTypeElement = void 0;
    }
    Jencil.utils.path.init(options);
    Jencil.theme.init(options);
    if (!(Jencil.jencils != null)) {
      Jencil.jencils = [];
    }
    return this.each(function() {
      return Jencil.jencils.push(new Jencil.core.JencilCore($(this), options));
    });
  };
  namespace('Jencil.core', function(exports) {
    var JencilCore;
    return exports.JencilCore = JencilCore = (function() {
      function JencilCore($textarea, options) {
        this.$textarea = $textarea;
        this.options = options;
        this.profile = void 0;
        this.wrapper = new Jencil.widget.Wrapper(this);
        this.buttonHolder = new Jencil.widget.ButtonHolder(this);
        this.documentType = new Jencil.widget.DocumentType(this);
        this.toolbar = new Jencil.widget.Toolbar(this);
        this.toolbar.append(this.buttonHolder);
        this.toolbar.append(this.documentType);
        this.wrapper.append(this.toolbar);
        this.workspace = new Jencil.widget.Workspace(this);
        this.wrapper.append(this.workspace);
        this.$textarea.after(this.wrapper.$element);
        this.$textarea.hide();
        Jencil.profile.load(this, this.getProfileName());
      }
      JencilCore.prototype.update = function() {
        return this.workspace.use(this.profile.editor, __bind(function() {
          this.buttonHolder.update();
          return this.workspace.editor.update();
        }, this));
      };
      JencilCore.prototype.getProfileName = function() {
        return this.documentType.getProfileName();
      };
      JencilCore.prototype.getSourceValue = function() {
        return this.$textarea.val();
      };
      JencilCore.prototype.setSourceValue = function(value) {
        return this.$textarea.val(value);
      };
      return JencilCore;
    })();
  });
  /*
  Jencil utils
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  Required:
  - namespace (namespace.js)
  - Detector (detector.js)
  - dynamicloader (dynamicloader.js)
  */
  namespace('Jencil.utils', function(exports) {
    return exports.detector = new Detector;
  });
  namespace('Jencil.utils.path', function(exports) {
    var Path;
    exports.init = function(options) {
      var _ref, _ref2;
      return exports.path = new Path((_ref = (_ref2 = options.root) != null ? _ref2 : options.rootPattern) != null ? _ref : /(.*)jencil(\.min)?\.js/);
    };
    exports.abspath = function(path, root, prefix) {
      if (prefix == null) {
        prefix = '~/';
      }
      return exports.path.abspath(path, root, prefix);
    };
    return exports.Path = Path = (function() {
      function Path(pattern) {
        if (pattern instanceof RegExp) {
          $('script').each(__bind(function(a, tag) {
            var match;
            match = tag.src.match(pattern);
            if (match != null) {
              this.root = match[1];
              return this.root = this.root.slice(0, (this.root.length - 2 + 1) || 9e9);
            }
          }, this));
        } else {
          this.root = pattern;
        }
      }
      Path.prototype.abspath = function(path, root, prefix) {
        if (prefix == null) {
          prefix = '~/';
        }
        if (root == null) {
          root = this.root;
        }
        if (path != null ? path.startsWith(prefix) : void 0) {
          path = "" + root + "/" + path.slice(2, (path.length + 1) || 9e9);
        }
        return path;
      };
      return Path;
    })();
  });
  namespace('Jencil.utils.script', function(exports) {
    exports.load = function(url, check, callback) {
      return dynamicloader.script.load(Jencil.utils.path.abspath(url), check, callback);
    };
    return exports.loadall = function(sets, callback) {
      var cursor, process;
      cursor = 0;
      process = function() {
        var check, url;
        url = sets[cursor][0];
        check = sets[cursor][1];
        cursor++;
        if (cursor > sets.length) {
          return typeof callback === "function" ? callback() : void 0;
        } else {
          return Jencil.utils.module.load(url, check, next);
        }
      };
      return process();
    };
  });
  namespace('Jencil.utils.css', function(exports) {
    exports.include = function(url, media) {
      if (media == null) {
        media = 'all';
      }
      return dynamicloader.css.include(url);
    };
    return exports.remove = function(pattern) {
      return dynamicloader.css.remove(pattern);
    };
  });
  namespace('Jencil.utils.string', function(exports) {
    var format;
    return exports.format = format = function(formatstr, kwargs) {
      var key, value;
      for (key in kwargs) {
        value = kwargs[key];
        formatstr = formatstr.replace("{{" + key + "}}", value);
      }
      return formatstr;
    };
  });
  /*
  Jencil options
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  */
  namespace('Jencil.options', function(exports) {
    return exports["default"] = {
      debug: true,
      root: null,
      rootPattern: null,
      theme: {
        root: '~/extras/themes',
        "default": 'default'
      },
      profile: {
        root: '~/extras/profiles',
        "default": 'default'
      }
    };
  });
  /*
  Jencil profile
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  Dependencies:
  - Jencil.utils.path (jencil.utils.js)
  - Jencil.utils.script (jencil.utils.js)
  */
  namespace('Jencil.profile', function(exports) {
    exports.abspath = function(path, jencil) {
      if (!path.endsWith('.js')) {
        path = "" + jencil.options.profile.root + "/" + path + ".js";
      }
      return Jencil.utils.path.abspath(path);
    };
    return exports.load = function(jencil, path) {
      var check, url;
      url = Jencil.profile.abspath(path, jencil);
      check = 'Jencil.profile.Profile';
      delete Jencil.profile.Profile;
      delete jencil.profile;
      return Jencil.utils.script.load(url, check, function() {
        jencil.profile = new Jencil.profile.Profile(jencil);
        return jencil.update();
      });
    };
  });
  /*
  Jencil theme
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  Dependencies:
  - Jencil.utils.path (jencil.utils.js)
  - Jencil.utils.css (jencil.utils.js)
  */
  namespace('Jencil.theme', function(exports) {
    var load;
    exports.root = void 0;
    exports.init = function(options) {
      exports.root = Jencil.utils.path.abspath(options.theme.root);
      return Jencil.theme.load(options.theme["default"]);
    };
    exports.load = load = function(name) {
      var editorClass, jencil, media, url, _i, _len, _ref, _ref2, _results;
      if (Jencil.theme.current != null) {
        Jencil.utils.css.remove(new RegExp("" + Jencil.theme.current + "/.*\.css"));
      }
      Jencil.theme.current = Jencil.utils.path.abspath("" + Jencil.theme.root + "/" + name);
      url = "" + Jencil.theme.current + "/style.css";
      media = 'screen, projection';
      Jencil.theme.include(url, media);
      if (Jencil.jencils != null) {
        _ref = Jencil.jencils;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          jencil = _ref[_i];
          editorClass = jencil.workspace.editor.constructor;
          _results.push(((_ref2 = editorClass.extras) != null ? _ref2.stylesheets : void 0) != null ? Jencil.theme.includeall(editorClass.extras.stylesheets) : void 0);
        }
        return _results;
      }
    };
    exports.abspath = function(path) {
      return Jencil.utils.path.abspath(path, Jencil.theme.current);
    };
    exports.include = function(url, media) {
      url = Jencil.theme.abspath(url);
      return Jencil.utils.css.include(url, media);
    };
    return exports.includeall = function(stylesheets) {
      var url, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = stylesheets.length; _i < _len; _i++) {
        url = stylesheets[_i];
        _results.push(Jencil.theme.include(url, 'screen, projection'));
      }
      return _results;
    };
  });
  /*
  Jencil widget
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  Dependencies:
  - Jencil.profile (jencil.profile.js)
  - Jencil.button (jencil.button.js)
  - Jencil.editor (jencil.editor.js)
  */
  namespace('Jencil.widget', function(exports) {
    var ButtonHolder, DocumentType, Toolbar, Widget, Workspace, Wrapper;
    exports.Widget = Widget = (function() {
      function Widget(jencil, cls, type) {
        this.jencil = jencil;
        this.cls = cls;
        if (type == null) {
          type = 'div';
        }
        this.$element = $("<" + type + ">").addClass(cls);
      }
      Widget.prototype.after = function(widget) {
        return this.$element.after(widget.$element);
      };
      Widget.prototype.append = function(widget) {
        return this.$element.append(widget.$element);
      };
      Widget.prototype.appendTo = function(widget) {
        return this.$element.appendTo(widget.$element);
      };
      Widget.prototype.before = function(widget) {
        return this.$element.before(widget.$element);
      };
      Widget.prototype.prepend = function(widget) {
        return this.$element.prepend(widget.$element);
      };
      Widget.prototype.prependTo = function(widget) {
        return this.$element.prependTo(widget.$element);
      };
      return Widget;
    })();
    exports.Wrapper = Wrapper = (function() {
      __extends(Wrapper, Widget);
      function Wrapper(jencil) {
        Wrapper.__super__.constructor.call(this, jencil, 'jencil');
      }
      return Wrapper;
    })();
    exports.DocumentType = DocumentType = (function() {
      __extends(DocumentType, Widget);
      function DocumentType(jencil) {
        DocumentType.__super__.constructor.call(this, jencil, 'jencil-document-type');
        this.$documentTypeElement = this.jencil.options.documentTypeElement;
        if (this.$documentTypeElement != null) {
          if (!(this.$documentTypeElement instanceof jQuery)) {
            this.$documentTypeElement = $(this.$documentTypeElement);
          }
          this.$element.append(this.$documentTypeElement);
          this.$documentTypeElement.change(__bind(function() {
            return Jencil.profile.load(this.jencil, this.getProfileName());
          }, this));
        }
      }
      DocumentType.prototype.getProfileName = function() {
        if (this.$documentTypeElement != null) {
          return this.$documentTypeElement.val();
        }
        return this.jencil.options.profile["default"];
      };
      return DocumentType;
    })();
    exports.ButtonHolder = ButtonHolder = (function() {
      __extends(ButtonHolder, Widget);
      function ButtonHolder(jencil) {
        ButtonHolder.__super__.constructor.call(this, jencil, 'jencil-button-holder');
      }
      ButtonHolder.prototype.update = function() {
        var args, button, buttonset, type, _i, _len, _ref, _results;
        this.$element.children().remove();
        _ref = this.jencil.profile.buttonsets;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          buttonset = _ref[_i];
          type = buttonset[0];
          args = buttonset.slice(1, (buttonset.length + 1) || 9e9);
          button = Jencil.button.createButton(this.jencil, type, args);
          _results.push(this.append(button));
        }
        return _results;
      };
      return ButtonHolder;
    })();
    exports.Toolbar = Toolbar = (function() {
      __extends(Toolbar, Widget);
      function Toolbar(jencil) {
        Toolbar.__super__.constructor.call(this, jencil, 'jencil-toolbar');
      }
      return Toolbar;
    })();
    return exports.Workspace = Workspace = (function() {
      __extends(Workspace, Widget);
      function Workspace(jencil) {
        Workspace.__super__.constructor.call(this, jencil, 'jencil-workspace');
        this.editor = null;
      }
      Workspace.prototype.use = function(name, callback) {
        return Jencil.editor.use(this.jencil, name, __bind(function() {
          return callback();
        }, this));
      };
      return Workspace;
    })();
  });
  /*
  Jencil button
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  Required:
  - Jencil.widget (jencil.widget.js)
  
  Dependencies:
  - Jencil.utils.detector (jencil.utils.js)
  */
  namespace('Jencil.button', function(exports) {
    var ButtonBase, ExecButton, MarkupButtonBase, PreviewButton, Separator, Widget;
    Widget = Jencil.widget.Widget;
    exports.createButton = function(jencil, type, args) {
      var cls;
      cls = void 0;
      switch (type) {
        case '-':
        case 'separator':
          cls = Jencil.button.Separator;
          break;
        case '+':
        case 'exec':
          cls = Jencil.button.ExecButton;
          break;
        case 'preview':
          cls = Jencil.button.PreviewButton;
          break;
        default:
          cls = Jencil.button[type];
          if (!(cls != null)) {
            throw new Error("Unknown button type is passed (type: " + type + ")");
          }
      }
      return new cls(jencil, args);
    };
    exports.ButtonBase = ButtonBase = (function() {
      __extends(ButtonBase, Widget);
      function ButtonBase(jencil, cls, name) {
        ButtonBase.__super__.constructor.call(this, jencil, 'button', 'a');
        this.$element.addClass(cls);
        this.$element.attr('title', name);
        this.$element.css('cursor', 'pointer');
        if (Jencil.utils.detector.browser === 'Explorer' && Jencil.utils.detector.version < 8) {
          this.$element.attr('href', 'javascript:void(0);');
        }
        this.$element.append($("<span>" + name + "</span>"));
        this.$element.click(__bind(function() {
          this.clickBefore();
          this.click();
          return this.clickAfter();
        }, this));
      }
      ButtonBase.prototype.editor = function() {
        return this.jencil.workspace.editor;
      };
      ButtonBase.prototype.clickBefore = function() {};
      ButtonBase.prototype.click = function() {};
      ButtonBase.prototype.clickAfter = function() {};
      return ButtonBase;
    })();
    exports.MarkupButtonBase = MarkupButtonBase = (function() {
      __extends(MarkupButtonBase, ButtonBase);
      function MarkupButtonBase() {
        MarkupButtonBase.__super__.constructor.apply(this, arguments);
      }
      MarkupButtonBase.prototype.clickAfter = function() {
        return this.editor().update();
      };
      return MarkupButtonBase;
    })();
    exports.Separator = Separator = (function() {
      __extends(Separator, Widget);
      function Separator(jencil, args) {
        Separator.__super__.constructor.call(this, jencil, 'separator', 'span');
        this.$element.append($('<span>|</span>'));
      }
      return Separator;
    })();
    exports.ExecButton = ExecButton = (function() {
      __extends(ExecButton, ButtonBase);
      function ExecButton(jencil, args) {
        var cls, name;
        cls = args[0], name = args[1], this._click = args[2], this._clickBefore = args[3], this._clickAfter = args[4];
        ExecButton.__super__.constructor.call(this, jencil, cls, name);
      }
      ExecButton.prototype.clickBefore = function() {
        return this._clickBefore(this.editor());
      };
      ExecButton.prototype.click = function() {
        return this._click(this.editor());
      };
      ExecButton.prototype.clickAfter = function() {
        return this._clickAfter(this.editor());
      };
      return ExecButton;
    })();
    return exports.PreviewButton = PreviewButton = (function() {
      __extends(PreviewButton, ButtonBase);
      function PreviewButton(jencil, args) {
        PreviewButton.__super__.constructor.call(this, jencil, 'preview', 'Preview');
      }
      PreviewButton.prototype.click = function() {
        var editor, _ref;
        editor = this.editor();
        if ((_ref = editor.preview) != null) {
          _ref.toggle();
        }
        return editor.relocate();
      };
      return PreviewButton;
    })();
  });
  /*
  Jencil editor
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  Required:
  - Jencil.widget (jencil.widget.js)
  
  Dependencies
  - Jencil.utils.script (jencil.utils.js)
  - Jencil.theme (jencil.theme.js)
  */
  namespace('Jencil.editor', function(exports) {
    var DualPaneEditorBase, EditorBase, SinglePaneEditorBase, Widget, getOffsetX, getOffsetY, use;
    Widget = Jencil.widget.Widget;
    getOffsetX = function($$) {
      return $$.outerWidth(true) - $$.width();
    };
    getOffsetY = function($$) {
      return $$.outerHeight(true) - $$.height();
    };
    exports.use = use = function(jencil, name, callback) {
      var check, prepare, process, url, _ref;
      if (callback == null) {
        callback = void 0;
      }
      prepare = function() {
        var extras, _ref;
        extras = Jencil.editor[name].extras;
        if ((extras != null ? extras.options : void 0) != null) {
          jencil.options.extras = $.extend(true, extras.options, (_ref = jencil.options.extras) != null ? _ref : {});
        }
        if ((extras != null ? extras.stylesheets : void 0) != null) {
          Jencil.theme.includeall(extras.stylesheets);
        }
        if ((extras != null ? extras.requires : void 0) != null) {
          return Jencil.utils.script.loadall(extras.requires, function() {
            return process();
          });
        } else {
          return process();
        }
      };
      process = function() {
        var editor, editorClass;
        editorClass = Jencil.editor[name];
        if (jencil.workspace.editor != null) {
          jencil.workspace.editor.$element.remove();
          jencil.workspace.editor = null;
        }
        editor = new editorClass(jencil);
        jencil.workspace.append(editor);
        jencil.workspace.editor = editor;
        editor.init();
        if (callback != null) {
          return callback();
        }
      };
      if (name instanceof Array) {
        _ref = name, name = _ref[0], url = _ref[1], check = _ref[2];
        return Jencil.utils.script.load(url, check, function() {
          return prepare();
        });
      } else {
        return prepare();
      }
    };
    exports.EditorBase = EditorBase = (function() {
      __extends(EditorBase, Widget);
      function EditorBase(jencil, cls) {
        EditorBase.__super__.constructor.call(this, jencil, cls);
        this.workspace = this.jencil.workspace;
        this.$element.addClass('jencil-editor');
        this.$element.hide();
      }
      EditorBase.prototype.init = function() {
        this.$element.show();
        return this.relocate();
      };
      EditorBase.prototype.update = function() {
        return this.relocate();
      };
      EditorBase.prototype.relocate = function() {
        var height, offsetX, offsetY, width;
        offsetX = getOffsetX(this.$element);
        offsetY = getOffsetY(this.$element);
        width = this.workspace.$element.width();
        height = this.workspace.$element.height();
        this.$element.width(width - offsetX);
        return this.$element.height(height - offsetY);
      };
      return EditorBase;
    })();
    exports.SinglePaneEditorBase = SinglePaneEditorBase = (function() {
      __extends(SinglePaneEditorBase, EditorBase);
      function SinglePaneEditorBase(jencil, cls, pane) {
        this.pane = pane;
        SinglePaneEditorBase.__super__.constructor.call(this, jencil, cls);
        this.pane.$element.appendTo(this.$element);
        this.pane.$element.addClass('jencil-pane');
        this.$element.addClass("jencil-siglepane-editor");
      }
      SinglePaneEditorBase.prototype.init = function() {
        this.pane.init();
        return SinglePaneEditorBase.__super__.init.call(this);
      };
      SinglePaneEditorBase.prototype.update = function() {
        this.pane.update();
        return SinglePaneEditorBase.__super__.update.call(this);
      };
      SinglePaneEditorBase.prototype.relocate = function() {
        var height, offsetX, offsetY, width;
        SinglePaneEditorBase.__super__.relocate.call(this);
        offsetX = getOffsetX(this.pane.$element);
        offsetY = getOffsetY(this.pane.$element);
        width = this.$element.width();
        height = this.$element.height();
        this.pane.$element.width(width - offsetX);
        return this.pane.$element.height(height - offsetY);
      };
      return SinglePaneEditorBase;
    })();
    return exports.DualPaneEditorBase = DualPaneEditorBase = (function() {
      __extends(DualPaneEditorBase, EditorBase);
      function DualPaneEditorBase(jencil, cls, lhspane, rhspane, panedir) {
        this.lhspane = lhspane;
        this.rhspane = rhspane;
        this.panedir = panedir != null ? panedir : 'horizontal';
        DualPaneEditorBase.__super__.constructor.call(this, jencil, cls);
        this.lhspane.$element.appendTo(this.$element);
        this.rhspane.$element.appendTo(this.$element);
        this.lhspane.$element.addClass('jencil-lhspane');
        this.rhspane.$element.addClass('jencil-rhspane');
        this.$element.addClass("jencil-panedir-" + this.panedir);
      }
      DualPaneEditorBase.prototype.init = function() {
        this.lhspane.init();
        this.rhspane.init();
        return DualPaneEditorBase.__super__.init.call(this);
      };
      DualPaneEditorBase.prototype.update = function() {
        this.lhspane.update();
        this.rhspane.update();
        return DualPaneEditorBase.__super__.update.call(this);
      };
      DualPaneEditorBase.prototype.relocate = function() {
        var height, lhsOffsetX, lhsOffsetY, rhsOffsetX, rhsOffsetY, width;
        DualPaneEditorBase.__super__.relocate.call(this);
        if (this.lhspane.isVisible() && this.rhspane.isVisible()) {
          this.$element.removeClass('jencil-singlepane-editor');
          this.$element.addClass("jencil-dualpane-editor");
        } else {
          this.$element.addClass('jencil-singlepane-editor');
          this.$element.removeClass("jencil-dualpane-editor");
        }
        lhsOffsetX = getOffsetX(this.lhspane.$element);
        rhsOffsetX = getOffsetX(this.rhspane.$element);
        lhsOffsetY = getOffsetY(this.lhspane.$element);
        rhsOffsetY = getOffsetY(this.rhspane.$element);
        width = this.$element.width();
        height = this.$element.height();
        if (this.lhspane.isVisible() && this.rhspane.isVisible()) {
          if (this.panedir === 'horizontal') {
            this.lhspane.$element.css({
              'float': 'left'
            });
            this.rhspane.$element.css({
              'float': 'right'
            });
            this.lhspane.$element.width(width / 2 - lhsOffsetX);
            this.rhspane.$element.width(width / 2 - rhsOffsetX);
            this.lhspane.$element.height(height - lhsOffsetY);
            this.rhspane.$element.height(height - rhsOffsetY);
          } else {
            this.lhspane.$element.css({
              'float': 'none'
            });
            this.rhspane.$element.css({
              'float': 'none'
            });
            this.lhspane.$element.width(width - lhsOffsetX);
            this.rhspane.$element.width(width - rhsOffsetX);
            this.lhspane.$element.height(height / 2 - lhsOffsetY);
            this.rhspane.$element.height(height / 2 - rhsOffsetY);
          }
        } else if (this.lhspane.isVisible()) {
          this.lhspane.$element.css({
            'float': 'none'
          });
          this.lhspane.$element.width(width - lhsOffsetX);
          this.lhspane.$element.height(height - lhsOffsetY);
        } else {
          this.rhspane.$element.css({
            'float': 'none'
          });
          this.rhspane.$element.width(width - rhsOffsetX);
          this.rhspane.$element.height(height - rhsOffsetY);
        }
        this.lhspane.relocate();
        return this.rhspane.relocate();
      };
      return DualPaneEditorBase;
    })();
  });
  /*
  Jencil editor pane
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  Required:
  - Jencil.widget (jencil.widget.js)
  - Jencil.editor (jencil.editor.js)
  
  Dependencies:
  - Jencil.utils.detector (jencil.utils.js)
  - Jencil.utils.path (jencil.utils.js)
  */
  namespace('Jencil.editor.pane', function(exports) {
    var EditorPane, PreviewPane, Widget;
    Widget = Jencil.widget.Widget;
    exports.EditorPane = EditorPane = (function() {
      __extends(EditorPane, Widget);
      function EditorPane(jencil, cls, editor) {
        this.editor = editor;
        EditorPane.__super__.constructor.call(this, jencil, cls);
        this._updateCallbacks = [];
      }
      EditorPane.prototype.init = function() {
        return this;
      };
      EditorPane.prototype.update = function(callback) {
        var _i, _len, _ref, _results;
        if (callback != null) {
          return this._updateCallbacks.push(callback);
        } else {
          _ref = this._updateCallbacks;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            callback = _ref[_i];
            _results.push(callback());
          }
          return _results;
        }
      };
      EditorPane.prototype.isVisible = function() {
        return this.$element.is(':visible');
      };
      EditorPane.prototype.show = function() {
        this.update();
        this.editor.$element.removeClass("" + this.cls + "-invisible");
        return this.$element.show();
      };
      EditorPane.prototype.hide = function() {
        this.editor.$element.addClass("" + this.cls + "-invisible");
        return this.$element.hide();
      };
      EditorPane.prototype.toggle = function() {
        if (this.isVisible()) {
          return this.hide();
        } else {
          return this.show();
        }
      };
      EditorPane.prototype.relocate = function() {};
      return EditorPane;
    })();
    return exports.PreviewPane = PreviewPane = (function() {
      __extends(PreviewPane, EditorPane);
      function PreviewPane(jencil, editor) {
        PreviewPane.__super__.constructor.call(this, jencil, 'jencil-preview-pane', editor);
        this.$element.css({
          position: 'relative'
        });
        this.$surface = $('<div>').addClass('surface');
        this.$surface.appendTo(this.$element);
        this.$surface.css({
          width: '100%',
          height: '100%',
          border: '',
          margin: 0,
          padding: 0,
          overflow: 'auto'
        });
      }
      PreviewPane.prototype._writeContent = function(content) {
        var process, templatePath;
        process = __bind(function(template) {
          return this.$surface.html(template.replace('{{content}}', content));
        }, this);
        if (!(this._previewTemplate != null)) {
          templatePath = Jencil.utils.path.abspath(this.jencil.options.extras.previewTemplatePath);
          return this.$surface.load(templatePath, __bind(function(response, status, xhr) {
            this._previewTemplate = response;
            return process(response);
          }, this));
        } else {
          return process(this._previewTemplate);
        }
      };
      PreviewPane.prototype.update = function() {
        var process, process2;
        process = __bind(function(content) {
          this._writeContent(content);
          return process.__super__.constructor.call(this);
        }, this);
        process.__super__ = PreviewPane.__super__.update.apply(this, arguments);
        process2 = __bind(function() {
          var content, _ref;
          content = this.editor.getValue();
          if (((_ref = this.jencil.profile.extras) != null ? _ref.previewParserPath : void 0) != null) {
            content = encodeURIComponent(content);
            return $.ajax({
              url: Jencil.utils.path.abspath(this.jencil.profile.extras.previewParserPath),
              type: this.jencil.profile.extras.previewParserMethod || 'GET',
              dataType: this.jencil.profile.extras.previewParserType || 'text',
              data: "" + (this.jencil.profile.extras.previewParserVal || 'data') + "=" + content,
              success: __bind(function(content) {
                return process(content);
              }, this)
            });
          } else {
            return process(content);
          }
        }, this);
        if (this.jencil.profile != null) {
          return process2();
        } else {
          return setTimeout(__bind(function() {
            if (this.jencil.profile != null) {
              return process2();
            } else {
              return setTimeout(arguments.callee, 100);
            }
          }, this), 100);
        }
      };
      PreviewPane.prototype.relocate = function() {
        PreviewPane.__super__.relocate.call(this);
        if (Jencil.utils.detector.browser === 'Explorer' && Jencil.utils.detector.version < 8) {
          return this.$surface.height(this.$element.height());
        }
      };
      return PreviewPane;
    })();
  });
  /*
  Jencil TextEditor
  
  A simple Dualpane Markup Editor with PreviewPane
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  Required:
  - Jencil.widget (jencil.widget.js)
  - Jencil.editor (jencil.editor.js)
  - Jencil.editor.pane (jencil.editor.pane.js)
  - Jencil.button (jencil.button.js)
  
  Dependencies:
  - Jencil.utils.detector (jencil.utils.js)
  - Textarea (textarea.js)
  */
  namespace('Jencil.editor.pane', function(exports) {
    var EditorPane, TextareaPane;
    EditorPane = Jencil.editor.pane.EditorPane;
    return exports.TextareaPane = TextareaPane = (function() {
      __extends(TextareaPane, EditorPane);
      function TextareaPane(jencil, editor) {
        TextareaPane.__super__.constructor.call(this, jencil, 'jencil-textarea-pane', editor);
        this.$element.css({
          position: 'relative'
        });
        this.$surface = $('<textarea>').addClass('surface');
        this.$surface.appendTo(this.$element);
        this.$surface.css({
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0,
          resize: 'none',
          outline: 'none'
        });
        this.$surface.bind('keyup keypress click change blur enter', __bind(function() {
          return this.update();
        }, this));
        this.controller = new Textarea(this.$surface);
      }
      TextareaPane.prototype.init = function() {
        if ($.fn.tabby != null) {
          this.$element.tabby();
        }
        return TextareaPane.__super__.init.call(this);
      };
      TextareaPane.prototype.relocate = function() {
        TextareaPane.__super__.relocate.call(this);
        if (Jencil.utils.detector.browser === 'Explorer' && Jencil.utils.detector.version < 8) {
          return this.$surface.height(this.$element.height());
        }
      };
      TextareaPane.prototype.getValue = function() {
        return this.controller.getValue();
      };
      TextareaPane.prototype.setValue = function(value) {
        return this.controller.setValue(value);
      };
      return TextareaPane;
    })();
  });
  namespace('Jencil.editor', function(exports) {
    var DualPaneEditorBase, PreviewPane, TextEditor, TextareaPane;
    DualPaneEditorBase = Jencil.editor.DualPaneEditorBase;
    PreviewPane = Jencil.editor.pane.PreviewPane;
    TextareaPane = Jencil.editor.pane.TextareaPane;
    return exports.TextEditor = TextEditor = (function() {
      __extends(TextEditor, DualPaneEditorBase);
      TextEditor.extras = {
        options: {
          previewPosition: 'right',
          previewTemplatePath: '~/extras/templates/preview.html',
          defaultPreviewState: 'open'
        }
      };
      function TextEditor(jencil) {
        var lhspane, rhspane, _ref;
        if ((_ref = jencil.options.extras.previewPosition) === 'top' || _ref === 'left') {
          lhspane = this.preview = new PreviewPane(jencil, this);
          rhspane = this.textarea = new TextareaPane(jencil, this);
        } else {
          lhspane = this.textarea = new TextareaPane(jencil, this);
          rhspane = this.preview = new PreviewPane(jencil, this);
        }
        TextEditor.__super__.constructor.call(this, jencil, 'jencil-text-editor', lhspane, rhspane);
        this.$element.addClass("jencil-preview-position-" + this.jencil.options.extras.previewPosition);
        this.setValue(this.jencil.getSourceValue());
        if (this.jencil.options.extras.defaultPreviewState === 'close') {
          this.preview.hide();
        }
        this.textarea.update(__bind(function() {
          this.jencil.setSourceValue(this.getValue());
          return this.preview.update();
        }, this));
      }
      TextEditor.prototype.relocate = function() {
        TextEditor.__super__.relocate.call(this);
        if (Jencil.utils.detector.browser === 'Explorer' && Jencil.utils.detector.version === 8) {
          return document.selection.createRange().select();
        }
      };
      TextEditor.prototype.getValue = function() {
        return this.textarea.getValue();
      };
      TextEditor.prototype.setValue = function(value) {
        return this.textarea.setValue(value);
      };
      TextEditor.prototype.getSelection = function() {
        return this.textarea.controller.getSelection();
      };
      TextEditor.prototype.setSelection = function(start, end) {
        return this.textarea.controller.setSelection(start, end);
      };
      TextEditor.prototype.getSelected = function() {
        return this.textarea.controller.getSelected();
      };
      TextEditor.prototype.replaceSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        return this.textarea.controller.replaceSelected(str, select);
      };
      TextEditor.prototype.insertBeforeSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        return this.textarea.controller.insertBeforeSelected(str, select);
      };
      TextEditor.prototype.insertAfterSelected = function(str, select) {
        if (select == null) {
          select = false;
        }
        return this.textarea.controller.insertAfterSelected(str, select);
      };
      TextEditor.prototype.wrapSelected = function(before, after, select, additional) {
        if (select == null) {
          select = false;
        }
        if (additional == null) {
          additional = void 0;
        }
        return this.textarea.controller.wrapSelected(before, after, select, additional);
      };
      return TextEditor;
    })();
  });
  namespace('Jencil.button', function(exports) {
    var ButtonBase, ImageMarkupButton, LinkMarkupButton, MarkupButtonBase, MultilineMarkupButton, SimpleMarkupButton, Widget;
    Widget = Jencil.widget.Widget;
    ButtonBase = Jencil.button.ButtonBase;
    exports.MarkupButtonBase = MarkupButtonBase = (function() {
      __extends(MarkupButtonBase, ButtonBase);
      function MarkupButtonBase() {
        MarkupButtonBase.__super__.constructor.apply(this, arguments);
      }
      MarkupButtonBase.prototype.clickAfter = function() {
        return this.editor().update();
      };
      return MarkupButtonBase;
    })();
    exports.SimpleMarkupButton = SimpleMarkupButton = (function() {
      __extends(SimpleMarkupButton, MarkupButtonBase);
      function SimpleMarkupButton(jencil, args) {
        var cls, name;
        cls = args[0], name = args[1], this.before = args[2], this.after = args[3], this.insert = args[4];
        SimpleMarkupButton.__super__.constructor.call(this, jencil, cls, name);
      }
      SimpleMarkupButton.prototype.click = function() {
        return this.editor().wrapSelected(this.before, this.after, true, this.insert || this.jencil.options.defaultInsertText);
      };
      return SimpleMarkupButton;
    })();
    exports.MultilineMarkupButton = MultilineMarkupButton = (function() {
      __extends(MultilineMarkupButton, MarkupButtonBase);
      function MultilineMarkupButton(jencil, args) {
        var cls, name;
        cls = args[0], name = args[1], this.before = args[2], this.after = args[3], this.blockBefore = args[4], this.blockAfter = args[5];
        MultilineMarkupButton.__super__.constructor.call(this, jencil, cls, name);
      }
      MultilineMarkupButton.prototype.click = function() {
        var i, line, offset, replace, selectedLines, _after, _before, _ref;
        selectedLines = this.editor().getSelected().split('\n');
        offset = selectedLines[0] === this.blockBefore ? 1 : 0;
        for (i = 0, _ref = selectedLines.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
          _before = Jencil.utils.string.format(this.before, {
            i: i + 1 - offset
          });
          _after = Jencil.utils.string.format(this.after, {
            i: i + 1 - offset
          });
          line = selectedLines[i];
          if (line === this.blockBefore || line === this.blockAfter) {
            continue;
          }
          if (line.startsWith(_before) && line.endsWith(_after)) {
            selectedLines[i] = line.substring(_before.length, line.length - _after.length);
          } else {
            selectedLines[i] = "" + _before + line + _after;
          }
        }
        if (this.blockBefore !== void 0) {
          if (selectedLines[0] === this.blockBefore) {
            selectedLines.shift();
          } else {
            selectedLines.unshift(this.blockBefore);
          }
        }
        if (this.blockAfter !== void 0) {
          if (selectedLines[selectedLines.length - 1] === this.blockAfter) {
            selectedLines.pop();
          } else {
            selectedLines.push(this.blockAfter);
          }
        }
        replace = selectedLines.join('\n');
        return this.editor().replaceSelected(replace, true);
      };
      return MultilineMarkupButton;
    })();
    exports.LinkMarkupButton = LinkMarkupButton = (function() {
      __extends(LinkMarkupButton, MarkupButtonBase);
      function LinkMarkupButton(jencil, args) {
        this.formatstr = args[0];
        LinkMarkupButton.__super__.constructor.call(this, jencil, 'link', 'Link');
      }
      LinkMarkupButton.prototype.click = function() {
        var href, insert, label, title;
        href = prompt("Please input link url");
        if (href === null) {
          return;
        }
        label = prompt("Please input link label", this.editor().getSelected());
        if (label === null) {
          return;
        }
        title = prompt("(Optional) Please input link title");
        if (title === null) {
          return;
        }
        insert = Jencil.utils.string.format(this.formatstr, {
          href: href,
          label: label,
          title: title
        });
        return this.editor().replaceSelected(insert);
      };
      return LinkMarkupButton;
    })();
    return exports.ImageMarkupButton = ImageMarkupButton = (function() {
      __extends(ImageMarkupButton, MarkupButtonBase);
      function ImageMarkupButton(jencil, args) {
        this.formatstr = args[0];
        ImageMarkupButton.__super__.constructor.call(this, jencil, 'image', 'Image');
      }
      ImageMarkupButton.prototype.click = function() {
        var alt, insert, src, title;
        src = prompt("Please input image src url");
        if (src === null) {
          return;
        }
        alt = prompt("(Optional) Please input image alt label", this.editor().getSelected());
        if (alt === null) {
          return;
        }
        title = prompt("(Optional) Please input image title");
        if (title === null) {
          return;
        }
        insert = Jencil.utils.string.format(this.formatstr, {
          src: src,
          alt: alt,
          title: title
        });
        return this.editor().replaceSelected(insert);
      };
      return ImageMarkupButton;
    })();
  });
  /*
  Jencil RichEditor
  
  A Dualpane WYSIWYG Editor with TextareaPane
  
  Author: Alisue (lambdalisue@hashnote.net)
  License: MIT License
  
  Copyright 2011 hashnote.net, Alisue allright reserved
  
  Required:
  - Jencil.widget (jencil.widget.js)
  - Jencil.editor (jencil.editor.js)
  - Jencil.editor.pane (jencil.editor.pane.js)
  - Jencil.editor.pane.TextareaPane (jencil.texteditor.js)
  - Jencil.button (jencil.button.js)
  
  Dependencies:
  - Jencil.utils.detector (jencil.utils.js)
  - Textarea (textarea.js)
  */
  namespace('Jencil.editor.pane', function(exports) {
    var EditorPane, RichareaPane;
    EditorPane = Jencil.editor.pane.EditorPane;
    return exports.RichareaPane = RichareaPane = (function() {
      __extends(RichareaPane, EditorPane);
      function RichareaPane(jencil, editor) {
        var src;
        RichareaPane.__super__.constructor.call(this, jencil, 'jencil-richarea-pane', editor);
        this.$element.css({
          position: 'relative'
        });
        this.$surface = $('<iframe>').addClass('surface');
        this.$surface.appendTo(this.$element);
        this.$surface.css({
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0
        });
        if (this.jencil.options.extras.richareaTemplatePath != null) {
          src = this.jencil.options.extras.richareaTemplatePath;
          this.$surface.attr('src', Jencil.utils.path.abspath(src));
        }
        if (Jencil.utils.detector.browser === 'Explorer') {
          this.$surface.attr('frameborder', 0);
        }
        this.controller = null;
      }
      RichareaPane.prototype.init = function() {
        this.controller = new Richarea(this.$surface);
        return this.controller.ready(__bind(function() {
          this.relocate();
          this.$body = $(this.controller.raw.body);
          this.$body.css({
            margin: 0,
            padding: 0
          });
          $(this.controller.raw.iframe).bind('keyup keypress change click blur enter', __bind(function() {
            return this.update();
          }, this));
          return RichareaPane.__super__.init.call(this);
        }, this));
      };
      RichareaPane.prototype.relocate = function() {
        RichareaPane.__super__.relocate.call(this);
        if (Jencil.utils.detector.browser === 'Explorer' && Jencil.utils.detector.version < 8) {
          this.$surface.height(this.$element.height());
        }
        if (Jencil.utils.detector.browser === 'Explorer' && Jencil.utils.detector.version < 9) {
          return this.$body.height(this.$surface.height());
        }
      };
      RichareaPane.prototype.getValue = function() {
        var _ref;
        if ((_ref = this.controller) != null ? _ref.ready() : void 0) {
          return this.controller.getValue();
        }
      };
      RichareaPane.prototype.setValue = function(value) {
        var _ref;
        if ((_ref = this.controller) != null ? _ref.ready() : void 0) {
          return this.controller.setValue(value);
        }
      };
      return RichareaPane;
    })();
  });
  namespace('Jencil.editor', function(exports) {
    var DualPaneEditorBase, RichEditor, RichareaPane, TextareaPane;
    DualPaneEditorBase = Jencil.editor.DualPaneEditorBase;
    TextareaPane = Jencil.editor.pane.TextareaPane;
    RichareaPane = Jencil.editor.pane.RichareaPane;
    return exports.RichEditor = RichEditor = (function() {
      __extends(RichEditor, DualPaneEditorBase);
      RichEditor.extras = {
        options: {
          richareaTemplatePath: '~/extras/templates/richarea.html'
        }
      };
      function RichEditor(jencil) {
        var lhspane, rhspane, _ref;
        if ((_ref = jencil.options.extras.previewPosition) === 'top' || _ref === 'left') {
          lhspane = this.preview = new TextareaPane(jencil, this);
          rhspane = this.richarea = new RichareaPane(jencil, this);
        } else {
          lhspane = this.richarea = new RichareaPane(jencil, this);
          rhspane = this.preview = new TextareaPane(jencil, this);
        }
        RichEditor.__super__.constructor.call(this, jencil, 'jencil-rich-editor', lhspane, rhspane);
        this.$element.addClass("jencil-preview-position-" + this.jencil.options.extras.previewPosition);
        if (this.jencil.options.extras.defaultPreviewState === 'close') {
          this.preview.hide();
        }
      }
      RichEditor.prototype.init = function() {
        RichEditor.__super__.init.call(this);
        return this.richarea.controller.ready(__bind(function() {
          this.setValue(this.jencil.getSourceValue());
          this.preview.setValue(this.getValue());
          this.richarea.update(__bind(function() {
            this.jencil.setSourceValue(this.getValue());
            return this.preview.setValue(this.getValue());
          }, this));
          this.preview.update(__bind(function() {
            this.jencil.setSourceValue(this.preview.getValue());
            return this.richarea.setValue(this.preview.getValue());
          }, this));
          return this.update();
        }, this));
      };
      RichEditor.prototype.getValue = function() {
        return this.richarea.getValue();
      };
      RichEditor.prototype.setValue = function(value) {
        return this.richarea.setValue(value);
      };
      return RichEditor;
    })();
  });
  namespace('Jencil.button', function(exports) {
    var ButtonBase, CommandButton, MarkupButtonBase, PromptCommandButton;
    ButtonBase = Jencil.button.ButtonBase;
    MarkupButtonBase = Jencil.button.MarkupButtonBase;
    exports.CommandButton = CommandButton = (function() {
      __extends(CommandButton, MarkupButtonBase);
      function CommandButton(jencil, args) {
        var cls, name;
        name = args[0], cls = args[1], this.command = args[2], this.args = args[3];
        CommandButton.__super__.constructor.call(this, jencil, name, cls);
      }
      CommandButton.prototype.click = function() {
        return this.exec(this.command, this.args);
      };
      CommandButton.prototype.exec = function(command, args) {
        if (this.editor().richarea.controller != null) {
          return this.editor().richarea.controller.execCommand(command, args);
        }
      };
      return CommandButton;
    })();
    return exports.PromptCommandButton = PromptCommandButton = (function() {
      __extends(PromptCommandButton, CommandButton);
      function PromptCommandButton(jencil, args) {
        var cls, command, name;
        name = args[0], cls = args[1], command = args[2], this.message = args[3], this.defaultValue = args[4];
        PromptCommandButton.__super__.constructor.call(this, jencil, [name, cls, command, void 0]);
      }
      PromptCommandButton.prototype.click = function() {
        var value;
        value = prompt(this.message, this.defaultValue || '');
        if (value === null) {
          return;
        }
        return this.exec(this.command, value);
      };
      return PromptCommandButton;
    })();
  });
}).call(this);
