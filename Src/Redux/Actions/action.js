export const saveUserDetails = (
  userName,
  email,
  fullName,
  phoneNumber,
  profilePicture,
  post,
  follower,
  following
) => {
  // console.log("-------------", userName, password);
  return {
    type: "SAVE_USER_DETAIl",
    payload: {
      userName: userName,
      email: email,
      fullName: fullName,
      phoneNumber: phoneNumber,
      profilePicture: profilePicture,
      post: post,
      follower: follower,
      following: following,
    },
  };
};
export const saveAllUser = (users) => {
  return {
    type: "SAVE_ALL_USERS",
    allUsers: users,
  };
};
export const saveAllPost = (posts) => {
  return {
    type: "SAVE_ALL_POSTS",
    allPosts: posts,
  };
};
export const updatePost = (post) => {
  return {
    type: "UPDATE_POST",
    post: post,
  };
};
export const updateFollowingData = (following) => {
  return {
    type: "UPDATE_FOLLOWING_DATA",
    following: following,
  };
};
export const saveToken = (uid) => {
  return {
    type: "SAVE_TOKEN",
    uid: uid,
  };
};
export const saveRandomNumber = (randomNumber) => {
  return {
    type: "SAVE_RANDOM_NUMBER",
    randomNumber: randomNumber,
  };
};
export const onLogout = () => {
  return {
    type: "LOGOUT",
    payload: {
      uid: "",
      userName: "",
      email: "",
      fullName: "",
      phoneNumber: "",
      profilePicture: "",
      posts: [],
      follower: [],
      following: [],
    },
  };
};
