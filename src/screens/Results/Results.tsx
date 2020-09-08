import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

import { DefaultView } from '../../components/containers/DefaultView';
import { Result } from '../../components/elements/Result';
import { Answer } from '../../types/result';

type ResultsProps = {
  answers: Answer[];
};

export const Results = ({ answers }: ResultsProps) => {
  const rightAnswers = answers.filter(
    (answer) => answer.correctAnswer === answer.selectedAnswer
  );

  return (
    <DefaultView>
      <Text style={styles.resultCount}>
        You scored: {rightAnswers.length}/{answers.length}
      </Text>
      <View accessibilityLabel="Results">
        <FlatList
          data={answers}
          renderItem={({ item }: { item: Answer }) => <Result answer={item} />}
          keyExtractor={(item) => item.question}
        />
      </View>
    </DefaultView>
  );
};

const styles = StyleSheet.create({
  resultCount: {
    fontSize: 32,
    marginVertical: 16,
    alignSelf: 'center'
  }
});
