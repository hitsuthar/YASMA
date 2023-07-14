import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  get,
  set,
  child,
  push,
  update,
} from "firebase/database";
// import { useState, useEffect } from "react";
import { UploadImage } from "./FirebaseImage";
// import { saveUserDetails } from "../Redux/Actions/action";
import { useDispatch } from "react-redux";
import { updateFollowingData } from "../Redux/Actions/action";
import { async } from "@firebase/util";

const auth = getAuth();

const FireBaseRegisterUser = async (
  email,
  password,
  userName,
  fullName,
  phoneNumber
) => {
  try {
    const authUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (authUser.user.uid) {
      const db = getDatabase();
      const reference = ref(db, "users/" + authUser.user.uid);
      set(reference, {
        email: email,
        userName: userName,
        fullName: fullName,
        phoneNumber: phoneNumber,
        uid: authUser.user.uid,
        profilePicture:
          "https://firebasestorage.googleapis.com/v0/b/yasma-a52a0.appspot.com/o/profileImage%2FdefaultProfileImage?alt=media&token=bd29fa97-ac23-41ca-af99-17c6852793b0",
        follower: {},
        following: {},
      });
      alert("Account Created");
    }
    return authUser.user.uid;
  } catch (error) {
    alert(error);
  }
};

const FireBaseSetPostData = async (
  postId,
  uid,
  userName,
  imageUrl,
  caption
) => {
  const db = getDatabase();
  const time = new Date().getTime();
  const postReference = ref(db, "posts/" + postId);
  set(postReference, {
    userName: userName,
    uid: uid,
    imagePath: imageUrl,
    caption: caption,
    createdAt: time,
    postId: postId,
    likedBy: {},
    comments: {},
  });

  try {
    const userReference = ref(db, "users/" + uid + "/post/");
    const userPushReference = push(userReference);
    set(userPushReference, postId);
  } catch (e) {
    console.log(e);
  }
};
const UploadPost = async (uid, userName, imagePath, caption) => {
  const db = getDatabase();
  const newPostKey = push(child(ref(db), "post/")).key;
  console.log("post key", newPostKey);
  const imageUrl = await UploadImage(imagePath, "posts/" + newPostKey);
  FireBaseSetPostData(newPostKey, uid, userName, imageUrl, caption);
  return imageUrl;
};

const UpdateUserData = (uid, key, userData) => {
  const db = getDatabase();
  // A post entry.
  //   const userData = {
  //       email:email,
  //       userName:userName,
  //       fullName: fullName,
  //       phoneNumber: phoneNumber,
  //       uid: uid,
  //       profilePicture:pictureUri
  //   };

  // Get a key for a new Post.
  //   const newPostKey = push(child(ref(db), 'users/')).key;
  //   console.log("postkey === ",newPostKey);
  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates["/users/" + uid + "/" + key] = userData;
  console.log(updates);
  return update(ref(db), updates);
};

const GetDataById = async (firebasePath, uid) => {
  const snapshot = await get(ref(getDatabase(), firebasePath + "/" + uid));
  return snapshot.val();
  // return onValue(ref(getDatabase(), "users/" + uid), (querySnapShot) => {
  //   let data = Object.values(querySnapShot.val())
  //   let userdata = { ...data };
  //   console.log("101", userdata);
  //   k = userdata;
  //   return data;
  // });
  // return k;
};

const onFollow = async (followUid, myUid) => {
  const db = getDatabase();
  try {
    const userFollowingReference = ref(db, "users/" + myUid + "/following/");
    const userFollowingPushReference = push(userFollowingReference);
    set(userFollowingPushReference, followUid);

    const userFollowerReference = ref(db, "users/" + followUid + "/follower/");
    const userFollowerPushReference = push(userFollowerReference);
    set(userFollowerPushReference, myUid);
  } catch (e) {
    console.log(e);
  }
};
const onUnFollow = async (unFollowUid, myUid) => {
  const db = getDatabase();
  try {
    const followingDataArray = Object.values(
      await GetDataById("users/", myUid + "/following")
    );
    const followerDataArray = Object.values(
      await GetDataById("users/", unFollowUid + "/follower")
    );
    const indexOfFollowing = followingDataArray.indexOf(unFollowUid);
    const indexOfFollower = followerDataArray.indexOf(myUid);
    if (indexOfFollowing > -1 && indexOfFollower > -1) {
      followingDataArray.splice(indexOfFollowing, 1);
      followerDataArray.splice(indexOfFollower, 1);

      const unFollowingreference = ref(db, "users/" + myUid + "/following");
      set(unFollowingreference, followingDataArray);

      const unFollowerreference = ref(db, "users/" + unFollowUid + "/follower");
      set(unFollowerreference, followerDataArray);
    }
  } catch (e) {
    console.log(e);
  }
};

const onLike = async (postId, myUid) => {
  const db = getDatabase();
  try {
    const userLikeReference = ref(db, "posts/" + postId + "/likedBy");
    const userLikePushReference = push(userLikeReference);
    set(userLikePushReference, myUid);
  } catch (e) {
    console.log(e);
  }
};
const onUnLike = async (postId, myUid) => {
  const db = getDatabase();
  try {
    const likedDataArray = Object.values(
      await GetDataById("posts/", postId + "/likedBy")
    );
    const indexOfLiked = likedDataArray.indexOf(myUid);
    if (indexOfLiked > -1) {
      likedDataArray.splice(indexOfLiked, 1);

      const unLikereference = ref(db, "posts/" + postId + "/likedBy");
      set(unLikereference, likedDataArray);
    }
  } catch (e) {
    console.log(e);
  }
};

const onComment = async (postId, myUid, commentContent) => {
  const db = getDatabase();
  try {
    const userCommentReference = ref(db, "posts/" + postId + "/comments");
    const userCommentPushReference = push(userCommentReference);
    set(userCommentPushReference,{
      uid: myUid,
      content: commentContent
    });
  } catch (e) {
    console.log(e);
  }
};

export {
  FireBaseRegisterUser,
  UpdateUserData,
  FireBaseSetPostData,
  UploadPost,
  GetDataById,
  onFollow,
  onUnFollow,
  onLike,
  onUnLike,
  onComment,
};
