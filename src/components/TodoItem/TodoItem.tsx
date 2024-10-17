/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

// import { useEffect } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
// import { Errors } from '../../types/Errors';
// import { createTodo } from '../../api/todos';

type Props = {
  todo: Todo;
  isLoading: boolean;
  // tempTodo: Todo | null;
  // setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const TodoItem: React.FC<Props> = ({ todo, isLoading }) => {
  // const idsOfCreatedTodos = [todo.id];

  console.log(todo);
  // idsOfCreatedTodos.push(todo)

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      {/* Remove button appears only on hover */}
      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      {/* overlay will cover the todo while it is being deleted or updated */}
      {/* show while class is active and other condition */}

      {/* create an array of id => and if isloading and id === some.id then 'is-active'  */}

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          // 'is-activel': !todo.completed,
          'is-active': isLoading && todo.id === 0,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
