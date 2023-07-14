const ExtractObjectDataToArray = inputObject => {
  const tempPost = [];
  // console.log("39", inputObject);
  Object.keys(inputObject).forEach((element) => {
    const Id = inputObject[element];
    tempPost.push(Id);
    // console.log("6", element);
    // onValue(ref(getDatabase(), "posts/" + Id), (querySnapShot1) => {
    //   let data = querySnapShot1.val();
    // });

    // console.log("38", userPostId);
  });
  return tempPost;
};
export { ExtractObjectDataToArray };
