import React, { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

import { getFilteredTodosByStatus } from './utils/getFilteredTodosByStatus';

import { getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { Errors } from './types/Errors';
import { Filter } from './types/Filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.All);

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [tempTodo, setTempTodo] = useState<Todo | null>(null);

  const filteredTodos = getFilteredTodosByStatus(todos, filter);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage(Errors.LOADING);
      });
  }, []);

  const countActiveTodos = todos.reduce((accum, todo) => {
    let countTodos = 0;

    if (!todo.completed) {
      countTodos += 1;
    }

    return accum + countTodos;
  }, 0);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          tempTodo={tempTodo}
          setTempTodo={setTempTodo}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setErrorMessage={setErrorMessage}
          setTodos={setTodos}
          todos={todos}
        />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filteredTodos}
              tempTodo={tempTodo}
              isLoading={isLoading}
              // setErrorMessage={setErrorMessage}
            />

            <Footer
              countActiveTodos={countActiveTodos}
              filter={filter}
              setFilter={setFilter}
            />
          </>
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
