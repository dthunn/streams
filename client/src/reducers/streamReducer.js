import produce from 'immer';
import _ from 'lodash';
import streamTypes from '../types/streamTypes';

const streamReducer = produce((state = {}, action) => {
  switch (action.type) {
    case streamTypes.FETCH_STREAMS:
      return _.mapKeys(action.payload, 'id');
    case streamTypes.FETCH_STREAM:
      state[action.payload.id] = action.payload;
      break;
    case streamTypes.CREATE_STREAM:
      state[action.payload.id] = action.payload;
      break;
    case streamTypes.EDIT_STREAM:
      state[action.payload.id] = action.payload;
      break;
    case streamTypes.DELETE_STREAM:
      delete state[action.paylod];
      break;
    default:
      return state;
  }
});

export default streamReducer;
