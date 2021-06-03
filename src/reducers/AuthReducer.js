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
    isAnonymous: false,
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
    case "ANONYMOUS_LOGIN":
      return {
        ...state,
        isLogged: true,
        user: {
          isAnonymous: true,
          username: "Anonymous",
        },
      };
    case "LOGOUT":
      return {
        ...initialState,
        isReady: true,
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
        },
      };
    case "USER_VERIFIED":
      return {
        ...state,
        isVerified: true,
        isModelVisible: false,
        isLogged: true,
        isLoading: false,
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
