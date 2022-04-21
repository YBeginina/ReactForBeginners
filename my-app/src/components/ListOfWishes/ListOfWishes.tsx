import { ChangeEvent } from 'react';
import { FilterValuesType } from '../../App';
import { getFilteredWishesForRender, getCssForFilter } from './FunctionsForListOfWishes';
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
}

function ListOfWishes(props:ArrOfWishesPropsType){

    const filterWishHandler = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter);
    }

    const wishesForRender: WishesType[] = getFilteredWishesForRender(props.wishes, props.filter)

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
    <span>No wishes</span>

    return (
      <div className={css.wishList}>
            <div className={css.title}>
                {props.title}
            </div>
            <div className={css.inputLine}>
                <input className={css.input}>
                </input>
                <button className={css.inputButton}>Add</button>
            </div>
            <div>
                <ul className={css.list}>
                    {eachWish}
                </ul>
            </div>
            <div className={css.divFilterButtons}>
                <button
                    className={getCssForFilter('All', props.filter)}
                    onClick={filterWishHandler('All')}>All
                </button>
                <button
                    className={getCssForFilter('Realised', props.filter)}
                    onClick={filterWishHandler('Realised')}>Realised
                </button>
                <button
                    className={getCssForFilter('Unrealized', props.filter)}
                    onClick={filterWishHandler('Unrealized')}>Unrealized
                </button>
            </div>
      </div>
    );
  }

  export default ListOfWishes;
