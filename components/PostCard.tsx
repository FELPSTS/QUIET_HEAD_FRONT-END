import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PostCard() {
  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.avatar}
        />
        <Text style={styles.username}>CUSER</Text>
      </View>

      {/* Conteúdo */}
      <Text style={styles.content}>
        That the day i came to a car meeting and was very happy with that...
      </Text>

      {/* Imagem do Post (opcional) */}
      <Image
        source={{ uri: 'https://source.unsplash.com/random/600x400/?car' }}
        style={styles.postImage}
      />

      {/* Rodapé */}
      <View style={styles.footer}>
        <View style={styles.statItem}>
          <Ionicons name="speedometer" size={20} color="#888" />
          <Text style={styles.statText}>233 Turbos</Text>
        </View>
        
        <View style={styles.statItem}>
          <Ionicons name="chatbubbles" size={18} color="#888" />
          <Text style={styles.statText}>44 Comments</Text>
        </View>
      </View>
    </View>
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
  },
  username: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
});