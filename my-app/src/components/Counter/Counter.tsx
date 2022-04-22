import { useState } from 'react';
import Button from './Button/Button';
import css from './Counter.module.css';
import ScoreBoard from './ScoreBoard/ScoreBoard';

export type CounterPropsType = {
    maxResult: number
}

function Counter (props: CounterPropsType){

    const [result, setResult] = useState<number>(0);

    const plusOne = (result: number) => {
        if (result < props.maxResult) {
          setResult(result + 1);
        }
    }

    const plusOneHandler = () => plusOne(result);

    const resetScoreBoard = () => {
      setResult(0);
    }
    const resetScoreBoardHandler = () => resetScoreBoard();

    const disableAddButton = result === props.maxResult;

    const disableResetButton = result === 0;

    return (
        <div className={css.counter}>
            <ScoreBoard
            result={result}
            resetScoreBoard={resetScoreBoard}
            maxResult={props.maxResult}
            />
            <Button disableCase={disableAddButton} title={'Add'} onClickHandler={plusOneHandler}
            />
            <Button disableCase={disableResetButton} title={'Reset'} onClickHandler={resetScoreBoardHandler}
            />
        </div>
    )
}

export default Counter;
