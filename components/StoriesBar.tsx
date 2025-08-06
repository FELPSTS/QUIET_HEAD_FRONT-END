import { View, ScrollView, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const stories = [
  { id: '1', username: 'seu_user', uri: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', username: 'car_lover', uri: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', username: 'tuning_fan', uri: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', username: 'race_team', uri: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', username: 'drift_king', uri: 'https://i.pravatar.cc/150?img=5' },
  { id: '6', username: 'jdm_style', uri: 'https://i.pravatar.cc/150?img=6' },
];

export default function StoriesBar() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Botão "Seu Story" com ícone de adição */}
        <TouchableOpacity style={styles.storyItem}>
          <View style={styles.yourStoryCircle}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?img=7' }} 
              style={styles.storyImage}
            />
            <View style={styles.addIconContainer}>
              <Ionicons name="add" size={16} color="#fff" />
            </View>
          </View>
          <Text style={styles.storyUsername}>Seu Story</Text>
        </TouchableOpacity>

        {/* Stories de outros usuários */}
        {stories.map(story => (
          <TouchableOpacity key={story.id} style={styles.storyItem}>
            <View style={styles.storyCircle}>
              <Image 
                source={{ uri: story.uri }}
                style={styles.storyImage}
              />
            </View>
            <Text style={styles.storyUsername} numberOfLines={1}>
              {story.username}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: '#121212',
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  scrollContent: {
    paddingLeft: 10,
    alignItems: 'center',
  },
  storyItem: {
    marginRight: 15,
    alignItems: 'center',
    width: 70,
  },
  yourStoryCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: '#FF9D00',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  storyCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  addIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF9D00',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#121212',
  },
  storyUsername: {
    color: '#fff',
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    maxWidth: 70,
  },
});