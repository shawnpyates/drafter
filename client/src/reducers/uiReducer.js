const initialState = { view: 'mainMenu' };

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_VIEW':
      return { ...state, view: action.payload }
    default:
      break;
  }
  return state;
};

export default uiReducer;
