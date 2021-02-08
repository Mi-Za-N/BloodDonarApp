const INITIAL_STATE = {
  bloodGroupUpdate: '',
  nameUpdate: '',
  ageUpdate: '',
  genderUpdate: '',
  cityUpdate: '',
  contactUpdate: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'BLOODGROUPUPDATE':
      return {
        ...state,
        bloodGroupUpdate: action.payload.group,
      };

    case 'NAMEUPDATE':
      return {
        ...state,
        nameUpdate: action.payload.name,
      };
    case 'AGEUPDATE':
      return {
        ...state,
        ageUpdate: action.payload.age,
      };
    case 'GENDERUPDATE':
      return {
        ...state,
        genderUpdate: action.payload.gender,
      };
    case 'CITYUPDATE':
      return {
        ...state,
        cityUpdate: action.payload.city,
      };
    case 'CONTACTUPDATE':
      return {
        ...state,
        contactUpdate: action.payload.contact,
      };
    default:
      return state;
  }
};
