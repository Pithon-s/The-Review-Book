import firebase from "firebase";

export const searchTeacher = (toFind) => {
  return async (dispatch) => {
    const data = [];
    firebase
      .firestore()
      .collection("teachers")
      .where("fname", "==", toFind)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let temp = doc.data();
          temp.id = doc.id;
          data.push(temp);
        });

        console.log("Data fetched for server");
      })
      .catch((error) => {
        console.log("Error getting documents: ", error.message);
      })
      .finally(() => {
        dispatch({
          type: "SEARCH_TEACHER",
          newData: data,
        });
      });
  };
};

export const setLoading = (decision) => {
  return async (dispatch) => {
    console.log("Loading set: " + decision);
    dispatch({ type: "SET_LOADING", Data: decision });
  };
};

export const showSelectedTeacherData = (data) => {
  return async (dispatch) => {
    dispatch({ type: "SHOW_DATA", Data: data });
  };
};
export const fetchTeacherComments = (id) => {
  return async (dispatch) => {
    const data = [];
    firebase
      .firestore()
      .collection("comments")
      .where("dept", "==", deptCode)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let temp = doc.data();
          temp.id = doc.id;
          data.push(temp);
        });

        console.log("Data fetched for server");
      })
      .catch((error) => {
        console.log("Error getting documents: ", error.message);
      })
      .finally(() => {
        console.log(data);
        dispatch({
          type: "SEARCH_TEACHER",
          newData: data,
        });
      });
  };
};
export const fetchTeacherRating = (tId, sId) => {
  return async (dispatch) => {
    const data = [];
    console.log("TID" + tId + " SID" + sId);
    firebase
      .firestore()
      .collection("ratings")
      .where("tEmail", "==", tId)
      .where("sEmail", "==", sId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          dispatch({
            type: "RATING_FETCHED",
            newData: doc.data().rating,
          });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error.message);
      })
      .finally(() => {});
  };
};
export const serachByDept = (deptCode, setLoading) => {
  return async (dispatch) => {
    const data = [];
    firebase
      .firestore()
      .collection("teachers")
      .where("dept", "==", deptCode)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let temp = doc.data();
          temp.id = doc.id;
          let found = deptArray.filter((element) => {
            if (element.code === temp.dept) {
              return element.title;
            }
          });
          temp.dept = found[0].title;
          data.push(temp);
        });

        console.log("Data fetched for server");
      })
      .catch((error) => {
        console.log("Error getting documents: ", error.message);
      })
      .finally(() => {
        console.log(data);
        dispatch({
          type: "SEARCH_TEACHER",
          newData: data,
        });
      });
  };
};

export const sendComment = (commentData, id) => {
  return async (dispatch) => {
    //Teacher k emails pele se add krne pre ge comments collection me
    firebase
      .firestore()
      .collection("comments")
      .doc(id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(commentData),
      })
      .then(() => {
        firebase
          .firestore()
          .collection("teachers")
          .doc(id)
          .update({
            commentCount: firebase.firestore.FieldValue.increment(1),
          })
          .then(() => {
            dispatch({ type: "COMMENT_SENT", newData: commentData });
            console.log("Document successfully written!");
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
};

export const setRating = (ratingData, tId, sId) => {
  return async (dispatch) => {
    const data = {
      sEmail: sId,
      tEmail: tId,
      rating: ratingData,
    };
    firebase
      .firestore()
      .collection("ratings")
      .doc()
      .set(data)
      .then(() => {
        firebase
          .firestore()
          .collection("teachers")
          .doc(tId)
          .update({
            totalRating: firebase.firestore.FieldValue.increment(ratingData),
            ratingCount: firebase.firestore.FieldValue.increment(1),
          })
          .then(() => {
            dispatch({ type: "RATING_SET", newData: ratingData });
            console.log("Document successfully written!");
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
};
