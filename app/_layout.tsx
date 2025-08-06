import { LoadingProvider, useLoading } from '@/contexts/LoadingContext';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import CustomTabBar from '@/components/CustomTabBar';
import Preloader from '@/components/Preloader';

export default function RootLayout() {
  return (
    <LoadingProvider>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
        <CustomTabBar />
        <GlobalPreloader />
      </View>
    </LoadingProvider>
  );
}

function GlobalPreloader() {
  const { isLoading, stopLoading } = useLoading();
  
  return (
    <Preloader 
      visible={isLoading}
      onAnimationComplete={stopLoading}
    />
  );
}