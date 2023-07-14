import React, { useState, useEffect } from "react";
import InputText from "../component/InputText";
import { GetDataById } from "../utils/FireBaseActions";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import SearchResult from "../component/SearchResult";
import { saveAllUser } from "../Redux/Actions/action";
import { useDispatch, useSelector } from "react-redux";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const Search = () => {
  const [searchInput, setSearchInput] = useState(null);
  const dispatch = useDispatch();
  const [UserData, setUserData] = useState([]);
  const [searchResultData, setSearchResultData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const myData = useSelector((state) => state.auth);

  const getAllUsersData = async () => {
    const allUsersData = await GetDataById("users/", "");
    // console.log("18", allUsersData);
    const allUserdataArray = Object.values(allUsersData);
    // console.log("25", allUserdataArray);
    dispatch(saveAllUser(allUserdataArray));
    setUserData(allUserdataArray);
  };
  useEffect(() => {
    getAllUsersData();
    console.log("34", myData.following);
    // return () => {
    //   console.log("33", UserData);
    // };
  }, [myData.following]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
    getAllUsersData();
  }, []);

  const findUsersByUserName = (userName) => {
    if (userName) {
      setSearchResultData(
        // UserData.filter((item) => item.userName === userName).map((item) => item);
        UserData.filter((item) =>
          item.userName.match(new RegExp(userName, "i"))
        ).map((item) => item)
      );
      console.log("43", searchResultData);
    } else {
      setSearchResultData(null);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#DCE5EC"} barStyle={"dark-content"} />
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
          value={searchInput}
          onChangeText={(text) => {
            console.log(text);
            setSearchInput(text);
            findUsersByUserName(text);
          }}
          placeholder={"Enter Username to search"}
        />
        <TouchableOpacity
          onPress={() => findUsersByUserName(searchInput)}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            justifyContent: "center",
            height: 40,
            alignSelf: "flex-end",
            width: 40,
            padding: 5,
          }}
        >
          <Image
            source={require("../../res/search.png")}
            style={{ height: 30, width: "100%" }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {searchResultData?.map((item, Index) => (
          <SearchResult item={item} key={Index} />
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DCE5EC",
    flex: 1,
  },
});
export default Search;
