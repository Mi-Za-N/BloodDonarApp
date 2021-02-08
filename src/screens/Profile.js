import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

//firebase
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {LoginManager} from 'react-native-fbsdk';

// redux store
import {connect} from 'react-redux';
import {userAction} from '../store/actions/homeActions';

// components
import Header from '../components/Header';
import BottomBar from '../components/BottomBar';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const {width} = Dimensions.get('window');

const Profile = ({navigation, user, userActionSet}) => {
  const [profileData, setProfileData] = useState('');

  const deleteUser = () => {
    //   const credential = auth.EmailAuthProvider.credential('c@c.com', '123456');
    //   auth()
    //     .currentUser.reauthenticateWithCredential(credential)
    //     .then(() => {
    //       const usera = auth().currentUser;
    //       database()
    //         .ref()
    //         .child(`/users/${usera.uid}`)
    //         .remove()
    //         .then(() => {
    //           database().ref().child(`/donors/${usera.uid}`).remove();
    //         });
    //       usera.delete(
    //         () => {
    //           console.log('delete successful');
    //           auth().signOut();
    //           LoginManager.logOut();
    //         },
    //         () => {
    //           console.log('delete unsuccessful');
    //         },
    //       );
    //     });
  };

  const confirmDelete = () => {
    return Alert.alert(
      'Confimation',
      'Are you sure you want to delete your account ?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          // onPress: () => null,
        },
        {text: 'confirm', onPress: deleteUser},
      ],
      {cancelable: false},
    );
  };
  useEffect(() => {
    database()
      .ref()
      .child(`users/${user.uid}`)
      .on('value', (data) => {
        const dataObj = data.val();
        setProfileData(dataObj);
        userActionSet({...dataObj, user});
      });
  }, []);

  return (
    <>
      <StatusBar
        style={{
          backgroundColor: 'red',
        }}
      />
      {profileData === '' || profileData == null ? (
        <View style={styles.loadingCont}>
          <ActivityIndicator color={'#fb3d4a'} size={'large'} />
        </View>
      ) : (
        <View style={styles.container}>
          <Header navigation={navigation} />
          <BottomBar navigation={navigation} screen="profile" />
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingVertical: 20,
            }}>
            <View style={styles.profileContainer}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                {profileData.photoURL ? (
                  <Image style={styles.image} source={{uri: user.photoURL}} />
                ) : (
                  <Image
                    style={styles.image}
                    source={{
                      uri: 'https://graph.facebook.com/880856582715773/picture',
                    }}
                  />
                )}

                <Text style={styles.name}>{profileData.displayName}</Text>
              </View>

              <View style={{paddingBottom: 70}}>
                <View style={styles.InfoContainer}>
                  <View style={styles.userInfoContainer}>
                    <View style={styles.iconContainer}>
                      <MaterialCommunityIcons
                        name="gender-male-female"
                        size={25}
                        color={'#fff'}
                      />
                    </View>
                    <View style={styles.detailInfo}>
                      <Text style={styles.detailInfoText}>
                        {profileData.gender
                          ? profileData.gender
                          : 'Not Available'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.userInfoContainer}>
                    <View style={styles.iconContainer}>
                      <MaterialCommunityIcons
                        name="calendar"
                        size={25}
                        color={'#fff'}
                      />
                    </View>
                    <View style={styles.detailInfo}>
                      <Text style={styles.detailInfoText}>
                        {profileData.age ? profileData.age : 'Not Available'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.userInfoContainer}>
                    <View style={styles.iconContainer}>
                      <MaterialCommunityIcons
                        name="phone"
                        size={25}
                        color={'#fff'}
                      />
                    </View>
                    <View style={styles.detailInfo}>
                      <Text style={styles.detailInfoText}>
                        {profileData.contact
                          ? profileData.contact
                          : 'Not Available'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.userInfoContainer}>
                    <View style={styles.iconContainer}>
                      <Entypo name="location-pin" size={25} color={'#fff'} />
                    </View>
                    <View style={styles.detailInfo}>
                      <Text style={styles.detailInfoText}>
                        {profileData.city ? profileData.city : 'Not Available'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.userInfoContainer}>
                    <View style={styles.iconContainer}>
                      <MaterialCommunityIcons
                        name="email"
                        size={25}
                        color={'#fff'}
                      />
                    </View>
                    <View style={styles.detailInfo}>
                      <Text style={styles.detailInfoText}>
                        {profileData.email
                          ? profileData.email
                          : 'Not Available'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.userInfoContainer}>
                    <View style={styles.iconContainer}>
                      <Entypo name="drop" size={25} color={'#fff'} />
                    </View>
                    <View style={styles.detailInfo}>
                      <Text style={styles.detailInfoText}>
                        {profileData.bloodGroup
                          ? profileData.bloodGroup
                          : 'Not Available'}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={[styles.userInfoContainer, {borderBottomWidth: 0}]}>
                    <View style={styles.iconContainer}>
                      <MaterialCommunityIcons
                        name="blood-bag"
                        size={25}
                        color={'#fff'}
                      />
                    </View>
                    <View style={styles.detailInfo}>
                      <Text style={styles.detailInfoText}>
                        {profileData.donor
                          ? 'Registered Donor'
                          : 'Not Registered donor'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={() => {
                      navigation.navigate('UpdateProfile');
                    }}>
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={confirmDelete}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.homeReducer.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    userActionSet: (user) => dispatch(userAction(user)),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    flex: 1,
  },
  InfoContainer: {
    width: width / 1.2,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: '#fb3d4a',
    borderRadius: 5,
  },
  userInfoContainer: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    borderColor: '#fb3d4a',
    borderBottomWidth: 0.5,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fb3d4a',
    marginVertical: 10,
  },
  iconContainer: {
    backgroundColor: '#fb3d4a',
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#b3b3b3',
  },
  detailInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  detailInfoText: {fontSize: 14},
  loadingCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#fb3d4a',
    width: 150,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffff',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
