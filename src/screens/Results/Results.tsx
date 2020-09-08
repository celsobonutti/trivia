import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';

import { DefaultView } from '../../components/containers/DefaultView';
import { Result } from '../../components/elements/Result';
import { Answer } from '../../types/result';

type ResultsProps = {
  answers: Answer[];
  onPlayAgain: () => void;
  onGoToHome: () => void;
};

export const Results = ({ answers, onGoToHome, onPlayAgain }: ResultsProps) => {
  const rightAnswers = answers.filter(
    (answer) => answer.correctAnswer === answer.selectedAnswer
  );

  return (
    <DefaultView style={styles.container}>
      <Text style={styles.resultCount}>
        You scored: {rightAnswers.length}/{answers.length}
      </Text>
      <View accessibilityLabel="Results" style={styles.resultContainer}>
        <FlatList
          data={answers}
          renderItem={({ item }: { item: Answer }) => <Result answer={item} />}
          keyExtractor={(item) => item.question}
        />
      </View>
      <Button
        testID="play_again"
        style={styles.button}
        mode="contained"
        onPress={onPlayAgain}
      >
        Play again!
      </Button>
      <Button testID="go_home" style={styles.button} onPress={onGoToHome}>
        Go to home
      </Button>
    </DefaultView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12
  },
  resultCount: {
    fontSize: 32,
    marginVertical: 16,
    alignSelf: 'center'
  },
  resultContainer: {
    flex: 1,
    marginBottom: 8
  },
  button: {
    marginTop: 8,
    marginHorizontal: 12
  }
});
