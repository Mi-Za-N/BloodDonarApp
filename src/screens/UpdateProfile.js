import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';

//firebase
import database from '@react-native-firebase/database';

// redux store
import {connect} from 'react-redux';

// components
import BottomBar from '../components/BottomBar';
import BloodGroups from '../components/BloodGroups';
import BloodDonorFields from '../components/BloodDonorFields';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';

const UpdateProfile = ({
  navigation,
  user,
  nameUpdate,
  ageUpdate,
  genderUpdate,
  cityUpdate,
  contactUpdate,
  bloodGroupUpdate,
}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateUserData = () => {
    setLoader(true);
    database()
      .ref()
      .child(`/users/${user.uid}`)
      .update({
        bloodGroup: bloodGroupUpdate ? bloodGroupUpdate : null,
        displayName: nameUpdate ? nameUpdate : null,
        age: ageUpdate ? ageUpdate : null,
        gender: genderUpdate ? genderUpdate : null,
        city: cityUpdate ? cityUpdate : null,
        contact: contactUpdate ? contactUpdate : null,
      })
      .then(() => {
        database()
          .ref()
          .child(`/donors/${user.uid}`)
          .once('value', (data) => {
            if (data.val()) {
              database()
                .ref()
                .child(`/donors/${user.uid}`)
                .update({
                  name: nameUpdate ? nameUpdate : null,
                  age: ageUpdate ? ageUpdate : null,
                  gender: genderUpdate ? genderUpdate : null,
                  city: cityUpdate ? cityUpdate : null,
                  contact: contactUpdate ? contactUpdate : null,
                  bloodGroup: bloodGroupUpdate ? bloodGroupUpdate : null,
                })
                .then(() => {
                  setLoader(false);
                  setSuccess(true);
                  navigation.goBack();
                });
            } else {
              setLoader(false);
              setSuccess(true);
              navigation.goBack();
            }
          });
      });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View
      style={[styles.container, {paddingBottom: !isKeyboardVisible ? 65 : 10}]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.backButton}
        onPress={() => {
          navigation.goBack();
        }}>
        <Ionicons name="chevron-back-sharp" size={30} color={'#fb3d4a'} />
      </TouchableOpacity>
      {!isKeyboardVisible && (
        <BottomBar navigation={navigation} screen="updateProfile" />
      )}
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Select Blood Group :</Text>
        </View>
        <BloodGroups screen="updateScreen" />
        <BloodDonorFields screen="updateScreen" />

        {success && (
          <Text
            style={{
              fontSize: 16,
              color: '#fb3d4a',
              fontWeight: 'bold',
              marginTop: 5,
            }}>
            Update Successfully
          </Text>
        )}

        <TouchableOpacity
          onPress={updateUserData}
          style={
            nameUpdate === '' || (ageUpdate !== '' && Number(ageUpdate) < 18)
              ? styles.disableButton
              : styles.button
          }
          activeOpacity={0.9}
          disabled={
            nameUpdate === '' || (ageUpdate !== '' && Number(ageUpdate) < 18)
              ? true
              : false
          }>
          <Text style={styles.buttonText}>Update</Text>
          {loader && (
            <ActivityIndicator style={{marginLeft: 5}} color={'#fff'} />
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    zIndex: 2,
    paddingTop: 55,
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
  loadingCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registeredText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 5,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  backButton: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.homeReducer.user,
    nameUpdate: state.updateProfileReducer.nameUpdate,
    ageUpdate: state.updateProfileReducer.ageUpdate,
    genderUpdate: state.updateProfileReducer.genderUpdate,
    cityUpdate: state.updateProfileReducer.cityUpdate,
    contactUpdate: state.updateProfileReducer.contactUpdate,
    bloodGroupUpdate: state.updateProfileReducer.bloodGroupUpdate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
