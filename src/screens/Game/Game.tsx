import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

import { DefaultView } from '../../components/containers/DefaultView';
import { QuestionLabel } from '../../components/typography/QuestionLabel';
import { useGameState } from './useGameState';

export const Game = () => {
  const {
    answerQuestion,
    answers,
    currentQuestion,
    currentQuestionIndex,
    goBack,
    labelOpacity,
    labelPositionOffset
  } = useGameState();
  const { colors } = useTheme();

  if (!currentQuestion) {
    throw new Error(
      "Oops, something went wrong! I'm not sure why, but there isn't any question for you here. Please report it to our support team so we can investigate what could be causing this problem."
    );
  }

  return (
    <DefaultView style={styles.container}>
      <Text style={styles.counter} testID="current">
        {currentQuestionIndex + 1}/10
      </Text>
      <Animated.View
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
        <QuestionLabel>{currentQuestion.label}</QuestionLabel>
      </Animated.View>
      <View style={styles.buttonContainer}>
        <Animated.View style={{ opacity: labelOpacity }}>
          <Button
            style={styles.button}
            color={colors.accent}
            mode={
              answers.get(currentQuestionIndex) === true
                ? 'contained'
                : 'outlined'
            }
            onPress={() => answerQuestion(true)}
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
    flex: 1
  },
  buttonContainer: {
    flex: 1
  },
  button: {
    marginVertical: 12
  }
});
