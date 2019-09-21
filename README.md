# BIP39 Mnemonic Builder

This tool allows you to customize the words of the BIP39 mnemonic seed phrase used for creating or recovering a Bitcoin deterministic wallet.

## Background

See [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) for a complete reference.

The standard (and most secure) way of producing the mnemonic is to generate a random string of data from 128 to 256 bits, append a checksum, split into 11 bit chunks (2048 possible words), and map to words using each chunk as an index to an array of words.

This tool inverts the process by having the user choose words, and concatenating the indexes together. Since the last part of the data is a checksum, there are limited valid choices for the last word, but all other words can be freely selected.

## Motivation

Why might you want to do this? This project was born out of my own curiosity. I was intrigued by the concept of a [brain wallet](https://en.bitcoin.it/wiki/Brainwallet), where Bitcoin is held exclusively in your own memory. For this case, you might want to construct a phrase that you are likely to remember long term, maybe based on a quote or passage you know by heart. Or if you already have a randomly generated phrase memorized, and you want to create additional wallets (e.g. a multisig setup), you could start with the same phrase and switch out a few words or change the ordering. Or maybe you just want to have some fun with words. In any case, it led me down the rabbit hole of researching how the phrase is generated and then building this tool.

It should be pointed out that brain wallets are extremely risky, given the human memory can fail in many ways. They should only be used as a last resort or for small amounts of funds you wouldn't mind losing. It is important to have multiple backups, memorization being one form of backup.

## How to use

-   Choose between 24, 21, 18, 15, and 12 words
-   Generate a complete random phrase at any time
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

Choosing your own words is less secure than using a randomly generated mnemonic. There is a greater chance an attacker can guess your phrase if it is not random. On the flip side, there is also a greater chance of remembering a custom phrase in case you lose your backups by accident. Overall, random is still better, but if you're willing to accept the tradeoffs, a custom mnemonic can be useful. It is another tool to have in the wide spectrum of security systems.
