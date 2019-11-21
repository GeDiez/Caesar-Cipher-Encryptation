const fs = require('fs')
const cuadraSaysThat = ['e', 'a', 'o', 's', 'n', 'r', 'i', 'l', 'd', 'u', 't', 'c', 'm', 'p', 'q', 'y', 'b', 'h', 'v', 'g', 'j', 'f', 'z', 'k', 'w', 'x']

function isAValidLetter (letter) {
  return (letter.charCodeAt(0) > 64 && letter.charCodeAt(0) < 91) || (letter.charCodeAt(0) > 96 && letter.charCodeAt(0) < 123)
}

function lowercaseCharacter(character) {
  return character.toLocaleLowerCase()
}

function updateFrequencyTable(dictionary, letter) {
  if(!isAValidLetter(letter)) return dictionary

  return {
    ...dictionary,
    [letter]: {
      frcuency: dictionary[letter] ? dictionary[letter] + 1 : 1,
    }
  }
}

function generateFrecuenciesOfEveryCharacterTable(text) {
  return text
    .split('')
    .map(lowercaseCharacter)
    .reduce(updateFrequencyTable, {})
}

function sortDictionary(dictionary) {
  return Object.entries(dictionary).sort(function([letter, frecuency], [letter2, frecuency2]) {
    return frecuency < frecuency2 ? 1 : -1
  })
}

function generateEquivalencesTable(dictionary) {
  return dictionary.reduce(function (final, [letter], index) {
    return {...final, [letter]: cuadraSaysThat[index]}
  }, {})
}

function encrypt(dictionary, text) {
  return text.split('').map(function (letter) {
    if(isAValidLetter(letter)){
      return dictionary[letter]
    }

    return letter
  }).join('')
}

function writeEncryptedMessage(encryptedMessage) {
  fs.writeFile('./files/encryptedtMessage.txt', encryptedMessage, function handleError(err) {
    if(err) console.log(error)
  })
}

function readParsedMessage(fn) {
  fs.readFile('./files/parsed_don.txt', function(err, buffer) {
    if (err) {
      throw Error('Error while loaded file', err)
    }

    fn(buffer.toString())
  })
}

readParsedMessage(function name(parsedMessage) {
    const dictionary = generateEquivalencesTable(sortDictionary(generateFrecuenciesOfEveryCharacterTable(parsedMessage)))
    const encryptedMessage = encrypt(dictionary, parsedMessage)

    writeEncryptedMessage(encryptedMessage)
})
