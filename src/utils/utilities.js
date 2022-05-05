// This directory contains general utilities that you can use as helper functions throughout other scripts
function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0) ? "heads" : "tails";
  }
  
  function coinFlips(flips) {
  var output = [];
  for (let i = 0; i < flips; i++) {
    output.push(coinFlip())
  }
  return output;
  }
  
  function countFlips(array) {
    let countArray = [];
    let headsCount = 0;
    let tailsCount = 0;
    var o = new Object();
    array.forEach(function(item) {
      if (item == "heads") {
        headsCount += 1;
      }
      if (item == "tails") {
        tailsCount += 1;
      }
    });
    if (headsCount == 0) {
      o = {tails: tailsCount}
    }
    else if (tailsCount == 0) {
      o = {heads: headsCount}
    }
    else {
      o = {heads: headsCount, tails: tailsCount}
    }
    return o;
  }
  
  function flipACoin(call) {
  let result = "";
  let flip = (Math.floor(Math.random() * 2) == 0) ? "heads" : "tails";
  if (flip == call) {
    result = "win"
  }
  else {
    result = "lose"
  }
  let o = {call: call, flip: flip, result: result}
  return o;
  }  
  
  app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
    res.type('text/plain')
  });