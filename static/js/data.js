/**
 * Question Database
 * Format: { question, options: [4 options], correct: index of correct answer }
 */

export const questionsDB = {
    math: [
        { 
            question: "Two dice are rolled. Probability of sum = 8?", 
            options: ["5/36", "4/36", "3/36", "6/36"], 
            correct: 0 
        },
        { 
            question: "If P(A)=0.3, P(B)=0.5, independent events, P(A∩B)?", 
            options: ["0.15", "0.8", "0.2", "0.1"], 
            correct: 0 
        },
        { 
            question: "Mean of 10, 20, 30, 40?", 
            options: ["20", "25", "30", "35"], 
            correct: 1 
        },
        { 
            question: "Variance measures:", 
            options: ["central tendency", "spread", "symmetry", "correlation"], 
            correct: 1 
        },
        { 
            question: "Standard deviation of constant values?", 
            options: ["1", "0", "∞", "-1"], 
            correct: 1 
        },
        { 
            question: "Probability of tail in fair coin?", 
            options: ["0.25", "0.75", "0.5", "1"], 
            correct: 2 
        },
        { 
            question: "Median of 2, 4, 6, 8, 10?", 
            options: ["4", "6", "8", "5"], 
            correct: 1 
        },
        { 
            question: "Mode is:", 
            options: ["average", "most frequent", "middle", "sum"], 
            correct: 1 
        },
        { 
            question: "Binomial distribution requires:", 
            options: ["dependent trials", "fixed trials", "infinite trials", "unequal probability"], 
            correct: 1 
        },
        { 
            question: "Probability range is:", 
            options: ["0 to 1", "-1 to 1", "0 to ∞", "-∞ to ∞"], 
            correct: 0 
        },
        { 
            question: "Expected value of fair die:", 
            options: ["3", "3.5", "4", "2.5"], 
            correct: 1 
        },
        { 
            question: "If events are mutually exclusive:", 
            options: ["P(A∩B)=1", "P(A∩B)=0", "P(A∩B)=0.5", "none"], 
            correct: 1 
        },
        { 
            question: "Correlation coefficient range:", 
            options: ["0 to 1", "-1 to 1", "-∞ to ∞", "0 to ∞"], 
            correct: 1 
        },
        { 
            question: "Normal distribution is:", 
            options: ["skewed", "uniform", "symmetric", "random"], 
            correct: 2 
        },
        { 
            question: "Z-score measures:", 
            options: ["mean", "deviation", "relative position", "frequency"], 
            correct: 2 
        },
        { 
            question: "Probability of impossible event:", 
            options: ["0", "1", "-1", "0.5"], 
            correct: 0 
        },
        { 
            question: "Sample space means:", 
            options: ["outcomes", "probability", "event", "mean"], 
            correct: 0 
        },
        { 
            question: "If P(A)=1, event is:", 
            options: ["impossible", "certain", "random", "unlikely"], 
            correct: 1 
        },
        { 
            question: "Skewness indicates:", 
            options: ["spread", "symmetry", "mean", "median"], 
            correct: 1 
        },
        { 
            question: "Variance is square of:", 
            options: ["mean", "median", "std deviation", "mode"], 
            correct: 2 
        },
        { 
            question: "Conditional probability formula:", 
            options: ["P(A|B)=P(A∩B)/P(B)", "P(A)+P(B)", "P(A)-P(B)", "P(A)×P(B)"], 
            correct: 0 
        },
        { 
            question: "Law of large numbers:", 
            options: ["variance increases", "mean stabilizes", "randomness increases", "none"], 
            correct: 1 
        },
        { 
            question: "Discrete variable example:", 
            options: ["height", "weight", "number of students", "temperature"], 
            correct: 2 
        },
        { 
            question: "Continuous variable example:", 
            options: ["count", "grade", "weight", "number"], 
            correct: 2 
        },
        { 
            question: "Poisson distribution models:", 
            options: ["continuous", "rare events", "large data", "uniform"], 
            correct: 1 
        }
    ],

    programming: [
        { 
            question: "Which is low-level language?", 
            options: ["Python", "C", "Assembly", "Java"], 
            correct: 2 
        },
        { 
            question: "Time complexity of binary search:", 
            options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], 
            correct: 1 
        },
        { 
            question: "Stack follows:", 
            options: ["FIFO", "LIFO", "Random", "None"], 
            correct: 1 
        },
        { 
            question: "Queue follows:", 
            options: ["LIFO", "FIFO", "Random", "None"], 
            correct: 1 
        },
        { 
            question: "Which is not OOP concept?", 
            options: ["Inheritance", "Encapsulation", "Compilation", "Polymorphism"], 
            correct: 2 
        },
        { 
            question: "C language is:", 
            options: ["interpreted", "compiled", "both", "none"], 
            correct: 1 
        },
        { 
            question: "Pointer stores:", 
            options: ["value", "address", "instruction", "type"], 
            correct: 1 
        },
        { 
            question: "Recursion means:", 
            options: ["loop", "self-calling", "condition", "variable"], 
            correct: 1 
        },
        { 
            question: "Array index starts at:", 
            options: ["1", "0", "-1", "depends"], 
            correct: 1 
        },
        { 
            question: "Which is dynamic memory?", 
            options: ["stack", "heap", "register", "cache"], 
            correct: 1 
        },
        { 
            question: "SQL used for:", 
            options: ["programming", "database", "networking", "OS"], 
            correct: 1 
        },
        { 
            question: "Which is not a data type?", 
            options: ["int", "float", "real", "char"], 
            correct: 2 
        },
        { 
            question: "Compiler does:", 
            options: ["execute", "translate", "debug", "store"], 
            correct: 1 
        },
        { 
            question: "Infinite loop means:", 
            options: ["stops", "never stops", "runs once", "error"], 
            correct: 1 
        },
        { 
            question: "Which is not sorting?", 
            options: ["Bubble", "Merge", "Binary", "Quick"], 
            correct: 2 
        },
        { 
            question: "Binary tree max children:", 
            options: ["1", "2", "3", "∞"], 
            correct: 1 
        },
        { 
            question: "Function returns using:", 
            options: ["break", "return", "exit", "stop"], 
            correct: 1 
        },
        { 
            question: "Python is:", 
            options: ["compiled", "interpreted", "assembly", "binary"], 
            correct: 1 
        },
        { 
            question: "Loop used for repetition:", 
            options: ["if", "for", "switch", "break"], 
            correct: 1 
        },
        { 
            question: "Which is relational operator?", 
            options: ["+", "==", "&&", "="], 
            correct: 1 
        },
        { 
            question: "Boolean values:", 
            options: ["0/1", "true/false", "both", "none"], 
            correct: 2 
        },
        { 
            question: "Heap is used for:", 
            options: ["static memory", "dynamic memory", "registers", "cache"], 
            correct: 1 
        },
        { 
            question: "Debugging means:", 
            options: ["writing code", "fixing errors", "compiling", "executing"], 
            correct: 1 
        },
        { 
            question: "API stands for:", 
            options: ["Application Programming Interface", "Advanced Programming Input", "Applied Program Integration", "None"], 
            correct: 0 
        },
        { 
            question: "OS manages:", 
            options: ["hardware", "software", "both", "none"], 
            correct: 2 
        }
    ],

    iq: [
        { 
            question: "Next: 2, 6, 12, 20, ?", 
            options: ["28", "30", "32", "36"], 
            correct: 1 
        },
        { 
            question: "If 5 machines make 5 items in 5 min, 1 machine makes 1 item in?", 
            options: ["1 min", "5 min", "25 min", "10 min"], 
            correct: 1 
        },
        { 
            question: "Gear ratio affects:", 
            options: ["speed", "color", "weight", "size"], 
            correct: 0 
        },
        { 
            question: "3 resistors equal → parallel reduces:", 
            options: ["current", "resistance", "voltage", "power"], 
            correct: 1 
        },
        { 
            question: "If voltage doubles, current? (Ohm's law)", 
            options: ["halves", "doubles", "same", "zero"], 
            correct: 1 
        },
        { 
            question: "Next: 1, 4, 9, 16, ?", 
            options: ["20", "24", "25", "30"], 
            correct: 2 
        },
        { 
            question: "Bridge supports:", 
            options: ["compression", "tension", "both", "none"], 
            correct: 2 
        },
        { 
            question: "Efficiency = output/input × ?", 
            options: ["1", "100", "10", "0"], 
            correct: 1 
        },
        { 
            question: "Next: 3, 9, 27, ?", 
            options: ["54", "81", "72", "90"], 
            correct: 1 
        },
        { 
            question: "A cube faces count:", 
            options: ["4", "5", "6", "8"], 
            correct: 2 
        },
        { 
            question: "Pressure = Force / ?", 
            options: ["volume", "area", "mass", "time"], 
            correct: 1 
        },
        { 
            question: "Speed = distance / ?", 
            options: ["time", "mass", "force", "area"], 
            correct: 0 
        },
        { 
            question: "Next: 5, 10, 20, 40, ?", 
            options: ["60", "70", "80", "90"], 
            correct: 2 
        },
        { 
            question: "If area doubles, resistance?", 
            options: ["halves", "doubles", "same", "zero"], 
            correct: 0 
        },
        { 
            question: "Mirror reflection reverses:", 
            options: ["up-down", "left-right", "both", "none"], 
            correct: 1 
        },
        { 
            question: "Binary of 5:", 
            options: ["101", "111", "110", "100"], 
            correct: 0 
        },
        { 
            question: "Work = Force × ?", 
            options: ["speed", "distance", "mass", "time"], 
            correct: 1 
        },
        { 
            question: "Next: 7, 14, 28, ?", 
            options: ["42", "56", "49", "60"], 
            correct: 1 
        },
        { 
            question: "A triangle angles sum:", 
            options: ["90°", "180°", "360°", "270°"], 
            correct: 1 
        },
        { 
            question: "If frequency increases, wavelength:", 
            options: ["increases", "decreases", "same", "zero"], 
            correct: 1 
        },
        { 
            question: "Odd one: Volt, Ampere, Ohm, Meter", 
            options: ["Volt", "Ampere", "Ohm", "Meter"], 
            correct: 3 
        },
        { 
            question: "Next: 11, 13, 17, 19, ?", 
            options: ["21", "23", "25", "27"], 
            correct: 1 
        },
        { 
            question: "Heat transfer fastest in:", 
            options: ["solid", "liquid", "gas", "vacuum"], 
            correct: 0 
        },
        { 
            question: "SI unit of power:", 
            options: ["Joule", "Watt", "Newton", "Pascal"], 
            correct: 1 
        },
        { 
            question: "If speed doubles, kinetic energy:", 
            options: ["doubles", "quadruples", "halves", "same"], 
            correct: 1 
        }
    ]
};