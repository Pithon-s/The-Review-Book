import firebase from "firebase";
import deptArray from "../utilities/DepartmentData";
//-------Action to fetch data of specific searched teacher----//
export const searchTeacher = (toFind, setLoading) => {
  return async (dispatch) => {
    console.log(toFind);

    fname = toFind.substr(0, toFind.indexOf(" "));
    lname = toFind.substr(toFind.indexOf(" ") + 1);

    console.log(fname);
    console.log(lname);

    const data = [];
    firebase
      .firestore()
      .collection("teachers")
      .where("fname" || "lname", "==", fname || lname)
      //.where("fname", "==", toFind)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("inside");
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
        dispatch({
          type: "SEARCH_TEACHER",
          newData: data,
        });
        setLoading(false);
      });
  };
};
