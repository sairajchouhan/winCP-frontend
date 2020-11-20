import axios from 'axios';
import { SET_ALL_WINS } from '../slices/winsSlice';
import { URL } from '../../utils/constants';

export const getAllWins = () => async (dispatch) => {
  try {
    const res = await axios.get(`${URL}/wins`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    dispatch(SET_ALL_WINS(res.data));
  } catch (err) {
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
    return { hasError: false, winId: res.data.winId };
  } catch (err) {
    console.log('error in posting a new Post');
    return { hasError: true, errors: err.response.data.errors };
  }
};

export const likeAWin = async (winId) => {
  try {
    const res = await axios.get(`${URL}/win/${winId}/like`);
    console.log(res.data);
  } catch (error) {
    console.log('error in liking the post');
  }
};

export const deleteAWin = async (winId) => {
  try {
    await axios.delete(`${URL}/win/${winId}`);
    console.log('successfully deleted the post');
  } catch (err) {
    console.log('error in delteing the post');
    console.log(err.response);
    return false;
  }
};
