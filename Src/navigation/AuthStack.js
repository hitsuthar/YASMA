import firebase from "../utils/firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../Redux/store/store";
import { useState, useEffect } from "react";
import { Provider, useSelector, useStore } from "react-redux";
import Index from "../navigation/Index";
import Login from "../screen/Login";
import Register from "../screen/Register";

const Stack = createStackNavigator();

const AuthScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerStyle: { backgroundColor: "#DCE5EC" },}}/>
        <Stack.Screen name="Register" component={Register} options={{headerStyle: { backgroundColor: "#DCE5EC" },}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Auth = () => {
  const [islogin, setislogin] = useState(false);
  const { isLogin } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("-------------", isLogin);
    setislogin(isLogin);
  }, [isLogin]);
  return islogin ? <Index /> : <AuthScreen />;
};

function MyStack() {
  // console.log(firebase);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Auth />
      </PersistGate>
    </Provider>
  );
}
export default MyStack;
