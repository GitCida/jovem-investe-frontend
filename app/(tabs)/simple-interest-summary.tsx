import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '@/components/header';
import BottomNavBar from '@/components/bottom-nav-bar';

export default function SimpleInterestSummaryScreen() {
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.pageTitle}>ENTENDA JUROS SIMPLES</Text>

        <Text style={styles.sectionTitle}>O que é juros simples?</Text>
        <Text style={styles.paragraph}>
          Juros Simples é um sistema de cálculo em que o percentual de juro incide apenas sobre
          o valor inicial (chamado de capital). Isso significa que o valor dos juros é fixo e
          igual em todos os períodos, pois ele não acumula como nos juros compostos.
        </Text>

        <Text style={styles.sectionTitle}>Elementos Básicos</Text>
        <Text style={styles.paragraph}>
          Para qualquer cálculo de juros simples, você precisa conhecer quatro variáveis:
        </Text>
        <Text style={styles.bulletItem}>
          <Text style={styles.bold}>Capital (C):</Text> O valor inicial investido ou emprestado.
        </Text>
        <Text style={styles.bulletItem}>
          <Text style={styles.bold}>Taxa de Juros (i):</Text> O percentual cobrado ou rendido por
          período (ex: 2% ao mês, 10% ao ano). Deve ser usada na forma decimal nos cálculos
          (ex: 2% = 0,02).
        </Text>
        <Text style={styles.bulletItem}>
          <Text style={styles.bold}>Tempo (t):</Text> A duração da operação. Atenção: a taxa (i)
          e o tempo (t) devem estar sempre na mesma unidade (ex: taxa ao mês e tempo em meses).
        </Text>
        <Text style={styles.bulletItem}>
          <Text style={styles.bold}>Montante (M):</Text> O valor total ao final do período
          (Capital inicial + Juros).
        </Text>

        <Text style={styles.sectionTitle}>As fórmulas fundamentais</Text>
        <Text style={styles.numberedItem}>
          <Text style={styles.bold}>1. Para encontrar o valor dos juros (J) acumulados:{'\n'}</Text>
          <Text style={styles.formula}>J = C . i . t</Text>
        </Text>
        <Text style={styles.numberedItem}>
          <Text style={styles.bold}>2. Para encontrar o montante (M) final:{'\n'}</Text>
          <Text style={styles.formula}>M = C + J</Text>
        </Text>
        <Text style={styles.numberedItem}>
          <Text style={styles.bold}>3. Ou, combinando as duas fórmulas:{'\n'}</Text>
          <Text style={styles.formula}>M = C . (1 + i . t)</Text>
        </Text>

        <Text style={styles.sectionTitle}>Características principais</Text>
        <Text style={styles.bulletItem}>
          <Text style={styles.bold}>Crescimento Linear:</Text> O valor aumenta de forma constante
          a cada mês/ano.
        </Text>
        <Text style={styles.bulletItem}>
          <Text style={styles.bold}>Pouco usado no mercado financeiro moderno:</Text> É mais
          comum em situações cotidianas, como compras parceladas sem capitalização, atrasos de
          contas de consumo (água, luz) ou empréstimos informais. O mercado financeiro geral
          prefere os juros compostos ("juros sobre juros").
        </Text>
      </ScrollView>

      <BottomNavBar activeRoute="simple-interest-summary" />
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
    padding: 20,
    paddingBottom: 100,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#082A7A',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D47D9',
    marginTop: 24,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 15,
    color: '#1E293B',
    lineHeight: 24,
    marginBottom: 12,
  },
  numberedItem: {
    fontSize: 15,
    color: '#1E293B',
    lineHeight: 24,
    marginBottom: 14,
  },
  bulletItem: {
    fontSize: 15,
    color: '#1E293B',
    lineHeight: 24,
    marginBottom: 12,
  },
  bold: {
    fontWeight: '700',
    color: '#1E293B',
  },
  example: {
    color: '#6B7280',
    fontStyle: 'italic',
  },
  formula: {
    color: '#082A7A',
    fontWeight: '600',
    fontSize: 16,
  },
});