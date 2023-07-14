import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import userDetailReducer from "../reducer/reducer";
import { createStore, applyMiddleware,combineReducers } from "redux";
import thunk from "redux-thunk";

const persistConfig = {
  key: "auth",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({ auth: persistReducer(persistConfig,userDetailReducer) });

// const persistedReducer = persistReducer(persistConfig, userDetailReducer);
const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
export default store;
// export {store, persistor}

// import { createStore, combineReducers } from "redux";
// import userDetailReducer from "../reducer/reducer";

// const rootReducer = combineReducers({ auth: userDetailReducer });
// // const rootReducer = combineReducers({auth: userDetailReducer});

// const configureStore = createStore(rootReducer);

// export default configureStore;
