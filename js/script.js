class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.readyToReset = true;
        this.clear()
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.readyToReset = false;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.currentOperand !== '' && this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '÷':
                computation = prev / current
                break
            case '*':
                computation = prev  * current
                break
            case '^':
                computation = Math.pow(prev, current)
                break
            default:
                return;
        }
        if (this.currentOperand.toString().includes('.')) {
            computation = computation.toFixed(10).replace(/0*$/, '')
        }
        this.readyToReset = true;
        this.currentOperand = computation;
        this.previousOperand = '';
        this.operation = undefined;

    }

    getSqrt() {
        if (this.currentOperand.includes('-')) {
            alert('Error: Result of this operation is complex number')
        } else {
            this.currentOperand =  Math.sqrt(this.currentOperand)
        }
    }

    getNeg() {
        let operand = this.currentOperand.toString()
        if (operand.includes('-')) {
            this.currentOperand = operand.replace('-', '')
        } else {
            this.currentOperand = '-' + this.currentOperand
        }
    }

    getFact() {
        let factorial = (n) => {
            if (n === 1) return 1;
            else return n * factorial(n-1)
        }
        this.currentOperand = factorial(this.currentOperand)
    }

    getExp() {
        this.currentOperand = Math.pow(2.718, Number(this.currentOperand))
    }

    getDisplayNumber(number) {
        let parts = number.toString().split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (parts[1] ? '.' + parts[1] : '');

    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                ` ${this.previousOperand} ${this.operation} `
        }
        else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const sqrtButton = document.querySelector('[data-sqrt]')
const negativeButton = document.querySelector('[data-negative]')
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const factButton = document.querySelector('[data-factorial]');
const expButton = document.querySelector('[data-exp]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (calculator.previousOperand === "" &&
        calculator.currentOperand !== "" &&
        calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }

        calculator.appendNumber(button.innerHTML)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerHTML)
        calculator.updateDisplay()
    })
})

sqrtButton.addEventListener('click', () => {
    calculator.getSqrt()
    calculator.updateDisplay()
})

factButton.addEventListener('click', () => {
    calculator.getFact()
    calculator.updateDisplay()
})

expButton.addEventListener('click', () => {
    calculator.getExp()
    calculator.updateDisplay()
})

negativeButton.addEventListener('click', () => {
    calculator.getNeg()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

