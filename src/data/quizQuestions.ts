interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export const quizQuestions: { [key: string]: Question[] } = {
  'python-basics': [
    {
      id: 'py1',
      question: 'Which of the following is the correct way to create a variable in Python?',
      options: ['var x = 5', 'int x = 5', 'x = 5', 'create x = 5'],
      correctAnswer: 2,
      explanation: 'In Python, you simply assign a value to a variable name without declaring its type.'
    },
    {
      id: 'py2',
      question: 'What is the output of print(type(5.0))?',
      options: ['<class \'int\'>', '<class \'float\'>', '<class \'number\'>', '<class \'decimal\'>'],
      correctAnswer: 1,
      explanation: '5.0 is a floating-point number in Python, so its type is float.'
    },
    {
      id: 'py3',
      question: 'Which method is used to add an element to a list in Python?',
      options: ['add()', 'append()', 'insert()', 'push()'],
      correctAnswer: 1,
      explanation: 'The append() method adds an element to the end of a list.'
    },
    {
      id: 'py4',
      question: 'How do you create a comment in Python?',
      options: ['// This is a comment', '/* This is a comment */', '# This is a comment', '-- This is a comment'],
      correctAnswer: 2,
      explanation: 'Python uses # for single-line comments.'
    },
    {
      id: 'py5',
      question: 'What is the correct syntax for a for loop in Python?',
      options: ['for i in range(5):', 'for(i=0; i<5; i++):', 'for i = 1 to 5:', 'foreach i in range(5):'],
      correctAnswer: 0,
      explanation: 'Python uses "for variable in iterable:" syntax.'
    }
  ],
  'javascript-advanced': [
    {
      id: 'js1',
      question: 'What is a closure in JavaScript?',
      options: [
        'A function that has no parameters',
        'A function that has access to variables in its outer scope',
        'A function that returns another function',
        'A function that is immediately invoked'
      ],
      correctAnswer: 1,
      explanation: 'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.'
    },
    {
      id: 'js2',
      question: 'What does "async/await" do in JavaScript?',
      options: [
        'Makes code run faster',
        'Creates multiple threads',
        'Handles asynchronous operations with cleaner syntax',
        'Prevents errors from occurring'
      ],
      correctAnswer: 2,
      explanation: 'async/await provides a cleaner way to write asynchronous code compared to promises and callbacks.'
    },
    {
      id: 'js3',
      question: 'What is the difference between "let" and "var"?',
      options: [
        'No difference',
        'let has block scope, var has function scope',
        'let is faster than var',
        'var is newer than let'
      ],
      correctAnswer: 1,
      explanation: 'let has block scope and is not hoisted like var, which has function scope.'
    }
  ],
  'java-oop': [
    {
      id: 'java1',
      question: 'What is encapsulation in Java?',
      options: [
        'Hiding implementation details from the user',
        'Creating multiple objects',
        'Inheriting from parent class',
        'Overriding methods'
      ],
      correctAnswer: 0,
      explanation: 'Encapsulation is the bundling of data and methods that operate on that data within a single unit, hiding the internal implementation.'
    },
    {
      id: 'java2',
      question: 'Which keyword is used for inheritance in Java?',
      options: ['inherits', 'extends', 'implements', 'super'],
      correctAnswer: 1,
      explanation: 'The "extends" keyword is used to create a subclass that inherits from a parent class.'
    }
  ],
  'cpp-memory': [
    {
      id: 'cpp1',
      question: 'What is the main difference between malloc() and new in C++?',
      options: [
        'No difference',
        'malloc() calls constructors, new does not',
        'new calls constructors, malloc() does not',
        'new is faster than malloc()'
      ],
      correctAnswer: 2,
      explanation: 'new calls the constructor of the object being created, while malloc() only allocates raw memory.'
    }
  ],
  'react-hooks': [
    {
      id: 'react1',
      question: 'When does useEffect run?',
      options: [
        'Only when component mounts',
        'After every render by default',
        'Only when component unmounts',
        'Never automatically'
      ],
      correctAnswer: 1,
      explanation: 'useEffect runs after every render by default, unless you provide a dependency array.'
    }
  ],
  'nodejs-backend': [
    {
      id: 'node1',
      question: 'What is Express.js?',
      options: [
        'A database',
        'A web framework for Node.js',
        'A testing library',
        'A package manager'
      ],
      correctAnswer: 1,
      explanation: 'Express.js is a minimal and flexible Node.js web application framework.'
    }
  ]
};