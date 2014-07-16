var Utils = require('./src/utils')
var Collection = require('./src/collection')

var win = this
var doc = this.document
var arrProto = Array.prototype

var log = {
  warning: function(msg) {
    // TOD
  },
  error: function(msg) {
    // TOD
  }
}

var Galleria = function(target, options) {

  if ( !(this instanceof Galleria) )
    return new Galleria(target, options)

  this.options = Utils.extend({
    data: [],
    autoplay: false
  }, options)

  this.target = target || document.body
  
  this.images = []
  this.thumbs = []

  if( !this.options.data || !this.options.data.length ) {
    log.warning('No data found')
    return
  }

  options.data.forEach(function(data) {
    var elem = Utils.createElement('image')
    var thumb = Utils.createElement('thumb')
    this.elems.push(elem)
    this.thumbs.push(thumb)
    target.appendChild(elem)
  }.bind(this))

}

Galleria.run = function(selector, options) {
  var push = function(node) {
    if ( !Collection.find(node) )
      Collection.add(node)
  }
  if ( typeof selector == 'string' )
    arrProto.forEach.call(doc.querySelectorAll(selector), push) // selector
  else if ( selector[0] && Utils.isElement(selector[0]) ) // arrays or collections
    arrProto.forEach.call(selector, push)
  else if ( Utils.isElement(selector) ) // node
    push(selector)
}

module.exports = Galleria

