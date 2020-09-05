import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { Question } from '../../types/questions';

type QuestionLabelProps = {
  question: Question;
};

export const QuestionLabel = ({ question }: QuestionLabelProps) => (
  <>
    <Text style={styles.label}>{question.label}</Text>
    <Text style={styles.category}>{question.category}</Text>
  </>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 36
  },
  category: {
    marginTop: 14,
    fontSize: 16,
    textAlign: 'center'
  }
});
