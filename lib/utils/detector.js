/*
Detect browser name, version and OS

@ref: http://www.quirksmode.org/js/detect.html
*/
var Detector;
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