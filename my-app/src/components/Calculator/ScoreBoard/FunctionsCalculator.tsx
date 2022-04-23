
export const isComa = (result: string) => {
    let arrResult = result.split('');
    return arrResult.includes(',');
}

export const disableSymbolButton = (mathSymbol: string) => {
    return mathSymbol !== '';
}

//проработать плавающую запятую, чтоб корректно считалось
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
}
