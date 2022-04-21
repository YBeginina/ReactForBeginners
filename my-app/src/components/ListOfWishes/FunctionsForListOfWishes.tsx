import { FilterValuesType } from "../../App";
import { WishesType } from "./ListOfWishes";
import css from './ListOfWishes.module.css';

export const getFilteredWishesForRender = (wishes: WishesType[], filter: FilterValuesType) => {
    let wishesForRender: WishesType[];
    switch (filter) {
        case 'Realised':
            wishesForRender = wishes.filter(w => w.isDone);
            break;
        case 'Unrealized':
            wishesForRender = wishes.filter(w => !w.isDone);
            break;
        default:
            wishesForRender = wishes;
            break;
    }
    return wishesForRender;
}

export const getCssForFilter = (pushedFilter:string, filter: FilterValuesType) => {
    let cssForCheckedButton: string;

    if(pushedFilter === filter) {
        cssForCheckedButton = `${css.filterButton} ${css.activeFilter}`
    }
        else {
            cssForCheckedButton = `${css.filterButton}`;
        }
    return cssForCheckedButton;
}
