import React from 'react';
import {titleOfList} from './data';


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
            <li key={w.id}>
                <input type="checkbox" checked={w.isDone}/>
                <span>{w.wishTitle}</span>
                <button>X</button>
            </li>
        )
    });


    return (
      <>
            <div>
                {titleOfList}
            </div>

            <div>
                <ul>
                    {eachWish}
                </ul>
            </div>

      </>
    );
  }

