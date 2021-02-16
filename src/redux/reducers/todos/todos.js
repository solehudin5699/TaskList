import {todos} from '../../actions/todos/actionTypes';

const initalState = {
  todos: [],
};
const todosReducer = (prevState = initalState, action) => {
  switch (action.type) {
    case todos.add: {
      let newTodos = [...prevState.todos, action.payload];
      return {
        ...prevState,
        todos: newTodos,
      };
    }
    case todos.delete: {
      let newTodos = prevState.todos.filter(
        (todo) => todo.id != action.payload.id,
      );
      return {
        ...prevState,
        todos: newTodos,
      };
    }
    case todos.update: {
      let updatedTodos = prevState.todos.map((todo) => {
        if (todo.id == action.payload.id) {
          return action.payload;
        } else {
          return todo;
        }
      });
      return {
        ...prevState,
        todos: updatedTodos,
      };
    }
    default:
      return prevState;
  }
};

export default todosReducer;
