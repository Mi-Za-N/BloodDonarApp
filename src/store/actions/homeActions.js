const userAction = (user) => {
  // console.log('user from action ==> ', user);
  return (dispatch) => {
    dispatch({type: 'USER', payload: {user}});
  };
};
const nameAction = (name) => {
  // console.log('user from action ==> ', user);
  return (dispatch) => {
    dispatch({type: 'NAME', payload: {name}});
  };
};
const emailAction = (email) => {
  // console.log('user from action ==> ', user);
  return (dispatch) => {
    dispatch({type: 'EMAIL', payload: {email}});
  };
};
const passwordAction = (password) => {
  // console.log('user from action ==> ', user);
  return (dispatch) => {
    dispatch({type: 'PASSWORD', payload: {password}});
  };
};

const initializationAction = (flag) => {
  return (dispatch) => {
    dispatch({type: 'INITIALIZATION', payload: {flag}});
  };
};
const loaderAction = (flag) => {
  return (dispatch) => {
    dispatch({type: 'LOADER', payload: {flag}});
  };
};

const resethomeAction = () => {
  return (dispatch) => {
    dispatch({type: 'RESET'});
  };
};

export {
  userAction,
  initializationAction,
  nameAction,
  emailAction,
  passwordAction,
  loaderAction,
  resethomeAction,
};
