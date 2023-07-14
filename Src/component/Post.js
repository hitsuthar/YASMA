import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GetDataById, onLike, onUnLike } from "../utils/FireBaseActions";
import { saveRandomNumber } from "../Redux/Actions/action";
import { BlurView } from "@react-native-community/blur";
// import { BlurView } from "@react-native-community/blur";

const Post = ({ navigation, item }) => {
  const dispatch = useDispatch();
  const [profilePicture, setProfilePicture] = useState(null);
  const myData = useSelector((state) => state.auth);
  const [isLiked, setIsLiked] = useState(
    item?.likedBy && Object.values(item?.likedBy).includes(myData.uid)
  );
  const getProfilePicture = async () => {
    setProfilePicture(
      await GetDataById("users/", item?.uid + "/profilePicture")
    );
  };
  useEffect(() => {
    getProfilePicture();
    // console.log("28", profilePicture);
  }, []);
  // date format
  const dateFormatted = () => {
    const date = new Date(item?.createdAt);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dateformatted =
      date.getHours() +
      ":" +
      date.getMinutes() +
      "   " +
      date.getDate() +
      " " +
      monthNames[date.getMonth()] +
      " " +
      date.getFullYear();
    return dateformatted;
  };

  const LikeButton = () => {
    if (isLiked) {
      // setIsLiked(true);
      return (
        <TouchableOpacity
          style={{
            padding: 5,
            paddingLeft: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={async () => {
            await onUnLike(item?.postId, myData.uid);
            dispatch(saveRandomNumber(Math.random()));
            setIsLiked(false);
          }}
        >
          <Image
            source={require("../../res/liked.png")}
            style={{ height: 30, width: 30 }}
          />
          <Text style={{ paddingHorizontal: 5, fontWeight: "bold" }}>
            {item?.likedBy ? Object.values(item?.likedBy).length : "0"}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            padding: 5,
            paddingLeft: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={async () => {
            await onLike(item?.postId, myData.uid);
            dispatch(saveRandomNumber(Math.random()));
            setIsLiked(true);
          }}
        >
          <Image
            source={require("../../res/like.png")}
            style={{ height: 30, width: 30 }}
          />
          <Text style={{ paddingHorizontal: 5, fontWeight: "bold" }}>
            {item?.likedBy ? Object.values(item?.likedBy).length : "0"}
          </Text>
        </TouchableOpacity>
      );
    }
  };
  return (
    <View style={{ paddingHorizontal: 3, paddingBottom: 5 }}>
      <ImageBackground
        source={{ uri: item?.imagePath }}
        resizeMode={"cover"}
        style={{
          // backgroundColor: "#F1F4F5",
          borderWidth: 2,
          borderColor: "#fff",
          borderRadius: 20,
          paddingBottom: 10,
        }}
        blurRadius={50}
        imageStyle={{ opacity: 0.25, borderRadius: 20 }}
      >
        <View
          style={{
            flexDirection: "row",
            height: 45,
            alignItems: "center",
            paddingLeft: 5,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: profilePicture }}
              style={{ height: 35, width: 35, borderRadius: 20 }}
            ></Image>
            <Text style={{ paddingHorizontal: 10, fontWeight: "bold" }}>
              {item?.userName}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 7.5 }}>
            <Text style={{ opacity: 0.5,fontSize:11,fontWeight:'bold' }}>
              {dateFormatted()}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 3,
          }}
        >
          <Image
            source={{ uri: item?.imagePath }}
            style={{
              width: "100%",
              height: 400,
              borderRadius: 10,
            }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <LikeButton />
          <TouchableOpacity
            style={{ padding: 5, flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              navigation.navigate("CommentScreen", {
                postId: item?.postId,
              });
            }}
          >
            <Image
              source={require("../../res/comment.png")}
              style={{ height: 30, width: 30 }}
            />
            <Text style={{ paddingHorizontal: 5, fontWeight: "bold" }}>
              {item?.comments ? Object.values(item?.comments).length : "0"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingLeft: 10 }}>
          <Text style={{}}>{item?.caption}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  postAction: {
    flexDirection: "row",
    padding: 5,
  },
});
export default Post;
