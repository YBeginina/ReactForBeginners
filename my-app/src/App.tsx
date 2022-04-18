import { useState } from 'react';
import { titleOfList, wishesData } from './data';
import ListOfWishes from './ListOfWishes';


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
  setWishes(wishes.map(w => w.id === wishId ? {...w, isDone: isDone} : w))
}


  return (
    <>
        <ListOfWishes
            title={titleOfList}
            wishes={wishes}
            filter={filter}
            removeWish={removeWish}
            changeFilter={changeFilter}
            checkWishStatus={checkWishStatus}
        />
    </>
  );
}

export default App;
