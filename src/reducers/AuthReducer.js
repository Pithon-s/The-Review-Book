const initialState = {
  loading: false,
  isLogged: false,
  isVerified: false,
  isReady: false,
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
        isReady: true,
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

    case "AUTO_LOGIN_FAILED":
      return {
        ...state,
        isReady: true,
      };

    default:
      return state;
  }
};
