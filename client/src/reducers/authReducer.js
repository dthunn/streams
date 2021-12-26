import produce from 'immer';
import authTypes from '../types/authTypes';

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

const authReducer = produce((state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.SIGN_IN:
      state.isSignedIn = true;
      state.userId = action.payload;
      break;
    case authTypes.SIGN_OUT:
      state.isSignedIn = false;
      state.userId = null;
      break;
    default:
      return state;
  }
});

export default authReducer;
