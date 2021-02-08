import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

// firebase
import database from '@react-native-firebase/database';

// redux store
import {connect} from 'react-redux';
import {bloodGroupAction} from '../store/actions/becomeDonorAction';
import {
  searchCitypAction,
  donorUIDAction,
} from '../store/actions/findDonorAction';

// components
import BottomBar from '../components/BottomBar';
import BloodGroups from '../components/BloodGroups';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

const FindDonor = ({
  navigation,
  bloodGroup,
  city,
  user,
  bloodGroupActionSet,
  searchCitypActionSet,
  donorUIDActionSet,
}) => {
  const [state, setstate] = useState(true);
  const [loader, setLoader] = useState(false);
  const [Data, setData] = useState([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [dataStatus, setDataStatus] = useState({city: '', bloodGroup: ''});
  const [initialization, setInitialization] = useState(false);

  const searchDonor = () => {
    !initialization && setInitialization(true);
    setDataStatus({bloodGroup, city});
    setLoader(true);
    state && setstate(false);
    database()
      .ref('/donors')
      .orderByChild(`city`)
      .equalTo(city.replace(/\s/g, '').toLowerCase())
      .once('value', (data) => {
        const dataObj = data.val();
        const arr = [];
        if (dataObj !== null) {
          Object.keys(dataObj).map((key) => {
            if (key !== user.uid) {
              arr.push(dataObj[key]);
            }
          });
          switch (bloodGroup) {
            case 'A+':
              var matchBloodDonor = arr.filter((obj) => {
                if (
                  obj.bloodGroup == 'A+' ||
                  obj.bloodGroup == 'A-' ||
                  obj.bloodGroup == 'AB+' ||
                  obj.bloodGroup == 'AB-'
                ) {
                  return obj;
                }
              });
              setData(matchBloodDonor);
              setLoader(false);
              return;
            case 'A-':
              var matchBloodDonor = arr.filter((obj) => {
                if (obj.bloodGroup == 'A-' || obj.bloodGroup == 'AB-') {
                  return obj;
                }
              });
              setData(matchBloodDonor);
              setLoader(false);
              return;
            case 'B+':
              var matchBloodDonor = arr.filter((obj) => {
                if (
                  obj.bloodGroup == 'B+' ||
                  obj.bloodGroup == 'B-' ||
                  obj.bloodGroup == 'AB+' ||
                  obj.bloodGroup == 'AB-'
                ) {
                  return obj;
                }
              });
              setData(matchBloodDonor);
              setLoader(false);
              return;
            case 'B-':
              var matchBloodDonor = arr.filter((obj) => {
                if (obj.bloodGroup == 'B-' || obj.bloodGroup == 'AB-') {
                  return obj;
                }
              });
              setData(matchBloodDonor);
              setLoader(false);
              return;
            case 'AB+':
              var matchBloodDonor = arr.filter((obj) => {
                if (obj.bloodGroup == 'AB+' || obj.bloodGroup == 'AB-') {
                  return obj;
                }
              });
              setData(matchBloodDonor);
              setLoader(false);
              return;
            case 'AB-':
              var matchBloodDonor = arr.filter((obj) => {
                if (obj.bloodGroup == 'AB-') {
                  return obj;
                }
              });
              setData(matchBloodDonor);
              setLoader(false);
              return;
            case 'O+':
              var matchBloodDonor = arr.filter((obj) => {
                if (
                  obj.bloodGroup == 'A+' ||
                  obj.bloodGroup == 'A-' ||
                  obj.bloodGroup == 'B+' ||
                  obj.bloodGroup == 'B-' ||
                  obj.bloodGroup == 'O+' ||
                  obj.bloodGroup == 'O-' ||
                  obj.bloodGroup == 'AB+' ||
                  obj.bloodGroup == 'AB-'
                ) {
                  return obj;
                }
              });
              setData(matchBloodDonor);
              setLoader(false);
              return;
            case 'O-':
              var matchBloodDonor = arr.filter((obj) => {
                if (
                  obj.bloodGroup == 'A-' ||
                  obj.bloodGroup == 'B-' ||
                  obj.bloodGroup == 'AB-' ||
                  obj.bloodGroup == 'O-'
                ) {
                  return obj;
                }
              });
              setData(matchBloodDonor);
              setLoader(false);
              return;
            default:
              setLoader(false);
              return;
          }
        } else {
          setData([]);
          setLoader(false);
        }
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

  useEffect(() => {
    bloodGroupActionSet('');
  }, []);

  useEffect(() => {
    if (initialization && city !== '') {
      searchDonor();
    }
  }, [bloodGroup]);

  return (
    <>
      {!isKeyboardVisible && <BottomBar navigation={navigation} />}
      <View
        style={[
          styles.container,
          {paddingBottom: !isKeyboardVisible ? 70 : 10},
        ]}>
        <View style={styles.shadow}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 15, color: '#fb3d4a', fontWeight: 'bold'}}>
              Select Required Blood Group
            </Text>
          </View>
          <BloodGroups screen="findDonor" />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
                width: width / 1.5,
                borderColor: '#b3b3b3',
                borderWidth: 0.5,
                borderRadius: 5,
              }}
              placeholder="City"
              value={city}
              onChangeText={(text) => searchCitypActionSet(text)}
            />
            <TouchableOpacity
              onPress={searchDonor}
              disabled={city === '' || bloodGroup === '' ? true : false}
              style={
                city !== '' && bloodGroup !== ''
                  ? styles.searchButton
                  : styles.disableSearchButton
              }>
              <Ionicons name="search" size={20} color={'#fff'} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          {state ? (
            <View style={styles.subContainer}>
              <Image
                source={require('../assests/bgData.png')}
                style={{width: 200, height: 200}}
              />
              <Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>
                Search Donor
              </Text>
            </View>
          ) : loader ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={'red'} />
            </View>
          ) : Data.length !== 0 ? (
            <View style={{paddingVertical: 20}}>
              {Data.map((item) => {
                return (
                  <TouchableOpacity
                    key={item.uid}
                    style={styles.itemContainer}
                    activeOpacity={0.8}
                    onPress={() => {
                      navigation.navigate('DonorDetail');
                      donorUIDActionSet(item.uid);
                    }}>
                    <View style={styles.bloodGroupContainer}>
                      <Text style={styles.bloodGroupText}>
                        {item.bloodGroup}
                      </Text>
                    </View>
                    <View style={styles.donorData}>
                      <View>
                        <Text style={styles.nameText}>{item.name}</Text>
                      </View>
                      <View style={{flexDirection: 'row', marginTop: 5}}>
                        <View style={styles.miniContainer}>
                          <Text style={styles.miniHeading}>age</Text>
                          <Text style={styles.miniText}>{item.age}</Text>
                        </View>
                        <View style={styles.miniContainer}>
                          <Text style={styles.miniHeading}>gender</Text>
                          <Text style={styles.miniText}>{item.gender}</Text>
                        </View>
                        <View style={styles.miniContainer}>
                          <Text style={styles.miniHeading}>city</Text>
                          <Text style={styles.miniText}>{item.city}</Text>
                        </View>
                        <View style={styles.miniContainer}>
                          <Text style={styles.miniHeading}>contact</Text>
                          <Text style={styles.miniText}>{item.contact}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                No Donor Found in {dataStatus.city} for{' '}
                <Text style={{color: '#fb3d4a', marginHorizontal: 10}}>
                  {dataStatus.bloodGroup}
                </Text>
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    width: '100%',
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginBottom: 10,
  },
  itemContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 10,
    borderColor: '#b3b3b3',
    borderWidth: 0.5,
  },
  bloodGroupContainer: {
    backgroundColor: '#ffcdd4',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    height: 45,
    width: 45,
    borderRadius: 10,
  },
  bloodGroupText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fb3d4a',
  },
  donorData: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 8,
  },
  nameText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  miniContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  miniHeading: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#000',
  },
  miniText: {
    fontSize: 11,
    textTransform: 'capitalize',
    color: '#000',
  },
  loaderContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: '#fb3d4a',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginLeft: 5,
    borderRadius: 5,
  },
  disableSearchButton: {
    backgroundColor: '#b3b3b3',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginLeft: 5,
    borderRadius: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.homeReducer.user,
    bloodGroup: state.becomeDonorReducer.bloodGroup,
    city: state.findDonorReducer.city,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    bloodGroupActionSet: (group) => dispatch(bloodGroupAction(group)),
    searchCitypActionSet: (city) => dispatch(searchCitypAction(city)),
    donorUIDActionSet: (uid) => dispatch(donorUIDAction(uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindDonor);
