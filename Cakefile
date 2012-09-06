$ = (_) -> _.src = "#{_.root}/#{_.src}"; _.dst = "#{_.root}/#{_.dst}"; return _
# --- CONFIGURE ---------------------------------------------------
NAME              = "jencil"
VERSION           = "0.1.0"
SRC_PATH          = $ {root: "./src", src: "coffee", dst: "js"}
LIB_PATH          = $ {root: "./lib", src: "coffee", dst: "js"}
TEST_PATH         = $ {root: "./test", src: "coffee", dst: "js"}
STYLE_PATH        = $ {root: "./style", src: "less", dst: "css"}
SRC_FILES         = [
  'extends/jquery.extends',
  'utils/memento',
  'utils/textarea',
  'utils/animation',
  'core',
  'commands',
  'ui/widget',
  'ui/splitter',
  'ui/panel',
  'ui/toolbar',
  'ui/buttons/base',
  'ui/buttons/general',
  'ui/buttons/markup',
  'ui/workspace',
  'ui/editors/base',
  'ui/editors/html',
  'ui/editors/markdown',
  'ui/viewers/base',
  'ui/viewers/html',
  'ui/viewers/markdown',
  'profiles/base',
  'profiles/html',
  'profiles/markdown',
]
LIB_FILES         = [
  'jquery.tabby',
  'markdown',
  'shortcut',
]
TEST_FILES        = [
  'sandbox',
  'extends/jquery.extends.spec',
  'utils/textarea.spec',
  'core.spec',
  'ui/widget.spec',
]
STYLE_FILES       = [
  'layout',
#  'develop',
]
YUI_COMPRESSOR    = "~/.yuicompressor/build/yuicompressor-2.4.7.jar"
NODE_MODULES = [
  'coffee-script',
  'less',
  'chai',
  'mocha',
  'sinon',
  'sinon-chai',
]
# -----------------------------------------------------------------
fs = require 'fs'
path = require 'path'
{exec, spawn}   = require 'child_process'

options =
  encoding: 'utf-8'
  watch: false
option '-e', '--encoding', 'Encoding used for read/write a file'
option '-w', '--watch', 'Continuously execute action'

mkdirpSync = (dir) ->
  dir = path.resolve path.normalize dir
  try
    fs.mkdirSync dir, 511
  catch e
    switch e.errno
      when constants.EEXIST
        return
      when constants.ENOENT
        mkdirpSync path.dirname dir
        mkdirpSync dir
      else
        throw e
compileCoffeeScript = (pathset, filenames, anonymous=false) ->
  coffee = require 'coffee-script'
  compileSingle = (filename) ->
    src = "#{pathset.src}/#{filename}.coffee"
    dst = "#{pathset.dst}/#{filename}.js"
    # log
    console.log "Compile:", path.basename(src), "->", dst
    if not path.existsSync(src) and path.existsSync(dst)
      # this mean the file is written in javascript
      return null
    if not path.existsSync(path.dirname(dst))
      mkdirpSync path.dirname(dst)
    # compile src => dst
    cs = fs.readFileSync(src, options.encoding)
    js = coffee.compile cs, {'bare': not anonymous}
    fs.writeFileSync dst, js
    return [src, dst]
  # compile all src files
  for filename in filenames
    do (filename) -> compileSingle filename

compileLess = (pathset, filenames) ->
  #less = require 'less'
  less = (src, dst) ->
    exec "lessc #{src} #{dst}", (err, stdout, stderr) ->
      console.log stdout if stdout
      console.log stderr if stderr
  compileSingle = (filename) ->
    src = "#{pathset.src}/#{filename}.less"
    dst = "#{pathset.dst}/#{filename}.css"
    # log
    console.log "Compile:", path.basename(src), "->", dst
    if not path.existsSync(src) and path.existsSync(dst)
      # this mean the file is written in css
      return null
    if not path.existsSync(path.dirname(dst))
      mkdirpSync path.dirname(dst)
    # compile src => dst
    less src, dst
    #less.render(fs.readFileSync(src, options.encoding), (e, css) ->
    #  fs.writeFileSync dst, css
    #)
    return [src, dst]
  # compile all src files
  for filename in filenames
    do (filename) -> compileSingle filename

compose = (pathset, filenames, extension) ->
  buffer = []
  for filename in filenames
    src = "#{pathset.dst}/#{filename}.#{extension}"
    buf = fs.readFileSync(src, options.encoding)
    buffer.push buf
  buffer = buffer.join "\n"
  return buffer

composeCss = (pathset, filenames, output) ->
  return if filenames.length is 0
  buffer = compose(pathset, filenames, 'css')
  console.log "Compose:", filenames.length, "files =>", output
  fs.writeFileSync output, buffer, options.encoding

composeJavaScript = (pathset, filenames, output, anonymous=false) ->
  return if filenames.length is 0
  buffer = compose(pathset, filenames, 'js')
  if anonymous
    buffer = ("    #{x}" for x in buffer.split("\n")).join("\n")
    buffer = "(function() {\n#{buffer}\n}).call(this);"
  console.log "Compose:", filenames.length, "files =>", output
  fs.writeFileSync output, buffer, options.encoding

minify = (src, dst) ->
  console.log "Minify:", path.basename(src), "=>", dst
  exec "java -jar #{YUI_COMPRESSOR} #{src} -o #{dst}", (err, stdout, stderr) ->
    process.stdout.write stdout
    process.stderr.write stderr

mocha = (pathset, filenames) ->
  args = ("#{pathset.dst}/#{filename}.js" for filename in filenames)
  exec "mocha --compilers coffee:coffee-script #{args.join(" ")}", (err, stdout, stderr) ->
    process.stdout.write stdout
    process.stderr.write stderr


task 'compile:coffee:src', 'Compile coffeescript files in src to bare javascript files', ->
  compileCoffeeScript SRC_PATH, SRC_FILES
task 'compile:coffee:lib', 'Compile coffeescript files in lib to bare javascript files', ->
  compileCoffeeScript LIB_PATH, LIB_FILES
task 'compile:coffee:test', 'Compile coffeescript files in test to bare javascript files', ->
  compileCoffeeScript TEST_PATH, TEST_FILES, true
task 'compile:coffee', 'Compile coffeescript files to bare javascript files', ->
  invoke 'compile:coffee:src'
  invoke 'compile:coffee:lib'
  invoke 'compile:coffee:test'

task 'compile:less', 'Compile less files to css files', ->
  compileLess STYLE_PATH, STYLE_FILES


task 'compose:js:src', 'Compose javascript files in src to a single javascript file', ->
  filename = "#{SRC_PATH.dst}/#{NAME}.#{VERSION}.src.js"
  composeJavaScript SRC_PATH, SRC_FILES, filename
task 'compose:js:lib', 'Compose javascript files in lib to a single javascript file', ->
  filename = "#{SRC_PATH.dst}/#{NAME}.#{VERSION}.lib.js"
  composeJavaScript LIB_PATH, LIB_FILES, filename
task 'compose:js', 'Compose javascript files to a single javascript file', ->
  invoke 'compose:js:src'
  invoke 'compose:js:lib'
  filename = "#{NAME}.#{VERSION}"
  composeJavaScript SRC_PATH, ["#{filename}.lib", "#{filename}.src"], "#{SRC_PATH.dst}/#{filename}.js", true
task 'compose:css', 'Compose css files to a single css file', ->
  filename = "#{STYLE_PATH.dst}/#{NAME}.#{VERSION}.css"
  composeCss STYLE_PATH, STYLE_FILES, filename

task 'minify:js', 'Minify javascript file', ->
  src = "#{SRC_PATH.dst}/#{NAME}.#{VERSION}.js"
  dst = "#{SRC_PATH.dst}/#{NAME}.#{VERSION}.min.js"
  minify src, dst

task 'minify:css', 'Minify css file', ->
  src = "#{STYLE_PATH.dst}/#{NAME}.#{VERSION}.css"
  dst = "#{STYLE_PATH.dst}/#{NAME}.#{VERSION}.min.css"
  minify src, dst

task 'test', 'Run test', (options) ->
  invoke 'compile:coffee'
  mocha TEST_PATH, TEST_FILES
  if options.watch
    for filename in SRC_FILES
      src = "#{SRC_PATH.src}/#{filename}.coffee"
      fs.watchFile src, (c, p) -> invoke 'test' if path.existsSync src
    for filename in LIB_FILES
      src = "#{LIB_PATH.src}/#{filename}.coffee"
      fs.watchFile src, (c, p) -> invoke 'test' if path.existsSync src
    for filename in TEST_FILES
      src = "#{TEST_PATH.src}/#{filename}.coffee"
      fs.watchFile src, (c, p) -> invoke 'test' if path.existsSync src

task 'build:develop', 'Build as develop mode', (options) ->
  invoke 'compile:coffee'
  invoke 'compile:less'
  if options.watch
    for filename in SRC_FILES
      src = "#{SRC_PATH.src}/#{filename}.coffee"
      fs.watchFile src, (c, p) -> invoke 'compile:coffee:src' if path.existsSync src
    for filename in LIB_FILES
      src = "#{LIB_PATH.src}/#{filename}.coffee"
      fs.watchFile src, (c, p) -> invoke 'compile:coffee:lib' if path.existsSync src
    for filename in TEST_FILES
      src = "#{TEST_PATH.src}/#{filename}.coffee"
      fs.watchFile src, (c, p) -> invoke 'compile:coffee:test' if path.existsSync src
    for filename in STYLE_FILES
      src = "#{STYLE_PATH.src}/#{filename}.less"
      fs.watchFile src, (c, p) -> invoke 'compile:less' if path.existsSync src

task 'build:release', 'Build as release mode', (options) ->
  invoke 'compile:coffee'
  invoke 'compose:js'
  invoke 'minify:js'
  invoke 'compile:less'
  invoke 'compose:css'
  invoke 'minify:css'
  if options.watch
    for filename in SRC_FILES
      src = "#{SRC_PATH.src}/#{filename}.coffee"
      fs.watchFile src, (c, p) -> invoke 'build:release' if path.existsSync src
    for filename in LIB_FILES
      src = "#{LIB_PATH.src}/#{filename}.coffee"
      fs.watchFile src, (c, p) -> invoke 'build:release' if path.existsSync src
    for filename in TEST_FILES
      src = "#{TEST_PATH.src}/#{filename}.coffee"
      fs.watchFile src, (c, p) -> invoke 'build:release' if path.existsSync src
    for filename in STYLE_FILES
      src = "#{STYLE_PATH.src}/#{filename}.less"
      fs.watchFile src, (c, p) -> invoke 'build:release' if path.existsSync src

task 'install:node', 'Install required node modules', ->
  install = (module_name) ->
    exec "npm install #{module_name}", (err, stdout, stderr) ->
      process.stdout.write stdout
      process.stderr.write stderr
  for module in NODE_MODULES
    install module
