import './App.scss';
import { useState } from 'react';

import todosFromServer from './api/todos';

import { ToDo } from './types/ToDo';

import { userById } from './services/userById';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { getTodoId } from './services/getTodoId';

const todos: ToDo[] = todosFromServer.map(todo => ({
  ...todo,
  user: userById(todo.userId),
}));

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState<ToDo[]>(todos);

  const addTodo = (todo: ToDo) => {
    const newTodo = { ...todo, id: getTodoId(todos) };

    setVisibleTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={addTodo} />

      <TodoList todos={visibleTodos} />
    </div>
  );
};
