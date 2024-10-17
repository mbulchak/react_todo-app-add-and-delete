import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { todosService } from '../../api';
import { USER_ID } from '../../api/todos';
import { Errors } from '../../types/Errors';

type Props = {
  tempTodo: Todo | null;
  setTempTodo: Dispatch<React.SetStateAction<Todo | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  todos: Todo[];
  // setTodos: (newTodo: Omit<Todo, 'id'>) => void;

  setErrorMessage: (Error: Errors) => void;
};

export const Header: React.FC<Props> = ({
  tempTodo,
  setTempTodo,
  isLoading,
  setIsLoading,
  setErrorMessage,
  setTodos,
  todos,
}) => {
  const field = useRef<HTMLInputElement>(null);
  const [newTitle, setNewTitle] = useState('');
  // const [completed, setCompleted] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value.trimStart());
  };

  useEffect(() => {
    field.current?.focus();
  }, [todos]);

  function addTodo({ userId, title, completed }: Omit<Todo, 'id'>) {
    // here create tempTodo

    const newTodo = {
      userId,
      title,
      completed,
    };

    setTempTodo({
      id: 0,
      ...newTodo,
    });

    if (!title) {
      setErrorMessage(Errors.TITLE);
    }

    return todosService
      .createTodo(newTodo)
      .then(defTodo => {
        setTodos(currentTodos => [...currentTodos, defTodo]);
      })
      .catch(() => setErrorMessage(Errors.ADD_TODO))
      .finally(() => setTempTodo(null));
    //in finally set tempTodo to null
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addTodo({
      userId: USER_ID,
      title: newTitle,
      completed: false,
    });

    setIsLoading(true);

    setNewTitle('');
  };

  setIsLoading(false);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          ref={field}
          value={newTitle}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={handleTitle}
          // disabled={} when the data is loading
          disabled={isLoading}
        />
      </form>
    </header>
  );
};
