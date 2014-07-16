
var Utils = require('./utils')
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