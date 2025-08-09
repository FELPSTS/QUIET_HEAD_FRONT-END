import { Link, usePathname } from 'expo-router';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function CustomTabBar() {
  const pathname = usePathname();

  const tabs = [
    { name: 'Home', route: '/home', icon: 'home' },
    { name: 'Chats', route: '/chats', icon: 'chatbubbles-sharp' },
    { name: 'located', route: '/located', icon: 'location' },
    { name: 'Search', route: '/search', icon: 'search' },
    { name: 'Profile', route: '/profile', icon: 'person' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.borderBox}>
        {tabs.map((tab) => (
          <Link href={tab.route} key={tab.route} asChild>
            <TouchableOpacity style={styles.tabButton}>
              <Ionicons
                name={tab.icon}
                size={24}
                color={pathname === tab.route ? '#FF9D00' : '#888888'}
              />
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  borderBox: {
    width: '90%',
    height: 60,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  tabButton: {
    padding: 10,
    alignItems: 'center',
  },
});