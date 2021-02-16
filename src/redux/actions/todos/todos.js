import {todos} from './actionTypes';
export const addTodos = (data) => {
  return {
    type: todos.add,
    payload: data,
  };
};

export const deleteTodos = (data) => {
  return {
    type: todos.delete,
    payload: data,
  };
};
export const updateTodos = (data) => {
  return {
    type: todos.update,
    payload: data,
  };
};
