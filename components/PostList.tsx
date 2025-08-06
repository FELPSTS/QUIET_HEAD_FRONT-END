import { useEffect, useRef, useState } from 'react';
import { Animated, Image, View, StyleSheet, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import { router } from 'expo-router';

export default function Preloader() {
  const [appReady, setAppReady] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        setAppReady(true);
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appReady) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start(async () => {
        await SplashScreen.hideAsync();
        
        router.replace({
          pathname: '/(tabs)/home', 
        });
      });
    }
  }, [appReady]);

  if (!appReady) {
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

  return null;
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
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