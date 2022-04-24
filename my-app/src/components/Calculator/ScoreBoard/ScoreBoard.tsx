
export type ScoreBoardPropsType = {
    value: string
};


function ScoreBoard (props: ScoreBoardPropsType) {

return (
    <>
        <div>
            {props.value}
        </div>
    </>
)};

export default ScoreBoard;
