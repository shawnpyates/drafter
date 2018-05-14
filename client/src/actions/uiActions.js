const updateView = view => (dispatch) => {
  dispatch({ type: 'UPDATE_VIEW', payload: view });
};

export default updateView;
