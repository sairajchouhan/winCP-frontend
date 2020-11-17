import axios from 'axios';
import { URL } from '../../utils/constants';

export const editUserProfile = async (data) => {
  try {
    const res = await axios.post(`${URL}/user`, data);
    console.log(res.data);
    return true;
  } catch (err) {
    console.log('error in updating the user profile in client side');
    return false;
  }
};
