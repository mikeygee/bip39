import shajs from 'sha.js';
import pbkdf2 from 'pbkdf2';

export const ENTROPY_BITS_MAP = {
    '24': 256,
    '21': 224,
    '18': 192,
    '15': 160,
    '12': 128,
};

export const LENGTH_OPTIONS = [24, 21, 18, 15, 12];

export function zeroFill(str = '', targetLen = 0) {
    while (str.length < targetLen) {
        str = '0' + str;
    }
    return str;
}

/**
 * Converts binary strings to hex strings in 32 bit chunks. Only works with strings with length divisible by 32 for this specific use case.
 *
 * @param {string} binaryString - string of length divisible by 32, consisting of 0's and 1's
 * @return {string} - string encoded as hexidecimal
 *
 */
export function binaryToHex(binaryString = '') {
    const chunks = binaryString.match(/.{1,32}/g) || []; // split into array of 32 bit chunks
    return chunks
        .map(chunk => zeroFill(parseInt(chunk, 2).toString(16), 8))
        .join('');
}

/**
 * Converts hex strings to binary strings in 32 bit chunks. Only works with strings with length divisible by 8 for this specific use case.
 *
 * @param {string} hexString - string of length divisible by 8, consisting of valid hex characters [0-9a-f]
 * @return {string} - string encoded as binary
 *
 */
export function hexToBinary(hexString = '') {
    const chunks = hexString.match(/.{1,8}/g) || []; // split into array of 32 bit chunks
    return chunks
        .map(chunk => zeroFill(parseInt(chunk, 16).toString(2), 32))
        .join('');
}

/**
 * Maps word selections back to raw data, and determines valid last words (due to them being based on a checksum)
 *
 * @param {string[]} words - Array of words, must have length of desired mnemonic
 * @param {string[]} wordList - BIP 39 wordlist, 2048 words to choose from
 * @return {{ isCompleted: boolean, entropy: { binary: string, hex: string }, checksum: { hash: string, firstBits: string, length: number }, validLastWords: string[]}} isCompleted: no empty or falsy values in the words array, entropy: binary and hex encodings of concatenated word indexes, checksum: SHA-256 hash of entropy, validLastWords: given n-1 words, a list of words that are valid for the last word
 *
 */
export function getDetails(words = [], wordList = []) {
    const mnemonicLength = words.length;
    const selectedWords = words.filter(word => !!word);
    const selectedLength = selectedWords.length;
    const isCompleted = mnemonicLength === selectedLength;

    if (selectedLength < mnemonicLength - 1) {
        return {
            isCompleted,
        };
    }

    const entropyLength = ENTROPY_BITS_MAP[mnemonicLength];
    if (!entropyLength) {
        throw new Error(
            'Invalid words array. Must be one of the following lengths: ' +
                LENGTH_OPTIONS.join()
        );
    }
    const extraBits = entropyLength - 11 * (mnemonicLength - 1);
    const checksumLength = mnemonicLength * 11 - entropyLength;
    const validLastWordCount = Math.pow(2, extraBits);

    const binaryIndexes = selectedWords.map(word => {
        const index = wordList.indexOf(word);
        return zeroFill(index.toString(2), 11);
    });
    const binaryString = binaryIndexes.join('');
    const binaryStringWithoutLastWord = binaryString.substr(
        0,
        entropyLength - extraBits
    );
    const entropyBinary = binaryString.substr(0, entropyLength);
    const entropy = isCompleted
        ? {
              binary: entropyBinary,
              hex: binaryToHex(entropyBinary),
          }
        : {};
    const checksum = isCompleted
        ? {
              hash: shajs('sha256')
                  .update(binaryToHex(entropyBinary), 'hex')
                  .digest('hex'),
              firstBits: binaryString.substr(entropyLength, checksumLength),
              length: checksumLength,
          }
        : {};

    const validLastWords = [...new Array(validLastWordCount)].map((val, i) => {
        const binaryIndex = zeroFill(Number(i).toString(2), extraBits);
        const hex = binaryToHex(binaryStringWithoutLastWord + binaryIndex);
        const hash = shajs('sha256')
            .update(hex, 'hex')
            .digest('hex');
        const checksum = zeroFill(
            parseInt(hash.substr(0, 2), 16).toString(2),
            8
        ).substr(0, checksumLength);
        const wordIndex = binaryIndex + checksum;
        return wordList[parseInt(wordIndex, 2)];
    });

    return {
        isCompleted,
        entropy,
        checksum,
        validLastWords,
    };
}

/**
 * Converts arbitrary utf8 encoded string into a mnemonic by using the SHA256 hash of the string as the entropy. If chosen mnemonic length is less than 24, use the first n bits, where n is the entropy length in bits.
 *
 * @param {string} entropy - utf8 string
 * @param {number} length - desired mnemonic length in words
 * @param {string[]} wordList - BIP 39 wordlist, 2048 words to choose from
 * @return {string[]} - mnemonic as an array of words
 *
 */
export function mnemonicFromEntropy(entropy = '', length = 24, wordList = []) {
    if (wordList.length === 0) {
        throw new Error('Array of 2048 words is required');
    }
    const entropyLength = ENTROPY_BITS_MAP[length];
    const checksumLength = length * 11 - entropyLength;

    let entropyHash = shajs('sha256')
        .update(entropy, 'utf8')
        .digest('hex');
    let binary = hexToBinary(entropyHash);

    if (length < 24) {
        binary = binary.substr(0, entropyLength);
        entropyHash = binaryToHex(binary);
    }

    // get checksum (first n bits of sha256 hash to complete 11 bit word indexes)
    const checksumHash = shajs('sha256')
        .update(entropyHash, 'hex')
        .digest('hex');
    const checksum = zeroFill(
        parseInt(checksumHash.substr(0, 2), 16).toString(2),
        8
    ).substr(0, checksumLength);
    const result = binary + checksum;
    // map to words
    const words = [];
    for (let i = 0; i < length; i++) {
        let binaryIndex = result.substr(i * 11, 11);
        let decimalIndex = parseInt(binaryIndex, 2);
        words.push(wordList[decimalIndex]);
    }
    return words;
}

export function generateRandomMnemonic(length = 24, wordList = []) {
    if (wordList.length === 0) {
        throw new Error('Array of 2048 words is required');
    }
    const crypto = window.crypto || window.msCrypto;
    const entropyLength = ENTROPY_BITS_MAP[length];
    const checksumLength = length * 11 - entropyLength;
    // js random number limited to 32 bits, so need to concat for larger number
    const randomNumbersRequired = entropyLength / 32;
    const randomNumbers = crypto.getRandomValues(
        new Uint32Array(randomNumbersRequired)
    );
    let entropy = '';
    let hexEncoded = '';

    randomNumbers.forEach(rand => {
        // convert to binary and hex strings
        let binary = rand.toString(2);
        let hex = rand.toString(16);
        // left pad 0's
        binary = zeroFill(binary, 32);
        hex = zeroFill(hex, 8);
        entropy += binary;
        hexEncoded += hex;
    });

    // get checksum (first n bits of sha256 hash to complete 11 bit word indexes)
    const hash = shajs('sha256')
        .update(hexEncoded, 'hex')
        .digest('hex');
    const checksum = zeroFill(
        parseInt(hash.substr(0, 2), 16).toString(2),
        8
    ).substr(0, checksumLength);
    const result = entropy + checksum;
    // map to words
    const words = [];
    for (let i = 0; i < length; i++) {
        let binaryIndex = result.substr(i * 11, 11);
        let decimalIndex = parseInt(binaryIndex, 2);
        words.push(wordList[decimalIndex]);
    }
    return words;
}

export function getSeed(words = [], passphrase = '') {
    return pbkdf2
        .pbkdf2Sync(
            words.join(' '),
            'mnemonic' + (passphrase || ''),
            2048,
            64,
            'sha512'
        )
        .reduce((prev, curr) => prev + zeroFill(curr.toString(16), 2), '');
}
