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
    <Background
      footer={
        <>
        </>
      }>
      <View style={styles.container}>
        <Animated.View
          style={[
            {
              opacity: fadeAnim
            }
          ]}
        >
          <Icon width={80}/>
        </Animated.View>
        <Text style={styles.text}>Hold on!</Text>
      </View>
    </Background>
  );
};

interface Style {
  container: ViewStyle
  fadingContainer: ViewStyle
  text: TextStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
  },
  fadingContainer: {
    // paddingVertical: 8,
    // paddingHorizontal: 16,
  },
  text: {
    marginTop: 20,
    color: '#A8C0FA',
    fontSize: 16
  }
});
