var gulp = require('gulp')
var mochaPhantomJS = require('gulp-mocha-phantomjs')
var gutil = require('gulp-util')
var fs = require('fs')
var browserify = require('browserify')
var map = require('vinyl-map')
var source = require('vinyl-source-stream')
var buffer = require('gulp-buffer')
var concat = require('gulp-concat')
var path = require('path')
var uglify = require('gulp-uglify')
var moment = require('moment')

var gulpBrowserify = function(options, bundleOptions, commands) {
  var b
  options.extensions || (options.extensions = ['.js'])
  bundleOptions || (bundleOptions = {})
  b = browserify(options)

  for ( cmd in commands ) {
    values = commands[cmd]
    if ( typeof values === 'string' ) values = [values]
    values.forEach(function(value) {
      b[cmd](value)
    })
  }
  return b.bundle(bundleOptions)
}

var bumpVersion = function(v, method) {
  v = v.split('.').map(function(val) {
    return parseInt(val, 10)
  })
  if ( method == 'patch' )
    v[2]++
  else if ( method == 'minor' ) {
    v[1]++
    v[2] = 0
  } else if ( method == 'major' ) {
    v[1] = v[2] = 0
    v[0]++
  }
  return 'v'+v.join('.')
}

var MODULE = 'galleria'

gulp.task('test', function(){
  return gulp
    .src('tests/unit.html')
    .pipe(mochaPhantomJS())
})

var build = function() {
  gutil.log('Building '+MODULE)
  var pakg = fs.readFileSync('./package.json')
  pakg = JSON.parse(pakg.toString())
  var version = pakg.version
  var upper = MODULE.charAt(0).toUpperCase() + MODULE.substr(1)
  var src = './index.js'
  var addComments = function(data, file) {
    var script = data.toString()
    var comments = [
      upper + ' ' + version,
      moment().format("MMMM Do YYYY"),
      '(c) Aino',
      'MIT Licensed'
    ]
    return '/* '+comments.join(' - ') + ' */\n'+script
  }
  var compiled = gulpBrowserify({
    entries: src
  },{
    debug: false,
    standalone: upper
  },{
    external: []
  })
  .on('error', function(trace) {
    console.error(trace)
  })
  .pipe(source(src))
  .pipe(buffer())

  compiled
    .pipe(map(addComments))
    .pipe(concat(MODULE+'.js'))
    .pipe(gulp.dest('dist'))

  compiled
    .pipe(uglify())
    .pipe(map(addComments))
    .pipe(concat(MODULE+'.min.js'))
    .pipe(gulp.dest('dist'))
}

gulp.task('build', build)

gulp.task('listen', function() {
  build()
  var watcher = gulp.watch('./index.js', ['build'])
  watcher.on('change', function(event) {
    gutil.log('File '+event.path+' was '+event.type+', running tasks...')
  })
  gutil.log('Listening for changes...')
})
