$ = (_) -> _.src = "#{_.root}/#{_.src}"; _.dst = "#{_.root}/#{_.dst}"; return _
###########################################################################
### Config ###
###########################################################################
NAME                = "Jencil"
VERSION             = "0.1.5"
SRC_PATH            = $ {root: "./src", src: "coffee", dst: "js"}
LIB_PATH            = $ {root: "./lib", src: "coffee", dst: "js"}
TEST_PATH           = $ {root: "./test", src: "coffee", dst: "js"}
STYLE_SRC_PATH      = $ {root: "./src", src: "less", dst: "css"}
STYLE_LIB_PATH      = $ {root: "./lib", src: "less", dst: "css"}
RELEASE_PATH        = "./release"
COVERAGE_PATH       = "./instrumented"
SRC_FILES           = [
  'utils/namespace',
  'utils/strutils',
  'utils/undo',
  'utils/selection',
  'utils/evolution',
  'utils/curtain',
  'utils/animation',
  'utils/autoindent',
  'utils/i18n',
  'core',
  'widgets',
  'splitters',
  'editors',
  'viewers',
  'helpers',
  'buttons',
  'workspace',
  'multipanels',
  'mainpanels',
  'fullscreen',
  'types/html/editor',
  'types/html/viewer',
  'types/html/helper',
  'types/html/profile',
  'types/markdown/editor',
  'types/markdown/viewer',
  'types/markdown/profile',
]
LIB_FILES           = [
  'shortcut',
  'jquery.textarea',
]
TEST_FILES          = [
  'blackbox',
  'utils/strutils.spec',
  'utils/undo.spec',
  'utils/selection.spec',
  'utils/evolution.spec',
  'utils/curtain.spec',
  'utils/animation.spec',
  'utils/autoindent.spec',
  'widgets.spec',
  'splitters.spec',
  'buttons.spec',
  'workspace.spec',
  'multipanels.spec',
]
STYLE_SRC_FILES     = [
  'layout',
  'button',
  'helper',
  'splitter',
]
STYLE_LIB_FILES     = []
YUI_COMPRESSOR      = "~/.yuicompressor/build/yuicompressor-2.4.7.jar"
NODE_MODULES        = [
  'coffee-script',
  'coffeelint',
  'coverjs',
  'less',
  'mkdirp',
  'exec-sync',
  'chai',
  'mocha',
  'sinon',
  'sinon-chai',
]
JS_HEADER           = """
/**
 * #{NAME} #{VERSION}
 *
 * Author:  lambdalisue
 * URL:     http://hashnote.net/
 * License: MIT License
 * 
 * Copyright (C) 2012 lambdalisue, hashnote.net allright reserved.
 *
 * This application include following Library inside
 * 
 * Tabby jQuery plugin version 0.12
 * Ted Devito - http://teddevito.com/demos/textarea.html
 * Copyright (c) 2009 Ted Devito
 *
 * shortcut.js
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */
"""
CSS_HEADER          = JS_HEADER
CS_DEBUG_BLOCK_START    = "### DEBUG--- ###"
CS_DEBUG_BLOCK_END      = "### ---DEBUG ###"
LESS_DEBUG_BLOCK_START  = "/* DEBUG--- */"
LESS_DEBUG_BLOCK_END    = "/* ---DEBUG */"
COFFEELINT_CONFIG_FILE  = "./config/coffeelint.json"
###########################################################################
fs = require 'fs'
path = require 'path'
{exec, spawn} = require 'child_process'

option '-e', '--encoding', 'Encoding used for read/write a file'
option '-w', '--watch', 'Continuously execute action'
option '-v', '--verbose [VERBOSE]', 'set the logging level'
option '-o', '--optimize', 'remove DEBUG code block before compile'

###########################################################################
### Utils ###
###########################################################################
blockRemove = (text, startMarker, endMarker) ->
  pattern = new RegExp("")
  pattern.compile("#{startMarker}(?:.|\n)*?#{endMarker}", "g")
  return text.replace(pattern, "")

compose = (files, dst, options) ->
  buffer = new Array
  for file in files
    buffer.push fs.readFileSync file, options.encoding
  buffer.unshift options.header if options.header?
  buffer.push options.footer if options.footer?
  fs.writeFileSync dst, buffer.join("\n"), options.encoding


less = (src, dst, options, callback) ->
  # create required dir tree
  if not path.existsSync(path.dirname(dst))
    mkdirp = require 'mkdirp'
    mkdirp.sync path.dirname(dst)
  # compile src => dst
  exec "./node_modules/less/bin/lessc #{src} #{dst}", (err, stdout, stderr) ->
    console.log stdout if stdout
    console.log stderr if stderr

coffee = (src, dst, options) ->
  # set default value
  options.bare = options.bare ? true
  options.encoding = options.encoding ? 'utf-8'
  # create required dir tree
  if not path.existsSync(path.dirname(dst))
    mkdirp = require 'mkdirp'
    mkdirp.sync path.dirname(dst)
  src = [src] if typeof src is 'string'
  try
    buffer = (fs.readFileSync(f, options.encoding) for f in src).join("\n")
    buffer = blockRemove(buffer, CS_DEBUG_BLOCK_START, CS_DEBUG_BLOCK_END) if options.optimize
    Coffee = require 'coffee-script'
    buffer = Coffee.compile(buffer, {'bare': options.bare}) if buffer isnt ""
    fs.writeFileSync dst, buffer, options.encoding if not options.dry
  catch e
    console.error e

minify = (src, dst, options, callback) ->
  exec "java -jar #{YUI_COMPRESSOR} #{src} -o #{dst}", (err, stdout, stderr) ->
    process.stdout.write stdout
    process.stderr.write stderr
    callback?()

lint = (src, options) ->
  exec "./node_modules/coffeelint/bin/coffeelint -f #{COFFEELINT_CONFIG_FILE} #{src}", (err, stdout, stderr) ->
    console.log stdout if stdout
    console.log stderr if stderr

coverjs = (src, dst, options) ->
  exec "./node_modules/coverjs/bin/cover.js --recursive #{src} --output #{dst}", (err, stdout, stderr) ->
    console.log stdout if stdout
    console.log stderr if stderr

mocha = (src, options) ->
  exec "./node_modules/mocha/bin/mocha --compilers coffee:coffee-script #{src}", (err, stdout, stderr) ->
    process.stdout.write stdout
    process.stderr.write stderr

compileCS = (pathset, filenames, options) ->
  compileSingle = (pathset, filenames, options) ->
    for filename in filenames
      src = "#{pathset.src}/#{filename}.coffee"
      dst = "#{pathset.dst}/#{filename}.js"
      if not path.existsSync(src) and path.existsSync(dst)
        # The filename is for JavaScript and not for CoffeeScript
        # so compile doesn't make any sence
        switch options.verbose
          when '0' then 
          when '1' then process.stdout.write "."
          else console.log "-", dst
        continue
      switch options.verbose
        when '0' then 
        when '1' then process.stdout.write "+"
        else console.log "+", path.basename(src), "=>", dst
      # compile
      coffee src, dst, options
      # watch
      if options.watch? then do (src, dst) ->
        fs.watchFile src, (c, p) -> 
          console.log "+", path.basename(src), "=>", dst
          coffee(src, dst, options)
    console.log ""
  compileMultiple = (pathset, filenames, options) ->
    # just check
    files = new Array
    jsFiles = new Array
    options.dry = true
    for filename in filenames
      src = "#{pathset.src}/#{filename}.coffee"
      dst = "#{pathset.dst}/#{filename}.js"
      if not path.existsSync(src) and path.existsSync(dst)
        # The filename is for JavaScript and not for CoffeeScript
        # so compile doesn't make any sence
        switch options.verbose
          when '0' then 
          when '1' then process.stdout.write "."
          else console.log "-", dst
        jsFiles.push dst
        continue
      switch options.verbose
        when '0' then 
        when '1' then process.stdout.write "."
        else console.log "+", path.basename(src), "=>", dst
      # compile (dry)
      coffee src, dst, options
      files.push src
    dst = "#{pathset.dst}/#{NAME}.js"
    console.log "=>", dst if options.verbose isnt '0'
    console.log ""
    # compile
    options.dry = false
    options.bare = false
    coffee files, dst, options
    # compose existing jsFiles
    jsFiles.push dst
    compose jsFiles, dst, options if jsFiles.length > 0
    # watch the file change
    if options.watch?
      for file in files then do (file, files, dst, jsFiles) ->
        fs.watchFile file, (c, p) ->
          console.log "=>", dst if options.verbose isnt '0'
          coffee files, dst, options
          compose jsFiles, dst, options if jsFiles.length > 0
  console.log "Compile CoffeeScript files in #{pathset.root}" if options.verbose isnt '0'
  if options.multiple?
    compileMultiple pathset, filenames, options
  else
    compileSingle pathset, filenames, options

compileLESS = (pathset, filenames, options) ->
  compileSingle = (pathset, filenames, options) ->
    for filename in filenames
      src = "#{pathset.src}/#{filename}.less"
      dst = "#{pathset.dst}/#{filename}.css"
      if not path.existsSync(src) and path.existsSync(dst)
        # The filename is for CSS and not for LESS
        # so compile doesn't make any sence
        switch options.verbose
          when '0' then 
          when '1' then process.stdout.write "."
          else console.log "-", dst
        continue
      switch options.verbose
        when '0' then 
        when '1' then process.stdout.write "+"
        else console.log "+", path.basename(src), "=>", dst
      # compile
      less src, dst, options
      # watch
      if options.watch? then do (src, dst) ->
        fs.watchFile src, (c, p) -> 
          console.log "+", path.basename(src), "=>", dst
          less(src, dst, options)
    console.log ""
  console.log "Compile LESS files in #{pathset.root}" if options.verbose isnt '0'
  compileSingle pathset, filenames, options


###########################################################################
### Tasks ###
###########################################################################
task 'install', 'Install required node modules', (options) ->
  install = (module_name) ->
    exec "npm install #{module_name}", (err, stdout, stderr) ->
      process.stdout.write stdout
      process.stderr.write stderr
  for module in NODE_MODULES
    install module

### compile:style ###
task 'compile:style:src', 'Compile src LESS files to css files', (options) ->
  compileLESS STYLE_SRC_PATH, STYLE_SRC_FILES, options
task 'compile:style:lib', 'Compile lib LESS files to css files', (options) ->
  compileLESS STYLE_LIB_PATH, STYLE_LIB_FILES, options
### compile:develop ###
task 'compile:develop:src', 'Compile src CoffeeScript files to bare javascript files', (options) ->
  compileCS SRC_PATH, SRC_FILES, options
task 'compile:develop:lib', 'Compile lib CoffeeScript files to bare javascript files', (options) ->
  compileCS LIB_PATH, LIB_FILES, options
task 'compile:test', 'Compile test CoffeeScript files to bare javascript files', (options) ->
  compileCS TEST_PATH, TEST_FILES, {'bare': false}
  # Instrument by CoverJS
  coverjs SRC_PATH.dst, COVERAGE_PATH, options

task 'compile:develop', 'Compile CoffeeScript/LESS files to javascript/css files', (options) ->
  invoke 'compile:develop:src'
  invoke 'compile:develop:lib'
  invoke 'compile:test'
  invoke 'compile:style:src'
  invoke 'compile:style:lib'

### compile:release ###
task 'compile:release:src', 'Compile src CoffeeScript files to a single javascript file', (options) ->
  options.multiple = true
  compileCS SRC_PATH, SRC_FILES, options
task 'compile:release:lib', 'Compile lib CoffeeScript files to a single javascript file', (options) ->
  options.multiple = true
  compileCS LIB_PATH, LIB_FILES, options
task 'compile:release', 'Compile CoffeeScript/LESS files to javascript/css files', (options) ->
  invoke 'compile:release:src'
  invoke 'compile:release:lib'
  invoke 'compile:style:src'
  invoke 'compile:style:lib'
  
task 'compose:js', 'Compose compiled javascript files into a single javascript file', (options) ->
  SRC_FILE = "#{SRC_PATH.dst}/#{NAME}.js"
  LIB_FILE = "#{LIB_PATH.dst}/#{NAME}.js"
  files = [LIB_FILE, SRC_FILE]
  #files = [SRC_FILE, LIB_FILE]
  #dst = "#{SRC_PATH.dst}/#{NAME}.#{VERSION}.js"
  dst = "#{RELEASE_PATH}/#{NAME}.#{VERSION}.js"

  if not path.existsSync(path.dirname(dst))
    mkdirp = require 'mkdirp'
    mkdirp.sync path.dirname(dst)

  console.log "Compose compiled javascript files" if options.verbose isnt '0'
  if options.verbose isnt '0'
    for file in files
      switch options.verbose
        when '1' then process.stdout.write "."
        else console.log "+", file
  console.log "=>", dst if options.verbose isnt '0'
  console.log ""
  options.header = JS_HEADER
  compose files, dst, options

task 'compose:css', 'Compose compiled css files into a single css file', (options) ->
  srcFiles = ("#{STYLE_SRC_PATH.dst}/#{filename}.css" for filename in STYLE_SRC_FILES)
  libFiles = ("#{STYLE_LIB_PATH.dst}/#{filename}.css" for filename in STYLE_LIB_FILES)
  files = srcFiles.concat libFiles
  #dst = "#{STYLE_SRC_PATH.dst}/#{NAME}.#{VERSION}.css"
  dst = "#{RELEASE_PATH}/#{NAME}.#{VERSION}.css"

  if not path.existsSync(path.dirname(dst))
    mkdirp = require 'mkdirp'
    mkdirp.sync path.dirname(dst)

  console.log "Compose compiled css files" if options.verbose isnt '0'
  if options.verbose isnt '0'
    for file in files
      switch options.verbose
        when '1' then process.stdout.write "."
        else console.log "+", file
  console.log "=>", dst if options.verbose isnt '0'
  console.log ""
  options.header = CSS_HEADER
  compose files, dst, options

task 'minify:js', 'Minify javascript file', (options) ->
  src = "#{RELEASE_PATH}/#{NAME}.#{VERSION}.js"
  dst = "#{RELEASE_PATH}/#{NAME}.#{VERSION}.min.js"
  console.log "Minify javascript file" if options.verbose isnt '0'
  console.log path.basename(src), "=>", dst if options.verbose isnt '0'
  minify src, dst, options, ->
    # Add header
    options.header = JS_HEADER
    compose [dst], dst, options

task 'minify:css', 'Minify css file', (options) ->
  src = "#{RELEASE_PATH}/#{NAME}.#{VERSION}.css"
  dst = "#{RELEASE_PATH}/#{NAME}.#{VERSION}.min.css"
  console.log "Minify css file" if options.verbose isnt '0'
  console.log path.basename(src), "=>", dst if options.verbose isnt '0'
  minify src, dst, options, ->
    # Add header
    options.header = CSS_HEADER
    compose [dst], dst, options

task 'test:mocha', 'Run mocha test', (options) ->
  invoke 'compile:develop:src'
  invoke 'compile:develop:lib'
  invoke "compile:test"
  if not TEST_FILES or TEST_FILES.length == 0
    console.log "No test files are specified"
    return
  files = ("#{TEST_PATH.src}/#{filename}.coffee" for filename in TEST_FILES)
  mocha files.join(" "), options

task 'test:lint', 'Run lint test', (options) ->
  files = ("#{SRC_PATH.src}/#{filename}.coffee" for filename in SRC_FILES)
  lint files.join(" "), options

task 'develop', 'Develop', (options) ->
  options.watch = true
  invoke 'test:lint'
  invoke 'test:mocha'
  invoke 'compile:develop'

task 'release', 'Release', (options) ->
  invoke 'test:lint'
  invoke 'test:mocha'
  invoke 'compile:release'
  invoke 'compose:js'
  invoke 'compose:css'
  invoke 'minify:js'
  invoke 'minify:css'
  exec "cp README.rst #{RELEASE_PATH}/README.rst"
  exec "cp -rf #{STYLE_SRC_PATH.dst}/img #{RELEASE_PATH}/"

task 'clean', 'Clean files', (options) ->
  exec "rm -r #{SRC_PATH.dst}"
  exec "rm -r #{STYLE_SRC_PATH.dst}"

task 'demo', 'Start demo server', (options) ->
  console.log "Start demo server..."
  console.log "Access http://localhost:8000/"
  server = createStaticServer("#{process.cwd()}/demo/")
  server.listen(process.env.PORT || 8000)

CONTENT_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
}
createStaticServer = (root, prefix="") ->
  url = require 'url'
  http = require 'http'
  loadStaticFile = (request, response) ->
    findContentType = (uri) ->
      ext = path.extname(uri)
      for type, contentType of CONTENT_TYPES
        return contentType if type is ext
      return 'text/plain'
    uri = url.parse(request.url).pathname
    uri = 'index.html' if uri is '/'
    filename = path.join(prefix, root, uri)
    path.exists(filename, (exists) ->
      if not exists
        console.log "404", "Not Found", uri if uri isnt '/favicon.ico'
        response.writeHead(404, {'Content-Type': 'text/plain'})
        response.write("404 Not found\n#{filename}\n")
        response.end()
        return
      fs.readFile(filename, 'binary', (err, content) ->
        if err?
          console.log "500", "Server error", uri
          response.writeHead(500, {'Content-Type': 'text/plain'})
          response.write(err + "\n#{filename}\n")
          response.end()
          return
        console.log "200", "OK", uri
        response.writeHead(200, {'Content-Type': findContentType(uri)})
        response.write(content, 'binary')
        response.end()
      )
    )
  return http.createServer loadStaticFile


