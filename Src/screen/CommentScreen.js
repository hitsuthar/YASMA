import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import Comment from "../component/Comment";
import { GetDataById, onComment } from "../utils/FireBaseActions";

const CommentScreen = ({ route, navigation }) => {
  const [commentContent, setCommentContent] = useState(null);
  const [allComments, setAllComments] = useState(null);
  const myData = useSelector((state) => state.auth);
  const { postId } = route.params;

  const getComments = async () => {
    setAllComments(await GetDataById("posts/", postId + "/comments"));
  };
  useEffect(() => {
    getComments();
    console.log("13", allComments);
  });
  // console.log(Object.values( allComments));
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#DCE5EC"} barStyle={"dark-content"} />
      <ScrollView>
        {allComments ? (
          Object.values(allComments)?.map((item, Index) => (
            <Comment item={item} key={Index} />
          ))
        ) : (
          <Text
            style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold" }}
          >
            No Comments
          </Text>
        )}
      </ScrollView>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          style={{
            height: 40,
            borderRadius: 10,
            borderWidth: 1,
            paddingHorizontal: 10,
            width: "87%",
          }}
          value={commentContent}
          onChangeText={(text) => {
            console.log(text);
            setCommentContent(text);
          }}
          placeholder={"Enter Comment..."}
        />
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 10,
            justifyContent: "center",
            height: 40,
            alignSelf: "flex-end",
            width: 40,
            padding: 5,
          }}
          onPress={() => {
            commentContent
              ? onComment(postId, myData.uid, commentContent)
              : null;
            setCommentContent(null);
          }}
        >
          <Image
            source={require("../../res/send.png")}
            style={{ height: 30, width: "100%" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DEE7EF",
  },
});
export default CommentScreen;
