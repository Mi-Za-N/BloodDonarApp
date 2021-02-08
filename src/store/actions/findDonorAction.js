const searchCitypAction = (city) => {
  return (dispatch) => {
    dispatch({type: 'CITY', payload: {city}});
  };
};

const donorUIDAction = (uid) => {
  return (dispatch) => {
    dispatch({type: 'DONORUID', payload: {uid}});
  };
};

const resetfindDonorAction = () => {
  return (dispatch) => {
    dispatch({type: 'RESET'});
  };
};

export {searchCitypAction, resetfindDonorAction, donorUIDAction};
