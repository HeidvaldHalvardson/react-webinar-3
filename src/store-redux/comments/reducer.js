export const initialState = {
  data: [],
  count: 0,
  waiting: false,
  errors: null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: [], count: 0, waiting: true };

    case 'comments/load-success':
      return { ...state, data: action.payload.data, count: action.payload.count, waiting: false };

    case 'comments/load-error':
      return { ...state, data: [], count: 0, waiting: false };

    default:
      return state;
  }
}

export default reducer;
