import React from 'react';
import { Button, Headline, Portal } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

import { categories } from '../../constants/categories';
import { DefaultView } from '../../components/containers/DefaultView';
import { DialogButton } from '../../components/inputs/DialogButton';
import { difficulties } from '../../constants/difficulties';
import { fetchQuestions } from '../../utils/fetchQuestions';
import { Category, Difficulty, Question } from '../../types/questions';

type HomeProps = {
  goToGame: (arg: Question[]) => void;
};

export const Home = ({ goToGame }: HomeProps) => {
  const [selectedCategory, setCategory] = React.useState('0');
  const [selectedDifficulty, setDifficulty] = React.useState<Difficulty>('any');
  const [loading, setLoading] = React.useState(false);

  const onPlayPressed = () => {
    setLoading(true);
    const category = categories.find(
      (cat) => cat.value === selectedCategory
    ) as Category;
    fetchQuestions({
      category,
      difficulty: selectedDifficulty
    })
      .then((questions) => {
        setLoading(false);
        goToGame(questions);
      })
      .catch(console.warn);
  };

  return (
    <DefaultView>
      <Portal.Host>
        <View style={styles.container}>
          <Headline style={styles.headline}>
            Welcome to the Trivia Game!
          </Headline>
          <DialogButton
            label="Do you want to select a category?"
            accessibilityLabel="Press to select a category"
            inputA11yLabel="Selected category"
            testID="category"
            options={categories}
            onChange={setCategory}
            selectedValue={selectedCategory}
            containerStyle={styles.button}
          />
          <DialogButton
            label="What about difficulty?"
            accessibilityLabel="Press to select a difficulty"
            inputA11yLabel="Selected difficulty"
            testID="difficulty"
            options={difficulties}
            onChange={(value) => setDifficulty(value as Difficulty)}
            selectedValue={selectedDifficulty}
          />
          <Button
            mode="contained"
            testID="play"
            dark
            style={styles.button}
            contentStyle={styles.buttonContentStyle}
            onPress={onPlayPressed}
            loading={loading}
          >
            Play the game
          </Button>
        </View>
      </Portal.Host>
    </DefaultView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 18
  },
  headline: {
    textDecorationLine: 'underline',
    textDecorationColor: 'white',
    fontStyle: 'italic',
    position: 'absolute',
    top: 48,
    left: 18
  },
  button: {
    marginVertical: 36
  },
  buttonContentStyle: {
    height: 50
  }
});
