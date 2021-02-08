import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk';

//firebase
import auth from '@react-native-firebase/auth';

// redux store
import {connect} from 'react-redux';
import {userAction, loaderAction} from '../store/actions/homeActions';

const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation, loader, loaderActionSet}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [signInLoader, setSignInLoader] = useState(false);

  const signIn = () => {
    setSignInLoader(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setSignInLoader(false);
        invalidEmail && setInvalidEmail(false);
        userNotFound && setUserNotFound(false);
        wrongPassword && setWrongPassword(false);
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          setSignInLoader(false);
          setInvalidEmail(true);
        }
        if (error.code === 'auth/user-not-found') {
          setSignInLoader(false);
          setUserNotFound(true);
        }
        if (error.code === 'auth/wrong-password') {
          setSignInLoader(false);
          setWrongPassword(true);
        }
      });
  };
  const facebookLogin = async () => {
    loaderActionSet(true);
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      loaderActionSet(false);
    } else {
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        loaderActionSet(false);
        // throw 'Something went wrong obtaining access token';
      }
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assests/wave.png')}
          style={{
            width: '100%',
            height: 240,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
          }}></ImageBackground>
        <View style={styles.circle}>
          <Image
            source={require('../assests/bloodDrop.png')}
            style={{width: 40, height: 40}}
          />
        </View>
        <View style={styles.loginFieldContainer}>
          <TextInput
            style={styles.inputFeild}
            name="email"
            placeholder="email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          {invalidEmail && (
            <Text style={{fontSize: 10, color: '#fb3d4a', marginBottom: 10}}>
              invalid email
            </Text>
          )}
          {userNotFound && (
            <Text style={{fontSize: 10, color: '#fb3d4a', marginBottom: 10}}>
              user not found
            </Text>
          )}
          <TextInput
            style={styles.inputFeild}
            name="password"
            placeholder="password"
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
          {wrongPassword && (
            <Text style={{fontSize: 10, color: '#fb3d4a', marginBottom: 10}}>
              wrong password
            </Text>
          )}
          <View>
            <TouchableOpacity
              style={
                email === '' || password === ''
                  ? styles.disableButton
                  : styles.button
              }
              activeOpacity={0.9}
              disabled={email === '' || password === '' ? true : false}
              onPress={signIn}>
              <Text style={styles.buttonText}>Sign In</Text>
              {signInLoader && (
                <ActivityIndicator style={{marginLeft: 5}} color={'#fff'} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.9}
              onPress={facebookLogin}>
              <Text style={styles.buttonText}>Login With Facebook</Text>
              {loader && (
                <ActivityIndicator style={{marginLeft: 5}} color={'#fff'} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 100,
  },
  circle: {
    width: 80,
    height: 80,
    backgroundColor: '#f5f5f5',
    borderRadius: height / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginFieldContainer: {
    marginTop: 20,
  },
  inputFeild: {
    borderWidth: 0.5,
    borderColor: '#b3b3b3',
    width: width / 1.4,
    marginBottom: 10,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#fb3d4a',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 5,
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
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.homeReducer.user,
    loader: state.homeReducer.loader,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userActionSet: (user) => dispatch(userAction(user)),
    loaderActionSet: (user) => dispatch(loaderAction(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
