const initialState = {
  users: [],
  userStatus: [],
  checkedUser: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA_REQUEST":
      return {
        ...state,
        users: action.payload,
      };
      case "USER_STATUS":
        return {
          ...state,
          userStatus: action.payload,
        };
        case "CHECKED_STATUS":
          return {
            ...state,
            checkedUser: action.payload,
          };
    default:
      return state;
  }
};
