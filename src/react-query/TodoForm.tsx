import { FormEvent, useRef } from 'react';
import usePostTodosMutation from './hooks/usePostTodosMutation';

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { postTodoMutation, isLoading, error } = usePostTodosMutation(ref);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if(ref.current && ref.current.value)
      postTodoMutation({
        id: 0,
        title: ref.current.value,
        completed: false,
        userId: 1
      });
  };

  return (
    <>
      {error && (
        <div className="alert alert-danger">
          {error.message}
        </div>
      )}
      <form className="row mb-3" onSubmit={handleSubmit}>
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button disabled={isLoading} className="btn btn-primary">
            {isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
