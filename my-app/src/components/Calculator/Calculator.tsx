import { useState } from "react"
import Button from "./Button/Button";
import { haveComa, isMaxString, mathFunction, haveEquals, haveMathSymbols, isEmpty } from "./FunctionsCalculator";
import ScoreBoard from "./ScoreBoard/ScoreBoard"
import css from "./Calculator.module.css"

//to do
//добавить ввод с клавиатуры
//добавить навигацию и раскидать компоненты
//обработать ввод "." после получения результата вычисления
//обработать результат вычисления с плавающей точкой
//обрезать 0 вначале у чисел в формуле
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
const resetButton = {id: 'reset', title: 'C'};

let tempFirstNumber = '';
let tempSecondNumber = '';
let tempMathSymbol = '';

function Calculator () {

    const [result, setResult] = useState<string>('');
    const [formula, setFormula] = useState<string>('');

    const addCharToResult = (titleOfButton: string) => {
        if (!isMaxString(result)) {
            setResult(result + titleOfButton);
        }
    };
    const addComaHandler = () => {
        if (isEmpty(result)) {
            addCharToResult(`0${comaButton.title}`);
        }
        else {
            addCharToResult(comaButton.title);
        }
    };

    const returnEqualsHandler = () => {
        tempSecondNumber = result;
        setFormula(`${tempFirstNumber} ${tempMathSymbol} ${tempSecondNumber} ${equalsButton.title}`);
        const tempResult = mathFunction(tempFirstNumber, tempSecondNumber, tempMathSymbol);
        setResult(tempResult);
        tempMathSymbol = '';
    };

    const disableCaseEqualsButton =
        (isEmpty(result) && haveMathSymbols(formula)) ||
        isEmpty(formula) ||
        (!isEmpty(formula) && !isEmpty(result) && tempMathSymbol === '');

    const resetScoreBoardHandler = () => {
        tempFirstNumber = '';
        tempSecondNumber = '';
        tempMathSymbol = '';
        setResult('');
        setFormula('');
    };


    const eachNumberButton = numberButtons.map(n => {
        const addNumberHandler = () => {
            if (haveEquals(formula)){
                setFormula('');
                setResult(n.title);
            }
            else {
                addCharToResult(n.title);
            }
        };
            return (
                <div key={n.id} className={css[`${n.id}`]}>
                    <Button
                        title={n.title}
                        onClickFunction={addNumberHandler}
                    />
                </div>
            )
    });

    const disableCaseSymbolButton =
        (isEmpty(result) && isEmpty(formula)) ||
        (!isEmpty(result) && !isEmpty(formula) && !haveEquals(formula));

    const eachMathSymbolButton = mathSymbolButtons.map(m => {
        const setMathSymbolHandler = () => {
            if (tempMathSymbol === '') {
                tempFirstNumber = result;
                tempMathSymbol = m.title;
                setFormula(`${tempFirstNumber} ${tempMathSymbol}`);
                setResult('');
            }
            else {
                tempMathSymbol = m.title;
                setFormula(`${tempFirstNumber} ${tempMathSymbol}`);
            }
        };
            return (
                <div key={m.id} className={css[`${m.id}`]}>
                    <Button
                        title={m.title}
                        onClickFunction={setMathSymbolHandler}
                        disableCase={disableCaseSymbolButton}
                    />
                </div>
            )
    });

    return (
        <>
            <div className={css.container}>
                <div className={css.formula}>
                    <ScoreBoard
                        value={formula}
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
                            disableCase={haveComa(result)}
                        />
                </div>
                {eachMathSymbolButton}
                <div className={css[`${equalsButton.id}`]}>
                        <Button
                            title={equalsButton.title}
                            onClickFunction={returnEqualsHandler}
                            disableCase={disableCaseEqualsButton}
                        />
                </div>
            </div>
        </>
    )};

export default Calculator;
