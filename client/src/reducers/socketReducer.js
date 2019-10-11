const initialState = {
  socket: null,
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'WRITE_SOCKET_CONNECTION_TO_STATE':
      return { ...state, socket: action.payload };
    default:
      break;
  }
  return state;
};

export default socketReducer;
