import { useState } from 'react';
import { titleOfList, wishesData } from './data';
import ListOfWishes from './ListOfWishes';

function App() {

const [wishes, setWishes] = useState(wishesData);

const removeWish = (wishId: string) => {
  setWishes(wishes.filter((w: { id: string; }) => w.id !== wishId))
}

  return (
    <>
        <ListOfWishes
            title={titleOfList}
            wishes={wishes}
            removeWish={removeWish}

        />
    </>
  );
}

export default App;
