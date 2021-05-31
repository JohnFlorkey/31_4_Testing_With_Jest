/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = {};
    this.words.forEach((word, index) => {
      if(!chains[word]) {
        chains[word] = [];
      }
      chains[word].push(this.words[index+1] ? this.words[index+1] : null);
    });
    return chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {

    function getRandomElement(array) {
      // Pick a random element form the array
      return array[Math.floor(Math.random() * array.length)];
    }

    function getRandomKey(obj) {
      // Return randomly select key from the array of keys
      return getRandomElement(Object.keys(obj))
    }

    const wordChain = this.makeChains();    // get a static instance of the word chain
    // console.log(wordChain);
    const wordArray = [];                   // the array that will be returned
    for(let i = 0; i < numWords; i++) {
      if(wordArray.length === 0) {
        wordArray.push(getRandomKey(wordChain));
        // console.log('first word in array: ', wordArray);
      } else {
        const lastWord = wordArray[wordArray.length - 1];
        // console.log(lastWord);
        const chainValue = wordChain[lastWord];
        // console.log(chainValue);
        const selectedWord = getRandomElement(chainValue);
        
        if(!selectedWord) {
          return wordArray.join(' ');
        }
        wordArray.push(selectedWord);
      }
    }

    return wordArray.join(' ');
  }
}

module.exports = { MarkovMachine };