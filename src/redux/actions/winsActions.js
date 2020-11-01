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
    console.log('I am in a catch block with some error in getting posts');
  }
};
export const createWin = async (data) => {
  try {
    const res = await axios.post(
      'http://localhost:5001/wincp-9d49a/us-central1/api/wins',
      data
    );
    console.log(res.data);
  } catch (err) {
    console.log('error in posting a new Post');
  }
};
