import { useState } from 'react';
import { v4 } from 'uuid';
import Counter from './components/Counter/Counter';
import { titleOfList, wishesData } from './components/ListOfWishes/data';
import ListOfWishes from './components/ListOfWishes/ListOfWishes';


export type FilterValuesType = 'All' | 'Realised' | 'Unrealized';

function App() {

//Hook for rendering deleted wishes
const [wishes, setWishes] = useState(wishesData);

const removeWish = (wishId: string) => {
  setWishes(wishes.filter((w: { id: string; }) => w.id !== wishId));
}


//Hook for rendering filtered wishes
const [filter, setFilter] = useState<FilterValuesType>('All');

const changeFilter = (filter: FilterValuesType) => {
  setFilter(filter);
}


const checkWishStatus = (wishId: string, isDone: boolean) => {
  setWishes(wishes.map(w => w.id === wishId ? {...w, isDone: isDone} : w));
}


const addWish = (title: string) => {
  setWishes([{id: v4(), wishTitle: title, isDone: false},...wishes]);
}

let maxResult = 5;

    return (
    <>
        <ListOfWishes
            title={titleOfList}
            wishes={wishes}
            filter={filter}
            removeWish={removeWish}
            changeFilter={changeFilter}
            checkWishStatus={checkWishStatus}
            addWish={addWish}
        />

        <Counter maxResult={maxResult} />

    </>
  );
}

export default App;
