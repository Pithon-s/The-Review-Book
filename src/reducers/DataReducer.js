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
    case "SHOW_DATA":
      return {
        ...state,
        teacherData: action.Data.teacherData,
        rating: state.rating,
      };
    case "SEARCH_TEACHER":
      return {
        ...state,
        teachers: action.newData,
      };
    case "COMMENT_DATA":
      return {
        ...state,
        comments: action.newData.reverse(),
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
    case "ZERO_RATING":
      return {
        ...state,
        rating: 0,
      };
    case "CLEAR_TEACHERS":
      return {
        ...state,
        teachers: [],
      };
    default:
      return state;
  }
};
