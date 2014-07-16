
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