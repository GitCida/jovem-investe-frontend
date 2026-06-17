import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '@/components/header';
import BottomNavBar from '@/components/bottom-nav-bar';

export default function SimpleInterestSummaryScreen() {
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.pageTitle}>ENTENDA PORCENTAGEM</Text>

        <Text style={styles.sectionTitle}>O que é porcentagem?</Text>
        <Text style={styles.paragraph}>
          A porcentagem (ou percentagem) é uma razão cujo denominador é igual a 100. O termo
          significa literalmente "por cada centena" e é representado pelo símbolo %.
        </Text>
        <Text style={styles.paragraph}>
          Ela é utilizada para comparar grandezas, calcular descontos, acréscimos, lucros, juros
          e para analisar dados estatísticos de forma mais intuitiva.
        </Text>

        <Text style={styles.sectionTitle}>As três formas de representar</Text>
        <Text style={styles.paragraph}>
          Qualquer valor percentual pode ser escrito de três maneiras diferentes. Saber alternar
          entre elas facilita muito os cálculos:
        </Text>
        <Text style={styles.numberedItem}>
          <Text style={styles.bold}>1. Forma Percentual:</Text> É a representação utilizando o símbolo %.
          {'\n'}<Text style={styles.example}>Exemplo: 25%</Text>
        </Text>
        <Text style={styles.numberedItem}>
          <Text style={styles.bold}>2. Forma Fracionária:</Text> É uma fração onde o numerador é o número e o denominador é sempre 100.
          {'\n'}<Text style={styles.example}>Exemplo: 25/100</Text>
        </Text>
        <Text style={styles.numberedItem}>
          <Text style={styles.bold}>3. Forma Decimal:</Text> É o resultado da divisão do número por 100.
          {'\n'}<Text style={styles.example}>Exemplo: 0,25</Text>
        </Text>

        <Text style={styles.sectionTitle}>Como calcular porcentagem (Casos Principais)</Text>
        <Text style={styles.numberedItem}>
          <Text style={styles.bold}>1. Calcular a porcentagem de um valor fixo{'\n'}</Text>
          Para encontrar um valor percentual de um total, transforma-se a porcentagem em fração
          ou decimal e multiplica-se pelo valor total.
        </Text>
        <Text style={styles.numberedItem}>
          <Text style={styles.bold}>2. Descobrir que porcentagem um valor representa de outro{'\n'}</Text>
          Para saber a taxa percentual de uma parte em relação ao todo, divide-se a parte pelo
          todo e multiplica-se o resultado por 100.
        </Text>
        <Text style={styles.numberedItem}>
          <Text style={styles.bold}>3. Aumentos e Descontos Percentuais{'\n'}</Text>
          Para aplicar variações sobre um valor inicial, pode-se usar o conceito de Fator de
          Multiplicação:{'\n'}
          • <Text style={styles.bold}>Aumento:</Text> Soma-se a taxa a 100% (1 + i){'\n'}
          • <Text style={styles.bold}>Desconto:</Text> Subtrai-se a taxa a 100% (1 - i)
        </Text>

        <Text style={styles.sectionTitle}>Dicas rápidas de cálculo mental</Text>
        <Text style={styles.bulletItem}>
          <Text style={styles.bold}>Calcular 10%:</Text> Basta mover a vírgula uma casa para a esquerda (dividir por 10).{'\n'}
          <Text style={styles.example}>Exemplo: 10% de 350 é 35.</Text>
        </Text>
        <Text style={styles.bulletItem}>
          <Text style={styles.bold}>Calcular 1%:</Text> Basta mover a vírgula duas casas para a esquerda (dividir por 100).{'\n'}
          <Text style={styles.example}>Exemplo: 1% de 350 é 3,5.</Text>
        </Text>
        <Text style={styles.bulletItem}>
          <Text style={styles.bold}>Calcular 50%:</Text> É sempre a metade do valor.
        </Text>
        <Text style={styles.bulletItem}>
          <Text style={styles.bold}>Calcular 25%:</Text> É a metade da metade (ou dividir por 4).
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
});