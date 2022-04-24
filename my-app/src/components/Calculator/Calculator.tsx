import { useState } from "react"
import Button from "./Button/Button";
import { disableSymbolButton, isComa, isMaxString, mathFunction } from "./FunctionsCalculator";
import ScoreBoard from "./ScoreBoard/ScoreBoard"
import css from "./Calculator.module.css"

//добавить стили
//добавить ввод с клавиатуры
//обработать вывод очень больших и очень маленьких результатов вычислений
//отображать целые с разрядами

const numberButtons = [
    {id: 'b1', title: '1'},
    {id: 'b2', title: '2'},
    {id: 'b3', title: '3'},
    {id: 'b4', title: '4'},
    {id: 'b5', title: '5'},
    {id: 'b6', title: '6'},
    {id: 'b7', title: '7'},
    {id: 'b8', title: '8'},
    {id: 'b9', title: '9'},
    {id: 'b0', title: '0'}
];
const comaButton = {id: 'coma', title: '.'};

const mathSymbolButtons = [
    {id: 'plus', title: '+'},
    {id: 'minus', title: '-'},
    {id: 'timesSign', title: '*'},
    {id: 'divisionSign', title: '/'},
];
const equalsButton = {id: 'equals', title: '='};
const resetButton = {id: 'reset', title: 'c'};

let tempFirstNumber = '';
let tempSecondNumber = '';
let tempMathSymbol = '';

function Calculator () {

const [result, setResult] = useState<string>('');

const addNumber = (titleOfButton: string) => {
    if (!isMaxString(result)) {
        setResult(result + titleOfButton);
    }
};
const addComaHandler = () => addNumber(comaButton.title);

const returnEqualsHandler = () => {
    setMathSymbol(equalsButton.title);
    tempSecondNumber = result;
    const tempResult = mathFunction(tempFirstNumber, tempSecondNumber, tempMathSymbol);
    setResult(tempResult);
};

const resetScoreBoardHandler = () => {
    tempFirstNumber = '';
    tempSecondNumber = '';
    tempMathSymbol = '';
    setResult('');
    setMathSymbol('');
};

const [mathSymbol, setMathSymbol] = useState<string>('');

const showMathSymbol = (titleOfButton: string) => {
    setMathSymbol(titleOfButton);
    tempFirstNumber = result;
};

const eachNumberButton = numberButtons.map(n => {
    const addNumberHandler = () => {
        if (mathSymbol === '') {
            addNumber(n.title);
        }
        else {
            setResult(n.title);
            tempMathSymbol = mathSymbol;
            setMathSymbol('');
        }
    }
        return (
            <div className={css[`${n.id}`]}>
                <Button
                    title={n.title}
                    onClickFunction={addNumberHandler}
                />
            </div>
        )
});

const eachMathSymbolButton = mathSymbolButtons.map(m => {
    const showMathSymbolHandler = () => showMathSymbol(m.title);
    if (mathSymbol === '' || mathSymbol === '=') {
        return (
            <div className={css[`${m.id}`]}>
                <Button
                    title={m.title}
                    onClickFunction={showMathSymbolHandler}
                />
            </div>
        )
    }
    else {
        return (
            <div className={css[`${m.id}`]}>
                <Button
                    title={m.title}
                    onClickFunction={showMathSymbolHandler}
                    disableCase={disableSymbolButton(mathSymbol)}
                />
            </div>
        )
    }
});


return (
    <>
        <div className={css.container}>
            <div className={css.mathSymbol}>
                <ScoreBoard
                    value={mathSymbol}
                />
            </div>
            <div className={css.scoreBoard}>
                <ScoreBoard
                    value={result}
                />
            </div>
            <div className={css[`${resetButton.id}`]}>
                <Button
                    title={resetButton.title}
                    onClickFunction={resetScoreBoardHandler}
                />
            </div>
            {eachNumberButton}
            <div className={css[`${comaButton.id}`]}>
                    <Button
                        title={comaButton.title}
                        onClickFunction={addComaHandler}
                        disableCase={isComa(result)}
                    />
            </div>
            {eachMathSymbolButton}
            <div className={css[`${equalsButton.id}`]}>
                    <Button
                        title={equalsButton.title}
                        onClickFunction={returnEqualsHandler}
                    />
            </div>
        </div>
    </>
)};

export default Calculator;
