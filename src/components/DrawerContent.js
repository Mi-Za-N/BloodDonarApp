import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {connect} from 'react-redux';
import {resethomeAction} from '../store/actions/homeActions';
import {resetfindDonorAction} from '../store/actions/findDonorAction';
import {
  successAction,
  resetBecomeDonorAction,
} from '../store/actions/becomeDonorAction';

import auth from '@react-native-firebase/auth';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {LoginManager} from 'react-native-fbsdk';

const DrawerContent = ({
  user,
  navigation,
  successActionSet,
  resethomeActionSet,
  resetBecomeDonorActionSet,
  resetfindDonorActionSet,
}) => {
  const reduxStoreReset = () => {
    resethomeActionSet();
    resetBecomeDonorActionSet();
    resetfindDonorActionSet();
  };
  const SignOut = () => {
    reduxStoreReset();
    auth().signOut();
    LoginManager.logOut();
  };

  return (
    <>
      {user.displayName && (
        <View style={styles.drawerContainer}>
          <View style={styles.upper}>
            <View style={styles.userInfo}>
              {user.photoURL ? (
                <Image
                  style={styles.profileImage1}
                  source={{uri: user.photoURL}}
                />
              ) : (
                <Image
                  style={styles.profileImage1}
                  source={{
                    uri: 'https://graph.facebook.com/880856582715773/picture',
                  }}
                />
              )}
              <Text style={styles.profileName}>{user.displayName}</Text>
            </View>
            <View style={styles.drawerOptions}>
              <TouchableOpacity
                style={styles.drawerOption}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('Profile');
                }}>
                <Ionicons
                  name="person"
                  size={25}
                  style={styles.drawerOptionIcon}
                />
                <Text>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.drawerOption}
                activeOpacity={0.7}
                onPress={() => {
                  successActionSet(false);
                  navigation.navigate('BecomeDonor');
                }}>
                <MaterialCommunityIcons
                  name="blood-bag"
                  size={25}
                  style={styles.drawerOptionIcon}
                />
                <Text>Becaoma A Donor</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.lower}>
            <TouchableOpacity
              onPress={SignOut}
              activeOpacity={0.9}
              style={styles.signOutButton}>
              <MaterialCommunityIcons
                name="logout"
                size={25}
                style={[styles.drawerOptionIcon, {color: '#ffff'}]}
              />
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  upper: {},
  lower: {},
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fb3d4a',
  },
  signOutButtonText: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#f5f5f5',
  },
  profileImage1: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 15,
  },
  profileName: {
    textTransform: 'uppercase',
    color: '#fb3d4a',
    fontWeight: 'bold',
    fontSize: 15,
  },
  drawerOptions: {
    marginTop: 50,
  },
  drawerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#f5f5f5',
  },
  drawerOptionIcon: {
    color: '#fb3d4a',
    marginLeft: 20,
    marginRight: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.homeReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    successActionSet: (success) => dispatch(successAction(success)),
    resethomeActionSet: () => dispatch(resethomeAction()),
    resetBecomeDonorActionSet: () => dispatch(resetBecomeDonorAction()),
    resetfindDonorActionSet: () => dispatch(resetfindDonorAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
