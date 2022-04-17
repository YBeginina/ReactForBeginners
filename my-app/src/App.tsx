import { useState } from 'react';
import { titleOfList, wishesData } from './data';
import ListOfWishes, { FilterValuesType, WishesType } from './ListOfWishes';


function App() {

//Хук для рендеринга удаленных желаний
const [wishes, setWishes] = useState(wishesData);

const removeWish = (wishId: string) => {
  setWishes(wishes.filter((w: { id: string; }) => w.id !== wishId));
}


//Хук для рендеринга фильтрации желаний
const [filter, setFilter] = useState<FilterValuesType>('All');

const changeFilter = (filter: FilterValuesType) => {
  setFilter(filter);
}

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


  return (
    <>
        <ListOfWishes
            title={titleOfList}
            wishes={wishesForRender}
            removeWish={removeWish}
            changeFilter={changeFilter}
        />
    </>
  );
}

export default App;
