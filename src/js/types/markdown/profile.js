var MarkdownProfile;

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
