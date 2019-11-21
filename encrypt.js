const fs = require('fs')
// Keychain is a key to encrypt the message, it is treat as a secret_key or password
// const keychain = ['e', 'a', 'o', 's', 'n', 'r', 'i', 'l', 'd', 'u', 't', 'c', 'm', 'p', 'q', 'y', 'b', 'h', 'v', 'g', 'j', 'f', 'z', 'k', 'w', 'x']
// keychain.map(l => l.charCodeAt(0).toString(16))
const keychain = [0x65, 0x61, 0x6f, 0x73, 0x6e, 0x72, 0x69, 0x6c, 0x64, 0x75, 0x74, 0x63, 0x6d, 0x70, 0x71, 0x79, 0x62, 0x68, 0x76, 0x67, 0x6a, 0x66, 0x7a, 0x6b, 0x77, 0x78]

/*
* Dictionary of frecuencies: It allow map letters (in hexadecimal) and their frequency
* key:  value of letter in hexadecimal
* value: how often the letter appears in the buffer read
 */

const dictionary = {
  0x65: {
    frequency: 0
  },
  0x61: {
    frequency: 0
  },
  0x6f: {
    frequency: 0
  },
  0x73: {
    frequency: 0
  },
  0x6e: {
    frequency: 0
  },
  0x72: {
    frequency: 0
  },
  0x69: {
    frequency: 0
  },
  0x6c: {
    frequency: 0
  },
  0x64: {
    frequency: 0
  },
  0x75: {
    frequency: 0
  },
  0x74: {
    frequency: 0
  },
  0x63: {
    frequency: 0
  },
  0x6d: {
    frequency: 0
  },
  0x70: {
    frequency: 0
  },
  0x71: {
    frequency: 0
  },
  0x79: {
    frequency: 0
  },
  0x62: {
    frequency: 0
  },
  0x68: {
    frequency: 0
  },
  0x76: {
    frequency: 0
  },
  0x67: {
    frequency: 0
  },
  0x6a: {
    frequency: 0
  },
  0x66: {
    frequency: 0
  },
  0x7a: {
    frequency: 0
  },
  0x6b: {
    frequency: 0
  },
  0x77: {
    frequency: 0
  },
  0x78: {
    frequency: 0
  },
}

/*
* Validate if a hexadecimal number is beetwen letter 'a' and 'z' in both ways uppercase and downcase
* @param {letter} Number: a number in hexadecimal base
* @return Boolean
 */

function isAValidLetter (letter) {
  return (letter > 0x60 && letter < 0x7B) || (letter > 0x40 && letter < 0x5B)
}

/*
* Return the hexadecimal number for a alphanumeric char given, if receives a 0x41 (letter 'A') then returns a 0x61 (letter 'a')
* @param {letter} Number: a number in hexadecimal base
* @return Boolean
 */

function downcaseHexadecimal(letter) {
  return (letter > 0x40 && letter < 0x5B) ? letter + 0x20 : letter
}

/*
* Take a letter(hexadecimal) then increase the frecuency and returns a new dictionary
* @param {dictionary} Dictionary
* @param {letter} Number: a number in hexadecimal base
* @return Dictionary
 */

function updateFrequencyTable(dictionary, letter) {
  if(!isAValidLetter(letter)) return dictionary

  return {
    ...dictionary,
    [letter]: {
      frequency: dictionary[letter].frequency + 1,
    }
  }
}

function generateFrecuenciesOfEveryCharacterTable(buffer) {
  return buffer.reduce(updateFrequencyTable, dictionary)
}

/*
* Generate an array with hexadecimal numbers sorted by frecuency depending on dictionary passed
* Example: getLettersSortedByFrecuency({0x41: 20, 0x42: 5, 0x43: 10, ...})  // [0x41, 0x43, 0x42, ...]
* @param {dictionary} Dictionary
* @return Array
 */

function getLettersSortedByFrecuency(dictionary) {
  return Object
    .entries(dictionary)
    .sort(function([letter, frecuency], [letter2, frecuency2]) {
      return frecuency < frecuency2 ? 1 : -1
    })
    .map(function([letter]) {
      return letter
    })
}

/*
* Match keychain array with an array of frequencies extracted from in order to encrypt message
* The object returned has the follow structure: { 0x41: 0x61, ... } where 0x41 is the first letter in our array got and 0x61 the first letter for the keychain
* @param {dictionary} Dictionary
* @return Object
 */

function generateEquivalencesTable(dictionary) {
  return dictionary.reduce(function (final, letter, index) {
    return {...final, [letter]: keychain[index]}
  }, {})
}

/*
* Iterate the parsed buffer exchanging letters using the equivalency table
* @param {dictionary} Dictionary
* @param {buffer} Buffer
* @return Buffer
 */

function encrypt(dictionary, buffer) {
  return buffer.map(function (letter) {
    if(isAValidLetter(letter)){
      return dictionary[letter]
    }

    return letter
  })
}

// Utilities for read and write in files

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

    fn(buffer)
  })
}

// Encrypting the awesome quijote

readParsedMessage(function name(parsedMessage) {
    const dictionary = generateEquivalencesTable(getLettersSortedByFrecuency(generateFrecuenciesOfEveryCharacterTable(parsedMessage)))
    const encryptedMessage = encrypt(dictionary, parsedMessage)

    writeEncryptedMessage(encryptedMessage)
})
