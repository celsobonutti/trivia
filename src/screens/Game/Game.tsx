import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

import { DefaultView } from '../../components/containers/DefaultView';
import { QuestionLabel } from '../../components/typography/QuestionLabel';
import { Question } from '../../types/questions';
import { useGameState } from './useGameState';

type GameProps = {
  questions: Question[];
};

export const Game = ({ questions }: GameProps) => {
  const {
    answerQuestion,
    answers,
    currentQuestion,
    currentQuestionIndex,
    goBack,
    labelOpacity,
    labelPositionOffset
  } = useGameState(questions);
  const { colors } = useTheme();

  if (!currentQuestion) {
    throw new Error(
      "Oops, something went wrong! I'm not sure why, but there isn't any question for you here. Please report it to our support team so we can investigate what could be causing this problem."
    );
  }

  return (
    <DefaultView style={styles.container}>
      <Text style={styles.counter} accessibilityLabel="Current question">
        {currentQuestionIndex + 1}/{questions.length}
      </Text>
      <Animated.View
        accessible
        accessibilityLabel="Question"
        style={[
          styles.labelContainer,
          {
            opacity: labelOpacity,
            transform: [
              {
                translateX: labelPositionOffset
              }
            ]
          }
        ]}
      >
        <QuestionLabel question={currentQuestion} />
      </Animated.View>
      <View style={styles.buttonContainer}>
        <Animated.View
          style={{ opacity: labelOpacity }}
          accessibilityLabel="Possible answers"
        >
          <Button
            style={styles.button}
            color={colors.accent}
            mode={
              answers.get(currentQuestionIndex) === true
                ? 'contained'
                : 'outlined'
            }
            onPress={() => answerQuestion(true)}
            testID="true"
          >
            True
          </Button>
          <Button
            style={styles.button}
            mode={
              answers.get(currentQuestionIndex) === false
                ? 'contained'
                : 'outlined'
            }
            onPress={() => answerQuestion(false)}
            testID="false"
          >
            False
          </Button>
        </Animated.View>
        <Button
          style={styles.button}
          disabled={currentQuestionIndex === 0}
          onPress={goBack}
        >
          Go back
        </Button>
      </View>
    </DefaultView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18
  },
  counter: {
    alignSelf: 'center',
    fontSize: 11,
    marginTop: 16
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 1
  },
  button: {
    marginVertical: 12
  }
});
