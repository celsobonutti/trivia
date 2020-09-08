import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

import { DefaultView } from '../../components/containers/DefaultView';
import { QuestionLabel } from '../../components/elements/QuestionLabel';
import { Question } from '../../types/questions';
import { Answer } from '../../types/result';
import { useGameState } from './useGameState';

type GameProps = {
  questions: Question[];
  onSubmitAnswers: (arg: Answer[]) => void;
};

export const Game = ({ questions, onSubmitAnswers }: GameProps) => {
  const {
    answerQuestion,
    answers,
    currentQuestion,
    currentQuestionIndex,
    goBack,
    labelOpacity,
    labelPositionOffset,
    submitButtonOpacity,
    areQuestionButtonDisabled
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
            disabled={areQuestionButtonDisabled}
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
            disabled={areQuestionButtonDisabled}
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
        <Animated.View style={{ opacity: submitButtonOpacity }}>
          <Button
            icon="send"
            color="green"
            mode="contained"
            testID="submit"
            disabled={questions.length > answers.size}
            onPress={() =>
              onSubmitAnswers(
                questions.map((question, index) => ({
                  question: question.label,
                  correctAnswer: question.answer,
                  selectedAnswer: answers.get(index) as boolean
                }))
              )
            }
          >
            Submit answers
          </Button>
        </Animated.View>
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
