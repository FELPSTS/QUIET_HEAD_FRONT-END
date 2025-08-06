import { View, ScrollView, StyleSheet } from 'react-native';
import PostCard from '@/components/PostCard'; // Ajuste o caminho conforme sua estrutura

export default function Home() {
  
  const posts = [
    {
      id: 1,
      username: 'CarLover',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      content: 'Just bought my dream car today! 🚗💨',
      image: 'https://source.unsplash.com/random/600x400/?car',
      likes: 156,
      comments: 23,
    },
    {
      id: 2,
      username: 'SpeedRacer',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      content: 'Track day with the crew! #SpeedDemons',
      image: 'https://source.unsplash.com/random/600x400/?racecar',
      likes: 289,
      comments: 45,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            username={post.username}
            avatar={post.avatar}
            content={post.content}
            image={post.image}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Cor de fundo escura
  },
});