const INITIAL_STATE = {
  initializing: true,
  user: null,
  name: '',
  email: '',
  password: '',
  loader: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'INITIALIZATION':
      return {
        ...state,
        initializing: action.payload.flag,
      };
    case 'NAME':
      // console.log('payload User ==>', action.payload.user);
      return {
        ...state,
        name: action.payload.name,
      };
    case 'EMAIL':
      // console.log('payload User ==>', action.payload.user);
      return {
        ...state,
        email: action.payload.email,
      };
    case 'PASSWORD':
      // console.log('payload User ==>', action.payload.user);
      return {
        ...state,
        password: action.payload.password,
      };
    case 'LOADER':
      // console.log('payload User ==>', action.payload.user);
      return {
        ...state,
        loader: action.payload.flag,
      };
    case 'USER':
      // console.log('payload User ==>', action.payload.user);
      return {
        ...state,
        user: action.payload.user,
      };
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
};
