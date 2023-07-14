import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
const Btn = ({label, handel}) => {
  return (
    <View style={{ paddingTop: 20 }}>
    <TouchableOpacity
      style={{
        backgroundColor: "grey",
        borderRadius: 50,
        alignItems: "center",
      }}
      onPress={handel}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          padding: 5,
          color: "white",
        }}
      >{label}
      </Text>
    </TouchableOpacity>
  </View>
  );
};
export default Btn;
