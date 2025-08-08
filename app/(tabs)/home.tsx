import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Image } from 'react-native';
import PostFeed from '@/components/PostCard';
      

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <PostFeed />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default HomeScreen;