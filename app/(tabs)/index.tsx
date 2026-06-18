import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NotebookPen, LogOut } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import BottomNavBar from '@/components/bottom-nav-bar';
import Header from '@/components/header';
import { router } from 'expo-router';

const MODULES = [
  { id: 'porcentagem', label: 'PORCENTAGEM', route: '/(tabs)/percentage' },
  { id: 'juros-simples', label: 'JUROS SIMPLES', route: '/(tabs)/simple-interest' },
];

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

        <Text style={styles.sectionTitle}>Escolha um módulo</Text>

        {MODULES.map((mod) => (
          <TouchableOpacity key={mod.id} style={styles.moduleButton} onPress={() => router.push(mod.route as any)}>
            <Text style={styles.moduleLabel}>{mod.label}</Text>
            <View style={styles.moduleAction}>
              <NotebookPen size={24} color="#1E3A8A" />
              <Text style={styles.moduleActionLabel}>Estudar</Text>
            </View>
          </TouchableOpacity>
        ))}

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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#082A7A',
    marginBottom: 12,
  },
  moduleButton: {
    backgroundColor: '#FFF3B0',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFC400',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  moduleLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  moduleAction: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  moduleActionLabel: {
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
