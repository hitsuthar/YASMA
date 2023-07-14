import { REHYDRATE } from "redux-persist";
const initialState = {
  isLogin: false,
  uid: "",
  userName: "",
  email: "",
  fullName: "",
  phoneNumber: "",
  profilePicture: "",
  post: [],
  follower: [],
  following: [],
  allUsers: [],
  allPost: [],
  randomNumber: "",
};

const userDetailReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case REHYDRATE:
      return {
        ...state,
      };
    case "SAVE_USER_DETAIl": {
      return {
        ...state,
        userName: action.payload.userName,
        email: action.payload.email,
        fullName: action.payload.fullName,
        phoneNumber: action.payload.phoneNumber,
        profilePicture: action.payload.profilePicture,
        post: action.payload.post,
        follower: action.payload.follower,
        following: action.payload.following,
      };
    }
    case "SAVE_ALL_USERS": {
      return {
        ...state,
        allUsers: action.allUsers,
      };
    }
    case "SAVE_ALL_POST": {
      return {
        ...state,
        allPosts: action.allPosts,
      };
    }
    case "UPDATE_POST": {
      return {
        ...state,
        post: action.post,
      };
    }
    case "UPDATE_FOLLOWING_DATA": {
      return {
        ...state,
        following: action.following,
      };
    }
    case "SAVE_TOKEN": {
      return {
        ...state,
        isLogin: true,
        uid: action.uid,
      };
    }
    case "SAVE_RANDOM_NUMBER": {
      return {
        ...state,
        randomNumber: action.randomNumber,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isLogin: false,
        uid: "",
        userName: "",
        email: "",
        fullName: "",
        phoneNumber: "",
        profilePicture: "",
        posts: [],
        follower: [],
        following: [],
        allUsers: "",
        allPostData: "",
      };
    }
    default: {
      return state;
    }
  }
};
export default userDetailReducer;
