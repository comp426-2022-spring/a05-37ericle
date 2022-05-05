// Place your server entry point code here

// Define app using express
const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2));
// Require database SCRIPT file
const logdb = require('./src/services/database')
// Require md5 MODULE
// const md5 = require('md5')
// Make Express use its own built-in body parser for both urlencoded and JSON body data. 
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
// Require morgan
const morgan = require('morgan')
//Require fs
const fs = require('fs')
// Server port
var port = args['port']
// Serve static HTML files
app.use(express.static('./public'));
// Add cors dependency
const cors = require('cors')
app.use(cors())

// Start server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
})

// Create access log file if --log=true
if (args.log=='true') {
  const accesslog = fs.createWriteStream('access.log', {flags: 'a'})
  app.use(morgan('combined', {stream: accesslog}))
}

// Store help text 
const help = (`
server.js [options]

--port	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535.

--debug	If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.

--log		If set to false, no log files are written. Defaults to true.
            Logs are always written to database.

--help	Return this message and exit.
`)
// If --help or -h, echo help text to STDOUT and exit
if (args.help || args.h) {
    console.log(help)
    process.exit(0)
}


