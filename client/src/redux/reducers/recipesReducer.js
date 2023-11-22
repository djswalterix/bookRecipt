const initialState = {
  data: [],
  loading: false,
  error: null,
};

const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_RECIPES_START":
      return { ...state, loading: true, error: null };
    case "FETCH_RECIPES_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_RECIPES_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default recipesReducer;
