import axios from 'axios';
import { SET_ALL_WINS } from '../slices/winsSlice';

export const getAllWins = () => async (dispatch) => {
  try {
    const res = await axios.get(
      'http://localhost:5001/wincp-9d49a/us-central1/api/wins'
    );
    if (res.data) {
      dispatch(SET_ALL_WINS(res.data));
    }
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
  }
};
export const createWin = async (data) => {
  try {
    const res = await axios.post(
      'http://localhost:5001/wincp-9d49a/us-central1/api/wins',
      data
    );
  } catch (err) {
    console.log('error in posting a new Post');
  }
};
