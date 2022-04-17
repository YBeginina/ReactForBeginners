import cssL from './ListOfWishes.module.css';

export type WishesType = {
    id: string
    wishTitle: string
    isDone: boolean
}

export type ArrOfWishesPropsType = {
    title: string
    wishes: WishesType[]
    removeWish: (wishId: string) => void
}


function ListOfWishes(props:ArrOfWishesPropsType){

    const eachWish = props.wishes.map(w => {

        const removeWishHandler = () => props.removeWish(w.id);

        return (
            <li className={cssL.wish} key={w.id}>
                <input type="checkbox" checked={w.isDone}/>
                <span className={cssL.wishName}>{w.wishTitle}</span>
                <button className={cssL.delButton} onClick={removeWishHandler}>X</button>
            </li>
        )
    });


    return (
      <div className={cssL.wishList}>
            <div className={cssL.title}>
                {props.title}
            </div>

            <div>
                <ul className={cssL.list}>
                    {eachWish}
                </ul>
            </div>

      </div>
    );
  }

  export default ListOfWishes;
