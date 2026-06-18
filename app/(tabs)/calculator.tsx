import BottomNavBar from '@/components/bottom-nav-bar';
import Header from '@/components/header';
import { Calculator } from 'lucide-react-native';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CompoundInterestScreen() {
  const [capital, setCapital] = useState('');
  const [rate, setRate] = useState('');
  const [period, setPeriod] = useState('');
  const [result, setResult] = useState<{
    montante: number;
    juros: number;
    taxaEfetiva: number;
  } | null>(null);

  function calcular() {
    const C = parseFloat(capital.replace(',', '.'));
    const i = parseFloat(rate.replace(',', '.')) / 100;
    const t = parseFloat(period.replace(',', '.'));

    if (isNaN(C) || isNaN(i) || isNaN(t)) return;

    const montante = C * Math.pow(1 + i, t);
    const juros = montante - C;
    const taxaEfetiva = (montante / C - 1) * 100;

    setResult({ montante, juros, taxaEfetiva });
  }

  function limpar() {
    setCapital('');
    setRate('');
    setPeriod('');
    setResult(null);
  }

  const fmt = (val: number) =>
    val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.pageTitle}>SIMULADOR JUROS COMPOSTOS</Text>

        {/* Card de entrada */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Calculator size={20} color="#FFC400" />
            <Text style={styles.cardHeaderText}>DADOS DE SIMULAÇÃO</Text>
          </View>

          <Text style={styles.label}>CAPITAL INICIAL ( C )</Text>
          <View style={styles.inputRow}>
            <View style={styles.inputPrefix}>
              <Text style={styles.prefixText}>R$</Text>
            </View>
            <TextInput
              style={styles.inputFlex}
              placeholder="0,00"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={capital}
              onChangeText={setCapital}
            />
          </View>

          <Text style={styles.label}>TAXA DE JUROS ( I )</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.inputFlex}
              placeholder="0,00"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={rate}
              onChangeText={setRate}
            />
            <View style={styles.inputSuffix}>
              <Text style={styles.prefixText}>%</Text>
            </View>
          </View>

          <Text style={styles.label}>PERÍODO ( T )</Text>
          <TextInput
            style={styles.input}
            placeholder="em meses"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={period}
            onChangeText={setPeriod}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.calcButton} onPress={calcular}>
              <Text style={styles.calcButtonText}>CALCULAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clearButton} onPress={limpar}>
              <Text style={styles.clearButtonText}>LIMPAR</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card de resultado */}
        <View style={styles.card}>
          <View style={styles.resultRow}>
            <Text style={styles.resultMainLabel}>MONTANTE FINAL ( M )</Text>
            <View style={styles.resultMainBox}>
              <Text style={styles.resultMainValue}>
                {result ? fmt(result.montante) : '—'}
              </Text>
            </View>
          </View>

          <View style={styles.resultGrid}>
            <View style={styles.resultCell}>
              <Text style={styles.resultLabel}>CAPITAL INICIAL</Text>
              <View style={styles.resultBox}>
                <Text style={styles.resultValue}>
                  {result ? fmt(parseFloat(capital.replace(',', '.'))) : '—'}
                </Text>
              </View>
            </View>
            <View style={styles.resultCell}>
              <Text style={styles.resultLabel}>JUROS GANHOS</Text>
              <View style={styles.resultBox}>
                <Text style={styles.resultValue}>
                  {result ? fmt(result.juros) : '—'}
                </Text>
              </View>
            </View>
            <View style={styles.resultCell}>
              <Text style={styles.resultLabel}>TAXA EFETIVA</Text>
              <View style={styles.resultBox}>
                <Text style={styles.resultValue}>
                  {result ? `${fmt(result.taxaEfetiva)}%` : '—'}
                </Text>
              </View>
            </View>
            <View style={styles.resultCell}>
              <Text style={styles.resultLabel}>PERÍODO</Text>
              <View style={styles.resultBox}>
                <Text style={styles.resultValue}>
                  {result ? `${period} meses` : '—'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Fórmula */}
        <View style={styles.formulaCard}>
          <Text style={styles.formulaTitle}>Fórmula</Text>
          <Text style={styles.formulaText}>M = C × (1 + i)ᵗ</Text>
          <Text style={styles.formulaDesc}>
            Onde C = capital inicial, i = taxa por período, t = número de períodos
          </Text>
        </View>
      </ScrollView>

      <BottomNavBar activeRoute="calculator" />
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
    paddingBottom: 110,
    gap: 16,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFC400',
    textAlign: 'center',
    marginBottom: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0D47D9',
    padding: 16,
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D47D9',
    borderRadius: 8,
    padding: 10,
    gap: 8,
    marginBottom: 4,
  },
  cardHeaderText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#082A7A',
  },
  inputRow: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#FFC400',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  inputPrefix: {
    backgroundColor: '#FFC400',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  inputSuffix: {
    backgroundColor: '#FFC400',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  prefixText: {
    fontWeight: '700',
    color: '#082A7A',
    fontSize: 14,
  },
  inputFlex: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#082A7A',
  },
  input: {
    borderWidth: 2,
    borderColor: '#FFC400',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#082A7A',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  calcButton: {
    flex: 1,
    backgroundColor: '#0D47D9',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
  },
  calcButtonText: {
    color: '#FFC400',
    fontWeight: '800',
    fontSize: 15,
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#0D47D9',
    paddingVertical: 14,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#0D47D9',
    fontWeight: '800',
    fontSize: 15,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  resultMainLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#082A7A',
    flex: 1,
  },
  resultMainBox: {
    borderWidth: 2,
    borderColor: '#FFC400',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 120,
    alignItems: 'flex-end',
  },
  resultMainValue: {
    fontWeight: '800',
    fontSize: 15,
    color: '#082A7A',
  },
  resultGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  resultCell: {
    width: '47%',
    gap: 4,
  },
  resultLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#082A7A',
  },
  resultBox: {
    borderWidth: 2,
    borderColor: '#FFC400',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  resultValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#082A7A',
  },
  formulaCard: {
    backgroundColor: '#FFF3B0',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFC400',
    padding: 16,
    alignItems: 'center',
    gap: 6,
  },
  formulaTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#082A7A',
  },
  formulaText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0D47D9',
  },
  formulaDesc: {
    fontSize: 12,
    color: '#082A7A',
    textAlign: 'center',
  },
});
