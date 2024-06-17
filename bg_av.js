import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Audio } from 'expo-av';

export default function bg_av() {
  const sound = useRef(new Audio.Sound());

  useEffect(() => {
    const loadSound = async () => {
      try {
        await sound.current.loadAsync(require('./assets/sweden.mp3'));
        await sound.current.setIsLoopingAsync(true);
        await sound.current.playAsync();
      } catch (error) {
        console.error('Error loading sound', error);
      }
    };

    loadSound();

    return () => {
      sound.current.unloadAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Background Music Example</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
