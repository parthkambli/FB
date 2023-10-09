// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case "GET_PROFILE":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case "EDIT_PROFILE":
      return {
        ...state,
        user: action.payload,
      };

    case "LOADING":
      return {
        ...state,
        loading: action.payload,
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
