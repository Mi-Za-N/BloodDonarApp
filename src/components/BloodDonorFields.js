import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {connect} from 'react-redux';
import {
  genderAction,
  nameAction,
  ageAction,
  cityAction,
  contactAction,
} from '../store/actions/becomeDonorAction';
import {
  genderUpdateAction,
  nameUpdateAction,
  ageUpdateAction,
  cityUpdateAction,
  contactUpdateAction,
} from '../store/actions/updateProfileAction';

const BloodDonorFields = ({
  user,
  name,
  age,
  gender,
  city,
  contact,
  nameActionSet,
  ageActionSet,
  cityActionSet,
  contactActionSet,
  genderActionSet,
  screen,
  nameUpdateActionSet,
  genderUpdateActionSet,
  ageUpdateActionSet,
  cityUpdateActionSet,
  contactUpdateActionSet,
  nameUpdate,
  ageUpdate,
  genderUpdate,
  cityUpdate,
  contactUpdate,
}) => {
  const setName =
    screen === 'updateScreen' ? nameUpdateActionSet : nameActionSet;
  const setGender =
    screen === 'updateScreen' ? genderUpdateActionSet : genderActionSet;
  const setAge = screen === 'updateScreen' ? ageUpdateActionSet : ageActionSet;
  const setCity =
    screen === 'updateScreen' ? cityUpdateActionSet : cityActionSet;
  const setContact =
    screen === 'updateScreen' ? contactUpdateActionSet : contactActionSet;

  const nameValue = screen == 'updateScreen' ? nameUpdate : name;
  const ageValue = screen == 'updateScreen' ? ageUpdate : age;
  const cityValue = screen == 'updateScreen' ? cityUpdate : city;
  const genderValue = screen == 'updateScreen' ? genderUpdate : gender;
  const contactValue = screen == 'updateScreen' ? contactUpdate : contact;

  useEffect(() => {
    screen == 'becomedonor' && nameActionSet(user.displayName);
    if (screen == 'updateScreen') {
      setName(user.displayName);
      setGender(user.gender);
      setAge(user.age);
      setCity(user.city);
      setContact(user.contact);
    }
  }, []);

  return (
    <View style={{width: '100%', alignItems: 'center'}}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Name :</Text>
      </View>
      <View style={styles.inputFieldNameCont}>
        <TextInput
          style={styles.inputFieldName}
          defaultValue={nameValue}
          editable={screen === 'becomedonor' ? false : true}
          onChangeText={(text) => {
            setName(text);
          }}
        />
        {screen == 'updateScreen' && nameValue === '' && (
          <Text style={styles.helpText}>* name required</Text>
        )}
      </View>

      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Gender :</Text>
      </View>
      <View style={styles.genderCont}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setGender('male')}
          style={
            genderValue === 'male'
              ? styles.activeBloodGroup
              : styles.bloodGroupButton
          }>
          <Text
            style={
              genderValue === 'male' ? styles.bgTextActive : styles.bgText
            }>
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setGender('female')}
          style={
            genderValue === 'female'
              ? styles.activeBloodGroup
              : styles.bloodGroupButton
          }>
          <Text
            style={
              genderValue === 'female' ? styles.bgTextActive : styles.bgText
            }>
            Female
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Age :</Text>
      </View>
      <View style={styles.inputFieldNameCont}>
        <TextInput
          keyboardType="decimal-pad"
          style={styles.inputFieldName}
          defaultValue={ageValue}
          value={ageValue}
          onChangeText={(text) => {
            if (!isNaN(text)) {
              setAge(text.replace(/\s/g, ''));
            }
          }}
        />
        {Number(ageValue) < 18 && (
          <Text style={styles.helpText}>* Age must be minimum 18</Text>
        )}
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>City :</Text>
      </View>
      <View style={styles.inputFieldNameCont}>
        <TextInput
          style={styles.inputFieldName}
          defaultValue={cityValue}
          value={cityValue}
          onChangeText={(text) => setCity(text)}
        />
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Contact :</Text>
      </View>
      <View style={styles.inputFieldNameCont}>
        <TextInput
          keyboardType="number-pad"
          style={styles.inputFieldName}
          defaultValue={contactValue}
          value={contactValue}
          onChangeText={(text) => {
            if (!isNaN(text)) {
              setContact(text.replace(/\s/g, ''));
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    zIndex: 2,
  },
  bgText: {
    color: '#fb3d4a',
    fontWeight: 'bold',
  },
  bgTextActive: {
    color: '#ffff',
    fontWeight: 'bold',
  },
  headingContainer: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
  },
  heading: {
    fontSize: 14,
    color: '#fb3d4a',
    fontWeight: 'bold',
  },
  inputFieldName: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: '#b3b3b3',
    borderWidth: 0.5,
    fontSize: 14,
    borderRadius: 5,
  },
  inputFieldNameCont: {
    width: '90%',
    marginTop: 10,
  },
  genderCont: {
    flexDirection: 'row',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#fb3d4a',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 5,
    marginTop: 15,
  },
  buttonText: {
    color: '#ffff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  disableButton: {
    backgroundColor: '#b3b3b3',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 5,
    marginTop: 15,
  },
  helpText: {
    fontSize: 12,
    marginTop: 4,
    color: '#fb3d4a',
  },
  activeBloodGroup: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fb3d4a',
    width: 100,
    borderColor: '#fb3d4a',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginTop: 5,
    borderRadius: 5,
  },
  bloodGroupButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 100,
    borderColor: '#b3b3b3',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginTop: 5,
    borderRadius: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.homeReducer.user,
    name: state.becomeDonorReducer.name,
    age: state.becomeDonorReducer.age,
    gender: state.becomeDonorReducer.gender,
    city: state.becomeDonorReducer.city,
    contact: state.becomeDonorReducer.contact,
    nameUpdate: state.updateProfileReducer.nameUpdate,
    ageUpdate: state.updateProfileReducer.ageUpdate,
    genderUpdate: state.updateProfileReducer.genderUpdate,
    cityUpdate: state.updateProfileReducer.cityUpdate,
    contactUpdate: state.updateProfileReducer.contactUpdate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    genderActionSet: (gender) => dispatch(genderAction(gender)),
    nameActionSet: (name) => dispatch(nameAction(name)),
    ageActionSet: (age) => dispatch(ageAction(age)),
    cityActionSet: (city) => dispatch(cityAction(city)),
    contactActionSet: (contact) => dispatch(contactAction(contact)),
    nameUpdateActionSet: (name) => dispatch(nameUpdateAction(name)),
    genderUpdateActionSet: (gender) => dispatch(genderUpdateAction(gender)),
    ageUpdateActionSet: (age) => dispatch(ageUpdateAction(age)),
    cityUpdateActionSet: (city) => dispatch(cityUpdateAction(city)),
    contactUpdateActionSet: (contact) => dispatch(contactUpdateAction(contact)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BloodDonorFields);
