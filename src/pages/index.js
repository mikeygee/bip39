import React from "react"
import styled from "styled-components"

import WordSelector from '../components/WordSelector';

import { colors, breakpoints } from '../styles';

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
const ZEROPAD8 = '00000000';
const ZEROPAD32 = '00000000000000000000000000000000';

const WORDLIST = require('../wordlists/english.json');
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
    state = {
        wordCount: 24,
        words: []
    }
    handleCountChange = (wordCount) => {
        this.setState({ wordCount });
    }
    handleGenerate = () => {
        const { wordCount } = this.state;
        const entropyLength = ENTROPY_BITS_MAP[wordCount];
        // js random number limited to 32 bits, so need to concat for larger number
        const randomNumbersRequired = entropyLength / 32;
        let entropy = '';
        let hexEncoded = '';
        for(let i = 0; i < randomNumbersRequired; i++) {
            // generate 32 bit random number
            let rand = crypto.getRandomValues(new Uint32Array(1))[0];
            // convert to binary
            let binary = Number(rand).toString(2);
            let hex = Number(rand).toString(16);
            // left pad 0's
            binary = ZEROPAD32.substr(binary.length) + binary;
            hex = ZEROPAD8.substr(hex.length) + hex;
            entropy += binary;
            hexEncoded += hex;
        }
        console.log('entropy', entropy, entropy.length);
        console.log('hexEncoded', hexEncoded, hexEncoded.length);
        // get checksum (first n bits of sha256 hash to complete 11 bit word indices)
        const hash = shajs('sha256')
            .update(hexEncoded, 'hex')
            .digest('hex');
        console.log('hash', hash, hash.length);
        let checksum = parseInt(hash.substr(0, 2), 16).toString(2);
        checksum = (ZEROPAD8.substr(checksum.length) + checksum).substr(0, wordCount * 11 - entropyLength);
        console.log('checksum', checksum);
        const mnemonic = entropy + checksum;
        console.log('mnemonic', mnemonic);
        // map to words
        const words = [];
        const wordList = WORDLIST || [];
        for (let i = 0; i < wordCount; i++) {
            let binaryIndex = mnemonic.substr(i*11, 11);
            let decimalIndex = parseInt(binaryIndex, 2);
            words.push(wordList[decimalIndex]);
        }
        console.log(words.join(' '));
    }
    render() {
        const { wordCount } = this.state;

        const wordSelectors = [];
        for(let i = 0; i < wordCount; i++) {
            wordSelectors.push(
                <FlexItem key={`word${i}`}>
                    <WordSelector index={i+1} />
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
