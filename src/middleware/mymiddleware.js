// Middleware function definitions go here
app.post('/',(req, res, next) => {
    let logdata = {
      remoteaddr: req.ip,
      remoteuser: req.user,
      time: Date.now(),
      method: req.method,
      url: req.url,
      protocol: req.protocol,
      httpversion: req.httpVersion,
      status: res.statusCode,
      referer: req.headers['referer'],
      useragent: req.headers['user-agent']
  }
    const logger = logdb.prepare('INSERT INTO accesslog (remoteaddr, remoteuser, datetime, method, url, protocol, httpversion, secure, referer, useragent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    const info = logger.run(logdata.remoteaddr, logdata.remoteuser, logdata.time, logdata.method, logdata.url, logdata.protocol, logdata.httpversion, logdata.status, logdata.referer, logdata.useragent)
    next()
  })
  
  app.post('/app/flip/coins', (req, res, next) => {
      const flipsArray = coinFlips(req.body.number)
      const count = countFlips(flipsArray)
      res.status(200).json({'raw': flipsArray, 'summary': count})
  })
  
  app.post('/app/flip/call', (req, res, next) => {
      const game = flipACoin(req.body.guess)
      res.status(200).json(game)
  })
  