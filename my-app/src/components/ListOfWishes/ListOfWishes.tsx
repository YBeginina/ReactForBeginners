import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from '../../App';
import { getFilteredWishesForRender, addCssForFilter } from './FunctionsForListOfWishes';
import css from './ListOfWishes.module.css';

export type WishesType = {
    id: string
    wishTitle: string
    isDone: boolean
}

export type ArrOfWishesPropsType = {
    title: string
    wishes: WishesType[]
    filter: FilterValuesType
    removeWish: (wishId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    checkWishStatus: (wishId: string, isDone: boolean) => void
    addWish: (title: string) => void
}

function ListOfWishes(props:ArrOfWishesPropsType){
    //Hook for input for new wishes
    const [title, setTitle] = useState<string>('');

    const onChangeSetTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onClickAddWish = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
        props.addWish(trimmedTitle);
        }
        setTitle('');
    }

    const onPressEnterAddWish = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddWish();
        }
    }

    const filterWishHandler = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter);
    }

    const wishesForRender: WishesType[] = getFilteredWishesForRender(props.wishes, props.filter);

    const eachWish = wishesForRender.length ?
    wishesForRender.map(w => {
        const removeWishHandler = () => props.removeWish(w.id);
        const checkWishHandler = (e: ChangeEvent<HTMLInputElement>) => props.checkWishStatus(w.id, e.currentTarget.checked)
        return (
            <li className={css.wish} key={w.id}>
                <input type="checkbox" checked={w.isDone} onChange={checkWishHandler}/>
                <span className={css.wishName}>{w.wishTitle}</span>
                <button className={css.delButton} onClick={removeWishHandler}>X</button>
            </li>
        )
    }) :
    <span>No wishes</span>;

    return (
      <div className={css.wishList}>
            <div className={css.title}>
                {props.title}
            </div>
            <div className={css.inputLine}>
                <input className={css.input}
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyPress={onPressEnterAddWish}
                />
                <button className={css.inputButton}
                    onClick={onClickAddWish}
                >Add</button>
            </div>
            <div>
                <ul className={css.list}>
                    {eachWish}
                </ul>
            </div>
            <div className={css.divFilterButtons}>
                <button
                    className={addCssForFilter('All', props.filter)}
                    onClick={filterWishHandler('All')}>All
                </button>
                <button
                    className={addCssForFilter('Realised', props.filter)}
                    onClick={filterWishHandler('Realised')}>Realised
                </button>
                <button
                    className={addCssForFilter('Unrealized', props.filter)}
                    onClick={filterWishHandler('Unrealized')}>Unrealized
                </button>
            </div>
      </div>
    );
  }

  export default ListOfWishes;
