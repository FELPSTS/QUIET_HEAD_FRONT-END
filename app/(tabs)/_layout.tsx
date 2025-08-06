import { View } from 'react-native';
import { Tabs } from 'expo-router';
import CustomTabBar from '@/components/CustomTabBar';

export default function TabLayout() {
  return (
    <>
      {/* Conteúdo principal das telas */}
      <Tabs
        screenOptions={{
          tabBarStyle: { display: 'none' }, // Esconde a TabBar padrão
          headerShown: false,
        }}
      >
        <Tabs.Screen 
          name="home" 
          options={{
            title: 'home',
            // Adicione outras opções se necessário
          }}
        />
        <Tabs.Screen 
          name="profile" 
          options={{
            title: 'Perfil',
            // Adicione outras opções se necessário
          }}
        />
      </Tabs>
      
      {/* TabBar customizada */}
      <CustomTabBar />
    </>
  );
}