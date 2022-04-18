import cssL from './ListOfWishes.module.css';

export type FilterValuesType = 'All' | 'Realised' | 'Unrealized';

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
}

function ListOfWishes(props:ArrOfWishesPropsType){

    const filterWishHandler = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter);
    }

    const cssAllFilter = props.filter === 'All' ?
    `${cssL.filterButton} ${cssL.activeFilter}`:
    `${cssL.filterButton}`;
    const cssRealisedFilter = props.filter === 'Realised' ?
    `${cssL.filterButton} ${cssL.activeFilter}`:
    `${cssL.filterButton}`;
    const cssUnrealizedFilter = props.filter === 'Unrealized' ?
    `${cssL.filterButton} ${cssL.activeFilter}`:
    `${cssL.filterButton}`;


    const getWishesForRender = (wishes: WishesType[], filter: FilterValuesType) => {
        let wishesForRender: WishesType[];
        switch (props.filter) {
            case 'Realised':
                wishesForRender = props.wishes.filter(w => w.isDone);
                break;
            case 'Unrealized':
                wishesForRender = props.wishes.filter(w => !w.isDone);
                break;
            default:
                wishesForRender = props.wishes;
                break;
        }
        return wishesForRender;
    }
    const wishesForRender: WishesType[] = getWishesForRender(props.wishes, props.filter)

    const eachWish = wishesForRender.length ?
    wishesForRender.map(w => {

        const removeWishHandler = () => props.removeWish(w.id);

        return (
            <li
            className={cssL.wish}
            key={w.id}>
                <input type="checkbox" checked={w.isDone}/>
                <span className={cssL.wishName}>{w.wishTitle}</span>
                <button className={cssL.delButton} onClick={removeWishHandler}>X</button>
            </li>
        )
    }) :
    <span>No wishes</span>

    return (
      <div className={cssL.wishList}>
            <div className={cssL.title}>
                {props.title}
            </div>
            <div className={cssL.inputLine}>
                <input className={cssL.input}>
                </input>
                <button className={cssL.inputButton}>Add</button>
            </div>
            <div>
                <ul className={cssL.list}>
                    {eachWish}
                </ul>
            </div>
            <div className={cssL.divFilterButtons}>
                <button
                    className={cssAllFilter}
                    onClick={filterWishHandler('All')}>All
                </button>
                <button
                    className={cssRealisedFilter}
                    onClick={filterWishHandler('Realised')}>Realised
                </button>
                <button
                    className={cssUnrealizedFilter}
                    onClick={filterWishHandler('Unrealized')}>Unrealized
                </button>
            </div>
      </div>
    );
  }

  export default ListOfWishes;
