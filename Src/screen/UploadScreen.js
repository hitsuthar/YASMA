import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, StatusBar } from "react-native";
import { PickImage } from "../utils/PickImage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { GetDataById, UploadPost } from "../utils/FireBaseActions";
// import { TextInput } from "react-native-web";
import InputText from "../component/InputText";
import Btn from "../component/Btn";
import { updatePost } from "../Redux/Actions/action";

const UploadScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);

  const { uid } = useSelector((state) => state.auth);
  const { userName } = useSelector((state) => state.auth);

  // console.log("15");

  // const userData = GetDataById("users/",uid.uid);

  const [caption, setCaption] = useState(null);

  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#DCE5EC",
      }}
    >
      <StatusBar backgroundColor={"#DCE5EC"} barStyle={"dark-content"} />

      <ScrollView>
        <View style={{ paddingTop: 5 }}>
          <TouchableOpacity
            onPress={async () => setImage(await PickImage(7, 8))}
            style={{
              paddingBottom: 20,
              borderWidth: 1,
              borderRadius: 15,
              width: 350,
              height: 400,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              Click here to Pick an image
            </Text>
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: 350,
                  height: 400,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: "grey",
                }}
              />
            )}
          </TouchableOpacity>
          <InputText
            label={"Caption"}
            handel={setCaption}
            value={caption}
            placeholder={"Enter Caption for image"}
          />
        </View>
        <View style={{ width: 350, paddingTop: 20, flex: 1 }}>
          <Btn
            label={"Post"}
            handel={async () => {
              console.log(await UploadPost(uid, userName, image, caption));
              const updatePostDatabyid = await GetDataById(
                "users/",
                uid + "/post"
              );
              setCaption(null);
              setImage(null);
              navigation.navigate("HomeScreen");
              console.log(updatePostDatabyid);
              try {
                dispatch(updatePost(updatePostDatabyid));
              } catch (error) {
                console.log(error);
              }
            }}
          />
          <Btn
            label={"Cancel"}
            handel={() => {
              setCaption(null);
              setImage(null);
              navigation.navigate("HomeScreen");
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default UploadScreen;
