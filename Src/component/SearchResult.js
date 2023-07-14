import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { onFollow, onUnFollow } from "../utils/FireBaseActions";
import { GetDataById } from "../utils/FireBaseActions";
import { updateFollowingData } from "../Redux/Actions/action";
import { saveRandomNumber } from "../Redux/Actions/action";
const SearchResult = ({ item }) => {
  // const following = false;
  const dispatch = useDispatch();
  const myData = useSelector((state) => state.auth);

  const FollowButton = () => {
    if (
      myData.following &&
      Object.values(myData.following).includes(item?.uid)
    ) {
      return (
        <TouchableOpacity
          style={{ borderRadius: 5, borderWidth: 1, padding: 4 }}
          onPress={async () => {
            await onUnFollow(item?.uid,myData.uid);
            const followingData = await GetDataById(
              "users/",
              myData.uid + "/following"
            );
            dispatch(updateFollowingData(followingData));
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Unfollow</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{ borderRadius: 5, borderWidth: 1, padding: 4 }}
          onPress={async () => {
            await onFollow(item?.uid, myData.uid);
            const followingData = await GetDataById(
              "users/",
              myData.uid + "/following"
            );
            dispatch(updateFollowingData(followingData));
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Follow</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={{ paddingHorizontal: 5 }}>
      {item.uid == myData.uid ? null : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#F2F5F6",
            borderRadius: 10,
            borderWidth: 3,
            borderColor: "#fff",
            marginHorizontal: 5,
            marginTop: 5,
          }}
        >
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <View style={{ alignItems: "center", padding: 10 }}>
              <Image
                source={{ uri: item?.profilePicture }}
                style={{ height: 50, width: 50, borderRadius: 30 }}
              />
            </View>
            <View style={{ paddingTop: 5 }}>
              <Text style={{ fontWeight: "bold", paddingVertical: 5 }}>
                {item?.fullName}
              </Text>
              <Text style={{ paddingBottom: 5 }}>@{item?.userName}</Text>
            </View>
          </TouchableOpacity>
          <View style={{ justifyContent: "center", paddingEnd: 15 }}>
            <FollowButton />
          </View>
        </View>
      )}
    </View>
  );
};
export default SearchResult;
