import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Flame, Target, Clock, TrendingUp, Star, BookOpen, GraduationCap, Lock } from 'lucide-react-native';
import Header from '@/components/header';
import BottomNavBar from '@/components/bottom-nav-bar';

const MODULES = [
  { label: 'Básico', percent: '85%', stars: 1, unlocked: true },
  { label: 'Intermediário', stars: 2, unlocked: true },
  { label: 'Avançado', stars: 3, unlocked: false },
];

const STATS = [
  { icon: <Flame size={32} color="#e6b000" />, value: '14', label: 'DIAS DE\nSEQUÊNCIA' },
  { icon: <Target size={32} color="#0D47D9" />, value: '99%', label: 'TAXA DE\nACERTOS' },
  { icon: <Clock size={32} color="#0D47D9" />, value: '2 HORAS', label: 'TEMPO DE\nESTUDO' },
  { icon: <TrendingUp size={32} color="#e6b000" />, value: '+35%', label: 'DE EVOLUÇÃO\nSEMANAL' },
];

const ACHIEVEMENTS = [
  { icon: <Flame size={28} color="#e6b000" />, label: '7 DIAS DE\nSEQUÊNCIA' },
  { icon: <Star size={28} color="#e6b000" />, label: 'ACERTAR 50\nEXERCÍCIOS' },
  { icon: <GraduationCap size={28} color="#0D47D9" />, label: 'CONCLUIU\n10 AULAS' },
  { icon: <BookOpen size={28} color="#0D47D9" />, label: 'LEU 20\nRESUMOS' },
  { icon: <Target size={28} color="#0D47D9" />, label: 'SIMULADOS\n100% DE\nACERTO' },
];

function StarRow({ count, unlocked }: { count: number; unlocked: boolean }) {
  return (
    <View style={styles.starRow}>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={18}
          color={unlocked ? '#e6b000' : '#CBD5E1'}
          fill={unlocked ? '#e6b000' : '#CBD5E1'}
        />
      ))}
    </View>
  );
}

export default function ProgressScreen() {
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>SEU PROGRESSO POR MÓDULO</Text>
          <View style={styles.modulesRow}>
            {MODULES.map((mod) => (
              <View
                key={mod.label}
                style={[styles.moduleBox, mod.unlocked ? styles.moduleBoxActive : styles.moduleBoxLocked]}
              >
                <StarRow count={mod.stars} unlocked={mod.unlocked} />
                <Text style={[styles.moduleLabel, !mod.unlocked && styles.moduleLabelLocked]}>
                  {mod.label}
                </Text>
                {mod.percent ? (
                  <Text style={styles.modulePercent}>{mod.percent}</Text>
                ) : mod.unlocked ? null : (
                  <Lock size={16} color="#94A3B8" style={{ marginTop: 4 }} />
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.statsGrid}>
          {STATS.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              {stat.icon}
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.achievementsSection}>
          <View style={styles.achievementsHeader}>
            <Text style={styles.achievementsTitle}>CONQUISTAS RECENTES</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>VER TODAS &gt;</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.achievementsRow}>
            {ACHIEVEMENTS.map((ach) => (
              <View key={ach.label} style={styles.achievementBadge}>
                <View style={styles.achievementIcon}>{ach.icon}</View>
                <Text style={styles.achievementLabel}>{ach.label}</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>

      <BottomNavBar activeRoute="dashboard" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
    gap: 16,
  },
  card: {
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#082A7A',
    textAlign: 'center',
    marginBottom: 16,
  },
  modulesRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  moduleBox: {
    flex: 1,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    gap: 4,
  },
  moduleBoxActive: {
    borderWidth: 2,
    borderColor: '#e6b000',
    backgroundColor: '#FFFBEB',
  },
  moduleBoxLocked: {
    borderWidth: 2,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  starRow: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 4,
  },
  moduleLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#082A7A',
    textAlign: 'center',
  },
  moduleLabelLocked: {
    color: '#94A3B8',
  },
  modulePercent: {
    fontSize: 13,
    fontWeight: '700',
    color: '#082A7A',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '47%',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
    alignItems: 'flex-start',
    gap: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#082A7A',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  achievementsSection: {
    gap: 12,
  },
  achievementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  achievementsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#e6b000',
  },
  seeAll: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0D47D9',
  },
  achievementsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  achievementBadge: {
    alignItems: 'center',
    gap: 6,
    width: 60,
  },
  achievementIcon: {
    width: 52,
    height: 52,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e6b000',
    backgroundColor: '#FFFBEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#082A7A',
    textAlign: 'center',
    lineHeight: 13,
  },
});