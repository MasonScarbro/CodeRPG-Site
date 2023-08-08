const textElement = document.getElementById('text');

const optionButtonsElement = document.getElementById('option-buttons');

let state = {};


function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text


    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild) // will remove all children/buttons
    }
    textNode.options.forEach(option => {
        if(showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })

}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)

}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

const textNodes = [
    {
        id: 1,
        text: 'You Wake Up, And are ready to begin your adventure learning new forms of magic and skills that you can use... !?even in the real world!?',
        options: [
            {
                text: 'Lets Go!',
                setState: {Ambition: true},
                nextText: 2,

            },
            {
                text: 'Nah, Im not ready',
                nextText: 1,
            }
            
        ]
    },
    {
        id: 2,
        text: 'You walk out of your house to begin your adventure, You encounter a bandit who tells you that in order to cross you must have at least the knowledge of a basic adventurer, he asks a riddle, "What is... 2+2?"',
        options: [
            {
                text: 'Its 4!',

                nextText: 3,

            },
            {
                text: 'Uhhh.... Idk I might not be ready',
                nextText: 1,
            }
            
        ]
    },
    {
        id: 3,
        text: 'Alright that was too easy, well do you know this famous unsolvable equation 2x = 2 + 8 (this is a fantasy world so this is unsolvable)',
        options: [
            {
                text: 'Its x = 5!',

                nextText: 4,

            },
            {
                text: 'Uhhh.... Idk I might not be ready',
                nextText: 1,
            }
            
        ]
    },
    {
        id: 4,
        text: 'ok, ok but do you know the derivative of x^sin(x) + tan(x)',
        options: [
            {
                text: '5?',
                nextText: 5,

            },
            {
                text: '2sin(x) + cos(x)',
                nextText: 5,
            },
            {
                text: 'Obviously its x^sin(x)(cos(x)ln(x) + sin(x)/x) +sec^2(x)',
                nextText: 5,
            },
            {
                text: 'duh its x^sin(x) + sec^2(x)',
                nextText: 5,
            }
            
        ]
    },
    {
        id: 5,
        text: 'Feeling stupid yet!!!, yea thats part of it I dont know the answer either (option 3 was correct) but thats okay for a newbie you wont get or understand everything and thats fine',
        options: [
            {
                text: 'Your Right Im ready! *throws bandit off ledge*',

                nextText: 6,

            },
            {
                text: 'Your Right Im ready! *walks past bandit*',
                nextText: 6,
            },
            {
                text: 'What!?!? I know everything!!!!!',
                nextText: 1,
            },
            
        ]
    },
    {
        id: 6,
        text: 'As you venture deeper into the enchanted forest, you stumble upon an old wizard who challenges you with a coding puzzle. "To pass, you must solve the Fibonacci sequence! What is the 8th number in the Fibonacci sequence?"',
        options: [
            {
                text: '21',
                nextText: 7,
            },
            {
                text: '34',
                nextText: 7,
            },
            {
                text: '13',
                nextText: 7,
            },
            {
                text: '55',
                nextText: 7,
            }
        ]
    },
    {
        id: 7,
        text: "Impressive! You've solved the puzzle and gained the wizard's respect. He imparts a valuable lesson about recursion in programming. As you continue your journey, you encounter a fork in the road.",
        options: [
            {
                text: 'Take the left path',
                nextText: 8,
            },
            {
                text: 'Take the right path',
                nextText: 9,
            }
        ]
    },
    {
        id: 8,
        text: 'The left path leads you to a castle guarded by a fearsome dragon. The dragon challenges you to demonstrate your knowledge of data structures. What is a "stack"?',
        options: [
            {
                text: 'A linear data structure with Last-In-First-Out (LIFO) behavior.',
                nextText: 10,
            },
            {
                text: 'A circular data structure with First-In-First-Out (FIFO) behavior.',
                nextText: 10,
            },
            {
                text: 'A data structure used to store key-value pairs.',
                nextText: 10,
            },
            {
                text: 'A way to define classes and objects in object-oriented programming.',
                nextText: 10,
            }
        ]
    },
    {
        id: 9,
        text: 'Taking the right path leads you to a mystical library filled with ancient scrolls. A wise librarian challenges you with a coding challenge. "Write a function to check if a number is prime."',
        options: [
            {
                text: 'function isPrime(num) { /* your implementation here */ }',
                nextText: 11,
            },
            {
                text: 'def isPrime(num): # your implementation here',
                nextText: 11,
            },
            {
                text: 'public boolean isPrime(int num) { /* your implementation here */ }',
                nextText: 11,
            },
            {
                text: 'def prime_check(num): # your implementation here',
                nextText: 11,
            }
        ]
    },
    {
        id: 10,
        text: "You've impressed the dragon with your knowledge! It steps aside, allowing you to proceed to the castle\'s treasure room. Among the riches, you find a book with a title that reads, 'Advanced Algorithms and Data Structures'. Your understanding deepens.",
        options: [
            {
                text: 'Continue the adventure',
                nextText: 12,
            }
        ]
    },
    {
        id: 11,
        text: 'Congratulations! You\'ve successfully solved the coding challenge. The librarian rewards you with a scroll containing an algorithm for sorting arrays. Your skills continue to grow as you leave the library and venture onward.',
        options: [
            {
                text: 'Continue the journey',
                nextText: 12,
            }
        ]
    },
    {
        id: 12,
        text: 'As you travel through the vast wilderness, you encounter a group of fellow adventurers. They are stuck trying to debug a piece of code. Can you help them find the error?',
        options: [
            {
                text: 'Sure, let me take a look!',
                nextText: 13,
            },
            {
                text: 'I\'m too busy with my own journey.',
                nextText: 14,
            }
        ]
    },
    {
        id: 13,
        text: 'With your expertise, you identify the bug and help the adventurers get back on track. They express their gratitude and teach you a valuable lesson about the importance of collaboration in coding.',
        options: [
            {
                text: 'Continue your adventure',
                nextText: 15,
            }
        ]
    },
    {
        id: 14,
        text: 'You decide to focus on your own journey for now. As you continue, you reflect on the encounter and realize the significance of being part of a coding community.',
        options: [
            {
                text: 'Press on',
                nextText: 15,
            }
        ]
    },
    {
        id: 15,
        text: 'Your adventure leads you to a mystical coding dojo. Inside, you meet a coding master who challenges you with a complex coding puzzle. Are you ready to test your skills?',
        options: [
            {
                text: 'I\'m up for the challenge!',
                nextText: 16,
            },
            {
                text: 'I\'m not quite prepared yet.',
                nextText: 17,
            }
        ]
    },
    {
        id: 16,
        text: 'With determination, you tackle the coding puzzle and emerge victorious! The coding master commends your efforts and imparts a secret technique for optimizing code performance.',
        options: [
            {
                text: 'Continue the journey',
                nextText: 18,
            }
        ]
    },
    {
        id: 17,
        text: 'You decide to refine your skills further before taking on the challenge. Your journey continues as you explore new territories and learn from every coding experience.',
        options: [
            {
                text: 'Press on',
                nextText: 18,
            }
        ]
    },
    {
        id: 18,
        text: 'Your adventure reaches its climactic moment as you encounter a mysterious artifact. The artifact responds to your touch and presents you with a final coding challenge. Will you accept?',
        options: [
            {
                text: 'I embrace the challenge!',
                nextText: 19,
            },
            {
                text: 'I\'ve come so far, but I must decline.',
                nextText: 20,
            }
        ]
    },
    {
        id: 19,
        text: 'With unwavering determination, you tackle the final coding challenge and unlock the artifact\'s true power. As you stand triumphant, the artifact reveals itself to be a metaphor for your coding journey—a journey of growth, learning, and endless possibilities.',
        options: [
            {
                text: 'Reflect on the journey',
                nextText: 21,
            }
        ]
    },
    {
        id: 20,
        text: 'You take a moment to reflect on your journey and the knowledge you\'ve gained. While you decline the artifact\'s challenge, you know that your adventure is only the beginning of your coding odyssey.',
        options: [
            {
                text: 'Move forward',
                nextText: 21,
            }
        ]
    },
    


]

startGame();