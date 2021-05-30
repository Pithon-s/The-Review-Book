const initialState = {
  loading: false,
  isLogged: false,
  isVerified: false,
  user: {
    email: "",
    username: "",
    profilePictureURI: "",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        loading: false,
        isLogged: true,
        user: {
          email: action.payload.email,
          // username: action.payload.username,
          // profilePictureURI: action.payload.profilePictureURI,
        },
      };

    case "LOGOUT":
      return {
        ...state,
        isLogged: false,
      };

    default:
      return state;
  }
};
