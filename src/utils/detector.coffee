###
Detect browser name, version and OS

@ref: http://www.quirksmode.org/js/detect.html
###
class Detector
  constructor: ->
    @browser = @searchString(Detector.dataBrowser) or "An unknown browser"
    @version = @searchVersion(navigator.userAgent) or @searchVersion(navigator.appVersion) or "An unknown browser"
    @OS = @searchString(Detector.dataOS) or "An unknown OS"
  searchString: (data) ->
    for row in data
      @versionSearchString = row.versionSearch or row.identify
      if row.string?
        if row.string.indexOf(row.subString) isnt -1
          return row.identify
        else if row.prop
          return row.identify
  searchVersion: (dataString) ->
    index = dataString.indexOf @versionSearchString
    if index is -1 then return
    return parseFloat dataString.substring(index+@versionSearchString.length+1)
  @dataBrowser: [
    {string: navigator.userAgent, subString: 'Chrome', identify: 'Chrome'}
    {string: navigator.userAgent, subString: 'OmniWeb', versionSearch: 'OmniWeb/', identify: 'OmniWeb'}
    {string: navigator.vendor, subString: 'Apple', identify: 'Safari', versionSearch: 'Version'}
    {prop: window.opera, identify: 'Opera', versionSearch: 'Version'}
    {string: navigator.vendor, subString: 'iCab', identify: 'iCab'}
    {string: navigator.vendor, subString: 'KDE', identify: 'Konqueror'}
    {string: navigator.userAgent, subString: 'Firefox', identify: 'Firefox'}
    {string: navigator.vendor, subString: 'Camino', identify: 'Camino'}
    {string: navigator.userAgent, subString: 'Netscape', identify: 'Netscape'}
    {string: navigator.userAgent, subString: 'MSIE', identify: 'Explorer', versionSearch: 'MSIE'}
    {string: navigator.userAgent, subString: 'Gecko', identify: 'Mozilla', versionSearch: 'rv'}
    {string: navigator.userAgent, subString: 'Mozilla', identify: 'Netscape', versionSearch: 'Mozilla'}
  ]
  @dataOS: [
    {string: navigator.platform, subString: 'Win', identify: 'Windows'}
    {string: navigator.platform, subString: 'Mac', identify: 'Mac'}
    {string: navigator.userAgent, subString: 'iPhone', identify: 'iPhone/iPad'}
    {string: navigator.platform, subString: 'Linux', identify: 'Linux'}
  ]
exports?.Detector = Detector
