import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const questions = [
  "식욕이 감소하거나 증가한 적이 있습니까?",
  "수면에 문제가 있었습니까? (예: 불면증 또는 과도한 수면)",
  "에너지가 부족하거나 쉽게 피로감을 느끼셨습니까?",
  "자신에 대한 부정적인 생각이나 죄책감을 느끼셨습니까?",
  "집중하는 데 어려움을 겪으셨습니까?",
  "평소 즐기던 활동에 흥미를 잃으셨습니까?",
  "감정적으로 불안정하셨습니까?",
  "다른 사람들과의 관계에서 어려움을 겪으셨습니까?",
  "자살에 대한 생각이 들거나 시도한 적이 있습니까?",
  "신체적인 통증이나 불편함을 느끼셨습니까?",
  "쉽게 짜증이 나거나 화가 난 적이 있습니까?",
  "불안하거나 걱정되는 일이 많았습니까?",
  "무기력하거나 움직이기 힘들다고 느끼셨습니까?",
  "무가치함을 느끼셨습니까?",
  "갑작스러운 기분 변화가 있었습니까?",
  "미래에 대한 희망을 잃으셨습니까?",
  "사회적 활동을 피하거나 회피하셨습니까?",
  "식사에 대한 흥미가 줄어들었습니까?",
  "성욕이 감소하였습니까?",
  "자신의 외모에 대해 부정적으로 생각하셨습니까?",
  "비관적인 생각이 들었습니까?",
  "무기력함을 느끼셨습니까?",
  "다른 사람들로부터 고립감을 느끼셨습니까?",
  "감정적으로 무감각함을 느끼셨습니까?",
  "미래에 대한 두려움이 있으셨습니까?",
  "기운이 없거나 활력이 부족했습니까?",
  "일상적인 일들이 힘들게 느껴지셨습니까?",
  "짜증이 나거나 분노를 느끼셨습니까?",
  "자신을 비난하거나 자책하셨습니까?",
  "자주 울거나 눈물이 나셨습니까?"
];

const DepressionTestScreen = ({ navigation }) => {
  const [answers, setAnswers] = useState(Array(30).fill(0));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswer = (score) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = score;
    setAnswers(newAnswers);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const totalScore = newAnswers.reduce((acc, score) => acc + score, 0);
      navigation.navigate('DepressionResult', { totalScore });
    }
  };

  const emojis = ['😡', '😟', '😐', '🙂', '😃'];
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>우울증 검사</Text>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{questions[currentQuestionIndex]}</Text>
        <View style={styles.optionsContainer}>
          {emojis.map((emoji, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                answers[currentQuestionIndex] === index + 1 && styles.selectedOption
              ]}
              onPress={() => handleAnswer(index + 1)}
            >
              <Text style={styles.optionText}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  option: {
    backgroundColor: '#e0e0e0',
    padding: 20,
    borderRadius: 10,
  },
  selectedOption: {
    backgroundColor: '#007bff',
  },
  optionText: {
    fontSize: 24,
  },
});

export default DepressionTestScreen;
