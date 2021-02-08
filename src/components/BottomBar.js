import React, {useState} from 'react';
import {View, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

const BottomBar = ({navigation, screen}) => {
  const [active, setActive] = useState(screen);

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.iconContainer]}
        onPress={() => {
          setActive(screen);
          navigation.navigate('Home');
        }}>
        <View style={active === 'home' ? styles.active : null}>
          <Ionicons
            name="home"
            size={25}
            color={active === 'home' ? '#fff' : '#fb3d4a'}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.iconContainer]}
        onPress={() => {
          setActive(screen);
          navigation.navigate('About');
        }}>
        <View style={active === 'about' ? styles.active : null}>
          <Ionicons
            name="information-circle"
            size={25}
            color={active === 'about' ? '#fff' : '#fb3d4a'}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    borderTopColor: '#f5f5f5',
    borderTopWidth: 0.5,
    width: '100%',
    zIndex: 1,
    elevation: 5,
  },
  iconContainer: {
    width: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    backgroundColor: '#ffff',
  },
  active: {
    paddingVertical: 2,
    width: 50,
    alignItems: 'center',
    backgroundColor: '#fb3d4a',
    borderRadius: 15,
  },
  iconColor: {
    color: '#fff',
  },
});

export default BottomBar;
