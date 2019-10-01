import {
    LENGTH_OPTIONS,
    zeroFill,
    binaryToHex,
    hexToBinary,
    getDetails,
    generateRandomMnemonic,
    getSeed,
    mnemonicFromEntropy,
} from './utils';

import WORDLIST from './wordlists';

global.crypto = {
    getRandomValues: array =>
        array.map(val => Math.floor(Math.random() * Math.pow(2, 32))),
};

// test vectors
const validWords = [
    [
        'main',
        'raccoon',
        'original',
        'consider',
        'vessel',
        'height',
        'degree',
        'drift',
        'grass',
        'stable',
        'bitter',
        'movie',
        'able',
        'claw',
        'buyer',
        'artist',
        'immune',
        'nominee',
        'material',
        'match',
        'fashion',
        'upgrade',
        'arena',
        'asthma',
    ],
    [
        'diet',
        'result',
        'never',
        'maximum',
        'illness',
        'ritual',
        'ivory',
        'daring',
        'pistol',
        'island',
        'curve',
        'decrease',
        'alone',
        'elder',
        'provide',
        'garden',
        'bird',
        'tunnel',
        'unfair',
        'beauty',
        'awesome',
    ],
    [
        'hair',
        'foam',
        'future',
        'banner',
        'seek',
        'any',
        'tragic',
        'message',
        'certain',
        'please',
        'slab',
        'unknown',
        'gospel',
        'pottery',
        'pelican',
        'west',
        'spray',
        'season',
    ],
    [
        'oak',
        'talent',
        'guard',
        'harsh',
        'bridge',
        'volume',
        'rain',
        'biology',
        'glare',
        'fee',
        'upset',
        'expect',
        'pottery',
        'vault',
        'order',
    ],
    [
        'catalog',
        'tribe',
        'smooth',
        'shock',
        'normal',
        'wrap',
        'child',
        'taxi',
        'verb',
        'ten',
        'elevator',
        'pill',
    ],
];
const correctOutput = [
    {
        isCompleted: true,
        entropy: {
            binary:
                '1000011001010110000010100111001010010111101011110011000011010101010011100111001000010110011001011111101001111000010110110100100001110000000001000101010000000111110110000110100001110001101100101011111000100011110001000110010100110101110111010100001011011000',
            hex:
                '86560a7297af30d54e721665fa785b4870045407d86871b2be23c46535dd42d8',
        },
        checksum: {
            firstBits: '01110000',
            hash:
                '7040d5e63e851b68dd061099a1b63c6dff332ae9048f0ac3770aefa637436b72',
            length: 8,
        },
        validLastWords: [
            'asthma',
            'cushion',
            'early',
            'gravity',
            'neutral',
            'ridge',
            'struggle',
            'thing',
        ],
    },
    {
        isCompleted: true,
        entropy: {
            binary:
                '00111101101101101111101001010100010001001011011100010011011101010001110110111001101111001010010101101110110011001101100100011100100100000110111010001110101010110011101011111101000101101001110101010011101101000000100111010001',
            hex: '3db6fa5444b713751db9bca56eccd91c906e8eab3afd169d53b409d1',
        },
        checksum: {
            firstBits: '0000100',
            hash:
                '086e5826c02f7d60cc9670eb7d2321ee46de229a580452294e0447514bb79ce7',
            length: 7,
        },
        validLastWords: [
            'arrest',
            'awesome',
            'column',
            'cup',
            'echo',
            'gain',
            'have',
            'lake',
            'light',
            'normal',
            'pioneer',
            'risk',
            'scare',
            'sustain',
            'unaware',
            'virus',
        ],
    },
    {
        isCompleted: true,
        entropy: {
            binary:
                '011010000100101101000001011110100000100100101100001100000001010001111001101111000101111100100101101101001100111100101011111101101111011001001101010100011110100010010111110010111101001011111000',
            hex: '684b417a092c301479bc5f25b4cf2bf6f64d51e897cbd2f8',
        },
        checksum: {
            firstBits: '010001',
            hash:
                '4410f5505f69c68b8c41eebda3bb5f393d6a634d26b5bed26df36b2cd0d55e01',
            length: 6,
        },
        validLastWords: [
            'alcohol',
            'anxiety',
            'between',
            'butter',
            'cactus',
            'column',
            'cousin',
            'disagree',
            'eight',
            'essay',
            'fiscal',
            'gap',
            'goddess',
            'gym',
            'insane',
            'laptop',
            'lonely',
            'member',
            'now',
            'once',
            'pill',
            'pool',
            'relief',
            'runway',
            'season',
            'skirt',
            'stool',
            'suggest',
            'toward',
            'undo',
            'voyage',
            'width',
        ],
    },
    {
        isCompleted: true,
        entropy: {
            binary:
                '1001011111011011101011011001110100110100101000011011110111101011101011000100000010110011011000101100101010010011101111001010100000101010100011111110001110100111',
            hex: '97dbad9d34a1bdebac40b362ca93bca82a8fe3a7',
        },
        checksum: {
            firstBits: '00001',
            hash:
                '0b1af64fc5423122014a652be5d927b2f17b2707f9b0c105b45bb0a5b64dc743',
            length: 5,
        },
        validLastWords: [
            'absent',
            'airport',
            'anxiety',
            'arrive',
            'bacon',
            'bike',
            'breeze',
            'burden',
            'car',
            'change',
            'cloud',
            'coach',
            'crash',
            'cry',
            'describe',
            'diary',
            'drastic',
            'earth',
            'engage',
            'estate',
            'false',
            'few',
            'fork',
            'fury',
            'girl',
            'grant',
            'hawk',
            'hockey',
            'immense',
            'jacket',
            'jump',
            'lazy',
            'leopard',
            'lunch',
            'media',
            'miracle',
            'mosquito',
            'nurse',
            'oil',
            'order',
            'pattern',
            'picture',
            'pottery',
            'pudding',
            'reason',
            'rescue',
            'ridge',
            'rural',
            'scheme',
            'seven',
            'since',
            'soon',
            'spoil',
            'stand',
            'surprise',
            'tell',
            'tiny',
            'tornado',
            'twin',
            'undo',
            'utility',
            'wash',
            'win',
            'worth',
        ],
    },
    {
        isCompleted: true,
        entropy: {
            binary:
                '00100011111111010000101100110011111000110010100101100011111111000000100111111110111100111111001010011011110111010001111111010010',
            hex: '23fd0b33e32963fc09fef3f29bdd1fd2',
        },
        checksum: {
            firstBits: '0110',
            hash:
                '61d4348323ece8316dcde9870d5c9185a8ce9cc5e365c44b0deee1bc31e0aa9e',
            length: 4,
        },
        validLastWords: [
            'access',
            'actor',
            'aim',
            'alter',
            'answer',
            'argue',
            'army',
            'auto',
            'awkward',
            'banner',
            'better',
            'bitter',
            'blush',
            'bracket',
            'bronze',
            'burger',
            'camera',
            'capital',
            'category',
            'chicken',
            'churn',
            'cloth',
            'clown',
            'congress',
            'couch',
            'crash',
            'crucial',
            'dad',
            'defy',
            'demand',
            'detect',
            'dismiss',
            'divorce',
            'drill',
            'easy',
            'educate',
            'empty',
            'episode',
            'evidence',
            'exercise',
            'fade',
            'faith',
            'feature',
            'fiscal',
            'flip',
            'focus',
            'frown',
            'garage',
            'genre',
            'glimpse',
            'goose',
            'green',
            'hard',
            'hill',
            'hollow',
            'host',
            'ill',
            'improve',
            'inject',
            'invite',
            'job',
            'kitten',
            'lava',
            'leave',
            'limit',
            'long',
            'lumber',
            'mansion',
            'match',
            'medal',
            'minute',
            'morning',
            'move',
            'mystery',
            'neglect',
            'noodle',
            'oblige',
            'once',
            'orchard',
            'own',
            'peace',
            'pear',
            'pill',
            'pledge',
            'powder',
            'print',
            'public',
            'puzzle',
            'random',
            'rebel',
            'refuse',
            'rescue',
            'rhythm',
            'roof',
            'rude',
            'salute',
            'scissors',
            'segment',
            'shell',
            'shoe',
            'size',
            'slab',
            'slot',
            'solar',
            'spend',
            'spoon',
            'stay',
            'style',
            'suggest',
            'surprise',
            'tank',
            'taxi',
            'ticket',
            'tissue',
            'tourist',
            'travel',
            'trial',
            'type',
            'ugly',
            'unlock',
            'vacant',
            'verb',
            'vivid',
            'walk',
            'wedding',
            'whip',
            'wire',
            'yellow',
        ],
    },
];

describe('zeroFill', () => {
    test('no inputs', () => {
        expect(zeroFill()).toBe('');
    });
    test('string only', () => {
        expect(zeroFill('111')).toBe('111');
    });
    test('normal use case', () => {
        expect(zeroFill('111', 6)).toBe('000111');
    });
});

describe('binaryToHex', () => {
    test('no inputs', () => {
        expect(binaryToHex()).toBe('');
    });
    test('small number', () => {
        expect(binaryToHex('0')).toBe('00000000');
        expect(binaryToHex('11')).toBe('00000003');
        expect(binaryToHex('1111')).toBe('0000000f');
    });
    test('large number', () => {
        expect(
            binaryToHex(
                '0000000100100011010001010110011110001001101010111100110111101111'
            )
        ).toBe('0123456789abcdef');
    });
});

describe('hexToBinary', () => {
    test('no inputs', () => {
        expect(hexToBinary()).toBe('');
    });
    test('small number', () => {
        expect(hexToBinary('0')).toBe('00000000000000000000000000000000');
        expect(hexToBinary('1c')).toBe('00000000000000000000000000011100');
        expect(hexToBinary('ffff')).toBe('00000000000000001111111111111111');
    });
    test('large number', () => {
        expect(hexToBinary('0123456789abcdef')).toBe(
            '0000000100100011010001010110011110001001101010111100110111101111'
        );
    });
});

describe('getDetails', () => {
    test('no inputs', () => {
        expect(() => getDetails()).toThrow();
    });
    test('incomplete words', () => {
        expect(getDetails(new Array(24), WORDLIST)).toEqual({
            isCompleted: false,
        });
    });
    test('invalid number of words', () => {
        expect(() => getDetails(['only', 'three', 'words'])).toThrow();
    });
    test('valid words', () => {
        validWords.forEach((words, i) => {
            expect(getDetails(words, WORDLIST)).toEqual(correctOutput[i]);
        });
    });
});

describe('generateRandomMnemonic', () => {
    test('no inputs', () => {
        expect(() => generateRandomMnemonic()).toThrow();
    });
    test('normal inputs', () => {
        LENGTH_OPTIONS.forEach(len => {
            const mnemonic = generateRandomMnemonic(len, WORDLIST);
            expect(mnemonic.length).toBe(len);
            expect(
                getDetails(mnemonic, WORDLIST).validLastWords.indexOf(
                    mnemonic[len - 1]
                )
            ).toBeGreaterThan(-1);
        });
    });
});

describe('getSeed', () => {
    test('no inputs', () => {
        expect(getSeed()).toBe(
            '4ed8d4b17698ddeaa1f1559f152f87b5d472f725ca86d341bd0276f1b61197e21dd5a391f9f5ed7340ff4d4513aab9cce44f9497a5e7ed85fd818876b6eb402e'
        );
    });
    test('mnemonic only', () => {
        expect(getSeed(validWords[0])).toBe(
            '7c49dacf2d7973fd7e4c1c438699fa48a5f9320da33d56b843c2df37b3acd705ffaa59540566cf8d54d3a633c309670f69e984e034080a7d163c8a6dca50d4c8'
        );
    });
    test('mnemonic + passphrase', () => {
        expect(getSeed(validWords[0], 'abc')).toBe(
            '5f21fd27b862b433b767dc118b1954cf2c86a46a5ec410c4aaafd12e5ad1014bfaef465dd73aff013beffcf58edae0c4055c674869f8963fd0867b10b15ef00c'
        );
    });
});

describe('mnemonicFromEntropy', () => {
    test('no inputs', () => {
        expect(() => mnemonicFromEntropy()).toThrow();
    });
    test('normal inputs', () => {
        LENGTH_OPTIONS.forEach(len => {
            const mnemonic = mnemonicFromEntropy('test', len, WORDLIST);
            expect(mnemonic.length).toBe(len);
            expect(
                getDetails(mnemonic, WORDLIST).validLastWords.indexOf(
                    mnemonic[len - 1]
                )
            ).toBeGreaterThan(-1);
        });
    });
});
