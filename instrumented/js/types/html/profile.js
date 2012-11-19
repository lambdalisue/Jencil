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
__$coverInit("src/js/types/html/profile.js", "var HtmlProfile;\n\nHtmlProfile = {\n  mainPanelClass: TrimainPanel,\n  editorClass: HtmlEditor,\n  viewerClass: HtmlViewer,\n  helperClass: HtmlHelper,\n  defaultVolume: 1,\n  defaultVolume2: 0.7,\n  toolbarButtons: ['Undo', 'Redo', 'Separator', ['h1', 'H1'], ['h2', 'H2'], ['h3', 'H3'], ['h4', 'H4'], ['h5', 'H5'], ['h6', 'H6'], 'Separator', ['bold', 'Bold', 'Ctrl+B'], ['italic', 'Italic', 'Ctrl+I'], ['underline', 'Underline', 'Ctrl+U'], ['strike', 'Strikeout'], ['superscript', 'Superscript'], ['subscript', 'Subscript'], 'Separator', ['anchorLink', 'Anchor link'], ['image', 'Image'], ['unorderedList', 'Unordered list'], ['orderedList', 'Ordered list'], ['quote', 'Quote'], ['blockquote', 'Blockquote'], ['code', 'Code'], ['pre', 'Pre'], 'Separator', 'Fullscreen'],\n  statusbarButtons: ['Viewer', 'Helper']\n};\n\nnamespace('Jencil.profiles', function(exports) {\n  return exports.HtmlProfile = HtmlProfile;\n});\n");
__$coverInitRange("src/js/types/html/profile.js", "0:15");
__$coverInitRange("src/js/types/html/profile.js", "18:806");
__$coverInitRange("src/js/types/html/profile.js", "809:904");
__$coverInitRange("src/js/types/html/profile.js", "860:900");
__$coverCall('src/js/types/html/profile.js', '0:15');
var HtmlProfile;
__$coverCall('src/js/types/html/profile.js', '18:806');
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
__$coverCall('src/js/types/html/profile.js', '809:904');
namespace('Jencil.profiles', function (exports) {
    __$coverCall('src/js/types/html/profile.js', '860:900');
    return exports.HtmlProfile = HtmlProfile;
});