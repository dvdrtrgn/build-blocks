const C = console
const http = require('http')
const fs = require('fs')
const httpPort = 9999

http.createServer((req, res) => {
  fs.readFile('index.html', 'utf-8', (err, content) => {
    if (err) {
      C.log('We cannot open "index.html" file.')
    }

    res.writeHead(200, {
      // 'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(httpPort, () => {
  C.log('Server listening on: http://localhost:%s', httpPort)
})
