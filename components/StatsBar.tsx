import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type StatsBarProps = {
  turbos: number;
  comments: number;
};

export default function StatsBar({ turbos, comments }: StatsBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Ionicons name="speedometer" size={20} color="#FF9D00" />
        <Text style={styles.statText}>{turbos} Turbos</Text>
      </View>
      
      <View style={styles.statItem}>
        <Ionicons name="chatbubbles" size={18} color="#FF9D00" />
        <Text style={styles.statText}>{comments} Comments</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: '#333',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    color: '#FFFFFF',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
});