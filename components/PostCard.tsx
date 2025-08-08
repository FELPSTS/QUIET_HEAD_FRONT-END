import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

// Adicione esta constante no início do arquivo
const DEFAULT_AVATAR = 'https://randomuser.me/api/portraits/men/1.jpg';

type Author = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
};

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  author: Author;
};

type Post = {
  id: number;
  title: string | null;
  content: string;
  imageUrl: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
  comments: Comment[];
};

const API_URL = 'http://192.168.0.15:8080/posts';

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setError(null);
      const response = await axios.get(API_URL, {
        timeout: 10000,
      });
      
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Formato de dados inválido');
      }

      const formattedPosts = response.data.map((post) => ({
        ...post,
        likes: post.likeCount,
        image: post.imageUrl,
        user: post.author
      }));
      
      setPosts(formattedPosts);
    } catch (err) {
      console.error('Erro na requisição:', err);
      setError(err.message || 'Erro ao carregar posts');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts();
  }, [fetchPosts]);

  const handleLike = async (postId: number) => {
    try {
      const response = await axios.put(`${API_URL}/${postId}/like`, {}, {
        timeout: 5000,
      });
      
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId ? { ...post, likeCount: response.data.likeCount } : post
        )
      );
    } catch (err) {
      console.error('Erro ao curtir:', err);
      setError('Falha ao curtir o post');
    }
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchPosts}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (posts.length === 0 && !loading) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum post encontrado</Text>
        <TouchableOpacity onPress={fetchPosts}>
          <Text style={styles.retryText}>Recarregar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#0000ff']}
          tintColor="#0000ff"
        />
      }
    >
      {posts.map(post => (
        <View key={post.id} style={styles.container}>
          <View style={styles.header}>
            <Image 
              source={{ uri: post.author?.avatar || DEFAULT_AVATAR }}
              style={styles.avatar}
              onError={() => console.log('Erro ao carregar avatar')}
            />
            <View>
              <Text style={styles.username}>{post.author?.name || 'Anônimo'}</Text>
              <Text style={styles.timestamp}>
                {new Date(post.createdAt).toLocaleDateString('pt-BR')}
              </Text>
            </View>
          </View>

          {post.title && <Text style={styles.title}>{post.title}</Text>}

          <Text style={styles.content}>{post.content}</Text>

          {post.imageUrl && (
            <Image
              source={{ uri: post.imageUrl }}
              style={styles.postImage}
              resizeMode="cover"
              onError={() => console.log('Erro ao carregar imagem')}
            />
          )}

          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.statItem}
              onPress={() => handleLike(post.id)}
              onPressIn={() => {}}
              onPressOut={() => {}}
            >
              <Ionicons 
                name="heart" 
                size={20} 
                color={post.likeCount > 0 ? "#FF4444" : "#888"} 
              />
              <Text style={styles.statText}>
                {post.likeCount} Curtidas
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.statItem}
              onPress={() => console.log('Comentar', post.id)}
              onPressIn={() => {}}
              onPressOut={() => {}}
            >
              <Ionicons name="chatbubbles" size={18} color="#888" />
              <Text style={styles.statText}>
                {post.comments.length} Comentários
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#333',
  },
  username: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    color: '#888',
    fontSize: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    color: '#E0E0E0',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    color: '#888',
    marginLeft: 6,
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF4444',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  retryText: {
    color: '#4A90E2',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    marginBottom: 10,
  },
});