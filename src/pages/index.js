import React from "react"
import styled from "styled-components"

import WordSelector from '../components/WordSelector';

import { colors, breakpoints } from '../styles';

// english only for now, TODO: add other languages
import WORDLIST from '../wordlists';

import shajs from 'sha.js';
import pbkdf2 from 'pbkdf2';
const crypto = window.crypto || window.msCrypto;
const ENTROPY_BITS_MAP = {
    '24': 256,
    '21': 224,
    '18': 192,
    '15': 160,
    '12': 128
};

// for left padding 0's
function zeroFill (targetLen = 0, str = '') {
    while (str.length < targetLen) {
        str = '0' + str;
    }
    return str;
}

const COUNT_OPTIONS = [24, 21, 18, 15, 12];

const Container = styled.div`
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    box-sizing: border-box;
    div, input {
        box-sizing: inherit;
    }
    @media (${breakpoints.phone}) {
        font-size: 13px;
    }
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;

const Header = styled.h2`
    font-size: 20px;
    margin-bottom: 4px;
`;

const Subheader = styled.span`
    font-size: 16px;
    font-weight: normal;
    color: ${colors.grayMedium};
    margin-left: 8px;
`;

const CenteredRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

const CountContainer = styled.div`
    display: flex;
    border: 1px solid;
    border-radius: 4px;
    margin: 0 10px;
`;

const RadioGroupLabel = styled.label`
    margin: 8px 0;
`;

const CountLabel = styled.label`
    padding: 8px 16px;
    cursor: pointer;
    border-right: 1px solid;
    &:hover {
        background-color: ${colors.grayLight};
    }
    &.selected {
        color: #fff;
        background-color: ${colors.blue};
    }
    &:first-child {
        border-radius: 4px 0 0 4px;
    }
    &:last-child {
        border-right: none;
        border-radius: 0 4px 4px 0;
    }
`;

const CountRadio = styled.input.attrs(() => ({
    type: 'radio',
    name: 'wordcount'
}))`
    position: absolute;
    opacity: 0;
    cursor: pointer;
`;

const GenerateButton = styled.button`
    padding: 6px 20px;
    background-color: ${colors.blue};
    border: 2px solid ${colors.blue};
    color: #fff;
    border-radius: 18px;
    outline: none;
    cursor: pointer;
    font-size: 14px;
    margin: 10px;
    &:hover {
        box-shadow: ${colors.blue} 0 0 0 2px;
    }
    transition-property: box-shadow;
    transition-duration: 0.1s;
`;

const ResetButton = styled(GenerateButton)`
    background-color: transparent;
    color: ${colors.blue};
`;

const FlexRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 20px;
    @media (${breakpoints.phone}) {
        margin: 8px;
    }
`;

const FlexItem = styled.div`
    flex: 0 0 16.6%;
    padding: 8px;
    @media (${breakpoints.tablet}) {
        flex: 0 0 33.3%;
    }
`;

const DetailsContainer = styled.div`
    margin: 20px;
    input {
        padding: 4px;
        border: 1px solid;
        border-radius: 3px;
        margin: 4px 0;
    }
`;

const WordWithIndex = styled.div`
    display: inline-block;
    border: 1px solid;
    border-radius: 3px;
    padding: 4px;
    margin: 4px;
    margin-left: 0;
    > div > span {
        color: ${colors.grayMedium};
        font-size: 13px;
    }
    > div:last-child {
        font-size: 11px;
    }
`;

const DetailsLabel = styled.span`
    display: block;
    font-weight: bold;
    font-size: 12px;
`;

const LongString = styled.span`
    display: inline-block;
    word-break: break-all;
    padding: 4px;
    margin: 4px 0;
    border: 1px solid;
    border-radius: 3px;
    background-color: ${colors.grayLight};
`;


const WordCount = (props) => {
    const { value, onChange } = props;
    return (
        <CenteredRow>
            <RadioGroupLabel>Word count</RadioGroupLabel>
            <CountContainer>
            {
                COUNT_OPTIONS.map((count) => {
                    const isSelected = value === count;
                    return (
                        <CountLabel
                            key={`wc${count}`}
                            className={isSelected ? 'selected' : null}
                        >
                            <CountRadio
                                key={count}
                                value={count}
                                checked={isSelected}
                                onChange={() => onChange && onChange(count)}
                            />
                            <span>{count}</span>
                        </CountLabel>
                    )
                })
            }
            </CountContainer>
        </CenteredRow>
    );
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wordCount: 24,
            words: new Array(24),
            wordList: WORDLIST,
            lastWordList: [],
            seed: '',
            passphrase: ''
        };
    }
    handleCountChange = (wordCount) => {
        const { words, passphrase } = this.state;
        const updatedWords = [...new Array(wordCount)].map((val, i) => words[i]);
        const lastWordList = this.getEligibleFinalWords(updatedWords);
        updatedWords[wordCount - 1] = lastWordList[0];
        const entropy = this.getEntropy(updatedWords);
        const checksum = this.getChecksum(updatedWords);
        const seed = !checksum ? '' : pbkdf2.pbkdf2Sync(updatedWords.join(' '), 'mnemonic' + (passphrase || ''), 2048, 64, 'sha512').reduce((prev, curr) => prev + zeroFill(2, curr.toString(16)), '');
        this.setState({
            wordCount,
            words: updatedWords,
            lastWordList: this.getEligibleFinalWords(updatedWords),
            entropy,
            checksum,
            seed
        });
    }
    getEntropy = (words = []) => {
        const { wordList } = this.state;
        const wordCount = words.length;
        let selectedWords = words.filter((word) => !!word);
        if (selectedWords.length < wordCount) {
            return {};
        }
        const entropyLength = ENTROPY_BITS_MAP[wordCount];
        const binary = selectedWords.map((word) => {
            const index = wordList.indexOf(word);
            let bin = Number(index).toString(2);
            return zeroFill(11, bin);
        }).join('').slice(0, entropyLength);
        const sliceLen = entropyLength / 32;
        const hex = [...new Array(sliceLen)].map((val, i) => {
            let slice = binary.substr(i * 32, 32);
            slice = parseInt(slice, 2).toString(16);
            return zeroFill(8, slice);
        }).join('');
        console.log({ binary, hex });
        return { binary, hex };
    }
    getChecksum = (words = []) => {
        const { hex } = this.getEntropy(words);
        if (!hex) {
            return;
        }
        const wordCount = words.length;
        const hash = shajs('sha256')
            .update(hex, 'hex')
            .digest('hex');
        let checksum = parseInt(hash.substr(0, 2), 16).toString(2);
        const entropyLength = ENTROPY_BITS_MAP[wordCount];
        const length = wordCount * 11 - entropyLength;
        checksum = zeroFill(8, checksum).substr(0, length);

        console.log({
            hash,
            checksum,
            length
        });
        return {
            hash,
            firstBits: checksum,
            length
        };
    }
    getEligibleFinalWords = (words = []) => {
        const { wordList } = this.state;
        const wordCount = words.length;
        let selectedWords = words.filter((word) => !!word);
        if (selectedWords.length < (wordCount - 1)) {
            return [];
        } else if (selectedWords.length === wordCount) {
            selectedWords = words.slice(0, wordCount - 1);
        }

        const binaryString = selectedWords.map((word) => {
            const index = wordList.indexOf(word);
            let binary = Number(index).toString(2);
            return zeroFill(11, binary);
        }).join('');
        const entropyLength = ENTROPY_BITS_MAP[wordCount];
        const remainingBits = entropyLength - binaryString.length;
        const numWords = Math.pow(2, remainingBits);
        const sliceLen = entropyLength / 32;

        const eligibleWords = [...new Array(numWords)].map((val, i) => {
            let binaryIndex = zeroFill(remainingBits, Number(i).toString(2));
            let binary = binaryString + binaryIndex;
            let hex = [...new Array(sliceLen)].map((val, i) => {
                let slice = binary.substr(i * 32, 32);
                slice = parseInt(slice, 2).toString(16);
                return zeroFill(8, slice);
            }).join('');
            const hash = shajs('sha256')
                .update(hex, 'hex')
                .digest('hex');
            let checksum = parseInt(hash.substr(0, 2), 16).toString(2);
            checksum = zeroFill(8, checksum).substr(0, wordCount * 11 - entropyLength);
            const wordIndex = binaryIndex + checksum;
            return wordList[parseInt(wordIndex, 2)];
        });

        console.log(eligibleWords);
        return eligibleWords;
    }
    handleGenerate = () => {
        const { wordCount, wordList, passphrase } = this.state;
        const entropyLength = ENTROPY_BITS_MAP[wordCount];
        // js random number limited to 32 bits, so need to concat for larger number
        const randomNumbersRequired = entropyLength / 32;
        const randomNumbers = crypto.getRandomValues(new Uint32Array(randomNumbersRequired));
        let entropy = '';
        let hexEncoded = '';

        randomNumbers.forEach((rand) => {
            // convert to binary and hex strings
            let binary = Number(rand).toString(2);
            let hex = Number(rand).toString(16);
            // left pad 0's
            binary = zeroFill(32, binary);
            hex = zeroFill(8, hex);
            entropy += binary;
            hexEncoded += hex;
        });

        console.log('entropy', entropy, entropy.length);
        console.log('hexEncoded', hexEncoded, hexEncoded.length);
        // get checksum (first n bits of sha256 hash to complete 11 bit word indices)
        const hash = shajs('sha256')
            .update(hexEncoded, 'hex')
            .digest('hex');
        console.log('hash', hash, hash.length);
        let checksum = parseInt(hash.substr(0, 2), 16).toString(2);
        checksum = zeroFill(8, checksum).substr(0, wordCount * 11 - entropyLength);
        console.log('checksum', checksum);
        const mnemonic = entropy + checksum;
        console.log('mnemonic', mnemonic);
        // map to words
        const words = [];
        for (let i = 0; i < wordCount; i++) {
            let binaryIndex = mnemonic.substr(i*11, 11);
            let decimalIndex = parseInt(binaryIndex, 2);
            words.push(wordList[decimalIndex]);
        }
        console.log(words.join(' '));
        const seed = pbkdf2.pbkdf2Sync(words.join(' '), 'mnemonic' + (passphrase || ''), 2048, 64, 'sha512').reduce((prev, curr) => prev + zeroFill(2, curr.toString(16)), '');
        this.setState({
            words,
            lastWordList: this.getEligibleFinalWords(words),
            entropy: this.getEntropy(words),
            checksum: this.getChecksum(words),
            seed
        });
    }
    handleReset = () => {
        const { wordCount } = this.state;
        this.setState({
            words: new Array(wordCount),
            lastWordList: [],
            seed: '',
            passphrase: ''
        });
    }
    handleChange = ({ word, index }) => {
        console.log(word, index);
        const { wordCount, words, passphrase } = this.state;
        const updatedWords = [...new Array(wordCount)].map((val, i) => {
            return (i === index ? word : words[i]);
        });
        const lastWordList = this.getEligibleFinalWords(updatedWords);
        if (index !== (wordCount - 1)) {
            updatedWords[wordCount - 1] = lastWordList[0];
        }
        const entropy = this.getEntropy(updatedWords);
        const checksum = this.getChecksum(updatedWords);
        const seed = pbkdf2.pbkdf2Sync(updatedWords.join(' '), 'mnemonic' + (passphrase || ''), 2048, 64, 'sha512').reduce((prev, curr) => prev + zeroFill(2, curr.toString(16)), '');
        console.log('seed', seed);
        this.setState({
            words: updatedWords,
            lastWordList,
            entropy,
            checksum,
            seed
        });
    }
    handlePassphrase = (e) => {
        const passphrase = e.target.value;
        const { words } = this.state;
        const seed = pbkdf2.pbkdf2Sync(words.join(' '), 'mnemonic' + (passphrase || ''), 2048, 64, 'sha512').reduce((prev, curr) => prev + zeroFill(2, curr.toString(16)), '');
        this.setState({
            seed,
            passphrase
        });
    }
    render() {
        const { words, wordCount, wordList, lastWordList, entropy, checksum, seed } = this.state;
        const wordSelectors = [];
        const isCompleted = words.filter((word) => !!word).length === wordCount;
        const entropyBits = ENTROPY_BITS_MAP[wordCount];
        const leftoverBits = entropyBits - (11 * (wordCount - 1));
        const totalBits = entropyBits + (checksum || {}).length;

        for (let i = 0; i < wordCount; i++) {
            let isLastWord = i === (wordCount - 1);
            wordSelectors.push(
                <FlexItem key={`word${i}`}>
                    <WordSelector
                        index={i}
                        indexDisplay={i+1}
                        word={words[i] || ''}
                        wordList={isLastWord ? lastWordList : wordList}
                        disabled={lastWordList.length === 0}
                        onChange={this.handleChange}
                    />
                </FlexItem>
            );
        }

        return (
            <Container>
                <Title>BIP39 Mnemonic Builder</Title>
                <CenteredRow>
                    <WordCount
                        value={wordCount}
                        onChange={this.handleCountChange}
                    />
                    <GenerateButton onClick={this.handleGenerate}>
                        Generate Random
                    </GenerateButton>
                    <ResetButton onClick={this.handleReset}>
                        Reset
                    </ResetButton>
                </CenteredRow>
                <FlexRow>
                    {wordSelectors}
                </FlexRow>
                { isCompleted ? (
                    <DetailsContainer>
                        <Header>
                            Entropy - {entropyBits} bits
                            <Subheader>
                                {wordCount - 1} words &times; 11 bits = {entropyBits - leftoverBits} bits + {leftoverBits} extra bits = {Math.pow(2, leftoverBits)} valid last words
                            </Subheader>
                        </Header>
                        <LongString>{entropy.hex}</LongString>
                        <Header>
                            Checksum - {checksum.length} bits
                            <Subheader>
                                First {checksum.length} bits of SHA-256 hash of entropy
                            </Subheader>
                        </Header>
                        <div>
                            <DetailsLabel>Hash</DetailsLabel>
                            <LongString>{checksum.hash}</LongString>
                        </div>
                        <div>
                            <DetailsLabel>First {checksum.length} bits</DetailsLabel>
                            <LongString>{checksum.firstBits}</LongString>
                        </div>
                        <Header>
                            Result - {totalBits} bits
                            <Subheader>
                                Entropy + checksum = {wordCount} words &times; 11 bits = {totalBits}. Word / index / binary index.
                            </Subheader>
                        </Header>
                        <div>
                        {
                            words.map((word) => {
                                let listIndex = wordList.indexOf(word);
                                let binary = zeroFill(11, listIndex.toString(2));
                                return (
                                    <WordWithIndex>
                                        <div><strong>{word}</strong> <span>{listIndex}</span></div>
                                        <div>{binary}</div>
                                    </WordWithIndex>
                                );
                            })
                        }
                        </div>
                        <Header>
                            Seed - 512 bits
                            <Subheader>PBKDF2 - SHA-512 / 2048 iterations</Subheader>
                        </Header>
                        <div>
                            <DetailsLabel>Optional Passphrase</DetailsLabel>
                            <input
                                type="text" 
                                onChange={this.handlePassphrase}
                            />
                        </div>
                        <LongString>{seed}</LongString>
                    </DetailsContainer>
                ) : null }
            </Container>
        );
    }
}
export default App;
