import firebase from "firebase";
import deptArray from "../utilities/DepartmentData";
//-------Action to fetch data of specific searched teacher----//
export const searchTeacher = (toFind, setLoading) => {
  return async (dispatch) => {
    fname = toFind.split(" ")[0];
    lname = toFind.replace(fname + " ", "");

    //console.log(fname);
    //console.log(lrname);
    const data = [];
    firebase
      .firestore()
      .collection("teachers")
      .where("fname" || "lname", "==", fname || lname)
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
        dispatch({
          type: "SEARCH_TEACHER",
          newData: data,
        });
        setLoading(false);
      });
  };
};

export const setLoading = (decision) => {
  return async (dispatch) => {
    console.log("Loading set: " + decision);
    dispatch({ type: "SET_LOADING", Data: decision });
  };
};

//------------Action to pass selected teacher data in MainScreen to the TeacherProfileScreen
export const showSelectedTeacherData = (data) => {
  return async (dispatch) => {
    dispatch({ type: "SHOW_DATA", Data: data });
  };
};
export const fetchTeacherData = (id) => {
  return async (dispatch) => {
    const data = [];
    firebase
      .firestore()
      .collection("comments")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          //console.log("Document data:", doc.data().comments);
          dispatch({
            type: "COMMENT_DATA",
            newData: doc.data().comments,
          });
        } else {
          dispatch({
            type: "FAILED_COMMENT_DATA",
          });
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error.message);
      })
      .finally(() => {});
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
        setLoading(false);
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
