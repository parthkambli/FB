// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case "GET_PROFILE":
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };

    case "GET_USER_DATA":
      return {
        ...state,
        userData: action.payload,
        loading: false,
      };

    case "EDIT_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };

    case "SUCCESS":
      return {
        ...state,
        success: action.payload,
      };

    case "RESET_SUCCESS":
      return {
        ...state,
        success: action.payload,
      };

    case "RESET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
