const initialState = {
  teachers: [],
  teacherData: {},
  comments: [
    {
      commentText: "",
      imgURL: "",
      name: "",
      timeStamp: "",
    },
  ],
  list: [],
  rating: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCHLIST":
      return {
        ...state,
        list: action.Data,
      };
    case "SEARCH_TEACHER":
      return {
        ...state,
        teachers: action.newData,
      };
    case "COMMENT_SENT":
      return {
        ...state,
      };
    case "SHOW_DATA":
      return {
        ...state,
        teacherData: action.Data,
        rating: state.rating,
      };
    case "COMMENT_DATA":
      return {
        ...state,
        comments: action.newData.reverse(),
      };
    case "FAILED_COMMENT_DATA":
      return {
        ...state,
      };
    case "RATING_FETCHED":
      return {
        ...state,
        rating: action.newData,
      };
    case "RATING_SET":
      return {
        ...state,
        rating: action.newData,
      };
    default:
      return state;
  }
};
