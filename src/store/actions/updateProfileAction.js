const bloodGroupUpdateAction = (group) => {
  return (dispatch) => {
    dispatch({type: 'BLOODGROUPUPDATE', payload: {group}});
  };
};

const nameUpdateAction = (name) => {
  return (dispatch) => {
    dispatch({type: 'NAMEUPDATE', payload: {name}});
  };
};

const ageUpdateAction = (age) => {
  return (dispatch) => {
    dispatch({type: 'AGEUPDATE', payload: {age}});
  };
};

const genderUpdateAction = (gender) => {
  return (dispatch) => {
    dispatch({type: 'GENDERUPDATE', payload: {gender}});
  };
};
const cityUpdateAction = (city) => {
  return (dispatch) => {
    dispatch({type: 'CITYUPDATE', payload: {city}});
  };
};
const contactUpdateAction = (contact) => {
  return (dispatch) => {
    dispatch({type: 'CONTACTUPDATE', payload: {contact}});
  };
};

export {
  bloodGroupUpdateAction,
  nameUpdateAction,
  ageUpdateAction,
  genderUpdateAction,
  cityUpdateAction,
  contactUpdateAction,
};
