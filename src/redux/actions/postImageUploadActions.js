import axios from 'axios';
import { URL } from '../../utils/constants';
import { storage, db } from '../../firebase/config';
import { winsSlice } from '../slices/winsSlice';

export const uploadPostImagesToFirebase = async (
  images = undefined,
  username
) => {
  if (images === undefined) return;
  const imageUrls = [];

  return new Promise(async (resolve, reject) => {
    try {
      images.forEach((image) => {
        const storageRef = storage.ref(
          `postImages/${username}_${image.name}_${Date.now()}`
        );

        storageRef.put(image).on(
          'state_changed',
          (snap) => {},
          (err) => {
            return err;
          },
          async () => {
            const url = await storageRef.getDownloadURL();
            imageUrls.push(url);
          }
        );
      });
      resolve(imageUrls);
    } catch (err) {
      reject('error in posting images to firestore');
    }
  });
};

export const savePostImageUrlsToFirestore = async (urls, winId) => {
  const winsRef = db.doc(`/wins/${winId}`);
  console.log('before doing', urls);
  winsRef
    .update({ winImageUrls: [...urls] })
    .then(() => {
      console.log('updated the firestore too');
    })
    .catch((err) => {
      console.log(err);
      console.log('error in saving the info to the firestore');
    });
};
