(function(global, factory) {
  global.jsonp = factory(global)
})(this, function(global) {
  var id = 0
  var container = document.getElementsByTagName('head')[0]
  function jsonp(options = {}) {
    if(!options || !options.url) return
    var url = options.url
    var data = options.data || {}
    var callback = options.callback
    var fnName = 'jsonp'+id++
    data['callback'] = fnName

    var temp = []
    for(var key in data) {
      temp.push(encodeURIComponent(key)+'='+encodeURIComponent(data[key]))
    }
    url = url.indexOf('?') >=0 ? url : url + '?'
    url += temp.join('&')

    var script = document.createElement('script')
    script.src = url
    script.type = 'text/javascript'
    container.appendChild(script)

    global[fnName] = function (res) {
      callback && callback(res)
      container.removeChild(script)
      delete global[fnName]
    }

    script.onerror = function() {
      global[fnName] = function() {
        callback && callback(
          'something error hanppend!'
        )
        container.removeChild(script)
        delete global[fnName]
      }
    }
  }

  return jsonp
})