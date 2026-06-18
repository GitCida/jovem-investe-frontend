import { View, Text, StyleSheet } from 'react-native';
import Header from '@/components/header';
import BottomNavBar from '@/components/bottom-nav-bar';

export default function CompoundInterestExercisesScreen() {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.content}>
        <Text style={styles.title}>EXERCÍCIOS DE JUROS COMPOSTOS</Text>
        <Text style={styles.placeholder}>Em construção 🚧</Text>
      </View>

      <BottomNavBar activeRoute="compound-interest-exercises" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#082A7A',
    marginBottom: 12,
    textAlign: 'center',
  },
  placeholder: {
    fontSize: 15,
    color: '#64748B',
  },
});