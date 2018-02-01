// var config = require('./config')
// if (!process.env.NODE_ENV) {
//   process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
// }
//

var express = require('express')
var config = require('./config/index')
var proxyMiddleware = require('http-proxy-middleware')
var port = process.env.PORT || config.dev.port
var opn = require('opn')
var path = require('path')
// var express = require('express')
var webpack = require('webpack')
// var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./build/webpack.dev.conf')
// var app = express()
// // var axios = require('axios')
// // var apiRoutes = express.Router();
// // apiRoutes.get('/GetAlbumListByCategory', function (req, res) {
// //   var url = 'https://www.ixigua.com/api/pc/feed/'
// //   axios.get(url, {
// //     headers: {
// //       referer: 'https://www.ixigua.com/',
// //       host: 'www.ixigua.com'
// //     },
// //     params: req.query
// //   }).then((response) => {
// //     res.json(response.data)
// //   }).catch((e) => {
// //     console.log(e)
// //   })
// // })
// //
// // app.use('/api', apiRoutes);
// // default port where dev server listens for incoming traffic
// var port = process.env.PORT || config.dev.port
// // automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// // Define HTTP proxies to your custom API backend
// // https://github.com/chimurai/http-proxy-middleware
// var proxyTable = config.dev.proxyTable
var compiler = webpack(webpackConfig)
//
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})
var app = express()
var uri = 'http://localhost:' + port

var proxyTable = config.dev.proxyTable
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

app.use(express.static('./dist'))
console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
  console.log('页面正在打开中,请稍等...' + '\n')
})
