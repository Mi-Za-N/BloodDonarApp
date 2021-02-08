const bloodGroupAction = (group) => {
  return (dispatch) => {
    dispatch({type: 'BLOODGROUP', payload: {group}});
  };
};

const nameAction = (name) => {
  return (dispatch) => {
    dispatch({type: 'NAME', payload: {name}});
  };
};

const ageAction = (age) => {
  return (dispatch) => {
    dispatch({type: 'AGE', payload: {age}});
  };
};

const genderAction = (gender) => {
  return (dispatch) => {
    dispatch({type: 'GENDER', payload: {gender}});
  };
};
const cityAction = (city) => {
  return (dispatch) => {
    dispatch({type: 'CITY', payload: {city}});
  };
};
const contactAction = (contact) => {
  return (dispatch) => {
    dispatch({type: 'CONTACT', payload: {contact}});
  };
};
const successAction = (success) => {
  return (dispatch) => {
    dispatch({type: 'SUCCESS', payload: {success}});
  };
};

const resetBecomeDonorAction = () => {
  return (dispatch) => {
    dispatch({type: 'RESET'});
  };
};

export {
  bloodGroupAction,
  nameAction,
  genderAction,
  ageAction,
  contactAction,
  cityAction,
  successAction,
  resetBecomeDonorAction,
};
