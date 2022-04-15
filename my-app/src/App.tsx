import React from 'react';
import { wishes } from './data';
import {ListOfWishes} from './ListOfWishes';


function App() {
  return (
    <>
        <ListOfWishes
            wishes={wishes}
        />
    </>
  );
}

export default App;
