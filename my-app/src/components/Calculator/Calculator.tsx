import { useState } from "react"
import Button from "./Button/Button";
import { disableSymbolButton, isComa } from "./ScoreBoard/FunctionsCalculator";
import ScoreBoard from "./ScoreBoard/ScoreBoard"

const numberButtons = [
    {id: 1, title: '1'},
    {id: 2, title: '2'},
    {id: 3, title: '3'},
    {id: 4, title: '4'},
    {id: 5, title: '5'},
    {id: 6, title: '6'},
    {id: 7, title: '7'},
    {id: 8, title: '8'},
    {id: 9, title: '9'},
    {id: 10, title: '0'}
]
const comaButton = {id: 11, title: ','}

const mathSymbolButtons = [
    {id: 12, title: '+'},
    {id: 13, title: '-'},
    {id: 14, title: '*'},
    {id: 15, title: '/'},
]

function Calculator () {

const [result, setResult] = useState<string>('');

const addNumber = (titleOfButton: string) => setResult(result + titleOfButton);
const addComaHandler = () => addNumber(comaButton.title);

const eachNumberButton = numberButtons.map(n => {
    const addNumberHandler = () => addNumber(n.title);
        return (
            <div key={n.id}>
                <Button
                    title={n.title}
                    onClickFunction={addNumberHandler}
                />
            </div>
        )
})


const [mathSymbol, setMathSymbol] = useState<string>('');

const showMathSymbol = (titleOfButton: string) => setMathSymbol(mathSymbol + titleOfButton);

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
        <div>
            {/* <Button
                title="="
                onClickFunction={}
            /> */}
        </div>
    </>
)
}

export default Calculator;
