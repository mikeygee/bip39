# BIP39 Mnemonic Builder

This tool allows you to customize the words of your backup / recovery mnemonic seed phrase for creating a new Bitcoin HD wallet.

## Background

See [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) for a complete reference.

The standard (and most secure) way of producing the mnemonic is to generate a random string of data from 128 to 256 bits, append a checksum, split into 11 bit chunks (2048 possible words), and map to words using each chunk as an index to an array of words.

This tool inverts the process by having the user choose words, and concatenating the indexes together. Since the last part of the data is a checksum, there are limited valid choices for the last word, but all other words can be freely selected.

## How to use

-   Choose between 24, 21, 18, 15, and 12 words
-   Generate a complete random phrase at any time
-   Drop down interface for selecting and searching for individual words
-   The list of valid last words will dynamically update as word selections are made
-   Once all words are selected, a summary is shown which helps visualize the mapping between the data and words. The seed is also shown with an optional passphrase input, which can then be used with [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) for generating a deterministic wallet.

## Motivation

Why might you want to do this? This project was born out of my own curiosity. I was intrigued by the concept of a brain wallet, where Bitcoin is held exclusively in your own memory. In this case, you probably want to construct a phrase that you are more likely to remember long term, maybe based on a quote or passage you know very well. Or if you already have a randomly generated phrase memorized, and you want to create additional wallets, you could start with the same phrase and switch out a few words or change the ordering.

## Disclaimer

Use at your own discretion! It should be pointed out that this method is less secure than using randomly generated mnemonics, but there are always tradeoffs in security. While there's some added risk of an attacker guessing your non random phrase, you also lower the risk of an attacker getting access to your backup, or losing the backup by accident. There is a whole spectrum of considerations, but if you are willing to accept the tradeoffs, having custom mnemonics can add significant convenience. It is another tool to have in a diversified set of wallets.
