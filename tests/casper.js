var server = require('webserver').create()
var fs = require('fs')
var address = '127.0.0.1:8000'

var p = function(name) {
  return 'http://'+address+'/'+name
}

var service = server.listen(address, function(request, response) {
  response.writeHead(200, { 'Content-Type': 'text/html' })
  response.statusCode = 200;
  response.write(fs.read('./tests/cases'+request.url+'.html'))
  response.close();
})

var check = function(url, title, fn) {
  casper.test.begin(title, 1, function suite(test) {
    casper.start( p(url), function() {
      fn.call(this, test)
    })
    casper.run(function() {
      test.done()
    })
  })
}

// HELLO
check('hello', 'Test the title', function(test) {
  test.assertTitle("YO", "Title is the one expected")
})

// H1
check('hello', 'Check the h1', function(test) {
  casper.waitForSelector('h1', function() {
    test.assertEqual(this.fetchText('h1'), 'Hello')
  })
})