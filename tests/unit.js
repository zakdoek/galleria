var assert = chai.assert
var expect = chai.expect
var should = chai.should()

describe('Intialization using Galleria.run', function() {

  var $container = $('<div>').appendTo('body')

  $.each(new Array(4), function(i) {
    $('<div>').addClass('g'+i).appendTo($container)
  })

  it('Should initialize a single gallery using Galleria.run(node)', function() {
    var elem = $('.g1')[0]
    Galleria.run(elem)
    expect(Galleria.Collection.get()[0]).to.include({ target: elem })
  })

  it('Should initialize multiple galleries using Galleria.run(nodeList)', function() {
    var elems = $container[0].childNodes
    Galleria.Collection.clear()
    Galleria.run(elems)
    assert.equal(elems.length, Galleria.Collection.size())
  })

  it('Should initialize multiple galleries using Galleria.run(selector)', function() {
    Galleria.Collection.clear()
    Galleria.run('.g1,.g2')
    assert.equal(Galleria.Collection.size(), 2)
  })

  it('Should not intialize duplicate galleries for the same target', function() {
    Galleria.Collection.clear()
    Galleria.run('.g1')
    Galleria.run('.g1')
    assert.equal(Galleria.Collection.size(), 1)
  })

})