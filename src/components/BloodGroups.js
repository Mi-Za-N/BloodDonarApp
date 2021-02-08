import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Button} from 'react-native';

import {connect} from 'react-redux';
import {bloodGroupAction} from '../store/actions/becomeDonorAction';
import {bloodGroupUpdateAction} from '../store/actions/updateProfileAction';

const BloodGroups = ({
  bloodGroup,
  bloodGroupUpdate,
  bloodGroupUpdateActionSet,
  bloodGroupActionSet,
  screen,
  user,
}) => {
  const setBlood =
    screen == 'updateScreen' ? bloodGroupUpdateActionSet : bloodGroupActionSet;
  const bloodType = screen == 'updateScreen' ? bloodGroupUpdate : bloodGroup;

  useEffect(() => {
    if (user.bloodGroup) {
      setBlood(user.bloodGroup);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bloodGBContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setBlood('A+')}
          style={
            bloodType === 'A+'
              ? styles.activeBloodGroup
              : styles.bloodGroupButton
          }>
          <Text
            style={bloodType === 'A+' ? styles.bgTextActive : styles.bgText}>
            A+
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setBlood('A-')}
          style={
            bloodType === 'A-'
              ? styles.activeBloodGroup
              : styles.bloodGroupButton
          }>
          <Text
            style={bloodType === 'A-' ? styles.bgTextActive : styles.bgText}>
            A-
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setBlood('B+')}
          style={
            bloodType === 'B+'
              ? styles.activeBloodGroup
              : styles.bloodGroupButton
          }>
          <Text
            style={bloodType === 'B+' ? styles.bgTextActive : styles.bgText}>
            B+
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setBlood('B-')}
          style={
            bloodType === 'B-'
              ? styles.activeBloodGroup
              : styles.bloodGroupButton
          }>
          <Text
            style={bloodType === 'B-' ? styles.bgTextActive : styles.bgText}>
            B-
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setBlood('AB+')}
          style={
            bloodType === 'AB+'
              ? styles.activeBloodGroup
              : styles.bloodGroupButton
          }>
          <Text
            style={bloodType === 'AB+' ? styles.bgTextActive : styles.bgText}>
            AB+
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setBlood('AB-')}
          style={
            bloodType === 'AB-'
              ? styles.activeBloodGroup
              : styles.bloodGroupButton
          }>
          <Text
            style={bloodType === 'AB-' ? styles.bgTextActive : styles.bgText}>
            AB-
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setBlood('O-')}
          style={
            bloodType === 'O-'
              ? styles.activeBloodGroup
              : styles.bloodGroupButton
          }>
          <Text
            style={bloodType === 'O-' ? styles.bgTextActive : styles.bgText}>
            O-
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setBlood('O+')}
          style={
            bloodType === 'O+'
              ? styles.activeBloodGroup
              : styles.bloodGroupButton
          }>
          <Text
            style={bloodType === 'O+' ? styles.bgTextActive : styles.bgText}>
            O+
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bloodGBContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  activeBloodGroup: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fb3d4a',
    width: 75,
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
    width: 75,
    borderColor: '#b3b3b3',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginTop: 5,
    borderRadius: 5,
  },
  bgText: {
    color: '#fb3d4a',
    fontWeight: 'bold',
  },
  bgTextActive: {
    color: '#ffff',
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.homeReducer.user,
    bloodGroup: state.becomeDonorReducer.bloodGroup,
    bloodGroupUpdate: state.updateProfileReducer.bloodGroupUpdate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    bloodGroupActionSet: (group) => dispatch(bloodGroupAction(group)),
    bloodGroupUpdateActionSet: (group) =>
      dispatch(bloodGroupUpdateAction(group)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BloodGroups);
