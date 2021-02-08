import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  Image,
} from 'react-native';

//firebase
import database from '@react-native-firebase/database';

// redux store
import {connect} from 'react-redux';
import {successAction} from '../store/actions/becomeDonorAction';

// components
import BottomBar from '../components/BottomBar';
import Header from '../components/Header';
import BloodGroups from '../components/BloodGroups';
import BloodDonorFields from '../components/BloodDonorFields';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';

const BecomeDonor = ({
  bloodGroup,
  navigation,
  user,
  name,
  age,
  gender,
  city,
  contact,
  success,
  successActionSet,
}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [loader1, setLoader1] = useState(true);
  const [loader2, setLoader2] = useState(false);
  const [loader3, setLoader3] = useState(false);

  const donorCheck = async () => {
    database()
      .ref('/')
      .child(`/donors/${user.uid}`)
      .on('value', (data) => {
        setLoader1(false);
        if (data.val() == null) {
          setFormVisible(true);
        } else {
          setFormVisible(false);
        }
      });
  };

  const beADonor = () => {
    setLoader3(true);
    setLoader2(true);
    database()
      .ref('/')
      .child(`/donors/${user.uid}`)
      .set({
        uid: user.uid,
        city: city.toLowerCase(),
        name,
        age,
        gender,
        contact,
        bloodGroup,
      })
      .then(() => {
        setLoader2(false);
        successActionSet(true);
        setLoader3(false);
        database().ref('users').child(`${user.uid}`).update({
          donor: true,
          bloodGroup,
          age,
          gender,
          contact,
          city: city.toLowerCase(),
        });
      });
  };

  const deleteDonor = () => {
    if (!loader1) {
      database().ref('/').child(`/donors/${user.uid}`).remove();
    }
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

  useEffect(() => {
    donorCheck();
  }, []);

  return (
    <View
      style={[styles.container, {paddingBottom: !isKeyboardVisible ? 65 : 10}]}>
      <Header navigation={navigation} />
      {!isKeyboardVisible && (
        <BottomBar navigation={navigation} screen="becomdonor" />
      )}
      {loader1 ? (
        <View style={styles.loadingCont}>
          <ActivityIndicator color={'#fb3d4a'} size={'large'} />
        </View>
      ) : formVisible ? (
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Select Blood Group :</Text>
          </View>
          <BloodGroups screen="becomedonor" />
          <BloodDonorFields screen="becomedonor" />

          <TouchableOpacity
            style={
              name === '' ||
              age === '' ||
              Number(age) < 18 ||
              city === '' ||
              gender === '' ||
              contact === '' ||
              bloodGroup === ''
                ? styles.disableButton
                : styles.button
            }
            activeOpacity={0.9}
            disabled={
              name === '' ||
              age === '' ||
              Number(age) < 18 ||
              city === '' ||
              gender === '' ||
              contact === '' ||
              bloodGroup === ''
                ? true
                : false
            }
            onPress={beADonor}>
            <Text style={styles.buttonText}>Become Donor</Text>
            {loader2 && (
              <ActivityIndicator style={{marginLeft: 5}} color={'#fff'} />
            )}
          </TouchableOpacity>
        </ScrollView>
      ) : loader3 ? (
        <View style={styles.loadingCont}>
          <ActivityIndicator color={'#fb3d4a'} size={'large'} />
        </View>
      ) : success ? (
        <View style={styles.successContainer}>
          <Ionicons
            name="md-shield-checkmark-outline"
            size={60}
            color={'#fb3d4a'}
          />
          <Text style={styles.successText}>
            Successfully Registered as Donor
          </Text>
        </View>
      ) : (
        <View style={styles.loadingCont}>
          <Image
            source={require('../assests/handHeart.png')}
            style={{width: 100, height: 100, marginBottom: 10}}
          />
          <Text style={styles.registeredText}>
            Your Already Registered as a Donor
          </Text>
          <TouchableOpacity style={styles.button} onPress={deleteDonor}>
            <Text style={styles.buttonText}>End Donation</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    zIndex: 2,
    paddingTop: 45,
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
});

const mapStateToProps = (state) => {
  return {
    user: state.homeReducer.user,
    bloodGroup: state.becomeDonorReducer.bloodGroup,
    name: state.becomeDonorReducer.name,
    age: state.becomeDonorReducer.age,
    gender: state.becomeDonorReducer.gender,
    city: state.becomeDonorReducer.city,
    contact: state.becomeDonorReducer.contact,
    success: state.becomeDonorReducer.success,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    successActionSet: (success) => dispatch(successAction(success)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BecomeDonor);
