import React, { useRef, useEffect } from "react";
import {
  ActivityIndicator, Text, StyleSheet,
  ViewStyle, View, TextStyle, Animated,
} from 'react-native';
import { palette } from '@theraply/lib';
import { theme, Background } from '../theme';
import Icon from '../../assets/images/icon.svg'


export const Loading = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.delay(500),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.delay(500)
      ])
    ).start()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      </View>
      <View style={styles.bodyContainer}>
        <Animated.View style={[{opacity: fadeAnim}]}>
          <Icon width={80}/>
        </Animated.View>
      </View>
    </View>
  );
};

interface Style {
  container: ViewStyle
  headerContainer: ViewStyle
  bodyContainer: ViewStyle
  text: TextStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    height: '100%',
    backgroundColor: palette.secondary.main,
  },
  headerContainer: {
    justifyContent: 'center',
    height: '10%',
    paddingLeft: 21,
    paddingTop: 30,
    backgroundColor: palette.secondary.main,
    width: '100%'
  },
  bodyContainer: {
    height: '90%',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    color: '#A8C0FA',
    fontSize: 16
  }
});
