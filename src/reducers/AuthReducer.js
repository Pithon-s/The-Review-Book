const initialState = {
  isLogged: false,
  isVerified: false,
  isReady: false,
  user: {
    email: "",
    password: "",
    username: "",
    profilePictureURI: "",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isReady: true,
        user: {
          email: action.payload.email,
          password: action.payload.password,
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
    case "SIGNUP":
      return {
        ...state,
        user: {
          email: action.payload.email,
          password: action.payload.password,
          username: action.payload.username,
          // profilePictureURI: action.payload.profilePictureURI,
        },
      };
    case "USER_VERIFIED":
      return {
        ...state,
        isVerified: true,
        isLogged: true,
      };
    case "VERIFICATION_SENT":
      return {
        ...state,
      };

    default:
      return state;
  }
};
