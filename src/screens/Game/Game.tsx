import React from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { Button, Text, useTheme } from 'react-native-paper';
import { Map } from 'immutable';

import { GameStackParamList } from '../../../App';
import { DefaultView } from '../../components/containers/DefaultView';
import { QuestionLabel } from '../../components/typography/QuestionLabel';

type GameScreenRouteProp = RouteProp<GameStackParamList, 'Game'>;
type GameScreenNavigationProp = NavigationProp<GameStackParamList, 'Game'>;

export const Game = () => {
  const { width } = Dimensions.get('screen');
  const { params: questions } = useRoute<GameScreenRouteProp>();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Map<number, boolean>>(Map());
  const labelOpacity = React.useRef(new Animated.Value(1)).current;
  const labelPositionOffset = React.useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();

  const setOpacity = (opacity: number) =>
    Animated.timing(labelOpacity, {
      toValue: opacity,
      duration: 150,
      useNativeDriver: true
    });

  const moveTo = (position: number) =>
    Animated.spring(labelPositionOffset, {
      toValue: position,
      tension: 80,
      useNativeDriver: true
    });

  const fadeIn = () => setOpacity(1);
  const fadeOut = () => setOpacity(0);
  const moveLeft = () => moveTo(-width / 2);
  const moveRight = () => moveTo(width / 2);
  const moveCenter = () => moveTo(0);

  const answerQuestion = (value: boolean) => {
    let question = questions[currentIndex];
    if (question) {
      setAnswers((current) => current.set(currentIndex, value));
      if (currentIndex < 9) {
        Animated.parallel([fadeOut(), moveRight()]).start(() => {
          labelPositionOffset.setValue(-width / 2);
          setCurrentIndex((current) => (current < 9 ? current + 1 : current));
          Animated.parallel([fadeIn(), moveCenter()]).start();
        });
      }
    } else {
      throw new Error(
        'Something went wrong: You tried to answer a question that does not exist. Please report this situation to our support team.'
      );
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      Animated.parallel([fadeOut(), moveLeft()]).start(() => {
        labelPositionOffset.setValue(width / 2);
        setCurrentIndex((current) => (current > 0 ? current - 1 : current));
        Animated.parallel([fadeIn(), moveCenter()]).start();
      });
    }
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
      <Text style={styles.counter} testID="current">
        {currentIndex + 1}/10
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
            mode={answers.get(currentIndex) === true ? 'contained' : 'outlined'}
            onPress={() => answerQuestion(true)}
          >
            True
          </Button>
          <Button
            style={styles.button}
            mode={
              answers.get(currentIndex) === false ? 'contained' : 'outlined'
            }
            onPress={() => answerQuestion(false)}
          >
            False
          </Button>
        </Animated.View>
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
