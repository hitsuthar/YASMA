import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Post from "../component/Post";
import { saveRandomNumber } from "../Redux/Actions/action";
import { GetDataById } from "../utils/FireBaseActions";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  // const [myData, setMyData] = useState(null);
  const myData = useSelector((state) => state.auth);
  const { randomNumber } = useSelector((state) => state.auth);
  const postData = [];

  const getAllPosts = async () => {
    const allPostData = await GetDataById("posts/", "");
    if (allPostData && myData.following) {
      const allPostDataArray = Object.values(allPostData);
      Object.values(myData.following).forEach((element) => {
        // console.log("22",element);
        const filteredPostData = allPostDataArray.filter(
          (post) => post.uid === element
        );
        postData.push(filteredPostData);
      });
      setPost(postData.flat(1).sort((a, b) => b.createdAt - a.createdAt));
    }
  };
  useEffect(() => {
    getAllPosts();
  }, [myData, randomNumber]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
    dispatch(saveRandomNumber(Math.random()));
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#DCE5EC"} barStyle={"dark-content"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 13,
          width: "100%",
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={"#fff"}
          />
        }
      >
        <View style={{}}>
          {post
            ? post?.map((item, Index) => (
                <Post item={item} key={Index} navigation={navigation} />
              ))
            : null}
        </View>
      </ScrollView>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCE5EC",
    alignItems: "center",
  },
  postAction: {
    flexDirection: "row",
    padding: 5,
  },
});
