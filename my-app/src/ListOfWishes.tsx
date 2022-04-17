import React from 'react';
import {titleOfList} from './data';
import l from './ListOfWishes.module.css';

export type WishesType = {
    id: string
    wishTitle: string
    isDone: boolean
}

export type ArrOfWishesPropsType = {
    wishes: Array<WishesType>
}

export const ListOfWishes = (props:ArrOfWishesPropsType) => {

    const eachWish = props.wishes.map(w => {
        return (
            <li className={l.wish} key={w.id}>
                <input type="checkbox" checked={w.isDone}/>
                <span className={l.wishName}>{w.wishTitle}</span>
                <button className={l.delButton}>X</button>
            </li>
        )
    });


    return (
      <div className={l.wishList}>
            <div className={l.title}>
                {titleOfList}
            </div>

            <div>
                <ul className={l.list}>
                    {eachWish}
                </ul>
            </div>

      </div>
    );
  }

