import {setting} from './actionTypes';
export const updateUser = (data) => {
  return {
    type: setting.updateUser,
    payload: data,
  };
};
