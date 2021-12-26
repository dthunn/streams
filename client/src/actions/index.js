import streams from '../apis/streams';
import authTypes from '../types/authTypes';
import streamTypes from '../types/streamTypes';
import history from '../history';

export const signIn = (userId) => {
  return {
    type: authTypes.SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: authTypes.SIGN_OUT,
  };
};

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post('/streams', { ...formValues, userId });

  dispatch({
    type: streamTypes.CREATE_STREAM,
    payload: response.data,
  });

  history.push('/');
};

export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get('/streams');
  dispatch({
    type: streamTypes.FETCH_STREAMS,
    payload: response.data,
  });
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({
    type: streamTypes.FETCH_STREAM,
    payload: response.data,
  });
};

export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({
    type: streamTypes.EDIT_STREAM,
    payload: response.data,
  });

  history.push('/');
};

export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);

  dispatch({
    type: streamTypes.DELETE_STREAM,
    payload: id,
  });

  history.push('/');
};
