const textElement = document.getElementById('text');

const optionButtonsElement = document.getElementById('option-buttons');
const csrftoken = Cookies.get('csrftoken');
const markComplete = document.getElementById('markComplete');

const data = document.currentScript.dataset;
const level_unP = data.level;
const markComplete_1 = data.markcomplete_1;
// console.log(typeof markComplete_1); TESTING, Since Bools are upper in Python this is a string so we can cast it to a bool or just check it as a string (what I did) 
level =  parseInt(level_unP);
console.log(level);

//on click send a post request to the update level function, handles leveling up the current user
$('#markComplete').on('click', function(e){
    e.preventDefault();
    markComplete.setAttribute('disabled', 'disabled');
    $.ajax({
        type: 'POST',
        url: 'update-level',
        headers: {'X-CSRFToken': csrftoken},
        data: {'level': level},
        success: function(response) {
            console.log(response)
        },
        error: function(error) {
            console.log(error)
            // Handle errors here
        }
    
    });
    setTimeout(() => {

        $.ajax({
            type: 'POST',
            url: 'update_MarkComplete_Game',
            headers: {'X-CSRFToken': csrftoken},
            data: {'markComplete_1': markComplete_1},
            success: function(response) {
                if (markComplete_1.response) {
                    // console.log(markComplete_1) - TESTING
                    markComplete.setAttribute('disabled', 'disabled');
                }
                console.log(response)
            },
            error: function(error) {
                console.log(error)
                // Handle errors here
            }
        
        });

    }, '500');

    

});

if (markComplete_1 == 'True') {
    // console.log(markComplete_1) - TESTING
    markComplete.setAttribute('disabled', 'disabled');
}









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
    {
        id: 21,
        text: 'As you continue your journey, you come across a mystical bridge guarded by a wise old sage. To cross, you must answer a question about time complexity. What is the time complexity of a linear search algorithm?',
        options: [
        {
        text: 'O(1)',
        nextText: 22,
        },
        {
        text: 'O(log n)',
        nextText: 23,
        },
        {
        text: 'O(n)',
        nextText: 24,
        },
        {
        text: 'O(n^2)',
        nextText: 25,
        }
        ]
        },
        {
        id: 22,
        text: 'The sage nods approvingly as you correctly identify the time complexity of constant time. The bridge glows, allowing you to pass as you gain insights into the efficiency of algorithms.',
        options: [
        {
        text: 'Continue your adventure',
        nextText: 26,
        }
        ]
        },
        {
        id: 23,
        text: 'The sage gently corrects you, explaining that a linear search has a time complexity of O(n), not O(log n). He imparts the wisdom of algorithmic complexity and encourages you to remember this lesson.',
        options: [
        {
        text: 'Continue your journey',
        nextText: 26,
        }
        ]
        },
        {
        id: 24,
        text: "The sage smiles as you correctly identify the time complexity of a linear search algorithm. The bridge's enchantment reacts to your knowledge, allowing you to cross and providing you with deeper insights into algorithm behavior.",
        options: [
        {
        text: 'Press on',
        nextText: 26,
        }
        ]
        },
        {
        id: 25,
        text: 'The sage shakes his head gently, informing you that a linear search algorithm does not have a time complexity of O(n^2), but rather O(n). He imparts the importance of understanding algorithmic analysis and its impact on performance.',
        options: [
        {
        text: 'Continue your adventure',
        nextText: 26,
        }
        ]
        },
        {
        id: 26,
        text: 'Your path leads you to a mystical fountain, said to grant insights into data organization. A water nymph appears and challenges you to arrange a set of numbers in ascending order using the bubble sort algorithm. Can you accomplish this task?',
        options: [
        {
        text: 'Of course, I accept!',
        nextText: 27,
        },
        {
        text: "I'm unsure of the approach.",
        nextText: 28,
        }
        ]
        },
        {
        id: 27,
        text: 'With determination, you apply the bubble sort algorithm and arrange the numbers correctly. The water nymph applauds your effort and reveals the significance of sorting algorithms in real-world applications.',
        options: [
        {
        text: 'Continue your journey',
        nextText: 29,
        }
        ]
        },
        {
        id: 28,
        text: 'The water nymph patiently guides you through the steps of the bubble sort algorithm, helping you arrange the numbers in ascending order. She emphasizes the importance of learning sorting techniques for efficient data manipulation.',
        options: [
        {
        text: 'Press on',
        nextText: 29,
        }
        ]
        },
        {
        id: 29,
        text: 'As you venture further, you stumble upon an ancient code chamber. Within, you encounter a mystical tablet inscribed with a recursive algorithm. Can you decipher its message and write the code?',
        options: [
        {
        text: "I'm ready to unravel the mystery!",
        nextText: 30,
        },
        {
        text: 'Recursive algorithms still confuse me.',
        nextText: 31,
        }
        ]
        },
        {
        id: 30,
        text: 'With focus and determination, you decipher the recursive algorithm and successfully transcribe the code. The chamber resonates with approval, and you grasp the power of recursion in problem-solving.',
        options: [
        {
        text: 'Continue your adventure',
        nextText: 32,
        }
        ]
        },
        {
        id: 31,
        text: 'The ancient code chamber provides you with guidance, helping you understand the principles of recursion and how to implement the recursive algorithm. You emerge with newfound confidence in tackling complex problems.',
        options: [
        {
        text: 'Press on',
        nextText: 32,
        }
        ]
        },
        {
        id: 32,
        text: "Your journey takes you to the heart of a digital labyrinth guarded by a virtual sentinel. The sentinel challenges you with a question about binary search trees. What is the property that ensures a binary search tree's left child is smaller and its right child is larger?",
        options: [
        {
        text: 'Max-Heap property',
        nextText: 33,
        },
        {
        text: 'Balanced property',
        nextText: 34,
        },
        {
        text: 'Binary property',
        nextText: 35,
        },
        {
        text: 'BST property',
        nextText: 36,
        }
        ]
        },
        {
        id: 33,
        text: "The virtual sentinel kindly corrects you, explaining that the property ensuring a binary search tree's left child is smaller and its right child is larger is called the ''BST property.'' He shares insights into binary tree structures and their applications.",
        options: [
        {
        text: 'Continue your journey',
        nextText: 37,
        }
        ]
        },
        {
        id: 34,
        text: "With a knowing smile, the virtual sentinel commends your understanding of balanced binary search trees. The labyrinth's path clears, granting you passage as you gain a deeper appreciation for efficient data storage.",
        options: [
        {
        text: 'Press on',
        nextText: 37,
        }
        ]
        },
        {
        id: 35,
        text: "The virtual sentinel gently guides you, explaining that the property you're thinking of is the ''BST property.'' He imparts the importance of accurate terminology and understanding the foundational concepts of data structures.",
        options: [
        {
        text: 'Continue your adventure',
        nextText: 37,
        }
        ]
        },
        {
        id: 36,
        text: 'With a nod of approval, the virtual sentinel acknowledges your knowledge of the binary search tree property. The labyrinth opens up, allowing you to proceed and granting you insights into the versatility of binary trees.',
        options: [
        {
        text: 'Continue your journey',
        nextText: 37,
        }
        ]
        },
        {
        id: 37,
        text: 'As you traverse the digital labyrinth, you encounter a sentient firewall that guards the path ahead. The firewall challenges you to debug a piece of code that has fallen into an infinite loop. Can you break the cycle?',
        options: [
        {
        text: "I'll troubleshoot the code!",
        nextText: 38,
        },
        {
        text: 'Debugging is not my strength.',
        nextText: 39,
        }
        ]
        },
    
    


]


startGame();