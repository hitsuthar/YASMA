import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import HomeScreen from "../screen/HomeScreen";
import Search from "../screen/Search";
import Profile from "../screen/Profile";
import { createStackNavigator } from "@react-navigation/stack";
import UploadScreen from "../screen/UploadScreen";
import CommentScreen from "../screen/CommentScreen";
import { Text, TouchableOpacity, ImageBackground, Image } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const IndexHomeScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "YASMA",
          headerStyle: { backgroundColor: "#DCE5EC" },
          headerRightContainerStyle: { paddingRight: 10 },
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{
                  height: 35,
                  width: 35,
                }}
                onPress={() => {
                  navigation.navigate("UploadScreen");
                }}
              >
                <ImageBackground
                  source={require("../../res/plus.png")}
                  style={{ height: "100%", width: "100%" }}
                ></ImageBackground>
              </TouchableOpacity>
            );
          },
        })}
      />
      <Stack.Screen
        name="UploadScreen"
        component={UploadScreen}
        options={{
          title: "Upload Post",
          headerStyle: { backgroundColor: "#DCE5EC" },
        }}
      />
      <Stack.Screen
        name="CommentScreen"
        component={CommentScreen}
        options={{
          title: "Comments",
          headerStyle: { backgroundColor: "#DCE5EC" },
        }}
      />
    </Stack.Navigator>
  );
};

export default Index = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={"Home"}
        
      >
        <Tab.Screen
          name="Home"
          component={IndexHomeScreen}
          options={({ route }) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={
                    focused
                      ? require("../../res/home_Focused.png")
                      : require("../../res/home.png")
                  }
                />
              );
            },

            tabBarStyle: ((route) => {
              const routeName =
                getFocusedRouteNameFromRoute(route) ?? "HomeScreen";
              // console.log("71", routeName);
              if (routeName != "HomeScreen") {
                return { display: "none" };
              }
              return;
            })(route),
          })}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={({ route }) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={
                    focused
                      ? require("../../res/search_Focused.png")
                      : require("../../res/search.png")
                  }
                />
              );
            },
          })}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={({ route }) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={
                    focused
                      ? require("../../res/profile_Focused.png")
                      : require("../../res/profile.png")
                  }
                />
              );
            },
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
