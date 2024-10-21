import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  tempTodo: Todo | null;
  isLoading: boolean;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  deleteTodoId: number[];
  setDeleteTodoId: React.Dispatch<React.SetStateAction<number[]>>;
  handleDeleteTodo: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  tempTodo,
  isLoading,
  setTodos,
  setErrorMessage,
  deleteTodoId,
  setDeleteTodoId,
  handleDeleteTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            isLoading={isLoading}
            setTodos={setTodos}
            setErrorMessage={setErrorMessage}
            deleteTodoId={deleteTodoId}
            setDeleteTodoId={setDeleteTodoId}
            handleDeleteTodo={handleDeleteTodo}
          />
        );
      })}

      {tempTodo && (
        <TodoItem
          todo={tempTodo}
          isLoading={isLoading}
          setTodos={setTodos}
          setErrorMessage={setErrorMessage}
          deleteTodoId={deleteTodoId}
          setDeleteTodoId={setDeleteTodoId}
          handleDeleteTodo={handleDeleteTodo}
        />
      )}
    </section>
  );
};
