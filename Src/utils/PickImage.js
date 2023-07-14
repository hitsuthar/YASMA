import * as ImagePicker from "expo-image-picker";
const PickImage = async (w,h) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [w, h],
    quality: 1,
  });
  return result.uri;
};
export {PickImage};