const INITIAL_STATE = {
  bloodGroup: '',
  name: '',
  age: '',
  gender: '',
  city: '',
  contact: '',
  success: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'BLOODGROUP':
      return {
        ...state,
        bloodGroup: action.payload.group,
      };
    case 'NAME':
      return {
        ...state,
        name: action.payload.name,
      };
    case 'AGE':
      return {
        ...state,
        age: action.payload.age,
      };
    case 'GENDER':
      return {
        ...state,
        gender: action.payload.gender,
      };
    case 'CITY':
      return {
        ...state,
        city: action.payload.city,
      };
    case 'CONTACT':
      return {
        ...state,
        contact: action.payload.contact,
      };
    case 'SUCCESS':
      return {
        ...state,
        success: action.payload.success,
      };
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
};
