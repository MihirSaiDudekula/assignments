/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
    constructor() {
        this.result = 0;
    }

    add(number) {
        this.result += number;
    }

    subtract(number) {
        this.result -= number;
    }

    multiply(number) {
        this.result *= number;
    }

    divide(number) {
        if (number !== 0) {
            this.result /= number;
        } else {
            throw new Error("Division by zero is not allowed.");
        }
    }

    clear() {
        this.result = 0;
    }

    getResult() {
        return this.result;
    }

    calculate(expression) {
        try {
            // Removing multiple spaces and trimming the expression
            const sanitizedExpression = expression.replace(/\s+/g, ' ').trim();
            
            // Check if the expression contains invalid characters
            if (/[^0-9+\-*/().\s]/.test(sanitizedExpression)) {
                throw new Error("Invalid characters in expression.");
            }

            // Evaluate the sanitized expression
            this.result = eval(sanitizedExpression);
            
            // Check for invalid parentheses
            if (!this.isValidParentheses(sanitizedExpression)) {
                throw new Error("Invalid parentheses in expression.");
            }
        } catch (error) {
            throw new Error(`Invalid expression: ${error.message}`);
        }
    }

    isValidParentheses(expression) {
        const stack = [];
        for (const char of expression) {
            if (char === '(') {
                stack.push(char);
            } else if (char === ')') {
                if (stack.length === 0) {
                    return false;
                }
                stack.pop();
            }
        }
        return stack.length === 0;
    }
}


// Example usage:
// const calculator = new Calculator();
// calculator.add(5);
// calculator.subtract(3);
// calculator.multiply(2);
// calculator.divide(4);
// console.log("Result:", calculator.getResult()); // Output should be 2.5

// calculator.clear();
// calculator.calculate("10 * (2 + 3) - 4 / 2");
// console.log("Result:", calculator.getResult()); // Output should be 48

// calculator.calculate("10 +   2 *    (   6 - (4 + 1) / 2) + 7");
// console.log("Result:", calculator.getResult());

module.exports = Calculator;