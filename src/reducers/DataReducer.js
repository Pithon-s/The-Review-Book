const initialState = {
  teachers: [],
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
      return {
        ...state,
        teachers: action.newData,
      };
    case "SHOW_DATA":
      return {
        ...state,
        teacherData: action.Data,
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
    case "COMMENT_SENT":
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
