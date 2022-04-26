import { FilterValuesType } from "../../App";
import css from './TodoList.module.css';



export const addCssForFilter = (pushedFilter:string, filter: FilterValuesType) => {
    let cssForCheckedButton: string;

    if(pushedFilter === filter) {
        cssForCheckedButton = `${css.filterButton} ${css.activeFilter}`;
    }
        else {
            cssForCheckedButton = `${css.filterButton}`;
        }
    return cssForCheckedButton;
}
