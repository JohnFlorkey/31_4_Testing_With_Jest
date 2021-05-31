const { MarkovMachine } = require('./markov');

const input = "I do not like them In a house. I do not like them With a mouse. I do not like them Here or there. I do not like them Anywhere. I do not like green eggs and ham. I do not like them, Sam-I-am."
const numWords = 10;

test('returns string primitive', function() {
    const mm = new MarkovMachine(input);
    const text = mm.makeText(numWords);
    expect(typeof(text)).toEqual('string');
})

test('returns requested number of words or less', function() {
    const mm = new MarkovMachine(input);
    const output = mm.makeText(numWords).split(' ');
    expect(output.length).toBeLessThanOrEqual(numWords);
})

test('if fewer than requested words returned, last word returned is the last word in the input', function() {
    const bigWords = 1000;
    const mm = new MarkovMachine(input);
    const output = mm.makeText(bigWords).split(' ');
    expect(output[output.length - 1]).toEqual('Sam-I-am.');
})