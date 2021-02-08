import {combineReducers} from 'redux';
import homeReducer from './homeReducer';
import becomeDonorReducer from './becomeDonorReducer';
import findDonorReducer from './findDonorReducer';
import updateProfileReducer from './updateProfileReducer';

export default combineReducers({
  homeReducer,
  becomeDonorReducer,
  findDonorReducer,
  updateProfileReducer,
});
