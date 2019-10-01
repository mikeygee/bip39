import React from 'react';
import styled from 'styled-components';
import { FixedSizeList as List } from 'react-window';
import { IoIosCloseCircle, IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import cx from 'classnames';

import { colors, breakpoints } from '../styles';

const Container = styled.div`
    position: relative;
    ul {
        margin: 0;
        padding: 0;
        > li {
            display: flex;
            align-items: center;
            cursor: default;
            &.highlighted,
            &:hover {
                background-color: ${colors.bgHover};
            }
            &.selected button {
                color: ${colors.textSelected};
                background-color: ${colors.bgSelected};
            }
            > button {
                border: none;
                outline: none;
                background-color: transparent;
                width: 100%;
                height: 100%;
                text-align: left;
                font-size: 16px;
                padding-left: 10px;
                touch-action: manipulation;
            }
        }
    }
`;

const WordSelect = styled.input`
    display: block;
    border: 1px solid;
    border-radius: 3px;
    font-size: 16px;
    padding: 8px 14px;
    width: 100%;
    cursor: pointer;
    @media (${breakpoints.phone}) {
        font-size: 13px;
        padding: 6px 12px;
    }
`;

const WordIndexLabel = styled.label`
    position: absolute;
    top: -8px;
    left: -8px;
    height: 16px;
    width: 16px;
    font-size: 10px;
    border-radius: 3px;
    background-color: ${colors.bgInverse};
    color: ${colors.textInverse};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SelectOpenIcon = styled(IoIosArrowDown)`
    position: absolute;
    top: 5px;
    right: 0;
    padding: 4px;
    font-size: 20px;
    cursor: pointer;
    @media (${breakpoints.phone}) {
        top: 6px;
        font-size: 13px;
    }
`;

const OptionsContainer = styled.div`
    position: absolute;
    width: 100%;
    z-index: 1;
    margin-top: 2px;
`;

const OptionsOverlay = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background-color: ${colors.bgOverlay};
    display: flex;
    align-items: center;
    justify-content: center;
    > div {
        position: relative;
        width: 60%;
    }
`;

const OverlayLabel = styled.label`
    position: absolute;
    top: -20px;
    display: block;
    background-color: ${colors.bgInverse};
    color: ${colors.textInverse};
    padding: 2px;
    border-radius: 3px;
    width: 60px;
    text-align: center;
`;

const SearchInput = styled.input`
    display: block;
    outline: none;
    width: 100%;
    border: 1px solid ${colors.textSecondary};
    border-width: 1px 1px 0;
    border-radius: 0;
    margin: 0;
    padding: 8px 24px;
    font-size: 12px;
    @media (${breakpoints.tablet}) {
        font-size: 16px;
    }
`; // prevent input zoom on iPhone

const SearchIcon = styled(IoIosSearch)`
    position: absolute;
    top: 8px;
    left: 4px;
    font-size: 16px;
    @media (${breakpoints.tablet}) {
        top: 12px;
    }
`;

const SearchClearIcon = styled(IoIosCloseCircle)`
    position: absolute;
    top: 5px;
    right: 0;
    padding: 4px;
    color: ${colors.textSecondary};
    font-size: 16px;
    cursor: pointer;
`;

const isSmallScreen = () =>
    typeof window !== 'undefined' && window.innerWidth < 420;

class WordOption extends React.Component {
    handleClick = () => {
        const { word, onSelect } = this.props;
        onSelect && onSelect(word);
    };

    handleMouseEnter = () => {
        const { index, onHighlight } = this.props;
        onHighlight && onHighlight(index);
    };

    render() {
        const { word, highlighted, selected, style } = this.props;
        return (
            <li
                role="menuitem"
                onMouseEnter={this.handleMouseEnter}
                className={cx({
                    highlighted,
                    selected,
                })}
                style={style}
            >
                <button onClick={this.handleClick}>{word}</button>
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
        this.optionsRef = React.createRef();
        this.state = {
            options: props.wordList,
            search: '',
            showOptions: false,
            highlightedOptionIndex: null,
        };
    }

    componentDidMount() {
        window.addEventListener('click', this.handleOutsideClick);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleOutsideClick);
    }

    componentDidUpdate(prevProps) {
        const wordList = this.props.wordList;
        if (prevProps.wordList !== wordList) {
            this.setState({
                options: wordList,
            });
        }
    }

    handleOutsideClick = e => {
        const { showOptions } = this.state;
        if (showOptions && !this.containerRef.current.contains(e.target)) {
            this.hideOptions();
        }
    };

    handleOptionsClick = e => {
        if (isSmallScreen() && !this.optionsRef.current.contains(e.target)) {
            this.hideOptions();
        }
    };

    showOptions = e => {
        const { word, wordList } = this.props;
        this.setState(
            {
                showOptions: true,
                highlightedOptionIndex: word ? wordList.indexOf(word) : null,
            },
            this.scrollToSelection
        );
    };

    hideOptions = () => {
        this.setState({
            showOptions: false,
            highlightedOptionIndex: null,
            search: '',
            options: this.props.wordList,
        });
    };

    scrollToSelection = () => {
        const { options } = this.state;
        const { word } = this.props;
        if (!isSmallScreen()) {
            this.searchRef.current.focus();
        }
        if (word) {
            const index = options.indexOf(word);
            this.listRef.current.scrollToItem(index, 'center');
        }
    };

    handleClick = e => {
        const { showOptions } = this.state;
        if (!showOptions) {
            this.showOptions();
        } else {
            this.hideOptions();
        }
    };

    handleSearch = e => {
        const query = e.target.value || '';
        const normalized = query.toLowerCase();
        const { wordList } = this.props;
        this.setState({
            search: query,
            options:
                query === ''
                    ? wordList
                    : wordList
                          .filter(word => word.indexOf(normalized) >= 0)
                          .sort((a, b) => {
                              return (
                                  a.indexOf(normalized) - b.indexOf(normalized)
                              );
                          }),
            highlightedOptionIndex: 0,
        });
        this.listRef.current.scrollToItem(0);
    };

    handleClearSearch = e => {
        e.stopPropagation();
        this.setState(
            {
                search: '',
                options: this.props.wordList,
            },
            this.showOptions
        );
    };

    handleKeyDown = e => {
        const { key, shiftKey, target } = e;
        const { options, showOptions, highlightedOptionIndex } = this.state;
        if (!showOptions && (key === 'Enter' || key === 'ArrowDown')) {
            this.showOptions();
            return;
        }
        if (key === 'ArrowDown') {
            if (highlightedOptionIndex === null) {
                this.setState({ highlightedOptionIndex: 0 });
            } else if (highlightedOptionIndex < options.length - 1) {
                this.setState({
                    highlightedOptionIndex: highlightedOptionIndex + 1,
                });
                this.listRef.current.scrollToItem(highlightedOptionIndex + 1);
            }
        } else if (key === 'ArrowUp' && highlightedOptionIndex > 0) {
            this.setState({
                highlightedOptionIndex: highlightedOptionIndex - 1,
            });
            this.listRef.current.scrollToItem(highlightedOptionIndex - 1);
        } else if (key === 'Enter') {
            const word = options[highlightedOptionIndex];
            if (word) {
                this.handleSelect(word);
            } else {
                this.hideOptions();
                this.selectRef.current.focus();
            }
        } else if (key === 'Escape') {
            this.hideOptions();
            this.selectRef.current.focus();
        } else if (
            key === 'Tab' &&
            ((!shiftKey && target === this.searchRef.current) ||
                (shiftKey && target === this.selectRef.current))
        ) {
            // hide options if tabbing out of component
            this.hideOptions();
        }
    };

    handleHover = i => {
        this.setState({
            highlightedOptionIndex: i,
        });
    };

    handleSelect = selectedWord => {
        const { onChange, wordList, word, index } = this.props;
        this.setState({
            search: '',
            options: wordList,
            highlightedOptionIndex: index,
            showOptions: false,
        });
        if (selectedWord !== word) {
            onChange &&
                onChange({
                    word: selectedWord,
                    index,
                });
        }
    };

    renderWordOption = ({ data, index, style }) => {
        const { highlightedOptionIndex } = this.state;
        const selectedWord = this.props.word;
        const word = data[index];
        return (
            <WordOption
                style={style}
                word={word}
                index={index}
                selected={selectedWord === word}
                highlighted={index === highlightedOptionIndex}
                onHighlight={this.handleHover}
                onSelect={this.handleSelect}
            />
        );
    };

    render() {
        const { options, search, showOptions } = this.state;
        const { index, indexDisplay, word } = this.props;
        const inputName = `word${index}`;
        const isOverlay = isSmallScreen();
        const Options = isOverlay ? OptionsOverlay : OptionsContainer;
        const listHeight = isOverlay ? window.innerHeight * 0.6 : 250;
        const itemHeight = isOverlay ? 32 : 26;
        const offsetStyle = isOverlay
            ? {
                  marginTop: listHeight * -1,
              }
            : null;

        return (
            <Container ref={this.containerRef}>
                <WordSelect
                    ref={this.selectRef}
                    type="text"
                    name={inputName}
                    placeholder={`Word ${indexDisplay}`}
                    autoComplete="off"
                    readOnly={true}
                    value={word}
                    onClick={this.handleClick}
                    onKeyDown={this.handleKeyDown}
                />
                <WordIndexLabel htmlFor={inputName}>
                    {indexDisplay}
                </WordIndexLabel>
                <SelectOpenIcon onClick={this.handleClick} />
                {showOptions ? (
                    <Options onClick={this.handleOptionsClick}>
                        <div ref={this.optionsRef} style={offsetStyle}>
                            {isOverlay ? (
                                <OverlayLabel>Word {indexDisplay}</OverlayLabel>
                            ) : null}
                            <SearchInput
                                ref={this.searchRef}
                                type="text"
                                value={search}
                                onChange={this.handleSearch}
                                onKeyDown={this.handleKeyDown}
                            />
                            <SearchIcon />
                            {search !== '' ? (
                                <SearchClearIcon
                                    onClick={this.handleClearSearch}
                                />
                            ) : null}
                            <List
                                ref={this.listRef}
                                itemData={options}
                                itemCount={options.length}
                                itemSize={itemHeight}
                                height={listHeight}
                                width="100%"
                                innerElementType="ul"
                                style={{
                                    border: '1px solid',
                                    overflowX: 'hidden',
                                    position: 'absolute',
                                    zIndex: 1,
                                    backgroundColor: colors.bgPrimary,
                                }}
                            >
                                {this.renderWordOption}
                            </List>
                        </div>
                    </Options>
                ) : null}
            </Container>
        );
    }
}

export default WordSelector;
