import {
  getDownloadURL,
  getStorage,
  ref,
  push,
  child,
  uploadBytes,
} from "firebase/storage";

const UploadImage = async (imagePath, firebasePath) => {
  const storage = getStorage();
  const response = await fetch(imagePath);
  const blob = await response.blob();
  const storageRef = ref(storage, firebasePath);
  const uploadTask = await uploadBytes(storageRef, blob);
  const downloadUrl = getDownloadURL(uploadTask.ref);
  alert("Image Uploaded Successfully");

  return downloadUrl;
};


export { UploadImage, };
