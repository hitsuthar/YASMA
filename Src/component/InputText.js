import React from "react";
import { View, Text, TextInput } from "react-native";
const InputText = ({ label, handel, value, placeholder, secure = false }) => {
  return (
    <View>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 15,
          paddingTop: 10,
          paddingBottom: 5,
        }}
      >
        {label}
      </Text>
      <TextInput
        style={{
          height: 40,
          borderRadius: 10,
          borderWidth: 1,
          paddingHorizontal: 10,
        }}
        value={value}
        onChangeText={(text) => handel(text)}
        placeholder={placeholder}
        secureTextEntry={secure}
      />
    </View>
  );
};
export default InputText;
