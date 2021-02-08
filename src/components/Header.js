import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({navigation}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.header}
      onPress={() => navigation.openDrawer()}>
      <Ionicons name="menu" size={30} color={'#fb3d4a'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    zIndex: 99,
    elevation: 2,
  },
});

export default Header;
