import React from 'react';
import styled from 'styled-components';
import { FixedSizeList as List } from 'react-window';
import {
    IoIosCloseCircle,
    IoIosArrowDown,
    IoIosSearch
} from 'react-icons/io';
import cx from 'classnames';

import { colors } from '../styles';

const WORDLIST = require('../wordlists/english.json');

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
                background-color: ${colors.grayLight};
            }
            &.selected {
                color: #fff;
                background-color: ${colors.blue};
            }
        }
    }
`;

const SelectOpenIcon = styled(IoIosArrowDown)`
    position: absolute;
    top: 5px;
    right: 0;
    padding: 4px;
    font-size: 20px;
    cursor: pointer;
`;

const WordSelect = styled.input`
    display: block;
    border: 1px solid;
    border-radius: 3px;
    font-size: 16px;
    padding: 8px;
    width: 100%;
    cursor: pointer;
`;

const OptionsContainer = styled.div`
    position: absolute;
    width: 100%;
    z-index: 1;
    margin-top: 2px;
`;

const SearchInput = styled.input`
    display: block;
    outline: none;
    width: 100%;
    border: 1px solid #999;
    border-width: 1px 1px 0;
    padding: 8px;
    padding-left: 24px;
    font-size: 12px;
`;

const SearchIcon = styled(IoIosSearch)`
    position: absolute;
    top: 7px;
    left: 4px;
    font-size: 16px;
`;

const SearchClearIcon = styled(IoIosCloseCircle)`
    position: absolute;
    top: 5px;
    right: 0;
    padding: 4px;
    color: #999;
    font-size: 16px;
    cursor: pointer;
`;

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
        const { word, highlighted, selected, style } = this.props;
        return (
            <li
                onMouseEnter={this.handleMouseEnter}
                onClick={this.handleClick}
                className={cx({
                    highlighted,
                    selected
                })}
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
        this.selectRef = React.createRef();
        this.searchRef = React.createRef();
        this.state = {
            options: WORDLIST || [],
            value: '',
            index: null,
            search: '',
            showOptions: false,
            highlightedOptionIndex: null
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
        if(showOptions && !this.containerRef.current.contains(e.target)) {
            console.log('outsideClick');
            this.hideOptions();
        }
    }

    showOptions = (e) => {
        const { value, index } = this.state;
        this.setState({
            showOptions: true,
            highlightedOptionIndex: value ? index : null
        }, this.scrollToSelection);
    }

    hideOptions = () => {
        this.setState({
            showOptions: false,
            highlightedOptionIndex: null,
            search: '',
            options: WORDLIST || []
        });
    }

    scrollToSelection = () => {
        const { value, options } = this.state;
        this.searchRef.current.focus();
        if (value) {
            const index = options.indexOf(value);
            this.listRef.current.scrollToItem(index, 'center');
        }
    }

    handleClick = (e) => {
        console.log('handle click');
        const { showOptions } = this.state;
        if (!showOptions) {
            this.showOptions();
        } else {
            this.hideOptions();
        }
    }

    handleSearch = (e) => {
        const query = e.target.value;
        const wordList = WORDLIST || [];
        this.setState({
            search: query,
            options: query === '' ? wordList : wordList.filter((word) => word.indexOf(query) === 0),
            highlightedOptionIndex: this.state.highlightedOptionIndex || 0
        }) 
    }

    handleClearSearch = (e) => {
        e.stopPropagation();
        this.setState({
            search: '',
            options: WORDLIST || []
        }, this.showOptions);
    }

    handleKeyDown = (e) => {
        const { key, shiftKey, target } = e;
        const { options, showOptions, highlightedOptionIndex} = this.state;
        console.log('keypress', key);
        if (!showOptions && (key === 'Enter' || key === 'ArrowDown')) {
            this.showOptions();
            return;
        }
        if (key === 'ArrowDown') {
            if (highlightedOptionIndex === null) {
                this.setState({ highlightedOptionIndex: 0 });
            } else if (highlightedOptionIndex < options.length - 1) {
                this.setState({ highlightedOptionIndex: highlightedOptionIndex + 1 });
                this.listRef.current.scrollToItem(highlightedOptionIndex + 1);
            }
        } else if (key === 'ArrowUp' && highlightedOptionIndex > 0) {
            this.setState({ highlightedOptionIndex: highlightedOptionIndex - 1});
            this.listRef.current.scrollToItem(highlightedOptionIndex - 1);
        } else if (key === 'Enter') {
            const word = options[highlightedOptionIndex];
            if (word) {
                this.handleConfirm(word);
            } else {
                this.hideOptions();
                this.selectRef.current.focus();
            }
        } else if (key === 'Escape') {
            this.hideOptions();
            this.selectRef.current.focus();
        }
    }

    handleHover = (i) => {
        this.setState({
            highlightedOptionIndex: i
        });
    }

    handleConfirm = (word) => {
        const { onChange } = this.props;
        const wordList = WORDLIST || [];
        const index = wordList.indexOf(word);
        this.setState({
            value: word,
            index,
            search: '',
            options: wordList,
            highlightedOptionIndex: index,
            showOptions: false
        });
        onChange && onChange({
            word,
            index
        });
    }

    renderWordOption = ({ data, index, style }) => {
        const { highlightedOptionIndex, value } = this.state;
        const word = data[index];
        return (
            <WordOption
                style={style}
                word={word}
                index={index}
                selected={value === word}
                highlighted={index === highlightedOptionIndex}
                onHighlight={this.handleHover}
                onConfirm={this.handleConfirm}
            />
        );
   }

    render() {
        const { options, value, search, showOptions } = this.state;
        const { index } = this.props;
        const inputName = `word${index}`;

        return (
            <Container ref={this.containerRef}>
                <WordSelect
                    ref={this.selectRef}
                    type="text"
                    name={inputName}
                    placeholder={`Word ${index}`}
                    autoComplete="off"
                    readOnly={true}
                    value={value}
                    onClick={this.handleClick}
                    onKeyDown={this.handleKeyDown}
                />
                <SelectOpenIcon />
                {
                    showOptions ? (
                        <OptionsContainer>
                            <SearchInput
                                ref={this.searchRef}
                                type="text"
                                value={search}
                                onChange={this.handleSearch}
                                onKeyDown={this.handleKeyDown}
                            /> 
                            <SearchIcon />
                            {
                                search !== '' ? (
                                    <SearchClearIcon onClick={this.handleClearSearch} />
                                ) : null
                            }
                            <List
                                ref={this.listRef}
                                itemData={options}
                                itemCount={options.length}
                                itemSize={26}
                                height={250}
                                width="100%"
                                innerElementType="ul"
                                style={{
                                    border: '1px solid',
                                    overflowX: 'hidden',
                                    position: 'absolute',
                                    zIndex: 1,
                                    backgroundColor: '#fff'
                                }}
                            >
                                {this.renderWordOption}
                            </List>
                        </OptionsContainer>
                    ) : null
                }
            </Container>
        );
    }
}

export default WordSelector;