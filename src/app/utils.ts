import { actionGetUsers } from './actions';

export const actionTypeHandle = (message, dispatch) => {
  switch (message.actionType) {
    case 'ACTION_GET_USERS':
      return dispatch(actionGetUsers(2));

    default:
      return '';
  }
};
