# BIP39 Mnemonic Builder

This tool allows you to generate and customize BIP39 mnemonic seed phrases used for creating and/or recovering a Bitcoin deterministic wallet.

## Background

See [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) for a complete reference.

The standard way of producing the mnemonic is to generate a random string of data from 128 to 256 bits, append a checksum, split into 11 bit chunks (2048 possible words), and map to words using each chunk as an index to an array of words.

This tool can generate random mnemonics via the browser's built-in [random number generator](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues), or by accepting an arbitrary string of text, and using the SHA-256 hash as the entropy source.

In addition, this tool allows you to invert the process by choosing individual words, and concatenating the indexes together. Since the last part of the data is a checksum, there are limited valid choices for the last word, but all other words can be freely selected.

## Motiviation

This project was born mostly out of curiosity. I was intrigued by the concept of a [brain wallet](https://en.bitcoin.it/wiki/Brainwallet), where Bitcoin is held exclusively in your own memory. For this case, you want to use a secret code that you won't forget, but is also sufficiently difficult to guess. This led me down the rabbit hole of researching how the phrase is generated, and then building this tool to help visualize how it works. 

It should be pointed out that brain wallets are extremely risky, given the human memory can fail in many ways. They should only be used as a last resort or for small amounts of funds you wouldn't mind losing. It is important to have multiple backups, memorization being one form of backup.

## How to use

-   Choose between 24, 21, 18, 15, and 12 words
-   Generate a complete random phrase at any time
    - The button will use the browser's random number generator
    - The text input will use the SHA-256 hash of whatever you type in (should be something random, or very long)
-   Drop down interface for selecting and searching for individual words
-   The list of valid last words will dynamically update as word selections are made
-   Once all words are selected, a summary is shown which helps visualize the mapping between the data and words. The seed is also shown with an optional passphrase input, which can then be used with [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) for generating a deterministic wallet.

## Technical details

This project was built with the [Gatsby](https://www.gatsbyjs.org) static site generator, including [React](https://reactjs.org) and [Styled Components](https://www.styled-components.com/).

### Running locally

To run the site locally for development or offline usage, [NodeJS](https://nodejs.org/en/download/) is required. Then clone the repository and run the following commands from the project directory:

`npm install`

`npm run develop` for development (hot reloading)

`npm run build` and `npm run serve` for a production build

## Security considerations

Choosing your own mnemonic is less secure than using a randomly generated one. There is a greater chance an attacker can guess your phrase if it is not random. On the flip side, there is also a greater chance of remembering a custom phrase in case you lose your backups by accident. Overall, random is still better, but if you're willing to accept the tradeoffs, a custom mnemonic can be useful. It is another tool to have in the wide spectrum of security systems.
