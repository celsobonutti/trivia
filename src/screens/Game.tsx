import React from 'react';
import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { Button, useTheme } from 'react-native-paper';

import { GameStackParamList } from '../../App';
import { DefaultView } from '../components/containers/DefaultView';
import { QuestionLabel } from '../components/typography/QuestionLabel';
import { StyleSheet, View } from 'react-native';
import { useForceUpdate } from '../utils/hooks';

type GameScreenRouteProp = RouteProp<GameStackParamList, 'Game'>;
type GameScreenNavigationProp = NavigationProp<GameStackParamList, 'Game'>;

export const Game = () => {
  const forceUpdate = useForceUpdate();
  const { params: questions } = useRoute<GameScreenRouteProp>();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const answers = React.useRef<boolean[]>([]);
  const { colors } = useTheme();

  const answerQuestion = (value: boolean) => {
    let question = questions[currentIndex];
    if (question) {
      answers.current[currentIndex] = value;
      setCurrentIndex((current) => (current < 9 ? current + 1 : current));
      forceUpdate();
    } else {
      throw new Error(
        'Something went wrong: You tried to answer a question that does not exist. Please report this situation to our support team.'
      );
    }
  };

  const goBack = () => {
    setCurrentIndex((current) => (current > 0 ? current - 1 : current));
  };

  const currentQuestion = React.useMemo(() => questions[currentIndex], [
    questions,
    currentIndex
  ]);

  if (!currentQuestion) {
    throw new Error(
      "Oops, something went wrong! I'm not sure why, but there isn't any question for you here. Please report it to our support team so we can investigate what could be causing this problem."
    );
  }

  return (
    <DefaultView style={styles.container}>
      <QuestionLabel>{currentQuestion.question}</QuestionLabel>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          color={colors.accent}
          mode={
            answers.current[currentIndex] === true ? 'contained' : 'outlined'
          }
          onPress={() => answerQuestion(true)}
        >
          True
        </Button>
        <Button
          style={styles.button}
          mode={
            answers.current[currentIndex] === false ? 'contained' : 'outlined'
          }
          onPress={() => answerQuestion(false)}
        >
          False
        </Button>
        <Button
          style={styles.button}
          disabled={currentIndex === 0}
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
  buttonContainer: {
    flex: 1
  },
  button: {
    marginVertical: 12
  }
});
