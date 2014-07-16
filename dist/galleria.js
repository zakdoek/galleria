/* Galleria 2.0.0 - July 16th 2014 - (c) Aino - MIT Licensed */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Galleria=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var Utils = _dereq_('./src/utils')
var Collection = _dereq_('./src/collection')

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


},{"./src/collection":2,"./src/utils":3}],2:[function(_dereq_,module,exports){

var Utils = _dereq_('./utils')
var instances = []

module.exports = {
  add: function(node) {
    if ( !Utils.isElement(node))
      return log.error(node+' is not a DOM node')
    instances.push( Galleria(node) )
  },
  find: function(node) {
    var found = null
    instances.forEach(function(instance) {
      if ( instance.target === node )
        found = instance
    })
    return found
  },
  get: function() {
    return instances
  },
  clear: function() {
    instances = []
  },
  size: function() {
    return instances.length
  }
}
},{"./utils":3}],3:[function(_dereq_,module,exports){

module.exports = {

  createElement: function( className, nodeName ) {
    nodeName = nodeName || 'div'
    var elem = doc.createElement( nodeName )
    elem.className = className
    return elem
  },
    
  isElement: function( node ) {
    if ( Element && node instanceof Element )
      return true
    return typeof node == 'object' && node.nodeType && node.nodeType === 1
  },
  
  // add inline css
  css: function(elem, styles) {
    for( var prop in styles )
      elem.style[prop] = styles[prop]
  },
  
  // get computed style
  computedStyle: function( elem, prop, getComputedStyle ) {
    getComputedStyle = win.getComputedStyle
    return (
      getComputedStyle ?
        getComputedStyle(elem, null) : elem.currentStyle
    )[
      prop.replace(/-(\w)/gi, function (word, letter) {
        return letter.toUpperCase()
      })
    ]
  },
  
  // extend
  extend: function(o1, o2) {
    for( var i in o2 ) {
      o1[i] = o2[i]
    }
    return o1
  }

}
},{}]},{},[1])
(1)
});