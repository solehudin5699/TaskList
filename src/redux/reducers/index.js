import {combineReducers} from 'redux';
import todosReducer from './todos/todos';
import userReducer from './setting/user';

//Combine reducers
const indexReducer = combineReducers({
  todos: todosReducer,
  user: userReducer,
});

export default indexReducer;
