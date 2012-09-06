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
