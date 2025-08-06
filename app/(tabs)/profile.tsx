import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PostCard from '@/components/PostCard'; // Ajuste o caminho conforme sua estrutura

export default function Profile() {
  // Dados mockados (substitua por dados da API)
  const user = {
    username: "CarLover",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Apaixonado por carros e velocidade 🚗💨 | Compartilhando meu dia a dia #CarLife",
    followers: 1243,
    following: 56,
    posts: [
      
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho do Perfil */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: user.avatar }} style={styles.profileAvatar} />
        <Text style={styles.username}>{user.username}</Text>
        
        {/* Estatísticas (Seguidores/Seguindo) */}
        <View style={styles.statsContainer}>
          <TouchableOpacity style={styles.statItem}>
            <Text style={styles.statNumber}>{user.followers}</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.statItem}>
            <Text style={styles.statNumber}>{user.following}</Text>
            <Text style={styles.statLabel}>Seguindo</Text>
          </TouchableOpacity>
        </View>
        
        {/* Bio */}
        <Text style={styles.bio}>{user.bio}</Text>
      </View>

      {/* Botão de Editar Perfil */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Editar Perfil</Text>
      </TouchableOpacity>

      {/* Lista de Posts do Usuário */}
      <View style={styles.postsContainer}>
        {user.posts.map((post) => (
          <PostCard
            key={post.id}
            username={user.username}
            avatar={user.avatar}
            content={post.content}
            image={post.image}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
      </View>
    </ScrollView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#888',
    fontSize: 14,
  },
  bio: {
    color: '#E0E0E0',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  postsContainer: {
    paddingBottom: 20,
  },
});