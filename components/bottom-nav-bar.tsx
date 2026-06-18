import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Home, NotebookPen, BarChart3, Calculator } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Route = 'index' | 'exercises' | 'dashboard' | 'calculator' | 'simple-interest' | 'percentage' | 'simple-interest-summary' | 'simple-interest-exercises' | 'percentage-summary' | 'percentage-exercises';

type Props = {
  activeRoute: Route;
};

const ACTIVE_COLOR = '#FFC400';
const INACTIVE_COLOR = '#FFFFFF';

export default function BottomNavBar({ activeRoute }: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 8 }]}>
      <TouchableOpacity style={styles.iconWrapper} onPress={() => router.push('/')}>
        <Home
          size={26}
          color={activeRoute === 'index' ? ACTIVE_COLOR : INACTIVE_COLOR}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconWrapper} onPress={() => router.push('/exercises')}>
        <NotebookPen
          size={26}
          color={activeRoute === 'exercises' ? ACTIVE_COLOR : INACTIVE_COLOR}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconWrapper} onPress={() => router.push('/dashboard')}>
        <BarChart3
          size={26}
          color={activeRoute === 'dashboard' ? ACTIVE_COLOR : INACTIVE_COLOR}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconWrapper} onPress={() => router.push('/calculator')}>
        <Calculator
          size={26}
          color={activeRoute === 'calculator' ? ACTIVE_COLOR : INACTIVE_COLOR}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0D47D9',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 14,
  },
  iconWrapper: {
    padding: 8,
  },
});