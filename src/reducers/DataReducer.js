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

  teacherData: {},
  comments: [
    {
      commentText: "",
      imgURL: "",
      name: "",
    },
  ],
  rating: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_TEACHER":
      console.log("DataReducer-> Dispath Search Teacher!");
      return {
        ...state,
        teachers: action.newData,
      };

    case "SHOW_DATA":
      console.log("DataReducer-> Show DATA : " + action.Data);
      return {
        ...state,
        teacherData: action.Data,
        rating: 0,
      };
    case "COMMENT_DATA":
      console.log("DataReducer-> Comment Data : " + action.newData);
      return {
        ...state,
        comments: action.newData.reverse(),
      };
    case "FAILED_COMMENT_DATA":
      console.log("DataReducer-> Failed Comment Data : ");
      return {
        ...state,
      };
    case "COMMENT_SENT":
      console.log("DataReducer-> Comment sent : ");
      state.teacherData.commentCount = state.teacherData.commentCount++;
      return {
        ...state,
        teacherData: {
          //isme msla ha
          ...state.teacherData,
          commentCount: state.teacherData.commentCount++,
        },
        comments: [action.newData, ...state.comments],
      };
    case "RATING_FETCHED":
      console.log("DataReducer-> Rating Fetched : ");
      return {
        ...state,
        rating: action.newData,
      };
    case "RATING_SET":
      console.log("DataReducer-> Rating set : ");
      return {
        ...state,
        rating: action.newData,
      };
    default:
      return state;
  }
};
