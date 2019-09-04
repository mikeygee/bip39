import React from "react"
import styled from "styled-components"

import WordSelector from '../components/WordSelector';

import { colors, breakpoints } from '../styles';

// english only for now, TODO: add other languages
import WORDLIST from '../wordlists';

import shajs from 'sha.js';
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
    margin-left: 8px;
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
    margin: 16px;
    &:hover {
        box-shadow: ${colors.blue} 0 0 0 2px;
    }
    transition-property: box-shadow;
    transition-duration: 0.1s;
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
            lastWordList: []
        };
    }
    handleCountChange = (wordCount) => {
        const { words } = this.state;
        const updatedWords = [...new Array(wordCount)].map((val, i) => words[i]);
        const lastWordList = this.getEligibleFinalWords(updatedWords);
        updatedWords[wordCount - 1] = lastWordList[0];
        this.setState({
            wordCount,
            words: updatedWords,
            lastWordList: this.getEligibleFinalWords(updatedWords)
        });
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
        const { wordCount, wordList } = this.state;
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
        this.setState({
            words,
            lastWordList: this.getEligibleFinalWords(words)
        });
    }
    handleChange = ({ word, index }) => {
        console.log(word, index);
        const { wordCount, words } = this.state;
        const updatedWords = [...new Array(wordCount)].map((val, i) => {
            return (i === index ? word : words[i]);
        });
        const lastWordList = this.getEligibleFinalWords(updatedWords);
        if (index !== (wordCount - 1)) {
            updatedWords[wordCount - 1] = lastWordList[0];
        }
        this.setState({
            words: updatedWords,
            lastWordList
        });
    }
    render() {
        const { words, wordCount, wordList, lastWordList } = this.state;
        const wordSelectors = [];

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
                <Title>BIP39 Mnemonic Seed Phrase Builder</Title>
                <CenteredRow>
                    <WordCount
                        value={wordCount}
                        onChange={this.handleCountChange}
                    />
                    <GenerateButton onClick={this.handleGenerate}>
                        Generate Random
                    </GenerateButton>
                </CenteredRow>
                <FlexRow>
                    {wordSelectors}
                </FlexRow>
            </Container>
        );
    }
}
export default App;
