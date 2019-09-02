import React from 'react';
import styled from 'styled-components';
import { FixedSizeList as List } from 'react-window';
import { IoIosCloseCircle } from 'react-icons/io';

const WORDLIST = require('../wordlists/english.json');

const style = {
    red: '#d63230',
    blue: '#0060cb'
};

const Container = styled.div`
    position: relative;
    ul {
        margin: 0;
        padding: 0;
        > li {
            display: flex;
            align-items: center;
            padding: 0 8px;
            cursor: default;
            &.highlighted {
                color: #fff;
                background-color: ${style.blue};
            }
        }
    }
`;

const ClearIcon = styled(IoIosCloseCircle)`
    position: absolute;
    top: 5px;
    right: 0;
    padding: 4px;
    color: #999;
    font-size: 20px;
    cursor: pointer;
`;

const WordInput = styled.input`
    display: block;
    border: 1px solid;
    border-radius: 3px;
    font-size: 16px;
    padding: 8px;
    box-sizing: border-box;
    outline: none;
    width: 100%;
    color: ${props => props.invalid ? style.red : 'inherit'};
`;

const ErrorText = styled.div`
    color: ${style.red};
    font-size: 12px;
    position: absolute;
    width: 100%;
    text-align: center;
`

class WordOption extends React.Component {
    handleClick = () => {
        const { word, onConfirm } = this.props;
        onConfirm && onConfirm(word);
    }

    handleMouseEnter = () => {
        console.log('onHover');
        const { index, onHighlight } = this.props;
        onHighlight && onHighlight(index);
    }

    render() {
        const { word, highlighted, style } = this.props;
        return (
            <li
                onMouseEnter={this.handleMouseEnter}
                onClick={this.handleClick}
                className={highlighted ? 'highlighted' : null}
                style={style}
            >
                {word}
            </li>
        );
    }
}

class WordSelector extends React.Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.listRef = React.createRef();
        this.state = {
            options: WORDLIST || [],
            value: '',
            showOptions: false,
            highlightedOptionIndex: 0,
            invalid: false
        };
    }

    componentDidMount() {
        window.addEventListener('click', this.handleOutsideClick);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleOutsideClick);
    }

    handleOutsideClick = (e) => {
        const { showOptions } = this.state;
        console.log('outsideClick');
        if(showOptions && !this.containerRef.current.contains(e.target)) {
            this.setState({ showOptions: false });
        }
    }

    updateOnChange = (value) => {
        const props = this.props;
        const { onChange } = props;
        const wordList = WORDLIST || [];
        const options = props.options || (!value ? wordList : wordList.filter((word) => word.indexOf(value) === 0));
        const hasOptions = options.length > 0;
        const isExactMatch = options.length === 1 && value.toLowerCase() === options[0];
        this.setState({
            value,
            options, 
            invalid: !hasOptions,
            highlightedOptionIndex: 0,
            showOptions: hasOptions && !isExactMatch
        });
        onChange && onChange({
            word: isExactMatch ? value : null,
            index: isExactMatch ? wordList.indexOf(value) : null
        });
    }

    handleChange = (e) => {
        console.log('onChange', e.target.value);
        this.updateOnChange(e.target.value);
    }
    
    handleClear = (e) => {
        this.updateOnChange('');
    }

    handleFocus = (e) => {
        console.log('focus', e.target.value);
        const { value, options } = this.state;
        const hasOptions = options.length > 0;
        const isExactMatch = options.length === 1 && value.toLowerCase() === options[0];
        this.setState({ showOptions: hasOptions && !isExactMatch });
    }

    handleClick = (e) => {
        const { options, showOptions } = this.state;
        if (!showOptions && options.length > 1) {
            this.handleFocus(e);
        }
    }

    handleKeyDown = (e) => {
        const { key } = e;
        const { options, showOptions, highlightedOptionIndex } = this.state;
        console.log('keypress', key);
        if (!showOptions || options.length === 0) {
            return;
        }
        if (key === 'ArrowDown' && highlightedOptionIndex < options.length - 1) {
            this.setState({ highlightedOptionIndex: highlightedOptionIndex + 1});
        } else if (key === 'ArrowUp' && highlightedOptionIndex > 0) {
            this.setState({ highlightedOptionIndex: highlightedOptionIndex - 1});
        } else if (key === 'Enter') {
            this.handleConfirm(options[highlightedOptionIndex]);
        } else if (key === 'Escape') {
            this.setState({ showOptions: false });
        }
    }

    handleHighlight = (i) => {
        this.setState({ highlightedOptionIndex: i });
    }

    handleConfirm = (word) => {
        const { onChange } = this.props;
        const wordList = WORDLIST || [];
        this.setState({
            value: word,
            options: [word],
            invalid: false,
            highlightedOptionIndex: 0,
            showOptions: false
        });
        onChange && onChange({
            word,
            index: wordList.indexOf(word)
        });
    }

    renderWordOption = ({ data, index, style }) => (
        <WordOption
            style={style}
            word={data[index]}
            index={index}
            highlighted={index === this.state.highlightedOptionIndex}
            onHighlight={this.handleHighlight}
            onConfirm={this.handleConfirm}
        />
    )

    render() {
        const { options, value, showOptions } = this.state;
        const { index } = this.props;
        const hasOptions = options.length > 0;
        const inputName = `word${index}`;

        return (
            <Container ref={this.containerRef}>
                <WordInput
                    type="text"
                    name={inputName}
                    placeholder={`Word ${index}`}
                    autoComplete="off"
                    value={value}
                    invalid={!hasOptions}
                    onChange={this.handleChange}
                    onClick={this.handleClick}
                    onFocus={this.handleFocus}
                    onKeyDown={this.handleKeyDown}
                />
                {
                    value !== '' ? (
                        <ClearIcon onClick={this.handleClear} />
                    ) : null
                }
                {
                    showOptions ? (
                        <List
                            ref={this.listRef}
                            itemData={options}
                            itemCount={options.length}
                            itemSize={26}
                            height={250}
                            width="100%"
                            innerElementType="ul"
                            style={{
                                marginTop: '8px',
                                border: '1px solid',
                                overflowX: 'hidden',
                                position: 'absolute',
                                zIndex: 1,
                                backgroundColor: '#fff'
                            }}
                        >
                            {this.renderWordOption}
                        </List>
                    ) : !hasOptions ? (
                        <ErrorText>Invalid word</ErrorText>
                    ) : null
                }
            </Container>
        );
    }
}

export default WordSelector;