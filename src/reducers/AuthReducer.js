const initialState = {
  isLogged: false,
  isVerified: false,
  isReady: false,
  isLoading: false,
  isModelVisible: false,
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
        isLoading: false,
        user: {
          email: action.payload.email,
          password: action.payload.password,
          username: action.payload.username,
          profilePictureURI: action.payload.profilePictureURI,
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
        isLoading: false,
      };
    case "SIGNUP":
      return {
        ...state,
        isLoading: false,
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
        isModelVisible: false,
        isLogged: true,
      };
    case "VERIFICATION_SENT":
      return {
        ...state,
        isModelVisible: true,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload.value,
      };
    case "SET_IS_MODEL_VISIBLE":
      return {
        ...state,
        isModelVisible: action.payload.value,
      };

    default:
      return state;
  }
};
