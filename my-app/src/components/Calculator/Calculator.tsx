import { useState } from "react"
import Button from "./Button/Button";
import { disableSymbolButton, isComa, mathFunction } from "./ScoreBoard/FunctionsCalculator";
import ScoreBoard from "./ScoreBoard/ScoreBoard"

//ограничить ввод на целые и дробные
//добавить ресет
//добавить стили

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
const comaButton = {id: 'b10', title: ','};

const mathSymbolButtons = [
    {id: 'b11', title: '+'},
    {id: 'b12', title: '-'},
    {id: 'b13', title: '*'},
    {id: 'b14', title: '/'},
];
const equalButton = {id: 'b15', title: '='};

let tempFirstNumber = '';
let tempSecondNumber = '';
let tempMathSymbol = '';

function Calculator () {

const [result, setResult] = useState<string>('');

const addNumber = (titleOfButton: string) => setResult(result + titleOfButton);
const addComaHandler = () => addNumber(comaButton.title);

const returnEqualHandler = () => {
    setMathSymbol(equalButton.title);
    tempSecondNumber = result;
    const tempResult = mathFunction(tempFirstNumber, tempSecondNumber, tempMathSymbol);
    setResult(tempResult);
}

const [mathSymbol, setMathSymbol] = useState<string>('');

const showMathSymbol = (titleOfButton: string) => {
    setMathSymbol(titleOfButton);
    tempFirstNumber = result;
}

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
            <div key={n.id}>
                <Button
                    title={n.title}
                    onClickFunction={addNumberHandler}
                />
            </div>
        )
})

const eachMathSymbolButton = mathSymbolButtons.map(m => {
    const showMathSymbolHandler = () => showMathSymbol(m.title);
    if (mathSymbol === '') {
        return (
            <div key={m.id}>
                <Button
                    title={m.title}
                    onClickFunction={showMathSymbolHandler}
                />
            </div>
        )
    }
    else {
        return (
            <div key={m.id}>
                <Button
                    title={m.title}
                    onClickFunction={showMathSymbolHandler}
                    disableCase={disableSymbolButton(mathSymbol)}
                />
            </div>
        )
    }
})


return (
    <>
        <div>
            <ScoreBoard
                value={result}
            />
        </div>
        <div>
            <ScoreBoard
                value={mathSymbol}
            />
        </div>
        {/* <div>
            <Button
                title="c"
                onClickFunction={}
            />
        </div> */}
        <div key={comaButton.id}>
                <Button
                    title={comaButton.title}
                    onClickFunction={addComaHandler}
                    disableCase={isComa(result)}
                />
        </div>
        {eachNumberButton}
        {eachMathSymbolButton}
        <div key={equalButton.id}>
                <Button
                    title={equalButton.title}
                    onClickFunction={returnEqualHandler}
                />
        </div>
    </>
)
}

export default Calculator;
