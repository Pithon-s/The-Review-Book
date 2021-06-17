import firebase from "firebase";
import deptArray from "../utilities/DepartmentData";

export const fetchTeachersList = () => {
  return async (dispatch) => {
    firebase
      .firestore()
      .collection("teacherslist")
      .doc("list")
      .get()
      .then((doc) => {
        console.log("DATa:" + doc.data().data);

        if (doc.exists) {
          dispatch({ type: "FETCHLIST", Data: doc.data().data });
        }
      })
      .catch((err) => console.log(err.message));
  };
};
// Action to fetch data of specific searched teacher
export const searchTeacher = (toFind, setLoading) => {
  return async (dispatch) => {
    fname = toFind.split(" ")[0];
    lname = toFind.replace(fname + " ", "");
    const data = [];
    firebase
      .firestore()
      .collection("teachers")
      .where("fname" || "lname", "==", fname || lname)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let temp = doc.data();
          temp.id = doc.id;
          let found = deptArray.filter((element) => {
            if (element.code === temp.dept) {
              return element.title;
            }
          });
          temp.dept = found[0].title;
          // console.log(doc.data());
          data.push(temp);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error.message);
      })
      .finally(() => {
        if (data.length == 0) {
        } else {
          dispatch({
            type: "SEARCH_TEACHER",
            newData: data,
          });
        }
        setLoading(false);
      });
  };
};

// Action to pass selected teacher data in MainScreen to the TeacherProfileScreen
export const showSelectedTeacherData = (data) => {
  return async (dispatch) => {
    // console.log(data);
    firebase
      .firestore()
      .collection("teachers")
      .doc(data)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          // console.log(snapshot.data());
          let temp = snapshot.data();
          temp.id = snapshot.id;
          let found = deptArray.filter((element) => {
            if (element.code === temp.dept) {
              return element.title;
            }
          });
          temp.dept = found[0].title;
          dispatch({ type: "SHOW_DATA", Data: temp });
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
};

export const fetchTeacherData = (id) => {
  return async (dispatch) => {
    firebase
      .firestore()
      .collection("comments")
      .doc(id)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          dispatch({
            type: "COMMENT_DATA",
            newData: snapshot.data().comments,
          });
        } else {
          dispatch({
            type: "FAILED_COMMENT_DATA",
          });
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error.message);
      });
  };
};

export const fetchTeacherRating = (tId, sId) => {
  return async (dispatch) => {
    firebase
      .firestore()
      .collection("ratings")
      .where("tEmail", "==", tId)
      .where("sEmail", "==", sId)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          dispatch({
            type: "RATING_FETCHED",
            newData: doc.data().rating,
          });
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error.message);
      });
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
            dispatch({ type: "COMMENT_SENT" });
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
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
};
