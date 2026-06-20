import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { CheckCircle2, XCircle } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import Header from '@/components/header';
import BottomNavBar from '@/components/bottom-nav-bar';

type Exercise = {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
};

export default function SimpleInterestExercisesScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchExercises();
  }, []);

  async function fetchExercises() {
    const { data: moduleData } = await supabase
      .from('modules')
      .select('id')
      .eq('slug', 'juros-simples')
      .single();

    if (!moduleData) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from('exercises')
      .select('id, question, options, correct_answer')
      .eq('module_id', moduleData.id);

    if (data) setExercises(data as Exercise[]);
    setLoading(false);
  }

  function handleSelect(exerciseId: string, optionIndex: number) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [exerciseId]: optionIndex }));
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  const allAnswered = exercises.length > 0 && exercises.every((ex) => answers[ex.id] !== undefined);

  function getOptionStyle(exercise: Exercise, optionIndex: number) {
    const selected = answers[exercise.id];

    if (!submitted) {
      return selected === optionIndex ? styles.optionSelected : styles.option;
    }

    if (optionIndex === exercise.correct_answer) return styles.optionCorrect;
    if (selected === optionIndex) return styles.optionWrong;
    return styles.option;
  }

  function getOptionTextStyle(exercise: Exercise, optionIndex: number) {
    const selected = answers[exercise.id];

    if (!submitted) {
      return selected === optionIndex ? styles.optionTextSelected : styles.optionText;
    }

    if (optionIndex === exercise.correct_answer || selected === optionIndex) {
      return styles.optionTextSelected;
    }
    return styles.optionText;
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0D47D9" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.title}>EXERCÍCIOS DE JUROS SIMPLES</Text>

        {exercises.map((ex, index) => {
          const isCorrect = submitted && answers[ex.id] === ex.correct_answer;
          const isWrong = submitted && answers[ex.id] !== ex.correct_answer;

          return (
            <View key={ex.id} style={styles.questionBlock}>
              <Text style={styles.questionText}>
                {index + 1}. {ex.question}
              </Text>

              {ex.options.map((opt, optIndex) => (
                <TouchableOpacity
                  key={optIndex}
                  style={getOptionStyle(ex, optIndex)}
                  onPress={() => handleSelect(ex.id, optIndex)}
                  disabled={submitted}
                >
                  <View style={styles.radioCircle}>
                    {answers[ex.id] === optIndex && !submitted && <View style={styles.radioDot} />}
                    {submitted && optIndex === ex.correct_answer && (
                      <CheckCircle2 size={18} color="#16A34A" />
                    )}
                    {submitted && answers[ex.id] === optIndex && optIndex !== ex.correct_answer && (
                      <XCircle size={18} color="#DC2626" />
                    )}
                  </View>
                  <Text style={getOptionTextStyle(ex, optIndex)}>{opt}</Text>
                </TouchableOpacity>
              ))}

              {submitted && (
                <Text style={isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}>
                  {isCorrect
                    ? '✓ Você acertou!'
                    : `✗ Você errou. Resposta certa: ${ex.options[ex.correct_answer]}`}
                </Text>
              )}
            </View>
          );
        })}

        {!submitted && exercises.length > 0 && (
          <TouchableOpacity
            style={[styles.submitButton, !allAnswered && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={!allAnswered}
          >
            <Text style={styles.submitButtonText}>Enviar exercício</Text>
          </TouchableOpacity>
        )}

        {submitted && (
          <View style={styles.resultSummary}>
            <Text style={styles.resultSummaryText}>
              Você acertou {exercises.filter((ex) => answers[ex.id] === ex.correct_answer).length} de{' '}
              {exercises.length} questões
            </Text>
          </View>
        )}
      </ScrollView>

      <BottomNavBar activeRoute="simple-interest" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#082A7A',
    marginBottom: 24,
  },
  questionBlock: {
    marginBottom: 28,
  },
  questionText: {
    fontSize: 15,
    color: '#1E293B',
    marginBottom: 12,
    lineHeight: 22,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#F8FAFC',
  },
  optionSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1.5,
    borderColor: '#0D47D9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#EFF4FF',
  },
  optionCorrect: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1.5,
    borderColor: '#16A34A',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#DCFCE7',
  },
  optionWrong: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1.5,
    borderColor: '#DC2626',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#FEE2E2',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#94A3B8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0D47D9',
  },
  optionText: {
    fontSize: 14,
    color: '#1E293B',
    flex: 1,
  },
  optionTextSelected: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },
  feedbackCorrect: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
    color: '#16A34A',
  },
  feedbackWrong: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
    color: '#DC2626',
  },
  submitButton: {
    backgroundColor: '#0D47D9',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  resultSummary: {
    backgroundColor: '#EFF4FF',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  resultSummaryText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#082A7A',
  },
});