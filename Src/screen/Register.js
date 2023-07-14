import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Btn from "../component/Btn";
import InputText from "../component/InputText";
import { useDispatch, useSelector } from "react-redux";

import { FireBaseRegisterUser } from "../utils/FireBaseActions";

const App = ({ navigation }) => {
  // const dispatch = useDispatch();
  const [Uid, setUid] = useState("");
  const [UserData, setUserData] = useState({});

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const emailValid =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  const passwdValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const phoneNumberValid = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  const signUp = async () => {
    if (
      email === "" ||
      userName === "" ||
      password === "" ||
      confirmPassword === "" ||
      fullName === "" ||
      phoneNumber === ""
    ) {
      Alert.alert("Enter Correct Details.");
    } else if (password != confirmPassword) {
      Alert.alert("password & confirm password are not same");
    } else if (!email.match(emailValid)) {
      Alert.alert("Enter Valid Email");
    } else if (!password.match(passwdValid)) {
      Alert.alert(
        "Input Password and Submit",
        "6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
      );
    } else if (!phoneNumber.match(phoneNumberValid)) {
      Alert.alert("Enter Valid Phone Number");
    } else {
      const uid = await FireBaseRegisterUser(
        email,
        password,
        userName,
        fullName,
        phoneNumber
      );
      console.log();
      setUid(uid);
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#DCE5EC"} barStyle={"dark-content"} />
      <ScrollView style={{ padding: 20 }}>
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
            label={"Email ID"}
            placeholder={"example@example.com"}
            value={email}
            handel={setEmail}
          />
          <InputText
            label={"username"}
            placeholder={"username"}
            value={userName}
            handel={setUserName}
          />
          <InputText
            label={"Password"}
            placeholder={"********"}
            secure={true}
            value={password}
            handel={setPassword}
          />
          <InputText
            label={"Confirm Password"}
            placeholder={"********"}
            secure={true}
            value={confirmPassword}
            handel={setConfirmPassword}
          />
          <InputText
            label={"Full Name"}
            placeholder={"Hitesh Suthar"}
            value={fullName}
            handel={setFullName}
          />
          <InputText
            label={"Phone Number"}
            placeholder={"0123456789"}
            value={phoneNumber}
            handel={setPhoneNumber}
          />

          <Btn
            label={"Sign up"}
            handel={
              async () => {
                await signUp();
              }
              // dispatch(
              //   saveUserDetails(
              //     userName,
              //     password,
              //     email,
              //     fullName,
              //     phoneNumber,
              //     gender
              //   )
              // )
            }
          />
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
});
export default App;
