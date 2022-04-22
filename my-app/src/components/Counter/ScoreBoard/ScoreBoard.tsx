import css from './ScoreBoard.module.css';

export type CounterPropsType = {
    result: number
    maxResult: number
    resetScoreBoard: () => void
}


function ScoreBoard (props: CounterPropsType){

    return (
    <div className={css.counter}>
        <div className={props.result < props.maxResult ? css.result : css.maxResult}>
            {props.result}
        </div>

    </div>
    )
}

export default ScoreBoard;
