import css from './Button.module.css';
export type ButtonPropsType = {
    title: string
    onClickFunction: () => void
    onPressFunction?: () => void
    disableCase?: boolean
};

function Button (props: ButtonPropsType) {

return (
    <>
        <button className={css.button}
        disabled={props.disableCase}
        onKeyPress={props.onPressFunction}
        onClick={props.onClickFunction}
        >{props.title}</button>
    </>
)};

export default Button;
