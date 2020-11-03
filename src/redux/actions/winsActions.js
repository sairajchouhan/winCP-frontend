import axios from 'axios';
import { SET_ALL_WINS } from '../slices/winsSlice';
import { URL } from '../../utils/constants';

export const getAllWins = () => async (dispatch) => {
  try {
    const res = await axios.get(`${URL}/wins`);
    if (res.data) {
      dispatch(SET_ALL_WINS(res.data));
    }
  } catch (err) {
    console.log('I am in a catch block with some error in getting posts');
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      // The request was made but no response was received
      // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(err.request);
    } else {
      // Something happened in setting up the request that triggered an err
      console.log('err', err.message);
    }
    console.log(err.config);
  }
};
export const createWin = async (data) => {
  try {
    const res = await axios.post(`${URL}/wins`, data);
    console.log(res.data);
  } catch (err) {
    console.log('error in posting a new Post');
  }
};

export const likeAWin = async (winId) => {
  try {
    const res = await axios.get(`/win/${winId}/like`);
    console.log(res.data);
  } catch (error) {
    console.log('error in liking the post');
  }
};
