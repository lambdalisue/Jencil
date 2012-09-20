# Simple use i18next feature if it's available
if window.i18n?
  translate = (key) -> i18n.t(key, {defaultValue: key})
else
  translate = (key) -> key
