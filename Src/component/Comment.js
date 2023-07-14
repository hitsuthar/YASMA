import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { GetDataById } from "../utils/FireBaseActions";
const comment = ({ item }) => {
  const [profile, setProfile] = useState(null);
  const getProfile = async () => {
    setProfile(await GetDataById("users/", item?.uid));
  };
  useEffect(() => {
    getProfile();
    console.log("13", profile);
  }, []);
  return (
    <View style={{ paddingHorizontal: 5, paddingTop: 5 }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#F2F5F6",
          borderRadius: 10,
          borderWidth: 3,
          borderColor: "#fff",
        }}
      >
        <View style={{ alignItems: "center", padding: 10 }}>
          <TouchableOpacity>
            <Image
              source={{ uri: profile?.profilePicture }}
              style={{ height: 40, width: 40, borderRadius: 20 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%" }}>
          <Text style={{ fontWeight: "bold", paddingVertical: 5 }}>
            {profile?.fullName}
          </Text>
          <Text style={{ width: "83%", paddingBottom: 5 }}>
            {item.content}{" "}
          </Text>
        </View>
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
export default comment;
