import React from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import PostFeed from '@/components/PostCard';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#ffffffff" />
    
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => console.log('Botão pressionado')} 
        >
          <Ionicons name="add" size={24} color="white" /> 
        </TouchableOpacity>
      </View>
      
      <PostFeed />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  menuButton: {
    padding: 5,
  },
});

export default HomeScreen;