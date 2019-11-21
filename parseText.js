const fs = require('fs')

function isAValidLetter (letter) {
  return (letter.charCodeAt(0) > 64 && letter.charCodeAt(0) < 91) || (letter.charCodeAt(0) > 96 && letter.charCodeAt(0) < 123)

}

function getNextLetter(letter) {
  if (letter === 'z') return 'a'
  if (letter === 'Z') return 'A'

  return String.fromCharCode(parseInt(letter.charCodeAt(0)) + 1)
}

function incrementAlphanumeric(text) {
  return text.split('').map(letter => {
    if(isAValidLetter(letter)) return getNextLetter(letter).toLowerCase()

    return letter
  }).join('')
}

function writeParsedText(text) {
  fs.writeFile('./files/parsed_don.txt', text, function handleError(err) {
    if(err) console.log(error)
  })
}

function readBuffer(fn) {
  fs.readFile('./files/don.txt', function(err, buffer) {
    if (err) {
      throw Error('Error while loaded file', err)
    }
    fn(buffer.toString())
  })
}

// readBuffer(function (text) {
//   writeParsedText(incrementAlphanumeric(text))
// })

// other things

function example(fn) {
  fs.readFile('./files/don.txt', function(err, buffer) {
    if (err) {
      throw Error('Error while loaded file', err)
    }
    console.log(buffer)
  })
}

example()
