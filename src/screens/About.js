import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

// components
import BottomBar from '../components/BottomBar';
import Header from '../components/Header';

const About = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <Header navigation={navigation} />
        <BottomBar navigation={navigation} screen="about" />
        <View style={styles.aboutContainer}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 17,
            }}>
            This application can help you to find most compatible donor near you
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  aboutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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

export default About;
