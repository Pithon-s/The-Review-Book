import firebase from "firebase";
import { useSelector } from "react-redux";

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
export const serachByDept = (deptCode) => {
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
