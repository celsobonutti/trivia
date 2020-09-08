import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Answer } from '../../types/result';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type ResultProps = {
  answer: Answer;
};

export const Result = ({ answer }: ResultProps) => {
  const isRight = answer.correctAnswer === answer.selectedAnswer;

  const styles = makeStyles(isRight);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={isRight ? 'check' : 'close'}
        color={isRight ? 'green' : 'red'}
        size={20}
      />
      <Text style={styles.text} numberOfLines={2}>
        {answer.question}
      </Text>
    </View>
  );
};

const makeStyles = (isRight: boolean) =>
  StyleSheet.create({
    container: {
      borderColor: isRight ? 'green' : 'red',
      borderWidth: 1,
      borderRadius: 4,
      marginVertical: 4,
      marginHorizontal: 12,
      padding: 8,
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'nowrap'
    },
    text: {
      marginLeft: 4,
      flexShrink: 1
    }
  });
