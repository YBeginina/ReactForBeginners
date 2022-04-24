
export const isMaxString = (result: string) => {
    let answer: boolean;
    let arrOfNumbers = result.split('').filter(r => r !== '.');
    answer = arrOfNumbers.length === 16;
    return answer;
};

export const haveComa = (result: string) => {
    let arrResult = result.split('');
    return arrResult.includes('.');
};

export const haveEquals = (formula: string) => {
    let arrFormula = formula.split('');
    return arrFormula.includes('=');
};

export const disableSymbolButton = (tempMathSymbol: string) => {
    return tempMathSymbol !== '';
};

export const mathFunction = (tempFirstNumber: string, tempSecondNumber: string, tempMathSymbol: string) => {
    let mathResult: string = '';
    let firstNumber = Number(tempFirstNumber);
    let secondNumber = Number(tempSecondNumber);

    switch (tempMathSymbol) {
        case '+':
            mathResult = String(firstNumber + secondNumber);
            break;
        case '-':
            mathResult = String(firstNumber - secondNumber);
            break;
        case '*':
            mathResult = String(firstNumber * secondNumber);
            break;
        case '/':
            if (secondNumber !== 0) {
                mathResult = String(firstNumber / secondNumber);
            }
            else {
                mathResult = 'Error';
            }
            break;
    }

    return mathResult;
};

