import { useState } from 'react';
import { v4 } from 'uuid';
import TodoList from './components/TodoList/TodoList';


export type FilterValuesType = 'All' | 'Done' | 'Undone';
const titleOfList = 'To do list';

function App() {

//Hook for rendering deleted tasks
const [tasks, setTasks] = useState([
  {id: v4(), title: 'Learn JS', isDone: true},
  {id: v4(), title: 'Learn React', isDone: false},
  {id: v4(), title: 'Learn TypeScript', isDone: false},
  {id: v4(), title: 'Learn CSS', isDone: false},
  {id: v4(), title: 'Learn HTML', isDone: false}
]);

const removeTask = (taskId: string) => {
  setTasks(tasks.filter((t: { id: string; }) => t.id !== taskId));
}


//Hook for rendering filtered tasks
const [filter, setFilter] = useState<FilterValuesType>('All');

const changeFilter = (filter: FilterValuesType) => {
  setFilter(filter);
}


const checkTaskStatus = (taskId: string, isDone: boolean) => {
  setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t));
}


const addTask = (title: string) => {
  setTasks([{id: v4(), title: title, isDone: false},...tasks]);
}


    return (
    <>
        <TodoList
            title={titleOfList}
            tasks={tasks}
            filter={filter}
            removeTask={removeTask}
            changeFilter={changeFilter}
            checkTaskStatus={checkTaskStatus}
            addTask={addTask}
        />


    </>
  );
}

export default App;
