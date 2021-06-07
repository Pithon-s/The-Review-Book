const initialState = {
  teachers: [
    // {
    //   commentCount: "10",
    //   dept: "CS",
    //   fname: "nadeem",
    //   id: "nadeemghafoor@cuilahore.edu.pk",
    //   imgURL: "https://picsum.photos/200/300",
    //   lname: "ghafoor",
    //   nickname: "cng",
    //   ratingCount: "5",
    //   totalRating: "20",
    // },
  ],

  isLoading: false,
  itemBlur: false,
  teacherData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_TEACHER":
      console.log("DataReducer-> Dispath Search Teacher!");
      return {
        ...state,
        teachers: action.newData,
        isLoading: false,
        itemBlur: true,
      };
    case "SET_LOADING":
      console.log("DataReducer-> SET: " + action.Data);
      return {
        ...state,
        isLoading: action.Data,
        itemBlur: action.Data,
      };
    case "SHOW_DATA":
      console.log("DataReducer-> Show DATA : " + action.Data);
      return {
        ...state,
        teacherData: action.Data,
      };

    default:
      return state;
  }
};
