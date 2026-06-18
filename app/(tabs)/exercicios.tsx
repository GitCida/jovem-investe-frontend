import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Percent, Tag, Star } from 'lucide-react-native';
import BottomNavBar from '@/components/bottom-nav-bar';
import Header from '@/components/header';
import { router } from 'expo-router';

type Theme = 'blue' | 'gold';

const COLORS = {
  blue: '#1E3A8A',
  gold: '#FFC400',
};

const EXERCISES: {
  id: string;
  label: string;
  route: string;
  theme: Theme;
  icon?: 'percent' | 'tag';
  letters?: string;
}[] = [
  {
    id: 'porcentagem',
    label: 'EXERCÍCIOS DE PORCENTAGEM',
    route: '/(tabs)/percentage-exercises',
    theme: 'blue',
    icon: 'percent',
  },
  {
    id: 'juros-simples',
    label: 'EXERCÍCIOS DE JUROS SIMPLES',
    route: '/(tabs)/simple-interest-exercises',
    theme: 'gold',
    letters: 'JS',
  },
  {
    id: 'juros-compostos',
    label: 'EXERCÍCIOS DE JUROS COMPOSTOS',
    route: '/(tabs)/compound-interest-exercises',
    theme: 'blue',
    letters: 'JC',
  },
  {
    id: 'descontos',
    label: 'EXERCÍCIOS DE DESCONTOS',
    route: '/(tabs)/discount-exercises',
    theme: 'gold',
    icon: 'tag',
  },
];

export default function ExercisesScreen() {
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>PRATIQUE COM EXERCÍCIOS</Text>

        <View style={styles.subtitleRow}>
          <Text style={styles.subtitle}>MÓDULO BÁSICO</Text>
          <Star size={18} color={COLORS.gold} fill={COLORS.gold} style={styles.subtitleStar} />
        </View>

        {EXERCISES.map((exercise) => {
          const mainColor = COLORS[exercise.theme];
          const contrastColor = exercise.theme === 'blue' ? COLORS.gold : COLORS.blue;

          return (
            <TouchableOpacity
              key={exercise.id}
              style={[styles.card, { borderColor: mainColor }]}
              onPress={() => router.push(exercise.route as any)}
            >
              <Text style={[styles.cardLabel, { color: mainColor }]}>
                {exercise.label}
              </Text>

              <View style={[styles.badge, { backgroundColor: mainColor }]}>
                {exercise.icon === 'percent' && (
                  <Percent size={22} color={contrastColor} />
                )}
                {exercise.icon === 'tag' && (
                  <Tag size={22} color={contrastColor} />
                )}
                {exercise.letters && (
                  <Text style={[styles.badgeLetters, { color: contrastColor }]}>
                    {exercise.letters}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <BottomNavBar activeRoute="exercicios" />
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
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#082A7A',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFC400',
  },
  subtitleStar: {
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '800',
    flex: 1,
    marginRight: 12,
  },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLetters: {
    fontSize: 14,
    fontWeight: '800',
  },
});