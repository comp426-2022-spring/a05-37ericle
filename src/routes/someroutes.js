// Route (endpoint) definitions go in this directory
app.get('/app/', (req, res) => {
        res.status(200).end('OK')
        res.type('text/plain')
    });

app.get('/app/flip', (req, res) => {
    res.status(200)
    res.type('text/plain')
    res.json({'flip': coinFlip()})
})

app.get('/app/flips/:number', (req, res, next) => {
    const flipsArray = coinFlips(req.params.number)
    const count = countFlips(flipsArray)
    res.status(200).json({'raw': flipsArray, 'summary': count})
})

app.get('/app/flip/call/:guess(heads|tails)/', (req, res, next) => {
    const game = flipACoin(req.params.guess)
    res.status(200).json(game)
})

if (args.debug) {
    app.get('/app/log/access', (req, res) => {
      try {
        const stmt = logdb.prepare('SELECT * FROM accesslog').all()
        res.status(200).json(stmt)
      } catch {
        console.error(e)
      }
  })
    app.get('/app/error', (req, res) => {
      throw new Error('Error test successful.')
    })
  }
