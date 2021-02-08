const INITIAL_STATE = {
  donorUID: null,
  city:""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CITY':
      return {
        ...state,
        city: action.payload.city,
      };
    case 'DONORUID':
      return {
        ...state,
        donorUID: action.payload.uid,
      };
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
};
