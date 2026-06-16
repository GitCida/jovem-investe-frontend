import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { User, LogOut } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import BottomNavBar from '@/components/bottom-nav-bar';
import Header from '@/components/header';

export default function HomeScreen() {
  const [username, setUsername] = useState('');
  const { signOut } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single();

    if (data) setUsername(data.username);
  }

  return (
    <View style={styles.container}>

      <Header />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.greeting}>
          Bem-vindo(a), {username || '...'}!
        </Text>

        <View style={styles.card}>
          <View style={styles.cardText}>
            <Text style={styles.cardModule}>Módulo atual: juros simples</Text>
            <Text style={styles.cardExercise}>Exercício atual: calcule o tempo</Text>
          </View>
          <TouchableOpacity style={styles.cardButton}>
            <User size={28} color="#1E3A8A" />
            <Text style={styles.cardButtonLabel}>Exercitar</Text>
          </TouchableOpacity>
        </View>

        {/* Botão temporário de teste */}
        <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
          <LogOut size={18} color="#fff" />
          <Text style={styles.signOutText}>Sair</Text>
        </TouchableOpacity>

      </ScrollView>

      <BottomNavBar activeRoute="index" />
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
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: '#082A7A',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFC400',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardText: {
    flex: 1,
    marginRight: 12,
  },
  cardModule: {
    fontSize: 13,
    color: '#1E3A8A',
    marginBottom: 4,
  },
  cardExercise: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  cardButton: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  cardButtonLabel: {
    fontSize: 12,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  signOutButton: {
    marginTop: 16,
    backgroundColor: '#dc2626',
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});