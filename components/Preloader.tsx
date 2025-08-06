// components/Preloader.tsx
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, View, StyleSheet, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PreloaderProps {
  onAnimationComplete?: () => void;
  visible: boolean;
}

export default function Preloader({ visible, onAnimationComplete }: PreloaderProps) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      fadeAnim.setValue(1);
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start(onAnimationComplete);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
      <LinearGradient
        colors={['#fc6735ff', '#f83833']}
        style={styles.gradient}
      >
        <Image
          source={require('@/assets/images/Quiet.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    backgroundColor: '#000',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  },
});