const fs = require('fs')

function isAValidLetter (letter) {
  return (letter > 0x60 && letter < 0x7B) || (letter > 0x40 && letter < 0x5B)
}

function downcaseHexadecimal(letter) {
  return (letter > 0x40 && letter < 0x5B) ? letter + 0x20 : letter
}

function getNextLetter(letter) {
  const downcased = downcaseHexadecimal(letter)

  if (downcased === 0x7A) return 0x61

  return downcased + 0x01
}

function incrementAlphanumeric(buffer) {
  return buffer.map(letter => {
    if(isAValidLetter(letter)) return getNextLetter(letter)

    return letter
  })
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
    fn(buffer)
  })
}

readBuffer(function (text) {
  writeParsedText(incrementAlphanumeric(text))
})
