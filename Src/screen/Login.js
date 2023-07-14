// import firebase from "firebase/app";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import { saveToken, saveUserDetails } from "../Redux/Actions/action";
import { useDispatch, useSelector } from "react-redux";
import Btn from "../component/Btn";
import InputText from "../component/InputText";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GetDataById } from "../utils/FireBaseActions";

const App = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  // const [Uid, setUid] = useState("");
  // const [UserData, setUserData] = useState({});
  const dispatch = useDispatch();
  const auth = getAuth();
  const emailValid =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  // const { userDetails } = useSelector((state) => state.auth);
  const onLogin = async () => {
    console.log(email, password);
    if (email === "" || password === "") {
      Alert.alert("Email and password are mandatory.");
    } else if (!email.match(emailValid)) {
      Alert.alert("Enter Valid Email");
    } else {
      try {
        const authUser = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const userDatabyid = await GetDataById("users/", authUser.user.uid);
        // console.log("42", userDatabyid);
        dispatch(saveToken(authUser.user.uid));
        // console.log("47",userDatabyid.post);
        dispatch(
          saveUserDetails(
            userDatabyid.userName,
            userDatabyid.email,
            userDatabyid.fullName,
            userDatabyid.phoneNumber,
            userDatabyid.profilePicture,
            userDatabyid.post,
            userDatabyid.follower,
            userDatabyid.following
          )
        );
      } catch (error) {
        alert(error);
      }
    }
  };

  // const { post } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   console.log("70-------------", post);
  //   // setUid(uid.uid)
  // }, [post]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#DCE5EC"} barStyle={"dark-content"} />
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            paddingTop: 10,
          }}
        >
          Welcome!!!
        </Text>
        <View>
          <InputText
            label={"Email"}
            value={email}
            handel={setEmail}
            placeholder={"example@example.com"}
          />
          <InputText
            label={"Password"}
            value={password}
            handel={setPassword}
            placeholder={"******"}
            secure={true}
          />
          <Btn label={"Login"} handel={async () => await onLogin()} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 20,
          }}
        >
          <Text>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text style={{ color: "purple" }}>Sign up here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DCE5EC",
    flex: 1,
  },
});
export default App;
