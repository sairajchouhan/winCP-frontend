import axios from 'axios';
import { URL } from '../../utils/constants';
import { storage } from '../../firebase/config';

export const uploadPostImagesToFirebase = async (images) => {
  const imageUrls = [];
  try {
    images.forEach((image) => {
      const storageRef = storage.ref(`postImages/${image.name}`);

      storageRef.put(image).on(
        'state_changed',
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        },
        (err) => {
          return err;
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          imageUrls.push(url);
        }
      );
    });
  } catch (err) {
    console.log('Error in posting images');
  }

  return imageUrls;
};
