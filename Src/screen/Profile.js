import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import Post from "../component/Post";
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../Redux/Actions/action";
// import FireBase from "../utils/firebase";
// import { getDatabase, onValue, set, ref } from "firebase/database";
import { ImageBackground } from "react-native";
import { PickImage } from "../utils/PickImage";
import { UploadImage } from "../utils/FirebaseImage";
import {
  GetDataById,
  GetUserDataByUid,
  UpdateUserData,
} from "../utils/FireBaseActions";
import { ExtractObjectDataToArray } from "../utils/ExtractObject";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  // const { userDetails } = useSelector((state) => state.auth);
  const [post, setPost] = useState([]);

  const { randomNumber } = useSelector((state) => state.auth);
  const userData = useSelector((state) => state.auth);
  // console.log("27",userData);
  if (userData.post) {
    const postId = Object.values(userData.post);
    // console.log("30", postId);
    const postData = [];

    const getPostData = async () => {
      for (let index = 0; index < postId.length; ++index) {
        const element = postId[index];
        const postDataById = await GetDataById("posts/", element);
        // console.log("40", postdatabyid);
        postData.push(postDataById);
      }
      // console.log("45", postData);
      setPost(postData.flat(1).sort((a, b) => b.createdAt - a.createdAt));
    };
    useEffect(() => {
      getPostData();
      console.log(postId);
    }, [userData.post, randomNumber]);
  }

  // const [imageUri, setImageUri] = useState(null);
  // const [userData, setUserData] = useState("");
  // console.log("31",userData);
  // setUserData(userdata);
  // console.log("32",userdata);
  // useEffect(() => {
  //   onValue(ref(getDatabase(), "users/" + uid.uid), (querySnapShot) => {
  //     let data = querySnapShot.val();
  //     console.log("33", data);
  //     setUserData({...userData,data});
  //     console.log("35",userData);
  //   });
  //   const tempPost = [];
  //   console.log("39",userData);
  //   Object.keys(userData.post).forEach((element) => {
  //     const userPostId = userData.post[element];
  //     console.log("37", element);
  //     onValue(ref(getDatabase(), "posts/" + userPostId), (querySnapShot1) => {
  //       let data = querySnapShot1.val();
  //       tempPost.push(data);
  //     });
  //     // console.log("38", userPostId);
  //   });
  //   console.log(tempPost);
  //   setPost(tempPost);
  // }, []);
  // useEffect(() => {
  //   const tempPost = [];
  //   console.log("39",userData);
  //   Object.keys(userData.post).forEach((element) => {
  //     const userPostId = userData.post[element];
  //     console.log("37", element);
  //     onValue(ref(getDatabase(), "posts/" + userPostId), (querySnapShot1) => {
  //       let data = querySnapShot1.val();
  //       tempPost.push(data);
  //     });
  //     // console.log("38", userPostId);
  //   });
  //   console.log(tempPost);
  //   setPost(tempPost);
  // },[]);

  const changeProfileImage = async () => {
    const uri = await PickImage(1, 1);
    const imageuri = await UploadImage(uri, "profileImage/" + userData.uid);
    console.log(uri);
    userData.profilePicture = imageuri;
    UpdateUserData(userData.uid, "profilePicture", imageuri);
    // setImageUri(imageuri);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#DCE5EC"} barStyle={"dark-content"} />
      <ScrollView>
        <View
          style={{
            paddingLeft: 5,
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 30,
          }}
        >
          <View
            style={{
              height: 100,
              width: 100,
              justifyContent: "center",
              borderRadius: 50,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "grey",
            }}
          >
            <TouchableOpacity
              style={[{}]}
              onPress={async () => await changeProfileImage()}
            >
              <ImageBackground
                source={
                  userData.profilePicture
                    ? { uri: userData.profilePicture }
                    : null
                }
                resizeMode="cover"
                style={{
                  height: 95,
                  width: 95,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
                imageStyle={{ borderRadius: 50 }}
              >
                <Image
                  source={require("../../res/edit.png")}
                  style={[
                    {
                      height: 30,
                      width: 30,
                      backgroundColor: "white",
                      borderRadius: 50,
                    },
                  ]}
                />
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 20, padding: 10 }}>
            {userData.fullName}
          </Text>
          <Text style={{ paddingBottom: 10 }}>@{userData.userName}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
            }}
          >
            <View style={styles.userCounter}>
              <TouchableOpacity style={styles.userCounterBtn}>
                <Text style={styles.largeText}>
                  {userData.post ? Object.values(userData.post).length : 0}
                </Text>
                <Text>Posts</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.userCounter}>
              <TouchableOpacity style={styles.userCounterBtn}>
                <Text style={styles.largeText}>
                  {userData.follower
                    ? Object.values(userData.follower).length
                    : 0}
                </Text>
                <Text>Followers</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.userCounter}>
              <TouchableOpacity style={styles.userCounterBtn}>
                <Text style={styles.largeText}>
                  {userData.following
                    ? Object.values(userData.following).length
                    : 0}
                </Text>
                <Text>Following</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ padding: 7, alignItems: "center" }}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderRadius: 5,
              alignItems: "center",
              width: "95%",
            }}
            onPress={() => dispatch(onLogout())}
            // onPress={async()=>await getPostData("-NArvuhlw23zeaQAI8Gb")}
          >
            <Text style={{ fontWeight: "bold", padding: 4 }}>Log out</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 5 }}>
          {post?.map((item, Index) => (
            <Post item={item} key={Index} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DCE5EC",
    flex: 1,
  },
  userCounter: {
    justifyContent: "center",
    alignItems: "center",
  },
  userCounterBtn: {
    alignItems: "center",
  },
  largeText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Profile;
