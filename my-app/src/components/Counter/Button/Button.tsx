import css from './Button.module.css';

export type ButtonPropsType = {
    title: string
    disableCase: boolean
    onClickHandler: () => void
}

function Button (props: ButtonPropsType){


    return (
        <>
            <button className={css.button}
            disabled={props.disableCase}
            onClick={props.onClickHandler}>{props.title}</button>
        </>
    )
}

export default Button;
