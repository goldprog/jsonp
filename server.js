const http = require('http')
const url = require('url')

const data = {
  code: 100,
  data: {
    say_info: 'hello world'
  },
  message: 'success'
}

http.createServer((req, res) => {
  const params = url.parse(req.url, true)
  if(params.query.callback) {
    var str = params.query.callback+'('+JSON.stringify(data)+')'
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.end(str)
  } else {
    res.end()
  }
}).listen(3333, function() {
  console.log('server is running')
})