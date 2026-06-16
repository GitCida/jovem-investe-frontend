import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BottomNavBar from '@/components/bottom-nav-bar';
import Header from '@/components/header';
import { BookOpen, Wrench } from 'lucide-react-native';

export default function SimpleInterestScreen() {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.content}>

        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>APRENDA JUROS SIMPLES</Text>
          <View style={styles.bannerImagePlaceholder} />
        </View>

        <TouchableOpacity style={styles.buttonOutline}>
          <BookOpen size={20} color="#1E3A8A" />
          <Text style={styles.buttonOutlineText}>Leia resumos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonYellow}>
          <Wrench size={20} color="#e6b000" />
          <Text style={styles.buttonYellowText}>Pratique com exercícios</Text>
        </TouchableOpacity>

      </View>

      <BottomNavBar activeRoute="simple-interest" />
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
  },
  banner: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1E3A8A',
    marginBottom: 16,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  bannerImagePlaceholder: {
    width: '100%',
    height: 160,
    backgroundColor: '#CBD5E1',
  },
  buttonOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 2,
    borderColor: '#1E3A8A',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  buttonOutlineText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E3A8A',
  },
  buttonYellow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 2,
    borderColor: '#e6b000',
    borderRadius: 10,
    padding: 14,
    backgroundColor: '#FFFFFF',
  },
  buttonYellowText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#e6b000',
  },
});