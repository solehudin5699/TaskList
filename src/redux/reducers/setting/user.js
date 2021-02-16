import {setting} from '../../actions/setting/actionTypes';

const initalState = {
  user: {name: 'John Doe'},
};
const userReducer = (prevState = initalState, action) => {
  switch (action.type) {
    case setting.updateUser: {
      let newUser = {...prevState.user, name: action.payload};
      return {
        ...prevState,
        user: newUser,
      };
    }
    default:
      return prevState;
  }
};

export default userReducer;
