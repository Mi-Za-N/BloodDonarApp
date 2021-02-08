import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {LoginManager} from 'react-native-fbsdk';

import auth from '@react-native-firebase/auth';

import {connect} from 'react-redux';
import {userAction, loaderAction} from '../store/actions/homeActions';
// Screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SignupScreen from '../screens/SignupScreen';
import BecomeDonor from '../screens/BecomeDonor';
import About from '../screens/About';
import FindDonor from '../screens/FindDonor';
import Profile from '../screens/Profile';
import DonorDetail from '../screens/DonorDetail';
import UpdateProfile from '../screens/UpdateProfile';

//components
import DrawerContent from '../components/DrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator headerMode={false}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
const BecomeDonorStack = () => {
  return (
    <Stack.Navigator headerMode={false}>
      <Stack.Screen name="BecomeDonorS" component={BecomeDonor} />
    </Stack.Navigator>
  );
};

const AboutStack = () => {
  return (
    <Stack.Navigator headerMode={false}>
      <Stack.Screen name="AboutS" component={About} />
    </Stack.Navigator>
  );
};
const FindDonorStack = () => {
  return (
    <Stack.Navigator headerMode={false}>
      <Stack.Screen name="FindDonorS" component={FindDonor} />
    </Stack.Navigator>
  );
};
const ProfileStack = () => {
  return (
    <Stack.Navigator headerMode={false}>
      <Stack.Screen name="ProfileS" component={Profile} />
    </Stack.Navigator>
  );
};
const DonorDetailStack = () => {
  return (
    <Stack.Navigator headerMode={false}>
      <Stack.Screen name="DonorDetailS" component={DonorDetail} />
    </Stack.Navigator>
  );
};
const UpdateProfileStack = () => {
  return (
    <Stack.Navigator headerMode={false}>
      <Stack.Screen name="UpdateProfileS" component={UpdateProfile} />
    </Stack.Navigator>
  );
};

const Navigation = ({user, userActionSet, loaderActionSet}) => {
  const onAuthStateChange = async (userCred) => {
    if (userCred) {
      userActionSet(userCred);
      loaderActionSet(false);
    } else {
      userActionSet(null);
      LoginManager.logOut();
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChange);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      {user === null ? (
        <Stack.Navigator headerMode={false}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
      ) : (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}>
          <Drawer.Screen name="Home" component={HomeStack} />
          <Drawer.Screen name="BecomeDonor" component={BecomeDonorStack} />
          <Drawer.Screen name="About" component={AboutStack} />
          <Drawer.Screen
            name="FindDonor"
            component={FindDonorStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen name="Profile" component={ProfileStack} />
          <Drawer.Screen
            name="DonorDetail"
            component={DonorDetailStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen name="UpdateProfile" component={UpdateProfileStack} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
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
    loaderActionSet: (flag) => dispatch(loaderAction(flag)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
