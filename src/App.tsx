import './App.css';
import TodoForm from './react-query/TodoForm';
import TodoList from './react-query/TodoList';
// import PostList from './react-query/PostList';

function App() {
  // return <PostList/>
  return (
    <>
      <TodoForm />
      <TodoList />
    </>
  );
}

export default App;
