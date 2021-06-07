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
