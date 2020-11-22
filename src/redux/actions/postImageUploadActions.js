import { storage, db } from '../../firebase/config';

export const uploadPostImagesToFirebase = async (
  images = undefined,
  username,
  winId
) => {
  if (images === undefined) return;

  const winsRef = db.doc(`/wins/${winId}`);
  const arr = [];
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
        arr.push(url);
        let winData = {};

        console.log(url);
        const win = await winsRef.get();
        if (!win.exists) {
          return false;
        } else {
          winData = { ...win.data() };
          winData.postImageUrls = [...arr];
          await winsRef.update(winData);
        }
      }
    );
  });
};
