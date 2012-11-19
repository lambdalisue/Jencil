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
__$coverInit("src/js/types/markdown/profile.js", "var MarkdownProfile;\n\nMarkdownProfile = {\n  mainPanelClass: DimainPanel,\n  editorClass: MarkdownEditor,\n  viewerClass: MarkdownJsViewer,\n  defaultVolume: 1,\n  toolbarButtons: ['Undo', 'Redo', 'Separator', ['h1', 'H1'], ['h2', 'H2'], ['h3', 'H3'], ['h4', 'H4'], ['h5', 'H5'], ['h6', 'H6'], 'Separator', ['bold', 'Bold', 'Ctrl+B'], ['italic', 'Italic', 'Ctrl+I'], 'Separator', ['anchorLink', 'Anchor link'], ['image', 'Image'], ['unorderedList', 'Unordered list'], ['orderedList', 'Ordered list'], ['blockquote', 'Blockquote'], ['code', 'Code'], 'Separator', 'Fullscreen'],\n  statusbarButtons: ['Viewer']\n};\n\nnamespace('Jencil.profiles', function(exports) {\n  return exports.MarkdownProfile = MarkdownProfile;\n});\n");
__$coverInitRange("src/js/types/markdown/profile.js", "0:19");
__$coverInitRange("src/js/types/markdown/profile.js", "22:604");
__$coverInitRange("src/js/types/markdown/profile.js", "607:710");
__$coverInitRange("src/js/types/markdown/profile.js", "658:706");
__$coverCall('src/js/types/markdown/profile.js', '0:19');
var MarkdownProfile;
__$coverCall('src/js/types/markdown/profile.js', '22:604');
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
__$coverCall('src/js/types/markdown/profile.js', '607:710');
namespace('Jencil.profiles', function (exports) {
    __$coverCall('src/js/types/markdown/profile.js', '658:706');
    return exports.MarkdownProfile = MarkdownProfile;
});