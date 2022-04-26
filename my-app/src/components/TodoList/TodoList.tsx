import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from '../../App';
import { addCssForFilter } from './FunctionsForListOfWishes';
import css from './TodoList.module.css'

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListProps = {
    title: string
    tasks: TasksType[]
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    checkTaskStatus: (taskId: string, isDone: boolean) => void
    addTask: (title: string) => void
}

function TodoList(props:TodoListProps){
    //Hook for input for new wishes
    const [title, setTitle] = useState<string>('');

    const onChangeSetTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onClickAddTask = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
        props.addTask(trimmedTitle);
        }
        setTitle('');
    }

    const onPressEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask();
        }
    }

    const filterTaskHandler = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter);
    }
    const getFilteredTasksForRender = (tasks: TasksType[], filter: FilterValuesType) => {
        let tasksForRender: TasksType[];
        switch (filter) {
            case 'Done':
                tasksForRender = tasks.filter(t => t.isDone);
                break;
            case 'Undone':
                tasksForRender = tasks.filter(t => !t.isDone);
                break;
            default:
                tasksForRender = tasks;
                break;
        }
        return tasksForRender;
      }
    const tasksForRender: TasksType[] = getFilteredTasksForRender(props.tasks, props.filter);

    const eachTask = tasksForRender.length ?
    tasksForRender.map(t => {
        const removeTaskHandler = () => props.removeTask(t.id);
        const checkTaskHandler = (e: ChangeEvent<HTMLInputElement>) => props.checkTaskStatus(t.id, e.currentTarget.checked)
        return (
            <li className={css.task} key={t.id}>
                <input type="checkbox" checked={t.isDone} onChange={checkTaskHandler}/>
                <span className={css.taskName}>{t.title}</span>
                <button className={css.delButton} onClick={removeTaskHandler}>X</button>
            </li>
        )
    }) :
    <span>No wishes</span>;

    return (
      <div className={css.taskList}>
            <div className={css.title}>
                {props.title}
            </div>
            <div className={css.inputLine}>
                <input className={css.input}
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyPress={onPressEnterAddTask}
                />
                <button className={css.inputButton}
                    onClick={onClickAddTask}
                >Add</button>
            </div>
            <div>
                <ul className={css.list}>
                    {eachTask}
                </ul>
            </div>
            <div className={css.divFilterButtons}>
                <button
                    className={addCssForFilter('All', props.filter)}
                    onClick={filterTaskHandler('All')}>All
                </button>
                <button
                    className={addCssForFilter('Done', props.filter)}
                    onClick={filterTaskHandler('Done')}>Done
                </button>
                <button
                    className={addCssForFilter('Undone', props.filter)}
                    onClick={filterTaskHandler('Undone')}>Undone
                </button>
            </div>
      </div>
    );
  }

  export default TodoList;

