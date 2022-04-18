import { useState } from 'react';
import { titleOfList, wishesData } from './data';
import ListOfWishes, { FilterValuesType } from './ListOfWishes';


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


  return (
    <>
        <ListOfWishes
            title={titleOfList}
            wishes={wishes}
            filter={filter}
            removeWish={removeWish}
            changeFilter={changeFilter}
        />
    </>
  );
}

export default App;
